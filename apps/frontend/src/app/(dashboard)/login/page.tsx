import Button from "@/components/functional/button/Button";
import { login } from "./actions";
import Image from "next/image";
import { supabase } from "@/core/networking/api";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.log("User is not logged in");
  }
  if (data?.user) {
    redirect("/private");
  }
  return (
    <div className="flex flex-col justify-center items-center my-72 gap-4">
      <Image
        src="/Loos_logo_dark.png"
        alt="logo"
        width={200}
        height={100}
        priority={true}
      />
      <h1 className="text-4xl">Login</h1>
      <form className="container flex flex-col justify-center items-center gap-4">
        <label htmlFor="email">Email:</label>
        <input id="email" name="email" type="email" required />
        <label htmlFor="password">Password:</label>
        <input id="password" name="password" type="password" required />
        <Button formAction={login} text="Login" />
      </form>
    </div>
  );
}
