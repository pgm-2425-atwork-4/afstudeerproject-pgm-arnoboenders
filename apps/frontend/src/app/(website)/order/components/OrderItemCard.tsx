import AddButton from "@/app/(website)/order/components/AddButton";
import { MenuItem } from "@/modules/menu/types";

export default function OrderItemCard({ menuItem }: { menuItem: MenuItem }) {
  return (
    <div className="flex flex-col justify-between bg-primaryHover w-full p-4 rounded-lg">
      <div className="flex justify-between items-center gap-4">
        <h3>{menuItem.name}</h3>
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
