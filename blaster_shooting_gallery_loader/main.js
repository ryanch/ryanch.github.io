import './style.css'

// Initialize the ESP32 Web Flasher
document.addEventListener('DOMContentLoaded', function() {
  console.log('ESP32 Web Flasher initialized');
  
  const statusElement = document.getElementById('status');
  const installButton = document.querySelector('esp-web-install-button');
  
  if (installButton) {
    // Listen for installation events
    installButton.addEventListener('state-changed', (ev) => {
      const state = ev.detail.state;
      updateStatus(state);
    });
    
    installButton.addEventListener('error', (ev) => {
      updateStatus(`Error: ${ev.detail.message}`);
    });
  }
  
  // Check if browser supports Web Serial
  if (!navigator.serial) {
    updateStatus('Web Serial not supported. Please use Chrome, Edge, or Opera.');
  }
});

function updateStatus(message) {
  const statusElement = document.getElementById('status');
  if (statusElement) {
    statusElement.textContent = message;
    console.log('Status:', message);
  }
}

// Add some interactive features
function addInteractivity() {
  // Add click animation to the flash button
  const flashButton = document.querySelector('.flash-button');
  if (flashButton) {
    flashButton.addEventListener('click', function() {
      updateStatus('Connecting to device...');
    });
  }
  
  // Add browser compatibility check
  checkBrowserCompatibility();
}

function checkBrowserCompatibility() {
  const userAgent = navigator.userAgent;
  const isChrome = /Chrome/.test(userAgent) && /Google Inc/.test(navigator.vendor);
  const isEdge = /Edg/.test(userAgent);
  const isOpera = /OPR/.test(userAgent);
  
  if (!isChrome && !isEdge && !isOpera) {
    updateStatus('Warning: This browser may not support Web Serial. Please use Chrome, Edge, or Opera for best results.');
  }
}

// Initialize interactivity
addInteractivity();
