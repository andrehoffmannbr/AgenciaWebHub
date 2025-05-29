// Utilitário para gerenciar consentimento de cookies
export interface CookiePreferences {
  consent: 'accepted' | 'essential-only' | 'customized' | null;
  analytics: boolean;
  marketing: boolean;
}

export const getCookiePreferences = (): CookiePreferences => {
  if (typeof window === 'undefined') {
    return { consent: null, analytics: false, marketing: false };
  }

  const consent = localStorage.getItem('cookie-consent') as CookiePreferences['consent'];
  const analytics = localStorage.getItem('analytics-consent') === 'true';
  const marketing = localStorage.getItem('marketing-consent') === 'true';

  return { consent, analytics, marketing };
};

export const setCookiePreferences = (preferences: Partial<CookiePreferences>) => {
  if (typeof window === 'undefined') return;

  if (preferences.consent) {
    localStorage.setItem('cookie-consent', preferences.consent);
  }
  
  if (preferences.analytics !== undefined) {
    localStorage.setItem('analytics-consent', preferences.analytics.toString());
  }
  
  if (preferences.marketing !== undefined) {
    localStorage.setItem('marketing-consent', preferences.marketing.toString());
  }
};

export const hasConsentForAnalytics = (): boolean => {
  const preferences = getCookiePreferences();
  return preferences.consent === 'accepted' || 
         (preferences.consent === 'customized' && preferences.analytics);
};

export const hasConsentForMarketing = (): boolean => {
  const preferences = getCookiePreferences();
  return preferences.consent === 'accepted' || 
         (preferences.consent === 'customized' && preferences.marketing);
};

export const clearCookiePreferences = () => {
  if (typeof window === 'undefined') return;
  
  localStorage.removeItem('cookie-consent');
  localStorage.removeItem('analytics-consent');
  localStorage.removeItem('marketing-consent');
}; 