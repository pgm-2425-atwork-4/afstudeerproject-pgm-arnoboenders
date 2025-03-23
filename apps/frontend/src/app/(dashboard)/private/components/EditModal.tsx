"use client";
"use client";
import { useState } from "react";
import Button from "@/components/functional/button/Button";
import InputField from "@/components/functional/input/InputField";
import { MenuCategory, MenuItem } from "@/modules/menu/types";
import { updateMenuItem } from "@/modules/menu/api";
import { ImageUp } from "lucide-react";
import { menuItemSchema } from "@/components/functional/schema/menuItemSchema";

interface ModalProps {
  isEditing: boolean;
  selectedItem: MenuItem | null;
  categories: MenuCategory[] | null;
  setSelectedItem: (item: MenuItem) => void;
  setIsEditing: (isEditing: boolean) => void;
  handleSave: () => void;
  uploadedImageFile: File | undefined; // New prop
  setUploadedImageFile: (file: File | undefined) => void; // New prop
  updateMenuList: (updatedItem: MenuItem) => void;
}

export default function EditModal({
  isEditing,
  selectedItem,
  categories,
  setSelectedItem,
  setIsEditing,
  uploadedImageFile,
  setUploadedImageFile, // Receive setter function
  updateMenuList,
}: ModalProps) {
  const [uploadedImageName, setUploadedImageName] = useState<string | null>(
    null
  ); // Store uploaded image filename
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setUploadedImageFile(file); // Store file for later upload
      setUploadedImageName(file.name); // Temporarily store filename
    }
  };

  const handleSaveWithImage = async () => {
    if (selectedItem) {
      const sanitizedItem = {
        ...selectedItem,
        price: selectedItem.price ? Number(selectedItem.price) : 0, // Ensure number
        category_id: selectedItem.category_id?.toString() || "", // Ensure it's a string
      };

      // Validate using Zod
      const validationResult = menuItemSchema.safeParse(sanitizedItem);

      if (!validationResult.success) {
        console.error("Validation Errors:", validationResult.error.format()); // Debug log
        const errorMessages: Record<string, string> = {};
        validationResult.error.errors.forEach((err) => {
          errorMessages[err.path[0]] = err.message;
        });
        setErrors(errorMessages);
        return;
      }
      try {
        // Pass file if a new one is selected
        const updatedItem = await updateMenuItem(
          selectedItem,
          uploadedImageFile
        );

        updateMenuList(updatedItem);
        setSelectedItem(updatedItem);
        setUploadedImageFile(undefined);
        setIsEditing(false);
      } catch (error) {
        console.error("Error updating menu item:", error);
      }
    }
  };

  return (
    <div>
      {isEditing && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-primary100 p-6 rounded-lg shadow-lg w-96 flex flex-col gap-4">
            <h2 className="text-xl font-bold">
              Bewerk &quot;{selectedItem.name}&quot;
            </h2>

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

            {/* Other Input Fields */}
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
            {errors.name && <p className="text-red-500">{errors.name}</p>}
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
            {errors.price && <p className="text-red-500">{errors.price}</p>}
            <InputField
              label="Categorie"
              type="select"
              value={(selectedItem.category_id ?? "").toString()}
              onChange={(e) =>
                setSelectedItem({
                  ...selectedItem,
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
            <div className="flex justify-between mt-4 gap-4">
              <Button
                onClick={() => setIsEditing(false)}
                text="Annuleer"
                color="bg-red-400"
                hoverColor="bg-red-900"
              />
              <Button onClick={handleSaveWithImage} text="Opslaan" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
