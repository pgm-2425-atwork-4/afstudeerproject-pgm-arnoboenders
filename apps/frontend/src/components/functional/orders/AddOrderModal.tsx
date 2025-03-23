"use client";

import { useState } from "react";
import Button from "@/components/functional/button/Button";
import Modal from "@/components/functional/modal/Modal";
import OrderMenu from "@/app/(website)/order/components/OrderMenu";
import OrderBox from "@/app/(website)/order/components/OrderBox";
import { handleOrderSubmit } from "@/app/(website)/order/actions/orderActions";
import { useOrders } from "@/components/context/OrderProvider";

export default function AddOrderModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { emptyOrders } = useOrders();

  const showSuccessMessage = (message: string) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  return (
    <>
      {successMessage && (
        <div className="bg-green-500 text-white p-2 rounded-xl shadow-lg text-center w-80 fixed top-4 z-50">
          {successMessage}
        </div>
      )}

      <div className="flex justify-end mb-4">
        <Button text="Voeg bestelling toe" onClick={() => setIsOpen(true)} />
      </div>

      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <div className="grid gap-8">
            <OrderMenu />
            <OrderBox
              layout="fullwidth"
              showForm
              buttonText={
                isSubmitting ? "Bezig met opslaan..." : "Bestelling opslaan"
              }
              onSubmitOverride={async (props) => {
                setIsSubmitting(true);

                await handleOrderSubmit({ ...props, skipPayment: true });

                emptyOrders();
                setIsOpen(false);
                showSuccessMessage("Bestelling succesvol toegevoegd!");
                setIsSubmitting(false);
              }}
            />
          </div>
        </Modal>
      )}
    </>
  );
}