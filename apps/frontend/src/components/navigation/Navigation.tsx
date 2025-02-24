"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Button from "@/components/Button";
import MobileNav from "./MobileNav";
import styles from "./navigation.module.css"; // Import CSS

export default function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <>
      <nav className={`${styles.nav} ${isOpen ? styles.open : ""} px-20 my-8`}>
        <div className="flex justify-between items-center gap-10 ">
          <div className="flex items-center gap-10">
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
            <div className={`${styles.navLinks} hidden lg:flex`}>
              <NavLinks pathname={pathname} />
            </div>
          </div>

          {/* Order Btn */}
          <div className="flex items-center gap-10">
            <Link href="/order">
              <Button text="Bestel nu" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              className={`${styles.menuButton} lg:hidden`}
              onClick={() => setIsOpen(!isOpen)}
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
  <div className="flex gap-10">
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
  </div>
);

const getNavClass = (pathname: string) =>
  pathname === "/"
    ? "text-white hover:text-primaryHover"
    : "text-black hover:text-primaryHover";
