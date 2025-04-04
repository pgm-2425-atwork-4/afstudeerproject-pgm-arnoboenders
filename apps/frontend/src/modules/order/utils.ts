import { useEffect, useState } from "react";
import { supabase } from "@/core/networking/api";
import { fetchOrders } from "./api";
import { Order, OrderItem } from "./types";

interface OrderPayload {
  eventType: "INSERT" | "UPDATE" | "DELETE";
  new: Order;
  old: Order;
}

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    // Initial fetch
    fetchOrders().then((fetchedOrders) => {
      if (fetchedOrders) {
        setOrders(fetchedOrders);
      }
    });

    const channel = supabase
      .channel("orders-channel")
      .on(
        // @ts-expect-error: Supabase client does not have a strict type for "postgres_changes"
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "orders",
        },
        async (payload: OrderPayload) => {
          if (
            payload.eventType === "INSERT" ||
            payload.eventType === "UPDATE"
          ) {
            const fresh = await fetchOrders();
            if (fresh) setOrders(fresh);
          } else if (payload.eventType === "DELETE") {
            setOrders((prev) =>
              prev.filter((order) => order.id !== payload.old.id)
            );
          }
        }
      )

      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return orders;
};

export const aggregateOrders = (orders: OrderItem[]): OrderItem[] => {
  return orders.reduce<OrderItem[]>((acc, order) => {
    const existingOrder = acc.find(
      (o) =>
        o.id === order.id &&
        o.size?.name === order.size?.name &&
        o.pasta?.pasta === order.pasta?.pasta
    );

    if (existingOrder) {
      existingOrder.amount += order.amount;
    } else {
      acc.push({
        ...order,
        amount: Number(order.amount) || 1,
        price: order.price,
      });
    }
    return acc;
  }, []);
};
