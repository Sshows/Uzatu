"use client";

import { useState } from "react";

export default function MapEmbed({ title, embedUrl, openUrl }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="map-card" data-reveal>
      {isLoaded ? (
        <iframe
          className="map-card__frame"
          src={embedUrl}
          title={title}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <div className="map-card__placeholder">
          <p className="map-card__eyebrow">Карта</p>
          <h3>Мекенжайды бір түрту арқылы ашуға болады</h3>
          <p>Алдымен карта блогын жүктеп алыңыз немесе жаңа терезеде картаны ашыңыз.</p>
          <div className="map-card__actions">
            <button className="button button--primary" type="button" onClick={() => setIsLoaded(true)}>
              Картаны жүктеу
            </button>
            <a className="button button--ghost" href={openUrl} target="_blank" rel="noreferrer">
              Сыртқы карта
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
