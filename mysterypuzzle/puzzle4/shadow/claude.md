# Foreshadow Puzzle - Claude Context Document

## Project Overview

The Foreshadow Puzzle is an interactive text-based adventure game where players manipulate words in narrative text to progress through the story. Players control a character (Tessa) who moves around the screen using WASD keys, interacting with text blocks positioned at the top, left, right, and bottom of the viewport.

The core mechanic involves striking out words, picking them up, and inserting them in different locations to transform the narrative and trigger scene transitions.

## Game Mechanics

### Player Controls
- **WASD Keys**: Move character around the screen
- **DELETE**: Strike out (toggle) a word under the character
- **SPACEBAR**:
  - Pick up a word (when not carrying one)
  - Insert carried word after highlighted word (when carrying one)
- **TAB**: Cycle through multiple overlapping words at current position
- **Reload Button**: Reload current scene from beginning

### Core Gameplay Loop
1. Player moves character to overlap with words on screen
2. Words turn blue when highlighted
3. Player can strike out words (visually crossed out but not removed)
4. Player can pick up words, which appear above their character
5. Player can insert carried words after other words
6. Text modifications trigger scene transitions based on pattern matching

### Text Normalization Rules
- Text blocks automatically normalize: period at end, first letter capitalized, rest lowercase
- When matching patterns, text is converted to lowercase with punctuation removed and spaces collapsed
- Strikethrough words are excluded from pattern matching

## Architecture

### File Structure
- `game.html` - Main game file containing HTML, CSS, and JavaScript
- `scenes.js` - JSON-like data file defining all game scenes and triggers
- `frames/` - Character animation sprites (8 frames per direction: up, down, left, right)

### Key Components

#### Game State (game.html:176-192)
```javascript
const game = {
    x, y,           // Character position
    speed,          // Movement speed
    direction,      // Current facing direction
    frame,          // Current animation frame
    isMoving,       // Movement state
    hasStartedMoving, // Triggers first scene load
    carriedWord,    // Word being carried above character
    keys            // WASD key states
}
```

#### Text Blocks System (game.html:194-200)
Text is stored in four locations (top, left, right, bottom), each containing an array of word objects:
```javascript
{
    element,      // DOM element
    text,         // Word text content
    strikethrough, // Strike state
    location,     // Position on screen
    index         // Position in sentence
}
```

#### Scene Management (game.html:206-209)
- `currentScene` - Name of active scene
- `triggeredBlocks` - Set of if_ blocks already triggered (prevents re-triggering)

## Scene System (scenes.js)

### Scene Structure
Each scene is an object with:
- `scene` (string): Unique scene identifier
- `start` (object): Actions executed when scene loads
- `if_*` (objects): Conditional triggers that fire once when patterns match

### Actions

#### setText Actions
Format: `set{Location}Text{Order}: "text"`
- **Locations**: Top, Left, Right, Bottom
- **Orders**: 1, 2, 3, 4
- Text with same order appears simultaneously
- 2-second delay between each order level
- Text fades in with 1.5s transition

Example:
```javascript
setTopText1: "Tessa walks around the village.",
setLeftText2: "She is searching.",
setBottomText3: "She has not found her father."
```

#### gotoScene Action
Format: `gotoScene: "scene-name"`
- Transitions to specified scene
- Executes after all setText actions complete
- Clears carried word
- Fades out old scene, fades in new scene

### Triggers (if_ blocks)

Format:
```javascript
if_TriggerName: {
    match: "pattern" | ["pattern1", "pattern2"],
    // actions (setText, gotoScene)
}
```

- Trigger name after `if_` is for human readability only
- Each trigger fires **only once** per scene
- Checks all four text locations independently
- Fires when ANY text block matches ANY pattern in array

### Pattern Matching

#### Wildcard Syntax (*)
- `*` matches any characters (including none)
- Example: `"*hero*door"` matches "The hero walks to the door"

#### Optional Text Syntax ([word])
- `[word]` makes a word optional in the pattern
- Example: `"the [big] door"` matches both:
  - "the door"
  - "the big door"

#### Multiple Patterns
```javascript
match: ["pattern1", "pattern2", "pattern3"]
```
Triggers if ANY pattern matches ANY text block.

### NLP Pattern Matching (Optional - compromise.js)

In addition to wildcard/optional text matching, triggers can use **semantic NLP matching** via the `nlpMatch` field. This provides more intelligent pattern matching that understands verb tenses, negation, and parts of speech.

#### NLP Match Syntax

```javascript
nlpMatch: (doc, helpers) => boolean
```

- `doc` - compromise.js document object for analyzing the text
- `helpers` - utility object with common matching functions
- Returns `true` if the text should trigger the block

#### Available Helper Functions

```javascript
helpers.hasNegation(doc)           // Returns true if text contains negation
helpers.hasVerb(doc, 'go')         // Returns true if text has verb "go" (any tense)
helpers.hasDirection(doc, 'down')  // Returns true if text has direction word(s)
```

#### NLP Match Examples

**Simple verb + direction matching:**
```javascript
if_GoingDown: {
    match: ["going down", "went down"],  // Old way (rigid)
    nlpMatch: (doc, h) => h.hasVerb(doc, 'go') && h.hasDirection(doc, 'down'),  // Flexible!
    gotoScene: "mine_down"
}
// Matches: "going down", "goes down", "went down", "has gone down", etc.
```

**Negation detection:**
```javascript
if_DoesNotWant: {
    nlpMatch: (doc, h) => h.hasNegation(doc) && h.hasVerb(doc, 'want'),
    setBottomText1: "Fear holds her back."
}
// Matches: "does not want", "doesn't want", "never wants", etc.
```

**Multiple directions:**
```javascript
if_AnyDirection: {
    nlpMatch: (doc, h) => h.hasDirection(doc, 'up', 'down', 'left', 'right'),
    setTopText1: "Tessa moves forward."
}
// Matches any direction word
```

**Using compromise.js API directly:**
```javascript
if_IsScared: {
    nlpMatch: (doc, h) => doc.has('#Pronoun') && doc.has('scared'),
    setLeftText1: "She trembles."
}
// Uses compromise POS tags for more control
```

**Complex conditional logic:**
```javascript
if_ComplexTrigger: {
    nlpMatch: (doc, h) => {
        const hasGo = h.hasVerb(doc, 'go');
        const hasDown = h.hasDirection(doc, 'down');
        const isNegated = h.hasNegation(doc);

        // Trigger if positive "going down" OR negative "not going up"
        return (hasGo && hasDown && !isNegated) ||
               (hasGo && doc.has('up') && isNegated);
    },
    gotoScene: "next_scene"
}
```

**Array of functions (OR logic):**
```javascript
if_MultipleOptions: {
    nlpMatch: [
        (doc, h) => h.hasVerb(doc, 'climb') && h.hasDirection(doc, 'up'),
        (doc, h) => h.hasVerb(doc, 'ascend')
    ],
    gotoScene: "mine_up"
}
// Triggers if ANY function returns true
```

#### NLP vs Pattern Matching

| Feature | Pattern Match (`match`) | NLP Match (`nlpMatch`) |
|---------|------------------------|----------------------|
| Verb tenses | Must list each: "goes", "went", "gone" | Automatic: `hasVerb(doc, 'go')` |
| Negation | Complex wildcards: `"*not*go*"` | Simple: `hasNegation(doc)` |
| Flexibility | Rigid string patterns | Semantic understanding |
| Performance | Fast regex | ~20-50ms per check |
| Backwards compatible | Yes (always works) | Requires compromise.js loaded |

**Best practices:**
- Use `match` for simple exact phrase matching
- Use `nlpMatch` for verb variations, negation, or semantic matching
- Both can coexist in same trigger (fires if EITHER matches)
- If compromise.js fails to load, `nlpMatch` is silently disabled

#### Compromise.js Integration

The game automatically loads compromise.js from CDN. Check console for:
- ✓ `"Compromise.js loaded successfully"` - NLP features available
- ⚠ `"Compromise.js not available"` - Only `match` patterns work

## Current Story (scenes.js)

### Scene Flow
1. **home** - Tessa searches for her father in village
   - Trigger: Find father → go to intro

2. **intro** - Father explains the quest (dry river, failing crops)
   - Trigger: Begin journey → go to begin

3. **begin** - Following dry river, blocked by boulders
   - Trigger: Path open → shows mine
   - Trigger: Mine open → go to mine

4. **mine** - Mine entrance with ladder up and stairs down
   - Trigger: Going up → mine_up
   - Trigger: Going down → mine_down

5. **mine_down** - Deep in mine, slippery and wet
   - Trigger: Continue down → mine_down_deep
   - Trigger: Return → mine

### Incomplete Scenes
- `mine_up` - Not yet implemented
- `mine_down_deep` - Not yet implemented

## Technical Implementation Details

### Pattern Matching Algorithm (game.html:223-293)
1. Extract `[optional]` sections with placeholders
2. Normalize pattern (lowercase, remove punctuation, collapse spaces)
3. Convert to regex:
   - `[word]` → `(?:word\s+)?` (optional with trailing space)
   - `*` → `.*` (match anything)
   - Spaces → `\s+`
4. Test against normalized text

### Scene Validation (game.html:441-556)
Validates on page load:
- Scenes must be array
- Each scene needs unique `scene` field
- Actions must match valid formats
- Referenced scenes must exist
- Warns about invalid orders (outside 1-4)

### Match Tests (game.html:559-773)
Comprehensive test suite for pattern matching including:
- Wildcard tests
- Optional text tests
- Case sensitivity
- Punctuation handling
- Complex combinations

Runs automatically on page load, logs results to console.

### Character Animation
- 8-frame walk cycle per direction (up, down, left, right)
- Animation advances every 6 game frames
- Idle state shows frame 0
- Sprite files: `frames/08_Elliot_RPG_Walk {Direction}_{Frame}.png`

### URL Hash Navigation
- Current scene stored in URL hash
- Allows direct linking to scenes
- Format: `game.html#scene-name`
- Loads scene from hash on page load

## Development Notes

### Implementation Plan Status (from README.md)
1. ✅ Top, left, right, bottom text positioning
2. ✅ Spacebar word pickup and insertion
3. ✅ Scene loading system with scenes.js
4. ✅ if_ block triggers
5. ✅ Scene validation tests

### Key Features
- **Collision detection** for character-word interaction
- **Multi-word selection** with TAB cycling when overlapping
- **Automatic text normalization** (capitalization, periods)
- **Scene persistence** via URL hash
- **Reload functionality** to restart current scene
- **Visual feedback** (blue highlight, strikethrough, floating word)

### CSS Styling
- Character: 64x64px pixelated rendering
- Text: 48px bold, fades in/out
- Carried word: 24px, blue, follows character
- Hover effect: Blue color with shadow
- Strikethrough: 3px line-through
- Reload button: Bottom-right corner, fades in after first scene

## Future Development Ideas

From scenes.js comments:
- Climb mine to overlook
- Spot a dragon
- Zipline mechanic
- Alternative paths

## Debugging

- Console logs validation results on load
- Pattern matching tests run automatically
- Optional text patterns log detailed regex info
- Debug info element available (currently hidden)

## Performance Considerations

- Uses `requestAnimationFrame` for smooth 60fps game loop
- Efficient collision detection every frame
- Text transitions use CSS for hardware acceleration
- Minimal DOM manipulation (word elements reused)

## Browser Compatibility

Requires modern browser with support for:
- ES6+ JavaScript (arrow functions, template literals, spread operator)
- CSS transitions
- `requestAnimationFrame`
- `getBoundingClientRect`
- Image rendering modes (pixelated, crisp-edges)
