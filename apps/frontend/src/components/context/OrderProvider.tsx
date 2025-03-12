"use client";
import { MenuItem } from "@/modules/menu/types";
import React, { createContext, useState, useContext, ReactNode } from "react";

interface Order extends MenuItem {
  amount: number;
  size?: string;
  pastaType?: string;
}

interface OrderContextProps {
  orders: Order[];
  addOrder: (menuItems: Order[]) => void;
  removeOrder: (id: string) => void;
  emptyOrders: () => void;
}

const OrderContext = createContext<OrderContextProps | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  const addOrder = (newItems: Order[]) => {
    setOrders((prevOrders) => {
      const updatedOrders = prevOrders.map((order) => ({ ...order })); // Create a new copy of orders

      newItems.forEach((newItem) => {
        const existingIndex = updatedOrders.findIndex(
          (order) =>
            order.id === newItem.id &&
            order.size === newItem.size &&
            order.pastaType === newItem.pastaType
        );

        if (existingIndex !== -1) {
          // If the order exists, increase quantity and update price correctly
          updatedOrders[existingIndex] = {
            ...updatedOrders[existingIndex],
            amount: updatedOrders[existingIndex].amount + 1,
            price: newItem.price * (updatedOrders[existingIndex].amount + 1), // Update price based on new amount
          };
        } else {
          // If not, add it as a new order line
          updatedOrders.push({ ...newItem, amount: 1, price: newItem.price });
        }
      });

      return updatedOrders; // Return the new state
    });
  };

  const removeOrder = (id: string) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) => {
      if (order.id === id) {
        if (order.amount > 1) {
        return { ...order, amount: order.amount - 1, price: order.price - order.price / order.amount };
        } else {
        return null;
        }
      }
      return order;
      }).filter(order => order !== null)
    );
  };

  const emptyOrders = () => {
    setOrders([]);
  };

  return (
    <OrderContext.Provider
      value={{ orders, addOrder, removeOrder, emptyOrders }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrders must be used within an OrderProvider");
  }
  return context;
};
