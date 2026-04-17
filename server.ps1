param(
  [string]$HostName = '127.0.0.1',
  [int]$Port = 8080
)

$ErrorActionPreference = 'Stop'

if (-not $PSBoundParameters.ContainsKey('HostName') -and $env:PROJECTM_BIND_HOST) {
  $HostName = $env:PROJECTM_BIND_HOST
}

if (-not $PSBoundParameters.ContainsKey('Port') -and $env:PORT) {
  $parsedPort = 0
  if ([int]::TryParse([string]$env:PORT, [ref]$parsedPort) -and $parsedPort -gt 0) {
    $Port = $parsedPort
  }
}

$script:RootDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$script:PublicDir = Join-Path $script:RootDir 'public'
$script:DataDir = if ($env:PROJECTM_DATA_DIR) { $env:PROJECTM_DATA_DIR } else { Join-Path $script:RootDir 'data' }
$script:StatePath = Join-Path $script:DataDir 'state.json'
$script:DatabasePath = Join-Path $script:DataDir 'projectm.db'
$script:ScriptsDir = Join-Path $script:RootDir 'scripts'
$script:SqliteHelperPath = Join-Path $script:ScriptsDir 'sqlite-state.js'
$script:State = $null
$script:StateDirty = $false
$script:PersistenceMode = 'json'
$script:NodePath = $null
$script:Perms = @{
  admin   = @('alertsAct', 'manageRules', 'manageSettings', 'export', 'clearAudit', 'manageIncidents')
  analyst = @('alertsAct', 'manageRules', 'export', 'manageIncidents')
  viewer  = @('export')
}
$script:RulePalette = @{
  CRITICAL = '#ff5f5f'
  HIGH     = '#ffad33'
  MEDIUM   = '#5fb3ff'
  LOW      = '#31d0aa'
  INFO     = '#7f95c1'
}
$script:AttackRegions = @(
  @{ country = 'United States'; region = 'North America'; weight = 20; lat = 37.09; lon = -95.71 },
  @{ country = 'Canada'; region = 'North America'; weight = 8; lat = 56.13; lon = -106.34 },
  @{ country = 'Brazil'; region = 'South America'; weight = 8; lat = -14.23; lon = -51.92 },
  @{ country = 'Germany'; region = 'Europe'; weight = 10; lat = 51.17; lon = 10.45 },
  @{ country = 'France'; region = 'Europe'; weight = 7; lat = 46.22; lon = 2.21 },
  @{ country = 'United Kingdom'; region = 'Europe'; weight = 9; lat = 55.37; lon = -3.43 },
  @{ country = 'Russia'; region = 'Eurasia'; weight = 15; lat = 61.52; lon = 105.31 },
  @{ country = 'China'; region = 'Asia'; weight = 18; lat = 35.86; lon = 104.19 },
  @{ country = 'India'; region = 'Asia'; weight = 14; lat = 20.59; lon = 78.96 },
  @{ country = 'Japan'; region = 'Asia'; weight = 8; lat = 36.2; lon = 138.25 },
  @{ country = 'South Korea'; region = 'Asia'; weight = 7; lat = 35.91; lon = 127.77 },
  @{ country = 'Singapore'; region = 'Southeast Asia'; weight = 5; lat = 1.35; lon = 103.82 },
  @{ country = 'Thailand'; region = 'Southeast Asia'; weight = 5; lat = 15.87; lon = 100.99 },
  @{ country = 'Turkey'; region = 'Middle East'; weight = 6; lat = 38.96; lon = 35.24 },
  @{ country = 'Israel'; region = 'Middle East'; weight = 5; lat = 31.05; lon = 34.85 },
  @{ country = 'South Africa'; region = 'Africa'; weight = 4; lat = -30.56; lon = 22.94 },
  @{ country = 'Nigeria'; region = 'Africa'; weight = 4; lat = 9.08; lon = 8.68 },
  @{ country = 'Australia'; region = 'Oceania'; weight = 6; lat = -25.27; lon = 133.78 }
)

function ConvertTo-NativeObject {
  param([Parameter(ValueFromPipeline = $true)]$InputObject)

  if ($null -eq $InputObject) {
    return $null
  }

  if ($InputObject -is [System.Collections.IDictionary]) {
    $converted = [ordered]@{}
    foreach ($key in $InputObject.Keys) {
      $converted[$key] = ConvertTo-NativeObject $InputObject[$key]
    }
    return $converted
  }

  if ($InputObject -is [System.Management.Automation.PSCustomObject]) {
    $converted = [ordered]@{}
    foreach ($prop in $InputObject.PSObject.Properties) {
      $converted[$prop.Name] = ConvertTo-NativeObject $prop.Value
    }
    return $converted
  }

  if ($InputObject -is [System.Collections.IEnumerable] -and -not ($InputObject -is [string])) {
    $items = @()
    foreach ($item in $InputObject) {
      $items += ,(ConvertTo-NativeObject $item)
    }
    return $items
  }

  return $InputObject
}

function Mark-StateDirty {
  $script:StateDirty = $true
}

function Get-NodeExecutablePath {
  if ($script:NodePath) {
    return $script:NodePath
  }

  $node = Get-Command node -ErrorAction SilentlyContinue | Select-Object -First 1
  if ($node) {
    $script:NodePath = $node.Source
  }

  return $script:NodePath
}

function Test-SqlitePersistenceAvailable {
  return -not [string]::IsNullOrWhiteSpace((Get-NodeExecutablePath)) -and (Test-Path -LiteralPath $script:SqliteHelperPath -PathType Leaf)
}

function Sync-PersistenceMetadata {
  if (-not $script:State -or -not $script:State.meta) {
    return $false
  }

  $desiredMode = if ($script:PersistenceMode -eq 'sqlite') { 'PowerShell + SQLite' } else { 'PowerShell Full Stack' }
  $desiredStorage = $script:PersistenceMode.ToUpperInvariant()
  $changed = $false

  if ([string]$script:State.meta.mode -ne $desiredMode) {
    $script:State.meta.mode = $desiredMode
    $changed = $true
  }

  if ([string]$script:State.meta.storage -ne $desiredStorage) {
    $script:State.meta.storage = $desiredStorage
    $changed = $true
  }

  return $changed
}

function Invoke-SqliteStateHelper {
  param(
    [ValidateSet('save', 'load')]
    [string]$Action,
    [string]$StateFilePath = $null
  )

  if (-not (Test-SqlitePersistenceAvailable)) {
    throw 'SQLite persistence helper is not available.'
  }

  $nodePath = Get-NodeExecutablePath
  $previousNodeNoWarnings = $env:NODE_NO_WARNINGS

  try {
    $env:NODE_NO_WARNINGS = '1'
    $arguments = @($script:SqliteHelperPath, $Action, $script:DatabasePath)
    if ($StateFilePath) {
      $arguments += $StateFilePath
    }

    $output = & $nodePath @arguments
    if ($LASTEXITCODE -ne 0) {
      throw "SQLite helper exited with code $LASTEXITCODE."
    }

    return ($output -join "`n")
  } finally {
    if ($null -eq $previousNodeNoWarnings) {
      Remove-Item Env:NODE_NO_WARNINGS -ErrorAction SilentlyContinue
    } else {
      $env:NODE_NO_WARNINGS = $previousNodeNoWarnings
    }
  }
}

function Load-StateFromSnapshot {
  $raw = Get-Content -LiteralPath $script:StatePath -Raw
  $loaded = if ([string]::IsNullOrWhiteSpace($raw)) { Get-SeedState } else { $raw | ConvertFrom-Json }
  return ConvertTo-NativeObject $loaded
}

function Load-StateFromSQLite {
  $raw = Invoke-SqliteStateHelper -Action 'load'
  if ([string]::IsNullOrWhiteSpace($raw)) {
    throw 'SQLite helper returned an empty state payload.'
  }

  return ConvertTo-NativeObject ($raw | ConvertFrom-Json)
}

function Backup-CorruptSnapshot {
  $stamp = Get-Date -Format 'yyyyMMdd-HHmmss'
  $backupPath = Join-Path $script:DataDir "state.corrupt.$stamp.json"
  Move-Item -LiteralPath $script:StatePath -Destination $backupPath -Force -ErrorAction SilentlyContinue
}

function Backup-CorruptDatabase {
  $stamp = Get-Date -Format 'yyyyMMdd-HHmmss'
  $backupPath = Join-Path $script:DataDir "projectm.corrupt.$stamp.db"
  Move-Item -LiteralPath $script:DatabasePath -Destination $backupPath -Force -ErrorAction SilentlyContinue

  foreach ($suffix in @('-wal', '-shm')) {
    $sidecarPath = "$($script:DatabasePath)$suffix"
    if (Test-Path -LiteralPath $sidecarPath) {
      Move-Item -LiteralPath $sidecarPath -Destination "$backupPath$suffix" -Force -ErrorAction SilentlyContinue
    }
  }
}

function Save-State {
  if (-not (Test-Path -LiteralPath $script:DataDir)) {
    New-Item -ItemType Directory -Force -Path $script:DataDir | Out-Null
  }

  $script:PersistenceMode = if (Test-SqlitePersistenceAvailable) { 'sqlite' } else { 'json' }
  [void](Sync-PersistenceMetadata)
  $json = $script:State | ConvertTo-Json -Depth 20
  $tempPath = "$($script:StatePath).tmp"
  Set-Content -LiteralPath $tempPath -Value $json -Encoding UTF8

  if ($script:PersistenceMode -eq 'sqlite') {
    try {
      Invoke-SqliteStateHelper -Action 'save' -StateFilePath $tempPath | Out-Null
    } catch {
      Write-Host "SQLite save failed, keeping JSON snapshot only: $($_.Exception.Message)" -ForegroundColor Yellow
      $script:PersistenceMode = 'json'
      [void](Sync-PersistenceMetadata)
      $json = $script:State | ConvertTo-Json -Depth 20
      Set-Content -LiteralPath $tempPath -Value $json -Encoding UTF8
    }
  }

  Move-Item -LiteralPath $tempPath -Destination $script:StatePath -Force
  $script:StateDirty = $false
}

function New-RandomToken {
  $bytes = New-Object byte[] 32
  [System.Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($bytes)
  return [Convert]::ToBase64String($bytes).TrimEnd('=').Replace('+', '-').Replace('/', '_')
}

function New-PasswordRecord {
  param([string]$Password)

  $salt = New-Object byte[] 16
  [System.Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($salt)
  $derive = New-Object System.Security.Cryptography.Rfc2898DeriveBytes($Password, $salt, 100000)
  $hash = $derive.GetBytes(32)
  return @{
    salt = [Convert]::ToBase64String($salt)
    hash = [Convert]::ToBase64String($hash)
  }
}

function Test-Password {
  param(
    [string]$Password,
    [hashtable]$Record
  )

  $salt = [Convert]::FromBase64String([string]$Record.salt)
  $derive = New-Object System.Security.Cryptography.Rfc2898DeriveBytes($Password, $salt, 100000)
  $hash = [Convert]::ToBase64String($derive.GetBytes(32))
  return $hash -eq [string]$Record.hash
}

function New-UserRecord {
  param(
    [string]$Username,
    [string]$Password,
    [string]$Role,
    [string]$DisplayName
  )

  $pw = New-PasswordRecord -Password $Password
  return [ordered]@{
    id          = "U-$($Username.ToUpper())"
    username    = $Username
    role        = $Role
    displayName = $DisplayName
    password    = $pw
  }
}

function Get-DefaultRules {
  return @(
    [ordered]@{ id = 'R001'; name = 'Brute Force Detection'; description = 'Repeated failed logins from one IP.'; severity = 'CRITICAL'; tags = @('AUTH', 'NETWORK'); enabled = $true; triggers = 0; kind = 'FAILED_LOGIN_BURST'; threshold = 5; windowSec = 120; pattern = '' },
    [ordered]@{ id = 'R002'; name = 'Port Scan Detection'; description = 'Repeated recon activity from one IP.'; severity = 'HIGH'; tags = @('NETWORK', 'RECON'); enabled = $true; triggers = 0; kind = 'PORT_SCAN'; threshold = 5; windowSec = 90; pattern = '' },
    [ordered]@{ id = 'R003'; name = 'SQL Injection Attempt'; description = 'Suspicious SQL payload in application traffic.'; severity = 'CRITICAL'; tags = @('APP', 'WEB'); enabled = $true; triggers = 0; kind = 'SQLI_PATTERN'; threshold = 1; windowSec = 60; pattern = '' },
    [ordered]@{ id = 'R004'; name = 'Traffic Spike'; description = 'Traffic exceeds the normal baseline.'; severity = 'HIGH'; tags = @('NETWORK', 'DDOS'); enabled = $true; triggers = 0; kind = 'TRAFFIC_SPIKE'; threshold = 3; windowSec = 60; pattern = '' },
    [ordered]@{ id = 'R005'; name = 'After-Hours Admin Access'; description = 'Admin login outside business hours.'; severity = 'MEDIUM'; tags = @('AUTH', 'INSIDER'); enabled = $false; triggers = 0; kind = 'AFTER_HOURS_ADMIN'; threshold = 1; windowSec = 60; pattern = '' },
    [ordered]@{ id = 'R006'; name = 'XSS Attempt'; description = 'JavaScript payload or xss keyword match.'; severity = 'HIGH'; tags = @('APP', 'WEB'); enabled = $true; triggers = 0; kind = 'KEYWORD_MATCH'; threshold = 1; windowSec = 60; pattern = 'xss' }
  )
}

function Get-DefaultSettings {
  return [ordered]@{
    simulationIntervalMs   = 4000
    licenseCapacityEps     = 5
    falsePositiveTolerance = 15
    maxLogs                = 600
    sourcesEnabled         = [ordered]@{
      FIREWALL = $true
      SERVER   = $true
      IDS      = $true
      APP      = $true
    }
  }
}

function Get-SeedState {
  return [ordered]@{
    meta = [ordered]@{
      name    = 'ProjectM SOC'
      version = '6.0'
      mode    = 'PowerShell Full Stack'
      storage = 'JSON'
      target  = [ordered]@{
        city    = 'Almaty'
        country = 'Kazakhstan'
        lat     = 43.22
        lon     = 76.85
      }
    }
    users = @(
      (New-UserRecord -Username 'admin' -Password 'admin123' -Role 'admin' -DisplayName 'SOC Admin'),
      (New-UserRecord -Username 'analyst' -Password 'analyst123' -Role 'analyst' -DisplayName 'Demo Analyst'),
      (New-UserRecord -Username 'viewer' -Password 'viewer123' -Role 'viewer' -DisplayName 'Read-Only Viewer')
    )
    sessions = @()
    logs = @()
    alerts = @()
    incidents = @()
    rules = Get-DefaultRules
    audit = @()
    settings = Get-DefaultSettings
    system = [ordered]@{
      nextIds = [ordered]@{
        log      = 1
        alert    = 1
        incident = 1
        audit    = 1
        rule     = 7
      }
      lastTickUtc = (Get-Date).ToUniversalTime().ToString('o')
      theme = 'dark'
      cooldowns = [ordered]@{}
    }
  }
}

function Ensure-StateLoaded {
  if (-not (Test-Path -LiteralPath $script:DataDir)) {
    New-Item -ItemType Directory -Force -Path $script:DataDir | Out-Null
  }

  if ($null -eq $script:State) {
    if ((Test-SqlitePersistenceAvailable) -and (Test-Path -LiteralPath $script:DatabasePath -PathType Leaf)) {
      try {
        $script:PersistenceMode = 'sqlite'
        $script:State = Load-StateFromSQLite
      } catch {
        Write-Host "SQLite load failed, falling back to JSON snapshot: $($_.Exception.Message)" -ForegroundColor Yellow
        Backup-CorruptDatabase
        $script:State = $null
      }
    }

    if ($null -eq $script:State -and (Test-Path -LiteralPath $script:StatePath -PathType Leaf)) {
      try {
        $script:PersistenceMode = 'json'
        $script:State = Load-StateFromSnapshot
      } catch {
        Write-Host "Snapshot load failed, seeding a fresh state: $($_.Exception.Message)" -ForegroundColor Yellow
        Backup-CorruptSnapshot
        $script:State = $null
      }
    }

    if ($null -eq $script:State) {
      $script:PersistenceMode = if (Test-SqlitePersistenceAvailable) { 'sqlite' } else { 'json' }
      $script:State = Get-SeedState
      Save-State
    }
  }

  if (-not $script:State.users) {
    $script:PersistenceMode = if (Test-SqlitePersistenceAvailable) { 'sqlite' } else { 'json' }
    $script:State = Get-SeedState
    Save-State
  }

  if (Sync-PersistenceMetadata) {
    Mark-StateDirty
  }

  if ((Test-SqlitePersistenceAvailable) -and (-not (Test-Path -LiteralPath $script:DatabasePath -PathType Leaf))) {
    $script:PersistenceMode = 'sqlite'
    Save-State
  }
}

function Get-NextId {
  param([string]$Kind)

  $next = [int]$script:State.system.nextIds[$Kind]
  $script:State.system.nextIds[$Kind] = $next + 1
  Mark-StateDirty
  return $next
}

function Get-SafeUser {
  param([hashtable]$User)

  if ($null -eq $User) {
    return $null
  }

  return [ordered]@{
    id          = $User.id
    username    = $User.username
    role        = $User.role
    displayName = $User.displayName
  }
}

function Get-PermissionsForRole {
  param([string]$Role)
  return @($script:Perms[$Role])
}

function Add-AuditEntry {
  param(
    [string]$Action,
    [string]$Target,
    [string]$Details,
    [hashtable]$Actor = $null
  )

  $entry = [ordered]@{
    id      = "AUD-{0:D5}" -f (Get-NextId -Kind 'audit')
    ts      = (Get-Date).ToUniversalTime().ToString('o')
    user    = if ($Actor) { $Actor.displayName } else { 'System' }
    role    = if ($Actor) { $Actor.role } else { 'system' }
    action  = $Action
    target  = $Target
    details = $Details
  }

  $script:State.audit = @($entry) + @($script:State.audit)
  if ($script:State.audit.Count -gt 300) {
    $script:State.audit = @($script:State.audit[0..299])
  }
  Mark-StateDirty
}

function Get-EnabledSources {
  $sources = @()
  foreach ($name in @('FIREWALL', 'SERVER', 'IDS', 'APP')) {
    if ($script:State.settings.sourcesEnabled[$name]) {
      $sources += $name
    }
  }
  return $sources
}

function Get-RandomInt {
  param([int]$Min, [int]$Max)
  return Get-Random -Minimum $Min -Maximum ($Max + 1)
}

function Get-RandomIp {
  return '{0}.{1}.{2}.{3}' -f (Get-RandomInt 11 223), (Get-RandomInt 1 254), (Get-RandomInt 1 254), (Get-RandomInt 1 254)
}

function Get-WeightedRegion {
  $total = 0
  foreach ($entry in $script:AttackRegions) {
    $total += [int]$entry.weight
  }
  $roll = Get-RandomInt 1 $total
  foreach ($region in $script:AttackRegions) {
    $roll -= [int]$region.weight
    if ($roll -le 0) {
      return $region
    }
  }
  return $script:AttackRegions[0]
}

function New-GeneratedLog {
  param(
    [string]$Source,
    [datetime]$Timestamp
  )

  $region = Get-WeightedRegion
  $ip = Get-RandomIp
  $iso = $Timestamp.ToUniversalTime().ToString('o')
  $userPool = @('admin', 'root', 'svc_api', 'deploy', 'ops')
  $record = $null

  switch ($Source) {
    'FIREWALL' {
      $templates = @(
        @{ type = 'Port Scan'; severity = 'HIGH'; category = 'Network'; message = "Port scan against 10.20.1.$(Get-RandomInt 5 25) from $ip."; noiseScore = 0.11 },
        @{ type = 'Blocked Connection'; severity = 'MEDIUM'; category = 'Network'; message = "Connection to restricted segment blocked for $ip."; noiseScore = 0.24 },
        @{ type = 'Traffic Spike'; severity = 'HIGH'; category = 'Network'; message = 'Traffic spike: 920 Mbps (baseline 250 Mbps).'; noiseScore = 0.1; baselineMbps = 250; metricMbps = 920 },
        @{ type = 'ACL Deny'; severity = 'LOW'; category = 'Network'; message = "ACL deny on dmz-core for $ip."; noiseScore = 0.32 }
      )
      $record = Get-Random -InputObject $templates
    }
    'SERVER' {
      $templates = @(
        @{ type = 'Auth Failure'; severity = 'MEDIUM'; category = 'Auth'; message = "Failed auth for $(Get-Random -InputObject $userPool) from $ip."; user = (Get-Random -InputObject $userPool); noiseScore = 0.18 },
        @{ type = 'SSH Login'; severity = 'INFO'; category = 'Auth'; message = "SSH login established from $ip."; user = (Get-Random -InputObject $userPool); noiseScore = 0.41 },
        @{ type = 'Admin Login'; severity = 'MEDIUM'; category = 'Auth'; message = "Admin access from $ip."; user = 'admin'; noiseScore = 0.16 },
        @{ type = 'CPU Spike'; severity = 'LOW'; category = 'System'; message = "CPU reached $(Get-RandomInt 82 96)% on prod-sql-02."; noiseScore = 0.27 }
      )
      $record = Get-Random -InputObject $templates
    }
    'IDS' {
      $templates = @(
        @{ type = 'Intrusion Attempt'; severity = 'HIGH'; category = 'Suspicious'; message = "Intrusion attempt blocked from $ip."; noiseScore = 0.14 },
        @{ type = 'Exploit Attempt'; severity = 'CRITICAL'; category = 'Suspicious'; message = "Exploit signature against auth gateway from $ip."; noiseScore = 0.07 },
        @{ type = 'Protocol Anomaly'; severity = 'MEDIUM'; category = 'Network'; message = "Protocol anomaly detected in TLS handshake from $ip."; noiseScore = 0.22 }
      )
      $record = Get-Random -InputObject $templates
    }
    default {
      $templates = @(
        @{ type = 'SQL Injection'; severity = 'CRITICAL'; category = 'Suspicious'; message = "SQLi payload in /api/login: '; DROP TABLE users --"; noiseScore = 0.06 },
        @{ type = 'XSS Attempt'; severity = 'HIGH'; category = 'Suspicious'; message = 'Reflected xss payload in search parameter.'; noiseScore = 0.11 },
        @{ type = 'API Error 403'; severity = 'LOW'; category = 'System'; message = "403 on /api/v2/$(Get-Random -InputObject @('users', 'reports', 'rules', 'settings'))."; noiseScore = 0.33 },
        @{ type = 'Rate Limit Hit'; severity = 'MEDIUM'; category = 'Suspicious'; message = "Rate limit exceeded for token tied to $ip."; noiseScore = 0.21 }
      )
      $record = Get-Random -InputObject $templates
    }
  }

  return [ordered]@{
    id           = "LOG-{0:D5}" -f (Get-NextId -Kind 'log')
    ts           = $iso
    source       = $Source
    type         = $record.type
    severity     = $record.severity
    category     = $record.category
    ip           = $ip
    user         = if ($record.ContainsKey('user')) { $record.user } else { $null }
    message      = $record.message
    country      = $region.country
    region       = $region.region
    lat          = $region.lat
    lon          = $region.lon
    baselineMbps = if ($record.ContainsKey('baselineMbps')) { $record.baselineMbps } else { $null }
    metricMbps   = if ($record.ContainsKey('metricMbps')) { $record.metricMbps } else { $null }
    noiseScore   = $record.noiseScore
  }
}

function Get-RecentLogsForRule {
  param(
    [string]$Type,
    [string]$Ip,
    [int]$WindowSec,
    [datetime]$Now
  )

  $threshold = $Now.AddSeconds(-1 * $WindowSec)
  return @(
    $script:State.logs | Where-Object {
      $_.type -eq $Type -and
      $_.ip -eq $Ip -and
      ([datetime]$_.ts) -ge $threshold
    }
  )
}

function Test-RuleMatch {
  param(
    [hashtable]$Rule,
    [hashtable]$Log
  )

  $ts = [datetime]$Log.ts
  switch ($Rule.kind) {
    'FAILED_LOGIN_BURST' {
      if ($Log.type -ne 'Auth Failure') { return $false }
      $recent = Get-RecentLogsForRule -Type 'Auth Failure' -Ip $Log.ip -WindowSec ([int]$Rule.windowSec) -Now $ts
      return $recent.Count -ge [int]$Rule.threshold
    }
    'PORT_SCAN' {
      if ($Log.type -ne 'Port Scan') { return $false }
      $recent = Get-RecentLogsForRule -Type 'Port Scan' -Ip $Log.ip -WindowSec ([int]$Rule.windowSec) -Now $ts
      return $recent.Count -ge [int]$Rule.threshold
    }
    'TRAFFIC_SPIKE' {
      if ($Log.type -ne 'Traffic Spike') { return $false }
      if (-not $Log.baselineMbps -or -not $Log.metricMbps) { return $false }
      return ([double]$Log.metricMbps / [double]$Log.baselineMbps) -ge [double]$Rule.threshold
    }
    'SQLI_PATTERN' {
      if ($Log.type -eq 'SQL Injection') { return $true }
      return [regex]::IsMatch([string]$Log.message, 'drop table|union select|or 1=1', 'IgnoreCase')
    }
    'AFTER_HOURS_ADMIN' {
      if ($Log.type -ne 'Admin Login') { return $false }
      $hour = ([datetime]$Log.ts).ToLocalTime().Hour
      return $hour -ge 22 -or $hour -lt 6
    }
    'KEYWORD_MATCH' {
      if ([string]::IsNullOrWhiteSpace([string]$Rule.pattern)) { return $false }
      return ([string]$Log.message).ToLowerInvariant().Contains(([string]$Rule.pattern).ToLowerInvariant())
    }
    default {
      return $false
    }
  }
}

function Find-OpenIncidentForAlert {
  param([hashtable]$Alert)

  return $script:State.incidents | Where-Object {
    $_.status -ne 'closed' -and $_.fingerprint -eq "$($Alert.ruleId)|$($Alert.ip)"
  } | Select-Object -First 1
}

function Upsert-IncidentFromAlert {
  param([hashtable]$Alert)

  $existing = Find-OpenIncidentForAlert -Alert $Alert
  if ($existing) {
    $existing.alertIds = @($existing.alertIds + @($Alert.id) | Select-Object -Unique)
    $existing.updatedAt = (Get-Date).ToUniversalTime().ToString('o')
    return
  }

  $incident = [ordered]@{
    id          = "INC-{0:D4}" -f (Get-NextId -Kind 'incident')
    title       = "$($Alert.ruleName) on $($Alert.ip)"
    severity    = $Alert.severity
    status      = 'open'
    fingerprint = "$($Alert.ruleId)|$($Alert.ip)"
    ip          = $Alert.ip
    source      = $Alert.source
    summary     = $Alert.details
    notes       = ''
    alertIds    = @($Alert.id)
    createdAt   = $Alert.ts
    updatedAt   = $Alert.ts
  }
  $script:State.incidents = @($incident) + @($script:State.incidents)
}

function Create-AlertFromRule {
  param(
    [hashtable]$Rule,
    [hashtable]$Log
  )

  $cooldownKey = "$($Rule.id)|$($Log.source)|$($Log.ip)"
  $prevTs = $script:State.system.cooldowns[$cooldownKey]
  if ($prevTs) {
    $elapsed = ([datetime]$Log.ts) - ([datetime]$prevTs)
    if ($elapsed.TotalSeconds -lt 45) {
      return $null
    }
  }

  $duplicate = $script:State.alerts | Where-Object {
    $_.status -ne 'RESOLVED' -and $_.ruleId -eq $Rule.id -and $_.ip -eq $Log.ip -and $_.source -eq $Log.source
  } | Select-Object -First 1
  if ($duplicate) {
    return $null
  }

  $fpLikely = switch ($Rule.severity) {
    'CRITICAL' { [double]$Log.noiseScore -gt 0.2 }
    'HIGH' { [double]$Log.noiseScore -gt 0.28 }
    default { [double]$Log.noiseScore -gt 0.4 }
  }

  $alert = [ordered]@{
    id                  = "ALR-{0:D5}" -f (Get-NextId -Kind 'alert')
    ts                  = $Log.ts
    ruleId              = $Rule.id
    ruleName            = $Rule.name
    severity            = $Rule.severity
    source              = $Log.source
    status              = 'OPEN'
    ip                  = $Log.ip
    details             = "$($Rule.name) | $($Log.message)"
    falsePositiveLikely = $fpLikely
    classification      = $null
    handledBy           = $null
  }

  $script:State.system.cooldowns[$cooldownKey] = $Log.ts
  $script:State.alerts = @($alert) + @($script:State.alerts)
  if ($script:State.alerts.Count -gt 300) {
    $script:State.alerts = @($script:State.alerts[0..299])
  }

  foreach ($ruleRef in $script:State.rules) {
    if ($ruleRef.id -eq $Rule.id) {
      $ruleRef.triggers = [int]$ruleRef.triggers + 1
      break
    }
  }

  Upsert-IncidentFromAlert -Alert $alert
  return $alert
}

function Push-Log {
  param([hashtable]$Log)

  $script:State.logs = @($Log) + @($script:State.logs)
  if ($script:State.logs.Count -gt [int]$script:State.settings.maxLogs) {
    $script:State.logs = @($script:State.logs[0..([int]$script:State.settings.maxLogs - 1)])
  }

  foreach ($rule in $script:State.rules) {
    if (-not $rule.enabled) { continue }
    if (Test-RuleMatch -Rule $rule -Log $Log) {
      [void](Create-AlertFromRule -Rule $rule -Log $Log)
    }
  }
}

function Invoke-SimTick {
  param([datetime]$Timestamp)

  $sources = Get-EnabledSources
  if (-not $sources.Count) {
    return
  }

  $count = Get-RandomInt 2 8
  for ($index = 0; $index -lt $count; $index += 1) {
    $source = Get-Random -InputObject $sources
    $log = New-GeneratedLog -Source $source -Timestamp $Timestamp
    Push-Log -Log $log
  }
  Mark-StateDirty
}

function Invoke-Simulation {
  $intervalMs = [Math]::Max([int]$script:State.settings.simulationIntervalMs, 1000)
  $lastTick = [datetime]$script:State.system.lastTickUtc
  $now = (Get-Date).ToUniversalTime()
  $ticks = [math]::Floor((($now - $lastTick).TotalMilliseconds) / $intervalMs)

  if ($ticks -le 0) {
    return
  }

  $ticks = [Math]::Min($ticks, 6)
  for ($step = 1; $step -le $ticks; $step += 1) {
    $tickTime = $lastTick.AddMilliseconds($intervalMs * $step)
    Invoke-SimTick -Timestamp $tickTime
  }

  $script:State.system.lastTickUtc = $lastTick.AddMilliseconds($intervalMs * $ticks).ToString('o')
  Mark-StateDirty
}

function Seed-InitialTraffic {
  if ($script:State.logs.Count -gt 0) {
    return
  }

  for ($batch = 0; $batch -lt 12; $batch += 1) {
    $ts = (Get-Date).ToUniversalTime().AddMinutes(-1 * (12 - $batch))
    Invoke-SimTick -Timestamp $ts
  }
  Add-AuditEntry -Action 'BOOTSTRAP' -Target 'SYSTEM' -Details 'Initial demo data seeded.'
}

function Get-StateSummary {
  $openAlerts = @($script:State.alerts | Where-Object { $_.status -eq 'OPEN' })
  return [ordered]@{
    logs = @($script:State.logs).Count
    alerts = @($script:State.alerts).Count
    openAlerts = $openAlerts.Count
    incidents = @($script:State.incidents).Count
    rules = @($script:State.rules).Count
    activeSessions = @($script:State.sessions).Count
    mode = $script:State.meta.mode
    version = $script:State.meta.version
  }
}

function New-BootstrapPayload {
  param([hashtable]$SessionInfo = $null)

  $user = if ($SessionInfo) { Get-SafeUser $SessionInfo.user } else { $null }
  $permissions = if ($SessionInfo) { Get-PermissionsForRole -Role $SessionInfo.user.role } else { @() }
  $now = (Get-Date).ToUniversalTime().ToString('o')
  $openAlerts = @($script:State.alerts | Where-Object { $_.status -eq 'OPEN' })

  return [ordered]@{
    app = $script:State.meta
    session = [ordered]@{
      authenticated = [bool]($null -ne $SessionInfo)
      user = $user
      permissions = $permissions
      tokenExpiresAt = if ($SessionInfo) { $SessionInfo.expiresAt } else { $null }
    }
    now = $now
    data = if ($SessionInfo) {
      [ordered]@{
        logs = $script:State.logs
        alerts = $script:State.alerts
        incidents = $script:State.incidents
        rules = $script:State.rules
        audit = $script:State.audit
        settings = $script:State.settings
      }
    } else {
      $null
    }
    summary = if ($SessionInfo) {
      [ordered]@{
        openAlerts = $openAlerts.Count
        incidents = @($script:State.incidents | Where-Object { $_.status -ne 'closed' }).Count
        criticalAlerts = @($openAlerts | Where-Object { $_.severity -eq 'CRITICAL' }).Count
        dataRetention = $script:State.settings.maxLogs
      }
    } else {
      $null
    }
  }
}

function Remove-ExpiredSessions {
  $now = (Get-Date).ToUniversalTime()
  $before = $script:State.sessions.Count
  $script:State.sessions = @($script:State.sessions | Where-Object { ([datetime]$_.expiresAt) -gt $now })
  if ($script:State.sessions.Count -ne $before) {
    Mark-StateDirty
  }
}

function Get-SessionContext {
  param($Request)

  Remove-ExpiredSessions

  $auth = $Request.Headers['Authorization']
  if ([string]::IsNullOrWhiteSpace($auth)) {
    return $null
  }

  if ($auth -notmatch '^Bearer\s+(.+)$') {
    return $null
  }

  $token = $matches[1]
  $session = $script:State.sessions | Where-Object { $_.token -eq $token } | Select-Object -First 1
  if (-not $session) {
    return $null
  }

  $user = $script:State.users | Where-Object { $_.id -eq $session.userId } | Select-Object -First 1
  if (-not $user) {
    return $null
  }

  return [ordered]@{
    token = $token
    user = $user
    expiresAt = $session.expiresAt
  }
}

function Test-Permission {
  param(
    [hashtable]$SessionInfo,
    [string]$Permission
  )

  if ($null -eq $SessionInfo) {
    return $false
  }

  return (Get-PermissionsForRole -Role $SessionInfo.user.role) -contains $Permission
}

function Get-RequestBodyJson {
  param($Request)

  if (-not $Request.HasEntityBody) {
    return $null
  }

  $reader = New-Object System.IO.StreamReader($Request.InputStream, $Request.ContentEncoding)
  $body = $reader.ReadToEnd()
  $reader.Dispose()

  if ([string]::IsNullOrWhiteSpace($body)) {
    return $null
  }

  return ConvertTo-NativeObject ($body | ConvertFrom-Json)
}

function Get-StatusText {
  param([int]$StatusCode)

  switch ($StatusCode) {
    200 { 'OK' }
    201 { 'Created' }
    400 { 'Bad Request' }
    401 { 'Unauthorized' }
    403 { 'Forbidden' }
    404 { 'Not Found' }
    500 { 'Internal Server Error' }
    default { 'OK' }
  }
}

function Send-Bytes {
  param(
    $Response,
    [byte[]]$Bytes,
    [string]$ContentType,
    [int]$StatusCode = 200
  )

  if ($Response.IsTcp) {
    $Response.Headers['Content-Type'] = $ContentType
    $Response.Headers['Content-Length'] = $Bytes.Length
    $Response.Headers['Connection'] = 'close'
    $headerLines = @("HTTP/1.1 $StatusCode $(Get-StatusText -StatusCode $StatusCode)")
    foreach ($key in $Response.Headers.Keys) {
      $headerLines += "${key}: $($Response.Headers[$key])"
    }
    $headerLines += ''
    $headerLines += ''
    $headerBytes = [System.Text.Encoding]::UTF8.GetBytes(($headerLines -join "`r`n"))
    $Response.OutputStream.Write($headerBytes, 0, $headerBytes.Length)
    if ($Bytes.Length -gt 0) {
      $Response.OutputStream.Write($Bytes, 0, $Bytes.Length)
    }
    $Response.OutputStream.Flush()
    $Response.OutputStream.Close()
    $Response.Client.Close()
    return
  }

  $Response.StatusCode = $StatusCode
  $Response.ContentType = $ContentType
  $Response.ContentLength64 = $Bytes.Length
  $Response.OutputStream.Write($Bytes, 0, $Bytes.Length)
  $Response.OutputStream.Close()
}

function Send-Json {
  param(
    $Response,
    $Payload,
    [int]$StatusCode = 200
  )

  $json = $Payload | ConvertTo-Json -Depth 20
  $bytes = [System.Text.Encoding]::UTF8.GetBytes($json)
  Send-Bytes -Response $Response -Bytes $bytes -ContentType 'application/json; charset=utf-8' -StatusCode $StatusCode
}

function Send-Text {
  param(
    $Response,
    [string]$Text,
    [string]$ContentType = 'text/plain; charset=utf-8',
    [int]$StatusCode = 200
  )

  $bytes = [System.Text.Encoding]::UTF8.GetBytes($Text)
  Send-Bytes -Response $Response -Bytes $bytes -ContentType $ContentType -StatusCode $StatusCode
}

function Send-ErrorJson {
  param(
    $Response,
    [int]$StatusCode,
    [string]$Message
  )

  Send-Json -Response $Response -StatusCode $StatusCode -Payload ([ordered]@{
    ok = $false
    error = $Message
  })
}

function Get-MimeType {
  param([string]$Path)

  switch ([System.IO.Path]::GetExtension($Path).ToLowerInvariant()) {
    '.html' { 'text/html; charset=utf-8' }
    '.css' { 'text/css; charset=utf-8' }
    '.js' { 'application/javascript; charset=utf-8' }
    '.json' { 'application/json; charset=utf-8' }
    '.svg' { 'image/svg+xml' }
    '.ico' { 'image/x-icon' }
    default { 'application/octet-stream' }
  }
}

function Serve-StaticAsset {
  param($Context)

  $requestPath = [System.Uri]::UnescapeDataString($Context.Request.Url.AbsolutePath)
  if ($requestPath -eq '/') {
    $requestPath = '/index.html'
  }

  $candidate = Join-Path $script:PublicDir $requestPath.TrimStart('/')
  $resolved = [System.IO.Path]::GetFullPath($candidate)
  $publicResolved = [System.IO.Path]::GetFullPath($script:PublicDir)

  if (-not $resolved.StartsWith($publicResolved, [System.StringComparison]::OrdinalIgnoreCase)) {
    Send-ErrorJson -Response $Context.Response -StatusCode 403 -Message 'Forbidden.'
    return
  }

  if (-not (Test-Path -LiteralPath $resolved -PathType Leaf)) {
    Send-ErrorJson -Response $Context.Response -StatusCode 404 -Message 'Asset not found.'
    return
  }

  $bytes = [System.IO.File]::ReadAllBytes($resolved)
  Send-Bytes -Response $Context.Response -Bytes $bytes -ContentType (Get-MimeType -Path $resolved)
}

function New-TcpContext {
  param(
    [System.Net.Sockets.TcpClient]$Client,
    [int]$Port
  )

  $stream = $Client.GetStream()
  $buffer = New-Object byte[] 4096
  $memory = New-Object System.IO.MemoryStream
  $headerEnd = -1

  while ($headerEnd -lt 0) {
    $read = $stream.Read($buffer, 0, $buffer.Length)
    if ($read -le 0) {
      break
    }

    $memory.Write($buffer, 0, $read)
    $snapshot = $memory.ToArray()
    $headerProbe = [System.Text.Encoding]::ASCII.GetString($snapshot)
    $headerEnd = $headerProbe.IndexOf("`r`n`r`n")

    if ($memory.Length -gt 1MB) {
      break
    }
  }

  if ($headerEnd -lt 0) {
    return $null
  }

  $requestBytes = $memory.ToArray()
  $headerLength = $headerEnd + 4
  $headerText = [System.Text.Encoding]::ASCII.GetString($requestBytes, 0, $headerLength)
  $lines = $headerText -split "`r`n"
  $requestLine = ($lines[0] -split ' ')
  $method = if ($requestLine.Length -gt 0) { $requestLine[0] } else { 'GET' }
  $rawTarget = if ($requestLine.Length -gt 1) { $requestLine[1] } else { '/' }
  $pathOnly = $rawTarget.Split('?')[0]
  $headers = @{}

  foreach ($line in $lines[1..($lines.Length - 1)]) {
    if ([string]::IsNullOrWhiteSpace($line)) {
      continue
    }
    $separator = $line.IndexOf(':')
    if ($separator -lt 1) {
      continue
    }
    $name = $line.Substring(0, $separator).Trim()
    $value = $line.Substring($separator + 1).Trim()
    $headers[$name] = $value
  }

  $contentLength = 0
  if ($headers.ContainsKey('Content-Length')) {
    [void][int]::TryParse([string]$headers['Content-Length'], [ref]$contentLength)
  }

  $bodyStream = New-Object System.IO.MemoryStream
  $existingBodyLength = $requestBytes.Length - $headerLength
  if ($existingBodyLength -gt 0) {
    $bodyStream.Write($requestBytes, $headerLength, $existingBodyLength)
  }

  while ($bodyStream.Length -lt $contentLength) {
    $remaining = [Math]::Min(4096, $contentLength - [int]$bodyStream.Length)
    $chunk = New-Object byte[] $remaining
    $read = $stream.Read($chunk, 0, $chunk.Length)
    if ($read -le 0) {
      break
    }
    $bodyStream.Write($chunk, 0, $read)
  }

  $bodyStream.Position = 0
  $uri = New-Object System.Uri("http://127.0.0.1:$Port$pathOnly")

  return [pscustomobject]@{
    Request = [pscustomobject]@{
      HttpMethod = $method
      Url = $uri
      Headers = $headers
      HasEntityBody = ($contentLength -gt 0)
      ContentEncoding = [System.Text.Encoding]::UTF8
      InputStream = $bodyStream
    }
    Response = [pscustomobject]@{
      IsTcp = $true
      Headers = @{}
      OutputStream = $stream
      Client = $Client
    }
  }
}

function Normalize-RulePayload {
  param([hashtable]$Payload, [hashtable]$Existing = $null)

  $id = if ($Payload -and -not [string]::IsNullOrWhiteSpace([string]$Payload.id)) {
    [string]$Payload.id
  } elseif ($Existing) {
    $Existing.id
  } else {
    "R{0:D3}" -f (Get-NextId -Kind 'rule')
  }

  $tags = @()
  if ($Payload -and $Payload.tags -is [string]) {
    $tags = @($Payload.tags -split ',' | ForEach-Object { $_.Trim() } | Where-Object { $_ })
  } elseif ($Payload -and $Payload.tags) {
    $tags = @($Payload.tags | ForEach-Object { [string]$_ })
  } elseif ($Existing -and $Existing.tags) {
    $tags = @($Existing.tags)
  }

  return [ordered]@{
    id          = $id
    name        = if ($Payload -and $Payload.name) { [string]$Payload.name } elseif ($Existing) { [string]$Existing.name } else { 'Untitled Rule' }
    description = if ($Payload -and $Payload.description) { [string]$Payload.description } elseif ($Existing) { [string]$Existing.description } else { '' }
    severity    = if ($Payload -and $Payload.severity) { [string]$Payload.severity } elseif ($Existing) { [string]$Existing.severity } else { 'MEDIUM' }
    tags        = $tags
    enabled     = if ($Payload -and $Payload.ContainsKey('enabled')) { [bool]$Payload.enabled } elseif ($Existing) { [bool]$Existing.enabled } else { $true }
    triggers    = if ($Existing) { [int]$Existing.triggers } else { 0 }
    kind        = if ($Payload -and $Payload.kind) { [string]$Payload.kind } elseif ($Existing) { [string]$Existing.kind } else { 'KEYWORD_MATCH' }
    threshold   = if ($Payload -and $Payload.threshold) { [int]$Payload.threshold } elseif ($Existing) { [int]$Existing.threshold } else { 1 }
    windowSec   = if ($Payload -and $Payload.windowSec) { [int]$Payload.windowSec } elseif ($Existing) { [int]$Existing.windowSec } else { 60 }
    pattern     = if ($Payload -and $Payload.pattern) { [string]$Payload.pattern } elseif ($Existing) { [string]$Existing.pattern } else { '' }
  }
}

function Reset-DemoState {
  $fresh = Get-SeedState
  $script:State.meta = $fresh.meta
  $script:State.users = $fresh.users
  $script:State.sessions = @()
  $script:State.logs = @()
  $script:State.alerts = @()
  $script:State.incidents = @()
  $script:State.rules = $fresh.rules
  $script:State.audit = @()
  $script:State.settings = $fresh.settings
  $script:State.system = $fresh.system
  Seed-InitialTraffic
  Add-AuditEntry -Action 'RESET_DEMO' -Target 'SYSTEM' -Details 'Demo data reset.'
  Mark-StateDirty
}

function Seed-IncidentScenario {
  param([hashtable]$Actor)

  $ts = (Get-Date).ToUniversalTime()
  $ip = '185.77.44.91'
  $batch = @(
    [ordered]@{ id = "LOG-{0:D5}" -f (Get-NextId -Kind 'log'); ts = $ts.ToString('o'); source = 'SERVER'; type = 'Auth Failure'; severity = 'MEDIUM'; category = 'Auth'; ip = $ip; user = 'admin'; message = "Failed auth for admin from $ip."; country = 'Russia'; region = 'Eurasia'; lat = 61.52; lon = 105.31; baselineMbps = $null; metricMbps = $null; noiseScore = 0.08 },
    [ordered]@{ id = "LOG-{0:D5}" -f (Get-NextId -Kind 'log'); ts = $ts.AddSeconds(1).ToString('o'); source = 'SERVER'; type = 'Auth Failure'; severity = 'MEDIUM'; category = 'Auth'; ip = $ip; user = 'admin'; message = "Failed auth for admin from $ip."; country = 'Russia'; region = 'Eurasia'; lat = 61.52; lon = 105.31; baselineMbps = $null; metricMbps = $null; noiseScore = 0.08 },
    [ordered]@{ id = "LOG-{0:D5}" -f (Get-NextId -Kind 'log'); ts = $ts.AddSeconds(2).ToString('o'); source = 'SERVER'; type = 'Auth Failure'; severity = 'MEDIUM'; category = 'Auth'; ip = $ip; user = 'admin'; message = "Failed auth for admin from $ip."; country = 'Russia'; region = 'Eurasia'; lat = 61.52; lon = 105.31; baselineMbps = $null; metricMbps = $null; noiseScore = 0.08 },
    [ordered]@{ id = "LOG-{0:D5}" -f (Get-NextId -Kind 'log'); ts = $ts.AddSeconds(3).ToString('o'); source = 'SERVER'; type = 'Auth Failure'; severity = 'MEDIUM'; category = 'Auth'; ip = $ip; user = 'admin'; message = "Failed auth for admin from $ip."; country = 'Russia'; region = 'Eurasia'; lat = 61.52; lon = 105.31; baselineMbps = $null; metricMbps = $null; noiseScore = 0.08 },
    [ordered]@{ id = "LOG-{0:D5}" -f (Get-NextId -Kind 'log'); ts = $ts.AddSeconds(4).ToString('o'); source = 'SERVER'; type = 'Auth Failure'; severity = 'MEDIUM'; category = 'Auth'; ip = $ip; user = 'admin'; message = "Failed auth for admin from $ip."; country = 'Russia'; region = 'Eurasia'; lat = 61.52; lon = 105.31; baselineMbps = $null; metricMbps = $null; noiseScore = 0.08 },
    [ordered]@{ id = "LOG-{0:D5}" -f (Get-NextId -Kind 'log'); ts = $ts.AddSeconds(5).ToString('o'); source = 'APP'; type = 'SQL Injection'; severity = 'CRITICAL'; category = 'Suspicious'; ip = $ip; user = $null; message = "SQLi payload in /api/orders: '; DROP TABLE users --"; country = 'Russia'; region = 'Eurasia'; lat = 61.52; lon = 105.31; baselineMbps = $null; metricMbps = $null; noiseScore = 0.04 },
    [ordered]@{ id = "LOG-{0:D5}" -f (Get-NextId -Kind 'log'); ts = $ts.AddSeconds(6).ToString('o'); source = 'FIREWALL'; type = 'Traffic Spike'; severity = 'HIGH'; category = 'Network'; ip = $ip; user = $null; message = 'Traffic spike: 950 Mbps (baseline 220 Mbps).'; country = 'Russia'; region = 'Eurasia'; lat = 61.52; lon = 105.31; baselineMbps = 220; metricMbps = 950; noiseScore = 0.05 }
  )

  foreach ($log in $batch) {
    Push-Log -Log $log
  }

  Add-AuditEntry -Action 'SEED_INCIDENT' -Target 'SIMULATION' -Details 'Brute force + SQLi + traffic spike scenario injected.' -Actor $Actor
  Mark-StateDirty
}

function Build-CsvText {
  param([string]$Kind)

  $rows = @()
  switch ($Kind) {
    'logs' {
      $rows = $script:State.logs | ForEach-Object {
        [ordered]@{
          timestamp = $_.ts
          source    = $_.source
          type      = $_.type
          severity  = $_.severity
          category  = $_.category
          ip        = $_.ip
          country   = $_.country
          message   = $_.message
        }
      }
    }
    'alerts' {
      $rows = $script:State.alerts | ForEach-Object {
        [ordered]@{
          id             = $_.id
          timestamp      = $_.ts
          rule           = $_.ruleName
          severity       = $_.severity
          source         = $_.source
          ip             = $_.ip
          status         = $_.status
          classification = $_.classification
          details        = $_.details
        }
      }
    }
    'audit' {
      $rows = $script:State.audit | ForEach-Object {
        [ordered]@{
          id        = $_.id
          timestamp = $_.ts
          user      = $_.user
          role      = $_.role
          action    = $_.action
          target    = $_.target
          details   = $_.details
        }
      }
    }
  }

  if (-not $rows.Count) {
    return ''
  }

  $headers = @($rows[0].Keys)
  $lines = @($headers -join ',')
  foreach ($row in $rows) {
    $line = foreach ($header in $headers) {
      $value = [string]$row[$header]
      if ($value -match '[,"\r\n]') {
        '"' + $value.Replace('"', '""') + '"'
      } else {
        $value
      }
    }
    $lines += ($line -join ',')
  }

  return ($lines -join "`r`n")
}

function Write-CsvResponse {
  param(
    $Response,
    [string]$Kind
  )

  $csv = Build-CsvText -Kind $Kind
  if ([string]::IsNullOrWhiteSpace($csv)) {
    Send-ErrorJson -Response $Response -StatusCode 404 -Message 'No data to export.'
    return
  }

  $filename = "projectm_{0}_{1}.csv" -f $Kind, (Get-Date -Format 'yyyy-MM-dd_HH-mm-ss')
  $Response.Headers['Content-Disposition'] = "attachment; filename=$filename"
  Send-Text -Response $Response -Text $csv -ContentType 'text/csv; charset=utf-8'
}

function Handle-ApiRequest {
  param($Context)

  $request = $Context.Request
  $response = $Context.Response
  $path = $request.Url.AbsolutePath.TrimEnd('/')
  if ([string]::IsNullOrWhiteSpace($path)) {
    $path = '/'
  }

  $method = $request.HttpMethod.ToUpperInvariant()
  $session = Get-SessionContext -Request $request

  if ($path -like '/api/*' -and $path -ne '/api/bootstrap' -and $path -ne '/api/auth/login' -and $path -ne '/api/health') {
    Invoke-Simulation
  }

  switch -Regex ("$method $path") {
    '^GET /api/health$' {
      Send-Json -Response $response -Payload ([ordered]@{
        ok      = $true
        now     = (Get-Date).ToUniversalTime().ToString('o')
        storage = [ordered]@{
          engine   = $script:PersistenceMode.ToUpperInvariant()
          database = $script:DatabasePath
          snapshot = $script:StatePath
        }
        summary = Get-StateSummary
      })
      return
    }

    '^GET /api/bootstrap$' {
      Send-Json -Response $response -Payload (New-BootstrapPayload -SessionInfo $session)
      return
    }

    '^POST /api/auth/login$' {
      $payload = Get-RequestBodyJson -Request $request
      if ($null -eq $payload) {
        Send-ErrorJson -Response $response -StatusCode 400 -Message 'Request body is required.'
        return
      }
      $username = [string]$payload.username
      $password = [string]$payload.password

      $user = $script:State.users | Where-Object { $_.username -eq $username } | Select-Object -First 1
      if (-not $user -or -not (Test-Password -Password $password -Record $user.password)) {
        Send-ErrorJson -Response $response -StatusCode 401 -Message 'Invalid credentials.'
        return
      }

      $script:State.sessions = @($script:State.sessions | Where-Object { $_.userId -ne $user.id })
      $token = New-RandomToken
      $expires = (Get-Date).ToUniversalTime().AddHours(12).ToString('o')
      $script:State.sessions = @([ordered]@{ token = $token; userId = $user.id; expiresAt = $expires }) + @($script:State.sessions)
      Add-AuditEntry -Action 'LOGIN' -Target 'SESSION' -Details "$($user.displayName) signed in." -Actor $user
      Mark-StateDirty
      Send-Json -Response $response -Payload ([ordered]@{
        ok = $true
        token = $token
        bootstrap = New-BootstrapPayload -SessionInfo ([ordered]@{ token = $token; user = $user; expiresAt = $expires })
      })
      return
    }

    '^POST /api/auth/logout$' {
      if ($session) {
        $script:State.sessions = @($script:State.sessions | Where-Object { $_.token -ne $session.token })
        Add-AuditEntry -Action 'LOGOUT' -Target 'SESSION' -Details "$($session.user.displayName) signed out." -Actor $session.user
        Mark-StateDirty
      }
      Send-Json -Response $response -Payload @{ ok = $true }
      return
    }
  }

  if (-not $session) {
    Send-ErrorJson -Response $response -StatusCode 401 -Message 'Authentication required.'
    return
  }

  switch -Regex ("$method $path") {
    '^GET /api/state$' {
      Send-Json -Response $response -Payload (New-BootstrapPayload -SessionInfo $session)
      return
    }

    '^PATCH /api/alerts/([^/]+)$' {
      if (-not (Test-Permission -SessionInfo $session -Permission 'alertsAct')) {
        Send-ErrorJson -Response $response -StatusCode 403 -Message 'No permission.'
        return
      }

      $alertId = $Matches[1]
      $payload = Get-RequestBodyJson -Request $request
      if ($null -eq $payload) {
        Send-ErrorJson -Response $response -StatusCode 400 -Message 'Request body is required.'
        return
      }
      $status = [string]$payload.status
      $alert = $script:State.alerts | Where-Object { $_.id -eq $alertId } | Select-Object -First 1
      if (-not $alert) {
        Send-ErrorJson -Response $response -StatusCode 404 -Message 'Alert not found.'
        return
      }

      switch ($status) {
        'ACK' {
          $alert.status = 'ACK'
          $alert.handledBy = $session.user.displayName
          Add-AuditEntry -Action 'ACK_ALERT' -Target $alert.id -Details "$($alert.ruleName) acknowledged." -Actor $session.user
        }
        'RESOLVED' {
          $alert.status = 'RESOLVED'
          $alert.classification = if ($payload.classification) { [string]$payload.classification } else { 'TRUE_POSITIVE' }
          $alert.handledBy = $session.user.displayName
          Add-AuditEntry -Action 'RESOLVE_ALERT' -Target $alert.id -Details "$($alert.ruleName) resolved." -Actor $session.user
        }
        'FALSE_POSITIVE' {
          $alert.status = 'RESOLVED'
          $alert.classification = 'FALSE_POSITIVE'
          $alert.falsePositiveLikely = $true
          $alert.handledBy = $session.user.displayName
          Add-AuditEntry -Action 'FALSE_POSITIVE' -Target $alert.id -Details "$($alert.ruleName) marked false positive." -Actor $session.user
        }
        default {
          Send-ErrorJson -Response $response -StatusCode 400 -Message 'Unsupported alert status.'
          return
        }
      }

      Mark-StateDirty
      Send-Json -Response $response -Payload @{ ok = $true }
      return
    }

    '^POST /api/rules$' {
      if (-not (Test-Permission -SessionInfo $session -Permission 'manageRules')) {
        Send-ErrorJson -Response $response -StatusCode 403 -Message 'No permission.'
        return
      }

      $payload = Get-RequestBodyJson -Request $request
      if ($null -eq $payload) {
        Send-ErrorJson -Response $response -StatusCode 400 -Message 'Request body is required.'
        return
      }
      $rule = Normalize-RulePayload -Payload $payload
      $script:State.rules = @($rule) + @($script:State.rules)
      Add-AuditEntry -Action 'CREATE_RULE' -Target $rule.id -Details "$($rule.name) created." -Actor $session.user
      Mark-StateDirty
      Send-Json -Response $response -Payload @{ ok = $true; rule = $rule } -StatusCode 201
      return
    }

    '^PUT /api/rules/([^/]+)$' {
      if (-not (Test-Permission -SessionInfo $session -Permission 'manageRules')) {
        Send-ErrorJson -Response $response -StatusCode 403 -Message 'No permission.'
        return
      }

      $ruleId = $Matches[1]
      $payload = Get-RequestBodyJson -Request $request
      if ($null -eq $payload) {
        Send-ErrorJson -Response $response -StatusCode 400 -Message 'Request body is required.'
        return
      }
      $index = -1
      for ($i = 0; $i -lt $script:State.rules.Count; $i += 1) {
        if ($script:State.rules[$i].id -eq $ruleId) {
          $index = $i
          break
        }
      }
      if ($index -lt 0) {
        Send-ErrorJson -Response $response -StatusCode 404 -Message 'Rule not found.'
        return
      }

      $rule = Normalize-RulePayload -Payload $payload -Existing $script:State.rules[$index]
      $script:State.rules[$index] = $rule
      Add-AuditEntry -Action 'UPDATE_RULE' -Target $rule.id -Details "$($rule.name) updated." -Actor $session.user
      Mark-StateDirty
      Send-Json -Response $response -Payload @{ ok = $true; rule = $rule }
      return
    }

    '^DELETE /api/rules/([^/]+)$' {
      if (-not (Test-Permission -SessionInfo $session -Permission 'manageRules')) {
        Send-ErrorJson -Response $response -StatusCode 403 -Message 'No permission.'
        return
      }

      $ruleId = $Matches[1]
      $rule = $script:State.rules | Where-Object { $_.id -eq $ruleId } | Select-Object -First 1
      if (-not $rule) {
        Send-ErrorJson -Response $response -StatusCode 404 -Message 'Rule not found.'
        return
      }

      $script:State.rules = @($script:State.rules | Where-Object { $_.id -ne $ruleId })
      Add-AuditEntry -Action 'DELETE_RULE' -Target $ruleId -Details "$($rule.name) deleted." -Actor $session.user
      Mark-StateDirty
      Send-Json -Response $response -Payload @{ ok = $true }
      return
    }

    '^PATCH /api/incidents/([^/]+)$' {
      if (-not (Test-Permission -SessionInfo $session -Permission 'manageIncidents')) {
        Send-ErrorJson -Response $response -StatusCode 403 -Message 'No permission.'
        return
      }

      $incidentId = $Matches[1]
      $payload = Get-RequestBodyJson -Request $request
      if ($null -eq $payload) {
        Send-ErrorJson -Response $response -StatusCode 400 -Message 'Request body is required.'
        return
      }
      $incident = $script:State.incidents | Where-Object { $_.id -eq $incidentId } | Select-Object -First 1
      if (-not $incident) {
        Send-ErrorJson -Response $response -StatusCode 404 -Message 'Incident not found.'
        return
      }

      if ($payload.status) {
        $incident.status = [string]$payload.status
      }
      if ($payload.ContainsKey('notes')) {
        $incident.notes = [string]$payload.notes
      }
      $incident.updatedAt = (Get-Date).ToUniversalTime().ToString('o')
      Add-AuditEntry -Action 'UPDATE_INCIDENT' -Target $incident.id -Details "$($incident.title) updated." -Actor $session.user
      Mark-StateDirty
      Send-Json -Response $response -Payload @{ ok = $true }
      return
    }

    '^PUT /api/settings$' {
      if (-not (Test-Permission -SessionInfo $session -Permission 'manageSettings')) {
        Send-ErrorJson -Response $response -StatusCode 403 -Message 'Admin only.'
        return
      }

      $payload = Get-RequestBodyJson -Request $request
      if ($null -eq $payload) {
        Send-ErrorJson -Response $response -StatusCode 400 -Message 'Request body is required.'
        return
      }
      $script:State.settings.simulationIntervalMs = [Math]::Max([int]$payload.simulationIntervalMs, 1000)
      $script:State.settings.licenseCapacityEps = [Math]::Max([int]$payload.licenseCapacityEps, 1)
      $script:State.settings.falsePositiveTolerance = [Math]::Max([int]$payload.falsePositiveTolerance, 1)
      $script:State.settings.maxLogs = [Math]::Max([int]$payload.maxLogs, 100)
      foreach ($sourceName in @('FIREWALL', 'SERVER', 'IDS', 'APP')) {
        if ($payload.sourcesEnabled -and $payload.sourcesEnabled.ContainsKey($sourceName)) {
          $script:State.settings.sourcesEnabled[$sourceName] = [bool]$payload.sourcesEnabled[$sourceName]
        }
      }
      if ($script:State.logs.Count -gt [int]$script:State.settings.maxLogs) {
        $script:State.logs = @($script:State.logs[0..([int]$script:State.settings.maxLogs - 1)])
      }
      Add-AuditEntry -Action 'SAVE_SETTINGS' -Target 'SETTINGS' -Details 'Settings updated.' -Actor $session.user
      Mark-StateDirty
      Send-Json -Response $response -Payload @{ ok = $true }
      return
    }

    '^POST /api/actions/seed-incident$' {
      if (-not (Test-Permission -SessionInfo $session -Permission 'manageSettings')) {
        Send-ErrorJson -Response $response -StatusCode 403 -Message 'Admin only.'
        return
      }

      Seed-IncidentScenario -Actor $session.user
      Send-Json -Response $response -Payload @{ ok = $true }
      return
    }

    '^POST /api/actions/reset$' {
      if (-not (Test-Permission -SessionInfo $session -Permission 'manageSettings')) {
        Send-ErrorJson -Response $response -StatusCode 403 -Message 'Admin only.'
        return
      }

      Reset-DemoState
      Send-Json -Response $response -Payload @{ ok = $true }
      return
    }

    '^POST /api/audit/clear$' {
      if (-not (Test-Permission -SessionInfo $session -Permission 'clearAudit')) {
        Send-ErrorJson -Response $response -StatusCode 403 -Message 'Admin only.'
        return
      }

      $script:State.audit = @()
      Add-AuditEntry -Action 'CLEAR_AUDIT' -Target 'AUDIT' -Details 'Audit log cleared.' -Actor $session.user
      Mark-StateDirty
      Send-Json -Response $response -Payload @{ ok = $true }
      return
    }

    '^GET /api/export/(logs|alerts|audit)$' {
      if (-not (Test-Permission -SessionInfo $session -Permission 'export')) {
        Send-ErrorJson -Response $response -StatusCode 403 -Message 'No permission.'
        return
      }

      $kind = $Matches[1]
      Add-AuditEntry -Action 'EXPORT' -Target $kind.ToUpperInvariant() -Details "$kind exported." -Actor $session.user
      Mark-StateDirty
      Write-CsvResponse -Response $response -Kind $kind
      return
    }

    default {
      Send-ErrorJson -Response $response -StatusCode 404 -Message 'API endpoint not found.'
      return
    }
  }
}

Ensure-StateLoaded
Seed-InitialTraffic
if ($script:StateDirty) {
  Save-State
}

$prefix = "http://$HostName`:$Port/"
$listener = $null
$transport = 'HttpListener'

try {
  $listener = New-Object System.Net.HttpListener
  $listener.Prefixes.Add($prefix)
  $listener.Start()
} catch {
  $listener = $null
  $transport = 'TcpListener fallback'
  Write-Host ''
  Write-Host 'HttpListener unavailable, switching to TcpListener fallback.' -ForegroundColor Yellow
}

Write-Host ''
Write-Host 'ProjectM SOC server is running.' -ForegroundColor Green
Write-Host "Open: $prefix" -ForegroundColor Cyan
Write-Host "Transport: $transport" -ForegroundColor DarkGray
Write-Host "Storage: $($script:PersistenceMode.ToUpperInvariant())" -ForegroundColor DarkGray
Write-Host 'Demo users: admin/admin123, analyst/analyst123, viewer/viewer123' -ForegroundColor DarkGray
Write-Host 'Press Ctrl+C to stop.' -ForegroundColor DarkGray
Write-Host ''

if ($listener) {
  try {
    while ($listener.IsListening) {
      $context = $listener.GetContext()
      try {
        $script:StateDirty = $false
        if ($context.Request.Url.AbsolutePath -like '/api/*') {
          Handle-ApiRequest -Context $context
        } else {
          Serve-StaticAsset -Context $context
        }
        if ($script:StateDirty) {
          Save-State
        }
      } catch {
        Write-Host $_.Exception.Message -ForegroundColor Red
        if ($context.Response.OutputStream.CanWrite) {
          Send-ErrorJson -Response $context.Response -StatusCode 500 -Message 'Internal server error.'
        }
      }
    }
  } finally {
    if ($listener.IsListening) {
      $listener.Stop()
    }
    $listener.Close()
  }
} else {
  $ipAddress = if ($HostName -eq 'localhost' -or $HostName -eq '127.0.0.1') {
    [System.Net.IPAddress]::Parse('127.0.0.1')
  } else {
    [System.Net.IPAddress]::Any
  }
  $tcpServer = New-Object System.Net.Sockets.TcpListener($ipAddress, $Port)
  $tcpServer.Start()

  try {
    while ($true) {
      $client = $tcpServer.AcceptTcpClient()
      $context = $null
      try {
        $context = New-TcpContext -Client $client -Port $Port
        if ($null -eq $context) {
          $client.Close()
          continue
        }

        $script:StateDirty = $false
        if ($context.Request.Url.AbsolutePath -like '/api/*') {
          Handle-ApiRequest -Context $context
        } else {
          Serve-StaticAsset -Context $context
        }
        if ($script:StateDirty) {
          Save-State
        }
      } catch {
        Write-Host $_.Exception.Message -ForegroundColor Red
        if ($context -and $context.Response) {
          try {
            Send-ErrorJson -Response $context.Response -StatusCode 500 -Message 'Internal server error.'
          } catch {
            if ($client.Connected) {
              $client.Close()
            }
          }
        } elseif ($client.Connected) {
          $client.Close()
        }
      }
    }
  } finally {
    $tcpServer.Stop()
  }
}
