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
  ); // New state for image file

  useEffect(() => {
    getMenuItems().then((data) => {
      setMenuItems(data || []);
    });
    getCategories().then((data) => {
      setCategories(data);
    });
  }, []);

  const handleEditClick = (item: MenuItem) => {
    setSelectedItem(item);
    setIsEditing(true);
  };
  const handleCreateClick = (item: CreateMenuItem) => {
    setNewItem(item);
    setIsCreating(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteMenuItem(id);
      setMenuItems((prevItems) => prevItems.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting menu item:", error);
    }
  };

  const handleEdit = async () => {
    if (!selectedItem) {
      console.log("No item selected");
      return;
    }
    try {
      // No need to pass `uploadedImageFile` again, as it was already handled in `EditModal.tsx`
      const updatedItem = await updateMenuItem(selectedItem);

      setMenuItems((prevItems) =>
        prevItems.map((item) =>
          item.id === updatedItem.id ? updatedItem : item
        )
      );

      // Update selectedItem with new image name
      setSelectedItem(updatedItem);
    } catch (error) {
      console.error(error);
    }
    setIsEditing(false);
  };
  
  const handleCreate = async () => {
    if (!newItem) {
      console.log("No item selected");
      return;
    }
    try {
      const createdItem = await createMenuItem({
        user_id: owner_id,
        name: newItem.name,
        ingredients: newItem.ingredients,
        price: newItem.price,
        is_new: newItem.is_new,
        veggie: newItem.veggie,
        category_id: newItem.category_id,
        order_number: menuItems.length + 1,
        image: newItem.image,
        pasta: newItem.pasta,
        show_on_menu: newItem.show_on_menu,
        size: newItem.size,
      });
      if (createdItem) {
        setMenuItems((prevItems) => [...prevItems, createdItem]);
      }
    } catch (error) {
      console.error("Error creating menu item:", error);
    }
    setIsCreating(false);
  };

  return (
    <div className="flex flex-col  justify-center items-center gap-8">
      <div className="w-full flex flex-col items-center gap-8">
        <div className="w-full p-4">
          <h2>Menu-afbeelding uploaden</h2>
          <UploadImage />
        </div>
        <div className="w-full flex justify-between items-center p-4">
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
                order_number: 0,
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
                .sort((a, b) => a.order_number - b.order_number)
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
        handleCreate={handleCreate}
        newItem={newItem}
      />
      <div>
        <EditModal
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          handleSave={handleEdit}
          selectedItem={selectedItem}
          categories={categories}
          setSelectedItem={setSelectedItem}
          uploadedImageFile={uploadedImageFile} // Pass file to modal
          setUploadedImageFile={setUploadedImageFile} // Allow modal to update this state
        />
      </div>
    </div>
  );
}
