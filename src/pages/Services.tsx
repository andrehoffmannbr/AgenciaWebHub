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
                    <div className="text-primary-500 font-semibold text-lg mb-6">
                      {service.price}
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
    </div>
  );
}; 