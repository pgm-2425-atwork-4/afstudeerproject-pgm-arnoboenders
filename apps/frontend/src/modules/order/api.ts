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
