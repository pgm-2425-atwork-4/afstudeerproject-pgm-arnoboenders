import Image from "next/image";
import Button from "@/components/functional/button/Button";
import Link from "next/link";
import { BookText, Utensils } from "lucide-react";
import ItemCard from "@/components/design/menu-items/ItemCard";
import { getMenuItems } from "@/modules/menu/api";

export default async function Home() {
  const menuItems = await getMenuItems();

  return (
    <div>
      {/* Hero Section */}
      <div className="relative w-full min-h-[70vh] sm:min-h-[50vh] flex items-center overflow-hidden">
        {/* Background Image */}
        <Image
          src="/assets/hero.jpg"
          alt="Hero Image"
          fill
          priority
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Text Content */}
        <div className="container w-full">
          <div className="z-10 bg-black/30 backdrop-blur-md p-6 sm:p-8 rounded-lg max-w-md shadow-lg text-primary">
            <h1 className="text-2xl sm:text-3xl font-bold ">
              “Daarmee pasta...”
            </h1>
            <p className="text-lg sm:text-xl my-4">
              Eenvoudig, vers en boordevol smaak.
            </p>
            <Link href="/menu">
              <Button text="Bekijk het menu" icon={<BookText />} />
            </Link>
          </div>
        </div>
      </div>

      {/* Content Below Hero */}
      <div className="container mx-auto my-10">
        <h2>Nieuw deze maand</h2>

        <div className="flex gap-8 overflow-x-auto">
          {menuItems &&
            menuItems
              .filter((item) => item.is_new)
              .map((item) => <ItemCard key={item.id} item={item} />)}
        </div>

        <div className="flex justify-center my-10">
          <Link href="/order">
            <Button text="Bestel nu" icon={<Utensils />} />
          </Link>
        </div>

        {/* Additional Content */}

        <div className="flex flex-col lg:flex-row items-center justify-between my-20 gap-8">
          <Image
            src="/assets/homeImg1.png"
            alt="Foto interieur"
            width={500}
            height={300}
            className="shadow-xl"
          />
          <p className="max-w-md text-xl">
            🧑‍🍳 Eerlijke pasta, pure smaak Bij Loos draait alles om eenvoud en
            kwaliteit. Heerlijke pasta, gemaakt met verse ingrediënten Ontdek
            ons menu{" "}
            <Link href="/menu" className="underline hover:text-primary500">
              hier
            </Link>
          </p>
        </div>
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between my-20 gap-8">
          <p className="max-w-md text-xl">
            📍 Geen reservatie nodig Loop gewoon binnen en geniet. Voor groepen
            vanaf 6 personen kan je wel reserveren.
          </p>
          <Image
            src="/assets/homeImg2.png"
            alt="Foto interieur"
            width={500}
            height={300}
            className="shadow-xl"
          />
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-between my-20 gap-8">
          <Image
            src="/assets/homeImg1.png"
            alt="Foto interieur"
            width={500}
            height={300}
            className="shadow-xl"
          />
          <div>
            <h2>Openingsuren</h2>
            <div className="text-lg">
              {[
                { day: "Maandag", slots: ["Gesloten"] },
                { day: "Dinsdag", slots: ["11:30 - 14:00", "17:30 - 21:30"] },
                {
                  day: "Woensdag",
                  slots: ["09:00 - 13:30 (bar)", "17:30 - 21:30"],
                },
                { day: "Donderdag", slots: ["11:30 - 14:00", "17:30 - 21:30"] },
                { day: "Vrijdag", slots: ["11:30 - 14:00", "17:30 - 22:00"] },
                { day: "Zaterdag", slots: ["-", "17:30 - 22:00"] },
                { day: "Zondag", slots: ["-", "17:00 - 21:00"] },
              ].map(({ day, slots }) => (
                <div key={day} className="grid grid-cols-3 gap-4">
                  <p>{day}:</p>
                  {slots.map((slot, index) => (
                    <p
                      key={index}
                      className={slot.includes("bar") ? "text-gray-500" : ""}
                    >
                      {slot}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
