# Kalshi Wrapped 2025

A cinematic, mobile-first year-in-review experience for Kalshi traders, inspired by Spotify Wrapped.

## Features

- **11 Interactive Screens**: Tap or swipe through your personalized 2025 prediction journey
- **Smooth Animations**: 60fps transitions powered by Framer Motion
- **Mobile-First Design**: Optimized for iOS and Android with haptic feedback
- **Shareable Cards**: Generate and share your prediction personality to social media
- **Desktop Support**: Full keyboard navigation (arrow keys, spacebar)

## Screens

1. **The Opening** - Total predictions and percentile ranking
2. **Days in the Arena** - Active days and longest streak with calendar heatmap
3. **Your Arena** - Top category breakdown with animated bubbles
4. **The Contrarian Score** - Consensus vs contrarian spectrum
5. **Your Best Call** - Biggest winning prediction with price chart
6. **The One That Got Away** - A notable miss with context
7. **Your Timing** - Early mover vs wait-and-see profile
8. **Worldview Map** - Belief dimensions (underdogs, chaos, etc.)
9. **Prediction Personality** - Your archetype reveal (e.g., "The Dynasty Killer")
10. **What's Next** - Personalized market recommendations
11. **Share Card** - Downloadable/shareable summary card

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
