"use client";

import { useEffect, useState } from "react";
import { siteContent } from "@/lib/site-content";

function getTimeLeft(targetIso) {
  const difference = new Date(targetIso).getTime() - Date.now();

  if (difference <= 0) {
    return null;
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60)
  };
}

function pad(value) {
  return String(value).padStart(2, "0");
}

export default function Countdown({ targetIso, afterText }) {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(targetIso));

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTimeLeft(getTimeLeft(targetIso));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [targetIso]);

  if (!timeLeft) {
    return (
      <article className="countdown countdown--done" data-reveal>
        <p>{afterText}</p>
      </article>
    );
  }

  const items = [
    { label: siteContent.countdown.units.days, value: timeLeft.days },
    { label: siteContent.countdown.units.hours, value: timeLeft.hours },
    { label: siteContent.countdown.units.minutes, value: timeLeft.minutes },
    { label: siteContent.countdown.units.seconds, value: timeLeft.seconds }
  ];

  return (
    <article className="countdown" data-reveal>
      <div className="countdown__grid">
        {items.map((item) => (
          <div className="countdown__item" key={item.label}>
            <span className="countdown__value">{pad(item.value)}</span>
            <span className="countdown__label">{item.label}</span>
          </div>
        ))}
      </div>
    </article>
  );
}
