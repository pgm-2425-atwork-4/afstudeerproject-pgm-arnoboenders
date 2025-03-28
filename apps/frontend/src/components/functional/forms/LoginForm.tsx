"use client";

import { useState } from "react";
import { useSearchParams, redirect } from "next/navigation";
import { useAuthContext } from "@/components/context/AuthProvider";
import Button from "@/components/functional/button/Button";
import InputField from "@/components/functional/input/InputField";
import { loginSchema } from "@/app/schemas/login";

export default function LoginForm() {
  const { login } = useAuthContext();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/private";
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    general?: string;
  }>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = loginSchema.safeParse(formData);
    if (!result.success) {
      const formattedErrors = result.error.format();
      setErrors({
        email: formattedErrors.email?._errors[0],
        password: formattedErrors.password?._errors[0],
      });
      return;
    }

    setErrors({});

    const response = await login(formData.email, formData.password);
    if (response?.user === null) {
      setErrors({ general: "Login failed" });
      return;
    }

    redirect(redirectTo);
  };

  return (
    <form
      className="container flex flex-col justify-center items-center gap-4"
      onSubmit={handleSubmit}
    >
      <InputField
        id="email"
        label="Email"
        name="email"
        type="email"
        placeholder="Enter your email"
        value={formData.email}
        required
        onChange={handleChange}
      />
      {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

      <InputField
        id="password"
        label="Password"
        name="password"
        type="password"
        placeholder="Enter your password"
        value={formData.password}
        required
        onChange={handleChange}
      />
      {errors.password && (
        <p className="text-red-500 text-sm">{errors.password}</p>
      )}

      {errors.general && (
        <p className="text-red-500 text-sm">{errors.general}</p>
      )}

      <Button type="submit" text="Login" />
    </form>
  );
}
