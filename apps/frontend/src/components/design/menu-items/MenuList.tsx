import { MenuItem } from "@/modules/menu/types";
import MenuItemCard from "./MenuItemCard";
import { getCategories } from "@/modules/menu/api";

export default async function MenuList({ items }: { items: MenuItem[] }) {
  const categories = await getCategories();
  return (
    <div>
      {categories &&
      categories
        .filter((category) => category.name !== "Andere")
        .map((category) => (
        <div key={category.id}>
          <h2>{category.name}</h2>
          {items
          .filter((item) => item.category_id === category.id)
          .map((filteredItem) => (
            <MenuItemCard key={filteredItem.id} item={filteredItem} />
          ))}
          <hr className="border-black pb-6" />
        </div>
        ))}
    </div>
  );
}
