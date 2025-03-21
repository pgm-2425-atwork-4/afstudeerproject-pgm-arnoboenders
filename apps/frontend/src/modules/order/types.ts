import { Tables } from "@/core/networking/database.types";
import { Pasta, Size } from "../menu/types";

export type Order = Tables<"orders"> & {
  order_items: OrderItem[];
  takeaway_time_slot?: {
    id: number;
    day_of_week: string;
  };
};

export type OrderItem = {
  id: string;
  name: string;
  amount: number;
  price: number;
  size?: Size | null;
  pasta?: Pasta | null;
  created_at: string;
  updated_at: string;
};
