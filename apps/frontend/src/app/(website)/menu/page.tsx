import MenuList from "@/components/design/menu-items/MenuList";
import { getMenuImage, getMenuItems } from "@/modules/menu/api";
import { getMenuImageUrl } from "@/modules/storage/utils";
import Image from "next/image";

export default async function Menu() {
  const menuItems = await getMenuItems(); // Fetch on the server
  const menuImage = await getMenuImage(); // Fetch on the server
  console.log(menuImage);
  return (
    <div className="container mt-32 mb-20">
      <h1>Menu</h1>
      <div className="flex items-center lg:items-start justify-center flex-col gap-8 lg:flex-row">
        <Image src={menuImage && getMenuImageUrl(menuImage.name)} alt="Menu" width={800} height={1080} />
        <div>{menuItems && <MenuList items={menuItems} />}</div>
      </div>
    </div>
  );
}
