"use client";

import { useOrders } from "@/components/context/OrderProvider";
import Button from "@/components/functional/button/Button";
import { redirect } from "next/navigation";
import { useState } from "react";

interface Order {
  id: number;
  amount: number;
  price: number;
  name: string;
}

interface OrderBoxProps {
  layout?: "sticky" | "fullwidth"; // Determines layout style
  showForm?: boolean; // Show form elements
  onSubmit?: (event: React.FormEvent) => void; // Handle form submission
  buttonText?: string; // Customize button text
  buttonAction?: () => void; // Function to execute on button click
}

const aggregateOrders = (orders: Order[]): Order[] => {
  return orders.reduce<Order[]>((acc, order) => {
    const existingOrder = acc.find((o) => o.id === order.id);
    if (existingOrder) {
      existingOrder.amount += 1;
      existingOrder.price += order.price;
    } else {
      acc.push({ ...order, amount: Number(order.amount) || 1 });
    }
    return acc;
  }, []);
};

export default function OrderBox({
  layout = "sticky",
  showForm = false,
  onSubmit,
  buttonText = "Bestel",
  buttonAction = () => redirect("/order/overview"),
}: OrderBoxProps) {
  const { orders } = useOrders();
  const aggregatedOrders = aggregateOrders(orders);

  // State for selected time slot
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // Time slot options (example times)
  const timeSlots = ["12:00", "12:30", "13:00", "13:30", "14:00"];

  return (
    <div
      className={`${
        layout === "sticky"
          ? "sticky top-8 gap-4" // Sticky sidebar layout
          : "w-full p-8 gap-8" // Full-width layout
      } flex flex-col justify-center`}
    >
      <h2>Bestelling</h2>
      {aggregatedOrders.map(({ id, amount, price, name }) => (
        <div key={id} className="flex justify-between gap-4">
          <div className="flex gap-4">
            <p>{amount}x</p>
            <p>{name}</p>
          </div>
          <p>€ {price.toFixed(2)}</p>
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

      {/* Show time slots if fullwidth layout */}
      {layout === "fullwidth" && (
        <div className="mt-4">
          <h3 className="mb-2">Kies een afhaaltijd:</h3>
          <div className="flex gap-2 flex-wrap">
            {timeSlots.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`p-2 border rounded ${
                  selectedTime === time
                    ? "bg-primary text-white"
                    : "bg-primaryHover hover:bg-primary"
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      )}

      {showForm ? (
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <h3>Vul jouw gegevens in</h3>
          <label>
            Naam:
            <input type="text" className="border p-2 rounded w-full" required />
          </label>
          <label>
            Adres:
            <input type="text" className="border p-2 rounded w-full" required />
          </label>
          {selectedTime && (
            <p className="text-green-600">Afhaal tijd: {selectedTime}</p>
          )}
          <Button text={buttonText} type="submit" />
        </form>
      ) : (
        <Button text={buttonText} onClick={buttonAction} />
      )}
    </div>
  );
}
