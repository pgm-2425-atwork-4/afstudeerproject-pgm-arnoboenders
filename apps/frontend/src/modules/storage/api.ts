import { decode } from "base64-arraybuffer";
import { supabase } from "@/core/networking/api";

export const uploadImage = async (
  bucket: string,
  base64String: string,
  fileName: string
) => {
  const base64Data = base64String.replace(/^data:image\/\w+;base64,/, "");
  const arrayBuffer = decode(base64Data); // Correctly decode Base64 into an ArrayBuffer

  console.log("Uploading to bucket:", bucket);
  console.log("File name:", fileName);

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(fileName, arrayBuffer, {
      contentType: "image/jpeg", // Adjust as needed
    });

  if (error) {
    console.error("Upload error:", error);
    return Promise.reject(error);
  }

  console.log("Upload success:", data);
  return Promise.resolve(data);
};
