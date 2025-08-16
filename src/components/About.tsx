import { useEffect, useRef, useState } from 'react';
import { Download, Award, X } from 'lucide-react';
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
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-accent/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container-custom relative z-10">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? 'animate-fade-in' : 'opacity-0'
          }`}
        >
          {/* Header Section */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {t('about.title').split(' ')[0]} <span className="text-transparent bg-gradient-to-r from-primary to-accent bg-clip-text">{t('about.title').split(' ')[1]}</span>
            </h2>
            <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed font-light max-w-3xl mx-auto">
              {t('about.subtitle')}
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
            
            {/* Left Column - Photo and Quick Info */}
            <div className="lg:col-span-1 space-y-8">
              {/* Photo */}
              <div className="relative max-w-sm mx-auto">
                <div className="relative">
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                    <img
                      src="/lovable-uploads/70635806-10e5-48bf-a5fd-066ba686f1c5.png"
                      alt="Pablo Gomes"
                      className="w-full h-auto transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-2xl -z-10 opacity-75"></div>
                </div>
              </div>

              {/* Quick Actions - Hidden on mobile */}
              <div className="hidden lg:block space-y-4">
                {/* Download CV Card */}
                <div 
                  className="bg-card border border-border rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:scale-105 hover:border-primary/30 cursor-pointer group"
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
                    <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
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
                    <div className="bg-card border border-border rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:scale-105 hover:border-accent/30 cursor-pointer group">
                      <div className="flex items-center space-x-4">
                        <div className="p-3 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
                          <Award className="w-6 h-6 text-accent" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground font-medium">{t('about.certifications')}</p>
                          <p className="font-semibold text-lg group-hover:text-accent transition-colors">📜 {t('about.courses')}</p>
                        </div>
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-card border border-accent/30">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold text-center gradient-text mb-6">
                        {t('about.certificates_modal_title')}
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-8 text-sm lg:text-base">
                      {/* Certificações Técnicas */}
                      <div>
                        <h3 className="text-xl font-semibold text-accent mb-4">{t('about.technical_certifications')}</h3>
                        <ul className="space-y-2 text-foreground/90">
                          <li>• {t('about.certifications_list.excel')}</li>
                          <li>• {t('about.certifications_list.html_css')}</li>
                          <li>• {t('about.certifications_list.git')}</li>
                          <li>• {t('about.certifications_list.mysql')}</li>
                          <li>• {t('about.certifications_list.python')}</li>
                          <li>• {t('about.certifications_list.algorithms')}</li>
                          <li>• {t('about.certifications_list.javascript')}</li>
                        </ul>
                      </div>

                      <div className="w-full h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent"></div>

                      {/* Certificações Complementares */}
                      <div>
                        <h3 className="text-xl font-semibold text-accent mb-4">{t('about.complementary_certifications')}</h3>
                        <ul className="space-y-2 text-foreground/90">
                          <li>• {t('about.certifications_list.environmental')}</li>
                          <li>• {t('about.certifications_list.industry')}</li>
                          <li>• {t('about.certifications_list.entrepreneurship')}</li>
                        </ul>
                      </div>

                      <div className="w-full h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent"></div>

                      {/* Treinamentos e Desenvolvimento Pessoal */}
                      <div>
                        <h3 className="text-xl font-semibold text-accent mb-4">{t('about.personal_development')}</h3>
                        <ul className="space-y-2 text-foreground/90">
                          <li>• {t('about.certifications_list.speaking')}</li>
                          <li>• {t('about.certifications_list.business_vision')}</li>
                          <li>• {t('about.certifications_list.creativity')}</li>
                          <li>• {t('about.certifications_list.emotional_intelligence')}</li>
                          <li>• {t('about.certifications_list.waste_elimination')}</li>
                          <li>• {t('about.certifications_list.knowledge_management')}</li>
                          <li>• {t('about.certifications_list.champions_mindset')}</li>
                          <li>• {t('about.certifications_list.organization')}</li>
                          <li>• {t('about.certifications_list.public_speaking')}</li>
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
              <div className="space-y-6">
                <div className="card-premium p-8">
                  <h3 className="text-2xl font-bold text-primary mb-4">Minha História</h3>
                  <p className="text-lg leading-relaxed text-foreground/80 mb-4">
                    {t('about.description')}
                  </p>
                  <p className="text-lg leading-relaxed text-foreground/80">
                    {t('about.journey')}
                  </p>
                </div>
                
                <div className="card-premium p-8">
                  <h3 className="text-2xl font-bold text-primary mb-4">{t('about.academic_education')}</h3>
                  <p className="text-xl font-semibold text-accent mb-2">{t('about.education_title')}</p>
                  <p className="text-lg text-primary mb-4">{t('about.education_period')}</p>
                  <p className="text-lg leading-relaxed text-foreground/80">
                    {t('about.education')}
                  </p>
                </div>

                {/* Mobile Actions - Visible only on mobile */}
                <div className="lg:hidden space-y-4">
                  {/* Download CV Card */}
                  <div 
                    className="bg-card border border-border rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:scale-105 hover:border-primary/30 cursor-pointer group"
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
                      <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
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
                      <div className="bg-card border border-border rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:scale-105 hover:border-accent/30 cursor-pointer group">
                        <div className="flex items-center space-x-4">
                          <div className="p-3 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
                            <Award className="w-6 h-6 text-accent" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground font-medium">{t('about.certifications')}</p>
                            <p className="font-semibold text-lg group-hover:text-accent transition-colors">📜 {t('about.courses')}</p>
                          </div>
                        </div>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-card border border-accent/30">
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-center gradient-text mb-6">
                          {t('about.certificates_modal_title')}
                        </DialogTitle>
                      </DialogHeader>
                      <div className="space-y-8 text-sm lg:text-base">
                        {/* Certificações Técnicas */}
                        <div>
                          <h3 className="text-xl font-semibold text-accent mb-4">{t('about.technical_certifications')}</h3>
                          <ul className="space-y-2 text-foreground/90">
                            <li>• {t('about.certifications_list.excel')}</li>
                            <li>• {t('about.certifications_list.html_css')}</li>
                            <li>• {t('about.certifications_list.git')}</li>
                            <li>• {t('about.certifications_list.mysql')}</li>
                            <li>• {t('about.certifications_list.python')}</li>
                            <li>• {t('about.certifications_list.algorithms')}</li>
                            <li>• {t('about.certifications_list.javascript')}</li>
                          </ul>
                        </div>

                        <div className="w-full h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent"></div>

                        {/* Certificações Complementares */}
                        <div>
                          <h3 className="text-xl font-semibold text-accent mb-4">{t('about.complementary_certifications')}</h3>
                          <ul className="space-y-2 text-foreground/90">
                            <li>• {t('about.certifications_list.environmental')}</li>
                            <li>• {t('about.certifications_list.industry')}</li>
                            <li>• {t('about.certifications_list.entrepreneurship')}</li>
                          </ul>
                        </div>

                        <div className="w-full h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent"></div>

                        {/* Treinamentos e Desenvolvimento Pessoal */}
                        <div>
                          <h3 className="text-xl font-semibold text-accent mb-4">{t('about.personal_development')}</h3>
                          <ul className="space-y-2 text-foreground/90">
                            <li>• {t('about.certifications_list.speaking')}</li>
                            <li>• {t('about.certifications_list.business_vision')}</li>
                            <li>• {t('about.certifications_list.creativity')}</li>
                            <li>• {t('about.certifications_list.emotional_intelligence')}</li>
                            <li>• {t('about.certifications_list.waste_elimination')}</li>
                            <li>• {t('about.certifications_list.knowledge_management')}</li>
                            <li>• {t('about.certifications_list.champions_mindset')}</li>
                            <li>• {t('about.certifications_list.organization')}</li>
                            <li>• {t('about.certifications_list.public_speaking')}</li>
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