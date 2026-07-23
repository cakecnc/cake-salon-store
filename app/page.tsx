"use client";

import { useState } from "react";

type Lang = "ko" | "en" | "ja" | "zh";
type Copy = typeof copy.ko;

const storeUrl = "https://smartstore.naver.com/cake";
const productUrls = {
  a4: "https://smartstore.naver.com/cake/products/237929418",
  a3: `${storeUrl}/products/12030000093`,
  custom: `${storeUrl}/products/5874096848`,
};

const copy = {
  ko: {
    nav: ["제품", "활용", "사용법", "회사소개", "CONTACT"], shop: "스마트스토어",
    kicker: "PREMIUM EDIBLE PRINTING", title: "상상한 디자인을,\n가장 맛있는 작품으로.",
    intro: "케익살롱의 아이싱시트와 식용 프린팅 솔루션으로 사진, 일러스트, 로고를 케이크 위에 선명하게 표현하세요.",
    primary: "판매 제품 보기", secondary: "맞춤 제작 상담", heroNote: "PET 필름에서 분리해 바로 사용하는 식용 이미지 시트",
    promises: [["18개월", "넉넉한 소비기한"], ["4.8 / 5", "아마존 평균 별점"], ["GLOBAL", "전 세계 수출"], ["080-664-7077", "제품·맞춤 상담"]],
    shopKicker: "TWO SIGNATURE OFFERS", shopTitle: "필요한 두 가지를\n명확하게 선택하세요.", shopIntro: "아이싱시트 1팩과 맞춤 프린팅 서비스, 케익살롱의 대표 상품만 간결하게 안내합니다.",
    products: [
      ["A4 아이싱시트 1팩", "가정·소량 제작에 필요한 만큼 사용하는 식용 아이싱시트", "A4 · 25 SHEETS", "a4"],
      ["맞춤 프린팅 서비스", "사진·로고·문구를 원하는 크기와 형태로 제작", "CUSTOM PRINT", "custom"],
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
  },
  en: {
    nav: ["Products", "Inspiration", "How it works", "Company", "CONTACT"], shop: "Smart Store",
    kicker: "PREMIUM EDIBLE PRINTING", title: "Turn any design into\na delicious work of art.",
    intro: "Bring photos, illustrations and logos to life on cakes with Cake Salon icing sheets and edible-printing solutions.",
    primary: "Shop products", secondary: "Custom order", heroNote: "Edible image sheets that peel cleanly from PET backing",
    promises: [["18 months", "Generous shelf life"], ["4.8 / 5", "Amazon average"], ["GLOBAL", "Worldwide export"], ["+82 80-664-7077", "Product support"]],
    shopKicker: "TWO SIGNATURE OFFERS", shopTitle: "Two clear choices\nfor your cake project.", shopIntro: "Explore Cake Salon’s two signature offers: a single pack of icing sheets and custom edible printing.",
    products: [["A4 Icing Sheet · 1 Pack", "A practical single pack for home bakers and small-batch projects", "A4 · 25 SHEETS", "a4"], ["Custom Printing Service", "Photos, logos and messages printed to your requested size and shape", "CUSTOM PRINT", "custom"]],
    view: "View product", galleryKicker: "REAL APPLICATION", galleryTitle: "One printed image can\ntransform the whole cake.", galleryIntro: "Classic art, floral patterns, celebration photos and brand logos—see the color and detail Cake Salon can deliver.", galleryLabels: ["CLASSIC ART", "ROMANTIC PORTRAIT", "FLORAL DESIGN"],
    useKicker: "3 SIMPLE STEPS", useTitle: "Print, peel and\nsimply place.", steps: [["01", "Prepare your design", "Set your photo, illustration or logo to size."], ["02", "Peel from the film", "Gently release the sheet from its PET backing."], ["03", "Finish the cake", "Place it on a smooth surface and serve."]],
    proKicker: "FOR PROFESSIONALS", proTitle: "Edible brand content for\ncafés, hotels and events.", proText: "From launches and VIP events to seasonal menus and promotions, turn logos and messages into an edible brand experience.", proCta: "Ask about B2B orders",
    trust: [["FDA", "Registration guidance"], ["18 MONTHS", "Shelf life"], ["4.8 RATING", "Amazon average"], ["WORLDWIDE", "Export sales"]],
    companyKicker: "C&C CORPORATION", companyTitle: "Expanding edible printing\nto the global market.", companyText: "C&C Corporation manufactures and distributes icing sheets through Cake Salon, offering complete edible-printing solutions from Korean ecommerce to global export.", companyCta: "Visit Smart Store", final: "Turn today’s cake into\na lasting work of art.", finalText: "Discover Cake Salon products and custom edible printing.", phone: "Call +82 80-664-7077", email: "Email cakecnc@daum.net",
  },
  ja: {
    nav: ["商品", "活用例", "使い方", "会社紹介", "CONTACT"], shop: "スマートストア",
    kicker: "PREMIUM EDIBLE PRINTING", title: "想像したデザインを、\nいちばん美味しい作品へ。", intro: "ケーキサロンのアイシングシートで写真・イラスト・ロゴを鮮やかに表現できます。", primary: "商品を見る", secondary: "オーダー相談", heroNote: "PETフィルムからはがして使う食用イメージシート",
    promises: [["18か月", "余裕のある賞味期間"], ["4.8 / 5", "Amazon平均評価"], ["GLOBAL", "世界へ輸出"], ["+82 80-664-7077", "商品相談"]],
    shopKicker: "TWO SIGNATURE OFFERS", shopTitle: "必要な二つを\n分かりやすく選択。", shopIntro: "アイシングシート1パックとオーダープリントサービスのみをご案内します。",
    products: [["A4アイシングシート 1パック", "ホームベーキングや少量制作に便利な1パック", "A4 · 25 SHEETS", "a4"], ["オーダープリントサービス", "写真・ロゴ・文字を希望のサイズと形で制作", "CUSTOM PRINT", "custom"]],
    view: "商品を見る", galleryKicker: "REAL APPLICATION", galleryTitle: "一枚のイメージが\nケーキの価値を変えます。", galleryIntro: "クラシックアート、花柄、記念写真、ブランドロゴまで鮮やかに表現します。", galleryLabels: ["CLASSIC ART", "ROMANTIC PORTRAIT", "FLORAL DESIGN"],
    useKicker: "3 SIMPLE STEPS", useTitle: "プリントして、はがして、\nのせるだけ。", steps: [["01", "デザイン準備", "写真・イラスト・ロゴを準備します。"], ["02", "フィルムからはがす", "PETフィルムからゆっくりはがします。"], ["03", "ケーキ完成", "なめらかな表面にのせて仕上げます。"]],
    proKicker: "FOR PROFESSIONALS", proTitle: "カフェ・ホテル・ブランド向け\n食用コンテンツ。", proText: "新商品、VIPイベント、季節メニュー、企業プロモーションまで食用イメージでブランド体験を作ります。", proCta: "B2Bオーダー相談",
    trust: [["FDA", "関連登録案内"], ["18 MONTHS", "賞味期間"], ["4.8 RATING", "Amazon平均"], ["WORLDWIDE", "輸出販売"]],
    companyKicker: "C&C CORPORATION", companyTitle: "食用プリントの可能性を\n世界市場へ。", companyText: "C&C Corporationはケーキサロンを通じてアイシングシートと食用プリントソリューションを提供し、グローバル輸出へ事業を拡大しています。", companyCta: "ストアを見る", final: "今日のケーキを\n記憶に残る作品へ。", finalText: "ケーキサロンの商品とオーダープリントをご覧ください。", phone: "電話 +82 80-664-7077", email: "メール cakecnc@daum.net",
  },
  zh: {
    nav: ["产品", "应用", "使用方法", "公司介绍", "CONTACT"], shop: "智能商店",
    kicker: "PREMIUM EDIBLE PRINTING", title: "将想象中的设计，\n变成美味的艺术品。", intro: "使用 Cake Salon 糖霜纸与可食用打印方案，将照片、插画和标志清晰呈现在蛋糕上。", primary: "浏览产品", secondary: "咨询定制", heroNote: "从PET底膜揭下即可使用的可食用图像纸",
    promises: [["18个月", "充足保质期"], ["4.8 / 5", "亚马逊平均评分"], ["GLOBAL", "出口全球"], ["+82 80-664-7077", "产品咨询"]],
    shopKicker: "TWO SIGNATURE OFFERS", shopTitle: "两项代表服务，\n选择更简单。", shopIntro: "仅展示单包装糖霜纸与定制可食用打印服务。",
    products: [["A4糖霜纸 1包装", "适合家庭烘焙与小批量制作的单包装", "A4 · 25 SHEETS", "a4"], ["定制打印服务", "按所需尺寸和形状打印照片、标志与文字", "CUSTOM PRINT", "custom"]],
    view: "查看产品", galleryKicker: "REAL APPLICATION", galleryTitle: "一张图像，\n改变蛋糕的价值。", galleryIntro: "从古典艺术、花卉图案到照片和品牌标志，展现清晰色彩与细节。", galleryLabels: ["CLASSIC ART", "ROMANTIC PORTRAIT", "FLORAL DESIGN"],
    useKicker: "3 SIMPLE STEPS", useTitle: "打印、揭下、\n轻轻放上。", steps: [["01", "准备设计", "准备照片、插画或品牌标志。"], ["02", "揭下底膜", "从PET底膜上慢慢揭下。"], ["03", "完成蛋糕", "放在平滑表面即可完成。"]],
    proKicker: "FOR PROFESSIONALS", proTitle: "为咖啡馆、酒店与品牌\n打造可食用内容。", proText: "从新品发布、VIP活动到季节菜单和企业推广，让标志与信息成为可品尝的品牌体验。", proCta: "咨询B2B定制",
    trust: [["FDA", "相关注册说明"], ["18 MONTHS", "保质期"], ["4.8 RATING", "亚马逊平均"], ["WORLDWIDE", "出口销售"]],
    companyKicker: "C&C CORPORATION", companyTitle: "将可食用打印的可能性\n拓展至全球市场。", companyText: "C&C Corporation 通过 Cake Salon 提供糖霜纸制造、销售与完整的可食用打印方案，并持续拓展全球出口。", companyCta: "访问商店", final: "让今天的蛋糕\n成为难忘的艺术品。", finalText: "立即了解 Cake Salon 产品与定制打印。", phone: "电话 +82 80-664-7077", email: "邮箱 cakecnc@daum.net",
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
    { title: "제품 규격과 추천 구성", summary: "작업 환경과 사용 목적에 맞춰 A4, A3 또는 맞춤 규격을 선택할 수 있습니다.", bullets: ["제품명: 케익살롱 식용 아이싱시트", "A4 210×297mm / A3 297×420mm", "제조일로부터 소비기한 18개월", "식용 프린터와 식용 잉크 사용", "직사광선과 고온다습한 곳을 피해 밀봉 보관"] },
    { title: "출력부터 장식까지 3단계", summary: "식용 프린터로 출력한 뒤 원하는 모양으로 잘라 케이크에 올리면 완성됩니다.", bullets: ["1. 식용 프린터와 식용 잉크로 이미지 출력", "2. 원하는 모양으로 자른 뒤 PET 필름에서 천천히 분리", "3. 케이크의 매끄러운 표면에 가볍게 밀착", "작업 전 손을 깨끗이 씻고 충분히 건조"] },
    { title: "필름 분리와 케이크 부착", summary: "필요한 만큼만 꺼내 출력하고, 필름을 천천히 분리해 케이크에 부착합니다.", bullets: ["출력면이 손상되지 않도록 시트 가장자리를 잡기", "PET 보호 필름에서 천천히 분리하기", "케이크 표면의 과도한 수분을 정리한 뒤 부착", "남은 시트는 즉시 밀봉해 보관"] },
    { title: "구매 전 자주 묻는 질문", summary: "프린터, 보관, 소비기한과 맞춤 주문에 대한 핵심 안내입니다.", bullets: ["일반 프린터가 아닌 식용 프린터와 식용 잉크를 사용", "직사광선과 고온다습한 곳을 피하고 개봉 후 밀봉", "소비기한은 제조일로부터 18개월", "케이크 표면의 과도한 수분을 정리한 뒤 부착", "맞춤 제작과 대량 주문 상담 가능"] },
    { title: "아이싱시트 리뉴얼 V.10", summary: "기포 발생을 줄이고 출력 품질과 작업성을 개선하도록 설계한 버전입니다.", bullets: ["기포와 필름 분리를 줄이기 위한 이중 가공 구조", "약 0.45–0.55mm의 작업하기 좋은 두께", "셀룰로오스 유래 식품 원료 HPMC 함유", "일반적인 계절 환경에서 일관된 작업성을 고려한 설계", "부드러운 식감과 편리한 커팅·박리"] },
  ],
  en: [
    { title: "Complete Edible Icing Sheet Guide", summary: "An edible image sheet for reproducing photos, logos and illustrations clearly on cakes and desserts.", bullets: ["Made with ingredients intended for food use", "Designed for detailed edible printing and easy peel-and-place application", "Suitable for cakes, cookies, chocolate, marshmallows and other desserts", "A4 210×297mm, A3 297×420mm and custom sizes available", "Use-by period: 18 months from manufacture; keep sealed"] },
    { title: "Premium Edible Icing Sheets", summary: "Cake Salon’s signature sheet is designed for vivid printing and reliable handling.", bullets: ["Use with food-grade edible ink", "Fine image detail and a soft eating texture", "Suitable for cakes, cookies, macarons and other desserts", "Custom logos, photos and messages; bulk orders available"] },
    { title: "Sizes and Recommended Options", summary: "Choose A4, A3 or a custom size according to your workflow and application.", bullets: ["Product: Cake Salon Edible Icing Sheet", "A4 210×297mm / A3 297×420mm", "Shelf life: 18 months from the date of manufacture", "Use an edible-ink printer and edible ink only", "Keep sealed away from direct sunlight, heat and humidity"] },
    { title: "Three Simple Steps", summary: "Print, cut and peel the sheet, then place it on the cake.", bullets: ["1. Print the image with an edible-ink printer", "2. Cut to shape and peel slowly from the PET backing", "3. Place gently on a smooth cake surface", "Wash and dry hands thoroughly before handling"] },
    { title: "Peel and Apply", summary: "Remove only the sheet you need, print it, peel the backing slowly and apply it to the cake.", bullets: ["Hold the sheet by the edges to protect the printed surface", "Release it slowly from the PET backing", "Remove excess moisture from the cake surface before applying", "Reseal unused sheets immediately"] },
    { title: "Frequently Asked Questions", summary: "Key guidance on printers, storage, shelf life and custom orders.", bullets: ["Do not use a standard printer; use an edible-ink printer and edible ink", "Keep away from direct sunlight, heat and humidity; reseal after opening", "Shelf life is 18 months from the date of manufacture", "Remove excess surface moisture before applying", "Custom production and bulk orders are available"] },
    { title: "Icing Sheet Renewal V.10", summary: "Updated to improve print quality and handling while helping reduce bubbling.", bullets: ["Dual-processing structure designed to reduce bubbling and backing separation", "Approx. 0.45–0.55mm thickness for balanced handling", "Contains HPMC, a cellulose-derived food ingredient", "Designed for more consistent handling under normal seasonal conditions", "Cut, peel and place using edible-printing equipment and ink"] },
  ],
  ja: [
    { title: "食用アイシングシート 総合ガイド", summary: "写真・ロゴ・イラストをケーキやデザートに鮮明に表現できる食用イメージシートです。", bullets: ["食品用途の原料を使用", "鮮明な食用プリントと、はがして載せる作業に適したシート", "ケーキ、クッキー、チョコレート、マシュマロなどに使用可能", "A4 210×297mm、A3 297×420mm、別注サイズに対応", "消費期限は製造日から18か月。密封して保管"] },
    { title: "プレミアム食用アイシングシート", summary: "鮮明な印刷と安定した作業性を考慮したケーキサロンの主力商品です。", bullets: ["食品用原料と食用インクを使用", "細部まで鮮明な表現とやわらかな食感", "ケーキ、クッキー、マカロンなどに使用可能", "ロゴ・写真・文字のオーダー制作と大量注文に対応"] },
    { title: "サイズと推奨構成", summary: "作業環境と用途に合わせてA4、A3、別注サイズから選べます。", bullets: ["商品名：ケーキサロン 食用アイシングシート", "A4 210×297mm / A3 297×420mm", "保存期間：製造日から18か月", "食用インク専用プリンターと食用インクを使用", "直射日光と高温多湿を避け、密封して保管"] },
    { title: "3ステップの使い方", summary: "食用プリンターで印刷し、カットしてからケーキにのせるだけです。", bullets: ["1. 食用インク専用プリンターで画像を印刷", "2. 好きな形に切り、PETフィルムからゆっくりはがす", "3. なめらかなケーキ表面に軽く密着", "作業前に手を洗い、十分に乾かす"] },
    { title: "フィルムからはがして貼り付ける", summary: "必要な分だけ取り出して印刷し、保護フィルムからゆっくりはがして貼り付けます。", bullets: ["印刷面を傷つけないよう端を持つ", "PET保護フィルムからゆっくりはがす", "ケーキ表面の余分な水分を取り除いてから貼る", "残ったシートはすぐに密封して保管"] },
    { title: "購入前のよくある質問", summary: "プリンター、保管、保存期間、オーダーに関する基本案内です。", bullets: ["一般プリンターではなく、食用インク専用プリンターを使用", "直射日光と高温多湿を避け、開封後は密封", "保存期間は製造日から18か月", "ケーキ表面の余分な水分を取り除いてから貼り付け", "別注制作・大量注文の相談が可能"] },
    { title: "アイシングシート リニューアル V.10", summary: "気泡を抑え、印刷品質と作業性を改善するよう設計されています。", bullets: ["気泡や台紙のはがれを抑えるための二重加工構造", "扱いやすさに配慮した約0.45〜0.55mmの厚さ", "セルロース由来の食品原料HPMCを配合", "通常の季節環境でも扱いやすいよう設計", "食品印刷専用機器と食用インクを使用"] },
  ],
  zh: [
    { title: "可食用糖霜纸完整指南", summary: "可将照片、标志和插画清晰呈现在蛋糕与甜点上的可食用图像纸。", bullets: ["采用食品用途原料制成", "适用于清晰的可食用图像打印，易于揭膜并贴附", "可用于蛋糕、饼干、巧克力、棉花糖等甜点", "提供A4 210×297mm、A3 297×420mm及定制尺寸", "保质期为自生产之日起18个月，请密封保存"] },
    { title: "优质可食用糖霜纸", summary: "Cake Salon 的核心产品，兼顾鲜明打印效果与稳定操作性。", bullets: ["搭配食品级可食用墨水使用", "细节清晰，口感柔软", "适用于蛋糕、曲奇、马卡龙等甜点", "支持标志、照片和文字定制及批量订购"] },
    { title: "规格与推荐选择", summary: "可根据工作环境和用途选择A4、A3或定制尺寸。", bullets: ["产品名称：Cake Salon 可食用糖霜纸", "A4 210×297mm / A3 297×420mm", "保质期：自生产之日起18个月", "仅使用食用墨水专用打印机和食用墨水", "密封存放，避免阳光直射、高温和潮湿"] },
    { title: "三步完成装饰", summary: "打印、裁切并揭膜后，轻轻放在蛋糕表面即可。", bullets: ["1. 使用食用墨水专用打印机打印图像", "2. 裁成所需形状，再从PET底膜上慢慢揭下", "3. 轻轻贴合在平整的蛋糕表面", "操作前请洗净双手并充分擦干"] },
    { title: "揭膜并贴合蛋糕", summary: "只取出所需糖霜纸，打印后慢慢揭下底膜，再贴到蛋糕上。", bullets: ["握住纸张边缘，避免损伤打印表面", "从PET保护膜上缓慢揭下", "贴合前先去除蛋糕表面多余水分", "未使用的糖霜纸应立即重新密封"] },
    { title: "购买前常见问题", summary: "关于打印机、储存、保质期和定制订单的核心说明。", bullets: ["不可使用普通打印机；请使用食用墨水专用打印机", "避免阳光直射、高温和潮湿，开封后请密封", "保质期为自生产之日起18个月", "贴合前请先去除蛋糕表面多余水分", "支持定制生产和批量订购"] },
    { title: "糖霜纸升级版 V.10", summary: "采用旨在减少起泡并改善打印质量和操作性的升级设计。", bullets: ["双重加工结构旨在减少气泡及与底膜分离", "约0.45–0.55mm厚度，兼顾打印和操作", "配方含有纤维素来源的食品原料HPMC", "设计上更适应一般季节环境下的使用", "请使用食品打印专用设备和食用墨水"] },
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
  ko: { purchase: "네이버 스마트스토어에서 구매하기", inquiry: "1:1 맞춤 제작 문의", currentPrice: "판매가", specs: "구성·규격", order: "주문 조건", productMeta: [["40,000원", "A4 · 25장 구성", "최소 주문 1팩"], ["6,840원부터", "A4 맞춤 프린팅", "주문 단위는 상품 옵션 기준"]], guideNote: "이미지 속 작은 글씨 대신 검색과 확대가 가능한 웹 텍스트로 안내합니다.", proofKicker: "VERIFIED PROOF", proofTitle: "확인 가능한 정보와\n실제 적용 사례만 담았습니다.", proofText: "케익살롱이 제공한 공식 제품 정보와 실제 제작 이미지를 기준으로 구성했습니다. 확인되지 않은 후기나 제휴사는 표시하지 않습니다. 판매가는 스마트스토어 옵션과 행사에 따라 변경될 수 있습니다." },
  en: { purchase: "Buy on Naver Smart Store", inquiry: "Request a Custom Quote", currentPrice: "Price", specs: "Pack & size", order: "Order terms", productMeta: [["KRW 40,000", "A4 · 25 sheets", "Minimum order: 1 pack"], ["From KRW 6,840", "A4 custom print", "Order unit follows store options"]], guideNote: "Product information is provided as searchable, responsive web text instead of small text embedded in an image.", proofKicker: "VERIFIED PROOF", proofTitle: "Only verified facts and\nreal applications.", proofText: "This section uses official Cake Salon product information and supplied production images. Prices may change depending on Smart Store options and promotions." },
  ja: { purchase: "NAVERスマートストアで購入", inquiry: "1:1オーダー相談", currentPrice: "販売価格", specs: "構成・サイズ", order: "注文条件", productMeta: [["40,000ウォン", "A4 · 25枚", "最小注文：1パック"], ["6,840ウォン〜", "A4オーダープリント", "注文単位は商品オプション基準"]], guideNote: "画像内の小さな文字ではなく、検索・拡大できるレスポンシブなWebテキストでご案内します。", proofKicker: "VERIFIED PROOF", proofTitle: "確認できる情報と\n実際の制作例だけを掲載。", proofText: "公式商品情報と実際の制作画像を使用しています。価格はストアのオプションやキャンペーンにより変更される場合があります。" },
  zh: { purchase: "前往NAVER智能商店购买", inquiry: "1对1定制咨询", currentPrice: "售价", specs: "包装与规格", order: "订购条件", productMeta: [["40,000韩元", "A4 · 25张", "最低订购：1包装"], ["6,840韩元起", "A4定制打印", "订购单位以商品选项为准"]], guideNote: "产品信息采用可搜索、可缩放的响应式网页文字，不再依赖图片中的小字。", proofKicker: "VERIFIED PROOF", proofTitle: "仅展示可核实信息与\n真实应用案例。", proofText: "内容基于官方产品资料和真实制作图片。价格可能因商店选项和促销活动而变化。" },
};
const verifiedReviews: Record<Lang, { kicker: string; title: string; items: Array<{ product: string; quote: string; author: string; date: string }> }> = {
  ko: { kicker: "VERIFIED SMARTSTORE REVIEWS", title: "실제 구매자가 남긴\n확인된 후기", items: [{ product: "A4 아이싱시트 25장", quote: "두 번째 구매인데 조금씩 다르긴 하지만 대체로 만족합니다.", author: "luni****", date: "2026.07.02" }, { product: "A4 맞춤 프린팅", quote: "포장이 꼼꼼하고 사장님이 정말 친절하십니다. 재구매하겠습니다.", author: "dase********", date: "2026.07.16" }] },
  en: { kicker: "VERIFIED SMARTSTORE REVIEWS", title: "Verified reviews from\nreal customers", items: [{ product: "A4 Icing Sheets · 25", quote: "This is my second purchase. There are slight differences, but overall I am satisfied.", author: "luni****", date: "2026.07.02" }, { product: "A4 Custom Printing", quote: "The packaging was careful and the owner was very kind. I will purchase again.", author: "dase********", date: "2026.07.16" }] },
  ja: { kicker: "VERIFIED SMARTSTORE REVIEWS", title: "実際の購入者による\n確認済みレビュー", items: [{ product: "A4アイシングシート 25枚", quote: "2回目の購入です。多少の違いはありますが、全体的に満足しています。", author: "luni****", date: "2026.07.02" }, { product: "A4オーダープリント", quote: "梱包が丁寧で、店長さんもとても親切でした。また購入します。", author: "dase********", date: "2026.07.16" }] },
  zh: { kicker: "VERIFIED SMARTSTORE REVIEWS", title: "真实买家留下的\n已验证评价", items: [{ product: "A4糖霜纸 25张", quote: "这是第二次购买。虽然略有差异，但总体上很满意。", author: "luni****", date: "2026.07.02" }, { product: "A4定制打印", quote: "包装很仔细，店主也非常亲切。我会再次购买。", author: "dase********", date: "2026.07.16" }] },
};
const Lines = ({ children }: { children: string }) => <>{children.split("\n").map((line, index) => <span key={`${line}-${index}`}>{line}{index === 0 && <br />}</span>)}</>;
const Arrow = () => <span aria-hidden="true">↗</span>;

export default function Home() {
  const [lang, setLang] = useState<Lang>("ko");
  const t: Copy = copy[lang];
  const g = guideCopy[lang];
  const details = guideDetails[lang];
  const alts = imageAlts[lang];
  const c = conversionCopy[lang];
  const reviews = verifiedReviews[lang];
  const inquiryUrl = `mailto:cakecnc@daum.net?subject=${encodeURIComponent("Cake Salon Custom Order Inquiry")}`;
  const productLink = (key: string) => key === "store" ? storeUrl : productUrls[key as keyof typeof productUrls];

  return <main lang={lang}>
    <header className="site-header">
      <a className="wordmark" href="#top" aria-label="Cake Salon home"><b>CAKE</b><i>SALON</i></a>
      <nav aria-label="Main navigation">{t.nav.map((item, index) => <a key={item} href={["#products", "#gallery", "#how", "#company", "#contact"][index]}>{item}</a>)}</nav>
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

    <section className="how-section" id="how">
      <div className="how-title"><p className="kicker">{t.useKicker}</p><h2><Lines>{t.useTitle}</Lines></h2><img className="how-thumb" src="/icing-sheet-process.png" alt={alts.how} /></div>
      <ol>{t.steps.map(([number, title, description]) => <li key={number}><span>{number}</span><div><h3>{title}</h3><p>{description}</p></div></li>)}</ol>
    </section>

    <section className="pro-section">
      <div className="pro-image"><img src="/product-coffee.jpeg" alt={alts.coffee} /><span>CAKE SALON · CAFÉ &amp; HOTEL</span></div>
      <div className="pro-copy"><p className="kicker">{g.cafeKicker}</p><h2><Lines>{g.cafeTitle}</Lines></h2><p>{g.cafeText}</p><a className="button button-dark" href={inquiryUrl}>{c.inquiry} <Arrow /></a></div>
    </section>

    <section className="proof-section"><div className="proof-heading"><p className="kicker">{c.proofKicker}</p><h2><Lines>{c.proofTitle}</Lines></h2><p>{c.proofText}</p></div><div className="trust-grid">{t.trust.map(([value, label]) => <div key={value}><b>{value}</b><span>{label}</span></div>)}</div></section>

    <section className="reviews-section"><div className="reviews-heading"><p className="kicker">{reviews.kicker}</p><h2><Lines>{reviews.title}</Lines></h2></div><div className="reviews-grid">{reviews.items.map((review) => <blockquote key={`${review.author}-${review.date}`}><span>{review.product}</span><p>“{review.quote}”</p><div className="review-meta"><b>{review.author}</b><time>{review.date}</time></div></blockquote>)}</div></section>

    <section className="company-section" id="company">
      <div className="company-copy"><p className="kicker">{t.companyKicker}</p><h2><Lines>{t.companyTitle}</Lines></h2><p>{t.companyText}</p><div className="company-actions"><a className="button button-dark" href={productUrls.a4} target="_blank" rel="noreferrer">{c.purchase} <Arrow /></a><a className="text-action" href={inquiryUrl}>{c.inquiry}</a></div></div>
      <div className="company-logo"><img src="/cnc-logo.jpeg" alt={alts.logo} /></div>
    </section>

    <section className="final-section" id="contact">
      <img src="/cake-floral.jpeg" alt={alts.final} />
      <div className="final-shade" /><div className="final-copy"><p className="kicker light-kicker">CAKE SALON</p><h2><Lines>{t.final}</Lines></h2><p>{t.finalText}</p><div className="final-actions"><a className="button button-light" href={productUrls.a4} target="_blank" rel="noreferrer">{c.purchase} <Arrow /></a><a className="button button-outline" href={inquiryUrl}>{c.inquiry} <Arrow /></a></div><div className="final-contacts"><span>{t.phone}</span><span>{t.email}</span></div></div>
    </section>

    <footer><a className="wordmark footer-mark" href="#top"><b>CAKE</b><i>SALON</i></a><p>© 2026 C&amp;C CORPORATION · SEOUL, KOREA</p><span>cakecnc@daum.net</span><a href={productUrls.a4} target="_blank" rel="noreferrer">SMARTSTORE <Arrow /></a></footer>
    <div className="mobile-cta" aria-label="Quick actions"><a href={productUrls.a4} target="_blank" rel="noreferrer">{c.purchase}</a><a href={inquiryUrl}>{c.inquiry}</a></div>
  </main>;
}
