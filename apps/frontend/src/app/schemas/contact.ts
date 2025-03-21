import * as z from "zod";

export const contactSchema = z.object({
  subject: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(5),
});
