import { decode } from "base64-arraybuffer";
import { supabase } from "@/core/networking/api";

export const uploadImage = async (
  bucket: string,
  base64String: string,
  fileName: string
) => {

  const base64Data = base64String.replace(/^data:image\/\w+;base64,/, "");

  // Decode Base64 into an ArrayBuffer
  const arrayBuffer = decode(base64Data);

  console.log("Uploading to bucket:", bucket);
  console.log("Decoded array buffer:", arrayBuffer);
  console.log("File name:", fileName);
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(fileName, decode(base64String), {
      contentType: "image/jpeg",
    });

  if (error) {
    console.error("Upload error:", error);
    return Promise.reject(error);
  }

  return Promise.resolve(data);
};
