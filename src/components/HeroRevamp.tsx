import { useEffect, useState, useMemo, useCallback, memo } from 'react';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useMemoryCleanup } from '@/hooks/usePerformanceOptimization';
import LazyImage from '@/components/LazyImage';

const HeroRevamp = memo(() => {
  const [mounted, setMounted] = useState(false);
  const { t } = useTranslation();
  const { addTimer } = useMemoryCleanup();

  useEffect(() => {
    setMounted(true);
  }, []);

  const rotatingSkills = useMemo(() => [
    { text: t('hero.skills.database'), color: 'text-purple-400', dotColor: 'bg-purple-400', bgColor: 'bg-purple-400/5' },
    { text: t('hero.skills.tools'), color: 'text-orange-400', dotColor: 'bg-orange-400', bgColor: 'bg-orange-400/5' },
    { text: t('hero.skills.fullstack'), color: 'text-foreground', dotColor: 'bg-foreground', bgColor: 'bg-primary/5' },
    { text: t('hero.skills.frontend'), color: 'text-blue-400', dotColor: 'bg-blue-400', bgColor: 'bg-blue-400/5' },
    { text: t('hero.skills.backend'), color: 'text-green-400', dotColor: 'bg-green-400', bgColor: 'bg-green-400/5' }
  ], [t]);
  const [currentSkill, setCurrentSkill] = useState(0);
  
  useEffect(() => {
    const timer = addTimer(setInterval(() => {
      setCurrentSkill((prev) => (prev + 1) % rotatingSkills.length);
    }, 4000)); // Increased interval to reduce re-renders
    
    return () => clearInterval(timer);
  }, [rotatingSkills.length, addTimer]);

  const scrollTo = useCallback((hash: string) => {
    const el = document.querySelector(hash);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <section id="inicio" className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0" style={{ background: 'var(--gradient-hero)' }} />
        <div className="absolute inset-0" style={{ background: 'var(--gradient-hero-overlay)' }} />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'linear-gradient(to right, hsl(var(--primary)/0.07) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--primary)/0.07) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      <header className="container-custom min-h-screen flex items-center justify-center pt-16 sm:pt-20 lg:pt-12 xl:pt-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Content */}
          <article
            className={`space-y-8 text-center lg:text-left transition-all duration-700 animate-fade-in ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl font-bold leading-tight text-balance font-space">
              <span className="gradient-text">{t('hero.name')}</span>
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl lg:text-2xl text-muted-foreground max-w-2xl">
              {t('hero.description')}
            </p>

            {/* Optimized Skills Display */}
            <div className="flex justify-center lg:justify-start">
              <div className={`group relative rounded-2xl border border-border/50 backdrop-blur-sm px-8 py-4 shadow-lg transition-shadow duration-300 hover:shadow-xl hover:border-primary/40 ${rotatingSkills[currentSkill].bgColor}`}>
                <div className="relative flex items-center gap-4">
                  {/* Optimized status indicator */}
                  <span
                    className={`inline-block w-3 h-3 rounded-full transition-colors duration-300 ${rotatingSkills[currentSkill].dotColor}`}
                    aria-hidden="true"
                  />
                  
                  {/* Optimized text transitions */}
                  <span 
                    aria-live="polite" 
                    className={`text-lg sm:text-xl font-semibold transition-colors duration-300 ${rotatingSkills[currentSkill].color}`}
                  >
                    {rotatingSkills[currentSkill].text}
                  </span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={() => scrollTo('#projetos')}
                className="btn-futuristic text-white flex items-center justify-center gap-2 min-w-[200px]"
                aria-label="Ver Projetos"
              >
                {t('hero.cta_projects')}
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollTo('#contato')}
                className="btn-ghost min-w-[200px]"
                aria-label={t('hero.cta_contact')}
              >
                {t('hero.cta_contact')}
              </button>
            </div>

            {/* Socials */}
            <div className="flex gap-4 pt-2 justify-center lg:justify-start">
              <a
                href="https://github.com/PabloG-7"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 rounded-xl bg-card/40 border border-border backdrop-blur-sm hover:border-primary/50 hover-glow hover-lift"
                aria-label="GitHub de Pablo Gomes"
                title="GitHub de Pablo Gomes"
              >
                <Github className="w-6 h-6 lg:w-5 lg:h-5 group-hover:text-primary transition-colors" />
              </a>
              <a
                href="https://linkedin.com/in/pablo-gomes-dev"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 rounded-xl bg-card/40 border border-border backdrop-blur-sm hover:border-accent/50 hover-glow hover-lift"
                aria-label="LinkedIn de Pablo Gomes"
                title="LinkedIn de Pablo Gomes"
              >
                <Linkedin className="w-6 h-6 lg:w-5 lg:h-5 group-hover:text-accent transition-colors" />
              </a>
              <a
                href="mailto:pablooliver853@gmail.com"
                className="group p-3 rounded-xl bg-card/40 border border-border backdrop-blur-sm hover:border-primary/50 hover-glow hover-lift"
                aria-label="Enviar e-mail para Pablo Gomes"
                title="Enviar e-mail para Pablo Gomes"
              >
                <Mail className="w-6 h-6 lg:w-5 lg:h-5 group-hover:text-primary transition-colors" />
              </a>
            </div>
          </article>

          {/* Right - Clean Visual */}
          <aside
            className={`hidden lg:block relative w-full max-w-[360px] mx-auto lg:mx-0 transition-all duration-500 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            aria-label="Foto de perfil"
          >
            <div className="relative mx-auto w-96 h-96 md:w-[420px] md:h-[420px] lg:w-96 lg:h-96 xl:w-[450px] xl:h-[450px]">
              {/* Optimized clean border */}
              <div className="relative w-full h-full rounded-full p-0.5 bg-gradient-to-br from-primary to-accent shadow-xl">
                <div className="w-full h-full rounded-full bg-background overflow-hidden">
                 <LazyImage
                    src="/lovable-uploads/274ab653-078c-4baf-9423-852622909aa4.png"
                    alt="Pablo Gomes - Desenvolvedor Full Stack"
                    className="w-full h-full object-cover"
                    loading="eager"
                    fetchPriority="high"
                  />
                </div>
              </div>
              
              {/* Subtle corner accents */}
              <div className="absolute top-4 right-4 w-2 h-2 bg-primary rounded-full opacity-60"></div>
              <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-accent rounded-full opacity-40"></div>
            </div>
          </aside>
        </div>

      </header>
    </section>
  );
});

HeroRevamp.displayName = 'HeroRevamp';

export default HeroRevamp;
