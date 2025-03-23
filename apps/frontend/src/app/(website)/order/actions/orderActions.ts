import { orderSchema } from "@/app/schemas/order";
import { OrderItem } from "@/modules/order/types";
import { TimeSlot } from "@/modules/time-slots/types";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || ""
);

export interface SubmitOrderProps {
  aggregatedOrders: OrderItem[];
  selectedTime: number | null;
  availableTimeSlots: TimeSlot[];
  customerName: string;
  phoneNumber: string;
  setError: (error: string) => void;
  skipPayment?: boolean;
}

export const handleOrderSubmit = async ({
  aggregatedOrders,
  selectedTime,
  availableTimeSlots,
  customerName,
  phoneNumber,
  setError,
  event,
  skipPayment,
}: SubmitOrderProps & { event: React.FormEvent }) => {
  event.preventDefault();
  const validationResult = orderSchema.safeParse({
    customerName,
    phoneNumber,
    selectedTime,
  });

  if (!validationResult.success) {
    setError(validationResult.error.errors[0]?.message);
    return;
  }

  const selectedSlot = availableTimeSlots.find(
    (slot) => slot.id === selectedTime
  );

  if (!selectedSlot) {
    setError("Ongeldige afhaaltijd geselecteerd!");
    return;
  }

  const orderData = {
    orderId: Math.random().toString(36).substr(2, 9), // Generate order ID
    price: aggregatedOrders.reduce((acc, order) => acc + order.price, 0),
    order_data: aggregatedOrders.map(({ id, amount, name, price }) => ({
      id,
      amount,
      name,
      price,
    })),
    name: customerName,
    phone_number: phoneNumber,
    take_away_time: selectedSlot.id,
  };

  if (skipPayment) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/orders/save-unpaid-order`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...orderData, paid: false }),
        }
      );

      if (!response.ok) throw new Error("Order kon niet opgeslagen worden.");

      return;
    } catch (error) {
      console.error("Fout bij order opslaan:", error);
      setError("Kon order niet opslaan. Probeer het later opnieuw.");
    }

    return;
  }
  try {
    console.log("Starting payment...");
    // Step 1: Request a Stripe Checkout Session
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/orders/create-checkout-session`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...orderData, paid: true }),
      }
    );

    const session = await response.json();

    if (!session.sessionId) {
      setError("Betaling kon niet worden gestart.");
      return;
    }

    // Step 2: Redirect to Stripe Checkout
    const stripe = await stripePromise;
    if (!stripe) throw new Error("Stripe failed to load.");

    await stripe.redirectToCheckout({ sessionId: session.sessionId });
  } catch (error) {
    console.error("Fout bij het starten van de betaling:", error);
    setError("Kon betaling niet starten. Probeer het later opnieuw.");
  }
};
