import { supabase } from "@/core/networking/api";
import { MenuItem } from "./types";

export const getMenuItems = async (): Promise<MenuItem[] | null> => {
  const { data, error } = await supabase.from("menu").select("*");
  if (error) {
    throw error;
  }
  return data;
};
