import { NextRequest, NextResponse } from "next/server";
import { isAdmin, ADMIN_CONFIGURED } from "@/lib/admin";

export const runtime = "nodejs";

// Validates the password (sent via the x-admin-key header) so the client can
// confirm it before storing it for the session. Returns 200 on success.
export async function POST(req: NextRequest) {
  if (!ADMIN_CONFIGURED()) {
    return NextResponse.json(
      { error: "Admin access is not configured. Set ADMIN_PASSWORD on the server." },
      { status: 500 }
    );
  }
  if (!isAdmin(req)) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }
  return NextResponse.json({ ok: true });
}
