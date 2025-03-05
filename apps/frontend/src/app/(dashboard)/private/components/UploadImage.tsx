"use client";
// import Image from "next/image";
import { useState } from "react";
import { updateMenuImage } from "@/modules/menu/api";

export default function UploadImage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
//   const [imageUrl, setImageUrl] = useState<string | null>(null);

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
        // setImageUrl(image.url); // Assuming the response contains the URL of the uploaded image
        console.log("Image uploaded:", image);
      };
      reader.readAsDataURL(file);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <button onClick={upload} disabled={!file || uploading}>
        {uploading ? "Uploading..." : "Upload"}
      </button>
      {/* {imageUrl && <Image src={imageUrl} alt="Uploaded" width={200} />} */}
    </div>
  );
}
