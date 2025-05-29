import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// 🔝 Componente para scroll automático ao topo em mudanças de rota
export const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    // Verificar se há hash na URL (como #secao)
    if (location.hash) {
      // Se há hash, tentar navegar para o elemento
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }

    // Se não há hash ou elemento não foi encontrado, scroll to top
    // Usar requestAnimationFrame para garantir que o DOM foi atualizado
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    };

    // Primeira tentativa imediata
    requestAnimationFrame(scrollToTop);

    // Fallback para garantir (útil em navegadores lentos ou dispositivos fracos)
    const fallbackTimer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);

    // Limpeza
    return () => clearTimeout(fallbackTimer);
  }, [location.pathname, location.hash]); // Reagir a mudanças de rota E hash

  return null; // Componente não renderiza nada visualmente
}; 