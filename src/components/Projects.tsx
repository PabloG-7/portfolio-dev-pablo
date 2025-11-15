import { useState, memo, useMemo, useCallback } from 'react';
import { ExternalLink, Github, Eye, ArrowRight, Gamepad2, Sparkles, Star, Code, Palette, Zap, Clock, Building2, Stethoscope, Shirt, Database, GamepadIcon, ShoppingCart, ListTodo, CheckCircle2, X, Calendar, Users, Target, ChevronRight, Play } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import LazyImage from './LazyImage';
import GamePreview from './GamePreview';

const Projects = ({ onDemoStateChange }: { onDemoStateChange?: (isOpen: boolean) => void }) => {
  const [gamePreview, setGamePreview] = useState<{ isOpen: boolean; gameData?: any }>({ isOpen: false });
  const [projectDetail, setProjectDetail] = useState<{ isOpen: boolean; projectData?: any }>({ isOpen: false });
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const { t } = useTranslation();
  const { elementRef, isIntersecting: isVisible } = useIntersectionObserver({ 
    threshold: 0.1,
    triggerOnce: true,
    rootMargin: '50px'
  });

  const projects = useMemo(() => [
    {
      id: 'neon_memory',
      title: 'NEON MEMORY',
      description: t('projects.descriptions.neon_memory'),
      fullDescription: "Um jogo da memória revolucionário com tema neon que oferece uma experiência única de multiplayer em tempo real. Desenvolvido com tecnologias modernas para proporcionar performance excepcional e uma jogabilidade envolvente.",
      technologies: ['TypeScript', 'React', 'Supabase', 'Vite', 'Tailwind CSS', 'Web Audio API', 'PostgreSQL', 'PWA'],
      image: '/lovable-uploads/neon-linkedin.png',
      liveUrl: 'https://jogo-memoria-gold.vercel.app/',
      githubUrl: 'https://github.com/PabloG-7/jogo-memoria',
      isGame: true,
      featured: true,
      icon: GamepadIcon,
      featuredStyle: "bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20 dark:border-blue-400/30 shadow-lg shadow-blue-500/10 dark:shadow-blue-400/10",
      animation: "animate-neon-glow",
      highlights: [
        t('projects.highlights_list.multiplayer'),
        t('projects.highlights_list.multiple_modes'),
        t('projects.highlights_list.memorize_repeat'), 
        t('projects.highlights_list.responsive'),
        t('projects.highlights_list.sound_effects')
      ],
      personal: true,
      category: t('projects.category.game'),
      status: 'Concluído',
      timeline: '2 meses',
      challenges: [
        "Implementar multiplayer em tempo real com baixa latência",
        "Criar sistema de áudio interativo com Web Audio API",
        "Otimizar performance para dispositivos móveis"
      ],
      features: [
        "Multiplayer em tempo real",
        "Três modos de jogo diferentes",
        "Sistema de ranking online",
        "Efeitos visuais neon",
        "Audio imersivo"
      ]
    },
    {
      id: 'dr_bruno',
      title: 'DR. BRUNO RIBEIRO',
      description: t('projects.descriptions.dr_bruno'),
      fullDescription: "Site institucional premium desenvolvido para um fisioterapeuta especializado, focando em converter visitantes em pacientes. Design moderno com animações fluidas e otimização completa para SEO.",
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'GSAP', 'FormSubmit', 'Responsive Design'],
      image: '/lovable-uploads/drbruno-portfolio.png',
      liveUrl: '#',
      githubUrl: '#',
      icon: Stethoscope,
      featuredStyle: "bg-gradient-to-br from-orange-500/10 to-amber-500/10 border-orange-500/20 dark:border-orange-400/30",
      animation: "",
      status: t('projects.status_development'),
      freelance: true,
      client: t('projects.clients.dr_bruno'),
      highlights: [
        t('projects.highlights_list.responsive'),
        t('projects.highlights_list.contact_form'),
        t('projects.highlights_list.seo'),
        t('projects.highlights_list.animations'),
        t('projects.highlights_list.performance')
      ],
      timeline: 'Em andamento',
      challenges: [
        "Criar design que transmita profissionalismo e confiança",
        "Implementar formulário de contato seguro e funcional",
        "Otimizar para motores de busca locais"
      ],
      goals: [
        "Aumentar conversão de visitantes em consultas",
        "Melhorar posicionamento no Google para fisioterapia",
        "Oferecer experiência mobile excepcional"
      ]
    },
    {
      id: 'raeven',
      title: 'RAEVEN FASHION',
      description: t('projects.descriptions.raeven'),
      fullDescription: "Plataforma inovadora de moda inteligente que utiliza IA para revolucionar a experiência de compra online. Oferece experimentação virtual, recomendações personalizadas e visualização 3D interativa de produtos.",
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'E-commerce', 'AI Integration', 'Virtual Try-On', 'UI/UX Design', '3D Visualization'],
      image: '/lovable-uploads/raeven-portfolio.png',
      liveUrl: '#',
      githubUrl: '#',
      icon: Palette,
      featuredStyle: "bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20 dark:border-blue-400/30",
      animation: "",
      status: t('projects.status_development'),
      personal: true,
      category: t('projects.category.ecommerce'),
      highlights: [
        t('projects.highlights_list.virtual_tryon'),
        t('projects.highlights_list.ai_recommendations'),
        t('projects.highlights_list.interactive_3d'),
        t('projects.highlights_list.responsive'),
        t('projects.highlights_list.modern_ui'),
        t('projects.highlights_list.in_development')
      ],
      timeline: 'Desenvolvimento ativo',
      features: [
        "Sistema de experimentação virtual com upload de foto",
        "Algoritmo de IA para recomendações personalizadas",
        "Visualizador 3D interativo de produtos",
        "Chatbot inteligente para atendimento",
        "Dashboard administrativo completo"
      ],
      challenges: [
        "Desenvolver sistema de IA para recomendações precisas",
        "Implementar visualização 3D performática",
        "Criar interface intuitiva para experimentação virtual"
      ]
    },
    {
      id: 'taskforge',
      title: 'TASKFORGE',
      description: t('projects.descriptions.taskforge'),
      fullDescription: "Aplicação de produtividade premium com foco em organização pessoal e profissional. Oferece sistema de tags inteligente, modo Pomodoro integrado e interface drag-and-drop intuitiva.",
      technologies: ['React', 'TypeScript', 'Vite', 'Local Storage', 'Tailwind CSS'],
      image: '/lovable-uploads/taskforge-linkedin.png',
      liveUrl: 'https://gerenciador-de-tarefas-wine.vercel.app/',
      githubUrl: 'https://github.com/PabloG-7/taskforge',
      icon: ListTodo,
      featuredStyle: "bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20 dark:border-blue-400/30",
      animation: "",
      highlights: [
        t('projects.highlights_list.pomodoro'),
        t('projects.highlights_list.tag_system'),
        t('projects.highlights_list.dark_mode'),
        t('projects.highlights_list.drag_drop'),
        t('projects.highlights_list.animations')
      ],
      personal: true,
      category: t('projects.category.productivity'),
      status: 'Concluído',
      timeline: '1.5 meses',
      features: [
        "Sistema de categorias e tags avançado",
        "Modo Pomodoro com estatísticas",
        "Drag-and-drop intuitivo",
        "Dark/light mode automático",
        "Exportação de dados"
      ]
    },
    {
      id: 'luckpet',
      title: 'LUCKPET',
      description: t('projects.descriptions.luckpet'),
      fullDescription: "E-commerce completo para petshop com foco em experiência do usuário e fidelização. Sistema de autenticação seguro, carrinho persistente e programa de recompensas integrado.",
      technologies: ['JavaScript', 'CSS3', 'Supabase', 'HTML5', 'E-commerce'],
      image: '/lovable-uploads/luckpet-linkedin.png',
      liveUrl: 'https://projeto-luckpet.vercel.app/',
      githubUrl: 'https://github.com/PabloG-7/ecommerce-luckpet',
      icon: ShoppingCart,
      featuredStyle: "bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20 dark:border-blue-400/30",
      animation: "",
      highlights: [
        t('projects.highlights_list.authentication'),
        t('projects.highlights_list.loyalty'),
        t('projects.highlights_list.persistent_cart'),
        t('projects.highlights_list.responsive'),
        t('projects.highlights_list.supabase')
      ],
      personal: true,
      category: t('projects.category.ecommerce'),
      status: 'Concluído',
      timeline: '2 meses',
      features: [
        "Sistema de autenticação com Supabase",
        "Programa de fidelidade com pontos",
        "Carrinho de compras persistente",
        "Busca e filtros avançados",
        "Dashboard de pedidos"
      ]
    },
    {
      id: 'pokedex',
      title: 'POKÉDEX',
      description: t('projects.descriptions.pokedex'),
      fullDescription: "Aplicação web interativa que consome a PokéAPI para fornecer informações detalhadas sobre Pokémon. Interface moderna com sistema de busca avançado e design inspirado no universo Pokémon.",
      technologies: ['React', 'PokéAPI', 'Axios', 'Tailwind CSS', 'Vercel'],
      image: '/lovable-uploads/pokedex-linkedin.png',
      liveUrl: 'https://pokedex-nine-vert.vercel.app/',
      githubUrl: 'https://github.com/PabloG-7/pokedex',
      icon: Zap,
      featuredStyle: "bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20 dark:border-blue-400/30",
      animation: "",
      highlights: [
        t('projects.highlights_list.api'),
        t('projects.highlights_list.search_filters'),
        t('projects.highlights_list.themed_design'),
        t('projects.highlights_list.responsive'),
        t('projects.highlights_list.performance')
      ],
      personal: true,
      category: t('projects.category.api'),
      status: 'Concluído',
      timeline: '3 semanas',
      features: [
        "Consumo da PokéAPI RESTful",
        "Sistema de busca em tempo real",
        "Filtros por tipo, geração e região",
        "Design responsivo e temático",
        "Paginação otimizada"
      ]
    },
  ], [t]);

  const openGamePreview = useCallback((project: any) => {
    setGamePreview({ isOpen: true, gameData: project });
    onDemoStateChange?.(true);
  }, [onDemoStateChange]);

  const openProjectDetail = useCallback((project: any) => {
    setProjectDetail({ isOpen: true, projectData: project });
    onDemoStateChange?.(true);
  }, [onDemoStateChange]);

  const closeProjectDetail = useCallback(() => {
    setProjectDetail({ isOpen: false });
    onDemoStateChange?.(false);
  }, [onDemoStateChange]);

  return (
    <section
      id="projects"
      className="section-padding relative min-h-screen overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50/30 to-yellow-50/20 dark:from-slate-900 dark:via-orange-950/20 dark:to-amber-950/10"
    >
      {/* Background */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.15)_1px,transparent_0)] bg-[size:32px_32px] dark:bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.1)_1px,transparent_0)]"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-amber-500/20 rounded-full animate-float-slow"
            style={{
              left: `${15 + i * 12}%`,
              top: `${20 + i * 10}%`,
              animationDelay: `${i * 2}s`,
              animationDuration: '6s'
            }}
          />
        ))}
      </div>

      <div className="container-custom relative z-10">
        {/* Header */}
        <div
          ref={elementRef as React.RefObject<HTMLDivElement>}
          className={`text-center mb-12 lg:mb-16 transition-all duration-1000 ${
            isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Color dots */}
          <div className="inline-flex items-center gap-3 mb-4 animate-bounce-gentle">
            <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          </div>
          
          <h2 className="text-5xl sm:text-7xl md:text-7xl lg:text-7xl font-bold mb-4 lg:mb-6 leading-tight">
            <span className="bg-gradient-to-r from-slate-800 via-orange-600 to-slate-800 dark:from-white dark:via-amber-200 dark:to-white bg-clip-text text-transparent">
              {t('projects.title')}
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed px-4">
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
            const hasStatus = project.status && project.status !== 'Concluído';
            
            return (
              <div
                key={project.id}
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
                  isFeatured ? `${project.featuredStyle} border-blue-500/30` : 
                  isFreelance ? 'border-orange-500/30 border-dashed' : 
                  'border-blue-500/20 dark:border-blue-500/20'
                }`}>
                  
                  {/* Badges */}
                  {isFeatured && (
                    <div className="absolute top-3 left-3 z-20 px-3 py-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-bold rounded-lg shadow-lg flex items-center gap-1 animate-pulse">
                      <Sparkles className="w-3 h-3 fill-current" />
                      <span>{t('projects.featured')}</span>
                    </div>
                  )}

                  {isFreelance && (
                    <div className="absolute top-3 left-3 z-20 px-3 py-1.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold rounded-lg shadow-lg flex items-center gap-1">
                      <Building2 className="w-3 h-3" />
                      <span>{t('projects.type.freelance')}</span>
                    </div>
                  )}

                  {isPersonal && !isFeatured && (
                    <div className="absolute top-3 left-3 z-20 px-3 py-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-bold rounded-lg shadow-lg flex items-center gap-1">
                      <Code className="w-3 h-3" />
                      <span>{t('projects.type.personal')}</span>
                    </div>
                  )}

                  {hasStatus && (
                    <div className="absolute top-3 right-3 z-20 px-3 py-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-bold rounded-lg shadow-lg flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{project.status}</span>
                    </div>
                  )}

                  {isPersonal && project.category && !hasStatus && (
                    <div className="absolute top-3 right-3 z-20 px-3 py-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-bold rounded-lg shadow-lg flex items-center gap-1">
                      <span>{project.category}</span>
                    </div>
                  )}

                  {/* Project Image */}
                  <div className="relative overflow-hidden aspect-[4/3]">
                    <LazyImage
                      src={project.image}
                      alt={project.title}
                      className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
                        isFeatured ? 'group-hover:rotate-1' : ''
                      } ${isFreelance ? 'opacity-90' : ''}`}
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                    
                    {/* Glow effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700">
                      <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-xl transform -translate-x-1/2 -translate-y-1/2"></div>
                      <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-white/20 to-transparent rounded-full blur-xl transform translate-x-1/2 translate-y/1/2"></div>
                    </div>
                    
                    {/* Action buttons */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <div className="flex space-x-3 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                        {project.isGame ? (
                          <button
                            onClick={() => openGamePreview(project)}
                            className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-110 shadow-lg backdrop-blur-sm"
                          >
                            <Gamepad2 className="w-4 h-4 lg:w-5 lg:h-5" />
                          </button>
                        ) : hasStatus ? (
                          <button
                            className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-110 cursor-not-allowed opacity-80 shadow-lg backdrop-blur-sm"
                            disabled
                          >
                            <Clock className="w-4 h-4 lg:w-5 lg/h-5" />
                          </button>
                        ) : (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-110 shadow-lg backdrop-blur-sm"
                          >
                            <Eye className="w-4 h-4 lg:w-5 lg/h-5" />
                          </a>
                        )}
                        
                        {/* Botão Ver Detalhes */}
                        <button
                          onClick={() => openProjectDetail(project)}
                          className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-110 shadow-lg backdrop-blur-sm"
                        >
                          <Star className="w-4 h-4 lg:w-5 lg/h-5" />
                        </button>

                        {!isFreelance && !hasStatus && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-slate-800/90 text-white rounded-xl hover:bg-slate-700/90 transition-all duration-300 hover:scale-110 shadow-lg backdrop-blur-sm"
                          >
                            <Github className="w-4 h-4 lg:w-5 lg/h-5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-4 lg:p-6">
                    <div className="flex items-center gap-2 lg:gap-3 mb-2 lg:mb-3">
                      <div className={`p-1.5 lg:p-2 rounded-lg bg-white dark:bg-white/5 border transition-colors duration-300 ${
                        isFeatured ? 'text-blue-500 dark:text-blue-400 border-blue-500/20 animate-bounce-slow' : 
                        isFreelance ? 'text-orange-500 dark:text-orange-400 border-orange-500/20' : 
                        'text-blue-500 dark:text-blue-400 border-blue-500/20'
                      }`}>
                        <ProjectIcon className="w-3 h-3 lg:w-4 lg:h-4" />
                      </div>
                      <h3 className={`text-lg lg:text-xl font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 line-clamp-1 ${
                        isFeatured ? 'text-blue-600 dark:text-blue-400' : 
                        isFreelance ? 'text-orange-600 dark:text-orange-400' : 
                        'text-blue-600 dark:text-blue-400'
                      }`}>
                        {project.title}
                      </h3>
                    </div>

                    {isFreelance && project.client && (
                      <p className="text-sm text-orange-600 dark:text-orange-400 mb-2 font-medium">
                        {t('projects.client')}: {project.client}
                      </p>
                    )}

                    <p className="text-slate-600 dark:text-slate-300 mb-3 lg:mb-4 leading-relaxed line-clamp-2 text-sm lg:text-base">
                      {project.description}
                    </p>

                    {/* Highlights */}
                    {project.highlights && (
                      <div className="mb-3 lg:mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className={`w-1 h-4 rounded-full ${
                            isFeatured || isPersonal ? 'bg-blue-500' : 'bg-orange-500'
                          }`}></div>
                          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                            {t('projects.highlights')}
                          </p>
                        </div>
                        <div className="grid grid-cols-2 gap-1.5">
                          {project.highlights.slice(0, 4).map((highlight, idx) => (
                            <div key={idx} className="flex items-center gap-1.5">
                              <CheckCircle2 className={`w-3 h-3 ${
                                isFeatured || isPersonal 
                                  ? 'text-blue-500 dark:text-blue-400' 
                                  : 'text-orange-500 dark:text-orange-400'
                              }`} />
                              <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                                {highlight}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-1.5 lg:gap-2 mb-3 lg:mb-5">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className={`px-2 py-1 text-xs rounded-full font-medium border ${
                            isFeatured || isPersonal
                              ? 'bg-blue-100 dark:bg-blue-500/5 text-blue-700 dark:text-blue-300 border-blue-200/60 dark:border-blue-500/20' :
                              'bg-orange-100 dark:bg-orange-500/5 text-orange-700 dark:text-orange-300 border-orange-200/60 dark:border-orange-500/20'
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                          isFeatured || isPersonal
                            ? 'bg-blue-100 dark:bg-blue-500/5 text-blue-500 dark:text-blue-400' :
                            'bg-orange-100 dark:bg-orange-500/5 text-orange-500 dark:text-orange-400'
                        }`}>
                          +{project.technologies.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-3 border-t border-slate-200/60 dark:border-slate-600/20">
                      <div className="flex space-x-3 lg:space-x-4">
                        {project.isGame ? (
                          <button
                            onClick={() => openGamePreview(project)}
                            className={`flex items-center space-x-1 lg:space-x-2 font-medium group/action text-sm ${
                              isFeatured || isPersonal
                                ? 'text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300' :
                                'text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300'
                            }`}
                          >
                            <Gamepad2 className="w-3 h-3 lg:w-4 lg:h-4 transition-transform duration-300 group-hover/action:scale-110" />
                            <span>{t('projects.play_demo')}</span>
                          </button>
                        ) : hasStatus ? (
                          <span className="flex items-center space-x-1 lg:space-x-2 text-blue-600 dark:text-blue-400 font-medium text-sm">
                            <Clock className="w-3 h-3 lg:w-4 lg:h-4" />
                            <span>{project.status}</span>
                          </span>
                        ) : (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center space-x-1 lg:space-x-2 font-medium group/action text-sm ${
                              isFeatured || isPersonal
                                ? 'text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300' :
                                'text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300'
                            }`}
                          >
                            <ExternalLink className="w-3 h-3 lg:w-4 lg:h-4 transition-transform duration-300 group-hover/action:scale-110" />
                            <span>{t('projects.view_project')}</span>
                          </a>
                        )}
                        
                        {/* Botão Ver Detalhes na parte inferior */}
                        <button
                          onClick={() => openProjectDetail(project)}
                          className={`flex items-center space-x-1 lg:space-x-2 font-medium group/action text-sm ${
                            isFeatured || isPersonal
                              ? 'text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300' :
                              'text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300'
                          }`}
                        >
                          <Star className="w-3 h-3 lg:w-4 lg:h-4 transition-transform duration-300 group-hover/action:scale-110" />
                          <span>Detalhes</span>
                        </button>
                      </div>
                      <div className="flex space-x-2 lg:space-x-3">
                        {!isFreelance && !hasStatus && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-1 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors font-medium group/action"
                          >
                            <Github className="w-3 h-3 lg:w-4 lg:h-4 transition-transform duration-300 group-hover/action:scale-110" />
                          </a>
                        )}
                        <ArrowRight className={`w-3 h-3 lg:w-4 lg:h-4 transition-all duration-300 group-hover:translate-x-1 ${
                          isFeatured || isPersonal ? 'text-blue-400 group-hover:text-blue-500' :
                          'text-orange-400 group-hover:text-orange-500'
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

        {/* Project Detail Modal */}
        {projectDetail.isOpen && projectDetail.projectData && (
          <ProjectDetailModal
            project={projectDetail.projectData}
            onClose={closeProjectDetail}
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
            className="inline-flex items-center justify-center gap-2 lg:gap-3 px-6 lg:px-8 py-3 lg:py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold transition-all duration-500 hover:shadow-lg hover:shadow-amber-500/25 hover:gap-3 lg:hover:gap-4 hover:scale-105 text-sm lg:text-base"
          >
            <span>{t('projects.view_all_github')}</span>
            <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5 transition-transform duration-300 group-hover:translate/x-1" />
          </a>
        </div>
      </div>
    </section>
  );
};

// Componente Modal de Detalhes do Projeto
const ProjectDetailModal = ({ project, onClose }: { project: any; onClose: () => void }) => {
  const isFreelance = project.freelance;
  const isPersonal = project.personal;
  const hasStatus = project.status && project.status !== 'Concluído';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative bg-white dark:bg-slate-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 rounded-t-2xl p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl ${
                isFreelance ? 'bg-orange-500/10 text-orange-500' : 'bg-blue-500/10 text-blue-500'
              }`}>
                <project.icon className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
                  {project.title}
                </h2>
                <div className="flex items-center gap-3 mt-1">
                  {project.featured && (
                    <span className="px-2 py-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-bold rounded-lg">
                      Destaque
                    </span>
                  )}
                  <span className={`px-2 py-1 text-xs font-bold rounded-lg ${
                    isFreelance 
                      ? 'bg-orange-500/10 text-orange-500 border border-orange-500/20' 
                      : 'bg-blue-500/10 text-blue-500 border border-blue-500/20'
                  }`}>
                    {isFreelance ? 'Freelance' : 'Projeto Pessoal'}
                  </span>
                  {project.status && (
                    <span className={`px-2 py-1 text-xs font-bold rounded-lg ${
                      hasStatus
                        ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20'
                        : 'bg-green-500/10 text-green-500 border border-green-500/20'
                    }`}>
                      {project.status}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
            >
              <X className="w-6 h-6 text-slate-500" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Imagem e Informações Básicas */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
              <LazyImage
                src={project.image}
                alt={project.title}
                className="w-full h-64 object-cover"
              />
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">
                  Descrição Completa
                </h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {project.fullDescription}
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {project.timeline && (
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <Calendar className="w-4 h-4" />
                    <span>{project.timeline}</span>
                  </div>
                )}
                {project.category && (
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <Target className="w-4 h-4" />
                    <span>{project.category}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Tecnologias */}
          <div>
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-3">
              Tecnologias Utilizadas
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech: string, index: number) => (
                <span
                  key={index}
                  className={`px-3 py-1.5 text-sm rounded-full font-medium border ${
                    isPersonal || project.featured
                      ? 'bg-blue-100 dark:bg-blue-500/5 text-blue-700 dark:text-blue-300 border-blue-200/60 dark:border-blue-500/20' :
                      'bg-orange-100 dark:bg-orange-500/5 text-orange-700 dark:text-orange-300 border-orange-200/60 dark:border-orange-500/20'
                  }`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Características Principais */}
          <div>
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-3">
              Características Principais
            </h3>
            <div className="grid md:grid-cols-2 gap-2">
              {project.highlights.map((highlight: string, index: number) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle2 className={`w-4 h-4 ${
                    isPersonal || project.featured ? 'text-blue-500' : 'text-orange-500'
                  }`} />
                  <span className="text-slate-600 dark:text-slate-300 text-sm">
                    {highlight}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Seções Dinâmicas */}
          {project.features && (
            <div>
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-3">
                Funcionalidades
              </h3>
              <div className="space-y-2">
                {project.features.map((feature: string, index: number) => (
                  <div key={index} className="flex items-center gap-2">
                    <ChevronRight className={`w-4 h-4 ${
                      isPersonal || project.featured ? 'text-blue-500' : 'text-orange-500'
                    }`} />
                    <span className="text-slate-600 dark:text-slate-300">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {project.challenges && (
            <div>
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-3">
                Desafios e Soluções
              </h3>
              <div className="space-y-2">
                {project.challenges.map((challenge: string, index: number) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      isPersonal || project.featured ? 'bg-blue-500' : 'bg-orange-500'
                    }`} />
                    <span className="text-slate-600 dark:text-slate-300 text-sm">
                      {challenge}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {project.goals && (
            <div>
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-3">
                Objetivos
              </h3>
              <div className="space-y-2">
                {project.goals.map((goal: string, index: number) => (
                  <div key={index} className="flex items-center gap-2">
                    <Target className={`w-4 h-4 ${
                      isPersonal || project.featured ? 'text-blue-500' : 'text-orange-500'
                    }`} />
                    <span className="text-slate-600 dark:text-slate-300 text-sm">
                      {goal}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-4 pt-4 border-t border-slate-200 dark:border-slate-700">
            {!hasStatus && project.liveUrl !== '#' && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
              >
                <Eye className="w-4 h-4" />
                Ver Projeto
              </a>
            )}
            {!isFreelance && !hasStatus && project.githubUrl !== '#' && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-slate-800 text-white rounded-xl font-semibold transition-all duration-300 hover:bg-slate-700"
              >
                <Github className="w-4 h-4" />
                Ver Código
              </a>
            )}
            {hasStatus && (
              <div className="flex items-center gap-2 px-6 py-3 bg-blue-500/10 text-blue-500 rounded-xl font-semibold">
                <Clock className="w-4 h-4" />
                {project.status}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Projects);