import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: `Termos de Uso | ${SITE.name}`,
  description: `Termos de uso do ${SITE.name}.`,
  robots: { index: true, follow: true },
};

export default function TermosPage() {
  return (
    <main className="min-h-screen bg-primary text-ink px-4 py-12">
      <article className="max-w-3xl mx-auto prose prose-slate">
        <Link href="/" className="text-cta-darker font-bold no-underline hover:underline">
          ← Voltar
        </Link>
        <h1 className="text-3xl font-extrabold mt-6 mb-4">Termos de Uso</h1>
        <p className="text-body leading-relaxed">
          Ao adquirir o {SITE.name}, você concorda em utilizar o material apenas para fins pessoais de
          aprendizado. É proibida a reprodução, redistribuição ou revenda do conteúdo sem autorização
          expressa, nos termos da Lei nº 9.610/98.
        </p>
        <p className="text-body leading-relaxed mt-4">
          O acesso é digital e vitalício após a confirmação do pagamento. Em caso de dúvidas, utilize os
          canais de suporte informados no e-mail de entrega.
        </p>
      </article>
    </main>
  );
}
