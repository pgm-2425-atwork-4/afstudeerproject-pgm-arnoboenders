"use client";
import { Undo2 } from "lucide-react";
import { redirect } from "next/navigation";

interface BackButtonProps {
  path: string;
}

export default function BackButton({ path }: BackButtonProps) {
  return (
    <button
      className="flex items-center justify-center gap-2 hover:underline"
      onClick={() => redirect(`/${path}`)}
    >
      <Undo2 /> <p>Terug</p>
    </button>
  );
}
