# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a browser-based multi-project ESP32 firmware flasher. It uses ESP Web Tools to flash firmware directly to ESP32 devices via the Web Serial API, supporting multiple firmware projects through a dropdown interface and automated project management via Python script.

## Architecture

### Multi-Project System

**Registry-Based Coordination** (`registry.json`)
- Central registry file coordinating all available firmware projects
- JSON structure with project metadata (slug, name, chipFamily, manifestPath, description, dateAdded)
- Loaded dynamically by the frontend on page load
- Updated automatically by `scripts/add_project.py`

**Project Directory Structure**
```
projects/
├── project-slug-1/
│   ├── manifest.json        # ESP Web Tools manifest
│   └── firmware/
│       ├── bootloader.bin
│       ├── partitions.bin
│       └── firmware.bin
├── project-slug-2/
│   ├── manifest.json
│   └── firmware/
```

Each project is self-contained with its own manifest and firmware binaries.

### Core Components

**Web Interface** (`index.html`)
- Multi-project dropdown selector with project info display
- ESP Web Tools `esp-web-install-button` component integration (v10)
- Circuit board-themed industrial steampunk aesthetic
- Share Tech Mono + IBM Plex Mono typography

**Application Logic** (`main.js`)
- Registry loading and project dropdown population
- Dynamic manifest switching via `installButton.setAttribute('manifest', path)`
- URL hash routing for direct project links (`#project-slug`)
- ESP Web Tools event handling: `state-changed` and `error` events
- Browser compatibility checks (Web Serial API)

**Project Registry** (`registry.json`)
```json
{
  "version": "1.0.0",
  "projects": [
    {
      "slug": "project-name",
      "name": "Display Name",
      "chipFamily": "ESP32",
      "manifestPath": "projects/project-name/manifest.json",
      "description": "Optional description",
      "dateAdded": "2026-01-04"
    }
  ]
}
```

**Firmware Manifests** (per-project `manifest.json`)
- Defines firmware build configuration for ESP Web Tools
- Specifies chip family and binary parts with flash offsets
- Standard ESP32/S2/S3: bootloader@0x1000, partitions@0x8000, firmware@0x10000
- Other chips (ESP8266, C2, C3, C6, H2): firmware@0x0

**Styling** (`style.css`)
- Industrial steampunk aesthetic with circuit board patterns
- CSS variables for copper/PCB green color scheme
- Responsive design (mobile-first)
- Smooth animations for UI transitions

### Technology Stack

- Vanilla JavaScript (ES6 modules)
- ESP Web Tools library (CDN-loaded)
- Web Serial API (requires Chrome, Edge, or Opera)
- Python 3 for project management automation
- CSS Grid + modern CSS features

## Development Workflow

### Adding New Projects

Use the automated Python script to add firmware projects:

```bash
# Navigate to repository root
cd esp32_bin_loader

# Run the add project script
python scripts/add_project.py
```

The script will:
1. Ask for project name (converted to URL-safe slug)
2. Prompt for chip family selection (8 supported chips)
3. Request paths to binary files (bootloader.bin, partitions.bin, firmware.bin)
4. Optional description input
5. Create directory structure: `projects/{slug}/firmware/`
6. Copy binary files to project directory
7. Generate manifest.json with correct chip-specific offsets
8. Update registry.json with new project entry

**Supported Chip Families:**
- ESP8266, ESP32, ESP32-C2, ESP32-C3, ESP32-C6, ESP32-H2, ESP32-S2, ESP32-S3

### Testing Locally

This application requires HTTPS or localhost to access Web Serial API:

```bash
# Using Python's built-in server (localhost automatically works)
python -m http.server 8000
```

Access at `http://localhost:8000/esp32_bin_loader/`

**Testing Workflow:**
1. Verify registry loads without errors
2. Check dropdown populates with projects
3. Select a project - verify manifest path updates
4. Test with real ESP32 device if available

### Deployment

This is a static site hosted on GitHub Pages. No build process required.

To deploy: Push changes to the main branch. GitHub Pages serves files automatically.

### Browser Requirements

- **Required:** Chrome, Edge, or Opera (Web Serial API support)
- **Not supported:** Firefox, Safari (lack Web Serial API)
- Application automatically detects unsupported browsers

## Key Technical Details

### Manifest Switching

The manifest attribute must be set BEFORE the user clicks the flash button:

```javascript
// Correct approach
installButton.setAttribute('manifest', project.manifestPath);
// ESP Web Tools will load this manifest when user clicks button
```

### URL Hash Routing

Format: `#project-slug`

- Enables direct links to specific projects
- Supports browser back/forward navigation
- Uses `history.replaceState()` to avoid page reload
- `hashchange` event listener handles navigation

### Flash Offsets by Chip

Defined in `scripts/add_project.py` CHIP_OFFSETS dictionary:

```python
CHIP_OFFSETS = {
    "ESP32": {"bootloader": 4096, "partitions": 32768, "firmware": 65536},
    "ESP32-S2": {"bootloader": 4096, "partitions": 32768, "firmware": 65536},
    "ESP32-S3": {"bootloader": 4096, "partitions": 32768, "firmware": 65536},
    "ESP8266": {"firmware": 0},
    "ESP32-C2": {"firmware": 0},
    # ... etc
}
```

### ESP Web Tools States

State progression during flashing:
1. INITIALIZING
2. PREPARING
3. ERASING
4. WRITING
5. FINISHED (or ERROR)

Each state triggers a `state-changed` event that updates the UI status display.

## File Structure

```
esp32_bin_loader/
├── index.html              # Multi-project web interface
├── main.js                 # Registry loading, project selection, ESP Web Tools integration
├── style.css               # Industrial steampunk aesthetic
├── registry.json           # Project coordination (managed by Python script)
├── esp32-icon.svg          # Favicon
├── CLAUDE.md               # This file
├── projects/               # Self-contained project directories
│   └── {slug}/
│       ├── manifest.json
│       └── firmware/
│           ├── bootloader.bin
│           ├── partitions.bin
│           └── firmware.bin
└── scripts/
    └── add_project.py      # Project management automation
```

## Aesthetic Design

**Industrial Steampunk Theme:**
- Typography: Share Tech Mono (headings), IBM Plex Mono (body)
- Color palette: Copper traces, PCB green, dark circuit board
- Background: Layered gradients with circuit trace patterns
- Animations: Card slide-ins, status pulse, button hover effects
- Status display: Terminal-style with monospace font

**CSS Variables (style.css:3-30):**
- Copper: #d4722b (primary accent)
- PCB Green: #2d5e3f (secondary accent)
- Dark backgrounds: #0a0e12 to #1a2332
- Status colors: Green (ready), blue (active), red (error)

## Important Constraints

- **No build process**: Static HTML/JS/CSS application
- **Binary compatibility**: Flash offsets must match ESP32 partition table exactly
- **Browser API dependency**: Completely depends on Web Serial API availability
- **HTTPS requirement**: Must be served over HTTPS (or localhost) for Web Serial to work
- **Static hosting**: All files committed to repository (no dynamic manifest generation)

## Troubleshooting

**"No projects available" message:**
- Registry.json has empty projects array
- Use `python scripts/add_project.py` to add projects

**"Web Serial not supported" error:**
- User is on Firefox or Safari
- Instruct to use Chrome, Edge, or Opera

**Manifest not found (404):**
- Check manifestPath in registry.json matches actual file location
- Verify project directory structure is correct

**Flashing fails:**
- Check binary files are not corrupted
- Verify flash offsets match chip partition table
- Ensure device is in bootloader mode (may require manual reset)
