// 🔒 SOLUÇÃO DEFINITIVA PARA META PIXEL - ANTI-DUPLICAÇÃO
declare global {
  interface Window {
    fbq: any;
    _fbq: any;
  }
}

// 🚀 FUNÇÃO DE INJEÇÃO SEGURA - EXECUTA APENAS UMA VEZ
export const injectMetaPixel = (): void => {
  // ✅ SSR check
  if (typeof window === 'undefined') {
    console.log('🚫 SSR detectado - Meta Pixel será carregado no cliente');
    return;
  }

  // ✅ Verificar se já existe
  if (window.fbq || document.getElementById('meta-pixel')) {
    console.log('🚫 Meta Pixel já carregado - evitando duplicação');
    return;
  }

  // ✅ Verificar se temos o Pixel ID
  const pixelId = import.meta.env.VITE_FACEBOOK_PIXEL_ID;
  if (!pixelId) {
    console.warn('⚠️ VITE_FACEBOOK_PIXEL_ID não configurado');
    return;
  }

  console.log('🚀 Injetando Meta Pixel - ID:', pixelId);

  // 💉 Cria o script APENAS uma vez
  const script = document.createElement('script');
  script.async = true;
  script.id = 'meta-pixel';
  script.src = 'https://connect.facebook.net/en_US/fbevents.js';
  document.head.appendChild(script);

  // 🔧 Define fbq ANTES do script carregar
  window.fbq = function () {
    window.fbq.callMethod
      ? window.fbq.callMethod.apply(window.fbq, arguments)
      : window.fbq.queue.push(arguments);
  };
  window.fbq.queue = [];
  window.fbq.loaded = true;
  window.fbq.version = '2.0';

  // 🎯 Inicializa com seu ID APENAS uma vez
  window.fbq('init', pixelId);
  window.fbq('track', 'PageView');

  console.log('✅ Meta Pixel inicializado - ID:', pixelId);
};

// 🎯 FUNÇÃO SIMPLES PARA TRACKING DE EVENTOS
export const trackMetaEvent = (eventName: string, parameters?: Record<string, any>): void => {
  if (typeof window === 'undefined' || !window.fbq) {
    console.warn('⚠️ Meta Pixel não disponível para trackear:', eventName);
    return;
  }

  try {
    if (parameters) {
      window.fbq('track', eventName, parameters);
    } else {
      window.fbq('track', eventName);
    }
    console.log('📊 Evento trackado:', eventName, parameters);
  } catch (error) {
    console.error('❌ Erro ao trackar evento:', error);
  }
};

// 🎯 FUNÇÕES ESPECÍFICAS PARA CONVERSÕES
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