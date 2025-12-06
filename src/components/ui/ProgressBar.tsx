import { motion } from 'framer-motion';

interface ProgressBarProps {
  currentIndex: number;
  totalScreens: number;
}

export function ProgressBar({ currentIndex, totalScreens }: ProgressBarProps) {
  return (
    <div className="absolute top-0 left-0 right-0 z-50 flex gap-1.5 p-4 safe-top">
      {Array.from({ length: totalScreens }).map((_, index) => (
        <div
          key={index}
          className="relative h-1 flex-1 overflow-hidden rounded-full bg-white/10"
        >
          {index <= currentIndex && (
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-[#09C285] to-[#0FE29B] shadow-[0_0_10px_rgba(9,194,133,0.5)]"
              initial={{ scaleX: 0 }}
              animate={{
                scaleX: 1,
              }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{ originX: 0 }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
