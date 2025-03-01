import Image from "next/image";

export default function About() {
  return (
    <div className=" container  mt-32 mb-20">
      <h1>Over ons</h1>
      <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
        <div>
          <Image
            src="/assets/aboutImg.jpg"
            alt="about"
            width={500}
            height={500}
          />
        </div>
        <p className="max-w-lg">
          LOOS, dat is een pastarestaurant met een snuifje rock ’n roll in
          hartje Merchtem. Verrassend en hip maar in de eerste plaats gewoon
          top. En dan hebben we het over de pasta natuurlijk! Met op het menu
          verschillende klassiekers die we elke dag aanvullen met de inspiratie
          van het moment. Maar evengoed gaat het over het gezellige kader waarin
          je aan tafel gaat. Een knipoog naar vroeger, het licht gedempt en
          zalige muziek op de achtergrond.
          <br />
          Mee met de laatste voedingstrends, bieden we steeds een ‘low carb’
          versie van de pastagerechten aan. Ook glutenvrije en vegetarische
          pasta’s krijgen evenveel aandacht. Alles samengesteld, geproefd en
          goedgekeurd door Eat Wise.
        </p>
      </div>
    </div>
  );
}
