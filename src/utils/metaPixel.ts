// 🔒 SOLUÇÃO DEFINITIVA PARA META PIXEL - ANTI-DUPLICAÇÃO + STRICT MODE
declare global {
  interface Window {
    fbq: any;
    _fbq: any;
    __META_PIXEL_INITIALIZED__: boolean; // 🛡️ FLAG GLOBAL DE PROTEÇÃO
  }
}

// 🚀 FUNÇÃO DE INJEÇÃO SEGURA - EXECUTA APENAS UMA VEZ (MESMO COM STRICT MODE)
export const injectMetaPixel = (): void => {
  // ✅ SSR check
  if (typeof window === 'undefined') {
    console.log('🚫 SSR detectado - Meta Pixel será carregado no cliente');
    return;
  }

  // 🛡️ PROTEÇÃO MÁXIMA: Verificar flag global primeiro
  if (window.__META_PIXEL_INITIALIZED__) {
    console.log('🚫 Meta Pixel já inicializado via flag global - evitando duplicação');
    return;
  }

  // ✅ Verificar se já existe (proteção secundária)
  if (window.fbq || document.getElementById('meta-pixel')) {
    console.log('🚫 Meta Pixel já carregado - evitando duplicação');
    window.__META_PIXEL_INITIALIZED__ = true; // Definir flag mesmo se já existir
    return;
  }

  // ✅ Verificar se temos o Pixel ID
  const pixelId = import.meta.env.VITE_FACEBOOK_PIXEL_ID;
  if (!pixelId) {
    console.warn('⚠️ VITE_FACEBOOK_PIXEL_ID não configurado');
    return;
  }

  console.log('🚀 Injetando Meta Pixel - ID:', pixelId);

  // 🛡️ DEFINIR FLAG GLOBAL ANTES DE QUALQUER COISA
  window.__META_PIXEL_INITIALIZED__ = true;

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

  console.log('✅ Meta Pixel inicializado com proteção StrictMode - ID:', pixelId);
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