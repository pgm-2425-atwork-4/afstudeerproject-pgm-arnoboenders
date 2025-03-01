import { supabase } from "@/core/networking/api";
import { MenuCategory, MenuItem } from "./types";

export const getMenuItems = async (): Promise<MenuItem[] | null> => {
  const { data, error } = await supabase.from("menu").select("*");
  if (error) {
    throw error;
  }
  return data;
};

export const getCategories = async (): Promise<MenuCategory[] | null> => {
  const { data, error } = await supabase.from("menu_category").select("*");
  if (error) {
    throw error;
  }
  return data;
};
