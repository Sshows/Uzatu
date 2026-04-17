import { NextResponse } from "next/server";
import { requireAdminFromRequest } from "@/lib/admin-auth";
import { getStorageMode, listSubmissions, summarizeSubmissions } from "@/lib/rsvp-storage";

export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    requireAdminFromRequest(request);

    const submissions = await listSubmissions();

    return NextResponse.json({
      ok: true,
      storageMode: getStorageMode(),
      summary: summarizeSubmissions(submissions),
      submissions
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message: error.message || "Қонақтар базасын оқу мүмкін болмады."
      },
      { status: error.statusCode || 500 }
    );
  }
}
