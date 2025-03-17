"use client";
import { Order, OrderItem } from "@/modules/order/types";
import { getTime } from "@/modules/time-slots/api";
import { Edit, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function OrderCard({ order }: { order: Order }) {
  const [time, setTime] = useState<string | null>(null);
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
  return (
    <div className="grid grid-cols-8 gap-4 items-center bg-primary50 p-4 rounded-xl shadow-lg">
      <div className="flex justify-center">
        <input type="checkbox" />
      </div>
      <p className="flex justify-center">{order.name}</p>
      <p className="flex justify-center">{order.phone_number}</p>
      <p className="flex justify-center">{time?.slice(0, 5)}</p>
      <p className="flex justify-center">€ {order.price}</p>
      <ul className="col-span-2 flex flex-col gap-2 mx-auto">
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
      <div className="flex justify-end gap-4">
        <button className="btn-primary">
          <Edit />
        </button>
        <button>
          <Trash2 />
        </button>
      </div>
    </div>
  );
}
