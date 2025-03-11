import Button from "@/components/functional/button/Button";
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
          <div className=" flex flex-col gap-4 bg-primary100 p-6 rounded-lg shadow-lg w-96">
            <h2>Voeg een nieuw gerecht toe</h2>
            <label className="block">Naam</label>
            <input
              type="text"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              className="w-full p-2 border rounded"
            />

            <label className="block">Ingredienten</label>
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

            <label className="block">Prijs (€)</label>
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
            <label className="block">Categorie</label>
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
                <option
                  key={`${category.id}-${category.name}`}
                  value={category.id}
                >
                  {category.name}
                </option>
              ))}
            </select>
            <label className="block">Is het nieuw?</label>
            <input
              type="checkbox"
              checked={newItem.is_new}
              onChange={(e) =>
                setNewItem({ ...newItem, is_new: e.target.checked })
              }
            />
            <label className="block">Veggie</label>
            <input
              type="checkbox"
              checked={newItem.veggie}
              onChange={(e) =>
                setNewItem({ ...newItem, veggie: e.target.checked })
              }
            />
            <div className="flex justify-between mt-4 gap-4">
              <Button
                onClick={() => setIsCreating(false)}
                text="Annuleer"
                color="bg-red-400"
                hoverColor="bg-red-900"
              />
              <Button onClick={() => handleCreate(newItem)} text="Voeg toe" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
