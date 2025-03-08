"use client"; // This makes it interactive
import { useAuth } from "@/components/context/AuthProvider";
import Button from "@/components/functional/button/Button";

export default function LogoutButton() {
  const { logout } = useAuth();
  return <Button text="Logout" onClick={logout} />;
}
