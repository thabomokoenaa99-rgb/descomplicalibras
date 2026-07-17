import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: `Política de Privacidade | ${SITE.name}`,
  description: `Política de privacidade do ${SITE.name}.`,
  robots: { index: true, follow: true },
};

export default function PrivacidadePage() {
  return (
    <main className="min-h-screen bg-primary text-ink px-4 py-12">
      <article className="max-w-3xl mx-auto">
        <Link href="/" className="text-cta-darker font-bold hover:underline">
          ← Voltar
        </Link>
        <h1 className="text-3xl font-extrabold mt-6 mb-4">Política de Privacidade</h1>
        <p className="text-body leading-relaxed">
          O {SITE.name} coleta dados necessários para processar compras, entregar o acesso digital e
          prestar suporte. Não vendemos seus dados pessoais a terceiros.
        </p>
        <p className="text-body leading-relaxed mt-4">
          Informações de pagamento são processadas pela Hoopay. Dados de cartão não são armazenados
          em nossos servidores após o processamento. Para consulta de CEP no checkout, utilizamos o
          serviço ViaCEP (viacep.com.br), enviando apenas o CEP informado por você.
        </p>
        <p className="text-body leading-relaxed mt-4">
          Coletamos nome, e-mail, CPF, telefone e dados necessários para emissão de cobrança e
          entrega do produto digital. Logs de sistema são minimizados e mascarados (sem dados
          sensíveis de pagamento).
        </p>
      </article>
    </main>
  );
}
