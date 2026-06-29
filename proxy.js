import { NextResponse } from "next/server";
import { verifySessionToken } from "./lib";

const protectedRoutes = ["/dashboard", "/profile"];
const authRoutes = ["/login", "/sign-up"];

export async function proxy(request) {

    const path = request.nextUrl.pathname;

    const isProtectedRoute = protectedRoutes.includes(path);
    const isAuthRoute = authRoutes.includes(path);

    const cookie = request.cookies.get("session")?.value;

    const session = cookie ? await verifySessionToken(cookie) : null;

    if(isProtectedRoute && !session) {
        return NextResponse.redirect(new URL("/login", request.nextUrl));
    }

    if(isAuthRoute && session) {
        return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
    }

    return NextResponse.next();
}

export const config = {
  matcher: [
    // Exclude API routes, static files, image optimizations, and .png files
    '/((?!api|_next/static|_next/image|.*\\.png$).*)',
  ],
}