import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';
import { useScrollToTop } from '../hooks/useScrollToTop';

// 🔝 Botão "Voltar ao Topo" - aparece após scroll
export const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollToTop } = useScrollToTop();

  useEffect(() => {
    const toggleVisibility = () => {
      // Mostrar botão após 300px de scroll
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Adicionar listener para scroll
    window.addEventListener('scroll', toggleVisibility, { passive: true });

    // Cleanup
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const handleClick = () => {
    scrollToTop(true); // Scroll suave
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          onClick={handleClick}
          className="fixed bottom-20 right-6 z-40 bg-primary-500 hover:bg-primary-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          title="Voltar ao topo"
          aria-label="Voltar ao topo da página"
        >
          <ChevronUp size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}; 