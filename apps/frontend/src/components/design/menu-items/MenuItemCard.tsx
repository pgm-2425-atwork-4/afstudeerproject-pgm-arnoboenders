import { MenuItem } from "@/modules/menu/types";
import { Vegan } from "lucide-react";

export default function MenuItemCard({ item }: { item: MenuItem }) {
  return (
    <div className="flex flex-col rounded-xl py-4">
      <div className="flex justify-between items-center">
        <h3 className="flex items-start gap-2 mb-0">
          {item.veggie && <Vegan className="text-green-600" />}
          {item.name}
        </h3>
        <p className="min-w-10 text-right">€ {item.price}</p>
      </div>
      <p className="italic text-sm">
        {Array.isArray(item.ingredients) && item.ingredients.join(" - ")}
      </p>
    </div>
  );
}
