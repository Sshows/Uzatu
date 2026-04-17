import { NextResponse } from "next/server";
import { requireAdminFromRequest } from "@/lib/admin-auth";
import { listSubmissions } from "@/lib/rsvp-storage";

export const dynamic = "force-dynamic";

function escapeCsv(value) {
  const stringValue = String(value ?? "");
  return `"${stringValue.replaceAll('"', '""')}"`;
}

export async function GET(request) {
  try {
    requireAdminFromRequest(request);

    const submissions = await listSubmissions();
    const headers = [
      "submitted_at",
      "full_name",
      "contact",
      "attendance",
      "guest_count",
      "dietary_notes",
      "comment",
      "event_type",
      "bride_name"
    ];
    const rows = submissions.map((submission) =>
      [
        submission.submitted_at,
        submission.full_name,
        submission.contact,
        submission.attendance,
        submission.guest_count,
        submission.dietary_notes,
        submission.comment,
        submission.event_type,
        submission.bride_name
      ]
        .map(escapeCsv)
        .join(",")
    );
    const csv = [headers.join(","), ...rows].join("\n");

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": 'attachment; filename="rsvp-submissions.csv"'
      }
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message: error.message || "CSV экспортын дайындау мүмкін болмады."
      },
      { status: error.statusCode || 500 }
    );
  }
}
