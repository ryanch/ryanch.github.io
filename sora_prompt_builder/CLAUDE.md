# Sora Prompt Builder

A static HTML single page application for building effective prompts for Sora AI video generation, based on OpenAI's official prompting guidelines.

## Overview

This application helps users create structured, effective prompts for Sora by guiding them through a step-by-step process that incorporates best practices from the [OpenAI Sora Prompting Guide](https://cookbook.openai.com/examples/sora/sora2_prompting_guide).

## Features

### Flexible Prompt Building

Users can create prompts using three approaches:

1. **High-Level Description Only**
   - Prose-style paragraph format
   - Best for creative freedom and exploring ideas
   - Allows the model to interpret your vision

2. **Detailed Shots Only**
   - Structured format with multiple timed shots
   - Precise timing control (0-10 seconds total)
   - Detailed cinematography and action direction
   - Best for precise vision with specific actions

3. **Combined Approach** (High-Level + Detailed Shots)
   - Provides both a general description and specific shot breakdowns
   - Offers maximum control and clarity
   - Best for complex scenes requiring both context and precision

### Context Categories with Editable Presets

Users define visual context through five key categories with professional, detailed presets:

- **Grade / Palette**: Color grading details including highlights, mids, blacks, and palette specifications
- **Lighting & Atmosphere**: Key/fill/practical light sources with color temperatures, LUFS levels, and atmospheric effects
- **Location & Framing**: Camera specifications including lens choice, distance, height, depth of field, composition, and movement
- **Wardrobe / Props / Extras**: Detailed costume, material, accessory, and set dressing descriptions
- **Sound**: Audio direction with source types, LUFS levels, spatial audio, and diegetic/non-diegetic specifications

Each category features:
- **6-7 detailed preset buttons** based on professional cinematography terminology from the OpenAI Sora Prompting Guide
- **Multi-line text areas** where presets can be loaded and then edited
- **Full customization** - users can start with a preset or write their own descriptions from scratch
- **Clear button** to reset each category

### Shot Management

- Create multiple shots with individual timecodes
- Starts with 3 default shots (3s, 4s, 3s)
- Easy duration adjustment with +/- buttons (1 second increments)
- Add/remove shots dynamically
- Up/down buttons for reordering shots
- Automatic validation ensures total duration ≤ 10 seconds
- Real-time duration tracking with visual feedback
- Collapsible section (starts hidden) to reduce interface clutter

### Dialogue Management

- Add dialogue, narration, scene directions, and sound effects
- **Actor management system**:
  - 3 default actors: Narrator, Scene Direction, Sound Effect
  - Add custom actors (up to 10 total)
  - Remove custom actors (default actors cannot be removed)
  - When actor is removed, their dialogue lines automatically convert to "Narrator"
- **Dialogue lines**:
  - Speaker selection via button interface
  - Multi-line text input for dialogue/direction content
  - Up/down buttons for reordering lines
  - Add/remove lines dynamically
- Collapsible section (starts hidden)
- Dialogue included in final prompt output

### Output

- Formatted prompt with clear section headings
- Context categories displayed with individual headings (e.g., "Grade / Palette:", "Lighting & Atmosphere:")
- Adapts format based on input type (context, high-level, shots, dialogue, or any combination)
- Professional cinematography terminology preserved in output
- Dialogue section with speaker names and content
- Copy to clipboard functionality
- "Edit Context" button to return to context screen

## Project Structure

```
sora_prompt_builder/
├── index.html           # Main HTML structure with all screens
├── styles.css           # Styling with dark theme and responsive design
├── app.js               # Application logic and state management
├── context-presets.js   # Detailed preset definitions for all context categories
└── CLAUDE.md            # This file
```

## Application Flow

1. **Context Selection** → Set visual context using detailed editable presets or custom text for 5 categories
2. **Prompt Builder** → Create your prompt using high-level description, detailed shots, or both
3. **Output** → View formatted prompt with labeled sections and copy/edit options

## Technical Details

- Pure HTML, CSS, and JavaScript (no frameworks)
- Client-side only, no backend required
- Fully responsive design optimized for desktop and mobile
- Mobile-first optimizations:
  - 44px minimum touch targets (Apple HIG standard)
  - Responsive typography scaling
  - Optimized spacing and padding for small screens
  - Full-width layouts on mobile
  - Proper viewport configuration
- Dark theme UI with smooth animations
- State management using vanilla JavaScript
- Screen-based navigation with fade transitions
- Collapsible sections for improved UX

## Usage

Simply open `index.html` in a web browser. No build process or server required.

## Design Decisions

- **Single File Components**: Kept HTML, CSS, and JS in separate files for clarity and maintainability
- **Dark Theme**: Provides better focus for creative writing tasks
- **Context-First Approach**: Guides users to set visual context before writing content
- **Professional Presets**: Detailed presets based on real cinematography terminology from OpenAI's Sora Prompting Guide
- **Editable Presets**: Preset buttons load text into editable areas, allowing customization of professional starting points
- **Flexible Input**: Users can provide high-level description, detailed shots, dialogue, or any combination in a single screen
- **No Mode Selection**: Eliminated the need to choose between modes upfront; users naturally fill in what they need
- **Collapsible Sections**: Shots and dialogue sections start hidden to reduce visual clutter and cognitive load
- **Actor System**: Pre-populated with common use cases (Narrator, Scene Direction, Sound Effect) while allowing custom additions
- **Button-Based Selection**: Speaker selection uses buttons instead of dropdowns for better mobile UX
- **Reordering Controls**: Up/down buttons for shots and dialogue provide intuitive control over sequence
- **Time Constraints**: 10-second limit reflects Sora's current capabilities
- **Validation**: Real-time feedback prevents common mistakes (duration limits, actor limits)
- **Adaptive Output**: Prompt format automatically adjusts based on what input was provided
- **Labeled Sections**: Each context category and dialogue line appears with clear headings in the final output
- **State Persistence**: All user input (context, descriptions, shots, actors, dialogue) is preserved when navigating between screens
- **Mobile-First**: Touch targets, spacing, and layouts optimized for mobile devices following platform guidelines

## Example Preset Content

The application includes highly detailed presets for each category. For example, the "Golden Hour" lighting preset includes:

```
Natural sunlight from low angle (06:30 or 18:00)
Key: warm amber direct sun from side
Fill: soft blue sky bounce from opposite
Atmos: gentle haze with visible light beams
Color temp: 3200K key, 5600K fill
```

These professional-grade descriptions provide users with production-ready starting points that can be further customized.

## Recent Updates

### Mobile Optimization (Latest)
- Comprehensive mobile responsive design with 44px minimum touch targets
- Responsive typography and spacing optimizations
- Full-width buttons and improved layouts for small screens
- Enhanced touch controls for shot/dialogue management

### Dialogue System
- Actor management with custom actor support (up to 10)
- Button-based speaker selection interface
- Dialogue line reordering with up/down controls
- Automatic dialogue integration in prompt output

### UI Improvements
- Collapsible sections for shots and dialogue
- Shot reordering with up/down buttons
- "Edit Context" button for clearer navigation
- Real-time validation and feedback

## Future Enhancements

Potential improvements could include:
- Save/load prompt templates
- Prompt history
- Export to different formats (JSON, plain text, markdown)
- Additional context presets for more styles
- Community-contributed preset library
- Example gallery with sample outputs
- Drag-and-drop shot reordering (in addition to buttons)
- Keyboard shortcuts for power users
- Dark/light theme toggle
- Audio preview integration (when available)
