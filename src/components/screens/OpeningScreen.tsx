import { motion } from 'framer-motion';
import { ScreenWrapper, staggerContainer, fadeInUp, fadeInDown, scaleIn, popIn } from '../ui/ScreenWrapper';
import { AnimatedNumber } from '../ui/AnimatedNumber';
import type { WrappedData } from '../../data/sampleData';

interface OpeningScreenProps {
  data: WrappedData;
}

export function OpeningScreen({ data }: OpeningScreenProps) {
  // Generate floating particles
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 6 + 8,
    delay: Math.random() * 2,
  }));

  return (
    <ScreenWrapper
      gradient="radial-gradient(ellipse at top, #003221 0%, #000000 50%, #000000 100%)"
    >
      <motion.div
        className="relative z-10 flex max-w-lg flex-col items-center text-center"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {/* Logo with shimmer */}
        <motion.div
          variants={fadeInDown}
          className="mb-12"
        >
          <div className="gradient-text-kalshi mb-2 text-lg font-bold uppercase tracking-[0.35em]">
            Kalshi
          </div>
          <div className="text-xs font-semibold uppercase tracking-[0.4em] text-[#09C285]/60">
            Wrapped 2025
          </div>
        </motion.div>

        {/* Main text with dramatic styling */}
        <motion.p
          variants={fadeInUp}
          className="mb-4 text-2xl font-light leading-tight tracking-tight text-white/70 md:text-3xl"
        >
          In 2025, you didn't just
          <br />
          watch the future unfold.
        </motion.p>

        <motion.div
          variants={scaleIn}
          className="relative mb-16"
        >
          <h1 className="text-5xl font-bold text-[#09C285] md:text-6xl lg:text-7xl">
            You traded it.
          </h1>
          <motion.div
            className="absolute -bottom-2 left-1/2 h-1 w-32 -translate-x-1/2 rounded-full bg-gradient-to-r from-transparent via-[#09C285] to-transparent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.8, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.div>

        {/* Stats with premium styling */}
        <motion.div
          variants={fadeInUp}
          className="mb-8 flex flex-col items-center gap-4"
        >
          <div className="flex flex-col items-center gap-3">
            <span className="text-base font-medium uppercase tracking-wider text-white/50">
              You made
            </span>
            <div className="relative">
              <AnimatedNumber
                value={data.total_predictions}
                className="text-7xl font-bold text-white md:text-8xl"
                delay={1}
              />
              <motion.div
                className="absolute -inset-4 -z-10 rounded-full bg-[#09C285]/20 blur-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </div>
          </div>
          <motion.div
            variants={fadeInUp}
            className="text-lg text-white/70 md:text-xl"
          >
            predictions across{' '}
            <span className="font-bold text-[#09C285]">{data.total_markets}</span>{' '}
            markets
          </motion.div>
        </motion.div>

        {/* Percentile badge */}
        <motion.div
          variants={popIn}
          className="glass-card-premium group relative overflow-hidden rounded-2xl px-8 py-4 hover-lift"
        >
          <div className="relative z-10 flex items-center gap-2">
            <span className="text-sm font-medium text-white/60">More than</span>
            <span className="text-2xl font-bold text-[#09C285]">{data.percentile}%</span>
            <span className="text-sm font-medium text-white/60">of traders</span>
          </div>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-[#09C285]/0 via-[#09C285]/10 to-[#09C285]/0"
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'linear',
              repeatDelay: 1,
            }}
          />
        </motion.div>
      </motion.div>

      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Floating particles */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              background: `radial-gradient(circle, rgba(9, 194, 133, 0.6) 0%, transparent 70%)`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 15, -15, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Large ambient glows */}
        <motion.div
          className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-[#09C285]/20 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-[#003221]/40 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />

        {/* Diagonal light ray */}
        <motion.div
          className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-transparent via-[#09C285]/30 to-transparent"
          style={{
            transform: 'translateX(-50%) rotate(30deg)',
            transformOrigin: 'center',
          }}
          initial={{ opacity: 0, x: '-100%' }}
          animate={{
            opacity: [0, 0.6, 0],
            x: ['-100%', '200%'],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatDelay: 3,
            ease: 'easeInOut',
          }}
        />
      </div>
    </ScreenWrapper>
  );
}
