import { lazy, Suspense, useState, useEffect, memo, useCallback } from 'react';
import Navigation from '../components/Navigation';
import Hero from '../components/HeroRevamp';
import OptimizedSection from '../components/OptimizedSection';

// Lazy load components with preloading strategy
const About = lazy(() => 
  import('../components/About').then(module => {
    // Preload next component
    import('../components/Skills');
    return module;
  })
);

const Skills = lazy(() => 
  import('../components/Skills').then(module => {
    // Preload next component
    import('../components/Projects');
    return module;
  })
);

const Projects = lazy(() => 
  import('../components/Projects').then(module => {
    // Preload next component
    import('../components/Contact');
    return module;
  })
);

const Contact = lazy(() => 
  import('../components/Contact').then(module => {
    // Preload next component
    import('../components/Footer');
    return module;
  })
);

const Footer = lazy(() => import('../components/Footer'));

// Optimized loading component
const SectionLoader = memo(() => (
  <div className="h-32 flex items-center justify-center">
    <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
));
SectionLoader.displayName = 'SectionLoader';

const Index = memo(() => {
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  // Memoize the demo state change handler
  const handleDemoStateChange = useCallback((isOpen: boolean) => {
    setIsDemoOpen(isOpen);
  }, []);

  // Preload critical resources on mount
  useEffect(() => {
    // Preload About component after Hero is loaded
    const timer = setTimeout(() => {
      import('../components/About');
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {!isDemoOpen && <Navigation />}
      <main>
        <Hero />
        
        <OptimizedSection id="about" rootMargin="100px">
          <Suspense fallback={<SectionLoader />}>
            <About />
          </Suspense>
        </OptimizedSection>

        <OptimizedSection id="projects" rootMargin="100px">
          <Suspense fallback={<SectionLoader />}>
            <Projects onDemoStateChange={handleDemoStateChange} />
          </Suspense>
        </OptimizedSection>

        <OptimizedSection id="skills" rootMargin="100px">
          <Suspense fallback={<SectionLoader />}>
            <Skills />
          </Suspense>
        </OptimizedSection>

        <OptimizedSection id="contact" rootMargin="100px">
          <Suspense fallback={<SectionLoader />}>
            <Contact />
          </Suspense>
        </OptimizedSection>
      </main>
      
      <OptimizedSection rootMargin="50px">
        <Suspense fallback={<div className="h-20" />}>
          <Footer />
        </Suspense>
      </OptimizedSection>
    </div>
  );
});

Index.displayName = 'Index';

export default Index;
