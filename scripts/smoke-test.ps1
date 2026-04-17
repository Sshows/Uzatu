param(
  [int]$Port = 8080
)

$ErrorActionPreference = 'Stop'

function Invoke-JsonRequest {
  param(
    [string]$Method,
    [string]$Uri,
    [hashtable]$Headers = $null,
    [string]$Body = $null
  )

  $params = @{
    Method = $Method
    Uri = $Uri
    TimeoutSec = 3
  }

  if ($Headers) {
    $params.Headers = $Headers
  }

  if ($Body) {
    $params.ContentType = 'application/json'
    $params.Body = $Body
  }

  return Invoke-RestMethod @params
}

$baseUrl = "http://127.0.0.1:$Port"
$ruleName = "Smoke Test Rule $(Get-Date -Format 'HHmmss')"

try {
  $health = Invoke-JsonRequest -Method 'GET' -Uri "$baseUrl/api/health"
} catch {
  throw "ProjectM server is not reachable at $baseUrl. Start it first with: powershell -NoProfile -ExecutionPolicy Bypass -File .\server.ps1"
}

$bootstrap = Invoke-JsonRequest -Method 'GET' -Uri "$baseUrl/api/bootstrap"
$login = Invoke-JsonRequest -Method 'POST' -Uri "$baseUrl/api/auth/login" -Body '{"username":"admin","password":"admin123"}'
$headers = @{ Authorization = "Bearer $($login.token)" }

$stateBefore = Invoke-JsonRequest -Method 'GET' -Uri "$baseUrl/api/state" -Headers $headers

[void](Invoke-JsonRequest -Method 'POST' -Uri "$baseUrl/api/rules" -Headers $headers -Body "{""name"":""$ruleName"",""severity"":""LOW"",""description"":""Created by smoke test"",""kind"":""KEYWORD_MATCH"",""threshold"":1,""windowSec"":60,""pattern"":""403"",""tags"":""TEST"",""enabled"":true}")

$stateAfterCreate = Invoke-JsonRequest -Method 'GET' -Uri "$baseUrl/api/state" -Headers $headers
$createdRule = $stateAfterCreate.data.rules | Where-Object { $_.name -eq $ruleName } | Select-Object -First 1

if (-not $createdRule) {
  throw 'Smoke test could not find the temporary rule after creation.'
}

[void](Invoke-JsonRequest -Method 'DELETE' -Uri "$baseUrl/api/rules/$($createdRule.id)" -Headers $headers)
$stateAfterDelete = Invoke-JsonRequest -Method 'GET' -Uri "$baseUrl/api/state" -Headers $headers
[void](Invoke-JsonRequest -Method 'POST' -Uri "$baseUrl/api/auth/logout" -Headers $headers)

[pscustomobject]@{
  Port                   = $Port
  HealthOk               = [bool]$health.ok
  BootstrapAuthenticated = [bool]$bootstrap.session.authenticated
  LoginUser              = $login.bootstrap.session.user.username
  RulesBefore            = $stateBefore.data.rules.Count
  RuleCreated            = [bool]$createdRule
  RulesAfterDelete       = $stateAfterDelete.data.rules.Count
} | Format-Table -AutoSize
