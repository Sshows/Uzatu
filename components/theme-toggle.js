"use client";

import { useEffect, useState } from "react";
import { siteContent } from "@/lib/site-content";

const STORAGE_KEY = "wedding-theme";

function applyTheme(nextTheme) {
  const root = document.documentElement;
  root.dataset.theme = nextTheme;
  root.style.colorScheme = nextTheme === "dark" ? "dark" : "light";
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const currentTheme = document.documentElement.dataset.theme || "light";
    setTheme(currentTheme);

    function handleStorage(event) {
      if (event.key !== STORAGE_KEY || !event.newValue) {
        return;
      }

      const nextTheme = event.newValue === "dark" ? "dark" : "light";
      applyTheme(nextTheme);
      setTheme(nextTheme);
    }

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  function switchTheme(nextTheme) {
    applyTheme(nextTheme);
    window.localStorage.setItem(STORAGE_KEY, nextTheme);
    setTheme(nextTheme);
  }

  function toggleTheme() {
    switchTheme(theme === "dark" ? "light" : "dark");
  }

  return (
    <>
      <div className="theme-toggle theme-toggle--desktop" role="group" aria-label={siteContent.theme.toggleLabel}>
        <button
          type="button"
          className={`theme-toggle__button ${theme === "light" ? "is-active" : ""}`}
          aria-pressed={theme === "light"}
          onClick={() => switchTheme("light")}
        >
          <span>{siteContent.theme.lightLabel}</span>
        </button>

        <button
          type="button"
          className={`theme-toggle__button ${theme === "dark" ? "is-active" : ""}`}
          aria-pressed={theme === "dark"}
          onClick={() => switchTheme("dark")}
        >
          <span>{siteContent.theme.darkLabel}</span>
        </button>
      </div>

      <button
        type="button"
        className="theme-toggle-mobile"
        aria-label={theme === "dark" ? siteContent.theme.lightLabel : siteContent.theme.darkLabel}
        onClick={toggleTheme}
      >
        <span className="sr-only">{siteContent.theme.toggleLabel}</span>
        {theme === "dark" ? (
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="4.2" />
            <path d="M12 2.8v2.4" />
            <path d="M12 18.8v2.4" />
            <path d="M4.4 4.4 6 6" />
            <path d="M18 18 19.6 19.6" />
            <path d="M2.8 12h2.4" />
            <path d="M18.8 12h2.4" />
            <path d="M4.4 19.6 6 18" />
            <path d="M18 6 19.6 4.4" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M18.5 14.3A6.8 6.8 0 1 1 9.7 5.5a6.2 6.2 0 0 0 8.8 8.8Z" />
          </svg>
        )}
      </button>
    </>
  );
}
