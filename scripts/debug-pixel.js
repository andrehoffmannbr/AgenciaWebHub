// 🔍 SCRIPT DE DEBUG META PIXEL - EXECUTE NO CONSOLE DO BROWSER

console.log('🔍 === DIAGNÓSTICO META PIXEL ===');

// 1. Verificar Scripts fbevents.js
console.log('\n1️⃣ VERIFICANDO SCRIPTS FBEVENTS.JS:');
const fbeventsScripts = document.querySelectorAll('script[src*="fbevents.js"]');
console.log(`📊 Quantidade de scripts fbevents.js encontrados: ${fbeventsScripts.length}`);
fbeventsScripts.forEach((script, index) => {
  console.log(`   Script ${index + 1}: ${script.src}`);
});

// 2. Verificar Scripts com ID meta-pixel
console.log('\n2️⃣ VERIFICANDO SCRIPTS COM ID meta-pixel:');
const metaPixelScripts = document.querySelectorAll('#meta-pixel');
console.log(`📊 Quantidade de scripts com ID "meta-pixel": ${metaPixelScripts.length}`);

// 3. Verificar window.fbq
console.log('\n3️⃣ VERIFICANDO WINDOW.FBQ:');
console.log(`📊 window.fbq existe: ${!!window.fbq}`);
if (window.fbq) {
  console.log(`📊 window.fbq.queue:`, window.fbq.queue);
  console.log(`📊 window.fbq.loaded:`, window.fbq.loaded);
  console.log(`📊 window.fbq.version:`, window.fbq.version);
  
  // Contar quantas inicializações
  const initCalls = window.fbq.queue ? window.fbq.queue.filter(call => call[0] === 'init') : [];
  console.log(`📊 Quantidade de fbq('init') na queue: ${initCalls.length}`);
  initCalls.forEach((call, index) => {
    console.log(`   Init ${index + 1}: ${call[1]} (Pixel ID)`);
  });
}

// 4. Verificar Pixel ID de Ambiente
console.log('\n4️⃣ VERIFICANDO VARIÁVEL DE AMBIENTE:');
console.log(`📊 VITE_FACEBOOK_PIXEL_ID: ${import.meta?.env?.VITE_FACEBOOK_PIXEL_ID || 'Não encontrado'}`);

// 5. Verificar Plausible Analytics
console.log('\n5️⃣ VERIFICANDO PLAUSIBLE ANALYTICS:');
const plausibleScripts = document.querySelectorAll('script[src*="plausible.io"]');
console.log(`📊 Quantidade de scripts Plausible: ${plausibleScripts.length}`);
plausibleScripts.forEach((script, index) => {
  console.log(`   Plausible ${index + 1}: ${script.src}`);
});
console.log(`📊 window.plausible existe: ${!!window.plausible}`);

// 6. Verificar Tag Manager ou outros serviços
console.log('\n6️⃣ VERIFICANDO OUTROS GERENCIADORES:');
console.log(`📊 Google Tag Manager: ${!!window.gtag}`);
console.log(`📊 Google Analytics: ${!!window.ga}`);
console.log(`📊 window.dataLayer: ${!!window.dataLayer}`);

// 7. Listar todos os scripts externos
console.log('\n7️⃣ SCRIPTS EXTERNOS CARREGADOS:');
const allScripts = document.querySelectorAll('script[src]');
const externalScripts = Array.from(allScripts)
  .map(script => script.src)
  .filter(src => src.includes('http'))
  .filter(src => src.includes('facebook') || src.includes('pixel') || src.includes('analytics') || src.includes('gtm'));

if (externalScripts.length === 0) {
  console.log('📊 Nenhum script suspeito encontrado');
} else {
  externalScripts.forEach((src, index) => {
    console.log(`   Script ${index + 1}: ${src}`);
  });
}

console.log('\n✅ === DIAGNÓSTICO COMPLETO ===');
console.log('💡 Cole este resultado no chat para análise detalhada.'); 