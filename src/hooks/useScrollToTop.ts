import { useCallback } from 'react';

// 🔝 Hook para scroll manual ao topo
export const useScrollToTop = () => {
  const scrollToTop = useCallback((smooth: boolean = true) => {
    if (smooth) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  const scrollToElement = useCallback((elementId: string, smooth: boolean = true) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ 
        behavior: smooth ? 'smooth' : 'auto',
        block: 'start'
      });
    }
  }, []);

  const scrollToPosition = useCallback((top: number, smooth: boolean = true) => {
    if (smooth) {
      window.scrollTo({
        top,
        left: 0,
        behavior: 'smooth'
      });
    } else {
      window.scrollTo(0, top);
    }
  }, []);

  return {
    scrollToTop,
    scrollToElement,
    scrollToPosition
  };
}; 