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
    { name: 'MySQL', logo: mysqlLogo, category: 'database', level: 85 },
    { name: 'Supabase', logo: supabaseLogo, category: 'database', level: 73 },
    { name: 'Git', logo: gitLogo, category: 'tools', level: 90 },
    { name: 'GitHub', logo: githubLogo, category: 'tools', level: 90 },
    { name: 'Vercel', logo: vercelLogo, category: 'tools', level: 85 },
    { name: 'Excel', logo: excelLogo, category: 'tools', level: 70 }
  ], []);

  const categories = useMemo(() => ({
    frontend: { 
      name: t('skills.categories.frontend'), 
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30',
      hoverColor: 'hover:border-blue-500/50',
      icon: Code,
      gradient: 'from-blue-500/20 to-cyan-500/20'
    },
    backend: { 
      name: t('skills.categories.backend'), 
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/30',
      hoverColor: 'hover:border-green-500/50',
      icon: Server,
      gradient: 'from-green-500/20 to-emerald-500/20'
    },
    database: { 
      name: t('skills.categories.database'), 
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/30',
      hoverColor: 'hover:border-purple-500/50',
      icon: Database,
      gradient: 'from-purple-500/20 to-violet-500/20'
    },
    tools: { 
      name: t('skills.categories.tools'), 
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/30',
      hoverColor: 'hover:border-orange-500/50',
      icon: Settings,
      gradient: 'from-orange-500/20 to-red-500/20'
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
      className="section-padding relative overflow-hidden bg-slate-50 dark:bg-slate-900"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-float-slower"></div>
        
        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-blue-400/30 rounded-full animate-float-random"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 8 + 8}s`
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="container-custom relative">
        {/* Header */}
        <div
          className={`text-center mb-12 lg:mb-16 transition-all duration-1000 ${
            isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-2 mb-4 animate-bounce-gentle">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          </div>

          <h2 className="text-5xl sm:text-7xl md:text-7xl lg:text-8xl font-bold mb-4 lg:mb-6 leading-tight">
            <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-white dark:via-slate-100 dark:to-white bg-clip-text text-transparent">
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
                    : 'bg-white/60 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-600/60 opacity-60'
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
                    <div className="flex-1 h-0.5 bg-gradient-to-r from-slate-200/60 to-slate-200/60 dark:from-slate-600/60 dark:to-slate-600/60 rounded-full ml-4" />
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
                        <div className="relative p-3 sm:p-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/60 dark:border-slate-600/60 rounded-xl shadow-sm hover:shadow-lg transition-all duration-500 h-full">
                          
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
                                    backgroundColor: categoryInfo.color.includes('blue') ? '#3b82f6' : 
                                                   categoryInfo.color.includes('green') ? '#10b981' :
                                                   categoryInfo.color.includes('purple') ? '#8b5cf6' :
                                                   '#f97316'
                                  }}
                                />
                                <div className="relative p-2 bg-slate-100/60 dark:bg-slate-700/60 rounded-lg border border-slate-200/60 dark:border-slate-600/60">
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
                              <div className="relative h-1.5 bg-slate-200/60 dark:bg-slate-700/60 rounded-full overflow-hidden">
                                {/* Progress Fill with Animation */}
                                <div 
                                  className="absolute top-0 left-0 h-full rounded-full transition-all duration-2000 ease-out"
                                  style={{
                                    width: isAnimated ? `${skill.level}%` : '0%',
                                    background: `linear-gradient(90deg, ${categoryInfo.color.includes('blue') ? '#3b82f6' : 
                                      categoryInfo.color.includes('green') ? '#10b981' :
                                      categoryInfo.color.includes('purple') ? '#8b5cf6' :
                                      '#f97316'}, ${categoryInfo.color.includes('blue') ? '#06b6d4' : 
                                      categoryInfo.color.includes('green') ? '#34d399' :
                                      categoryInfo.color.includes('purple') ? '#a855f7' :
                                      '#ef4444'})`
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
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-ping-slow" />
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
          <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-md rounded-2xl p-6 border border-slate-200/60 dark:border-slate-600/60 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Zap className="w-5 h-5 text-yellow-500 animate-pulse" />
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