import { lazy, ComponentType, LazyExoticComponent } from 'react';
import { useState, useEffect } from 'react';

// Função para criar componentes lazy com retry
export function createLazyComponent<T extends ComponentType<any>>(
  componentImporter: () => Promise<{ default: T }>,
  retries = 3
): LazyExoticComponent<T> {
  return lazy(async () => {
    let lastError: Error | null = null;
    
    for (let i = 0; i < retries; i++) {
      try {
        return await componentImporter();
      } catch (error) {
        lastError = error as Error;
        
        // Aguarda um pouco antes de tentar novamente
        if (i < retries - 1) {
          await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
        }
      }
    }
    
    throw lastError;
  });
}

// Hook para preload de componentes lazy
export function usePreloadComponent(
  componentImporter: () => Promise<any>,
  shouldPreload: boolean = false
) {
  const [isPreloaded, setIsPreloaded] = useState(false);
  const [isPreloading, setIsPreloading] = useState(false);

  const preload = async () => {
    if (isPreloaded || isPreloading) return;
    
    setIsPreloading(true);
    try {
      await componentImporter();
      setIsPreloaded(true);
    } catch (error) {
      console.warn('Falha ao fazer preload do componente:', error);
    } finally {
      setIsPreloading(false);
    }
  };

  useEffect(() => {
    if (shouldPreload) {
      preload();
    }
  }, [shouldPreload]);

  return { isPreloaded, isPreloading, preload };
}

// Hook para lazy loading baseado em visibilidade
export function useLazyLoadOnVisible(
  componentImporter: () => Promise<any>,
  options: {
    threshold?: number;
    rootMargin?: string;
    triggerOnce?: boolean;
  } = {}
) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const { threshold = 0.1, rootMargin = '50px', triggerOnce = true } = options;

  const loadComponent = async () => {
    if (isLoaded || isLoading) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      await componentImporter();
      setIsLoaded(true);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (shouldLoad) {
      loadComponent();
    }
  }, [shouldLoad]);

  const triggerLoad = () => {
    if (!triggerOnce || !isLoaded) {
      setShouldLoad(true);
    }
  };

  return {
    shouldLoad,
    isLoaded,
    isLoading,
    error,
    triggerLoad,
    intersectionObserverProps: {
      threshold,
      rootMargin,
    }
  };
}

// Função utilitária para bundle splitting baseado em rotas
export const createRouteComponent = (
  componentImporter: () => Promise<any>
) => {
  return createLazyComponent(componentImporter);
};

// Hook para monitoring de performance de lazy loading
export function useLazyLoadPerformance(componentName: string) {
  const [metrics, setMetrics] = useState<{
    startTime?: number;
    endTime?: number;
    loadTime?: number;
    cacheHit?: boolean;
  }>({});

  const startTiming = () => {
    setMetrics(prev => ({
      ...prev,
      startTime: performance.now()
    }));
  };

  const endTiming = (fromCache = false) => {
    const endTime = performance.now();
    setMetrics(prev => {
      const loadTime = prev.startTime ? endTime - prev.startTime : undefined;
      
      // Log performance metrics
      if (loadTime) {
        console.log(`[Lazy Load] ${componentName}: ${loadTime.toFixed(2)}ms${fromCache ? ' (cache)' : ''}`);
      }
      
      return {
        ...prev,
        endTime,
        loadTime,
        cacheHit: fromCache
      };
    });
  };

  return { metrics, startTiming, endTiming };
} 