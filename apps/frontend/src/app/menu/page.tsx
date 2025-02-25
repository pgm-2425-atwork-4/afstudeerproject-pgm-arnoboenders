import MenuItemCard from "@/components/menu-items/MenuItemCard";

export default function Menu() {
  return (
    <div className=" container  mt-32 mb-20">
      <h1>Menu</h1>
      <div>
        <MenuItemCard
          item={{
            name: "Pasta Carbonara",
            image: "/assets/food.jpg",
            ingredients: "Pasta, eieren, spek, kaas",
            price: 10.5,
          }}
        />
      </div>
    </div>
  );
}
