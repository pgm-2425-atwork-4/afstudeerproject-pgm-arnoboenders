import { supabase } from "@/core/networking/api";
import { Bucket } from "./types";

export const getMenuImageUrl = (path: string) => {
  const { data } = supabase.storage.from(Bucket.MENU).getPublicUrl(path);
  return data?.publicUrl;
};
