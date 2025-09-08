import { useEffect, useState, useMemo, useCallback, memo } from 'react';
import { ArrowRight, Github, Linkedin, Mail, Sparkles } from 'lucide-react';
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
    { text: t('hero.skills.database'), color: 'text-purple-400', dotColor: 'bg-purple-400', bgColor: 'bg-purple-400/10', borderColor: 'border-purple-400/30' },
    { text: t('hero.skills.tools'), color: 'text-orange-400', dotColor: 'bg-orange-400', bgColor: 'bg-orange-400/10', borderColor: 'border-orange-400/30' },
    { text: t('hero.skills.fullstack'), color: 'text-foreground', dotColor: 'bg-foreground', bgColor: 'bg-primary/10', borderColor: 'border-primary/30' },
    { text: t('hero.skills.frontend'), color: 'text-blue-400', dotColor: 'bg-blue-400', bgColor: 'bg-blue-400/10', borderColor: 'border-blue-400/30' },
    { text: t('hero.skills.backend'), color: 'text-green-400', dotColor: 'bg-green-400', bgColor: 'bg-green-400/10', borderColor: 'border-green-400/30' }
  ], [t]);

  const [currentSkill, setCurrentSkill] = useState(0);
  const [isChanging, setIsChanging] = useState(false);
  
  useEffect(() => {
    const timer = addTimer(setInterval(() => {
      setIsChanging(true);
      setTimeout(() => {
        setCurrentSkill((prev) => (prev + 1) % rotatingSkills.length);
        setIsChanging(false);
      }, 500);
    }, 3000));
    
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
      {/* Enhanced Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0" style={{ background: 'var(--gradient-hero)' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background" />
        
        {/* Animated gradient overlay */}
        <div className="absolute top-0 left-0 w-full h-full opacity-30 animate-gradient-xy bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20" />
        
        {/* Enhanced grid with animation */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'linear-gradient(to right, hsl(var(--primary)/0.1) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--primary)/0.1) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            maskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
          }}
        />
        
        {/* Floating particles */}
        <div className="absolute inset-0 opacity-30">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-primary"
              style={{
                width: Math.random() * 4 + 1 + 'px',
                height: Math.random() * 4 + 1 + 'px',
                top: Math.random() * 100 + '%',
                left: Math.random() * 100 + '%',
                animation: `float ${Math.random() * 15 + 10}s infinite ease-in-out`,
                animationDelay: Math.random() * 5 + 's',
                opacity: Math.random() * 0.5 + 0.1,
              }}
            />
          ))}
        </div>
      </div>

      <header className="container-custom min-h-screen flex items-center justify-center pt-16 sm:pt-20 lg:pt-12 xl:pt-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Content */}
          <article
            className={`space-y-8 text-center lg:text-left transition-all duration-1000 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
           

            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-7xl xl:text-8xl font-bold leading-tight text-balance font-space">
              <span className="gradient-text animate-text-shimmer bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary">
                {t('hero.name')}
              </span>
            </h1>

            <p className="text-lg sm:text-xl md:text-xl lg:text-xl text-muted-foreground/90 max-w-2xl leading-relaxed">
              {t('hero.description')}
            </p>

            {/* Enhanced Skills Display */}
            <div className="flex justify-center lg:justify-start pt-2">
              <div className={`group relative rounded-2xl border backdrop-blur-md px-8 py-4 shadow-lg transition-all duration-500 hover:shadow-xl hover:scale-[1.02] ${rotatingSkills[currentSkill].bgColor} ${rotatingSkills[currentSkill].borderColor}`}>
                <div className="relative flex items-center gap-4">
                  {/* Dynamic status indicator */}
                  <span
                    className={`inline-block w-3 h-3 rounded-full animate-pulse ${rotatingSkills[currentSkill].dotColor}`}
                    aria-hidden="true"
                    style={{ animationDuration: '2s' }}
                  />
                  
                  {/* Text with smooth transitions */}
                  <span 
                    key={currentSkill}
                    aria-live="polite" 
                    className={`text-lg sm:text-xl font-medium transition-all duration-300 ${rotatingSkills[currentSkill].color} ${isChanging ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}
                  >
                    {rotatingSkills[currentSkill].text}
                  </span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <button
                onClick={() => scrollTo('#projetos')}
                className="btn-futuristic text-white flex items-center justify-center gap-3 min-w-[200px] group/btn py-3"
                aria-label="Ver Projetos"
              >
                <span>{t('hero.cta_projects')}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
              </button>
              <button
                onClick={() => scrollTo('#contato')}
                className="btn-ghost min-w-[200px] py-3 border-border/50 hover:border-primary/30 transition-all"
                aria-label={t('hero.cta_contact')}
              >
                {t('hero.cta_contact')}
              </button>
            </div>

            {/* Socials */}
            <div className="flex gap-4 pt-6 justify-center lg:justify-start">
              <a
                href="https://github.com/PabloG-7"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 rounded-xl bg-card/40 border border-border/60 backdrop-blur-sm hover:border-primary/50 hover-glow hover-lift transition-all duration-300 hover:scale-105"
                aria-label="GitHub de Pablo Gomes"
                title="GitHub de Pablo Gomes"
              >
                <Github className="w-6 h-6 lg:w-5 lg:h-5 group-hover:text-primary transition-colors" />
              </a>
              <a
                href="https://linkedin.com/in/pablo-gomes-dev"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 rounded-xl bg-card/40 border border-border/60 backdrop-blur-sm hover:border-accent/50 hover-glow hover-lift transition-all duration-300 hover:scale-105"
                aria-label="LinkedIn de Pablo Gomes"
                title="LinkedIn de Pablo Gomes"
              >
                <Linkedin className="w-6 h-6 lg:w-5 lg:h-5 group-hover:text-accent transition-colors" />
              </a>
              <a
                href="mailto:pablooliver853@gmail.com"
                className="group p-3 rounded-xl bg-card/40 border border-border/60 backdrop-blur-sm hover:border-primary/50 hover-glow hover-lift transition-all duration-300 hover:scale-105"
                aria-label="Enviar e-mail para Pablo Gomes"
                title="Enviar e-mail para Pablo Gomes"
              >
                <Mail className="w-6 h-6 lg:w-5 lg:h-5 group-hover:text-primary transition-colors" />
              </a>
            </div>
          </article>

          {/* Right - Enhanced Visual */}
          <aside
            className={`hidden lg:block relative w-full max-w-[320px] mx-auto lg:mx-0 transition-all duration-700 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            aria-label="Foto de perfil"
          >
            <div className="relative mx-auto w-80 h-80 md:w-[380px] md:h-[380px] lg:w-80 lg:h-80 xl:w-[400px] xl:h-[400px]">
              {/* Glowing border effect */}
              <div className="absolute -inset-2 bg-gradient-to-r from-primary to-accent rounded-full opacity-70 blur-lg animate-pulse-slow"></div>
              
              {/* Main image container */}
              <div className="relative w-full h-full rounded-full p-1 bg-gradient-to-br from-primary to-accent shadow-2xl animate-musical-beat">
                <div className="w-full h-full rounded-full bg-background overflow-hidden border-4 border-background">
                  <LazyImage
                    src="/lovable-uploads/274ab653-078c-4baf-9423-852622909aa4.png"
                    alt="Pablo Gomes - Desenvolvedor Full Stack"
                    className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700 hover:scale-105"
                    loading="eager"
                    fetchPriority="high"
                  />
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full opacity-80 animate-float-rotate">
                <div className="absolute inset-1 rounded-full bg-background/80"></div>
              </div>
              <div className="absolute -bottom-4 -left-2 w-5 h-5 bg-accent rounded-full opacity-60 animate-float-reverse">
                <div className="absolute inset-1 rounded-full bg-background/80"></div>
              </div>
              
              {/* Decorative corner elements */}
              <div className="absolute top-6 right-6 w-2 h-2 bg-primary rounded-full opacity-80 animate-ping" style={{animationDuration: '3s'}}></div>
              <div className="absolute bottom-8 left-8 w-1.5 h-1.5 bg-accent rounded-full opacity-60 animate-ping" style={{animationDuration: '4s'}}></div>
            </div>
          </aside>
        </div>
      </header>
    </section>
  );
});

HeroRevamp.displayName = 'HeroRevamp';

export default HeroRevamp;