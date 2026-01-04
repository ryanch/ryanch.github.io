// State management
let registry = null;
let currentProject = null;

// DOM element references
let projectSelect;
let installButton;
let flashButton;
let statusElement;
let projectInfo;
let projectName;
let chipFamily;
let projectDescription;

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', async () => {
  console.log('ESP32 Multi-Project Flasher initializing...');

  // Get DOM references
  projectSelect = document.getElementById('projectSelect');
  installButton = document.querySelector('esp-web-install-button');
  flashButton = document.querySelector('.flash-button');
  statusElement = document.getElementById('status');
  projectInfo = document.getElementById('projectInfo');
  projectName = document.getElementById('projectName');
  chipFamily = document.getElementById('chipFamily');
  projectDescription = document.getElementById('projectDescription');

  // Check browser compatibility
  if (!navigator.serial) {
    updateStatus('error', 'Web Serial not supported. Use Chrome, Edge, or Opera.');
    return;
  }

  // Load registry and initialize
  await loadRegistry();

  // Set up event listeners
  setupEventListeners();

  // Handle URL hash routing (e.g., #project-slug)
  handleUrlHash();
});

// Load project registry
async function loadRegistry() {
  try {
    const response = await fetch('registry.json');
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    registry = await response.json();

    if (!registry.projects || registry.projects.length === 0) {
      updateStatus('warning', 'No projects available. Use scripts/add_project.py to add projects.');
      projectSelect.innerHTML = '<option value="">No projects available</option>';
      projectSelect.disabled = false;
      return;
    }

    populateProjectDropdown();
    updateStatus('ready', 'Select a project to begin');

  } catch (error) {
    console.error('Failed to load registry:', error);
    updateStatus('error', `Failed to load projects: ${error.message}`);
    projectSelect.innerHTML = '<option value="">Error loading projects</option>';
  }
}

// Populate dropdown with projects
function populateProjectDropdown() {
  projectSelect.innerHTML = '<option value="">— Select a project —</option>';

  registry.projects.forEach(project => {
    const option = document.createElement('option');
    option.value = project.slug;
    option.textContent = project.name;
    option.dataset.chipFamily = project.chipFamily;
    option.dataset.manifestPath = project.manifestPath;
    option.dataset.description = project.description || '';
    projectSelect.appendChild(option);
  });

  projectSelect.disabled = false;
}

// Set up event listeners
function setupEventListeners() {
  // Project selection
  projectSelect.addEventListener('change', handleProjectSelection);

  // ESP Web Tools events
  if (installButton) {
    installButton.addEventListener('state-changed', (ev) => {
      handleStateChange(ev.detail.state);
    });

    installButton.addEventListener('error', (ev) => {
      updateStatus('error', `Error: ${ev.detail.message}`);
    });
  }

  // Flash button click
  if (flashButton) {
    flashButton.addEventListener('click', () => {
      if (currentProject) {
        updateStatus('active', 'Connecting to device...');
      }
    });
  }
}

// Handle project selection
function handleProjectSelection(event) {
  const selectedOption = event.target.selectedOptions[0];
  const slug = selectedOption.value;

  if (!slug) {
    // No project selected - reset UI
    currentProject = null;
    projectInfo.classList.add('hidden');
    flashButton.disabled = true;
    flashButton.querySelector('.button-text').textContent = 'Select a Project First';
    installButton.removeAttribute('manifest');
    updateStatus('ready', 'Select a project to begin');

    // Clear URL hash
    if (window.location.hash) {
      history.replaceState(null, '', window.location.pathname);
    }
    return;
  }

  // Find project in registry
  const project = registry.projects.find(p => p.slug === slug);
  if (!project) {
    console.error('Project not found:', slug);
    return;
  }

  // Update current project
  currentProject = project;

  // Update manifest attribute
  installButton.setAttribute('manifest', project.manifestPath);

  // Update project info display
  projectName.textContent = project.name;
  chipFamily.textContent = project.chipFamily;

  if (project.description) {
    projectDescription.textContent = project.description;
    projectDescription.classList.remove('hidden');
  } else {
    projectDescription.classList.add('hidden');
  }

  projectInfo.classList.remove('hidden');

  // Enable flash button
  flashButton.disabled = false;
  flashButton.querySelector('.button-text').textContent = 'Connect & Flash Firmware';

  // Update status
  updateStatus('ready', `Ready to flash: ${project.name}`);

  // Update URL hash for deep linking
  history.replaceState(null, '', `#${slug}`);

  console.log('Selected project:', project);
}

// Handle ESP Web Tools state changes
function handleStateChange(state) {
  const stateMessages = {
    'INITIALIZING': { type: 'active', msg: 'Initializing...' },
    'PREPARING': { type: 'active', msg: 'Preparing to flash...' },
    'ERASING': { type: 'active', msg: 'Erasing flash memory...' },
    'WRITING': { type: 'active', msg: 'Writing firmware...' },
    'FINISHED': { type: 'success', msg: 'Flashing complete! Device ready.' },
    'ERROR': { type: 'error', msg: 'Flashing failed. Check console for details.' }
  };

  const stateInfo = stateMessages[state] || { type: 'info', msg: state };
  updateStatus(stateInfo.type, stateInfo.msg);

  console.log('Flash state:', state);
}

// Update status display
function updateStatus(type, message) {
  const statusText = statusElement.querySelector('.status-text');
  const statusIndicator = statusElement.querySelector('.status-indicator');

  statusText.textContent = message;

  // Remove all status classes
  statusElement.classList.remove('status-ready', 'status-active', 'status-success', 'status-error', 'status-warning');

  // Add appropriate class
  statusElement.classList.add(`status-${type}`);

  // Update indicator color via class
  statusIndicator.className = `status-indicator indicator-${type}`;

  console.log(`[${type.toUpperCase()}]`, message);
}

// Handle URL hash routing for direct links
function handleUrlHash() {
  const hash = window.location.hash.slice(1); // Remove #
  if (hash && registry) {
    const project = registry.projects.find(p => p.slug === hash);
    if (project) {
      projectSelect.value = hash;
      handleProjectSelection({ target: projectSelect });
    }
  }
}

// Listen for hash changes (back/forward navigation)
window.addEventListener('hashchange', handleUrlHash);
