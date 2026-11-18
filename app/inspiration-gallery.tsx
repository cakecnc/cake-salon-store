"use client";

import { useState } from "react";

type Lang = "ko" | "en" | "ja" | "zh";
type Filter = "all" | "seasonal" | "celebration" | "business";

export const inspirationNav: Record<Lang, string> = {
  ko: "디자인 아이디어",
  en: "Design Ideas",
  ja: "デザインアイデア",
  zh: "设计灵感",
};

const conceptMeta: Array<{
  id: string;
  category: Exclude<Filter, "all">;
  size: string;
  purpose: number;
  tone: string;
  mark: string;
  artwork: string;
}> = [
  { id: "CS-W01", category: "seasonal", size: "55mm", purpose: 3, tone: "forest", mark: "✳", artwork: "NOËL" },
  { id: "CS-W02", category: "seasonal", size: "35mm", purpose: 3, tone: "snow", mark: "❄", artwork: "WINTER" },
  { id: "CS-W03", category: "seasonal", size: "A4", purpose: 2, tone: "burgundy", mark: "✦", artwork: "HOLIDAY" },
  { id: "CS-W04", category: "seasonal", size: "55mm", purpose: 1, tone: "copper", mark: "✧", artwork: "THANK YOU" },
  { id: "CS-G05", category: "celebration", size: "55mm", purpose: 3, tone: "rose", mark: "♡", artwork: "GIFT" },
  { id: "CS-G06", category: "celebration", size: "A4", purpose: 2, tone: "cream", mark: "✺", artwork: "MEMORIES" },
  { id: "CS-B07", category: "business", size: "35mm", purpose: 1, tone: "midnight", mark: "◆", artwork: "SIGNATURE" },
  { id: "CS-B08", category: "business", size: "55mm", purpose: 4, tone: "green", mark: "◈", artwork: "WELCOME" },
];

type ConceptText = { title: string; description: string; application: string };
type GalleryText = {
  kicker: string;
  title: string;
  intro: string;
  filters: Record<Filter, string>;
  concept: string;
  format: string;
  inquire: string;
  studio: string;
  notice: string;
  footerTitle: string;
  footerDetail: string;
  items: ConceptText[];
};

const galleryCopy: Record<Lang, GalleryText> = {
  ko: {
    kicker: "EDIBLE DESIGN INSPIRATION",
    title: "아이싱시트 한 장에서 시작되는 무한한 디자인.",
    intro: "크리스마스 쿠키부터 사진 케이크와 브랜드 선물까지. 케익살롱이 직접 생산하는 식용 아이싱시트로 구현할 디자인 아이디어를 살펴보세요.",
    filters: { all: "전체 아이디어", seasonal: "크리스마스", celebration: "기념일·선물", business: "기업·호텔" },
    concept: "제작 콘셉트", format: "추천 출력 규격", inquire: "이 아이디어로 제작 문의", studio: "직접 디자인하기",
    notice: "그래픽은 디자인 방향을 설명하는 콘셉트입니다. 실제 제작물·판매 중인 완제품 사진이 아닙니다. 규격과 부착 방법은 주문 전 확인합니다.",
    footerTitle: "마음에 드는 아이디어가 있나요?",
    footerDetail: "아이디어를 선택하면 맞춤 제작 문의서에 적용 대상과 인쇄 규격이 입력됩니다. 실제 이미지 파일은 고객이 준비하거나 별도로 상담합니다.",
    items: [
      { title: "크리스마스 모노그램 쿠키", description: "이름과 눈꽃 패턴을 조합한 연말 쿠키용 원형 식용 이미지", application: "크리스마스 쿠키" },
      { title: "스노우 마카롱", description: "겨울 문구와 눈송이를 작은 원형으로 구성한 마카롱 장식", application: "크리스마스 마카롱" },
      { title: "홀리데이 포토케이크", description: "가족 사진과 연말 메시지를 함께 담는 케이크용 인쇄 디자인", application: "포토케이크" },
      { title: "기업 연말 감사 쿠키", description: "기업 로고와 감사 메시지를 결합한 식용 프린팅", application: "기업 연말 로고 쿠키" },
      { title: "감사의 선물 라벨", description: "답례품과 롤리팝에 사용할 수 있는 이름·메시지 디자인", application: "선물·롤리팝 식용 이미지" },
      { title: "우리 가족 포토케이크", description: "생일 사진과 문구를 활용한 나만의 포토케이크", application: "생일 케이크" },
      { title: "브랜드 마카롱", description: "카페·기업 로고를 미니 디저트에 자연스럽게 배치", application: "브랜드 마카롱" },
      { title: "호텔 웰컴 디자인", description: "호텔·행사 환영 메시지를 위한 식용 로고와 패턴", application: "호텔 웰컴 디저트" },
    ],
  },
  en: {
    kicker: "EDIBLE DESIGN INSPIRATION",
    title: "One icing sheet. Endless creative ideas.",
    intro: "From Christmas cookies to photo cakes and branded gifts, explore design concepts made possible with Cake Salon's own edible icing sheets.",
    filters: { all: "All ideas", seasonal: "Christmas", celebration: "Celebrations", business: "Business & hotels" },
    concept: "Design concept", format: "Suggested print size", inquire: "Inquire about this idea", studio: "Design your own",
    notice: "These graphics illustrate concepts, not actual finished products or items currently sold. Confirm size and application before ordering.",
    footerTitle: "Found an idea you love?",
    footerDetail: "Selecting an idea pre-fills the custom order form with its application and size. Provide your own image or discuss artwork with us.",
    items: [
      { title: "Christmas monogram cookie", description: "Personalized holiday lettering and snowflake motifs for round cookie prints", application: "Christmas cookie" },
      { title: "Snowflake macarons", description: "A winter message and delicate snowflake artwork for mini round prints", application: "Christmas macarons" },
      { title: "Holiday photo cake", description: "Combine family photography and seasonal greetings in one edible print", application: "Photo cake" },
      { title: "Corporate thank-you cookies", description: "Company logo and year-end message as edible artwork", application: "Branded holiday cookies" },
      { title: "Gift message rounds", description: "Names and heartfelt notes for favors and lollipops", application: "Gifts and lollipops" },
      { title: "Family photo cake", description: "A personalized cake with a birthday photo and message", application: "Birthday cake" },
      { title: "Brand macarons", description: "Small edible logo prints for cafes and corporate gifting", application: "Branded macarons" },
      { title: "Hotel welcome collection", description: "Welcome notes and edible patterns for hospitality events", application: "Hotel welcome desserts" },
    ],
  },
  ja: {
    kicker: "EDIBLE DESIGN INSPIRATION",
    title: "一枚のアイシングシートから、無限のデザインへ。",
    intro: "クリスマスクッキーからフォトケーキ、ブランドギフトまで。Cake Salonの食用アイシングシートで表現するアイデアを紹介します。",
    filters: { all: "すべて", seasonal: "クリスマス", celebration: "記念日・ギフト", business: "企業・ホテル" },
    concept: "制作コンセプト", format: "推奨プリントサイズ", inquire: "このアイデアで相談", studio: "自分でデザイン",
    notice: "画像はコンセプト表現で、実際の製品写真や販売中の完成品ではありません。サイズと使用方法はご注文前にご確認ください。",
    footerTitle: "気になるアイデアはありますか？",
    footerDetail: "選択すると制作相談フォームに用途とサイズが入力されます。画像ファイルは別途ご準備・ご相談ください。",
    items: [
      { title: "クリスマス文字入りクッキー", description: "名前と雪の模様を組み合わせた丸形の食用画像", application: "クリスマスクッキー" },
      { title: "スノーマカロン", description: "小さな丸形に冬の文字と雪の結晶を配置", application: "クリスマスマカロン" },
      { title: "ホリデーフォトケーキ", description: "家族写真と季節のメッセージをひとつに", application: "フォトケーキ" },
      { title: "企業の感謝クッキー", description: "ロゴと年末の感謝を食用プリントで表現", application: "企業ギフトクッキー" },
      { title: "ギフトメッセージ", description: "お礼の名前や言葉を入れた丸形デザイン", application: "ギフト・ロリポップ" },
      { title: "家族のフォトケーキ", description: "写真と誕生日メッセージで仕上げるケーキ", application: "バースデーケーキ" },
      { title: "ブランドマカロン", description: "カフェや企業のロゴを小さな菓子に", application: "ブランドマカロン" },
      { title: "ホテルのウェルカム", description: "ホテルやイベントの歓迎メッセージ", application: "ホテルのウェルカムデザート" },
    ],
  },
  zh: {
    kicker: "EDIBLE DESIGN INSPIRATION",
    title: "一张糖霜纸，开启无限设计灵感。",
    intro: "从圣诞曲奇到照片蛋糕和品牌礼品，探索使用 Cake Salon 自产可食用糖霜纸实现的设计创意。",
    filters: { all: "全部创意", seasonal: "圣诞节", celebration: "庆祝与礼品", business: "企业与酒店" },
    concept: "制作概念", format: "建议打印规格", inquire: "咨询此设计", studio: "自行设计",
    notice: "图形仅用于说明设计概念，并非实物成品照片或在售成品。下单前请确认尺寸与使用方法。",
    footerTitle: "发现喜欢的设计了吗？",
    footerDetail: "选择创意后，定制咨询表将自动填入用途和规格。图片文件请自行准备或单独咨询。",
    items: [
      { title: "圣诞字母曲奇", description: "姓名与雪花图案组合的圆形食用打印", application: "圣诞曲奇" },
      { title: "雪花马卡龙", description: "小尺寸圆形冬季文字和雪花设计", application: "圣诞马卡龙" },
      { title: "节日照片蛋糕", description: "在蛋糕上结合家庭照片与节日祝福", application: "照片蛋糕" },
      { title: "企业年末感谢曲奇", description: "品牌标志与年末感谢文字食用打印", application: "企业礼品曲奇" },
      { title: "礼品祝福标签", description: "适用于礼品和棒棒糖的姓名与祝福", application: "礼品及棒棒糖" },
      { title: "家庭照片蛋糕", description: "生日照片与个性化祝福设计", application: "生日蛋糕" },
      { title: "品牌马卡龙", description: "咖啡馆和企业礼品的精致小尺寸标志", application: "品牌马卡龙" },
      { title: "酒店欢迎设计", description: "酒店和活动迎宾信息与食用图案", application: "酒店迎宾甜品" },
    ],
  },
};

export type InspirationRequest = {
  purpose: number;
  product: string;
  size: string;
  notes: string;
};

export default function InspirationGallery({
  lang,
  onChoose,
}: {
  lang: Lang;
  onChoose: (request: InspirationRequest) => void;
}) {
  const [filter, setFilter] = useState<Filter>("all");
  const content = galleryCopy[lang];
  const visibleConcepts = conceptMeta.filter((concept) => filter === "all" || concept.category === filter);
  const filters: Filter[] = ["all", "seasonal", "celebration", "business"];

  return (
    <section className="inspiration-section" id="inspiration" aria-labelledby="inspiration-title">
      <div className="inspiration-shell">
        <div className="inspiration-heading">
          <div>
            <p className="inspiration-kicker">{content.kicker}</p>
            <h2 id="inspiration-title">{content.title}</h2>
          </div>
          <p>{content.intro}</p>
        </div>
        <div className="inspiration-filters" aria-label={content.title}>
          {filters.map((key) => (
            <button
              key={key}
              type="button"
              aria-pressed={filter === key}
              className={filter === key ? "is-active" : ""}
              onClick={() => setFilter(key)}
            >
              {content.filters[key]}
            </button>
          ))}
        </div>
        <div className="inspiration-grid">
          {visibleConcepts.map((concept) => {
            const index = conceptMeta.findIndex((item) => item.id === concept.id);
            const item = content.items[index];
            return (
              <article className="inspiration-card" key={concept.id}>
                <div className={"inspiration-art tone-" + concept.tone} aria-hidden="true">
                  <span className="inspiration-art-index">{concept.id}</span>
                  <span className="inspiration-art-emblem">{concept.mark}</span>
                  <span className="inspiration-art-name">{concept.artwork}</span>
                </div>
                <div className="inspiration-card-body">
                  <div className="inspiration-card-label"><span>{content.concept}</span><span>{concept.id}</span></div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <div className="inspiration-card-spec"><span>{content.format}</span><strong>{concept.size}</strong></div>
                  <a
                    href="#custom-design"
                    onClick={() => onChoose({
                      purpose: concept.purpose,
                      product: item.application,
                      size: concept.size,
                      notes: concept.id + " · " + item.title + " · " + item.description,
                    })}
                  >
                    {content.inquire}<span aria-hidden="true">↗</span>
                  </a>
                </div>
              </article>
            );
          })}
        </div>
        <p className="inspiration-note">{content.notice}</p>
        <div className="inspiration-footer">
          <div><h3>{content.footerTitle}</h3><p>{content.footerDetail}</p></div>
          <a href="/designer">{content.studio}<span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </section>
  );
}
