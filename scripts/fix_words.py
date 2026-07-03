import json, sys, io, shutil
from pathlib import Path

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

AUDIO_DIR = Path(r"D:\pro\produit nemerotique\n\hurofi\public\audio\words")

# Haa words that ended up in Noon folder
haa_words = ["هدية.mp3", "هلال.mp3", "هاتف.mp3", "هواء.mp3", "هدهد.mp3"]

noon_dir = AUDIO_DIR / "ن"
haa_dir = AUDIO_DIR / "ه"
haa_dir.mkdir(parents=True, exist_ok=True)

for fname in haa_words:
    src = noon_dir / fname
    dst = haa_dir / fname
    if src.exists():
        shutil.move(str(src), str(dst))
        print(f"Moved {fname}: ن/ → ه/")
    else:
        print(f"Not found: ن/{fname}")

# Verify
print("\nVerification:")
for folder_name in ["ن", "ه"]:
    folder = AUDIO_DIR / folder_name
    files = sorted(folder.glob("*.mp3"))
    print(f"  [{folder_name}]: {len(files)} files")
    for f in files:
        sz = f.stat().st_size
        print(f"    {f.name} ({sz}B)")
