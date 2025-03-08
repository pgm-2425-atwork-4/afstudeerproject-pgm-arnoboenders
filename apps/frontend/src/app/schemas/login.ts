import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Geen geldig email addres" }),
  password: z.string(),
});
