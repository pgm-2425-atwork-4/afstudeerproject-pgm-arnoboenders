import ContactForm from "@/components/functional/forms/ContactForm";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Loos-merchtem | Contact",
  description: "Contacteer loos merchtem",
};

export default function About() {
  return (
    <div className=" container  mt-32 mb-20">
      <h1>Contact</h1>
      <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2513.1110547807775!2d4.229522177214712!3d50.95865095064188!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c3ebc248d0ae95%3A0x262db1569fa0083!2sLoos!5e0!3m2!1sen!2sbe!4v1740495788685!5m2!1sen!2sbe"
          loading="lazy"
          height={800}
          referrerPolicy="no-referrer-when-downgrade"
          className="shadow-xl rounded-xl w-full lg:w-2/3"
        ></iframe>
        <div className="flex flex-col gap-4">
          <div>
            <h2>Openingsuren</h2>
            <div className="text-sm">
              <div className="grid grid-cols-3 gap-4">
                <p>Maandag:</p>
                <p>Gesloten</p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <p>Dinsdag:</p>
                <p>11:30 - 14:00</p>
                <p>17:30 - 21:30</p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <p>Woensdag:</p>
                <p>09:00 - 13:30 (bar)</p>
                <p>17:30 - 21:30</p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <p>Donderdag:</p>
                <p>11:30 - 14:00</p>
                <p>17:30 - 21:30</p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <p>Vrijdag:</p>
                <p>11:30 - 14:00</p>
                <p>17:30 - 22:00</p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <p>Zaterdag:</p>
                <p>-</p>
                <p>17:30 - 22:00</p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <p>Zondag:</p>
                <p>-</p>
                <p>17:00 - 21:00</p>
              </div>
            </div>
          </div>
          <div>
            <ContactForm />
          </div>
          <div className="flex flex-col">
            <p className="max-w-lg">Nieuwstraat 4 - 1785 Merchtem</p>
            <Link className="hover:text-primary300" href="tel:052577877">
              Tel 052 57 78 77
            </Link>
            <Link
              className="hover:text-primary300"
              href="mailto:info@loos-merchtem.be"
            >
              info@loos-merchtem.be
            </Link>
          </div>
          <div className="flex flex-col">
            <p className="max-w-lg">LOOS is een concept van Eat Wise Bvba</p>
            <p className="max-w-lg">BE 0662.569.089</p>
            <p className="max-w-lg">Molenbaan 39 – 1785 Merchtem</p>
          </div>
        </div>
      </div>
    </div>
  );
}
