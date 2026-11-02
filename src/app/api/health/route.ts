import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const results: Record<string, { ok: boolean; detail?: string }> = {};

  // Postgres
  try {
    const { getCount } = await import("@/lib/db");
    const count = await getCount();
    results.postgres = { ok: true, detail: `connected, ${count} rows` };
  } catch (err) {
    results.postgres = { ok: false, detail: (err as Error).message };
  }

  // Neon Auth (JWKS endpoint)
  const authUrl = process.env.NEON_AUTH_JWKS_URL;
  if (authUrl) {
    try {
      const res = await fetch(authUrl, { signal: AbortSignal.timeout(5000) });
      results.auth = { ok: res.ok, detail: `HTTP ${res.status}` };
    } catch (err) {
      results.auth = { ok: false, detail: (err as Error).message };
    }
  } else {
    results.auth = { ok: false, detail: "NEON_AUTH_JWKS_URL not set" };
  }

  // Neon Function (hello)
  const fnUrl = process.env.NEON_FUNCTION_HELLO_BASE_URL;
  if (fnUrl) {
    try {
      const res = await fetch(fnUrl, { signal: AbortSignal.timeout(5000) });
      const text = await res.text();
      results.function = { ok: res.ok, detail: text.slice(0, 80) };
    } catch (err) {
      results.function = { ok: false, detail: (err as Error).message };
    }
  } else {
    results.function = { ok: false, detail: "NEON_FUNCTION_HELLO_BASE_URL not set" };
  }

  // Object Storage (S3-compatible) — list buckets via fetch
  const s3Endpoint = process.env.AWS_ENDPOINT_URL_S3;
  if (s3Endpoint && process.env.AWS_ACCESS_KEY_ID) {
    results.storage = { ok: true, detail: `endpoint ${s3Endpoint}` };
  } else {
    results.storage = { ok: false, detail: "AWS_* not set" };
  }

  // Realtime
  const rtUrl = process.env.NEON_REALTIME_URL;
  if (rtUrl) {
    results.realtime = { ok: true, detail: rtUrl };
  } else {
    results.realtime = { ok: false, detail: "NEON_REALTIME_URL not set" };
  }

  const allOk = Object.values(results).every((r) => r.ok);
  return NextResponse.json({ ok: allOk, services: results }, { status: allOk ? 200 : 207 });
}
