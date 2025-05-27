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

class MetaPixelService {
  private pixelId: string;
  private isInitialized: boolean = false;
  private isLoading: boolean = false;

  constructor(config: MetaPixelConfig) {
    this.pixelId = config.pixelId;
  }

  // Inicializar Meta Pixel
  init(): void {
    if (this.isInitialized || this.isLoading || !this.pixelId) {
      return;
    }

    this.isLoading = true;

    try {
      // Meta Pixel Code
      (function(f: any, b: any, e: any, v: any) {
        let n: any, t: any, s: any;
        if (f.fbq) return;
        n = f.fbq = function() {
          n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = '2.0';
        n.queue = [];
        t = b.createElement(e);
        t.async = !0;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
      })(
        window,
        document,
        'script',
        'https://connect.facebook.net/en_US/fbevents.js'
      );

      // ✅ AGUARDAR SCRIPT CARREGAR ANTES DE INICIALIZAR
      const checkFbq = () => {
        if (window.fbq && typeof window.fbq === 'function') {
          window.fbq('init', this.pixelId);
          window.fbq('track', 'PageView');
          
          this.isInitialized = true;
          this.isLoading = false;
          console.log('✅ Meta Pixel inicializado com sucesso');
        } else {
          // ✅ RETRY SE NÃO CARREGOU
          setTimeout(checkFbq, 100);
        }
      };

      // ✅ INICIAR VERIFICAÇÃO
      setTimeout(checkFbq, 50);
      
    } catch (error) {
      console.error('❌ Erro ao inicializar Meta Pixel:', error);
      this.isLoading = false;
    }
  }

  // Tracking de eventos customizados
  trackEvent(eventName: string, parameters?: Record<string, any>): void {
    if (!this.isInitialized) {
      console.warn('⚠️ Meta Pixel não inicializado - aguardando...');
      // ✅ RETRY AUTOMÁTICO
      setTimeout(() => {
        if (this.isInitialized) {
          this.trackEvent(eventName, parameters);
        }
      }, 500);
      return;
    }

    if (!window.fbq) {
      console.warn('⚠️ fbq não disponível');
      return;
    }

    try {
      if (parameters) {
        window.fbq('track', eventName, parameters);
      } else {
        window.fbq('track', eventName);
      }
      console.log(`📊 Evento trackado: ${eventName}`, parameters);
    } catch (error) {
      console.error('❌ Erro ao trackar evento:', error);
    }
  }

  // Verificar se está pronto
  isReady(): boolean {
    return this.isInitialized;
  }

  // Eventos específicos para conversões
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