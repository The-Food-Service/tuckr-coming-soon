import nodemailer from "nodemailer";

export type PilotInquiryPayload = {
  name: string;
  organization: string;
  email: string;
  phone: string;
  message: string;
};

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildEmailHtml(data: PilotInquiryPayload) {
  const rows: [string, string][] = [
    ["Name", data.name],
    ["Organization / campus", data.organization],
    ["Work email", data.email],
    ["Phone", data.phone],
    ["Message", data.message],
  ];
  const rowHtml = rows
    .map(
      ([label, value]) => `
  <tr>
    <td style="padding:12px 16px;border-bottom:1px solid #e5e7eb;font-weight:600;color:#1e4a1d;width:200px;vertical-align:top;font-family:system-ui,-apple-system,sans-serif;font-size:14px;">${escapeHtml(label)}</td>
    <td style="padding:12px 16px;border-bottom:1px solid #e5e7eb;color:#374151;vertical-align:top;font-family:system-ui,-apple-system,sans-serif;font-size:14px;line-height:1.5;white-space:pre-wrap;">${escapeHtml(value)}</td>
  </tr>`,
    )
    .join("");

  return `<!DOCTYPE html>
<html>
<body style="margin:0;padding:24px;background:#f6fbf6;">
  <table role="presentation" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #6FC06E40;box-shadow:0 4px 24px rgba(30,74,29,0.08);">
    <tr>
      <td style="padding:20px 24px;background:#1e4a1d;color:#ffffff;font-family:system-ui,-apple-system,sans-serif;">
        <div style="font-size:11px;letter-spacing:0.12em;text-transform:uppercase;opacity:0.9;">Tuckr</div>
        <div style="font-size:20px;font-weight:700;margin-top:4px;">New pilot inquiry</div>
      </td>
    </tr>
    <tr>
      <td style="padding:0;">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%">${rowHtml}
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding:16px 24px;font-size:12px;color:#6b7280;font-family:system-ui,-apple-system,sans-serif;">
        Submitted via tuckr.in pilot form · Reply directly to this email to reach <strong>${escapeHtml(data.email)}</strong>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function buildEmailText(data: PilotInquiryPayload) {
  return [
    "TUCKR - NEW PILOT INQUIRY",
    "=========================",
    "",
    `Name:                 ${data.name}`,
    `Organization/campus:  ${data.organization}`,
    `Work email:           ${data.email}`,
    `Phone:                ${data.phone}`,
    "",
    "Message:",
    data.message,
    "",
    "---",
    `Reply-To: ${data.email}`,
  ].join("\n");
}

function getRecipients(): string[] {
  const raw = process.env.PILOT_INQUIRY_RECIPIENTS ?? "";
  return raw
    .split(",")
    .map((e) => e.trim())
    .filter(Boolean);
}

export async function sendPilotInquiryEmail(data: PilotInquiryPayload): Promise<void> {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD?.replace(/\s/g, "");
  const from = process.env.GMAIL_FROM;
  const to = getRecipients();

  if (!user || !pass || !from || to.length === 0) {
    throw new Error("Mail is not configured (GMAIL_*, PILOT_INQUIRY_RECIPIENTS).");
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });

  const subject = `[Tuckr Pilot] ${data.organization} | ${data.name}`;

  await transporter.sendMail({
    from,
    to: to.join(", "),
    replyTo: data.email,
    subject,
    text: buildEmailText(data),
    html: buildEmailHtml(data),
  });
}
