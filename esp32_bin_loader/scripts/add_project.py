#!/usr/bin/env python3
"""
ESP32 Multi-Project Firmware Flasher - Project Management Tool

Automates the process of adding new ESP32 projects and updating existing ones.
"""

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

def load_registry():
    """Load registry.json and return the parsed dict"""
    if REGISTRY_PATH.exists():
        with open(REGISTRY_PATH, 'r') as f:
            return json.load(f)
    return {"version": "1.0.0", "projects": []}

def get_startup_mode():
    """Display mode selection menu and return choice (1=add, 2=update)"""
    print("=" * 60)
    print("ESP32 Multi-Project Flasher - Project Manager")
    print("=" * 60)
    print()
    print("  1. Add new project")
    print("  2. Update existing project")
    print()

    while True:
        choice = input("Select mode (1-2): ").strip()
        if choice in ("1", "2"):
            return int(choice)
        print("Error: Please enter 1 or 2")

def select_existing_project(registry):
    """Display numbered list of projects and return the selected project dict"""
    projects = registry.get("projects", [])
    if not projects:
        raise ValueError("No projects in registry. Use 'Add new project' first.")

    print("\nExisting projects:")
    for i, proj in enumerate(projects, 1):
        print(f"  {i}. {proj['name']} ({proj['chipFamily']})")

    while True:
        try:
            choice = input(f"\nSelect project (1-{len(projects)}): ").strip()
            idx = int(choice) - 1
            if 0 <= idx < len(projects):
                return projects[idx]
            print(f"Error: Please enter a number between 1 and {len(projects)}")
        except ValueError:
            print("Error: Please enter a valid number")

def get_update_input(existing_project):
    """Interactive input collection for updating an existing project"""
    print()
    print("--- Update Existing Project ---")
    print(f"Slug: {existing_project['slug']} (fixed)")
    print()

    slug = existing_project["slug"]
    current_name = existing_project.get("name", slug)
    current_chip = existing_project.get("chipFamily", "ESP32")
    current_desc = existing_project.get("description") or ""
    stored_paths = existing_project.get("sourcePaths") or {}

    # Project name
    while True:
        name_input = input(f"Project name [{current_name}]: ").strip()
        project_name = name_input if name_input else current_name
        if project_name:
            break
        print("Error: Project name cannot be empty")

    # Chip family selection
    print("\nSupported chip families:")
    current_chip_index = None
    for i, chip in enumerate(SUPPORTED_CHIPS, 1):
        marker = " <-- current" if chip == current_chip else ""
        if chip == current_chip:
            current_chip_index = i
        print(f"  {i}. {chip}{marker}")

    while True:
        try:
            prompt = f"\nSelect chip family (1-{len(SUPPORTED_CHIPS)})"
            if current_chip_index:
                prompt += f" [{current_chip_index}]"
            prompt += ": "
            chip_choice = input(prompt).strip()
            if not chip_choice and current_chip_index:
                chip_family = current_chip
                break
            chip_index = int(chip_choice) - 1
            if 0 <= chip_index < len(SUPPORTED_CHIPS):
                chip_family = SUPPORTED_CHIPS[chip_index]
                break
            print(f"Error: Please enter a number between 1 and {len(SUPPORTED_CHIPS)}")
        except ValueError:
            print("Error: Please enter a valid number")

    # Binary file paths
    print("\nBinary file paths:")
    binaries = {}
    source_paths = {}
    binary_types = ["bootloader", "partitions", "firmware"]

    for bin_type in binary_types:
        default_path = stored_paths.get(bin_type)
        while True:
            if default_path:
                prompt = f"  {bin_type}.bin path [{default_path}]: "
            else:
                prompt = f"  {bin_type}.bin path (or 'skip' to omit): "

            file_path = input(prompt).strip()

            # Enter pressed with a default
            if not file_path and default_path:
                file_path = default_path

            # Skip handling
            if not file_path or file_path.lower() == 'skip':
                if bin_type == "firmware":
                    print("    Error: firmware.bin is required")
                    continue
                break

            try:
                validated_path = validate_binary_file(file_path)
                binaries[bin_type] = validated_path
                source_paths[bin_type] = str(Path(file_path).expanduser().resolve())
                print(f"    ✓ Valid ({validated_path.stat().st_size:,} bytes)")
                break
            except (FileNotFoundError, ValueError) as e:
                print(f"    ✗ {e}")
                # If the default failed, clear it so user isn't stuck in a loop
                if file_path == default_path:
                    default_path = None

    # Optional description
    if current_desc:
        desc_input = input(f"\nDescription [{current_desc}]: ").strip()
        description = desc_input if desc_input else current_desc
    else:
        description = input("\nOptional description: ").strip() or None

    return {
        "name": project_name,
        "slug": slug,
        "chip_family": chip_family,
        "binaries": binaries,
        "description": description if description else None,
        "source_paths": source_paths
    }

def get_user_input():
    """Interactive input collection with validation for new projects"""
    print()
    print("--- Add New Project ---")
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
    source_paths = {}
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
                source_paths[bin_type] = str(Path(file_path).expanduser().resolve())
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
        "description": description if description else None,
        "source_paths": source_paths
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

def update_registry(project_info, mode="add"):
    """Add or update project entry in registry.json"""
    registry = load_registry()
    today = datetime.now().strftime("%Y-%m-%d")

    if mode == "add":
        registry["projects"].append({
            "slug": project_info["slug"],
            "name": project_info["name"],
            "chipFamily": project_info["chip_family"],
            "manifestPath": f"projects/{project_info['slug']}/manifest.json",
            "description": project_info["description"],
            "dateAdded": today,
            "lastUpdated": today,
            "sourcePaths": project_info.get("source_paths") or None
        })
    elif mode == "update":
        for entry in registry["projects"]:
            if entry["slug"] == project_info["slug"]:
                entry["name"] = project_info["name"]
                entry["chipFamily"] = project_info["chip_family"]
                entry["description"] = project_info["description"]
                entry["lastUpdated"] = today
                entry["sourcePaths"] = project_info.get("source_paths") or None
                break

    with open(REGISTRY_PATH, 'w') as f:
        json.dump(registry, f, indent=2)

    action = "Updated" if mode == "update" else "Added to"
    print(f"\n✓ {action} registry.json (now {len(registry['projects'])} projects)")

def main():
    try:
        mode = get_startup_mode()

        if mode == 1:
            project_info = get_user_input()
            action_verb = "Creating"
            success_verb = "added"
        else:
            registry = load_registry()
            existing = select_existing_project(registry)
            project_info = get_update_input(existing)
            action_verb = "Updating"
            success_verb = "updated"

        print("\n" + "=" * 60)
        print(f"{action_verb} project structure...")
        print("=" * 60)

        # Create project directory
        project_dir = PROJECTS_DIR / project_info["slug"]
        project_dir.mkdir(parents=True, exist_ok=True)
        print(f"\n✓ {'Created' if mode == 1 else 'Verified'} directory: {project_dir}")

        # Generate and save manifest
        manifest = create_manifest(project_info)
        manifest_path = project_dir / "manifest.json"
        with open(manifest_path, 'w') as f:
            json.dump(manifest, f, indent=2)
        print(f"✓ {'Created' if mode == 1 else 'Updated'} manifest.json")

        # Copy binary files
        print(f"\nCopying binaries:")
        copy_binaries(project_info, project_dir)

        # Update registry
        registry_mode = "add" if mode == 1 else "update"
        update_registry(project_info, mode=registry_mode)

        # Success message
        print("\n" + "=" * 60)
        print(f"SUCCESS! Project {success_verb} successfully")
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
