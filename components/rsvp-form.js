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
        message: siteContent.rsvp.validationMessage
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

        setStatus({
          type: "error",
          message: result.message || siteContent.rsvp.storageErrorMessage
        });
        return;
      }

      setForm(initialForm);
      setErrors({});
      setStatus({
        type: "success",
        message: siteContent.rsvp.successMessage
      });
    } catch {
      setStatus({
        type: "error",
        message: siteContent.rsvp.storageErrorMessage
      });
    } finally {
      setIsPending(false);
    }
  }

  const guestCountDisabled = form.attendance === "no";

  return (
    <form className="form-card" onSubmit={handleSubmit} noValidate data-reveal>
      <div className={`form-field ${errors.fullName ? "form-field--error" : ""}`}>
        <label htmlFor="fullName">{siteContent.rsvp.fields.fullName}</label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          autoComplete="name"
          value={form.fullName}
          onChange={(event) => updateField("fullName", event.target.value)}
          placeholder={siteContent.rsvp.placeholders.fullName}
          aria-invalid={Boolean(errors.fullName)}
        />
        {errors.fullName ? <span className="form-field__error">{errors.fullName}</span> : null}
      </div>

      <div className={`form-field ${errors.contact ? "form-field--error" : ""}`}>
        <label htmlFor="contact">{siteContent.rsvp.fields.contact}</label>
        <input
          id="contact"
          name="contact"
          type="text"
          autoComplete="tel"
          value={form.contact}
          onChange={(event) => updateField("contact", event.target.value)}
          placeholder={siteContent.rsvp.placeholders.contact}
          aria-invalid={Boolean(errors.contact)}
        />
        {errors.contact ? <span className="form-field__error">{errors.contact}</span> : null}
      </div>

      <fieldset className={`form-field ${errors.attendance ? "form-field--error" : ""}`}>
        <legend className="form-field__legend">{siteContent.rsvp.fields.attendance}</legend>
        <div className="form-choice">
          {siteContent.rsvp.options.map((option) => (
            <label
              className={`choice-chip ${form.attendance === option.value ? "is-active" : ""}`}
              key={option.value}
            >
              <input
                type="radio"
                name="attendance"
                value={option.value}
                checked={form.attendance === option.value}
                onChange={(event) => updateField("attendance", event.target.value)}
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
        {errors.attendance ? <span className="form-field__error">{errors.attendance}</span> : null}
      </fieldset>

      <div className={`form-field ${errors.guestCount ? "form-field--error" : ""}`}>
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
          aria-invalid={Boolean(errors.guestCount)}
        />
        {errors.guestCount ? <span className="form-field__error">{errors.guestCount}</span> : null}
      </div>

      <div className="form-field">
        <label htmlFor="dietaryNotes">{siteContent.rsvp.fields.dietaryNotes}</label>
        <textarea
          id="dietaryNotes"
          name="dietaryNotes"
          rows="4"
          value={form.dietaryNotes}
          onChange={(event) => updateField("dietaryNotes", event.target.value)}
          placeholder={siteContent.rsvp.placeholders.dietaryNotes}
        />
      </div>

      <div className="form-field">
        <label htmlFor="comment">{siteContent.rsvp.fields.comment}</label>
        <textarea
          id="comment"
          name="comment"
          rows="4"
          value={form.comment}
          onChange={(event) => updateField("comment", event.target.value)}
          placeholder={siteContent.rsvp.placeholders.comment}
        />
      </div>

      <button className="button button--primary button--submit" type="submit" disabled={isPending}>
        {isPending ? siteContent.rsvp.pendingLabel : siteContent.rsvp.submitLabel}
      </button>

      {status.message ? (
        <p className={`form-status form-status--${status.type || "neutral"}`}>{status.message}</p>
      ) : null}
    </form>
  );
}
