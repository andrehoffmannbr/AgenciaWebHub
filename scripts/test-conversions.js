// 🧪 TESTE DA CONVERSIONS API

console.log('🧪 === TESTE CONVERSIONS API ===');

// Verificar configuração
console.log(`📊 VITE_FACEBOOK_PIXEL_ID: ${import.meta?.env?.VITE_FACEBOOK_PIXEL_ID || 'Não encontrado'}`);
console.log(`📊 VITE_FACEBOOK_ACCESS_TOKEN: ${import.meta?.env?.VITE_FACEBOOK_ACCESS_TOKEN ? 'Configurado' : 'Não encontrado'}`);

// Testar envio de evento (apenas para debug)
if (import.meta?.env?.VITE_FACEBOOK_ACCESS_TOKEN) {
  console.log('✅ Token encontrado - pronto para enviar eventos via API');
  
  // Verificar se funções existem
  try {
    // Importar dinamicamente
    import('../src/utils/conversionsApi.js').then(module => {
      console.log('✅ Módulo Conversions API carregado');
      console.log('📊 Funções disponíveis:', Object.keys(module));
    }).catch(error => {
      console.log('❌ Erro ao carregar módulo:', error);
    });
  } catch (error) {
    console.log('❌ Erro de importação:', error);
  }
} else {
  console.log('❌ Token não encontrado - configure VITE_FACEBOOK_ACCESS_TOKEN');
}

console.log('✅ Teste concluído'); 