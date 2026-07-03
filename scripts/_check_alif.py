import json, sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
r = json.load(open('src/content/letters/01-alif.json', 'r', encoding='utf-8'))
for w in r['matchWords']:
    print(f"  {w['position']}: {w['arabic']}")
