import { motion } from 'framer-motion';
import { ScreenWrapper, staggerContainer } from '../ui/ScreenWrapper';
import type { WrappedData } from '../../data/sampleData';

interface PersonalityScreenProps {
  data: WrappedData;
}

// Updated with Kalshi-inspired gradients
const personalityGradients: Record<string, string> = {
  dynasty_killer: 'linear-gradient(135deg, #D91616 0%, #AA00FF 100%)', // Decrease red + No purple
  tape_reader: 'linear-gradient(135deg, #265CFF 0%, #09C285 100%)', // Yes blue + Primary green
  hedge_fund: 'linear-gradient(135deg, #09C285 0%, #068B5F 100%)', // Primary green gradient
  true_believer: 'linear-gradient(135deg, #265CFF 0%, #AA00FF 100%)', // Yes to No
  arbitrageur: 'linear-gradient(135deg, #AA00FF 0%, #09C285 100%)', // No to Primary
  oracle: 'linear-gradient(135deg, #0FE29B 0%, #09C285 100%)', // Bright green to primary
};

const personalityIcons: Record<string, string> = {
  dynasty_killer: '👑',
  tape_reader: '📊',
  hedge_fund: '💼',
  true_believer: '🎯',
  arbitrageur: '⚖️',
  oracle: '🔮',
};

const personalityAccents: Record<string, string> = {
  dynasty_killer: '#D91616',
  tape_reader: '#265CFF',
  hedge_fund: '#09C285',
  true_believer: '#265CFF',
  arbitrageur: '#AA00FF',
  oracle: '#0FE29B',
};

export function PersonalityScreen({ data }: PersonalityScreenProps) {
  const gradient = personalityGradients[data.personality] || personalityGradients.dynasty_killer;
  const icon = personalityIcons[data.personality] || '🎯';
  const accent = personalityAccents[data.personality] || '#D91616';

  return (
    <ScreenWrapper
      gradient="radial-gradient(circle at 50% 50%, #1a0a0f 0%, #0a0a0a 100%)"
    >
      <motion.div
        className="flex w-full max-w-2xl flex-col items-center text-center"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {/* Heading */}
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-6 px-4 text-xs font-medium uppercase tracking-[0.2em] text-white/40 sm:mb-12 sm:text-sm sm:tracking-[0.3em]"
        >
          Your prediction style is hard to pin down, but if we had to...
        </motion.p>

        {/* Championship Badge */}
        <motion.div
          initial={{ scale: 0, rotateY: -180 }}
          animate={{ scale: 1, rotateY: 0 }}
          transition={{
            delay: 0.4,
            duration: 1,
            type: 'spring',
            bounce: 0.3,
          }}
          className="relative mb-6 sm:mb-10"
          style={{ perspective: '1000px' }}
        >
          {/* Glow rings */}
          <motion.div
            className="absolute -inset-4 rounded-full opacity-40 blur-xl sm:-inset-8 sm:blur-2xl"
            style={{ background: gradient }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Hexagonal badge frame */}
          <div className="relative">
            {/* Shadow layer */}
            <motion.div
              className="absolute inset-0 translate-y-1 sm:translate-y-2"
              style={{
                clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
                background: 'rgba(0, 0, 0, 0.5)',
                filter: 'blur(8px)',
              }}
            />

            {/* Outer hexagon */}
            <motion.div
              className="relative h-40 w-40 sm:h-56 sm:w-56"
              style={{
                clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
                background: `linear-gradient(135deg, ${accent}40 0%, ${accent}20 100%)`,
                boxShadow: `0 0 60px ${accent}60, inset 0 0 30px ${accent}30`,
              }}
              animate={{
                boxShadow: [
                  `0 0 60px ${accent}60, inset 0 0 30px ${accent}30`,
                  `0 0 80px ${accent}80, inset 0 0 40px ${accent}40`,
                  `0 0 60px ${accent}60, inset 0 0 30px ${accent}30`,
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              {/* Inner hexagon with icon */}
              <div
                className="absolute inset-2 flex items-center justify-center sm:inset-4"
                style={{
                  clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
                  background: gradient,
                }}
              >
                <motion.span
                  className="text-5xl sm:text-7xl"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  {icon}
                </motion.span>
              </div>

              {/* Scanlines effect */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)',
                  clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
                }}
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mb-6 px-4 text-4xl font-black uppercase leading-none tracking-tight sm:mb-8 sm:text-6xl md:text-7xl"
          style={{
            background: gradient,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: `0 0 40px ${accent}40`,
            fontFamily: '"Rajdhani", "Orbitron", sans-serif',
            letterSpacing: '-0.02em',
          }}
        >
          {data.personality_title}
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mb-8 max-w-lg px-4 text-base leading-relaxed text-white/90 sm:mb-12 sm:text-xl"
          style={{
            fontFamily: '"DM Sans", system-ui, sans-serif',
            fontWeight: 400,
          }}
        >
          {data.personality_description}
        </motion.p>

        {/* Rarity Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="relative mx-4 overflow-hidden rounded-2xl px-6 py-4 sm:px-10 sm:py-6"
          style={{
            background: `linear-gradient(135deg, ${accent}15 0%, transparent 100%)`,
            border: `2px solid ${accent}30`,
            boxShadow: `0 0 40px ${accent}20, inset 0 0 40px ${accent}10`,
          }}
        >
          {/* Animated border glow */}
          <motion.div
            className="absolute inset-0 opacity-50"
            style={{
              background: `linear-gradient(90deg, transparent, ${accent}40, transparent)`,
            }}
            animate={{
              x: ['-200%', '200%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'linear',
            }}
          />

          <div className="relative flex flex-col items-center gap-1 sm:flex-row sm:items-baseline sm:gap-2">
            <span className="text-sm font-medium text-white/70 sm:text-lg">Only</span>
            <span
              className="text-4xl font-black tabular-nums sm:text-5xl"
              style={{
                background: gradient,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontFamily: '"Rajdhani", sans-serif',
              }}
            >
              {data.personality_percentile}%
            </span>
            <span className="text-sm font-medium text-white/70 sm:text-lg">of traders share this profile.</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Animated grid background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-30">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(${accent}20 1px, transparent 1px),
              linear-gradient(90deg, ${accent}20 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
          animate={{
            backgroundPosition: ['0px 0px', '50px 50px'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      {/* Radial scan effect */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2"
        style={{
          background: `conic-gradient(from 0deg, transparent 0deg, ${accent}30 10deg, transparent 20deg)`,
        }}
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Corner accents */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute left-0 top-0 h-32 w-32"
          style={{
            background: `radial-gradient(circle at 0% 0%, ${accent}30, transparent 70%)`,
          }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-0 right-0 h-32 w-32"
          style={{
            background: `radial-gradient(circle at 100% 100%, ${accent}30, transparent 70%)`,
          }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1.5,
          }}
        />
      </div>

      {/* Floating particles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full"
            style={{
              background: accent,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              boxShadow: `0 0 10px ${accent}`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    </ScreenWrapper>
  );
}
