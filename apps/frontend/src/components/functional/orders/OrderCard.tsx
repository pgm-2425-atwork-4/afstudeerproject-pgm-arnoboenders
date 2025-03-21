"use client";
import { deleteOrder, updateOrderStatus } from "@/modules/order/api";
import { Order, OrderItem } from "@/modules/order/types";
import { getTime } from "@/modules/time-slots/api";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import InputField from "../input/InputField";

export default function OrderCard({ order }: { order: Order }) {
  const [time, setTime] = useState<string | null>(null);
  const [pickedUp, setPickedUp] = useState(order.picked_up); // Track status

  useEffect(() => {
    const fetchTime = async () => {
      if (!order.take_away_time) return;
      const timeSlot = await getTime({ id: order.take_away_time });
      if (timeSlot) {
        setTime(timeSlot[0].time_slot);
      }
    };
    fetchTime();
  }, [order.take_away_time]);

  const handlePickedUp = async () => {
    const newStatus = !pickedUp;
    setPickedUp(newStatus); // Optimistic UI update

    try {
      await updateOrderStatus(order.id, newStatus); // Call API
    } catch (error) {
      console.error("Error updating order:", error);
      setPickedUp(!newStatus); // Revert on error
    }
  };

  return (
    <div
      className={`grid grid-cols-11 gap-4 items-center p-4 rounded-xl shadow-lg transition ${
      pickedUp ? "bg-green-200 opacity-50" : "bg-primary50"
      }`}
    >
      <div className="flex justify-center">
        <InputField
          type="checkbox"
          checked={pickedUp}
          onChange={handlePickedUp}
          name="pickedUp"
          id={`pickedUp-${order.id}`}
          placeholder=""
        />
      </div>
      <p className="flex justify-center">{order.name}</p>
      <p className="flex justify-center col-span-2">{order.phone_number}</p>
      <p className="flex justify-center">{time?.slice(0, 5)}</p>
      <p className="flex justify-center">€ {order.price}</p>
      <ul className="col-span-3 flex flex-col gap-2">
        {Array.isArray(order.order_data) &&
          (order.order_data as OrderItem[]).map(
            (item: OrderItem) =>
              item && (
                <li key={item.id} className="flex gap-2">
                  <strong className="min-w-7">X {item.amount}</strong>{" "}
                  <p>{item.name}</p>
                </li>
              )
          )}
      </ul>
      <div className="flex justify-center gap-4 col-span-2">
        <button onClick={() => deleteOrder(order.id)}>
          <Trash2 />
        </button>
      </div>
    </div>
  );
}
