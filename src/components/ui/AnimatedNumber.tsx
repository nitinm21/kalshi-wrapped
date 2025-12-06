import { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  delay?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export function AnimatedNumber({
  value,
  duration = 1.5,
  delay = 0,
  decimals = 0,
  prefix = '',
  suffix = '',
  className = '',
}: AnimatedNumberProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  const spring = useSpring(0, {
    duration: duration * 1000,
    bounce: 0,
  });

  const display = useTransform(spring, (current) =>
    `${prefix}${current.toFixed(decimals)}${suffix}`
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(true);
      spring.set(value);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [value, delay, spring]);

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isAnimating ? 1 : 0, y: isAnimating ? 0 : 20 }}
      transition={{ duration: 0.5, delay }}
    >
      {display}
    </motion.span>
  );
}
