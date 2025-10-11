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
- Automatic validation ensures total duration ≤ 10 seconds
- Real-time duration tracking with visual feedback

### Output

- Formatted prompt with clear section headings
- Context categories displayed with individual headings (e.g., "Grade / Palette:", "Lighting & Atmosphere:")
- Adapts format based on input type (context, high-level, shots, or any combination)
- Professional cinematography terminology preserved in output
- Copy to clipboard functionality
- Back button to edit before finalizing

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
- Responsive design for desktop and mobile
- Dark theme UI with smooth animations
- State management using vanilla JavaScript
- Screen-based navigation with fade transitions

## Usage

Simply open `index.html` in a web browser. No build process or server required.

## Design Decisions

- **Single File Components**: Kept HTML, CSS, and JS in separate files for clarity and maintainability
- **Dark Theme**: Provides better focus for creative writing tasks
- **Context-First Approach**: Guides users to set visual context before writing content
- **Professional Presets**: Detailed presets based on real cinematography terminology from OpenAI's Sora Prompting Guide
- **Editable Presets**: Preset buttons load text into editable areas, allowing customization of professional starting points
- **Flexible Input**: Users can provide high-level description, detailed shots, or both in a single screen
- **No Mode Selection**: Eliminated the need to choose between modes upfront; users naturally fill in what they need
- **Time Constraints**: 10-second limit reflects Sora's current capabilities
- **Validation**: Real-time feedback prevents common mistakes
- **Adaptive Output**: Prompt format automatically adjusts based on what input was provided
- **Labeled Sections**: Each context category appears with its own heading in the final output for clarity
- **State Persistence**: All user input (context, descriptions, shots) is preserved when navigating between screens

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

## Future Enhancements

Potential improvements could include:
- Save/load prompt templates
- Prompt history
- Export to different formats
- Additional context presets for more styles
- Community-contributed preset library
- Example gallery with sample outputs
- Drag-and-drop shot reordering
- Dialogue text input for specific mode
