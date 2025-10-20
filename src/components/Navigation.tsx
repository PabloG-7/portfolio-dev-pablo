import { useState, useEffect, useCallback, useMemo } from "react";
import { Menu, X, Home, User, Code, FolderKanban, Mail } from "lucide-react";
import { useTranslation } from "react-i18next";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";
import { useModal } from "../contexts/ModalContext";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#inicio");
  const [scrollProgress, setScrollProgress] = useState(0);
  const { t } = useTranslation();
  const { isCoursesModalOpen } = useModal();

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    setScrollProgress(scrollPercent);
    setIsScrolled(scrollY > 20);

    const sections = ["#inicio", "#sobre", "#habilidades", "#projects", "#contato"];
    const scrollPosition = window.scrollY + 100;

    for (const section of sections) {
      const element = document.querySelector(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        const offsetTop = rect.top + window.scrollY;
        const offsetHeight = element.clientHeight;

        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
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
     { name: t("nav.projects"), href: "#projects", icon: FolderKanban },
      { name: t("nav.skills"), href: "#habilidades", icon: Code },
      { name: t("nav.contact"), href: "#contato", icon: Mail },
    ],
    [t]
  );

  const scrollToSection = useCallback((href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsMobileMenuOpen(false);
    setActiveSection(href);
  }, []);

  if (isCoursesModalOpen) return null;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-500 ${
        isScrolled
          ? "backdrop-blur-lg bg-white/70 dark:bg-slate-900/70 shadow-md"
          : "bg-transparent"
      }`}
    >
      {/* 🔸 Barra de progresso na parte inferior */}
      <div className="absolute bottom-0 left-0 w-full h-[3px] bg-transparent">
        <div
          className="h-[3px] bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-[width] duration-150 ease-linear"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="container-custom relative">
        <div className="flex items-center justify-between h-14 lg:h-16">
          {/* Logo */}
          <button
            onClick={() => scrollToSection("#inicio")}
            className="flex items-center gap-2 group"
          >
            <div className="w-2 h-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full animate-pulse" />
            <span className="text-gray-900 dark:text-white font-semibold text-base lg:text-lg tracking-tight">
              Pablo<span className="text-amber-600">G.dev</span>
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            <div className="flex items-center gap-1 rounded-2xl px-2 py-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.href;

                return (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 relative
                      ${
                        isActive
                          ? "text-amber-700 dark:text-amber-300"
                          : "text-gray-600 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400"
                      }`}
                  >
                    <Icon
                      className={`w-4 h-4 transition-transform ${
                        isActive ? "scale-110" : "group-hover:scale-105"
                      }`}
                    />
                    <span>{item.name}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-amber-500 rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <LanguageToggle />
            </div>
          </div>

          {/* Mobile Controls */}
          <div className="lg:hidden flex items-center gap-2">
            <ThemeToggle />
            <LanguageToggle />
            <button
              className="p-2 rounded-xl bg-white/60 dark:bg-white/10 backdrop-blur-md hover:bg-white/80 dark:hover:bg-white/20 transition-all duration-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-gray-800 dark:text-gray-200" />
              ) : (
                <Menu className="w-5 h-5 text-gray-800 dark:text-gray-200" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-lg">
          <div className="container-custom py-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.href;

              return (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-300"
                      : "text-gray-700 dark:text-gray-300 hover:bg-amber-50 dark:hover:bg-amber-500/5"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
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
