import asyncio, sys, io
from pathlib import Path
import edge_tts

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

# The user says the downloaded MP3 for ظ sounds like ص
# Let's re-download from the site to be sure
import urllib.request

url = "https://www.arabicreadingcourse.com/audio/isolated-letters/thaa.mp3"
out = Path(r"D:\pro\produit nemerotique\n\hurofi\public\audio\letters\thaa_emph.mp3")

try:
    urllib.request.urlretrieve(url, out)
    sz = out.stat().st_size
    print(f"Re-downloaded thaa_emph.mp3 ({sz} bytes)")
except Exception as e:
    print(f"Download failed: {e}")

# Also generate a TTS version as fallback for comparison
out2 = Path(r"D:\pro\produit nemerotique\n\hurofi\public\audio\letters\thaa_emph_tts.mp3")
async def gen_tts():
    tts = edge_tts.Communicate("ظاء", "ar-AE-HamdanNeural")
    await tts.save(str(out2))
    sz2 = out2.stat().st_size
    print(f"TTS fallback thaa_emph_tts.mp3 ({sz2} bytes)")

asyncio.run(gen_tts())
