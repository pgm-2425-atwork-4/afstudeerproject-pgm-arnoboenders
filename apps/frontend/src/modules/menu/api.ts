import { supabase } from "@/core/networking/api";
import { CreateMenuItem, MenuCategory, MenuItem } from "./types";
import { uploadImage } from "../storage/api";
import { Bucket } from "../storage/types";

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

export const updateMenuItem = async (item: Partial<MenuItem>) => {
  if (!item.id) {
    throw new Error("Item ID is required for updating");
  }


  const updateData: Partial<MenuItem> = {
    ...(item.name && { name: item.name }),
    ...(item.ingredients && { ingredients: item.ingredients }),
    ...(item.price && { price: item.price }),
    ...(item.is_new !== undefined && { is_new: item.is_new }),
    ...(item.veggie !== undefined && { veggie: item.veggie }),
    ...(item.category_id && { category_id: item.category_id }),
    updated_at: new Date().toISOString(),
  };


 const { data, error } = await supabase
   .from("menu")
   .update(updateData)
   .eq("id", item.id)
   .select();


  if (error) {
    console.error("Supabase Update Error:", error);
    throw new Error(error.message);
  }

  if (!data || data.length === 0) {
    throw new Error("Update failed: No data returned");
  }

  return data[0];
};

export const createMenuItem = async (item: CreateMenuItem) => {
  const { data, error } = await supabase
    .from("menu")
    .insert([
      {
        name: item.name,
        ingredients: item.ingredients,
        price: item.price,
        is_new: item.is_new,
        veggie: item.veggie,
        category_id: item.category_id,
        user_id: item.user_id,
      },
    ])
    .select();
  if (error) {
    throw new Error(error.message);
  }
  return data[0];
};

export const deleteMenuItem = async (item_id: string) => {
  const { error } = await supabase.from("menu").delete().eq("id", item_id);
  if (error) {
    throw new Error(error.message);
  }
};

export const getMenuImage = async () => {
  const { data, error } = await supabase.from("menu_image").select("*");
  if (error) {
    throw new Error(error.message);
  }
  return data ? data[0] : null;
};

export const updateMenuImage = async (image: string) => {
  const fileName = `${Date.now()}-menu-image.jpg`;

  // Upload new image
  await uploadImage(Bucket.MENU, image, fileName);
  console.log("Uploaded image:", fileName);

  // Fetch the existing image record
  const { data: existingImage, error: fetchError } = await supabase
    .from("menu_image")
    .select("id, name")
    .order("id", { ascending: true })
    .limit(1)
    .single();

  if (fetchError) {
    console.error("Error fetching existing menu image:", fetchError);
  }

  console.log("Existing image record:", existingImage);

  if (existingImage) {
    // Force update by adding an updated_at column
    const { data, error } = await supabase
      .from("menu_image")
      .update({
        name: fileName,
      })
      .eq("id", existingImage.id)
      .select();

    if (error) {
      console.error("Error updating menu image:", error);
      throw new Error(error.message);
    }

    console.log("Updated record:", data);
    return data;
  } else {
    // If no existing image, insert a new one
    const { data, error } = await supabase
      .from("menu_image")
      .insert([{ name: fileName, updated_at: new Date().toISOString() }])
      .select();

    if (error) {
      console.error("Error inserting new menu image:", error);
      throw new Error(error.message);
    }

    console.log("Inserted new record:", data);
    return data.length ? data[0] : null;
  }
};
