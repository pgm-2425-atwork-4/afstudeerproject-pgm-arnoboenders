import { redirect } from "next/navigation";

import { supabase } from "@/core/networking/api";

export default async function PrivatePage() {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return <p>Hello {data.user.email}</p>;
}
