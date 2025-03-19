"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const session_id = searchParams.get("session_id");
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (session_id) {
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/orders/check-payment?sessionId=${session_id}`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log("Payment verification response:", data);
          if (data.success && data.orderId) {
            console.log(
              "✅ Redirecting to confirmation with orderId:",
              data.orderId
            );
            router.push(`/order/confirmation?orderId=${data.orderId}`);
          } else {
            console.error("❌ No orderId received:", data);
            setError("Payment not completed.");
            setLoading(false);
          }
        })
        .catch((err) => {
          console.error("❌ Error verifying payment:", err);
          setError("Error verifying payment.");
          setLoading(false);
        });
    }
  }, [session_id, router]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-2xl font-bold">Processing your payment...</h2>
        <p>One moment while we verify your order.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold text-red-600">Payment Failed</h2>
      <p>{error}</p>
      <button
        onClick={() => router.push("/")}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Go to Home
      </button>
    </div>
  );
}
