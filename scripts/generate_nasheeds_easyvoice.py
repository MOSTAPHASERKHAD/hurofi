#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Generate nasheed audio files using EasyVoice TTS (OpenAI-compatible)
Free: 5000 characters/day, no signup required
"""

import json
import os
import sys
import time
import requests

sys.stdout.reconfigure(encoding='utf-8')

EASYVOICE_API_URL = "https://api.easyvoice.ae/v1/audio/speech"
EASYVOICE_API_KEY = os.getenv("EASYVOICE_API_KEY", None)
EASYVOICE_VOICE = "arabic-female-1"

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "nasheeds")
os.makedirs(OUTPUT_DIR, exist_ok=True)

def load_nasheeds():
    with open(os.path.join(os.path.dirname(__file__), "..", "content", "nasheeds.json"), "r", encoding="utf-8") as f:
        return json.load(f)

def generate_nasheed(letter_key, lyrics):
    clean_lyrics = lyrics.replace("🎵", "").strip()
    
    headers = {"Content-Type": "application/json"}
    if EASYVOICE_API_KEY:
        headers["Authorization"] = f"Bearer {EASYVOICE_API_KEY}"
    
    data = {
        "model": "kokoro-82m",
        "voice": EASYVOICE_VOICE,
        "input": clean_lyrics,
        "format": "mp3",
    }
    
    try:
        response = requests.post(EASYVOICE_API_URL, headers=headers, json=data, timeout=60)
        response.raise_for_status()
        
        output_file = os.path.join(OUTPUT_DIR, f"{letter_key}.mp3")
        with open(output_file, "wb") as f:
            f.write(response.content)
        
        print(f"[OK] {letter_key}.mp3 ({len(response.content)} bytes)")
        return True
    except Exception as e:
        print(f"[FAIL] {letter_key}: {e}")
        return False

def main():
    nasheeds = load_nasheeds()
    print(f"Found {len(nasheeds)} nasheeds to generate")
    print(f"Output: {OUTPUT_DIR}")
    print()
    
    success = 0
    failed = []
    
    for i, (letter_key, data) in enumerate(nasheeds.items()):
        print(f"[{i+1}/{len(nasheeds)}] {data['name']} ({letter_key})...")
        
        if generate_nasheed(letter_key, data["lyrics"]):
            success += 1
        else:
            failed.append(letter_key)
        
        if i < len(nasheeds) - 1:
            time.sleep(1)
    
    print()
    print(f"Complete: {success}/{len(nasheeds)} generated")
    if failed:
        print(f"Failed: {', '.join(failed)}")

if __name__ == "__main__":
    main()
