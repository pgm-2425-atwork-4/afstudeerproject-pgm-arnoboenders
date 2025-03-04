import { MenuCategory } from "@/modules/menu/types";

export default function OrderNav({
  categories,
}: {
  categories: MenuCategory[];
}) {
  return (
    <nav className="">
      <ul className="flex justify-start gap-8 py-4">
        {categories.map((category) => (
          <li key={category.id}>
            <a href={`#${category.name}`} className="hover:underline">{category.name}</a>
          </li>
        ))}
          </ul>
          <hr className="border-black w-3/4"/>
    </nav>
  );
}
