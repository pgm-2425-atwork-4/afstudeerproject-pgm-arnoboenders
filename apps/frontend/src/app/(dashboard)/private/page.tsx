"use client";

import { redirect } from "next/navigation";
import EditMenu from "@/app/(dashboard)/private/components/EditMenu";
import LogoutButton from "@/components/functional/button/LogoutButton";
import UploadImage from "./components/UploadImage";
import { useAuth } from "@/components/context/AuthProvider";

export default function PrivatePage() {
  const { user } = useAuth();
  console.log(user);
  if (!user) {
    redirect("/login");
  }
  return (
    <div className="max-w-2xl mx-auto mt-10 p-4">
      <div className="flex justify-between items-center">
        <h2>Welcome {user.email}</h2>
        <LogoutButton />
      </div>
      <h2>Upload image</h2>
      <UploadImage />

      <h1>Menu Management</h1>
      <EditMenu owner_id={user.id} />
    </div>
  );
}
