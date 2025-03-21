"use client";
import { useState } from "react";
import Button from "@/components/functional/button/Button";
import InputField from "../input/InputField";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    subject: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<boolean | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);

    const res = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    });

    setLoading(false);
    setSuccess(res.ok);
    if (res.ok) setFormData({ subject: "", email: "", message: "" });
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <h2 className="mb-0">Heb je een vraag? Stuur gerust een berichtje!</h2>
      <InputField
        type="text"
        id="subject"
        name="subject"
        label="Onderwerp"
        value={formData.subject}
        onChange={handleChange}
        placeholder="Onderwerp"
        required
      />
      <InputField
        type="email"
        id="email"
        name="email"
        label="Email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <InputField
        type="textarea"
        id="message"
        name="message"
        label="Bericht"
        value={formData.message}
        onChange={handleChange}
        placeholder="Bericht"
        required
      />

      {success === true && <p className="text-green-600">Bericht verzonden!</p>}
      {success === false && (
        <p className="text-red-600">Er ging iets mis bij het verzenden.</p>
      )}

      <Button
        text={loading ? "Versturen..." : "Verstuur"}
        type="submit"
        disabled={loading}
      />
    </form>
  );
}
