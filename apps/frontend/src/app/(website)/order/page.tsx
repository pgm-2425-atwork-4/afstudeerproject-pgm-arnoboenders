import { Metadata } from "next";
import OrderBox from "./components/OrderBox";
import OrderMenu from "./components/OrderMenu";

export const metadata: Metadata = {
  title: "Loos-merchtem | Bestel",
  description: "Website loos merchtem",
};

export default function OrderPage() {
  return (
    <div className="container my-32">
      <h1>Bestel</h1>
      <div className="flex flex-col lg:flex-row-reverse justify-between gap-8">
        <div className="lg:w-1/3">
          <OrderBox layout="sticky" />
        </div>
        <div className="lg:w-2/3">
          <OrderMenu />
        </div>
      </div>
    </div>
  );
}
