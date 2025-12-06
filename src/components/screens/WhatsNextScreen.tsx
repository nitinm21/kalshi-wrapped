import { motion } from 'framer-motion';
import { ScreenWrapper, staggerContainer, fadeInUp } from '../ui/ScreenWrapper';
import type { WrappedData } from '../../data/sampleData';

interface WhatsNextScreenProps {
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

export function WhatsNextScreen({ data }: WhatsNextScreenProps) {
  const handleKalshiClick = () => {
    window.open('https://kalshi.com', '_blank', 'noopener,noreferrer');
  };

  return (
    <ScreenWrapper
      gradient="linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)"
    >
      <motion.div
        className="flex w-full max-w-md flex-col items-center px-4 text-center"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.p
          variants={fadeInUp}
          className="mb-2 text-base font-light text-white/60 sm:text-lg"
        >
          Based on how you see the world, here are
        </motion.p>

        <motion.h2
          variants={fadeInUp}
          className="mb-6 text-xl font-bold text-white sm:mb-8 sm:text-2xl md:text-3xl"
        >
          3 markets to watch
        </motion.h2>

        {/* Market cards */}
        <motion.div
          variants={fadeInUp}
          className="mb-6 w-full space-y-3 sm:mb-8 sm:space-y-4"
        >
          {data.recommended_markets.map((market, index) => (
            <motion.div
              key={index}
              className="glass-card group cursor-pointer overflow-hidden rounded-xl p-3 transition-all hover:bg-white/10 sm:p-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.15, duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleKalshiClick}
            >
              <div className="flex items-start justify-between gap-3 sm:gap-4">
                <div className="flex-1 text-left">
                  {/* Category tag */}
                  <div
                    className="mb-1.5 inline-block rounded-full px-2 py-0.5 text-xs font-medium sm:mb-2"
                    style={{
                      backgroundColor: (categoryColors[market.category] || '#6366f1') + '20',
                      color: categoryColors[market.category] || '#6366f1',
                    }}
                  >
                    {market.category}
                  </div>

                  {/* Market title */}
                  <h3 className="text-xs font-medium text-white sm:text-sm md:text-base">
                    {market.title}
                  </h3>
                </div>

                {/* Price */}
                <div className="flex flex-col items-end">
                  <div className="text-xl font-bold text-white sm:text-2xl">
                    {Math.round(market.price * 100)}¢
                  </div>
                  <div className="text-xs text-white/40">Yes</div>
                </div>
              </div>

              {/* Hover indicator */}
              <motion.div
                className="mt-2 flex items-center justify-center gap-2 text-xs text-white/40 opacity-0 transition-opacity group-hover:opacity-100 sm:mt-3"
              >
                <span>Trade now</span>
                <span>→</span>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Tagline */}
        <motion.p
          variants={fadeInUp}
          className="mb-6 text-xs italic text-white/50 sm:mb-8 sm:text-sm"
        >
          Your instincts. Your edge.
        </motion.p>

        {/* CTA Button */}
        <motion.button
          variants={fadeInUp}
          className="group relative overflow-hidden rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-indigo-500/25 sm:px-8 sm:py-4 sm:text-base"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleKalshiClick}
        >
          {/* Shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            initial={{ x: '-100%' }}
            animate={{ x: '200%' }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3,
              ease: 'easeInOut',
            }}
          />
          <span className="relative">Make your first 2026 prediction</span>
        </motion.button>
      </motion.div>

      {/* Background elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Floating arrows pointing forward */}
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl text-white/5"
            style={{
              left: `${10 + i * 20}%`,
              top: `${20 + (i % 3) * 30}%`,
            }}
            animate={{
              x: [0, 20, 0],
              opacity: [0.05, 0.15, 0.05],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.3,
              ease: 'easeInOut',
            }}
          >
            →
          </motion.div>
        ))}

        <motion.div
          className="absolute -right-32 top-1/4 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute -left-32 bottom-1/4 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
    </ScreenWrapper>
  );
}
