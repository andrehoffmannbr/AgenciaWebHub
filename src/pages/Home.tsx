import { motion } from 'framer-motion';
import { ArrowRight, Code, Palette, Zap, Users, Star, CheckCircle, Trophy, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTypingEffect } from '../hooks/useTypingEffect';
import { AnimatedBackground } from '../components/AnimatedBackground';

export const Home = () => {
  const typingTexts = [
    'experiências digitais incríveis',
    'sites modernos e responsivos',
    'soluções web inovadoras',
    'interfaces únicas e funcionais'
  ];
  
  const currentText = useTypingEffect(typingTexts, 100, 50);

  const stats = [
    { number: '150+', label: 'Projetos Entregues', icon: Trophy },
    { number: '100%', label: 'Taxa de Satisfação', icon: Star },
    { number: '80+', label: 'Clientes Felizes', icon: Users },
    { number: '24h', label: 'Suporte Rápido', icon: Zap },
  ];

  const features = [
    {
      icon: Code,
      title: 'Desenvolvimento Moderno',
      description: 'Utilizamos as tecnologias mais avançadas para criar soluções robustas e escaláveis.',
      color: 'from-primary-500 to-blue-500'
    },
    {
      icon: Palette,
      title: 'Design Único',
      description: 'Criamos interfaces únicas que conectam com seu público e fortalecem sua marca.',
      color: 'from-accent-500 to-purple-500'
    },
    {
      icon: Zap,
      title: 'Performance Otimizada',
      description: 'Sites rápidos e otimizados que oferecem a melhor experiência do usuário.',
      color: 'from-secondary-500 to-green-500'
    },
    {
      icon: Users,
      title: 'Foco no Cliente',
      description: 'Trabalhamos lado a lado com você para entregar exatamente o que precisa.',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const testimonials = [
    {
      name: 'Ana Silva',
      role: 'CEO - TechStart',
      content: 'A WebHub transformou nossa presença digital. O resultado superou todas as expectativas!',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face'
    },
    {
      name: 'Carlos Mendes',
      role: 'Fundador - InnovaShop',
      content: 'Profissionais excepcionais! Entregaram nosso e-commerce no prazo e com qualidade impecável.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face'
    },
    {
      name: 'Mariana Costa',
      role: 'Diretora - CreativeHub',
      content: 'O melhor investimento que fizemos. Nossa conversão aumentou 300% após o novo site.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950">
        {/* Animated Background */}
        <AnimatedBackground />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <span className="inline-block px-3 py-1.5 md:px-4 md:py-2 bg-gradient-to-r from-primary-500/20 to-accent-500/20 border border-primary-500/30 rounded-full text-primary-400 text-xs md:text-sm font-medium mb-4 md:mb-6">
              🚀 Agência de Desenvolvimento Web
            </span>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-display mb-6 leading-tight">
              Criamos{' '}
              <span className="text-gradient block md:inline">
                {currentText}
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
              Transformamos suas ideias em realidade digital com tecnologia de ponta, 
              design excepcional e foco total nos resultados do seu negócio.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <a
              href="https://wa.me/48988430812"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-lg px-8 py-4 group inline-flex items-center justify-center"
            >
              Solicitar Orçamento
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </a>
            
            <Link
              to="/projetos"
              className="btn-secondary text-lg px-8 py-4 inline-flex items-center justify-center"
            >
              Ver Portfólio
            </Link>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-8 text-gray-400"
          >
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-secondary-500" />
              <span className="text-sm">Garantia de Qualidade</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-secondary-500" />
              <span className="text-sm">Entrega no Prazo</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-secondary-500" />
              <span className="text-sm">Suporte Vitalício</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-dark-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-500/5 to-transparent" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold font-display mb-4">
              Por que escolher a <span className="text-gradient">WebHub</span>?
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Combinamos expertise técnica com criatividade para entregar resultados excepcionais
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="card-glow group text-center hover:scale-105 transition-all duration-300"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 mb-6 bg-gradient-to-r ${feature.color} rounded-full group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-semibold mb-4 text-white group-hover:text-gradient transition-all duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-dark-900 to-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
              O que nossos <span className="text-gradient">clientes</span> dizem
            </h2>
            <p className="text-xl text-gray-400">
              Depoimentos reais de empresas que transformaram seus negócios conosco
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="card-glow relative"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-secondary-500 fill-current" />
                  ))}
                </div>
                
                <p className="text-gray-300 mb-6 italic leading-relaxed">
                  "{testimonial.content}"
                </p>
                
                <div className="flex items-center">
                  <div className="relative w-12 h-12 mr-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-primary-500/30 transition-all duration-300"
                      onLoad={(e) => {
                        e.currentTarget.style.opacity = '1';
                      }}
                      onError={(e) => {
                        // Fallback para avatar gerado se a imagem falhar
                        const target = e.currentTarget;
                        const fallback = target.nextElementSibling as HTMLElement;
                        target.style.display = 'none';
                        if (fallback) {
                          fallback.style.display = 'flex';
                        }
                      }}
                      style={{ opacity: 0 }}
                    />
                    <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full hidden items-center justify-center text-white font-bold">
                      {testimonial.name.charAt(0)}
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-sm text-gray-400">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process Preview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
              Nosso <span className="text-gradient">Processo</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Um método testado e aprovado para garantir o sucesso do seu projeto
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              { step: '01', title: 'Descoberta', icon: Target, description: 'Entendemos suas necessidades' },
              { step: '02', title: 'Planejamento', icon: Code, description: 'Criamos a estratégia perfeita' },
              { step: '03', title: 'Desenvolvimento', icon: Zap, description: 'Codificamos com excelência' },
              { step: '04', title: 'Entrega', icon: CheckCircle, description: 'Lançamos e acompanhamos' }
            ].map((process, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center group"
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-2xl font-bold text-white group-hover:scale-110 transition-transform duration-300">
                    {process.step}
                  </div>
                  <div className="absolute inset-0 w-20 h-20 mx-auto bg-gradient-to-r from-secondary-500/20 to-accent-500/20 rounded-full animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                <div className="mb-4">
                  <process.icon className="w-8 h-8 mx-auto text-primary-500 mb-2" />
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-gradient transition-all duration-300">
                  {process.title}
                </h3>
                
                <p className="text-gray-400">
                  {process.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-900/20 via-accent-900/20 to-secondary-900/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-accent-500/5 to-secondary-500/5" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold font-display mb-6">
              Pronto para transformar seu negócio?
            </h2>
            
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Vamos criar algo incrível juntos. Entre em contato agora e descubra 
              como podemos elevar sua presença digital a um novo patamar.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/48988430812"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-lg px-8 py-4 group inline-flex items-center justify-center"
              >
                Começar Meu Projeto
                <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </a>
              
              <a
                href="https://wa.me/48988430812"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-lg px-8 py-4 inline-flex items-center justify-center"
              >
                Conversar no WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}; 