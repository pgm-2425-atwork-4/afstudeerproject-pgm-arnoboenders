import Image from "next/image";
import Link from "next/link";

interface Item {
  name: string;
  image: string;
  ingredients: string;
}

export default function ItemCard({ item }: { item: Item }) {
  return (
    <Link
      href="/menu"
      className="flex flex-col items-center justify-center gap-4 bg-white rounded-xl shadow-xl p-4 hover:shadow-2xl hover:cursor-pointer transition-all duration-300"
    >
      <Image
        src={item.image}
        alt={item.name}
        width={300}
        height={300}
        className=" rounded-xl"
      />
      <div className="text-left w-full">
        <h3>{item.name}</h3>
        <p className="italic text-sm">{item.ingredients}</p>
      </div>
    </Link>
  );
}
