import ThemeToggle from "@/components/theme-toggle";
import projectmDefenseContent from "@/lib/projectm-defense-content";
import styles from "./projectm-defense.module.css";

export const metadata = {
  title: projectmDefenseContent.meta.title,
  description: projectmDefenseContent.meta.description
};

function EditorialTitle({ as: Tag = "h2", className, text }) {
  const words = String(text || "").trim().split(/\s+/);

  if (words.length < 2) {
    return <Tag className={className}>{text}</Tag>;
  }

  const [firstWord, ...restWords] = words;

  return (
    <Tag className={className}>
      <span className="title-word title-word--strong">{firstWord}</span>{" "}
      <span className="title-word">{restWords.join(" ")}</span>
    </Tag>
  );
}

function SectionHeading({ kicker, title, copy, centered = false }) {
  return (
    <div className={`section-heading ${centered ? "section-heading--center" : ""}`} data-reveal>
      <p className="section-heading__kicker">{kicker}</p>
      <EditorialTitle as="h2" className="section-heading__title" text={title} />
      <div className="section-heading__ornament" aria-hidden="true" />
      {copy ? <p className="section-heading__copy">{copy}</p> : null}
    </div>
  );
}

function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(value);
}

function buildLinePoints(values, maxValue, width, height, padding) {
  const usableWidth = width - padding * 2;
  const usableHeight = height - padding * 2;
  const step = values.length > 1 ? usableWidth / (values.length - 1) : usableWidth;

  return values
    .map((value, index) => {
      const x = padding + step * index;
      const y = height - padding - (value / maxValue) * usableHeight;
      return `${x},${y}`;
    })
    .join(" ");
}

function toRadarPoint(index, total, score, maxScore, cx, cy, radius) {
  const angle = (-Math.PI / 2) + (index / total) * Math.PI * 2;
  const distance = (score / maxScore) * radius;
  const x = cx + Math.cos(angle) * distance;
  const y = cy + Math.sin(angle) * distance;
  return `${x},${y}`;
}

function polygonPoints(items, score, maxScore, cx, cy, radius) {
  return items.map((item, index) => toRadarPoint(index, items.length, score, maxScore, cx, cy, radius)).join(" ");
}

function ringPoints(items, ring, maxScore, cx, cy, radius) {
  return items.map((item, index) => toRadarPoint(index, items.length, ring, maxScore, cx, cy, radius)).join(" ");
}

function EarnedValueChart({ rows }) {
  const width = 620;
  const height = 320;
  const padding = 42;
  const maxValue = Math.max(...rows.flatMap((row) => [row.pv, row.ev, row.ac]));
  const gridLines = 5;
  const pvPoints = buildLinePoints(rows.map((row) => row.pv), maxValue, width, height, padding);
  const evPoints = buildLinePoints(rows.map((row) => row.ev), maxValue, width, height, padding);
  const acPoints = buildLinePoints(rows.map((row) => row.ac), maxValue, width, height, padding);

  return (
    <div className={styles.chartCard}>
      <div className={styles.chartLegend} aria-label="Earned value legend">
        <span className={styles.legendItem}>
          <span className={`${styles.legendSwatch} ${styles.legendPv}`} />
          PV
        </span>
        <span className={styles.legendItem}>
          <span className={`${styles.legendSwatch} ${styles.legendEv}`} />
          EV
        </span>
        <span className={styles.legendItem}>
          <span className={`${styles.legendSwatch} ${styles.legendAc}`} />
          AC
        </span>
      </div>

      <svg
        className={styles.chartSvg}
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label="Project earned value chart comparing planned value, earned value, and actual cost."
      >
        {Array.from({ length: gridLines + 1 }).map((_, index) => {
          const ratio = index / gridLines;
          const y = height - padding - ratio * (height - padding * 2);
          const value = Math.round((ratio * maxValue) / 1000) * 1000;
          return (
            <g key={`grid-${index}`}>
              <line x1={padding} y1={y} x2={width - padding} y2={y} stroke="currentColor" opacity="0.12" />
              <text x={8} y={y + 4} fontSize="11" opacity="0.65">
                {value / 1000}k
              </text>
            </g>
          );
        })}

        {rows.map((row, index) => {
          const x = padding + index * ((width - padding * 2) / (rows.length - 1));
          return (
            <text key={row.date} x={x} y={height - 12} textAnchor="middle" fontSize="11" opacity="0.75">
              {row.date}
            </text>
          );
        })}

        <polyline fill="none" stroke="var(--accent)" strokeWidth="3" points={pvPoints} />
        <polyline fill="none" stroke="var(--accent-strong)" strokeWidth="3" points={evPoints} />
        <polyline fill="none" stroke="var(--ink)" strokeWidth="3" opacity="0.65" points={acPoints} />
      </svg>

      <div className={styles.evNotes}>
        <article className={styles.noteItem}>
          <strong>{formatCurrency(rows.at(-1).pv)}</strong>
          <span>Final planned value</span>
        </article>
        <article className={styles.noteItem}>
          <strong>{rows.at(-1).cpi.toFixed(2)}</strong>
          <span>Cost Performance Index</span>
        </article>
        <article className={styles.noteItem}>
          <strong>{rows.at(-1).spi.toFixed(2)}</strong>
          <span>Schedule Performance Index</span>
        </article>
      </div>
    </div>
  );
}

function SpiderChart({ metrics }) {
  const width = 280;
  const height = 280;
  const cx = width / 2;
  const cy = height / 2;
  const radius = 88;
  const maxScore = 10;
  const rings = [2, 4, 6, 8, 10];
  const metricPolygon = metrics
    .map((metric, index) => toRadarPoint(index, metrics.length, metric.score, maxScore, cx, cy, radius))
    .join(" ");

  return (
    <div className={styles.chartCard}>
      <svg
        className={styles.chartSvg}
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label="Spider diagram summarizing project quality across key dimensions."
      >
        {rings.map((ring) => (
          <polygon
            key={ring}
            points={ringPoints(metrics, ring, maxScore, cx, cy, radius)}
            fill="none"
            stroke="currentColor"
            opacity="0.12"
          />
        ))}

        {metrics.map((metric, index) => {
          const outer = toRadarPoint(index, metrics.length, maxScore, maxScore, cx, cy, radius).split(",");
          const label = toRadarPoint(index, metrics.length, maxScore + 1.4, maxScore, cx, cy, radius).split(",");

          return (
            <g key={metric.key}>
              <line x1={cx} y1={cy} x2={outer[0]} y2={outer[1]} stroke="currentColor" opacity="0.12" />
              <text x={label[0]} y={label[1]} fontSize="11" textAnchor="middle" opacity="0.8">
                {metric.shortLabel}
              </text>
            </g>
          );
        })}

        <polygon
          points={polygonPoints(metrics, maxScore, maxScore, cx, cy, radius)}
          fill="none"
          stroke="currentColor"
          opacity="0.05"
        />
        <polygon
          points={metricPolygon}
          fill="color-mix(in srgb, var(--accent-strong) 24%, transparent)"
          stroke="var(--accent-strong)"
          strokeWidth="2.5"
        />
      </svg>

      <div className={styles.cardGrid}>
        {metrics.map((metric) => (
          <article className={styles.metricCard} key={metric.key}>
            <span className={styles.metricLabel}>{metric.shortLabel}</span>
            <strong className={styles.metricValue}>{metric.score}/10</strong>
          </article>
        ))}
      </div>
    </div>
  );
}

export default function ProjectMDefensePage() {
  const content = projectmDefenseContent;
  const finalEarnedValue = content.earnedValue.rows.at(-1);

  return (
    <main className={`site-shell ${styles.page}`}>
      <ThemeToggle />

      <div className={`invitation-paper ${styles.paper}`}>
        <section className={`section ${styles.heroSection}`}>
          <div className="container">
            <div className={styles.heroGrid}>
              <article className={styles.heroPanel} data-reveal>
                <p className={styles.eyebrow}>{content.hero.eyebrow}</p>
                <EditorialTitle as="h1" className={styles.heroTitle} text={content.hero.title} />
                <p className={styles.heroSummary}>{content.hero.summary}</p>

                <div className={styles.heroActions}>
                  <a className="button button--primary" href={content.links.liveDemo} rel="noreferrer" target="_blank">
                    Open Live Demo
                  </a>
                  <a className="button button--secondary" href={content.links.github} rel="noreferrer" target="_blank">
                    Open GitHub
                  </a>
                </div>

                <div className={styles.heroFacts}>
                  {content.projectFacts.map((fact) => (
                    <article className={styles.factCard} key={fact.label}>
                      <span className={styles.factLabel}>{fact.label}</span>
                      <strong className={styles.factValue}>{fact.value}</strong>
                    </article>
                  ))}
                </div>

                <p className={styles.callout}>
                  Main integration proof: recorded SYN attack traffic is replayed into IDS/SIEM, and ProjectM
                  must raise an alert with the attacker IP and short description.
                </p>
              </article>

              <aside className={styles.downloadPanel} data-reveal>
                <h2 className={styles.downloadPanelTitle}>Defense Pack</h2>
                <p className={styles.downloadPanelIntro}>
                  Download-ready materials for Excel, presentation prep, and defense delivery.
                </p>

                <ul className={styles.downloadList}>
                  {content.downloadFiles.map((file) => (
                    <li key={file.href}>
                      <a className={styles.downloadLink} href={file.href} target="_blank" rel="noreferrer">
                        <span>{file.label}</span>
                        <span className={styles.downloadMeta}>{file.meta}</span>
                      </a>
                    </li>
                  ))}
                </ul>

                <p className={styles.downloadFooter}>
                  English is the primary delivery language. The route stays lightweight and does not replace the
                  original ProjectM frontend or backend.
                </p>
              </aside>
            </div>
          </div>
        </section>

        <section className="section" id="overview">
          <div className="container">
            <SectionHeading
              kicker="Project Overview"
              title="What The Project Proves"
              copy="ProjectM is presented as a complete SIEM/SOAR implementation case, not only as a UI demo."
              centered
            />

            <div className={styles.twoColumn}>
              <article className={styles.card} data-reveal>
                <h3>Scope and purpose</h3>
                <p>{content.hero.summary}</p>
                <ul className={styles.bulletList}>
                  {content.successCriteria.map((criterion) => (
                    <li key={criterion}>{criterion}</li>
                  ))}
                </ul>
              </article>

              <article className={styles.highlightPanel} data-reveal>
                <h3>Academic anchors</h3>
                <p>The defense is built around the four deliverables most clearly requested by the course.</p>
                <div className={styles.kpiGrid}>
                  <article className={styles.metricCard}>
                    <span className={styles.metricLabel}>EV / PV / AC</span>
                    <strong className={styles.metricValue}>{finalEarnedValue.spi.toFixed(2)} SPI</strong>
                    <span className={styles.metricMeta}>Schedule finished on baseline.</span>
                  </article>
                  <article className={styles.metricCard}>
                    <span className={styles.metricLabel}>Spider diagram</span>
                    <strong className={styles.metricValue}>8.0 avg</strong>
                    <span className={styles.metricMeta}>Balanced across cost, security, and coverage.</span>
                  </article>
                  <article className={styles.metricCard}>
                    <span className={styles.metricLabel}>Testing matrix</span>
                    <strong className={styles.metricValue}>{content.testingMatrix.length} tests</strong>
                    <span className={styles.metricMeta}>Functional, security, performance, and E2E.</span>
                  </article>
                  <article className={styles.metricCard}>
                    <span className={styles.metricLabel}>RTM</span>
                    <strong className={styles.metricValue}>{content.traceabilityMatrix.length} reqs</strong>
                    <span className={styles.metricMeta}>Each requirement maps to proof.</span>
                  </article>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="section" id="structure">
          <div className="container">
            <SectionHeading
              kicker="WBS and OBS"
              title="Structure And Responsibilities"
              copy="The project story is grounded in work packages, owners, durations, and clear role separation."
              centered
            />

            <div className={styles.twoColumn}>
              <article className={styles.tableCard} data-reveal>
                <h3>Work Breakdown Structure</h3>
                <div className={styles.tableWrap}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th>WBS ID</th>
                        <th>Task</th>
                        <th>Owner</th>
                        <th>Duration</th>
                      </tr>
                    </thead>
                    <tbody>
                      {content.wbs.map((item) => (
                        <tr key={item.id}>
                          <td>{item.id}</td>
                          <td>{item.task}</td>
                          <td>{item.owner}</td>
                          <td>{item.duration}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </article>

              <article className={styles.card} data-reveal>
                <h3>Organizational Breakdown Structure</h3>
                <div className={styles.cardGrid}>
                  {content.obs.map((role) => (
                    <article className={styles.metricCard} key={role.role}>
                      <span className={styles.roleChip}>{role.role}</span>
                      <p className={styles.metricMeta}>{role.responsibility}</p>
                    </article>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="section" id="earned-value">
          <div className="container">
            <SectionHeading
              kicker="Earned Value"
              title="PV EV And AC Performance"
              copy="The chart and table make schedule and budget control visible in a way that a project manager can defend."
              centered
            />

            <div className={styles.twoColumn}>
              <EarnedValueChart rows={content.earnedValue.rows} />

              <article className={styles.tableCard} data-reveal>
                <h3>Final metrics</h3>
                <div className={styles.kpiGrid}>
                  <article className={styles.metricCard}>
                    <span className={styles.metricLabel}>PV</span>
                    <strong className={styles.metricValue}>{formatCurrency(finalEarnedValue.pv)}</strong>
                    <span className={styles.metricMeta}>Planned value</span>
                  </article>
                  <article className={styles.metricCard}>
                    <span className={styles.metricLabel}>EV</span>
                    <strong className={styles.metricValue}>{formatCurrency(finalEarnedValue.ev)}</strong>
                    <span className={styles.metricMeta}>Earned value</span>
                  </article>
                  <article className={styles.metricCard}>
                    <span className={styles.metricLabel}>AC</span>
                    <strong className={styles.metricValue}>{formatCurrency(finalEarnedValue.ac)}</strong>
                    <span className={styles.metricMeta}>Actual cost</span>
                  </article>
                  <article className={styles.metricCard}>
                    <span className={styles.metricLabel}>CV / SV</span>
                    <strong className={styles.metricValue}>
                      {formatCurrency(finalEarnedValue.cv)} / {formatCurrency(finalEarnedValue.sv)}
                    </strong>
                    <span className={styles.metricMeta}>Positive cost variance, zero schedule variance.</span>
                  </article>
                </div>

                <div className={styles.tableWrap}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>PV</th>
                        <th>EV</th>
                        <th>AC</th>
                        <th>CPI</th>
                        <th>SPI</th>
                      </tr>
                    </thead>
                    <tbody>
                      {content.earnedValue.rows.map((row) => (
                        <tr key={row.date}>
                          <td>{row.date}</td>
                          <td>{formatCurrency(row.pv)}</td>
                          <td>{formatCurrency(row.ev)}</td>
                          <td>{formatCurrency(row.ac)}</td>
                          <td>{row.cpi.toFixed(2)}</td>
                          <td>{row.spi.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="section" id="quality">
          <div className="container">
            <SectionHeading
              kicker="Budget and Quality"
              title="Budget Breakdown And Spider View"
              copy="Together these visuals show that the project stayed within budget while also balancing quality dimensions."
              centered
            />

            <div className={styles.twoColumn}>
              <article className={styles.tableCard} data-reveal>
                <h3>Budget allocation</h3>
                <div className={styles.tableWrap}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th>Category</th>
                        <th>Cost</th>
                        <th>Share</th>
                      </tr>
                    </thead>
                    <tbody>
                      {content.budgetBreakdown.map((item) => (
                        <tr key={item.category}>
                          <td>{item.category}</td>
                          <td>{formatCurrency(item.cost)}</td>
                          <td>{item.share}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </article>

              <article className={styles.card} data-reveal>
                <h3>Spider diagram criteria</h3>
                <SpiderChart metrics={content.spiderMetrics} />
                <p className={styles.chartExplanation}>{content.spiderExplanation}</p>
              </article>
            </div>
          </div>
        </section>

        <section className="section" id="risks">
          <div className="container">
            <SectionHeading
              kicker="Risk Story"
              title="Risk Areas And Fishbone"
              copy="The risk discussion stays concrete by linking likely failure modes to operational causes."
              centered
            />

            <div className={styles.twoColumn}>
              <article className={styles.tableCard} data-reveal>
                <h3>Risk overview</h3>
                <div className={styles.tableWrap}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th>Risk area</th>
                        <th>Level</th>
                        <th>Note</th>
                      </tr>
                    </thead>
                    <tbody>
                      {content.riskAreas.map((risk) => (
                        <tr key={risk.area}>
                          <td>{risk.area}</td>
                          <td>
                            <span className={styles.riskChip}>{risk.level}/10</span>
                          </td>
                          <td>{risk.note}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </article>

              <article className={styles.card} data-reveal>
                <h3>Fishbone root-cause summary</h3>
                <p className={styles.problemStatement}>Problem: {content.fishbone.problem}</p>
                <div className={styles.fishboneGrid}>
                  {content.fishbone.categories.map((category) => (
                    <article className={styles.fishboneCard} key={category.title}>
                      <h4>{category.title}</h4>
                      <ul className={styles.bulletList}>
                        {category.points.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </article>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="section" id="testing">
          <div className="container">
            <SectionHeading
              kicker="Testing"
              title="Testing Strategy And Matrix"
              copy="This is the clearest proof section: each test type has a visible role in verifying the system."
              centered
            />

            <div className={styles.cardGrid}>
              {content.testStrategy.map((item) => (
                <article className={styles.card} data-reveal key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.summary}</p>
                </article>
              ))}
            </div>

            <article className={styles.tableCard} data-reveal>
              <h3>Testing matrix</h3>
              <div className={styles.tableWrap}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Test ID</th>
                      <th>Type</th>
                      <th>Input / Scenario</th>
                      <th>Expected output</th>
                      <th>Pass criteria</th>
                    </tr>
                  </thead>
                  <tbody>
                    {content.testingMatrix.map((test) => (
                      <tr key={test.id}>
                        <td>{test.id}</td>
                        <td>
                          <span className={styles.typeChip}>{test.type}</span>
                        </td>
                        <td>{test.input}</td>
                        <td>{test.expected}</td>
                        <td>{test.passCriteria}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>
          </div>
        </section>

        <section className="section" id="rtm">
          <div className="container">
            <SectionHeading
              kicker="Traceability"
              title="Requirements Traceability Matrix"
              copy="The RTM ties academic requirements to design modules and to the exact proof points used during the defense."
              centered
            />

            <article className={styles.tableCard} data-reveal>
              <div className={styles.tableWrap}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Req ID</th>
                      <th>Requirement</th>
                      <th>Risk</th>
                      <th>Design / Module</th>
                      <th>Unit</th>
                      <th>Integration</th>
                      <th>System</th>
                      <th>UAT</th>
                    </tr>
                  </thead>
                  <tbody>
                    {content.traceabilityMatrix.map((row) => (
                      <tr key={row.requirementId}>
                        <td>{row.requirementId}</td>
                        <td>{row.requirement}</td>
                        <td>{row.risk}</td>
                        <td>{row.designModule}</td>
                        <td>{row.unitTest}</td>
                        <td>{row.integrationTest}</td>
                        <td>{row.systemTest}</td>
                        <td>{row.uat}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>
          </div>
        </section>

        <section className="section" id="evidence">
          <div className="container">
            <SectionHeading
              kicker="Demo Evidence"
              title="What The Original Project Already Shows"
              copy="This route does not rebuild ProjectM. It organizes the existing demo and source materials into defense-friendly proof."
              centered
            />

            <div className={styles.evidenceGrid}>
              {content.demoEvidence.map((item) => (
                <article className={styles.card} data-reveal key={item.area}>
                  <h3>{item.area}</h3>
                  <p>{item.proof}</p>
                </article>
              ))}
            </div>

            <div className={styles.twoColumn}>
              <article className={styles.card} data-reveal>
                <h3>Source and context references</h3>
                <ul className={styles.sourceList}>
                  {content.sourceReferences.map((reference) => (
                    <li key={reference.label}>
                      <strong>{reference.label}</strong>
                      <span>{reference.kind}</span>
                      <p>{reference.value}</p>
                    </li>
                  ))}
                </ul>
              </article>

              <article className={styles.highlightPanel} data-reveal>
                <h3>Defense-ready demo flow</h3>
                <ol className={styles.numberList}>
                  <li>Show the dashboard and active alerts to establish operational context.</li>
                  <li>Explain the SYN replay integration test and expected alert output.</li>
                  <li>Open EV Metrics and WBS / OBS to switch from technical proof to PM proof.</li>
                  <li>Use fishbone and risk tables to discuss delays, false positives, and EPS load.</li>
                  <li>Close with RTM and Q&amp;A to show traceability and academic completeness.</li>
                </ol>
              </article>
            </div>
          </div>
        </section>

        <section className="section" id="qa">
          <div className="container">
            <SectionHeading
              kicker="Defense Q and A"
              title="Short Answers For Likely Questions"
              copy="These answers stay short enough for live defense but are grounded in the same source material as the charts and matrices."
              centered
            />

            <div className={styles.qaGrid}>
              {content.qaBank.map((item) => (
                <article className={styles.card} data-reveal key={item.question}>
                  <h3>{item.question}</h3>
                  <p>{item.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
