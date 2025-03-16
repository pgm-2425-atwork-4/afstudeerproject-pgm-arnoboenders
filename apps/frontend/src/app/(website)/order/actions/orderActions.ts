// actions/orderActions.ts
import { assignTimeSlot, createOrder } from "@/modules/order/api";
import { OrderItem } from "@/modules/order/types";
import { TimeSlot } from "@/modules/time-slots/types";

interface SubmitOrderProps {
  aggregatedOrders: OrderItem[];
  selectedTime: number | null;
  availableTimeSlots: TimeSlot[];
  customerName: string;
  phoneNumber: string;
  emptyOrders: () => void;
}

export const handleOrderSubmit = async ({
  aggregatedOrders,
  selectedTime,
  availableTimeSlots,
  customerName,
  phoneNumber,
  emptyOrders,
  event, // Add event here
}: SubmitOrderProps & { event: React.FormEvent }) => {
  event.preventDefault(); // Ensure we prevent default browser form submission

  if (!customerName || !phoneNumber || !selectedTime) {
    alert("Vul alle velden in voordat je bestelt!");
    return;
  }

  const selectedSlot = availableTimeSlots.find(
    (slot) => slot.id === selectedTime
  );

  if (!selectedSlot) {
    alert("Ongeldige afhaaltijd geselecteerd!");
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
    }
  } catch (error) {
    console.error("Fout bij het plaatsen van de bestelling:", error);
  }
};
