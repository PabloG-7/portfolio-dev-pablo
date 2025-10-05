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
  const { t } = useTranslation();
  const { isCoursesModalOpen } = useModal();

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 20);
    
    const sections = ["#inicio", "#sobre", "#habilidades", "#projetos", "#contato"];
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
      { name: t("nav.skills"), href: "#habilidades", icon: Code },
      { name: t("nav.projects"), href: "#projetos", icon: FolderKanban },
      { name: t("nav.contact"), href: "#contato", icon: Mail },
    ],
    [t]
  );

  const scrollToSection = useCallback((href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    setIsMobileMenuOpen(false);
    setActiveSection(href);
  }, []);

  if (isCoursesModalOpen) {
    return null;
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-500 ${
        isScrolled
          ? "bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-gray-200/60 dark:border-white/10 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-14 lg:h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 lg:gap-3 group">
            <div className="relative">
              <div className="w-2 h-2 lg:w-3 lg:h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
            </div>
            <span className="text-gray-900 dark:text-white font-bold text-base lg:text-lg tracking-tight">
              Pablo.dev
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-4 lg:gap-6">
            <div className="flex items-center gap-1 bg-white/70 dark:bg-white/5 backdrop-blur-md rounded-xl p-1 lg:p-2 border border-gray-200/60 dark:border-white/10 shadow-sm">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.href;

                return (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className={`relative flex items-center gap-2 px-3 lg:px-4 py-2 rounded-lg transition-all duration-300 text-sm font-medium ${
                      isActive
                        ? "text-gray-900 dark:text-white bg-white dark:bg-white/10 border border-gray-200/80 dark:border-white/20 shadow-sm"
                        : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50/50 dark:hover:bg-white/5"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                    {isActive && (
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3 lg:w-4 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Controls */}
            <div className="flex items-center gap-1 lg:gap-2">
              <div className="bg-white/70 dark:bg-white/5 backdrop-blur-md rounded-lg p-1.5 lg:p-2 border border-gray-200/60 dark:border-white/10 shadow-sm">
                <ThemeToggle />
              </div>
              <div className="bg-white/70 dark:bg-white/5 backdrop-blur-md rounded-lg p-1.5 lg:p-2 border border-gray-200/60 dark:border-white/10 shadow-sm">
                <LanguageToggle />
              </div>
            </div>
          </div>

          {/* Mobile Controls */}
          <div className="lg:hidden flex items-center gap-2">
            <div className="bg-white/70 dark:bg-white/5 backdrop-blur-md rounded-lg p-1.5 border border-gray-200/60 dark:border-white/10">
              <ThemeToggle />
            </div>
            <div className="bg-white/70 dark:bg-white/5 backdrop-blur-md rounded-lg p-1.5 border border-gray-200/60 dark:border-white/10">
              <LanguageToggle />
            </div>
            <button
              className="p-1.5 rounded-lg bg-white/70 dark:bg-white/5 backdrop-blur-md border border-gray-200/60 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/10 transition-all duration-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-4 h-4 text-gray-700 dark:text-white" />
              ) : (
                <Menu className="w-4 h-4 text-gray-700 dark:text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white/98 dark:bg-slate-900/98 backdrop-blur-xl border-b border-gray-200/60 dark:border-white/10 shadow-lg">
          <div className="container-custom py-4">
            <div className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.href;

                return (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className={`flex items-center gap-3 w-full text-left p-3 rounded-xl transition-all duration-300 font-medium border ${
                      isActive
                        ? "text-gray-900 dark:text-white bg-white dark:bg-white/10 border-gray-200/80 dark:border-white/20 shadow-sm"
                        : "text-gray-600 dark:text-gray-300 border-transparent hover:bg-gray-50/50 dark:hover:bg-white/5"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="flex-1 text-sm">{item.name}</span>
                    {isActive && (
                      <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
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