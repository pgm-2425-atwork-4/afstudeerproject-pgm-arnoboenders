import { MenuCategory, MenuItem } from "@/modules/menu/types";

interface ModalProps {
  isEditing: boolean;
  selectedItem: MenuItem | null;
  categories: MenuCategory[] | null;
  setSelectedItem: (item: MenuItem) => void;
  setIsEditing: (isEditing: boolean) => void;
  handleSave: () => void;
}

export default function EditModal({
  isEditing,
  selectedItem,
  categories,
  setSelectedItem,
  setIsEditing,
  handleSave,
}: ModalProps) {
  return (
    <div>
      {/* Edit Modal */}
      {isEditing && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit Menu Item</h2>
            <label className="block mb-2">Name</label>
            <input
              type="text"
              value={selectedItem.name}
              onChange={(e) =>
                setSelectedItem({ ...selectedItem, name: e.target.value })
              }
              className="w-full p-2 border rounded"
            />

            <label className="block mt-3 mb-2">Ingredients</label>
            <textarea
              value={
                Array.isArray(selectedItem.ingredients)
                  ? selectedItem.ingredients.join("\n")
                  : ""
              }
              onChange={(e) =>
                setSelectedItem({
                  ...selectedItem,
                  ingredients: e.target.value,
                })
              }
              className="w-full p-2 border rounded"
            />

            <label className="block mt-3 mb-2">Price (€)</label>
            <input
              type="number"
              value={selectedItem.price}
              onChange={(e) =>
                setSelectedItem({
                  ...selectedItem,
                  price: parseFloat(e.target.value) || 0,
                })
              }
              className="w-full p-2 border rounded"
            />
            <label className="block mt-3 mb-2">Category</label>
            <select
              value={selectedItem.category_id}
              onChange={(e) =>
                setSelectedItem({
                  ...selectedItem,
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
              checked={selectedItem.is_new}
              onChange={(e) =>
                setSelectedItem({ ...selectedItem, is_new: e.target.checked })
              }
            />
            <label className="block mt-3 mb-2">Veggie</label>
            <input
              type="checkbox"
              checked={selectedItem.veggie}
              onChange={(e) =>
                setSelectedItem({ ...selectedItem, veggie: e.target.checked })
              }
            />
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsEditing(false)}
                className="mr-2 px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
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
