"use client";
import { useOrders } from "@/modules/order/utils";
import OrderCard from "./OrderCard";

export default function OrderList() {
  const orders = useOrders();
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const today = new Date();
  const todayName = days[today.getDay()]; // returns e.g. "Friday"
  const todaysOrders = orders?.filter(
    (order) => order.takeaway_time_slot?.day_of_week === todayName
  );
  return (
    <div>
      <div className="grid grid-cols-11 gap-4 items-center p-4 rounded-xl">
        <p className="flex justify-center font-bold">Afgehaald</p>
        <p className="flex justify-center font-bold">Naam</p>
        <p className="flex justify-center font-bold col-span-2">
          Telefoonnummer
        </p>
        <p className="flex justify-center font-bold">Afhaaltijd</p>
        <p className="flex justify-center font-bold">Prijs</p>
        <p className="col-span-3 flex justify-center font-bold">Bestelling</p>
        <p className="flex justify-center font-bold col-span-2">Acties</p>
      </div>
      <ul>
        {todaysOrders
          .sort((a, b) => {
            return (
              new Date(a.take_away_time).getTime() -
              new Date(b.take_away_time).getTime()
            );
          })
          .map((order) => (
            <li key={order.id} className="my-4">
              <OrderCard order={order} />
            </li>
          ))}
      </ul>
    </div>
  );
}
