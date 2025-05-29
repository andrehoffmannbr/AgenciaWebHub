# 🚀 Guia de Otimização de Performance - WebHub

Este guia documenta todas as otimizações de performance implementadas no projeto WebHub e como utilizá-las corretamente.

## 📋 Índice

1. [Otimizações Implementadas](#otimizações-implementadas)
2. [Como Usar](#como-usar)
3. [Scripts Disponíveis](#scripts-disponíveis)
4. [Componentes de Performance](#componentes-de-performance)
5. [Configurações do Servidor](#configurações-do-servidor)
6. [Métricas e Monitoramento](#métricas-e-monitoramento)
7. [Próximos Passos](#próximos-passos)

## ✅ Otimizações Implementadas

### 1. **Otimização de Imagens**
- ✅ Componente `OptimizedImage` com suporte a WebP/AVIF
- ✅ Lazy loading automático com Intersection Observer
- ✅ Placeholders blur enquanto carrega
- ✅ Srcset responsivo para diferentes tamanhos
- ✅ Script de otimização automática de imagens

### 2. **Minificação e Compressão**
- ✅ Minificação automática com Terser
- ✅ Compressão Gzip e Brotli no build
- ✅ Code splitting por chunks (vendor, router, motion, utils)
- ✅ Remoção de console.log em produção

### 3. **Eliminação de Recursos Bloqueantes**
- ✅ CSS crítico inline no HTML
- ✅ Carregamento assíncrono do Google Fonts
- ✅ Loading screen para melhor UX
- ✅ Preconnect e DNS prefetch para recursos externos
- ✅ Scripts de analytics carregados de forma assíncrona

### 4. **Cache e CDN**
- ✅ Service Worker com Workbox (PWA)
- ✅ Cache de fontes, imagens e assets
- ✅ Headers de cache no .htaccess
- ✅ Versionamento automático de assets

### 5. **Lazy Loading**
- ✅ Hook `useLazyLoad` para componentes
- ✅ Lazy loading de imagens com `OptimizedImage`
- ✅ Code splitting de rotas
- ✅ Preload condicional de componentes

### 6. **Otimizações do Servidor**
- ✅ Arquivo .htaccess completo
- ✅ Compressão Gzip/Brotli
- ✅ Headers de segurança
- ✅ Servir formatos modernos automaticamente
- ✅ Prevenção de hotlinking

## 🛠 Como Usar

### Componente OptimizedImage

```tsx
import { OptimizedImage } from '@/components/OptimizedImage';

// Uso básico
<OptimizedImage
  src="/images/hero-image.jpg"
  alt="Imagem do hero"
  width={800}
  height={600}
  className="rounded-lg"
/>

// Com prioridade (above the fold)
<OptimizedImage
  src="/images/logo.png"
  alt="Logo"
  priority={true}
  placeholder="empty"
/>

// Com sizes customizado
<OptimizedImage
  src="/images/portfolio.jpg"
  alt="Portfolio"
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
  onLoad={() => console.log('Imagem carregada!')}
/>
```

### Lazy Loading de Componentes

```tsx
import { createLazyComponent, usePreloadComponent } from '@/hooks/useLazyLoad';

// Criar componente lazy
const LazyPortfolio = createLazyComponent(
  () => import('@/components/Portfolio')
);

// Usar em componente
function App() {
  const { preload } = usePreloadComponent(
    () => import('@/components/Portfolio'),
    false // preload quando necessário
  );

  return (
    <div>
      <button onMouseEnter={preload}>
        Ver Portfolio
      </button>
      <Suspense fallback={<div>Carregando...</div>}>
        <LazyPortfolio />
      </Suspense>
    </div>
  );
}
```

### Intersection Observer

```tsx
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

function MyComponent() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useIntersectionObserver(
    ref,
    ([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    },
    { threshold: 0.5, rootMargin: '50px' }
  );

  return (
    <div ref={ref}>
      {isVisible && <ExpensiveComponent />}
    </div>
  );
}
```

## 🎛 Scripts Disponíveis

### Otimização de Imagens
```bash
# Otimizar todas as imagens do projeto
npm run optimize-images

# Gera versões WebP, AVIF e responsivas
# Processa imagens em /public e /src/assets
```

### Análise de Bundle
```bash
# Gerar relatório de análise do bundle
npm run build:analyze

# Abre stats.html com visualização detalhada
# Identifica componentes que podem ser otimizados
```

### Build de Produção
```bash
# Build otimizado para produção
npm run build

# Inclui todas as otimizações:
# - Minificação
# - Code splitting
# - Compressão
# - PWA assets
```

## 🔧 Configurações do Servidor

### Apache (.htaccess)

O arquivo `.htaccess` já está configurado com:
- ✅ Compressão Gzip/Brotli
- ✅ Cache headers otimizados
- ✅ Headers de segurança
- ✅ Redirecionamento HTTPS
- ✅ Servir WebP/AVIF automaticamente

### Nginx (exemplo)

```nginx
# Adicionar ao nginx.conf
location ~* \.(jpg|jpeg|png|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, no-transform";
    
    # Servir WebP se disponível
    location ~* \.(jpg|jpeg|png)$ {
        add_header Vary Accept;
        try_files $uri$webp_suffix $uri =404;
    }
}

# Habilitar compressão
gzip on;
gzip_types text/css application/javascript image/svg+xml;
brotli on;
brotli_types text/css application/javascript image/svg+xml;
```

## 📊 Métricas e Monitoramento

### Web Vitals Esperados

Após as otimizações, você deve ver melhorias em:

- **FCP (First Contentful Paint)**: < 1.8s
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1
- **TTFB (Time to First Byte)**: < 600ms

### Ferramentas de Teste

1. **Google PageSpeed Insights**
   - https://pagespeed.web.dev/
   - Teste mobile e desktop

2. **GTmetrix**
   - https://gtmetrix.com/
   - Análise detalhada de performance

3. **WebPageTest**
   - https://www.webpagetest.org/
   - Testes de diferentes localizações

4. **Chrome DevTools**
   - Lighthouse
   - Performance tab
   - Network tab

## 🎯 Próximos Passos

### Otimizações Adicionais Recomendadas

1. **Critical CSS Automático**
   ```bash
   npm install --save-dev critical
   # Gerar CSS crítico automaticamente
   ```

2. **Preload de Recursos Críticos**
   ```html
   <link rel="preload" href="/fonts/main.woff2" as="font" type="font/woff2" crossorigin>
   ```

3. **Resource Hints Dinâmicos**
   ```tsx
   // Preconnect dinâmico baseado em user behavior
   const preconnectTo = (href: string) => {
     const link = document.createElement('link');
     link.rel = 'preconnect';
     link.href = href;
     document.head.appendChild(link);
   };
   ```

4. **Bundle Analysis Automático**
   - Integrar análise no CI/CD
   - Alertas para bundles muito grandes
   - Tracking de performance ao longo do tempo

5. **Image Optimization Pipeline**
   - Integração com CDN (Cloudinary, ImageKit)
   - Otimização automática no upload
   - Responsive images baseado no device

### Configurações Avançadas

1. **HTTP/3 e QUIC**
   ```apache
   # Habilitar HTTP/3 se disponível
   LoadModule http3_module modules/mod_http3.so
   H3Push on
   ```

2. **Early Hints (103 Status)**
   ```apache
   # Enviar hints antes da resposta completa
   H3EarlyHints on
   ```

3. **Service Worker Avançado**
   ```typescript
   // Estratégias de cache mais sofisticadas
   import { precacheAndRoute, CacheFirst, NetworkFirst } from 'workbox-strategies';
   ```

## 📝 Checklist de Deploy

Antes de fazer deploy, verifique:

- [ ] Imagens otimizadas geradas
- [ ] Bundle size analisado
- [ ] Service worker funcionando
- [ ] Cache headers configurados
- [ ] HTTPS configurado
- [ ] Compressão habilitada
- [ ] Resource hints corretos
- [ ] Error pages criadas
- [ ] Robots.txt atualizado
- [ ] Sitemap.xml gerado

## 🆘 Troubleshooting

### Problemas Comuns

1. **Imagens não carregam versões otimizadas**
   - Verificar se o script de otimização foi executado
   - Conferir permissões de arquivo
   - Testar headers Accept no navegador

2. **Service Worker não atualiza**
   - Limpar cache do navegador
   - Verificar estratégia de atualização
   - Usar modo incógnito para testar

3. **Bundle muito grande**
   - Analisar com `npm run build:analyze`
   - Verificar imports desnecessários
   - Implementar mais code splitting

4. **Cache muito agressivo**
   - Ajustar headers no .htaccess
   - Implementar cache busting
   - Usar versioning de assets

---

**Nota**: Este guia será atualizado conforme novas otimizações forem implementadas. Para dúvidas ou sugestões, consulte a equipe de desenvolvimento. 