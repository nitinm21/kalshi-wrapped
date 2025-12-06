import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface ScreenWrapperProps {
  children: ReactNode;
  className?: string;
  gradient?: string;
}

const screenVariants = {
  initial: {
    opacity: 0,
    scale: 0.92,
    y: 20,
    rotateX: 5,
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const, // Premium easing curve
    },
  },
  exit: {
    opacity: 0,
    scale: 1.03,
    y: -20,
    transition: {
      duration: 0.4,
      ease: [0.64, 0, 0.78, 0] as const,
    },
  },
};

export function ScreenWrapper({
  children,
  className = '',
  gradient,
}: ScreenWrapperProps) {
  const bgStyle = gradient
    ? { background: gradient }
    : undefined;

  return (
    <motion.div
      variants={screenVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={`absolute inset-0 flex flex-col items-center justify-center overflow-hidden px-6 py-16 ${className}`}
      style={bgStyle}
    >
      {children}
    </motion.div>
  );
}

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

// Orchestrated stagger for dramatic reveals
export const staggerContainerSlow = {
  animate: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

export const fadeInUp = {
  initial: { opacity: 0, y: 40, filter: 'blur(4px)' },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export const fadeInDown = {
  initial: { opacity: 0, y: -30, filter: 'blur(4px)' },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.7 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.34, 1.56, 0.64, 1] as const, // Bouncy spring
    },
  },
};

export const slideInLeft = {
  initial: { opacity: 0, x: -60, filter: 'blur(4px)' },
  animate: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export const slideInRight = {
  initial: { opacity: 0, x: 60, filter: 'blur(4px)' },
  animate: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export const popIn = {
  initial: { opacity: 0, scale: 0.3, rotate: -10 },
  animate: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 15,
    },
  },
};
