"""
سكربت إنشاء أناشيد الحروف العربية باستخدام ACE Music API
"""

import requests
import base64
import os
import time
import json

API_KEY = "caac0ce9eb334b4893d37fb631b9528d"
BASE_URL = "https://api.acemusic.ai"
OUTPUT_DIR = r"D:\pro\produit nemerotique\n\hurofi\public\nasheeds"

# الكلمات الجاهزة للحروف
LETTERS = {
    "alif": {
        "name": "ألف",
        "lyrics": "[Verse]\nألف أرنب يجري يلعب\nيأكل جزراً كي لا يتعب\n[Chorus]\nحرف ألف حرف ألف\nالحروف حروف العربية"
    },
    "baa": {
        "name": "باء",
        "lyrics": "[Verse]\nباء بطة نطت نطة\nوقعت ضحكت منها القطة\n[Chorus]\nحرف باء حرف باء\nالحروف حروف العربية"
    },
    "taa": {
        "name": "تاء",
        "lyrics": "[Verse]\nتاج فوق الرأس فيه\nالذهب وفيه الماس\n[Chorus]\nحرف تاء حرف تاء\nالحروف حروف العربية"
    },
    "thaa": {
        "name": "ثاء",
        "lyrics": "[Verse]\nثعلب صاد دجاجة\nهو ماكر وقت الحاجة\n[Chorus]\nحرف ثاء حرف ثاء\nالحروف حروف العربية"
    },
    "jeem": {
        "name": "جيم",
        "lyrics": "[Verse]\nجمل في الصحراء مثل\nسفينة فوق الماء\n[Chorus]\nحرف جيم حرف جيم\nالحروف حروف العربية"
    },
    "haa": {
        "name": "حاء",
        "lyrics": "[Verse]\nحج أسمى رغبة\nفيه طواف حول الكعبة\n[Chorus]\nحرف حاء حرف حاء\nالحروف حروف العربية"
    },
    "khaa": {
        "name": "خاء",
        "lyrics": "[Verse]\nخبز عند البائع\nلا يأكله إلا الجائع\n[Chorus]\nحرف خاء حرف خاء\nالحروف حروف العربية"
    },
    "dal": {
        "name": "دال",
        "lyrics": "[Verse]\nديك حسن الصوت\nقام يؤذن فوق البيت\n[Chorus]\nحرف دال حرف دال\nالحروف حروف العربية"
    },
    "thal": {
        "name": "ذال",
        "lyrics": "[Verse]\nذئب وحش صلب\nلا يرهبه إلا الكلب\n[Chorus]\nحرف ذال حرف ذال\nالحروف حروف العربية"
    },
    "ra": {
        "name": "راء",
        "lyrics": "[Verse]\nرجل عرف الدين\nفهو صدوق وهو أمين\n[Chorus]\nحرف راء حرف راء\nالحروف حروف العربية"
    },
    "zay": {
        "name": "زاي",
        "lyrics": "[Verse]\nزهرة أصفر أحمر\nهي بعيني أحلى منظر\n[Chorus]\nحرف زاي حرف زاي\nالحروف حروف العربية"
    },
    "seen": {
        "name": "سين",
        "lyrics": "[Verse]\nساعة تحفظ وقتي\nفي مدرستي أو في بيتي\n[Chorus]\nحرف سين حرف سين\nالحروف حروف العربية"
    },
    "sheen": {
        "name": "شين",
        "lyrics": "[Verse]\nشمس صنع قدير\nفيها الدفء فيها النور\n[Chorus]\nحرف شين حرف شين\nالحروف حروف العربية"
    },
    "sad": {
        "name": "صاد",
        "lyrics": "[Verse]\nصائد ألقى الشبكة\nبعد قليل صاد سمكة\n[Chorus]\nحرف صاد حرف صاد\nالحروف حروف العربية"
    },
    "dad": {
        "name": "ضاد",
        "lyrics": "[Verse]\nضابط يحمي وطني\nيحفظ أمني يرعى سكني\n[Chorus]\nحرف ضاد حرف ضاد\nالحروف حروف العربية"
    },
    "taa_marbuta": {
        "name": "طاء",
        "lyrics": "[Verse]\nطفل أجمل طفل\nفهو نظيف حسن الشكل\n[Chorus]\nحرف طاء حرف طاء\nالحروف حروف العربية"
    },
    "dhaa": {
        "name": "ظاء",
        "lyrics": "[Verse]\nظفر نظفناه\nطال قليلاً فقصصناه\n[Chorus]\nحرف ظاء حرف ظاء\nالحروف حروف العربية"
    },
    "ain": {
        "name": "عين",
        "lyrics": "[Verse]\nعين تخشى الله\nتشهد خيراً فيه رضاه\n[Chorus]\nحرف عين حرف عين\nالحروف حروف العربية"
    },
    "ghayn": {
        "name": "غين",
        "lyrics": "[Verse]\nغار غار حراء\nفيه أنزل القرآن\n[Chorus]\nحرف غين حرف غين\nالحروف حروف العربية"
    },
    "fa": {
        "name": "فاء",
        "lyrics": "[Verse]\nفيل ذو أنياب\nوهو صديق يا أصحاب\n[Chorus]\nحرف فاء حرف فاء\nالحروف حروف العربية"
    },
    "qaf": {
        "name": "قاف",
        "lyrics": "[Verse]\nقمر فيه منال\nومواقيت تهدى السائل\n[Chorus]\nحرف قاف حرف قاف\nالحروف حروف العربية"
    },
    "kaf": {
        "name": "كاف",
        "lyrics": "[Verse]\nكلب عاش جواري\nيحرس غنمي يحرس داري\n[Chorus]\nحرف كاف حرف كاف\nالحروف حروف العربية"
    },
    "lam": {
        "name": "لام",
        "lyrics": "[Verse]\nلحم ينمو جسمي\nيكسو عظمي فيه أسمى\n[Chorus]\nحرف لام حرف لام\nالحروف حروف العربية"
    },
    "mim": {
        "name": "ميم",
        "lyrics": "[Verse]\nمسجد بيت الله\nفيه أؤدي كل صلاة\n[Chorus]\nحرف ميم حرف ميم\nالحروف حروف العربية"
    },
    "nun": {
        "name": "نون",
        "lyrics": "[Verse]\nنهر نهر النيل\nفهو كريم غير بخيل\n[Chorus]\nحرف نون حرف نون\nالحروف حروف العربية"
    },
    "haa_marbuta": {
        "name": "هاء",
        "lyrics": "[Verse]\nهرم عال القمة\nوبناؤه رمز للهمة\n[Chorus]\nحرف هاء حرف هاء\nالحروف حروف العربية"
    },
    "waw": {
        "name": "واو",
        "lyrics": "[Verse]\nوجه للإنسان\nفيه نور بالإيمان\n[Chorus]\nحرف واو حرف واو\nالحروف حروف العربية"
    },
    "ya": {
        "name": "ياء",
        "lyrics": "[Verse]\nيد ترسم زهرة\nتبدع شكلاً تظهر فكراً\n[Chorus]\nحرف ياء حرف ياء\nالحروف حروف العربية"
    }
}


def generate_nasheed(letter_key, letter_data):
    """إنشاء نشيد لحرف معين (صوت فقط بدون موسيقى)"""
    
    url = f"{BASE_URL}/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json",
        "User-Agent": "Hurofi-App/1.0"
    }
    
    data = {
        "model": "acemusic/acestep-v15-turbo",
        "messages": [
            {
                "role": "user",
                "content": f"Arabic children acapella nasheed for letter {letter_data['name']}, vocals only, no instruments, no music, happy, educational, kids singing"
            }
        ],
        "modalities": ["audio"],
        "stream": False,
        "task_type": "text2music",
        "thinking": True,
        "temperature": 0.85,
        "use_cot_caption": True,
        "use_cot_language": True,
        "use_cot_metas": True,
        "guidance_scale": 7.0,
        "audio_config": {
            "format": "mp3",
            "vocal_language": "ar",
            "instrumental": False,
            "duration": 20
        },
        "lyrics": letter_data["lyrics"]
    }
    
    try:
        response = requests.post(url, headers=headers, json=data, timeout=120)
        
        if response.status_code == 200:
            result = response.json()
            choices = result.get("choices", [])
            
            if choices:
                message = choices[0].get("message", {})
                audio_list = message.get("audio", [])
                
                if audio_list:
                    audio_url = audio_list[0].get("audio_url", {}).get("url", "")
                    
                    if audio_url.startswith("data:audio/"):
                        # استخراج البيانات المشفرة
                        b64_data = audio_url.split(",")[1]
                        audio_bytes = base64.b64decode(b64_data)
                        
                        # حفظ الملف
                        output_path = os.path.join(OUTPUT_DIR, f"{letter_key}.mp3")
                        with open(output_path, "wb") as f:
                            f.write(audio_bytes)
                        
                        return True, len(audio_bytes)
                    
                    return False, "Invalid audio URL format"
                
                return False, "No audio in response"
            
            return False, "No choices in response"
        
        return False, f"HTTP {response.status_code}: {response.text[:200]}"
        
    except Exception as e:
        return False, str(e)


def main():
    """الدالة الرئيسية"""
    
    # تعيين الترميز للإخراج
    import sys
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
    
    # إنشاء المجلد إذا لم يكن موجوداً
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    print("Starting nasheed generation for Arabic letters...")
    print(f"Number of letters: {len(LETTERS)}")
    print(f"Output directory: {OUTPUT_DIR}")
    print("-" * 50)
    
    success_count = 0
    failed_count = 0
    
    for i, (letter_key, letter_data) in enumerate(LETTERS.items(), 1):
        print(f"[{i}/{len(LETTERS)}] Generating nasheed for letter {letter_data['name']}...")
        
        success, result = generate_nasheed(letter_key, letter_data)
        
        if success:
            print(f"  ✓ Success ({result} bytes)")
            success_count += 1
        else:
            print(f"  ✗ Failed: {result}")
            failed_count += 1
        
        # انتظار قليلاً بين الطلبات
        if i < len(LETTERS):
            time.sleep(2)
    
    print("-" * 50)
    print("Final results:")
    print(f"  ✓ Success: {success_count}")
    print(f"  ✗ Failed: {failed_count}")
    print(f"  Total: {len(LETTERS)}")


if __name__ == "__main__":
    main()
