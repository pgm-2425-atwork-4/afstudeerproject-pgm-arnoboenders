import OrderForm from "./components/OrderForm";
import OrderMenu from "./components/OrderMenu";

export default function OrderPage() {
  return (
    <div className="container my-32">
      <h1>Bestel</h1>
      <div className="flex justify-between items-start gap-8">
        <OrderMenu />
        <OrderForm />
      </div>
    </div>
  );
}
