import { NextResponse } from "next/server";
import { getCount } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const count = await getCount();
    return NextResponse.json({ count });
  } catch (err) {
    console.error("waitlist count failed:", err);
    return NextResponse.json({ count: 0 });
  }
}
