import OrderForm from "./components/OrderForm";
import OrderMenu from "./components/OrderMenu";

export default function OrderPage() {
  return (
    <div className="container my-32">
      <h1>Bestel</h1>
      <div className="flex justify-between gap-8">
        <div className="w-2/3">
          <OrderMenu />
        </div>
        <div className="w-1/3">
          <OrderForm />
        </div>
      </div>
    </div>
  );
}
