import React, { useState, useRef } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  placeholder = 'blur',
  blurDataURL,
  onLoad,
  onError,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);

  // Lazy loading com Intersection Observer
  useIntersectionObserver(
    imgRef,
    (entries) => {
      const entry = entries[0];
      if (entry?.isIntersecting && !shouldLoad) {
        setShouldLoad(true);
      }
    },
    { threshold: 0.1, rootMargin: '50px' }
  );

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  // Placeholder blur simples
  const blurPlaceholder = blurDataURL || 
    `data:image/svg+xml;base64,${btoa(`
      <svg width="${width || 400}" height="${height || 300}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#1e293b;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#0f172a;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grad)"/>
        <circle cx="50%" cy="45%" r="15" fill="#3b82f6" opacity="0.5"/>
        <rect x="25%" y="65%" width="50%" height="8" rx="4" fill="#3b82f6" opacity="0.3"/>
        <rect x="30%" y="75%" width="40%" height="6" rx="3" fill="#3b82f6" opacity="0.2"/>
      </svg>
    `)}`;

  if (hasError) {
    return (
      <div 
        className={`bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center ${className}`}
      >
        <div className="text-center text-white p-4">
          <div className="text-2xl font-bold mb-2">
            {alt.charAt(0)}
          </div>
          <div className="text-xs opacity-75">
            {alt}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`} ref={imgRef}>
      {/* Placeholder */}
      {!isLoaded && placeholder === 'blur' && (
        <img
          src={blurPlaceholder}
          alt=""
          className="absolute inset-0 w-full h-full object-cover filter blur-sm scale-105 transition-all duration-300"
          aria-hidden="true"
        />
      )}

      {/* Imagem principal */}
      {shouldLoad && (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          className={`
            w-full h-full object-cover transition-all duration-300
            ${isLoaded ? 'opacity-100' : 'opacity-0'}
            ${!isLoaded && placeholder === 'blur' ? 'scale-105' : 'scale-100'}
          `}
        />
      )}

      {/* Loading indicator */}
      {!isLoaded && shouldLoad && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-dark-800/50">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
        </div>
      )}
    </div>
  );
}; 