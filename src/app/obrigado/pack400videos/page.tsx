import type { Metadata } from "next";
import Image from "next/image";
import { VideoExamples } from "@/components/VideoExamples";

const CHECKOUT_URL = "https://pay.cakto.com.br/vmfzakc_1113034";

export const metadata: Metadata = {
  title: "Pack 400 Vídeos em Câmera Lenta | Descomplica Libras",
  description:
    "Domine o movimento exato de cada sinal com 400 vídeos práticos em câmera lenta.",
  robots: { index: false, follow: false },
};

export default function Pack400VideosPage() {
  return (
    <main className="-mt-[37px] min-h-screen bg-[#eaf8f7]">
      <header className="bg-red-600 px-4 py-2.5 text-center text-xs font-extrabold text-white shadow-md sm:text-sm">
        <strong className="uppercase">Espere!</strong> Não acesse o conteúdo sem ver isso antes...
      </header>

      <div className="mx-auto grid max-w-6xl items-center gap-3 px-3 py-3 sm:px-6 lg:min-h-[calc(100vh-41px)] lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 lg:py-10">
        <div className="relative mx-auto flex w-full justify-center lg:block lg:max-w-[480px]">
          <div className="absolute -inset-4 rounded-[2.5rem] bg-[#287f80]/10 blur-2xl" />
          <Image
            src="/images/mockup/pack-400-videos.png"
            alt="Biblioteca Visual de Libras com 400 vídeos práticos"
            width={500}
            height={500}
            priority
            sizes="(max-width: 1024px) 92vw, 44vw"
            className="relative h-[clamp(160px,23svh,240px)] w-auto max-w-full object-contain drop-shadow-[0_16px_25px_rgba(13,27,61,0.2)] lg:h-auto lg:w-full"
          />
        </div>

        <section className="mx-auto w-full max-w-xl text-center lg:text-left">
          <span className="inline-flex rounded-full bg-[#f5bd24] px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-ink shadow-sm sm:px-4 sm:py-2 sm:text-sm">
            Oferta especial • 50% OFF
          </span>

          <h1 className="mt-2 text-balance text-[clamp(1.3rem,5.8vw,1.8rem)] font-extrabold leading-[1.08] text-ink sm:mt-4 sm:text-4xl lg:text-5xl">
            Domine o Movimento Exato com{" "}
            <span className="text-[#207c7b]">400 Vídeos em Câmera Lenta!</span>
          </h1>

          <div className="mx-auto mt-2 max-w-lg space-y-2.5 text-pretty text-xs font-semibold leading-snug text-body sm:mt-4 sm:space-y-3 sm:text-base sm:leading-relaxed lg:mx-0 lg:text-lg">
            <p>
              Os mapas mentais organizam sua mente, mas sem ver o movimento real na prática, o
              aprendizado fica pela <strong className="text-ink">metade</strong>.
            </p>
            <p>
              Leve a <strong className="text-ink">Biblioteca Visual com 400 Vídeos Práticos de 10 Segundos</strong>{" "}
              e veja o passo a passo exato de cada sinal em câmera lenta, eliminando de vez a dúvida
              de como posicionar os dedos, o ângulo da mão e a expressão correta.
            </p>
            <p>
              São 400 palavras, expressões, cumprimentos e vocabulário completo do dia a dia para
              você sair da insegurança e executar qualquer sinal com total clareza e perfeição.
            </p>
            <p>
              Acelere sua prática hoje e tenha o guia visual definitivo sempre na palma da sua mão.
            </p>
          </div>

          <VideoExamples checkoutUrl={CHECKOUT_URL} />

          <ul className="mx-auto mt-3 max-w-lg divide-y divide-[#207c7b]/10 overflow-hidden rounded-xl bg-white/80 text-left text-[11px] font-bold leading-tight text-ink shadow-sm sm:mt-5 sm:grid sm:gap-2 sm:divide-y-0 sm:bg-transparent sm:text-sm sm:shadow-none lg:mx-0 lg:text-base">
            <li className="flex items-start gap-2 px-3 py-2 sm:rounded-2xl sm:bg-white/80 sm:px-4 sm:py-3 sm:shadow-sm">
              <span aria-hidden="true">✓</span>
              <span>400 vídeos curtos de 10 segundos direto ao ponto</span>
            </li>
            <li className="flex items-start gap-2 px-3 py-2 sm:rounded-2xl sm:bg-white/80 sm:px-4 sm:py-3 sm:shadow-sm">
              <span aria-hidden="true">✓</span>
              <span>Passo a passo em câmera lenta com ângulo e movimento correto</span>
            </li>
            <li className="flex items-start gap-2 px-3 py-2 sm:rounded-2xl sm:bg-white/80 sm:px-4 sm:py-3 sm:shadow-sm">
              <span aria-hidden="true">✓</span>
              <span>Vocabulário completo: saudações, expressões e frases do cotidiano</span>
            </li>
          </ul>

          <div className="mt-3 rounded-2xl border-2 border-[#207c7b]/20 bg-white p-3 shadow-[0_12px_35px_rgba(13,27,61,0.12)] sm:mt-6 sm:rounded-[2rem] sm:p-7">
            <p className="text-[11px] font-bold text-body sm:text-sm">
              De <s>R$ 35,80</s> por apenas
            </p>
            <div className="flex items-center justify-center gap-2 lg:justify-start">
              <strong className="text-3xl font-extrabold text-[#207c7b] sm:text-5xl">
                R$ 17,90
              </strong>
              <span className="rounded-lg bg-[#f5bd24] px-2 py-1 text-[10px] font-extrabold text-ink sm:px-2.5 sm:text-xs">
                50% OFF
              </span>
            </div>
            <p className="mt-0.5 text-[10px] font-extrabold uppercase tracking-wide text-ink sm:mt-2 sm:text-sm">
              Apenas alguns centavos por vídeo prático
            </p>

            <a
              href={CHECKOUT_URL}
              className="btn-shine mt-2 inline-flex min-h-11 w-full items-center justify-center rounded-full border border-cta-dark/20 bg-cta px-4 py-2.5 text-center text-xs font-extrabold uppercase leading-tight tracking-tight text-ink shadow-[0_10px_24px_rgba(37,211,102,0.38)] transition-colors hover:bg-cta-dark focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-cta/40 sm:mt-5 sm:min-h-14 sm:px-5 sm:py-4 sm:text-lg"
            >
              Sim, quero o guia visual em câmera lenta!
            </a>

            <a
              href="https://members.cakto.com.br"
              className="mt-2 inline-flex min-h-11 w-full items-center justify-center rounded-full bg-zinc-200 px-4 py-2.5 text-center text-[11px] font-bold leading-tight text-body/75 transition-colors hover:bg-zinc-300 hover:text-body focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-body/30 sm:min-h-12 sm:text-sm"
            >
              Não quero o guia prático em vídeo, quero apenas meus mapas mentais
            </a>

            <p className="mt-1.5 text-[9px] font-semibold text-body/70 sm:mt-3 sm:text-xs">
              🔒 Pagamento seguro • Acesso imediato aos vídeos
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
