import Countdown from "@/components/countdown";
import MapEmbed from "@/components/map-embed";
import RsvpForm from "@/components/rsvp-form";
import ThemeToggle from "@/components/theme-toggle";
import { siteContent } from "@/lib/site-content";

function InfoIcon({ type }) {
  const iconProps = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.7",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true"
  };

  switch (type) {
    case "date":
      return (
        <svg {...iconProps}>
          <rect x="4.5" y="5.5" width="15" height="14" rx="2.5" />
          <path d="M8 3.5v4" />
          <path d="M16 3.5v4" />
          <path d="M4.5 9.5h15" />
        </svg>
      );
    case "clock":
    case "gathering":
    case "start":
    case "end":
      return (
        <svg {...iconProps}>
          <circle cx="12" cy="12" r="7.5" />
          <path d="M12 8.5v4.2l2.8 1.7" />
        </svg>
      );
    case "city":
    case "location":
      return (
        <svg {...iconProps}>
          <path d="M12 20.5s5.5-5.6 5.5-10a5.5 5.5 0 1 0-11 0c0 4.4 5.5 10 5.5 10Z" />
          <circle cx="12" cy="10.5" r="1.85" />
        </svg>
      );
    case "venue":
      return (
        <svg {...iconProps}>
          <path d="M4 10.5 12 5l8 5.5" />
          <path d="M6.5 19.5v-6.5" />
          <path d="M12 19.5V10" />
          <path d="M17.5 19.5v-6.5" />
          <path d="M4 19.5h16" />
        </svg>
      );
    default:
      return (
        <svg {...iconProps}>
          <path d="M12 4.5 13.9 9l4.6 1.9-4.6 1.9-1.9 4.7-1.9-4.7L5.5 10.9 10.1 9 12 4.5Z" />
        </svg>
      );
  }
}

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

const mobileNavItems = [
  { href: "#details", label: "Күні" },
  { href: "#venue", label: "Мекені" },
  { href: "#timeline", label: "Бағдарлама" },
  { href: "#dress-code", label: "Dress code" },
  { href: "#rsvp", label: "RSVP" }
];

export default function HomePage() {
  return (
    <main className="site-shell">
      <ThemeToggle />

      <div className="invitation-paper">
        <section className="hero" id="top">
          <div className="container hero__inner">
            <article className="hero__panel" data-reveal>
              <p className="hero__monogram" aria-hidden="true">
                M
              </p>
              <p className="hero__eyebrow">{siteContent.hero.eyebrow}</p>
              <EditorialTitle as="h1" className="hero__title" text={siteContent.hero.title} />
              <p className="hero__subtitle">{siteContent.hero.subtitle}</p>
              <p className="hero__lead">{siteContent.hero.lead}</p>

              <div className="hero__facts" aria-label={siteContent.hero.panelLabel}>
                {siteContent.hero.facts.map((fact) => (
                  <article className="hero-fact" key={`${fact.label}-${fact.value}`}>
                    <div className="hero-fact__top">
                      <span className="info-icon info-icon--hero">
                        <InfoIcon type={fact.type} />
                      </span>
                      <p>{fact.label}</p>
                    </div>
                    <strong>{fact.value}</strong>
                  </article>
                ))}
              </div>

              <div className="hero__actions">
                <a className="button button--primary" href="#rsvp">
                  {siteContent.hero.ctaLabel}
                </a>
                <a className="button button--secondary" href="#hosts">
                  {siteContent.hero.secondaryLabel}
                </a>
              </div>

              <p className="hero__note">{siteContent.hero.noteText}</p>
            </article>
          </div>
        </section>

        <nav className="mobile-anchor-nav" aria-label="Жылдам өту">
          <div className="mobile-anchor-nav__track">
            {mobileNavItems.map((item) => (
              <a className="mobile-anchor-nav__link" href={item.href} key={item.href}>
                {item.label}
              </a>
            ))}
          </div>
        </nav>

        <section className="section hosts" id="hosts">
          <div className="container hosts__layout">
            <SectionHeading
              kicker={siteContent.hostsSection.kicker}
              title={siteContent.hostsSection.title}
              copy={siteContent.hostsSection.intro}
              centered
            />

            <article className="hosts__message" data-reveal>
              <p>{siteContent.hostsSection.closing}</p>
            </article>

            <div className="hosts__grid" data-reveal>
              <article className="host-card">
                <p className="host-card__label">{siteContent.hostsSection.fatherLabel}</p>
                <h3>{siteContent.hostsSection.fatherName}</h3>
              </article>

              <article className="host-card">
                <p className="host-card__label">{siteContent.hostsSection.motherLabel}</p>
                <h3>{siteContent.hostsSection.motherName}</h3>
              </article>
            </div>
          </div>
        </section>

        <section className="section invitation" id="invitation">
          <div className="container invitation__layout">
            <SectionHeading
              kicker={siteContent.invitation.kicker}
              title={siteContent.invitation.title}
              copy={siteContent.invitation.paragraphs[0]}
              centered
            />

            <article className="invitation__card" data-reveal>
              <div className="invitation__ornament" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              {siteContent.invitation.paragraphs.slice(1).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <p className="invitation__signature">{siteContent.invitation.signature}</p>
            </article>
          </div>
        </section>

        <section className="section countdown-section">
          <div className="container countdown-section__layout">
            <SectionHeading
              kicker={siteContent.countdown.kicker}
              title={siteContent.countdown.title}
              copy={siteContent.countdown.intro}
              centered
            />

            <Countdown
              targetIso={siteContent.event.iso}
              afterText={siteContent.countdown.afterText}
            />
          </div>
        </section>

        <section className="section section--soft" id="details">
          <div className="container details__layout">
            <SectionHeading
              kicker={siteContent.detailsSection.kicker}
              title={siteContent.detailsSection.title}
              copy={siteContent.detailsSection.intro}
              centered
            />

            <div className="details__grid" data-reveal>
              {siteContent.eventDetails.map((item) => (
                <article className="detail-card" key={`${item.type}-${item.label}`}>
                  <div className="detail-card__top">
                    <span className="info-icon info-icon--detail">
                      <InfoIcon type={item.type} />
                    </span>
                    <p className="detail-card__label">{item.label}</p>
                  </div>
                  <h3>{item.value}</h3>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="timeline">
          <div className="container timeline__layout">
            <SectionHeading
              kicker={siteContent.timeline.kicker}
              title={siteContent.timeline.title}
              copy={siteContent.timeline.intro}
              centered
            />

            <div className="timeline" data-reveal>
              {siteContent.timeline.items.map((item) => (
                <article className="timeline__item" key={`${item.time}-${item.title}`}>
                  <p className="timeline__time">{item.time}</p>
                  <div className="timeline__card">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--soft" id="venue">
          <div className="container venue__layout">
            <div className="venue__content">
              <SectionHeading
                kicker={siteContent.venue.kicker}
                title={siteContent.venue.title}
                copy={siteContent.venue.note}
                centered
              />

              <article className="venue__card" data-reveal>
                <div className="venue__row">
                  <div className="venue__row-head">
                    <span className="info-icon info-icon--venue">
                      <InfoIcon type="city" />
                    </span>
                    <p>{siteContent.venue.cityLabel}</p>
                  </div>
                  <strong>{siteContent.event.city}</strong>
                </div>
                <div className="venue__row">
                  <div className="venue__row-head">
                    <span className="info-icon info-icon--venue">
                      <InfoIcon type="venue" />
                    </span>
                    <p>{siteContent.venue.hallLabel}</p>
                  </div>
                  <strong>{siteContent.venue.hall}</strong>
                </div>
                <div className="venue__row">
                  <div className="venue__row-head">
                    <span className="info-icon info-icon--venue">
                      <InfoIcon type="location" />
                    </span>
                    <p>{siteContent.venue.addressLabel}</p>
                  </div>
                  <strong>{siteContent.venue.address}</strong>
                </div>

                <div className="venue__map-note">
                  <p className="venue__map-label">{siteContent.venue.mapLabel}</p>
                  <p>{siteContent.venue.mapPlaceholderText}</p>
                </div>

                <a
                  className="button button--primary"
                  href={siteContent.venue.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  {siteContent.venue.openMapLabel}
                </a>
              </article>
            </div>

            {siteContent.venue.embedUrl ? (
              <MapEmbed
                title={siteContent.venue.mapTitle}
                embedUrl={siteContent.venue.embedUrl}
                openUrl={siteContent.venue.mapUrl}
              />
            ) : null}
          </div>
        </section>

        <section className="section dress-code" id="dress-code">
          <div className="container dress-code__layout">
            <SectionHeading
              kicker={siteContent.dressCode.kicker}
              title={siteContent.dressCode.title}
              copy={siteContent.dressCode.intro}
              centered
            />

            <div className="dress-code__grid" data-reveal>
              <article className="dress-code__card">
                <p className="dress-code__label">{siteContent.dressCode.womenTitle}</p>
                <ul>
                  {siteContent.dressCode.womenItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>

              <article className="dress-code__card">
                <p className="dress-code__label">{siteContent.dressCode.menTitle}</p>
                <ul>
                  {siteContent.dressCode.menItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            </div>

            <article className="dress-code__palette" data-reveal>
              <p className="dress-code__label">{siteContent.dressCode.paletteLabel}</p>
              <div className="palette-strip">
                {siteContent.dressCode.palette.map((swatch) => (
                  <div className="palette-strip__item" key={swatch.name}>
                    <span
                      className="palette-strip__swatch"
                      style={{ backgroundColor: swatch.hex }}
                      aria-hidden="true"
                    />
                    <span>{swatch.name}</span>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </section>

        <section className="section section--soft" id="rsvp">
          <div className="container rsvp__layout">
            <div className="rsvp__content">
              <SectionHeading
                kicker={siteContent.rsvp.kicker}
                title={siteContent.rsvp.title}
                copy={siteContent.rsvp.intro}
                centered
              />

              <article className="rsvp__note" data-reveal>
                <p className="rsvp__note-label">{siteContent.rsvp.noteLabel}</p>
                <h3>{siteContent.rsvp.noteTitle}</h3>
                <p>{siteContent.rsvp.deadline}</p>
                <p>{siteContent.rsvp.contactNote}</p>
                <p>{siteContent.rsvp.noteBody}</p>
              </article>
            </div>

            <RsvpForm />
          </div>
        </section>
      </div>

      <footer className="footer">
        <div className="container">
          <div className="footer__inner" data-reveal>
            <p className="footer__title">{siteContent.footer.title}</p>
            <p className="footer__note">{siteContent.footer.note}</p>
            <p className="footer__sign">{siteContent.footer.sign}</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
