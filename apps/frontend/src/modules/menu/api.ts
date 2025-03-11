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

export const updateMenuItem = async (
  owner_id: string,
  item: Partial<MenuItem>
) => {
  if (!item.id) {
    throw new Error("Item ID is required for updating");
  }

  // Check if item exists in the database
  const { data: existingData, error: fetchError } = await supabase
    .from("menu")
    .select("*")
    .eq("id", item.id)
    .eq("owner_id", String(owner_id));

  if (fetchError) {
    console.error("Error fetching existing item:", fetchError);
    throw new Error(fetchError.message);
  }

  if (!existingData || existingData.length === 0) {
    throw new Error(
      "No item found with the given ID and owner_id. Double-check the database values."
    );
  }

  // Proceed with the update
  const { data, error } = await supabase
    .from("menu")
    .update({
      name: item.name,
      ingredients: item.ingredients,
      price: item.price,
      is_new: item.is_new,
      veggie: item.veggie,
      category_id: item.category_id,
    })
    .eq("id", item.id)
    .eq("owner_id", String(owner_id))
    .select(); // Ensure updated data is returned

  if (error) {
    console.error("Supabase Update Error:", error);
    throw new Error(error.message);
  }

  if (!data || data.length === 0) {
    throw new Error("Update failed: No data returned");
  }

  return data[0]; // Return the updated menu item
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
      },
    ])
    .select();
  if (error) {
    throw new Error(error.message);
  }
  return data[0];
};

export const deleteMenuItem = async (item_id: number) => {
  const { error } = await supabase.from("menu").delete().eq("id", item_id);
  if (error) {
    throw new Error(error.message);
  }
};

export const updateMenuImage = async (image: string) => {
  const fileName = `${Date.now()}-menu-image.jpg`;

  // Upload new image
  await uploadImage(Bucket.MENU, image, fileName);

  // Fetch the existing image record
  const { data: existingImage, error: fetchError } = await supabase
    .from("menu_image")
    .select("id")
    .order("id", { ascending: true })
    .limit(1)
    .single();

  if (fetchError) {
    console.error("Error fetching existing menu image:", fetchError);
  }

  if (existingImage) {
    // Update the existing row
    const { data, error } = await supabase
      .from("menu_image")
      .update({ name: fileName })
      .eq("id", existingImage.id)
      .select();

    if (error) {
      throw new Error(error.message);
    }

    return data[0];
  } else {
    // If no existing image, insert a new one
    const { data, error } = await supabase
      .from("menu_image")
      .insert({ name: fileName })
      .select();

    if (error) {
      throw new Error(error.message);
    }

    return data[0];
  }
};