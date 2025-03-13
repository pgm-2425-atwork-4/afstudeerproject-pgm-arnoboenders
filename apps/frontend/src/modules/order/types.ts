import { Tables } from "@/core/networking/database.types";

export type Order = Tables<"orders">;

export type OrderItem = {
  id: string;
  name: string;
  amount: number;
  price: number;
  created_at: string;
  updated_at: string;
};
