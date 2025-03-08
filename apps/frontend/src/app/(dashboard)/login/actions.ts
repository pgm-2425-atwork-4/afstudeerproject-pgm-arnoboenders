"use server";

import { supabase } from "@/core/networking/api";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  console.log(data);
  if (error) {
    return { success: false, message: error.message };
  }

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return { success: false, message: "Session not found. Please try again." };
  }

  await supabase.auth.setSession({
    access_token: session.access_token,
    refresh_token: session.refresh_token,
  });

  const cookieStore = await cookies();
  cookieStore.set("sb-access-token", session.access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
  cookieStore.set("sb-refresh-token", session.refresh_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });

  revalidatePath("/private", "layout");
  return { success: true }; // Return success to handle redirection in the form
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
