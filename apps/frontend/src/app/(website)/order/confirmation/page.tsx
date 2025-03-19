"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Button from "@/components/functional/button/Button";
import { getTime } from "@/modules/time-slots/api";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Loos-merchtem | Bestelling bevestigd",
  description: "Website loos merchtem",
};

interface OrderDetails {
  name: string;
  phone_number: string;
  take_away_time: string;
  price: number;
}

export default function ConfirmationPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId"); // Get orderId from URL
  const router = useRouter();
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [time, setTime] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (orderId) {
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/orders/get-order?orderId=${orderId}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setOrderDetails(data.order);
            const fetchTime = async () => {
              const timeSlot = await getTime({
                id: data.order.take_away_time as number,
              });
              if (timeSlot) setTime(timeSlot[0].time_slot);
            };
            fetchTime();
          } else {
            setError("Order not found.");
          }
          setLoading(false);
        })
        .catch(() => {
          setError("Error fetching order details.");
          setLoading(false);
        });
    } else {
      setError("No order ID provided.");
      setLoading(false);
    }
  }, [orderId]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-2xl font-bold">Loading your order...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-2xl font-bold text-red-600">Error</h2>
        <p>{error}</p>
        <Button text="Go to Home" onClick={() => router.push("/")} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 items-center justify-center h-screen">
      <Image src="/Loos_logo_dark.png" width={200} height={200} alt="Success" />
      <div className="flex flex-col gap-4 items-center">
        <h1 className="text-2xl font-bold">
          Bedankt voor uw bestelling {orderDetails?.name}
        </h1>
        <p>Uw bestelling is succesvol geplaatst.</p>
        <p>
          U kan uw bestelling komen afhalen om{" "}
          <strong>{time.slice(0, 5)}</strong>
        </p>
      </div>
      <Button text="Terug naar home" onClick={() => router.push("/")} />
    </div>
  );
}
