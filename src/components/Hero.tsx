import { useState, useEffect } from 'react';
import { ArrowRight, Code2, Sparkles, Zap, Layers, Github, Linkedin, Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Hero = () => {
  const [mounted, setMounted] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="inicio"
      className="min-h-screen relative overflow-hidden"
    >
      {/* Futuristic Background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0"
          style={{
            background: 'var(--gradient-hero)',
          }}
        />
        <div 
          className="absolute inset-0"
          style={{
            background: 'var(--gradient-hero-overlay)',
          }}
        />
        
        {/* Geometric Grid */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(90deg, hsl(var(--primary) / 0.1) 1px, transparent 1px),
              linear-gradient(0deg, hsl(var(--primary) / 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-primary rounded-full animate-ping" style={{ animationDelay: '0s' }} />
        <div className="absolute top-40 right-20 w-1 h-1 bg-accent rounded-full animate-ping" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-32 left-1/4 w-3 h-3 bg-orange rounded-full animate-ping" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 right-1/3 w-1 h-1 bg-primary rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
      </div>

      {/* Main Content */}
      <div className="container-custom relative z-10 min-h-screen">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-20">
          
          {/* Left Column - Content */}
          <div className="space-y-8">
            
            {/* Greeting Badge */}
            <div
              className={`transition-all duration-1000 ${
                mounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              }`}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/30 border border-primary/20 backdrop-blur-sm">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">{t('hero.greeting')}</span>
              </div>
            </div>

            {/* Main Title */}
            <div
              className={`transition-all duration-1000 delay-200 ${
                mounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              }`}
            >
              <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="gradient-text">{t('hero.name')}</span>
              </h1>
            </div>

            {/* Subtitle */}
            <div
              className={`transition-all duration-1000 delay-400 ${
                mounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              }`}
            >
              <div className="flex items-center gap-3 text-xl md:text-2xl lg:text-3xl font-medium">
                <Code2 className="w-6 h-6 md:w-8 md:h-8 text-accent" />
                <span className="gradient-text-secondary">{t('hero.role')}</span>
              </div>
            </div>

            {/* Description */}
            <div
              className={`transition-all duration-1000 delay-600 ${
                mounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              }`}
            >
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
                {t('hero.description').split(t('hero.description_highlight1'))[0]}
                <span className="text-primary font-semibold">{t('hero.description_highlight1')}</span>
                {t('hero.description').split(t('hero.description_highlight1'))[1].split(t('hero.description_highlight2'))[0]}
                <span className="text-accent font-semibold">{t('hero.description_highlight2')}</span>
                {t('hero.description').split(t('hero.description_highlight2'))[1]}
              </p>
            </div>

            {/* CTA Buttons */}
            <div
              className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 delay-800 ${
                mounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              }`}
            >
              <button
                onClick={() => scrollToSection('#projetos')}
                className="group btn-futuristic text-white flex items-center justify-center gap-2 min-w-[200px]"
              >
                <span>{t('hero.cta_projects')}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => scrollToSection('#contato')}
                className="btn-ghost hover:scale-105 min-w-[200px] border-primary/30 hover:border-primary"
              >
                {t('hero.cta_contact')}
              </button>
            </div>

            {/* Social Links */}
            <div
              className={`flex gap-4 transition-all duration-1000 delay-1000 ${
                mounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              }`}
            >
              <a
                href="https://github.com/PabloG-7"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 rounded-xl bg-card/20 border border-primary/20 backdrop-blur-sm hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 hover:scale-110"
              >
                <Github className="w-5 h-5 group-hover:text-primary transition-colors" />
              </a>
              <a
                href="https://linkedin.com/in/pablo-gomes-dev"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 rounded-xl bg-card/20 border border-primary/20 backdrop-blur-sm hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 hover:scale-110"
              >
                <Linkedin className="w-5 h-5 group-hover:text-primary transition-colors" />
              </a>
              <a
                href="mailto:pablooliver853@gmail.com"
                className="group p-3 rounded-xl bg-card/20 border border-primary/20 backdrop-blur-sm hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 hover:scale-110"
              >
                <Mail className="w-5 h-5 group-hover:text-primary transition-colors" />
              </a>
            </div>
          </div>

          {/* Right Column - Visual Element */}
          <div
            className={`relative transition-all duration-1000 delay-300 ${
              mounted ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            <div className="relative flex items-center justify-center h-96 lg:h-[500px]">
              
              {/* Central Circle */}
              <div className="relative">
                <div className="w-48 h-48 lg:w-64 lg:h-64 rounded-full bg-gradient-to-r from-primary via-accent to-orange p-1 animate-pulse">
                  <div className="w-full h-full rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center">
                    <Code2 className="w-16 h-16 lg:w-20 lg:h-20 text-primary" />
                  </div>
                </div>
              </div>

              {/* Floating Tech Icons */}
              <div className="absolute top-8 left-8 p-4 rounded-2xl bg-card/30 border border-primary/20 backdrop-blur-sm animate-float">
                <Layers className="w-6 h-6 text-accent" />
              </div>
              
              <div className="absolute top-16 right-12 p-4 rounded-2xl bg-card/30 border border-accent/20 backdrop-blur-sm animate-float" style={{ animationDelay: '1s' }}>
                <Zap className="w-6 h-6 text-orange" />
              </div>
              
              <div className="absolute bottom-12 left-16 p-4 rounded-2xl bg-card/30 border border-orange/20 backdrop-blur-sm animate-float" style={{ animationDelay: '2s' }}>
                <Sparkles className="w-6 h-6 text-primary" />
              </div>

              {/* Geometric Shapes */}
              <div className="absolute top-1/4 -right-4 w-24 h-24 border-2 border-primary/30 rounded-lg rotate-45 animate-pulse" />
              <div className="absolute bottom-1/4 -left-4 w-16 h-16 border-2 border-accent/30 rounded-full animate-ping" />
              
              {/* Connecting Lines */}
              <div className="absolute inset-0 pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 400 400">
                  <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.3" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 50 100 Q 200 50 350 150"
                    stroke="url(#lineGradient)"
                    strokeWidth="2"
                    fill="none"
                    className="animate-pulse"
                  />
                  <path
                    d="M 50 300 Q 200 350 350 250"
                    stroke="url(#lineGradient)"
                    strokeWidth="2"
                    fill="none"
                    className="animate-pulse"
                    style={{ animationDelay: '1s' }}
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div
          className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-1200 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="flex flex-col items-center gap-2">
            <div className="text-xs text-muted-foreground font-medium">{t('hero.scroll_indicator')}</div>
            <div className="w-6 h-10 border-2 border-primary/40 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-bounce" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;