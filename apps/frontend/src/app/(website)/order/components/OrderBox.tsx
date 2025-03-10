"use client";

import { useOrders } from "@/components/context/OrderProvider";
import Button from "@/components/functional/button/Button";
import { createOrder } from "@/modules/order/api";
import { redirect } from "next/navigation";
import { useState } from "react";

interface Order {
  id: number;
  amount: number;
  price: number;
  name: string;
  size?: string;
  pastaType?: string;
}

interface OrderBoxProps {
  layout?: "sticky" | "fullwidth";
  showForm?: boolean;
  buttonText?: string;
  buttonAction?: () => void;
}

const aggregateOrders = (orders: Order[]): Order[] => {
  return orders.reduce<Order[]>((acc, order) => {
    // Find an exact match with id, size, and pastaType
    const existingOrder = acc.find(
      (o) =>
        o.id === order.id &&
        o.size === order.size &&
        o.pastaType === order.pastaType
    );

    if (existingOrder) {
      existingOrder.amount += order.amount; // Increase amount if same variant exists
      existingOrder.price += order.price * order.amount; // Update price accordingly
    } else {
      acc.push({ ...order, amount: Number(order.amount) || 1 });
    }
    return acc;
  }, []);
};

export default function OrderBox({
  layout = "sticky",
  showForm = false,
  buttonText = "Bestel",
}: OrderBoxProps) {
  const { orders, emptyOrders } = useOrders();
  const aggregatedOrders = aggregateOrders(orders);

  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [customerName, setCustomerName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  // Example Time Slots
  const timeSlots = ["12:00", "12:30", "13:00", "13:30", "14:00"];

  // Submit Order
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!customerName || !phoneNumber || !selectedTime) {
      alert("Vul alle velden in voordat je bestelt!");
      return;
    }

    const orderData = {
      price: aggregatedOrders.reduce((acc, order) => acc + order.price, 0), // Total price
      order: aggregatedOrders.map(({ id, amount, name }) => ({
        id,
        amount,
        name,
      })), // Order details
      name: customerName,
      phone_number: phoneNumber,
      take_away_time: selectedTime,
    };

    try {
      console.log("orderData", orderData);
      const response = await createOrder(orderData);
      console.log("response", response);

      console.log("Bestelling geplaatst:", response);
      // redirect(paymentUrl);
      emptyOrders();
    } catch (error) {
      console.error("Fout bij het plaatsen van de bestelling:", error);
    }
  };

  return (
    <div
      className={`${
        layout === "sticky" ? "sticky top-8 gap-4" : "w-full p-8 gap-8"
      } flex flex-col justify-center`}
    >
      <h2>Bestelling</h2>
      {aggregatedOrders.map(({ id, amount, price, name }) => (
        <div key={`${id}-${name}`} className="flex justify-between gap-4">
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
                    : "bg-primary200 hover:bg-primary"
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      )}

      {showForm ? (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <h3>Vul jouw gegevens in</h3>
          <label>
            Naam:
            <input
              type="text"
              className="border p-2 rounded w-full"
              required
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </label>
          <label>
            Telefoonnummer:
            <input
              type="text"
              className="border p-2 rounded w-full"
              required
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </label>
          {selectedTime && (
            <p className="text-green-600">Afhaal tijd: {selectedTime}</p>
          )}
          <Button
            text={buttonText}
            type="submit"
            onClick={() => handleSubmit}
          />
        </form>
      ) : (
        <Button text={buttonText} onClick={() => redirect("order/overview")} />
      )}
    </div>
  );
}
