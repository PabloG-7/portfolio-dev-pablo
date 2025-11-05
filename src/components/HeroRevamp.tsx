import { useEffect, useState, useCallback, memo } from 'react';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
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

  // Efeito Typewriter simplificado
  useEffect(() => {
    const texts = ['React & TypeScript', 'UI/UX Designer', 'Front-end Developer', 'AI + Code + Creativity'];
    
    const tick = () => {
      const i = loopNum % texts.length;
      const fullText = texts[i];

      setCurrentText(
        isDeleting 
          ? fullText.substring(0, currentText.length - 1)
          : fullText.substring(0, currentText.length + 1)
      );

      if (!isDeleting && currentText === fullText) {
        setTimeout(() => setIsDeleting(true), 1000);
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
    <section id="inicio" className="relative min-h-screen overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50/30 to-yellow-50/20 dark:from-slate-900 dark:via-orange-950/20 dark:to-amber-950/10">
      {/* Background com padrão sutil */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.15)_1px,transparent_0)] bg-[size:32px_32px] dark:bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.1)_1px,transparent_0)]"></div>
      </div>

      {/* Partículas flutuantes */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-amber-500/20 rounded-full animate-float-slow"
            style={{
              left: `${20 + i * 10}%`,
              top: `${30 + i * 8}%`,
              animationDelay: `${i * 2}s`,
              animationDuration: '6s'
            }}
          />
        ))}
      </div>

      <header className="container-custom relative min-h-screen flex items-center justify-center pt-20 lg:pt-0">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full max-w-6xl mx-auto">
          {/* Left - Content */}
          <article className="space-y-6 lg:space-y-8 text-center lg:text-left">
            <div className="space-y-6 lg:space-y-6 mt-8 lg:mt-9">
              
              {/* NOME PRINCIPAL COM EFEITO MELHORADO */}
              <h1 className="relative text-6xl sm:text-7xl md:text-8xl lg:text-7xl xl:text-7x1 font-extrabold leading-tight tracking-tight group transition-all duration-500">
                <span className="bg-gradient-to-r from-slate-800 via-orange-600 to-slate-800 dark:from-white dark:via-amber-200 dark:to-white bg-[length:200%_auto] animate-gradient-x bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(255,166,0,0.15)] transition-all duration-700 group-hover:drop-shadow-[0_0_35px_rgba(255,180,80,0.25)]">
                  {t('hero.name')}
                </span>
                {/* linha decorativa sutil */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-[2px] bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 rounded-full opacity-70 group-hover:opacity-100 transition-opacity duration-700"></div>
              </h1>

             {/* Subtítulo aprimorado */}
<div className="flex justify-center lg:justify-start items-center gap-4">
  <div className="h-px w-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full hidden sm:block"></div>
  <p className="text-2xl sm:text-3xl md:text-1xl font-medium bg-gradient-to-r from-amber-600 via-orange-500 to-amber-600 dark:from-amber-400 dark:via-orange-400 dark:to-amber-400 bg-[length:200%_auto] animate-gradient-x bg-clip-text text-transparent tracking-wide">
    {t('hero.role')}
  </p>
  <div className="h-px w-8 bg-gradient-to-l from-amber-500 to-orange-500 rounded-full hidden sm:block"></div>
</div>


              {/* Typewriter */}
              <div className="flex justify-center lg:justify-start pt-2">
                <div className="border-l-2 border-amber-500 pl-3 lg:pl-4">
                  <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400">
                    {t('hero.description')}{' '}
                    <span className="text-amber-600 dark:text-amber-400 font-semibold">
                      {currentText}
                      <span className="ml-0.5 animate-pulse">|</span>
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Descrição */}
            <div className="max-w-xl mx-auto lg:mx-0">
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-base sm:text-lg font-medium">
                {t('hero.description_highlight1')} e {t('hero.description_highlight2')}.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start pt-4">
              <button
                onClick={() => scrollTo('#projects')}
                className="group bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                <span>{t('hero.cta_projects')}</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              
              <button
                onClick={() => scrollTo('#contato')}
                className="group bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 px-6 sm:px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:border-amber-500 dark:hover:border-amber-400 w-full sm:w-auto hover:bg-white dark:hover:bg-slate-800 hover:shadow-lg hover:scale-105"
              >
                {t('hero.cta_contact')}
              </button>
            </div>

            {/* Socials */}
            <div className="flex gap-3 sm:gap-4 pt-6 justify-center lg:justify-start">
              {[
                { icon: Github, href: "https://github.com/PabloG-7", name: "GitHub", color: "bg-slate-800 hover:bg-slate-900 border-slate-700 text-white" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/pablogomess/", name: "LinkedIn", color: "bg-blue-600 hover:bg-blue-700 border-blue-500 text-white" },
                { icon: Mail, href: "mailto:pablooliver853@gmail.com", name: "Email", color: "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 border-amber-400 text-white" }
              ].map((social, index) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 transition-all duration-300 hover:scale-110 rounded-lg border ${social.color} shadow-lg hover:shadow-xl backdrop-blur-sm`}
                  aria-label={social.name}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </article>

          {/* Right - Visual */}
          <aside className="hidden lg:block relative mt-8 lg:mt-0">
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 mx-auto">
              <div className="relative w-full h-full group">
                <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-red-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
                <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative w-full h-full rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 animate-gentle-float transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl">
                  <img
                    src="/lovable-uploads/274ab653-078c-4baf-9423-852622909aa4.png"
                    alt="Pablo Gomes - Desenvolvedor Front-End"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </header>
    </section>
  );
});

export default HeroRevamp;
