# ESP32 Web Flasher

A web-based tool for flashing ESP32 devices with custom firmware directly from your browser using the ESP Web Tools framework.

## Features

- 🌐 **Browser-based flashing** - No need to install additional software
- 🔧 **Multiple chip support** - Works with ESP32, ESP32-S2, and ESP32-C3
- 📱 **Responsive design** - Works on desktop and mobile devices
- ⚡ **Fast and reliable** - Powered by ESP Web Tools framework
- 🔒 **Secure** - Uses Web Serial API for direct device communication

## Browser Compatibility

This tool requires a browser that supports the Web Serial API:
- ✅ Chrome 89+
- ✅ Edge 89+
- ✅ Opera 75+
- ❌ Firefox (not supported)
- ❌ Safari (not supported)

## Quick Start

### Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser** and navigate to `http://localhost:3000`

### Production Build

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Preview the build:**
   ```bash
   npm run preview
   ```

3. **Deploy** the `dist/` folder to your web server

## Adding Your Firmware

1. **Place your firmware files** in the `firmware/` directory:
   ```
   firmware/
   ├── bootloader.bin      # ESP32 bootloader
   ├── partitions.bin      # ESP32 partition table
   ├── firmware.bin        # ESP32 main firmware
   ├── bootloader_s2.bin   # ESP32-S2 bootloader
   ├── partitions_s2.bin   # ESP32-S2 partition table
   ├── firmware_s2.bin     # ESP32-S2 main firmware
   ├── bootloader_c3.bin   # ESP32-C3 bootloader
   ├── partitions_c3.bin   # ESP32-C3 partition table
   └── firmware_c3.bin     # ESP32-C3 main firmware
   ```

2. **Update the manifest** if needed by editing `manifest.json` to match your firmware configuration

3. **Rebuild and deploy** your changes

## How to Use

1. **Connect your ESP32** to your computer via USB
2. **Open the web flasher** in a supported browser
3. **Click "Connect & Install Firmware"**
4. **Select your device** from the serial port list
5. **Wait for flashing** to complete
6. **Disconnect and restart** your ESP32

## Project Structure

```
├── index.html              # Main web interface
├── main.js                 # JavaScript functionality
├── style.css               # Styling
├── manifest.json           # ESP Web Tools configuration
├── firmware/               # Firmware binary files
├── vite.config.js          # Vite configuration
├── package.json            # Node.js dependencies
└── README.md               # This file
```

## Configuration

### Manifest File

The `manifest.json` file defines your firmware configuration:

```json
{
  "name": "ESP32 Custom Firmware",
  "version": "1.0.0",
  "builds": [
    {
      "chipFamily": "ESP32",
      "parts": [
        {
          "path": "firmware/bootloader.bin",
          "offset": 4096
        }
      ]
    }
  ]
}
```

### Memory Offsets

Common memory offsets for ESP32:
- **Bootloader**: 0x1000 (4096)
- **Partition Table**: 0x8000 (32768)
- **Application**: 0x10000 (65536)

## Troubleshooting

### Device Not Detected
- Ensure your ESP32 is connected via USB
- Check that you're using a data cable (not power-only)
- Try a different USB port
- Put your ESP32 in bootloader mode (hold BOOT button while pressing RESET)

### Browser Not Supported
- Use Chrome, Edge, or Opera
- Ensure Web Serial is enabled in browser settings
- Update your browser to the latest version

### Flashing Fails
- Check that firmware files exist in the `firmware/` directory
- Verify file paths in `manifest.json`
- Ensure firmware files are valid and not corrupted
- Try putting the ESP32 in bootloader mode manually

## Development

### Adding New Features

1. **Modify the UI** in `index.html`
2. **Add functionality** in `main.js`
3. **Update styling** in `style.css`
4. **Test thoroughly** with different ESP32 variants

### Customization

- **Branding**: Update the title, colors, and logo in `index.html` and `style.css`
- **Firmware**: Replace files in `firmware/` directory and update `manifest.json`
- **Styling**: Modify the CSS variables in `style.css` for custom theming

## Resources

- [ESP Web Tools Documentation](https://esphome.github.io/esp-web-tools/)
- [Web Serial API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Web_Serial_API)
- [ESP32 Documentation](https://docs.espressif.com/projects/esp-idf/en/latest/esp32/)
- [Vite Documentation](https://vitejs.dev/)

## License

This project is open source. Add your license information here.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request
