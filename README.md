# 🚀 AgenciaWebHub

![Agência Web Hub](https://img.shields.io/badge/Status-Prod%20Ready-success)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.3.6-38B2AC)
![Vite](https://img.shields.io/badge/Vite-5.0.0-646CFF)
![Security](https://img.shields.io/badge/Security-Meta%20API%20Protected-green)

**Agência de Desenvolvimento Web Moderna** - Site institucional desenvolvido com tecnologias de ponta para uma agência especializada em desenvolvimento web e soluções digitais.

## 🔒 **CONFIGURAÇÃO DE SEGURANÇA OBRIGATÓRIA**

**⚠️ ANTES DE USAR**: Este projeto inclui integração segura com Meta Ads API. Você **DEVE** configurar as variáveis de ambiente para funcionar corretamente.

### Configuração Rápida (Windows)
```powershell
# Execute o script de configuração automática
.\scripts\setup-env.ps1
```

### Configuração Manual
1. Crie o arquivo `.env.local` na raiz do projeto
2. Adicione as variáveis conforme o exemplo em `docs/META_SECURITY_GUIDE.md`
3. **NUNCA** commite este arquivo (já está no .gitignore)

📖 **[GUIA COMPLETO DE SEGURANÇA](docs/META_SECURITY_GUIDE.md)**

## ✨ Características

### 🎨 Design & UI/UX
- **Design Moderno**: Interface moderna com gradientes e animações suaves
- **Responsivo**: Otimizado para todos os dispositivos (mobile-first)
- **Animações Interativas**: Elementos animados com Framer Motion
- **Cursor Customizado**: Experiência de usuário única
- **Temas de Cores**: Sistema de cores personalizado com gradientes neon

### 🚀 Performance
- **Build Otimizado**: Vite para desenvolvimento e build ultra-rápidos
- **Lazy Loading**: Carregamento inteligente de componentes
- **Imagens Otimizadas**: Sistema de fallback e loading otimizado
- **Mobile Performance**: Animações adaptativas para dispositivos móveis
- **SEO Ready**: Estrutura otimizada para mecanismos de busca

### 🔐 Segurança
- **Meta Pixel Seguro**: Integração protegida com variáveis de ambiente
- **Tokens Protegidos**: Nunca expostos no código fonte
- **Cursor AI Seguro**: Arquivos sensíveis excluídos do contexto
- **Git Protegido**: Múltiplas camadas de proteção no .gitignore
- **Error Handling**: Tratamento seguro de falhas

### 🛠️ Tecnologias

#### Frontend
- **React 18.2.0** - Biblioteca JavaScript para interfaces
- **TypeScript 5.2.2** - Tipagem estática para JavaScript
- **Vite 5.0.0** - Build tool e dev server
- **Tailwind CSS 3.3.6** - Framework CSS utilitário
- **Framer Motion 10.16.16** - Biblioteca de animações

#### Ferramentas & Configuração
- **ESLint** - Linting de código
- **PostCSS** - Processamento de CSS
- **Autoprefixer** - Prefixos CSS automáticos

#### Analytics & Tracking
- **Meta Pixel** - Tracking seguro de conversões
- **Custom Events** - Eventos personalizados para análise

## 🎯 Funcionalidades

### 📄 Páginas
- **Home**: Landing page com hero section e apresentação
- **Sobre**: História da agência, valores e equipe
- **Projetos**: Portfolio com filtros por categoria
- **Serviços**: Detalhamento dos serviços oferecidos
- **Contato**: Formulários e informações de contato

### 🌟 Componentes Especiais
- **Animated Background**: Fundo animado com partículas e formas geométricas
- **Loading Screen**: Tela de carregamento personalizada
- **Custom Cursor**: Cursor interativo que segue o mouse
- **WhatsApp Button**: Integração direta com WhatsApp
- **Offer Modal**: Modal promocional com temporizador
- **Meta Pixel Integration**: Tracking seguro de conversões

### 📱 Responsividade
- **Mobile**: Layout otimizado para smartphones
- **Tablet**: Adaptações para tablets e dispositivos médios
- **Desktop**: Experiência completa para desktops
- **Touch Devices**: Suporte a dispositivos touch

## 🚀 Início Rápido

### Pré-requisitos
- Node.js 16+ 
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone https://github.com/andrehoffmannbr/AgenciaWebHub.git

# Entre no diretório
cd AgenciaWebHub

# 🔒 CONFIGURE A SEGURANÇA (OBRIGATÓRIO)
# Windows:
.\scripts\setup-env.ps1
# Ou manualmente seguindo docs/META_SECURITY_GUIDE.md

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev

# Abra http://localhost:5173 no navegador
```

### Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview

# Linting
npm run lint

# Configuração segura (Windows)
.\scripts\setup-env.ps1
```

## 📁 Estrutura do Projeto

```
AgenciaWebHub/
├── public/                 # Arquivos públicos
│   ├── images/            # Imagens do projeto
│   └── ...
├── src/
│   ├── components/        # Componentes React
│   │   ├── AnimatedBackground.tsx
│   │   ├── CustomCursor.tsx
│   │   ├── Header.tsx
│   │   └── ...
│   ├── hooks/            # Custom hooks
│   ├── pages/            # Páginas da aplicação
│   ├── styles/           # Estilos CSS
│   ├── types/            # Tipos TypeScript
│   ├── utils/            # Funções utilitárias
│   │   └── metaPixel.ts  # 🔒 Integração segura Meta API
│   ├── vite-env.d.ts     # 🔒 Types para env vars
│   └── main.tsx          # Ponto de entrada
├── docs/                 # Documentação
│   └── META_SECURITY_GUIDE.md # 🔒 Guia de segurança
├── scripts/              # Scripts utilitários
│   └── setup-env.ps1     # 🔒 Configuração automática
├── .vscode/              # Configurações VS Code/Cursor
├── .cursorignore         # 🔒 Proteção Cursor AI
├── .cursorindexingignore # 🔒 Proteção indexação
├── .env.local            # 🔒 Variáveis sensíveis (não commitado)
├── tailwind.config.js    # Configuração Tailwind
├── vite.config.ts        # Configuração Vite
└── package.json
```

## 🎨 Design System

### Paleta de Cores
- **Primary**: `#00D4FF` (Azul neon)
- **Secondary**: `#39FF14` (Verde cítrico)  
- **Accent**: `#8A2BE2` (Roxo elétrico)
- **Dark**: Tons de cinza escuro para backgrounds

### Tipografia
- **Display**: Poppins (Títulos)
- **Sans**: Inter (Textos)
- **Mono**: Sora (Código)

## 🔧 Configuração do Ambiente

### VS Code / Cursor
O projeto inclui configurações otimizadas para VS Code/Cursor:
- Intellisense do Tailwind CSS
- Formatação automática
- Extensões recomendadas
- Proteção de arquivos sensíveis

### Extensões Recomendadas
- Tailwind CSS IntelliSense
- Prettier
- TypeScript
- Auto Rename Tag
- Path Intellisense

## 🌐 Deploy

### Vercel (Recomendado)
```bash
# Instale a CLI da Vercel
npm i -g vercel

# ⚠️ ANTES DO DEPLOY: Configure variáveis de ambiente
# Siga: docs/META_SECURITY_GUIDE.md seção 2

# Deploy
vercel
```

### Netlify
```bash
# Build
npm run build

# ⚠️ Configure variáveis de ambiente antes do upload
# Upload da pasta dist/
```

## 📊 Performance

- **Lighthouse Score**: 95+ em todas as métricas
- **Core Web Vitals**: Otimizado
- **Bundle Size**: Otimizado com tree-shaking
- **Load Time**: < 2s em conexões 3G
- **Security Score**: A+ (tokens protegidos)

## 🔒 Política de Segurança

### Dados Protegidos
- ✅ Tokens Meta API em variáveis de ambiente
- ✅ Arquivos sensíveis no .gitignore
- ✅ Cursor AI protegido com .cursorignore
- ✅ Validação de ambiente antes da inicialização
- ✅ Error handling sem exposição de dados

### Compliance
- ✅ LGPD/GDPR ready
- ✅ Pixel tracking com consentimento
- ✅ Logs seguros sem dados sensíveis

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. **Configure segurança**: Execute `.\scripts\setup-env.ps1`
4. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
5. Push para a branch (`git push origin feature/AmazingFeature`)
6. Abra um Pull Request

⚠️ **Importante**: Nunca commite arquivos `.env*` ou tokens

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Contato

**Agência WebHub** - Desenvolvimento Web Moderno

- 📧 Email: contato@webhub.dev
- 📱 WhatsApp: +55 (48) 98843-0812
- 🌐 Website: [webhub.dev](https://webhub.dev)
- 💼 LinkedIn: [AgenciaWebHub](https://linkedin.com/company/agenciawebhub)

---

⭐ **Star este repositório se ele foi útil para você!**

<div align="center">
  <img src="https://img.shields.io/github/stars/andrehoffmannbr/AgenciaWebHub?style=social" alt="GitHub stars">
  <img src="https://img.shields.io/github/forks/andrehoffmannbr/AgenciaWebHub?style=social" alt="GitHub forks">
  <img src="https://img.shields.io/badge/🔒-Secure%20by%20Design-green" alt="Security">
</div> 