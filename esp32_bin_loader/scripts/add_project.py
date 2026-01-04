#!/usr/bin/env python3
"""
ESP32 Multi-Project Firmware Flasher - Project Addition Tool

Automates the process of adding new ESP32 projects to the firmware flasher.
"""

import os
import json
import shutil
import re
from pathlib import Path
from datetime import datetime

# Constants
SCRIPT_DIR = Path(__file__).parent
ROOT_DIR = SCRIPT_DIR.parent
PROJECTS_DIR = ROOT_DIR / "projects"
REGISTRY_PATH = ROOT_DIR / "registry.json"

SUPPORTED_CHIPS = [
    "ESP8266",
    "ESP32",
    "ESP32-C2",
    "ESP32-C3",
    "ESP32-C6",
    "ESP32-H2",
    "ESP32-S2",
    "ESP32-S3"
]

# Flash offsets for different chips (in decimal)
CHIP_OFFSETS = {
    "ESP8266": {"firmware": 0},
    "ESP32": {"bootloader": 4096, "partitions": 32768, "firmware": 65536},
    "ESP32-C2": {"firmware": 0},
    "ESP32-C3": {"firmware": 0},
    "ESP32-C6": {"firmware": 0},
    "ESP32-H2": {"firmware": 0},
    "ESP32-S2": {"bootloader": 4096, "partitions": 32768, "firmware": 65536},
    "ESP32-S3": {"bootloader": 4096, "partitions": 32768, "firmware": 65536}
}

def create_slug(project_name):
    """Convert project name to URL-safe slug"""
    slug = project_name.lower()
    slug = re.sub(r'[^a-z0-9]+', '-', slug)
    slug = slug.strip('-')
    return slug

def validate_binary_file(file_path):
    """Validate that file exists and is a .bin file"""
    path = Path(file_path).expanduser()
    if not path.exists():
        raise FileNotFoundError(f"File not found: {file_path}")
    if not path.is_file():
        raise ValueError(f"Not a file: {file_path}")
    if path.suffix.lower() != '.bin':
        raise ValueError(f"Not a .bin file: {file_path}")
    return path

def get_user_input():
    """Interactive input collection with validation"""
    print("=" * 60)
    print("ESP32 Multi-Project Flasher - Add New Project")
    print("=" * 60)
    print()

    # Project name
    while True:
        project_name = input("Project name: ").strip()
        if project_name:
            break
        print("Error: Project name cannot be empty")

    slug = create_slug(project_name)
    print(f"Generated slug: {slug}")

    # Check if project already exists
    if (PROJECTS_DIR / slug).exists():
        raise ValueError(f"Project '{slug}' already exists!")

    # Chip family selection
    print("\nSupported chip families:")
    for i, chip in enumerate(SUPPORTED_CHIPS, 1):
        print(f"  {i}. {chip}")

    while True:
        try:
            chip_choice = input(f"\nSelect chip family (1-{len(SUPPORTED_CHIPS)}): ").strip()
            chip_index = int(chip_choice) - 1
            if 0 <= chip_index < len(SUPPORTED_CHIPS):
                chip_family = SUPPORTED_CHIPS[chip_index]
                break
            print(f"Error: Please enter a number between 1 and {len(SUPPORTED_CHIPS)}")
        except ValueError:
            print("Error: Please enter a valid number")

    # Binary file paths
    print("\nBinary file paths (absolute or relative):")
    print("Note: Standard ESP32 projects require 3 files, some chips may need only 1-2")

    binaries = {}
    binary_types = ["bootloader", "partitions", "firmware"]

    for bin_type in binary_types:
        while True:
            file_path = input(f"  {bin_type}.bin path (or 'skip' to omit): ").strip()
            if file_path.lower() == 'skip':
                if bin_type == "firmware":
                    print("Error: firmware.bin is required")
                    continue
                break
            try:
                validated_path = validate_binary_file(file_path)
                binaries[bin_type] = validated_path
                print(f"    ✓ Valid ({validated_path.stat().st_size:,} bytes)")
                break
            except (FileNotFoundError, ValueError) as e:
                print(f"    ✗ {e}")

    # Optional description
    description = input("\nOptional description: ").strip()

    return {
        "name": project_name,
        "slug": slug,
        "chip_family": chip_family,
        "binaries": binaries,
        "description": description if description else None
    }

def create_manifest(project_info):
    """Generate manifest.json for the project"""
    parts = []
    offsets = CHIP_OFFSETS[project_info["chip_family"]]

    # Build parts array based on available binaries
    for bin_type, bin_path in project_info["binaries"].items():
        if bin_type in offsets:
            parts.append({
                "path": f"firmware/{bin_type}.bin",
                "offset": offsets[bin_type]
            })

    manifest = {
        "name": project_info["name"],
        "version": "1.0.0",
        "new_install_prompt_erase": True,
        "builds": [
            {
                "chipFamily": project_info["chip_family"],
                "parts": parts
            }
        ]
    }

    return manifest

def copy_binaries(project_info, dest_dir):
    """Copy binary files to project firmware directory"""
    firmware_dir = dest_dir / "firmware"
    firmware_dir.mkdir(parents=True, exist_ok=True)

    for bin_type, src_path in project_info["binaries"].items():
        dest_path = firmware_dir / f"{bin_type}.bin"
        shutil.copy2(src_path, dest_path)
        print(f"  Copied {bin_type}.bin ({src_path.stat().st_size:,} bytes)")

def update_registry(project_info):
    """Add project entry to registry.json"""
    # Load existing registry or create new
    if REGISTRY_PATH.exists():
        with open(REGISTRY_PATH, 'r') as f:
            registry = json.load(f)
    else:
        registry = {"version": "1.0.0", "projects": []}

    # Add new project
    registry["projects"].append({
        "slug": project_info["slug"],
        "name": project_info["name"],
        "chipFamily": project_info["chip_family"],
        "manifestPath": f"projects/{project_info['slug']}/manifest.json",
        "description": project_info["description"],
        "dateAdded": datetime.now().strftime("%Y-%m-%d")
    })

    # Write back to file
    with open(REGISTRY_PATH, 'w') as f:
        json.dump(registry, f, indent=2)

    print(f"\n✓ Updated registry.json (now {len(registry['projects'])} projects)")

def main():
    try:
        # Collect project information
        project_info = get_user_input()

        print("\n" + "=" * 60)
        print("Creating project structure...")
        print("=" * 60)

        # Create project directory
        project_dir = PROJECTS_DIR / project_info["slug"]
        project_dir.mkdir(parents=True, exist_ok=True)
        print(f"\n✓ Created directory: {project_dir}")

        # Generate and save manifest
        manifest = create_manifest(project_info)
        manifest_path = project_dir / "manifest.json"
        with open(manifest_path, 'w') as f:
            json.dump(manifest, f, indent=2)
        print(f"✓ Created manifest.json")

        # Copy binary files
        print(f"\nCopying binaries:")
        copy_binaries(project_info, project_dir)

        # Update registry
        update_registry(project_info)

        # Success message
        print("\n" + "=" * 60)
        print("SUCCESS! Project added successfully")
        print("=" * 60)
        print(f"\nProject: {project_info['name']}")
        print(f"Slug: {project_info['slug']}")
        print(f"Chip: {project_info['chip_family']}")
        print(f"Location: {project_dir}")
        print("\nNext steps:")
        print("  1. Test the flasher locally (python -m http.server 8000)")
        print(f"  2. Navigate to: http://localhost:8000/")
        print(f"  3. Select '{project_info['name']}' from dropdown")
        print("  4. Test flashing with an ESP32 device")
        print("  5. Commit and push to GitHub if successful")

    except KeyboardInterrupt:
        print("\n\nOperation cancelled by user")
        return 1
    except Exception as e:
        print(f"\n\nERROR: {e}")
        return 1

    return 0

if __name__ == "__main__":
    exit(main())
