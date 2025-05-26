# 🔒 **GUIA DE SEGURANÇA - META ADS API**

## ⚠️ **IMPORTANTE: CONFIGURAÇÃO OBRIGATÓRIA**

Para usar a integração com Meta Pixel de forma segura, você **DEVE** configurar as variáveis de ambiente antes de usar o projeto.

## 🛡️ **1. Configuração Local (Desenvolvimento)**

### Crie o arquivo `.env.local`
```bash
# 🔐 VARIÁVEIS SENSÍVEIS - NUNCA COMMITAR ESTE ARQUIVO
VITE_FACEBOOK_PIXEL_ID=643598702005540
FACEBOOK_ACCESS_TOKEN=EAAGpn3fXmJQBO1G9i92wm0P1KfmDbtrCbAkkXeocn9cbzct3ZCpsXtEwLlE54fhVxUOrcnVUCi57UuH1ixTJokzuUnmk3dMh20d2Aui1PydCdiPDOhY6rEBrmPtAFLXZCXw9ZAQAgIJwvmIaTA2AWZA8ZBUOsDGRa2eezCTkkDB5UEa7qj8Sk6qXIAE4b0mBQpgZDZD
VITE_FACEBOOK_API_VERSION=v18.0
NODE_ENV=development
```

**⚠️ ATENÇÃO**: 
- Este arquivo será **automaticamente ignorado** pelo git
- **NUNCA** commite tokens em código
- **NUNCA** compartilhe este arquivo publicamente

## ☁️ **2. Configuração na Vercel (Produção)**

### Passo 1: Acesse o Dashboard
1. Vá para [vercel.com](https://vercel.com)
2. Selecione seu projeto `AgenciaWebHub`
3. Clique em **Settings** > **Environment Variables**

### Passo 2: Adicione as Variáveis
```
Nome: VITE_FACEBOOK_PIXEL_ID
Valor: 643598702005540
Ambiente: Production, Preview
Sensível: ✅ Sim

Nome: FACEBOOK_ACCESS_TOKEN  
Valor: EAAGpn3fXmJQBO1G9i92wm0P1KfmDbtrCbAkkXeocn9cbzct3ZCpsXtEwLlE54fhVxUOrcnVUCi57UuH1ixTJokzuUnmk3dMh20d2Aui1PydCdiPDOhY6rEBrmPtAFLXZCXw9ZAQAgIJwvmIaTA2AWZA8ZBUOsDGRa2eezCTkkDB5UEa7qj8Sk6qXIAE4b0mBQpgZDZD
Ambiente: Production, Preview  
Sensível: ✅ Sim

Nome: VITE_FACEBOOK_API_VERSION
Valor: v18.0
Ambiente: Production, Preview
Sensível: ❌ Não
```

### Passo 3: Redeploy
- Após adicionar as variáveis, faça um redeploy do projeto

## 🔐 **3. Recursos de Segurança Implementados**

### ✅ Proteções Ativas
- [x] **Tokens fora do código**: Usar apenas variáveis de ambiente
- [x] **Gitignore robusto**: Múltiplas proteções contra commits acidentais
- [x] **Cursor AI protegido**: Arquivos `.cursorignore` e `.cursorindexingignore`
- [x] **Validação de ambiente**: Pixel só inicializa se variáveis existirem
- [x] **Error handling**: Tratamento seguro de erros
- [x] **Logging controlado**: Logs informativos sem exposição de dados

### ✅ Estrutura Segura
```
src/
├── utils/
│   └── metaPixel.ts         # ✅ Integração segura
├── vite-env.d.ts           # ✅ Types para env vars
└── ...

.env.local                   # ✅ Ignorado pelo git
.cursorignore               # ✅ Proteção Cursor AI
.cursorindexingignore       # ✅ Proteção indexação
docs/
└── META_SECURITY_GUIDE.md  # ✅ Este guia
```

## 📊 **4. Eventos Trackados**

### Automáticos
- **PageView**: Toda mudança de página
- **ViewContent**: Visualização de conteúdo específico

### Conversões
- **Lead**: Envio de formulário de contato
- **Contact**: Ação de contato direto

### Como Usar
```typescript
import { useMetaPixel } from '../utils/metaPixel';

const { trackLead, trackContact, trackViewContent } = useMetaPixel();

// Tracking manual
trackLead({ value: 100, currency: 'BRL' });
trackContact();
trackViewContent('product', 'project-1');
```

## 🚨 **5. Checklist de Segurança**

### Antes de Deploy
- [ ] Variáveis configuradas na Vercel
- [ ] `.env.local` criado localmente
- [ ] Arquivo `.env.local` **NÃO** commitado
- [ ] Tokens funcionando (teste local)
- [ ] Logs de inicialização aparecendo

### Manutenção
- [ ] Renovar token Meta periodicamente
- [ ] Monitorar logs de erro
- [ ] Validar eventos no Meta Events Manager
- [ ] Backup seguro das configurações

## 🛠️ **6. Comandos Úteis**

```bash
# Verificar se variáveis estão carregadas
npm run dev
# Deve aparecer: "🔒 Meta Pixel configurado com segurança"

# Verificar arquivos ignorados
git status
# .env.local NÃO deve aparecer

# Testar build
npm run build
# Não deve ter erros relacionados a env vars
```

## 🆘 **7. Solução de Problemas**

### Pixel não carrega
1. Verificar se `VITE_FACEBOOK_PIXEL_ID` está definido
2. Verificar console para erros
3. Confirmar que ID do pixel está correto

### Eventos não trackados
1. Verificar se pixel inicializou
2. Verificar logs no console
3. Validar no Meta Events Manager

### Erro de build
1. Verificar sintaxe do `.env.local`
2. Confirmar que todas as variáveis têm `VITE_` prefix quando necessário
3. Verificar se tipos estão corretos em `vite-env.d.ts`

## 📞 **8. Suporte**

Se encontrar problemas:
1. Verifique este guia primeiro
2. Consulte documentação oficial da Meta
3. Verifique logs detalhados no console

---

## 🔗 **Links Úteis**

- [Meta Pixel Documentation](https://developers.facebook.com/docs/meta-pixel)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

---

**⚡ Configuração implementada por: AgenciaWebHub Team**  
**🔒 Status de Segurança: MÁXIMA** 