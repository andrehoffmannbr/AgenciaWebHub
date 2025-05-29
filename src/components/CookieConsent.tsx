import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, Shield, Settings } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useGoogleAnalytics } from '../utils/googleAnalytics';

interface CookieConsentProps {}

export const CookieConsent = ({}: CookieConsentProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  
  // 📊 Google Analytics Hook
  const { trackButtonClick } = useGoogleAnalytics();

  // Verificar se o usuário já deu consentimento
  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Mostrar banner após 2 segundos
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    localStorage.setItem('analytics-consent', 'true');
    localStorage.setItem('marketing-consent', 'true');
    
    trackButtonClick('Cookie_Consent', 'accept_all');
    setIsVisible(false);
  };

  const handleAcceptEssential = () => {
    localStorage.setItem('cookie-consent', 'essential-only');
    localStorage.setItem('analytics-consent', 'false');
    localStorage.setItem('marketing-consent', 'false');
    
    trackButtonClick('Cookie_Consent', 'essential_only');
    setIsVisible(false);
  };

  const handleCustomize = () => {
    setShowDetails(!showDetails);
    trackButtonClick('Cookie_Consent', 'customize');
  };

  const handleSavePreferences = () => {
    const analyticsChecked = (document.getElementById('analytics-cookies') as HTMLInputElement)?.checked || false;
    const marketingChecked = (document.getElementById('marketing-cookies') as HTMLInputElement)?.checked || false;
    
    localStorage.setItem('cookie-consent', 'customized');
    localStorage.setItem('analytics-consent', analyticsChecked.toString());
    localStorage.setItem('marketing-consent', marketingChecked.toString());
    
    trackButtonClick('Cookie_Consent', 'save_preferences');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-2xl"
        >
          <div className="max-w-7xl mx-auto p-3 md:p-4">
            {!showDetails ? (
              // Banner Principal - Versão Simplificada
              <div className="flex flex-col md:flex-row items-center gap-4">
                {/* Texto Compacto */}
                <div className="flex items-center gap-3 flex-1">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Cookie size={16} className="text-blue-600" />
                  </div>
                  
                  <div className="flex-1">
                    <p className="text-gray-900 font-medium text-sm">
                      🍪 <span className="font-semibold">Este site usa cookies.</span> Você pode escolher quais aceitar.
                    </p>
                  </div>
                </div>

                {/* Botões Compactos */}
                <div className="flex flex-wrap gap-2 justify-center">
                  <button
                    onClick={handleCustomize}
                    className="flex items-center px-3 py-1.5 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-md transition-all duration-200 text-xs font-medium"
                  >
                    <Settings size={14} className="mr-1" />
                    Personalizar
                  </button>
                  
                  <button
                    onClick={handleAcceptEssential}
                    className="px-4 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md font-medium transition-colors duration-200 text-xs"
                  >
                    Apenas Essenciais
                  </button>
                  
                  <button
                    onClick={handleAcceptAll}
                    className="px-4 py-1.5 bg-primary-500 hover:bg-primary-600 text-white rounded-md font-medium transition-colors duration-200 text-xs shadow-sm"
                  >
                    Aceitar Todos
                  </button>
                </div>
              </div>
            ) : (
              // Painel de Personalização
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Shield size={24} className="text-blue-600" />
                    <h3 className="text-gray-900 font-semibold text-xl">
                      Configurações de Privacidade
                    </h3>
                  </div>
                  <button
                    onClick={() => setShowDetails(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                    title="Fechar"
                  >
                    <X size={20} className="text-gray-600" />
                  </button>
                </div>

                {/* Categorias de Cookies */}
                <div className="space-y-4">
                  {/* Cookies Essenciais */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">Cookies Essenciais</h4>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                        Sempre Ativo
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Necessários para o funcionamento básico do site, como navegação e acesso a áreas seguras.
                    </p>
                  </div>

                  {/* Cookies de Análise */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">Cookies de Análise</h4>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          id="analytics-cookies"
                          aria-label="Ativar cookies de análise"
                          className="sr-only peer"
                          defaultChecked={false}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                      </label>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Ajudam-nos a entender como os visitantes interagem com o site coletando informações anonimamente.
                    </p>
                  </div>

                  {/* Cookies de Marketing */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">Cookies de Marketing</h4>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          id="marketing-cookies"
                          aria-label="Ativar cookies de marketing"
                          className="sr-only peer"
                          defaultChecked={false}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                      </label>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Usados para rastrear visitantes através de sites para exibir anúncios relevantes e personalizados.
                    </p>
                  </div>
                </div>

                {/* Botões de Ação */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={handleAcceptEssential}
                    className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors duration-200"
                  >
                    Apenas Essenciais
                  </button>
                  
                  <button
                    onClick={handleSavePreferences}
                    className="px-6 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium transition-colors duration-200"
                  >
                    Salvar Preferências
                  </button>
                  
                  <button
                    onClick={handleAcceptAll}
                    className="px-6 py-2 bg-secondary-500 hover:bg-secondary-600 text-white rounded-lg font-medium transition-colors duration-200"
                  >
                    Aceitar Todos
                  </button>
                </div>

                {/* Link de Política */}
                <div className="text-center pt-2">
                  <p className="text-xs text-gray-500">
                    Para mais informações, consulte nossa{' '}
                    <a href="/politica-privacidade" className="text-primary-500 hover:text-primary-600 underline">
                      Política de Privacidade
                    </a>
                  </p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}; 