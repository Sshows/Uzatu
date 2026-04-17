"use client";

import { useState } from "react";
import { siteContent } from "@/lib/site-content";

export default function MapEmbed({ title, embedUrl, openUrl }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const canEmbed = Boolean(embedUrl);

  return (
    <div className="map-panel" data-reveal>
      {isLoaded && canEmbed ? (
        <iframe
          className="map-panel__frame"
          src={embedUrl}
          title={title}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <div className="map-panel__placeholder">
          <p className="map-panel__eyebrow">{siteContent.venue.mapLabel}</p>
          <h3>{siteContent.venue.mapPlaceholderTitle}</h3>
          <p>{siteContent.venue.mapPlaceholderText}</p>

          <div className="map-panel__actions">
            {canEmbed ? (
              <button
                className="button button--secondary"
                type="button"
                onClick={() => setIsLoaded(true)}
              >
                {siteContent.venue.loadMapLabel}
              </button>
            ) : null}

            <a className="button button--primary" href={openUrl} target="_blank" rel="noreferrer">
              {siteContent.venue.openMapLabel}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
