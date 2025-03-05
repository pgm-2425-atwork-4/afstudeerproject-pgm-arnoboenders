import { createServerClient } from "@supabase/ssr";
import { NextResponse, NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Ensure session is retrieved correctly
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error || !session) {
    console.error("Session Error:", error);
  }

  if (
    !session?.user &&
    !request.nextUrl.pathname.startsWith("/login") &&
    !request.nextUrl.pathname.startsWith("/auth")
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // Ensure session cookies are stored in the response
  supabaseResponse.cookies.set("sb-access-token", session?.access_token || "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });

  supabaseResponse.cookies.set(
    "sb-refresh-token",
    session?.refresh_token || "",
    {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    }
  );

  return supabaseResponse;
}
