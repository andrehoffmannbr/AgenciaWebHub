// 🚀 FACEBOOK CONVERSIONS API - SERVER-SIDE TRACKING
interface ConversionEvent {
  event_name: string;
  event_time: number;
  action_source: string;
  user_data: {
    em?: string[]; // email hash
    ph?: string[]; // phone hash
    client_ip_address?: string;
    client_user_agent?: string;
    fbc?: string; // _fbc cookie
    fbp?: string; // _fbp cookie
  };
  custom_data?: {
    currency?: string;
    value?: number;
    content_name?: string;
    content_category?: string;
    content_ids?: string[];
  };
  event_source_url?: string;
}

interface ConversionsApiPayload {
  data: ConversionEvent[];
  access_token: string;
}

// 🔐 HASH SEGURO PARA DADOS PESSOAIS
async function hashData(data: string): Promise<string> {
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data.toLowerCase().trim());
  const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// 🍪 OBTER COOKIES FBC E FBP
function getFacebookCookies(): { fbc?: string; fbp?: string } {
  const cookies = document.cookie.split(';').reduce((acc, cookie) => {
    const [name, value] = cookie.trim().split('=');
    acc[name] = value;
    return acc;
  }, {} as Record<string, string>);

  return {
    fbc: cookies._fbc || undefined,
    fbp: cookies._fbp || undefined
  };
}

// 🌐 OBTER IP DO CLIENTE
async function getClientIp(): Promise<string | undefined> {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.warn('Não foi possível obter IP do cliente:', error);
    return undefined;
  }
}

// 📊 ENVIAR EVENTO PARA CONVERSIONS API
export async function sendConversionEvent(
  eventName: string, 
  userData: { email?: string; phone?: string } = {},
  customData: any = {}
): Promise<boolean> {
  
  // Verificar configuração
  const pixelId = import.meta.env.VITE_FACEBOOK_PIXEL_ID;
  const accessToken = import.meta.env.VITE_FACEBOOK_ACCESS_TOKEN;
  
  if (!pixelId || !accessToken) {
    console.warn('⚠️ Conversions API: Configuração incompleta');
    return false;
  }

  try {
    // Preparar dados do usuário (com hash)
    const userDataHashed: any = {
      client_user_agent: navigator.userAgent,
      client_ip_address: await getClientIp(),
      ...getFacebookCookies()
    };

    // Hash do email se fornecido
    if (userData.email) {
      userDataHashed.em = [await hashData(userData.email)];
    }

    // Hash do telefone se fornecido  
    if (userData.phone) {
      userDataHashed.ph = [await hashData(userData.phone)];
    }

    // Criar evento
    const event: ConversionEvent = {
      event_name: eventName,
      event_time: Math.floor(Date.now() / 1000),
      action_source: 'website',
      user_data: userDataHashed,
      event_source_url: window.location.href
    };

    // Adicionar dados customizados se fornecidos
    if (Object.keys(customData).length > 0) {
      event.custom_data = customData;
    }

    // Preparar payload
    const payload: ConversionsApiPayload = {
      data: [event],
      access_token: accessToken
    };

    // Enviar para API
    const response = await fetch(
      `https://graph.facebook.com/v18.0/${pixelId}/events`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      }
    );

    if (response.ok) {
      const result = await response.json();
      console.log('✅ Conversions API: Evento enviado com sucesso', result);
      return true;
    } else {
      const error = await response.text();
      console.error('❌ Conversions API: Erro no envio', error);
      return false;
    }

  } catch (error) {
    console.error('❌ Conversions API: Erro inesperado', error);
    return false;
  }
}

// 🎯 FUNÇÕES ESPECÍFICAS PARA CONVERSIONS API
export const sendLeadEvent = async (userData: { email?: string; phone?: string }, customData = {}) => {
  return await sendConversionEvent('Lead', userData, {
    currency: 'BRL',
    value: 0,
    content_name: 'Contact Form',
    content_category: 'Lead Generation',
    ...customData
  });
};

export const sendContactEvent = async (userData: { email?: string; phone?: string }) => {
  return await sendConversionEvent('Contact', userData);
};

export const sendPageViewEvent = async () => {
  return await sendConversionEvent('PageView');
};

export const sendPurchaseEvent = async (
  userData: { email?: string; phone?: string },
  purchaseData: { value: number; currency: string; content_ids?: string[] }
) => {
  return await sendConversionEvent('Purchase', userData, purchaseData);
}; 