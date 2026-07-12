import type { Metadata } from "next";
import Script from "next/script";
import { Amiri, Inter } from "next/font/google";
import "./globals.css";
import UpdateChecker from "@/components/UpdateChecker";

const amiri = Amiri({ subsets: ["arabic"], weight: ["400", "700"], variable: "--font-amiri" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "حروفي الأولى - تعليم الحروف العربية للأطفال",
  description: "كتاب رقمي تفاعلي لتعليم الحروف العربية للأطفال بمنهج مونتي سوري. أنشطة تفاعلية، أنشيدة، وألوان ممتعة للأطفال من 3 إلى 6 سنوات.",
  keywords: ["تعليم الحروف العربية", "ألف باء", "تعلم القراءة", "أطفال", "مونتي سوري", "تطبيق تعليمي"],
  manifest: "/manifest.json",
  appleWebApp: { capable: true, statusBarStyle: "default", title: "حروفي الأولى" },
  other: { "apple-mobile-web-app-capable": "yes" },
  icons: {
    icon: "/icons/icon.svg",
    apple: "/icons/icon.svg",
  },
  openGraph: {
    title: "حروفي الأولى - تعليم الحروف العربية للأطفال",
    description: "كتاب رقمي تفاعلي لتعليم الحروف العربية للأطفال بمنهج مونتي سوري",
    type: "website",
    locale: "ar_SA",
    siteName: "حروفي الأولى",
  },
  twitter: {
    card: "summary_large_image",
    title: "حروفي الأولى - تعليم الحروف العربية للأطفال",
    description: "كتاب رقمي تفاعلي لتعليم الحروف العربية للأطفال بمنهج مونتي سوري",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`h-full antialiased ${amiri.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#7C3AED" />
        <link rel="icon" type="image/svg+xml" href="/icons/icon.svg" />
        <link rel="apple-touch-icon" href="/icons/icon.svg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "حروفي الأولى",
              description: "كتاب رقمي تفاعلي لتعليم الحروف العربية للأطفال بمنهج مونتي سوري",
              applicationCategory: "EducationalApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "SAR",
              },
              audience: {
                "@type": "Audience",
                audienceType: "Children",
                suggestedMinAge: 3,
                suggestedMaxAge: 6,
              },
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-amiri bg-gradient-to-bl from-amber-50 to-orange-50 text-neutral-800">
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            var theme = localStorage.getItem('theme');
            if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
              document.documentElement.classList.add('dark');
            }
          })();
        `}} />
        {children}
        <UpdateChecker />
        <Script
          strategy="afterInteractive"
          src="/sw-register.js"
        />
      </body>
    </html>
  );
}
