import { z } from "zod";
export const orderSchema = z.object({
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
