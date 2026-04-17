# ProjectM Defense Q&A Bank

## Why do you need testing if this is mostly infrastructure?

Because infrastructure projects still need proof of correctness. In this project we verify log collection, detection rules, performance under load, access control, and the full attack-to-alert workflow.

## What is your main integration test?

Replay of recorded SYN flood traffic. The IDS/SIEM must detect it and generate an alert with the source IP and attack description.

## What is the difference between unit and integration testing here?

Unit testing checks isolated components such as parsers, detection rules, or alert formatting. Integration testing checks the full chain from log source to SIEM, correlation rule, alert, and dashboard.

## Why is the PV diagram important?

It compares planned progress with earned value and actual cost. This is how we show whether the project stayed on schedule and within budget.

## Why use a spider diagram too?

Because EV metrics do not show the full picture. The spider diagram summarizes balance across schedule, cost, security, coverage, detection, performance, usability, and documentation.

## How do you prove the system works?

By using a test plan with functional, performance, security, unit, integration, system, and acceptance tests, each with expected results and pass/fail criteria.

## Why do you need the RTM?

The RTM proves that each important requirement is linked to design and to the tests that verify it. It prevents gaps between planning and proof.

## What is the strongest demo evidence?

The strongest evidence is the integration story: replayed SYN attack traffic must travel through the pipeline and become a visible alert with source IP and description.

## Why is the budget realistic?

Because it separates license, infrastructure, labor, training, and reserve. The EV section then shows that the final actual cost stayed slightly below the approved baseline.

## What are the main project risks?

Legacy integration, EPS overload, false positives, staff dependency, and data quality. These are supported by both the risk table and fishbone analysis.
