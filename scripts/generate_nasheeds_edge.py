#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Generate nasheed audio files using edge-tts (Microsoft)
Free, no API key needed, high quality Arabic voices
"""

import asyncio
import json
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

# Saudi female voice - clear and pleasant for kids
VOICE = "ar-SA-ZariyahNeural"
RATE = "-10%"  # Slightly slower for clarity

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "nasheeds")
os.makedirs(OUTPUT_DIR, exist_ok=True)

def load_nasheeds():
    with open(os.path.join(os.path.dirname(__file__), "..", "content", "nasheeds.json"), "r", encoding="utf-8") as f:
        return json.load(f)

async def generate_nasheed(letter_key, lyrics):
    """Generate audio for a single nasheed"""
    import edge_tts
    
    clean_lyrics = lyrics.replace("🎵", "").strip()
    output_file = os.path.join(OUTPUT_DIR, f"{letter_key}.mp3")
    
    communicate = edge_tts.Communicate(clean_lyrics, VOICE, rate=RATE)
    await communicate.save(output_file)
    
    file_size = os.path.getsize(output_file)
    print(f"[OK] {letter_key}.mp3 ({file_size:,} bytes)")
    return True

async def main():
    nasheeds = load_nasheeds()
    print(f"Generating {len(nasheeds)} nasheeds using {VOICE}")
    print(f"Output: {OUTPUT_DIR}")
    print()
    
    success = 0
    failed = []
    
    for i, (letter_key, data) in enumerate(nasheeds.items()):
        print(f"[{i+1}/{len(nasheeds)}] {data['name']} ({letter_key})...")
        try:
            if await generate_nasheed(letter_key, data["lyrics"]):
                success += 1
        except Exception as e:
            print(f"[FAIL] {letter_key}: {e}")
            failed.append(letter_key)
    
    print()
    print(f"Complete: {success}/{len(nasheeds)} generated")
    if failed:
        print(f"Failed: {', '.join(failed)}")

if __name__ == "__main__":
    asyncio.run(main())
