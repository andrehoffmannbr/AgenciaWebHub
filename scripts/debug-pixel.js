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