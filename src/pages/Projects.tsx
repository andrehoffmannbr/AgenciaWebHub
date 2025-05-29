import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { ExternalLink, Github, Filter } from 'lucide-react';
import { projects } from '../utils/data';
import { OptimizedImage } from '../components/OptimizedImage';

export const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const projectsGridRef = useRef<HTMLElement>(null);
  
  const categories = ['Todos', ...Array.from(new Set(projects.map(project => project.category)))];
  
  const filteredProjects = selectedCategory === 'Todos' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  // Detecta se é dispositivo móvel
  const isMobileDevice = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
  };

  // Scroll suave para a seção de projetos
  const scrollToProjectsSection = () => {
    // Para mobile, sempre vamos para o topo da página para melhor UX
    if (isMobileDevice()) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      // Para desktop, mantemos o comportamento de ir para a seção
      const projectsSection = document.getElementById('projects-section');
      if (projectsSection) {
        projectsSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      } else {
        // Fallback para o topo se não encontrar a seção
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    }
  };

  // Handler para mudança de categoria
  const handleCategoryChange = (category: string) => {
    if (category === selectedCategory || isInitialLoad) return;
    
    setIsTransitioning(true);
    setSelectedCategory(category);
    
    // Delay personalizado para mobile
    const scrollDelay = isMobileDevice() ? 400 : 300;
    
    setTimeout(() => {
      scrollToProjectsSection();
      setTimeout(() => {
        setIsTransitioning(false);
      }, 200);
    }, scrollDelay);
  };

  // Marca que o carregamento inicial terminou
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

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
              Nossos <span className="text-gradient">Projetos</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              Conheça alguns dos projetos que desenvolvemos com paixão e dedicação, 
              sempre focando na excelência e inovação.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 border-b border-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <div className="flex items-center space-x-2 text-gray-400 mb-4 md:mb-0">
              <Filter size={20} />
              <span>Filtrar por:</span>
            </div>
            
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => handleCategoryChange(category)}
                disabled={isTransitioning}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 relative overflow-hidden ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white'
                    : 'bg-dark-800 text-gray-400 hover:text-primary-500 hover:bg-dark-700'
                } ${isTransitioning ? 'opacity-70 cursor-not-allowed' : ''}`}
                whileHover={!isTransitioning ? { scale: 1.05 } : {}}
                whileTap={!isTransitioning ? { scale: 0.95 } : {}}
              >
                {category}
                {/* Feedback visual durante transição */}
                {isTransitioning && selectedCategory === category && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  />
                )}
              </motion.button>
            ))}
          </motion.div>
          
          {/* Indicador de transição */}
          {isTransitioning && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-center mt-4"
            >
              <div className="inline-flex items-center space-x-2 text-primary-500 text-sm">
                <div className="w-4 h-4 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
                <span>Carregando projetos...</span>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Projects Grid */}
      <section id="projects-section" ref={projectsGridRef} className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            layout 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            animate={{ opacity: isTransitioning ? 0.6 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: isTransitioning ? 0 : index * 0.1,
                    layout: { duration: 0.4 }
                  }}
                  className="card-glow group overflow-hidden"
                >
                  {/* Project Image */}
                  <div className="relative h-48 mb-6 bg-gradient-to-br from-primary-500/20 to-accent-500/20 rounded-lg overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent z-10" />
                    
                    {/* Project image otimizada */}
                    <OptimizedImage
                      src={project.image}
                      alt={project.title}
                      width={400}
                      height={250}
                      className="w-full h-full"
                      priority={index < 3} // Prioridade para os primeiros 3 projetos
                      placeholder="blur"
                    />
                    
                    {/* Overlay with links */}
                    <div className="absolute inset-0 bg-dark-900/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4 z-20">
                      {project.link && (
                        <motion.a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 bg-primary-500 rounded-full text-white hover:bg-primary-600 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <ExternalLink size={20} />
                        </motion.a>
                      )}
                      
                      {project.github && (
                        <motion.a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 bg-dark-700 rounded-full text-white hover:bg-dark-600 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Github size={20} />
                        </motion.a>
                      )}
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="space-y-4">
                    {/* Category Badge */}
                    <span className="inline-block px-3 py-1 bg-accent-500/20 text-accent-400 text-sm rounded-full">
                      {project.category}
                    </span>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white group-hover:text-gradient transition-all duration-300">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2 py-1 bg-dark-800 text-primary-400 text-xs rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-gray-400 text-lg">
                Nenhum projeto encontrado nesta categoria.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Stats Section */}
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
              Resultados que <span className="text-gradient">Impressionam</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Nossos números refletem a qualidade e dedicação em cada projeto
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '150+', label: 'Projetos Entregues' },
              { number: '100%', label: 'Taxa de Satisfação' },
              { number: '24h', label: 'Tempo de Resposta' },
              { number: '3 Anos', label: 'Suporte Garantido' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400">{stat.label}</div>
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
              Que tal ser nosso próximo case de sucesso?
            </h2>
            
            <p className="text-xl text-gray-300 mb-8">
              Entre em contato e vamos criar algo incrível juntos
            </p>
            
            <motion.a
              href="https://wa.me/48988430812?text=Olá!%20Tenho%20interesse%20em%20criar%20meu%20site.%20Gostaria%20de%20saber%20mais%20sobre%20os%20serviços%20da%20WebHub."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center justify-center group text-lg px-8 py-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Iniciar Projeto
              <ExternalLink className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}; 