"use client";

import { useEffect, useState } from "react";

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
    { label: "күн", value: timeLeft.days },
    { label: "сағат", value: timeLeft.hours },
    { label: "минут", value: timeLeft.minutes },
    { label: "секунд", value: timeLeft.seconds }
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
