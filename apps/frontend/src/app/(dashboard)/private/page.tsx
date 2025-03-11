"use client";

import { redirect } from "next/navigation";
import EditMenu from "@/app/(dashboard)/private/components/EditMenu";
import LogoutButton from "@/components/functional/button/LogoutButton";
import { useAuthContext } from "@/components/context/AuthProvider";

export default function PrivatePage() {
  const { user } = useAuthContext();
  if (!user) {
    redirect("/login");
  }
  return (
    <div className="max-w-2xl mx-auto mt-10 p-4">
      <div className="flex justify-between items-center">
        <h2>Welkom, {user.email}</h2>
        <LogoutButton />
      </div>

      <h1 className="my-8">Beheer Menu</h1>

      <div className="my-8 flex flex-col gap-8">
        
        <EditMenu owner_id={user.id} />
      </div>
    </div>
  );
}
