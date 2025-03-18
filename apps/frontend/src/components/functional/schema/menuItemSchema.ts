import { z } from "zod";

export const menuItemSchema = z.object({
  name: z.string().min(3, "Naam moet minstens 3 tekens bevatten."),
  price: z.preprocess(
    (val) => (typeof val === "string" ? Number(val) || 0 : val),
    z.number().min(1, "Prijs moet minstens €1 zijn.")
  ),
  category_id: z.string().min(1, "Categorie is verplicht."),
  is_new: z.boolean(),
  veggie: z.boolean(),
  order_number: z.preprocess(
    (val) => (val ? Number(val) : undefined),
    z.number().optional()
  ),
  image: z.string().nullable().optional(),
});
