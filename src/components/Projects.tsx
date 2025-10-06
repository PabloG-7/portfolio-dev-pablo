import { useState, memo, useMemo, useCallback } from 'react';
import { ExternalLink, Github, Eye, ArrowRight, Gamepad2, Sparkles, Star, Code, Palette, Zap, Clock, Building2, Stethoscope, Shirt, Database, GamepadIcon, ShoppingCart, ListTodo } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import LazyImage from './LazyImage';
import GamePreview from './GamePreview';

const Projects = ({ onDemoStateChange }: { onDemoStateChange?: (isOpen: boolean) => void }) => {
  const [gamePreview, setGamePreview] = useState<{ isOpen: boolean; gameData?: any }>({ isOpen: false });
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const { t } = useTranslation();
  const { elementRef, isIntersecting: isVisible } = useIntersectionObserver({ 
    threshold: 0.1,
    triggerOnce: true,
    rootMargin: '50px'
  });

  const projects = useMemo(() => [
    {
      title: 'NEON MEMORY',
      description: 'Jogo da memória moderno com tema neon, multiplayer em tempo real e modos de jogo variados. Desenvolvido com tecnologias modernas para melhor performance e experiência imersiva.',
      technologies: ['TypeScript', 'React', 'Supabase', 'Vite', 'Tailwind CSS', 'Web Audio API', 'PostgreSQL', 'PWA'],
      image: '/lovable-uploads/neon-linkedin.png',
      liveUrl: 'https://jogo-memoria-gold.vercel.app/',
      githubUrl: 'https://github.com/PabloG-7/jogo-memoria',
      isGame: true,
      featured: true,
      icon: GamepadIcon,
      featuredStyle: "bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20 dark:border-purple-400/30 shadow-lg shadow-purple-500/10 dark:shadow-purple-400/10",
      animation: "animate-neon-glow",
      features: [
        'Multiplayer em tempo real com sistema de salas',
        '3 modos singleplayer: Normal, Velocidade e Difícil',
        'Design neon moderno com animações fluidas',
        'Sistema de ranking online em tempo real',
        'Interface totalmente responsiva e PWA',
        'Efeitos sonoros imersivos com Web Audio API',
        'Sincronização automática entre jogadores'
      ],
      personal: true,
      category: 'Jogo da Memória'
    },
    {
      title: 'DR. BRUNO RIBEIRO',
      description: 'Site institucional para fisioterapeuta especializado. Design moderno com foco em conversão, formulário de contato integrado e otimizado para SEO.',
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'GSAP', 'FormSubmit', 'Responsive Design'],
      image: '/lovable-uploads/drbruno-portfolio.png',
      liveUrl: '#',
      githubUrl: '#',
      icon: Stethoscope,
      featuredStyle: "bg-gradient-to-br from-blue-500/10 to-teal-500/10 border-blue-500/20 dark:border-blue-400/30",
      animation: "",
      status: 'Em desenvolvimento',
      freelance: true,
      client: 'Dr. Bruno Ribeiro - Fisioterapeuta',
      features: [
        'Site institucional responsivo',
        'Formulário de contato funcional com FormSubmit',
        'Design moderno e profissional para área da saúde',
        'Otimizado para SEO e conversão',
        'Animações suaves com GSAP'
      ]
    },
    {
      title: 'HC STORE',
      description: 'E-commerce completo para influenciador digital. Catálogo de produtos integrado com WhatsApp, design moderno e focado em experiência do usuário.',
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'E-commerce', 'WhatsApp Integration', 'UI/UX Design'],
      image: '/lovable-uploads/hebert-portfolio.png',
      liveUrl: '#',
      githubUrl: '#',
      icon: Shirt,
      featuredStyle: "bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20 dark:border-purple-400/30",
      animation: "",
      status: 'Em desenvolvimento',
      freelance: true,
      client: 'Hebert Criston - Influenciador Digital',
      features: [
        'Catálogo de produtos dinâmico',
        'Integração direta com WhatsApp para vendas',
        'Design moderno e totalmente responsivo',
        'Focado em conversão e experiência do usuário',
        'Performance otimizada para mobile'
      ]
    },
    {
      title: 'TASKFORGE',
      description: 'Aplicação de gerenciamento de tarefas com interface intuitiva e funcionalidades avançadas. Organize suas atividades com eficiência e praticidade.',
      technologies: ['React', 'TypeScript', 'Vite', 'Local Storage', 'Tailwind CSS'],
      image: '/lovable-uploads/taskforge-linkedin.png',
      liveUrl: 'https://gerenciador-de-tarefas-wine.vercel.app/',
      githubUrl: 'https://github.com/PabloG-7/taskforge',
      icon: ListTodo,
      featuredStyle: "bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20 dark:border-green-400/30",
      animation: "",
      features: [
        'Criação, edição e exclusão de tarefas',
        'Organização por categorias e prioridades',
        'Persistência de dados no Local Storage',
        'Interface moderna e responsiva',
        'Filtros e busca avançada'
      ],
      personal: true,
      category: 'Produtividade'
    },
    {
      title: 'LUCKPET',
      description: 'E-commerce completo para petshop com catálogo de produtos, carrinho de compras e integração com sistema de pagamentos. Foco em usabilidade e conversão.',
      technologies: ['JavaScript', 'CSS3', 'Supabase', 'HTML5', 'E-commerce'],
      image: '/lovable-uploads/luckpet-linkedin.png',
      liveUrl: 'https://projeto-luckpet.vercel.app/',
      githubUrl: 'https://github.com/PabloG-7/ecommerce-luckpet',
      icon: ShoppingCart,
      featuredStyle: "bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/20 dark:border-orange-400/30",
      animation: "",
      features: [
        'Catálogo completo de produtos para pets',
        'Carrinho de compras funcional',
        'Integração com Supabase para dados',
        'Design responsivo e amigável',
        'Sistema de categorias e filtros'
      ],
      personal: true,
      category: 'E-commerce'
    },
    {
      title: 'POKÉDEX',
      description: 'Aplicação web interativa que consome a PokéAPI para exibir informações detalhadas sobre Pokémon. Interface moderna com busca e filtros avançados.',
      technologies: ['React', 'PokéAPI', 'Axios', 'Tailwind CSS', 'Vercel'],
      image: '/lovable-uploads/pokedex-linkedin.png',
      liveUrl: 'https://pokedex-nine-vert.vercel.app/',
      githubUrl: 'https://github.com/PabloG-7/pokedex',
      icon: Zap,
      featuredStyle: "bg-gradient-to-br from-yellow-500/10 to-red-500/10 border-yellow-500/20 dark:border-yellow-400/30",
      animation: "",
      features: [
        'Consumo da PokéAPI com Axios',
        'Busca e filtros por tipo, região e nome',
        'Design responsivo com tema Pokémon',
        'Detalhes completos de cada Pokémon',
        'Performance otimizada para mobile'
      ],
      personal: true,
      category: 'API Integration'
    },
  ], [t]);

  const openGamePreview = useCallback((project: any) => {
    setGamePreview({ isOpen: true, gameData: project });
    onDemoStateChange?.(true);
  }, [onDemoStateChange]);

  return (
    <section
      id="projetos"
      className="section-padding relative overflow-hidden bg-gray-50 dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-800 dark:to-slate-900"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/40 dark:bg-blue-500/10 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200/40 dark:bg-purple-500/10 rounded-full blur-3xl animate-float-slower"></div>
        
        {/* Pattern */}
        <div className="absolute inset-0 opacity-10 dark:opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.1)_1px,transparent_0)] dark:bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.1)_1px,transparent_0)] bg-[length:40px_40px]"></div>
        </div>
      </div>

      <div className="container-custom relative z-10">
        {/* Header */}
        <div
          ref={elementRef as React.RefObject<HTMLDivElement>}
          className={`text-center mb-12 lg:mb-16 transition-all duration-1000 ${
            isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Bolinhas coloridas - adicionadas aqui */}
          <div className="inline-flex items-center gap-3 mb-4 animate-bounce-gentle">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          </div>
          
          <h2 className="text-5xl sm:text-7xl md:text-7xl lg:text-8xl font-bold mb-4 lg:mb-6 leading-tight">
            <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent">
              {t('projects.title')}
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
            {t('projects.subtitle')}
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project, index) => {
            const ProjectIcon = project.icon;
            const isFeatured = project.featured;
            const isFreelance = project.freelance;
            const isPersonal = project.personal;
            
            return (
              <div
                key={project.title}
                className={`group transition-all duration-1000 ${project.animation} ${
                  isVisible 
                    ? 'animate-scale-in opacity-100' 
                    : 'opacity-0 scale-95'
                }`}
                style={{ animationDelay: `${index * 150}ms` }}
                onMouseEnter={() => setHoveredProject(index)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className={`relative overflow-hidden h-full bg-white/70 dark:bg-white/5 backdrop-blur-md rounded-2xl border transition-all duration-500 hover:shadow-xl hover:scale-[1.02] ${
                  isFeatured ? `${project.featuredStyle} border-purple-500/30` : 
                  isFreelance ? 'border-orange-500/30 border-dashed' : 
                  'border-gray-200/60 dark:border-white/10'
                }`}>
                  
                  {/* Featured Badge */}
                  {isFeatured && (
                    <div className="absolute top-3 left-3 z-20 px-3 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded-lg shadow-lg flex items-center gap-1 animate-pulse">
                      <Sparkles className="w-3 h-3 fill-current" />
                      <span>{t('projects.featured')}</span>
                    </div>
                  )}

                  {/* Freelance Badge */}
                  {isFreelance && (
                    <div className="absolute top-3 left-3 z-20 px-3 py-1.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold rounded-lg shadow-lg flex items-center gap-1">
                      <Building2 className="w-3 h-3" />
                      <span>Freelance</span>
                    </div>
                  )}

                  {/* Personal Project Badge */}
                  {isPersonal && (
                    <div className="absolute top-3 left-3 z-20 px-3 py-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-bold rounded-lg shadow-lg flex items-center gap-1">
                      <Code className="w-3 h-3" />
                      <span>Projeto Pessoal</span>
                    </div>
                  )}

                  {/* Status Badge para projetos em desenvolvimento */}
                  {isFreelance && project.status && (
                    <div className="absolute top-3 right-3 z-20 px-3 py-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-bold rounded-lg shadow-lg flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{project.status}</span>
                    </div>
                  )}

                  {/* Category Badge para projetos pessoais */}
                  {isPersonal && project.category && (
                    <div className="absolute top-3 right-3 z-20 px-3 py-1.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold rounded-lg shadow-lg flex items-center gap-1">
                      <span>{project.category}</span>
                    </div>
                  )}

                  {/* Project Image Container */}
                  <div className="relative overflow-hidden aspect-[4/3]">
                    <LazyImage
                      src={project.image}
                      alt={project.title}
                      className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${
                        isFeatured ? 'group-hover:rotate-1' : ''
                      } ${isFreelance ? 'opacity-80' : ''}`}
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-white/80 dark:from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Overlay Actions */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 bg-black/20 dark:bg-slate-900/50 backdrop-blur-sm">
                      <div className="flex space-x-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        {project.isGame ? (
                          <button
                            onClick={() => openGamePreview(project)}
                            className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-110"
                            aria-label="Jogar demo"
                          >
                            <Gamepad2 className="w-4 h-4 lg:w-5 lg:h-5" />
                          </button>
                        ) : isFreelance ? (
                          <button
                            className="p-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-all duration-300 hover:scale-110 cursor-not-allowed opacity-70"
                            aria-label="Projeto em desenvolvimento"
                            disabled
                          >
                            <Clock className="w-4 h-4 lg:w-5 lg:h-5" />
                          </button>
                        ) : (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all duration-300 hover:scale-110"
                            aria-label="Ver projeto"
                          >
                            <Eye className="w-4 h-4 lg:w-5 lg:h-5" />
                          </a>
                        )}
                        {!isFreelance && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-gray-700 text-white rounded-xl hover:bg-gray-600 transition-all duration-300 hover:scale-110"
                            aria-label="Ver código no GitHub"
                          >
                            <Github className="w-4 h-4 lg:w-5 lg:h-5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-4 lg:p-6">
                    <div className="flex items-center gap-2 lg:gap-3 mb-2 lg:mb-3">
                      <div className={`p-1.5 lg:p-2 rounded-lg bg-white dark:bg-white/5 border transition-colors duration-300 ${
                        isFeatured ? 'text-purple-500 dark:text-purple-400 border-purple-500/20 animate-bounce-slow' : 
                        isFreelance ? 'text-orange-500 dark:text-orange-400 border-orange-500/20' : 
                        'text-blue-500 dark:text-blue-400 border-blue-500/20'
                      }`}>
                        <ProjectIcon className="w-3 h-3 lg:w-4 lg:h-4" />
                      </div>
                      <h3 className={`text-lg lg:text-xl font-semibold group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300 line-clamp-1 ${
                        isFeatured ? 'text-purple-600 dark:text-purple-400' : 
                        isFreelance ? 'text-orange-600 dark:text-orange-400' : 
                        'text-gray-900 dark:text-white'
                      }`}>
                        {project.title}
                      </h3>
                    </div>

                    {/* Client info for freelance projects */}
                    {isFreelance && project.client && (
                      <p className="text-sm text-blue-600 dark:text-blue-400 mb-2 font-medium">
                        Cliente: {project.client}
                      </p>
                    )}

                    <p className="text-gray-600 dark:text-gray-300 mb-3 lg:mb-4 leading-relaxed line-clamp-2 text-sm lg:text-base">
                      {project.description}
                    </p>

                    {/* Features list for all projects */}
                    {project.features && (
                      <div className="mb-3 lg:mb-4">
                        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">PRINCIPAIS FUNCIONALIDADES:</p>
                        <ul className="text-xs text-gray-600 dark:text-gray-300 space-y-1">
                          {project.features.slice(0, 3).map((feature, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className={`mr-1 ${
                                isFeatured ? 'text-purple-500' :
                                isFreelance ? 'text-orange-500' :
                                'text-green-500'
                              }`}>•</span>
                              <span className="flex-1">{feature}</span>
                            </li>
                          ))}
                          {project.features.length > 3 && (
                            <li className="text-gray-400 text-xs">
                              +{project.features.length - 3} outras funcionalidades
                            </li>
                          )}
                        </ul>
                      </div>
                    )}

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-1.5 lg:gap-2 mb-3 lg:mb-5">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-xs bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 rounded-full font-medium border border-gray-200/60 dark:border-white/10"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 rounded-full font-medium">
                          +{project.technologies.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-200/60 dark:border-white/10">
                      <div className="flex space-x-3 lg:space-x-4">
                        {project.isGame ? (
                          <button
                            onClick={() => openGamePreview(project)}
                            className="flex items-center space-x-1 lg:space-x-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors font-medium group/action text-sm"
                          >
                            <Gamepad2 className="w-3 h-3 lg:w-4 lg:h-4 transition-transform duration-300 group-hover/action:scale-110" />
                            <span>{t('projects.play_demo')}</span>
                          </button>
                        ) : isFreelance ? (
                          <span className="flex items-center space-x-1 lg:space-x-2 text-orange-600 dark:text-orange-400 font-medium text-sm">
                            <Clock className="w-3 h-3 lg:w-4 lg:h-4" />
                            <span>Em desenvolvimento</span>
                          </span>
                        ) : (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-1 lg:space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors font-medium group/action text-sm"
                          >
                            <ExternalLink className="w-3 h-3 lg:w-4 lg:h-4 transition-transform duration-300 group-hover/action:scale-110" />
                            <span>{t('projects.view_project')}</span>
                          </a>
                        )}
                      </div>
                      <div className="flex space-x-2 lg:space-x-3">
                        {!isFreelance && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors font-medium group/action"
                          >
                            <Github className="w-3 h-3 lg:w-4 lg:h-4 transition-transform duration-300 group-hover/action:scale-110" />
                          </a>
                        )}
                        <ArrowRight className={`w-3 h-3 lg:w-4 lg:h-4 transition-all duration-300 group-hover:translate-x-1 ${
                          isFeatured ? 'text-purple-400 group-hover:text-purple-500' :
                          isFreelance ? 'text-orange-400 group-hover:text-orange-500' :
                          'text-gray-400 group-hover:text-blue-500'
                        }`} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
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
          className={`text-center mt-12 lg:mt-16 transition-all duration-1000 delay-1000 ${
            isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0 translate-y-8'
          }`}
        >
          <a
            href="https://github.com/PabloG-7"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 lg:gap-3 px-6 lg:px-8 py-3 lg:py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold transition-all duration-500 hover:shadow-lg hover:shadow-blue-500/25 hover:gap-3 lg:hover:gap-4 hover:scale-105 text-sm lg:text-base"
          >
            <span>{t('projects.view_all')}</span>
            <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default memo(Projects);