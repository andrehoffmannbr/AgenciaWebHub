import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Components
import { CustomCursor } from './components/CustomCursor';
import { LoadingScreen } from './components/LoadingScreen';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { ScrollToTop } from './components/ScrollToTop';
// import { BackToTop } from './components/BackToTop'; // Opcional: botão voltar ao topo

// Pages
import { Home } from './pages/Home';
import { Services } from './pages/Services';
import { Projects } from './pages/Projects';
import { About } from './pages/About';
import { Contact } from './pages/Contact';

// 🔒 Meta Pixel Integration - SOLUÇÃO SIMPLES
import { injectMetaPixel } from './utils/metaPixel';
// 📊 Google Analytics Integration
import { initGoogleAnalytics } from './utils/googleAnalytics';
// 📊 Page Tracking Hook
import { usePageTracking } from './hooks/usePageTracking';

function AppContent() {
  const [isLoading, setIsLoading] = useState(true);

  // 📊 Tracking automático de páginas
  usePageTracking();

  useEffect(() => {
    // 🚀 INJETA META PIXEL APENAS UMA VEZ - SOLUÇÃO DEFINITIVA
    injectMetaPixel();
    
    // 📊 INICIALIZA GOOGLE ANALYTICS
    setTimeout(() => {
      initGoogleAnalytics();
    }, 1000); // Aguarda 1s para garantir que o gtag carregou

    // Simular carregamento inicial
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []); // Array vazio = executa APENAS uma vez

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <div className="App min-h-screen bg-dark-950 text-white custom-cursor">
      {/* Custom Cursor */}
      <CustomCursor />

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
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}

export default App; 