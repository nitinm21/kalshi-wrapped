import { motion } from 'framer-motion';
import { ScreenWrapper, staggerContainer, fadeInUp } from '../ui/ScreenWrapper';
import { AnimatedNumber } from '../ui/AnimatedNumber';
import type { WrappedData } from '../../data/sampleData';

interface DaysInArenaScreenProps {
  data: WrappedData;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
}

export function DaysInArenaScreen({ data }: DaysInArenaScreenProps) {
  const [startDate, endDate] = data.streak_dates;

  return (
    <ScreenWrapper
      gradient="linear-gradient(135deg, #0a1628 0%, #1a2744 50%, #0a1628 100%)"
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
          You had skin in the game for
        </motion.p>

        {/* Days count */}
        <motion.div
          variants={fadeInUp}
          className="mb-8 flex items-baseline gap-3"
        >
          <AnimatedNumber
            value={data.days_active}
            className="text-7xl font-bold text-white md:text-8xl"
            delay={0.3}
          />
          <span className="text-2xl font-light text-white/60">days</span>
        </motion.div>

        <motion.p
          variants={fadeInUp}
          className="mb-10 text-xl text-white/80"
        >
          this year
        </motion.p>

        {/* Streak highlight */}
        <motion.div
          variants={fadeInUp}
          className="glass-card w-full rounded-2xl p-6"
        >
          <div className="mb-4 text-sm font-medium uppercase tracking-wider text-amber-400">
            Longest Streak
          </div>

          <div className="mb-3 flex items-baseline justify-center gap-2">
            <AnimatedNumber
              value={data.longest_streak}
              className="text-5xl font-bold text-white"
              delay={0.6}
            />
            <span className="text-lg text-white/60">days straight</span>
          </div>

          <div className="mb-4 text-sm text-white/50">
            {formatDate(startDate)} — {formatDate(endDate)}
          </div>

          {data.streak_context && (
            <div className="border-t border-white/10 pt-4 text-sm text-white/70">
              {data.streak_context}
            </div>
          )}
        </motion.div>

        {/* Calendar visualization */}
        <motion.div
          variants={fadeInUp}
          className="mt-8 flex flex-wrap justify-center gap-1"
        >
          {Array.from({ length: 52 }).map((_, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-1">
              {Array.from({ length: 7 }).map((_, dayIndex) => {
                const dayNumber = weekIndex * 7 + dayIndex;
                const isActive = dayNumber < data.days_active;
                const isStreak = dayNumber >= 6 && dayNumber < 6 + data.longest_streak;

                return (
                  <motion.div
                    key={dayIndex}
                    className={`h-2 w-2 rounded-sm ${
                      isStreak
                        ? 'bg-amber-400'
                        : isActive
                        ? 'bg-indigo-400/60'
                        : 'bg-white/10'
                    }`}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: 0.8 + (weekIndex * 7 + dayIndex) * 0.002,
                      duration: 0.2,
                    }}
                  />
                );
              })}
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Background glow */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/10 blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </ScreenWrapper>
  );
}
