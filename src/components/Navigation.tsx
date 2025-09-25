import { useState, useEffect, useCallback, useMemo } from "react";
import { Menu, X, Home, User, Wrench, FolderOpen, Mail } from "lucide-react";
import { useTranslation } from "react-i18next";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";
import { useModal } from "../contexts/ModalContext";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#inicio");
  const { t } = useTranslation();
  const { isCoursesModalOpen } = useModal();

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 20);

    // Update active section based on scroll position
    const sections = ["#inicio", "#sobre", "#habilidades", "#projetos", "#contato"];
    const scrollPosition = window.scrollY + 100;

    for (const section of sections) {
      const element = document.querySelector(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        const offsetTop = rect.top + window.scrollY;
        const offsetHeight = element.clientHeight;

        if (
          scrollPosition >= offsetTop &&
          scrollPosition < offsetTop + offsetHeight
        ) {
          setActiveSection(section);
          break;
        }
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const navItems = useMemo(
    () => [
      { name: t("nav.home"), href: "#inicio", icon: Home },
      { name: t("nav.about"), href: "#sobre", icon: User },
      { name: t("nav.skills"), href: "#habilidades", icon: Wrench },
      { name: t("nav.projects"), href: "#projetos", icon: FolderOpen },
      { name: t("nav.contact"), href: "#contato", icon: Mail },
    ],
    [t]
  );

  const scrollToSection = useCallback((href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const isMobile = window.innerWidth < 768;
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      element.scrollIntoView({
        behavior: isMobile || reduceMotion ? "auto" : "smooth",
        block: "start",
      });
    }
    setIsMobileMenuOpen(false);
    setActiveSection(href);
  }, []);

  // Hide navigation when courses modal is open
  if (isCoursesModalOpen) {
    return null;
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-500 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-xl border-b border-border/50 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full border-2 border-background animate-pulse"></div>
            </div>
            <span className="font-playfair text-lg md:text-xl font-bold gradient-text truncate max-w-[120px] sm:max-w-[160px]">
              Front-end
            </span>
          </div>

          {/* Desktop Navigation (só aparece a partir de lg:) */}
          <div className="hidden lg:flex items-center flex-wrap gap-2 xl:gap-4">
            <div className="flex flex-wrap items-center gap-1 bg-background/80 backdrop-blur-sm rounded-xl p-1 border border-border/50">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.href;

                return (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className={`relative flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 text-sm lg:text-base font-medium ${
                      isActive
                        ? "text-primary bg-primary/10 shadow-sm"
                        : "text-foreground/80 hover:text-primary hover:bg-primary/5"
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="truncate">{item.name}</span>
                    {isActive && (
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-4 h-0.5 bg-primary rounded-full animate-pulse"></div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Theme and Language Controls */}
            <div className="flex items-center gap-2 ml-2 pl-2 border-l border-border/50">
              <div className="bg-background/80 backdrop-blur-sm rounded-lg p-1 border border-border/50">
                <ThemeToggle />
              </div>
              <div className="bg-background/80 backdrop-blur-sm rounded-lg p-1 border border-border/50">
                <LanguageToggle />
              </div>
            </div>
          </div>

          {/* Mobile Controls */}
          <div className="lg:hidden flex items-center gap-2">
            <div className="bg-background/80 backdrop-blur-sm rounded-lg p-1 border border-border/50">
              <ThemeToggle />
            </div>
            <div className="bg-background/80 backdrop-blur-sm rounded-lg p-1 border border-border/50">
              <LanguageToggle />
            </div>
            <button
              className="p-2 rounded-lg bg-background/80 backdrop-blur-sm border border-border/50 hover:bg-primary/10 hover:text-primary transition-all duration-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-background/98 backdrop-blur-xl border-b border-border/50 shadow-lg animate-slide-in-down">
          <div className="container-custom py-4">
            <div className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.href;

                return (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className={`flex items-center gap-3 w-full text-left p-3 rounded-xl transition-all duration-300 font-medium ${
                      isActive
                        ? "text-primary bg-primary/10 border border-primary/20"
                        : "text-foreground/80 hover:text-primary hover:bg-primary/5"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="flex-1">{item.name}</span>
                    {isActive && (
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
