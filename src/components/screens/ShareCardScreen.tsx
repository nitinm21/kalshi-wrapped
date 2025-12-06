import { useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ScreenWrapper, staggerContainer, fadeInUp } from '../ui/ScreenWrapper';
import type { WrappedData } from '../../data/sampleData';
import html2canvas from 'html2canvas';

interface ShareCardScreenProps {
  data: WrappedData;
}

const personalityGradients: Record<string, string> = {
  dynasty_killer: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
  tape_reader: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
  hedge_fund: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
  true_believer: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
  arbitrageur: 'linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)',
  oracle: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
};

const personalityIcons: Record<string, string> = {
  dynasty_killer: '👑',
  tape_reader: '📊',
  hedge_fund: '💼',
  true_believer: '🎯',
  arbitrageur: '⚖️',
  oracle: '🔮',
};

export function ShareCardScreen({ data }: ShareCardScreenProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const gradient = personalityGradients[data.personality] || personalityGradients.dynasty_killer;
  const icon = personalityIcons[data.personality] || '🎯';
  const contrarianPercent = Math.round(data.contrarian_score * 100);
  const entryPrice = Math.round(data.best_call.entry_price * 100);

  const handleShare = useCallback(async (platform: 'download' | 'twitter' | 'copy') => {
    if (!cardRef.current) return;

    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: '#0a0a0a',
        scale: 2,
      });

      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((b) => resolve(b!), 'image/png');
      });

      if (platform === 'download') {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'kalshi-wrapped-2025.png';
        a.click();
        URL.revokeObjectURL(url);
      } else if (platform === 'twitter') {
        const text = encodeURIComponent(
          `My Kalshi Wrapped 2025: I'm ${data.personality_title}!\n\n${data.total_predictions} predictions | ${contrarianPercent}% against favorites\n\nGet your Wrapped: kalshi.com/wrapped`
        );
        window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
      } else if (platform === 'copy') {
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob }),
        ]);
        alert('Image copied to clipboard!');
      }
    } catch (err) {
      console.error('Share failed:', err);
    }
  }, [data, contrarianPercent]);

  return (
    <ScreenWrapper
      gradient="linear-gradient(135deg, #0a0a0a 0%, #171717 50%, #0a0a0a 100%)"
    >
      <motion.div
        className="flex w-full max-w-md flex-col items-center px-4"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.p
          variants={fadeInUp}
          className="mb-4 text-center text-base font-light text-white/60 sm:mb-6 sm:text-lg"
        >
          Share your 2025 story
        </motion.p>

        {/* Shareable Card */}
        <motion.div
          ref={cardRef}
          variants={fadeInUp}
          className="relative mb-6 w-full max-w-sm overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-black p-6 sm:mb-8"
          style={{
            aspectRatio: '9/16',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          }}
        >
          {/* Header */}
          <div className="mb-4 flex items-center justify-between sm:mb-6">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400">
                Kalshi
              </div>
              <div className="text-[10px] tracking-widest text-white/40">
                WRAPPED 2025
              </div>
            </div>
            <div className="h-8 w-8 rounded-lg bg-white/10" />
          </div>

          {/* Icon */}
          <div className="mb-3 flex justify-center sm:mb-4">
            <div
              className="flex h-16 w-16 items-center justify-center rounded-full text-3xl sm:h-20 sm:w-20 sm:text-4xl"
              style={{ background: gradient }}
            >
              {icon}
            </div>
          </div>

          {/* Personality */}
          <h2
            className="mb-4 text-center text-xl font-bold sm:mb-6 sm:text-2xl"
            style={{
              background: gradient,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {data.personality_title}
          </h2>

          {/* Stats */}
          <div className="mb-4 space-y-2 sm:mb-6 sm:space-y-3">
            <div className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2 sm:px-4 sm:py-3">
              <span className="text-xs text-white/60 sm:text-sm">Predictions</span>
              <span className="text-sm font-bold text-white sm:text-base">{data.total_predictions}</span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2 sm:px-4 sm:py-3">
              <span className="text-xs text-white/60 sm:text-sm">Against favorites</span>
              <span className="text-sm font-bold text-rose-400 sm:text-base">{contrarianPercent}%</span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2 sm:px-4 sm:py-3">
              <span className="text-xs text-white/60 sm:text-sm">Best call</span>
              <span className="text-sm font-bold text-emerald-400 sm:text-base">{entryPrice}¢ → $1</span>
            </div>
          </div>

          {/* Quote */}
          <p className="mb-4 px-2 text-center text-xs italic text-white/40 sm:mb-6">
            "{data.personality_description}"
          </p>

          {/* Footer */}
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
            <div className="text-center text-xs text-white/30">
              kalshi.com/wrapped
            </div>
          </div>

          {/* Decorative elements */}
          <div
            className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full blur-3xl"
            style={{ background: gradient, opacity: 0.2 }}
          />
          <div
            className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full blur-3xl"
            style={{ background: gradient, opacity: 0.15 }}
          />
        </motion.div>

        {/* Share buttons */}
        <motion.div
          variants={fadeInUp}
          className="flex w-full max-w-sm flex-col gap-2 sm:flex-row sm:gap-3"
        >
          <button
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-white/10 px-3 py-2.5 text-sm font-medium text-white transition-all hover:bg-white/20 sm:px-4 sm:py-3"
            onClick={(e) => {
              e.stopPropagation();
              handleShare('download');
            }}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Save
          </button>

          <button
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#1DA1F2] px-3 py-2.5 text-sm font-medium text-white transition-all hover:bg-[#1a8cd8] sm:px-4 sm:py-3"
            onClick={(e) => {
              e.stopPropagation();
              handleShare('twitter');
            }}
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            Share
          </button>

          <button
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-white/10 px-3 py-2.5 text-sm font-medium text-white transition-all hover:bg-white/20 sm:px-4 sm:py-3"
            onClick={(e) => {
              e.stopPropagation();
              handleShare('copy');
            }}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Copy
          </button>
        </motion.div>

        {/* Replay hint */}
        <motion.p
          variants={fadeInUp}
          className="mt-4 text-xs text-white/30 sm:mt-6"
        >
          Tap left to replay your Wrapped
        </motion.p>
      </motion.div>
    </ScreenWrapper>
  );
}
