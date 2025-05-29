// 🎯 GOOGLE ANALYTICS 4 - TRACKING AVANÇADO
declare global {
  interface Window {
    gtag: any;
    dataLayer: any;
    __GA_INITIALIZED__: boolean;
  }
}

// 🚀 VERIFICAÇÃO DE INICIALIZAÇÃO
export const isGoogleAnalyticsLoaded = (): boolean => {
  return typeof window !== 'undefined' && 
         window.gtag && 
         window.dataLayer &&
         window.__GA_INITIALIZED__;
};

// 🎯 TRACKING DE EVENTOS CUSTOMIZADOS
export const trackGoogleEvent = (
  eventName: string, 
  parameters?: Record<string, any>
): void => {
  if (typeof window === 'undefined' || !window.gtag) {
    console.warn('⚠️ Google Analytics não está carregado');
    return;
  }

  try {
    if (parameters) {
      window.gtag('event', eventName, parameters);
    } else {
      window.gtag('event', eventName);
    }
    
    console.log(`📊 GA Event: ${eventName}`, parameters);
  } catch (error) {
    console.error('❌ Erro ao trackear evento Google Analytics:', error);
  }
};

// 🎯 TRACKING DE PÁGINAS (para SPAs)
export const trackGooglePageView = (
  pagePath: string, 
  pageTitle?: string
): void => {
  if (typeof window === 'undefined' || !window.gtag) return;

  try {
    window.gtag('config', 'G-4DBFKKGVCB', {
      page_path: pagePath,
      page_title: pageTitle || document.title,
    });
    
    console.log(`📊 GA PageView: ${pagePath}`);
  } catch (error) {
    console.error('❌ Erro ao trackear page view:', error);
  }
};

// 🎯 EVENTOS ESPECÍFICOS DE CONVERSÃO

// Lead Generation (Formulário de contato)
export const trackGoogleLead = (parameters?: {
  value?: number;
  currency?: string;
  content_name?: string;
  content_category?: string;
}): void => {
  trackGoogleEvent('generate_lead', {
    value: parameters?.value || 0,
    currency: parameters?.currency || 'BRL',
    content_name: parameters?.content_name || 'Contact Form',
    content_category: parameters?.content_category || 'Lead Generation',
    ...parameters
  });
};

// Contato Direto (WhatsApp, Email, etc)
export const trackGoogleContact = (method?: string): void => {
  trackGoogleEvent('contact', {
    method: method || 'form',
    content_category: 'Contact'
  });
};

// Visualização de Conteúdo
export const trackGoogleViewContent = (
  contentType: string, 
  contentId?: string,
  contentName?: string
): void => {
  trackGoogleEvent('view_item', {
    content_type: contentType,
    item_id: contentId,
    item_name: contentName || contentId,
    content_category: contentType
  });
};

// Engajamento (Scroll, Time on Page, etc)
export const trackGoogleEngagement = (
  action: string,
  parameters?: Record<string, any>
): void => {
  trackGoogleEvent('engagement', {
    engagement_action: action,
    ...parameters
  });
};

// Click em Botões Importantes
export const trackGoogleButtonClick = (
  buttonName: string,
  location?: string
): void => {
  trackGoogleEvent('click', {
    button_name: buttonName,
    button_location: location || 'unknown',
    content_category: 'Button Interaction'
  });
};

// Início de Sessão/Conversão
export const trackGoogleConversion = (
  conversionType: string,
  value?: number,
  currency: string = 'BRL'
): void => {
  trackGoogleEvent('conversion', {
    conversion_type: conversionType,
    value: value || 0,
    currency
  });
};

// Download de Materiais
export const trackGoogleDownload = (
  fileName: string,
  fileType?: string
): void => {
  trackGoogleEvent('file_download', {
    file_name: fileName,
    file_extension: fileType,
    content_category: 'Download'
  });
};

// Tempo na Página (para páginas importantes)
export const trackGoogleTimeOnPage = (
  pageName: string,
  timeInSeconds: number
): void => {
  // Só trackear se passou mais de 30 segundos
  if (timeInSeconds > 30) {
    trackGoogleEvent('timing_complete', {
      name: 'time_on_page',
      value: timeInSeconds,
      page_name: pageName,
      content_category: 'Engagement'
    });
  }
};

// Scroll Tracking
export const trackGoogleScroll = (
  percentage: number,
  pageName?: string
): void => {
  // Trackear em marcos específicos (25%, 50%, 75%, 100%)
  const milestones = [25, 50, 75, 100];
  
  if (milestones.includes(percentage)) {
    trackGoogleEvent('scroll', {
      percent_scrolled: percentage,
      page_name: pageName || window.location.pathname,
      content_category: 'Engagement'
    });
  }
};

// 🔄 HOOK PERSONALIZADO PARA REACT
export const useGoogleAnalytics = () => {
  return {
    // Eventos de Conversão
    trackLead: trackGoogleLead,
    trackContact: trackGoogleContact,
    trackConversion: trackGoogleConversion,
    
    // Eventos de Engajamento
    trackViewContent: trackGoogleViewContent,
    trackButtonClick: trackGoogleButtonClick,
    trackDownload: trackGoogleDownload,
    
    // Eventos de Comportamento
    trackPageView: trackGooglePageView,
    trackEngagement: trackGoogleEngagement,
    trackTimeOnPage: trackGoogleTimeOnPage,
    trackScroll: trackGoogleScroll,
    
    // Evento Genérico
    trackEvent: trackGoogleEvent,
    
    // Verificações
    isLoaded: isGoogleAnalyticsLoaded
  };
};

// 🎯 INICIALIZAÇÃO AUTOMÁTICA (para marcar como inicializado)
export const initGoogleAnalytics = (): void => {
  if (typeof window !== 'undefined' && window.gtag && !window.__GA_INITIALIZED__) {
    window.__GA_INITIALIZED__ = true;
    console.log('✅ Google Analytics inicializado com sucesso');
  }
}; 