"use client";
import Link from "next/link";

interface MobileNavProps {
  closeMenu: () => void;
}

export default function MobileNav({ closeMenu }: MobileNavProps) {
  return (
    <div className="flex flex-col items-center gap-4 bg-background">
      <Link className="text-black text-lg" href="/menu" onClick={closeMenu} title="Bekijk het menu">
        Menu
      </Link>
      <Link className="text-black text-lg" href="/about" onClick={closeMenu} title="Over ons">
        Over ons
      </Link>
      <Link className="text-black text-lg" href="/eat-wise" onClick={closeMenu} title="Eat Wise">
        Eat Wise
      </Link>
      <Link className="text-black text-lg" href="/vacancy" onClick={closeMenu} title="Vacature">
        Vacature
      </Link>
      <Link className="text-black text-lg" href="/contact" onClick={closeMenu} title="Contact">
        Contact
      </Link>
    </div>
  );
}
