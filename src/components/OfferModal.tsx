import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { X, Gift, Clock, Zap } from 'lucide-react';

interface OfferModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OfferModal = ({ isOpen, onClose }: OfferModalProps) => {
  const [timeLeft, setTimeLeft] = useState(2 * 60 * 60); // 2 horas em segundos

  useEffect(() => {
    if (!isOpen) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Reinicia o cronômetro quando chega a zero
          return 2 * 60 * 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return {
      hours: hours.toString().padStart(2, '0'),
      minutes: minutes.toString().padStart(2, '0'),
      seconds: secs.toString().padStart(2, '0'),
    };
  };

  const time = formatTime(timeLeft);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
          >
            <div className="relative max-w-2xl w-full bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 rounded-2xl sm:rounded-3xl border border-primary-500/30 shadow-2xl overflow-hidden my-4 max-h-[95vh]">
              {/* Background Effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-accent-500/5 to-secondary-500/5" />
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 via-accent-500 to-secondary-500" />

              {/* Close Button */}
              <button
                onClick={onClose}
                title="Fechar modal"
                aria-label="Fechar modal de oferta especial"
                className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 bg-dark-700/50 hover:bg-dark-600/50 rounded-full text-gray-400 hover:text-white transition-all duration-200 z-10"
              >
                <X size={20} />
              </button>

              {/* Content */}
              <div className="relative p-4 sm:p-6 lg:p-8 text-center overflow-y-auto max-h-[90vh]">
                {/* Gift Icon */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring", damping: 15 }}
                  className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 mb-4 sm:mb-6 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
                >
                  <Gift className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </motion.div>

                {/* Title */}
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-2xl sm:text-3xl md:text-4xl font-bold text-gradient mb-3 sm:mb-4"
                >
                  🎉 Oferta Imperdível!
                </motion.h2>

                {/* Message */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8 px-2"
                >
                  Você ganhou uma oferta exclusiva:
                  <br />
                  <span className="text-xl sm:text-2xl font-bold text-gradient">
                    Site Completo por apenas R$ 799,00
                  </span>
                </motion.p>

                {/* Features */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8"
                >
                  {[
                    { icon: Zap, text: "Entrega em 7 dias" },
                    { icon: Gift, text: "Design Responsivo" },
                    { icon: Clock, text: "Suporte 24/7" }
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center justify-center space-x-2 p-3 bg-dark-700/30 rounded-lg border border-primary-500/20">
                      <feature.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary-500" />
                      <span className="text-gray-300 text-xs sm:text-sm">{feature.text}</span>
                    </div>
                  ))}
                </motion.div>

                {/* Countdown Timer */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mb-6 sm:mb-8"
                >
                  <div className="flex items-center justify-center space-x-2 mb-3 sm:mb-4 px-2">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-accent-500" />
                    <span className="text-accent-400 font-semibold text-sm sm:text-base">Tempo restante para aproveitar:</span>
                  </div>
                  
                  <div className="flex items-center justify-center space-x-2 sm:space-x-4">
                    {[
                      { value: time.hours, label: 'Horas' },
                      { value: time.minutes, label: 'Minutos' },
                      { value: time.seconds, label: 'Segundos' }
                    ].map((unit, index) => (
                      <div key={index} className="text-center">
                        <div className="bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg sm:rounded-xl p-2 sm:p-4 min-w-[60px] sm:min-w-[80px] mb-2">
                          <span className="text-xl sm:text-3xl font-bold text-white">
                            {unit.value}
                          </span>
                        </div>
                        <span className="text-xs sm:text-sm text-gray-400 font-medium">
                          {unit.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="flex flex-col gap-3 sm:gap-4 justify-center px-2"
                >
                  <a
                    href="https://wa.me/48988430812?text=Quero%20garantir%20a%20oferta%20especial%20de%20R$799,00"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 group w-full flex items-center justify-center"
                    onClick={onClose}
                  >
                    Aproveitar Oferta Agora!
                    <Zap className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
                  </a>
                  
                  <button
                    onClick={onClose}
                    className="btn-secondary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full"
                  >
                    Talvez Depois
                  </button>
                </motion.div>

                {/* Disclaimer */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-xs text-gray-500 mt-4 sm:mt-6 px-2"
                >
                  * Oferta válida para novos clientes. Sujeita a disponibilidade.
                </motion.p>
              </div>

              {/* Animated particles */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-primary-500/30 rounded-full"
                    initial={{
                      x: Math.random() * 100 + "%",
                      y: "100%",
                      opacity: 0,
                    }}
                    animate={{
                      y: "-100%",
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: Math.random() * 3 + 2,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}; 