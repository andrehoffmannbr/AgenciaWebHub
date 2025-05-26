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

  constructor(config: MetaPixelConfig) {
    this.pixelId = config.pixelId;
  }

  // Inicializar Meta Pixel
  init(): void {
    if (this.isInitialized || !this.pixelId) {
      return;
    }

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

      window.fbq('init', this.pixelId);
      window.fbq('track', 'PageView');

      this.isInitialized = true;
      console.log('✅ Meta Pixel inicializado com sucesso');
    } catch (error) {
      console.error('❌ Erro ao inicializar Meta Pixel:', error);
    }
  }

  // Tracking de eventos customizados
  trackEvent(eventName: string, parameters?: Record<string, any>): void {
    if (!this.isInitialized) {
      console.warn('Meta Pixel não inicializado');
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
    trackEvent: (eventName: string, parameters?: Record<string, any>) => 
      metaPixel.trackEvent(eventName, parameters),
    trackLead: (parameters?: Record<string, any>) => 
      metaPixel.trackLead(parameters),
    trackContact: () => metaPixel.trackContact(),
    trackViewContent: (contentType: string, contentId?: string) => 
      metaPixel.trackViewContent(contentType, contentId)
  };
}; 