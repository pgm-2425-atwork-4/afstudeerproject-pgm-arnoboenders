import { supabase } from "@/core/networking/api";
import { Order } from "./types";
import { TimeSlot } from "../time-slots/types";

type CreateOrderResponse = {
  success: boolean;
  order_data: { id: number }[]; // Assuming orderData is an array of objects with `id`
};

export const createOrder = async (
  orderData: Partial<Order>
): Promise<CreateOrderResponse> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData),
  });

  if (!response.ok) {
    throw new Error(`Failed to create order: ${response.statusText}`);
  }

  return response.json() as Promise<CreateOrderResponse>;
};

export async function updateOrderStatus(orderId: number, pickedUp: boolean) {
  // Step 1: fetch current order
  const { data: existingOrder, error: fetchError } = await supabase
    .from("orders")
    .select("paid")
    .eq("id", orderId)
    .single();

  if (fetchError) throw fetchError;

  const currentPaid = existingOrder?.paid ?? false;

  // Step 2: update with new values
  const { data, error } = await supabase
    .from("orders")
    .update({
      picked_up: pickedUp,
      paid: !currentPaid,
    })
    .eq("id", orderId)
    .select();

  if (error) throw error;
  return data;
}

export const deleteOrder = async (orderId: number): Promise<Order[] | null> => {
  const { data, error } = await supabase
    .from("orders")
    .delete()
    .eq("id", orderId);
  if (error) {
    console.error("Error deleting order:", error);
    return null;
  }
  return Promise.resolve(data);
};

export const fetchOrders = async (): Promise<Order[] | null> => {
  const { data, error } = await supabase.from("orders").select(`
    *,
    takeaway_time_slot:take_away_time (
      id,
      day_of_week
    )
  `);

  if (error) {
    console.error("Error fetching orders:", error);
    return null;
  }
  return Promise.resolve(data);
};

export const fetchAvailableTimeSlots = async (): Promise<TimeSlot[]> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/takeaway-times`
    );
    return response.json();
  } catch (error) {
    console.error("Error fetching available time slots:", error);
    return [];
  }
};

export const assignTimeSlot = async (
  timeSlot: TimeSlot,
  orderId: number
): Promise<void> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/takeaway-times/assign`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ timeSlot, orderId }),
      }
    );

    if (!response.ok) throw new Error("Failed to assign takeaway time");
  } catch (error) {
    console.error("Error assigning takeaway time:", error);
  }
};
