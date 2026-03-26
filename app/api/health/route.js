import { NextResponse } from "next/server";
import { getStorageMode } from "@/lib/rsvp-storage";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    ok: true,
    service: "qyz-uzatu-next",
    storage: getStorageMode()
  });
}
