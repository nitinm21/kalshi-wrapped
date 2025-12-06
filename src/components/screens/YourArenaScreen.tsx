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
        className="flex max-w-md flex-col items-center text-center"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.p
          variants={fadeInUp}
          className="mb-8 text-lg font-light text-white/60"
        >
          You couldn't stay away from...
        </motion.p>

        {/* Main category reveal */}
        <motion.div
          variants={fadeInUp}
          className="relative mb-6"
        >
          <motion.div
            className="absolute inset-0 rounded-full blur-2xl"
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
            className="relative flex h-40 w-40 items-center justify-center rounded-full text-7xl"
            style={{ backgroundColor: categoryColors[topCategory[0]] + '20' }}
          >
            {categoryIcons[topCategory[0]] || '🎯'}
          </div>
        </motion.div>

        <motion.h2
          variants={fadeInUp}
          className="mb-3 text-5xl font-bold"
          style={{ color: categoryColors[topCategory[0]] }}
        >
          {topCategory[0]}
        </motion.h2>

        <motion.p
          variants={fadeInUp}
          className="mb-8 text-xl text-white/80"
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
          className="flex flex-wrap justify-center gap-3"
        >
          {otherCategories.map(([category, percentage]) => (
            <motion.div
              key={category}
              className="glass-card flex items-center gap-2 rounded-full px-4 py-2"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-lg">{categoryIcons[category] || '🎯'}</span>
              <span className="text-sm text-white/80">{category}</span>
              <span
                className="text-sm font-semibold"
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
            className="mt-8 text-sm italic text-white/50"
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
