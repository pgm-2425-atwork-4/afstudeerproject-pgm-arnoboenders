// components/OrderBox.tsx
"use client";

import { useOrders } from "@/components/context/OrderProvider";
import Button from "@/components/functional/button/Button";
import { OrderItem } from "@/modules/order/types";
import { aggregateOrders } from "@/modules/order/utils";
import { Trash2 } from "lucide-react";
import { redirect } from "next/navigation";
import { useState } from "react";
import { useTimeSlots } from "./useTimeSlots";
import { handleOrderSubmit } from "../actions/orderActions";
import { Pasta, Size } from "@/modules/menu/types";
import InputField from "@/components/functional/input/InputField";

interface OrderBoxProps {
  layout?: "sticky" | "fullwidth";
  showForm?: boolean;
  buttonText?: string;
}

export default function OrderBox({
  layout = "sticky",
  showForm = false,
  buttonText = "Bestel",
}: OrderBoxProps) {
  const { orders: rawOrders, emptyOrders, removeOrder } = useOrders();
  const orders: OrderItem[] = rawOrders.map((order) => ({
    ...order,
    size: order.size as Size,
    pasta: order.pasta as Pasta,
  }));
  const aggregatedOrders = aggregateOrders(orders);

  const totalOrders = orders.reduce((acc, order) => acc + order.amount, 0);
  const { availableTimeSlots } = useTimeSlots(totalOrders);

  const [selectedTime, setSelectedTime] = useState<number | null>(null);
  const [customerName, setCustomerName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  return (
    <div
      className={`${
        layout === "sticky" ? "sticky top-8 gap-4 w-full" : "w-full p-8 gap-8"
      } flex flex-col justify-center`}
    >
      <h2>Bestelling</h2>
      {aggregatedOrders.map(({ id, amount, price, name }) => (
        <div key={`${id}-${name}`} className="flex justify-between gap-4">
          <div className="flex justify-between w-full">
            <div className="flex gap-4">
              <p>{amount}x</p>
              <p>{name}</p>
            </div>
            <p className="min-w-14">€ {price.toFixed(2)}</p>
          </div>

          <button onClick={() => removeOrder(id.toString())}>
            <Trash2 className="text-red-500" />
          </button>
        </div>
      ))}

      <div className="flex justify-between items-center gap-4">
        <p>Totaal:</p>
        <p>
          €{" "}
          {aggregatedOrders
            .reduce((acc, order) => acc + order.price, 0)
            .toFixed(2)}
        </p>
      </div>

      {layout === "fullwidth" && (
        <div className="mt-4">
          <h3 className="mb-2">Kies een afhaaltijd:</h3>
          <div className="flex gap-2 flex-wrap">
            {availableTimeSlots.map((time) => (
              <button
                key={time.id}
                onClick={() => setSelectedTime(time.id)}
                className={`p-2 border rounded ${
                  selectedTime === time.id
                    ? "bg-primary text-white"
                    : "bg-primary200 hover:bg-primary"
                }`}
              >
                {time.time_slot}
              </button>
            ))}
          </div>
        </div>
      )}

      {showForm ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleOrderSubmit({
              event: e,
              aggregatedOrders,
              selectedTime,
              availableTimeSlots,
              customerName,
              phoneNumber,
              emptyOrders,
            });
          }}
          className="flex flex-col gap-4"
        >
          <InputField
            label="Naam"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            type="text"
            name="customerName"
            id="customerName"
            placeholder="Voer uw naam in"
          />
          <InputField
            label="Telefoonnummer"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            type="tel"
            name="phoneNumber"
            id="phoneNumber"
            placeholder="Voer uw telefoonnummer in"
          />
          <Button text={buttonText} type="submit" />
        </form>
      ) : (
        <Button text={buttonText} onClick={() => redirect("order/overview")} />
      )}
    </div>
  );
}
