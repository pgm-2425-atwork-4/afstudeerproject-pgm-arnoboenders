import Button from "@/components/functional/button/Button";

export default function OrderForm() {
  return (
    <form className="sticky top-8 flex flex-col justify-center gap-4 w-full">
      <h2>Bestelling</h2>
      <div className="flex justify-between gap-4">
        <div className="flex gap-4">
          <p>X 2</p>
          <p>Order</p>
        </div>
        <p>Price</p>
      </div>
      <Button text="Bestel" type="submit" />
    </form>
  );
}
