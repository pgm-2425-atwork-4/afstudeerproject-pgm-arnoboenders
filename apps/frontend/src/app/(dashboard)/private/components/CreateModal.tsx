import { CreateMenuItem, MenuCategory } from "@/modules/menu/types";

interface ModalProps {
  isCreating: boolean;
  categories: MenuCategory[] | null;
  setIsCreating: (isCreating: boolean) => void;
  handleCreate: (item: CreateMenuItem) => void;
  setNewItem: (item: CreateMenuItem) => void;
  newItem: CreateMenuItem | null;
}

export default function CreateModal({
  isCreating,
  categories,
  setIsCreating,
  handleCreate,
  setNewItem,
  newItem,
}: ModalProps) {
  return (
    <div>
      {/* Create Modal */}
      {isCreating && newItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Create Menu Item</h2>
            <label className="block mb-2">Name</label>
            <input
              type="text"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              className="w-full p-2 border rounded"
            />

            <label className="block mt-3 mb-2">Ingredients</label>
            <textarea
              value={newItem.ingredients?.join("\n") || ""}
              onChange={(e) =>
                setNewItem({
                  ...newItem,
                  ingredients: e.target.value.split("\n"),
                })
              }
              className="w-full p-2 border rounded"
            />

            <label className="block mt-3 mb-2">Price (€)</label>
            <input
              type="number"
              value={newItem.price}
              onChange={(e) =>
                setNewItem({
                  ...newItem,
                  price: parseFloat(e.target.value) || 0,
                })
              }
              className="w-full p-2 border rounded"
            />
            <label className="block mt-3 mb-2">Category</label>
            <select
              value={newItem.category_id}
              onChange={(e) =>
                setNewItem({
                  ...newItem,
                  category_id: parseInt(e.target.value),
                })
              }
              className="w-full p-2 border rounded"
            >
              {categories?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <label className="block mt-3 mb-2">Is New</label>
            <input
              type="checkbox"
              checked={newItem.is_new}
              onChange={(e) =>
                setNewItem({ ...newItem, is_new: e.target.checked })
              }
            />
            <label className="block mt-3 mb-2">Veggie</label>
            <input
              type="checkbox"
              checked={newItem.veggie}
              onChange={(e) =>
                setNewItem({ ...newItem, veggie: e.target.checked })
              }
            />
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsCreating(false)}
                className="mr-2 px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => handleCreate(newItem)}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
