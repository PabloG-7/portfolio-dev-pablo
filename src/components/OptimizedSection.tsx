import { memo, ReactNode } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface OptimizedSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  threshold?: number;
  rootMargin?: string;
}

const OptimizedSection = memo(({
  children,
  className = '',
  id,
  threshold = 0.1,
  rootMargin = '50px'
}: OptimizedSectionProps) => {
  const { elementRef, isIntersecting } = useIntersectionObserver({
    threshold,
    rootMargin,
    triggerOnce: true
  });

  return (
    <section
      ref={elementRef as React.RefObject<HTMLElement>}
      id={id}
      className={`transition-opacity duration-500 ${
        isIntersecting ? 'opacity-100' : 'opacity-0'
      } ${className}`}
    >
      {children}
    </section>
  );
});

OptimizedSection.displayName = 'OptimizedSection';

export default OptimizedSection;