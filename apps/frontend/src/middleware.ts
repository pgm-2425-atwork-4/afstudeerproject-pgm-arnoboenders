import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => req.cookies.getAll(),
        setAll: (cookies) =>
          cookies.forEach(({ name, value, options }) =>
            res.cookies.set(name, value, options)
          ),
      },
    }
  );

  const { data: user } = await supabase.auth.getUser();
  console.log("user", user);

  const isAuthenticated = !!user.user;

  const { pathname } = req.nextUrl;

  if (
    !isAuthenticated &&
    (pathname.startsWith("/private") || pathname.startsWith("/order-overview"))
  ) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = "/login";
    redirectUrl.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(redirectUrl);
  }

  if (pathname === "/login" && isAuthenticated) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = "/private";
    return NextResponse.redirect(redirectUrl);
  }

  return res;
}
