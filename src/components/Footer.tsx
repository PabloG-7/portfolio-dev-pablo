import { ArrowUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  const scrollToTop = () => {
    // Use requestAnimationFrame for better mobile performance
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      window.scrollTo({ top: 0, behavior: 'auto' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-br from-background via-background to-muted/20 border-t border-border/50">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-primary/5 pointer-events-none" />
      
      <div className="container-custom py-16 relative z-10">
        <div className="text-center mb-12">
          <h3 className="font-playfair text-3xl font-bold gradient-text mb-4">
            Pablo Gomes
          </h3>
          <p className="text-muted-foreground text-lg">
            {t('footer.description')}
          </p>
        </div>

        {/* Copyright and Back to Top */}
        <div className="pt-8 border-t border-border/50">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm text-center sm:text-left">
              © {currentYear} Pablo Gomes. {t('footer.copyright')}
            </p>
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-card hover:bg-card/80 border border-border/50 hover:border-accent/30 transition-all duration-300 hover-lift"
            >
              <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                {t('footer.back_to_top')}
              </span>
              <ArrowUp className="w-4 h-4 text-accent" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;