"use client";
import Link from "next/link";
import Button from "@/components/Button";

interface MobileNavProps {
  closeMenu: () => void;
}

export default function MobileNav({ closeMenu }: MobileNavProps) {
  return (
    <div className="flex flex-col items-center gap-4 bg-background">
      <Link className="text-black text-lg" href="/menu" onClick={closeMenu}>
        Menu
      </Link>
      <Link className="text-black text-lg" href="/about" onClick={closeMenu}>
        Over ons
      </Link>
      <Link className="text-black text-lg" href="/eat-wise" onClick={closeMenu}>
        Eat Wise
      </Link>
      <Link className="text-black text-lg" href="/vacancy" onClick={closeMenu}>
        Vacature
      </Link>
      <Link className="text-black text-lg" href="/contact" onClick={closeMenu}>
        Contact
      </Link>
      <Link href="/order" onClick={closeMenu}>
        <Button text="Bestel nu" />
      </Link>
    </div>
  );
}
