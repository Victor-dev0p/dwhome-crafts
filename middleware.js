// middleware.js
import { auth } from "./auth";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const session = await auth();
  const { pathname, origin } = req.nextUrl;

  // Redirect unauthenticated users trying to access /admin/*
  if (pathname.startsWith("/admin") && !session) {
    return NextResponse.redirect(`${origin}/admin/login`);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
