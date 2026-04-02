import { NextResponse } from "next/server";
import { sendPilotInquiryEmail } from "@/lib/pilotMail";

const MAX_LEN = {
  name: 200,
  organization: 300,
  email: 320,
  phone: 50,
  message: 8000,
} as const;

function badRequest(message: string) {
  return NextResponse.json({ ok: false, error: message }, { status: 400 });
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return badRequest("Invalid JSON body.");
  }

  if (!body || typeof body !== "object") {
    return badRequest("Invalid payload.");
  }

  const o = body as Record<string, unknown>;
  const honeypot = typeof o.website === "string" ? o.website.trim() : "";
  if (honeypot.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const name = typeof o.name === "string" ? o.name.trim() : "";
  const organization = typeof o.organization === "string" ? o.organization.trim() : "";
  const email = typeof o.email === "string" ? o.email.trim() : "";
  const phone = typeof o.phone === "string" ? o.phone.trim() : "";
  const message = typeof o.message === "string" ? o.message.trim() : "";

  if (!name || name.length > MAX_LEN.name) {
    return badRequest("Name is required.");
  }
  if (!organization || organization.length > MAX_LEN.organization) {
    return badRequest("Organization / campus is required.");
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > MAX_LEN.email) {
    return badRequest("A valid work email is required.");
  }
  if (!phone || phone.length > MAX_LEN.phone) {
    return badRequest("Phone is required.");
  }
  if (!message || message.length > MAX_LEN.message) {
    return badRequest("Message is required.");
  }

  try {
    await sendPilotInquiryEmail({ name, organization, email, phone, message });
  } catch (err) {
    console.error("[pilot-inquiry]", err);
    return NextResponse.json(
      { ok: false, error: "Could not send email. Try again or write to hello@tuckr.in." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
