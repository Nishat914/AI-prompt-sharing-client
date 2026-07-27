import { NextResponse } from "next/server";
import { auth } from "./lib/auth";
import { headers } from "next/headers";


export async function proxy(request) {
  const session = await auth.api.getSession({
    headers : await headers()
   }) 

  const { pathname } = request.nextUrl;

  
  if (!session) {
    const loginUrl = new URL("/login", request.url);

    loginUrl.searchParams.set("redirect", request.nextUrl.pathname);

    return NextResponse.redirect(loginUrl);
  }

  // Admin only
  if (
    pathname.startsWith("/dashboard/admin") &&
    session.user.role !== "admin"
  ) {
    return NextResponse.redirect(new URL("/"));
  }

  // Creator only
  if (
    pathname.startsWith("/dashboard/creator") &&
    session.user.role !== "creator"
  ) {
    return NextResponse.redirect(new URL("/"));
  }

  // User only
  if (
    pathname.startsWith("/dashboard/user") &&
    session.user.role !== "user"
  ) {
    return NextResponse.redirect(new URL("/"));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*","/prompt-details/:id","/pricing/:path*"],
};