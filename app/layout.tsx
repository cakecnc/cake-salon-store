import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./guide.css";

const siteUrl = "https://cake-salon-store.cakecnc.chatgpt.site";
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "케익살롱 | 식용 아이싱시트 1팩·맞춤 프린팅", template: "%s | 케익살롱" },
  description: "케익살롱 식용 아이싱시트 1팩과 사진·로고 맞춤 프린팅 서비스. 포토케이크와 케이크 데코를 위한 프리미엄 식용 이미지 솔루션입니다.",
  keywords: ["케익살롱", "케이크살롱", "식용 아이싱시트", "아이싱시트 1팩", "식용 프린팅", "케이크 프린팅", "포토케이크", "케이크 이미지", "맞춤 케이크", "edible icing sheet", "edible cake printing", "custom cake printing", "アイシングシート", "食用糖霜纸"],
  alternates: { canonical: "/" },
  authors: [{ name: "C&C Corporation" }], creator: "C&C Corporation", publisher: "C&C Corporation", category: "Food & Bakery Supplies",
  openGraph: { type: "website", locale: "ko_KR", alternateLocale: ["en_US", "ja_JP", "zh_CN"], url: siteUrl, siteName: "Cake Salon", title: "케익살롱 | 식용 아이싱시트와 맞춤 프린팅", description: "사진과 로고를 케이크 위에 선명하게. 아이싱시트 1팩과 맞춤 식용 프린팅 서비스.", images: [{ url: "/cake-renaissance.jpeg", width: 1536, height: 864, alt: "Cake Salon edible icing sheet cake" }] },
  twitter: { card: "summary_large_image", title: "Cake Salon Edible Icing Sheet", description: "Edible icing sheets and custom cake printing by Cake Salon.", images: ["/cake-renaissance.jpeg"] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  other: { "codex-preview": "development" },
};

const structuredData = { "@context": "https://schema.org", "@graph": [
  { "@type": "Organization", "@id": `${siteUrl}/#organization`, name: "C&C Corporation", alternateName: "Cake Salon", url: siteUrl, email: "cakecnc@daum.net", telephone: "+82-80-664-7077" },
  { "@type": "WebSite", "@id": `${siteUrl}/#website`, url: siteUrl, name: "Cake Salon", alternateName: ["케익살롱", "케이크살롱"], inLanguage: ["ko", "en", "ja", "zh-CN"], publisher: { "@id": `${siteUrl}/#organization` } },
  { "@type": "Product", name: "Cake Salon Edible Icing Sheet · 1 Pack", alternateName: "케익살롱 아이싱시트 1팩", category: "Edible icing sheet", brand: { "@type": "Brand", name: "Cake Salon" }, url: `${siteUrl}/#products` },
  { "@type": "Service", name: "Custom Edible Cake Printing", alternateName: "맞춤 식용 프린팅 서비스", serviceType: "Custom edible image printing", provider: { "@id": `${siteUrl}/#organization` }, url: `${siteUrl}/#contact` },
] };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ko"><body className={`${geistSans.variable} ${geistMono.variable} antialiased`}><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />{children}</body></html>;
}
