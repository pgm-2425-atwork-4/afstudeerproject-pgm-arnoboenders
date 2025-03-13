import { supabase } from "@/core/networking/api";
import { Order } from "./types";

export const createOrder = async (
  orderData: Partial<Order>
): Promise<Order> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData),
  });

  return response.json();
};

export const fetchOrders = async (): Promise<Order[] | null> => {
  const { data, error } = await supabase.from("orders").select("*");

  if (error) {
    console.error("Error fetching orders:", error);
    return null;
  }

  return Promise.resolve(data);
};
