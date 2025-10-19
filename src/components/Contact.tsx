import { useEffect, useRef, useState } from 'react';
import { Mail, MapPin, Send, Github, Linkedin, Instagram, MessageCircle, User, Phone, Zap, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [animatedItems, setAnimatedItems] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Anima os itens sequencialmente
          const items = [0, 1, 2, 3, 4, 5, 6, 7];
          items.forEach((item, index) => {
            setTimeout(() => {
              setAnimatedItems(prev => [...prev, item]);
            }, index * 150);
          });
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Create email body
    const emailBody = `Nome: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0AAssunto: ${formData.subject}%0D%0A%0D%0AMensagem:%0D%0A${formData.message}`;
    
    // Create mailto link
    const mailtoLink = `mailto:pablooliver853@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${emailBody}`;
    
    // Simulate loading for better UX
    setTimeout(() => {
      // Open email client
      window.location.href = mailtoLink;
      
      // Reset form
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      label: t('contact.info.email'),
      value: 'pablooliver853@gmail.com',
      href: 'mailto:pablooliver853@gmail.com',
      color: 'text-amber-600 dark:text-amber-400',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/20'
    },
    {
      icon: MapPin,
      label: t('contact.info.location'),
      value: t('contact.location_value'),
      href: '#',
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/20'
    },
  ];

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/PabloG-7",
      label: "GitHub",
      color: "text-amber-600 dark:text-amber-400",
      bgColor: "bg-amber-500/10",
      borderColor: "border-amber-500/20",
      hoverColor: "hover:bg-amber-500/20"
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/pablo-gomes-8b574321a/",
      label: "LinkedIn",
      color: "text-orange-600 dark:text-orange-400",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/20",
      hoverColor: "hover:bg-orange-500/20"
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/pablog.dev/",
      label: "Instagram",
      color: "text-red-600 dark:text-red-400",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/20",
      hoverColor: "hover:bg-red-500/20"
    }
  ];

  return (
    <section
      id="contato"
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
              {t('contact.title')}
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed px-4">
            {t('contact.intro_description')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            {/* Intro */}
            <div className={`transition-all duration-1000 ${
              animatedItems.includes(0) ? 'animate-slide-in-left opacity-100' : 'opacity-0 -translate-x-8'
            }`}>
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl p-6 border border-amber-200/60 dark:border-amber-500/20">
                <h3 className="text-xl sm:text-2xl font-semibold mb-4 flex items-center gap-3">
                  <User className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                  {t('contact.intro_title')}
                </h3>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-base sm:text-lg">
                  {t('contact.intro_description')}
                </p>
              </div>
            </div>

            {/* Contact Details */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <a
                  key={info.label}
                  href={info.href}
                  className={`group flex items-center space-x-4 p-4 sm:p-5 rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-amber-200/60 dark:border-amber-500/20 transition-all duration-500 hover:shadow-lg hover:scale-[1.02] hover:border-amber-500/30 dark:hover:border-amber-400/30 ${
                    animatedItems.includes(index + 1) ? 'animate-slide-in-left opacity-100' : 'opacity-0 -translate-x-8'
                  }`}
                  style={{ animationDelay: `${(index + 1) * 150}ms` }}
                >
                  <div className={`p-3 rounded-xl ${info.bgColor} border ${info.borderColor} group-hover:scale-110 transition-transform duration-300`}>
                    <info.icon className={`w-5 h-5 ${info.color}`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-500 dark:text-slate-400">{info.label}</p>
                    <p className="font-medium text-slate-800 dark:text-slate-200 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                      {info.value}
                    </p>
                  </div>
                  <Sparkles className="w-4 h-4 text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-sparkle" />
                </a>
              ))}
            </div>

            {/* Social Media */}
            <div className={`pt-6 border-t border-amber-200/60 dark:border-amber-500/20 transition-all duration-1000 ${
              animatedItems.includes(3) ? 'animate-slide-in-left opacity-100' : 'opacity-0 -translate-x-8'
            }`} style={{ animationDelay: '450ms' }}>
              <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                {t('contact.social_title')}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group flex items-center gap-3 p-3 sm:p-4 rounded-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-amber-200/60 dark:border-amber-500/20 transition-all duration-500 hover:shadow-lg hover:scale-105 ${social.hoverColor} ${
                      animatedItems.includes(index + 4) ? 'animate-scale-in opacity-100' : 'opacity-0 scale-95'
                    }`}
                    style={{ animationDelay: `${(index + 4) * 150}ms` }}
                  >
                    <div className={`p-2 rounded-lg ${social.bgColor} border ${social.borderColor} group-hover:scale-110 transition-transform duration-300`}>
                      <social.icon className={`w-4 h-4 ${social.color}`} />
                    </div>
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-slate-200 transition-colors">
                      {social.label}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className={`transition-all duration-1000 ${
            animatedItems.includes(7) ? 'animate-slide-in-right opacity-100' : 'opacity-0 translate-x-8'
          }`} style={{ animationDelay: '1050ms' }}>
            <div className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-amber-200/60 dark:border-amber-500/20 rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-500">
              
              {/* Decorative elements */}
              <div className="absolute top-4 right-4 w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
              <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse delay-1000"></div>
              
              <h3 className="text-xl sm:text-2xl font-semibold mb-6 flex items-center gap-3">
                <Send className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600 dark:text-orange-400" />
                {t('contact.form_title')}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                      {t('contact.name')} *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/60 dark:bg-slate-700/60 border border-amber-200/60 dark:border-amber-500/20 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all duration-300 backdrop-blur-sm text-slate-900 dark:text-slate-100"
                        placeholder={t('contact.placeholders.name')}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                      {t('contact.email')} *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/60 dark:bg-slate-700/60 border border-amber-200/60 dark:border-amber-500/20 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all duration-300 backdrop-blur-sm text-slate-900 dark:text-slate-100"
                        placeholder={t('contact.placeholders.email')}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                    {t('contact.subject')} *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/60 dark:bg-slate-700/60 border border-amber-200/60 dark:border-amber-500/20 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all duration-300 backdrop-blur-sm text-slate-900 dark:text-slate-100"
                    placeholder={t('contact.placeholders.subject')}
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                    {t('contact.message')} *
                  </label>
                  <div className="relative">
                    <MessageCircle className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/60 dark:bg-slate-700/60 border border-amber-200/60 dark:border-amber-500/20 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all duration-300 resize-none backdrop-blur-sm text-slate-900 dark:text-slate-100"
                      placeholder={t('contact.placeholders.message')}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 sm:py-4 px-6 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-medium transition-all duration-500 hover:shadow-lg hover:shadow-amber-500/25 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 group animate-button-pulse"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span className="text-sm sm:text-base">Enviando...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1" />
                      <span className="text-sm sm:text-base">{t('contact.send')}</span>
                      <Zap className="w-4 h-4 text-yellow-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </>
                  )}
                </button>
              </form>

              {/* Success message area */}
              <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-xl text-green-700 dark:text-green-400 text-sm text-center opacity-0 transition-opacity duration-300">
                Mensagem enviada com sucesso!
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div 
          className={`text-center mt-12 lg:mt-16 transition-all duration-1000 ${
            isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '1500ms' }}
        >
        </div>
      </div>
    </section>
  );
};

export default Contact;