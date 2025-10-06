import { useEffect, useState, useMemo, useCallback, memo } from 'react';
import { ArrowRight, Github, Linkedin, Mail, Code, Zap, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const HeroRevamp = memo(() => {
  const [mounted, setMounted] = useState(false);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Efeito Typewriter
  useEffect(() => {
    const texts = ['React & TypeScript', 'Experiência do Usuário', 'UI/UX Designer'];
    
    const tick = () => {
      const i = loopNum % texts.length;
      const fullText = texts[i];

      setCurrentText(
        isDeleting 
          ? fullText.substring(0, currentText.length - 1)
          : fullText.substring(0, currentText.length + 1)
      );

      if (!isDeleting && currentText === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(tick, isDeleting ? 50 : 100);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, loopNum]);

  const scrollTo = useCallback((hash: string) => {
    const el = document.querySelector(hash);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <section id="inicio" className="relative min-h-screen overflow-hidden bg-slate-50 dark:bg-slate-900">
      {/* Background com Rede de Pontos */}
<div className="absolute inset-0 overflow-hidden">
  <div className="absolute inset-0 bg-slate-50 dark:bg-slate-900"></div>
  
  {/* Rede de pontos conectados */}
  <div className="absolute inset-0 opacity-30">
    <div className="absolute top-20 left-20 w-1 h-1 bg-blue-400 rounded-full"></div>
    <div className="absolute top-32 right-32 w-1 h-1 bg-purple-400 rounded-full"></div>
    <div className="absolute bottom-28 left-40 w-1 h-1 bg-blue-400 rounded-full"></div>
    <div className="absolute bottom-40 right-28 w-1 h-1 bg-purple-400 rounded-full"></div>
    
    {/* Linhas de conexão */}
    <div className="absolute top-20 left-20 w-24 h-px bg-gradient-to-r from-blue-400/30 to-transparent rotate-45"></div>
    <div className="absolute top-32 right-32 w-20 h-px bg-gradient-to-l from-purple-400/30 to-transparent -rotate-45"></div>
  </div>
  
  {/* Bolha principal sutil */}
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-200/10 dark:bg-blue-500/5 rounded-full blur-2xl"></div>
</div>

      <header className="container-custom relative min-h-screen flex items-center justify-center pt-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full max-w-7xl mx-auto">
          {/* Left - Content */}
          <article className="space-y-6 lg:space-y-8 text-center lg:text-left">
            {/* Main Title */}
            <div className="space-y-4 lg:space-y-6">
              <h1 className="text-6xl xs:text-6xl sm:text-8xl md:text-8xl lg:text-7xl xl:text-8xl font-bold leading-tight tracking-tight">
                <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-white dark:via-slate-100 dark:to-white bg-clip-text text-transparent">
                  {t('hero.name')}
                </span>
              </h1>
              
              {/* Subtítulo com detalhes mínimos */}
              <div className="flex justify-center lg:justify-start">
                <div className="animate-fade-in-up flex items-center gap-3 group">
                  <div className="w-2 h-2 bg-blue-100 rounded-full animate-pulse"></div>
                  <p className="text-2xl sm:text-3xl md:text-3xl text-blue-600 dark:text-green-400 font-light tracking-wide">
                    Desenvolvedor Front-end
                  </p>
                  <Sparkles className="w-5 h-5 text-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
              
              {/* Typewriter Effect - Minimalist */}
              <div className="flex items-center justify-center lg:justify-start pt-2">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800/50 dark:to-slate-900/50 backdrop-blur-md rounded-xl px-5 py-3 border border-blue-200/50 dark:border-slate-700 transition-all duration-300">
                  <p className="text-lg sm:text-xl text-slate-700 dark:text-slate-300 font-medium">
                    <span className="text-purple-500 dark:text-purple-500 font-semibold">
                      {currentText}
                      <span className="ml-0.5 animate-pulse">|</span>
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 justify-center lg:justify-start pt-4 lg:pt-6">
              <button
                onClick={() => scrollTo('#projetos')}
                className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 lg:px-8 py-3 lg:py-4 rounded-xl font-semibold transition-all duration-500 hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105 flex items-center justify-center gap-3 w-full sm:w-auto relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 text-sm lg:text-base">{t('hero.cta_projects')}</span>
                <ArrowRight className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => scrollTo('#contato')}
                className="group bg-white/60 dark:bg-white/5 backdrop-blur-md border border-slate-300 dark:border-white/10 text-slate-700 dark:text-white px-6 lg:px-8 py-3 lg:py-4 rounded-xl font-semibold transition-all duration-500 hover:shadow-lg hover:border-blue-500/30 dark:hover:border-blue-400/30 hover:scale-105 w-full sm:w-auto"
              >
                <span className="text-sm lg:text-base">{t('hero.cta_contact')}</span>
              </button>
            </div>

            {/* Socials */}
            <div className="flex gap-3 lg:gap-4 pt-6 lg:pt-8 justify-center lg:justify-start">
              {[
                { 
                  icon: Github, 
                  href: "https://github.com/PabloG-7",
                  color: "text-slate-700 dark:text-slate-300",
                  hover: "hover:bg-slate-200 dark:hover:bg-slate-700"
                },
                { 
                  icon: Linkedin, 
                  href: "https://linkedin.com/in/pablo-gomes-dev", 
                  color: "text-blue-600 dark:text-blue-400",
                  hover: "hover:bg-blue-500/10"
                },
                { 
                  icon: Mail, 
                  href: "mailto:pablooliver853@gmail.com",
                  color: "text-green-600 dark:text-green-400",
                  hover: "hover:bg-green-500/10"
                }
              ].map((social, index) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 lg:p-4 bg-white/60 dark:bg-white/5 backdrop-blur-md border border-slate-200/60 dark:border-white/10 rounded-xl transition-all duration-500 hover:shadow-md hover:scale-110 ${social.color} ${social.hover}`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <social.icon className="w-5 h-5 lg:w-6 lg:h-6" />
                </a>
              ))}
            </div>
          </article>

          {/* Right - Visual */}
          <aside className="hidden lg:block relative mt-8 lg:mt-0">
            <div className="relative mx-auto w-64 h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 2xl:w-[420px] 2xl:h-[420px]">
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-blue-500/10 rounded-2xl animate-bounce-soft flex items-center justify-center">
                <Code className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-10 h-10 bg-purple-500/10 rounded-2xl animate-bounce-soft-delayed flex items-center justify-center">
                <Zap className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              
              <div className="relative w-full h-full rounded-2xl overflow-hidden border-4 border-white/20 dark:border-slate-700/30 shadow-2xl group">
                <img
                  src="/lovable-uploads/274ab653-078c-4baf-9423-852622909aa4.png"
                  alt="Pablo Gomes - Desenvolvedor Front-End"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>
          </aside>
        </div>
      </header>
    </section>
  );
});

export default HeroRevamp;