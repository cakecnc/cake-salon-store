"use client";

import { useState } from "react";

type Lang = "ko" | "en" | "ja" | "zh";
type Copy = typeof copy.ko;

const storeUrl = "https://smartstore.naver.com/cake";
const productUrls = {
  a4: "https://smartstore.naver.com/cake/products/237929418",
  a3: `${storeUrl}/products/12030000093`,
  custom: `${storeUrl}/products/568462601`,
};

const copy = {
  ko: {
    nav: ["제품", "활용", "사용법", "회사소개", "맞춤디자인", "CONTACT"], shop: "스마트스토어",
    kicker: "PREMIUM EDIBLE PRINTING", title: "상상한 디자인을,\n가장 맛있는 작품으로.",
    intro: "케익살롱의 아이싱시트와 식용 프린팅 솔루션으로 사진, 일러스트, 로고를 케이크 위에 선명하게 표현하세요.",
    primary: "판매 제품 보기", secondary: "맞춤 제작 상담", heroNote: "PET 필름에서 분리해 바로 사용하는 식용 이미지 시트",
    promises: [["18개월", "넉넉한 소비기한"], ["4.8 / 5", "아마존 평균 별점"], ["GLOBAL", "전 세계 수출"], ["080-664-7077", "제품·맞춤 상담"]],
    shopKicker: "TWO SIGNATURE OFFERS", shopTitle: "필요한 두 가지를\n명확하게 선택하세요.", shopIntro: "아이싱시트 1팩과 맞춤 프린팅 서비스, 케익살롱의 대표 상품만 간결하게 안내합니다.",
    products: [
      ["A4 아이싱시트 1팩", "가정·소량 제작에 필요한 만큼 사용하는 식용 아이싱시트", "A4 · 25 SHEETS", "a4"],
      ["맞춤 프린팅 서비스", "원형 지름 35mm·55mm 컷팅 가능, 그 외 규격은 지그 제작 상담", "CUSTOM PRINT", "custom"],
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
    companyCta: "스마트스토어 방문", final: "오늘의 케이크를\n기억에 남는 작품으로.", finalText: "케익살롱의 제품과 맞춤 프린팅을 지금 만나보세요.", phone: "전화 상담 080-664-7077", email: "이메일 문의 cakecnc@daum.net",
    editorialNote: "셰익스피어가 일깨워 주듯, “What’s past is prologue.” 이러한 취지에서 본 문서의 일부는 AI 보조 자료를 참고하여 작성되었습니다. 본 저작물에 관한 모든 권리, 라이선스 및 편집 책임은 저자인 Sungjae Lim, Director of Planning에게 있습니다.",
  },
  en: {
    nav: ["Products", "Inspiration", "How it works", "Company", "Custom Design", "CONTACT"], shop: "Smart Store",
    kicker: "PREMIUM EDIBLE PRINTING", title: "Turn any design into\na delicious work of art.",
    intro: "Bring photos, illustrations and logos to life on cakes with Cake Salon icing sheets and edible-printing solutions.",
    primary: "Shop products", secondary: "Custom order", heroNote: "Edible image sheets that peel cleanly from PET backing",
    promises: [["18 months", "Generous shelf life"], ["4.8 / 5", "Amazon average"], ["GLOBAL", "Worldwide export"], ["+82 80-664-7077", "Product support"]],
    shopKicker: "TWO SIGNATURE OFFERS", shopTitle: "Two clear choices\nfor your cake project.", shopIntro: "Explore Cake Salon’s two signature offers: a single pack of icing sheets and custom edible printing.",
    products: [["A4 Icing Sheet · 1 Pack", "A practical single pack for home bakers and small-batch projects", "A4 · 25 SHEETS", "a4"], ["Custom Printing Service", "Round cutting is available in 35 mm and 55 mm; other sizes require a custom jig consultation", "CUSTOM PRINT", "custom"]],
    view: "View product", galleryKicker: "REAL APPLICATION", galleryTitle: "One printed image can\ntransform the whole cake.", galleryIntro: "Classic art, floral patterns, celebration photos and brand logos—see the color and detail Cake Salon can deliver.", galleryLabels: ["CLASSIC ART", "ROMANTIC PORTRAIT", "FLORAL DESIGN"],
    useKicker: "3 SIMPLE STEPS", useTitle: "Print, peel and\nsimply place.", steps: [["01", "Prepare your design", "Set your photo, illustration or logo to size."], ["02", "Peel from the film", "Gently release the sheet from its PET backing."], ["03", "Finish the cake", "Place it on a smooth surface and serve."]],
    proKicker: "FOR PROFESSIONALS", proTitle: "Edible brand content for\ncafés, hotels and events.", proText: "From launches and VIP events to seasonal menus and promotions, turn logos and messages into an edible brand experience.", proCta: "Ask about B2B orders",
    trust: [["FDA", "Registration guidance"], ["18 MONTHS", "Shelf life"], ["4.8 RATING", "Amazon average"], ["WORLDWIDE", "Export sales"]],
    companyKicker: "C&C CORPORATION", companyTitle: "Expanding edible printing\nto the global market.", companyText: "C&C Corporation manufactures and distributes icing sheets through Cake Salon, offering complete edible-printing solutions from Korean ecommerce to global export.", companyCta: "Visit Smart Store", final: "Turn today’s cake into\na lasting work of art.", finalText: "Discover Cake Salon products and custom edible printing.", phone: "Call +82 80-664-7077", email: "Email cakecnc@daum.net",
    editorialNote: "As Shakespeare reminds us, “What’s past is prologue.” In that spirit, certain portions of this document have been prepared with reference to AI-assisted materials. All rights, licenses, and editorial responsibility pertaining to this work are retained by its author, Sungjae Lim, Director of Planning.",
  },
  ja: {
    nav: ["商品", "活用例", "使い方", "会社紹介", "オーダーデザイン", "CONTACT"], shop: "スマートストア",
    kicker: "PREMIUM EDIBLE PRINTING", title: "想像したデザインを、\nいちばん美味しい作品へ。", intro: "ケーキサロンのアイシングシートで写真・イラスト・ロゴを鮮やかに表現できます。", primary: "商品を見る", secondary: "オーダー相談", heroNote: "PETフィルムからはがして使う食用イメージシート",
    promises: [["18か月", "余裕のある賞味期間"], ["4.8 / 5", "Amazon平均評価"], ["GLOBAL", "世界へ輸出"], ["+82 80-664-7077", "商品相談"]],
    shopKicker: "TWO SIGNATURE OFFERS", shopTitle: "必要な二つを\n分かりやすく選択。", shopIntro: "アイシングシート1パックとオーダープリントサービスのみをご案内します。",
    products: [["A4アイシングシート 1パック", "ホームベーキングや少量制作に便利な1パック", "A4 · 25 SHEETS", "a4"], ["オーダープリントサービス", "円形は直径35mm・55mmをカット可能。その他は治具制作のご相談が必要です", "CUSTOM PRINT", "custom"]],
    view: "商品を見る", galleryKicker: "REAL APPLICATION", galleryTitle: "一枚のイメージが\nケーキの価値を変えます。", galleryIntro: "クラシックアート、花柄、記念写真、ブランドロゴまで鮮やかに表現します。", galleryLabels: ["CLASSIC ART", "ROMANTIC PORTRAIT", "FLORAL DESIGN"],
    useKicker: "3 SIMPLE STEPS", useTitle: "プリントして、はがして、\nのせるだけ。", steps: [["01", "デザイン準備", "写真・イラスト・ロゴを準備します。"], ["02", "フィルムからはがす", "PETフィルムからゆっくりはがします。"], ["03", "ケーキ完成", "なめらかな表面にのせて仕上げます。"]],
    proKicker: "FOR PROFESSIONALS", proTitle: "カフェ・ホテル・ブランド向け\n食用コンテンツ。", proText: "新商品、VIPイベント、季節メニュー、企業プロモーションまで食用イメージでブランド体験を作ります。", proCta: "B2Bオーダー相談",
    trust: [["FDA", "関連登録案内"], ["18 MONTHS", "賞味期間"], ["4.8 RATING", "Amazon平均"], ["WORLDWIDE", "輸出販売"]],
    companyKicker: "C&C CORPORATION", companyTitle: "食用プリントの可能性を\n世界市場へ。", companyText: "C&C Corporationはケーキサロンを通じてアイシングシートと食用プリントソリューションを提供し、グローバル輸出へ事業を拡大しています。", companyCta: "ストアを見る", final: "今日のケーキを\n記憶に残る作品へ。", finalText: "ケーキサロンの商品とオーダープリントをご覧ください。", phone: "電話 +82 80-664-7077", email: "メール cakecnc@daum.net",
    editorialNote: "シェイクスピアが示したように、“What’s past is prologue.” その趣旨に基づき、本書の一部はAI支援資料を参考に作成されています。本書に関するすべての権利、ライセンスおよび編集責任は、著者 Sungjae Lim, Director of Planning に帰属します。",
  },
  zh: {
    nav: ["产品", "应用", "使用方法", "公司介绍", "定制设计", "CONTACT"], shop: "智能商店",
    kicker: "PREMIUM EDIBLE PRINTING", title: "将想象中的设计，\n变成美味的艺术品。", intro: "使用 Cake Salon 糖霜纸与可食用打印方案，将照片、插画和标志清晰呈现在蛋糕上。", primary: "浏览产品", secondary: "咨询定制", heroNote: "从PET底膜揭下即可使用的可食用图像纸",
    promises: [["18个月", "充足保质期"], ["4.8 / 5", "亚马逊平均评分"], ["GLOBAL", "出口全球"], ["+82 80-664-7077", "产品咨询"]],
    shopKicker: "TWO SIGNATURE OFFERS", shopTitle: "两项代表服务，\n选择更简单。", shopIntro: "仅展示单包装糖霜纸与定制可食用打印服务。",
    products: [["A4糖霜纸 1包装", "适合家庭烘焙与小批量制作的单包装", "A4 · 25 SHEETS", "a4"], ["定制打印服务", "目前可裁切直径35mm、55mm圆形；其他尺寸需咨询定制治具", "CUSTOM PRINT", "custom"]],
    view: "查看产品", galleryKicker: "REAL APPLICATION", galleryTitle: "一张图像，\n改变蛋糕的价值。", galleryIntro: "从古典艺术、花卉图案到照片和品牌标志，展现清晰色彩与细节。", galleryLabels: ["CLASSIC ART", "ROMANTIC PORTRAIT", "FLORAL DESIGN"],
    useKicker: "3 SIMPLE STEPS", useTitle: "打印、揭下、\n轻轻放上。", steps: [["01", "准备设计", "准备照片、插画或品牌标志。"], ["02", "揭下底膜", "从PET底膜上慢慢揭下。"], ["03", "完成蛋糕", "放在平滑表面即可完成。"]],
    proKicker: "FOR PROFESSIONALS", proTitle: "为咖啡馆、酒店与品牌\n打造可食用内容。", proText: "从新品发布、VIP活动到季节菜单和企业推广，让标志与信息成为可品尝的品牌体验。", proCta: "咨询B2B定制",
    trust: [["FDA", "相关注册说明"], ["18 MONTHS", "保质期"], ["4.8 RATING", "亚马逊平均"], ["WORLDWIDE", "出口销售"]],
    companyKicker: "C&C CORPORATION", companyTitle: "将可食用打印的可能性\n拓展至全球市场。", companyText: "C&C Corporation 通过 Cake Salon 提供糖霜纸制造、销售与完整的可食用打印方案，并持续拓展全球出口。", companyCta: "访问商店", final: "让今天的蛋糕\n成为难忘的艺术品。", finalText: "立即了解 Cake Salon 产品与定制打印。", phone: "电话 +82 80-664-7077", email: "邮箱 cakecnc@daum.net",
    editorialNote: "正如莎士比亚所言：“What’s past is prologue.” 秉持这一精神，本文部分内容参考了AI辅助资料编写。与本作品相关的所有权利、许可及编辑责任均归作者 Sungjae Lim, Director of Planning 所有。",
  },
};

const productImage = ["/cake-floral.jpeg", "/cake-portrait.jpeg", "/cake-renaissance.jpeg"];
const productCardImage = ["/cake-salon-a4-25.png", "/cake-portrait.jpeg"];
const guideCopy = {
  ko: { kicker: "OFFICIAL PRODUCT GUIDE", title: "실제 판매 자료로\n제품을 더 자세히 확인하세요.", intro: "제품 특징, 규격, 사용법과 보관법을 케익살롱 공식 이미지로 확인할 수 있습니다.", translationNote: "현재 선택한 언어에 맞춘 제품 안내 이미지입니다.", labels: ["제품 전체 안내", "프리미엄 품질", "규격과 추천 구성", "3단계 사용법", "출력·박리·장식", "구매 전 FAQ", "아이싱시트 리뉴얼 V.10"], open: "크게 보기", close: "닫기", translatedHeading: "제품 주요 안내", originalNote: "제품 표시와 인증 정보는 실제 제품 라벨 및 최신 판매 안내를 기준으로 확인해 주세요.", cafeKicker: "CAFÉ & HOTEL", cafeTitle: "커피와 음료 위에도\n브랜드를 선명하게.", cafeText: "로고와 메시지를 담은 식용 토퍼로 카페 시그니처 메뉴, 호텔 행사와 브랜드 프로모션을 완성하세요." },
  en: { kicker: "OFFICIAL PRODUCT GUIDE", title: "Explore the product through\nofficial sales materials.", intro: "Review product features, sizes, use and storage in Cake Salon’s official visual guide.", translationNote: "This product guide is presented in your selected language.", labels: ["Complete guide", "Premium quality", "Sizes & recommendations", "Three-step use", "Print, peel & place", "FAQ", "Icing Sheet Renewal V.10"], open: "Enlarge", close: "Close", translatedHeading: "Product Highlights", originalNote: "For labeling and compliance details, refer to the current product packaging and official sales information.", cafeKicker: "CAFÉ & HOTEL", cafeTitle: "Put your brand on\ncoffee and drinks, too.", cafeText: "Create signature café menus, hotel events and brand promotions with custom edible logo toppers." },
  ja: { kicker: "OFFICIAL PRODUCT GUIDE", title: "公式販売資料で\n商品を詳しく確認。", intro: "商品の特徴、サイズ、使い方、保管方法を公式画像で確認できます。", translationNote: "選択した言語に合わせた商品案内画像です。", labels: ["商品総合案内", "プレミアム品質", "サイズとおすすめ", "3ステップ使用法", "印刷・はがす・飾る", "よくある質問", "アイシングシート V.10"], open: "拡大表示", close: "閉じる", translatedHeading: "商品のポイント", originalNote: "表示・認証に関する詳細は、最新の商品ラベルおよび公式販売情報をご確認ください。", cafeKicker: "CAFÉ & HOTEL", cafeTitle: "コーヒーやドリンクにも\nブランドを鮮やかに。", cafeText: "食用ロゴトッパーでカフェのシグネチャーメニュー、ホテルイベント、ブランドプロモーションを演出します。" },
  zh: { kicker: "OFFICIAL PRODUCT GUIDE", title: "通过官方销售资料\n详细了解产品。", intro: "通过官方图片查看产品特点、规格、使用方法和储存方式。", translationNote: "此产品指南已按您选择的语言显示。", labels: ["完整产品指南", "优质品质", "规格与推荐", "三步使用方法", "打印、揭下、装饰", "常见问题", "糖霜纸 V.10"], open: "放大查看", close: "关闭", translatedHeading: "产品亮点", originalNote: "产品标识和认证信息请以最新包装及官方销售资料为准。", cafeKicker: "CAFÉ & HOTEL", cafeTitle: "让咖啡和饮品也能\n清晰呈现品牌。", cafeText: "使用定制可食用标志装饰，打造咖啡馆招牌菜单、酒店活动与品牌推广。" },
};

const guideDetails: Record<Lang, Array<{ title: string; summary: string; bullets: string[] }>> = {
  ko: [
    { title: "식용 아이싱시트 전체 안내", summary: "케이크와 디저트에 사진, 로고, 일러스트를 선명하게 표현하는 식용 이미지 시트입니다.", bullets: ["식품 용도 원료를 사용한 식용 이미지 시트", "고해상도 출력, 부드러운 식감, 간편한 커팅과 박리", "케이크, 쿠키, 초콜릿, 마시멜로 등 다양한 디저트에 활용", "A4 210×297mm, A3 297×420mm 및 별도 규격 상담", "제조일로부터 소비기한 18개월, 밀봉 보관"] },
    { title: "프리미엄 식용 아이싱시트", summary: "선명한 출력과 안정적인 작업성을 고려해 제조한 케익살롱의 대표 제품입니다.", bullets: ["식용 인증 원료와 식용 잉크 사용", "디테일한 이미지 표현과 부드러운 식감", "케이크, 쿠키, 마카롱 등 다양한 디저트에 활용", "로고·사진·문구 맞춤 제작 및 대량 주문 상담"] },
    { title: "제품 규격과 추천 구성", summary: "작업 환경과 사용 목적에 맞춰 A4, A3 또는 맞춤 규격을 선택할 수 있습니다.", bullets: ["제품명: 케익살롱 식용 아이싱시트", "A4 210×297mm / A3 297×420mm", "현재 컷팅 가능 원형: 지름 35mm / 55mm", "그 외 규격은 지그 제작이 필요하므로 별도 문의", "제조일로부터 소비기한 18개월"] },
    { title: "출력부터 장식까지 3단계", summary: "식용 프린터로 출력한 뒤 원하는 모양으로 잘라 케이크에 올리면 완성됩니다.", bullets: ["1. 식용 프린터와 식용 잉크로 이미지 출력", "2. 원하는 모양으로 자른 뒤 PET 필름에서 천천히 분리", "3. 케이크의 매끄러운 표면에 가볍게 밀착", "작업 전 손을 깨끗이 씻고 충분히 건조"] },
    { title: "필름 분리와 케이크 부착", summary: "필요한 만큼만 꺼내 출력하고, 필름을 천천히 분리해 케이크에 부착합니다.", bullets: ["출력면이 손상되지 않도록 시트 가장자리를 잡기", "PET 보호 필름에서 천천히 분리하기", "케이크 표면의 과도한 수분을 정리한 뒤 부착", "남은 시트는 즉시 밀봉해 보관"] },
    { title: "구매 전 자주 묻는 질문", summary: "프린터, 보관, 소비기한과 맞춤 주문에 대한 핵심 안내입니다.", bullets: ["일반 프린터가 아닌 식용 프린터와 식용 잉크를 사용", "직사광선과 고온다습한 곳을 피하고 개봉 후 밀봉", "소비기한은 제조일로부터 18개월", "케이크 표면의 과도한 수분을 정리한 뒤 부착", "맞춤 제작과 대량 주문 상담 가능"] },
    { title: "아이싱시트 리뉴얼 V.10", summary: "기포 발생을 줄이고 출력 품질과 작업성을 개선하도록 설계한 버전입니다.", bullets: ["기포와 필름 분리를 줄이기 위한 이중 가공 구조", "실제 제품 두께 0.40mm", "셀룰로오스 유래 식품 원료 HPMC 함유", "일반적인 계절 환경에서 일관된 작업성을 고려한 설계", "부드러운 식감과 편리한 커팅·박리"] },
  ],
  en: [
    { title: "Complete Edible Icing Sheet Guide", summary: "An edible image sheet for reproducing photos, logos and illustrations clearly on cakes and desserts.", bullets: ["Made with ingredients intended for food use", "Designed for detailed edible printing and easy peel-and-place application", "Suitable for cakes, cookies, chocolate, marshmallows and other desserts", "A4 210×297mm, A3 297×420mm and custom sizes available", "Use-by period: 18 months from manufacture; keep sealed"] },
    { title: "Premium Edible Icing Sheets", summary: "Cake Salon’s signature sheet is designed for vivid printing and reliable handling.", bullets: ["Use with food-grade edible ink", "Fine image detail and a soft eating texture", "Suitable for cakes, cookies, macarons and other desserts", "Custom logos, photos and messages; bulk orders available"] },
    { title: "Sizes and Recommended Options", summary: "Choose A4, A3 or a custom size according to your workflow and application.", bullets: ["Product: Cake Salon Edible Icing Sheet", "A4 210×297mm / A3 297×420mm", "Round cutting currently available: 35 mm / 55 mm diameter", "Other sizes require a custom jig; please inquire", "Shelf life: 18 months from the date of manufacture"] },
    { title: "Three Simple Steps", summary: "Print, cut and peel the sheet, then place it on the cake.", bullets: ["1. Print the image with an edible-ink printer", "2. Cut to shape and peel slowly from the PET backing", "3. Place gently on a smooth cake surface", "Wash and dry hands thoroughly before handling"] },
    { title: "Peel and Apply", summary: "Remove only the sheet you need, print it, peel the backing slowly and apply it to the cake.", bullets: ["Hold the sheet by the edges to protect the printed surface", "Release it slowly from the PET backing", "Remove excess moisture from the cake surface before applying", "Reseal unused sheets immediately"] },
    { title: "Frequently Asked Questions", summary: "Key guidance on printers, storage, shelf life and custom orders.", bullets: ["Do not use a standard printer; use an edible-ink printer and edible ink", "Keep away from direct sunlight, heat and humidity; reseal after opening", "Shelf life is 18 months from the date of manufacture", "Remove excess surface moisture before applying", "Custom production and bulk orders are available"] },
    { title: "Icing Sheet Renewal V.10", summary: "Updated to improve print quality and handling while helping reduce bubbling.", bullets: ["Dual-processing structure designed to reduce bubbling and backing separation", "Actual product thickness: 0.40 mm", "Contains HPMC, a cellulose-derived food ingredient", "Designed for more consistent handling under normal seasonal conditions", "Cut, peel and place using edible-printing equipment and ink"] },
  ],
  ja: [
    { title: "食用アイシングシート 総合ガイド", summary: "写真・ロゴ・イラストをケーキやデザートに鮮明に表現できる食用イメージシートです。", bullets: ["食品用途の原料を使用", "鮮明な食用プリントと、はがして載せる作業に適したシート", "ケーキ、クッキー、チョコレート、マシュマロなどに使用可能", "A4 210×297mm、A3 297×420mm、別注サイズに対応", "消費期限は製造日から18か月。密封して保管"] },
    { title: "プレミアム食用アイシングシート", summary: "鮮明な印刷と安定した作業性を考慮したケーキサロンの主力商品です。", bullets: ["食品用原料と食用インクを使用", "細部まで鮮明な表現とやわらかな食感", "ケーキ、クッキー、マカロンなどに使用可能", "ロゴ・写真・文字のオーダー制作と大量注文に対応"] },
    { title: "サイズと推奨構成", summary: "作業環境と用途に合わせてA4、A3、別注サイズから選べます。", bullets: ["商品名：ケーキサロン 食用アイシングシート", "A4 210×297mm / A3 297×420mm", "現在カット可能な円形：直径35mm / 55mm", "その他の規格は治具制作が必要なため要相談", "保存期間：製造日から18か月"] },
    { title: "3ステップの使い方", summary: "食用プリンターで印刷し、カットしてからケーキにのせるだけです。", bullets: ["1. 食用インク専用プリンターで画像を印刷", "2. 好きな形に切り、PETフィルムからゆっくりはがす", "3. なめらかなケーキ表面に軽く密着", "作業前に手を洗い、十分に乾かす"] },
    { title: "フィルムからはがして貼り付ける", summary: "必要な分だけ取り出して印刷し、保護フィルムからゆっくりはがして貼り付けます。", bullets: ["印刷面を傷つけないよう端を持つ", "PET保護フィルムからゆっくりはがす", "ケーキ表面の余分な水分を取り除いてから貼る", "残ったシートはすぐに密封して保管"] },
    { title: "購入前のよくある質問", summary: "プリンター、保管、保存期間、オーダーに関する基本案内です。", bullets: ["一般プリンターではなく、食用インク専用プリンターを使用", "直射日光と高温多湿を避け、開封後は密封", "保存期間は製造日から18か月", "ケーキ表面の余分な水分を取り除いてから貼り付け", "別注制作・大量注文の相談が可能"] },
    { title: "アイシングシート リニューアル V.10", summary: "気泡を抑え、印刷品質と作業性を改善するよう設計されています。", bullets: ["気泡や台紙のはがれを抑えるための二重加工構造", "実製品の厚さ：0.40mm", "セルロース由来の食品原料HPMCを配合", "通常の季節環境でも扱いやすいよう設計", "食品印刷専用機器と食用インクを使用"] },
  ],
  zh: [
    { title: "可食用糖霜纸完整指南", summary: "可将照片、标志和插画清晰呈现在蛋糕与甜点上的可食用图像纸。", bullets: ["采用食品用途原料制成", "适用于清晰的可食用图像打印，易于揭膜并贴附", "可用于蛋糕、饼干、巧克力、棉花糖等甜点", "提供A4 210×297mm、A3 297×420mm及定制尺寸", "保质期为自生产之日起18个月，请密封保存"] },
    { title: "优质可食用糖霜纸", summary: "Cake Salon 的核心产品，兼顾鲜明打印效果与稳定操作性。", bullets: ["搭配食品级可食用墨水使用", "细节清晰，口感柔软", "适用于蛋糕、曲奇、马卡龙等甜点", "支持标志、照片和文字定制及批量订购"] },
    { title: "规格与推荐选择", summary: "可根据工作环境和用途选择A4、A3或定制尺寸。", bullets: ["产品名称：Cake Salon 可食用糖霜纸", "A4 210×297mm / A3 297×420mm", "目前可裁切圆形：直径35mm / 55mm", "其他规格需制作治具，请另行咨询", "保质期：自生产之日起18个月"] },
    { title: "三步完成装饰", summary: "打印、裁切并揭膜后，轻轻放在蛋糕表面即可。", bullets: ["1. 使用食用墨水专用打印机打印图像", "2. 裁成所需形状，再从PET底膜上慢慢揭下", "3. 轻轻贴合在平整的蛋糕表面", "操作前请洗净双手并充分擦干"] },
    { title: "揭膜并贴合蛋糕", summary: "只取出所需糖霜纸，打印后慢慢揭下底膜，再贴到蛋糕上。", bullets: ["握住纸张边缘，避免损伤打印表面", "从PET保护膜上缓慢揭下", "贴合前先去除蛋糕表面多余水分", "未使用的糖霜纸应立即重新密封"] },
    { title: "购买前常见问题", summary: "关于打印机、储存、保质期和定制订单的核心说明。", bullets: ["不可使用普通打印机；请使用食用墨水专用打印机", "避免阳光直射、高温和潮湿，开封后请密封", "保质期为自生产之日起18个月", "贴合前请先去除蛋糕表面多余水分", "支持定制生产和批量订购"] },
    { title: "糖霜纸升级版 V.10", summary: "采用旨在减少起泡并改善打印质量和操作性的升级设计。", bullets: ["双重加工结构旨在减少气泡及与底膜分离", "实际产品厚度：0.40mm", "配方含有纤维素来源的食品原料HPMC", "设计上更适应一般季节环境下的使用", "请使用食品打印专用设备和食用墨水"] },
  ],
};

const imageAlts: Record<Lang, { hero: string; gallery: string[]; how: string; coffee: string; logo: string; final: string }> = {
  ko: { hero: "클래식 아트 아이싱시트를 케이크에 올리는 모습", gallery: ["플로럴 아이싱시트 케이크", "인물화 아이싱시트 케이크", "고전 미술 아이싱시트 케이크"], how: "아이싱시트 출력, 박리, 케이크 장식 과정", coffee: "커피 위에 적용한 식용 로고 토퍼", logo: "주식회사 씨엔씨코퍼레이션 로고", final: "플로럴 아이싱시트 케이크" },
  en: { hero: "Placing a classic-art edible icing sheet on a cake", gallery: ["Cake with a floral edible icing sheet", "Cake with a portrait edible icing sheet", "Cake with a classic-art edible icing sheet"], how: "Printing, peeling and applying an edible icing sheet", coffee: "Edible logo topper floating on coffee", logo: "C&C Corporation logo", final: "Cake decorated with a floral edible icing sheet" },
  ja: { hero: "クラシックアートの食用アイシングシートをケーキにのせる様子", gallery: ["花柄の食用アイシングシートケーキ", "人物画の食用アイシングシートケーキ", "クラシックアートの食用アイシングシートケーキ"], how: "食用アイシングシートの印刷・はがし・飾り付け工程", coffee: "コーヒーに浮かべた食用ロゴトッパー", logo: "C&C Corporation ロゴ", final: "花柄の食用アイシングシートケーキ" },
  zh: { hero: "将古典艺术可食用糖霜纸放在蛋糕上", gallery: ["花卉图案可食用糖霜纸蛋糕", "人物画可食用糖霜纸蛋糕", "古典艺术可食用糖霜纸蛋糕"], how: "打印、揭膜并装饰可食用糖霜纸的过程", coffee: "漂浮在咖啡上的可食用标志装饰", logo: "C&C Corporation 公司标志", final: "花卉图案可食用糖霜纸蛋糕" },
};
const conversionCopy: Record<Lang, {
  purchase: string; inquiry: string; currentPrice: string; specs: string; order: string;
  productMeta: Array<[string, string, string]>; guideNote: string; proofKicker: string; proofTitle: string; proofText: string;
}> = {
  ko: { purchase: "네이버 스마트스토어에서 구매하기", inquiry: "1:1 맞춤 제작 문의", currentPrice: "판매가", specs: "구성·규격", order: "주문 조건", productMeta: [["40,000원", "A4 · 25장 구성", "최소 주문 1팩"], ["6,840원부터", "원형 지름 35mm · 55mm 컷팅", "그 외 규격은 지그 제작 문의"]], guideNote: "제품 특징과 규격, 사용법을 한눈에 확인하세요.", proofKicker: "VERIFIED PROOF", proofTitle: "확인 가능한 정보와\n실제 적용 사례만 담았습니다.", proofText: "케익살롱이 제공한 공식 제품 정보와 실제 제작 이미지를 기준으로 구성했습니다. 확인되지 않은 후기나 제휴사는 표시하지 않습니다. 판매가는 스마트스토어 옵션과 행사에 따라 변경될 수 있습니다." },
  en: { purchase: "Buy on Naver Smart Store", inquiry: "Request a Custom Quote", currentPrice: "Price", specs: "Pack & size", order: "Order terms", productMeta: [["KRW 40,000", "A4 · 25 sheets", "Minimum order: 1 pack"], ["From KRW 6,840", "Round cutting · 35 mm / 55 mm", "Other sizes require a custom jig inquiry"]], guideNote: "Review product features, sizes and directions at a glance.", proofKicker: "VERIFIED PROOF", proofTitle: "Only verified facts and\nreal applications.", proofText: "This section uses official Cake Salon product information and supplied production images. Prices may change depending on Smart Store options and promotions." },
  ja: { purchase: "NAVERスマートストアで購入", inquiry: "1:1オーダー相談", currentPrice: "販売価格", specs: "構成・サイズ", order: "注文条件", productMeta: [["40,000ウォン", "A4 · 25枚", "最小注文：1パック"], ["6,840ウォン〜", "円形カット · 直径35mm / 55mm", "その他は治具制作について要相談"]], guideNote: "商品の特徴、サイズ、使い方をひと目で確認できます。", proofKicker: "VERIFIED PROOF", proofTitle: "確認できる情報と\n実際の制作例だけを掲載。", proofText: "公式商品情報と実際の制作画像を使用しています。価格はストアのオプションやキャンペーンにより変更される場合があります。" },
  zh: { purchase: "前往NAVER智能商店购买", inquiry: "1对1定制咨询", currentPrice: "售价", specs: "包装与规格", order: "订购条件", productMeta: [["40,000韩元", "A4 · 25张", "最低订购：1包装"], ["6,840韩元起", "圆形裁切 · 直径35mm / 55mm", "其他尺寸需咨询定制治具"]], guideNote: "产品特点、规格和使用方法一目了然。", proofKicker: "VERIFIED PROOF", proofTitle: "仅展示可核实信息与\n真实应用案例。", proofText: "内容基于官方产品资料和真实制作图片。价格可能因商店选项和促销活动而变化。" },
};
const certificationCopy: Record<Lang, {
  title: string;
  note: string;
  open: string;
  items: Array<[string, string]>;
}> = {
  ko: {
    title: "인증·등록 자료",
    note: "원본 문서를 간단히 확인할 수 있습니다.",
    open: "원본 PDF 보기",
    items: [
      ["FDA", "FDA 등록"],
      ["ISO", "ISO 22000 등록"],
    ],
  },
  en: {
    title: "Registration documents",
    note: "Open the original documents for reference.",
    open: "View original PDF",
    items: [
      ["FDA", "FDA Registration"],
      ["ISO", "ISO 22000 Registration"],
    ],
  },
  ja: {
    title: "登録資料",
    note: "原本資料を簡単に確認できます。",
    open: "原本PDFを見る",
    items: [
      ["FDA", "FDA登録"],
      ["ISO", "ISO 22000登録"],
    ],
  },
  zh: {
    title: "注册资料",
    note: "可快速查看原始文件。",
    open: "查看原始PDF",
    items: [
      ["FDA", "FDA注册"],
      ["ISO", "ISO 22000注册"],
    ],
  },
};
const coffeeMoments: Record<Lang, { kicker: string; title: string; intro: string; labels: string[]; alts: string[] }> = {
  ko: { kicker: "EDIBLE MESSAGE MOMENTS", title: "커피 한 잔에\n마음을 전하세요.", intro: "사랑, 축하, 감사의 메시지를 식용 이미지 토퍼에 담아 특별한 순간을 완성합니다.", labels: ["사랑을 전하는 순간", "축하를 전하는 순간", "감사를 전하는 순간"], alts: ["I LOVE YOU 식용 토퍼를 올린 라테", "CONGRATS 식용 토퍼를 올린 카푸치노", "THANK YOU 식용 토퍼를 올린 라테"] },
  en: { kicker: "EDIBLE MESSAGE MOMENTS", title: "Put a meaningful message\non every cup.", intro: "Turn love, congratulations and gratitude into memorable café moments with custom edible image toppers.", labels: ["A moment of love", "A moment to celebrate", "A moment of gratitude"], alts: ["Latte with an I LOVE YOU edible topper", "Cappuccino with a CONGRATS edible topper", "Latte with a THANK YOU edible topper"] },
  ja: { kicker: "EDIBLE MESSAGE MOMENTS", title: "一杯のコーヒーに\n想いを添えて。", intro: "愛、祝福、感謝のメッセージを食用イメージトッパーにして、特別な時間を演出します。", labels: ["愛を伝える瞬間", "祝福を伝える瞬間", "感謝を伝える瞬間"], alts: ["I LOVE YOU食用トッパーをのせたラテ", "CONGRATS食用トッパーをのせたカプチーノ", "THANK YOU食用トッパーをのせたラテ"] },
  zh: { kicker: "EDIBLE MESSAGE MOMENTS", title: "在一杯咖啡上\n传递心意。", intro: "将爱、祝贺与感谢印在可食用图像装饰上，创造值得纪念的咖啡时刻。", labels: ["表达爱意", "送上祝贺", "传递感谢"], alts: ["放有I LOVE YOU可食用装饰的拿铁", "放有CONGRATS可食用装饰的卡布奇诺", "放有THANK YOU可食用装饰的拿铁"] },
};
const coffeeImages = ["/coffee-i-love-you.png", "/coffee-congrats.png", "/coffee-thank-you.png"];
const cocktailMoments: Record<Lang, { kicker: string; title: string; intro: string; labels: string[]; alts: string[] }> = {
  ko: { kicker: "COCKTAIL CELEBRATION", title: "한 잔의 칵테일을\n행사의 주인공으로.", intro: "선명한 색의 칵테일과 맞춤 식용 메시지 토퍼를 결합해 파티, 기념일, 호텔 이벤트에 기억에 남는 장면을 만듭니다.", labels: ["건배와 파티", "특별한 축하", "기념일과 웨딩"], alts: ["CHEERS 식용 토퍼를 올린 루비 레드 칵테일", "CELEBRATE 식용 토퍼를 올린 블루 바이올렛 칵테일", "ANNIVERSARY 식용 토퍼를 올린 에메랄드 로즈 칵테일"] },
  en: { kicker: "COCKTAIL CELEBRATION", title: "Make every cocktail\nthe center of the occasion.", intro: "Pair vibrant cocktails with custom edible message toppers for parties, anniversaries, hotel events and memorable brand moments.", labels: ["Cheers & parties", "A special celebration", "Anniversaries & weddings"], alts: ["Ruby-red cocktail with a CHEERS edible topper", "Blue-violet cocktail with a CELEBRATE edible topper", "Emerald and rose cocktail with an ANNIVERSARY edible topper"] },
  ja: { kicker: "COCKTAIL CELEBRATION", title: "一杯のカクテルを\nイベントの主役に。", intro: "鮮やかなカクテルと食用メッセージトッパーで、パーティー、記念日、ホテルイベントを印象的に演出します。", labels: ["乾杯とパーティー", "特別なお祝い", "記念日とウェディング"], alts: ["CHEERS食用トッパーをのせたルビーレッドカクテル", "CELEBRATE食用トッパーをのせたブルーバイオレットカクテル", "ANNIVERSARY食用トッパーをのせたエメラルドローズカクテル"] },
  zh: { kicker: "COCKTAIL CELEBRATION", title: "让一杯鸡尾酒\n成为活动主角。", intro: "以缤纷鸡尾酒搭配定制可食用信息装饰，为派对、纪念日、酒店活动和品牌场景留下难忘画面。", labels: ["举杯与派对", "特别的祝贺", "纪念日与婚礼"], alts: ["放有CHEERS可食用装饰的宝石红鸡尾酒", "放有CELEBRATE可食用装饰的蓝紫色鸡尾酒", "放有ANNIVERSARY可食用装饰的祖母绿玫红鸡尾酒"] },
};
const cocktailImages = ["/cocktail-cheers.png", "/cocktail-celebrate.png", "/cocktail-anniversary.png"];
const candyMoments: Record<Lang, { kicker: string; title: string; intro: string; labels: string[]; alts: string[] }> = {
  ko: { kicker: "EDIBLE CANDY ART", title: "투명한 캔디 안에\n브랜드와 마음을 담으세요.", intro: "로고, 축하 문구, 감사 메시지를 식용 이미지로 제작해 롤리팝을 프로모션과 선물의 주인공으로 완성합니다.", labels: ["사랑을 담은 선물", "행사와 브랜드 프로모션", "감사를 전하는 답례품"], alts: ["루비 오렌지 LOVE 식용 이미지 롤리팝", "블루 바이올렛 CELEBRATE 식용 이미지 롤리팝", "에메랄드 로즈 THANK YOU 식용 이미지 롤리팝"] },
  en: { kicker: "EDIBLE CANDY ART", title: "Put a message and identity\ninside clear candy.", intro: "Turn logos, celebration notes and gratitude into edible images that make lollipops memorable gifts and promotional pieces.", labels: ["A gift made with love", "Events & brand promotions", "Thoughtful thank-you favors"], alts: ["Ruby-orange LOVE edible image lollipops", "Blue-violet CELEBRATE edible image lollipops", "Emerald-rose THANK YOU edible image lollipops"] },
  ja: { kicker: "EDIBLE CANDY ART", title: "透明なキャンディに\nブランドと想いを。", intro: "ロゴやお祝い、感謝のメッセージを食用イメージにして、ロリポップを印象的なギフトやプロモーションに仕上げます。", labels: ["愛を込めたギフト", "イベントとブランド販促", "感謝を伝えるプチギフト"], alts: ["ルビーオレンジのLOVE食用イメージロリポップ", "ブルーバイオレットのCELEBRATE食用イメージロリポップ", "エメラルドローズのTHANK YOU食用イメージロリポップ"] },
  zh: { kicker: "EDIBLE CANDY ART", title: "把品牌与心意\n放进透明糖果。", intro: "将标志、庆祝语和感谢信息制作成可食用图像，让棒棒糖成为令人难忘的礼物与推广载体。", labels: ["充满爱意的礼物", "活动与品牌推广", "表达感谢的回礼"], alts: ["宝石红橙色LOVE可食用图像棒棒糖", "蓝紫色CELEBRATE可食用图像棒棒糖", "祖母绿玫红THANK YOU可食用图像棒棒糖"] },
};
const candyImages = ["/candy-love.png", "/candy-celebrate.png", "/candy-thank-you.png"];
const cottonCandyCaseCopy: Record<Lang, {
  kicker: string;
  title: string;
  intro: string;
  recordLabel: string;
  recordTitle: string;
  recordMeta: string;
  exampleLabel: string;
  exampleTitle: string;
  exampleText: string;
  examples: Array<[string, string, string, string]>;
  rightsNote: string;
}> = {
  ko: {
    kicker: "COTTON CANDY APPLICATION",
    title: "솜사탕에도\n맞춤 식용 스티커를.",
    intro: "실제 제작 이력은 글자로 명확하게 안내하고, 시각 자료는 특정 캐릭터나 포장 디자인을 사용하지 않은 오리지널 동물 얼굴 솜사탕 3종으로 구성했습니다.",
    recordLabel: "실제 제작 이력",
    recordTitle: "빵빵이 솜사탕용 스티커 제작",
    recordMeta: "식용 스티커 인쇄·가공 · C&C Corporation",
    exampleLabel: "재구성 활용 예시",
    exampleTitle: "대형 동물 얼굴 솜사탕 3종",
    exampleText: "눈·코·입을 얇은 식용 아이싱시트로 표현한 토끼·곰·고양이 오리지널 연출 이미지입니다.",
    examples: [
      ["BUNNY FACE", "토끼 얼굴 솜사탕", "루비 핑크와 피치 솜사탕에 사랑스러운 눈·코·입을 더한 예제", "0.40mm 식용 아이싱시트 눈 코 입을 적용한 분홍색 대형 토끼 얼굴 솜사탕 활용 예시"],
      ["BEAR FACE", "곰 얼굴 솜사탕", "블루·바이올렛 솜사탕에 둥근 눈과 미소를 더한 예제", "0.40mm 식용 아이싱시트 눈 코 입을 적용한 블루 바이올렛 대형 곰 얼굴 솜사탕 활용 예시"],
      ["CAT FACE", "고양이 얼굴 솜사탕", "에메랄드 민트와 로즈 솜사탕에 눈·코·입과 수염을 더한 예제", "0.40mm 식용 아이싱시트 눈 코 입을 적용한 민트 로즈 대형 고양이 얼굴 솜사탕 활용 예시"],
    ],
    rightsNote: "‘빵빵이 솜사탕’은 실제 제작 대상을 식별하기 위한 텍스트 표기입니다. 관련 캐릭터와 제품명에 관한 권리는 각 권리자에게 있으며, 본 표기는 공식 제휴·후원을 의미하지 않습니다.",
  },
  en: {
    kicker: "COTTON CANDY APPLICATION",
    title: "Custom edible stickers\nfor cotton candy.",
    intro: "The verified production record is presented in text, while the visuals show three original animal-face cotton-candy concepts without protected characters or package designs.",
    recordLabel: "Production record",
    recordTitle: "Edible sticker production for “빵빵이 솜사탕”",
    recordMeta: "Edible sticker printing & finishing · C&C Corporation",
    exampleLabel: "Recreated application example",
    exampleTitle: "Three large animal-face cotton candies",
    exampleText: "Original bunny, bear and cat concepts with eyes, noses and mouths made from thin edible icing-sheet appliqués.",
    examples: [
      ["BUNNY FACE", "Bunny Cotton Candy", "Ruby-pink and peach cotton candy with a sweet edible face", "Large original pink bunny-face cotton candy with thin edible icing-sheet eyes, nose and mouth"],
      ["BEAR FACE", "Bear Cotton Candy", "Blue-violet cotton candy with round eyes and a friendly smile", "Large original blue-violet bear-face cotton candy with thin edible icing-sheet eyes, nose and mouth"],
      ["CAT FACE", "Cat Cotton Candy", "Emerald-mint and rose cotton candy with a playful edible face", "Large original mint-and-rose cat-face cotton candy with thin edible icing-sheet eyes, nose, mouth and whiskers"],
    ],
    rightsNote: "“빵빵이 솜사탕” appears only as text identifying an actual production subject. Related character and product-name rights belong to their respective owners; this reference does not imply official affiliation or sponsorship.",
  },
  ja: {
    kicker: "COTTON CANDY APPLICATION",
    title: "わたあめにも\nオーダー食用ステッカーを。",
    intro: "実際の制作実績は文字のみで案内し、ビジュアルは特定のキャラクターやパッケージを使用しないオリジナルの動物フェイスわたあめ3種です。",
    recordLabel: "実際の制作実績",
    recordTitle: "「빵빵이 솜사탕」用食用ステッカー制作",
    recordMeta: "食用ステッカー印刷・加工 · C&C Corporation",
    exampleLabel: "再構成した活用例",
    exampleTitle: "大型アニマルフェイスわたあめ3種",
    exampleText: "薄い食用アイシングシートで目・鼻・口を表現した、うさぎ・くま・ねこのオリジナル演出画像です。",
    examples: [
      ["BUNNY FACE", "うさぎフェイスわたあめ", "ルビーピンクとピーチのわたあめに可愛い目・鼻・口をプラス", "薄い食用アイシングシートの目・鼻・口を飾った大型ピンクうさぎフェイスわたあめの活用例"],
      ["BEAR FACE", "くまフェイスわたあめ", "ブルー・バイオレットのわたあめに丸い目と笑顔をプラス", "薄い食用アイシングシートの目・鼻・口を飾った大型ブルーバイオレットくまフェイスわたあめの活用例"],
      ["CAT FACE", "ねこフェイスわたあめ", "エメラルドミントとローズのわたあめに目・鼻・口とひげをプラス", "薄い食用アイシングシートの目・鼻・口・ひげを飾った大型ミントローズねこフェイスわたあめの活用例"],
    ],
    rightsNote: "「빵빵이 솜사탕」は実際の制作対象を特定するための文字表記です。関連するキャラクターおよび商品名の権利は各権利者に帰属し、公式な提携・協賛を示すものではありません。",
  },
  zh: {
    kicker: "COTTON CANDY APPLICATION",
    title: "为棉花糖增添\n定制可食用贴纸。",
    intro: "真实制作记录仅以文字说明，视觉内容采用不含特定角色或包装设计的三款原创动物脸棉花糖示意图。",
    recordLabel: "真实制作记录",
    recordTitle: "“빵빵이 솜사탕”可食用贴纸制作",
    recordMeta: "可食用贴纸印刷与加工 · C&C Corporation",
    exampleLabel: "重新构成的应用示例",
    exampleTitle: "三款大型动物脸棉花糖",
    exampleText: "以薄款可食用糖霜纸表现眼睛、鼻子和嘴巴的兔子、熊与猫原创示意图。",
    examples: [
      ["BUNNY FACE", "兔子脸棉花糖", "宝石粉与蜜桃色棉花糖搭配可爱的可食用五官", "使用薄款可食用糖霜纸眼睛鼻子嘴巴的大型粉色兔子脸棉花糖示例"],
      ["BEAR FACE", "熊脸棉花糖", "蓝紫色棉花糖搭配圆润眼睛和友善笑容", "使用薄款可食用糖霜纸眼睛鼻子嘴巴的大型蓝紫色熊脸棉花糖示例"],
      ["CAT FACE", "猫脸棉花糖", "祖母绿薄荷与玫瑰色棉花糖搭配眼鼻口和胡须", "使用薄款可食用糖霜纸眼睛鼻子嘴巴和胡须的大型薄荷玫瑰色猫脸棉花糖示例"],
    ],
    rightsNote: "“빵빵이 솜사탕”仅作为识别实际制作对象的文字说明。相关角色及产品名称权利归各权利人所有，本说明不代表官方合作或赞助。",
  },
};
const cottonFaceImages = ["/cotton-face-bunny.png", "/cotton-face-bear.png", "/cotton-face-cat.png"];
const petiteDesserts: Record<Lang, { cookieKicker: string; cookieTitle: string; cookieIntro: string; macaronKicker: string; macaronTitle: string; macaronIntro: string; cookieLabels: string[]; macaronLabels: string[]; cookieAlts: string[]; macaronAlts: string[] }> = {
  ko: { cookieKicker: "CUSTOM COOKIE MOMENTS", cookieTitle: "한 장의 이미지로\n쿠키에 이야기를 더하세요.", cookieIntro: "답례품, 시즌 행사, 기업 프로모션에 맞춘 식용 이미지를 쿠키 위에 선명하게 표현합니다.", macaronKicker: "MACARON COLLECTION", macaronTitle: "작고 섬세한 마카롱을\n특별한 메시지로 완성하세요.", macaronIntro: "실제 0.40mm의 얇은 아이싱시트가 마카롱 표면에 자연스럽게 밀착되어 웨딩, 기념일, 브랜드 선물을 섬세하게 완성합니다.", cookieLabels: ["사랑의 답례품", "축하 이벤트", "감사의 선물"], macaronLabels: ["기념일 컬렉션", "축하 컬렉션", "플로럴 기프트"], cookieAlts: ["루비 오렌지 LOVE 식용 이미지 쿠키", "블루 바이올렛 CELEBRATE 식용 이미지 쿠키", "에메랄드 로즈 THANK YOU 식용 이미지 쿠키"], macaronAlts: ["0.40mm의 얇은 아이싱시트를 올린 루비 오렌지 기념일 마카롱", "0.40mm의 얇은 아이싱시트를 올린 블루 바이올렛 축하 마카롱", "0.40mm의 얇은 아이싱시트를 올린 에메랄드 로즈 플로럴 마카롱"] },
  en: { cookieKicker: "CUSTOM COOKIE MOMENTS", cookieTitle: "Give every cookie\na story of its own.", cookieIntro: "Add crisp edible images to cookies for favors, seasonal events and brand promotions.", macaronKicker: "MACARON COLLECTION", macaronTitle: "Finish delicate macarons\nwith a meaningful message.", macaronIntro: "A paper-thin 0.40 mm icing sheet settles naturally onto each macaron for refined weddings, anniversaries and branded gifts.", cookieLabels: ["Love favors", "Celebration events", "Thank-you gifts"], macaronLabels: ["Anniversary collection", "Celebration collection", "Floral gift collection"], cookieAlts: ["Ruby-orange LOVE edible image cookies", "Blue-violet CELEBRATE edible image cookies", "Emerald-rose THANK YOU edible image cookies"], macaronAlts: ["Ruby-orange anniversary macarons with thin 0.40 mm icing sheets", "Blue-violet celebration macarons with thin 0.40 mm icing sheets", "Emerald-rose floral macarons with thin 0.40 mm icing sheets"] },
  ja: { cookieKicker: "CUSTOM COOKIE MOMENTS", cookieTitle: "一枚のイメージで\nクッキーに物語を。", cookieIntro: "プチギフト、季節イベント、企業プロモーションに合わせた食用イメージを鮮明に表現します。", macaronKicker: "MACARON COLLECTION", macaronTitle: "小さく繊細なマカロンを\n特別なメッセージで。", macaronIntro: "ウェディング、記念日、ブランドギフトに合う食用イメージで、ひと箱をより印象的に仕上げます。", cookieLabels: ["愛のプチギフト", "お祝いイベント", "感謝のギフト"], macaronLabels: ["記念日コレクション", "お祝いコレクション", "フローラルギフト"], cookieAlts: ["ルビーオレンジのLOVE食用イメージクッキー", "ブルーバイオレットのCELEBRATE食用イメージクッキー", "エメラルドローズのTHANK YOU食用イメージクッキー"], macaronAlts: ["ルビーオレンジの記念日食用イメージマカロン", "ブルーバイオレットのお祝い食用イメージマカロン", "エメラルドローズのフローラル食用イメージマカロン"] },
  zh: { cookieKicker: "CUSTOM COOKIE MOMENTS", cookieTitle: "用一张可食用图像\n为曲奇增添故事。", cookieIntro: "为回礼、季节活动与企业推广制作清晰精致的可食用曲奇图案。", macaronKicker: "MACARON COLLECTION", macaronTitle: "以特别的信息\n点亮精致马卡龙。", macaronIntro: "用定制可食用图像，让婚礼、纪念日和品牌礼盒更加令人难忘。", cookieLabels: ["爱意回礼", "庆祝活动", "感谢礼物"], macaronLabels: ["纪念日系列", "庆祝系列", "花卉礼盒"], cookieAlts: ["宝石红橙色LOVE可食用图像曲奇", "蓝紫色CELEBRATE可食用图像曲奇", "祖母绿玫红THANK YOU可食用图像曲奇"], macaronAlts: ["宝石红橙色纪念日可食用图像马卡龙", "蓝紫色庆祝可食用图像马卡龙", "祖母绿玫红花卉可食用图像马卡龙"] },
};
const cookieImages = ["/cookie-love.png", "/cookie-celebrate.png", "/cookie-thank-you.png"];
const macaronImages = ["/macaron-thin-anniversary.png", "/macaron-thin-celebrate.png", "/macaron-thin-floral.png"];
const ideaCollections: Record<Lang, { kicker: string; title: string; intro: string; action: string; items: Array<[string, string, string]> }> = {
  ko: { kicker: "CUSTOM PRODUCTION WORK ORDER", title: "맞춤 제작 작업지시서", intro: "사용 목적을 선택한 뒤 제작 대상, 규격, 수량, 납기와 디자인 파일을 순서대로 입력하세요. 입력 내용은 이메일 작업지시서로 정리됩니다.", action: "용도로 선택", items: [["WEDDING", "웨딩·기념일", "웨딩 케이크, 마카롱, 쿠키와 답례품"], ["BRAND", "기업·브랜드 행사", "로고, BI, 프로모션과 대량 제작"], ["CELEBRATION", "돌잔치·생일", "사진, 이름, 날짜가 들어간 기념 디자인"], ["PETIT DESSERT", "소형 디저트", "마카롱, 쿠키, 초콜릿과 컵케이크"], ["HOSPITALITY", "카페·호텔", "커피, 칵테일, 웰컴 디저트와 VIP 행사"], ["OTHER", "기타 맞춤 제작", "별도 용도와 규격을 작업 내용에 직접 입력"]] },
  en: { kicker: "CUSTOM PRODUCTION WORK ORDER", title: "Custom Production Work Order", intro: "Select the purpose, then specify the application, size, quantity, due date and design file. The details are formatted into an email work order.", action: "Select purpose", items: [["WEDDING", "Wedding & Anniversary", "Wedding cakes, macarons, cookies and favors"], ["BRAND", "Corporate & Brand Event", "Logos, brand identity, promotions and volume production"], ["CELEBRATION", "Birthday Celebration", "Commemorative designs with a photo, name and date"], ["PETIT DESSERT", "Petite Desserts", "Macarons, cookies, chocolates and cupcakes"], ["HOSPITALITY", "Café & Hotel", "Coffee, cocktails, welcome desserts and VIP events"], ["OTHER", "Other Custom Project", "Describe a separate application and specification in the brief"]] },
  ja: { kicker: "CUSTOM PRODUCTION WORK ORDER", title: "オーダー制作指示書", intro: "用途を選び、対象、サイズ、数量、納期、デザインファイルを順番に入力してください。メール用の制作指示書に整理されます。", action: "用途を選択", items: [["WEDDING", "ウェディング・記念日", "ケーキ、マカロン、クッキー、プチギフト"], ["BRAND", "企業・ブランドイベント", "ロゴ、BI、プロモーション、大量制作"], ["CELEBRATION", "誕生日・お祝い", "写真、名前、日付を入れた記念デザイン"], ["PETIT DESSERT", "小型デザート", "マカロン、クッキー、チョコレート、カップケーキ"], ["HOSPITALITY", "カフェ・ホテル", "コーヒー、カクテル、ウェルカムデザート、VIPイベント"], ["OTHER", "その他のオーダー", "用途と仕様を指示内容に直接入力"]] },
  zh: { kicker: "CUSTOM PRODUCTION WORK ORDER", title: "定制制作工作指示单", intro: "选择用途后，依次填写应用产品、尺寸、数量、交期和设计文件，系统将整理为邮件工作指示单。", action: "选择用途", items: [["WEDDING", "婚礼与纪念日", "蛋糕、马卡龙、曲奇与回礼"], ["BRAND", "企业与品牌活动", "标志、品牌识别、推广与批量制作"], ["CELEBRATION", "生日与庆祝", "包含照片、姓名和日期的纪念设计"], ["PETIT DESSERT", "小型甜点", "马卡龙、曲奇、巧克力与纸杯蛋糕"], ["HOSPITALITY", "咖啡馆与酒店", "咖啡、鸡尾酒、欢迎甜点与VIP活动"], ["OTHER", "其他定制制作", "在工作内容中直接填写用途与规格"]] },
};
const designFormCopy: Record<Lang, { title: string; intro: string; name: string; contact: string; product: string; size: string; sizeExample: string; quantity: string; due: string; details: string; file: string; fileHelp: string; submit: string; print: string; selected: string; steps: string[] }> = {
  ko: { title: "제작 정보를 입력하세요", intro: "필수 제작 조건을 작성하면 이메일에 작업지시서 형식으로 정리되고 프린팅 서비스 주문 페이지가 함께 열립니다.", name: "이름·회사명", contact: "연락처·이메일", product: "적용 제품·디저트", size: "완성 규격", sizeExample: "원형 35mm / 55mm · 그 외 규격은 지그 제작 문의", quantity: "수량", due: "희망 납기", details: "인쇄 문구·색상·커팅 형태·기타 요청", file: "사진·로고 파일 선택", fileHelp: "보안상 선택한 파일은 이메일 화면에서 직접 첨부해 주세요.", submit: "작업지시서 이메일 작성", print: "프린팅 서비스 바로가기", selected: "선택 용도", steps: ["용도 선택", "제작 정보", "파일 확인", "전송·주문"] },
  en: { title: "Enter production details", intro: "The required production details are formatted as an email work order, and the printing-service order page opens with it.", name: "Name / company", contact: "Phone / email", product: "Application / dessert", size: "Finished size", sizeExample: "Round 35 mm / 55 mm · inquire for a jig for other sizes", quantity: "Quantity", due: "Requested due date", details: "Print copy, colors, cut shape and other notes", file: "Choose photo or logo", fileHelp: "For security, attach the selected file directly in the email window.", submit: "Prepare work-order email", print: "Open printing service", selected: "Selected purpose", steps: ["Purpose", "Production details", "File check", "Send & order"] },
  ja: { title: "制作情報を入力", intro: "制作条件をメール用の指示書に整理し、プリントサービス注文ページも同時に開きます。", name: "お名前・会社名", contact: "電話・メール", product: "対象商品・デザート", size: "仕上がりサイズ", sizeExample: "円形35mm / 55mm・その他は治具制作について要相談", quantity: "数量", due: "希望納期", details: "印刷文字・色・カット形状・その他", file: "写真・ロゴを選択", fileHelp: "安全のため、選択したファイルはメール画面で直接添付してください。", submit: "指示書メールを作成", print: "プリントサービスへ", selected: "選択用途", steps: ["用途選択", "制作情報", "ファイル確認", "送信・注文"] },
  zh: { title: "填写制作信息", intro: "制作条件将整理为邮件工作指示单，并同时打开打印服务订购页面。", name: "姓名／公司", contact: "电话／邮箱", product: "应用产品／甜点", size: "成品尺寸", sizeExample: "圆形35mm / 55mm · 其他尺寸需咨询治具", quantity: "数量", due: "期望交期", details: "印刷文字、颜色、裁切形状及其他要求", file: "选择照片或标志", fileHelp: "为确保安全，请在邮件窗口中直接添加所选文件。", submit: "生成工作指示邮件", print: "前往打印服务", selected: "已选用途", steps: ["选择用途", "制作信息", "文件确认", "发送与订购"] },
};
const dessertMoments: Record<Lang, { kicker: string; title: string; intro: string; items: Array<[string, string]>; alts: string[] }> = {
  ko: { kicker: "SEASONAL CAKE INSPIRATION", title: "익숙한 디저트도\n새로운 작품으로.", intro: "컬러풀한 붕어 식용 이미지, 따뜻한 붕어빵 구성, 풍성한 제철 과일까지 아이싱시트로 다양한 케이크 이야기를 완성합니다.", items: [["컬러 붕어 케이크", "부드러운 붕어 모양 케이크 위에 보석빛 수채화 붕어 아이싱시트를 더한 시그니처 디저트"], ["붕어빵 케이크", "붕어빵·팥·밤과 수채화 아이싱시트를 조합한 따뜻하고 친숙한 겨울 디저트"], ["과일 케이크", "보석처럼 선명한 과일과 플로럴 아이싱시트가 어우러진 축하 케이크"]], alts: ["컬러풀한 수채화 붕어 식용 이미지를 장식한 붕어 모양 케이크", "수채화 붕어빵 아이싱시트와 붕어빵을 장식한 케이크", "과일 화환 아이싱시트와 제철 과일을 장식한 과일 케이크"] },
  en: { kicker: "SEASONAL CAKE INSPIRATION", title: "Turn familiar desserts\ninto new edible art.", intro: "Colorful fish artwork, nostalgic bungeoppang and abundant seasonal fruit show three different stories made with edible icing sheets.", items: [["Colorful Fish Cake", "A smooth fish-shaped cake finished with a jewel-toned watercolor fish icing sheet"], ["Bungeoppang Cake", "A warm winter cake combining fish-shaped pastries, red bean, chestnut and watercolor edible art"], ["Jewel Fruit Cake", "A celebration cake combining vivid seasonal fruit with a floral fruit-wreath icing sheet"]], alts: ["Fish-shaped cake decorated with a colorful watercolor edible fish image", "Cake decorated with bungeoppang and watercolor edible icing-sheet art", "Fruit cake decorated with seasonal fruit and a fruit-wreath icing sheet"] },
  ja: { kicker: "SEASONAL CAKE INSPIRATION", title: "親しみのあるデザートを\n新しい作品へ。", intro: "カラフルな魚の食用イメージ、懐かしいプンオパン、豊かな旬のフルーツで三つの物語を表現します。", items: [["カラフルフィッシュケーキ", "なめらかな魚型ケーキに宝石色の水彩フィッシュアイシングシートを飾ったデザート"], ["プンオパンケーキ", "プンオパン、小豆、栗、水彩の食用イメージを組み合わせた温かな冬のデザート"], ["ジュエルフルーツケーキ", "色鮮やかな旬のフルーツとフルーツリースのアイシングシートを飾ったケーキ"]], alts: ["カラフルな水彩の魚の食用イメージを飾った魚型ケーキ", "プンオパンと水彩の食用アイシングシートを飾ったケーキ", "旬のフルーツとフルーツリースのアイシングシートを飾ったケーキ"] },
  zh: { kicker: "SEASONAL CAKE INSPIRATION", title: "让熟悉的甜点\n成为全新作品。", intro: "彩色鱼图案、怀旧鲫鱼饼与丰盛时令水果，以可食用糖霜纸呈现三种不同的蛋糕故事。", items: [["彩色鱼形蛋糕", "在细腻的鱼形蛋糕上装饰宝石色水彩鱼图案糖霜纸"], ["鲫鱼饼蛋糕", "结合鲫鱼饼、红豆、栗子与水彩可食用图像的温暖冬季甜点"], ["宝石水果蛋糕", "以缤纷时令水果和水果花环糖霜纸装饰的庆祝蛋糕"]], alts: ["装饰彩色水彩鱼可食用图像的鱼形蛋糕", "以鲫鱼饼和水彩可食用糖霜纸装饰的蛋糕", "以时令水果和水果花环糖霜纸装饰的水果蛋糕"] },
};
const dessertImages = ["/bungeoppang-cake-rainbow.png", "/bungeoppang-cake.png", "/fruit-cake.png"];
const Lines = ({ children }: { children: string }) => <>{children.replace(/\s*\n\s*/g, " ")}</>;
const Arrow = () => <span aria-hidden="true">↗</span>;

export default function Home() {
  const [lang, setLang] = useState<Lang>("ko");
  const [selectedIdea, setSelectedIdea] = useState(0);
  const [designName, setDesignName] = useState("");
  const [designContact, setDesignContact] = useState("");
  const [designProduct, setDesignProduct] = useState("");
  const [designSize, setDesignSize] = useState("");
  const [designQuantity, setDesignQuantity] = useState("");
  const [designDue, setDesignDue] = useState("");
  const [designDetails, setDesignDetails] = useState("");
  const [designFile, setDesignFile] = useState("");
  const t: Copy = copy[lang];
  const g = guideCopy[lang];
  const details = guideDetails[lang];
  const alts = imageAlts[lang];
  const c = conversionCopy[lang];
  const certificates = certificationCopy[lang];
  const coffee = coffeeMoments[lang];
  const cocktails = cocktailMoments[lang];
  const candy = candyMoments[lang];
  const cottonCandyCase = cottonCandyCaseCopy[lang];
  const petite = petiteDesserts[lang];
  const ideas = ideaCollections[lang];
  const form = designFormCopy[lang];
  const desserts = dessertMoments[lang];
  const inquiryUrl = `mailto:cakecnc@daum.net?subject=${encodeURIComponent("Cake Salon Custom Order Inquiry")}`;
  const productLink = (key: string) => key === "store" ? storeUrl : productUrls[key as keyof typeof productUrls];
  const submitDesignRequest = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const selected = ideas.items[selectedIdea];
    const subject = `[Cake Salon] ${selected[1]} 맞춤 디자인 문의`;
    const body = [
      `${form.selected}: ${selected[1]} (${selected[0]})`,
      `${form.name}: ${designName || "-"}`,
      `${form.contact}: ${designContact || "-"}`,
      `${form.product}: ${designProduct || "-"}`,
      `${form.size}: ${designSize || "-"}`,
      `${form.quantity}: ${designQuantity || "-"}`,
      `${form.due}: ${designDue || "-"}`,
      `${form.details}: ${designDetails || "-"}`,
      `${form.file}: ${designFile || "-"}`,
      "",
      form.fileHelp,
    ].join("\n");
    window.open(productUrls.custom, "_blank", "noopener,noreferrer");
    window.location.href = `mailto:cakecnc@daum.net?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return <main lang={lang}>
    <header className="site-header">
      <a className="wordmark" href="#top" aria-label="Cake Salon home"><b>CAKE</b><i>SALON</i></a>
      <nav aria-label="Main navigation">{t.nav.map((item, index) => <a key={item} className={index === 4 ? "custom-nav" : undefined} href={["#products", "#gallery", "#how", "#company", "#custom-design", "#contact"][index]}>{item}</a>)}</nav>
      <div className="header-tools">
        <label><span className="sr-only">Language</span><select aria-label="Language" value={lang} onChange={(event) => setLang(event.target.value as Lang)}><option value="ko">KR</option><option value="en">EN</option><option value="ja">JP</option><option value="zh">CN</option></select></label>
        <a className="header-shop" href={storeUrl} target="_blank" rel="noreferrer">{t.shop} <Arrow /></a>
      </div>
    </header>

    <section className="hero" id="top">
      <img className="hero-photo" src="/cake-renaissance.jpeg" alt={alts.hero} />
      <div className="hero-shade" />
      <div className="hero-copy">
        <p className="kicker light-kicker">{t.kicker}</p>
        <h1><Lines>{t.title}</Lines></h1>
        <p className="hero-intro">{t.intro}</p>
        <div className="hero-actions"><a className="button button-light" href={productUrls.a4} target="_blank" rel="noreferrer">{c.purchase} <Arrow /></a><a className="button button-outline" href={inquiryUrl}>{c.inquiry} <Arrow /></a></div>
      </div>
      <div className="hero-caption"><span>01</span><p>{t.heroNote}</p></div>
    </section>

    <section className="promise-bar" aria-label="Product highlights">{t.promises.map(([value, label]) => <div key={value}><b>{value}</b><span>{label}</span></div>)}</section>

    <section className="shop-section" id="products">
      <div className="section-heading"><div><p className="kicker">{t.shopKicker}</p><h2><Lines>{t.shopTitle}</Lines></h2></div><p className="section-intro">{t.shopIntro}</p></div>
      <div className="product-grid">{t.products.map((product, index) => <article className={`product-card card-${index + 1}`} key={product[0]}>
        <a className="product-art" href={index === 0 ? productLink(product[3]) : inquiryUrl} target={index === 0 ? "_blank" : undefined} rel={index === 0 ? "noreferrer" : undefined}>
          <img src={productCardImage[index]} alt="" />
          <span className="product-index">0{index + 1}</span><small>{product[2]}</small>
        </a>
        <div className="product-copy"><h3>{product[0]}</h3><p>{product[1]}</p><dl className="product-meta"><div><dt>{c.currentPrice}</dt><dd>{c.productMeta[index][0]}</dd></div><div><dt>{c.specs}</dt><dd>{c.productMeta[index][1]}</dd></div><div><dt>{c.order}</dt><dd>{c.productMeta[index][2]}</dd></div></dl><a href={index === 0 ? productLink(product[3]) : inquiryUrl} target={index === 0 ? "_blank" : undefined} rel={index === 0 ? "noreferrer" : undefined}>{index === 0 ? c.purchase : c.inquiry} <Arrow /></a></div>
      </article>)}</div>
    </section>

    <section className="guide-section" id="guide">
      <div className="guide-heading"><div><p className="kicker">{g.kicker}</p><h2><Lines>{g.title}</Lines></h2></div><div><p>{g.intro}</p><p className="guide-language-note">{c.guideNote}</p></div></div>
      <div className="feature-grid">{details.slice(0, 5).map((item, index) => <article className="feature-card" key={item.title}><span>0{index + 1}</span><h3>{item.title}</h3><p>{item.summary}</p><ul>{item.bullets.slice(0, 4).map((bullet) => <li key={bullet}>{bullet}</li>)}</ul></article>)}</div>
    </section>

    <section className="gallery-section" id="gallery">
      <div className="gallery-copy"><p className="kicker light-kicker">{t.galleryKicker}</p><h2><Lines>{t.galleryTitle}</Lines></h2><p>{t.galleryIntro}</p></div>
      <div className="gallery-grid">{productImage.map((src, index) => <figure key={src} className={`gallery-item gallery-${index + 1}`}><img src={src} alt={alts.gallery[index]} /><figcaption><span>0{index + 1}</span>{t.galleryLabels[index]}</figcaption></figure>)}</div>
    </section>

    <section className="dessert-stories">
      <div className="dessert-heading"><p className="kicker">{desserts.kicker}</p><h2><Lines>{desserts.title}</Lines></h2><p>{desserts.intro}</p></div>
      <div className="dessert-grid">{dessertImages.map((src, index) => <figure key={src} className={`dessert-${index + 1}`}><img src={src} alt={desserts.alts[index]} /><figcaption><span>0{index + 1}</span><div><h3>{desserts.items[index][0]}</h3><p>{desserts.items[index][1]}</p></div></figcaption></figure>)}</div>
    </section>

    <section className="how-section" id="how">
      <div className="how-title"><p className="kicker">{t.useKicker}</p><h2><Lines>{t.useTitle}</Lines></h2><img className="how-thumb" src="/icing-sheet-process.png" alt={alts.how} /></div>
      <ol>{t.steps.map(([number, title, description]) => <li key={number}><span>{number}</span><div><h3>{title}</h3><p>{description}</p></div></li>)}</ol>
    </section>

    <section className="pro-section">
      <div className="pro-image"><img src="/product-coffee.jpeg" alt={alts.coffee} /><span>CAKE SALON · CAFÉ &amp; HOTEL</span></div>
      <div className="pro-copy"><p className="kicker">{g.cafeKicker}</p><h2><Lines>{g.cafeTitle}</Lines></h2><p>{g.cafeText}</p><a className="button button-dark" href={inquiryUrl}>{c.inquiry} <Arrow /></a></div>
    </section>

    <section className="coffee-moments">
      <div className="coffee-moments-heading"><p className="kicker">{coffee.kicker}</p><h2><Lines>{coffee.title}</Lines></h2><p>{coffee.intro}</p></div>
      <div className="coffee-moments-grid">{coffeeImages.map((src, index) => <figure key={src}><img src={src} alt={coffee.alts[index]} /><figcaption><span>0{index + 1}</span><b>{["I LOVE YOU", "CONGRATS", "THANK YOU"][index]}</b><small>{coffee.labels[index]}</small></figcaption></figure>)}</div>
    </section>

    <section className="cocktail-showcase">
      <div className="cocktail-heading"><p className="kicker light-kicker">{cocktails.kicker}</p><h2><Lines>{cocktails.title}</Lines></h2><p>{cocktails.intro}</p><a className="button button-outline" href={inquiryUrl}>{c.inquiry} <Arrow /></a></div>
      <div className="cocktail-grid">{cocktailImages.map((src, index) => <figure key={src} className={`cocktail-${index + 1}`}><img src={src} alt={cocktails.alts[index]} /><figcaption><span>0{index + 1}</span><div><b>{["CHEERS", "CELEBRATE", "ANNIVERSARY"][index]}</b><small>{cocktails.labels[index]}</small></div></figcaption></figure>)}</div>
    </section>

    <section className="candy-showcase">
      <div className="candy-heading"><p className="kicker light-kicker">{candy.kicker}</p><h2><Lines>{candy.title}</Lines></h2><p>{candy.intro}</p><a className="button button-outline" href={inquiryUrl}>{c.inquiry} <Arrow /></a></div>
      <div className="candy-grid">{candyImages.map((src, index) => <figure key={src} className={`candy-${index + 1}`}><img src={src} alt={candy.alts[index]} /><figcaption><span>0{index + 1}</span><div><b>{["LOVE", "CELEBRATE", "THANK YOU"][index]}</b><small>{candy.labels[index]}</small></div></figcaption></figure>)}</div>
    </section>

    <section className="cotton-candy-case">
      <div className="cotton-candy-header">
        <div className="cotton-candy-copy">
          <p className="kicker">{cottonCandyCase.kicker}</p>
          <h2><Lines>{cottonCandyCase.title}</Lines></h2>
          <p className="cotton-candy-intro">{cottonCandyCase.intro}</p>
        </div>
        <div className="cotton-candy-record">
          <article className="production-record">
            <small>{cottonCandyCase.recordLabel}</small>
            <h3>{cottonCandyCase.recordTitle}</h3>
            <p>{cottonCandyCase.recordMeta}</p>
          </article>
          <p className="rights-note">{cottonCandyCase.rightsNote}</p>
        </div>
      </div>
      <div className="cotton-example-heading"><span>{cottonCandyCase.exampleLabel}</span><div><h3>{cottonCandyCase.exampleTitle}</h3><p>{cottonCandyCase.exampleText}</p></div></div>
      <div className="cotton-face-grid">{cottonFaceImages.map((src, index) => <figure className="cotton-face-card" key={src}>
        <div className="cotton-face-image"><img src={src} alt={cottonCandyCase.examples[index][3]} /></div>
        <figcaption><span>0{index + 1}</span><div><small>{cottonCandyCase.examples[index][0]}</small><b>{cottonCandyCase.examples[index][1]}</b><p>{cottonCandyCase.examples[index][2]}</p></div></figcaption>
      </figure>)}</div>
    </section>

    <section className="cookie-showcase petite-showcase">
      <div className="petite-heading"><p className="kicker">{petite.cookieKicker}</p><h2><Lines>{petite.cookieTitle}</Lines></h2><p>{petite.cookieIntro}</p></div>
      <div className="petite-grid">{cookieImages.map((src, index) => <figure key={src}><img src={src} alt={petite.cookieAlts[index]} /><figcaption><span>0{index + 1}</span><b>{petite.cookieLabels[index]}</b></figcaption></figure>)}</div>
    </section>

    <section className="macaron-showcase petite-showcase">
      <div className="petite-heading"><p className="kicker">{petite.macaronKicker}</p><h2><Lines>{petite.macaronTitle}</Lines></h2><p>{petite.macaronIntro}</p></div>
      <div className="petite-grid">{macaronImages.map((src, index) => <figure key={src}><img src={src} alt={petite.macaronAlts[index]} /><figcaption><span>0{index + 1}</span><b>{petite.macaronLabels[index]}</b></figcaption></figure>)}</div>
    </section>

    <section className="ideas-section">
      <div className="ideas-heading"><div><p className="kicker">{ideas.kicker}</p><h2><Lines>{ideas.title}</Lines></h2></div><p>{ideas.intro}</p></div>
      <form className="design-request work-order" id="custom-design" onSubmit={submitDesignRequest}>
        <ol className="work-order-steps">{form.steps.map((step, index) => <li key={step}><span>0{index + 1}</span>{step}</li>)}</ol>
        <fieldset className="work-purpose">
          <legend><span>01</span>{form.steps[0]}</legend>
          <div className="purpose-grid">{ideas.items.map(([eyebrow, title, description], index) => <button key={eyebrow} type="button" aria-pressed={selectedIdea === index} className={selectedIdea === index ? "is-selected" : ""} onClick={() => setSelectedIdea(index)}><small>{eyebrow}</small><b>{title}</b><span>{description}</span><i>{selectedIdea === index ? "✓" : "＋"}</i></button>)}</div>
        </fieldset>
        <div className="design-request-body">
          <div className="design-request-heading"><small>{form.selected}</small><b>{ideas.items[selectedIdea][1]}</b><h3>{form.title}</h3><p>{form.intro}</p></div>
          <div className="design-fields">
            <label><span>{form.name}</span><input value={designName} onChange={(event) => setDesignName(event.target.value)} required /></label>
            <label><span>{form.contact}</span><input value={designContact} onChange={(event) => setDesignContact(event.target.value)} required /></label>
            <label><span>{form.product}</span><input value={designProduct} onChange={(event) => setDesignProduct(event.target.value)} placeholder="Cake / Macaron / Cookie / Drink" required /></label>
            <label><span>{form.size}</span><input value={designSize} onChange={(event) => setDesignSize(event.target.value)} placeholder={form.sizeExample} required /></label>
            <label><span>{form.quantity}</span><input type="number" min="1" value={designQuantity} onChange={(event) => setDesignQuantity(event.target.value)} required /></label>
            <label><span>{form.due}</span><input type="date" value={designDue} onChange={(event) => setDesignDue(event.target.value)} required /></label>
            <label className="wide-field"><span>{form.details}</span><textarea value={designDetails} onChange={(event) => setDesignDetails(event.target.value)} rows={4} required /></label>
            <label className="wide-field file-field"><span>{form.file}</span><input type="file" accept="image/*,.pdf" onChange={(event) => setDesignFile(event.target.files?.[0]?.name || "")} /><small>{designFile || form.fileHelp}</small></label>
            <div className="design-actions wide-field"><button className="button button-dark" type="submit">{form.submit} <Arrow /></button><a href={productUrls.custom} target="_blank" rel="noreferrer">{form.print} <Arrow /></a></div>
          </div>
        </div>
      </form>
    </section>

    <section className="proof-section">
      <div className="proof-heading"><p className="kicker">{c.proofKicker}</p><h2><Lines>{c.proofTitle}</Lines></h2><p>{c.proofText}</p></div>
      <div className="trust-grid">{t.trust.map(([value, label]) => <div key={value}><b>{value}</b><span>{label}</span></div>)}</div>
      <div className="certification-docs">
        <div className="certification-title"><b>{certificates.title}</b><span>{certificates.note}</span></div>
        {certificates.items.map(([mark, title], index) => <a className="certification-document" href={index === 0 ? "/documents/cnc-fda-registration-2024.pdf" : "/documents/cnc-iso22000-certificate.pdf"} target="_blank" rel="noreferrer" key={mark}>
          <small>{mark}</small><span><b>{title}</b></span><em>{certificates.open} <Arrow /></em>
        </a>)}
      </div>
    </section>

    <section className="company-section" id="company">
      <div className="company-copy"><p className="kicker">{t.companyKicker}</p><h2><Lines>{t.companyTitle}</Lines></h2><p>{t.companyText}</p><div className="company-actions"><a className="button button-dark" href={productUrls.a4} target="_blank" rel="noreferrer">{c.purchase} <Arrow /></a><a className="text-action" href={inquiryUrl}>{c.inquiry}</a></div></div>
      <div className="company-logo"><img src="/cnc-logo.jpeg" alt={alts.logo} /></div>
    </section>

    <section className="final-section" id="contact">
      <img src="/cake-floral.jpeg" alt={alts.final} />
      <div className="final-shade" /><div className="final-copy"><p className="kicker light-kicker">CAKE SALON</p><h2><Lines>{t.final}</Lines></h2><p>{t.finalText}</p><div className="final-actions"><a className="button button-light" href={productUrls.a4} target="_blank" rel="noreferrer">{c.purchase} <Arrow /></a><a className="button button-outline" href={inquiryUrl}>{c.inquiry} <Arrow /></a></div><div className="final-contacts"><span>{t.phone}</span><span>{t.email}</span></div></div>
    </section>

    <footer>
      <a className="wordmark footer-mark" href="#top"><b>CAKE</b><i>SALON</i></a>
      <p>© 2026 C&amp;C CORPORATION · SEOUL, KOREA</p>
      <span>cakecnc@daum.net</span>
      <a href={productUrls.a4} target="_blank" rel="noreferrer">SMARTSTORE <Arrow /></a>
      <p className="footer-editorial-note">{t.editorialNote}</p>
    </footer>
    <div className="mobile-cta" aria-label="Quick actions"><a href={productUrls.a4} target="_blank" rel="noreferrer">{c.purchase}</a><a href={inquiryUrl}>{c.inquiry}</a></div>
  </main>;
}
