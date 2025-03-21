import { supabase } from "@/core/networking/api";
import { TimeSlot } from "./types";

export const getTime = async ({
  id,
}: {
  id: number;
}): Promise<TimeSlot[] | null> => {
  const { data, error } = await supabase
    .from("takeaway_time_slots")
    .select("*")
    .eq("id", id);
  if (error) {
    throw error;
  }
  return Promise.resolve(data);
};

export const getTimes = async (): Promise<TimeSlot[] | null> => {
  const { data, error } = await supabase
    .from("takeaway_time_slots")
    .select("*");
  if (error) {
    throw error;
  }
  return Promise.resolve(data);
};
