// Performance utilities and optimizations

// Virtual Scrolling for large lists
export const useVirtualScrolling = (items: any[], containerHeight: number, itemHeight: number) => {
  const visibleItemsCount = Math.ceil(containerHeight / itemHeight);
  const totalItems = items.length;
  
  return {
    visibleItemsCount,
    totalItems,
    getVisibleItems: (scrollTop: number) => {
      const startIndex = Math.floor(scrollTop / itemHeight);
      const endIndex = Math.min(startIndex + visibleItemsCount, totalItems);
      return items.slice(startIndex, endIndex);
    }
  };
};

// Image preloader
export const preloadImages = (urls: string[]): Promise<void[]> => {
  return Promise.all(
    urls.map(url => 
      new Promise<void>((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = reject;
        img.src = url;
      })
    )
  );
};

// Debounce function for performance
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle function for scroll events
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Critical resource preloading
export const preloadCriticalResources = () => {
  // Preload critical fonts
  const fontUrls = [
    'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap',
    'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap'
  ];

  fontUrls.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'style';
    link.href = url;
    document.head.appendChild(link);
  });
};

// Bundle optimization - dynamic imports
export const loadComponentAsync = (componentName: string) => {
  const componentMap: Record<string, () => Promise<any>> = {
    About: () => import('../components/About'),
    Skills: () => import('../components/Skills'),
    Projects: () => import('../components/Projects'),
    Contact: () => import('../components/Contact'),
    Footer: () => import('../components/Footer'),
  };

  return componentMap[componentName]?.() || Promise.reject(`Component ${componentName} not found`);
};

// Memory leak prevention
export const createSafeEventListener = (
  element: Element | Window,
  event: string,
  handler: EventListener,
  options?: boolean | AddEventListenerOptions
) => {
  element.addEventListener(event, handler, options);
  
  return () => {
    element.removeEventListener(event, handler, options);
  };
};