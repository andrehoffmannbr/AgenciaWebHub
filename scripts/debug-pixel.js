// 🔍 VERIFICAÇÃO SIMPLES META PIXEL

console.log('🔍 === VERIFICAÇÃO META PIXEL ===');

// Verificar scripts fbevents
const fbScripts = document.querySelectorAll('script[src*="fbevents"]');
console.log(`📊 Scripts fbevents: ${fbScripts.length}`);

// Verificar window.fbq
console.log(`📊 window.fbq existe: ${!!window.fbq}`);
console.log(`📊 window._fbq existe: ${!!window._fbq}`);

if (window.fbq && window._fbq) {
  console.log(`📊 fbq === _fbq: ${window.fbq === window._fbq}`);
  
  if (window.fbq.queue) {
    const initCalls = window.fbq.queue.filter(call => call[0] === 'init');
    console.log(`📊 Inicializações: ${initCalls.length}`);
    if (initCalls.length > 0) {
      console.log(`📊 Pixel ID: ${initCalls[0][1]}`);
    }
  }
}

// Verificar Pixel ID do ambiente
console.log(`📊 PIXEL_ID configurado: ${import.meta?.env?.VITE_FACEBOOK_PIXEL_ID || 'Não encontrado'}`);

console.log('✅ Verificação concluída'); 