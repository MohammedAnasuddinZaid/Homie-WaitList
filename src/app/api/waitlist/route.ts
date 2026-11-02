import { NextRequest, NextResponse } from "next/server";
import { addEntry, getCount } from "@/lib/db";
import { sendWelcomeEmail } from "@/lib/email";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const { name, email } = (body ?? {}) as { name?: unknown; email?: unknown };
  const cleanEmail = typeof email === "string" ? email.trim().toLowerCase() : "";
  const cleanName = typeof name === "string" ? name.trim().slice(0, 120) : "";

  if (!EMAIL_RE.test(cleanEmail)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  try {
    await addEntry(cleanName, cleanEmail);
    const count = await getCount();
    // Fire-and-forget welcome email (never blocks registration).
    sendWelcomeEmail(cleanEmail, cleanName).catch((err) =>
      console.error("welcome email failed:", err)
    );
    return NextResponse.json({
      message: "You're in. Watch your inbox — Homie is on its way.",
      count,
    });
  } catch (err) {
    const code = (err as { code?: string; errno?: number }).code;
    const errno = (err as { errno?: number }).errno;
    // SQLite: SQLITE_CONSTRAINT_UNIQUE — MySQL: ER_DUP_ENTRY (1062) — Postgres: 23505
    if (code === "SQLITE_CONSTRAINT_UNIQUE" || errno === 1062 || code === "23505") {
      const count = await getCount().catch(() => 0);
      return NextResponse.json(
        { error: "You're already on the list — see you soon.", count },
        { status: 409 }
      );
    }
    console.error("waitlist insert failed:", err);
    const msg = (err as { message?: string }).message || "";
    if (msg.includes("No database configured")) {
      return NextResponse.json(
        { error: "Database not configured. Please set POSTGRES_URL or MYSQL_* env vars." },
        { status: 503 }
      );
    }
    return NextResponse.json({ error: "Something went wrong. Try again in a moment." }, { status: 500 });
  }
}

export async function GET() {
  try {
    const count = await getCount();
    return NextResponse.json({ count });
  } catch (err) {
    console.error("waitlist count failed:", err);
    return NextResponse.json({ count: 0 }, { status: 500 });
  }
}
