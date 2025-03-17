import { Tables } from "@/core/networking/database.types";

export type MenuItem = Tables<"menu">;

export type CreateMenuItem = Omit<MenuItem, "id" | "created_at" | "updated_at">;

export type MenuCategory = Tables<"menu_category">;

export type Pasta = {
  pasta: string;
};

export type Size = {
  name: string;
  priceChange: number;
};
