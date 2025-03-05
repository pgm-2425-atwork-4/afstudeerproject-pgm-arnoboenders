import OrderBox from "../components/OrderBox";
import BackButton from "@/components/functional/button/BackButton";

export default function OrderOverview() {
  return (
    <div className="container my-32">
      <h1>Bestel overzicht</h1>
      <BackButton />
      <div className="flex justify-center">
        <div className="w-1/2">
          <OrderBox
            layout="fullwidth"
            showForm={true}
            buttonText="Plaats bestelling"
          />
        </div>
      </div>
    </div>
  );
}
