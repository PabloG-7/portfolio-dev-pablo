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
      image: '/lovable-uploads/05c35415-0879-4b34-ab19-0bbed343b952.png',
      liveUrl: 'https://jogo-memoria-gold.vercel.app/',
      githubUrl: 'https://github.com/PabloG-7/jogo-memoria',
      isGame: true,
      featured: true
    },
    {
      title: 'INABALÁVEL',
      description: t('projects.descriptions.inabalavel'),
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'GSAP', 'AOS', 'Particles.js'],
      image: '/lovable-uploads/1a2da3a0-16da-4847-8dbe-4a98da30e7d5.png',
      liveUrl: 'https://pablog-7.github.io/inabalavel-heroi-vilao/',
      githubUrl: 'https://github.com/PabloG-7/inabalavel-heroi-vilao',
    },
    {
      title: 'POKÉDEX',
      description: t('projects.descriptions.pokedex'),
      technologies: ['React', 'PokéAPI', 'Axios', 'Tailwind CSS', 'Vercel'],
      image: '/lovable-uploads/212c7878-aab0-4645-a8b8-56a0ca5aec79.png',
      liveUrl: 'https://pokedex-nine-vert.vercel.app/',
      githubUrl: 'https://github.com/PabloG-7/pokedex',
    },
    {
      title: 'TASKFORGE',
      description: t('projects.descriptions.taskforge'),
      technologies: ['React', 'TypeScript', 'Vite', 'Gerenciador de Tarefas'],
      image: '/lovable-uploads/68ffd3ce-ceb4-45e4-86ee-4e7af6f5765f.png',
      liveUrl: 'https://gerenciador-de-tarefas-wine.vercel.app/',
      githubUrl: 'https://github.com/PabloG-7/taskforge',
    },
    {
      title: 'LUCKPET',
      description: t('projects.descriptions.luckpet'),
      technologies: ['JavaScript', 'CSS3', 'HTML5', 'E-commerce'],
      image: '/lovable-uploads/f7c53062-678c-46c3-92f0-4ed4e54f39bf.png',
      liveUrl: 'https://projeto-luckpet.vercel.app/',
      githubUrl: 'https://github.com/PabloG-7/ecommerce-luckpet',
    },
    {
      title: 'KUSHI',
      description: t('projects.descriptions.kushi'),
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'E-commerce', 'Moda'],
      image: '/lovable-uploads/09550d0a-3ec4-431c-8684-b73320f1e3ea.png',
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
          className={`text-center mb-16 transition-all duration-1000 relative ${
            isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-100 sm:opacity-0'
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 rounded-3xl blur-3xl -z-10"></div>
          <div className="relative py-8">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6">
              {t('projects.title').split(' ')[0]} <span className="gradient-text bg-gradient-to-r from-primary via-accent to-primary bg-clip-text animate-gradient-x">{t('projects.title').split(' ')[1]}</span>
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-primary via-accent to-primary mx-auto mb-6 rounded-full"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {t('projects.subtitle')}
            </p>
          </div>
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
              <div className={`card-premium overflow-hidden h-full relative group/card transform transition-all duration-500 hover:scale-105 hover:rotate-1 ${project.featured ? 'ring-2 ring-gold/50 shadow-lg shadow-gold/20 before:absolute before:inset-0 before:bg-gradient-to-r before:from-gold/10 before:to-accent/10 before:rounded-xl before:-z-10 before:blur-xl' : 'hover:shadow-2xl hover:shadow-primary/20'}`}>
                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-3 left-3 z-[1] px-3 py-2 bg-gradient-to-r from-gold to-accent text-gold-foreground text-xs sm:text-sm font-semibold rounded-full shadow-lg shadow-gold/30 animate-pulse border border-gold/20">
                    ✨ {t('projects.featured')}
                  </div>
                )}
                
                {/* Decorative Corner Elements */}
                <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-br from-primary/20 to-transparent rounded-bl-full opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 w-6 h-6 bg-gradient-to-tr from-accent/20 to-transparent rounded-tr-full opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"></div>

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
                <div className="p-8 relative">
                  <div className="absolute top-0 left-8 w-12 h-1 bg-gradient-to-r from-primary to-accent rounded-full"></div>
                  <div className="pt-4">
                    <h3 className="text-2xl font-playfair font-semibold mb-3 group-hover/card:text-primary transition-all duration-300 group-hover/card:transform group-hover/card:scale-105">
                      {project.title}
                    </h3>
                    <p className="text-foreground/80 mb-4 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-sm bg-gradient-to-r from-border/50 to-border text-foreground rounded-full font-medium border border-primary/10 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 hover:scale-105"
                        style={{ 
                          animationDelay: `${index * 100}ms`,
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between px-8 pb-8">
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
            className="btn-ghost hover-lift"
          >
            {t('projects.view_all')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default memo(Projects);