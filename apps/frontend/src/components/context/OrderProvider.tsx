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
  removeOrder: (id: number) => void;
  emptyOrders: () => void;
}

const OrderContext = createContext<OrderContextProps | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  const addOrder = (newItems: Order[]) => {
    setOrders((prevOrders) => {
      const updatedOrders = prevOrders.map((order) => ({ ...order })); // Create a new copy of orders

      newItems.forEach((newItem) => {
        // Check if an exact match exists
        const existingIndex = updatedOrders.findIndex(
          (order) =>
            order.id === newItem.id &&
            order.size === newItem.size &&
            order.pastaType === newItem.pastaType
        );

        if (existingIndex !== -1) {
          // If the order exists, increase quantity
          updatedOrders[existingIndex] = {
            ...updatedOrders[existingIndex],
            amount: updatedOrders[existingIndex].amount + 1,
          };
        } else {
          // If not, add it as a new order line
          updatedOrders.push({ ...newItem, amount: 1 });
        }
      });

      return updatedOrders; // Return the new state
    });
  };

  const removeOrder = (id: number) => {
    setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
  };

  const emptyOrders = () => {
    setOrders([]);
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder, removeOrder, emptyOrders }}>
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
