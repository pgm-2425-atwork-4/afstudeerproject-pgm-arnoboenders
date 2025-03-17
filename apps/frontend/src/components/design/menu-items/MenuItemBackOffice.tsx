import { Pencil, Trash } from "lucide-react";
import { MenuItem } from "@/modules/menu/types";

interface MenuItemBackOfficeProps {
  item: MenuItem;
  onEdit: (item: MenuItem) => void;
  onDelete: (id: string) => void;
}

export default function MenuItemBackOffice({
  item,
  onEdit,
  onDelete,
}: MenuItemBackOfficeProps) {
  return (
    <div className="flex justify-between items-center p-4 gap-4 bg-primary50 rounded-lg shadow-md">
      <div className="w-full">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-lg font-semibold">
            {item.order_number}. {item.name}
          </h2>
          <p className="text-sm font-bold min-w-10">€ {item.price}</p>
        </div>
        <p className="text-gray-600 text-sm italic">
          {Array.isArray(item.ingredients) && item.ingredients.join(" - ")}
        </p>
      </div>
      <button onClick={() => onEdit(item)} className="p-2 rounded-lg hover:text-primary800">
        <Pencil className="w-5 h-5 text-primary hover:text-primary800" />
      </button>
      <button onClick={() => onDelete(item.id)} className="p-2 rounded-lg hover:text-red-800">
        <Trash className="w-5 h-5 text-red-400 hover:text-red-800" />
      </button>
    </div>
  );
}
