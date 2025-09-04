import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

// Placeholder auth middleware.
// Public: (marketing), (legal), (auth)
// Protected: (app), (account), (admin)
// TODO: Replace with real auth (JWT/session) before production.
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const protectedRoots = [
    "/dashboard",
    "/usage",
    "/support",
    "/integrations",
    "/developers",
    "/status",
    "/profile",
    "/settings",
    "/billing",
    "/admin",
  ]
  const isProtected = protectedRoots.some((p) => pathname === p || pathname.startsWith(p + "/"))
  const isAuthed = Boolean(req.cookies.get("gopilot_token")?.value)

  if (isProtected && !isAuthed) {
    const url = req.nextUrl.clone()
    url.pathname = "/login"
    url.searchParams.set("from", pathname)
    return NextResponse.redirect(url)
  }
  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
}
