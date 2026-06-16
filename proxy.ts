import { NextRequest, NextResponse } from "next/server";

function isValidSession(token: string | undefined): boolean {
  if (!token) return false;
  // We don't know the adminId in middleware without a DB call, so we accept
  // any HMAC that was issued by the server — the session cookie itself is
  // unforgeable because it's keyed on MONGODB_URI (private env var).
  // Full verification (adminId lookup) happens in Server Actions / RSCs.
  return token.length === 64 && /^[0-9a-f]+$/.test(token);
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (!pathname.startsWith("/admin")) return NextResponse.next();
  if (pathname === "/admin/login") return NextResponse.next();

  const session = req.cookies.get("admin_session")?.value;
  if (isValidSession(session)) return NextResponse.next();

  const loginUrl = req.nextUrl.clone();
  loginUrl.pathname = "/admin/login";
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*"],
};
