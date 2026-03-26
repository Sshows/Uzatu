"use client";

import { useState } from "react";
import { siteContent } from "@/lib/site-content";
import { normalizeSubmission, validateSubmission } from "@/lib/rsvp-validation";

const initialForm = {
  fullName: "",
  contact: "",
  attendance: "yes",
  guestCount: "1",
  dietaryNotes: "",
  comment: ""
};

function saveFallback(payload) {
  const key = "qyz-uzatu-rsvp-fallback";
  const current = JSON.parse(window.localStorage.getItem(key) || "[]");
  current.push({ ...payload, savedAt: new Date().toISOString() });
  window.localStorage.setItem(key, JSON.stringify(current));
}

export default function RsvpForm() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isPending, setIsPending] = useState(false);

  function updateField(name, value) {
    setForm((current) => {
      const next = { ...current, [name]: value };
      if (name === "attendance" && value === "no") {
        next.guestCount = "0";
      }
      if (name === "attendance" && value !== "no" && Number(next.guestCount) < 1) {
        next.guestCount = "1";
      }
      return next;
    });
    setErrors((current) => ({ ...current, [name]: "" }));
    setStatus({ type: "", message: "" });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const payload = normalizeSubmission({
      ...form,
      eventType: siteContent.eventType,
      brideName: siteContent.brideName
    });
    const validationErrors = validateSubmission(payload);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus({
        type: "error",
        message: "Өтінеміз, белгіленген жолдарды тексеріп шығыңыз."
      });
      return;
    }

    setIsPending(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.errors) {
          setErrors(result.errors);
        }

        if (response.status === 503) {
          saveFallback(payload);
          setStatus({
            type: "success",
            message: siteContent.rsvp.storageErrorMessage
          });
          setForm(initialForm);
          return;
        }

        throw new Error(result.message || "Жауапты жіберу сәтсіз аяқталды.");
      }

      setForm(initialForm);
      setErrors({});
      setStatus({
        type: "success",
        message:
          result.result?.storage === "supabase"
            ? siteContent.rsvp.successMessage
            : siteContent.rsvp.localFallbackMessage
      });
    } catch {
      saveFallback(payload);
      setStatus({
        type: "success",
        message: siteContent.rsvp.localFallbackMessage
      });
      setForm(initialForm);
    } finally {
      setIsPending(false);
    }
  }

  const guestCountDisabled = form.attendance === "no";

  return (
    <form className="rsvp-card" onSubmit={handleSubmit} noValidate data-reveal>
      <div className={`field ${errors.fullName ? "field--error" : ""}`}>
        <label htmlFor="fullName">{siteContent.rsvp.fields.fullName}</label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          value={form.fullName}
          onChange={(event) => updateField("fullName", event.target.value)}
          placeholder="Айгерім Сәрсенқызы"
        />
        {errors.fullName ? <span className="field__error">{errors.fullName}</span> : null}
      </div>

      <div className={`field ${errors.contact ? "field--error" : ""}`}>
        <label htmlFor="contact">{siteContent.rsvp.fields.contact}</label>
        <input
          id="contact"
          name="contact"
          type="text"
          value={form.contact}
          onChange={(event) => updateField("contact", event.target.value)}
          placeholder="+7 (700) 000-00-00"
        />
        {errors.contact ? <span className="field__error">{errors.contact}</span> : null}
      </div>

      <div className={`field ${errors.attendance ? "field--error" : ""}`}>
        <label htmlFor="attendance">{siteContent.rsvp.fields.attendance}</label>
        <select
          id="attendance"
          name="attendance"
          value={form.attendance}
          onChange={(event) => updateField("attendance", event.target.value)}
        >
          {siteContent.rsvp.options.map((option) => (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errors.attendance ? <span className="field__error">{errors.attendance}</span> : null}
      </div>

      <div className={`field ${errors.guestCount ? "field--error" : ""}`}>
        <label htmlFor="guestCount">{siteContent.rsvp.fields.guestCount}</label>
        <input
          id="guestCount"
          name="guestCount"
          type="number"
          min={guestCountDisabled ? "0" : "1"}
          max="6"
          value={form.guestCount}
          onChange={(event) => updateField("guestCount", event.target.value)}
          disabled={guestCountDisabled}
        />
        {errors.guestCount ? <span className="field__error">{errors.guestCount}</span> : null}
      </div>

      <div className="field">
        <label htmlFor="dietaryNotes">{siteContent.rsvp.fields.dietaryNotes}</label>
        <textarea
          id="dietaryNotes"
          name="dietaryNotes"
          rows="4"
          value={form.dietaryNotes}
          onChange={(event) => updateField("dietaryNotes", event.target.value)}
          placeholder="Мысалы: жаңғаққа аллергия бар"
        />
      </div>

      <div className="field">
        <label htmlFor="comment">{siteContent.rsvp.fields.comment}</label>
        <textarea
          id="comment"
          name="comment"
          rows="4"
          value={form.comment}
          onChange={(event) => updateField("comment", event.target.value)}
          placeholder="Қосымша ақпаратыңыз болса, осында жазыңыз"
        />
      </div>

      <button className="button button--primary button--submit" type="submit" disabled={isPending}>
        {isPending ? "Жіберіліп жатыр..." : siteContent.rsvp.submitLabel}
      </button>

      {status.message ? (
        <p className={`form-status form-status--${status.type || "neutral"}`}>{status.message}</p>
      ) : null}
    </form>
  );
}
