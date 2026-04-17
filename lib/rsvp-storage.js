import fs from "node:fs/promises";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

const LOCAL_STORAGE_PATH = path.join(process.cwd(), "data", "rsvp-submissions.json");
const DEFAULT_TABLE = "rsvp_submissions";

function sortNewestFirst(records) {
  return [...records].sort((left, right) => {
    const leftTime = new Date(left.submitted_at || 0).getTime();
    const rightTime = new Date(right.submitted_at || 0).getTime();
    return rightTime - leftTime;
  });
}

async function readLocalRecords() {
  try {
    const source = await fs.readFile(LOCAL_STORAGE_PATH, "utf8");
    const parsed = JSON.parse(source);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function getStorageMode() {
  if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return "supabase";
  }

  if (process.env.VERCEL) {
    return "configuration-required";
  }

  return "local-dev";
}

function createSupabaseAdminClient() {
  return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  });
}

function getTableName() {
  return process.env.SUPABASE_RSVP_TABLE || DEFAULT_TABLE;
}

async function appendLocal(record) {
  await fs.mkdir(path.dirname(LOCAL_STORAGE_PATH), { recursive: true });
  const current = await readLocalRecords();
  current.push(record);
  await fs.writeFile(LOCAL_STORAGE_PATH, JSON.stringify(current, null, 2), "utf8");
}

async function saveToSupabase(record) {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from(getTableName())
    .insert(record)
    .select("id, submitted_at")
    .single();

  if (error) {
    throw new Error(`Supabase сақтау қатесі: ${error.message}`);
  }

  return {
    storage: "supabase",
    id: data?.id || null,
    submittedAt: data?.submitted_at || record.submitted_at
  };
}

async function listFromSupabase() {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from(getTableName())
    .select(
      "id, full_name, contact, attendance, guest_count, dietary_notes, comment, event_type, bride_name, submitted_at"
    )
    .order("submitted_at", { ascending: false });

  if (error) {
    throw new Error(`Supabase оқу қатесі: ${error.message}`);
  }

  return Array.isArray(data) ? data : [];
}

function buildConfigError() {
  const error = new Error("Supabase бапталмаған. RSVP сақтау үшін орта айнымалыларын енгізіңіз.");
  error.statusCode = 503;
  error.code = "SUPABASE_NOT_CONFIGURED";
  return error;
}

export async function saveSubmission(record) {
  const storageMode = getStorageMode();

  if (storageMode === "supabase") {
    return saveToSupabase(record);
  }

  if (storageMode === "local-dev") {
    await appendLocal(record);
    return {
      storage: "local-dev",
      id: null,
      submittedAt: record.submitted_at
    };
  }

  throw buildConfigError();
}

export async function listSubmissions() {
  const storageMode = getStorageMode();

  if (storageMode === "supabase") {
    return listFromSupabase();
  }

  if (storageMode === "local-dev") {
    const localRecords = await readLocalRecords();
    return sortNewestFirst(localRecords);
  }

  throw buildConfigError();
}

export function summarizeSubmissions(submissions) {
  return submissions.reduce(
    (summary, submission) => {
      const attendance = submission.attendance || "maybe";
      const guests = Number(submission.guest_count) || 0;

      summary.totalResponses += 1;
      summary.totalGuests += guests;

      if (attendance === "yes") {
        summary.yes += 1;
      } else if (attendance === "no") {
        summary.no += 1;
      } else {
        summary.maybe += 1;
      }

      return summary;
    },
    {
      totalResponses: 0,
      totalGuests: 0,
      yes: 0,
      maybe: 0,
      no: 0
    }
  );
}
