import { NextResponse } from "next/server";
import { saveSubmission } from "@/lib/rsvp-storage";
import { buildStorageRecord, normalizeSubmission, validateSubmission } from "@/lib/rsvp-validation";

export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    const body = await request.json();
    const payload = normalizeSubmission(body);
    const errors = validateSubmission(payload);

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        {
          ok: false,
          message: "Формада түзетуді қажет ететін жолдар бар.",
          errors
        },
        { status: 422 }
      );
    }

    const record = buildStorageRecord(payload);
    const result = await saveSubmission(record);

    return NextResponse.json({
      ok: true,
      message: "Жауабыңыз қабылданды.",
      result
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message: error.message || "Серверде қате орын алды."
      },
      { status: error.statusCode || 500 }
    );
  }
}
