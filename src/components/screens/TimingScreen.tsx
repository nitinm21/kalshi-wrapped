import { motion } from 'framer-motion';
import { ScreenWrapper, staggerContainer, fadeInUp } from '../ui/ScreenWrapper';
import type { WrappedData } from '../../data/sampleData';

interface TimingScreenProps {
  data: WrappedData;
}

const timingProfiles = {
  early_mover: {
    title: 'Early Mover',
    description: "You don't need consensus to act.",
    position: 0.25,
  },
  wait_and_see: {
    title: 'Wait and See',
    description: 'You let the market reveal its hand first.',
    position: 0.75,
  },
  balanced: {
    title: 'Balanced Timer',
    description: 'You read the room, then strike.',
    position: 0.5,
  },
};

export function TimingScreen({ data }: TimingScreenProps) {
  const profile = timingProfiles[data.timing_profile];
  const avgEntryPercent = Math.round(data.avg_entry_price * 100);

  return (
    <ScreenWrapper
      gradient="linear-gradient(135deg, #0c1222 0%, #1e2a4a 50%, #0c1222 100%)"
    >
      <motion.div
        className="flex w-full max-w-md flex-col items-center px-4 text-center"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.p
          variants={fadeInUp}
          className="mb-3 text-base font-light text-white/60 sm:mb-4 sm:text-lg"
        >
          When you enter a market, the average price is
        </motion.p>

        {/* Average entry price */}
        <motion.div
          variants={fadeInUp}
          className="mb-6 flex items-baseline gap-1 sm:mb-8"
        >
          <span className="text-5xl font-bold text-cyan-400 sm:text-6xl">{avgEntryPercent}</span>
          <span className="text-xl text-cyan-400 sm:text-2xl">¢</span>
        </motion.div>

        {/* Timing spectrum */}
        <motion.div
          variants={fadeInUp}
          className="mb-6 w-full max-w-sm sm:mb-8"
        >
          <div className="mb-3 flex justify-between text-xs text-white/50 sm:mb-4">
            <span>First In</span>
            <span>Wait and See</span>
          </div>

          <div className="relative h-4 w-full rounded-full bg-gradient-to-r from-cyan-500/30 via-indigo-500/30 to-purple-500/30">
            {/* Track glow */}
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                boxShadow: [
                  '0 0 20px rgba(6, 182, 212, 0.3)',
                  '0 0 30px rgba(139, 92, 246, 0.3)',
                  '0 0 20px rgba(6, 182, 212, 0.3)',
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            {/* Marker */}
            <motion.div
              className="absolute top-1/2 flex -translate-y-1/2 flex-col items-center"
              initial={{ left: '0%' }}
              animate={{ left: `calc(${profile.position * 100}% - 16px)` }}
              transition={{
                delay: 0.5,
                duration: 1.2,
                type: 'spring',
                bounce: 0.3,
              }}
            >
              <motion.div
                className="h-8 w-8 rounded-full border-2 border-white bg-gradient-to-br from-cyan-400 to-indigo-500 shadow-lg sm:h-10 sm:w-10 sm:border-3"
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </motion.div>

            {/* Time markers */}
            {[0.25, 0.5, 0.75].map((pos) => (
              <div
                key={pos}
                className="absolute top-1/2 h-2 w-0.5 -translate-y-1/2 bg-white/20"
                style={{ left: `${pos * 100}%` }}
              />
            ))}
          </div>
        </motion.div>

        {/* Profile reveal */}
        <motion.div
          variants={fadeInUp}
          className="mb-4 sm:mb-6"
        >
          <p className="mb-2 text-xs text-white/50 sm:text-sm">That makes you an</p>
          <h2 className="text-2xl font-bold text-white sm:text-3xl md:text-4xl">
            {profile.title}
          </h2>
        </motion.div>

        {/* Description */}
        <motion.div
          variants={fadeInUp}
          className="glass-card rounded-2xl px-4 py-3 sm:px-6 sm:py-4"
        >
          <p className="text-sm text-white/70 sm:text-base">{profile.description}</p>
        </motion.div>

        {/* Example trade */}
        {data.timing_example && (
          <motion.div
            variants={fadeInUp}
            className="mt-4 rounded-xl bg-white/5 p-3 sm:mt-6 sm:p-4"
          >
            <p className="text-xs italic text-white/50">
              "{data.timing_example}"
            </p>
          </motion.div>
        )}
      </motion.div>

      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute left-1/4 top-1/4 h-32 w-32 rounded-full bg-cyan-500/10 blur-2xl"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 h-32 w-32 rounded-full bg-indigo-500/10 blur-2xl"
          animate={{
            scale: [1.5, 1, 1.5],
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
