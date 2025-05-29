import { useEffect, useRef } from 'react';

interface UseIntersectionObserverOptions extends IntersectionObserverInit {
  freezeOnceVisible?: boolean;
}

interface IntersectionObserverEntry {
  isIntersecting: boolean;
  target: Element;
  intersectionRatio: number;
  boundingClientRect: DOMRectReadOnly;
  intersectionRect: DOMRectReadOnly;
  rootBounds: DOMRectReadOnly | null;
  time: number;
}

export function useIntersectionObserver(
  elementRef: React.RefObject<Element>,
  callback: (entries: IntersectionObserverEntry[]) => void,
  options: UseIntersectionObserverOptions = {}
) {
  const { threshold = 0, root = null, rootMargin = '0%', freezeOnceVisible = false } = options;
  const observerRef = useRef<IntersectionObserver | null>(null);
  const hasBeenVisibleRef = useRef(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Se já foi visível e está configurado para congelar, não observa mais
    if (freezeOnceVisible && hasBeenVisibleRef.current) return;

    // Cria o observer
    const observer = new IntersectionObserver(
      (entries) => {
        // Verifica se alguma entrada está visível
        const isVisible = entries.some(entry => entry.isIntersecting);
        
        if (isVisible) {
          hasBeenVisibleRef.current = true;
          
          // Se deve congelar após ficar visível, desconecta o observer
          if (freezeOnceVisible) {
            observer.disconnect();
          }
        }

        callback(entries);
      },
      {
        threshold,
        root,
        rootMargin,
      }
    );

    observerRef.current = observer;
    observer.observe(element);

    // Cleanup
    return () => {
      observer.disconnect();
    };
  }, [elementRef, callback, threshold, root, rootMargin, freezeOnceVisible]);

  // Cleanup no unmount
  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return hasBeenVisibleRef.current;
} 