import { useCallback, memo } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  fetchPriority?: 'high' | 'low' | 'auto'; // 👈 já tipado
  onLoad?: () => void;
  onError?: () => void;
}

const LazyImage = memo(({ 
  src, 
  alt, 
  className = '', 
  loading = 'lazy',
  fetchPriority = 'auto', // 👈 padrão
  onLoad,
  onError
}: LazyImageProps) => {
  const handleLoad = useCallback(() => {
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    onError?.();
  }, [onError]);

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      className={className}
      onLoad={handleLoad}
      onError={handleError}
      decoding="async"
      style={{ contentVisibility: 'auto' }}
      {...{ fetchpriority: fetchPriority }} // ✅ renderiza atributo HTML correto
    />
  );
});

LazyImage.displayName = 'LazyImage';

export default LazyImage;
