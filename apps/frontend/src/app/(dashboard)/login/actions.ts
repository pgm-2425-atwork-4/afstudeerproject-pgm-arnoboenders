"use server";

import { supabase } from "@/core/networking/api";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("Login Error:", error.message);
    redirect("/error");
  }

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    console.error("Session not found after login");
    redirect("/error");
  }

  const cookieStore = await cookies();

  cookieStore.set("sb-access-token", session.access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });

  // cookieStore.set("sb-refresh-token", session.refresh_token, {
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV === "production",
  //   path: "/",
  // });

  revalidatePath("/private", "layout");
  redirect("/private");
}

export async function logout() {
  // Step 1: Sign out user from Supabase
  await supabase.auth.signOut();

  // Step 2: Manually delete authentication cookies
  const cookieStore = await cookies();
  cookieStore.delete("sb-access-token");
  cookieStore.delete("sb-refresh-token");

  // Step 3: Revalidate session data to remove cached state
  revalidatePath("/", "layout");
  revalidatePath("/private", "layout");

  // Step 4: Redirect the user AFTER session is cleared
  return redirect("/login"); // Use return to ensure the redirect executes
}
