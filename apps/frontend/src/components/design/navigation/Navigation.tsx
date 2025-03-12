"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Button from "@/components/functional/button/Button";
import MobileNav from "./MobileNav";
import styles from "./navigation.module.css";
import { useOrders } from "@/components/context/OrderProvider";

export default function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { orders } = useOrders();

  const totalOrders = orders.reduce((acc, order) => acc + order.amount, 0);

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
      <nav
        className={`${styles.nav} ${isOpen ? styles.open : ""} w-full ${pathname === "/" && "bg-whiteTransparent"}`}
      >
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 flex justify-between items-center w-full py-4 relative z-50">
          <div className={`flex items-center gap-4 sm:gap-8 `}>
            <Link href="/">
              <Image
                src="/Loos_logo_dark.png"
                alt="logo"
                width={90}
                height={90}
              />
            </Link>
            <div className={`${styles.navLinks} hidden md:flex gap-4`}>
              <NavLinks />
            </div>
          </div>

          {/* Right Section - Order Button & Mobile Menu */}
          <div className="flex items-center gap-4 sm:gap-6 flex-shrink-0 sm:px-4 relative">
            <Link href="/order">
              <Button number={totalOrders} text="Bestel nu" />
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

const NavLinks = () => (
  <div className="flex gap-4 sm:gap-6">
    <Link className="hover:text-primary500" href="/menu">
      Menu
    </Link>
    <Link className="hover:text-primary500" href="/about">
      Over ons
    </Link>
    <Link className="hover:text-primary500" href="/eat-wise">
      Eat Wise
    </Link>
    <Link className="hover:text-primary500" href="/vacancy">
      Vacature
    </Link>
    <Link className="hover:text-primary500" href="/contact">
      Contact
    </Link>
  </div>
);
