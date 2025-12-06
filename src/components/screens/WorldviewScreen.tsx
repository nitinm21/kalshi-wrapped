import { motion } from 'framer-motion';
import { ScreenWrapper, staggerContainer, fadeInUp } from '../ui/ScreenWrapper';
import type { WrappedData } from '../../data/sampleData';

interface WorldviewScreenProps {
  data: WrappedData;
}

interface DimensionConfig {
  key: keyof WrappedData['worldview'];
  leftLabel: string;
  rightLabel: string;
  leftColor: string;
  rightColor: string;
}

const dimensions: DimensionConfig[] = [
  {
    key: 'favorites_vs_underdogs',
    leftLabel: 'Favorites',
    rightLabel: 'Underdogs',
    leftColor: '#3b82f6',
    rightColor: '#f59e0b',
  },
  {
    key: 'sequels_vs_originals',
    leftLabel: 'Sequels',
    rightLabel: 'Originals',
    leftColor: '#8b5cf6',
    rightColor: '#10b981',
  },
  {
    key: 'chaos_vs_stability',
    leftLabel: 'Stability',
    rightLabel: 'Chaos',
    leftColor: '#06b6d4',
    rightColor: '#ef4444',
  },
  {
    key: 'critics_vs_crowds',
    leftLabel: 'Critics',
    rightLabel: 'Crowds',
    leftColor: '#ec4899',
    rightColor: '#f97316',
  },
];

function WorldviewSlider({ config, value, index }: { config: DimensionConfig; value: number; index: number }) {
  const isRight = value > 0.5;
  const activeColor = isRight ? config.rightColor : config.leftColor;

  return (
    <motion.div
      className="mb-6 w-full"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 + index * 0.15, duration: 0.5 }}
    >
      <div className="mb-2 flex justify-between text-xs">
        <span
          className="font-medium transition-opacity"
          style={{
            color: config.leftColor,
            opacity: value <= 0.5 ? 1 : 0.65,
          }}
        >
          {config.leftLabel}
        </span>
        <span
          className="font-medium transition-opacity"
          style={{
            color: config.rightColor,
            opacity: value > 0.5 ? 1 : 0.65,
          }}
        >
          {config.rightLabel}
        </span>
      </div>

      <div className="relative h-2 w-full overflow-hidden rounded-full bg-white/10">
        {/* Fill */}
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            background: `linear-gradient(to right, ${config.leftColor}, ${config.rightColor})`,
          }}
          initial={{ width: '0%' }}
          animate={{ width: `${value * 100}%` }}
          transition={{ delay: 0.5 + index * 0.15, duration: 0.8, ease: 'easeOut' }}
        />

        {/* Marker */}
        <motion.div
          className="absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border-2 border-white shadow-lg"
          style={{ backgroundColor: activeColor }}
          initial={{ left: '0%' }}
          animate={{ left: `calc(${value * 100}% - 8px)` }}
          transition={{
            delay: 0.5 + index * 0.15,
            duration: 0.8,
            type: 'spring',
            bounce: 0.3,
          }}
        />
      </div>
    </motion.div>
  );
}

export function WorldviewScreen({ data }: WorldviewScreenProps) {
  return (
    <ScreenWrapper
      gradient="linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)"
    >
      <motion.div
        className="flex max-w-md flex-col items-center text-center"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.p
          variants={fadeInUp}
          className="mb-8 text-lg font-light text-white/90"
        >
          Your predictions painted a picture of how you see the world.
        </motion.p>

        {/* Sliders */}
        <motion.div
          variants={fadeInUp}
          className="glass-card mb-8 w-full rounded-2xl p-6"
        >
          {dimensions.map((dim, index) => (
            <WorldviewSlider
              key={dim.key}
              config={dim}
              value={data.worldview[dim.key]}
              index={index}
            />
          ))}
        </motion.div>

        {/* Interpretation */}
        <motion.div
          variants={fadeInUp}
          className="mb-4 rounded-xl bg-white/5 p-4"
        >
          <p className="text-sm text-white/85">
            You bet on the <span className="text-amber-400">Eagles</span> over the dynasty.
            <br />
            You bet on <span className="text-emerald-400">Anora</span> over Wicked.
          </p>
        </motion.div>

        {/* Summary */}
        {data.worldview_summary && (
          <motion.p
            variants={fadeInUp}
            className="text-sm italic text-white/75"
          >
            "{data.worldview_summary}"
          </motion.p>
        )}
      </motion.div>

      {/* Background radar chart decoration */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <svg width="400" height="400" viewBox="0 0 400 400">
          {/* Concentric circles */}
          {[0.25, 0.5, 0.75, 1].map((scale, i) => (
            <motion.circle
              key={i}
              cx="200"
              cy="200"
              r={150 * scale}
              fill="none"
              stroke="white"
              strokeOpacity="0.2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 + i * 0.1 }}
            />
          ))}

          {/* Axis lines */}
          {[0, 45, 90, 135].map((angle, i) => (
            <motion.line
              key={i}
              x1="200"
              y1="200"
              x2={200 + 150 * Math.cos((angle * Math.PI) / 180)}
              y2={200 + 150 * Math.sin((angle * Math.PI) / 180)}
              stroke="white"
              strokeOpacity="0.15"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            />
          ))}
        </svg>
      </motion.div>

      {/* Colored corner glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-amber-500/20 blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </div>
    </ScreenWrapper>
  );
}
