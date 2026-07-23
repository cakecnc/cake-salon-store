import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./guide.css";
import "./redesign.css";

const siteUrl = "https://cakesalon.kr";
const icingSheetUrl = "https://smartstore.naver.com/cake/products/237929418";
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "케익살롱 식용 아이싱시트 | 포토케이크 맞춤 프린팅", template: "%s | 케익살롱" },
  description: "케익살롱 식용 아이싱시트 A4 25장과 사진·로고 맞춤 프린팅 서비스. 식용 프린터로 만드는 포토케이크, 케이크 데코, 카페·기업용 식용 이미지 제작 상담.",
  keywords: [
    "케익살롱", "케이크살롱", "식용 아이싱시트", "A4 아이싱시트", "아이싱시트 25장",
    "식용종이", "식용 이미지", "식용 프린팅", "식용 프린터 용지", "포토케이크",
    "포토케이크 재료", "케이크 프린팅", "케이크 이미지 출력", "케이크 사진 인쇄",
    "맞춤 아이싱시트", "맞춤 케이크 프린팅", "로고 케이크", "카페 로고 토퍼",
    "커피 식용 토퍼", "음료 식용 이미지", "축하 메시지 토퍼", "카페 맞춤 토퍼",
    "칵테일 식용 토퍼", "칵테일 로고 장식", "호텔 칵테일 이벤트", "웨딩 칵테일 토퍼",
    "캔디 식용 이미지", "롤리팝 식용 프린팅", "로고 캔디", "맞춤 사탕", "기업 캔디 제작",
    "쿠키 식용 이미지", "포토 쿠키", "로고 쿠키", "답례품 쿠키", "맞춤 쿠키 프린팅",
    "마카롱 식용 이미지", "로고 마카롱", "맞춤 마카롱", "웨딩 마카롱", "기업 선물 마카롱",
    "붕어빵 케이크", "붕어빵 케익", "과일 케이크", "과일 아이싱시트", "시즌 케이크 디자인",
    "edible icing sheet", "edible image sheet", "edible cake printing", "custom cake printing",
    "アイシングシート", "食用プリント", "食用糖霜纸", "蛋糕食用打印"
  ],
  alternates: { canonical: "/" },
  authors: [{ name: "C&C Corporation", url: siteUrl }], creator: "C&C Corporation", publisher: "C&C Corporation", category: "식용 아이싱시트·케이크 데코",
  openGraph: { type: "website", locale: "ko_KR", alternateLocale: ["en_US", "ja_JP", "zh_CN"], url: siteUrl, siteName: "Cake Salon 케익살롱", title: "케익살롱 식용 아이싱시트 | 포토케이크 맞춤 프린팅", description: "A4 식용 아이싱시트 25장과 사진·로고 맞춤 프린팅. 포토케이크와 케이크 데코를 위한 식용 이미지 솔루션.", images: [{ url: "/cake-renaissance.jpeg", width: 1536, height: 864, alt: "케익살롱 식용 아이싱시트를 적용한 포토케이크" }] },
  twitter: { card: "summary_large_image", title: "Cake Salon Edible Icing Sheet", description: "Edible icing sheets and custom cake printing by Cake Salon.", images: ["/cake-renaissance.jpeg"] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  other: {
    "geo.region": "KR-41",
    "geo.placename": "Bucheon-si, Gyeonggi-do",
    "content-language": "ko, en, ja, zh-CN",
  },
};

const structuredData = { "@context": "https://schema.org", "@graph": [
  { "@type": "Organization", "@id": `${siteUrl}/#organization`, name: "C&C Corporation", alternateName: ["Cake Salon", "케익살롱"], url: siteUrl, email: "cakecnc@daum.net", telephone: "+82-80-664-7077", logo: `${siteUrl}/cnc-logo.jpeg`, sameAs: ["https://smartstore.naver.com/cake"] },
  { "@type": "WebSite", "@id": `${siteUrl}/#website`, url: siteUrl, name: "Cake Salon", alternateName: ["케익살롱", "케이크살롱"], inLanguage: ["ko", "en", "ja", "zh-CN"], publisher: { "@id": `${siteUrl}/#organization` } },
  { "@type": "WebPage", "@id": `${siteUrl}/#webpage`, url: siteUrl, name: "케익살롱 식용 아이싱시트와 맞춤 프린팅", description: "포토케이크용 식용 아이싱시트와 맞춤 식용 이미지 프린팅 안내", isPartOf: { "@id": `${siteUrl}/#website` }, about: { "@id": `${siteUrl}/#product` }, inLanguage: ["ko", "en", "ja", "zh-CN"] },
  { "@type": "Product", "@id": `${siteUrl}/#product`, name: "케익살롱 A4 식용 아이싱시트 25장", alternateName: ["Cake Salon Edible Icing Sheet A4 25 Sheets", "케익살롱 아이싱시트 1팩"], description: "식용 프린터로 사진과 이미지를 출력해 포토케이크와 디저트 장식에 사용하는 A4 식용 아이싱시트 25장 구성", image: `${siteUrl}/cake-salon-a4-25.png`, category: "식용 아이싱시트", brand: { "@type": "Brand", name: "Cake Salon" }, sku: "237929418", url: icingSheetUrl, offers: { "@type": "Offer", url: icingSheetUrl, priceCurrency: "KRW", price: "40000", availability: "https://schema.org/InStock", itemCondition: "https://schema.org/NewCondition", seller: { "@id": `${siteUrl}/#organization` } } },
  { "@type": "Service", name: "Custom Edible Cake Printing", alternateName: "맞춤 식용 프린팅 서비스", serviceType: "Custom edible image printing", provider: { "@id": `${siteUrl}/#organization` }, url: `${siteUrl}/#contact` },
] };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ko"><body className={`${geistSans.variable} ${geistMono.variable} antialiased`}><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />{children}</body></html>;
}
