import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <div className=" container  mt-32 mb-20">
      <h1>Over Eat Wise</h1>
      <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
        <div className="flex flex-col gap-4">
          <Image
            src="/assets/eatwiseImg.jpg"
            alt="about"
            width={500}
            height={500}
          />
          <p className="max-w-lg text-sm italic">
            * Hoewel wij voorzorgen nemen om kruisbesmetting te voorkomen,
            kunnen wij niet voor 100 % garanderen dat onze gerechten geen sporen
            van allergenen bevatten. Gelieve hiermee rekening te houden als je
            met bepaalde stoffen niet in aanraking mag komen.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <Image
            src="/assets/eatwiseLogo.jpg"
            alt="about"
            width={75}
            height={500}
          />
          <p className="max-w-lg">
            Als voedingsdeskundige ben ik dagdagelijks bezig met voeding en het
            effect ervan op de gezondheid. Ik ben erg blij dat ik met EAT WISE
            actief kan bijdragen aan de kwaliteit van LOOS, voor al zijn
            klanten. Dit is hoe we samen het verschil maken:
            <br />
          </p>
          <p className="max-w-lg">
            <strong> We helpen bij het kiezen van een gerecht. </strong>
            Je kan er vandaag de dag niet meer omheen dat er mensen zijn met
            overgevoeligheden voor bepaalde voedingsstoffen. Glutenvrij*,
            tarwevrij, lactose-arm, zonder koemelkeiwitten of aangepast voor wie
            last heeft van het prikkelbare-darmsyndroom, wij zorgen voor aanbod
            en toelichting.
          </p>
          <p className="max-w-lg">
            <strong>We voorzien systematisch een ‘LOW-CARB’-gerecht</strong>
            <br /> voor mensen die de inname van koolhydraten (suikers) willen
            beperken.
          </p>
          <p className="max-w-lg">
            <strong>We respecteren de bewuste keuze</strong> van vegetariërs,
            veganisten e.a. en zetten hen met alle plezier volwaardige en
            lekkere aangepaste gerechten voor. <br />
          </p>
          <p className="max-w-lg">
            <strong>
              LOOS is en blijft in de eerste plaats een pastarestaurant…{" "}
            </strong>
            <br />
            Maar wél een dat ervan uitgaat dat een middag of avondje uit voor
            iedereen moet (blijven) kunnen!
            <br />
          </p>
          <p className="max-w-lg">
            Heb je nog specifieke vragen, stel ze gerust.
          </p>
          <Image
            src="/assets/manuelaName.jpg"
            alt="about"
            width={100}
            height={100}
          />
          <p>
            voedingsdeskunige, erkend door het RIZIV <br />
            <Link
              className="hover:text-primary"
              href="mailto:manuela.octave@gmail.com"
            >
              manuela.octave@gmail.com
            </Link>
            <br />
            <Link className="hover:text-primary" href="tel:0495582072">
              0495 58 20 72
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
