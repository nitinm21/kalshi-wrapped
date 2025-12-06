import { motion } from 'framer-motion';
import { ScreenWrapper, staggerContainer, fadeInUp } from '../ui/ScreenWrapper';
import type { WrappedData } from '../../data/sampleData';

interface YourArenaScreenProps {
  data: WrappedData;
}

const categoryColors: Record<string, string> = {
  Sports: '#ff6b35',
  Entertainment: '#e91e63',
  Economics: '#2196f3',
  Weather: '#00bcd4',
  Politics: '#f44336',
  Crypto: '#9c27b0',
};

const categoryIcons: Record<string, string> = {
  Sports: '🏈',
  Entertainment: '🎬',
  Economics: '📈',
  Weather: '🌤️',
  Politics: '🏛️',
  Crypto: '₿',
};

export function YourArenaScreen({ data }: YourArenaScreenProps) {
  const categories = Object.entries(data.category_breakdown).sort(
    ([, a], [, b]) => b - a
  );
  const topCategory = categories[0];
  const otherCategories = categories.slice(1);
  const topColor = categoryColors[topCategory[0]];

  return (
    <ScreenWrapper
      gradient="radial-gradient(ellipse at top, #000000 0%, #0a0a0a 50%, #000000 100%)"
    >
      {/* Mesh gradient background - innovative Aurora Borealis effect */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Flowing color bands */}
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            background: `
              linear-gradient(110deg, 
                transparent 0%, 
                ${topColor}40 20%,
                transparent 40%,
                ${otherCategories[0] ? categoryColors[otherCategories[0][0]] : topColor}30 60%,
                transparent 80%
              )
            `,
            filter: 'blur(80px)',
          }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Liquid mesh effect */}
        <svg className="absolute inset-0 h-full w-full opacity-40" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <motion.radialGradient
              id="mesh1"
              animate={{
                cx: ['30%', '70%', '30%'],
                cy: ['30%', '70%', '30%'],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <stop offset="0%" stopColor={topColor} stopOpacity="0.4" />
              <stop offset="100%" stopColor={topColor} stopOpacity="0" />
            </motion.radialGradient>
            <motion.radialGradient
              id="mesh2"
              animate={{
                cx: ['70%', '30%', '70%'],
                cy: ['70%', '30%', '70%'],
              }}
              transition={{
                duration: 18,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 2,
              }}
            >
              <stop offset="0%" stopColor={otherCategories[0] ? categoryColors[otherCategories[0][0]] : topColor} stopOpacity="0.3" />
              <stop offset="100%" stopColor={otherCategories[0] ? categoryColors[otherCategories[0][0]] : topColor} stopOpacity="0" />
            </motion.radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#mesh1)" />
          <rect width="100%" height="100%" fill="url(#mesh2)" />
        </svg>

        {/* Floating light particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full"
            style={{
              backgroundColor: i % 2 === 0 ? topColor : (otherCategories[i % otherCategories.length] ? categoryColors[otherCategories[i % otherCategories.length][0]] : topColor),
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: 'blur(1px)',
              boxShadow: `0 0 10px ${i % 2 === 0 ? topColor : (otherCategories[i % otherCategories.length] ? categoryColors[otherCategories[i % otherCategories.length][0]] : topColor)}`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 40 - 20, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.5,
            }}
          />
        ))}

        {/* Rotating gradient ring */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: '800px',
            height: '800px',
            background: `conic-gradient(from 0deg, transparent 0%, ${topColor}20 25%, transparent 50%, ${topColor}20 75%, transparent 100%)`,
            filter: 'blur(60px)',
          }}
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      <motion.div
        className="relative z-10 flex w-full max-w-md flex-col items-center px-6 text-center sm:px-8"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.p
          variants={fadeInUp}
          className="mb-12 text-sm font-light uppercase tracking-[0.3em] text-white/40 sm:mb-14 sm:text-base"
        >
          You couldn't stay away from
        </motion.p>

        {/* Main category reveal - Holographic effect */}
        <motion.div
          variants={fadeInUp}
          className="relative mb-8 sm:mb-10"
        >
          {/* Outer rotating ring */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: `conic-gradient(from 0deg, ${topColor}00 0%, ${topColor}60 25%, ${topColor}00 50%, ${topColor}60 75%, ${topColor}00 100%)`,
              filter: 'blur(20px)',
              transform: 'scale(1.3)',
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

          {/* Pulsing glow layers */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-full"
              style={{
                backgroundColor: topColor,
                opacity: 0.1,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.1, 0, 0.1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeOut',
                delay: i * 1,
              }}
            />
          ))}

          {/* Icon container - Frosted glass morphism */}
          <motion.div
            className="relative flex h-40 w-40 items-center justify-center rounded-full text-7xl sm:h-48 sm:w-48 sm:text-8xl"
            style={{
              background: `linear-gradient(135deg, ${topColor}20 0%, ${topColor}05 100%)`,
              backdropFilter: 'blur(40px) saturate(180%)',
              border: `2px solid ${topColor}30`,
              boxShadow: `
                0 0 0 1px ${topColor}10,
                0 8px 32px ${topColor}40,
                inset 0 1px 0 rgba(255, 255, 255, 0.1),
                inset 0 -1px 0 ${topColor}20
              `,
            }}
            initial={{ scale: 0.5, opacity: 0, rotateY: 180 }}
            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
            transition={{
              type: 'spring',
              stiffness: 150,
              damping: 15,
              delay: 0.3,
            }}
          >
            <motion.span
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              {categoryIcons[topCategory[0]] || '🎯'}
            </motion.span>
          </motion.div>
        </motion.div>

        {/* Category name with glitch effect */}
        <motion.h2
          variants={fadeInUp}
          className="relative mb-4 text-6xl font-medium tracking-tight sm:mb-5 sm:text-7xl"
          style={{
            color: '#ffffff',
          }}
        >
          {topCategory[0]}
        </motion.h2>

        {/* Percentage with animated counter effect */}
        <motion.div
          variants={fadeInUp}
          className="mb-12 sm:mb-14"
        >
          <motion.div
            className="inline-flex flex-col items-center rounded-2xl border px-8 py-4 sm:px-10 sm:py-5"
            style={{
              background: `linear-gradient(135deg, ${topColor}10 0%, transparent 100%)`,
              borderColor: `${topColor}30`,
              backdropFilter: 'blur(20px)',
              boxShadow: `0 8px 32px ${topColor}20`,
            }}
            whileHover={{ scale: 1.05 }}
          >
            <motion.span
              className="text-5xl font-black tabular-nums sm:text-6xl"
              style={{
                background: `linear-gradient(135deg, ${topColor} 0%, ${topColor}80 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              {Math.round(topCategory[1] * 100)}%
            </motion.span>
            <span className="mt-1 text-xs uppercase tracking-widest text-white/50 sm:text-sm">
              of your predictions
            </span>
          </motion.div>
        </motion.div>

        {/* Other categories - Floating pill design */}
        <motion.div
          variants={fadeInUp}
          className="mb-10 flex flex-wrap justify-center gap-2.5 sm:gap-3"
        >
          {otherCategories.map(([category, percentage], index) => (
            <motion.div
              key={category}
              className="group relative overflow-hidden rounded-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
            >
              {/* Animated background gradient */}
              <motion.div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(90deg, ${categoryColors[category]}20 0%, ${categoryColors[category]}10 100%)`,
                }}
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />

              <motion.div
                className="relative flex items-center gap-2 border px-4 py-2 backdrop-blur-xl sm:gap-2.5 sm:px-4 sm:py-2.5"
                style={{
                  borderColor: `${categoryColors[category]}30`,
                }}
                whileHover={{
                  scale: 1.08,
                  borderColor: `${categoryColors[category]}60`,
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                <span className="text-base sm:text-lg">{categoryIcons[category] || '🎯'}</span>
                <span className="text-xs font-medium text-white/60 sm:text-sm">{category}</span>
                <span
                  className="text-xs font-bold sm:text-sm"
                  style={{ color: categoryColors[category] }}
                >
                  {Math.round(percentage * 100)}%
                </span>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Subtext with line accent */}
        {data.category_subtext && (
          <motion.div
            variants={fadeInUp}
            className="max-w-md"
          >
            <motion.div
              className="mb-6 h-px w-24 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              style={{
                backgroundImage: `linear-gradient(90deg, transparent, ${topColor}60, transparent)`,
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <p
              className="text-sm leading-relaxed text-white/40 sm:text-base"
              style={{
                fontStyle: 'italic',
                fontWeight: 300,
              }}
            >
              "{data.category_subtext}"
            </p>
          </motion.div>
        )}
      </motion.div>
    </ScreenWrapper>
  );
}
