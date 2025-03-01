import Link from "next/link";
import { Facebook, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary text-white text-center p-4 flex flex-col gap-4 items-center">
      <div>
        LOOS©2025 Alle rechten voorbehouden |{" "}
        <Link className="hover:text-primaryHover" href="tel:052577877">
          Tel 052 57 78 77
        </Link>{" "}
        |{" "}
        <Link
          className="hover:text-primaryHover"
          href="mailto:info@loos-merchtem.be"
        >
          info@loos-merchtem.be
        </Link>
      </div>
      <div className="flex gap-4">
        <Link className="hover:text-primaryHover" href="instagram.com">
          <Instagram />
        </Link>
        <Link className="hover:text-primaryHover" href="instagram.com">
          <Facebook />
        </Link>
      </div>
      <div>
        Webdesign:{" "}
        <Link className="hover:text-primaryHover" href="https://siteffect.be/">
          Siteffect
        </Link>{" "}
        | Graphic Design: Flying Fox | Fotografie:{" "}
        <Link
          className="hover:text-primaryHover"
          href="https://www.fermedelahe.be/"
        >
          Inge Desmedt{" "}
        </Link>
        |{" "}
        <Link className="hover:text-primaryHover" href="/privacy&cookies">
          Privacy & Cookies
        </Link>
      </div>
    </footer>
  );
}
