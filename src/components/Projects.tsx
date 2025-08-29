import { useState, memo, useMemo, useCallback } from 'react';
import { ExternalLink, Github, Eye, ArrowRight, Gamepad2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import LazyImage from './LazyImage';
import GamePreview from './GamePreview';

const Projects = ({ onDemoStateChange }: { onDemoStateChange?: (isOpen: boolean) => void }) => {
  const [gamePreview, setGamePreview] = useState<{ isOpen: boolean; gameData?: any }>({ isOpen: false });
  const { t } = useTranslation();
  const { elementRef, isIntersecting: isVisible } = useIntersectionObserver({ 
    threshold: 0.1, // Menor threshold para dispositivos móveis
    triggerOnce: true,
    rootMargin: '50px' // Margem maior para trigger antecipado
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
      className="section-padding bg-secondary/20"
    >
      <div className="container-custom">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-100 sm:opacity-0'
          }`}
        >
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-4">
            {t('projects.title').split(' ')[0]} <span className="gradient-text">{t('projects.title').split(' ')[1]}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('projects.subtitle')}
          </p>
        </div>


        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className={`group transition-all duration-1000 ${
                isVisible 
                  ? 'animate-scale-in opacity-100' 
                  : 'opacity-100 sm:opacity-0' // Sempre visível no mobile
              }`}
              style={{ animationDelay: `${index * 200 + 600}ms` }}
            >
              <div className={`card-premium overflow-hidden h-full relative ${
                project.featured 
                  ? 'bg-gradient-to-br from-gold/10 to-yellow-400/10 border-2 border-transparent bg-clip-padding before:absolute before:inset-0 before:z-[-1] before:m-[-2px] before:rounded-[inherit] before:bg-gradient-to-r before:from-gold before:via-yellow-400 before:to-gold before:animate-spin-slow after:absolute after:inset-0 after:bg-gradient-to-br after:from-transparent after:via-gold/5 after:to-transparent after:pointer-events-none hover:shadow-2xl hover:shadow-gold/20 transition-all duration-700' 
                  : ''
              }`}>
                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-3 left-3 z-[2] px-3 py-2 bg-gradient-to-r from-gold to-yellow-400 text-background text-sm font-bold rounded-lg shadow-xl border border-gold/30 backdrop-blur-sm">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 bg-blue-600 rounded-full animate-ping"></span>
                      {t('projects.featured')}
                    </span>
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
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="flex space-x-4">
                      {project.isGame ? (
                        <button
                          onClick={() => openGamePreview(project)}
                          className="p-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors hover-lift"
                        >
                          <Gamepad2 className="w-5 h-5" />
                        </button>
                      ) : (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors hover-lift"
                        >
                          <Eye className="w-5 h-5" />
                        </a>
                      )}
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-secondary text-secondary-foreground rounded-full hover:bg-secondary/90 transition-colors hover-lift"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    </div>
                  </div>

                </div>

                {/* Project Content */}
                <div className="p-8">
                  <h3 className="text-2xl font-playfair font-semibold mb-3 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-foreground/80 mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-sm bg-border text-foreground rounded-full font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-4">
                      {project.isGame ? (
                        <button
                          onClick={() => openGamePreview(project)}
                          className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors font-medium"
                        >
                          <Gamepad2 className="w-4 h-4" />
                          <span>{t('projects.play_demo')}</span>
                        </button>
                      ) : (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors font-medium"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>{t('projects.view_project')}</span>
                        </a>
                      )}
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors font-medium"
                      >
                        <Github className="w-4 h-4" />
                        <span>{t('projects.code')}</span>
                      </a>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
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

        {/* View More */}
        <div
          className={`text-center mt-12 transition-all duration-1000 delay-1000 ${
            isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-100 sm:opacity-0'
          }`}
        >
          <a
            href="https://github.com/PabloG-7"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-futuristic text-white min-w-[220px]"
          >
            {t('projects.view_all')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default memo(Projects);