import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/core/networking/api";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Retrieve session from Supabase
  const { data } = await supabase.auth.getUser();

  const isAuthenticated = !!data?.user; // Boolean value indicating if the user is logged in

  // Protect the private pages
  if (pathname.startsWith("/private") && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Prevent logged-in users from accessing login page
  if (pathname.startsWith("/login") && isAuthenticated) {
    return NextResponse.redirect(new URL("/private", req.url));
  }

  return NextResponse.next(); // Allow request to continue
}

// Define which routes the middleware should apply to
export const config = {
  matcher: ["/private/:path*", "/login"], // Apply to private pages and login page
};
