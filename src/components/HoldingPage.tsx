"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import HeroHolding from "@/components/HeroHolding";
export default function HoldingPage() {
  const [mounted, setMounted] = useState(false);
  const sealRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true); // Delay rendering seal div until after hydration
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const seal = (window as any).anj_67201f84_e40b_4bdd_8a07_d4965ca9d3b4;
    if (seal?.init && sealRef.current) {
      try {
        seal.init();
      } catch (error) {
        console.error("Failed to initialize ANJ seal:", error);
      }
    }
  }, [mounted]);
  return (
    <>
      <header className="py-3 md:py-8 relative z-[99] bg-kk-ivory">
        <div className="container">
          <div className="flex items-center justify-between">
            <Link href="/lobbby" className="flex items-center gap-1 max-md:flex-col">
              <Image className="max-md:max-w-14" src={`/kalo-logo-1.svg`} alt="Logo 1" width={100} height={39} />
              <Image className="max-md:max-w-14" src={`/kalo-logo-2.svg`} alt="Logo 2" width={100} height={39} />
            </Link>
          </div>
        </div>
      </header>
      <main className="text-kk-midnight-100 bg-kk-ivory">
        <HeroHolding />
      </main>
      <footer className="bg-kk-ivory pt-12 lg:pt-24 pb-6">
        <div className="container">
          <div className="flex items-center justify-center gap-1">
            <Image className="max-md:max-w-24" src={`/kalo-logo-1.svg`} alt="" width={180} height={70} />
            <Image className="max-md:max-w-24" src={`/kalo-logo-2.svg`} alt="" width={180} height={70} />
          </div>
          <p className="text-center font-semibold mt-6">Got crypto? Let&apos;s play</p>
          <div className="grid grid-cols-2 gap-8 md:justify-items-center max-w-md mx-auto mt-11"></div>
          <div className="flex flex-col lg:flex-row justify-center items-center w-fit max-w-md mx-auto gap-7 border-t pt-10 border-kk-midnight-50 max-md:pt-8 max-md:mt-8">
            <figure>
              <a href="https://www.gamblersanonymous.org" target="_blank">
                <Image className="max-md:max-w-28" src={`/ga.png`} alt="" width={186} height={76} />
              </a>
            </figure>
            <figure>
              <Image className="max-sm:w-20 max-md:max-w-28" src={`/ga-t.png`} alt="" width={186} height={76} />
            </figure>
            <figure>
              <Image className="max-sm:w-20 max-md:max-w-28" src={`/18+.png`} alt="" width={186} height={76} />
            </figure>
            {mounted && (
              <div
                ref={sealRef}
                className="max-sm:w-20"
                id="anj-67201f84-e40b-4bdd-8a07-d4965ca9d3b4"
                data-anj-seal-id="67201f84-e40b-4bdd-8a07-d4965ca9d3b4"
                data-anj-image-size="128"
                data-anj-image-type="basic-small"
              ></div>
            )}
          </div>
          <div className="text-center text-xs lg:text-sm pt-12 pb-8 border-t border-kk-midnight-50 mt-8 md:mt-11">
            <p className="max-w-screen-lg mx-auto">
              KALOKALO.IO is owned and operated by Kalo OAB B.V. (registration number 167484) and with its registered
              address at Zuikertuintjeweg Z/N (Zuikertuin Tower), Willemstad, Curacao. You can email us at{" "}
              <a className="text-kk-bright-teal-dark font-bold underline" href="mailto:contact@kalokalo.io">
                contact@kalokalo.io
              </a>
              . Kalo OAB B.V. is licensed and regulated by the Government of the Autonomous Island of Anjouan, Union of
              Comoros and operates under License No. ALSI-202504031-FI2. Kalo OAB B.V. has passed its applicable
              regulatory compliance requirements and is legally authorised to conduct gaming operations for any and all
              games of chance and wagering.
            </p>
            <p className="text-kk-midnight-50 font-semibold mt-6">KALOKALO © 2025 | All Rights Reserved</p>
          </div>
        </div>
      </footer>
    </>
  );
}
