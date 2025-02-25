import Image from "next/image";

interface Item {
  name: string;
  image: string;
  ingredients: string;
  price: number;
}

export default function MenuItemCard({ item }: { item: Item }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl p-4">
      <div className="relative w-48 h-48">
        <Image
          src={item.image}
          alt={item.name}
          layout="fill"
          className="shadow-xl rounded-xl object-cover"
        />
      </div>
      <div className="w-4/6">
        <div className="flex justify-between items-center">
          <h3>{item.name}</h3>
          <p>{item.price}</p>
        </div>
        <p className="italic text-sm">{item.ingredients}</p>
      </div>
    </div>
  );
}
