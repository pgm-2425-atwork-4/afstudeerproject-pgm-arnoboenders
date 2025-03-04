"use client";
import { useEffect, useState } from "react";
import { getCategories, getMenuItems } from "@/modules/menu/api";
import { MenuCategory, MenuItem } from "@/modules/menu/types";
import OrderItemCard from "./OrderItemCard";
import OrderNav from "./OrderNav";

export default function OrderMenu() {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<MenuCategory[]>([]);

  useEffect(() => {
    getMenuItems().then((data) => {
      if (data) {
        setMenu(data);
      }
    });
    getCategories().then((data) => {
      if (data) {
        setCategories(data);
      }
    });
  }, []);

  return (
    <>
      <div className="flex flex-col gap-8">
        <OrderNav categories={categories} />
        {categories &&
          categories.map((category) => (
            <div key={category.id}>
              <h2 id={category.name}>{category.name}</h2>
              <div className="flex flex-wrap gap-8">
                {menu
                  .filter((item) => item.category_id === category?.id)
                  .map((filteredItem) => (
                    <OrderItemCard
                      key={filteredItem.id}
                      menuItem={filteredItem}
                    />
                  ))}
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
