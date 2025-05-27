// 🚨 SCRIPT DE DETECÇÃO ESPECÍFICA PARA CONFLITO META PIXEL

console.log('🚨 === DETECÇÃO ESPECÍFICA DE CONFLITO META PIXEL ===');

// 🔍 1. ANALISAR O ERRO ESPECÍFICO
console.log('\n🔍 1. ANÁLISE ESPECÍFICA DO ERRO:');
console.log('❌ Erro reportado: [Meta Pixel] - Multiple pixels with conflicting versions');
console.log('📍 Localização: fbevents.js:142 e fbevents.js:356');
console.log('🎯 Condição de conflito: (R && S || a.fbq !== a._fbq)');

// 🔍 2. VERIFICAR A CONDIÇÃO EXATA DO CONFLITO
console.log('\n🔍 2. VERIFICANDO CONDIÇÃO ESPECÍFICA DE CONFLITO:');
console.log(`📊 window.fbq existe: ${!!window.fbq}`);
console.log(`📊 window._fbq existe: ${!!window._fbq}`);

if (window.fbq && window._fbq) {
  console.log(`📊 window.fbq === window._fbq: ${window.fbq === window._fbq}`);
  console.log(`📊 Tipo de fbq: ${typeof window.fbq}`);
  console.log(`📊 Tipo de _fbq: ${typeof window._fbq}`);
  
  if (window.fbq !== window._fbq) {
    console.log('❌ CONFLITO DETECTADO: fbq !== _fbq');
    console.log('   fbq:', window.fbq);
    console.log('   _fbq:', window._fbq);
    
    // Comparar propriedades específicas
    if (window.fbq.version && window._fbq.version) {
      console.log(`   Versão fbq: ${window.fbq.version}`);
      console.log(`   Versão _fbq: ${window._fbq.version}`);
    }
    
    if (window.fbq.queue && window._fbq.queue) {
      console.log(`   Queue fbq: ${window.fbq.queue.length} itens`);
      console.log(`   Queue _fbq: ${window._fbq.queue.length} itens`);
    }
  } else {
    console.log('✅ fbq e _fbq são idênticos');
  }
}

// 🔍 3. VERIFICAR MÚLTIPLAS INSTÂNCIAS NA QUEUE
console.log('\n🔍 3. ANÁLISE DETALHADA DA QUEUE:');
if (window.fbq && window.fbq.queue) {
  const queue = window.fbq.queue;
  console.log(`📊 Total de itens na queue: ${queue.length}`);
  
  // Contar tipos de chamadas
  const callTypes = {};
  queue.forEach(call => {
    const type = call[0];
    callTypes[type] = (callTypes[type] || 0) + 1;
  });
  
  console.log('📋 Resumo de tipos de chamadas:');
  Object.entries(callTypes).forEach(([type, count]) => {
    console.log(`   ${type}: ${count} chamada(s)`);
  });
  
  // Analisar especificamente os inits
  const initCalls = queue.filter(call => call[0] === 'init');
  if (initCalls.length > 1) {
    console.log('❌ MÚLTIPLAS INICIALIZAÇÕES DETECTADAS:');
    initCalls.forEach((call, index) => {
      console.log(`   Init ${index + 1}: Pixel ID ${call[1]}`);
    });
  } else if (initCalls.length === 1) {
    console.log(`✅ Apenas 1 inicialização: Pixel ID ${initCalls[0][1]}`);
  } else {
    console.log('⚠️ Nenhuma inicialização encontrada na queue');
  }
}

// 🔍 4. DETECTAR SCRIPTS FBEVENTS ATIVOS
console.log('\n🔍 4. SCRIPTS FBEVENTS ATIVOS:');
const fbeventsScripts = document.querySelectorAll('script[src*="fbevents"]');
console.log(`📊 Quantidade de scripts fbevents: ${fbeventsScripts.length}`);

if (fbeventsScripts.length > 1) {
  console.log('❌ MÚLTIPLOS SCRIPTS FBEVENTS DETECTADOS:');
  fbeventsScripts.forEach((script, index) => {
    console.log(`   Script ${index + 1}:`);
    console.log(`     URL: ${script.src}`);
    console.log(`     ID: ${script.id || 'sem ID'}`);
    console.log(`     Carregado: ${script.readyState || 'unknown'}`);
  });
} else if (fbeventsScripts.length === 1) {
  const script = fbeventsScripts[0];
  console.log('✅ Apenas 1 script fbevents encontrado:');
  console.log(`   URL: ${script.src}`);
  console.log(`   ID: ${script.id || 'sem ID'}`);
  console.log(`   Carregado: ${script.readyState || 'unknown'}`);
}

// 🔍 5. VERIFICAR PROPRIEDADES ESPECÍFICAS QUE CAUSAM CONFLITO
console.log('\n🔍 5. PROPRIEDADES ESPECÍFICAS DE CONFLITO:');

// Propriedades que o fbevents.js verifica para detectar conflitos
const conflictProps = [
  'fbq',
  '_fbq', 
  'fbAsyncInit',
  '__fbeventsModules',
  '__fbeventsResolvedModules'
];

conflictProps.forEach(prop => {
  const exists = window[prop] !== undefined;
  console.log(`📊 window.${prop}: ${exists ? 'existe' : 'não existe'}`);
  if (exists) {
    console.log(`   Tipo: ${typeof window[prop]}`);
    if (prop === 'fbq' || prop === '_fbq') {
      const obj = window[prop];
      if (obj && typeof obj === 'function') {
        console.log(`   .loaded: ${obj.loaded}`);
        console.log(`   .version: ${obj.version}`);
        console.log(`   .queue: ${obj.queue ? obj.queue.length + ' itens' : 'não existe'}`);
      }
    }
  }
});

// 🔍 6. VERIFICAR REDEFINIÇÕES DINÂMICAS
console.log('\n🔍 6. MONITORAMENTO DE REDEFINIÇÕES:');

// Monitorar tentativas de redefinição
let fbqRedefinitions = 0;
let _fbqRedefinitions = 0;

const originalFbq = window.fbq;
const original_Fbq = window._fbq;

// Interceptar redefinições de fbq
Object.defineProperty(window, '__fbq_monitor', {
  get() {
    return window.__fbq_actual;
  },
  set(value) {
    fbqRedefinitions++;
    console.log(`🚨 REDEFINIÇÃO ${fbqRedefinitions} DE FBQ DETECTADA:`, value);
    console.trace('Stack trace da redefinição:');
    window.__fbq_actual = value;
  }
});

// 🔍 7. VERIFICAR TIMING DE CARREGAMENTO
console.log('\n🔍 7. TIMING DE CARREGAMENTO:');
if (window.performance && window.performance.getEntriesByType) {
  const resources = window.performance.getEntriesByType('resource');
  const fbeventsResources = resources.filter(r => r.name.includes('fbevents'));
  
  console.log(`📊 Carregamentos de fbevents detectados: ${fbeventsResources.length}`);
  fbeventsResources.forEach((resource, index) => {
    console.log(`   Carregamento ${index + 1}:`);
    console.log(`     URL: ${resource.name}`);
    console.log(`     Início: ${resource.startTime.toFixed(2)}ms`);
    console.log(`     Duração: ${resource.duration.toFixed(2)}ms`);
    console.log(`     Status: ${resource.responseStatus || 'N/A'}`);
  });
  
  if (fbeventsResources.length > 1) {
    console.log('❌ MÚLTIPLOS CARREGAMENTOS DETECTADOS - POSSÍVEL CAUSA DO CONFLITO');
    
    // Verificar se foram carregamentos simultâneos
    const startTimes = fbeventsResources.map(r => r.startTime);
    const timeDiffs = [];
    for (let i = 1; i < startTimes.length; i++) {
      timeDiffs.push(startTimes[i] - startTimes[i-1]);
    }
    
    console.log('   Diferenças de tempo entre carregamentos:', timeDiffs.map(t => t.toFixed(2) + 'ms'));
  }
}

// 🔍 8. DETECTAR FONTE DO PROBLEMA
console.log('\n🔍 8. DIAGNÓSTICO FINAL:');

let problemSources = [];

if (fbeventsScripts.length > 1) {
  problemSources.push(`${fbeventsScripts.length} scripts fbevents carregados`);
}

if (window.fbq && window._fbq && window.fbq !== window._fbq) {
  problemSources.push('fbq !== _fbq (versões conflitantes)');
}

if (window.fbq && window.fbq.queue) {
  const initCalls = window.fbq.queue.filter(call => call[0] === 'init');
  if (initCalls.length > 1) {
    problemSources.push(`${initCalls.length} inicializações na queue`);
  }
}

if (problemSources.length > 0) {
  console.log('❌ FONTES DO PROBLEMA IDENTIFICADAS:');
  problemSources.forEach(source => {
    console.log(`   • ${source}`);
  });
} else {
  console.log('✅ Nenhuma fonte óbvia de conflito detectada');
  console.log('   O erro pode estar sendo causado por:');
  console.log('   • Extensões do browser');
  console.log('   • Scripts de terceiros');
  console.log('   • React StrictMode');
  console.log('   • Injeção dinâmica após nossa verificação');
}

console.log('\n💡 COLE ESTE RESULTADO COMPLETO NO CHAT');
console.log('🎯 Execute este script IMEDIATAMENTE após carregar a página para capturar o conflito');

// 🔍 9. MONITOR CONTÍNUO (opcional)
console.log('\n🔍 9. ATIVANDO MONITOR CONTÍNUO (por 10 segundos):');
let monitorCount = 0;
const monitorInterval = setInterval(() => {
  monitorCount++;
  const currentScripts = document.querySelectorAll('script[src*="fbevents"]').length;
  const currentInitCalls = window.fbq && window.fbq.queue ? 
    window.fbq.queue.filter(call => call[0] === 'init').length : 0;
  
  console.log(`Monitor ${monitorCount}: ${currentScripts} scripts, ${currentInitCalls} inits`);
  
  if (monitorCount >= 10) {
    clearInterval(monitorInterval);
    console.log('✅ Monitor contínuo finalizado');
  }
}, 1000); 