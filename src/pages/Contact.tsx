import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle, 
  AlertCircle,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { faqs } from '../utils/data';
import type { ContactForm } from '../types';
// 🔒 TRACKING DUPLO: PIXEL + CONVERSIONS API
import { trackLead, trackContact } from '../utils/metaPixel';
import { sendLeadEvent, sendContactEvent } from '../utils/conversionsApi';
// 📊 TRACKING GOOGLE ANALYTICS
import { useGoogleAnalytics } from '../utils/googleAnalytics';

export const Contact = () => {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  // 📊 Google Analytics Hook
  const { trackLead: trackGoogleLead, trackContact: trackGoogleContact } = useGoogleAnalytics();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('https://formspree.io/f/xanogvdj', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', company: '', message: '' });
        
        // 🔒 TRACKING DUPLO: PIXEL + CONVERSIONS API
        // 1. Tracking via Meta Pixel (client-side)
        trackLead({
          content_name: 'Contact Form',
          content_category: 'Lead Generation',
          value: 0,
          currency: 'BRL'
        });
        trackContact();
        
        // 📊 TRACKING TRIPLO: GOOGLE ANALYTICS
        // 3. Tracking via Google Analytics
        trackGoogleLead({
          value: 100,
          currency: 'BRL',
          content_name: 'Contact Form WebHub',
          content_category: 'Lead Generation'
        });
        trackGoogleContact('form');
        
        // 2. Tracking via Conversions API (server-side)
        const userData = {
          email: formData.email,
          phone: formData.company // Se company contém telefone, ajuste conforme necessário
        };
        
        await sendLeadEvent(userData, {
          content_name: 'Contact Form WebHub',
          content_category: 'Lead Generation',
          value: 100, // Valor estimado do lead
          currency: 'BRL'
        });
        
        await sendContactEvent(userData);
        
        console.log('📊 Conversão registrada via PIXEL + API + GA: Lead de contato');
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      content: 'contato@webhub.com.br',
      description: 'Resposta em até 24h'
    },
    {
      icon: Phone,
      title: 'Telefone',
      content: '48 98843-0812',
      description: 'orçamento gratuito'
    },
    {
      icon: MapPin,
      title: 'Localização',
      content: 'Florianópolis, Santa Catarina',
      description: 'Atendimento remoto'
    },
    {
      icon: Clock,
      title: 'Horário',
      content: '09:00 - 18:00',
      description: 'Segunda a Sexta'
    }
  ];

  return (
    <div className="min-h-screen bg-dark-950 pt-20">
      {/* Contact Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary-900/20 via-accent-900/20 to-secondary-900/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-accent-500/5 to-secondary-500/5" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold font-display mb-6">
              Vamos conversar sobre seu
              <span className="text-gradient block">próximo projeto?</span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Estamos prontos para transformar suas ideias em soluções digitais incríveis. 
              Entre em contato e descubra como podemos ajudar seu negócio a crescer.
            </p>
          </motion.div>

          {/* Contact Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card-glow p-6 text-center group hover:scale-105 transition-transform duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full group-hover:scale-110 transition-transform duration-300">
                  <info.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-semibold mb-2">{info.title}</h3>
                <p className="text-primary-400 font-medium mb-1">{info.content}</p>
                <p className="text-gray-400 text-sm">{info.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map Section */}
      <section className="py-20 bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="card-glow p-8"
            >
              <h2 className="text-3xl font-bold font-display mb-6">
                Envie sua mensagem
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Nome *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-dark-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                      placeholder="Seu nome completo"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-dark-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="company" className="block text-sm font-medium mb-2">
                    Empresa
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-dark-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                    placeholder="Nome da sua empresa"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Mensagem *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-dark-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors resize-none"
                    placeholder="Conte-nos sobre seu projeto..."
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary py-4 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Enviar Mensagem
                    </>
                  )}
                </button>
                
                {/* Status Messages */}
                <AnimatePresence>
                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-2 text-green-400 bg-green-400/10 p-4 rounded-lg"
                    >
                      <CheckCircle className="w-5 h-5" />
                      Mensagem enviada com sucesso! Entraremos em contato em breve.
                    </motion.div>
                  )}
                  
                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-2 text-red-400 bg-red-400/10 p-4 rounded-lg"
                    >
                      <AlertCircle className="w-5 h-5" />
                      Erro ao enviar mensagem. Tente novamente ou entre em contato diretamente.
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </motion.div>
            
            {/* Map/Additional Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="card-glow p-8">
                <h3 className="text-2xl font-bold font-display mb-6">
                  Por que escolher a WebHub?
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mt-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Experiência Comprovada</h4>
                      <p className="text-gray-400">Mais de 50 projetos entregues com excelência.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-accent-500 rounded-full mt-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Tecnologia Avançada</h4>
                      <p className="text-gray-400">Utilizamos as tecnologias mais modernas do mercado.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-secondary-500 rounded-full mt-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Suporte Contínuo</h4>
                      <p className="text-gray-400">Acompanhamento completo durante todo o projeto.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mt-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Resultados Garantidos</h4>
                      <p className="text-gray-400">Foco em performance e conversões.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="card-glow p-8">
                <h3 className="text-2xl font-bold font-display mb-6">
                  Atendimento Rápido
                </h3>
                
                <div className="space-y-4">
                  <p className="text-gray-300">
                    Nosso time está sempre disponível para tirar suas dúvidas e 
                    discutir seu projeto. Entre em contato através do WhatsApp 
                    para um atendimento ainda mais rápido.
                  </p>
                  
                  <a
                    href="https://wa.me/48988430812"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary inline-flex items-center gap-2"
                  >
                    <Phone className="w-5 h-5" />
                    Chamar no WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-dark-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold font-display mb-6">
              Perguntas Frequentes
            </h2>
            
            <p className="text-xl text-gray-300 leading-relaxed">
              Esclareça suas principais dúvidas sobre nossos serviços
            </p>
          </motion.div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card-glow overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
                >
                  <span className="text-lg font-semibold pr-4">{faq.question}</span>
                  {openFaq === faq.id ? (
                    <ChevronUp className="w-6 h-6 text-primary-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                
                <AnimatePresence>
                  {openFaq === faq.id && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-gray-300 leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}; 