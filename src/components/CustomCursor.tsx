import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    const mouseEnter = () => setIsVisible(true);
    const mouseLeave = () => setIsVisible(false);

    // Detect hover elements
    const handleMouseEnter = (variant: string) => () => setCursorVariant(variant);
    const handleMouseLeave = () => setCursorVariant('default');

    // Add event listeners for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [data-cursor="pointer"], .btn-primary, .btn-secondary, .card-glow');
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter('hover'));
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    // Add event listeners for text elements
    const textElements = document.querySelectorAll('h1, h2, h3, p, span');
    textElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter('text'));
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mouseenter', mouseEnter);
    window.addEventListener('mouseleave', mouseLeave);

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('mouseenter', mouseEnter);
      window.removeEventListener('mouseleave', mouseLeave);
      
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter('hover'));
        el.removeEventListener('mouseleave', handleMouseLeave);
      });

      textElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter('text'));
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      scale: 1,
      backgroundColor: 'rgba(0, 212, 255, 0.1)',
      border: '2px solid rgba(0, 212, 255, 0.3)',
    },
    hover: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      scale: 1.5,
      backgroundColor: 'rgba(0, 212, 255, 0.2)',
      border: '2px solid rgba(0, 212, 255, 0.6)',
    },
    text: {
      x: mousePosition.x - 20,
      y: mousePosition.y - 20,
      scale: 1.2,
      backgroundColor: 'rgba(57, 255, 20, 0.1)',
      border: '2px solid rgba(57, 255, 20, 0.4)',
    }
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        animate={variants[cursorVariant as keyof typeof variants]}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
          mass: 0.5
        }}
        style={{
          background: 'rgba(0, 212, 255, 0.1)',
          border: '2px solid rgba(0, 212, 255, 0.3)',
        }}
      />

      {/* Trail cursor */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-[9998]"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
        }}
        transition={{
          type: 'spring',
          stiffness: 150,
          damping: 15,
          mass: 0.1
        }}
        style={{
          background: 'rgba(138, 43, 226, 0.4)',
          filter: 'blur(1px)',
        }}
      />

      {/* Dot cursor */}
      <motion.div
        className="fixed top-0 left-0 w-1 h-1 rounded-full pointer-events-none z-[10000] bg-primary-500"
        animate={{
          x: mousePosition.x - 2,
          y: mousePosition.y - 2,
        }}
        transition={{
          type: 'spring',
          stiffness: 1000,
          damping: 35,
        }}
      />

      {/* Particles following cursor */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="fixed top-0 left-0 w-1 h-1 rounded-full pointer-events-none z-[9997]"
          animate={{
            x: mousePosition.x - 2 + Math.sin(Date.now() * 0.001 + i) * 20,
            y: mousePosition.y - 2 + Math.cos(Date.now() * 0.001 + i) * 20,
            opacity: cursorVariant === 'hover' ? 0.8 : 0.3,
          }}
          transition={{
            type: 'spring',
            stiffness: 100,
            damping: 10,
            delay: i * 0.05,
          }}
          style={{
            backgroundColor: i === 0 ? '#00D4FF' : i === 1 ? '#39FF14' : '#8A2BE2',
            filter: 'blur(0.5px)',
          }}
        />
      ))}
    </>
  );
}; 