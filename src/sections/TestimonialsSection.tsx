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

        <div className="flex flex-col items-center gap-5 sm:grid sm:grid-cols-3 sm:items-stretch sm:gap-4 lg:gap-6">
          {testimonials.map((item) => (
            <div
              key={item.src}
              className="w-full max-w-[20rem] sm:max-w-none rounded-2xl overflow-hidden shadow-[0_8px_24px_rgba(13,27,61,0.10)] border border-zinc-200/80 bg-white"
            >
              <Image
                src={item.src}
                alt={item.alt}
                width={326}
                height={418}
                loading="lazy"
                sizes="(max-width: 640px) 85vw, (max-width: 1024px) 28vw, 18rem"
                className="w-full h-auto object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
