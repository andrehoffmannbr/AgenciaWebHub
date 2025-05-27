// 🛡️ SOLUÇÃO DEFINITIVA META PIXEL - LIMPEZA + DETECÇÃO + BLOQUEIO SIMPLES
declare global {
  interface Window {
    fbq: any;
    _fbq: any;
    __META_PIXEL_INITIALIZED__: boolean;
    __META_PIXEL_VERIFIED_UNIQUE__: boolean;
  }
}

// 🧹 FUNÇÃO DE LIMPEZA TOTAL
const performTotalCleanup = (): void => {
  console.log('🧹 === LIMPEZA TOTAL META PIXEL ===');
  
  // 1. Remover TODOS os scripts fbevents
  const allFbScripts = document.querySelectorAll('script[src*="fbevents"], script[id*="pixel"], script[id*="facebook"]');
  console.log(`🗑️ Encontrados ${allFbScripts.length} scripts relacionados ao Meta Pixel`);
  allFbScripts.forEach((script, index) => {
    console.log(`🗑️ Removendo script ${index + 1}:`, script.outerHTML.substring(0, 100));
    script.remove();
  });
  
  // 2. Remover scripts inline com fbevents
  const allScripts = document.querySelectorAll('script:not([src])');
  let inlineRemoved = 0;
  allScripts.forEach((script) => {
    if (script.innerHTML && script.innerHTML.includes('fbevents.js')) {
      console.log('🗑️ Removendo script inline com fbevents');
      script.remove();
      inlineRemoved++;
    }
  });
  console.log(`🗑️ Removidos ${inlineRemoved} scripts inline`);
  
  // 3. Remover noscript do pixel
  const noscripts = document.querySelectorAll('noscript');
  let noscriptRemoved = 0;
  noscripts.forEach((noscript) => {
    if (noscript.innerHTML && noscript.innerHTML.includes('facebook.com/tr')) {
      console.log('🗑️ Removendo noscript do pixel');
      noscript.remove();
      noscriptRemoved++;
    }
  });
  console.log(`🗑️ Removidos ${noscriptRemoved} noscripts`);
  
  // 4. Limpar window.fbq completamente
  if (window.fbq) {
    console.log('🗑️ Limpando window.fbq existente');
    delete window.fbq;
  }
  
  if (window._fbq) {
    console.log('🗑️ Limpando window._fbq existente');
    delete window._fbq;
  }
  
  console.log('✅ Limpeza total concluída');
};

// 🔍 FUNÇÃO DE VERIFICAÇÃO ÚNICA
const verifyPixelUniqueness = (): boolean => {
  console.log('🔍 === VERIFICAÇÃO DE UNICIDADE ===');
  
  // 1. Verificar scripts fbevents
  const fbScripts = document.querySelectorAll('script[src*="fbevents"]');
  if (fbScripts.length > 1) {
    console.log(`❌ Múltiplos scripts fbevents: ${fbScripts.length}`);
    return false;
  }
  
  // 2. Verificar inicializações múltiplas na queue
  if (window.fbq && window.fbq.queue) {
    const initCalls = window.fbq.queue.filter((call: any) => call[0] === 'init');
    if (initCalls.length > 1) {
      console.log(`❌ Múltiplas inicializações na queue: ${initCalls.length}`);
      return false;
    }
  }
  
  console.log('✅ Pixel único verificado');
  return true;
};

// 🚀 FUNÇÃO DE INJEÇÃO ÚNICA E DEFINITIVA
export const injectMetaPixel = (): void => {
  console.log('🚀 === INJEÇÃO ÚNICA E DEFINITIVA META PIXEL ===');
  
  // ✅ SSR check
  if (typeof window === 'undefined') {
    console.log('🚫 SSR detectado');
    return;
  }
  
  // 🛡️ Verificar se já foi inicializado
  if (window.__META_PIXEL_INITIALIZED__) {
    console.log('🚫 Meta Pixel já inicializado - BLOQUEANDO duplicação');
    return;
  }
  
  // ✅ Verificar Pixel ID
  const pixelId = import.meta.env.VITE_FACEBOOK_PIXEL_ID;
  if (!pixelId) {
    console.error('❌ VITE_FACEBOOK_PIXEL_ID não configurado');
    return;
  }
  
  console.log(`🎯 Inicializando Meta Pixel ÚNICO - ID: ${pixelId}`);
  
  // 🧹 LIMPEZA TOTAL PRIMEIRO
  performTotalCleanup();
  
  // 🛡️ DEFINIR FLAGS IMEDIATAMENTE
  window.__META_PIXEL_INITIALIZED__ = true;
  
  // ⏰ Aguardar um momento para garantir limpeza
  setTimeout(() => {
    // 💉 Criar O ÚNICO script permitido
    console.log('💉 Criando O ÚNICO script Meta Pixel...');
    
    const script = document.createElement('script');
    script.async = true;
    script.id = 'meta-pixel-unico-definitivo';
    script.src = 'https://connect.facebook.net/en_US/fbevents.js';
    
    // 🔧 Definir fbq ÚNICO
    window.fbq = function () {
      window.fbq.callMethod
        ? window.fbq.callMethod.apply(window.fbq, arguments)
        : window.fbq.queue.push(arguments);
    };
    window.fbq.queue = [];
    window.fbq.loaded = true;
    window.fbq.version = '2.0';
    
    script.onload = () => {
      console.log('✅ Script Meta Pixel ÚNICO carregado');
      
      setTimeout(() => {
        try {
          // Verificar unicidade antes de inicializar
          if (!verifyPixelUniqueness()) {
            console.error('❌ Falha na verificação de unicidade - abortando');
            return;
          }
          
          console.log(`🎯 Inicializando Meta Pixel ÚNICO - ID: ${pixelId}`);
          
          // Usar trackSingle para máxima especificidade
          window.fbq('init', pixelId);
          window.fbq('trackSingle', pixelId, 'PageView');
          
          window.__META_PIXEL_VERIFIED_UNIQUE__ = true;
          console.log(`✅ Meta Pixel ÚNICO inicializado COM SUCESSO - ID: ${pixelId}`);
          
        } catch (error) {
          console.error('❌ Erro na inicialização única:', error);
        }
      }, 200);
    };
    
    script.onerror = () => {
      console.error('❌ Erro ao carregar script Meta Pixel único');
    };
    
    document.head.appendChild(script);
    console.log('📄 Script Meta Pixel ÚNICO injetado no DOM');
    
  }, 100); // Delay para garantir limpeza
};

// 🎯 TRACKING COM VERIFICAÇÃO TRIPLA
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
  
  if (!window.__META_PIXEL_VERIFIED_UNIQUE__) {
    console.warn('⚠️ Meta Pixel não foi verificado como único');
    return;
  }
  
  const pixelId = import.meta.env.VITE_FACEBOOK_PIXEL_ID;
  if (!pixelId) {
    console.error('❌ PIXEL_ID não encontrado');
    return;
  }
  
  try {
    // SEMPRE usar trackSingle para especificidade máxima
    if (parameters) {
      window.fbq('trackSingle', pixelId, eventName, parameters);
    } else {
      window.fbq('trackSingle', pixelId, eventName);
    }
    console.log(`📊 Evento trackado via PIXEL ÚNICO VERIFICADO: ${eventName}`, parameters);
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

// 🔥 FUNÇÃO DE RESET TOTAL
export const resetMetaPixel = (): void => {
  console.log('🔥 === RESET TOTAL META PIXEL ===');
  
  window.__META_PIXEL_INITIALIZED__ = false;
  window.__META_PIXEL_VERIFIED_UNIQUE__ = false;
  
  performTotalCleanup();
  
  setTimeout(() => {
    console.log('🔄 Reinicializando pixel único...');
    injectMetaPixel();
  }, 1000);
}; 