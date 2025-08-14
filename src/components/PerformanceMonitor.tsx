import { useEffect } from 'react';

// Performance monitoring component (dev only)
const PerformanceMonitor = () => {
  useEffect(() => {
    if (import.meta.env.DEV) {
      // Monitor Core Web Vitals
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.entryType === 'largest-contentful-paint') {
            console.log('LCP:', entry.startTime);
          }
          if (entry.entryType === 'first-input') {
            const fidEntry = entry as any;
            console.log('FID:', fidEntry.processingStart - fidEntry.startTime);
          }
          if (entry.entryType === 'layout-shift') {
            console.log('CLS:', (entry as any).value);
          }
        });
      });

      observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });

      // Monitor bundle size
      console.log('Performance monitoring enabled');
      
      return () => observer.disconnect();
    }
  }, []);

  return null; // This component doesn't render anything
};

export default PerformanceMonitor;