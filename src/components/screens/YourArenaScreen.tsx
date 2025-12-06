import { motion } from 'framer-motion';
import { ScreenWrapper, staggerContainer, fadeInUp } from '../ui/ScreenWrapper';
import type { WrappedData } from '../../data/sampleData';

interface YourArenaScreenProps {
  data: WrappedData;
}

const categoryColors: Record<string, string> = {
  Sports: '#f59e0b',
  Entertainment: '#ec4899',
  Economics: '#3b82f6',
  Weather: '#06b6d4',
  Politics: '#ef4444',
  Crypto: '#8b5cf6',
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

  return (
    <ScreenWrapper
      gradient="linear-gradient(135deg, #1a0a1e 0%, #2d1a3e 50%, #1a0a1e 100%)"
    >
      <motion.div
        className="flex w-full max-w-md flex-col items-center px-4 text-center"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.p
          variants={fadeInUp}
          className="mb-6 text-base font-light text-white/60 sm:mb-8 sm:text-lg"
        >
          You couldn't stay away from...
        </motion.p>

        {/* Main category reveal */}
        <motion.div
          variants={fadeInUp}
          className="relative mb-4 sm:mb-6"
        >
          <motion.div
            className="absolute inset-0 rounded-full blur-xl sm:blur-2xl"
            style={{ backgroundColor: categoryColors[topCategory[0]] + '40' }}
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <div
            className="relative flex h-32 w-32 items-center justify-center rounded-full text-5xl sm:h-40 sm:w-40 sm:text-7xl"
            style={{ backgroundColor: categoryColors[topCategory[0]] + '20' }}
          >
            {categoryIcons[topCategory[0]] || '🎯'}
          </div>
        </motion.div>

        <motion.h2
          variants={fadeInUp}
          className="mb-2 text-4xl font-bold sm:mb-3 sm:text-5xl"
          style={{ color: categoryColors[topCategory[0]] }}
        >
          {topCategory[0]}
        </motion.h2>

        <motion.p
          variants={fadeInUp}
          className="mb-6 text-lg text-white/80 sm:mb-8 sm:text-xl"
        >
          <span
            className="font-bold"
            style={{ color: categoryColors[topCategory[0]] }}
          >
            {Math.round(topCategory[1] * 100)}%
          </span>{' '}
          of your predictions
        </motion.p>

        {/* Other categories */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-wrap justify-center gap-2 sm:gap-3"
        >
          {otherCategories.map(([category, percentage]) => (
            <motion.div
              key={category}
              className="glass-card flex items-center gap-1.5 rounded-full px-3 py-1.5 sm:gap-2 sm:px-4 sm:py-2"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-base sm:text-lg">{categoryIcons[category] || '🎯'}</span>
              <span className="text-xs text-white/80 sm:text-sm">{category}</span>
              <span
                className="text-xs font-semibold sm:text-sm"
                style={{ color: categoryColors[category] || '#ffffff' }}
              >
                {Math.round(percentage * 100)}%
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Subtext */}
        {data.category_subtext && (
          <motion.p
            variants={fadeInUp}
            className="mt-6 px-4 text-xs italic text-white/50 sm:mt-8 sm:text-sm"
          >
            "{data.category_subtext}"
          </motion.p>
        )}
      </motion.div>

      {/* Floating bubbles decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {categories.map(([category, percentage], index) => (
          <motion.div
            key={category}
            className="absolute rounded-full opacity-20"
            style={{
              backgroundColor: categoryColors[category],
              width: percentage * 200 + 40,
              height: percentage * 200 + 40,
              left: `${20 + index * 25}%`,
              top: `${60 + (index % 2) * 20}%`,
            }}
            animate={{
              y: [0, -20, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 3 + index,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: index * 0.5,
            }}
          />
        ))}
      </div>
    </ScreenWrapper>
  );
}
