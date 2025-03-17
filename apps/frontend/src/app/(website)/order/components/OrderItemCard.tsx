import AddButton from "@/app/(website)/order/components/AddButton";
import { MenuItem } from "@/modules/menu/types";
import { Vegan } from "lucide-react";

export default function OrderItemCard({ menuItem }: { menuItem: MenuItem }) {
  return (
    <div className="flex flex-col justify-between bg-primary50 shadow-md w-full p-4 rounded-lg">
      <div className="flex justify-between items-center gap-4">
        <h3>
          {menuItem.veggie && <Vegan className="text-green-600" />}
          {menuItem.name}
        </h3>
        <p className="min-w-8 text-right">€ {menuItem.price}</p>
      </div>
      <div className="flex justify-between items-center gap-8">
        <p>
          {Array.isArray(menuItem.ingredients) &&
            menuItem.ingredients.join(" - ")}
        </p>
        <div>
          <AddButton menuItem={menuItem} />
        </div>
      </div>
    </div>
  );
}
