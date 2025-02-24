"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // Icons
import Button from "@/components/Button";
import MobileNav from "./MobileNav";
import path from "path";

export default function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <nav
        className={`transition-all duration-300 ease-in-out bg-red-400 ${isOpen ? "h-auto" : "h-[80px]"} shadow-md`}
      >
        <div className="flex items-center justify-between px-4 md:px-8 py-4">
          {/* Logo */}
          <Link href="/">
            <Image
              src={
                isOpen || pathname !== "/"
                  ? "/Loos_logo_dark.png"
                  : "/Loos_logo_light.png"
              }
              alt="logo"
              width={100}
              height={100}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8 items-center">
            <NavLinks pathname={pathname} />
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <X size={30} color="black" />
            ) : (
              <Menu size={30} color={pathname === "/" ? "white" : "black"} />
            )}
          </button>
        </div>

        {/* Mobile Navigation (Pushes Hero Down) */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[300px] py-4" : "max-h-0"}`}
        >
          <MobileNav closeMenu={() => setIsOpen(false)} />
        </div>
      </nav>
    </>
  );
}

// Reusable NavLinks Component
interface NavLinksProps {
  pathname: string;
}

const NavLinks = ({ pathname }: NavLinksProps) => (
  <>
    <Link className={getNavClass(pathname)} href="/about">
      Over ons
    </Link>
    <Link className={getNavClass(pathname)} href="/eat-wise">
      Eat Wise
    </Link>
    <Link className={getNavClass(pathname)} href="/vacancy">
      Vacature
    </Link>
    <Link className={getNavClass(pathname)} href="/contact">
      Contact
    </Link>
    <Link className={getNavClass(pathname)} href="/menu">
      Menu
    </Link>
    <Link href="/order">
      <Button text="Bestel nu" />
    </Link>
  </>
);

const getNavClass = (pathname: string) =>
  pathname === "/"
    ? "text-white hover:text-primaryHover"
    : "text-black hover:text-primaryHover";
