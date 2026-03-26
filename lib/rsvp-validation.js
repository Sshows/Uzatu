import { siteContent } from "@/lib/site-content";

const ATTENDANCE_VALUES = new Set(["yes", "maybe", "no"]);

export function normalizeSubmission(payload = {}) {
  return {
    fullName: String(payload.fullName || "").trim(),
    contact: String(payload.contact || "").trim(),
    attendance: String(payload.attendance || "").trim(),
    guestCount: Number(payload.guestCount),
    dietaryNotes: String(payload.dietaryNotes || "").trim(),
    comment: String(payload.comment || "").trim(),
    eventType: String(payload.eventType || "").trim(),
    brideName: String(payload.brideName || "").trim()
  };
}

export function validateSubmission(payload) {
  const errors = {};
  const messages = siteContent.rsvp.errors;

  if (payload.fullName.length < 2) {
    errors.fullName = messages.fullName;
  }

  if (payload.contact.length < 3) {
    errors.contact = messages.contact;
  }

  if (!ATTENDANCE_VALUES.has(payload.attendance)) {
    errors.attendance = messages.attendance;
  }

  if (Number.isNaN(payload.guestCount)) {
    errors.guestCount = messages.guestCountEmpty;
  } else if (payload.attendance === "no" && payload.guestCount !== 0) {
    errors.guestCount = messages.guestCountNo;
  } else if (payload.attendance !== "no" && (payload.guestCount < 1 || payload.guestCount > 6)) {
    errors.guestCount = messages.guestCountRange;
  }

  return errors;
}

export function buildStorageRecord(payload) {
  return {
    full_name: payload.fullName,
    contact: payload.contact,
    attendance: payload.attendance,
    guest_count: payload.guestCount,
    dietary_notes: payload.dietaryNotes || null,
    comment: payload.comment || null,
    event_type: payload.eventType || null,
    bride_name: payload.brideName || null,
    submitted_at: new Date().toISOString()
  };
}
