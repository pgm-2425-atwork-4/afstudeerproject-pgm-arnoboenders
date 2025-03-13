import OrderList from "@/components/functional/orders/OrderList";
export default function OrderOverviewPage() {
  return (
    <div className="container my-10">
      <h1>Bestellingen</h1>
      <OrderList />
    </div>
  );
}
