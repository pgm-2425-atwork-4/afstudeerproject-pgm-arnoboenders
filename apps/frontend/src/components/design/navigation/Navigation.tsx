"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Button from "@/components/functional/button/Button";
import MobileNav from "./MobileNav";
import styles from "./navigation.module.css";

export default function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <nav className={`${styles.nav} ${isOpen ? styles.open : ""} w-full`}>
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 flex justify-between items-center w-full py-4 relative z-50">
          {/* Left Section - Logo and Nav Links */}
          <div className="flex items-center gap-4 sm:gap-8">
            {/* Logo */}
            <Link href="/">
              <Image
                src={
                  isOpen || pathname !== "/"
                    ? "/Loos_logo_dark.png"
                    : "/Loos_logo_light.png"
                }
                alt="logo"
                width={90}
                height={90}
              />
            </Link>

            {/* Desktop Navigation */}
            <div className={`${styles.navLinks} hidden md:flex gap-4`}>
              <NavLinks pathname={pathname} />
            </div>
          </div>

          {/* Right Section - Order Button & Mobile Menu */}
          <div className="flex items-center gap-4 sm:gap-6 flex-shrink-0 sm:px-4 relative">
            <Link href="/order">
              <Button text="Bestel nu" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              className={`${styles.menuButton} md:hidden sm:p-3 rounded-md`}
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle navigation menu"
            >
              {isOpen ? (
                <X size={30} />
              ) : (
                <Menu size={30} color={pathname === "/" ? "white" : "black"} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`${styles.mobileMenu} ${isOpen ? styles.mobileOpen : ""}`}
        >
          <MobileNav closeMenu={() => setIsOpen(false)} />
        </div>
      </nav>

      {/* Push hero down smoothly when nav is open */}
      <div
        className={`${styles.heroSpacer} ${isOpen ? styles.heroPushed : ""}`}
      ></div>
    </>
  );
}

// Reusable NavLinks Component
interface NavLinksProps {
  pathname: string;
}

const NavLinks = ({ pathname }: NavLinksProps) => (
  <div className="flex gap-4 sm:gap-6">
    <Link className={getNavClass(pathname)} href="/menu">
      Menu
    </Link>
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
  </div>
);

const getNavClass = (pathname: string) =>
  pathname === "/"
    ? "text-white hover:text-primaryHover"
    : "text-black hover:text-primaryHover";
