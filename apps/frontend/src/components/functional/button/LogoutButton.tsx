"use client"; // This makes it interactive
import { useAuthContext } from "@/components/context/AuthProvider";
import Button from "@/components/functional/button/Button";

export default function LogoutButton() {
  const { logout } = useAuthContext();
  return <Button text="Logout" onClick={logout} />;
}
