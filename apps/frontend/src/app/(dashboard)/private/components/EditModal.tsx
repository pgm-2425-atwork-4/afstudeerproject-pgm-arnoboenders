import Button from "@/components/functional/button/Button";
import InputField from "@/components/functional/input/InputField";
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
          <div className="bg-primary100 p-6 rounded-lg shadow-lg w-96 flex flex-col gap-4">
            <h2 className="text-xl font-bold">
              Bewerk &quot;{selectedItem.name}&quot;
            </h2>
            <InputField
              label="Naam"
              type="text"
              value={selectedItem.name}
              onChange={(e) =>
                setSelectedItem({ ...selectedItem, name: e.target.value })
              }
              placeholder={selectedItem.name}
              id="name"
              name="name"
            />
            <InputField
              label="Ingredienten"
              type="textarea"
              value={
                Array.isArray(selectedItem.ingredients)
                  ? selectedItem.ingredients.join(", ")
                  : (selectedItem.ingredients as string) || ""
              }
              onChange={(e) =>
                setSelectedItem({
                  ...selectedItem,
                  ingredients: e.target.value,
                })
              }
              placeholder={
                Array.isArray(selectedItem.ingredients)
                  ? selectedItem.ingredients.join(", ")
                  : (selectedItem.ingredients as string) || ""
              }
              id="ingredients"
              name="ingredients"
            />
            <InputField
              label="Prijs (€)"
              type="number"
              value={selectedItem.price.toString()}
              onChange={(e) =>
                setSelectedItem({
                  ...selectedItem,
                  price: parseFloat(e.target.value) || 0,
                })
              }
              placeholder={selectedItem.price.toString()}
              id="price"
              name="price"
            />
            <InputField
              label="Categorie"
              type="select"
              value={(selectedItem.category_id ?? "").toString()}
              onChange={(e) =>
                setSelectedItem({
                  ...selectedItem,
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
                setSelectedItem({
                  ...selectedItem,
                  is_new: (e.target as HTMLInputElement).checked,
                })
              }
              name="is_new"
              id="is_new"
              placeholder=""
              value={selectedItem.is_new.toString()}
            />
            <InputField
              label="Veggie"
              type="checkbox"
              onChange={(e) =>
                setSelectedItem({
                  ...selectedItem,
                  veggie: (e.target as HTMLInputElement).checked,
                })
              }
              name="veggie"
              id="veggie"
              placeholder=""
              value={selectedItem.veggie.toString()}
            />
            <InputField
              label="Volgorde"
              type="number"
              value={selectedItem.order_number.toString()}
              onChange={(e) =>
                setSelectedItem({
                  ...selectedItem,
                  order_number: parseInt(e.target.value),
                })
              }
              placeholder={selectedItem.order_number.toString()}
              id="order_number"
              name="order_number"
            />
            <div className="flex justify-between mt-4 gap-4">
              <Button
                onClick={() => setIsEditing(false)}
                text="Annuleer"
                color="bg-red-400"
                hoverColor="bg-red-900"
              />
              <Button onClick={() => handleSave()} text="Opslaan" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
