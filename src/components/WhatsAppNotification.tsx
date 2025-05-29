import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useGoogleAnalytics } from '../utils/googleAnalytics';

export const WhatsAppNotification = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  
  const whatsappNumber = "5548988430812";
  
  // 📊 Google Analytics Hook
  const { trackButtonClick, trackContact } = useGoogleAnalytics();

  // Mostrar notificação após 3 segundos, apenas se não foi dispensada
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isDismissed) {
        setIsVisible(true);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [isDismissed]);

  // Auto-ocultar após 12 segundos se não interagir
  useEffect(() => {
    if (isVisible) {
      const autoHideTimer = setTimeout(() => {
        setIsVisible(false);
      }, 12000);

      return () => clearTimeout(autoHideTimer);
    }
  }, [isVisible]);

  const handleClose = () => {
    setIsVisible(false);
    setIsDismissed(true);
    trackButtonClick('WhatsApp_Notification', 'close');
  };

  const handleClick = () => {
    trackButtonClick('WhatsApp_Notification', 'click');
    trackContact('whatsapp_notification');
    
    const whatsappUrl = `https://wa.me/${whatsappNumber}`;
    window.open(whatsappUrl, '_blank');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 25 
          }}
          className="fixed bottom-20 right-4 md:bottom-24 md:right-6 z-40 w-48 md:w-52"
        >
          {/* Notificação Clean */}
          <div 
            onClick={handleClick}
            className="bg-white rounded-lg shadow-lg border border-gray-200 p-3 relative cursor-pointer hover:shadow-xl transition-all duration-200"
          >
            {/* Botão fechar */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleClose();
              }}
              className="absolute top-1 right-1 w-5 h-5 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200 z-10"
              title="Fechar"
              aria-label="Fechar notificação"
            >
              <X size={10} className="text-gray-500" />
            </button>

            {/* Conteúdo */}
            <div className="pr-6">
              {/* Título */}
              <h4 className="text-gray-800 font-medium text-sm mb-2 leading-tight">
                Precisa de ajuda?
              </h4>
              
              {/* Texto */}
              <p className="text-gray-600 text-xs leading-relaxed mb-0">
                Fale conosco no WhatsApp e tire suas dúvidas!
              </p>
            </div>
          </div>

          {/* Ponteiro triangular */}
          <div className="absolute -bottom-1 right-6 w-3 h-3 bg-white border-r border-b border-gray-200 transform rotate-45"></div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}; 