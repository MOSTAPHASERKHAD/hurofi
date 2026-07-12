import LetterPage from "@/components/book/LetterPage";
import type { LetterContent } from "@/types/content";

const importers: Record<number, () => Promise<{ default: LetterContent }>> = {};

for (let i = 1; i <= 28; i++) {
  const padded = String(i).padStart(2, "0");
  const names: Record<number, string> = {
    1: "alif", 2: "baa", 3: "taa", 4: "thaa", 5: "jeem",
    6: "haa", 7: "khaa", 8: "daal", 9: "dhal", 10: "raa",
    11: "zay", 12: "seen", 13: "sheen", 14: "saad", 15: "daad",
    16: "taa_emph", 17: "thaa_emph", 18: "ain", 19: "ghain", 20: "faa",
    21: "qaaf", 22: "kaaf", 23: "laam", 24: "meem", 25: "nun",
    26: "haa_end", 27: "waw", 28: "yaa",
  };
  const path = `@/content/letters/${padded}-${names[i]}.json`;
  importers[i] = () => import(path) as Promise<{ default: LetterContent }>;
}
export function generateStaticParams() {
  return Array.from({ length: 28 }, (_, i) => ({
    id: String(i + 1),
  }));
}

export default async function LetterDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const letterId = parseInt(id);

  if (letterId < 1 || letterId > 28) {
    return <div className="text-center py-20 font-inter">الحرف غير موجود</div>;
  }

  const mod = await importers[letterId]();
  const data: LetterContent = mod.default;

  return <LetterPage data={data} letterId={letterId} />;
}
