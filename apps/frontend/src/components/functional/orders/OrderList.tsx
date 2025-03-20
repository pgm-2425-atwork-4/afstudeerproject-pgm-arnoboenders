"use client";
import { useOrders } from "@/modules/order/utils";
import OrderCard from "./OrderCard";

export default function OrderList() {
  const orders = useOrders();
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
        {orders &&
          orders
            .sort((a, b) => {
              if (a.picked_up === b.picked_up) {
                return (
                  new Date(a.take_away_time).getTime() -
                  new Date(b.take_away_time).getTime()
                );
              }
              return a.picked_up ? 1 : -1;
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
