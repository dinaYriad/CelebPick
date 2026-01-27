# CelebPick - Complete UI/UX Design Document
## Professional Mobile Quiz Application

**Last Updated:** January 2026
**Design System Version:** 1.0
**Platform:** React Native (Expo)

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Design Philosophy](#design-philosophy)
3. [UX Flow & Screen Designs](#ux-flow--screen-designs)
4. [UI Design System](#ui-design-system)
5. [Component Library](#component-library)
6. [Interaction Patterns](#interaction-patterns)
7. [Accessibility Guidelines](#accessibility-guidelines)
8. [Future Enhancements](#future-enhancements)

---

## Executive Summary

CelebPick is a fast-paced celebrity matching quiz game with two game modes:
- **Name → Face**: User sees a celebrity name and selects from 4 images
- **Face → Name**: User sees a celebrity image and selects from 4 names

### Key UX Principles
- **Instant Feedback**: Visual confirmation on every selection (green border = correct, red = wrong)
- **One-Mistake-Out**: Game ends on first wrong answer, maintaining tension
- **Clear Scoring**: Score visible at all times during gameplay
- **Highlight Latest**: Most recent score prominently featured in history

### Current Implementation Status

✅ **Completed Features:**
- Complete navigation flow (Home → Quiz → Score History)
- Both game modes fully functional
- Score persistence with AsyncStorage
- Real celebrity data from Wikidata (50 celebrities)
- Responsive component library
- Professional design system with colors, typography, spacing

✅ **Recently Enhanced:**
- Visual feedback system for quiz answers
- Extended color palette with success/error states
- Shadow elevation system (Material Design inspired)
- Animation timing constants
- Opacity constants for interactive states

🔄 **Recommended Next Steps:**
- Add haptic feedback (Expo Haptics)
- Implement entrance animations
- Add swipe-to-delete in score history
- Optional sound effects

---

## Design Philosophy

### Visual Style
**Modern Minimalism with Purpose**

- Clean, uncluttered interfaces
- Purple primary color (#6200EE) for brand identity
- High contrast for readability
- Generous whitespace (24-32pt margins)
- Card-based layout with subtle shadows

### Interaction Style
**Responsive & Forgiving**

- Instant visual feedback on all actions
- Large touch targets (minimum 60pt height)
- Disabled states during processing (prevents double-taps)
- Smooth transitions between states
- Clear loading and error states

### Content Hierarchy
**Score-First, Celebrity-Second**

1. **Primary**: Current score and game state
2. **Secondary**: Celebrity prompt (name or image)
3. **Tertiary**: Option buttons
4. **Quaternary**: Navigation elements

---

## UX Flow & Screen Designs

### 1. Home Screen (Entry Point)

**Layout Hierarchy:**
```
┌─────────────────────────────┐
│    [Safe Area]              │
│                             │
│        CelebPick            │ ← Title (32pt, primary)
│   Test your celebrity...    │ ← Subtitle (16pt, secondary)
│                             │
│   ┌───────────────────┐    │
│   │   Name → Face     │    │ ← Primary button (elevated)
│   │  Match names to   │    │
│   │    photos         │    │
│   └───────────────────┘    │
│                             │
│   ┌───────────────────┐    │
│   │   Face → Name     │    │ ← Primary button (elevated)
│   │  Match photos to  │    │
│   │    names          │    │
│   └───────────────────┘    │
│                             │
│   ┌───────────────────┐    │
│   │ View Score History│    │ ← Outlined button
│   └───────────────────┘    │
│                             │
└─────────────────────────────┘
```

**Microcopy:**
- Title: "CelebPick"
- Subtitle: "Test your celebrity knowledge!"
- Button 1: "Name → Face" + "Match celebrity names to photos"
- Button 2: "Face → Name" + "Match photos to celebrity names"
- Button 3: "View Score History"

**States:**
- Default: All buttons enabled
- Loading: (App loads instantly, no loading state needed)
- Empty: N/A (always navigable)

**Future Enhancements:**
- [ ] Add app logo above title
- [ ] Stagger button entrance animations
- [ ] Add subtle gradient background
- [ ] Haptic feedback on button press

---

### 2. Quiz Screen (Main Gameplay)

**Layout Hierarchy (Name → Face mode):**
```
┌─────────────────────────────┐
│  [Safe Area]   Score: 5 →   │ ← Score badge (top-right)
│                             │
│      Who is this?           │ ← Prompt label
│                             │
│    [Tom Hanks]              │ ← Celebrity name (32pt, bold)
│                             │
│   ┌─────┐  ┌─────┐         │
│   │ IMG │  │ IMG │         │ ← 2x2 image grid
│   └─────┘  └─────┘         │    (160x160pt each)
│   ┌─────┐  ┌─────┐         │
│   │ IMG │  │ IMG │         │
│   └─────┘  └─────┘         │
│                             │
└─────────────────────────────┘
```

**Layout Hierarchy (Face → Name mode):**
```
┌─────────────────────────────┐
│  [Safe Area]   Score: 5 →   │
│                             │
│      Who is this?           │
│                             │
│     ┌─────────┐            │ ← Celebrity image
│     │  IMAGE  │            │    (200x200pt)
│     └─────────┘            │
│                             │
│   ┌───────────────────┐    │
│   │   Tom Hanks       │    │ ← Text option buttons
│   └───────────────────┘    │    (60pt height)
│   ┌───────────────────┐    │
│   │  Meryl Streep     │    │
│   └───────────────────┘    │
│   ┌───────────────────┐    │
│   │  Brad Pitt        │    │
│   └───────────────────┘    │
│   ┌───────────────────┐    │
│   │  Julia Roberts    │    │
│   └───────────────────┘    │
└─────────────────────────────┘
```

**Interaction Flow:**

1. **Initial State**
   - All options enabled
   - Borders transparent
   - Score displayed

2. **User Taps Option**
   - Selected option gets border (3pt)
   - All options disabled
   - Processing state begins

3. **Correct Answer** (Green Feedback)
   - Selected option: Green border (#4CAF50)
   - Wait 600ms
   - Auto-advance to next question
   - Score increments

4. **Wrong Answer** (Red Feedback)
   - Selected option: Red border (#B00020)
   - Correct answer: Light green border (#81C784)
   - Wait 1500ms
   - Navigate to Score History with latest score ID

**States:**
- **Loading**: "Loading..." centered (rare, only on mount)
- **Active**: Quiz in progress, score visible
- **Processing**: After selection, awaiting feedback
- **Feedback**: Visual borders showing correct/wrong

**Future Enhancements:**
- [ ] Add animated checkmark/X icons on selection
- [ ] Haptic feedback (light for correct, heavy for wrong)
- [ ] Score counter animation when incrementing
- [ ] Slide-in animation for new questions

---

### 3. Score History Screen

**Layout Hierarchy:**
```
┌─────────────────────────────┐
│  [Safe Area]                │
│                             │
│  ┌─────────────────────┐   │
│  │   LATEST SCORE      │   │ ← Header (only if latestScoreId)
│  │                     │   │    (Purple bg, elevated)
│  │      15             │   │ ← Large score (48pt)
│  │   Name → Face       │   │ ← Mode
│  │   Jan 26, 2026      │   │ ← Date
│  └─────────────────────┘   │
│                             │
│  Score History              │ ← Section title
│                             │
│  ┌─────────────────────┐   │
│  │ 15  Name→Face LATEST│   │ ← Highlighted entry
│  │     Jan 26, 2:30 PM │   │    (Yellow bg, gold border)
│  └─────────────────────┘   │
│  ┌─────────────────────┐   │
│  │ 12  Face→Name       │   │ ← Normal entry
│  │     Jan 25, 5:15 PM │   │
│  └─────────────────────┘   │
│  ┌─────────────────────┐   │
│  │ 8   Name→Face       │   │
│  │     Jan 24, 9:45 AM │   │
│  └─────────────────────┘   │
│                             │
│  ┌───────────────────┐     │
│  │   Play Again      │     │ ← Primary button
│  └───────────────────┘     │
│  ┌───────────────────┐     │
│  │  Back to Home     │     │ ← Outlined button
│  └───────────────────┘     │
└─────────────────────────────┘
```

**Key Features:**

1. **Latest Score Header** (Conditional)
   - Only appears when navigating from quiz
   - Large score display (48pt)
   - Purple background (#6200EE)
   - White text
   - Elevated shadow

2. **Score List**
   - FlatList with all scores (newest first)
   - Latest entry highlighted with:
     - Yellow background (#FFF9C4)
     - Gold border (#FFD54F, 2pt)
     - "LATEST" badge (purple chip)
   - Each entry shows:
     - Score (large, left-aligned)
     - Mode badge
     - Formatted date/time

3. **Action Buttons**
   - "Play Again" → navigates to Home
   - "Back to Home" → navigates to Home

**States:**
- **Loading**: "Loading..." centered
- **Empty**: Special empty state
  - "No scores yet!"
  - "Play a quiz to start building your history."
  - Single "Start Playing" button
- **With Scores**: Normal list view
- **With Latest**: Header + highlighted entry in list

**Empty State:**
```
┌─────────────────────────────┐
│                             │
│      No scores yet!         │ ← Heading
│                             │
│   Play a quiz to start      │ ← Body text
│   building your history.    │
│                             │
│  ┌───────────────────┐     │
│  │  Start Playing    │     │ ← Primary button
│  └───────────────────┘     │
│                             │
└─────────────────────────────┘
```

**Future Enhancements:**
- [ ] Swipe-to-delete individual entries
- [ ] "Clear All History" with confirmation modal
- [ ] Animated entrance for latest score (scale + fade)
- [ ] Confetti animation for new high scores
- [ ] Share score functionality
- [ ] Filter by game mode

---

## UI Design System

### Color Palette

**File:** `src/constants/theme.ts`

#### Primary Colors
```typescript
primary: '#6200EE'        // Purple - Brand color
primaryDark: '#3700B3'    // Darker purple for gradients
primaryLight: '#BB86FC'   // Light purple for accents
```

#### Secondary Colors
```typescript
secondary: '#03DAC6'      // Teal - Accent color
secondaryLight: '#66FFF3' // Light teal
```

#### Background Colors
```typescript
background: '#FFFFFF'                    // Pure white
backgroundGradientStart: '#FAFAFA'       // For subtle gradients
backgroundGradientEnd: '#FFFFFF'
surface: '#F5F5F5'                       // Card backgrounds
surfaceElevated: '#FFFFFF'               // Elevated cards
```

#### Semantic Colors
```typescript
success: '#4CAF50'        // Green - Correct answers
successLight: '#81C784'   // Light green - Correct answer indicator
error: '#B00020'          // Red - Wrong answers
errorLight: '#CF6679'     // Light red
warning: '#FF9800'        // Orange - Warnings
highlight: '#FFF9C4'      // Yellow - Latest score background
highlightBorder: '#FFD54F' // Gold - Latest score border
```

#### Overlay Colors
```typescript
overlay: 'rgba(0, 0, 0, 0.5)'       // Modal overlays
overlayLight: 'rgba(0, 0, 0, 0.2)'  // Light overlays
```

#### Text Colors
```typescript
text: {
  primary: '#000000',     // Black - Primary text
  secondary: '#757575',   // Gray - Secondary text
  tertiary: '#9E9E9E',    // Light gray - Tertiary text
  onPrimary: '#FFFFFF',   // White - Text on primary color
  onSuccess: '#FFFFFF',   // White - Text on success color
  onError: '#FFFFFF',     // White - Text on error color
}
```

### Spacing Scale

**8-point grid system**

```typescript
SPACING = {
  xs: 4,    // Extra small - Tight spacing
  sm: 8,    // Small - Internal padding
  md: 16,   // Medium - Card padding
  lg: 24,   // Large - Screen padding
  xl: 32,   // Extra large - Section spacing
  xxl: 48,  // XX large - Large gaps
}
```

**Usage:**
- `xs (4pt)`: Tight elements (badge padding, small gaps)
- `sm (8pt)`: Button padding, small margins
- `md (16pt)`: Card padding, default spacing
- `lg (24pt)`: Screen padding, section margins
- `xl (32pt)`: Large section gaps
- `xxl (48pt)`: Title bottom margin

### Typography Scale

```typescript
TYPOGRAPHY = {
  title: {
    fontSize: 32,
    fontWeight: '700',      // Bold
  },
  heading: {
    fontSize: 24,
    fontWeight: '600',      // Semibold
  },
  subheading: {
    fontSize: 20,
    fontWeight: '600',
  },
  body: {
    fontSize: 16,
    fontWeight: '400',      // Regular
  },
  caption: {
    fontSize: 14,
    fontWeight: '400',
  },
}
```

**Usage Guide:**
- **title**: App title, large scores (32pt, bold)
- **heading**: Section titles, button text (24pt, semibold)
- **subheading**: List section headers (20pt, semibold)
- **body**: Primary content, button labels (16pt, regular)
- **caption**: Timestamps, helper text (14pt, regular)

### Layout Constants

```typescript
LAYOUT = {
  optionImageSize: { width: 160, height: 160 },
  promptImageSize: { width: 200, height: 200 },
  borderRadius: 8,
  borderRadiusLarge: 12,
  borderRadiusSmall: 4,
  buttonHeight: 60,
  minTouchTarget: 44,      // iOS HIG minimum
  maxContentWidth: 600,    // For tablet support
}
```

### Shadow Elevation (Material Design)

```typescript
SHADOWS = {
  none: {
    elevation: 0,
    shadowColor: 'transparent',
  },
  small: {
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
  },
  medium: {
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  },
  large: {
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
  },
}
```

**Usage:**
- **none**: Flat elements
- **small**: Subtle elevation (option cards, list items)
- **medium**: Moderate elevation (buttons, selected cards)
- **large**: High elevation (dialogs, modals, headers)

### Animation Constants

```typescript
ANIMATION = {
  fast: 200,      // Quick transitions (hover, press)
  normal: 300,    // Standard animations (fade, slide)
  slow: 500,      // Slow animations (page transitions)
  springConfig: {
    damping: 15,
    mass: 1,
    stiffness: 150,
  },
}
```

### Opacity Constants

```typescript
OPACITY = {
  disabled: 0.38,   // Disabled elements
  inactive: 0.54,   // Inactive elements
  active: 1.0,      // Active elements
  pressed: 0.7,     // Pressed state
}
```

---

## Component Library

### 1. QuizOption Component

**File:** `src/components/QuizOption.tsx`

**Purpose:** Unified option button for both game modes

**Props:**
```typescript
interface QuizOptionProps {
  type: 'image' | 'text';
  content: string;
  onPress: () => void;
  disabled?: boolean;
  feedbackState?: 'idle' | 'correct' | 'wrong' | 'correct-answer';
}
```

**Variants:**

**Image Option** (Name → Face mode)
- 160x160pt image in card
- 8pt border radius
- 3pt border (transparent default)
- Elevation: small
- Active opacity: 0.7

**Text Option** (Face → Name mode)
- Primary color background
- 16pt padding
- 60pt minimum height
- White text, centered
- 3pt border (transparent default)

**Feedback States:**
- `idle`: No border, normal state
- `correct`: Green border (#4CAF50, 3pt), medium shadow
- `wrong`: Red border (#B00020, 3pt), medium shadow
- `correct-answer`: Light green border (#81C784, 3pt), medium shadow

**Example Usage:**
```tsx
<QuizOption
  type="image"
  content={celebrity.imageUrl}
  onPress={() => handleAnswer(celebrity.id)}
  disabled={isProcessing}
  feedbackState={feedbackStates[celebrity.id] || 'idle'}
/>
```

---

### 2. CelebrityImage Component

**File:** `src/components/CelebrityImage.tsx`

**Purpose:** Consistent celebrity image display with loading states

**Props:**
```typescript
interface CelebrityImageProps {
  source: string;
  style?: StyleProp<ImageStyle>;
  size?: 'small' | 'medium' | 'large';
}
```

**Size Map:**
- `small`: 80x80pt
- `medium`: 160x160pt (quiz options)
- `large`: 200x200pt (quiz prompt)

**States:**
- **Loading**: ActivityIndicator over gray surface
- **Loaded**: Image displayed
- **Error**: Gray placeholder box (50% size, 30% opacity)

**Features:**
- 8pt border radius
- Consistent aspect ratio (1:1)
- Gray surface background (#F5F5F5)
- Automatic loading indicator

---

### 3. ScoreHistoryItem Component

**File:** `src/components/ScoreHistoryItem.tsx`

**Purpose:** Individual score entry for history list

**Props:**
```typescript
interface ScoreHistoryItemProps {
  score: ScoreEntry;
  isHighlighted?: boolean;
}
```

**Layout:**
```
┌─────────────────────────────┐
│ ┌────┐                      │
│ │ 15 │  Name → Face  [LATEST]│
│ │pts │  Jan 26, 2:30 PM     │
│ └────┘                      │
└─────────────────────────────┘
```

**Normal State:**
- White background
- Light gray border (1pt)
- Small elevation
- 12pt border radius

**Highlighted State:**
- Yellow background (#FFF9C4)
- Gold border (#FFD54F, 2pt)
- Medium elevation
- "LATEST" badge (purple chip)

**Features:**
- Score displayed large on left (32pt, bold, primary color)
- Mode badge (Name→Face or Face→Name)
- Formatted date/time
- Conditional "LATEST" badge

---

### 4. Button Styles (Standard Patterns)

#### Primary Button
```typescript
{
  backgroundColor: COLORS.primary,
  padding: SPACING.md,
  borderRadius: LAYOUT.borderRadiusLarge,
  minHeight: LAYOUT.buttonHeight,
  ...SHADOWS.small,
}
```

**Text:**
- Color: White
- Font: 16pt, semibold
- Centered

**States:**
- Active opacity: 0.7
- Disabled: opacity 0.38

#### Secondary Button (Outlined)
```typescript
{
  borderWidth: 2,
  borderColor: COLORS.primary,
  padding: SPACING.md,
  borderRadius: LAYOUT.borderRadiusLarge,
  minHeight: LAYOUT.buttonHeight,
}
```

**Text:**
- Color: Primary purple
- Font: 16pt, semibold
- Centered

---

## Interaction Patterns

### Quiz Answer Feedback Flow

**Timeline:**

```
User Taps Option
      ↓
┌─────────────────────┐
│  isProcessing=true  │ ← Disable all options
│  Show border (3pt)  │
└─────────────────────┘
      ↓
  Call handleAnswer()
      ↓
     / \
    /   \
Correct  Wrong
   ↓       ↓
┌──────┐ ┌──────────────────┐
│Green │ │Red border on     │
│border│ │selected          │
│      │ │                  │
│Wait  │ │Light green border│
│600ms │ │on correct answer │
│      │ │                  │
│Next  │ │Wait 1500ms       │
│Q     │ │                  │
└──────┘ │Navigate to       │
         │Score History     │
         └──────────────────┘
```

**Key Timings:**
- **Correct answer**: 600ms delay (allows user to see green border)
- **Wrong answer**: 1500ms delay (allows user to see both borders)

**Visual Feedback:**
- Correct: `#4CAF50` (green)
- Wrong: `#B00020` (red)
- Correct answer reveal: `#81C784` (light green)

---

### Navigation Patterns

**Home → Quiz:**
- Replace navigation (can't go back during quiz)
- Pass mode as param (`{ mode: 'nameToFace' }`)

**Quiz → Score History:**
- Replace navigation (prevent back button)
- Pass latest score ID (`{ latestScoreId: string }`)

**Score History → Home:**
- Standard navigation
- Clears history stack

---

### Loading States

**Quiz Screen:**
- Only shows loading on initial mount
- Very brief (celebrity data loads from JSON)
- Displays "Loading..." centered

**Score History:**
- Shows while reading AsyncStorage
- Usually instant (<100ms)
- Displays "Loading..." centered

**Images:**
- Individual CelebrityImage components show ActivityIndicator
- User can see other images loading
- Doesn't block interaction

---

## Accessibility Guidelines

### Touch Targets

**Minimum sizes:**
- Buttons: 60pt height (exceeds iOS 44pt minimum)
- Image options: 160x160pt (large enough)
- List items: 60pt+ height

**Spacing:**
- Minimum 8pt between tappable elements
- Prefer 16pt for comfortable spacing

### Color Contrast

**WCAG AA Compliance:**
- Primary text on white: 21:1 (AAA)
- Secondary text on white: 4.6:1 (AA)
- White text on primary purple: 8.6:1 (AAA)
- Success green on white: 4.5:1 (AA)
- Error red on white: 10.4:1 (AAA)

**Color-Blind Considerations:**
- Don't rely on color alone
- Use borders + colors for feedback
- Text labels on all interactive elements

### Dynamic Type Support

**Preparation for iOS/Android:**
- Use TYPOGRAPHY constants (scales automatically)
- Test with large text settings
- Ensure labels don't truncate

### Screen Reader Support

**Recommended aria labels (future):**
- Quiz options: "Select {celebrity name}"
- Score: "Current score: {score}"
- Mode buttons: "Start Name to Face quiz"
- History items: "Score {score} on {date}"

---

## Future Enhancements

### Phase 1: Polish (High Priority)

#### 1. Haptic Feedback
**Library:** `expo-haptics`

```typescript
import * as Haptics from 'expo-haptics';

// On correct answer
Haptics.notificationAsync(
  Haptics.NotificationFeedbackType.Success
);

// On wrong answer
Haptics.notificationAsync(
  Haptics.NotificationFeedbackType.Error
);

// On button press
Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
```

**Where to add:**
- ✅ Quiz option selection
- ✅ Correct answer (light, success)
- ✅ Wrong answer (heavy, error)
- ✅ Button presses on Home screen

---

#### 2. Entrance Animations
**Library:** `react-native-reanimated` or built-in `Animated`

**Home Screen:**
```typescript
// Stagger button entrances
useEffect(() => {
  Animated.stagger(100, [
    Animated.spring(button1Anim, { toValue: 1 }),
    Animated.spring(button2Anim, { toValue: 1 }),
    Animated.spring(button3Anim, { toValue: 1 }),
  ]).start();
}, []);
```

**Quiz Screen:**
```typescript
// Slide in new question
Animated.parallel([
  Animated.timing(fadeAnim, { toValue: 1, duration: 300 }),
  Animated.spring(slideAnim, { toValue: 0 }),
]).start();
```

**Score History:**
```typescript
// Scale + fade latest score header
Animated.parallel([
  Animated.spring(scaleAnim, { toValue: 1 }),
  Animated.timing(fadeAnim, { toValue: 1 }),
]).start();
```

---

#### 3. Score Counter Animation
**Animate score increment in QuizScreen:**

```typescript
const animateScore = (newScore: number) => {
  Animated.sequence([
    Animated.timing(scaleAnim, {
      toValue: 1.3,
      duration: 150,
    }),
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
    }),
  ]).start();
};
```

---

### Phase 2: Functionality (Medium Priority)

#### 4. Swipe to Delete (Score History)
**Library:** `react-native-gesture-handler`

```typescript
<Swipeable
  renderRightActions={() => (
    <View style={styles.deleteAction}>
      <Text>Delete</Text>
    </View>
  )}
  onSwipeableRightOpen={() => handleDelete(item.id)}
>
  <ScoreHistoryItem score={item} isHighlighted={...} />
</Swipeable>
```

---

#### 5. Clear All History with Confirmation

**Modal Component:**
```tsx
<Modal visible={showConfirm} transparent>
  <View style={styles.overlay}>
    <View style={styles.dialog}>
      <Text style={styles.dialogTitle}>Clear All History?</Text>
      <Text style={styles.dialogBody}>
        This action cannot be undone.
      </Text>
      <View style={styles.dialogButtons}>
        <Button title="Cancel" onPress={onCancel} />
        <Button title="Clear" onPress={onConfirm} />
      </View>
    </View>
  </View>
</Modal>
```

---

#### 6. Confetti for High Scores

**Library:** `react-native-confetti-cannon`

```typescript
import ConfettiCannon from 'react-native-confetti-cannon';

// In ScoreHistoryScreen
{isNewHighScore && (
  <ConfettiCannon
    count={200}
    origin={{x: -10, y: 0}}
    fadeOut={true}
  />
)}
```

**Trigger condition:**
```typescript
const isNewHighScore = latestScore &&
  latestScore.score > Math.max(...scores.map(s => s.score));
```

---

### Phase 3: Features (Lower Priority)

#### 7. Sound Effects
**Library:** `expo-av`

```typescript
import { Audio } from 'expo-av';

const correctSound = new Audio.Sound();
await correctSound.loadAsync(require('./assets/correct.mp3'));
await correctSound.playAsync();
```

**Sounds needed:**
- `correct.mp3` - Pleasant chime (correct answer)
- `wrong.mp3` - Gentle buzz (wrong answer)
- `tap.mp3` - Subtle click (button press)

---

#### 8. Share Score Feature

**Library:** `expo-sharing`

```typescript
import * as Sharing from 'expo-sharing';

const shareScore = async (score: number, mode: string) => {
  const message = `I scored ${score} on CelebPick! Can you beat it?`;
  await Sharing.shareAsync(message);
};
```

---

#### 9. Filter Score History by Mode

**Add mode filter buttons:**
```tsx
<View style={styles.filterContainer}>
  <Button
    title="All"
    onPress={() => setFilter('all')}
    active={filter === 'all'}
  />
  <Button
    title="Name→Face"
    onPress={() => setFilter('nameToFace')}
    active={filter === 'nameToFace'}
  />
  <Button
    title="Face→Name"
    onPress={() => setFilter('faceToName')}
    active={filter === 'faceToName'}
  />
</View>
```

---

#### 10. Difficulty Levels

**Add difficulty param to quiz:**
- **Easy**: 6 seconds per question
- **Medium**: 4 seconds per question
- **Hard**: 2 seconds per question + obscure celebrities

**Implementation:**
```typescript
interface QuizParams {
  mode: GameMode;
  difficulty?: 'easy' | 'medium' | 'hard';
}

// Timer component
const [timeLeft, setTimeLeft] = useState(difficultyTime[difficulty]);
```

---

### Phase 4: Advanced (Future)

#### 11. Leaderboard (Online)
- Requires backend (Firebase/Supabase)
- Global leaderboard by mode
- Friend leaderboards
- Weekly challenges

#### 12. Multiplayer Mode
- Real-time competition
- Head-to-head matches
- Shared question pool

#### 13. Custom Celebrity Packs
- User-created packs
- Theme packs (e.g., "80s Movies", "Musicians")
- Downloadable packs

#### 14. Progress Tracking
- Total questions answered
- Accuracy percentage
- Longest streak
- Time played

---

## Implementation Checklist

### Core Features (✅ Complete)
- [x] Home screen with mode selection
- [x] Quiz screen with both modes
- [x] Visual feedback on answers
- [x] Score tracking during quiz
- [x] Score persistence with AsyncStorage
- [x] Score History with highlighting
- [x] Real celebrity data from Wikidata
- [x] Responsive component library
- [x] Professional design system

### Immediate Priorities (🔄 In Progress / 📋 Planned)
- [ ] Add haptic feedback (📋 30 min)
- [ ] Implement entrance animations (📋 1-2 hours)
- [ ] Animate score counter (📋 30 min)
- [ ] Add confetti for high scores (📋 1 hour)
- [ ] Swipe-to-delete in history (📋 1 hour)
- [ ] Clear All History confirmation (📋 30 min)

### Optional Enhancements (📋 Planned)
- [ ] Sound effects (📋 1 hour)
- [ ] Share score feature (📋 30 min)
- [ ] Filter score history by mode (📋 1 hour)
- [ ] Gradient background on Home (📋 15 min)
- [ ] App logo/icon (📋 1 hour)

### Advanced Features (🔮 Future)
- [ ] Difficulty levels
- [ ] Online leaderboard
- [ ] Multiplayer mode
- [ ] Custom celebrity packs
- [ ] Progress tracking

---

## File Structure

```
CelebPick/
├── App.tsx
├── src/
│   ├── screens/
│   │   ├── HomeScreen.tsx           ✅ Complete
│   │   ├── QuizScreen.tsx           ✅ Enhanced with feedback
│   │   └── ScoreHistoryScreen.tsx   ✅ Complete
│   ├── components/
│   │   ├── QuizOption.tsx           ✅ Enhanced with feedback states
│   │   ├── CelebrityImage.tsx       ✅ Complete
│   │   └── ScoreHistoryItem.tsx     ✅ Complete
│   ├── hooks/
│   │   ├── useQuizGame.ts           ✅ Complete
│   │   └── useScoreHistory.ts       ✅ Complete
│   ├── services/
│   │   └── storage.ts               ✅ Complete
│   ├── utils/
│   │   ├── quizGenerator.ts         ✅ Complete
│   │   └── randomizer.ts            ✅ Complete
│   ├── data/
│   │   └── celebrities.ts           ✅ Complete (50 real celebrities)
│   ├── constants/
│   │   └── theme.ts                 ✅ Enhanced design system
│   ├── navigation/
│   │   ├── RootNavigator.tsx        ✅ Complete
│   │   └── types.ts                 ✅ Complete
│   └── types/
│       └── index.ts                 ✅ Complete
├── data/
│   └── celebrities.json             ✅ 50 celebrities from Wikidata
├── scripts/
│   └── fetchCelebs.mjs              ✅ Complete
└── assets/
```

---

## Testing Checklist

### Functional Tests
- [ ] Both quiz modes work correctly
- [ ] Score increments on correct answers
- [ ] Game ends on wrong answer
- [ ] Latest score is highlighted in history
- [ ] Empty score history shows correct state
- [ ] Images load correctly
- [ ] Navigation flows work
- [ ] Back button behavior is correct

### Visual Tests
- [ ] All colors match design system
- [ ] Spacing is consistent (8pt grid)
- [ ] Typography scales correctly
- [ ] Shadows render on both platforms
- [ ] Feedback borders appear correctly
- [ ] Highlighted score has yellow bg + gold border
- [ ] Empty states display properly

### Interaction Tests
- [ ] Double-tap doesn't register twice
- [ ] Feedback delays feel right (600ms/1500ms)
- [ ] Buttons have appropriate opacity on press
- [ ] Disabled states prevent interaction
- [ ] Loading states display when needed

### Accessibility Tests
- [ ] All touch targets are 44pt+ (iOS standard)
- [ ] Text contrast meets WCAG AA
- [ ] Elements are keyboard navigable (if applicable)
- [ ] Screen reader labels are descriptive
- [ ] Works with large text settings

### Performance Tests
- [ ] Images load smoothly
- [ ] No lag when selecting answers
- [ ] Transitions are smooth (60fps)
- [ ] AsyncStorage reads/writes are fast
- [ ] App launches quickly

---

## Design Resources

### Typography
- **System Font**: Default (San Francisco on iOS, Roboto on Android)
- **Custom Font** (optional): Inter or Poppins for modern look

### Icons (if needed)
- **Library**: `@expo/vector-icons`
- **Style**: Material Icons or Ionicons
- **Usage**: Navigation icons, badges, actions

### Images
- **Celebrity Images**: Wikimedia Commons (600px width)
- **Placeholder**: Gray surface (#F5F5F5) with light gray box
- **Loading**: ActivityIndicator (primary color)

### Inspiration
- **Material Design 3** - Elevation, shadows, colors
- **iOS Human Interface Guidelines** - Touch targets, gestures
- **Duolingo** - Gamification, instant feedback
- **Kahoot** - Quick quiz mechanics
- **Trivia Crack** - Simple, engaging UI

---

## Conclusion

CelebPick has a **solid foundation** with professional UI/UX design. The core gameplay loop is engaging, the visual feedback is clear, and the design system is consistent.

**Next Steps:**
1. Add haptic feedback (30 min)
2. Implement entrance animations (1-2 hours)
3. Test on real devices (iOS + Android)
4. Gather user feedback
5. Iterate based on feedback

**Long-Term Vision:**
- Expand celebrity database (300+ celebrities)
- Add difficulty levels
- Implement online leaderboard
- Create themed celebrity packs
- Launch on App Store + Google Play

---

**Document Version:** 1.0
**Last Updated:** January 26, 2026
**Maintained By:** CelebPick Development Team
