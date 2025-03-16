import { supabase } from "@/core/networking/api";
import { Order } from "./types";
import { TimeSlot } from "../time-slots/types";

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

export const fetchAvailableTimeSlots = async (): Promise<TimeSlot[]> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/takeaway-times`
    );
    if (!response.ok) throw new Error("Failed to fetch time slots");
    return response.json();
  } catch (error) {
    console.error("Error fetching takeaway times:", error);
    return [];
  }
};

export const assignTimeSlot = async (
  timeSlot: TimeSlot,
  orderId: string
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
