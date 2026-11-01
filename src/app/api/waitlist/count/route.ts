import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET() {
  const db = getDb();
  const result = db.prepare("SELECT COUNT(*) as count FROM waitlist").get() as { count: number };
  return NextResponse.json({ count: result.count });
}
