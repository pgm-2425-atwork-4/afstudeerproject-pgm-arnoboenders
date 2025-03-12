import Button from "@/components/functional/button/Button";
import InputField from "@/components/functional/input/InputField";
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
            <InputField
              label="Naam"
              type="text"
              value={newItem.name}
              onChange={(e) =>
                setNewItem({ ...newItem, name: e.target.value })
              }
              placeholder={newItem.name}
              id="name"
              name="name"
            />
            <InputField
              label="Ingredienten"
              type="textarea"
              value={
                Array.isArray(newItem.ingredients)
                  ? newItem.ingredients.join(", ")
                  : (newItem.ingredients as string) || ""
              }
              onChange={(e) =>
                setNewItem({
                  ...newItem,
                  ingredients: e.target.value,
                })
              }
              placeholder={
                Array.isArray(newItem.ingredients)
                  ? newItem.ingredients.join(", ")
                  : (newItem.ingredients as string) || ""
              }
              id="ingredients"
              name="ingredients"
            />
            <InputField
              label="Prijs (€)"
              type="number"
              value={newItem.price.toString()}
              onChange={(e) =>
                setNewItem({
                  ...newItem,
                  price: parseFloat(e.target.value) || 0,
                })
              }
              placeholder={newItem.price.toString()}
              id="price"
              name="price"
            />
            <InputField
              label="Categorie"
              type="select"
              value={(newItem.category_id ?? "").toString()}
              onChange={(e) =>
                setNewItem({
                  ...newItem,
                  category_id: parseInt(e.target.value),
                })
              }
              placeholder="Kies een categorie"
              id="category_id"
              name="category_id"
            >
              {categories?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </InputField>
            <InputField
              label="Is het nieuw?"
              type="checkbox"
              onChange={(e) =>
                setNewItem({
                  ...newItem,
                  is_new: (e.target as HTMLInputElement).checked,
                })
              }
              name="is_new"
              id="is_new"
              placeholder=""
              value={newItem.is_new.toString()}
            />
            <InputField
              label="Veggie"
              type="checkbox"
              onChange={(e) =>
                setNewItem({
                  ...newItem,
                  veggie: (e.target as HTMLInputElement).checked,
                })
              }
              name="veggie"
              id="veggie"
              placeholder=""
              value={newItem.veggie.toString()}
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
