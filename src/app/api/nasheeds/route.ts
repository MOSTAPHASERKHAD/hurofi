import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Files to exclude (main letter nasheeds)
const LETTER_FILES = [
  "ا.mp3", "ب.mp3", "ت.mp3", "ث.mp3", "ج.mp3", "ح.mp3", "خ.mp3",
  "د.mp3", "ذ.mp3", "ر.mp3", "ز.mp3", "س.mp3", "ش.mp3", "ص.mp3",
  "ض.mp3", "ط.mp3", "ظ.mp3", "ع.mp3", "غ.mp3", "ف.mp3", "ق.mp3",
  "ك.mp3", "ل.mp3", "م.mp3", "ن.mp3", "ه.mp3", "و.mp3", "ي.mp3",
  "أنشودة الحروف.mp3"
];

export async function GET() {
  try {
    const nasheedsDir = path.join(process.cwd(), "public", "nasheeds");
    
    if (!fs.existsSync(nasheedsDir)) {
      return NextResponse.json({});
    }

    const files = fs.readdirSync(nasheedsDir)
      .filter(f => f.endsWith(".mp3") && !LETTER_FILES.includes(f))
      .reduce((acc, f) => {
        const id = f.replace(".mp3", "");
        const name = id
          .replace(/-/g, " ")
          .replace(/\b\w/g, c => c.toUpperCase());
        acc[id] = { name, file: f };
        return acc;
      }, {} as Record<string, { name: string; file: string }>);

    return NextResponse.json(files);
  } catch {
    return NextResponse.json({});
  }
}
