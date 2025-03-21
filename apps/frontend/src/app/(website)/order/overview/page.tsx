import { Metadata } from "next";
import OrderBox from "../components/OrderBox";
import BackButton from "@/components/functional/button/BackButton";

export const metadata: Metadata = {
  title: "Loos-merchtem | Bestel overzicht",
  description: "Website loos merchtem",
};

export default function OrderOverview() {
  const path: string = "order";
  return (
    <div className="container my-32">
      <h1>Bestel overzicht</h1>
      <BackButton path={path} />
      <div className="flex justify-center">
        <div className="w-full md:w-1/2">
          <OrderBox
            layout="fullwidth"
            showForm={true}
            buttonText="Ga door naar betaling"
          />
        </div>
      </div>
    </div>
  );
}
