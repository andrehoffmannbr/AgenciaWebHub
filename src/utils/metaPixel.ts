// 🎯 SOLUÇÃO DEFINITIVA META PIXEL - BASEADA NA IA DO CONSOLE
declare global {
  interface Window {
    fbq: any;
    _fbq: any;
    __META_PIXEL_INITIALIZED__: boolean;
    __META_PIXEL_CLEANUP_DONE__: boolean;
  }
}

// 🧹 FUNÇÃO DE LIMPEZA ESPECÍFICA PARA CONFLITOS DE VERSÃO
const performMetaPixelCleanup = (): void => {
  console.log('🧹 === LIMPEZA ESPECÍFICA PARA CONFLITOS META PIXEL ===');
  
  // 1. Remover scripts fbevents DUPLICADOS (manter apenas 1)
  const existingScripts = document.querySelectorAll('script[src*="fbevents"]');
  if (existingScripts.length > 1) {
    console.log(`🗑️ Encontrados ${existingScripts.length} scripts fbevents - removendo duplicatas`);
    existingScripts.forEach((script, index) => {
      if (index > 0) { // Manter apenas o primeiro
        const scriptElement = script as HTMLScriptElement;
        console.log(`🗑️ Removendo script duplicado ${index + 1}:`, scriptElement.src);
        script.remove();
      }
    });
  }
  
  // 2. Verificar e limpar fbq se tiver múltiplas versões
  if (window.fbq && window.fbq.version) {
    console.log(`📊 Versão atual do fbq: ${window.fbq.version}`);
    
    // Se detectar sinais de conflito de versão, resetar
    if (window.fbq.queue && window.fbq.queue.length > 10) {
      console.log('🗑️ Queue muito grande detectada - possível conflito - limpando');
      window.fbq.queue = [];
    }
  }
  
  window.__META_PIXEL_CLEANUP_DONE__ = true;
  console.log('✅ Limpeza específica concluída');
};

// 🔍 FUNÇÃO DE DETECÇÃO ESPECÍFICA PARA CONFLITOS
const detectPixelConflicts = (): boolean => {
  console.log('🔍 === DETECÇÃO DE CONFLITOS ESPECÍFICOS ===');
  
  // 1. Verificar múltiplos scripts fbevents
  const scripts = document.querySelectorAll('script[src*="fbevents"]');
  if (scripts.length > 1) {
    console.log(`❌ Múltiplos scripts fbevents detectados: ${scripts.length}`);
    return true;
  }
  
  // 2. Verificar conflitos de versão no fbq
  if (window.fbq) {
    // Verificar se há múltiplas inicializações na queue
    const initCalls = window.fbq.queue ? window.fbq.queue.filter((call: any) => call[0] === 'init') : [];
    if (initCalls.length > 1) {
      console.log(`❌ Múltiplas inicializações detectadas: ${initCalls.length}`);
      initCalls.forEach((call: any, index: number) => {
        console.log(`   Init ${index + 1}: ${call[1]}`);
      });
      return true;
    }
    
    // Verificar versão específica
    if (window.fbq.version && window.fbq.version !== '2.0') {
      console.log(`❌ Versão inesperada detectada: ${window.fbq.version}`);
      return true;
    }
  }
  
  console.log('✅ Nenhum conflito específico detectado');
  return false;
};

// 🚀 FUNÇÃO DE INJEÇÃO COM trackSingle (CONFORME SUGESTÃO DA IA)
export const injectMetaPixel = (): void => {
  console.log('🚀 === INJEÇÃO META PIXEL COM trackSingle ===');
  
  // ✅ SSR check
  if (typeof window === 'undefined') {
    console.log('🚫 SSR detectado - Meta Pixel será carregado no cliente');
    return;
  }
  
  // 🛡️ Verificar flag global
  if (window.__META_PIXEL_INITIALIZED__) {
    console.log('🚫 Meta Pixel já inicializado via flag global');
    return;
  }
  
  // ✅ Verificar Pixel ID
  const pixelId = import.meta.env.VITE_FACEBOOK_PIXEL_ID;
  if (!pixelId) {
    console.error('❌ VITE_FACEBOOK_PIXEL_ID não configurado');
    return;
  }
  
  console.log(`🎯 Pixel ID: ${pixelId}`);
  
  // 🧹 LIMPEZA ESPECÍFICA
  if (!window.__META_PIXEL_CLEANUP_DONE__) {
    performMetaPixelCleanup();
  }
  
  // 🔍 DETECÇÃO DE CONFLITOS
  if (detectPixelConflicts()) {
    console.error('❌ CONFLITOS DETECTADOS - Abortando inicialização');
    return;
  }
  
  // 🛡️ DEFINIR FLAGS
  window.__META_PIXEL_INITIALIZED__ = true;
  
  // 💉 Criar script SE NÃO EXISTIR
  let existingScript = document.querySelector('script[src*="fbevents"]');
  if (!existingScript) {
    console.log('💉 Criando script Meta Pixel...');
    
    const script = document.createElement('script');
    script.async = true;
    script.id = 'meta-pixel';
    script.src = 'https://connect.facebook.net/en_US/fbevents.js';
    
    // 🔧 Definir fbq ANTES do carregamento
    window.fbq = function () {
      window.fbq.callMethod
        ? window.fbq.callMethod.apply(window.fbq, arguments)
        : window.fbq.queue.push(arguments);
    };
    window.fbq.queue = [];
    window.fbq.loaded = true;
    window.fbq.version = '2.0';
    
    script.onload = () => {
      console.log('✅ Script Meta Pixel carregado');
      initializePixelWithTrackSingle(pixelId);
    };
    
    script.onerror = () => {
      console.error('❌ Erro ao carregar script Meta Pixel');
    };
    
    document.head.appendChild(script);
  } else {
    console.log('📊 Script Meta Pixel já existe - usando trackSingle');
    initializePixelWithTrackSingle(pixelId);
  }
};

// 🎯 INICIALIZAÇÃO COM trackSingle (SOLUÇÃO DA IA DO CONSOLE)
const initializePixelWithTrackSingle = (pixelId: string): void => {
  setTimeout(() => {
    try {
      console.log(`🎯 Inicializando Meta Pixel com trackSingle - ID: ${pixelId}`);
      
      // Usar trackSingle em vez de track genérico (CONFORME SUGESTÃO)
      window.fbq('init', pixelId);
      window.fbq('trackSingle', pixelId, 'PageView');
      
      console.log(`✅ Meta Pixel inicializado COM SUCESSO usando trackSingle - ID: ${pixelId}`);
    } catch (error) {
      console.error('❌ Erro na inicialização com trackSingle:', error);
    }
  }, 100);
};

// 🎯 TRACKING DE EVENTOS COM trackSingle (SOLUÇÃO DA IA)
export const trackMetaEvent = (eventName: string, parameters?: Record<string, any>): void => {
  if (typeof window === 'undefined') {
    console.warn('⚠️ SSR - Meta Pixel não disponível');
    return;
  }
  
  if (!window.fbq) {
    console.warn('⚠️ Meta Pixel não inicializado');
    return;
  }
  
  if (!window.__META_PIXEL_INITIALIZED__) {
    console.warn('⚠️ Meta Pixel não foi inicializado via nosso sistema');
    return;
  }
  
  const pixelId = import.meta.env.VITE_FACEBOOK_PIXEL_ID;
  if (!pixelId) {
    console.error('❌ PIXEL_ID não encontrado para tracking');
    return;
  }
  
  try {
    // USAR trackSingle EM VEZ DE track GENÉRICO (CONFORME SUGESTÃO)
    if (parameters) {
      window.fbq('trackSingle', pixelId, eventName, parameters);
    } else {
      window.fbq('trackSingle', pixelId, eventName);
    }
    console.log(`📊 Evento trackado com trackSingle: ${eventName}`, parameters);
  } catch (error) {
    console.error('❌ Erro ao trackar evento:', error);
  }
};

// 🎯 FUNÇÕES ESPECÍFICAS (USANDO trackSingle)
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

// 🔥 FUNÇÃO DE RESET MANUAL
export const resetMetaPixel = (): void => {
  console.log('🔥 === RESET MANUAL META PIXEL ===');
  
  window.__META_PIXEL_INITIALIZED__ = false;
  window.__META_PIXEL_CLEANUP_DONE__ = false;
  
  performMetaPixelCleanup();
  
  setTimeout(() => {
    console.log('🔄 Reinicializando após reset...');
    injectMetaPixel();
  }, 500);
}; 