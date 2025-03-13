import { Order, OrderItem } from "@/modules/order/types";
import { Edit, Trash2 } from "lucide-react";

export default function OrderCard({ order }: { order: Order }) {
  return (
    <div className="grid grid-cols-8 gap-4 items-center bg-primary50 p-4 rounded-xl shadow-lg">
      <div className="flex justify-center">
        <input type="checkbox" />
      </div>
      <p className="flex justify-center">{order.name}</p>
      <p className="flex justify-center">{order.phone_number}</p>
      <p className="flex justify-center">{order.take_away_time}</p>
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
