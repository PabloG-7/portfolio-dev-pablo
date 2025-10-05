import { useEffect, useRef, useState } from 'react';
import { Download, Award, BookOpen, GraduationCap, Brain, Code, Sparkles, Rocket } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { useModal } from '../contexts/ModalContext';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedItems, setAnimatedItems] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  const { setIsCoursesModalOpen } = useModal();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Anima os itens sequencialmente
          const items = [0, 1, 2, 3, 4];
          items.forEach((item, index) => {
            setTimeout(() => {
              setAnimatedItems(prev => [...prev, item]);
            }, index * 200);
          });
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: '50px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="sobre"
      ref={sectionRef}
      className="section-padding relative overflow-hidden bg-white dark:bg-slate-900"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-float-slower"></div>
        
        {/* Animated particles */}
        <div className="absolute inset-0">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-blue-400/20 rounded-full animate-float-random"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 10 + 10}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="container-custom relative z-10">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Header Section com Animação */}
          <div className="text-center mb-12 lg:mb-16">
            <div className="inline-flex items-center gap-3 mb-4 animate-bounce-gentle">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 lg:mb-6 leading-tight max-w-4xl mx-auto">
              <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-white dark:via-slate-100 dark:to-white bg-clip-text text-transparent">
                {t('about.title')}
              </span>
            </h2>
            <p className="text-lg sm:text-xl lg:text-2xl text-slate-600 dark:text-slate-300 leading-relaxed font-light max-w-3xl mx-auto px-4">
              {t('about.subtitle')}
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
            
            {/* Left Column - Photo and Quick Info */}
            <div className="lg:col-span-1 space-y-6">
              {/* Photo Container com Animação */}
              <div className={`relative max-w-sm mx-auto group transition-all duration-1000 ${
                animatedItems.includes(0) ? 'animate-scale-in' : 'opacity-0 scale-95'
              }`}>
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                  <img
                    src="/lovable-uploads/zap-pablo.jpg"
                    alt="Pablo Gomes"
                    className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Floating animation */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 animate-ping-slow"></div>
                </div>
              </div>

              {/* Quick Actions - Hidden on mobile */}
              <div className="hidden lg:flex flex-col gap-4">
                {/* Download CV Card com Animação */}
                <div 
                  className={`relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-slate-200/60 dark:border-slate-600/60 rounded-2xl p-4 lg:p-6 transition-all duration-500 hover:shadow-xl hover:scale-[1.02] hover:border-blue-500/30 cursor-pointer group overflow-hidden ${
                    animatedItems.includes(1) ? 'animate-slide-in-left' : 'opacity-0 -translate-x-8'
                  }`}
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = '/cv-pablo-gomes.pdf';
                    link.download = 'CV-Pablo-Gomes.pdf';
                    link.target = '_blank';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative flex items-center space-x-3 lg:space-x-4 z-10">
                    <div className="p-2 lg:p-3 rounded-xl bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors duration-300 shadow-sm animate-pulse-gentle">
                      <Download className="w-5 h-5 lg:w-6 lg:h-6 text-blue-500 dark:text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs lg:text-sm text-slate-500 dark:text-slate-400 font-medium">{t('about.download')}</p>
                      <p className="font-semibold text-base lg:text-lg group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-300">
                        📄 {t('about.my_cv')}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Certificates Card com Animação */}
                <Dialog onOpenChange={setIsCoursesModalOpen}>
                  <DialogTrigger asChild>
                    <div className={`relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-slate-200/60 dark:border-slate-600/60 rounded-2xl p-4 lg:p-6 transition-all duration-500 hover:shadow-xl hover:scale-[1.02] hover:border-purple-500/30 cursor-pointer group overflow-hidden ${
                      animatedItems.includes(2) ? 'animate-slide-in-left' : 'opacity-0 -translate-x-8'
                    }`} style={{ animationDelay: '100ms' }}>
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      <div className="relative flex items-center space-x-3 lg:space-x-4 z-10">
                        <div className="p-2 lg:p-3 rounded-xl bg-purple-500/10 group-hover:bg-purple-500/20 transition-colors duration-300 shadow-sm animate-pulse-gentle" style={{ animationDelay: '500ms' }}>
                          <Award className="w-5 h-5 lg:w-6 lg:h-6 text-purple-500 dark:text-purple-400" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs lg:text-sm text-slate-500 dark:text-slate-400 font-medium">{t('about.certifications')}</p>
                          <p className="font-semibold text-base lg:text-lg group-hover:text-purple-500 dark:group-hover:text-purple-400 transition-colors duration-300">
                            📜 {t('about.courses')}
                          </p>
                        </div>
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-white/95 dark:bg-slate-800/95 backdrop-blur-md border border-slate-200/60 dark:border-slate-600/60 rounded-2xl shadow-2xl">
                    <DialogHeader className="text-center">
                      <DialogTitle className="text-2xl md:text-3xl font-bold mb-2">
                        <span className="bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                          {t('about.certificates_modal_title')}
                        </span>
                      </DialogTitle>
                      <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-6"></div>
                    </DialogHeader>
                    <div className="space-y-6 lg:space-y-8 text-sm lg:text-base">
                      {/* Certificações Técnicas */}
                      <div className="bg-white/50 dark:bg-slate-700/50 p-4 lg:p-6 rounded-xl border border-slate-200/60 dark:border-slate-600/60">
                        <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3 lg:mb-4 flex items-center gap-2">
                          <BookOpen className="w-5 h-5" />
                          {t('about.technical_certifications')}
                        </h3>
                        <ul className="space-y-2 lg:space-y-3 text-slate-700 dark:text-slate-300">
                          {[
                            t('about.certifications_list.excel'),
                            t('about.certifications_list.html_css'),
                            t('about.certifications_list.git'),
                            t('about.certifications_list.mysql'),
                            t('about.certifications_list.python'),
                            t('about.certifications_list.algorithms'),
                            t('about.certifications_list.javascript'),
                            t('about.certifications_list.react')
                          ].map((item, index) => (
                            <li key={index} className="flex items-start animate-fade-in-up" style={{ animationDelay: `${index * 50}ms` }}>
                              <span className="text-blue-500 dark:text-blue-400 mr-2">•</span>
                              <span className="text-sm lg:text-base">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-300/60 dark:via-slate-600/60 to-transparent"></div>

                      {/* Certificações Complementares */}
                      <div className="bg-white/50 dark:bg-slate-700/50 p-4 lg:p-6 rounded-xl border border-slate-200/60 dark:border-slate-600/60">
                        <h3 className="text-xl font-semibold text-purple-600 dark:text-purple-400 mb-3 lg:mb-4 flex items-center gap-2">
                          <GraduationCap className="w-5 h-5" />
                          {t('about.complementary_certifications')}
                        </h3>
                        <ul className="space-y-2 lg:space-y-3 text-slate-700 dark:text-slate-300">
                          {[
                            t('about.certifications_list.environmental'),
                            t('about.certifications_list.industry'),
                            t('about.certifications_list.entrepreneurship')
                          ].map((item, index) => (
                            <li key={index} className="flex items-start animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                              <span className="text-purple-500 dark:text-purple-400 mr-2">•</span>
                              <span className="text-sm lg:text-base">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-300/60 dark:via-slate-600/60 to-transparent"></div>

                      {/* Treinamentos e Desenvolvimento Pessoal */}
                      <div className="bg-white/50 dark:bg-slate-700/50 p-4 lg:p-6 rounded-xl border border-slate-200/60 dark:border-slate-600/60">
                        <h3 className="text-xl font-semibold text-green-600 dark:text-green-400 mb-3 lg:mb-4 flex items-center gap-2">
                          <Brain className="w-5 h-5" />
                          {t('about.personal_development')}
                        </h3>
                        <ul className="space-y-2 lg:space-y-3 text-slate-700 dark:text-slate-300 grid md:grid-cols-2 gap-2">
                          {[
                            t('about.certifications_list.speaking'),
                            t('about.certifications_list.business_vision'),
                            t('about.certifications_list.creativity'),
                            t('about.certifications_list.emotional_intelligence'),
                            t('about.certifications_list.waste_elimination'),
                            t('about.certifications_list.knowledge_management'),
                            t('about.certifications_list.champions_mindset'),
                            t('about.certifications_list.organization'),
                            t('about.certifications_list.public_speaking')
                          ].map((item, index) => (
                            <li key={index} className="flex items-start animate-fade-in-up" style={{ animationDelay: `${index * 50}ms` }}>
                              <span className="text-green-500 dark:text-green-400 mr-2">•</span>
                              <span className="text-sm lg:text-base">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {/* Right Column - Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Description Cards com Animações */}
              <div className="space-y-6">
                {/* História com Animação */}
                <div className={`relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-slate-200/60 dark:border-slate-600/60 rounded-2xl p-6 lg:p-8 transition-all duration-500 group overflow-hidden ${
                  animatedItems.includes(3) ? 'animate-slide-in-right' : 'opacity-0 translate-x-8'
                }`}>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4 lg:mb-5">
                      <div className="w-2 h-2 lg:w-3 lg:h-3 rounded-full bg-blue-500 dark:text-blue-400 animate-pulse"></div>
                      <h3 className="text-xl lg:text-2xl font-bold text-slate-900 dark:text-white">Minha História</h3>
                      <Rocket className="w-5 h-5 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-bounce-gentle" />
                    </div>
                    <p className="text-base lg:text-lg leading-relaxed text-slate-700 dark:text-slate-300 mb-3 lg:mb-4">
                      {t('about.description')}
                    </p>
                    <p className="text-base lg:text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                      {t('about.journey')}
                    </p>
                  </div>
                </div>
                
                {/* Educação com Animação */}
                <div className={`relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-slate-200/60 dark:border-slate-600/60 rounded-2xl p-6 lg:p-8 transition-all duration-500 group overflow-hidden ${
                  animatedItems.includes(4) ? 'animate-slide-in-right' : 'opacity-0 translate-x-8'
                }`} style={{ animationDelay: '200ms' }}>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4 lg:mb-5">
                      <div className="w-2 h-2 lg:w-3 lg:h-3 rounded-full bg-purple-500 dark:text-purple-400 animate-pulse"></div>
                      <h3 className="text-xl lg:text-2xl font-bold text-slate-900 dark:text-white">{t('about.academic_education')}</h3>
                      <Sparkles className="w-5 h-5 text-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-sparkle" />
                    </div>
                    <p className="text-lg lg:text-xl font-semibold text-blue-600 dark:text-blue-400 mb-2">{t('about.education_title')}</p>
                    <p className="text-base lg:text-lg text-purple-600/90 dark:text-purple-400/90 mb-3 lg:mb-4 font-medium">{t('about.education_period')}</p>
                    <p className="text-base lg:text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                      {t('about.education')}
                    </p>
                  </div>
                </div>

                {/* Mobile Actions - Visible only on mobile */}
                <div className="lg:hidden flex flex-col gap-4 mt-6">
                  {/* Download CV Card */}
                  <div 
                    className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-slate-200/60 dark:border-slate-600/60 rounded-2xl p-4 transition-all duration-500 hover:shadow-lg hover:border-blue-500/30 cursor-pointer group"
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = '/cv-pablo-gomes.pdf';
                      link.download = 'CV-Pablo-Gomes.pdf';
                      link.target = '_blank';
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-xl bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
                        <Download className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{t('about.download')}</p>
                        <p className="font-semibold text-base group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">📄 {t('about.my_cv')}</p>
                      </div>
                    </div>
                  </div>

                  {/* Certificates Card */}
                  <Dialog onOpenChange={setIsCoursesModalOpen}>
                    <DialogTrigger asChild>
                      <div className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-slate-200/60 dark:border-slate-600/60 rounded-2xl p-4 transition-all duration-500 hover:shadow-lg hover:border-purple-500/30 cursor-pointer group">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 rounded-xl bg-purple-500/10 group-hover:bg-purple-500/20 transition-colors">
                            <Award className="w-5 h-5 text-purple-500 dark:text-purple-400" />
                          </div>
                          <div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{t('about.certifications')}</p>
                            <p className="font-semibold text-base group-hover:text-purple-500 dark:group-hover:text-purple-400 transition-colors">📜 {t('about.courses')}</p>
                          </div>
                        </div>
                      </div>
                    </DialogTrigger>
                  </Dialog>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;