import { motion } from 'framer-motion';
import { ScreenWrapper, staggerContainer, fadeInUp, scaleIn } from '../ui/ScreenWrapper';
import type { WrappedData } from '../../data/sampleData';

interface BestCallScreenProps {
  data: WrappedData;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

export function BestCallScreen({ data }: BestCallScreenProps) {
  const { best_call } = data;
  const profit = Math.round((best_call.settlement_price - best_call.entry_price) * 100);
  const entryPercent = Math.round(best_call.entry_price * 100);

  // Generate mock price chart data
  const chartPoints = 20;
  const chartData: number[] = [];
  for (let i = 0; i < chartPoints; i++) {
    const progress = i / (chartPoints - 1);
    const basePrice = best_call.entry_price + (best_call.settlement_price - best_call.entry_price) * progress;
    const noise = (Math.random() - 0.5) * 0.15;
    chartData.push(Math.max(0.1, Math.min(1, basePrice + noise * (1 - progress))));
  }
  chartData[chartPoints - 1] = best_call.settlement_price;

  const maxPrice = Math.max(...chartData);
  const minPrice = Math.min(...chartData);
  const priceRange = maxPrice - minPrice || 0.1;

  const pathD = chartData
    .map((price, i) => {
      const x = (i / (chartPoints - 1)) * 280;
      const y = 100 - ((price - minPrice) / priceRange) * 80;
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    })
    .join(' ');

  return (
    <ScreenWrapper
      gradient="radial-gradient(ellipse at bottom, #003221 0%, #000000 60%, #000000 100%)"
    >
      <motion.div
        className="flex max-w-2xl flex-col items-center text-center"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {/* Header badge */}
        <motion.div
          variants={scaleIn}
          className="mb-8 flex items-center gap-3 rounded-full bg-[#09C285]/10 px-6 py-2 ring-1 ring-[#09C285]/30"
        >
          <div className="h-2 w-2 animate-pulse rounded-full bg-[#09C285]" />
          <span className="text-sm font-semibold uppercase tracking-wider text-[#09C285]">
            Your best call
          </span>
        </motion.div>

        {/* Market name with dramatic reveal */}
        <motion.div
          variants={fadeInUp}
          className="mb-10 px-6"
        >
          <motion.h2
            className="text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            "{best_call.market}"
          </motion.h2>
          <motion.div
            className="mx-auto mt-4 h-0.5 w-24 rounded-full bg-gradient-to-r from-transparent via-[#09C285] to-transparent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
          />
        </motion.div>

        {/* Premium chart card */}
        <motion.div
          variants={fadeInUp}
          className="glass-card-premium relative mb-8 w-full overflow-hidden rounded-3xl p-6"
        >
          <svg viewBox="0 0 320 140" className="w-full">
            {/* Gradient background area */}
            <defs>
              <linearGradient id="chartGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#09C285" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#0FE29B" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#09C285" />
                <stop offset="100%" stopColor="#0FE29B" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Grid lines with subtle styling */}
            {[30, 70, 110].map((y, i) => (
              <line
                key={i}
                x1="20"
                y1={y}
                x2="300"
                y2={y}
                stroke="rgba(9, 194, 133, 0.08)"
                strokeDasharray="4 4"
              />
            ))}

            {/* Area under curve */}
            <motion.path
              d={`${pathD.replace('M', 'M 20 ')} L 300 130 L 20 130 Z`}
              fill="url(#chartGradient)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.3 }}
            />

            {/* Price line with glow */}
            <motion.path
              d={pathD}
              fill="none"
              stroke="url(#lineGradient)"
              strokeWidth="4"
              strokeLinecap="round"
              filter="url(#glow)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.5, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />

            {/* Entry point with pulse */}
            <motion.g
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.2, type: 'spring', stiffness: 200 }}
            >
              <circle
                cx="20"
                cy={100 - ((best_call.entry_price - minPrice) / priceRange) * 70}
                r="8"
                fill="#09C285"
                opacity="0.3"
              >
                <animate
                  attributeName="r"
                  values="8;12;8"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle
                cx="20"
                cy={100 - ((best_call.entry_price - minPrice) / priceRange) * 70}
                r="5"
                fill="#09C285"
              />
            </motion.g>

            {/* Settlement point with celebration */}
            <motion.g
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.4, 1] }}
              transition={{ delay: 3, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <circle
                cx="300"
                cy={100 - ((best_call.settlement_price - minPrice) / priceRange) * 70}
                r="10"
                fill="#09C285"
                opacity="0.2"
              />
              <circle
                cx="300"
                cy={100 - ((best_call.settlement_price - minPrice) / priceRange) * 70}
                r="6"
                fill="#0FE29B"
              />
            </motion.g>
          </svg>

          {/* Enhanced price labels */}
          <div className="mt-4 flex items-center justify-between">
            <motion.div
              className="flex flex-col items-start gap-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.5 }}
            >
              <span className="text-xs font-medium uppercase tracking-wider text-white/40">Entry</span>
              <span className="text-xl font-bold text-[#09C285]">{entryPercent}¢</span>
            </motion.div>
            <motion.div
              className="flex items-center gap-2 rounded-full bg-[#09C285]/10 px-4 py-2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 3.2 }}
            >
              <span className="text-xs text-white/50">→</span>
              <span className="text-sm font-semibold text-[#09C285]">+{profit}¢</span>
            </motion.div>
            <motion.div
              className="flex flex-col items-end gap-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.5 }}
            >
              <span className="text-xs font-medium uppercase tracking-wider text-white/40">Settled</span>
              <span className="text-xl font-bold text-[#0FE29B]">$1.00</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Context with better typography */}
        {best_call.context && (
          <motion.p
            variants={fadeInUp}
            className="mb-6 max-w-lg px-4 text-base leading-relaxed text-white/60"
          >
            {best_call.context}
          </motion.p>
        )}

        {/* Timeline */}
        <motion.div
          variants={fadeInUp}
          className="flex items-center gap-4 text-xs text-white/40"
        >
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-[#09C285]/50" />
            <span>{formatDate(best_call.entry_date)}</span>
          </div>
          <div className="h-px w-12 bg-gradient-to-r from-[#09C285]/50 to-[#09C285]/10" />
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-[#0FE29B]" />
            <span>{formatDate(best_call.resolution_date)}</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Ambient background effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#09C285]/15 blur-3xl"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.2, 0.35, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-[#003221]/50 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
      </div>
    </ScreenWrapper>
  );
}
