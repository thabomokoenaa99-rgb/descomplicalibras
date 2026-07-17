import { copy } from "@/lib/content";

export function IdealForSection() {
  return (
    <section className="bg-primary py-12 sm:py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl sm:text-4xl font-extrabold text-center text-ink mb-12 sm:mb-16 tracking-tight text-balance leading-snug">
          {copy.idealFor.titleBefore}{" "}
          <span className="text-cta-darker">{copy.idealFor.brand}</span> {copy.idealFor.titleAfter}
        </h2>

        <div className="max-w-3xl mx-auto">
          {copy.idealFor.items.map((item, i) => {
            const isLast = i === copy.idealFor.items.length - 1;
            return (
              <article
                key={item.title}
                className={`mb-5 sm:mb-6 relative overflow-hidden rounded-[2rem] p-6 sm:p-8 border border-white/5 shadow-[0_20px_45px_rgba(13,27,61,0.30)] ${
                  isLast
                    ? "mb-2 bg-gradient-to-br from-cta-darker to-ink"
                    : "bg-gradient-to-br from-ink to-ink-deep"
                }`}
              >
                <span
                  className={`absolute -right-5 -bottom-6 text-8xl pointer-events-none ${isLast ? "opacity-15" : "opacity-10"}`}
                  aria-hidden="true"
                >
                  {item.emoji}
                </span>
                <div className="relative z-10 flex items-start gap-4 sm:gap-5">
                  <div
                    className={`p-3 text-white rounded-2xl shrink-0 backdrop-blur-sm ${
                      isLast ? "bg-white/15 ring-1 ring-white/25" : "bg-cta/20 ring-1 ring-cta/30"
                    }`}
                  >
                    <span className="text-4xl sm:text-5xl leading-none" aria-hidden="true">
                      {item.emoji}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-extrabold text-white text-lg sm:text-xl leading-snug text-balance">
                      {item.title}
                    </h3>
                    <p
                      className={`text-sm sm:text-base mt-1.5 leading-relaxed ${isLast ? "text-white/80" : "text-white/70"}`}
                    >
                      {item.text}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
