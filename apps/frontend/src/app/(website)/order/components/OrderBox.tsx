"use client";

import { useOrders } from "@/components/context/OrderProvider";
import Button from "@/components/functional/button/Button";
import {
  assignTimeSlot,
  createOrder,
  fetchAvailableTimeSlots,
} from "@/modules/order/api";

import { Trash2 } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

interface Order {
  id: string;
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
    const existingOrder = acc.find(
      (o) =>
        o.id === order.id &&
        o.size === order.size &&
        o.pastaType === order.pastaType
    );

    if (existingOrder) {
      existingOrder.amount += order.amount; // Increase amount
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

export default function OrderBox({
  layout = "sticky",
  showForm = false,
  buttonText = "Bestel",
}: OrderBoxProps) {
  const { orders, emptyOrders, removeOrder } = useOrders();
  const aggregatedOrders = aggregateOrders(orders);

  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [customerName, setCustomerName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  // Fetch available takeaway slots
  useEffect(() => {
    const loadTimeSlots = async () => {
      const slots = await fetchAvailableTimeSlots();
      setAvailableTimeSlots(slots);
    };

    loadTimeSlots();
  }, []);
  console.log("availableTimeSlots", availableTimeSlots);

  // Submit Order
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!customerName || !phoneNumber || !selectedTime) {
      alert("Vul alle velden in voordat je bestelt!");
      return;
    }

    const orderData = {
      price: aggregatedOrders.reduce((acc, order) => acc + order.price, 0), // Total price
      order_data: aggregatedOrders.map(({ id, amount, name, price }) => ({
        id,
        amount,
        name,
        price,
      })), // Order details
      name: customerName,
      phone_number: phoneNumber,
      take_away_time: selectedTime,
    };

    try {
      console.log("orderData", orderData);
      const response = await createOrder(orderData);
      console.log("response", response);

      // Assign takeaway time slot in the database
      await assignTimeSlot(selectedTime);

      console.log("Bestelling geplaatst:", response);
      emptyOrders();
    } catch (error) {
      console.error("Fout bij het plaatsen van de bestelling:", error);
    }
  };

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
          {availableTimeSlots.length === 0 ? (
            <p>
              We zijn momenteel gesloten bekijk de openingsuren op
              <Link href={'/contact'} className="text-primary hover:underline"> deze pagina </Link>
            </p>
          ) : (
            <div className="flex gap-2 flex-wrap">
              {availableTimeSlots.map((time) => (
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
          )}
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
          <Button text={buttonText} type="submit" />
        </form>
      ) : (
        <Button text={buttonText} onClick={() => redirect("order/overview")} />
      )}
    </div>
  );
}
