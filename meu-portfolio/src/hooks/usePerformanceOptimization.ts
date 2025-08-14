import { useEffect, useRef } from 'react';

// Hook para otimizações de performance
export const usePerformanceOptimization = () => {
  const performanceObserver = useRef<PerformanceObserver | null>(null);

  useEffect(() => {
    // Monitor performance metrics
    if ('PerformanceObserver' in window) {
      performanceObserver.current = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          // Log performance metrics for monitoring
          if (entry.entryType === 'navigation') {
            console.log('Navigation timing:', entry);
          }
          if (entry.entryType === 'paint') {
            console.log('Paint timing:', entry.name, entry.startTime);
          }
        });
      });

      performanceObserver.current.observe({ 
        entryTypes: ['navigation', 'paint', 'largest-contentful-paint'] 
      });
    }

    // Cleanup function
    return () => {
      if (performanceObserver.current) {
        performanceObserver.current.disconnect();
      }
    };
  }, []);

  // Utility functions for optimization
  const preloadImage = (src: string) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  };

  const preloadRoute = async (routeImport: () => Promise<any>) => {
    try {
      await routeImport();
    } catch (error) {
      console.warn('Failed to preload route:', error);
    }
  };

  return {
    preloadImage,
    preloadRoute,
  };
};

// Hook para limpeza de memory leaks
export const useMemoryCleanup = () => {
  const timersRef = useRef<NodeJS.Timeout[]>([]);
  const observersRef = useRef<(IntersectionObserver | ResizeObserver | MutationObserver)[]>([]);

  const addTimer = (timer: NodeJS.Timeout) => {
    timersRef.current.push(timer);
    return timer;
  };

  const addObserver = (observer: IntersectionObserver | ResizeObserver | MutationObserver) => {
    observersRef.current.push(observer);
    return observer;
  };

  useEffect(() => {
    return () => {
      // Clean up all timers
      timersRef.current.forEach(timer => clearTimeout(timer));
      timersRef.current = [];

      // Clean up all observers
      observersRef.current.forEach(observer => observer.disconnect());
      observersRef.current = [];
    };
  }, []);

  return { addTimer, addObserver };
};