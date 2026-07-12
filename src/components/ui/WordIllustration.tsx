import { SVGProps } from "react";

interface WordIllustrationProps extends SVGProps<SVGSVGElement> {
  word: string;
  fallbackImage?: string;
}

export default function WordIllustration({ word, fallbackImage, ...props }: WordIllustrationProps) {
  // إزالة الحركات من الكلمة للبحث السهل
  const cleanWord = word.replace(/[\u0617-\u061A\u064B-\u0652]/g, "");

  // رسومات مخصصة (أول 5 حروف)
  switch (cleanWord) {
    /* ─── حرف الألف ────────────────────────────── */
    case "أرنب":
      return (
        <svg viewBox="0 0 100 100" {...props}>
          {/* Ears */}
          <ellipse cx="35" cy="25" rx="10" ry="25" fill="#F3E8FF" stroke="#A855F7" strokeWidth="2" />
          <ellipse cx="65" cy="25" rx="10" ry="25" fill="#F3E8FF" stroke="#A855F7" strokeWidth="2" />
          <ellipse cx="35" cy="25" rx="4" ry="15" fill="#F9A8D4" />
          <ellipse cx="65" cy="25" rx="4" ry="15" fill="#F9A8D4" />
          {/* Head */}
          <circle cx="50" cy="55" r="30" fill="#FFFFFF" stroke="#A855F7" strokeWidth="2" />
          {/* Eyes */}
          <circle cx="40" cy="48" r="4" fill="#1F2937" />
          <circle cx="60" cy="48" r="4" fill="#1F2937" />
          {/* Nose */}
          <ellipse cx="50" cy="58" rx="6" ry="4" fill="#F472B6" />
          {/* Mouth */}
          <path d="M45 65 Q50 70 55 65" fill="none" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "أسد":
      return (
        <svg viewBox="0 0 100 100" {...props}>
          {/* Mane */}
          <circle cx="50" cy="50" r="40" fill="#F59E0B" stroke="#B45309" strokeWidth="2" strokeDasharray="10 5" />
          {/* Face */}
          <circle cx="50" cy="50" r="25" fill="#FDE68A" stroke="#B45309" strokeWidth="2" />
          {/* Eyes */}
          <circle cx="42" cy="45" r="3" fill="#1F2937" />
          <circle cx="58" cy="45" r="3" fill="#1F2937" />
          {/* Nose */}
          <polygon points="45,55 55,55 50,62" fill="#92400E" />
          {/* Mouth */}
          <path d="M45 68 Q50 72 55 68" fill="none" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "أم":
      return (
        <svg viewBox="0 0 100 100" {...props}>
          <circle cx="50" cy="40" r="25" fill="#FCA5A5" />
          <path d="M25 40 Q50 10 75 40 L75 80 L25 80 Z" fill="#9333EA" />
          <circle cx="40" cy="35" r="3" fill="#1F2937" />
          <circle cx="60" cy="35" r="3" fill="#1F2937" />
          <path d="M45 45 Q50 50 55 45" fill="none" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    /* ─── حرف الباء ────────────────────────────── */
    case "بطة":
      return (
        <svg viewBox="0 0 100 100" {...props}>
          <ellipse cx="50" cy="65" rx="35" ry="20" fill="#FDE047" stroke="#CA8A04" strokeWidth="2" />
          <circle cx="75" cy="40" r="18" fill="#FDE047" stroke="#CA8A04" strokeWidth="2" />
          <polygon points="85,35 100,40 85,45" fill="#F97316" />
          <circle cx="70" cy="35" r="3" fill="#1F2937" />
          <path d="M20 60 Q30 50 40 60" fill="none" stroke="#CA8A04" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "تفاحة":
      return (
        <svg viewBox="0 0 100 100" {...props}>
          <path d="M50 25 C20 10 10 50 30 80 C40 95 60 95 70 80 C90 50 80 10 50 25 Z" fill="#EF4444" stroke="#B91C1C" strokeWidth="2" />
          <path d="M50 25 Q55 10 65 15" fill="none" stroke="#166534" strokeWidth="4" strokeLinecap="round" />
          <path d="M60 15 Q75 15 70 25 Z" fill="#22C55E" />
        </svg>
      );
    case "تاج":
      return (
        <svg viewBox="0 0 100 100" {...props}>
          <polygon points="20,80 80,80 90,30 65,50 50,20 35,50 10,30" fill="#FBBF24" stroke="#B45309" strokeWidth="3" strokeLinejoin="round" />
          <circle cx="10" cy="30" r="5" fill="#EF4444" />
          <circle cx="50" cy="20" r="5" fill="#EF4444" />
          <circle cx="90" cy="30" r="5" fill="#EF4444" />
        </svg>
      );
    case "جزر":
      return (
        <svg viewBox="0 0 100 100" {...props}>
          <polygon points="50,90 30,30 70,30" fill="#F97316" stroke="#C2410C" strokeWidth="2" strokeLinejoin="round" />
          <path d="M40 30 Q50 10 60 30" fill="none" stroke="#22C55E" strokeWidth="6" strokeLinecap="round" />
          <path d="M45 40 L55 45" fill="none" stroke="#C2410C" strokeWidth="2" />
          <path d="M42 55 L52 60" fill="none" stroke="#C2410C" strokeWidth="2" />
          <path d="M46 70 L54 75" fill="none" stroke="#C2410C" strokeWidth="2" />
        </svg>
      );
    case "ثعلب":
      return (
        <svg viewBox="0 0 100 100" {...props}>
          <polygon points="50,70 10,20 30,20" fill="#EA580C" stroke="#9A3412" strokeWidth="2" />
          <polygon points="50,70 90,20 70,20" fill="#EA580C" stroke="#9A3412" strokeWidth="2" />
          <polygon points="20,30 80,30 50,80" fill="#F97316" stroke="#C2410C" strokeWidth="2" strokeLinejoin="round" />
          <polygon points="35,50 65,50 50,80" fill="#FFFFFF" />
          <circle cx="35" cy="45" r="4" fill="#1F2937" />
          <circle cx="65" cy="45" r="4" fill="#1F2937" />
          <circle cx="50" cy="75" r="5" fill="#1F2937" />
        </svg>
      );

    /* ─── افتراضي لباقي الكلمات التي لم نرسمها ──── */
    default:
      return (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-4xl">
          {fallbackImage || "📝"}
        </div>
      );
  }
}
