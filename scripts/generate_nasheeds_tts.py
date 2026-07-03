#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Generate nasheed audio files using Hakim TTS (Arabic-first)
Free: 5 generations per day, no signup required
"""

import json
import os
import sys
import time
import requests

# Fix encoding for Windows console
sys.stdout.reconfigure(encoding='utf-8')

# Configuration
HAKIM_API_URL = "https://api.tryhakim.ai/v1/audio/speech"
HAKIM_MODEL = "hakim-fast-v1.3"
HAKIM_VOICE = "reem-msa"  # Modern Standard Arabic female voice

# Get API key from environment or use None for free tier
HAKIM_API_KEY = os.getenv("HAKIM_API_KEY", None)

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "nasheeds")
os.makedirs(OUTPUT_DIR, exist_ok=True)

def load_nasheeds():
    """Load nasheed lyrics from content/nasheeds.json"""
    with open(os.path.join(os.path.dirname(__file__), "..", "content", "nasheeds.json"), "r", encoding="utf-8") as f:
        return json.load(f)

def generate_nasheed(letter_key, lyrics):
    """Generate audio for a single nasheed using Hakim TTS"""
    # Clean lyrics for TTS - remove music emoji and format markers
    clean_lyrics = lyrics.replace("🎵", "").strip()
    
    headers = {
        "Content-Type": "application/json",
    }
    if HAKIM_API_KEY:
        headers["Authorization"] = f"Bearer {HAKIM_API_KEY}"
    
    data = {
        "model": HAKIM_MODEL,
        "voice": HAKIM_VOICE,
        "input": clean_lyrics,
        "format": "mp3",
    }
    
    try:
        response = requests.post(HAKIM_API_URL, headers=headers, json=data, timeout=60)
        response.raise_for_status()
        
        output_file = os.path.join(OUTPUT_DIR, f"{letter_key}.mp3")
        with open(output_file, "wb") as f:
            f.write(response.content)
        
        print(f"✓ Generated: {letter_key}.mp3 ({len(response.content)} bytes)")
        return True
    except Exception as e:
        print(f"✗ Failed {letter_key}: {e}")
        return False

def main():
    nasheeds = load_nasheeds()
    print(f"Found {len(nasheeds)} nasheeds to generate")
    print(f"Output: {OUTPUT_DIR}")
    print()
    
    if not HAKIM_API_KEY:
        print("No API key found. Using free tier (5 per day).")
        print("Set HAKIM_API_KEY for unlimited access.")
        print()
    
    success = 0
    failed = []
    
    for i, (letter_key, data) in enumerate(nasheeds.items()):
        print(f"[{i+1}/{len(nasheeds)}] Generating {data['name']} ({letter_key})...")
        
        if generate_nasheed(letter_key, data["lyrics"]):
            success += 1
        else:
            failed.append(letter_key)
        
        # Rate limit: 1 request per 2 seconds
        if i < len(nasheeds) - 1:
            time.sleep(2)
    
    print()
    print(f"Complete: {success}/{len(nasheeds)} generated")
    if failed:
        print(f"Failed: {', '.join(failed)}")

if __name__ == "__main__":
    main()
