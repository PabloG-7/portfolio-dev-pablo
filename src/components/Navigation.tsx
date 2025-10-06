import { useState, useEffect, useCallback, useMemo } from "react";
import { Menu, X, Home, User, Code, FolderKanban, Mail, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";
import { useModal } from "../contexts/ModalContext";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#inicio");
  const [isHovered, setIsHovered] = useState<string | null>(null);
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
      { name: t("nav.home"), href: "#inicio", icon: Home, color: "from-blue-500 to-cyan-500" },
      { name: t("nav.about"), href: "#sobre", icon: User, color: "from-purple-500 to-pink-500" },
      { name: t("nav.skills"), href: "#habilidades", icon: Code, color: "from-green-500 to-emerald-500" },
      { name: t("nav.projects"), href: "#projetos", icon: FolderKanban, color: "from-orange-500 to-red-500" },
      { name: t("nav.contact"), href: "#contato", icon: Mail, color: "from-indigo-500 to-purple-500" },
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
          ? "bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-gray-200/60 dark:border-white/10 shadow-lg shadow-black/5"
          : "bg-transparent"
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-14 lg:h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 lg:gap-3 group cursor-pointer" onClick={() => scrollToSection("#inicio")}>
            <div className="relative">
              <div className="w-2 h-2 lg:w-3 lg:h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
              <div className="absolute -top-1 -right-1 w-1 h-1 bg-green-500 rounded-full animate-ping"></div>
            </div>
            <span className="text-gray-900 dark:text-white font-bold text-base lg:text-lg tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              PabloG.dev
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-4 lg:gap-6">
            <div className="flex items-center gap-1 bg-white/80 dark:bg-white/5 backdrop-blur-md rounded-2xl p-1.5 lg:p-2 border border-gray-200/60 dark:border-white/10 shadow-lg shadow-black/5">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.href;
                const isHoveredItem = isHovered === item.href;

                return (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    onMouseEnter={() => setIsHovered(item.href)}
                    onMouseLeave={() => setIsHovered(null)}
                    className={`relative flex items-center gap-2 px-4 lg:px-5 py-2.5 rounded-xl transition-all duration-500 text-sm font-medium group/nav-item ${
                      isActive
                        ? `text-white bg-gradient-to-r ${item.color} shadow-lg scale-105`
                        : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/10"
                    }`}
                  >
                    <Icon className={`w-4 h-4 transition-transform duration-300 ${
                      isActive || isHoveredItem ? "scale-110" : ""
                    }`} />
                    <span className="relative">
                      {item.name}
                      {(isActive || isHoveredItem) && (
                        <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-current opacity-20 rounded-full"></div>
                      )}
                    </span>
                    
                    {/* Efeito de brilho no hover */}
                    {(isActive || isHoveredItem) && (
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-xl"></div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2 lg:gap-3">
              <div className="bg-white/80 dark:bg-white/5 backdrop-blur-md rounded-2xl p-2 border border-gray-200/60 dark:border-white/10 shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10 transition-all duration-300 hover:scale-105">
                <ThemeToggle />
              </div>
              <div className="bg-white/80 dark:bg-white/5 backdrop-blur-md rounded-2xl p-2 border border-gray-200/60 dark:border-white/10 shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10 transition-all duration-300 hover:scale-105">
                <LanguageToggle />
              </div>
            </div>
          </div>

          {/* Mobile Controls */}
          <div className="lg:hidden flex items-center gap-2">
            <div className="bg-white/80 dark:bg-white/5 backdrop-blur-md rounded-xl p-1.5 border border-gray-200/60 dark:border-white/10 shadow-lg">
              <ThemeToggle />
            </div>
            <div className="bg-white/80 dark:bg-white/5 backdrop-blur-md rounded-xl p-1.5 border border-gray-200/60 dark:border-white/10 shadow-lg">
              <LanguageToggle />
            </div>
            <button
              className="p-2 rounded-xl bg-white/80 dark:bg-white/5 backdrop-blur-md border border-gray-200/60 dark:border-white/10 hover:bg-white dark:hover:bg-white/10 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
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
        <div className="lg:hidden bg-white/98 dark:bg-slate-900/98 backdrop-blur-xl border-b border-gray-200/60 dark:border-white/10 shadow-2xl">
          <div className="container-custom py-4">
            <div className="space-y-2">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = activeSection === item.href;

                return (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className={`flex items-center gap-4 w-full text-left p-4 rounded-2xl transition-all duration-500 font-medium border-2 group/mobile-item ${
                      isActive
                        ? `text-white bg-gradient-to-r ${item.color} border-transparent shadow-lg scale-105`
                        : "text-gray-600 dark:text-gray-300 border-gray-200/60 dark:border-white/10 bg-white/50 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 hover:scale-102"
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <Icon className={`w-5 h-5 transition-transform duration-300 ${
                      isActive ? "scale-110" : "group-hover/mobile-item:scale-110"
                    }`} />
                    <span className="flex-1 text-base font-semibold">{item.name}</span>
                    {isActive && (
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
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