// Context preset definitions with detailed examples
const contextPresets = {
    grade: {
        none: '',
        '1970s_film': 'Highlights: warm amber lift with slight grain\nMids: balanced earth tones with subtle magenta shift\nBlacks: crushed with film grain texture\nPalette: burnt orange, avocado green, harvest gold',
        'imax_scale': 'Ultra-high resolution digital capture\nHighlights: clean whites with controlled roll-off\nMids: neutral balanced with rich color saturation\nBlacks: deep pure blacks with detail retention\nPalette: vivid primary colors, crisp whites, deep shadows',
        'documentary': 'Natural color grading with minimal manipulation\nHighlights: true-to-life luminance\nMids: neutral balanced realism\nBlacks: soft natural depth\nPalette: authentic environmental colors',
        'vintage_8mm': 'Heavy grain structure throughout\nHighlights: blown highlights with halation\nMids: desaturated with magenta-yellow cast\nBlacks: milky lifted blacks with vignette\nPalette: faded pastels, muted primaries',
        'modern_digital': 'Clean digital acquisition, minimal grain\nHighlights: controlled with HDR retention\nMids: balanced neutrals with accurate skin tones\nBlacks: neutral deep blacks\nPalette: accurate color reproduction, slight teal-orange separation',
        'noir': 'Black and white high contrast\nHighlights: bright whites with sharp edges\nMids: dramatic gradation and deep shadows\nBlacks: pure black with crushed detail\nContrast: hard light ratios 8:1 or higher'
    },
    lighting: {
        none: '',
        'golden_hour': 'Natural sunlight from low angle (06:30 or 18:00)\nKey: warm amber direct sun from side\nFill: soft blue sky bounce from opposite\nAtmos: gentle haze with visible light beams\nColor temp: 3200K key, 5600K fill',
        'harsh_fluorescent': 'Overhead practical fluorescent tubes\nKey: cool green-tinted overhead (4100K)\nFill: minimal, hard shadows on floor\nNegative fill: dark walls absorbing light\nAtmos: sterile institutional feel',
        'moody_twilight': 'Blue hour ambient (20 minutes post-sunset)\nKey: sodium street lights (2000K amber)\nFill: deep blue skylight (8000K)\nPractical: warm window light in background\nAtmos: light mist, soft diffusion throughout',
        'warm_candlelight': 'Practical candles as motivated key (1800K)\nKey: flickering warm glow from candles\nFill: soft bounce from warm-toned walls\nNegative fill: deep shadows in corners\nAtmos: intimate, contained light pool',
        'overcast_diffused': 'Soft natural light through heavy cloud cover\nKey: omnidirectional diffused daylight (6500K)\nFill: even ambient, minimal shadows\nAtmos: flat even exposure, gentle soft light\nContrast: low 2:1 ratio',
        'neon_artificial': 'Practical neon signs as key sources\nKey: vibrant colored neon (pink, blue, green)\nFill: spill from multiple colored sources\nPractical: glowing signage, LED displays\nAtmos: urban nighttime, layered colored light'
    },
    location: {
        none: '',
        'wide_establishing': 'Camera: wide angle lens (24mm or wider)\nDistance: 20+ feet from subject\nHeight: eye level or elevated\nDepth: deep focus showing foreground to infinity\nComposition: subject in environment context\nMovement: static or slow dolly',
        'intimate_closeup': 'Camera: portrait lens (85mm or longer)\nDistance: 2-4 feet from subject\nHeight: eye level to subject\nDepth: shallow focus (f/1.4-f/2.8)\nComposition: face fills frame, environmental detail minimal\nMovement: static or subtle handheld breathing',
        'medium_eye_level': 'Camera: standard lens (35-50mm)\nDistance: 6-10 feet from subject\nHeight: 5-6 feet (natural eye level)\nDepth: moderate focus (f/4-f/5.6)\nComposition: waist-up or full body framing\nMovement: tracking or static',
        'low_angle_up': 'Camera: tilted upward 30-60 degrees\nDistance: 4-8 feet from subject\nHeight: 2-3 feet off ground\nDepth: wide or moderate focus\nComposition: subject towers above camera\nEffect: powerful, imposing perspective',
        'high_angle_down': 'Camera: tilted downward 45-90 degrees\nDistance: 8-20 feet from subject\nHeight: 8+ feet elevated\nDepth: moderate to deep focus\nComposition: subject diminished, environment visible\nEffect: vulnerable, observational perspective',
        'shallow_dof': 'Camera: portrait lens wide open (85mm f/1.4)\nFocus: critical focus on subject eyes\nDepth: bokeh background blur\nSeparation: subject isolated from environment\nEffect: cinematic subject isolation',
        'deep_focus': 'Camera: wide lens stopped down (24mm f/11)\nFocus: everything sharp from 3 feet to infinity\nDepth: extensive depth of field\nComposition: layered foreground, mid, background\nEffect: environmental storytelling'
    },
    wardrobe: {
        none: '',
        'period_accurate': 'Era-specific costumes with authentic materials\nWardrobe: historically accurate cuts and fabrics\nAccessories: period-appropriate watches, jewelry, eyewear\nExtras: all background talent in period dress\nDetails: authentic buttons, zippers, stitching visible',
        'minimalist_modern': 'Contemporary neutral tones\nWardrobe: clean lines, simple cuts, muted colors\nFabrics: quality cotton, wool, minimal patterns\nAccessories: understated modern pieces\nColor palette: blacks, grays, whites, navy, olive',
        'vibrant_colorful': 'Bold saturated color choices\nWardrobe: primary and secondary colors, patterns\nFabrics: varied textures creating visual interest\nAccessories: statement pieces, jewelry\nContrast: intentional color blocking and clashes',
        'practical_props': 'Functional set dressing and handheld items\nProps: coffee cups, phones, bags, newspapers\nSet dressing: books, plants, clutter\nExtras: natural interaction with environment\nDetails: worn realistic items with history',
        'futuristic_elements': 'Sci-fi design language\nWardrobe: sleek synthetic fabrics, unusual cuts\nProps: glowing panels, holographic displays, tech devices\nMaterials: chrome, acrylic, LED integration\nDetails: clean lines, minimal texture, high-tech feel',
        'natural_environment': 'Outdoor organic elements\nEnvironment: trees, grass, water, rocks, sky\nDetails: wind movement, natural light interaction\nTextures: bark, stone, foliage, soil\nWeather: visible atmospheric conditions'
    },
    sound: {
        none: '',
        'ambient_environmental': 'Diegetic environmental sound only\nBackground: wind, traffic, nature sounds at -25 LUFS\nMid: footsteps, rustling, object interaction\nForeground: clear subject sounds\nNo music: pure environmental authenticity',
        'dialogue_driven': 'Character conversation as primary audio\nDialogue: clear centered at -12 LUFS\nAmbient: reduced to -30 LUFS for clarity\nFootsteps: subtle at -20 LUFS\nEffect: intimate conversational focus',
        'minimal_sound': 'Sparse deliberate audio elements\nAmbient: barely perceptible room tone\nFoley: selective key sounds only\nSilence: intentional quiet moments\nEffect: contemplative, focused attention',
        'dramatic_music': 'Non-diegetic score driving emotion\nMusic: orchestral or electronic score at -18 LUFS\nAmbient: reduced to support music\nDynamics: swells and crescendos for emphasis\nEffect: heightened emotional narrative',
        'diegetic_source': 'Music from visible source in scene\nSource: radio, musician, speaker visible or implied\nQuality: appropriate fidelity for source\nAmbient: natural room sound mixing with music\nEffect: naturalistic motivated audio',
        'silence_acoustics': 'Natural room tone and reverb\nAmbient: minimal background at -40 LUFS\nReverb: natural acoustic space reflection\nFootsteps: clear with natural echo\nEffect: realistic spatial audio, no music'
    }
};
