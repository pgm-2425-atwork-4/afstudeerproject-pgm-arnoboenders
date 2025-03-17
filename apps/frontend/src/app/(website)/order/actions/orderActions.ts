import { assignTimeSlot, createOrder } from "@/modules/order/api";
import { OrderItem } from "@/modules/order/types";
import { TimeSlot } from "@/modules/time-slots/types";
import { z } from "zod";

interface SubmitOrderProps {
  aggregatedOrders: OrderItem[];
  selectedTime: number | null;
  availableTimeSlots: TimeSlot[];
  customerName: string;
  phoneNumber: string;
  emptyOrders: () => void;
  setError: (error: string) => void; // Add this function to set errors
}

const orderSchema = z.object({
  customerName: z.string().min(1, "Vul uw naam in."),
  phoneNumber: z
    .string()
    .min(1, "Vul uw telefoonnummer in")
    .regex(/^\d+$/, "Telefoonnummer moet uit cijfers bestaan"),
  selectedTime: z
    .number()
    .nullable()
    .refine((val) => val !== null, "Selecteer een afhaaltijd."),
});

export const handleOrderSubmit = async ({
  aggregatedOrders,
  selectedTime,
  availableTimeSlots,
  customerName,
  phoneNumber,
  emptyOrders,
  setError,
  event,
}: SubmitOrderProps & { event: React.FormEvent }) => {
  event.preventDefault(); // Prevent default form submission

  // Validate input using Zod
  const validationResult = orderSchema.safeParse({
    customerName,
    phoneNumber,
    selectedTime,
  });

  if (!validationResult.success) {
    const errorMessage = validationResult.error.errors[0]?.message;
    setError(errorMessage);
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

  try {
    const response = await createOrder(orderData);

    if (response.success && response.order_data.length > 0) {
      const orderId = response.order_data[0].id;
      await assignTimeSlot(selectedSlot, orderId);
      emptyOrders();
    } else {
      console.error("Unexpected orderData format:", response.order_data);
      setError("Er is een fout opgetreden bij het plaatsen van de bestelling.");
    }
  } catch (error) {
    console.error("Fout bij het plaatsen van de bestelling:", error);
    setError("Kon bestelling niet plaatsen. Probeer het later opnieuw.");
  }
};
