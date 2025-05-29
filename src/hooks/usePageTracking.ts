import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackGooglePageView } from '../utils/googleAnalytics';

// 📊 Hook para tracking automático de páginas no Google Analytics + Scroll to Top
export const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    // 🔝 SCROLL TO TOP AUTOMÁTICO
    // Scroll instantâneo para evitar conflito com o componente ScrollToTop
    window.scrollTo(0, 0);
    
    // Aguardar um pouco para garantir que o gtag está carregado
    const timer = setTimeout(() => {
      // Mapear rotas para nomes amigáveis
      const getPageTitle = (pathname: string): string => {
        const routes: Record<string, string> = {
          '/': 'Home - WebHub Agência',
          '/servicos': 'Serviços - WebHub Agência',
          '/projetos': 'Projetos - WebHub Agência',
          '/sobre': 'Sobre - WebHub Agência',
          '/contato': 'Contato - WebHub Agência'
        };
        
        return routes[pathname] || `${pathname} - WebHub Agência`;
      };

      // Trackear page view no Google Analytics
      trackGooglePageView(location.pathname, getPageTitle(location.pathname));
      
    }, 500); // Delay para garantir que o GA carregou

    return () => clearTimeout(timer);
  }, [location.pathname]);
}; 