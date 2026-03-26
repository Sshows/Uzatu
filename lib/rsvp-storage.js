import fs from "node:fs/promises";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

const LOCAL_STORAGE_PATH = path.join(process.cwd(), "data", "rsvp-submissions.json");

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

async function appendLocal(record) {
  await fs.mkdir(path.dirname(LOCAL_STORAGE_PATH), { recursive: true });

  let current = [];
  try {
    const source = await fs.readFile(LOCAL_STORAGE_PATH, "utf8");
    current = JSON.parse(source);
    if (!Array.isArray(current)) {
      current = [];
    }
  } catch {
    current = [];
  }

  current.push(record);
  await fs.writeFile(LOCAL_STORAGE_PATH, JSON.stringify(current, null, 2), "utf8");
}

async function saveToSupabase(record) {
  const tableName = process.env.SUPABASE_RSVP_TABLE || "rsvp_submissions";
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase.from(tableName).insert(record).select("id").single();

  if (error) {
    throw new Error(`Supabase сақтау қатесі: ${error.message}`);
  }

  return {
    storage: "supabase",
    id: data?.id || null
  };
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
      id: null
    };
  }

  const error = new Error("Supabase бапталмаған. RSVP сақтау үшін орта айнымалыларын енгізіңіз.");
  error.statusCode = 503;
  error.code = "SUPABASE_NOT_CONFIGURED";
  throw error;
}
