// Performance-optimized components
export { OptimizedImage } from './OptimizedImage';

// Hooks for performance
export {
  useIntersectionObserver
} from '../hooks/useIntersectionObserver';

export {
  createLazyComponent,
  usePreloadComponent,
  useLazyLoadOnVisible,
  createRouteComponent,
  useLazyLoadPerformance
} from '../hooks/useLazyLoad';

// Re-export existing hooks
export { useCustomCursor } from '../hooks/useCustomCursor';
export { usePageTracking } from '../hooks/usePageTracking';
export { useScrollToTop } from '../hooks/useScrollToTop';
export { useTypingEffect } from '../hooks/useTypingEffect'; 