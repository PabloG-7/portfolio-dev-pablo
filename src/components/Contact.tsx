import { useEffect, useRef, useState } from 'react';
import { Mail, MapPin, Send, Github, Linkedin, Instagram, MessageCircle, User, Phone } from 'lucide-react';
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
  const sectionRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
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
      color: 'text-blue-500'
    },
    {
      icon: MapPin,
      label: t('contact.info.location'),
      value: t('contact.location_value'),
      href: '#',
      color: 'text-green-500'
    },
  ];

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/PabloG-7",
      label: "GitHub",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      hoverColor: "hover:bg-purple-500/20"
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/pablo-gomes-8b574321a/",
      label: "LinkedIn",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      hoverColor: "hover:bg-blue-500/20"
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/pablogomesss__/",
      label: "Instagram",
      color: "text-pink-500",
      bgColor: "bg-pink-500/10",
      hoverColor: "hover:bg-pink-500/20"
    }
  ];

  return (
    <section
      id="contato"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
    >
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse-slow delay-2000" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary)/0.15) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        {/* Enhanced Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0'
          }`}
        >
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
            {t('contact.title').split(' ')[0]}{' '}
            <span className="text-transparent bg-gradient-to-r from-primary to-accent bg-clip-text">
              {t('contact.title').split(' ')[1]}
            </span>
          </h2>
          <p className="text-xl text-muted-foreground/80 max-w-3xl mx-auto leading-relaxed">
            {t('contact.intro_description')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Enhanced Contact Info */}
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible ? 'animate-slide-in-left opacity-100' : 'opacity-0'
            }`}
          >
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl md:text-3xl font-semibold mb-6 flex items-center gap-3">
                  <User className="w-6 h-6 text-primary" />
                  {t('contact.intro_title')}
                </h3>
                <p className="text-foreground/80 leading-relaxed mb-8 text-lg">
                  {t('contact.intro_description')}
                </p>
              </div>

              {/* Enhanced Contact Details */}
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <a
                    key={info.label}
                    href={info.href}
                    className={`flex items-center space-x-4 p-5 rounded-2xl bg-card/70 border border-border/50 backdrop-blur-sm transition-all duration-300 hover-lift hover:shadow-lg hover:border-primary/30 group ${
                      index === 0 ? 'hover:border-blue-500/30' : 'hover:border-green-500/30'
                    }`}
                  >
                    <div className={`p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-all duration-300 ${info.color}`}>
                      <info.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">{info.label}</p>
                      <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                        {info.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Enhanced Social Media */}
              <div className="pt-8 border-t border-border/50">
                <h4 className="text-lg font-semibold mb-6 flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-primary" />
                  {t('contact.social_title')}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group flex items-center gap-3 p-4 rounded-xl bg-card/70 border border-border/50 backdrop-blur-sm transition-all duration-300 hover-lift hover:shadow-lg ${social.hoverColor}`}
                    >
                      <div className={`p-2 rounded-lg ${social.bgColor} ${social.color} transition-colors`}>
                        <social.icon className="w-5 h-5" />
                      </div>
                      <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                        {social.label}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Contact Form */}
          <div
            className={`transition-all duration-1000 delay-600 ${
              isVisible ? 'animate-slide-in-right opacity-100' : 'opacity-0'
            }`}
          >
            <div className="relative bg-gradient-to-br from-card to-card/80 border border-border/50 rounded-2xl p-6 md:p-8 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-500">
              {/* Decorative elements */}
              <div className="absolute top-4 right-4 w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-accent rounded-full animate-pulse delay-1000"></div>
              
              <h3 className="text-2xl md:text-3xl font-semibold mb-6 flex items-center gap-3">
                <Send className="w-6 h-6 text-primary" />
                {t('contact.form_title')}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-foreground/80">
                      {t('contact.name')} *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-input/50 border border-border/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300 backdrop-blur-sm"
                        placeholder={t('contact.placeholders.name')}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-foreground/80">
                      {t('contact.email')} *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-input/50 border border-border/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300 backdrop-blur-sm"
                        placeholder={t('contact.placeholders.email')}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-foreground/80">
                    {t('contact.subject')} *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-input/50 border border-border/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300 backdrop-blur-sm"
                    placeholder={t('contact.placeholders.subject')}
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-foreground/80">
                    {t('contact.message')} *
                  </label>
                  <div className="relative">
                    <MessageCircle className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-input/50 border border-border/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300 resize-none backdrop-blur-sm"
                      placeholder={t('contact.placeholders.message')}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Enviando...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>{t('contact.send')}</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;