import { ArrowUp, Coffee } from "lucide-react";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    const isMobile = window.innerWidth < 768;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: isMobile || reduceMotion ? "auto" : "smooth" });
  };

  return (
    <footer className="bg-gradient-to-br from-amber-50 via-orange-50/30 to-yellow-50/10 dark:from-slate-950 dark:via-amber-950/10 dark:to-orange-950/5 border-t border-amber-200/60 dark:border-amber-500/20">
      <div className="max-w-6xl mx-auto px-4 py-10 text-center">
        {/* Nome e descrição */}
        <h3 className="text-2xl font-semibold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
          Pablo Gomes
        </h3>

        <p className="text-slate-600 dark:text-slate-400 text-base mt-2 max-w-md mx-auto">
          {t("footer.description")}
        </p>

        {/* Ícone */}
        <div className="flex items-center justify-center gap-2 mt-4 text-sm text-slate-500 dark:text-slate-500">
          <Coffee className="w-4 h-4 text-amber-600" />
          
        </div>

        {/* Linha divisória */}
        <div className="w-full h-px bg-amber-200/60 dark:bg-amber-500/20 my-6" />

        {/* Rodapé inferior */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            © {currentYear} Pablo Gomes. {t("footer.copyright")}
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/80 dark:bg-slate-800/80 border border-amber-200/60 dark:border-amber-500/20 hover:border-amber-400 dark:hover:border-amber-400/30 transition-all"
          >
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
              {t("footer.back_to_top")}
            </span>
            <ArrowUp className="w-4 h-4 text-amber-500" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
