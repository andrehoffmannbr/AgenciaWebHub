// 🔥 SOLUÇÃO RADICAL META PIXEL - ELIMINAÇÃO DEFINITIVA DE CONFLITOS
declare global {
  interface Window {
    fbq: any;
    _fbq: any;
    __META_PIXEL_INITIALIZED__: boolean;
    __META_PIXEL_CLEANUP_DONE__: boolean;
  }
}

// 🧹 FUNÇÃO DE LIMPEZA AGRESSIVA - REMOVE TUDO
const performMetaPixelCleanup = (): void => {
  console.log('🧹 === INICIANDO LIMPEZA AGRESSIVA META PIXEL ===');
  
  // 1. Remover todos os scripts fbevents existentes
  const existingScripts = document.querySelectorAll('script[src*="fbevents"]');
  existingScripts.forEach((script, index) => {
    const scriptElement = script as HTMLScriptElement;
    console.log(`🗑️ Removendo script fbevents ${index + 1}:`, scriptElement.src);
    script.remove();
  });
  
  // 2. Remover scripts com ID meta-pixel
  const metaScripts = document.querySelectorAll('#meta-pixel');
  metaScripts.forEach((script, index) => {
    console.log(`🗑️ Removendo script meta-pixel ${index + 1}`);
    script.remove();
  });
  
  // 3. Limpar completamente window.fbq
  if (window.fbq) {
    console.log('🗑️ Limpando window.fbq existente');
    delete window.fbq;
  }
  
  // 4. Limpar window._fbq
  if (window._fbq) {
    console.log('🗑️ Limpando window._fbq existente');
    delete window._fbq;
  }
  
  // 5. Remover outras possíveis referências (FILTRADAS)
  const safePropsToRemove = Object.keys(window).filter(key => {
    const lowerKey = key.toLowerCase();
    const isFbRelated = lowerKey.includes('fb') || 
                       lowerKey.includes('facebook') ||
                       lowerKey.includes('pixel');
    
    // NUNCA remover propriedades nativas do browser ou nossas flags
    const neverRemove = [
      'devicePixelRatio', // Propriedade nativa do browser
      '__META_PIXEL_INITIALIZED__', // Nossa flag
      '__META_PIXEL_CLEANUP_DONE__', // Nossa flag
      'fbAsyncInit', // Pode ser legítima
    ];
    
    return isFbRelated && !neverRemove.includes(key) && key !== 'fbq' && key !== '_fbq';
  });
  
  safePropsToRemove.forEach(prop => {
    console.log(`🗑️ Removendo propriedade suspeita: ${prop}`);
    delete (window as any)[prop];
  });
  
  window.__META_PIXEL_CLEANUP_DONE__ = true;
  console.log('✅ Limpeza agressiva concluída');
};

// 🔍 FUNÇÃO DE DETECÇÃO ULTRA-ROBUSTA (CORRIGIDA)
const detectExistingPixels = (): boolean => {
  console.log('🔍 === DETECÇÃO ULTRA-ROBUSTA ===');
  
  // 1. Verificar scripts no DOM
  const scripts = document.querySelectorAll('script[src*="fbevents"], script[src*="facebook"], script[id="meta-pixel"]');
  if (scripts.length > 0) {
    console.log('❌ Scripts Meta Pixel detectados no DOM:', scripts.length);
    scripts.forEach((script, i) => console.log(`   Script ${i + 1}:`, script.outerHTML));
    return true;
  }
  
  // 2. Verificar window.fbq
  if (window.fbq) {
    console.log('❌ window.fbq já existe');
    console.log('   Tipo:', typeof window.fbq);
    console.log('   Queue:', window.fbq.queue);
    console.log('   Loaded:', window.fbq.loaded);
    console.log('   Version:', window.fbq.version);
    return true;
  }
  
  // 3. Verificar window._fbq
  if (window._fbq) {
    console.log('❌ window._fbq já existe');
    return true;
  }
  
  // 4. Verificar propriedades relacionadas ao Facebook (FILTRADAS)
  const excludedProps = [
    'devicePixelRatio', // Propriedade nativa do browser
    '__META_PIXEL_INITIALIZED__', // Nossa flag de controle
    '__META_PIXEL_CLEANUP_DONE__', // Nossa flag de controle
    'fbAsyncInit', // Pode ser legítima em alguns casos
  ];
  
  const fbProps = Object.keys(window).filter(key => {
    const lowerKey = key.toLowerCase();
    const isFbRelated = lowerKey.includes('fb') || 
                       lowerKey.includes('facebook') ||
                       lowerKey.includes('pixel');
    const isExcluded = excludedProps.includes(key);
    return isFbRelated && !isExcluded;
  });
  
  if (fbProps.length > 0) {
    console.log('❌ Propriedades Facebook detectadas (após filtros):', fbProps);
    fbProps.forEach(prop => {
      console.log(`   ${prop}: ${typeof (window as any)[prop]}`);
    });
    return true;
  }
  
  console.log('✅ Nenhum pixel existente detectado (após filtros)');
  return false;
};

// 🚀 FUNÇÃO DE INJEÇÃO ULTRA-SEGURA
export const injectMetaPixel = (): void => {
  console.log('🚀 === INICIANDO INJEÇÃO ULTRA-SEGURA META PIXEL ===');
  
  // ✅ SSR check
  if (typeof window === 'undefined') {
    console.log('🚫 SSR detectado - Meta Pixel será carregado no cliente');
    return;
  }
  
  // 🛡️ Verificar flag global primeiro
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
  
  console.log(`🎯 Pixel ID configurado: ${pixelId}`);
  
  // 🧹 LIMPEZA AGRESSIVA (apenas se não foi feita)
  if (!window.__META_PIXEL_CLEANUP_DONE__) {
    performMetaPixelCleanup();
  }
  
  // 🔍 DETECÇÃO APÓS LIMPEZA
  if (detectExistingPixels()) {
    console.error('❌ ERRO: Pixels ainda detectados após limpeza!');
    return;
  }
  
  // 🛡️ DEFINIR FLAGS ANTES DE QUALQUER COISA
  window.__META_PIXEL_INITIALIZED__ = true;
  
  console.log('💉 Criando novo script Meta Pixel...');
  
  // 💉 Criar script completamente novo
  const script = document.createElement('script');
  script.async = true;
  script.id = 'meta-pixel';
  script.src = 'https://connect.facebook.net/en_US/fbevents.js';
  
  // 🔧 Definir fbq ANTES do script carregar
  window.fbq = function () {
    window.fbq.callMethod
      ? window.fbq.callMethod.apply(window.fbq, arguments)
      : window.fbq.queue.push(arguments);
  };
  window.fbq.queue = [];
  window.fbq.loaded = true;
  window.fbq.version = '2.0';
  
  // 📥 Aguardar carregamento do script
  script.onload = () => {
    console.log('✅ Script fbevents.js carregado com sucesso');
    
    // 🎯 Inicializar APENAS após script carregar
    setTimeout(() => {
      try {
        window.fbq('init', pixelId);
        window.fbq('track', 'PageView');
        console.log(`✅ Meta Pixel inicializado com sucesso - ID: ${pixelId}`);
      } catch (error) {
        console.error('❌ Erro na inicialização:', error);
      }
    }, 100); // Pequeno delay para garantir inicialização
  };
  
  script.onerror = () => {
    console.error('❌ Erro ao carregar script fbevents.js');
  };
  
  // 📄 Injetar no DOM
  document.head.appendChild(script);
  console.log('📄 Script injetado no DOM');
};

// 🎯 FUNÇÃO SIMPLES PARA TRACKING DE EVENTOS (COM VERIFICAÇÃO)
export const trackMetaEvent = (eventName: string, parameters?: Record<string, any>): void => {
  if (typeof window === 'undefined') {
    console.warn('⚠️ SSR - Meta Pixel não disponível');
    return;
  }
  
  if (!window.fbq) {
    console.warn('⚠️ Meta Pixel não inicializado para evento:', eventName);
    return;
  }
  
  if (!window.__META_PIXEL_INITIALIZED__) {
    console.warn('⚠️ Meta Pixel não foi inicializado via nosso sistema');
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

// 🔥 FUNÇÃO DE RESET MANUAL (PARA SITUAÇÕES EXTREMAS)
export const resetMetaPixel = (): void => {
  console.log('🔥 === EXECUTANDO RESET MANUAL META PIXEL ===');
  
  // Reset todas as flags
  window.__META_PIXEL_INITIALIZED__ = false;
  window.__META_PIXEL_CLEANUP_DONE__ = false;
  
  // Executar limpeza agressiva
  performMetaPixelCleanup();
  
  // Aguardar um pouco e reinicializar
  setTimeout(() => {
    console.log('🔄 Reinicializando após reset...');
    injectMetaPixel();
  }, 500);
}; 