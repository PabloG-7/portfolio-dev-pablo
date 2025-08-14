import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Register Service Worker for performance
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// Performance monitoring
if (import.meta.env.DEV) {
  import('@/hooks/usePerformanceOptimization').then(({ usePerformanceOptimization }) => {
    // Development performance monitoring
  });
}

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
