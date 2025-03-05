import Image from "next/image";
import styles from "@/app/styles/hero.module.css";
import Button from "@/components/functional/button/Button";
import Link from "next/link";
import { BookText, Utensils } from "lucide-react";
import ItemCard from "@/components/design/menu-items/ItemCard";
import { getMenuItems } from "@/modules/menu/api";

export default async function Home() {
  const menuItems = await getMenuItems();
  return (
    <>
      <div className={styles.heroContainer}>
        <Image src="/assets/hero.jpg" alt="Hero Image" fill priority />
        <div
          className={`${styles.heroContent} mt-32 sm:mt-24 sm:ml-20 lg:ml-28 2xl:ml-96 shadow-xl`}
        >
          <h1 className={`text-primary`}>“Daarmee pasta...”</h1>
          <p className={`${styles.heroSubtitle} text-primary`}>
            Eenvoudig, vers en boordevol smaak.
          </p>
          <Link href={"/menu"}>
            <Button text="Bekijk het menu" icon={<BookText />} />
          </Link>
        </div>
      </div>
      <div className="container mx-auto my-10">
        <h2>Nieuw deze maand</h2>

        <div className="grid grid-cols-3 gap-4">
          {menuItems && menuItems
            .filter((item) => item.is_new)
            .map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
        </div>
        <div className="flex justify-center my-10">
          <Button text="Bestel nu" icon={<Utensils />} />
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-between mb-8 gap-8 lg:gap-0">
          <Image
            src="/assets/homeImg1.png"
            alt="Foto interieur"
            width={300}
            height={300}
            className="shadow-xl"
          />
          <p className="max-w-md">
            🧑‍🍳 Eerlijke pasta, pure smaak Bij Loos draait alles om eenvoud en
            kwaliteit. Heerlijke pasta, gemaakt met verse ingrediënten Ontdek
            ons menu{" "}
            <Link href="/menu" className="underline hover:text-primaryHover">
              hier
            </Link>
          </p>
        </div>
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-8 lg:gap-0">
          <p className="max-w-md">
            📍 Geen reservatie nodig Loop gewoon binnen en geniet. Voor groepen
            vanaf 6 personen kan je wel reserveren.
          </p>
          <Image
            src="/assets/homeImg2.png"
            alt="Foto interieur"
            width={300}
            height={300}
            className="shadow-xl"
          />
        </div>
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between mt-8 gap-8 lg:gap-0">
          <Image
            src="/assets/homeImg1.png"
            alt="Foto interieur"
            width={300}
            height={300}
            className="shadow-xl"
          />
          <div>
            <h2>Openingsuren</h2>
            <div className="text-sm">
              <div className="grid grid-cols-3 gap-4">
                <p>Maandag:</p>
                <p>Gesloten</p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <p>Dinsdag:</p>
                <p>11:30 - 14:00</p>
                <p>17:30 - 21:30</p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <p>Woensdag:</p>
                <p>09:00 - 13:30 (bar)</p>
                <p>17:30 - 21:30</p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <p>Donderdag:</p>
                <p>11:30 - 14:00</p>
                <p>17:30 - 21:30</p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <p>Vrijdag:</p>
                <p>11:30 - 14:00</p>
                <p>17:30 - 22:00</p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <p>Zaterdag:</p>
                <p>-</p>
                <p>17:30 - 22:00</p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <p>Zondag:</p>
                <p>-</p>
                <p>17:00 - 21:00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
