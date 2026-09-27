import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const LEAD_EMAIL_TO = process.env.LEAD_EMAIL_TO || "sandipshaw9683@gmail.com";
const FROM_ADDRESS = process.env.LEAD_EMAIL_FROM || "NovaBuild Leads <onboarding@resend.dev>";

type LeadPayload = {
  type: "abandoned" | "submitted";
  sessionId?: string;
  name?: string;
  business?: string;
  phone?: string;
  industry?: string;
  challenge?: string;
  bookingDay?: string;
  bookingTime?: string;
};

// In-memory per-session throttle so only the latest partial state is ever emailed (resets on server restart).
const lastSentBySession = new Map<string, string>();

function hasAnyContent(data: LeadPayload) {
  return Boolean(
    data.name?.trim() ||
      data.business?.trim() ||
      data.phone?.trim() ||
      data.industry?.trim() ||
      data.challenge?.trim() ||
      data.bookingDay
  );
}

// Requires at least 7 digits so partial/placeholder typing doesn't count as a real number.
function isValidPhone(phone?: string) {
  const digits = (phone || "").replace(/\D/g, "");
  return digits.length >= 7;
}

function buildEmailBody(data: LeadPayload) {
  const rows = [
    ["Full Name", data.name],
    ["Business Name", data.business],
    ["Phone Number", data.phone],
    ["Industry", data.industry],
    ["Biggest Challenge", data.challenge],
    ["Preferred Day", data.bookingDay],
    ["Preferred Time", data.bookingTime],
  ].filter(([, value]) => value);

  return rows.map(([label, value]) => `<p><strong>${label}:</strong> ${value}</p>`).join("\n");
}

export async function POST(request: Request) {
  let data: LeadPayload;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!data.type || !["abandoned", "submitted"].includes(data.type)) {
    return NextResponse.json({ error: "Invalid lead type" }, { status: 400 });
  }

  if (!hasAnyContent(data)) {
    return NextResponse.json({ skipped: true, reason: "No content to send" });
  }

  // Abandonment emails are gated behind a real phone number; final submissions are exempt.
  if (data.type === "abandoned" && !isValidPhone(data.phone)) {
    return NextResponse.json({ skipped: true, reason: "No valid phone number captured" });
  }

  // Deduplicate: skip if this session already sent the exact same snapshot.
  const sessionId = data.sessionId || "anonymous";
  const snapshot = JSON.stringify({ ...data, sessionId: undefined });
  if (lastSentBySession.get(sessionId) === snapshot && data.type === "abandoned") {
    return NextResponse.json({ skipped: true, reason: "Duplicate of last sent state" });
  }

  const subject =
    data.type === "abandoned"
      ? "[Abandoned Lead - Phone Captured] - Partial Audit Form"
      : "[New Lead] - Free Audit Booking Request";

  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey) {
    // No email provider configured — log server-side so local dev doesn't fail silently.
    console.log(`[lead-capture] (no RESEND_API_KEY set) would send "${subject}" to ${LEAD_EMAIL_TO}:`, data);
    lastSentBySession.set(sessionId, snapshot);
    return NextResponse.json({ sent: false, simulated: true });
  }

  try {
    const resend = new Resend(resendApiKey);
    await resend.emails.send({
      from: FROM_ADDRESS,
      to: LEAD_EMAIL_TO,
      subject,
      html: buildEmailBody(data) || "<p>No details captured yet.</p>",
    });
    lastSentBySession.set(sessionId, snapshot);
    return NextResponse.json({ sent: true });
  } catch (error) {
    console.error("[lead-capture] Failed to send email:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 502 });
  }
}
