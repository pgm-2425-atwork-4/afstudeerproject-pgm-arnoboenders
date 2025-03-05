"use client"; // This makes it interactive

import { logout } from "@/app/(dashboard)/login/actions";
import Button from "@/components/functional/button/Button";

export default function LogoutButton() {
  return <Button text="Logout" onClick={logout} />;
}
