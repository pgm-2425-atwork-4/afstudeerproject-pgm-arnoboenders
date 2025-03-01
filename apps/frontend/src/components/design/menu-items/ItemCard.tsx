import { MenuItem } from "@/modules/menu/types";
import Link from "next/link";

export default function ItemCard({ item }: { item: MenuItem }) {
  return (
    <Link
      href="/menu"
      className="flex flex-col items-center justify-center gap-4 bg-white rounded-xl shadow-xl p-4 hover:shadow-2xl hover:cursor-pointer transition-all duration-300"
    >
      <div className="text-left w-full">
        <h3>{item.name}</h3>
        <p className="italic text-sm">
          {Array.isArray(item.ingredients) && item.ingredients.join(" - ")}
        </p>
      </div>
    </Link>
  );
}
