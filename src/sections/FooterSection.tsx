import { copy } from "@/lib/content";
import { SITE } from "@/lib/site";

export function FooterSection() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink py-10 sm:py-12 px-4 text-center">
      <div className="max-w-4xl mx-auto text-white/70 text-xs sm:text-sm space-y-4">
        <h2 className="font-black text-white text-base sm:text-lg mb-1">{SITE.name}</h2>
        <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-white/85 font-semibold">
          <span>🔒 {copy.footer.secure}</span>
          <span className="hidden sm:inline" aria-hidden="true">
            •
          </span>
          <span>💳 {copy.footer.payment}</span>
          <span className="hidden sm:inline" aria-hidden="true">
            •
          </span>
          <span>⚡ {copy.footer.access}</span>
        </p>

        <div className="pt-6 mt-6 border-t border-white/15 text-[10px] sm:text-xs text-white/55 leading-relaxed space-y-4">
          <p className="text-balance px-2">{copy.footer.metaDisclaimer}</p>
          <p className="text-balance px-2">{copy.footer.copyrightDisclaimer}</p>
          <div className="flex justify-center gap-3 mt-2 whitespace-nowrap font-medium text-white/70">
            <a href="/termos" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta rounded">
              {copy.footer.terms}
            </a>
            <span aria-hidden="true">|</span>
            <a href="/privacidade" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta rounded">
              {copy.footer.privacy}
            </a>
          </div>
          <p className="mt-3 font-bold text-white/70">
            © {year} {SITE.name}. {copy.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
