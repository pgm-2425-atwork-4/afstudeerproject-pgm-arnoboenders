// components/functional/modal/Modal.tsx
"use client";

import { X } from "lucide-react";
import { ReactNode } from "react";

export default function Modal({
  children,
  onClose,
}: {
  children: ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50 overflow-y-auto pt-10">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-xl"
        >
          <X />
        </button>
        {children}
      </div>
    </div>
  );
}
