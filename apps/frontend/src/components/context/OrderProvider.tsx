"use client";
import { MenuItem } from "@/modules/menu/types";
import React, { createContext, useState, useContext, ReactNode } from "react";

interface Order extends MenuItem {
  amount: number;
}

interface OrderContextProps {
  orders: Order[];
  addOrder: (menuItems: Order[]) => void;
  removeOrder: (id: number) => void;
}

const OrderContext = createContext<OrderContextProps | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  const addOrder = (menuItems: Order[]) => {
    setOrders((prevOrders) => [...prevOrders, ...menuItems]);
  };

  const removeOrder = (id: number) => {
    setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder, removeOrder }}>
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
