import { motion } from 'framer-motion';
import { ScreenWrapper, staggerContainer, fadeInUp } from '../ui/ScreenWrapper';
import type { WrappedData } from '../../data/sampleData';

interface MissedCallScreenProps {
  data: WrappedData;
}

export function MissedCallScreen({ data }: MissedCallScreenProps) {
  const { worst_miss } = data;
  const loss = Math.round((worst_miss.settlement_price - worst_miss.exit_price) * 100);
  const exitPercent = Math.round(worst_miss.exit_price * 100);

  return (
    <ScreenWrapper
      gradient="linear-gradient(135deg, #1c1917 0%, #292524 50%, #1c1917 100%)"
    >
      <motion.div
        className="flex w-full max-w-md flex-col items-center px-4 text-center"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.p
          variants={fadeInUp}
          className="mb-6 text-base font-light text-white/50 sm:mb-8 sm:text-lg"
        >
          But there was one that slipped...
        </motion.p>

        {/* Market name */}
        <motion.div
          variants={fadeInUp}
          className="mb-6 px-4 sm:mb-8"
        >
          <div className="mb-2 text-xs font-medium uppercase tracking-wider text-rose-400/70">
            The One That Got Away
          </div>
          <h2 className="text-xl font-medium text-white/80 sm:text-2xl md:text-3xl">
            "{worst_miss.market}"
          </h2>
        </motion.div>

        {/* Price comparison */}
        <motion.div
          variants={fadeInUp}
          className="mb-6 flex w-full max-w-xs flex-col items-center justify-center gap-4 sm:mb-8 sm:flex-row sm:gap-6"
        >
          <div className="text-center">
            <div className="mb-1 text-xs text-white/40">You sold at</div>
            <div className="text-2xl font-bold text-white/60 sm:text-3xl">{exitPercent}¢</div>
          </div>

          <motion.div
            className="text-xl text-white/30 sm:text-2xl"
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            →
          </motion.div>

          <div className="text-center">
            <div className="mb-1 text-xs text-white/40">It settled at</div>
            <div className="text-2xl font-bold text-rose-400 sm:text-3xl">$1.00</div>
          </div>
        </motion.div>

        {/* Missed opportunity */}
        <motion.div
          variants={fadeInUp}
          className="glass-card mb-6 rounded-2xl p-4 sm:mb-8 sm:p-6"
          style={{
            background: 'rgba(239, 68, 68, 0.05)',
            borderColor: 'rgba(239, 68, 68, 0.1)',
          }}
        >
          <div className="mb-2 flex items-center justify-center gap-2">
            <span className="text-3xl font-bold text-rose-400/80 sm:text-4xl">-{loss}¢</span>
          </div>
          <p className="text-xs text-white/50 sm:text-sm">
            left on the table per share
          </p>
        </motion.div>

        {/* Context / Story */}
        {worst_miss.context && (
          <motion.div
            variants={fadeInUp}
            className="mb-4 rounded-xl bg-white/5 p-3 sm:p-4"
          >
            <p className="text-xs text-white/60 sm:text-sm">{worst_miss.context}</p>
          </motion.div>
        )}

        {/* Rueful message */}
        <motion.p
          variants={fadeInUp}
          className="text-xs italic text-white/30"
        >
          "The market humbles everyone eventually."
        </motion.p>
      </motion.div>

      {/* Subtle defeated atmosphere */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Floating particles */}
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-rose-400/30"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
            }}
            animate={{
              y: [0, -100],
              opacity: [0.5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.5,
              ease: 'easeOut',
            }}
          />
        ))}

        <motion.div
          className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-rose-900/10 to-transparent"
          animate={{
            opacity: [0.3, 0.5, 0.3],
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
