import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE_NAME,
  createAdminSessionValue,
  getAdminCookieOptions,
  isAdminConfigured,
  validateAdminCredentials
} from "@/lib/admin-auth";

function redirectWithError(request, error) {
  return NextResponse.redirect(new URL(`/admin?error=${error}`, request.url), 303);
}

export async function POST(request) {
  if (!isAdminConfigured()) {
    return redirectWithError(request, "config");
  }

  const formData = await request.formData();
  const username = String(formData.get("username") || "").trim();
  const password = String(formData.get("password") || "");

  if (!validateAdminCredentials(username, password)) {
    return redirectWithError(request, "invalid");
  }

  const response = NextResponse.redirect(new URL("/admin", request.url), 303);
  response.cookies.set(ADMIN_COOKIE_NAME, createAdminSessionValue(), getAdminCookieOptions());
  return response;
}
