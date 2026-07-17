import Image from "next/image";
import { carouselImages, copy } from "@/lib/content";

function Track({
  images,
  reverse = false,
}: {
  images: typeof carouselImages;
  reverse?: boolean;
}) {
  const loop = [...images, ...images];
  return (
    <div className="overflow-hidden hide-scrollbar pointer-events-none select-none px-8 sm:px-16 md:px-32">
      <div
        className={`flex gap-5 sm:gap-8 w-max items-center py-3 ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
      >
        {loop.map((img, i) => (
          <div
            key={`${img.src}-${i}`}
            className="flex-none w-72 sm:w-[24rem] md:w-[28rem] relative flex items-center justify-center bg-white p-3.5 rounded-2xl border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.15)]"
          >
            <Image
              src={img.src}
              alt={img.alt}
              width={480}
              height={360}
              loading="lazy"
              sizes="(max-width: 640px) 18rem, 28rem"
              className="w-full h-auto object-contain rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function CarouselSection() {
  const row1 = carouselImages.slice(0, 8);
  const row2 = carouselImages.slice(8, 16);

  return (
    <section className="bg-gradient-to-br from-ink via-ink-soft to-ink-deep py-10 sm:py-14 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 mb-8 sm:mb-10 text-center">
        <h2 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight text-balance leading-snug">
          {copy.carousel.title} <span className="text-cta">{copy.carousel.brand}</span>
        </h2>
      </div>

      <div className="relative max-w-7xl mx-auto w-full overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 w-8 sm:w-16 md:w-32 bg-gradient-to-r from-ink to-transparent z-10 pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute inset-y-0 right-0 w-8 sm:w-16 md:w-32 bg-gradient-to-l from-ink to-transparent z-10 pointer-events-none"
          aria-hidden="true"
        />

        <Track images={row1} />
        <Track images={row2} reverse />

        <div className="flex flex-col items-center mt-6 relative z-20 w-full">
          <div className="w-full sm:max-w-4xl bg-white p-0 sm:p-3.5 rounded-none sm:rounded-3xl border-0 sm:border border-white/10 shadow-none sm:shadow-[0_10px_30px_rgba(0,0,0,0.15)]">
            <Image
              src="/images/entregaveis/alfabeto-numeros.webp"
              alt="Alfabeto e números em Libras — mapa mental visual"
              width={960}
              height={720}
              loading="lazy"
              sizes="(max-width: 640px) 100vw, 56rem"
              className="w-full h-auto object-contain rounded-none sm:rounded-2xl"
            />
          </div>
        </div>

        <div className="flex flex-col items-center mt-10 sm:mt-12 px-4">
          <span className="bg-white/10 text-white font-extrabold px-5 sm:px-8 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm tracking-wide text-center uppercase border border-white/25 shadow-sm text-balance backdrop-blur-sm">
            {copy.carousel.badge}
          </span>
        </div>
      </div>
    </section>
  );
}
