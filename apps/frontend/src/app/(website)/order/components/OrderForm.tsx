"use client";

import { useOrders } from "@/components/context/OrderProvider";
import Button from "@/components/functional/button/Button";

interface Order {
  id: number;
  amount: number;
  price: number;
  name: string;
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

export default function OrderForm() {
  const { orders } = useOrders();
  const aggregatedOrders = aggregateOrders(orders);

  return (
    <form className="sticky top-8 flex flex-col justify-center gap-4 w-3/4">
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
      <Button text="Bestel" type="submit" />
    </form>
  );
}
