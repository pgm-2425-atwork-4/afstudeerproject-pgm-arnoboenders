interface Item {
  name: string;
  image: string;
  ingredients: string;
  price: number;
}

export default function MenuItemCard({ item }: { item: Item }) {
  return (
    <div className="flex flex-col rounded-xl">
        <div className="flex justify-between items-center">
          <h3>{item.name}</h3>
          <p>{item.price}</p>
        </div>
        <p className="italic text-sm">{item.ingredients}</p>
    </div>
  );
}
