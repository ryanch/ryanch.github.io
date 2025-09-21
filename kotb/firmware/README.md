# Firmware Files

This directory should contain your ESP32 firmware binary files. 

## Required Files Structure

### For ESP32:
- `bootloader.bin` - Bootloader binary
- `partitions.bin` - Partition table binary  
- `firmware.bin` - Your main firmware binary

### For ESP32-S2:
- `bootloader_s2.bin` - Bootloader binary for S2
- `partitions_s2.bin` - Partition table binary for S2
- `firmware_s2.bin` - Your main firmware binary for S2

### For ESP32-C3:
- `bootloader_c3.bin` - Bootloader binary for C3
- `partitions_c3.bin` - Partition table binary for C3
- `firmware_c3.bin` - Your main firmware binary for C3

## How to Generate Firmware Files

1. **From Arduino IDE:**
   - Build your project
   - Files will be in the build output directory
   - Copy the relevant .bin files here

2. **From ESP-IDF:**
   - Run `idf.py build`
   - Files will be in the `build/` directory
   - Copy bootloader.bin, partition-table.bin, and your_project.bin

3. **From PlatformIO:**
   - Build your project
   - Files will be in `.pio/build/[environment]/`
   - Copy the relevant .bin files

## File Sizes
Make sure your firmware files are reasonable sizes:
- Bootloader: typically 20-30KB
- Partition table: typically 3KB
- Main firmware: varies based on your application

Replace this README with your actual firmware files when ready to deploy.
