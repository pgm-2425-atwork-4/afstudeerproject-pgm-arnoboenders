import LogoutButton from "@/components/functional/button/LogoutButton";
import OrderList from "@/components/functional/orders/OrderList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Loos-backoffice | Bestellingen",
  description: "Backoffice loos merchtem",
};

export default function OrderOverviewPage() {
  return (
    <div className="container my-10">
      <div className="flex justify-between items-center">
        <h1>Bestellingen</h1>
        <LogoutButton />
      </div>
      <OrderList />
    </div>
  );
}
