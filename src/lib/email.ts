// Optional welcome email. Non-blocking: registration succeeds even if email fails.
// Configure via env vars:
//   Resend (recommended, free tier):  RESEND_API_KEY
//   SMTP (e.g. Gmail):               SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM
// If none are set, email is silently skipped.

const FROM_DEFAULT = "Homie <hello@homie.app>";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function welcomeEmailHtml(name: string): string {
  const greet = name ? `Hi ${escapeHtml(name)},` : "Hi there,";
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /><title>Welcome to Homie</title></head>
<body style="margin:0;padding:0;background:#000000;font-family:Inter,ui-sans-serif,system-ui,sans-serif;color:#f4efe9;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#000000;padding:48px 16px;">
    <tr><td align="center">
      <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;">
        <tr><td style="padding-bottom:32px;">
          <span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:#4490ff;box-shadow:0 0 18px rgba(68,144,255,0.8);vertical-align:middle;margin-right:10px;"></span>
          <span style="font-family:Sora,ui-sans-serif,sans-serif;font-size:14px;font-weight:700;letter-spacing:0.3em;text-transform:uppercase;color:#f4efe9;">HOMIE</span>
        </td></tr>
        <tr><td style="font-size:28px;font-weight:700;letter-spacing:-0.02em;line-height:1.05;color:#ffffff;padding-bottom:16px;">
          You&apos;re on the list<span style="color:#4490ff;">.</span>
        </td></tr>
        <tr><td style="font-size:16px;line-height:1.6;color:rgba(244,239,233,0.7);padding-bottom:24px;">
          ${greet}<br /><br />
          Thanks for joining the Homie waitlist. Homie is a free, open-source desktop
          copilot — one shortcut away. It sees your screen, reasons locally, and
          answers in place. No account. No upload.
        </td></tr>
        <tr><td style="padding:24px 0;border-top:1px solid rgba(31,41,55,0.6);border-bottom:1px solid rgba(31,41,55,0.6);">
          <p style="margin:0 0 8px;font-family:'JetBrains Mono',ui-monospace,monospace;font-size:11px;letter-spacing:0.25em;text-transform:uppercase;color:rgba(244,239,233,0.4);">What happens next</p>
          <p style="margin:0;font-size:15px;line-height:1.6;color:#f4efe9;">
            We&apos;ll email you the moment Homie ships. In the meantime, follow the
            build on GitHub.
          </p>
        </td></tr>
        <tr><td style="padding-top:24px;">
          <a href="https://github.com/sarthakshipsai/homie" style="display:inline-block;padding:12px 26px;border-radius:9999px;background:#4490ff;color:#000000;font-weight:600;font-size:14px;text-decoration:none;">View on GitHub</a>
        </td></tr>
        <tr><td style="padding-top:40px;font-size:12px;color:rgba(244,239,233,0.3);font-family:'JetBrains Mono',ui-monospace,monospace;letter-spacing:0.15em;text-transform:uppercase;">
          Free &amp; open source &middot; MIT &middot; Created by Anas &amp; Sarthak
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export async function sendWelcomeEmail(to: string, name: string): Promise<void> {
  const resendKey = process.env.RESEND_API_KEY;
  const smtpHost = process.env.SMTP_HOST;

  if (resendKey) {
    const from = process.env.RESEND_FROM || FROM_DEFAULT;
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject: "You're on the Homie waitlist",
        html: welcomeEmailHtml(name),
      }),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`Resend ${res.status}: ${text}`);
    }
    return;
  }

  if (smtpHost) {
    const nodemailer = await import("nodemailer");
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === "true",
      auth: process.env.SMTP_USER
        ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS || "" }
        : undefined,
    });
    const from = process.env.SMTP_FROM || process.env.SMTP_USER || FROM_DEFAULT;
    await transporter.sendMail({
      from,
      to,
      subject: "You're on the Homie waitlist",
      html: welcomeEmailHtml(name),
    });
    return;
  }

  // No email provider configured — skip silently.
}
