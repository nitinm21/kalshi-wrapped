import { motion } from 'framer-motion';
import { ScreenWrapper, staggerContainer, fadeInUp, scaleIn } from '../ui/ScreenWrapper';
import type { WrappedData } from '../../data/sampleData';

interface ContrarianScreenProps {
  data: WrappedData;
}

export function ContrarianScreen({ data }: ContrarianScreenProps) {
  const contrarianPercent = Math.round(data.contrarian_score * 100);
  const isContrarian = data.contrarian_score > 0.5;

  return (
    <ScreenWrapper
      gradient="radial-gradient(ellipse at center, #1a0033 0%, #000000 60%, #000000 100%)"
    >
      <motion.div
        className="flex w-full max-w-md flex-col items-center px-4 text-center"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.p
          variants={fadeInUp}
          className="mb-4 text-base font-light text-white/60 sm:mb-6 sm:text-lg"
        >
          When the crowd said one thing...
        </motion.p>

        <motion.div
          variants={scaleIn}
          className="mb-10 px-4 sm:mb-14"
        >
          <h2 className="text-2xl font-bold text-[#AA00FF] sm:text-3xl md:text-4xl">
            {isContrarian ? 'You said "prove it."' : 'You trusted the consensus.'}
          </h2>
        </motion.div>

        {/* Spectrum */}
        <motion.div
          variants={fadeInUp}
          className="mb-8 w-full max-w-sm sm:mb-10"
        >
          <div className="mb-2 flex justify-between text-xs text-white/50 sm:mb-3 sm:text-sm">
            <span>Consensus</span>
            <span>Contrarian</span>
          </div>

          <div className="relative h-3 w-full overflow-hidden rounded-full bg-gradient-to-r from-[#265CFF]/30 via-[#AA00FF]/30 to-[#AA00FF]/30">
            {/* Animated background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#265CFF]/50 via-[#AA00FF]/50 to-[#AA00FF]/50"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
              }}
              style={{ backgroundSize: '200% 200%' }}
            />

            {/* Marker */}
            <motion.div
              className="absolute top-1/2 h-5 w-5 -translate-y-1/2 rounded-full border-2 border-white bg-white shadow-lg sm:h-6 sm:w-6"
              initial={{ left: '0%' }}
              animate={{ left: `calc(${contrarianPercent}% - 10px)` }}
              transition={{
                delay: 0.5,
                duration: 1,
                type: 'spring',
                bounce: 0.3,
              }}
            >
              <motion.div
                className="absolute inset-0 rounded-full bg-white"
                animate={{
                  boxShadow: [
                    '0 0 0 0 rgba(255,255,255,0.4)',
                    '0 0 0 10px rgba(255,255,255,0)',
                  ],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Stats card */}
        <motion.div
          variants={fadeInUp}
          className="glass-card-premium rounded-2xl p-6 sm:rounded-3xl sm:p-8"
        >
          <div className="mb-3 text-4xl font-bold text-[#AA00FF] sm:mb-4 sm:text-5xl md:text-6xl">
            {contrarianPercent}%
          </div>
          <p className="mb-4 text-base text-white/70 sm:mb-6 sm:text-lg">
            of the time you bet against favorites
          </p>
          <div className="border-t border-[#AA00FF]/20 pt-3 text-xs text-white/60 sm:pt-4 sm:text-sm">
            That puts you in the top{' '}
            <span className="font-bold text-[#09C285]">
              {100 - data.contrarian_percentile}%
            </span>{' '}
            of contrarians on Kalshi.
          </div>
        </motion.div>

        {/* Subtext */}
        <motion.p
          variants={fadeInUp}
          className="mt-6 text-sm italic text-white/40 sm:mt-8 sm:text-base"
        >
          "Vegas sets the line. You find the value."
        </motion.p>
      </motion.div>

      {/* Background elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute right-0 top-1/4 h-80 w-80 rounded-full bg-[#AA00FF]/15 blur-3xl"
          animate={{
            x: [0, 30, 0],
            opacity: [0.2, 0.4, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-0 h-80 w-80 rounded-full bg-[#265CFF]/15 blur-3xl"
          animate={{
            x: [0, -30, 0],
            opacity: [0.2, 0.4, 0.2],
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
      </div>
    </ScreenWrapper>
  );
}
