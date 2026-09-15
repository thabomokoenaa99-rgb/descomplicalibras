import type { Metadata } from "next";
import Image from "next/image";

const CHECKOUT_URL = "https://pay.cakto.com.br/x8w2ufs_1087793";

export const metadata: Metadata = {
  title: "Cronograma Acelerador de 21 Dias | Descomplica Libras",
  description:
    "Conclua seu aprendizado em Libras com o Cronograma Acelerador e Rastreador em PDF.",
  robots: { index: false, follow: false },
};

export default function Oferta21DiasPage() {
  return (
    <main className="-mt-[37px] min-h-screen bg-[#eaf8f7]">
      <header className="bg-red-600 px-4 py-2.5 text-center text-xs font-extrabold text-white shadow-md sm:text-sm">
        <strong className="uppercase">Espere!</strong> Não acesse o conteúdo sem ver isso antes...
      </header>

      <div className="mx-auto grid max-w-6xl items-center gap-3 px-3 py-3 sm:px-6 lg:min-h-[calc(100vh-41px)] lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 lg:py-10">
        <div className="relative mx-auto flex w-full justify-center lg:block lg:max-w-[480px]">
          <div className="absolute -inset-4 rounded-[2.5rem] bg-[#287f80]/10 blur-2xl" />
          <Image
            src="/images/mockup/cronograma-21-dias.jpg"
            alt="Cronograma Acelerador de Libras em 21 dias"
            width={1024}
            height={1024}
            priority
            sizes="(max-width: 1024px) 92vw, 44vw"
            className="relative h-[clamp(160px,23svh,240px)] w-auto max-w-full rounded-2xl object-contain shadow-[0_16px_40px_rgba(13,27,61,0.2)] lg:h-auto lg:w-full lg:rounded-[2rem]"
          />
        </div>

        <section className="mx-auto w-full max-w-xl text-center lg:text-left">
          <span className="inline-flex rounded-full bg-[#f5bd24] px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-ink shadow-sm sm:px-4 sm:py-2 sm:text-sm">
            Oferta especial • 50% OFF
          </span>

          <h1 className="mt-2 text-balance text-[clamp(1.3rem,5.8vw,1.8rem)] font-extrabold leading-[1.08] text-ink sm:mt-4 sm:text-4xl lg:text-5xl">
            Conclua o aprendizado em Libras em apenas{" "}
            <span className="text-[#207c7b]">21 Dias!</span>
          </h1>

          <div className="mx-auto mt-2 max-w-lg space-y-2.5 text-pretty text-xs font-semibold leading-snug text-body sm:mt-4 sm:space-y-3 sm:text-base sm:leading-relaxed lg:mx-0 lg:text-lg">
            <p>Aprenda em 21 dias com um método claro, simples e guiado.</p>
            <p>
              Leve o <strong className="text-ink">Cronograma Acelerador + Rastreador em PDF</strong>{" "}
              e tenha um passo a passo para saber exatamente o que fazer todos os dias, acompanhar
              sua evolução e evitar aquele momento em que você trava e não sabe como continuar.
            </p>
            <p>
              São 21 dias com direção, acompanhamento e um método para você sair do “não sei por
              onde começar” para “eu sei exatamente o que estou fazendo”.
            </p>
            <p>
              Comece hoje e transforme seus próximos 21 dias no seu período de maior evolução.
            </p>
          </div>

          <ul className="mx-auto mt-3 max-w-lg divide-y divide-[#207c7b]/10 overflow-hidden rounded-xl bg-white/80 text-left text-[11px] font-bold leading-tight text-ink shadow-sm sm:mt-5 sm:grid sm:gap-2 sm:divide-y-0 sm:bg-transparent sm:text-sm sm:shadow-none lg:mx-0 lg:text-base">
            <li className="flex items-start gap-2 px-3 py-2 sm:rounded-2xl sm:bg-white/80 sm:px-4 sm:py-3 sm:shadow-sm">
              <span aria-hidden="true">✓</span>
              <span>Trilha estruturada para estudar todos os dias</span>
            </li>
            <li className="flex items-start gap-2 px-3 py-2 sm:rounded-2xl sm:bg-white/80 sm:px-4 sm:py-3 sm:shadow-sm">
              <span aria-hidden="true">✓</span>
              <span>Rastreador em PDF para acompanhar sua evolução</span>
            </li>
            <li className="flex items-start gap-2 px-3 py-2 sm:rounded-2xl sm:bg-white/80 sm:px-4 sm:py-3 sm:shadow-sm">
              <span aria-hidden="true">✓</span>
              <span>Do básico às primeiras conversas em Libras</span>
            </li>
          </ul>

          <div className="mt-3 rounded-2xl border-2 border-[#207c7b]/20 bg-white p-3 shadow-[0_12px_35px_rgba(13,27,61,0.12)] sm:mt-6 sm:rounded-[2rem] sm:p-7">
            <p className="text-[11px] font-bold text-body sm:text-sm">
              De <s>R$ 42,00</s> por apenas
            </p>
            <div className="flex items-center justify-center gap-2 lg:justify-start">
              <strong className="text-3xl font-extrabold text-[#207c7b] sm:text-5xl">R$ 21,00</strong>
              <span className="rounded-lg bg-[#f5bd24] px-2 py-1 text-[10px] font-extrabold text-ink sm:px-2.5 sm:text-xs">
                50% OFF
              </span>
            </div>
            <p className="mt-0.5 text-[10px] font-extrabold uppercase tracking-wide text-ink sm:mt-2 sm:text-sm">
              Apenas R$ 1 por dia de cronograma
            </p>

            <a
              href={CHECKOUT_URL}
              className="btn-shine mt-2 inline-flex min-h-11 w-full items-center justify-center rounded-full border border-cta-dark/20 bg-cta px-4 py-2.5 text-center text-xs font-extrabold uppercase leading-tight tracking-tight text-ink shadow-[0_10px_24px_rgba(37,211,102,0.38)] transition-colors hover:bg-cta-dark focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-cta/40 sm:mt-5 sm:min-h-14 sm:px-5 sm:py-4 sm:text-lg"
            >
              Sim, quero aprender em 21 dias!
            </a>

            <p className="mt-1.5 text-[9px] font-semibold text-body/70 sm:mt-3 sm:text-xs">
              🔒 Pagamento seguro • Acesso imediato ao PDF
            </p>
          </div>

          <a
            href="https://members.cakto.com.br"
            className="mt-8 mb-6 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-zinc-200 px-4 py-3 text-center text-xs font-bold leading-tight text-body/75 transition-colors hover:bg-zinc-300 hover:text-body focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-body/30 sm:mt-5 sm:min-h-14 sm:text-sm"
          >
            Não quero o método completo, quero acessar meu material
          </a>
        </section>
      </div>
    </main>
  );
}
