import { redirect } from "next/navigation";

import { supabase } from "@/core/networking/api";
import EditMenu from "@/app/(dashboard)/private/components/EditMenu";

export default async function PrivatePage() {
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/login");
  }
  return (
    <div className="max-w-2xl mx-auto mt-10 p-4">
      <p>Welcome {data?.user.email}</p>
      <h1>Menu Management</h1>
      <EditMenu  owner_id={data.user.id} />
    </div>
  );
}
