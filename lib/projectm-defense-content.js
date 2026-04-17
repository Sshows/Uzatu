const earnedValueRows = [
  { date: "May 15", plannedPercent: 5, actualPercent: 4, pv: 2750, ev: 2200, ac: 2500 },
  { date: "May 22", plannedPercent: 15, actualPercent: 12, pv: 8250, ev: 6600, ac: 7500 },
  { date: "May 29", plannedPercent: 30, actualPercent: 25, pv: 16500, ev: 13750, ac: 15000 },
  { date: "June 5", plannedPercent: 45, actualPercent: 40, pv: 24750, ev: 22000, ac: 23500 },
  { date: "June 12", plannedPercent: 65, actualPercent: 58, pv: 35750, ev: 31900, ac: 34500 },
  { date: "June 19", plannedPercent: 80, actualPercent: 74, pv: 44000, ev: 40700, ac: 43000 },
  { date: "June 26", plannedPercent: 95, actualPercent: 90, pv: 52250, ev: 49500, ac: 51500 },
  { date: "June 30", plannedPercent: 100, actualPercent: 100, pv: 55000, ev: 55000, ac: 54500 }
].map((row) => ({
  ...row,
  cpi: Number((row.ev / row.ac).toFixed(2)),
  spi: Number((row.ev / row.pv).toFixed(2)),
  cv: row.ev - row.ac,
  sv: row.ev - row.pv
}));

const spiderMetrics = [
  { key: "schedule", label: "Schedule Performance", shortLabel: "Schedule", score: 8 },
  { key: "cost", label: "Cost Control", shortLabel: "Cost", score: 9 },
  { key: "security", label: "Security", shortLabel: "Security", score: 9 },
  { key: "coverage", label: "Log Coverage", shortLabel: "Coverage", score: 8 },
  { key: "detection", label: "Detection Accuracy", shortLabel: "Detection", score: 8 },
  { key: "performance", label: "Performance", shortLabel: "Performance", score: 7 },
  { key: "usability", label: "Usability / Dashboard", shortLabel: "Usability", score: 8 },
  { key: "docs", label: "Documentation & Training", shortLabel: "Docs", score: 7 }
];

const budgetBreakdown = [
  { category: "SIEM License", cost: 30000, share: 54.5 },
  { category: "Infrastructure", cost: 10000, share: 18.2 },
  { category: "Integration / Labor", cost: 7000, share: 12.7 },
  { category: "Training", cost: 3000, share: 5.5 },
  { category: "Reserve", cost: 5000, share: 9.1 }
];

const testingMatrix = [
  {
    id: "FT-01",
    type: "Functional",
    input: "Send logs from firewall, server, IDS, and application sources.",
    expected: "Logs appear in the SIEM dashboard and are searchable.",
    passCriteria: "All four source types are visible and searchable."
  },
  {
    id: "FT-02",
    type: "Functional",
    input: "Replay an event that matches the brute-force rule.",
    expected: "A security alert is generated with severity, timestamp, and IP.",
    passCriteria: "Alert is visible on the alerts page and dashboard counters update."
  },
  {
    id: "PT-01",
    type: "Performance",
    input: "Simulate event throughput close to the licensed EPS limit.",
    expected: "The system remains responsive and does not crash.",
    passCriteria: "Dashboard remains usable and alert rendering stays within acceptable delay."
  },
  {
    id: "PT-02",
    type: "Performance",
    input: "Replay attack traffic under nominal operating load.",
    expected: "Alert is generated quickly enough for SOC use.",
    passCriteria: "Alert appears within 5 seconds."
  },
  {
    id: "ST-01",
    type: "Security",
    input: "Viewer account attempts to modify correlation rules.",
    expected: "Access is denied by RBAC.",
    passCriteria: "Unauthorized rule modification is blocked."
  },
  {
    id: "ST-02",
    type: "Security",
    input: "Submit invalid login credentials.",
    expected: "Authentication is rejected.",
    passCriteria: "No valid session is created."
  },
  {
    id: "UT-01",
    type: "Unit",
    input: "Single firewall log line is passed to the parser.",
    expected: "Timestamp, source, severity, and IP are parsed correctly.",
    passCriteria: "Parser output matches the expected structured event."
  },
  {
    id: "UT-02",
    type: "Unit",
    input: "SQL injection payload is passed to the rule function.",
    expected: "Rule returns a positive match.",
    passCriteria: "Detection logic returns TRUE for the malicious payload."
  },
  {
    id: "UT-03",
    type: "Unit",
    input: "Triggered event is passed to the alert formatter.",
    expected: "Alert contains rule name, severity, timestamp, and source IP.",
    passCriteria: "Formatted alert matches the expected analyst-facing structure."
  },
  {
    id: "IT-01",
    type: "Integration",
    input: "Replay recorded SYN flood traffic into IDS/SIEM ingestion.",
    expected: "System creates alert with attack description and source IP.",
    passCriteria: "Alert appears within 5 seconds and includes the attacker IP."
  },
  {
    id: "IT-02",
    type: "Integration",
    input: "Replay attack traffic through the full ingestion and correlation pipeline.",
    expected: "Logs move from source to SIEM, rule match, alert, and dashboard without loss.",
    passCriteria: "The full pipeline completes and the alert is visible to the analyst."
  },
  {
    id: "IT-03",
    type: "Integration",
    input: "Replay firewall, IDS, and application logs tied to one attack chain.",
    expected: "Related evidence is grouped into a single incident.",
    passCriteria: "Analyst sees linked context across sources."
  },
  {
    id: "SYS-01",
    type: "System",
    input: "Execute end-to-end SOC workflow from ingestion to analyst resolution.",
    expected: "Logs, alerting, acknowledgement, incident grouping, and resolution all work.",
    passCriteria: "Whole workflow completes without failure."
  },
  {
    id: "AT-01",
    type: "Acceptance",
    input: "Security analyst validates a realistic attack scenario.",
    expected: "Analyst can review alert, source IP, severity, and case details.",
    passCriteria: "Analyst confirms the system is usable for triage."
  }
];

const traceabilityMatrix = [
  {
    requirementId: "R1",
    requirement: "Collect logs from 45+ sources.",
    risk: "Integration failure",
    designModule: "Log collectors / source connectors",
    unitTest: "UT-01",
    integrationTest: "IT-02",
    systemTest: "SYS-01",
    uat: "AT-01"
  },
  {
    requirementId: "R2",
    requirement: "Detect SYN attack traffic.",
    risk: "Missed attack",
    designModule: "IDS + rule engine",
    unitTest: "UT-02",
    integrationTest: "IT-01",
    systemTest: "SYS-01",
    uat: "AT-01"
  },
  {
    requirementId: "R3",
    requirement: "Generate alert with IP and description.",
    risk: "Incorrect alert context",
    designModule: "Alert engine",
    unitTest: "UT-03",
    integrationTest: "IT-01",
    systemTest: "SYS-01",
    uat: "AT-01"
  },
  {
    requirementId: "R4",
    requirement: "Dashboard must display alerts and status.",
    risk: "Visibility failure",
    designModule: "Dashboard UI",
    unitTest: "UT-03",
    integrationTest: "IT-02",
    systemTest: "SYS-01",
    uat: "AT-01"
  },
  {
    requirementId: "R5",
    requirement: "System must handle high event rate.",
    risk: "EPS overload",
    designModule: "Performance layer",
    unitTest: "-",
    integrationTest: "IT-02",
    systemTest: "SYS-01",
    uat: "AT-01"
  },
  {
    requirementId: "R6",
    requirement: "Access control must follow roles.",
    risk: "Unauthorized change",
    designModule: "Auth / RBAC",
    unitTest: "UT-auth",
    integrationTest: "-",
    systemTest: "SYS-01",
    uat: "AT-01"
  },
  {
    requirementId: "R7",
    requirement: "False positive rate must stay at or below 15%.",
    risk: "Alert fatigue",
    designModule: "Rule tuning",
    unitTest: "UT-02",
    integrationTest: "IT-03",
    systemTest: "SYS-01",
    uat: "AT-01"
  },
  {
    requirementId: "R8",
    requirement: "Project budget must remain within $55,000.",
    risk: "Cost overrun",
    designModule: "PM control / EV metrics",
    unitTest: "-",
    integrationTest: "-",
    systemTest: "Project review",
    uat: "Sponsor acceptance"
  }
];

export const projectmDefenseContent = {
  meta: {
    title: "ProjectM SIEM Defense Route",
    description:
      "Defense-ready ProjectM SIEM/SOAR packet with EV metrics, WBS/OBS, testing matrix, RTM, demo evidence, and QA notes."
  },
  hero: {
    kicker: "Defense-ready portfolio route",
    title: "ProjectM SIEM/SOAR Implementation Defense",
    summary:
      "ProjectM is presented as a project management case plus a working SOC demo: planning, EV metrics, WBS/OBS, budget control, risk analysis, and a concrete attack-to-alert validation story.",
    callout:
      "Main integration proof: replayed SYN attack traffic must travel through IDS/SIEM and generate an alert with source IP and attack description."
  },
  links: {
    liveDemo: "https://projectm-soc-production.up.railway.app",
    github: "https://github.com/Sshows/projectm-soc"
  },
  downloadFiles: [
    { label: "Defense script", href: "/projectm-defense/defense-script.md", meta: "Markdown" },
    { label: "Slides outline", href: "/projectm-defense/slides-outline.md", meta: "Markdown" },
    { label: "Q&A bank", href: "/projectm-defense/qa-bank.md", meta: "Markdown" },
    { label: "Earned value CSV", href: "/projectm-defense/earned-value.csv", meta: "CSV" },
    { label: "Spider metrics CSV", href: "/projectm-defense/spider-metrics.csv", meta: "CSV" },
    { label: "Budget breakdown CSV", href: "/projectm-defense/budget-breakdown.csv", meta: "CSV" },
    { label: "Testing matrix CSV", href: "/projectm-defense/testing-matrix.csv", meta: "CSV" },
    { label: "RTM CSV", href: "/projectm-defense/rtm.csv", meta: "CSV" }
  ],
  projectFacts: [
    { label: "Delivery deadline", value: "June 30, 2026" },
    { label: "Budget baseline", value: "$55,000" },
    { label: "Connected sources target", value: "45 of 50" },
    { label: "Core user roles", value: "Admin, Analyst, Viewer" }
  ],
  successCriteria: [
    "The SIEM platform is deployed by June 30, 2026.",
    "At least 45 of 50 planned log sources are connected.",
    "Detection rules identify priority attacks and generate usable alerts.",
    "The project stays within the approved $55,000 budget.",
    "Administrators and analysts complete training before handover."
  ],
  wbs: [
    { id: "1", task: "Project Initiation", owner: "Project Manager", duration: "5 days" },
    { id: "2", task: "Vendor Selection", owner: "Project Manager", duration: "7 days" },
    { id: "3", task: "Infrastructure Setup", owner: "System Administrator", duration: "7 days" },
    { id: "4", task: "Log Source Integration", owner: "System Administrator", duration: "10 days" },
    { id: "5", task: "Rule Development", owner: "Security Analyst", duration: "9 days" },
    { id: "6", task: "System Testing", owner: "Analyst + SysAdmin", duration: "9 days" },
    { id: "7", task: "Documentation & Training", owner: "Documentation Specialist", duration: "5 days" },
    { id: "8", task: "Deployment", owner: "PM + SysAdmin", duration: "1 day" }
  ],
  obs: [
    {
      role: "Project Manager",
      responsibility:
        "Owns scope, planning, vendor coordination, EV reporting, and sponsor communication."
    },
    {
      role: "System Administrator",
      responsibility:
        "Builds infrastructure, integrates sources, validates connectivity, and supports deployment."
    },
    {
      role: "Security Analyst",
      responsibility:
        "Designs detection logic, validates alerts, tunes false positives, and leads testing."
    },
    {
      role: "Documentation Specialist",
      responsibility:
        "Produces user guides, training materials, and handover documentation."
    }
  ],
  earnedValue: {
    rows: earnedValueRows,
    budgetAtCompletion: 55000,
    finalMetrics: earnedValueRows[earnedValueRows.length - 1],
    notes: [
      "The project started slightly behind schedule because source integration took longer than planned.",
      "By the final milestone, SPI recovered to 1.00 and CPI ended above 1.00.",
      "Final actual cost remained below the approved baseline."
    ]
  },
  budgetBreakdown,
  spiderMetrics,
  spiderExplanation:
    "The spider view complements EV metrics by showing balance across schedule, cost, security, coverage, performance, usability, and documentation.",
  riskAreas: [
    { area: "Legacy Integration", level: 9, note: "Old systems slow down connector rollout." },
    { area: "EPS Overload", level: 8, note: "Traffic bursts can affect responsiveness." },
    { area: "False Positives", level: 7, note: "Aggressive rules can create analyst fatigue." },
    { area: "Staff Dependency", level: 8, note: "Small team raises availability risk." },
    { area: "Data Quality", level: 7, note: "Incomplete logs weaken detection quality." },
    { area: "Schedule Delay", level: 6, note: "Integration dependencies can shift milestones." },
    { area: "Budget Overrun", level: 5, note: "Reserve is available but finite." }
  ],
  fishbone: {
    problem: "Missed or delayed attack detection",
    categories: [
      { title: "People", points: ["Lack of trained analysts", "Dependence on a few technical owners"] },
      { title: "Process", points: ["Unclear escalation path", "Late sign-off on integrations"] },
      { title: "Technology", points: ["Weak rule tuning", "Low EPS headroom"] },
      { title: "Data", points: ["Missing log fields", "Low-quality source normalization"] },
      { title: "Infrastructure", points: ["Legacy systems", "Unstable connectivity to sources"] },
      { title: "Management", points: ["Delayed approvals", "Insufficient reserve usage discipline"] }
    ]
  },
  testStrategy: [
    {
      title: "Functional testing",
      summary: "Proves that logs, rules, alerts, dashboards, and reports behave as specified."
    },
    {
      title: "Performance testing",
      summary: "Measures responsiveness under high EPS and realistic attack replay."
    },
    {
      title: "Security testing",
      summary: "Validates authentication, RBAC, and session enforcement."
    },
    {
      title: "Unit testing",
      summary: "Checks parsers, rule logic, and alert formatting in isolation."
    },
    {
      title: "Integration testing",
      summary: "Validates the full pipeline from log ingestion to alert and incident views."
    },
    {
      title: "System and acceptance testing",
      summary: "Confirms the full SOC workflow is usable for analysts and stakeholders."
    }
  ],
  testingMatrix,
  traceabilityMatrix,
  demoEvidence: [
    {
      area: "Dashboard",
      proof: "Shows operational metrics such as events/min, open alerts, EPS, and recent activity."
    },
    {
      area: "Alerts / Correlation Rules",
      proof: "Demonstrates rule-triggered detections, severity handling, ACK/RESOLVE flow, and rule CRUD."
    },
    {
      area: "Attack Map",
      proof: "Visualizes attack origin regions and attack flow toward the protected target."
    },
    {
      area: "Reports",
      proof: "Summarizes triggered rules and reporting outputs suitable for review."
    },
    {
      area: "EV Metrics",
      proof: "Connects the technical demo to project-control metrics such as PV, EV, AC, CPI, and SPI."
    },
    {
      area: "WBS / OBS",
      proof: "Shows task breakdown, responsibility ownership, effort, and budget alignment."
    },
    {
      area: "Fishbone",
      proof: "Supports root-cause and risk discussion during the defense."
    }
  ],
  sourceReferences: [
    { label: "ProjectM live demo", kind: "External link", value: "Railway production URL" },
    { label: "ProjectM GitHub", kind: "External link", value: "Sshows/projectm-soc" },
    { label: "ProjectM_FULL_CONTEXT.txt", kind: "Local context", value: "Primary source for scope and success criteria" },
    { label: "ProjectM_SOC_v7.html", kind: "Local frontend evidence", value: "Contains EV, WBS/OBS, fishbone, reports, map, rules, incidents" },
    { label: "projectm-backend_1/projectm-backend", kind: "Local backend evidence", value: "Shows APIs, RBAC, simulator, and data model" }
  ],
  qaBank: [
    {
      question: "Why do you need testing if this is mostly infrastructure?",
      answer:
        "Because infrastructure projects still need proof of correctness. For ProjectM that proof includes log collection, rule matching, performance under load, access control, and full attack-to-alert validation."
    },
    {
      question: "What is your main integration test?",
      answer:
        "Replayed SYN flood traffic is ingested into IDS/SIEM, and the system must generate an alert with the source IP and a short attack description."
    },
    {
      question: "What is the difference between unit and integration testing here?",
      answer:
        "Unit testing checks isolated logic such as parsers or detection rules. Integration testing checks the full pipeline: source log -> SIEM -> correlation rule -> alert -> dashboard."
    },
    {
      question: "Why is the PV diagram important?",
      answer:
        "It shows planned progress against earned value and actual cost, which is how we prove the project stayed on schedule and within budget."
    },
    {
      question: "Why use a spider diagram too?",
      answer:
        "Because EV metrics alone do not show technical quality. The spider diagram summarizes balance across schedule, cost, security, coverage, detection, performance, usability, and documentation."
    },
    {
      question: "How do you prove the system is usable for analysts?",
      answer:
        "The test plan includes system and acceptance tests where a security analyst reviews alerts, source IP, severity, incident grouping, and resolution workflow."
    }
  ]
};

export default projectmDefenseContent;
