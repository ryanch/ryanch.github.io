// Application State
const state = {
    context: {
        grade: '',
        lighting: '',
        location: '',
        wardrobe: '',
        sound: ''
    },
    highlevelText: '',
    shots: [],
    actors: ['Narrator', 'Scene Direction', 'Sound Effect'],
    dialogueLines: []
};

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    initializeContextSelection();
    initializePromptBuilder();
    initializeOutputScreen();
});

// Context Selection
function initializeContextSelection() {
    const presetButtons = document.querySelectorAll('.context-preset');

    presetButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.closest('.context-options').dataset.category;
            const preset = button.dataset.preset;
            const textarea = button.closest('.context-group').querySelector('.context-textarea');

            // Load preset text from the presets object
            const presetText = contextPresets[category][preset];
            textarea.value = presetText;

            // Update state
            state.context[category] = presetText;
        });
    });

    // Update state when text areas change
    const textareas = document.querySelectorAll('.context-textarea');
    textareas.forEach(textarea => {
        textarea.addEventListener('input', () => {
            const category = textarea.dataset.category;
            state.context[category] = textarea.value;
        });
    });

    document.getElementById('contextNext').addEventListener('click', () => {
        // Save context from textareas
        textareas.forEach(textarea => {
            const category = textarea.dataset.category;
            state.context[category] = textarea.value;
        });

        // Only initialize shots if they don't exist yet
        if (state.shots.length === 0) {
            initializeShots();
        }
        navigateToScreen('promptBuilderScreen');
        restorePromptBuilderState();
    });
}

// Prompt Builder Screen
function initializePromptBuilder() {
    // Toggle shots section visibility
    const toggleButton = document.getElementById('toggleShots');
    const shotsSection = document.getElementById('shotsSection');
    let shotsVisible = false;

    toggleButton.addEventListener('click', () => {
        shotsVisible = !shotsVisible;
        if (shotsVisible) {
            shotsSection.style.display = 'block';
            toggleButton.textContent = 'Hide Shots';
        } else {
            shotsSection.style.display = 'none';
            toggleButton.textContent = 'Show Shots';
        }
    });

    document.getElementById('addShot').addEventListener('click', () => {
        addShot();
    });

    // Toggle dialogue section visibility
    const toggleDialogueButton = document.getElementById('toggleDialogue');
    const dialogueSection = document.getElementById('dialogueSection');
    let dialogueVisible = false;

    toggleDialogueButton.addEventListener('click', () => {
        dialogueVisible = !dialogueVisible;
        if (dialogueVisible) {
            dialogueSection.style.display = 'block';
            toggleDialogueButton.textContent = 'Hide Dialogue';
            renderActors();
            renderDialogue();
        } else {
            dialogueSection.style.display = 'none';
            toggleDialogueButton.textContent = 'Show Dialogue';
        }
    });

    // Actor management
    document.getElementById('addActor').addEventListener('click', () => {
        addActor();
    });

    document.getElementById('actorInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addActor();
        }
    });

    // Dialogue management
    document.getElementById('addDialogue').addEventListener('click', () => {
        addDialogueLine();
    });

    document.getElementById('promptBuilderBack').addEventListener('click', () => {
        // Save current state before going back
        savePromptBuilderState();
        navigateToScreen('contextScreen');
        restoreContextState();
    });

    document.getElementById('promptBuilderBuild').addEventListener('click', () => {
        state.highlevelText = document.getElementById('highlevelText').value;

        buildPrompt();
        navigateToScreen('outputScreen');
    });
}

// Save prompt builder state
function savePromptBuilderState() {
    state.highlevelText = document.getElementById('highlevelText').value;
}

// Restore prompt builder state
function restorePromptBuilderState() {
    // Restore high-level text
    document.getElementById('highlevelText').value = state.highlevelText;

    // Shots are already in state and will be rendered
    renderShots();

    // Actors and dialogue are already in state, render if section is visible
    if (document.getElementById('dialogueSection').style.display === 'block') {
        renderActors();
        renderDialogue();
    }
}

// Restore context state
function restoreContextState() {
    // Restore all context text areas
    const textareas = document.querySelectorAll('.context-textarea');
    textareas.forEach(textarea => {
        const category = textarea.dataset.category;
        textarea.value = state.context[category] || '';
    });
}

// Initialize default shots
function initializeShots() {
    state.shots = [
        { id: 1, duration: 3, description: '' },
        { id: 2, duration: 4, description: '' },
        { id: 3, duration: 3, description: '' }
    ];
    renderShots();
}

// Add a new shot
function addShot() {
    const totalDuration = state.shots.reduce((sum, shot) => sum + shot.duration, 0);
    if (totalDuration >= 10) {
        alert('Cannot add more shots. Total duration would exceed 10 seconds.');
        return;
    }

    const newId = state.shots.length > 0 ? Math.max(...state.shots.map(s => s.id)) + 1 : 1;
    const remainingTime = 10 - totalDuration;
    const duration = Math.min(1, remainingTime);

    state.shots.push({
        id: newId,
        duration: duration,
        description: ''
    });

    renderShots();
}

// Remove a shot
function removeShot(id) {
    if (state.shots.length <= 1) {
        alert('You must have at least one shot.');
        return;
    }

    state.shots = state.shots.filter(shot => shot.id !== id);
    renderShots();
}

// Move shot up
function moveShotUp(id) {
    const index = state.shots.findIndex(s => s.id === id);
    if (index > 0) {
        // Swap with previous shot
        [state.shots[index - 1], state.shots[index]] = [state.shots[index], state.shots[index - 1]];
        renderShots();
    }
}

// Move shot down
function moveShotDown(id) {
    const index = state.shots.findIndex(s => s.id === id);
    if (index < state.shots.length - 1) {
        // Swap with next shot
        [state.shots[index], state.shots[index + 1]] = [state.shots[index + 1], state.shots[index]];
        renderShots();
    }
}

// Update shot duration
function updateShotDuration(id, delta) {
    const shot = state.shots.find(s => s.id === id);
    if (!shot) return;

    const newDuration = shot.duration + delta;

    // Check bounds
    if (newDuration < 1 || newDuration > 10) return;

    // Check total duration
    const otherDuration = state.shots
        .filter(s => s.id !== id)
        .reduce((sum, s) => sum + s.duration, 0);

    if (otherDuration + newDuration > 10) return;

    shot.duration = newDuration;
    renderShots();
}

// Update shot description
function updateShotDescription(id, description) {
    const shot = state.shots.find(s => s.id === id);
    if (shot) {
        shot.description = description;
    }
}

// Render all shots
function renderShots() {
    const container = document.getElementById('shotsContainer');
    container.innerHTML = '';

    state.shots.forEach((shot, index) => {
        const shotElement = createShotElement(shot, index);
        container.appendChild(shotElement);
    });

    updateTotalDuration();
}

// Create shot element
function createShotElement(shot, index) {
    const div = document.createElement('div');
    div.className = 'shot-item';

    const totalDuration = state.shots.reduce((sum, s) => sum + s.duration, 0);
    const canIncrease = totalDuration < 10;
    const canDecrease = shot.duration > 1;
    const canMoveUp = index > 0;
    const canMoveDown = index < state.shots.length - 1;

    div.innerHTML = `
        <div class="shot-header">
            <div class="shot-title">Shot ${index + 1}</div>
            <div class="shot-controls">
                <button class="shot-move" onclick="moveShotUp(${shot.id})" ${!canMoveUp ? 'disabled' : ''} title="Move up">↑</button>
                <button class="shot-move" onclick="moveShotDown(${shot.id})" ${!canMoveDown ? 'disabled' : ''} title="Move down">↓</button>
                <button class="shot-remove" onclick="removeShot(${shot.id})" title="Remove shot">×</button>
            </div>
        </div>
        <div class="shot-content">
            <textarea
                placeholder="Describe this shot in detail (e.g., 'Camera slowly zooms in on subject's face, dramatic lighting from left side')"
                rows="3"
                oninput="updateShotDescription(${shot.id}, this.value)"
            >${shot.description}</textarea>
        </div>
        <div class="shot-timing">
            <span class="timing-label">Duration:</span>
            <div class="timing-controls">
                <button class="timing-btn" onclick="updateShotDuration(${shot.id}, -1)" ${!canDecrease ? 'disabled' : ''}>−</button>
                <span class="timing-value">${shot.duration}s</span>
                <button class="timing-btn" onclick="updateShotDuration(${shot.id}, 1)" ${!canIncrease ? 'disabled' : ''}>+</button>
            </div>
        </div>
    `;

    return div;
}

// Update total duration display
function updateTotalDuration() {
    const totalDuration = state.shots.reduce((sum, shot) => sum + shot.duration, 0);
    const durationElement = document.getElementById('totalDuration');
    const timingInfo = durationElement.closest('.timing-info');

    durationElement.textContent = totalDuration + 's';

    if (totalDuration > 10) {
        timingInfo.classList.add('error');
    } else {
        timingInfo.classList.remove('error');
    }
}

// Output Screen
function initializeOutputScreen() {
    document.getElementById('outputBack').addEventListener('click', () => {
        navigateToScreen('promptBuilderScreen');
        restorePromptBuilderState();
    });

    document.getElementById('copyPrompt').addEventListener('click', () => {
        const promptText = document.getElementById('promptOutput').textContent;
        navigator.clipboard.writeText(promptText).then(() => {
            const feedback = document.getElementById('copyFeedback');
            feedback.classList.add('show');
            setTimeout(() => {
                feedback.classList.remove('show');
            }, 2000);
        });
    });
}

// Build the final prompt
function buildPrompt() {
    let prompt = '';

    // Category labels
    const categoryLabels = {
        grade: 'Grade / Palette',
        lighting: 'Lighting & Atmosphere',
        location: 'Location & Framing',
        wardrobe: 'Wardrobe / Props / Extras',
        sound: 'Sound'
    };

    const hasHighLevel = state.highlevelText.trim().length > 0;
    const hasShots = state.shots.length > 0 && state.shots.some(shot => shot.description.trim());
    const hasDialogue = state.dialogueLines.length > 0 && state.dialogueLines.some(line => line.text.trim());

    // Add context sections with headings
    Object.entries(state.context).forEach(([key, value]) => {
        if (value && value.trim()) {
            prompt += `${categoryLabels[key]}:\n${value.trim()}\n\n`;
        }
    });

    // Add high-level description if provided
    if (hasHighLevel) {
        prompt += state.highlevelText.trim() + '\n\n';
    }

    // Add detailed shots if provided
    if (hasShots) {
        prompt += 'Actions:\n';
        let currentTime = 0;
        state.shots.forEach((shot, index) => {
            if (shot.description.trim()) {
                const startTime = currentTime;
                const endTime = currentTime + shot.duration;
                prompt += `[${startTime}s-${endTime}s] ${shot.description}\n`;
                currentTime = endTime;
            }
        });
        prompt += '\n';
    }

    // Add dialogue if provided
    if (hasDialogue) {
        prompt += 'Dialogue:\n';
        state.dialogueLines.forEach(line => {
            if (line.text.trim()) {
                prompt += `${line.actor}: ${line.text.trim()}\n`;
            }
        });
    }

    document.getElementById('promptOutput').textContent = prompt;
}

// Navigation helper
function navigateToScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

// Actor Management
function addActor() {
    const input = document.getElementById('actorInput');
    const actorName = input.value.trim();

    if (!actorName) {
        alert('Please enter an actor name.');
        return;
    }

    if (state.actors.length >= 10) {
        alert('Maximum of 10 actors allowed.');
        return;
    }

    if (state.actors.includes(actorName)) {
        alert('This actor already exists.');
        return;
    }

    state.actors.push(actorName);
    input.value = '';
    renderActors();
    renderDialogue(); // Re-render dialogue to update dropdowns
}

function removeActor(actorName) {
    const defaultActors = ['Narrator', 'Scene Direction', 'Sound Effect'];
    if (defaultActors.includes(actorName)) {
        return; // Cannot remove default actors
    }

    // Convert all dialogue lines using this actor to "Narrator"
    state.dialogueLines.forEach(line => {
        if (line.actor === actorName) {
            line.actor = 'Narrator';
        }
    });

    state.actors = state.actors.filter(actor => actor !== actorName);
    renderActors();
    renderDialogue();
}

function renderActors() {
    const container = document.getElementById('actorsList');
    const defaultActors = ['Narrator', 'Scene Direction', 'Sound Effect'];

    container.innerHTML = state.actors.map(actor => {
        const isDefault = defaultActors.includes(actor);
        const removeButton = isDefault ? '' : `<button class="actor-chip-remove" onclick="removeActor('${actor}')">×</button>`;
        const chipClass = isDefault ? 'actor-chip default' : 'actor-chip';
        return `<div class="${chipClass}">${actor}${removeButton}</div>`;
    }).join('');

    // Update add button state
    const addButton = document.getElementById('addActor');
    addButton.disabled = state.actors.length >= 10;
}

// Dialogue Management
function addDialogueLine() {
    const newId = state.dialogueLines.length > 0 ? Math.max(...state.dialogueLines.map(d => d.id)) + 1 : 1;

    state.dialogueLines.push({
        id: newId,
        actor: 'Narrator',
        text: ''
    });

    renderDialogue();
}

function removeDialogueLine(id) {
    state.dialogueLines = state.dialogueLines.filter(line => line.id !== id);
    renderDialogue();
}

function moveDialogueUp(id) {
    const index = state.dialogueLines.findIndex(d => d.id === id);
    if (index > 0) {
        [state.dialogueLines[index - 1], state.dialogueLines[index]] = [state.dialogueLines[index], state.dialogueLines[index - 1]];
        renderDialogue();
    }
}

function moveDialogueDown(id) {
    const index = state.dialogueLines.findIndex(d => d.id === id);
    if (index < state.dialogueLines.length - 1) {
        [state.dialogueLines[index], state.dialogueLines[index + 1]] = [state.dialogueLines[index + 1], state.dialogueLines[index]];
        renderDialogue();
    }
}

function updateDialogueActor(id, actor) {
    const line = state.dialogueLines.find(d => d.id === id);
    if (line) {
        line.actor = actor;
        renderDialogue(); // Re-render to update button states
    }
}

function updateDialogueText(id, text) {
    const line = state.dialogueLines.find(d => d.id === id);
    if (line) {
        line.text = text;
    }
}

function renderDialogue() {
    const container = document.getElementById('dialogueContainer');
    container.innerHTML = '';

    state.dialogueLines.forEach((line, index) => {
        const lineElement = createDialogueElement(line, index);
        container.appendChild(lineElement);
    });
}

function createDialogueElement(line, index) {
    const div = document.createElement('div');
    div.className = 'dialogue-item';

    const canMoveUp = index > 0;
    const canMoveDown = index < state.dialogueLines.length - 1;

    // Create speaker buttons
    const speakerButtons = state.actors.map(actor => {
        const selectedClass = line.actor === actor ? 'selected' : '';
        return `<button class="speaker-btn ${selectedClass}" onclick="updateDialogueActor(${line.id}, '${actor}')">${actor}</button>`;
    }).join('');

    div.innerHTML = `
        <div class="dialogue-header">
            <div class="dialogue-title">Line ${index + 1}</div>
            <div class="dialogue-controls">
                <button class="shot-move" onclick="moveDialogueUp(${line.id})" ${!canMoveUp ? 'disabled' : ''} title="Move up">↑</button>
                <button class="shot-move" onclick="moveDialogueDown(${line.id})" ${!canMoveDown ? 'disabled' : ''} title="Move down">↓</button>
                <button class="shot-remove" onclick="removeDialogueLine(${line.id})" title="Remove line">×</button>
            </div>
        </div>
        <div class="dialogue-speaker">
            <label>Speaker</label>
            <div class="speaker-buttons">
                ${speakerButtons}
            </div>
        </div>
        <div class="shot-content">
            <textarea
                placeholder="Enter dialogue, narration, screen direction, or sound effect..."
                rows="2"
                oninput="updateDialogueText(${line.id}, this.value)"
            >${line.text}</textarea>
        </div>
    `;

    return div;
}

// Make functions globally accessible for inline event handlers
window.removeShot = removeShot;
window.moveShotUp = moveShotUp;
window.moveShotDown = moveShotDown;
window.updateShotDuration = updateShotDuration;
window.updateShotDescription = updateShotDescription;
window.removeActor = removeActor;
window.removeDialogueLine = removeDialogueLine;
window.moveDialogueUp = moveDialogueUp;
window.moveDialogueDown = moveDialogueDown;
window.updateDialogueActor = updateDialogueActor;
window.updateDialogueText = updateDialogueText;
