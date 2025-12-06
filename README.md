# Kalshi Wrapped 2025

A cinematic, mobile-first year-in-review experience for Kalshi traders, inspired by Spotify Wrapped.

## Tech Stack

- **React 19** + TypeScript
- **Framer Motion** - Animations and gestures
- **Tailwind CSS v4** - Styling
- **Vite** - Build tool
- **html2canvas** - Share card generation

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Data Contract

The app expects a JSON payload with user data. See `src/data/sampleData.ts` for the complete interface and example data.

```typescript
interface WrappedData {
  user_id: string;
  total_predictions: number;
  total_markets: number;
  percentile: number;
  days_active: number;
  longest_streak: number;
  // ... see sampleData.ts for full interface
}
```

## Navigation

- **Tap/Click**: Right side to advance, left side to go back
- **Swipe**: Left to advance, right to go back
- **Keyboard**: Arrow keys or spacebar (desktop)

## Personality Archetypes

- **The Dynasty Killer** - Fades favorites, backs underdogs
- **The Tape Reader** - Waits for momentum, buys late
- **The Hedge Fund** - Diversified, never all-in
- **The True Believer** - Picks a side early, rides it
- **The Arbitrageur** - Hunts mispricings
- **The Oracle** - Unusually high win rate
