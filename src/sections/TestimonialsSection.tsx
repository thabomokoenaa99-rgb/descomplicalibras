import Image from "next/image";

const testimonials = [
  {
    src: "/images/ui/depoimento-mariana.webp",
    alt: "Depoimento de Mariana S. no WhatsApp elogiando o método de mapas mentais de Libras",
  },
  {
    src: "/images/ui/depoimento-ricardo.webp",
    alt: "Depoimento de Ricardo no WhatsApp sobre a qualidade do material Descomplica Libras",
  },
  {
    src: "/images/ui/depoimento-lucas.webp",
    alt: "Depoimento de Lucas no WhatsApp recomendando o material para familiares",
  },
] as const;

type Props = {
  className?: string;
  containerClassName?: string;
};

export function TestimonialsSection({
  className = "bg-white py-10 sm:py-14 px-4",
  containerClassName = "max-w-5xl mx-auto",
}: Props) {
  return (
    <section className={className} aria-labelledby="testimonials-title">
      <div className={containerClassName}>
        <div className="text-center mb-8 sm:mb-10">
          <h2
            id="testimonials-title"
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-ink tracking-tight text-balance"
          >
            O que nossos clientes dizem
          </h2>
          <div className="mx-auto mt-3 mb-2.5 h-0.5 w-10 rounded-full bg-orange-400" aria-hidden="true" />
          <p className="text-sm sm:text-base text-body/70 font-medium">
            Depoimentos reais de quem já experimentou
          </p>
        </div>

        <div className="relative -mx-4 sm:mx-0">
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-6 sm:w-10 bg-gradient-to-r from-white to-transparent"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-6 sm:w-10 bg-gradient-to-l from-white to-transparent"
            aria-hidden="true"
          />

          <div
            className="flex gap-4 overflow-x-auto hide-scrollbar snap-x snap-mandatory scroll-smooth px-4 sm:px-2 pb-2 lg:justify-center lg:overflow-visible lg:snap-none"
            role="list"
            aria-label="Depoimentos de clientes"
          >
            {testimonials.map((item) => (
              <div
                key={item.src}
                role="listitem"
                className="w-[78vw] max-w-[18rem] shrink-0 snap-center rounded-2xl overflow-hidden shadow-[0_8px_24px_rgba(13,27,61,0.10)] border border-zinc-200/80 bg-white lg:w-[16.5rem] lg:max-w-none lg:shrink-0"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={326}
                  height={418}
                  loading="lazy"
                  sizes="(max-width: 1024px) 78vw, 16.5rem"
                  className="w-full h-auto object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
