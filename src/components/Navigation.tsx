import { useState, useEffect, useCallback, useMemo } from 'react';
import { Menu, X, Home, User, Wrench, FolderOpen, Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';
import { useModal } from '../contexts/ModalContext';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useTranslation();
  const { isCoursesModalOpen } = useModal();

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const navItems = useMemo(() => [
    { name: t('nav.home'), href: '#inicio', icon: Home },
    { name: t('nav.about'), href: '#sobre', icon: User },
    { name: t('nav.skills'), href: '#habilidades', icon: Wrench },
    { name: t('nav.projects'), href: '#projetos', icon: FolderOpen },
    { name: t('nav.contact'), href: '#contato', icon: Mail },
  ], [t]);

    const scrollToSection = useCallback((href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const isMobile = window.innerWidth < 768;
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      if (isMobile || reduceMotion) {
        element.scrollIntoView({ behavior: 'auto' });
      } else {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    setIsMobileMenuOpen(false);
  }, []);

  // Hide navigation when courses modal is open
  if (isCoursesModalOpen) {
    return null;
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-500 ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-xl border-b border-border shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="font-playfair text-2xl font-bold gradient-text">
            PabloG
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-6">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className="flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors duration-300 font-medium"
                  >
                    <Icon className="w-4 h-4" />
                    {item.name}
                  </button>
                );
              })}
            </div>
            
            {/* Theme and Language Controls */}
            <div className="flex items-center gap-3 ml-6 pl-6 border-l border-border">
              <ThemeToggle />
              <LanguageToggle />
            </div>
          </div>

          {/* Mobile Controls */}
          <div className="md:hidden flex items-center gap-3">
            <ThemeToggle />
            <LanguageToggle />
            <button
              className="p-2 rounded-lg hover:bg-secondary transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden bg-background/98 backdrop-blur-xl border-b border-border shadow-lg">
              <div className="container-custom py-4">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.name}
                      onClick={() => scrollToSection(item.href)}
                      className="flex items-center gap-3 w-full text-left py-3 text-foreground/80 hover:text-primary transition-colors duration-300 font-medium"
                    >
                      <Icon className="w-4 h-4" />
                      {item.name}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
    </nav>
  );
};

export default Navigation;