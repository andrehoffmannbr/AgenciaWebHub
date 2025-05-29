import { motion } from 'framer-motion';
import { 
  Globe, 
  Zap, 
  ShoppingCart, 
  TrendingUp, 
  Shield, 
  Palette,
  Check,
  ArrowRight 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { services } from '../utils/data';

const iconMap = {
  Globe,
  Zap,
  ShoppingCart,
  TrendingUp,
  Shield,
  Palette,
};

export const Services = () => {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-dark-950 to-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-6">
              Nossos <span className="text-gradient">Serviços</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              Oferecemos soluções completas em desenvolvimento web, 
              desde sites institucionais até e-commerces complexos.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = iconMap[service.icon as keyof typeof iconMap];
              
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="card-glow group hover:scale-105"
                >
                  {/* Icon */}
                  <div className="flex items-center justify-center w-16 h-16 mb-6 bg-gradient-to-r from-primary-500 to-accent-500 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-gradient transition-all duration-300">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3">
                        <Check className="h-5 w-5 text-secondary-500 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Price */}
                  {service.price && (
                    <div className="mb-6">
                      {/* Preços com promoção (riscados) */}
                      {(service.id === '1' || service.id === '2' || service.id === '4' || service.id === '6') && (
                        <div className="text-center">
                          <div className="text-gray-500 line-through text-sm mb-1">
                            {service.price}
                          </div>
                          <div className="text-accent-500 font-bold text-xl animate-pulse">
                            🎁 PROMOÇÃO ATIVA
                          </div>
                        </div>
                      )}
                      
                      {/* Preços normais (E-commerce e Manutenção) */}
                      {(service.id === '3' || service.id === '5') && (
                        <div className="text-primary-500 font-semibold text-lg">
                          {service.price}
                        </div>
                      )}
                    </div>
                  )}

                  {/* CTA Button */}
                  <a
                    href="https://wa.me/48988430812?text=Olá!%20Tenho%20interesse%20em%20criar%20meu%20site.%20Gostaria%20de%20saber%20mais%20sobre%20os%20serviços%20da%20WebHub."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary inline-flex items-center justify-center group"
                  >
                    Solicitar Orçamento
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
              Como <span className="text-gradient">Trabalhamos</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Nosso processo é estruturado para garantir os melhores resultados
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Descoberta',
                description: 'Entendemos suas necessidades e objetivos de negócio'
              },
              {
                step: '02',
                title: 'Planejamento',
                description: 'Criamos a estratégia e estrutura do projeto'
              },
              {
                step: '03',
                title: 'Desenvolvimento',
                description: 'Codificamos com as melhores práticas e tecnologias'
              },
              {
                step: '04',
                title: 'Entrega',
                description: 'Lançamos e oferecemos suporte contínuo'
              }
            ].map((process, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-2xl font-bold text-white">
                    {process.step}
                  </div>
                  
                  {/* Connector line */}
                  {index < 3 && (
                    <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 opacity-30" />
                  )}
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-3">
                  {process.title}
                </h3>
                
                <p className="text-gray-400">
                  {process.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-900/20 to-accent-900/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-6">
              Pronto para começar seu projeto?
            </h2>
            
            <p className="text-xl text-gray-300 mb-8">
              Entre em contato conosco e vamos transformar sua ideia em realidade
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/48988430812?text=Olá!%20Tenho%20interesse%20em%20criar%20meu%20site.%20Gostaria%20de%20saber%20mais%20sobre%20os%20serviços%20da%20WebHub."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center justify-center group"
              >
                Solicitar Orçamento
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
              
              <Link
                to="/projetos"
                className="btn-secondary inline-flex items-center justify-center"
              >
                Ver Projetos
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Special Offer Banner */}
      <section className="py-16 bg-gradient-to-r from-accent-900/30 via-primary-900/30 to-secondary-900/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-500/10 via-primary-500/10 to-secondary-500/10" />
        
        {/* Animated background particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-accent-500/30 rounded-full"
              initial={{
                x: Math.random() * 100 + "%",
                y: Math.random() * 100 + "%",
                scale: 0,
              }}
              animate={{
                scale: [0, 1, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="inline-block"
            >
              <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-accent-500/20 to-secondary-500/20 border border-accent-500/30 rounded-full text-accent-400 text-sm font-medium">
                🎁 Oferta Limitada
              </span>
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-gradient"
            >
              Aproveite Nossa Oferta Especial!
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-xl text-gray-300 max-w-2xl mx-auto"
            >
              Por tempo limitado, todos os nossos serviços com <span className="text-accent-400 font-semibold">preços promocionais incríveis</span>
            </motion.p>

            {/* Special Offer Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="pt-4"
            >
              <motion.a
                href="https://wa.me/48988430812?text=Quero%20garantir%20a%20oferta%20especial%20de%20R$799,00"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-accent-500 via-secondary-500 to-primary-500 text-white font-bold text-xl rounded-2xl shadow-2xl shadow-accent-500/25 transform transition-all duration-300 hover:scale-110 hover:shadow-accent-500/40 group relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Background animation */}
                <div className="absolute inset-0 bg-gradient-to-r from-secondary-500 via-accent-500 to-primary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Content */}
                <span className="relative z-10 flex items-center">
                  🎁 Oferta especial: R$ 799,00
                  <motion.span
                    className="ml-2"
                    animate={{ 
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    🚀
                  </motion.span>
                </span>
                
                {/* Shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3,
                    ease: "linear"
                  }}
                />
              </motion.a>
            </motion.div>

            {/* Additional info */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="text-sm text-gray-500"
            >
              * Condições especiais válidas por tempo limitado
            </motion.p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}; 