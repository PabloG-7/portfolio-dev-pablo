import { useState, memo, useMemo, useCallback } from 'react';
import { ExternalLink, Github, Eye, ArrowRight, Gamepad2, Sparkles, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import LazyImage from './LazyImage';
import GamePreview from './GamePreview';

const Projects = ({ onDemoStateChange }: { onDemoStateChange?: (isOpen: boolean) => void }) => {
  const [gamePreview, setGamePreview] = useState<{ isOpen: boolean; gameData?: any }>({ isOpen: false });
  const { t } = useTranslation();
  const { elementRef, isIntersecting: isVisible } = useIntersectionObserver({ 
    threshold: 0.1,
    triggerOnce: true,
    rootMargin: '50px'
  });

  const projects = useMemo(() => [
    {
      title: 'NEON MEMORY',
      description: t('projects.descriptions.neon_memory'),
      technologies: ['TypeScript', 'React', 'Supabase', 'Vite', 'Tailwind CSS', 'Vercel'],
      image: '/lovable-uploads/neon-linkedin.png',
      liveUrl: 'https://jogo-memoria-gold.vercel.app/',
      githubUrl: 'https://github.com/PabloG-7/jogo-memoria',
      isGame: true,
      featured: true
    },
    {
      title: 'INABALÁVEL',
      description: t('projects.descriptions.inabalavel'),
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'GSAP', 'AOS', 'Particles.js'],
      image: '/lovable-uploads/inabalavel-linkedin.png',
      liveUrl: 'https://pablog-7.github.io/inabalavel-heroi-vilao/',
      githubUrl: 'https://github.com/PabloG-7/inabalavel-heroi-vilao',
    },
    {
      title: 'POKÉDEX',
      description: t('projects.descriptions.pokedex'),
      technologies: ['React', 'PokéAPI', 'Axios', 'Tailwind CSS', 'Vercel'],
      image: '/lovable-uploads/pokedex-linkedin.png',
      liveUrl: 'https://pokedex-nine-vert.vercel.app/',
      githubUrl: 'https://github.com/PabloG-7/pokedex',
    },
    {
      title: 'TASKFORGE',
      description: t('projects.descriptions.taskforge'),
      technologies: ['React', 'TypeScript', 'Vite', 'Gerenciador de Tarefas'],
      image: '/lovable-uploads/taskforge-linkedin.png',
      liveUrl: 'https://gerenciador-de-tarefas-wine.vercel.app/',
      githubUrl: 'https://github.com/PabloG-7/taskforge',
    },
    {
      title: 'LUCKPET',
      description: t('projects.descriptions.luckpet'),
      technologies: ['JavaScript', 'CSS3', 'Supabase', 'Node.js', 'HTML5', 'E-commerce'],
      image: '/lovable-uploads/luckpet-linkedin.png',
      liveUrl: 'https://projeto-luckpet.vercel.app/',
      githubUrl: 'https://github.com/PabloG-7/ecommerce-luckpet',
    },
    {
      title: 'KUSHI',
      description: t('projects.descriptions.kushi'),
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'E-commerce', 'Moda'],
      image: '/lovable-uploads/kushi-linkedin.png',
      liveUrl: 'https://pablog-7.github.io/ecommerce-kushi/',
      githubUrl: 'https://github.com/PabloG-7/ecommerce-kushi',
    },
  ], [t]);

  const openGamePreview = useCallback((project: any) => {
    setGamePreview({ isOpen: true, gameData: project });
    onDemoStateChange?.(true);
  }, [onDemoStateChange]);

  return (
    <section
      id="projetos"
      ref={elementRef as React.RefObject<HTMLDivElement>}
      className="section-padding relative overflow-hidden"
    >
      {/* Enhanced Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/3 -right-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary)/0.15) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        {/* Enhanced Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-100 sm:opacity-0'
          }`}
        >
         
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
            {t('projects.title').split(' ')[0]}{' '}
            <span className="text-transparent bg-gradient-to-r from-primary to-accent bg-clip-text">
              {t('projects.title').split(' ')[1]}
            </span>
          </h2>
          <p className="text-xl text-muted-foreground/80 max-w-3xl mx-auto leading-relaxed">
            {t('projects.subtitle')}
          </p>
        </div>

        {/* Enhanced Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className={`group transition-all duration-1000 ${
                isVisible 
                  ? 'animate-scale-in opacity-100' 
                  : 'opacity-100 sm:opacity-0'
              }`}
              style={{ animationDelay: `${index * 200 + 600}ms` }}
            >
              <div className={`relative overflow-hidden h-full rounded-2xl border border-border/50 bg-card/70 backdrop-blur-sm transition-all duration-500 hover:shadow-xl hover:border-primary/30 hover:scale-[1.02] ${
                project.featured 
                  ? 'bg-gradient-to-br from-primary/5 via-gold/5 to-accent/5 border-2 border-transparent bg-clip-padding before:absolute before:inset-0 before:z-[-1] before:m-[-2px] before:rounded-[inherit] before:bg-gradient-to-r before:from-gold before:via-yellow-400 before:to-gold before:animate-spin-slow' 
                  : ''
              }`}>
                
                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-4 left-4 z-[2] px-3 py-2 bg-gradient-to-r from-gold to-yellow-400 text-background text-sm font-bold rounded-lg shadow-xl border border-gold/30 backdrop-blur-sm flex items-center gap-2">
                    <Star className="w-4 h-4 fill-current" />
                    <span>{t('projects.featured')}</span>
                  </div>
                )}

                {/* Project Image */}
                <div className="relative overflow-hidden aspect-[4/3] sm:aspect-[16/10]">
                  <LazyImage
                    src={project.image}
                    alt={project.title}
                    loading="eager"
                    fetchPriority={index < 3 ? "high" : "low"}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Overlay Actions */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-background/30 backdrop-blur-sm">
                    <div className="flex space-x-4">
                      {project.isGame ? (
                        <button
                          onClick={() => openGamePreview(project)}
                          className="p-3.5 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-full hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 hover:scale-110"
                          aria-label="Jogar demo"
                        >
                          <Gamepad2 className="w-5 h-5" />
                        </button>
                      ) : (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3.5 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-full hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 hover:scale-110"
                          aria-label="Ver projeto"
                        >
                          <Eye className="w-5 h-5" />
                        </a>
                      )}
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3.5 bg-gradient-to-r from-secondary to-secondary/80 text-secondary-foreground rounded-full hover:shadow-lg hover:shadow-secondary/30 transition-all duration-300 hover:scale-110"
                        aria-label="Ver código no GitHub"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-foreground/80 mb-4 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 text-xs bg-primary/10 text-primary rounded-full font-medium border border-primary/20"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-2.5 py-1 text-xs bg-border/50 text-foreground/70 rounded-full font-medium">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-2 border-t border-border/40">
                    <div className="flex space-x-4">
                      {project.isGame ? (
                        <button
                          onClick={() => openGamePreview(project)}
                          className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors font-medium group/action"
                        >
                          <Gamepad2 className="w-4 h-4 transition-transform duration-300 group-hover/action:scale-110" />
                          <span className="text-sm">{t('projects.play_demo')}</span>
                        </button>
                      ) : (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors font-medium group/action"
                        >
                          <ExternalLink className="w-4 h-4 transition-transform duration-300 group-hover/action:scale-110" />
                          <span className="text-sm">{t('projects.view_project')}</span>
                        </a>
                      )}
                    </div>
                    <div className="flex space-x-3">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors font-medium group/action"
                      >
                        <Github className="w-4 h-4 transition-transform duration-300 group-hover/action:scale-110" />
                      </a>
                      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Game Preview Modal */}
        {gamePreview.isOpen && gamePreview.gameData && (
          <GamePreview
            isOpen={gamePreview.isOpen}
            onClose={() => {
              setGamePreview({ isOpen: false });
              onDemoStateChange?.(false);
            }}
            gameUrl={gamePreview.gameData.liveUrl}
            githubUrl={gamePreview.gameData.githubUrl}
            title={gamePreview.gameData.title}
          />
        )}

        {/* Enhanced View More */}
        <div
          className={`text-center mt-16 transition-all duration-1000 delay-1000 ${
            isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-100 sm:opacity-0'
          }`}
        >
          <a
            href="https://github.com/PabloG-7"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 hover:gap-4 hover:scale-105"
          >
            <span>{t('projects.view_all')}</span>
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default memo(Projects);