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

// 🛡️ FUNÇÃO SEGURA PARA FBQ COM LOGS DETALHADOS
const safeFbq = (...args: any[]): void => {
  console.log(`🔍 safeFbq chamado com:`, args);
  
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    console.log(`✅ window.fbq disponível, executando:`, args);
    window.fbq(...args);
  } else {
    console.warn(`🔴 fbq ainda não está disponível. Args:`, args, `- Retry em 300ms`);
    setTimeout(() => safeFbq(...args), 300); // Retry com backoff
  }
};

// 🔄 DETECTOR DE CARREGAMENTO REAL DO SCRIPT
const waitForFbq = (): Promise<void> => {
  return new Promise((resolve) => {
    let attempts = 0;
    const maxAttempts = 50; // 5 segundos máximo
    
    const check = () => {
      attempts++;
      console.log(`🔍 Verificação ${attempts}/${maxAttempts} - window.fbq:`, typeof window.fbq);
      
      if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
        console.log('✅ window.fbq detectado - Pixel pronto para uso');
        resolve();
      } else if (attempts >= maxAttempts) {
        console.error('❌ Timeout aguardando fbq - Máximo de tentativas atingido');
        resolve(); // Resolve anyway para não travar
      } else {
        setTimeout(check, 100); // Polling até estar disponível
      }
    };
    check();
  });
};

// 🛡️ VERIFICAÇÃO ANTI-DUPLICAÇÃO EXTREMA
const preventDuplication = (): boolean => {
  // 1. Verificar se script já existe
  if (document.getElementById('meta-pixel-script')) {
    console.warn('🚫 PREVENÇÃO: Script Meta Pixel já existe (ID)');
    return false;
  }

  // 2. Verificar se window.fbq já está carregado e funcional
  if (window.fbq && window.fbq.loaded === true) {
    console.warn('🚫 PREVENÇÃO: window.fbq já carregado (loaded=true)');
    return false;
  }

  // 3. Verificar se há algum script fbevents.js já presente
  const existingScripts = document.querySelectorAll('script[src*="fbevents.js"]');
  if (existingScripts.length > 0) {
    console.warn('🚫 PREVENÇÃO: Script fbevents.js já presente na página:', existingScripts.length);
    return false;
  }

  // 4. Verificar se há versões conflitantes de fbq
  if (window.fbq && typeof window.fbq.version === 'string' && window.fbq.version !== '2.0') {
    console.warn('🚫 PREVENÇÃO: Versão conflitante de fbq detectada:', window.fbq.version);
    return false;
  }

  console.log('✅ VERIFICAÇÃO ANTI-DUPLICAÇÃO: OK para prosseguir');
  return true;
};

// 💉 INJEÇÃO CONTROLADA DO SCRIPT DO PIXEL COM PROTEÇÃO EXTREMA
const injectPixelScript = (pixelId: string): void => {
  console.log('💉 Iniciando injeção do script do pixel...');
  
  // 🛡️ VERIFICAÇÃO ANTI-DUPLICAÇÃO EXTREMA
  if (!preventDuplication()) {
    console.error('🚫 ABORTADO: Duplicação detectada - Meta Pixel NÃO será carregado');
    return;
  }

  // Criar elementos fbq APENAS se não existir
  if (!window.fbq) {
    console.log('🔧 Criando objeto window.fbq...');
    window.fbq = function() {
      window.fbq.callMethod ?
        window.fbq.callMethod.apply(window.fbq, arguments) : window.fbq.queue.push(arguments);
    };
    window.fbq.push = window.fbq;
    window.fbq.loaded = true;
    window.fbq.version = '2.0';
    window.fbq.queue = [];
  } else {
    console.log('✅ window.fbq já existe - usando existente');
  }

  // Criar e carregar script
  const script = document.createElement('script');
  script.async = true;
  script.id = 'meta-pixel-script';
  script.src = 'https://connect.facebook.net/en_US/fbevents.js';
  
  // 🎯 ONLOAD GARANTIA TOTAL
  script.onload = () => {
    console.log('📦 Script fbevents.js carregado com sucesso');
    
    // ⏰ Aguardar um frame antes de executar comandos
    requestAnimationFrame(() => {
      console.log('🚀 Executando init e PageView...');
      
      // 🔍 Verificar se o script realmente funcionou
      if (typeof window.fbq === 'function') {
        safeFbq('init', pixelId);
        safeFbq('track', 'PageView');
        console.log('✅ Init e PageView executados com sucesso');
      } else {
        console.error('❌ ERRO: Script carregado mas window.fbq não é função');
      }
    });
  };
  
  script.onerror = () => {
    console.error('❌ Erro ao carregar script fbevents.js');
  };
  
  console.log('📄 Adicionando script ao head...');
  document.head.appendChild(script);
};

class MetaPixelService {
  private pixelId: string;
  private isInitialized: boolean = false;
  private isLoading: boolean = false;

  constructor(config: MetaPixelConfig) {
    this.pixelId = config.pixelId;
    console.log('🏗️ MetaPixelService criado com pixelId:', this.pixelId);
  }

  // 🚀 INICIALIZAÇÃO ROBUSTA COM PROTEÇÃO ANTI-DUPLICAÇÃO
  async init(): Promise<void> {
    console.log('🔄 MetaPixelService.init() chamado');
    console.log('📊 Estado atual:', { 
      isInitialized: this.isInitialized, 
      isLoading: this.isLoading, 
      pixelId: this.pixelId 
    });
    
    if (this.isInitialized || this.isLoading || !this.pixelId) {
      console.log('⏭️ Pulando inicialização - condições não atendidas');
      return;
    }

    this.isLoading = true;
    console.log('🔄 Iniciando carregamento do Meta Pixel...');

    try {
      // 💉 INJETAR SCRIPT DE FORMA CONTROLADA COM PROTEÇÃO EXTREMA
      injectPixelScript(this.pixelId);
      
      // 🔄 AGUARDAR FBQ ESTAR REALMENTE DISPONÍVEL
      console.log('⏳ Aguardando fbq estar disponível...');
      await waitForFbq();
      
      this.isInitialized = true;
      this.isLoading = false;
      console.log('✅ Meta Pixel inicializado com sucesso');
      
    } catch (error) {
      console.error('❌ Erro ao inicializar Meta Pixel:', error);
      this.isLoading = false;
    }
  }

  // 🛡️ TRACKING SEGURO COM LOGS DETALHADOS
  trackEvent(eventName: string, parameters?: Record<string, any>): void {
    console.log(`🎯 trackEvent chamado:`, { eventName, parameters });
    console.log(`📊 Estado do serviço:`, { 
      isInitialized: this.isInitialized,
      isLoading: this.isLoading,
      windowFbq: typeof window.fbq
    });
    
    if (!this.isInitialized) {
      console.warn('⚠️ Meta Pixel não inicializado - aguardando...');
      // 🔄 RETRY INTELIGENTE
      setTimeout(() => {
        console.log('🔄 Retry de trackEvent após 500ms');
        if (this.isInitialized) {
          this.trackEvent(eventName, parameters);
        } else {
          console.warn('❌ Meta Pixel ainda não inicializado após retry');
        }
      }, 500);
      return;
    }

    try {
      if (parameters) {
        console.log(`📤 Enviando evento ${eventName} com parâmetros:`, parameters);
        safeFbq('track', eventName, parameters);
      } else {
        console.log(`📤 Enviando evento ${eventName} sem parâmetros`);
        safeFbq('track', eventName);
      }
      console.log(`📊 Evento trackado: ${eventName}`, parameters);
    } catch (error) {
      console.error('❌ Erro ao trackar evento:', error);
    }
  }

  // ✅ VERIFICAÇÃO REAL DE DISPONIBILIDADE
  isReady(): boolean {
    const ready = this.isInitialized && typeof window !== 'undefined' && typeof window.fbq === 'function';
    console.log(`🔍 isReady() check:`, { 
      isInitialized: this.isInitialized,
      windowExists: typeof window !== 'undefined',
      fbqExists: typeof window.fbq === 'function',
      ready 
    });
    return ready;
  }

  // 🎯 EVENTOS ESPECÍFICOS PARA CONVERSÕES
  trackLead(parameters?: Record<string, any>): void {
    console.log('🎯 trackLead chamado:', parameters);
    this.trackEvent('Lead', parameters);
  }

  trackContact(): void {
    console.log('🎯 trackContact chamado');
    this.trackEvent('Contact');
  }

  trackViewContent(contentType: string, contentId?: string): void {
    console.log('🎯 trackViewContent chamado:', { contentType, contentId });
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

console.log('🔧 Configuração Meta Pixel:', metaPixelConfig);

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