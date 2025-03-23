import { Suspense } from "react";
import PaymentSuccess from "./PaymentSuccess";

export default function ConfirmationPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentSuccess />
    </Suspense>
  );
}
