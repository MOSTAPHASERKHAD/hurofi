import json, os, sys, io
from pathlib import Path

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

AUDIO_DIR = Path(r"D:\pro\produit nemerotique\n\hurofi\public\audio\words")

for folder in sorted(AUDIO_DIR.iterdir()):
    if folder.is_dir() and not folder.name.startswith('.'):
        files = sorted(f.name.replace('.mp3','') for f in folder.glob('*.mp3'))
        if files:
            print(f"{folder.name}: {' | '.join(files)}")
