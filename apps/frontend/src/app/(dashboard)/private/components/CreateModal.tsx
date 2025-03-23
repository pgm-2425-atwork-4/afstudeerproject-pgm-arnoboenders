import Button from "@/components/functional/button/Button";
import InputField from "@/components/functional/input/InputField";
import { menuItemSchema } from "@/components/functional/schema/menuItemSchema";
import { createMenuItem } from "@/modules/menu/api";
import { CreateMenuItem, MenuCategory, MenuItem } from "@/modules/menu/types";
import { ImageUp } from "lucide-react";
import { useState } from "react";

interface ModalProps {
  isCreating: boolean;
  categories: MenuCategory[] | null;
  setIsCreating: (isCreating: boolean) => void;
  handleCreate: (item: CreateMenuItem) => void;
  setNewItem: (item: CreateMenuItem) => void;
  newItem: CreateMenuItem | null;
  uploadedImageFile: File | undefined;
  setUploadedImageFile: (file: File | undefined) => void;
  updateMenuList: (createdItem: MenuItem) => void;
}

export default function CreateModal({
  isCreating,
  categories,
  setIsCreating,
  setNewItem,
  newItem,
  uploadedImageFile,
  setUploadedImageFile,
  updateMenuList,
}: ModalProps) {
  const [uploadedImageName, setUploadedImageName] = useState<string | null>(
    null
  );
  const [errors, setErrors] = useState<Record<string, string>>({}); // Store validation errors

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setUploadedImageFile(file);
      setUploadedImageName(file.name);
    }
  };

  const handleSaveWithImage = async () => {
    if (!newItem) return;

    const parsedIngredients =
      typeof newItem.ingredients === "string"
        ? newItem.ingredients
            .split(",")
            .map((i) => i.trim())
            .filter(Boolean)
        : newItem.ingredients;

    const sanitizedItem: CreateMenuItem = {
      ...newItem,
      ingredients: parsedIngredients,
      price: Number(newItem.price),
      category_id: newItem.category_id.toString(),
    };

    const validationResult = menuItemSchema.safeParse(sanitizedItem);
    if (!validationResult.success) {
      const errorMessages: Record<string, string> = {};
      validationResult.error.errors.forEach((err) => {
        errorMessages[err.path[0]] = err.message;
      });
      setErrors(errorMessages);
      return;
    }

    try {
      const createdItem = await createMenuItem(
        sanitizedItem,
        uploadedImageFile
      );

      if (createdItem) {
        updateMenuList(createdItem);
        setNewItem(createdItem);
        setUploadedImageFile(undefined);
        setIsCreating(false);
      }
    } catch (error) {
      console.error("Error creating menu item:", error);
    }
  };

  return (
    <div>
      {isCreating && newItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="flex flex-col gap-4 bg-primary100 p-6 rounded-lg shadow-lg w-96">
            <h2>Voeg een nieuw gerecht toe</h2>

            {/* File Upload Input */}
            <div className="w-full flex flex-col items-center px-4 py-6 bg-primary rounded-lg shadow-lg text-white">
              <ImageUp />
              <span className="mt-2">Kies een afbeelding</span>
              <label className="mt-2 w-full bg-primary500 text-white border border-white rounded-lg p-2 cursor-pointer text-center">
                {uploadedImageName || "Kies een bestand"}
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>

            {/* Form Inputs */}
            <InputField
              label="Naam"
              type="text"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              placeholder="Naam van het gerecht"
              id="name"
              name="name"
            />
            {errors.name && <p className="text-red-500">{errors.name}</p>}

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
              placeholder="Ingrediënten opsommen"
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
              placeholder="Voer de prijs in"
              id="price"
              name="price"
            />
            {errors.price && <p className="text-red-500">{errors.price}</p>}

            <InputField
              label="Categorie"
              type="select"
              value={newItem.category_id.toString()}
              onChange={(e) =>
                setNewItem({
                  ...newItem,
                  category_id: e.target.value,
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
            {errors.category_id && (
              <p className="text-red-500">{errors.category_id}</p>
            )}

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
              <Button onClick={handleSaveWithImage} text="Voeg toe" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
