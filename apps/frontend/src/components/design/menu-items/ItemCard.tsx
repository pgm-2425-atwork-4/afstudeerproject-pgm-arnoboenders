import { MenuItem } from "@/modules/menu/types";
import { getMenuItemImageUrl } from "@/modules/storage/utils";
import { Vegan } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ItemCard({ item }: { item: MenuItem }) {
  console.log("ItemCard", item);
  return (
    <Link
      href="/menu"
      className="flex flex-col items-center justify-center gap-4 bg-white rounded-xl shadow-xl p-4 hover:shadow-2xl hover:cursor-pointer transition-all duration-300 min-w-60"
    >
      <div className="text-left w-full">
        {item.image && (
          <div className="flex justify-center mb-4">
            <Image
              src={getMenuItemImageUrl(item.image)}
              alt={item.name}
              width={200}
              height={200}
              className="rounded-xl"
            />
          </div>
        )}
        <h3 className="flex gap-1">
          {item.veggie && <Vegan className="text-green-600 min-w-6 mt-1" />}
          {item.name}
        </h3>
        <p className="italic text-sm">
          {Array.isArray(item.ingredients) && item.ingredients.join(" - ")}
        </p>
      </div>
    </Link>
  );
}
