import { motion } from 'framer-motion';
import { Target, Users, Lightbulb, Award, Linkedin, Github, Twitter } from 'lucide-react';
import { team } from '../utils/data';

export const About = () => {
  const values = [
    {
      icon: Target,
      title: 'Foco no Cliente',
      description: 'Colocamos nossos clientes no centro de tudo o que fazemos, entendendo suas necessidades e superando expectativas.'
    },
    {
      icon: Lightbulb,
      title: 'Inovação',
      description: 'Sempre buscamos as tecnologias mais avançadas e métodos inovadores para entregar soluções de ponta.'
    },
    {
      icon: Users,
      title: 'Trabalho em Equipe',
      description: 'Acreditamos que grandes resultados vêm da colaboração e do trabalho conjunto de profissionais talentosos.'
    },
    {
      icon: Award,
      title: 'Excelência',
      description: 'Comprometemo-nos com a qualidade máxima em cada projeto, desde o planejamento até a entrega final.'
    }
  ];

  const timeline = [
    {
      year: '2019',
      title: 'Fundação da WebHub',
      description: 'Início das atividades com foco em desenvolvimento web moderno e inovador.'
    },
    {
      year: '2020',
      title: 'Primeiros Grandes Clientes',
      description: 'Conquistamos a confiança de empresas de médio porte e expandimos nossa equipe.'
    },
    {
      year: '2021',
      title: 'Especialização em E-commerce',
      description: 'Desenvolvemos expertise em lojas virtuais e soluções de pagamento online.'
    },
    {
      year: '2022',
      title: '100+ Projetos Entregues',
      description: 'Marco histórico de 100 projetos concluídos com sucesso e clientes satisfeitos.'
    },
    {
      year: '2023',
      title: 'Expansão de Serviços',
      description: 'Adicionamos UI/UX Design e consultoria digital ao nosso portfólio.'
    },
    {
      year: '2024',
      title: 'Presente',
      description: 'Continuamos crescendo e inovando, sempre focados na excelência e satisfação do cliente.'
    }
  ];

  const socialIcons = {
    linkedin: Linkedin,
    github: Github,
    twitter: Twitter,
  };

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
              Sobre a <span className="text-gradient">WebHub</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              Conheça nossa história, valores e a equipe apaixonada que transforma 
              ideias em experiências digitais extraordinárias.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold font-display mb-6">
                Nossa <span className="text-gradient">Missão</span>
              </h2>
              
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                Na WebHub, nossa missão é democratizar o acesso a tecnologias web de alta qualidade, 
                ajudando empresas de todos os tamanhos a prosperarem no mundo digital.
              </p>
              
              <p className="text-lg text-gray-300 leading-relaxed">
                Acreditamos que cada negócio merece uma presença digital excepcional, e trabalhamos 
                incansavelmente para tornar isso realidade através de soluções inovadoras e personalizadas.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-primary-500/20 to-accent-500/20 rounded-2xl p-8 backdrop-blur-sm border border-primary-500/20">
                <div className="text-center">
                  <div className="text-6xl font-bold text-gradient mb-4">5+</div>
                  <div className="text-lg text-gray-300 mb-2">Anos de Experiência</div>
                  <div className="text-sm text-gray-400">Transformando o digital</div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-secondary-500/20 rounded-full blur-xl animate-pulse" />
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-accent-500/20 rounded-full blur-xl animate-pulse" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
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
              Nossos <span className="text-gradient">Valores</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Os princípios que guiam nosso trabalho e relacionamentos
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card-glow text-center group"
              >
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-primary-500 to-accent-500 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="h-8 w-8 text-white" />
                </div>
                
                <h3 className="text-xl font-semibold mb-4 text-white">
                  {value.title}
                </h3>
                
                <p className="text-gray-400">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
              Nossa <span className="text-gradient">Jornada</span>
            </h2>
            <p className="text-xl text-gray-400">
              A evolução da WebHub ao longo dos anos
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 via-accent-500 to-secondary-500" />

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative flex items-start space-x-8"
                >
                  {/* Timeline dot */}
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-white font-bold z-10">
                    {item.year}
                  </div>

                  {/* Content */}
                  <div className="card-glow flex-1 pt-4">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-400">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
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
              Nossa <span className="text-gradient">Equipe</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Conheça os profissionais talentosos que fazem a magia acontecer
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card-glow text-center group"
              >
                {/* Avatar */}
                <div className="relative w-24 h-24 mx-auto mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full rounded-full object-cover border-3 border-primary-500/30 group-hover:border-primary-500/60 transition-all duration-300"
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
                  <div className="w-full h-full bg-gradient-to-br from-primary-500 to-accent-500 rounded-full hidden items-center justify-center text-2xl font-bold text-white">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                </div>

                {/* Info */}
                <h3 className="text-lg font-semibold text-white mb-2">
                  {member.name}
                </h3>
                
                <p className="text-primary-400 text-sm mb-3">
                  {member.role}
                </p>
                
                <p className="text-gray-400 text-sm mb-6">
                  {member.bio}
                </p>

                {/* Social Links */}
                <div className="flex justify-center space-x-3">
                  {Object.entries(member.social).map(([platform, url]) => {
                    if (!url) return null;
                    const IconComponent = socialIcons[platform as keyof typeof socialIcons];
                    return (
                      <motion.a
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-dark-800 rounded-lg text-gray-400 hover:text-primary-500 hover:bg-dark-700 transition-all duration-200"
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <IconComponent size={16} />
                      </motion.a>
                    );
                  })}
                </div>
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
              Vamos trabalhar juntos?
            </h2>
            
            <p className="text-xl text-gray-300 mb-8">
              Entre em contato e descubra como podemos ajudar sua empresa a crescer no digital
            </p>
            
            <motion.a
              href="/contato"
              className="btn-primary inline-flex items-center justify-center group text-lg px-8 py-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Entrar em Contato
              <Users className="ml-2 h-6 w-6 group-hover:scale-110 transition-transform" />
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}; 