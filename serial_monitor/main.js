// ESP32 Serial Monitor — Web Serial API
(function () {
  'use strict';

  // ─── State ───
  let port = null;
  let reader = null;
  let readableStreamClosed = null;
  let outputLines = []; // { text, timestamp, bytes }
  let totalBytes = 0;
  let isConnected = false;
  let elapsedSeconds = 0;
  let elapsedTimer = null;
  let showTimestamps = false;
  let autoScroll = true;

  const MAX_DOM_LINES = 5000;

  // ─── DOM Refs ───
  const connectBtn = document.getElementById('connectBtn');
  const disconnectBtn = document.getElementById('disconnectBtn');
  const clearBtn = document.getElementById('clearBtn');
  const saveBtn = document.getElementById('saveBtn');
  const baudRateSelect = document.getElementById('baudRate');
  const timestampToggle = document.getElementById('timestampToggle');
  const autoscrollToggle = document.getElementById('autoscrollToggle');
  const statusLed = document.getElementById('statusLed');
  const statusText = document.getElementById('statusText');
  const welcomeMessage = document.getElementById('welcomeMessage');
  const serialOutput = document.getElementById('serialOutput');
  const lineCountEl = document.getElementById('lineCount');
  const byteCountEl = document.getElementById('byteCount');
  const elapsedTimeEl = document.getElementById('elapsedTime');
  const portNameEl = document.getElementById('portName');
  const browserWarning = document.getElementById('browserWarning');

  // ─── Browser Support Check ───
  function checkBrowserSupport() {
    if (!('serial' in navigator)) {
      browserWarning.classList.remove('hidden');
      connectBtn.disabled = true;
      return false;
    }
    return true;
  }

  // ─── UI Helpers ───
  function setStatus(text, state) {
    statusText.textContent = text;
    statusLed.className = 'led ' + (state || 'off');
  }

  function updateCounters() {
    lineCountEl.textContent = outputLines.length.toLocaleString();
    byteCountEl.textContent = formatBytes(totalBytes);
  }

  function formatBytes(bytes) {
    if (bytes < 1024) return bytes + '';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + 'K';
    return (bytes / (1024 * 1024)).toFixed(2) + 'M';
  }

  function formatElapsed(seconds) {
    const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return h + ':' + m + ':' + s;
  }

  function formatTimestamp(date) {
    const hh = String(date.getHours()).padStart(2, '0');
    const mm = String(date.getMinutes()).padStart(2, '0');
    const ss = String(date.getSeconds()).padStart(2, '0');
    const ms = String(date.getMilliseconds()).padStart(3, '0');
    return '[' + hh + ':' + mm + ':' + ss + '.' + ms + ']';
  }

  function startElapsedTimer() {
    elapsedSeconds = 0;
    elapsedTimeEl.textContent = formatElapsed(0);
    elapsedTimer = setInterval(function () {
      elapsedSeconds++;
      elapsedTimeEl.textContent = formatElapsed(elapsedSeconds);
    }, 1000);
  }

  function stopElapsedTimer() {
    if (elapsedTimer) {
      clearInterval(elapsedTimer);
      elapsedTimer = null;
    }
  }

  // ─── Connection ───
  async function connect() {
    if (isConnected) return;

    try {
      setStatus('Requesting port...', 'off');
      port = await navigator.serial.requestPort();

      const baudRate = parseInt(baudRateSelect.value, 10);
      await port.open({ baudRate: baudRate });

      isConnected = true;
      setStatus('Connected @ ' + baudRate + ' baud', 'connected');
      connectBtn.disabled = true;
      disconnectBtn.disabled = false;
      baudRateSelect.disabled = true;

      // Show serial output, hide welcome
      welcomeMessage.classList.add('hidden');
      serialOutput.classList.remove('hidden');

      // Port info
      const info = port.getInfo();
      if (info.usbVendorId) {
        portNameEl.textContent = 'USB ' + info.usbVendorId.toString(16).toUpperCase() + ':' + info.usbProductId.toString(16).toUpperCase();
      } else {
        portNameEl.textContent = 'Serial';
      }

      startElapsedTimer();

      // Set up text decoder stream
      const textDecoder = new TextDecoderStream();
      readableStreamClosed = port.readable.pipeTo(textDecoder.writable);
      reader = textDecoder.readable.getReader();

      // Start read loop
      readLoop();

    } catch (err) {
      if (err.name === 'NotFoundError') {
        setStatus('No port selected', 'off');
      } else {
        setStatus('Error: ' + err.message, 'error');
        console.error('Connection error:', err);
      }
      resetConnection();
    }
  }

  async function disconnect() {
    if (!isConnected && !port) return;

    try {
      if (reader) {
        await reader.cancel();
        reader = null;
      }
      if (readableStreamClosed) {
        await readableStreamClosed.catch(function () {});
        readableStreamClosed = null;
      }
      if (port) {
        await port.close();
        port = null;
      }
    } catch (err) {
      console.error('Disconnect error:', err);
    }

    resetConnection();
    setStatus('Disconnected', 'off');
  }

  function resetConnection() {
    isConnected = false;
    reader = null;
    readableStreamClosed = null;
    port = null;
    connectBtn.disabled = false;
    disconnectBtn.disabled = true;
    baudRateSelect.disabled = false;
    stopElapsedTimer();
    portNameEl.textContent = '---';
  }

  // ─── Read Loop ───
  async function readLoop() {
    let buffer = '';

    try {
      while (true) {
        var result = await reader.read();
        if (result.done) {
          break;
        }

        var chunk = result.value;
        totalBytes += chunk.length;
        buffer += chunk;

        // Process complete lines
        var newlineIndex;
        while ((newlineIndex = buffer.indexOf('\n')) !== -1) {
          var line = buffer.substring(0, newlineIndex);
          buffer = buffer.substring(newlineIndex + 1);

          // Strip \r
          if (line.length > 0 && line.charCodeAt(line.length - 1) === 13) {
            line = line.substring(0, line.length - 1);
          }

          appendLine(line);
        }
      }
    } catch (err) {
      if (isConnected) {
        console.error('Read error:', err);
      }
    }

    // If we get here, the stream ended (possibly device unplug)
    if (isConnected) {
      setStatus('Device disconnected', 'error');
      resetConnection();
    }
  }

  // ─── Output ───
  function appendLine(text) {
    var now = new Date();
    var byteLen = new TextEncoder().encode(text).length;

    outputLines.push({
      text: text,
      timestamp: now,
      bytes: byteLen
    });

    updateCounters();

    // Create DOM element
    var el = document.createElement('div');
    el.className = 'serial-line';

    if (showTimestamps) {
      var tsSpan = document.createElement('span');
      tsSpan.className = 'timestamp';
      tsSpan.textContent = formatTimestamp(now);
      el.appendChild(tsSpan);
      el.appendChild(document.createTextNode(text));
    } else {
      el.textContent = text;
    }

    serialOutput.appendChild(el);

    // Cap rendered DOM lines
    while (serialOutput.children.length > MAX_DOM_LINES) {
      serialOutput.removeChild(serialOutput.firstChild);
    }

    // Auto-scroll
    if (autoScroll) {
      serialOutput.scrollTop = serialOutput.scrollHeight;
    }
  }

  // Re-render all visible lines (e.g. when toggling timestamps)
  function rerenderOutput() {
    serialOutput.innerHTML = '';

    // Only render up to the last MAX_DOM_LINES
    var startIdx = Math.max(0, outputLines.length - MAX_DOM_LINES);
    for (var i = startIdx; i < outputLines.length; i++) {
      var entry = outputLines[i];
      var el = document.createElement('div');
      el.className = 'serial-line';

      if (showTimestamps) {
        var tsSpan = document.createElement('span');
        tsSpan.className = 'timestamp';
        tsSpan.textContent = formatTimestamp(entry.timestamp);
        el.appendChild(tsSpan);
        el.appendChild(document.createTextNode(entry.text));
      } else {
        el.textContent = entry.text;
      }

      serialOutput.appendChild(el);
    }

    if (autoScroll) {
      serialOutput.scrollTop = serialOutput.scrollHeight;
    }
  }

  // ─── Actions ───
  function clearOutput() {
    outputLines = [];
    totalBytes = 0;
    serialOutput.innerHTML = '';
    updateCounters();
  }

  function saveLog() {
    if (outputLines.length === 0) return;

    var lines = outputLines.map(function (entry) {
      return formatTimestamp(entry.timestamp) + ' ' + entry.text;
    });
    var content = lines.join('\n') + '\n';
    var blob = new Blob([content], { type: 'text/plain' });

    var now = new Date();
    var dateStr = now.getFullYear() +
      String(now.getMonth() + 1).padStart(2, '0') +
      String(now.getDate()).padStart(2, '0') + '_' +
      String(now.getHours()).padStart(2, '0') +
      String(now.getMinutes()).padStart(2, '0') +
      String(now.getSeconds()).padStart(2, '0');

    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'serial_log_' + dateStr + '.log';
    a.click();
    URL.revokeObjectURL(a.href);
  }

  // ─── Event Handlers ───
  connectBtn.addEventListener('click', connect);
  disconnectBtn.addEventListener('click', disconnect);
  clearBtn.addEventListener('click', clearOutput);
  saveBtn.addEventListener('click', saveLog);

  timestampToggle.addEventListener('click', function () {
    showTimestamps = !showTimestamps;
    timestampToggle.textContent = showTimestamps ? 'ON' : 'OFF';
    timestampToggle.classList.toggle('active', showTimestamps);
    timestampToggle.setAttribute('aria-pressed', showTimestamps);
    rerenderOutput();
  });

  autoscrollToggle.addEventListener('click', function () {
    autoScroll = !autoScroll;
    autoscrollToggle.textContent = autoScroll ? 'ON' : 'OFF';
    autoscrollToggle.classList.toggle('active', autoScroll);
    autoscrollToggle.setAttribute('aria-pressed', autoScroll);
    if (autoScroll) {
      serialOutput.scrollTop = serialOutput.scrollHeight;
    }
  });

  // Device unplug detection
  if ('serial' in navigator) {
    navigator.serial.addEventListener('disconnect', function (e) {
      if (port && e.target === port) {
        setStatus('Device unplugged', 'error');
        resetConnection();
      }
    });
  }

  // ─── Init ───
  checkBrowserSupport();
})();
