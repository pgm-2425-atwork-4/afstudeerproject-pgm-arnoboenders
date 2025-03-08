"use client";
import { useState } from "react";
import { updateMenuImage } from "@/modules/menu/api";
import Button from "@/components/functional/button/Button";
import { ImageUp } from "lucide-react";

export default function UploadImage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const upload = async () => {
    if (!file) {
      return;
    }
    setUploading(true);
    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result as string;
        const image = await updateMenuImage(base64String);
        console.log("Image uploaded:", image);
      };
      reader.readAsDataURL(file);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex justify-between items-center gap-4">
      {/* Custom Styled File Input */}
      <div className="w-1/2 flex flex-col items-center px-4 py-6 bg-primary rounded-lg shadow-lg text-white">
        <ImageUp />
        <span className="mt-2">Kies een afbeelding</span>
        <label className="mt-2 w-full bg-primary500 text-white border border-white rounded-lg p-2 cursor-pointer text-center">
          {file ? file.name : "Geen afbeelding gekozen"}
          <input
            type="file"
            className="hidden"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        </label>
      </div>

      <div className="w-1/2 flex justify-end">
        <Button
          onClick={() => upload()}
          disabled={!file}
          text={uploading ? "Uploading..." : "Upload"}
        />
      </div>
    </div>
  );
}
