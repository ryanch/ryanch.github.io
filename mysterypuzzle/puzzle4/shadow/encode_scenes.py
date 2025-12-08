#!/usr/bin/env python3
"""
Scene Encoder for Foreshadow Puzzle Game

This script encodes text strings in scenes.js using a random substitution cipher
to make it harder to cheat by viewing source. It preserves nlpMatch functions
and scene identifiers while encoding all narrative text.

Usage:
    python encode_scenes.py

Reads: scenes.js
Writes: game_scenes.js
"""

import random
import re
import sys

# Random substitution cipher mapping (generated once, then hardcoded)
# Character set: a-z, A-Z, 0-9, common punctuation
# Each character maps to a different character in the same category
ENCODE_MAP = {
    # Lowercase letters (shuffled)
    'a': 'q', 'b': 'w', 'c': 'e', 'd': 'r', 'e': 't',
    'f': 'y', 'g': 'u', 'h': 'd', 'i': 'p', 'j': 'f',
    'k': 'g', 'l': 's', 'm': 'h', 'n': 'z', 'o': 'x',
    'p': 'c', 'q': 'v', 'r': 'k', 's': 'b', 't': 'n',
    'u': 'm', 'v': 'a', 'w': 'l', 'x': 'o', 'y': 'i',
    'z': 'j',

    # Uppercase letters (shuffled)
    'A': 'Q', 'B': 'W', 'C': 'E', 'D': 'R', 'E': 'T',
    'F': 'Y', 'G': 'U', 'H': 'D', 'I': 'P', 'J': 'F',
    'K': 'G', 'L': 'S', 'M': 'H', 'N': 'Z', 'O': 'X',
    'P': 'C', 'Q': 'V', 'R': 'K', 'S': 'B', 'T': 'N',
    'U': 'M', 'V': 'A', 'W': 'L', 'X': 'O', 'Y': 'I',
    'Z': 'J',

    # Numbers (shuffled)
    '0': '7', '1': '4', '2': '9', '3': '1', '4': '6',
    '5': '0', '6': '8', '7': '3', '8': '5', '9': '2',

    # Punctuation (shuffled within similar groups)
    '.': ';', ',': ':', ';': '.', ':': ',',
    '!': '?', '?': '!',
    # Note: quotes NOT encoded to preserve JavaScript syntax
    '(': ')', ')': '(',
    '-': '-',  # Keep dash as-is
}

# Create reverse mapping for decoder (will be copied to JavaScript)
DECODE_MAP = {v: k for k, v in ENCODE_MAP.items()}


def encode_string(text):
    """Encode a string using the substitution cipher."""
    return ''.join(ENCODE_MAP.get(char, char) for char in text)


def should_encode_string(js_content, match_obj, in_function):
    """
    Determine if a string should be encoded based on context.

    Returns:
        True if the string should be encoded, False otherwise
    """
    # Never encode strings inside functions
    if in_function:
        return False

    # Get the string position
    string_start = match_obj.start()

    # Look at the 50 characters before the string to find the key
    context_start = max(0, string_start - 50)
    context = js_content[context_start:string_start]

    # Check if this is a 'scene' or 'gotoScene' value
    # Pattern: scene: "value" or gotoScene: "value"
    if re.search(r'(scene|gotoScene)\s*:\s*$', context):
        return False

    # Otherwise, encode it
    return True


def track_function_depth(js_content, position):
    """
    Check if we're inside an nlpMatch function at the given position.

    Returns True only if we're inside an nlpMatch function value.
    """
    # Look backwards from position to find nlpMatch field
    before = js_content[:position]

    # Find the last occurrence of 'nlpMatch'
    nlp_match_pos = before.rfind('nlpMatch')

    if nlp_match_pos == -1:
        return False

    # Get the text between nlpMatch and current position
    between = js_content[nlp_match_pos:position]

    # Check if we've passed a comma at the root level (indicating a new field)
    # We need to track depth carefully
    depth = 0
    in_string = False
    string_char = None

    for i, char in enumerate(between):
        # Track string state
        if char in ['"', "'"] and (i == 0 or between[i-1] != '\\'):
            if not in_string:
                in_string = True
                string_char = char
            elif char == string_char:
                in_string = False
                string_char = None

        if in_string:
            continue

        # Track depth
        if char in '([{':
            depth += 1
        elif char in ')]}':
            depth -= 1
        elif char == ',' and depth == 0:
            # Found a comma at root level after nlpMatch, we're in a new field
            return False

    # If we're still at positive depth, we're inside the nlpMatch function
    return depth > 0


def encode_scenes_file(input_file='scenes.js', output_file='game_scenes.js'):
    """
    Read scenes.js and write encoded version to game_scenes.js.
    """
    try:
        # Read input file
        with open(input_file, 'r', encoding='utf-8') as f:
            js_content = f.read()

        print(f"Read {len(js_content)} characters from {input_file}")

        # Track statistics
        total_strings = 0
        encoded_strings = 0
        skipped_strings = 0

        # Process string by string
        # Match both single and double quoted strings
        string_pattern = r'''(["'])(?:(?=(\\?))\2.)*?\1'''

        result = []
        last_pos = 0

        for match in re.finditer(string_pattern, js_content):
            total_strings += 1

            # Check if we're inside a function
            in_function = track_function_depth(js_content, match.start())

            # Add everything before this string
            result.append(js_content[last_pos:match.start()])

            # Decide whether to encode
            if should_encode_string(js_content, match, in_function):
                # Extract quote type and content
                quote_char = match.group(1)
                full_match = match.group(0)
                string_content = full_match[1:-1]  # Remove quotes

                # Encode the content
                encoded_content = encode_string(string_content)

                # Reconstruct with original quotes
                result.append(f"{quote_char}{encoded_content}{quote_char}")
                encoded_strings += 1
            else:
                # Keep original string
                result.append(match.group(0))
                skipped_strings += 1

                reason = "function" if in_function else "identifier"
                print(f"  Skipped ({reason}): {match.group(0)[:50]}...")

            last_pos = match.end()

        # Add remaining content
        result.append(js_content[last_pos:])

        # Join result
        encoded_content = ''.join(result)

        # Add header comment
        header = """// AUTO-GENERATED FILE - DO NOT EDIT BY HAND

"""

        final_content = header + encoded_content

        # Write output file
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(final_content)

        print(f"\nEncoding complete!")
        print(f"Total strings found: {total_strings}")
        print(f"Strings encoded: {encoded_strings}")
        print(f"Strings skipped: {skipped_strings}")
        print(f"Output written to: {output_file}")
        print(f"\nNext steps:")
        print(f"1. Check {output_file} to verify encoding")
        print(f"2. Update game.html to load {output_file} instead of {input_file}")
        print(f"3. Add decoder function to game.html")

        return True

    except FileNotFoundError:
        print(f"Error: Could not find {input_file}")
        print(f"Make sure you're running this script from the correct directory.")
        return False
    except Exception as e:
        print(f"Error: {e}")
        import traceback
        traceback.print_exc()
        return False


def print_decode_map():
    """Print the decode map in JavaScript format for copying to game.html."""
    print("\n" + "="*60)
    print("JavaScript DECODE_MAP (copy this to game.html):")
    print("="*60)
    print("const DECODE_MAP = {")

    items = []
    for encoded_char, original_char in sorted(DECODE_MAP.items()):
        # Escape special characters for JavaScript
        if encoded_char in ['"', "'", '\\']:
            encoded_char = '\\' + encoded_char
        if original_char in ['"', "'", '\\']:
            original_char = '\\' + original_char
        items.append(f'    "{encoded_char}": "{original_char}"')

    print(",\n".join(items))
    print("};")
    print("="*60)


def print_encode_map_for_js():
    """Print the encode map in JavaScript format for test function."""
    print("\n" + "="*60)
    print("JavaScript ENCODE_MAP (copy this to encodeStringForTest):")
    print("="*60)
    print("const ENCODE_MAP = {")

    items = []
    for original_char, encoded_char in sorted(ENCODE_MAP.items()):
        # Escape special characters for JavaScript
        if original_char in ['"', "'", '\\']:
            original_char = '\\' + original_char
        if encoded_char in ['"', "'", '\\']:
            encoded_char = '\\' + encoded_char
        items.append(f'    "{original_char}": "{encoded_char}"')

    print(",\n".join(items))
    print("};")
    print("="*60)


if __name__ == '__main__':
    print("Scene Encoder for Foreshadow Puzzle")
    print("=" * 60)

    success = encode_scenes_file()

    if success:
        print_decode_map()
        print_encode_map_for_js()
        print("\nEncoding successful! ✓")
        sys.exit(0)
    else:
        print("\nEncoding failed! ✗")
        sys.exit(1)
