#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""List available Arabic voices from edge-tts"""

import asyncio
import sys
sys.stdout.reconfigure(encoding='utf-8')

async def main():
    import edge_tts
    voices = await edge_tts.list_voices()
    arabic_voices = [v for v in voices if v['Locale'].startswith('ar-')]
    
    print("Available Arabic voices:")
    print("-" * 50)
    for v in arabic_voices:
        print(f"  {v['ShortName']:30s} | {v['Gender']:8s} | {v['Locale']}")

if __name__ == "__main__":
    asyncio.run(main())
