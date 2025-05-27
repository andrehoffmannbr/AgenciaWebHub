// 🎯 META PIXEL BALANCEADO - FUNCIONAL SEM CONFLITOS
declare global {
  interface Window {
    fbq: any;
    _fbq: any;
    __META_PIXEL_INITIALIZED__: boolean;
  }
}

// 🧹 LIMPEZA PREVENTIVA (sem logs excessivos)
const preventiveCleanup = (): void => {
  // Remover apenas scripts fbevents duplicados (manter 0 para começar limpo)
  const existingScripts = document.querySelectorAll('script[src*="fbevents"]');
  if (existingScripts.length > 0) {
    existingScripts.forEach(script => script.remove());
  }
  
  // Limpar definições anteriores
  if (window.fbq) delete (window as any).fbq;
  if (window._fbq) delete (window as any)._fbq;
};

// 🚀 INJEÇÃO ÚNICA E LIMPA
export const injectMetaPixel = (): void => {
  // SSR check
  if (typeof window === 'undefined') return;
  
  // Verificar se já foi inicializado
  if (window.__META_PIXEL_INITIALIZED__) return;
  
  // Verificar Pixel ID
  const pixelId = import.meta.env.VITE_FACEBOOK_PIXEL_ID;
  if (!pixelId) {
    console.error('❌ VITE_FACEBOOK_PIXEL_ID não configurado');
    return;
  }
  
  // Limpeza preventiva
  preventiveCleanup();
  
  // Marcar como inicializado IMEDIATAMENTE
  window.__META_PIXEL_INITIALIZED__ = true;
  
  // Aguardar um momento para garantir limpeza
  setTimeout(() => {
    // Criar script único
    const script = document.createElement('script');
    script.async = true;
    script.id = 'meta-pixel-oficial';
    script.src = 'https://connect.facebook.net/en_US/fbevents.js';
    
    // Definir fbq ANTES do carregamento
    window.fbq = function () {
      window.fbq.callMethod
        ? window.fbq.callMethod.apply(window.fbq, arguments)
        : window.fbq.queue.push(arguments);
    };
    window.fbq.queue = [];
    window.fbq.loaded = true;
    window.fbq.version = '2.0';
    
    // Definir _fbq como referência para evitar conflito
    window._fbq = window.fbq;
    
    script.onload = () => {
      setTimeout(() => {
        try {
          // Verificar se fbq ainda é igual a _fbq
          if (window.fbq === window._fbq) {
            // Usar init padrão + trackSingle para garantir especificidade
            window.fbq('init', pixelId);
            window.fbq('trackSingle', pixelId, 'PageView');
          }
        } catch (error) {
          console.error('❌ Erro na inicialização do Meta Pixel:', error);
        }
      }, 100);
    };
    
    script.onerror = () => {
      console.error('❌ Erro ao carregar Meta Pixel');
    };
    
    document.head.appendChild(script);
    
  }, 50); // Delay mínimo apenas para garantir limpeza
};

// 🎯 TRACKING LIMPO
export const trackMetaEvent = (eventName: string, parameters?: Record<string, any>): void => {
  if (typeof window === 'undefined' || !window.fbq) return;
  
  const pixelId = import.meta.env.VITE_FACEBOOK_PIXEL_ID;
  if (!pixelId) return;
  
  try {
    // Usar trackSingle para especificidade
    if (parameters) {
      window.fbq('trackSingle', pixelId, eventName, parameters);
    } else {
      window.fbq('trackSingle', pixelId, eventName);
    }
  } catch (error) {
    console.error('❌ Erro ao trackar evento:', error);
  }
};

// 🎯 FUNÇÕES ESPECÍFICAS
export const trackLead = (parameters?: Record<string, any>): void => {
  trackMetaEvent('Lead', parameters);
};

export const trackContact = (): void => {
  trackMetaEvent('Contact');
};

export const trackViewContent = (contentType: string, contentId?: string): void => {
  trackMetaEvent('ViewContent', {
    content_type: contentType,
    content_ids: contentId ? [contentId] : undefined
  });
};

// 🔄 RESET SIMPLES (para debugging se necessário)
export const resetMetaPixel = (): void => {
  window.__META_PIXEL_INITIALIZED__ = false;
  preventiveCleanup();
  
  setTimeout(() => {
    injectMetaPixel();
  }, 500);
}; 