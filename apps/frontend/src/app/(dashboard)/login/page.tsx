import Image from "next/image";

import LoginForm from "@/components/functional/forms/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Loos-backoffice | Login",
  description: "Login to the backoffice",
};

export default async function LoginPage() {
  return (
    <div className="flex flex-col justify-center items-center my-72 gap-4">
      <Image
        src="/Loos_logo_dark.png"
        alt="logo"
        width={200}
        height={100}
        priority
      />
      <h1 className="text-4xl">Login</h1>
      <LoginForm />
    </div>
  );
}
