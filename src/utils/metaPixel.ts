// 🚨 SOLUÇÃO ULTRA-RADICAL META PIXEL - INTERCEPTAÇÃO TOTAL E DEFINITIVA
declare global {
  interface Window {
    fbq: any;
    _fbq: any;
    __META_PIXEL_ULTRA_BLOCKED__: boolean;
    __META_PIXEL_SCRIPT_CREATED__: boolean;
    __ORIGINAL_APPEND_CHILD__: any;
    __ORIGINAL_INSERT_BEFORE__: any;
  }
}

// 🛡️ BLOQUEADOR ULTRA-RADICAL - EXECUTA IMEDIATAMENTE
const activateUltraBlocker = (): void => {
  if (window.__META_PIXEL_ULTRA_BLOCKED__) return;
  
  console.log('🛡️ === ATIVANDO BLOQUEADOR ULTRA-RADICAL ===');
  
  // 1. PRESERVAR MÉTODOS ORIGINAIS
  window.__ORIGINAL_APPEND_CHILD__ = Element.prototype.appendChild;
  window.__ORIGINAL_INSERT_BEFORE__ = Element.prototype.insertBefore;
  
  // 2. INTERCEPTAR APPENDCHILD GLOBALMENTE
  Element.prototype.appendChild = function(child: any) {
    if (child && child.nodeType === 1 && child.tagName === 'SCRIPT') {
      // Bloquear qualquer script fbevents se já temos um
      if (child.src && child.src.includes('fbevents') && window.__META_PIXEL_SCRIPT_CREATED__) {
        console.log('🚫 ULTRA-BLOQUEADO: Tentativa de appendChild script fbevents duplicado');
        console.log(`   URL bloqueada: ${child.src}`);
        console.log(`   Stack trace:`, new Error().stack);
        return child; // Retornar sem anexar
      }
      
      // Bloquear scripts inline com fbevents
      if (child.innerHTML && child.innerHTML.includes('fbevents.js') && window.__META_PIXEL_SCRIPT_CREATED__) {
        console.log('🚫 ULTRA-BLOQUEADO: Script inline fbevents duplicado');
        console.log(`   Stack trace:`, new Error().stack);
        return child;
      }
    }
    
    return window.__ORIGINAL_APPEND_CHILD__.call(this, child);
  };
  
  // 3. INTERCEPTAR INSERTBEFORE GLOBALMENTE
  Element.prototype.insertBefore = function(newNode: any, referenceNode: any) {
    if (newNode && newNode.nodeType === 1 && newNode.tagName === 'SCRIPT') {
      if (newNode.src && newNode.src.includes('fbevents') && window.__META_PIXEL_SCRIPT_CREATED__) {
        console.log('🚫 ULTRA-BLOQUEADO: Tentativa de insertBefore script fbevents duplicado');
        console.log(`   Stack trace:`, new Error().stack);
        return newNode;
      }
    }
    
    return window.__ORIGINAL_INSERT_BEFORE__.call(this, newNode, referenceNode);
  };
  
  // 4. INTERCEPTAR DEFINIÇÃO DE FBQ
  let fbqIsSet = false;
  let fbqValue: any = null;
  
  Object.defineProperty(window, 'fbq', {
    get() {
      return fbqValue;
    },
    set(value) {
      if (fbqIsSet && value !== fbqValue) {
        console.log('🚫 ULTRA-BLOQUEADO: Tentativa de redefinir window.fbq');
        console.log(`   Valor atual:`, fbqValue);
        console.log(`   Novo valor rejeitado:`, value);
        console.log(`   Stack trace:`, new Error().stack);
        return; // NÃO redefinir
      }
      fbqValue = value;
      fbqIsSet = true;
    },
    configurable: false // NÃO permitir reconfiguração
  });
  
  // 5. INTERCEPTAR DEFINIÇÃO DE _FBQ
  let _fbqIsSet = false;
  let _fbqValue: any = null;
  
  Object.defineProperty(window, '_fbq', {
    get() {
      return _fbqValue;
    },
    set(value) {
      if (_fbqIsSet && value !== _fbqValue) {
        console.log('🚫 ULTRA-BLOQUEADO: Tentativa de redefinir window._fbq');
        return;
      }
      _fbqValue = value;
      _fbqIsSet = true;
    },
    configurable: false
  });
  
  window.__META_PIXEL_ULTRA_BLOCKED__ = true;
  console.log('✅ Bloqueador ultra-radical ativado GLOBALMENTE');
};

// 🧹 LIMPEZA NUCLEAR TOTAL
const performNuclearCleanup = (): void => {
  console.log('🧹 === LIMPEZA NUCLEAR TOTAL ===');
  
  // 1. Remover TODOS os scripts relacionados ao Facebook
  const allRelatedScripts = document.querySelectorAll(`
    script[src*="fbevents"], 
    script[src*="facebook"], 
    script[src*="connect.facebook.net"],
    script[id*="pixel"], 
    script[id*="facebook"],
    script[id*="meta"]
  `);
  
  console.log(`🗑️ Encontrados ${allRelatedScripts.length} scripts relacionados - REMOVENDO TODOS`);
  allRelatedScripts.forEach((script, index) => {
    console.log(`🗑️ Removendo script ${index + 1}: ${script.outerHTML.substring(0, 150)}...`);
    script.remove();
  });
  
  // 2. Remover scripts inline suspeitos
  const allInlineScripts = document.querySelectorAll('script:not([src])');
  let inlineRemoved = 0;
  allInlineScripts.forEach((script) => {
    const content = script.innerHTML;
    if (content && (
      content.includes('fbevents.js') ||
      content.includes('facebook.com') ||
      content.includes('fbq(') ||
      content.includes('_fbq')
    )) {
      console.log(`🗑️ Removendo script inline suspeito: ${content.substring(0, 100)}...`);
      script.remove();
      inlineRemoved++;
    }
  });
  console.log(`🗑️ Removidos ${inlineRemoved} scripts inline suspeitos`);
  
  // 3. Remover todos os noscripts relacionados
  const allNoscripts = document.querySelectorAll('noscript');
  let noscriptRemoved = 0;
  allNoscripts.forEach((noscript) => {
    if (noscript.innerHTML && (
      noscript.innerHTML.includes('facebook.com/tr') ||
      noscript.innerHTML.includes('pixel')
    )) {
      console.log('🗑️ Removendo noscript relacionado ao pixel');
      noscript.remove();
      noscriptRemoved++;
    }
  });
  console.log(`🗑️ Removidos ${noscriptRemoved} noscripts`);
  
  // 4. RESETAR COMPLETAMENTE window.fbq e window._fbq
  try {
    delete (window as any).fbq;
    delete (window as any)._fbq;
    console.log('🗑️ window.fbq e window._fbq deletados');
  } catch (e) {
    console.log('⚠️ Não foi possível deletar fbq (pode estar protegido)');
  }
  
  console.log('✅ Limpeza nuclear concluída');
};

// 🚀 INJEÇÃO ÚNICA COM PROTEÇÃO MÁXIMA
export const injectMetaPixel = (): void => {
  console.log('🚀 === INJEÇÃO ÚNICA COM PROTEÇÃO MÁXIMA ===');
  
  // ✅ SSR check
  if (typeof window === 'undefined') {
    console.log('🚫 SSR detectado');
    return;
  }
  
  // 🛡️ ATIVAR BLOQUEADOR ULTRA-RADICAL PRIMEIRO
  activateUltraBlocker();
  
  // 🧹 LIMPEZA NUCLEAR
  performNuclearCleanup();
  
  // ✅ Verificar Pixel ID
  const pixelId = import.meta.env.VITE_FACEBOOK_PIXEL_ID;
  if (!pixelId) {
    console.error('❌ VITE_FACEBOOK_PIXEL_ID não configurado');
    return;
  }
  
  console.log(`🎯 Criando ÚNICO Meta Pixel protegido - ID: ${pixelId}`);
  
  // ⏰ Aguardar limpeza completa
  setTimeout(() => {
    // 🛡️ Marcar que estamos criando o script oficial
    window.__META_PIXEL_SCRIPT_CREATED__ = true;
    
    // 💉 Criar O ÚNICO script permitido
    console.log('💉 Criando O ÚNICO script Meta Pixel oficial...');
    
    const script = document.createElement('script');
    script.async = true;
    script.id = 'meta-pixel-oficial-unico';
    script.src = 'https://connect.facebook.net/en_US/fbevents.js';
    
    // 🔧 Definir fbq OFICIAL e ÚNICO
    window.fbq = function () {
      window.fbq.callMethod
        ? window.fbq.callMethod.apply(window.fbq, arguments)
        : window.fbq.queue.push(arguments);
    };
    window.fbq.queue = [];
    window.fbq.loaded = true;
    window.fbq.version = '2.0';
    
    // Também definir _fbq para compatibilidade
    window._fbq = window.fbq;
    
    script.onload = () => {
      console.log('✅ Script Meta Pixel OFICIAL carregado');
      
      setTimeout(() => {
        try {
          console.log(`🎯 Inicializando Meta Pixel OFICIAL - ID: ${pixelId}`);
          
          // Verificar se ainda temos apenas um fbq
          if (window.fbq === window._fbq) {
            console.log('✅ fbq e _fbq são idênticos - inicializando');
            
            window.fbq('init', pixelId);
            window.fbq('trackSingle', pixelId, 'PageView');
            
            console.log(`✅ Meta Pixel OFICIAL inicializado COM SUCESSO - ID: ${pixelId}`);
          } else {
            console.error('❌ Conflito detectado: fbq !== _fbq');
            console.log('fbq:', window.fbq);
            console.log('_fbq:', window._fbq);
          }
          
        } catch (error) {
          console.error('❌ Erro na inicialização oficial:', error);
        }
      }, 300);
    };
    
    script.onerror = () => {
      console.error('❌ Erro ao carregar script Meta Pixel oficial');
    };
    
    // Usar appendChild original para evitar interceptação
    document.head.appendChild(script);
    console.log('📄 Script Meta Pixel OFICIAL injetado');
    
  }, 200); // Delay maior para garantir limpeza total
};

// 🎯 TRACKING ULTRA-SEGURO
export const trackMetaEvent = (eventName: string, parameters?: Record<string, any>): void => {
  if (typeof window === 'undefined') {
    console.warn('⚠️ SSR - Meta Pixel não disponível');
    return;
  }
  
  if (!window.fbq) {
    console.warn('⚠️ Meta Pixel não inicializado');
    return;
  }
  
  if (!window.__META_PIXEL_SCRIPT_CREATED__) {
    console.warn('⚠️ Meta Pixel não foi criado pelo nosso sistema');
    return;
  }
  
  const pixelId = import.meta.env.VITE_FACEBOOK_PIXEL_ID;
  if (!pixelId) {
    console.error('❌ PIXEL_ID não encontrado');
    return;
  }
  
  try {
    // SEMPRE usar trackSingle para especificidade total
    if (parameters) {
      window.fbq('trackSingle', pixelId, eventName, parameters);
    } else {
      window.fbq('trackSingle', pixelId, eventName);
    }
    console.log(`📊 Evento trackado via PIXEL OFICIAL: ${eventName}`, parameters);
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

// 🔥 RESET NUCLEAR
export const resetMetaPixel = (): void => {
  console.log('🔥 === RESET NUCLEAR META PIXEL ===');
  
  // Restaurar métodos originais se existirem
  if (window.__ORIGINAL_APPEND_CHILD__) {
    Element.prototype.appendChild = window.__ORIGINAL_APPEND_CHILD__;
  }
  if (window.__ORIGINAL_INSERT_BEFORE__) {
    Element.prototype.insertBefore = window.__ORIGINAL_INSERT_BEFORE__;
  }
  
  window.__META_PIXEL_ULTRA_BLOCKED__ = false;
  window.__META_PIXEL_SCRIPT_CREATED__ = false;
  
  performNuclearCleanup();
  
  setTimeout(() => {
    console.log('🔄 Reinicializando pixel com proteção máxima...');
    injectMetaPixel();
  }, 1000);
}; 