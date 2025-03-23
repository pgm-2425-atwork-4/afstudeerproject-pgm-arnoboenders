import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Loos-merchtem | Vacature",
  description: "Vacature bij loos merchtem",
};

export default function About() {
  return (
    <div className=" container  mt-32 mb-20">
      <h1>Kok | Hulpkok | Kitchen Wizard</h1>
      <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
        <div className="flex flex-col gap-4">
          <Image
            src="/assets/vacancyImg.jpg"
            alt="about"
            width={500}
            height={500}
          />
          <div>
            <h2>Solliciteren</h2>
            <p className="max-w-lg text-md">
              LOOS <br />
              tav Sven Loos <br />
              Nieuwstraat 4 1785 Merchtem <br /> mail:{" "}
              <Link
                className="hover:text-primary"
                href="mailto:info@loos-merchtem.be"
                title="Mail ons"
              >
                info@loos-merchtem.be
              </Link>{" "}
              <br />
              tel.:{" "}
              <Link
                className="hover:text-primary"
                href="tel:0477/55.76.30"
                title="Bel ons"
              >
                0477/55.76.30
              </Link>
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <h2>Bedrijf</h2>
            <p className="max-w-lg">
              LOOS, dat is een pastarestaurant met een snuifje rock ’n roll in
              hartje Merchtem. Verrassend en hip maar in de eerste plaats gewoon
              top. En dan hebben we het over de pasta natuurlijk! Met op het
              menu verschillende klassiekers die we elke dag aanvullen met de
              inspiratie van het moment. Maar evengoed gaat het over het
              gezellige kader waarin je aan tafel gaat. Een knipoog naar
              vroeger, het licht gedempt en zalige muziek op de achtergrond.
            </p>
          </div>
          <div>
            <h2>You are the magic behind the kitchen door!</h2>
            <li>Bereiden van gerechten en deze controleren op kwaliteit.</li>
            <li>Bestellen van voorraden bij leveranciers.</li>
            <li>Meedenken met de chef.</li>
            <li>Aansturen van het keukenteam.</li>
          </div>
          <div>
            <h2>Profiel</h2>
            <li>You don’t have to be crazy to work here, but it helps!</li>
            <li>Met mes en vork kunnen eten.</li>
            <li>Zelfstandig, leergierig.</li>
            <li>Flexibel</li>
            <li>Een passie voor koken.</li>
            <li>Gemotiveerd, teamplayer , opgewekt, betrouwbaar.</li>
          </div>
          <div>
            <h2>Uurrooster</h2>
            <li>Vast of variabel uurrooster. We zijn zeer flexibel.</li>
            <li>Voltijds of deeltijds, vast of flexi.</li>
          </div>
          <div>
            <h2>Startdatum</h2>
            <p className="max-w-lg">
              Onmiddellijke indiensttreding of te bespreken.
            </p>
          </div>
          <div>
            <h2>Aanbod</h2>
            <li>Life is short, work somewhere awesome!</li>
            <li>Voltijds of deeltijds, vast of flexi.</li>
            <li>Correcte verloning.</li>
            <li>
              Een bruisende plek waar werken en plezier hand in hand gaan.
            </li>
            <li>Klein, jong en dynamisch team.</li>
          </div>
        </div>
      </div>
    </div>
  );
}
