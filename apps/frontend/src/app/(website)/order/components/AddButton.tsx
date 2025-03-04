import { useOrders } from "@/components/context/OrderProvider";
import { MenuItem } from "@/modules/menu/types";
import { Plus } from "lucide-react";

export default function AddButton({ menuItem }: { menuItem: MenuItem }) {
  const { addOrder } = useOrders();

  const handleAddItem = () => {
    addOrder([{ ...menuItem, amount: 1 }]);
  };
  return (
    <button
      className="bg-white p-1 rounded-lg hover:bg-gray-100"
      onClick={handleAddItem}
    >
      <Plus />
    </button>
  );
}
