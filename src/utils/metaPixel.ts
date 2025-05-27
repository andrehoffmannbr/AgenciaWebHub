// 🔒 INTEGRAÇÃO SEGURA COM META PIXEL
declare global {
  interface Window {
    fbq: any;
    _fbq: any;
  }
}

interface MetaPixelConfig {
  pixelId: string;
}

// 🛡️ FUNÇÃO SEGURA PARA FBQ
const safeFbq = (...args: any[]): void => {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq(...args);
  } else {
    console.warn('🔴 fbq ainda não está disponível. Aguardando...');
    setTimeout(() => safeFbq(...args), 300); // Retry com backoff
  }
};

// 🔄 DETECTOR DE CARREGAMENTO REAL DO SCRIPT
const waitForFbq = (): Promise<void> => {
  return new Promise((resolve) => {
    const check = () => {
      if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
        console.log('✅ window.fbq detectado - Pixel pronto para uso');
        resolve();
      } else {
        setTimeout(check, 100); // Polling até estar disponível
      }
    };
    check();
  });
};

// 💉 INJEÇÃO CONTROLADA DO SCRIPT DO PIXEL
const injectPixelScript = (pixelId: string): void => {
  if (document.getElementById('meta-pixel-script')) return;
  
  // Criar elementos fbq antes do script
  if (!window.fbq) {
    window.fbq = function() {
      window.fbq.callMethod ?
        window.fbq.callMethod.apply(window.fbq, arguments) : window.fbq.queue.push(arguments);
    };
    window.fbq.push = window.fbq;
    window.fbq.loaded = true;
    window.fbq.version = '2.0';
    window.fbq.queue = [];
  }

  // Criar e carregar script
  const script = document.createElement('script');
  script.async = true;
  script.id = 'meta-pixel-script';
  script.src = 'https://connect.facebook.net/en_US/fbevents.js';
  
  // 🎯 ONLOAD GARANTIA TOTAL
  script.onload = () => {
    console.log('📦 Script fbevents.js carregado com sucesso');
    safeFbq('init', pixelId);
    safeFbq('track', 'PageView');
  };
  
  script.onerror = () => {
    console.error('❌ Erro ao carregar script fbevents.js');
  };
  
  document.head.appendChild(script);
};

class MetaPixelService {
  private pixelId: string;
  private isInitialized: boolean = false;
  private isLoading: boolean = false;

  constructor(config: MetaPixelConfig) {
    this.pixelId = config.pixelId;
  }

  // 🚀 INICIALIZAÇÃO ROBUSTA
  async init(): Promise<void> {
    if (this.isInitialized || this.isLoading || !this.pixelId) {
      return;
    }

    this.isLoading = true;
    console.log('🔄 Iniciando carregamento do Meta Pixel...');

    try {
      // 💉 INJETAR SCRIPT DE FORMA CONTROLADA
      injectPixelScript(this.pixelId);
      
      // 🔄 AGUARDAR FBQ ESTAR REALMENTE DISPONÍVEL
      await waitForFbq();
      
      this.isInitialized = true;
      this.isLoading = false;
      console.log('✅ Meta Pixel inicializado com sucesso');
      
    } catch (error) {
      console.error('❌ Erro ao inicializar Meta Pixel:', error);
      this.isLoading = false;
    }
  }

  // 🛡️ TRACKING SEGURO
  trackEvent(eventName: string, parameters?: Record<string, any>): void {
    if (!this.isInitialized) {
      console.warn('⚠️ Meta Pixel não inicializado - aguardando...');
      // 🔄 RETRY INTELIGENTE
      setTimeout(() => {
        if (this.isInitialized) {
          this.trackEvent(eventName, parameters);
        }
      }, 500);
      return;
    }

    try {
      if (parameters) {
        safeFbq('track', eventName, parameters);
      } else {
        safeFbq('track', eventName);
      }
      console.log(`📊 Evento trackado: ${eventName}`, parameters);
    } catch (error) {
      console.error('❌ Erro ao trackar evento:', error);
    }
  }

  // ✅ VERIFICAÇÃO REAL DE DISPONIBILIDADE
  isReady(): boolean {
    return this.isInitialized && typeof window !== 'undefined' && typeof window.fbq === 'function';
  }

  // 🎯 EVENTOS ESPECÍFICOS PARA CONVERSÕES
  trackLead(parameters?: Record<string, any>): void {
    this.trackEvent('Lead', parameters);
  }

  trackContact(): void {
    this.trackEvent('Contact');
  }

  trackViewContent(contentType: string, contentId?: string): void {
    this.trackEvent('ViewContent', {
      content_type: contentType,
      content_ids: contentId ? [contentId] : undefined
    });
  }
}

// Configuração usando variáveis de ambiente
const metaPixelConfig: MetaPixelConfig = {
  pixelId: import.meta.env.VITE_FACEBOOK_PIXEL_ID || ''
};

// Instância singleton
export const metaPixel = new MetaPixelService(metaPixelConfig);

// Hook para React
export const useMetaPixel = () => {
  return {
    init: () => metaPixel.init(),
    isReady: () => metaPixel.isReady(),
    trackEvent: (eventName: string, parameters?: Record<string, any>) => 
      metaPixel.trackEvent(eventName, parameters),
    trackLead: (parameters?: Record<string, any>) => 
      metaPixel.trackLead(parameters),
    trackContact: () => metaPixel.trackContact(),
    trackViewContent: (contentType: string, contentId?: string) => 
      metaPixel.trackViewContent(contentType, contentId)
  };
}; 