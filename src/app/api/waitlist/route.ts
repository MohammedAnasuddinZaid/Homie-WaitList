import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email } = body;

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email is required." }, { status: 400 });
    }

    const db = getDb();
    const stmt = db.prepare("INSERT INTO waitlist (name, email) VALUES (?, ?)");
    stmt.run(name || null, email);

    return NextResponse.json({ message: "You're on the list. We'll be in touch." });
  } catch (err: any) {
    if (err.code === "SQLITE_CONSTRAINT_UNIQUE") {
      return NextResponse.json({ error: "This email is already on the waitlist." }, { status: 409 });
    }
    console.error(err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}

export async function GET() {
  const db = getDb();
  const rows = db.prepare("SELECT id, name, email, created_at FROM waitlist ORDER BY created_at DESC").all();
  return NextResponse.json({ entries: rows });
}
