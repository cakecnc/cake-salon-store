"use client";

import { useEffect, useState, type FormEvent, type ReactNode } from "react";

type Product = "designer-pro" | "research-pro" | "hashcat-pro";
type Language = "ko" | "en" | "ja" | "zh";

const PRODUCTS = {
  "designer-pro": {
    name: "Designer Pro",
    price: "$24 USD / 1 year",
    paypal: "https://www.paypal.com/ncp/payment/CBYLHTSA8TSA2",
    summaries: {
      ko: "A3 작업판, 프로젝트 저장, 브랜드·텍스트 레이어와 배치 레이아웃을 사용합니다.",
      en: "Unlock A3 canvas, project save, brand and text layers, and batch layouts.",
      ja: "A3キャンバス、プロジェクト保存、ブランド・文字レイヤー、バッチレイアウトを利用できます。",
      zh: "解锁 A3 画布、项目保存、品牌与文字图层以及批量排版。",
    },
    steps: {
      ko: ["PayPal 또는 네이버에서 Designer Pro를 결제합니다.", "결제 이메일과 거래번호를 아래에 등록합니다.", "확인 후 받은 코드를 입력하면 A3 기능이 1년간 열립니다."],
      en: ["Purchase Designer Pro with PayPal or Naver.", "Submit the payment email and transaction ID below.", "Enter the verified code to unlock A3 features for one year."],
      ja: ["PayPalまたはNAVERでDesigner Proを購入します。", "決済メールと取引番号を下に登録します。", "確認後に届くコードを入力するとA3機能が1年間有効になります。"],
      zh: ["通过 PayPal 或 Naver 购买 Designer Pro。", "在下方提交付款邮箱和交易编号。", "输入审核后收到的代码，即可解锁一年的 A3 功能。"],
    },
  },
  "research-pro": {
    name: "Research Pro",
    price: "$39 USD / 1 year",
    paypal: "https://www.paypal.com/ncp/payment/HBLSHDC9LQ9QA",
    summaries: {
      ko: "제품 가설을 구조화하고 네이버 웹·블로그·이미지·트렌드 근거를 한 리포트에서 비교합니다.",
      en: "Structure a product hypothesis and compare Naver web, blog, image, and trend evidence in one report.",
      ja: "商品仮説を整理し、NAVERのウェブ・ブログ・画像・トレンド根拠を一つのレポートで比較します。",
      zh: "整理产品假设，并在一份报告中比较 Naver 网页、博客、图片和趋势证据。",
    },
    steps: {
      ko: ["제품명·설명·시장·채널을 입력합니다.", "사진은 로컬 미리보기에만 사용하고 텍스트 근거 조회를 실행합니다.", "출처 링크와 조회시각을 확인한 뒤 7일 검증계획을 실행합니다."],
      en: ["Enter the product, description, market, and sales channel.", "Keep the photo local and run the text-based evidence search.", "Review source links and retrieval time, then execute the seven-day validation plan."],
      ja: ["商品名・説明・市場・販売チャネルを入力します。", "写真はローカル確認だけに使い、テキスト根拠検索を実行します。", "出典リンクと取得時刻を確認し、7日間の検証計画を進めます。"],
      zh: ["输入产品名称、说明、市场和销售渠道。", "图片仅用于本地预览，然后运行基于文本的证据检索。", "核对来源链接和检索时间，再执行七天验证计划。"],
    },
  },
  "hashcat-pro": {
    name: "Hashcat Pro Guide",
    price: "$24 USD / 1 year",
    paypal: "https://www.paypal.com/ncp/payment/5Z2CY7PQMK4VU",
    summaries: {
      ko: "본인 소유 또는 승인된 자료에 한해 로컬 명령어를 안전하게 구성하고 실행 전 점검합니다.",
      en: "Safely prepare local commands only for data you own or are explicitly authorized to test.",
      ja: "本人所有または明確な許可を得たデータだけを対象に、ローカルコマンドを安全に準備します。",
      zh: "仅针对本人所有或已明确授权的数据，安全生成本地命令。",
    },
    steps: {
      ko: ["승인 범위와 해시 형식을 먼저 확인합니다.", "운영체제·모드·로컬 파일명과 후보 방식을 선택합니다.", "명령어를 복사해 본인 컴퓨터에서만 실행하고 potfile을 보호합니다."],
      en: ["Confirm authorization and the hash format first.", "Choose the OS, mode, local filenames, and candidate method.", "Copy the command, run it only on your computer, and protect the potfile."],
      ja: ["権限範囲とハッシュ形式を先に確認します。", "OS・モード・ローカルファイル名・候補方式を選びます。", "コマンドは自分の端末だけで実行し、potfileを保護します。"],
      zh: ["先确认授权范围和哈希格式。", "选择操作系统、模式、本地文件名和候选方式。", "仅在自己的电脑上运行命令，并妥善保护 potfile。"],
    },
  },
} as const;

const LABELS = {
  ko: { guide: "상세 사용방법", buy: "PayPal로 구매", request: "결제 확인 요청", provider: "결제 수단", reference: "거래·주문 번호", email: "결제 이메일", submit: "확인 요청 보내기", code: "등록코드", activate: "Pro 활성화", active: "Pro 활성화됨", pending: "결제 내역을 확인한 뒤 등록코드를 이메일로 안내합니다." },
  en: { guide: "Detailed guide", buy: "Buy with PayPal", request: "Request payment review", provider: "Payment provider", reference: "Transaction or order ID", email: "Payment email", submit: "Submit for review", code: "Registration code", activate: "Activate Pro", active: "Pro activated", pending: "We verify the payment before sending a registration code by email." },
  ja: { guide: "詳しい使い方", buy: "PayPalで購入", request: "決済確認を依頼", provider: "決済方法", reference: "取引・注文番号", email: "決済メール", submit: "確認を依頼", code: "登録コード", activate: "Proを有効化", active: "Pro有効", pending: "決済確認後、登録コードをメールでご案内します。" },
  zh: { guide: "详细使用方法", buy: "使用 PayPal 购买", request: "申请付款审核", provider: "付款方式", reference: "交易或订单编号", email: "付款邮箱", submit: "提交审核", code: "注册码", activate: "激活 Pro", active: "Pro 已激活", pending: "付款审核完成后，我们会通过电子邮件发送注册码。" },
} as const;

export default function ProAccess({ product, children }: { product: Product; children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("ko");
  const [unlocked, setUnlocked] = useState(false);
  const [message, setMessage] = useState("");
  const config = PRODUCTS[product];
  const labels = LABELS[language];

  useEffect(() => {
    fetch(`/api/access?product=${product}`, { cache: "no-store" })
      .then((response) => response.ok ? response.json() : { active: false })
      .then((result) => setUnlocked(Boolean(result.active)))
      .catch(() => setUnlocked(false));
  }, [product]);

  async function submit(event: FormEvent<HTMLFormElement>, action: "request" | "redeem") {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form);
    const response = await fetch("/api/access", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, action, product }),
    });
    const result = await response.json();
    setMessage(result.message || result.error || "");
    if (response.ok && action === "redeem") setUnlocked(true);
  }

  return <section className={`pro-access pro-access-${product}`} aria-labelledby={`${product}-title`}>
    <div className="pro-access-top">
      <div>
        <span className="pro-access-kicker">C&amp;C DIGITAL PRODUCT · 1 YEAR</span>
        <h2 id={`${product}-title`}>{config.name}</h2>
        <p>{config.summaries[language]}</p>
      </div>
      <label className="pro-language">Language
        <select value={language} onChange={(event) => setLanguage(event.target.value as Language)}>
          <option value="ko">한국어</option><option value="en">English</option><option value="ja">日本語</option><option value="zh">中文</option>
        </select>
      </label>
    </div>
    <div className="pro-guide">
      <h3>{labels.guide}</h3>
      <ol>{config.steps[language].map((step) => <li key={step}>{step}</li>)}</ol>
    </div>
    {unlocked ? <div className="pro-active"><strong>{labels.active}</strong>{children}</div> : <>
      <div className="pro-commerce">
        <div><strong>{config.price}</strong><span>Digital service · No shipping fee · 1-year access</span></div>
        <a href={config.paypal} target="_blank" rel="noopener noreferrer">{labels.buy}</a>
      </div>
      <p className="pro-access-note">{labels.pending}</p>
      <div className="pro-forms">
        <form onSubmit={(event) => void submit(event, "request")}>
          <h3>{labels.request}</h3>
          <label>{labels.provider}<select name="provider"><option value="paypal">PayPal</option><option value="naver">Naver SmartStore</option></select></label>
          <label>{labels.reference}<input name="reference" required maxLength={100} autoComplete="off" /></label>
          <label>{labels.email}<input name="email" type="email" required maxLength={200} autoComplete="email" /></label>
          <button type="submit">{labels.submit}</button>
        </form>
        <form onSubmit={(event) => void submit(event, "redeem")}>
          <h3>{labels.code}</h3>
          <label>{labels.code}<input name="code" required maxLength={32} autoComplete="one-time-code" /></label>
          <button type="submit">{labels.activate}</button>
        </form>
      </div>
      {message && <p className="pro-message" role="status">{message}</p>}
    </>}
  </section>;
}
