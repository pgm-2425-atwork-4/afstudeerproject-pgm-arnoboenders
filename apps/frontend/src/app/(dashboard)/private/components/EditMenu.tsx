"use client";

import { useEffect, useState } from "react";
import { Pencil, Trash } from "lucide-react";
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

export default function EditMenu({
  owner_id,
}: {
  owner_id: string;
  }) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newItem, setNewItem] = useState<CreateMenuItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [categories, setCategories] = useState<MenuCategory[] | null>([]);

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

  const handleDelete = async (id: number) => {
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
      console.log("Updating item:", selectedItem);
      const updatedItem = await updateMenuItem(owner_id, selectedItem);
      console.log("Updated item:", updatedItem);

      // Update state with the new data
      setMenuItems((prevItems) =>
        prevItems.map((item) =>
          item.id === updatedItem.id ? updatedItem : item
        )
      );
    } catch (error) {
      console.error("Error updating menu item:", error);
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
        owner_id: owner_id,
        name: newItem.name,
        ingredients: newItem.ingredients,
        price: newItem.price,
        is_new: newItem.is_new,
        veggie: newItem.veggie,
        category_id: newItem.category_id,
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
    <>
      <Button
        onClick={() =>
          handleCreateClick({
            owner_id: owner_id,
            name: "",
            ingredients: [],
            price: 0,
            is_new: false,
            veggie: false,
            category_id: 0,
          })
        }
        text="Create New Item"
      />
      <div className="space-y-4">
        {menuItems
          .sort((a, b) => a.id - b.id)
          .map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center p-4 gap-4 border rounded-lg shadow-md"
            >
              <div className="w-full">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-sm font-bold min-w-10">€ {item.price}</p>
                </div>
                <p className="text-gray-600 text-sm italic">
                  {Array.isArray(item.ingredients) &&
                    item.ingredients.join(" - ")}
                </p>
              </div>
              <button
                onClick={() => handleDelete(item.id)}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <Trash className="w-5 h-5 text-blue-500" />
              </button>
              <button
                onClick={() => handleEditClick(item)}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <Pencil className="w-5 h-5 text-blue-500" />
              </button>
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
      <EditModal
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        handleSave={handleEdit}
        selectedItem={selectedItem}
        categories={categories}
        setSelectedItem={setSelectedItem}
      />
    </>
  );
}
