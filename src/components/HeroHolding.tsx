"use client";

import Image from "next/image";

interface HeroProps {}

const HeroHolding: React.FC<HeroProps> = () => {
  return (
    <section className="relative md:min-h-[724px] lg:min-h-[924px] flex items-center pt-12 pb-8 lg:pt-14 lg:pt-0 bg-[url('/hero-bg-mobile.webp')] md:bg-[url('/hero-holding.png')] bg-cover bg-center">
      <div className="container relative max-md:!px-0">
        <div className="flex items-center gap-10 max-md:flex-col max-md:gap-4">
          <div className="max-md:text-center">
            <Image
              className="mb-10 w-full max-md:mb-5 max-md:max-w-72"
              src={`/hero-title.svg`}
              alt="hero-title"
              width={498}
              height={214}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroHolding;
