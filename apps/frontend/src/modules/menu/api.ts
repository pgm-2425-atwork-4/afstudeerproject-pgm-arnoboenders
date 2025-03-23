import { supabase } from "@/core/networking/api";
import { CreateMenuItem, MenuCategory, MenuItem } from "./types";
import { uploadImage } from "../storage/api";
import { Bucket } from "../storage/types";
import { redis } from "@/utils/redis/redis";

export const getMenuItems = async (): Promise<MenuItem[] | null> => {
  const cacheKey = "menu:items";

  // First, try to get from cache
  const cached = await redis.get<MenuItem[]>(cacheKey);
  if (cached) {
    return cached;
  }

  const { data, error } = await supabase.from("menu").select("*");
  console.log(data);
  if (error || !data) {
    throw error;
  }

  // Save to Redis with TTL of 10 minutes
  await redis.set(cacheKey, data, { ex: 600 });

  return data;
};

export const getCategories = async (): Promise<MenuCategory[] | null> => {
  const { data, error } = await supabase
    .from("menu_category")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) {
    throw error;
  }
  return data;
};

export const updateMenuItem = async (item: Partial<MenuItem>, file?: File) => {
  if (!item.id) {
    throw new Error("Item ID is required for updating");
  }
  let fileName: string | null = item.image ?? null;
  if (file) {
    fileName = `${Date.now()}-menu-item-image.jpg`; // Ensure fileName is a string
    // If a new file is provided, upload it first and update with the new filename
    const reader = new FileReader();
    return new Promise<Partial<MenuItem>>((resolve, reject) => {
      reader.onloadend = async () => {
        if (typeof reader.result === "string") {
          try {
            await uploadImage(
              Bucket.MENU_ITEM,
              reader.result,
              fileName ?? `${Date.now()}-menu-item-image.jpg`
            );

            // Now update menu with the new image filename
            const updateData: Partial<MenuItem> = {
              ...item,
              image: fileName, // Ensure updated image filename
              updated_at: new Date().toISOString(),
            };

            const { data, error } = await supabase
              .from("menu")
              .update(updateData)
              .eq("id", item.id)
              .select();

            if (error) {
              console.error("Supabase Update Error:", error);
              return reject(error);
            }

            if (!data || data.length === 0) {
              return reject("Update failed: No data returned");
            }
            resolve(data[0]); // Return updated menu item
          } catch (error) {
            return reject(error);
          }
        }
      };

      reader.readAsDataURL(file); // Convert file to Base64
    });
  } else {
    // If no file is provided, update without modifying the image field
    const updateData: Partial<MenuItem> = {
      ...item,
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
    await redis.del("menu:items");

    return data[0]; // Return the updated menu item
  }
};

export const createMenuItem = async (item: CreateMenuItem, file?: File) => {
  let fileName: string | null = item.image ?? null;

  if (file) {
    fileName = `${Date.now()}-menu-item-image.jpg`; // Generate unique filename
    const reader = new FileReader();

    return new Promise<CreateMenuItem>((resolve, reject) => {
      reader.onloadend = async () => {
        if (typeof reader.result === "string") {
          try {
            await uploadImage(
              Bucket.MENU_ITEM,
              reader.result,
              fileName ?? `${Date.now()}-menu-item-image.jpg`
            );
          } catch (error) {
            console.error("Image upload failed:", error);
            return reject(error);
          }

          // Insert menu item **WITHOUT `order_number`**
          try {
            const itemData: Omit<CreateMenuItem, "order_number"> = {
              ...item,
              image: fileName, // Ensure updated image filename
            };

            const { data, error } = await supabase
              .from("menu")
              .insert([itemData])
              .select();

            if (error) {
              console.error("Supabase Insert Error:", error);
              return reject(error);
            }

            if (!data || data.length === 0) {
              return reject("Insert failed: No data returned");
            }

            resolve(data[0]); // Return created menu item
          } catch (error) {
            return reject(error);
          }
        }
      };

      reader.readAsDataURL(file);
    });
  } else {
    // If no file is provided, insert the menu item **WITHOUT `order_number`**
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
          image: fileName, // Could be null if no image is uploaded
        },
      ])
      .select();

    if (error) {
      throw new Error(error.message);
    }
    await redis.del("menu:items");

    return data[0]; // Return created menu item
  }
};

export const deleteMenuItem = async (item_id: string) => {
  const { error } = await supabase.from("menu").delete().eq("id", item_id);
  if (error) {
    throw new Error(error.message);
  }
  await redis.del("menu:items");
};

export const getMenuImage = async () => {
  const { data, error } = await supabase.from("menu_image").select("*");
  if (error) {
    throw new Error(error.message);
  }
  return data ? data[0] : null;
};

export const updateMenuImage = async (image: string) => {
  if (!image) {
    throw new Error("Image is required for updating");
  }
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const fileName = `${Date.now()}-menu-image.jpg`;

  // Upload new image
  await uploadImage(Bucket.MENU, image, fileName);

  // Fetch the existing image record
  const { data: existingImage } = await supabase
    .from("menu_image")
    .select("id")
    .order("id", { ascending: true })
    .limit(1)
    .single();

  const updateData = {
    name: fileName,
    updated_at: new Date().toISOString(),
    user_id: user?.id,
  };

  let result;

  if (existingImage) {
    // Update the existing image record
    const { data, error } = await supabase
      .from("menu_image")
      .update(updateData)
      .eq("id", existingImage.id)
      .select();

    if (error) {
      console.error("Error updating menu image:", error);
      throw new Error(error.message);
    }

    result = data;
  } else {
    // Insert a new image record
    const { data, error } = await supabase
      .from("menu_image")
      .insert([updateData])
      .select();

    if (error) {
      console.error("Error inserting new menu image:", error);
      throw new Error(error.message);
    }

    result = data;
  }

  if (!result || result.length === 0) {
    throw new Error("Update failed: No data returned");
  }

  return result[0];
};
