import Link from "next/link";
import { Facebook, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary text-white text-center p-4 flex flex-col gap-4 items-center">
      <div>
        LOOS©2025 Alle rechten voorbehouden |{" "}
        <Link
          className="hover:text-primary200"
          href="tel:052577877"
          title="Bel ons"
        >
          Tel 052 57 78 77
        </Link>{" "}
        |{" "}
        <Link
          className="hover:text-primary200"
          href="mailto:info@loos-merchtem.be"
          title="Mail ons"
        >
          info@loos-merchtem.be
        </Link>
      </div>
      <div className="flex gap-4">
        <Link
          className="hover:text-primary200"
          href="https://www.instagram.com/loos_merchtem/"
          title="Bekijk onze Instagram"
        >
          <Instagram />
        </Link>
        <Link
          className="hover:text-primary200"
          href="https://www.facebook.com/loosmerchtem.be/"
          title="Bekijk onze Facebook"
        >
          <Facebook />
        </Link>
      </div>
      <div>
        Webdesign:{" "}
        <Link className="hover:text-primary200" href="https://siteffect.be/" title="Siteffect">
          Siteffect
        </Link>{" "}
        | Graphic Design: Flying Fox | Fotografie:{" "}
        <Link
          className="hover:text-primary200"
          href="https://www.fermedelahe.be/"
          title="Inge Desmedt"
        >
          Inge Desmedt{" "}
        </Link>
        |{" "}
        <Link className="hover:text-primary200" href="/privacy-cookies" title="Privacy & Cookies">
          Privacy & Cookies
        </Link>
      </div>
    </footer>
  );
}
