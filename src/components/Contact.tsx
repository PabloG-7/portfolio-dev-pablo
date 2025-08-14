import { useEffect, useRef, useState } from 'react';
import { Mail, MapPin, Send, Github, Linkedin, Instagram } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create email body
    const emailBody = `Nome: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0AAssunto: ${formData.subject}%0D%0A%0D%0AMensagem:%0D%0A${formData.message}`;
    
    // Create mailto link
    const mailtoLink = `mailto:pablooliver853@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${emailBody}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Reset form
    setFormData({ name: '', email: '', subject: '', message: '' });
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
    },
    {
      icon: MapPin,
      label: t('contact.info.location'),
      value: t('contact.location_value'),
      href: '#',
    },
  ];


  return (
    <section
      id="contato"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'animate-fade-in-up' : 'opacity-0'
          }`}
        >
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-4">
            {t('contact.title').split(' ')[0]} <span className="gradient-text">{t('contact.title').split(' ')[1]}</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Info */}
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible ? 'animate-slide-in-left' : 'opacity-0'
            }`}
          >
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-playfair font-semibold mb-6">
                  {t('contact.intro_title')}
                </h3>
                <p className="text-foreground/80 leading-relaxed mb-8">
                  {t('contact.intro_description')}
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-6">
                {contactInfo.map((info) => (
                  <a
                    key={info.label}
                    href={info.href}
                    className="flex items-center space-x-4 p-4 rounded-2xl bg-secondary/50 hover:bg-secondary transition-all duration-300 hover-lift group"
                  >
                    <div className="p-3 rounded-xl bg-primary/20 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                      <info.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{info.label}</p>
                      <p className="font-medium">{info.value}</p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Social Media */}
              <div className="pt-8 border-t border-border/50">
                <h4 className="text-lg font-semibold mb-6">{t('contact.social_title')}</h4>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                  <a
                    href="https://github.com/PabloG-7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 p-4 rounded-xl bg-card hover:bg-card/80 border border-border/50 hover:border-primary/30 transition-all duration-300 hover-lift"
                  >
                    <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Github className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                      GitHub
                    </span>
                  </a>
                  
                  <a
                    href="https://www.linkedin.com/in/pablo-gomes-8b574321a/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 p-4 rounded-xl bg-card hover:bg-card/80 border border-border/50 hover:border-accent/30 transition-all duration-300 hover-lift"
                  >
                    <div className="p-2 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
                      <Linkedin className="w-5 h-5 text-accent" />
                    </div>
                    <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                      LinkedIn
                    </span>
                  </a>
                  
                  <a
                    href="https://www.instagram.com/pablogomesss__/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 p-4 rounded-xl bg-card hover:bg-card/80 border border-border/50 hover:border-orange/30 transition-all duration-300 hover-lift"
                  >
                    <div className="p-2 rounded-lg bg-orange/10 group-hover:bg-orange/20 transition-colors">
                      <Instagram className="w-5 h-5 text-orange" />
                    </div>
                    <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                      Instagram
                    </span>
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* Contact Form */}
          <div
            className={`transition-all duration-1000 delay-600 ${
              isVisible ? 'animate-slide-in-right' : 'opacity-0'
            }`}
          >
            <div className="card-premium p-8">
              <h3 className="text-2xl font-playfair font-semibold mb-6">
                {t('contact.form_title')}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {t('contact.name')} *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-input border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                      placeholder={t('contact.placeholders.name')}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {t('contact.email')} *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-input border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                      placeholder={t('contact.placeholders.email')}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t('contact.subject')} *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-input border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                    placeholder={t('contact.placeholders.subject')}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t('contact.message')} *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-xl bg-input border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300 resize-none"
                    placeholder={t('contact.placeholders.message')}
                  />
                </div>

                <button
                  type="submit"
                  className="btn-premium w-full hover-lift inline-flex items-center justify-center space-x-2"
                >
                  <Send className="w-5 h-5" />
                  <span>{t('contact.send')}</span>
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