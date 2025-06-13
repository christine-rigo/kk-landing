'use client';

import Image from "next/image";

interface HeroProps {}

const Hero: React.FC<HeroProps> = () => {

  return (
    <section className="relative md:min-h-[724px] lg:min-h-[924px] flex items-center max-md:pt-14 bg-[url('/hero-bg-mobile.webp')] md:bg-[url('/hero-bg.webp')] bg-cover bg-center">
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
          <div>
            <Image
              className="w-full max-md:hidden"
              src={`/hero-img.webp`}
              alt="hero-img"
              width={850}
              height={708}
            />
            <Image
              className="w-full max-w-md md:hidden"
              src={`/hero-img-mobile.webp`}
              alt="hero-img"
              width={768}
              height={600}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
