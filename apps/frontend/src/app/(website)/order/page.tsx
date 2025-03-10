import OrderBox from "./components/OrderBox";
import OrderMenu from "./components/OrderMenu";

export default function OrderPage() {
  return (
    <div className="container my-32">
      <h1>Bestel</h1>
      <div className="flex flex-col lg:flex-row-reverse justify-between gap-8">
        <div className="w-1/3">
          <OrderBox layout="sticky" />
        </div>
        <div className="w-2/3">
          <OrderMenu />
        </div>
      </div>
    </div>
  );
}
