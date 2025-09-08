import { useEffect, useRef, useState } from 'react';
import { Download, Award, X, BookOpen, GraduationCap, Brain } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { useModal } from '../contexts/ModalContext';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  const { setIsCoursesModalOpen } = useModal();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
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
      className="section-padding relative overflow-hidden"
    >
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/3 -right-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
        
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary)/0.2) 1px, transparent 0)`,
            backgroundSize: '30px 30px',
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? 'animate-fade-in' : 'opacity-0'
          }`}
        >
          {/* Enhanced Header Section */}
          <div className="text-center mb-16">
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight max-w-4xl mx-auto">
              {t('about.title').split(' ')[0]}{' '}
              <span className="text-transparent bg-gradient-to-r from-primary to-accent bg-clip-text">
                {t('about.title').split(' ')[1]}
              </span>
            </h2>
            <p className="text-xl lg:text-2xl text-muted-foreground/80 leading-relaxed font-light max-w-3xl mx-auto">
              {t('about.subtitle')}
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 items-start">
            
            {/* Left Column - Photo and Quick Info */}
            <div className="lg:col-span-1 space-y-8">
              {/* Enhanced Photo Container */}
              <div className="relative max-w-sm mx-auto group">
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                  <img
                    src="/lovable-uploads/zap-pablo.jpg"
                    alt="Pablo Gomes"
                    className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-primary/80 animate-bounce-slow" />
                <div className="absolute -bottom-2 -left-2 w-4 h-4 rounded-full bg-accent/70 animate-bounce-slow delay-500" />
              </div>

              {/* Quick Actions - Hidden on mobile */}
              <div className="hidden lg:flex flex-col gap-5">
                {/* Download CV Card */}
                <div 
                  className="relative bg-card/70 border border-border/50 rounded-2xl p-6 transition-all duration-500 hover:shadow-xl hover:scale-[1.02] hover:border-primary/40 cursor-pointer group backdrop-blur-sm overflow-hidden"
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
                  {/* Hover effect background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative flex items-center space-x-4 z-10">
                    <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300 shadow-sm">
                      <Download className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground font-medium">{t('about.download')}</p>
                      <p className="font-semibold text-lg group-hover:text-primary transition-colors duration-300">
                        📄 {t('about.my_cv')}
                      </p>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:translate-x-1">
                      <Download className="w-4 h-4 text-primary" />
                    </div>
                  </div>
                </div>

                {/* Certificates Card */}
                <Dialog onOpenChange={setIsCoursesModalOpen}>
                  <DialogTrigger asChild>
                    <div className="relative bg-card/70 border border-border/50 rounded-2xl p-6 transition-all duration-500 hover:shadow-xl hover:scale-[1.02] hover:border-accent/40 cursor-pointer group backdrop-blur-sm overflow-hidden">
                      {/* Hover effect background */}
                      <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      <div className="relative flex items-center space-x-4 z-10">
                        <div className="p-3 rounded-xl bg-accent/10 group-hover:bg-accent/20 transition-colors duration-300 shadow-sm">
                          <Award className="w-6 h-6 text-accent" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-muted-foreground font-medium">{t('about.certifications')}</p>
                          <p className="font-semibold text-lg group-hover:text-accent transition-colors duration-300">
                            📜 {t('about.courses')}
                          </p>
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:translate-x-1">
                          <Award className="w-4 h-4 text-accent" />
                        </div>
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-card/95 backdrop-blur-md border border-accent/30 rounded-2xl shadow-2xl">
                    <DialogHeader className="text-center">
                      <DialogTitle className="text-2xl md:text-3xl font-bold gradient-text mb-2">
                        {t('about.certificates_modal_title')}
                      </DialogTitle>
                      <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent rounded-full mx-auto mb-6"></div>
                    </DialogHeader>
                    <div className="space-y-8 text-sm lg:text-base">
                      {/* Certificações Técnicas */}
                      <div className="bg-gradient-to-b from-background/50 to-background/20 p-5 rounded-xl border border-primary/20">
                        <h3 className="text-xl font-semibold text-primary mb-4 flex items-center gap-2">
                          <BookOpen className="w-5 h-5" />
                          {t('about.technical_certifications')}
                        </h3>
                        <ul className="space-y-3 text-foreground/90">
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
                            <li key={index} className="flex items-start">
                              <span className="text-primary mr-2">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>

                      {/* Certificações Complementares */}
                      <div className="bg-gradient-to-b from-background/50 to-background/20 p-5 rounded-xl border border-accent/20">
                        <h3 className="text-xl font-semibold text-accent mb-4 flex items-center gap-2">
                          <GraduationCap className="w-5 h-5" />
                          {t('about.complementary_certifications')}
                        </h3>
                        <ul className="space-y-3 text-foreground/90">
                          {[
                            t('about.certifications_list.environmental'),
                            t('about.certifications_list.industry'),
                            t('about.certifications_list.entrepreneurship')
                          ].map((item, index) => (
                            <li key={index} className="flex items-start">
                              <span className="text-accent mr-2">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>

                      {/* Treinamentos e Desenvolvimento Pessoal */}
                      <div className="bg-gradient-to-b from-background/50 to-background/20 p-5 rounded-xl border border-primary/20">
                        <h3 className="text-xl font-semibold text-primary mb-4 flex items-center gap-2">
                          <Brain className="w-5 h-5" />
                          {t('about.personal_development')}
                        </h3>
                        <ul className="space-y-3 text-foreground/90">
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
                            <li key={index} className="flex items-start">
                              <span className="text-primary mr-2">•</span>
                              <span>{item}</span>
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
            <div className="lg:col-span-2 space-y-8">
              {/* Description Cards */}
              <div className="space-y-8">
                {/* História */}
                <div className="relative bg-gradient-to-br from-card to-card/80 border border-border/50 rounded-2xl p-8 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-500 group overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-3 h-3 rounded-full bg-primary animate-pulse"></div>
                      <h3 className="text-2xl font-bold text-primary">Minha História</h3>
                    </div>
                    <p className="text-lg leading-relaxed text-foreground/80 mb-4">
                      {t('about.description')}
                    </p>
                    <p className="text-lg leading-relaxed text-foreground/80">
                      {t('about.journey')}
                    </p>
                  </div>
                </div>
                
                {/* Educação */}
                <div className="relative bg-gradient-to-br from-card to-card/80 border border-border/50 rounded-2xl p-8 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-500 group overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-3 h-3 rounded-full bg-accent animate-pulse"></div>
                      <h3 className="text-2xl font-bold text-primary">{t('about.academic_education')}</h3>
                    </div>
                    <p className="text-xl font-semibold text-accent mb-2">{t('about.education_title')}</p>
                    <p className="text-lg text-primary/90 mb-4 font-medium">{t('about.education_period')}</p>
                    <p className="text-lg leading-relaxed text-foreground/80">
                      {t('about.education')}
                    </p>
                  </div>
                </div>

                {/* Mobile Actions - Visible only on mobile */}
                <div className="lg:hidden flex flex-col gap-5 mt-8">
                  {/* Download CV Card */}
                  <div 
                    className="relative bg-card/70 border border-border/50 rounded-2xl p-6 transition-all duration-500 hover:shadow-lg hover:border-primary/40 cursor-pointer group"
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
                    <div className="flex items-center space-x-4">
                      <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <Download className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground font-medium">{t('about.download')}</p>
                        <p className="font-semibold text-lg group-hover:text-primary transition-colors">📄 {t('about.my_cv')}</p>
                      </div>
                    </div>
                  </div>

                  {/* Certificates Card */}
                  <Dialog onOpenChange={setIsCoursesModalOpen}>
                    <DialogTrigger asChild>
                      <div className="relative bg-card/70 border border-border/50 rounded-2xl p-6 transition-all duration-500 hover:shadow-lg hover:border-accent/40 cursor-pointer group">
                        <div className="flex items-center space-x-4">
                          <div className="p-3 rounded-xl bg-accent/10 group-hover:bg-accent/20 transition-colors">
                            <Award className="w-6 h-6 text-accent" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground font-medium">{t('about.certifications')}</p>
                            <p className="font-semibold text-lg group-hover:text-accent transition-colors">📜 {t('about.courses')}</p>
                          </div>
                        </div>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-card/95 backdrop-blur-md border border-accent/30 rounded-2xl">
                      <DialogHeader className="text-center">
                        <DialogTitle className="text-2xl font-bold gradient-text mb-2">
                          {t('about.certificates_modal_title')}
                        </DialogTitle>
                        <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent rounded-full mx-auto mb-6"></div>
                      </DialogHeader>
                      <div className="space-y-8 text-sm lg:text-base">
                        {/* Certificações Técnicas */}
                        <div className="bg-background/50 p-5 rounded-xl border border-primary/20">
                          <h3 className="text-xl font-semibold text-primary mb-4 flex items-center gap-2">
                            <BookOpen className="w-5 h-5" />
                            {t('about.technical_certifications')}
                          </h3>
                          <ul className="space-y-2 text-foreground/90">
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
                              <li key={index} className="flex items-start">
                                <span className="text-primary mr-2">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>

                        {/* Certificações Complementares */}
                        <div className="bg-background/50 p-5 rounded-xl border border-accent/20">
                          <h3 className="text-xl font-semibold text-accent mb-4 flex items-center gap-2">
                            <GraduationCap className="w-5 h-5" />
                            {t('about.complementary_certifications')}
                          </h3>
                          <ul className="space-y-2 text-foreground/90">
                            {[
                              t('about.certifications_list.environmental'),
                              t('about.certifications_list.industry'),
                              t('about.certifications_list.entrepreneurship')
                            ].map((item, index) => (
                              <li key={index} className="flex items-start">
                                <span className="text-accent mr-2">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>

                        {/* Treinamentos e Desenvolvimento Pessoal */}
                        <div className="bg-background/50 p-5 rounded-xl border border-primary/20">
                          <h3 className="text-xl font-semibold text-primary mb-4 flex items-center gap-2">
                            <Brain className="w-5 h-5" />
                            {t('about.personal_development')}
                          </h3>
                          <ul className="space-y-2 text-foreground/90">
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
                              <li key={index} className="flex items-start">
                                <span className="text-primary mr-2">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </DialogContent>
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