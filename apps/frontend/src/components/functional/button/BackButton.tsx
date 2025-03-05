"use client";
import { Undo2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  return (
    <button
      className="flex items-center justify-center gap-2 hover:underline"
      onClick={router.back}
    >
      <Undo2 /> <p>Terug</p>
    </button>
  );
}
