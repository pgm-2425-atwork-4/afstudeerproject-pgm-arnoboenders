import { redirect } from "next/navigation";
import { supabase } from "@/core/networking/api";
import EditMenu from "@/app/(dashboard)/private/components/EditMenu";
import LogoutButton from "@/components/functional/button/LogoutButton";
import UploadImage from "./components/UploadImage";

export default async function PrivatePage() {
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/login");

  }
  return (
    <div className="max-w-2xl mx-auto mt-10 p-4">
      <div className="flex justify-between items-center">
        <h2>Welcome {data?.user.email}</h2>
        <LogoutButton />
      </div>
      <h2>Upload image</h2>
      <UploadImage />

      <h1>Menu Management</h1>
      <EditMenu owner_id={data.user.id} />
    </div>
  );
}
