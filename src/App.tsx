import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Components
import { CustomCursor } from './components/CustomCursor';
import { LoadingScreen } from './components/LoadingScreen';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';

// Pages
import { Home } from './pages/Home';
import { Services } from './pages/Services';
import { Projects } from './pages/Projects';
import { About } from './pages/About';
import { Contact } from './pages/Contact';

// Meta Pixel Integration
import { useMetaPixel } from './utils/metaPixel';

// Component para tracking de páginas
function PageTracker({ pixelReady }: { pixelReady: boolean }) {
  const location = useLocation();
  const { trackViewContent, isReady } = useMetaPixel();

  useEffect(() => {
    // ✅ DUPLA VERIFICAÇÃO: pixelReady E isReady()
    if (!pixelReady || !isReady()) {
      console.log('🔄 Aguardando pixel estar completamente pronto...');
      return;
    }
    
    // Track page views quando a rota muda
    const pageTitle = getPageTitle(location.pathname);
    trackViewContent('page', location.pathname);
    
    // Update document title
    document.title = pageTitle;
  }, [location, trackViewContent, pixelReady, isReady]);

  return null;
}

// Função para obter título da página
function getPageTitle(pathname: string): string {
  const titles: Record<string, string> = {
    '/': 'WebHub - Agência de Desenvolvimento Web',
    '/servicos': 'Serviços - WebHub Agência',
    '/projetos': 'Projetos - WebHub Agência',
    '/sobre': 'Sobre Nós - WebHub Agência',
    '/contato': 'Contato - WebHub Agência'
  };
  
  return titles[pathname] || 'WebHub - Agência de Desenvolvimento Web';
}

function AppContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [pixelReady, setPixelReady] = useState(false);
  const { init, isReady } = useMetaPixel();

  useEffect(() => {
    // 🚀 INICIALIZAÇÃO ASYNC ROBUSTA
    const initializePixel = async () => {
      if (import.meta.env.VITE_FACEBOOK_PIXEL_ID) {
        console.log('🔄 Iniciando inicialização do Meta Pixel...');
        
        try {
          await init(); // Aguardar inicialização completa
          
          // 🔄 POLLING PARA GARANTIR QUE ESTÁ REALMENTE PRONTO
          const checkReady = () => {
            if (isReady()) {
              console.log('🔒 Meta Pixel configurado com segurança');
              setPixelReady(true);
            } else {
              setTimeout(checkReady, 200);
            }
          };
          
          checkReady();
          
        } catch (error) {
          console.error('❌ Erro na inicialização do Meta Pixel:', error);
        }
      } else {
        console.warn('⚠️ VITE_FACEBOOK_PIXEL_ID não configurado');
      }
    };

    initializePixel();

    // Simular carregamento inicial
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [init, isReady]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <div className="App min-h-screen bg-dark-950 text-white custom-cursor">
      {/* Custom Cursor */}
      <CustomCursor />

      {/* ✅ Page Tracker com dupla verificação */}
      <PageTracker pixelReady={pixelReady} />

      {/* Loading Screen */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen onComplete={handleLoadingComplete} />
        )}
      </AnimatePresence>

      {/* Main Content */}
      <AnimatePresence mode="wait">
        {!isLoading && (
          <>
            {/* Header */}
            <Header />

            {/* Main Routes */}
            <main className="relative z-10">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/servicos" element={<Services />} />
                <Route path="/projetos" element={<Projects />} />
                <Route path="/sobre" element={<About />} />
                <Route path="/contato" element={<Contact />} />
              </Routes>
            </main>

            {/* Footer */}
            <Footer />

            {/* WhatsApp Button */}
            <WhatsAppButton />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App; 