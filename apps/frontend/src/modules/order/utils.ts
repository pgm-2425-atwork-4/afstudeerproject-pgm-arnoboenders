import { supabase } from "@/core/networking/api";
import { useEffect, useState } from "react";
import { fetchOrders } from "./api";
import { Order } from "./types";
import { OrderItem } from "@/modules/order/types";

interface OrderPayload {
  eventType: "INSERT" | "UPDATE" | "DELETE";
  new: Order;
  old: Order;
}

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  // Fetch initial orders

  useEffect(() => {
    fetchOrders().then((fetchedOrders) => {
      if (fetchedOrders) {
        setOrders(fetchedOrders);
      }
    });

    const subscription = supabase
      .channel("orders-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "orders" },
        (payload: OrderPayload) => {
          setOrders((prevOrders) => {
            if (payload.eventType === "INSERT") {
              return [...prevOrders, payload.new];
            } else if (payload.eventType === "UPDATE") {
              return prevOrders.map((order) =>
                order.id === payload.new.id ? payload.new : order
              );
            } else if (payload.eventType === "DELETE") {
              return prevOrders.filter((order) => order.id !== payload.old.id);
            }
            return prevOrders;
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription); // Cleanup on unmount
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