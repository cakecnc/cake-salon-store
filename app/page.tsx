"use client";

import { useState } from "react";

type Lang = "ko" | "en" | "ja" | "zh";
type Copy = typeof copy.ko;

const storeUrl = "https://smartstore.naver.com/cake";
const productUrls = {
  a4: `${storeUrl}/products/5838269156`,
  a3: `${storeUrl}/products/12030000093`,
  custom: `${storeUrl}/products/5874096848`,
  ix: `${storeUrl}/products/13069318849`,
  ts: `${storeUrl}/products/13069312018`,
};

const copy = {
  ko: {
    nav: ["제품", "활용", "사용법", "회사소개"], shop: "스마트스토어",
    kicker: "PREMIUM EDIBLE PRINTING", title: "상상한 디자인을,\n가장 맛있는 작품으로.",
    intro: "케익살롱의 아이싱시트와 식용 프린팅 솔루션으로 사진, 일러스트, 로고를 케이크 위에 선명하게 표현하세요.",
    primary: "판매 제품 보기", secondary: "맞춤 제작 상담", heroNote: "PET 필름에서 분리해 바로 사용하는 식용 이미지 시트",
    promises: [["18개월", "넉넉한 소비기한"], ["4.8 / 5", "아마존 평균 별점"], ["GLOBAL", "전 세계 수출"], ["080-664-7077", "제품·맞춤 상담"]],
    shopKicker: "SHOP BY NEED", shopTitle: "필요한 작업에 맞춰\n바로 선택하세요.", shopIntro: "케이크 제작자, 카페, 호텔, 브랜드 행사를 위한 케익살롱의 핵심 판매 제품군입니다.",
    products: [
      ["A4 아이싱시트 50팩", "대량 제작과 매장 운영을 위한 실용적인 대용량 구성", "A4 · 50 SHEETS", "a4"],
      ["A3 아이싱시트 25장", "큰 케이크와 넓은 이미지 작업을 위한 A3 규격", "A3 · 25 SHEETS", "a3"],
      ["9cm·10cm 맞춤 프린팅", "사진과 디자인을 원형으로 인쇄해 바로 올리는 맞춤 토퍼", "CUSTOM PRINT", "custom"],
      ["IX용 빈 카트리지 5개", "식용잉크 충전 작업을 위한 IX 전용 빈 카트리지 세트", "IX · 5 COLORS", "ix"],
      ["TS용 빈 카트리지 5개", "식용잉크 충전 작업을 위한 TS 전용 빈 카트리지 세트", "TS · 5 COLORS", "ts"],
      ["식용 프린팅 솔루션", "아이싱시트·식용잉크·프린터 소모품을 한곳에서", "TOTAL SOLUTION", "store"],
    ],
    view: "제품 자세히 보기", galleryKicker: "REAL APPLICATION", galleryTitle: "한 장의 이미지가\n케이크의 가치를 바꿉니다.",
    galleryIntro: "고전미술, 플로럴 패턴, 기념사진, 브랜드 로고까지. 색감과 디테일이 살아 있는 케익살롱의 표현력을 확인하세요.",
    galleryLabels: ["CLASSIC ART", "ROMANTIC PORTRAIT", "FLORAL DESIGN"],
    useKicker: "3 SIMPLE STEPS", useTitle: "인쇄하고, 분리하고,\n가볍게 올리세요.",
    steps: [["01", "디자인 준비", "사진·일러스트·로고를 원하는 크기로 준비합니다."], ["02", "필름에서 분리", "아이싱시트를 PET 필름에서 천천히 분리합니다."], ["03", "케이크 완성", "매끄러운 표면에 올려 손쉽게 마무리합니다."]],
    proKicker: "FOR PROFESSIONALS", proTitle: "카페·호텔·브랜드를 위한\n맞춤형 식용 콘텐츠.",
    proText: "신제품 론칭, VIP 행사, 시즌 메뉴와 기업 프로모션까지. 로고와 메시지가 담긴 식용 이미지를 브랜드 경험으로 연결합니다.", proCta: "B2B 맞춤 제작 문의",
    trust: [["FDA", "관련 등록 안내"], ["18 MONTHS", "소비기한"], ["4.8 RATING", "아마존 평균"], ["WORLDWIDE", "수출 판매"]],
    companyKicker: "C&C CORPORATION", companyTitle: "식용 프린팅의 가능성을\n세계 시장으로 확장합니다.",
    companyText: "주식회사 씨엔씨코퍼레이션은 케익살롱을 통해 아이싱시트 제조·유통과 식용 프린팅 솔루션을 제공하며, 국내 온라인 판매에서 글로벌 수출까지 사업을 확장하고 있습니다.",
    companyCta: "스마트스토어 방문", final: "오늘의 케이크를\n기억에 남는 작품으로.", finalText: "케익살롱의 제품과 맞춤 프린팅을 지금 만나보세요.", phone: "전화 상담 080-664-7077",
  },
  en: {
    nav: ["Products", "Inspiration", "How it works", "Company"], shop: "Smart Store",
    kicker: "PREMIUM EDIBLE PRINTING", title: "Turn any design into\na delicious work of art.",
    intro: "Bring photos, illustrations and logos to life on cakes with Cake Salon icing sheets and edible-printing solutions.",
    primary: "Shop products", secondary: "Custom order", heroNote: "Edible image sheets that peel cleanly from PET backing",
    promises: [["18 months", "Generous shelf life"], ["4.8 / 5", "Amazon average"], ["GLOBAL", "Worldwide export"], ["+82 80-664-7077", "Product support"]],
    shopKicker: "SHOP BY NEED", shopTitle: "Choose the right product\nfor every project.", shopIntro: "Core Cake Salon products for cake makers, cafés, hotels and branded events.",
    products: [["A4 Icing Sheets · 50", "A practical bulk pack for professional production", "A4 · 50 SHEETS", "a4"], ["A3 Icing Sheets · 25", "Large-format sheets for bigger cakes and artwork", "A3 · 25 SHEETS", "a3"], ["9cm·10cm Custom Prints", "Ready-to-place round edible photo toppers", "CUSTOM PRINT", "custom"], ["IX Empty Cartridges · 5", "Refillable IX cartridge set for edible ink", "IX · 5 COLORS", "ix"], ["TS Empty Cartridges · 5", "Refillable TS cartridge set for edible ink", "TS · 5 COLORS", "ts"], ["Edible Printing Solution", "Sheets, edible ink and printer supplies in one place", "TOTAL SOLUTION", "store"]],
    view: "View product", galleryKicker: "REAL APPLICATION", galleryTitle: "One printed image can\ntransform the whole cake.", galleryIntro: "Classic art, floral patterns, celebration photos and brand logos—see the color and detail Cake Salon can deliver.", galleryLabels: ["CLASSIC ART", "ROMANTIC PORTRAIT", "FLORAL DESIGN"],
    useKicker: "3 SIMPLE STEPS", useTitle: "Print, peel and\nsimply place.", steps: [["01", "Prepare your design", "Set your photo, illustration or logo to size."], ["02", "Peel from the film", "Gently release the sheet from its PET backing."], ["03", "Finish the cake", "Place it on a smooth surface and serve."]],
    proKicker: "FOR PROFESSIONALS", proTitle: "Edible brand content for\ncafés, hotels and events.", proText: "From launches and VIP events to seasonal menus and promotions, turn logos and messages into an edible brand experience.", proCta: "Ask about B2B orders",
    trust: [["FDA", "Registration guidance"], ["18 MONTHS", "Shelf life"], ["4.8 RATING", "Amazon average"], ["WORLDWIDE", "Export sales"]],
    companyKicker: "C&C CORPORATION", companyTitle: "Expanding edible printing\nto the global market.", companyText: "C&C Corporation manufactures and distributes icing sheets through Cake Salon, offering complete edible-printing solutions from Korean ecommerce to global export.", companyCta: "Visit Smart Store", final: "Turn today’s cake into\na lasting work of art.", finalText: "Discover Cake Salon products and custom edible printing.", phone: "Call +82 80-664-7077",
  },
  ja: {
    nav: ["商品", "活用例", "使い方", "会社紹介"], shop: "スマートストア",
    kicker: "PREMIUM EDIBLE PRINTING", title: "想像したデザインを、\nいちばん美味しい作品へ。", intro: "ケーキサロンのアイシングシートで写真・イラスト・ロゴを鮮やかに表現できます。", primary: "商品を見る", secondary: "オーダー相談", heroNote: "PETフィルムからはがして使う食用イメージシート",
    promises: [["18か月", "余裕のある賞味期間"], ["4.8 / 5", "Amazon平均評価"], ["GLOBAL", "世界へ輸出"], ["+82 80-664-7077", "商品相談"]],
    shopKicker: "SHOP BY NEED", shopTitle: "用途に合う商品を\nすぐに選べます。", shopIntro: "ケーキ制作者、カフェ、ホテル、ブランドイベント向けの商品です。",
    products: [["A4アイシングシート 50枚", "店舗運営と大量制作に便利な大容量", "A4 · 50 SHEETS", "a4"], ["A3アイシングシート 25枚", "大きなケーキと広いデザイン用", "A3 · 25 SHEETS", "a3"], ["9cm·10cmオーダープリント", "すぐに使える円形フォトトッパー", "CUSTOM PRINT", "custom"], ["IX用空カートリッジ 5個", "食用インク充填用IXセット", "IX · 5 COLORS", "ix"], ["TS用空カートリッジ 5個", "食用インク充填用TSセット", "TS · 5 COLORS", "ts"], ["食用プリントソリューション", "シート・インク・消耗品をまとめて", "TOTAL SOLUTION", "store"]],
    view: "商品を見る", galleryKicker: "REAL APPLICATION", galleryTitle: "一枚のイメージが\nケーキの価値を変えます。", galleryIntro: "クラシックアート、花柄、記念写真、ブランドロゴまで鮮やかに表現します。", galleryLabels: ["CLASSIC ART", "ROMANTIC PORTRAIT", "FLORAL DESIGN"],
    useKicker: "3 SIMPLE STEPS", useTitle: "プリントして、はがして、\nのせるだけ。", steps: [["01", "デザイン準備", "写真・イラスト・ロゴを準備します。"], ["02", "フィルムからはがす", "PETフィルムからゆっくりはがします。"], ["03", "ケーキ完成", "なめらかな表面にのせて仕上げます。"]],
    proKicker: "FOR PROFESSIONALS", proTitle: "カフェ・ホテル・ブランド向け\n食用コンテンツ。", proText: "新商品、VIPイベント、季節メニュー、企業プロモーションまで食用イメージでブランド体験を作ります。", proCta: "B2Bオーダー相談",
    trust: [["FDA", "関連登録案内"], ["18 MONTHS", "賞味期間"], ["4.8 RATING", "Amazon平均"], ["WORLDWIDE", "輸出販売"]],
    companyKicker: "C&C CORPORATION", companyTitle: "食用プリントの可能性を\n世界市場へ。", companyText: "C&C Corporationはケーキサロンを通じてアイシングシートと食用プリントソリューションを提供し、グローバル輸出へ事業を拡大しています。", companyCta: "ストアを見る", final: "今日のケーキを\n記憶に残る作品へ。", finalText: "ケーキサロンの商品とオーダープリントをご覧ください。", phone: "電話 +82 80-664-7077",
  },
  zh: {
    nav: ["产品", "应用", "使用方法", "公司介绍"], shop: "智能商店",
    kicker: "PREMIUM EDIBLE PRINTING", title: "将想象中的设计，\n变成美味的艺术品。", intro: "使用 Cake Salon 糖霜纸与可食用打印方案，将照片、插画和标志清晰呈现在蛋糕上。", primary: "浏览产品", secondary: "咨询定制", heroNote: "从PET底膜揭下即可使用的可食用图像纸",
    promises: [["18个月", "充足保质期"], ["4.8 / 5", "亚马逊平均评分"], ["GLOBAL", "出口全球"], ["+82 80-664-7077", "产品咨询"]],
    shopKicker: "SHOP BY NEED", shopTitle: "根据制作需求，\n快速选择产品。", shopIntro: "适合蛋糕师、咖啡馆、酒店和品牌活动的 Cake Salon 核心产品。",
    products: [["A4糖霜纸 50张", "适合批量制作与门店运营", "A4 · 50 SHEETS", "a4"], ["A3糖霜纸 25张", "适合大蛋糕与大幅图像", "A3 · 25 SHEETS", "a3"], ["9cm·10cm定制打印", "揭下即可使用的圆形照片装饰", "CUSTOM PRINT", "custom"], ["IX空墨盒 5个", "可填充食用墨水的IX套装", "IX · 5 COLORS", "ix"], ["TS空墨盒 5个", "可填充食用墨水的TS套装", "TS · 5 COLORS", "ts"], ["可食用打印方案", "糖霜纸、食用墨水与打印耗材", "TOTAL SOLUTION", "store"]],
    view: "查看产品", galleryKicker: "REAL APPLICATION", galleryTitle: "一张图像，\n改变蛋糕的价值。", galleryIntro: "从古典艺术、花卉图案到照片和品牌标志，展现清晰色彩与细节。", galleryLabels: ["CLASSIC ART", "ROMANTIC PORTRAIT", "FLORAL DESIGN"],
    useKicker: "3 SIMPLE STEPS", useTitle: "打印、揭下、\n轻轻放上。", steps: [["01", "准备设计", "准备照片、插画或品牌标志。"], ["02", "揭下底膜", "从PET底膜上慢慢揭下。"], ["03", "完成蛋糕", "放在平滑表面即可完成。"]],
    proKicker: "FOR PROFESSIONALS", proTitle: "为咖啡馆、酒店与品牌\n打造可食用内容。", proText: "从新品发布、VIP活动到季节菜单和企业推广，让标志与信息成为可品尝的品牌体验。", proCta: "咨询B2B定制",
    trust: [["FDA", "相关注册说明"], ["18 MONTHS", "保质期"], ["4.8 RATING", "亚马逊平均"], ["WORLDWIDE", "出口销售"]],
    companyKicker: "C&C CORPORATION", companyTitle: "将可食用打印的可能性\n拓展至全球市场。", companyText: "C&C Corporation 通过 Cake Salon 提供糖霜纸制造、销售与完整的可食用打印方案，并持续拓展全球出口。", companyCta: "访问商店", final: "让今天的蛋糕\n成为难忘的艺术品。", finalText: "立即了解 Cake Salon 产品与定制打印。", phone: "电话 +82 80-664-7077",
  },
};

const artForProduct = ["sheet", "sheet wide", "custom", "cartridge ix", "cartridge ts", "solution"];
const productImage = ["/cake-floral.jpeg", "/cake-portrait.jpeg", "/cake-renaissance.jpeg"];
const Lines = ({ children }: { children: string }) => <>{children.split("\n").map((line, index) => <span key={`${line}-${index}`}>{line}{index === 0 && <br />}</span>)}</>;
const Arrow = () => <span aria-hidden="true">↗</span>;

export default function Home() {
  const [lang, setLang] = useState<Lang>("ko");
  const t: Copy = copy[lang];
  const productLink = (key: string) => key === "store" ? storeUrl : productUrls[key as keyof typeof productUrls];

  return <main lang={lang}>
    <header className="site-header">
      <a className="wordmark" href="#top" aria-label="Cake Salon home"><b>CAKE</b><i>SALON</i></a>
      <nav aria-label="Main navigation">{t.nav.map((item, index) => <a key={item} href={["#products", "#gallery", "#how", "#company"][index]}>{item}</a>)}</nav>
      <div className="header-tools">
        <label><span className="sr-only">Language</span><select aria-label="Language" value={lang} onChange={(event) => setLang(event.target.value as Lang)}><option value="ko">KR</option><option value="en">EN</option><option value="ja">JP</option><option value="zh">CN</option></select></label>
        <a className="header-shop" href={storeUrl} target="_blank" rel="noreferrer">{t.shop} <Arrow /></a>
      </div>
    </header>

    <section className="hero" id="top">
      <img className="hero-photo" src="/cake-renaissance.jpeg" alt="케익살롱 클래식 아트 아이싱시트를 케이크에 올리는 모습" />
      <div className="hero-shade" />
      <div className="hero-copy">
        <p className="kicker light-kicker">{t.kicker}</p>
        <h1><Lines>{t.title}</Lines></h1>
        <p className="hero-intro">{t.intro}</p>
        <div className="hero-actions"><a className="button button-light" href="#products">{t.primary} <Arrow /></a><a className="text-action light-action" href="tel:0806647077">{t.secondary}</a></div>
      </div>
      <div className="hero-caption"><span>01</span><p>{t.heroNote}</p></div>
    </section>

    <section className="promise-bar" aria-label="Product highlights">{t.promises.map(([value, label]) => <div key={value}><b>{value}</b><span>{label}</span></div>)}</section>

    <section className="shop-section" id="products">
      <div className="section-heading"><div><p className="kicker">{t.shopKicker}</p><h2><Lines>{t.shopTitle}</Lines></h2></div><p className="section-intro">{t.shopIntro}</p></div>
      <div className="product-grid">{t.products.map((product, index) => <article className={`product-card card-${index + 1}`} key={product[0]}>
        <a className="product-art" href={productLink(product[3])} target="_blank" rel="noreferrer">
          {index < 3 ? <img src={productImage[index]} alt="" /> : <div className={artForProduct[index]} aria-hidden="true">{index === 3 || index === 4 ? <><i /><i /><i /><i /><i /></> : <><i /><b>CAKE<br />SALON</b></>}</div>}
          <span className="product-index">0{index + 1}</span><small>{product[2]}</small>
        </a>
        <div className="product-copy"><h3>{product[0]}</h3><p>{product[1]}</p><a href={productLink(product[3])} target="_blank" rel="noreferrer">{t.view} <Arrow /></a></div>
      </article>)}</div>
    </section>

    <section className="gallery-section" id="gallery">
      <div className="gallery-copy"><p className="kicker light-kicker">{t.galleryKicker}</p><h2><Lines>{t.galleryTitle}</Lines></h2><p>{t.galleryIntro}</p></div>
      <div className="gallery-grid">{productImage.map((src, index) => <figure key={src} className={`gallery-item gallery-${index + 1}`}><img src={src} alt={`케익살롱 아이싱시트 활용 예시 ${index + 1}`} /><figcaption><span>0{index + 1}</span>{t.galleryLabels[index]}</figcaption></figure>)}</div>
    </section>

    <section className="how-section" id="how">
      <div className="how-title"><p className="kicker">{t.useKicker}</p><h2><Lines>{t.useTitle}</Lines></h2></div>
      <ol>{t.steps.map(([number, title, description]) => <li key={number}><span>{number}</span><div><h3>{title}</h3><p>{description}</p></div></li>)}</ol>
    </section>

    <section className="pro-section">
      <div className="pro-image"><img src="/cake-portrait.jpeg" alt="케익살롱 맞춤 아이싱시트 적용 케이크" /><span>CAKE SALON · BUSINESS</span></div>
      <div className="pro-copy"><p className="kicker">{t.proKicker}</p><h2><Lines>{t.proTitle}</Lines></h2><p>{t.proText}</p><a className="button button-dark" href="tel:0806647077">{t.proCta} <Arrow /></a></div>
    </section>

    <section className="trust-grid">{t.trust.map(([value, label]) => <div key={value}><b>{value}</b><span>{label}</span></div>)}</section>

    <section className="company-section" id="company">
      <div className="company-copy"><p className="kicker">{t.companyKicker}</p><h2><Lines>{t.companyTitle}</Lines></h2><p>{t.companyText}</p><a className="text-action" href={storeUrl} target="_blank" rel="noreferrer">{t.companyCta} <Arrow /></a></div>
      <div className="company-logo"><img src="/cnc-logo.jpeg" alt="주식회사 씨엔씨코퍼레이션 C&C Corporation 로고" /></div>
    </section>

    <section className="final-section">
      <img src="/cake-floral.jpeg" alt="플로럴 아이싱시트 케이크" />
      <div className="final-shade" /><div className="final-copy"><p className="kicker light-kicker">CAKE SALON</p><h2><Lines>{t.final}</Lines></h2><p>{t.finalText}</p><a className="button button-light" href={storeUrl} target="_blank" rel="noreferrer">{t.primary} <Arrow /></a><a className="final-phone" href="tel:0806647077">{t.phone}</a></div>
    </section>

    <footer><a className="wordmark footer-mark" href="#top"><b>CAKE</b><i>SALON</i></a><p>© 2026 C&amp;C CORPORATION · SEOUL, KOREA</p><a href={storeUrl} target="_blank" rel="noreferrer">SMARTSTORE <Arrow /></a></footer>
  </main>;
}
