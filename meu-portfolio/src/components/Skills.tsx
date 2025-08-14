import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

// Import logos
import html5Logo from '../assets/logos/html5.svg';
import css3Logo from '../assets/logos/css3.svg';
import javascriptLogo from '../assets/logos/javascript.svg';
import typescriptLogo from '../assets/logos/typescript.svg';
import reactLogo from '../assets/logos/react.svg';
import nodejsLogo from '../assets/logos/nodejs.svg';
import mysqlLogo from '../assets/logos/mysql.svg';
import supabaseLogo from '../assets/logos/supabase.svg';
import gitLogo from '../assets/logos/git.svg';
import githubLogo from '../assets/logos/github.svg';
import vercelLogo from '../assets/logos/vercel.svg';
import excelLogo from '../assets/logos/excel-new.svg';

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
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

  const skills = useMemo(() => [
    { name: 'HTML', logo: html5Logo, category: 'frontend', level: 90 },
    { name: 'CSS', logo: css3Logo, category: 'frontend', level: 90 },
    { name: 'JavaScript', logo: javascriptLogo, category: 'frontend', level: 90 },
    { name: 'TypeScript', logo: typescriptLogo, category: 'frontend', level: 84 },
    { name: 'React', logo: reactLogo, category: 'frontend', level: 84 },
    { name: 'Node.js', logo: nodejsLogo, category: 'backend', level: 73 },
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
      color: 'hsl(217 91% 60%)',
      gradient: 'from-blue-500/20 via-cyan-500/20 to-blue-500/20',
      borderColor: 'border-blue-500/30',
      icon: '🎨'
    },
    backend: { 
      name: t('skills.categories.backend'), 
      color: 'hsl(142 76% 36%)',
      gradient: 'from-green-500/20 via-emerald-500/20 to-green-500/20',
      borderColor: 'border-green-500/30',
      icon: '⚙️'
    },
    database: { 
      name: t('skills.categories.database'), 
      color: 'hsl(262 83% 58%)',
      gradient: 'from-purple-500/20 via-violet-500/20 to-purple-500/20',
      borderColor: 'border-purple-500/30',
      icon: '🗄️'
    },
    tools: { 
      name: t('skills.categories.tools'), 
      color: 'hsl(25 95% 53%)',
      gradient: 'from-orange-500/20 via-red-500/20 to-orange-500/20',
      borderColor: 'border-orange-500/30',
      icon: '🛠️'
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
      className="section-padding relative overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full blur-3xl animate-pulse" 
             style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-accent/10 to-primary/10 rounded-full blur-3xl animate-pulse" 
             style={{ animationDuration: '6s', animationDelay: '2s' }} />
      </div>
      
      <div className="container-custom relative">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-4">
            {t('skills.title').split(' ')[0]} <span className="gradient-text">{t('skills.title').split(' ')[1]}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('skills.subtitle')}
          </p>
        </div>

        {/* Categories Tabs */}
        <div 
          className={`flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-8 sm:mb-10 md:mb-12 transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          {Object.entries(categories).map(([key, category]) => (
            <button
              key={key}
              onClick={() => setActiveCategory(activeCategory === key ? null : key)}
              className={`group relative px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-full transition-all duration-500 ease-out transform hover:scale-105 ${
                activeCategory === key || activeCategory === null
                  ? `bg-gradient-to-r ${category.gradient} ${category.borderColor} border backdrop-blur-sm shadow-lg`
                  : 'bg-muted/50 border border-border/50 opacity-60'
              }`}
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="text-lg sm:text-xl">{category.icon}</span>
                <span className="font-medium text-sm sm:text-base">{category.name}</span>
              </div>
              {(activeCategory === key || activeCategory === null) && (
                <div 
                  className="absolute inset-0 rounded-full opacity-20 animate-pulse"
                  style={{ backgroundColor: category.color }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Skills Cards */}
        <div className="space-y-8">
          {Object.entries(groupedSkills).map(([categoryKey, categorySkills], categoryIndex) => {
            const categoryInfo = categories[categoryKey as keyof typeof categories];
            const shouldShow = activeCategory === null || activeCategory === categoryKey;
            
            return (
              <div
                key={categoryKey}
                className={`transition-all duration-700 ease-out ${
                  shouldShow ? 'opacity-100 max-h-[1000px]' : 'opacity-0 max-h-0 overflow-hidden'
                }`}
              >
                <div 
                  className={`mb-6 transition-all duration-1000 ease-out ${
                    isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                  }`}
                  style={{ transitionDelay: `${400 + categoryIndex * 100}ms` }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">{categoryInfo.icon}</span>
                    <h3 className="text-2xl font-playfair font-semibold">{categoryInfo.name}</h3>
                    <div className={`flex-1 h-0.5 bg-gradient-to-r ${categoryInfo.gradient} rounded-full ml-4`} />
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
                  {categorySkills.map((skill, skillIndex) => (
                    <div
                      key={skill.name}
                      className={`group relative overflow-hidden rounded-2xl transition-all duration-700 ease-out hover:scale-105 hover:-translate-y-2 ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                      }`}
                      style={{ 
                        transitionDelay: `${600 + categoryIndex * 100 + skillIndex * 100}ms`,
                        animationFillMode: 'both'
                      }}
                    >
                      {/* Card Background */}
                      <div className="relative p-3 sm:p-4 md:p-6 bg-card/80 backdrop-blur-sm border border-border/50 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500">
                        {/* Animated Border */}
                        <div 
                          className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${categoryInfo.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-[1px]`}
                        >
                          <div className="w-full h-full bg-card rounded-2xl" />
                        </div>

                        {/* Content */}
                        <div className="relative z-10">
                          {/* Logo */}
                          <div className="flex justify-center mb-2 sm:mb-3 md:mb-4">
                            <div className="relative group-hover:scale-110 transition-transform duration-500">
                              <div 
                                className="absolute inset-0 rounded-lg sm:rounded-xl blur-md opacity-0 group-hover:opacity-60 transition-all duration-500"
                                style={{ backgroundColor: categoryInfo.color }}
                              />
                              <div className="relative p-2 sm:p-2.5 md:p-3 bg-muted/50 rounded-lg sm:rounded-xl">
                                <img 
                                  src={skill.logo} 
                                  alt={`${skill.name} logo`}
                                  className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 transition-all duration-500 group-hover:drop-shadow-lg"
                                />
                              </div>
                            </div>
                          </div>

                          {/* Skill Name */}
                          <h4 className="text-center text-xs sm:text-sm md:text-lg font-semibold mb-2 sm:mb-3 md:mb-4 group-hover:scale-105 transition-transform duration-300">
                            {skill.name}
                          </h4>
                          
                          {/* Progress Bar */}
                          <div className="space-y-1 sm:space-y-2">
                            <div className="flex justify-between items-center text-xs sm:text-sm">
                              <span className="text-muted-foreground hidden sm:inline">Proficiência</span>
                              <span className="text-muted-foreground sm:hidden">Prof.</span>
                              <span className="font-medium">{skill.level}%</span>
                            </div>
                            <div className="relative h-1.5 sm:h-2 bg-muted/50 rounded-full overflow-hidden">
                              {/* Progress Fill */}
                              <div 
                                className="absolute top-0 left-0 h-full rounded-full transition-all duration-1500 ease-out"
                                style={{
                                  width: isVisible ? `${skill.level}%` : '0%',
                                  backgroundColor: categoryInfo.color,
                                  transitionDelay: `${800 + categoryIndex * 100 + skillIndex * 100}ms`
                                }}
                              >
                                {/* Animated shine effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;