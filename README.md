# CelebPick

A React Native quiz application that tests your celebrity knowledge through two engaging game modes.

## Overview

CelebPick is a mobile quiz game where users match celebrity names with their photos (or vice versa). The game continues until the first wrong answer, encouraging players to achieve their highest score while building a persistent score history.

## Features

### Game Modes

- **Name → Face**: Display a celebrity name and choose the matching photo from 4 options
- **Face → Name**: Display a celebrity photo and choose the matching name from 4 options

### Core Gameplay

- Endless questions until first mistake
- Score tracking (+1 per correct answer)
- Immediate feedback on answers
- Automatic score persistence

### Score History

- Persistent local storage of all game scores
- Latest score prominently displayed at the top
- Newest entry highlighted within the score list
- Date, time, mode, and score for each entry
- Easy navigation back to gameplay

## Technology Stack

- **Framework**: Expo (React Native)
- **Language**: TypeScript
- **Navigation**: React Navigation (Native Stack)
- **Storage**: AsyncStorage
- **State Management**: React Hooks

## Project Structure

```
CelebPick/
├── src/
│   ├── screens/          # Main application screens
│   │   ├── HomeScreen.tsx
│   │   ├── QuizScreen.tsx
│   │   └── ScoreHistoryScreen.tsx
│   ├── components/       # Reusable UI components
│   │   ├── CelebrityImage.tsx
│   │   ├── QuizOption.tsx
│   │   └── ScoreHistoryItem.tsx
│   ├── hooks/            # Custom React hooks
│   │   └── useQuizGame.ts
│   ├── services/         # External services
│   │   └── storage.ts
│   ├── utils/            # Utility functions
│   │   ├── quizGenerator.ts
│   │   └── randomizer.ts
│   ├── data/             # Static data
│   │   └── celebrities.ts
│   ├── constants/        # App constants
│   │   └── theme.ts
│   ├── navigation/       # Navigation configuration
│   │   ├── RootNavigator.tsx
│   │   └── types.ts
│   └── types/            # TypeScript type definitions
│       └── index.ts
├── assets/               # Static assets
│   └── celebrities/      # Celebrity images
├── App.tsx               # Root application component
└── package.json          # Dependencies and scripts
```

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```

3. **Run on a device or simulator:**
   - iOS: Press `i` (requires macOS and Xcode)
   - Android: Press `a` (requires Android Studio)
   - Web: Press `w`
   - Or scan the QR code with Expo Go app on your phone

## How to Play

1. **Choose a Game Mode:**
   - Select either "Name → Face" or "Face → Name" from the home screen

2. **Answer Questions:**
   - For Name → Face: See a celebrity name, tap the correct photo
   - For Face → Name: See a celebrity photo, tap the correct name
   - Each correct answer adds +1 to your score

3. **Game Over:**
   - The game ends on your first wrong answer
   - Your score is automatically saved
   - You're taken to Score History with your latest score highlighted

4. **View Score History:**
   - See all your past scores sorted by date (newest first)
   - Your latest score is displayed in a prominent header
   - The same score is highlighted in the list below
   - Tap "Play Again" to start a new game

## Key Implementation Details

### Quiz Logic
- Questions are generated randomly from a pool of 25 celebrities
- Recently used celebrities are tracked to prevent immediate repetition
- Each question has exactly 4 options (1 correct + 3 random wrong answers)
- Options are shuffled using Fisher-Yates algorithm

### Score Persistence
- Scores are stored locally using AsyncStorage
- Each entry includes: ID, score, mode, and ISO 8601 timestamp
- Data persists across app restarts
- No size limit (can be added if needed)

### Highlighting Strategy
- Latest score ID is passed via navigation params when game ends
- Score History shows the latest score in two places:
  1. A large, prominent header at the top
  2. Highlighted with yellow background in the main list
- The highlighted entry also displays a "LATEST" badge

## Celebrity Data

### Quick Start: Fetch Real Celebrity Data

The app includes a data fetcher that pulls real celebrity information from Wikidata:

```bash
node scripts/fetchCelebs.mjs
```

This generates `data/celebrities.json` with 300 celebrities and their images from Wikimedia Commons.

See [CELEBRITY_DATA_GUIDE.md](CELEBRITY_DATA_GUIDE.md) for:
- Configuration options
- Filtering by occupation (actors, musicians, etc.)
- Advanced SPARQL queries
- Integration instructions

### Current Setup

The app currently uses placeholder avatar images from [pravatar.cc](https://pravatar.cc). After running the fetcher script, update `src/data/celebrities.ts` to use the real data from `data/celebrities.json`.

## Development

### Type Checking
```bash
npx tsc --noEmit
```

### Clear AsyncStorage (for testing)
Add a button in the app that calls:
```typescript
import { StorageService } from './src/services/storage';
await StorageService.clearHistory();
```

## Future Enhancements

- [ ] Difficulty levels (Easy, Medium, Hard)
- [ ] Timed mode with countdown per question
- [ ] High score leaderboards
- [ ] Celebrity categories (Movies, Music, Sports)
- [ ] Hint system (50/50, skip question)
- [ ] Answer feedback animations
- [ ] Sound effects
- [ ] Social sharing
- [ ] Daily challenge mode
- [ ] Multiplayer support

## License

MIT License - see [LICENSE](LICENSE) file for details

## Contributing

This is an early-stage project. Contributions, issues, and feature requests are welcome!

## Acknowledgments

- Built with Expo and React Native
- Placeholder avatars from [pravatar.cc](https://pravatar.cc)
