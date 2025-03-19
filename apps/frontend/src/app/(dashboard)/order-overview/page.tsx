import OrderList from "@/components/functional/orders/OrderList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Loos-backoffice | Bestellingen",
  description: "Backoffice loos merchtem",
};

export default function OrderOverviewPage() {
  return (
    <div className="container my-10">
      <h1>Bestellingen</h1>
      <OrderList />
    </div>
  );
}
