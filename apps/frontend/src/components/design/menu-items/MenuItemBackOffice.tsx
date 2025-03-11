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
    <div className="flex justify-between items-center p-4 gap-4 border border-primary200 rounded-lg shadow-md">
      <div className="w-full">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-lg font-semibold">{item.name}</h2>
          <p className="text-sm font-bold min-w-10">€ {item.price}</p>
        </div>
        <p className="text-gray-600 text-sm italic">
          {Array.isArray(item.ingredients) && item.ingredients.join(" - ")}
        </p>
      </div>
      <button
        onClick={() => onDelete(item.id)}
        className="p-2 rounded-lg hover:bg-gray-100"
      >
        <Trash className="w-5 h-5 text-blue-500" />
      </button>
      <button
        onClick={() => onEdit(item)}
        className="p-2 rounded-lg hover:bg-gray-100"
      >
        <Pencil className="w-5 h-5 text-blue-500" />
      </button>
    </div>
  );
}
