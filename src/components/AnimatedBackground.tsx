import { motion } from 'framer-motion';
import { useEffect, useState, useMemo } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  speed: number;
}

export const AnimatedBackground = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  // Memoizar cores para evitar recriação desnecessária
  const colors = useMemo(() => ['#00D4FF', '#39FF14', '#8A2BE2'], []);

  useEffect(() => {
    // Reduzir partículas em dispositivos móveis para melhor performance
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 50 : 100;
    
    // Generate particles
    const newParticles: Particle[] = [];
    
    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: Math.random() * 2 + 0.5,
      });
    }
    
    setParticles(newParticles);
  }, [colors]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Gradient Orbs */}
      <motion.div
        className="absolute w-96 h-96 bg-gradient-to-r from-primary-500/20 to-transparent rounded-full blur-3xl will-change-transform"
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ top: '10%', left: '5%' }}
      />
      
      <motion.div
        className="absolute w-80 h-80 bg-gradient-to-r from-accent-500/20 to-transparent rounded-full blur-3xl will-change-transform"
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
          scale: [1, 0.8, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        style={{ top: '40%', right: '10%' }}
      />
      
      <motion.div
        className="absolute w-64 h-64 bg-gradient-to-r from-secondary-500/20 to-transparent rounded-full blur-3xl will-change-transform"
        animate={{
          x: [0, 120, 0],
          y: [0, -40, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        style={{ bottom: '20%', left: '20%' }}
      />

      {/* Floating Particles - Otimizado para performance */}
      {particles.slice(0, window.innerWidth < 768 ? 30 : 60).map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full will-change-transform"
          style={{
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color + '40',
          }}
          animate={{
            x: [
              particle.x,
              particle.x + (Math.random() - 0.5) * 200,
              particle.x,
            ],
            y: [
              particle.y,
              particle.y + (Math.random() - 0.5) * 200,
              particle.y,
            ],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5,
          }}
        />
      ))}

      {/* Geometric Shapes */}
      <motion.div
        className="absolute w-20 h-20 border border-primary-500/30 rotate-45 will-change-transform hidden md:block"
        animate={{
          rotate: [45, 225, 45],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{ top: '15%', right: '25%' }}
      />
      
      <motion.div
        className="absolute w-16 h-16 border-2 border-accent-500/30 rounded-full will-change-transform hidden md:block"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ top: '60%', left: '15%' }}
      />
      
      <motion.div
        className="absolute w-12 h-12 bg-gradient-to-r from-secondary-500/30 to-transparent will-change-transform hidden lg:block"
        animate={{
          rotate: [0, 360],
          x: [0, 50, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{ bottom: '30%', right: '20%' }}
      />

      {/* Grid Lines - Simplificado para mobile */}
      <div className="absolute inset-0 opacity-5 hidden lg:block">
        <div className="grid grid-cols-12 h-full">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="border-r border-primary-500/20" />
          ))}
        </div>
      </div>

      {/* Radial Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-dark-950/50 to-dark-950" />
    </div>
  );
}; 