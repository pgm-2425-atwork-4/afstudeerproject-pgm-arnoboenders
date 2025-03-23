"use client";

import { useEffect, useState } from "react";
import {
  createMenuItem,
  deleteMenuItem,
  getCategories,
  getMenuItems,
  updateMenuItem,
} from "@/modules/menu/api";
import { CreateMenuItem, MenuCategory, MenuItem } from "@/modules/menu/types";
import EditModal from "./EditModal";
import Button from "@/components/functional/button/Button";
import CreateModal from "./CreateModal";
import UploadImage from "./UploadImage";
import MenuItemBackOffice from "@/components/design/menu-items/MenuItemBackOffice";

export default function EditMenu({ owner_id }: { owner_id: string }) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newItem, setNewItem] = useState<CreateMenuItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [categories, setCategories] = useState<MenuCategory[] | null>([]);
  const [uploadedImageFile, setUploadedImageFile] = useState<File | undefined>(
    undefined
  );
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Fetch menu items & categories on mount
  useEffect(() => {
    async function fetchData() {
      const menuData = await getMenuItems();
      const categoryData = await getCategories();
      setMenuItems(menuData || []);
      setCategories(categoryData || []);
    }
    fetchData();
  }, []);

  // Show success message
  const showSuccessMessage = (message: string) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(null), 3000); // Hide message after 3 seconds
  };

  const handleEditClick = (item: MenuItem) => {
    setSelectedItem(item);
    setIsEditing(true);
  };
  const updateEditedItemInList = (updatedItem: MenuItem) => {
    setMenuItems((prevItems) =>
      prevItems.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
    showSuccessMessage("Gerecht succesvol bijgewerkt!");
  };

  const handleCreateClick = (item: CreateMenuItem) => {
    setNewItem(item);
    setIsCreating(true);
  };

  // Function to update the menu list after creating an item
  const addNewItemToList = (createdItem: MenuItem) => {
    setMenuItems((prevItems) => [...prevItems, createdItem]);
    showSuccessMessage("Gerecht succesvol aangemaakt!");
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteMenuItem(id);
      setMenuItems((prevItems) => prevItems.filter((item) => item.id !== id));
      showSuccessMessage("Gerecht succesvol verwijderd!");
    } catch (error) {
      console.error("Error deleting menu item:", error);
    }
  };

  const handleEdit = async () => {
    if (!selectedItem) return;

    try {
      const updatedItem = await updateMenuItem(selectedItem, uploadedImageFile);

      setMenuItems((prevItems) =>
        prevItems.map((item) =>
          item.id === updatedItem.id ? updatedItem : item
        )
      );

      setSelectedItem(updatedItem); // Update selected item
      setUploadedImageFile(undefined); // Clear file selection
      setIsEditing(false); // Close modal
      showSuccessMessage("Gerecht succesvol bijgewerkt!");
    } catch (error) {
      console.error("Error updating menu item:", error);
    }
  };

  const handleCreate = async () => {
    if (!newItem) return;

    try {
      const createdItem = await createMenuItem(newItem, uploadedImageFile);

      if (createdItem) {
        setMenuItems((prevItems) => [...prevItems, createdItem]); // Add new item
        setNewItem(null);
        setUploadedImageFile(undefined);
        setIsCreating(false);
        showSuccessMessage("Gerecht succesvol aangemaakt!"); // Show message
      }
    } catch (error) {
      console.error("Error creating menu item:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-8">
      {successMessage && (
        <div className="bg-green-500 text-white p-2 rounded-xl shadow-lg text-center w-80 fixed top-4 z-50">
          {successMessage}
        </div>
      )}
      <div className="w-full flex flex-col items-center gap-8">
        <div className="w-full">
          <h2>Menu-afbeelding uploaden</h2>
          <UploadImage />
        </div>
        <div className="w-full flex justify-between items-center">
          <h2>
            Gerechten{" "}
            <span className="text-sm text-gray-600">
              ({menuItems.length} gerechten)
            </span>
          </h2>
          <Button
            onClick={() =>
              handleCreateClick({
                user_id: owner_id,
                name: "",
                ingredients: [],
                price: 0,
                is_new: false,
                veggie: false,
                category_id: "",
                image: "",
                pasta: "",
                show_on_menu: true,
                size: "",
              })
            }
            text="Voeg nieuw gerecht toe"
          />
        </div>
      </div>

      <div className="space-y-4">
        {categories &&
          categories.map((category) => (
            <div key={category.id} className="flex flex-col gap-4">
              <h2>{category.name}</h2>
              {menuItems
                .filter((item) => item.category_id === category.id)
                .map((item) => (
                  <MenuItemBackOffice
                    key={item.id}
                    item={item}
                    onEdit={handleEditClick}
                    onDelete={handleDelete}
                  />
                ))}
            </div>
          ))}
      </div>
      <CreateModal
        isCreating={isCreating}
        categories={categories}
        setIsCreating={setIsCreating}
        setNewItem={setNewItem}
        newItem={newItem}
        uploadedImageFile={uploadedImageFile}
        setUploadedImageFile={setUploadedImageFile}
        updateMenuList={addNewItemToList}
        handleCreate={handleCreate}
      />
      <EditModal
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        selectedItem={selectedItem}
        categories={categories}
        setSelectedItem={setSelectedItem}
        uploadedImageFile={uploadedImageFile}
        setUploadedImageFile={setUploadedImageFile}
        handleSave={handleEdit}
        updateMenuList={updateEditedItemInList}
      />
    </div>
  );
}
