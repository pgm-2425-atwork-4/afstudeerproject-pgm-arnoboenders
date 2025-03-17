// hooks/useTimeSlots.ts
import { useEffect, useState } from "react";
import { fetchAvailableTimeSlots } from "@/modules/order/api";
import { TimeSlot } from "@/modules/time-slots/types";

export const useTimeSlots = (totalOrders: number) => {
  const [availableTimeSlots, setAvailableTimeSlots] = useState<TimeSlot[]>([]);

  useEffect(() => {
    const loadTimeSlots = async () => {
      const slots = await fetchAvailableTimeSlots();
      if (totalOrders > 8 && slots[0]?.current_orders >= 3) {
        slots.shift();
      }
      setAvailableTimeSlots(slots);
    };

    loadTimeSlots();
  }, [totalOrders]);

  return { availableTimeSlots, setAvailableTimeSlots };
};
