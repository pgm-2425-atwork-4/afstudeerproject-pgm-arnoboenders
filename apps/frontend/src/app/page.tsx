import Image from "next/image";
import styles from "./styles/hero.module.css";
import Button from "@/components/Button";
import Link from "next/link";
import { BookText } from "lucide-react";

export default function Home() {
  return (
    <>
      <div className={styles.heroContainer}>
        <Image src="/assets/hero.jpg" alt="Hero Image" fill priority />
        <div className={styles.heroContent}>
          <h1 className={`${styles.heroTitle} text-primary`}>
            “Daarmee pasta.”
          </h1>
          <p className={`${styles.heroSubtitle} text-primary`}>
            Eenvoudig, vers en boordevol smaak.
          </p>
          <Link href={"/menu"}>
            <Button text="Bekijk het menu" icon={<BookText />} />
          </Link>
        </div>
      </div>
    </>
  );
}
