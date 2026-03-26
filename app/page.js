import Image from "next/image";
import Countdown from "@/components/countdown";
import MapEmbed from "@/components/map-embed";
import RevealInit from "@/components/reveal-init";
import RsvpForm from "@/components/rsvp-form";
import { siteContent } from "@/lib/site-content";

function SectionHeader({ kicker, title, copy }) {
  return (
    <div className="section-head" data-reveal>
      <p className="section-kicker">{kicker}</p>
      <h2 className="section-title">{title}</h2>
      {copy ? <p className="section-copy">{copy}</p> : null}
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

        <section className="hero">
          <div className="container hero__grid">
            <div className="hero__content" data-reveal>
              <p className="hero__eyebrow">{siteContent.eventType}</p>
              <p className="hero__hosts">{siteContent.hosts}</p>
              <h1 className="hero__title">{siteContent.brideName}</h1>
              <p className="hero__subtitle">
                {siteContent.groomName} есімді аяулы жанмен жаңа өмірге қадам басар алдындағы
                жүрекке жақын кешке шақырамыз
              </p>

              <div className="hero__meta">
                <div className="meta-card">
                  <span className="meta-card__label">Күні</span>
                  <strong className="meta-card__value">{siteContent.event.dateLabel}</strong>
                </div>
                <div className="meta-card">
                  <span className="meta-card__label">Уақыты</span>
                  <strong className="meta-card__value">{siteContent.event.time}</strong>
                </div>
                <div className="meta-card meta-card--wide">
                  <span className="meta-card__label">Өтетін орны</span>
                  <strong className="meta-card__value">{siteContent.venue.hall}</strong>
                </div>
              </div>

              <p className="hero__lead">{siteContent.heroLead}</p>
              <p className="hero__note">{siteContent.heroNote}</p>

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
              <div className="hero__badge">
                <span>{siteContent.event.weekday}</span>
                <strong>{siteContent.event.dateLabel}</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="invitation">
          <div className="container">
            <SectionHeader
              kicker={siteContent.invitation.kicker}
              title={siteContent.invitation.title}
            />
            <article className="quote-card" data-reveal>
              <p className="quote-card__lead">{siteContent.invitation.lead}</p>
              <div className="quote-card__body">
                {siteContent.invitation.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <p className="quote-card__signature">{siteContent.invitation.signature}</p>
            </article>
          </div>
        </section>

        <section className="section section--soft">
          <div className="container">
            <SectionHeader
              kicker={siteContent.countdown.kicker}
              title={siteContent.countdown.title}
              copy={`${siteContent.event.weekday}, ${siteContent.event.dateLabel} • ${siteContent.event.time}`}
            />
            <Countdown
              targetIso={siteContent.event.iso}
              afterText={siteContent.countdown.afterText}
            />
          </div>
        </section>

        <section className="section" id="timeline">
          <div className="container">
            <SectionHeader
              kicker={siteContent.timeline.kicker}
              title={siteContent.timeline.title}
              copy="Кеш барысы бірізді, жайлы әрі отбасылық жылылыққа толы болып жоспарланды."
            />
            <div className="timeline">
              {siteContent.timeline.items.map((item) => (
                <article className="timeline__item" key={`${item.time}-${item.title}`} data-reveal>
                  <div className="timeline__time">{item.time}</div>
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
          <div className="container">
            <SectionHeader
              kicker={siteContent.venue.kicker}
              title={siteContent.venue.title}
              copy={siteContent.venue.note}
            />
            <div className="venue-grid">
              <article className="venue-card" data-reveal>
                <p className="venue-card__label">Зал атауы</p>
                <h3>{siteContent.venue.hall}</h3>
                <p className="venue-card__address">{siteContent.venue.address}</p>
                <a className="button button--primary" href={siteContent.venue.mapUrl} target="_blank" rel="noreferrer">
                  Картаны ашу
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
            />
            <div className="dress-code">
              <div className="dress-code__looks">
                <article className="look-card" data-reveal>
                  <div className="look-card__art">
                    <Image
                      src={siteContent.media.dressWomanImage}
                      alt="Ханымдарға арналған киім үлгісі"
                      width={260}
                      height={320}
                    />
                  </div>
                  <h3>{siteContent.dressCode.styleNotes[0].title}</h3>
                  <p>{siteContent.dressCode.styleNotes[0].description}</p>
                </article>
                <article className="look-card" data-reveal>
                  <div className="look-card__art">
                    <Image
                      src={siteContent.media.dressManImage}
                      alt="Мырзаларға арналған киім үлгісі"
                      width={260}
                      height={320}
                    />
                  </div>
                  <h3>{siteContent.dressCode.styleNotes[1].title}</h3>
                  <p>{siteContent.dressCode.styleNotes[1].description}</p>
                </article>
              </div>

              <div className="palette-card" data-reveal>
                <p className="palette-card__label">Ұсынылатын реңктер</p>
                <div className="palette-card__row">
                  {siteContent.dressCode.palette.map((swatch) => (
                    <div className="swatch" key={swatch.name}>
                      <span className="swatch__dot" style={{ backgroundColor: swatch.hex }} />
                      <span className="swatch__name">{swatch.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section section--soft" id="details">
          <div className="container">
            <SectionHeader
              kicker={siteContent.details.kicker}
              title={siteContent.details.title}
            />
            <div className="details-grid">
              {siteContent.details.items.map((item) => (
                <article className="detail-card" key={item.title} data-reveal>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="rsvp">
          <div className="container">
            <SectionHeader
              kicker={siteContent.rsvp.kicker}
              title={siteContent.rsvp.title}
              copy={siteContent.rsvp.intro}
            />
            <div className="rsvp-layout">
              <article className="rsvp-note" data-reveal>
                <p className="rsvp-note__label">Маңызды</p>
                <h3>{siteContent.eventType} кешіне жауабыңызды қалдырыңыз</h3>
                <p>{siteContent.rsvp.deadline}</p>
                <p>{siteContent.rsvp.contactNote}</p>
                <div className="rsvp-note__divider" />
                <p>
                  Қатысатыныңызды алдын ала растау арқылы біз орын жайғастыруын, дастарқанды және
                  қонақтар тізімін ұқыпты жоспарлай аламыз.
                </p>
              </article>
              <RsvpForm />
            </div>
          </div>
        </section>

        <footer className="footer">
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
