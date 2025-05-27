// 🔥 SCRIPT DE DEBUG RADICAL META PIXEL - EXECUTE NO CONSOLE DO BROWSER

console.log('🔥 === DIAGNÓSTICO RADICAL META PIXEL ===');

// 🧹 1. Verificar se limpeza foi realizada
console.log('\n🧹 VERIFICANDO LIMPEZA AGRESSIVA:');
console.log(`📊 window.__META_PIXEL_CLEANUP_DONE__: ${!!window.__META_PIXEL_CLEANUP_DONE__}`);
console.log(`📊 window.__META_PIXEL_INITIALIZED__: ${!!window.__META_PIXEL_INITIALIZED__}`);

// 🔍 2. Verificar Scripts fbevents.js
console.log('\n🔍 VERIFICANDO SCRIPTS FBEVENTS.JS:');
const fbeventsScripts = document.querySelectorAll('script[src*="fbevents"]');
console.log(`📊 Quantidade de scripts fbevents.js encontrados: ${fbeventsScripts.length}`);
fbeventsScripts.forEach((script, index) => {
  console.log(`   Script ${index + 1}: ${script.src}`);
  console.log(`   ID: ${script.id || 'sem ID'}`);
  console.log(`   Async: ${script.async}`);
});

// 🔍 3. Verificar Scripts com ID meta-pixel
console.log('\n🔍 VERIFICANDO SCRIPTS COM ID meta-pixel:');
const metaPixelScripts = document.querySelectorAll('#meta-pixel');
console.log(`📊 Quantidade de scripts com ID "meta-pixel": ${metaPixelScripts.length}`);

// 🔍 4. Verificar TODOS os scripts que mencionam facebook/pixel
console.log('\n🔍 VERIFICANDO TODOS OS SCRIPTS FACEBOOK/PIXEL:');
const allFbScripts = document.querySelectorAll('script[src*="facebook"], script[src*="pixel"], script[src*="fbevents"]');
console.log(`📊 Total de scripts Facebook/Pixel: ${allFbScripts.length}`);
allFbScripts.forEach((script, index) => {
  console.log(`   Script ${index + 1}:`, script.outerHTML);
});

// 🔍 5. Verificar window.fbq
console.log('\n🔍 VERIFICANDO WINDOW.FBQ:');
console.log(`📊 window.fbq existe: ${!!window.fbq}`);
if (window.fbq) {
  console.log(`📊 window.fbq tipo:`, typeof window.fbq);
  console.log(`📊 window.fbq.queue:`, window.fbq.queue);
  console.log(`📊 window.fbq.loaded:`, window.fbq.loaded);
  console.log(`📊 window.fbq.version:`, window.fbq.version);
  console.log(`📊 window.fbq.callMethod:`, typeof window.fbq.callMethod);
  
  // Contar quantas inicializações
  const initCalls = window.fbq.queue ? window.fbq.queue.filter(call => call[0] === 'init') : [];
  console.log(`📊 Quantidade de fbq('init') na queue: ${initCalls.length}`);
  initCalls.forEach((call, index) => {
    console.log(`   Init ${index + 1}: ${call[1]} (Pixel ID)`);
  });
}

// 🔍 6. Verificar window._fbq
console.log('\n🔍 VERIFICANDO WINDOW._FBQ:');
console.log(`📊 window._fbq existe: ${!!window._fbq}`);
if (window._fbq) {
  console.log(`📊 window._fbq:`, window._fbq);
}

// 🔍 7. Verificar TODAS as propriedades Facebook (FILTRADAS)
console.log('\n🔍 VERIFICANDO PROPRIEDADES FACEBOOK:');
const excludedProps = [
  'devicePixelRatio', // Propriedade nativa do browser
  '__META_PIXEL_INITIALIZED__', // Nossa flag de controle
  '__META_PIXEL_CLEANUP_DONE__', // Nossa flag de controle
  'fbAsyncInit', // Pode ser legítima em alguns casos
];

const allFbProps = Object.keys(window).filter(key => {
  const lowerKey = key.toLowerCase();
  const isFbRelated = lowerKey.includes('fb') || 
                     lowerKey.includes('facebook') ||
                     lowerKey.includes('pixel') ||
                     lowerKey.includes('meta');
  const isExcluded = excludedProps.includes(key);
  return isFbRelated && !isExcluded;
});

console.log(`📊 Propriedades Facebook encontradas (após filtros): ${allFbProps.length}`);
if (allFbProps.length > 0) {
  allFbProps.forEach(prop => {
    console.log(`   ${prop}: ${typeof (window)[prop]}`);
  });
} else {
  console.log('   ✅ Nenhuma propriedade Facebook suspeita encontrada');
}

// Mostrar propriedades excluídas (para referência)
console.log('\n📋 PROPRIEDADES EXCLUÍDAS (LEGÍTIMAS):');
excludedProps.forEach(prop => {
  if (window[prop] !== undefined) {
    console.log(`   ${prop}: ${typeof window[prop]} (legítima)`);
  }
});

// 🔍 8. Verificar Pixel ID de Ambiente
console.log('\n🔍 VERIFICANDO VARIÁVEL DE AMBIENTE:');
console.log(`📊 VITE_FACEBOOK_PIXEL_ID: ${import.meta?.env?.VITE_FACEBOOK_PIXEL_ID || 'Não encontrado'}`);

// 🔍 9. Verificar Network Tab programaticamente
console.log('\n🔍 VERIFICANDO CARREGAMENTOS DE REDE:');
if (window.performance && window.performance.getEntriesByType) {
  const networkEntries = window.performance.getEntriesByType('resource');
  const fbRelated = networkEntries.filter(entry => 
    entry.name.includes('facebook') || 
    entry.name.includes('fbevents') ||
    entry.name.includes('pixel')
  );
  console.log(`📊 Requisições relacionadas ao Facebook: ${fbRelated.length}`);
  fbRelated.forEach((entry, index) => {
    console.log(`   Requisição ${index + 1}: ${entry.name}`);
    console.log(`   Status: ${entry.responseStatus || 'N/A'}`);
    console.log(`   Tempo: ${entry.duration}ms`);
  });
}

// 🔍 10. Verificar Cache/Service Workers
console.log('\n🔍 VERIFICANDO CACHE/SERVICE WORKERS:');
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(registrations => {
    console.log(`📊 Service Workers ativos: ${registrations.length}`);
    registrations.forEach((reg, index) => {
      console.log(`   SW ${index + 1}: ${reg.scope}`);
    });
  });
}

// 🔍 11. Verificar Console Errors relacionados
console.log('\n🔍 VERIFICANDO ERROS DO CONSOLE:');
console.log('ℹ️ Verifique manualmente a aba Console para erros com "Meta Pixel" ou "fbevents"');

console.log('\n🔥 === DIAGNÓSTICO RADICAL COMPLETO ===');
console.log('💡 Cole este resultado COMPLETO no chat para análise detalhada.');
console.log('🚨 Se ainda houver erro, o problema é mais profundo que o esperado.');

// 🔥 INVESTIGAÇÃO ULTRA-PROFUNDA META PIXEL - ENCONTRAR TODAS AS FONTES

console.log('🔥 === INVESTIGAÇÃO ULTRA-PROFUNDA META PIXEL ===');
console.log('🎯 OBJETIVO: Encontrar TODAS as fontes de Meta Pixel conforme IA do console');

// 🔍 1. VERIFICAR SCRIPTS INLINE (CÓDIGO BASE HARDCODED)
console.log('\n🔍 1. VERIFICANDO SCRIPTS INLINE:');
const allScripts = document.querySelectorAll('script');
let inlinePixelCount = 0;
allScripts.forEach((script, index) => {
  if (script.innerHTML && script.innerHTML.includes('fbevents.js')) {
    inlinePixelCount++;
    console.log(`❌ SCRIPT INLINE ${inlinePixelCount} DETECTADO (posição ${index}):`);
    console.log(`   Conteúdo: ${script.innerHTML.substring(0, 200)}...`);
    console.log(`   Elemento completo:`, script.outerHTML);
  }
});
console.log(`📊 Total de scripts inline com fbevents: ${inlinePixelCount}`);

// 🔍 2. VERIFICAR SCRIPTS EXTERNOS FBEVENTS
console.log('\n🔍 2. VERIFICANDO SCRIPTS EXTERNOS FBEVENTS:');
const externalFbScripts = document.querySelectorAll('script[src*="fbevents"]');
console.log(`📊 Scripts externos fbevents: ${externalFbScripts.length}`);
externalFbScripts.forEach((script, index) => {
  console.log(`   Script externo ${index + 1}:`);
  console.log(`     SRC: ${script.src}`);
  console.log(`     ID: ${script.id || 'sem ID'}`);
  console.log(`     Async: ${script.async}`);
  console.log(`     Elemento:`, script.outerHTML);
});

// 🔍 3. VERIFICAR MÚLTIPLAS INICIALIZAÇÕES FBQ
console.log('\n🔍 3. VERIFICANDO INICIALIZAÇÕES FBQ:');
if (window.fbq && window.fbq.queue) {
  const allCalls = window.fbq.queue;
  const initCalls = allCalls.filter(call => call[0] === 'init');
  const trackCalls = allCalls.filter(call => call[0] === 'track');
  const trackSingleCalls = allCalls.filter(call => call[0] === 'trackSingle');
  
  console.log(`📊 Total de chamadas na queue: ${allCalls.length}`);
  console.log(`📊 Chamadas 'init': ${initCalls.length}`);
  console.log(`📊 Chamadas 'track': ${trackCalls.length}`);
  console.log(`📊 Chamadas 'trackSingle': ${trackSingleCalls.length}`);
  
  console.log('\n📋 DETALHES DAS INICIALIZAÇÕES:');
  initCalls.forEach((call, index) => {
    console.log(`   Init ${index + 1}: fbq('init', '${call[1]}')`);
  });
  
  console.log('\n📋 TODAS AS CHAMADAS NA QUEUE:');
  allCalls.forEach((call, index) => {
    console.log(`   ${index + 1}: fbq('${call[0]}', ${call.slice(1).map(arg => typeof arg === 'string' ? `'${arg}'` : JSON.stringify(arg)).join(', ')})`);
  });
}

// 🔍 4. VERIFICAR IFRAMES QUE PODEM TER PIXEL
console.log('\n🔍 4. VERIFICANDO IFRAMES:');
const iframes = document.querySelectorAll('iframe');
console.log(`📊 Total de iframes: ${iframes.length}`);
iframes.forEach((iframe, index) => {
  console.log(`   Iframe ${index + 1}:`);
  console.log(`     SRC: ${iframe.src || 'sem src'}`);
  console.log(`     ID: ${iframe.id || 'sem ID'}`);
  if (iframe.src && (iframe.src.includes('facebook') || iframe.src.includes('pixel'))) {
    console.log(`     ❌ SUSPEITO: Iframe com Facebook/Pixel!`);
  }
});

// 🔍 5. VERIFICAR NOSCRIPT TAGS
console.log('\n🔍 5. VERIFICANDO NOSCRIPT TAGS:');
const noscripts = document.querySelectorAll('noscript');
let pixelNoscriptCount = 0;
noscripts.forEach((noscript, index) => {
  if (noscript.innerHTML && noscript.innerHTML.includes('facebook.com/tr')) {
    pixelNoscriptCount++;
    console.log(`❌ NOSCRIPT PIXEL ${pixelNoscriptCount} DETECTADO:`);
    console.log(`   Conteúdo: ${noscript.innerHTML}`);
  }
});
console.log(`📊 Total de noscript com pixel: ${pixelNoscriptCount}`);

// 🔍 6. VERIFICAR SHADOW DOM
console.log('\n🔍 6. VERIFICANDO SHADOW DOM:');
const elementsWithShadow = document.querySelectorAll('*');
let shadowDomCount = 0;
elementsWithShadow.forEach(element => {
  if (element.shadowRoot) {
    shadowDomCount++;
    const shadowScripts = element.shadowRoot.querySelectorAll('script[src*="fbevents"]');
    if (shadowScripts.length > 0) {
      console.log(`❌ PIXEL EM SHADOW DOM DETECTADO:`, element);
      console.log(`   Scripts: ${shadowScripts.length}`);
    }
  }
});
console.log(`📊 Elementos com Shadow DOM: ${shadowDomCount}`);

// 🔍 7. VERIFICAR SERVICE WORKERS
console.log('\n🔍 7. VERIFICANDO SERVICE WORKERS:');
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(registrations => {
    console.log(`📊 Service Workers registrados: ${registrations.length}`);
    registrations.forEach((registration, index) => {
      console.log(`   SW ${index + 1}: ${registration.scope}`);
      console.log(`   Script: ${registration.active?.scriptURL || 'N/A'}`);
    });
  });
}

// 🔍 8. VERIFICAR MUTATION OBSERVERS (INJEÇÃO DINÂMICA)
console.log('\n🔍 8. CONFIGURANDO DETECTOR DE INJEÇÃO DINÂMICA:');
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node;
        if (element.tagName === 'SCRIPT') {
          const script = element;
          if (script.src && script.src.includes('fbevents')) {
            console.log('🚨 INJEÇÃO DINÂMICA DETECTADA:');
            console.log(`   Script: ${script.src}`);
            console.log(`   Elemento:`, script.outerHTML);
          }
          if (script.innerHTML && script.innerHTML.includes('fbevents.js')) {
            console.log('🚨 SCRIPT INLINE DINÂMICO DETECTADO:');
            console.log(`   Conteúdo: ${script.innerHTML.substring(0, 200)}...`);
          }
        }
      }
    });
  });
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});

console.log('✅ Detector de injeção dinâmica ativado');

// 🔍 9. VERIFICAR EXTENSÕES DO BROWSER
console.log('\n🔍 9. VERIFICANDO POSSÍVEL INTERFERÊNCIA DE EXTENSÕES:');
console.log('ℹ️ Extensões do browser podem injetar pixels automaticamente');
console.log('ℹ️ Teste em modo incógnito ou com extensões desabilitadas');

// 🔍 10. VERIFICAR HISTÓRICO DE PERFORMANCE
console.log('\n🔍 10. VERIFICANDO HISTÓRICO DE CARREGAMENTOS:');
if (window.performance && window.performance.getEntriesByType) {
  const resourceEntries = window.performance.getEntriesByType('resource');
  const fbeventsEntries = resourceEntries.filter(entry => entry.name.includes('fbevents'));
  
  console.log(`📊 Carregamentos de fbevents.js detectados: ${fbeventsEntries.length}`);
  fbeventsEntries.forEach((entry, index) => {
    console.log(`   Carregamento ${index + 1}:`);
    console.log(`     URL: ${entry.name}`);
    console.log(`     Duração: ${entry.duration}ms`);
    console.log(`     Início: ${entry.startTime}ms`);
  });
}

// 🚨 RESUMO CRÍTICO
console.log('\n🚨 === RESUMO CRÍTICO ===');
console.log(`📊 Scripts inline com fbevents: ${inlinePixelCount}`);
console.log(`📊 Scripts externos fbevents: ${externalFbScripts.length}`);
console.log(`📊 Noscript tags com pixel: ${pixelNoscriptCount}`);
console.log('');
console.log('🎯 AÇÃO NECESSÁRIA:');
console.log('1. Se há mais de 1 script inline ou externo = REMOVER DUPLICATAS');
console.log('2. Se há múltiplas inicializações = CONSOLIDAR EM UMA');
console.log('3. Se há injeção dinâmica = IDENTIFICAR FONTE');
console.log('');
console.log('💡 Cole este resultado COMPLETO no chat para análise!');

setTimeout(() => {
  console.log('\n⏰ === ANÁLISE APÓS 5 SEGUNDOS ===');
  console.log('Verificando se houve injeções dinâmicas...');
  
  const newScripts = document.querySelectorAll('script[src*="fbevents"]');
  if (newScripts.length !== externalFbScripts.length) {
    console.log(`🚨 INJEÇÃO DINÂMICA CONFIRMADA! Scripts aumentaram de ${externalFbScripts.length} para ${newScripts.length}`);
  }
}, 5000); 