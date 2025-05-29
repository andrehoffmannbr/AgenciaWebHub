import { Service, Project, TeamMember, FAQ, Stats } from '../types';

export const stats: Stats = {
  projects: 150,
  clients: 80,
  experience: 5,
  satisfaction: 100
};

export const services: Service[] = [
  {
    id: '1',
    title: 'Desenvolvimento de Sites',
    description: 'Sites responsivos e modernos desenvolvidos com as melhores tecnologias do mercado.',
    icon: 'Globe',
    features: [
      'Design responsivo',
      'Performance otimizada',
      'SEO integrado',
      'Compatibilidade cross-browser',
      'Código limpo e escalável'
    ],
    price: 'R$ 2.500,00'
  },
  {
    id: '2',
    title: 'Landing Pages',
    description: 'Páginas de conversão otimizadas para maximizar seus resultados de marketing.',
    icon: 'Zap',
    features: [
      'Foco em conversão',
      'A/B Testing',
      'Integração com Analytics',
      'Loading ultrarrápido',
      'Mobile-first design'
    ],
    price: 'R$ 1.500,00'
  },
  {
    id: '3',
    title: 'E-commerces',
    description: 'Lojas virtuais completas com sistema de pagamento e gestão integrada.',
    icon: 'ShoppingCart',
    features: [
      'Catálogo de produtos',
      'Gateway de pagamento',
      'Painel administrativo',
      'Gestão de estoque',
      'Relatórios de vendas'
    ],
    price: 'A partir de R$ 3.500,00'
  },
  {
    id: '4',
    title: 'SEO & Performance',
    description: 'Otimização para mecanismos de busca e melhoria de performance.',
    icon: 'TrendingUp',
    features: [
      'Auditoria SEO completa',
      'Otimização de velocidade',
      'Meta tags estratégicas',
      'Schema markup',
      'Monitoramento contínuo'
    ],
    price: 'R$ 1.500,00'
  },
  {
    id: '5',
    title: 'Suporte & Manutenção',
    description: 'Suporte contínuo e manutenção preventiva para seu site.',
    icon: 'Shield',
    features: [
      'Suporte 24/7',
      'Backup automático',
      'Atualizações de segurança',
      'Monitoramento de uptime',
      'Correções de bugs'
    ],
    price: 'Gratuito por 6 meses'
  },
  {
    id: '6',
    title: 'UI/UX Design',
    description: 'Design de interfaces intuitivas focadas na experiência do usuário.',
    icon: 'Palette',
    features: [
      'Pesquisa de usuário',
      'Wireframes e protótipos',
      'Design system',
      'Testes de usabilidade',
      'Design responsivo'
    ],
    price: 'R$ 1.900,00'
  }
];

export const projects: Project[] = [
  {
    id: '1',
    title: 'TechCorp Solutions',
    description: 'Site corporativo moderno para empresa de tecnologia com foco em soluções empresariais.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop&crop=center',
    category: 'Corporativo',
    technologies: ['React', 'TypeScript', 'TailwindCSS', 'Framer Motion'],
    link: 'https://techcorp-demo.com'
  },
  {
    id: '2',
    title: 'EcoVerde Store',
    description: 'E-commerce sustentável com sistema de pagamento integrado e gestão de produtos.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center',
    category: 'E-commerce',
    technologies: ['Next.js', 'Stripe', 'MongoDB', 'Node.js'],
    link: 'https://ecoverde-demo.com'
  },
  {
    id: '3',
    title: 'FitLife Academy',
    description: 'Landing page para academia com sistema de agendamento e planos personalizados.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=250&fit=crop&crop=center',
    category: 'Landing Page',
    technologies: ['React', 'Vite', 'Firebase', 'TailwindCSS'],
    link: 'https://fitlife-demo.com'
  },
  {
    id: '4',
    title: 'Gourmet Delivery',
    description: 'Aplicativo web para delivery de comida gourmet com rastreamento em tempo real.',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=250&fit=crop&crop=center',
    category: 'Aplicativo',
    technologies: ['React Native', 'Express', 'PostgreSQL', 'Socket.io'],
    link: 'https://gourmet-demo.com'
  },
  {
    id: '5',
    title: 'ArtSpace Gallery',
    description: 'Portfolio digital para galeria de arte com visualização imersiva de obras.',
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=250&fit=crop&crop=center',
    category: 'Portfolio',
    technologies: ['Three.js', 'React', 'GSAP', 'WebGL'],
    link: 'https://artspace-demo.com'
  },
  {
    id: '6',
    title: 'MediCare Plus',
    description: 'Sistema de agendamento médico com telemedicina integrada.',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop&crop=center',
    category: 'Sistema',
    technologies: ['Vue.js', 'Laravel', 'MySQL', 'WebRTC'],
    link: 'https://medicare-demo.com'
  }
];

export const team: TeamMember[] = [
  {
    id: '1',
    name: 'Rafael Silva',
    role: 'CEO & Full Stack Developer',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    bio: 'Especialista em React e Node.js com mais de 8 anos de experiência em desenvolvimento web.',
    social: {
      linkedin: 'https://linkedin.com/in/rafael-silva',
      github: 'https://github.com/rafael-silva',
      twitter: 'https://twitter.com/rafael_silva'
    }
  },
  {
    id: '2',
    name: 'Ana Costa',
    role: 'UI/UX Designer',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    bio: 'Designer apaixonada por criar experiências únicas, com foco em usabilidade e acessibilidade.',
    social: {
      linkedin: 'https://linkedin.com/in/ana-costa',
      twitter: 'https://twitter.com/ana_costa'
    }
  },
  {
    id: '3',
    name: 'Carlos Mendes',
    role: 'Frontend Developer',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    bio: 'Especialista em React e animações web, sempre buscando as melhores práticas de desenvolvimento.',
    social: {
      linkedin: 'https://linkedin.com/in/carlos-mendes',
      github: 'https://github.com/carlos-mendes'
    }
  },
  {
    id: '4',
    name: 'Mariana Santos',
    role: 'Backend Developer',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    bio: 'Desenvolvedora backend com expertise em Node.js, Python e arquitetura de sistemas escaláveis.',
    social: {
      linkedin: 'https://linkedin.com/in/mariana-santos',
      github: 'https://github.com/mariana-santos'
    }
  }
];

export const faqs: FAQ[] = [
  {
    id: '1',
    question: 'Quanto tempo leva para desenvolver um site?',
    answer: 'O tempo varia de acordo com a complexidade do projeto. Sites simples podem levar de 2-4 dias, enquanto projetos mais complexos podem levar de 1-2 semanas.'
  },
  {
    id: '2',
    question: 'Vocês oferecem suporte após o lançamento?',
    answer: 'Sim! Oferecemos suporte contínuo, manutenção preventiva e atualizações. Temos planos mensais a partir de R$ 300.'
  },
  {
    id: '3',
    question: 'O site será responsivo?',
    answer: 'Absolutamente! Todos os nossos sites são desenvolvidos com design responsivo, garantindo uma experiência perfeita em todos os dispositivos.'
  },
  {
    id: '4',
    question: 'Vocês trabalham com qual tipo de empresa?',
    answer: 'Atendemos empresas de todos os portes, desde startups até grandes corporações, em diversos segmentos de mercado.'
  },
  {
    id: '5',
    question: 'Como funciona o processo de desenvolvimento?',
    answer: 'Nosso processo inclui: descoberta e planejamento, design e prototipagem, desenvolvimento, testes e lançamento, seguido de suporte contínuo.'
  },
  {
    id: '6',
    question: 'Vocês fazem otimização para SEO?',
    answer: 'Sim! Todos os nossos projetos incluem otimização básica para SEO. Também oferecemos serviços avançados de SEO como complemento.'
  }
]; 