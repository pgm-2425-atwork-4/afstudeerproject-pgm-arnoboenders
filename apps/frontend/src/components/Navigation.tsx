"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "./Button";

export default function Navigation() {
  const pathname = usePathname();
  return (
    <nav className="flex gap-8 items-center justify-between mx-8 my-8">
      <div className="flex gap-8 items-center">
        <Link href="/">
          <Image
            src={
              pathname === "/" ? "/Loos_logo_light.png" : "/Loos_logo_dark.png"
            }
            alt="logo"
            width={100}
            height={100}
          />
        </Link>
        <Link
          className={
            pathname === "/"
              ? "text-white hover:text-primaryHover"
              : "text-black hover:text-primaryHover"
          }
          href="/about"
        >
          Over ons
        </Link>
        <Link
          className={
            pathname === "/"
              ? "text-white hover:text-primaryHover"
              : "text-black hover:text-primaryHover"
          }
          href="/eat-wise"
        >
          Eat Wise
        </Link>
        <Link
          className={
            pathname === "/"
              ? "text-white hover:text-primaryHover"
              : "text-black hover:text-primaryHover"
          }
          href="/vacancy"
        >
          Vacature
        </Link>
        <Link
          className={
            pathname === "/"
              ? "text-white hover:text-primaryHover"
              : "text-black hover:text-primaryHover"
          }
          href="/contact"
        >
          Contact
        </Link>
      </div>
      <Link href="/order">
        <Button text="Bestel nu" />
      </Link>
    </nav>
  );
}
