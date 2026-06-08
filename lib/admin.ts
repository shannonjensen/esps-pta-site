import { timingSafeEqual } from "crypto";
import type { NextRequest } from "next/server";

/**
 * Shared-password admin gate. The password lives in the ADMIN_PASSWORD env var
 * (server-only). Clients send it on every admin request via the `x-admin-key`
 * header; we compare in constant time. This is intentionally simple and
 * reusable — any future admin route can call `isAdmin(req)` to gate itself.
 */
export function isAdmin(req: NextRequest): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;

  const provided = req.headers.get("x-admin-key") ?? "";
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export const ADMIN_CONFIGURED = () => Boolean(process.env.ADMIN_PASSWORD);
