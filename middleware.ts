import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const { pathname } = req.nextUrl
  const session = req.auth

  if (!session) {
    const loginUrl = new URL("/login", req.url)
    loginUrl.searchParams.set("callbackUrl", pathname)
    return NextResponse.redirect(loginUrl)
  }

  const role = (session.user as { role?: string }).role
  if (pathname.startsWith("/admin") && role === "guest") {
    return NextResponse.redirect(new URL("/account", req.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ["/account/:path*", "/admin/:path*"],
}
