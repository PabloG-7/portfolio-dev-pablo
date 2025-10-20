import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Code, Database, Server, Settings, Sparkles, Zap } from 'lucide-react';

// Import logos
import html5Logo from '../assets/logos/html5.svg';
import css3Logo from '../assets/logos/css3.svg';
import javascriptLogo from '../assets/logos/javascript.svg';
import typescriptLogo from '../assets/logos/typescript.svg';
import reactLogo from '../assets/logos/react.svg';
import nodejsLogo from '../assets/logos/nodejs.svg';
import expressLogo from '../assets/logos/express.svg';
import mysqlLogo from '../assets/logos/mysql.svg';
import supabaseLogo from '../assets/logos/supabase.svg';
import gitLogo from '../assets/logos/git.svg';
import githubLogo from '../assets/logos/github.svg';
import vercelLogo from '../assets/logos/vercel.svg';
import excelLogo from '../assets/logos/excel-new.svg';

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [animatedSkills, setAnimatedSkills] = useState<Set<string>>(new Set());
  const sectionRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  const handleIntersection = useCallback(([entry]: IntersectionObserverEntry[]) => {
    if (entry.isIntersecting) {
      setIsVisible(true);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, { threshold: 0.2 });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [handleIntersection]);

  // Anima skills sequencialmente
  useEffect(() => {
    if (isVisible) {
      const allSkills = skills.map(skill => skill.name);
      allSkills.forEach((skillName, index) => {
        setTimeout(() => {
          setAnimatedSkills(prev => new Set([...prev, skillName]));
        }, index * 100);
      });
    }
  }, [isVisible]);

  const skills = useMemo(() => [
    { name: 'HTML', logo: html5Logo, category: 'frontend', level: 90 },
    { name: 'CSS', logo: css3Logo, category: 'frontend', level: 90 },
    { name: 'JavaScript', logo: javascriptLogo, category: 'frontend', level: 90 },
    { name: 'TypeScript', logo: typescriptLogo, category: 'frontend', level: 84 },
    { name: 'React', logo: reactLogo, category: 'frontend', level: 84 },
    { name: 'Node.js', logo: nodejsLogo, category: 'backend', level: 80 },
    { name: 'Express', logo: expressLogo, category: 'backend', level: 60 },
    { name: 'MySQL', logo: mysqlLogo, category: 'database', level: 75 },
    { name: 'Supabase', logo: supabaseLogo, category: 'database', level: 73 },
    { name: 'Git', logo: gitLogo, category: 'tools', level: 90 },
    { name: 'GitHub', logo: githubLogo, category: 'tools', level: 90 },
    { name: 'Vercel', logo: vercelLogo, category: 'tools', level: 85 },
    { name: 'Excel', logo: excelLogo, category: 'tools', level: 70 }
  ], []);

  const categories = useMemo(() => ({
    frontend: { 
      name: t('skills.categories.frontend'), 
      color: 'text-amber-600 dark:text-amber-400',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/30',
      hoverColor: 'hover:border-amber-500/50',
      icon: Code,
      gradient: 'from-amber-500/20 to-orange-500/20'
    },
    backend: { 
      name: t('skills.categories.backend'), 
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/30',
      hoverColor: 'hover:border-orange-500/50',
      icon: Server,
      gradient: 'from-orange-500/20 to-red-500/20'
    },
    database: { 
      name: t('skills.categories.database'), 
      color: 'text-red-600 dark:text-red-400',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/30',
      hoverColor: 'hover:border-red-500/50',
      icon: Database,
      gradient: 'from-red-500/20 to-pink-500/20'
    },
    tools: { 
      name: t('skills.categories.tools'), 
      color: 'text-amber-700 dark:text-amber-300',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/30',
      hoverColor: 'hover:border-amber-500/50',
      icon: Settings,
      gradient: 'from-amber-600/20 to-orange-600/20'
    }
  }), [t]);

  const groupedSkills = useMemo(() => {
    return Object.keys(categories).reduce((acc, category) => {
      acc[category] = skills.filter(skill => skill.category === category);
      return acc;
    }, {} as Record<string, typeof skills>);
  }, [skills, categories]);

  return (
    <section
      id="habilidades"
      ref={sectionRef}
      className="section-padding relative min-h-screen overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50/30 to-yellow-50/20 dark:from-slate-900 dark:via-orange-950/20 dark:to-amber-950/10"
    >
      {/* Background EXATAMENTE igual ao HeroRevamp */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.15)_1px,transparent_0)] bg-[size:32px_32px] dark:bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.1)_1px,transparent_0)]"></div>
      </div>

      {/* Partículas flutuantes - EXATAMENTE igual ao HeroRevamp */}
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
          className={`text-center mb-12 lg:mb-16 transition-all duration-1000 ${
            isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-2 mb-4 animate-bounce-gentle">
            <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          </div>

          <h2 className="text-5xl sm:text-7xl md:text-7xl lg:text-7xl font-bold mb-4 lg:mb-6 leading-tight">
            <span className="bg-gradient-to-r from-slate-800 via-orange-600 to-slate-800 dark:from-white dark:via-amber-200 dark:to-white bg-clip-text text-transparent">
              {t('skills.title')}
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed px-4">
            {t('skills.subtitle')}
          </p>
        </div>

        {/* Categories Tabs */}
        <div 
          className={`flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-10 transition-all duration-1000 ${
            isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          {Object.entries(categories).map(([key, category], index) => {
            const Icon = category.icon;
            const isActive = activeCategory === key || activeCategory === null;
            
            return (
              <button
                key={key}
                onClick={() => setActiveCategory(activeCategory === key ? null : key)}
                className={`group relative px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl transition-all duration-500 ease-out transform hover:scale-105 flex items-center gap-2 sm:gap-3 ${
                  isActive
                    ? `${category.bgColor} ${category.borderColor} border backdrop-blur-sm shadow-lg`
                    : 'bg-white/60 dark:bg-slate-800/60 border border-amber-200/60 dark:border-amber-500/20 opacity-60'
                }`}
                style={{ animationDelay: `${300 + index * 100}ms` }}
              >
                <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${category.color}`} />
                <span className={`font-medium text-sm sm:text-base ${isActive ? category.color : 'text-slate-600 dark:text-slate-400'}`}>
                  {category.name}
                </span>
                
                {isActive && (
                  <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-sparkle" />
                )}
              </button>
            );
          })}
        </div>

        {/* Skills Cards */}
        <div className="space-y-8">
          {Object.entries(groupedSkills).map(([categoryKey, categorySkills], categoryIndex) => {
            const categoryInfo = categories[categoryKey as keyof typeof categories];
            const shouldShow = activeCategory === null || activeCategory === categoryKey;
            const Icon = categoryInfo.icon;
            
            return (
              <div
                key={categoryKey}
                className={`transition-all duration-700 ease-out ${
                  shouldShow ? 'opacity-100 max-h-[2000px]' : 'opacity-0 max-h-0 overflow-hidden'
                }`}
              >
                {/* Category Header */}
                <div 
                  className={`mb-6 transition-all duration-1000 ${
                    isVisible ? 'animate-slide-in-left opacity-100' : 'opacity-0 -translate-x-8'
                  }`}
                  style={{ transitionDelay: `${400 + categoryIndex * 100}ms` }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2 rounded-lg ${categoryInfo.bgColor} border ${categoryInfo.borderColor}`}>
                      <Icon className={`w-5 h-5 ${categoryInfo.color}`} />
                    </div>
                    <h3 className={`text-xl sm:text-2xl font-bold ${categoryInfo.color}`}>
                      {categoryInfo.name}
                    </h3>
                    <div className="flex-1 h-0.5 bg-gradient-to-r from-amber-200/60 to-amber-200/60 dark:from-amber-600/60 dark:to-amber-600/60 rounded-full ml-4" />
                  </div>
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
                  {categorySkills.map((skill, skillIndex) => {
                    const isAnimated = animatedSkills.has(skill.name);
                    
                    return (
                      <div
                        key={skill.name}
                        className={`group relative overflow-hidden transition-all duration-700 ease-out hover:scale-105 hover:-translate-y-2 ${
                          isAnimated ? 'animate-scale-in opacity-100' : 'opacity-0 scale-95'
                        }`}
                        style={{ 
                          transitionDelay: `${500 + categoryIndex * 50 + skillIndex * 80}ms`,
                        }}
                      >
                        {/* Card */}
                        <div className="relative p-3 sm:p-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-amber-200/60 dark:border-amber-500/20 rounded-xl shadow-sm hover:shadow-lg transition-all duration-500 h-full">
                          
                          {/* Animated Border on Hover */}
                          <div 
                            className={`absolute inset-0 rounded-xl bg-gradient-to-r ${categoryInfo.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-[1px]`}
                          >
                            <div className="w-full h-full bg-white dark:bg-slate-800 rounded-xl" />
                          </div>

                          {/* Content */}
                          <div className="relative z-10 flex flex-col h-full">
                            {/* Logo */}
                            <div className="flex justify-center mb-2 sm:mb-3">
                              <div className="relative group-hover:scale-110 transition-transform duration-500">
                                {/* Glow effect */}
                                <div 
                                  className="absolute inset-0 rounded-lg blur-md opacity-0 group-hover:opacity-40 transition-all duration-500"
                                  style={{ 
                                    backgroundColor: categoryInfo.color.includes('amber') ? '#f59e0b' : 
                                                   categoryInfo.color.includes('orange') ? '#f97316' :
                                                   categoryInfo.color.includes('red') ? '#ef4444' :
                                                   '#d97706'
                                  }}
                                />
                                <div className="relative p-2 bg-amber-100/60 dark:bg-amber-500/10 rounded-lg border border-amber-200/60 dark:border-amber-500/20">
                                  <img 
                                    src={skill.logo} 
                                    alt={`${skill.name} logo`}
                                    className="w-6 h-6 sm:w-7 sm:h-7 transition-all duration-500 group-hover:drop-shadow-lg"
                                  />
                                </div>
                              </div>
                            </div>

                            {/* Skill Name */}
                            <h4 className="text-center text-xs sm:text-sm font-semibold mb-2 sm:mb-3 group-hover:scale-105 transition-transform duration-300 flex-grow">
                              {skill.name}
                            </h4>
                            
                            {/* Progress Bar */}
                            <div className="space-y-1 sm:space-y-2">
                              <div className="flex justify-between items-center text-xs">
                                <span className="text-slate-500 dark:text-slate-400">Nível</span>
                                <span className="font-medium text-slate-700 dark:text-slate-300">{skill.level}%</span>
                              </div>
                              <div className="relative h-1.5 bg-amber-200/60 dark:bg-amber-700/60 rounded-full overflow-hidden">
                                {/* Progress Fill with Animation */}
                                <div 
                                  className="absolute top-0 left-0 h-full rounded-full transition-all duration-2000 ease-out"
                                  style={{
                                    width: isAnimated ? `${skill.level}%` : '0%',
                                    background: `linear-gradient(90deg, ${categoryInfo.color.includes('amber') ? '#f59e0b' : 
                                      categoryInfo.color.includes('orange') ? '#f97316' :
                                      categoryInfo.color.includes('red') ? '#ef4444' :
                                      '#d97706'}, ${categoryInfo.color.includes('amber') ? '#fbbf24' : 
                                      categoryInfo.color.includes('orange') ? '#fb923c' :
                                      categoryInfo.color.includes('red') ? '#f87171' :
                                      '#f59e0b'})`
                                  }}
                                >
                                  {/* Shine effect */}
                                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Floating element on hover */}
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-ping-slow" />
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div 
          className={`text-center mt-12 lg:mt-16 transition-all duration-1000 ${
            isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '1200ms' }}
        >
          <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-md rounded-2xl p-6 border border-amber-200/60 dark:border-amber-500/20 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-3">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                Tecnologias em Constante Evolução
              </h3>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
              Sempre aprendendo e me adaptando às novas tecnologias do mercado
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;