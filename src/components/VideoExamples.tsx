"use client";

import { useRef } from "react";

const EXAMPLES = [
  { src: "/videos/upsell/aprender.mp4", label: "Aprender" },
  { src: "/videos/upsell/libras.mp4", label: "Libras" },
] as const;

type VideoExamplesProps = {
  checkoutUrl: string;
};

export function VideoExamples({ checkoutUrl }: VideoExamplesProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  function openExamples() {
    const dialog = dialogRef.current;
    if (!dialog) return;

    dialog.showModal();
    dialog.querySelectorAll("video").forEach((video) => {
      video.currentTime = 0;
      void video.play();
    });
  }

  function pauseVideos() {
    dialogRef.current?.querySelectorAll("video").forEach((video) => video.pause());
  }

  return (
    <>
      <button
        type="button"
        onClick={openExamples}
        className="btn-shine group mx-auto mt-3 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#173da6] to-[#207c7b] px-5 py-2.5 text-xs font-extrabold uppercase tracking-wide text-white shadow-[0_10px_25px_rgba(23,61,166,0.25)] transition-transform hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#207c7b]/30 sm:text-sm lg:mx-0"
      >
        <span
          className="flex size-6 items-center justify-center rounded-full bg-white text-[#173da6] transition-transform group-hover:scale-110"
          aria-hidden="true"
        >
          ▶
        </span>
        Ver exemplo de vídeo
      </button>

      <dialog
        ref={dialogRef}
        onClose={pauseVideos}
        className="m-auto w-[calc(100%-1.5rem)] max-w-3xl overflow-hidden rounded-[1.75rem] bg-[#eaf8f7] p-0 text-ink shadow-2xl backdrop:bg-ink/85 backdrop:backdrop-blur-sm"
      >
        <div className="max-h-[calc(100svh-1.5rem)] overflow-y-auto">
          <div className="sticky top-0 z-10 flex items-center justify-between bg-[#173da6] px-4 py-3 text-white shadow-md">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/70">
                Veja na prática
              </p>
              <h2 className="text-sm font-extrabold sm:text-lg">Exemplos dos vídeos</h2>
            </div>
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              className="flex size-10 items-center justify-center rounded-full bg-white/15 text-xl font-bold transition-colors hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Fechar exemplos e voltar para a oferta"
            >
              ×
            </button>
          </div>

          <div className="grid gap-3 p-3 sm:grid-cols-2 sm:gap-4 sm:p-5">
            {EXAMPLES.map((example) => (
              <figure
                key={example.src}
                className="overflow-hidden rounded-2xl border border-[#207c7b]/15 bg-white p-2 shadow-sm"
              >
                <video
                  src={example.src}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  disablePictureInPicture
                  className="aspect-[13/10] w-full rounded-xl bg-ink object-cover"
                />
                <figcaption className="px-2 pb-1 pt-2 text-center text-sm font-extrabold text-ink">
                  Sinal: <span className="text-[#207c7b]">{example.label}</span>
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="sticky bottom-0 border-t border-[#207c7b]/10 bg-white/95 p-3 shadow-[0_-8px_24px_rgba(13,27,61,0.1)] backdrop-blur sm:p-4">
            <a
              href={checkoutUrl}
              className="btn-shine inline-flex min-h-12 w-full items-center justify-center rounded-full bg-cta px-4 py-3 text-center text-xs font-extrabold uppercase text-ink shadow-[0_10px_24px_rgba(37,211,102,0.35)] hover:bg-cta-dark focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-cta/40 sm:text-sm"
            >
              Quero os 400 vídeos em câmera lenta!
            </a>
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              className="mt-2 w-full py-1 text-xs font-bold text-body/70 underline underline-offset-2 hover:text-body"
            >
              Voltar para a oferta
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
