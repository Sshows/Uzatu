import Image from "next/image";
import Countdown from "@/components/countdown";
import MapEmbed from "@/components/map-embed";
import RevealInit from "@/components/reveal-init";
import RsvpForm from "@/components/rsvp-form";
import { siteContent } from "@/lib/site-content";

function SectionHeader({ kicker, title, copy, centered = false }) {
  return (
    <div className={`section-head ${centered ? "section-head--center" : ""}`} data-reveal>
      <p className="section-kicker">{kicker}</p>
      <h2 className="section-title">{title}</h2>
      {copy ? <p className="section-copy">{copy}</p> : null}
    </div>
  );
}

function EditorialDivider() {
  return (
    <div className="editorial-divider" data-reveal>
      <Image src={siteContent.media.divider} alt="" width={240} height={24} />
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <RevealInit />
      <main className="page-shell">
        <div className="ambient ambient--one" aria-hidden="true" />
        <div className="ambient ambient--two" aria-hidden="true" />
        <div className="ambient ambient--three" aria-hidden="true" />

        <section className="hero">
          <div className="container hero__grid">
            <div className="hero__content" data-reveal>
              <p className="hero__eyebrow">{siteContent.eventType}</p>
              <div className="hero__tag">{siteContent.heroTag}</div>
              <p className="hero__hosts">{siteContent.hosts}</p>
              <h1 className="hero__script" aria-label="MEREKE'S QYZ UZATU">
                {siteContent.heroScriptLines.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </h1>
              <p className="hero__date-city">{siteContent.heroDateCity}</p>
              <p className="hero__subtitle">{siteContent.heroSubtitle}</p>

              <div className="hero__story">
                <p className="hero__lead">{siteContent.heroLead}</p>
                <p className="hero__note">{siteContent.heroNote}</p>
              </div>

              <div className="hero__actions">
                <a className="button button--primary" href="#rsvp">
                  Қатысуымды растаймын
                </a>
                <a className="button button--ghost" href="#invitation">
                  Төмен сырғыту
                </a>
              </div>
            </div>

            <div className="hero__visual" data-reveal>
              <div className="hero__frame">
                <Image
                  src={siteContent.media.heroImage}
                  alt={`${siteContent.brideName} бейнесі`}
                  width={760}
                  height={980}
                  priority
                />
              </div>

              <div className="hero__floating hero__floating--top">
                <span>{siteContent.event.weekday}</span>
                <strong>{siteContent.event.dateLabel}</strong>
                <p>{siteContent.event.time}</p>
              </div>

              <div className="hero__floating hero__floating--bottom">
                <span>Өтетін орны</span>
                <strong>{siteContent.venue.hall}</strong>
                <p>{siteContent.venue.address}</p>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="hero__ribbon" data-reveal>
              {siteContent.heroMetrics.map((item) => (
                <article className="hero__metric" key={`${item.label}-${item.value}`}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </article>
              ))}
            </div>
          </div>
        </section>

        <EditorialDivider />

        <section className="section" id="invitation">
          <div className="container">
            <SectionHeader
              kicker={siteContent.invitation.kicker}
              title={siteContent.invitation.title}
              centered
            />

            <div className="editorial-grid">
              <article className="quote-card quote-card--feature" data-reveal>
                <p className="quote-card__lead">{siteContent.invitation.lead}</p>
                <div className="quote-card__body">
                  {siteContent.invitation.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                <p className="quote-card__signature">{siteContent.invitation.signature}</p>
              </article>

              <aside className="aside-card" data-reveal>
                <p className="aside-card__eyebrow">{siteContent.invitation.asideTitle}</p>
                <p className="aside-card__text">{siteContent.invitation.asideText}</p>
                <div className="aside-card__list">
                  {siteContent.invitation.asideItems.map((item, index) => (
                    <div className="aside-card__item" key={item}>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <p>{item}</p>
                    </div>
                  ))}
                </div>
              </aside>
            </div>
          </div>
        </section>

        <EditorialDivider />

        <section className="section section--soft">
          <div className="container">
            <SectionHeader
              kicker={siteContent.countdown.kicker}
              title={siteContent.countdown.title}
              copy={`${siteContent.event.weekday}, ${siteContent.event.dateLabel} • ${siteContent.event.time}`}
              centered
            />

            <div className="countdown-layout">
              <Countdown
                targetIso={siteContent.event.iso}
                afterText={siteContent.countdown.afterText}
              />

              <article className="countdown-note" data-reveal>
                <p className="countdown-note__eyebrow">Еске салу</p>
                <h3>{siteContent.countdown.noteTitle}</h3>
                <p>{siteContent.countdown.noteText}</p>
              </article>
            </div>
          </div>
        </section>

        <section className="section" id="timeline">
          <div className="container">
            <SectionHeader
              kicker={siteContent.timeline.kicker}
              title={siteContent.timeline.title}
              copy={siteContent.timeline.copy}
            />

            <div className="timeline-shell" data-reveal>
              <div className="timeline">
                {siteContent.timeline.items.map((item, index) => (
                  <article className="timeline__item" key={`${item.time}-${item.title}`}>
                    <div className="timeline__time">{index + 1}</div>
                    <div className="timeline__card">
                      <p className="timeline__meta">{item.time}</p>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section section--soft" id="venue">
          <div className="container">
            <SectionHeader
              kicker={siteContent.venue.kicker}
              title={siteContent.venue.title}
              copy={siteContent.venue.note}
            />

            <div className="venue-grid">
              <article className="venue-card" data-reveal>
                <p className="venue-card__label">Мекенжай</p>
                <h3>{siteContent.venue.hall}</h3>
                <p className="venue-card__address">{siteContent.venue.address}</p>
                <a className="button button--primary" href={siteContent.venue.mapUrl} target="_blank" rel="noreferrer">
                  {siteContent.venue.openMapLabel}
                </a>
              </article>

              <MapEmbed
                title={`${siteContent.venue.hall} картасы`}
                embedUrl={siteContent.venue.embedUrl}
                openUrl={siteContent.venue.mapUrl}
              />
            </div>
          </div>
        </section>

        <section className="section" id="dress-code">
          <div className="container">
            <SectionHeader
              kicker={siteContent.dressCode.kicker}
              title={siteContent.dressCode.title}
              copy={siteContent.dressCode.description}
              centered
            />

            <div className="dress-simple">
              {siteContent.dressCode.cards.map((card, index) => (
                <article className="dress-rule-card" key={card.title} data-reveal>
                  <div className="dress-rule-card__top">
                    <div className={`dress-rule-card__icon dress-rule-card__icon--${card.icon}`}>
                      {card.icon === "woman" ? (
                        <Image
                          src={siteContent.media.dressWomanImage}
                          alt=""
                          width={52}
                          height={64}
                        />
                      ) : card.icon === "man" ? (
                        <Image
                          src={siteContent.media.dressManImage}
                          alt=""
                          width={52}
                          height={64}
                        />
                      ) : (
                        <span className="dress-rule-card__badge">{String(index + 1).padStart(2, "0")}</span>
                      )}
                    </div>
                    <h3>{card.title}</h3>
                  </div>
                  <ul className="dress-rule-card__list">
                    {card.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>

            <article className="palette-card palette-card--simple" data-reveal>
              <p className="palette-card__label">{siteContent.dressCode.paletteLabel}</p>
              <div className="palette-strip">
                {siteContent.dressCode.palette.map((swatch) => (
                  <span
                    className="palette-strip__dot"
                    key={swatch.name}
                    style={{ backgroundColor: swatch.hex }}
                    aria-label={swatch.name}
                    title={swatch.name}
                  />
                ))}
              </div>
              <p className="palette-card__text">{siteContent.dressCode.paletteText}</p>
            </article>
          </div>
        </section>

        <section className="section section--soft" id="details">
          <div className="container">
            <SectionHeader
              kicker={siteContent.details.kicker}
              title={siteContent.details.title}
              centered
            />

            <div className="details-grid">
              {siteContent.details.items.map((item, index) => (
                <article className="detail-card" key={item.title} data-reveal>
                  <span className="detail-card__index">{String(index + 1).padStart(2, "0")}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--contrast" id="rsvp">
          <div className="container">
            <SectionHeader
              kicker={siteContent.rsvp.kicker}
              title={siteContent.rsvp.title}
              copy={siteContent.rsvp.intro}
              centered
            />

            <div className="rsvp-shell">
              <article className="rsvp-note" data-reveal>
                <p className="rsvp-note__label">{siteContent.rsvp.noteLabel}</p>
                <h3>{siteContent.rsvp.noteTitle}</h3>
                <p>{siteContent.rsvp.deadline}</p>
                <p>{siteContent.rsvp.contactNote}</p>
                <div className="rsvp-note__divider" />
                <p>{siteContent.rsvp.noteBody}</p>
              </article>

              <RsvpForm />
            </div>
          </div>
        </section>

        <footer className="footer">
          <EditorialDivider />
          <div className="container footer__inner" data-reveal>
            <p className="footer__title">{siteContent.footer.title}</p>
            <p className="footer__note">{siteContent.footer.note}</p>
            <p className="footer__sign">{siteContent.footer.sign}</p>
          </div>
        </footer>
      </main>
    </>
  );
}
