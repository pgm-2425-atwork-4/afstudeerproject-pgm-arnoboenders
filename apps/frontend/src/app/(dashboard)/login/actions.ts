"use server";

import { supabase } from "@/core/networking/api";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


export async function login(formData: FormData) {
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/private", "layout");
  redirect("/private");
}
