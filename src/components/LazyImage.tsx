import { useState, useCallback, memo, useEffect } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  fetchPriority?: 'high' | 'low' | 'auto';
  onLoad?: () => void;
  onError?: () => void;
}

const LazyImage = memo(({ 
  src, 
  alt, 
  className = '', 
  loading = 'lazy',
  fetchPriority = 'auto',
  onLoad,
  onError
}: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [imageSrc, setImageSrc] = useState(loading === 'eager' ? src : '');

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    setHasError(true);
    onError?.();
  }, [onError]);

  // Set src immediately for eager loading, or when component mounts
  useEffect(() => {
    if (loading === 'lazy') {
      const timer = setTimeout(() => setImageSrc(src), 50);
      return () => clearTimeout(timer);
    }
  }, [src, loading]);

  if (hasError) {
    return (
      <div className={`bg-muted flex items-center justify-center ${className}`}>
        <span className="text-muted-foreground text-sm">Imagem não disponível</span>
      </div>
    );
  }

  return (
    <img
      src={imageSrc || src}
      alt={alt}
      loading={loading}
      fetchPriority={fetchPriority}
      className={`transition-opacity duration-200 ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      } ${className}`}
      onLoad={handleLoad}
      onError={handleError}
      decoding="async"
      style={{ 
        contentVisibility: 'auto',
        willChange: 'opacity'
      }}
    />
  );
});

LazyImage.displayName = 'LazyImage';

export default LazyImage;