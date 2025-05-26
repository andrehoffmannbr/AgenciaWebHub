import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub', disabled: true },
    { icon: Linkedin, href: '#', label: 'LinkedIn', disabled: true },
    { icon: Twitter, href: '#', label: 'Twitter', disabled: true },
    { icon: Instagram, href: 'https://www.instagram.com/webhubbrasil/', label: 'Instagram', disabled: false },
  ];

  const services = [
    'Desenvolvimento de Sites',
    'Landing Pages',
    'E-commerces',
    'SEO & Performance',
    'UI/UX Design'
  ];

  const company = [
    { name: 'Sobre', href: '/sobre' },
    { name: 'Projetos', href: '/projetos' },
    { name: 'Serviços', href: '/servicos' },
    { name: 'Contato', href: '/contato' },
  ];

  return (
    <footer className="bg-dark-900 border-t border-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="col-span-1 lg:col-span-2"
          >
            <Link to="/" className="text-3xl font-bold text-gradient font-display mb-4 inline-block">
              WebHub
            </Link>
            
            <p className="text-gray-400 mb-6 max-w-md">
              Transformamos ideias em experiências digitais incríveis. 
              Especialistas em desenvolvimento web moderno com foco em 
              resultados e inovação.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-400">
                <Mail size={18} className="text-primary-500" />
                <span>contato@webhub.com.br</span>
              </div>
              
              <div className="flex items-center space-x-3 text-gray-400">
                <Phone size={18} className="text-primary-500" />
                <span>+55 (48) 98843-0812</span>
              </div>
              
              <div className="flex items-center space-x-3 text-gray-400">
                <MapPin size={18} className="text-primary-500" />
                <span>Florianópolis, Santa Catarina</span>
              </div>
            </div>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold text-white mb-4">Serviços</h3>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li key={index}>
                  <Link
                    to="/servicos"
                    className="text-gray-400 hover:text-primary-500 transition-colors duration-200"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold text-white mb-4">Empresa</h3>
            <ul className="space-y-2">
              {company.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.href}
                    className="text-gray-400 hover:text-primary-500 transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="pt-8 mt-8 border-t border-dark-800 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {currentYear} WebHub. Todos os direitos reservados.
          </p>

          {/* Social Links */}
          <div className="flex space-x-4">
            {socialLinks.map((social, index) => (
              social.disabled ? (
                <motion.div
                  key={index}
                  className="p-2 bg-dark-800 rounded-lg text-gray-600 cursor-not-allowed opacity-50"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </motion.div>
              ) : (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-dark-800 rounded-lg text-gray-400 hover:text-primary-500 hover:bg-dark-700 transition-all duration-200"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </motion.a>
              )
            ))}
          </div>
        </motion.div>
      </div>

      {/* Background decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent" />
    </footer>
  );
}; 