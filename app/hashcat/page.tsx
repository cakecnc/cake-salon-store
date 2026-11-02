"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { hashcatCopy, type HashcatLanguage } from "./hashcat-i18n";
import "./hashcat.css";

const official = "https://github.com/hashcat/hashcat/releases/tag/v8.0.0";
const help = "https://github.com/cakecnc/hashcat/blob/main/docs/hashcat-help.md";
const requirements = "https://github.com/cakecnc/hashcat/blob/main/docs/hashcat-requirements.md";
const examples = "https://github.com/cakecnc/hashcat/blob/main/docs/hashcat-example-hashes.md";
const license = "https://github.com/hashcat/hashcat/blob/master/docs/license.txt";
const languages = Object.keys(hashcatCopy) as HashcatLanguage[];
const validFile = /^[A-Za-z0-9][A-Za-z0-9._-]{0,79}$/;
const matrixGlyphs = ["01ｱ7ｶ0अ1क9ज्ञान", "ﾊ4ｼ1ｶ0ﾀ8प्रकाश", "1ﾏ0ﾄ3ﾘ9ｸｽसूत्र", "AUTH7ｾ0ｷ1ｭ9रक्षा", "0GPU1HASH8MODE", "ﾛ1ｸ0ｶ7ﾙ3गणना", "11001010ﾅ5ﾋ", "STATUS0SESSION1", "ﾌ7ｧ0ｲ1ﾙ9LOCAL", "00110101ﾒ8म", "MASK1WORD0LIST", "ﾃ9ﾞ0ﾊ1ﾞｲ7ｽ", "HASHCAT8CORE01", "ｸ0ﾞ1ﾘ4ｰ9न्7"];
const sanskritPassages = ["असतो मा सद्गमय। तमसो मा ज्योतिर्गमय। मृत्योर्मा अमृतंगमय॥", "उद्यमेन हि सिध्यन्ति कार्याणि न मनोरथैः। न हि सुप्तस्य सिंहस्य प्रविशन्ति मुखे मृगाः॥", "वाचां सर्वत्र वैचित्र्यं नीति-विद्यां ददाति च॥"];
const matrixRain = Array.from({ length: 48 }, (_, index) => `${matrixGlyphs[index % matrixGlyphs.length]}${sanskritPassages[index % sanskritPassages.length]}${(index * 73 + 101).toString(2)}${matrixGlyphs[(index + 5) % matrixGlyphs.length]}`);
const prepLinks = [official, "", "", requirements, "", examples];

export default function HashcatPage() {
  const [language, setLanguage] = useState<HashcatLanguage>("ko");
  const [system, setSystem] = useState<"windows" | "mac" | "linux">("windows");
  const [mode, setMode] = useState("0");
  const [hashFile, setHashFile] = useState("my-hashes.txt");
  const [wordFile, setWordFile] = useState("my-words.txt");
  const [method, setMethod] = useState<"wordlist" | "mask">("wordlist");
  const [mask, setMask] = useState("?l?l?l?l?d?d");
  const [authorized, setAuthorized] = useState(false);
  const [copyStatus, setCopyStatus] = useState("");
  const t = hashcatCopy[language];
  const fileError = !validFile.test(hashFile) || (method === "wordlist" && !validFile.test(wordFile));
  const modeError = !/^\d{1,5}$/.test(mode);
  const maskError = method === "mask" && !/^(?:\?[ludsab]){1,12}$/.test(mask);
  const ready = !fileError && !modeError && !maskError;
  const executable = system === "windows" ? ".\\hashcat.exe" : "./hashcat";
  const command = ready ? `${executable} --session=local-recovery --status -m ${mode} -a ${method === "wordlist" ? "0" : "3"} ${hashFile} ${method === "wordlist" ? wordFile : system === "windows" ? `"${mask}"` : `'${mask}'`}` : t.generator.invalidCommand;

  useEffect(() => { document.title = `${t.guide} | C&C Corporation`; }, [t.guide]);

  async function copyCommand() {
    if (!authorized || !ready) return;
    try { await navigator.clipboard.writeText(command); setCopyStatus(t.generator.copied); }
    catch { setCopyStatus(t.generator.copyFailed); }
  }

  const pricing = {
    ko: { eyebrow: "07 / PRO ACCESS", title: "Hashcat Pro 이용권", lead: "현재 페이지는 무료 테스트용입니다. Pro 이용권은 PayPal 결제 확인 후 등록 코드를 이메일로 제공합니다.", six: "6개월 이용권", year: "1년 이용권", digital: "디지털 이용권 · 배송비 없음 · 자동 갱신 없음", pay: "PayPal로 결제", quote: "“과거는 서막에 불과하다.”" },
    en: { eyebrow: "07 / PRO ACCESS", title: "Hashcat Pro access", lead: "This page is currently available for free testing. A registration code is delivered by email after PayPal payment is confirmed.", six: "6-month access", year: "1-year access", digital: "Digital access · No shipping · No auto-renewal", pay: "Pay with PayPal", quote: "“What’s past is prologue.”" },
    ja: { eyebrow: "07 / PRO ACCESS", title: "Hashcat Pro 利用権", lead: "現在のページは無料テスト用です。PayPal決済確認後、登録コードをメールでお送りします。", six: "6か月利用権", year: "1年間利用権", digital: "デジタル利用権 · 配送料なし · 自動更新なし", pay: "PayPalで支払う", quote: "「過去は序章にすぎない。」" },
    zh: { eyebrow: "07 / PRO ACCESS", title: "Hashcat Pro 使用权", lead: "当前页面用于免费测试。PayPal付款确认后，注册码将通过电子邮件发送。", six: "6个月使用权", year: "1年使用权", digital: "数字使用权 · 无运费 · 不自动续费", pay: "使用PayPal付款", quote: "“过去只是序幕。”" },
  }[language];

  return (
    <main className="hashcat-page" lang={t.htmlLang}>
      <div className="matrix-rain" aria-hidden="true">{matrixRain.map((column, index) => <span key={`${index}-${column}`} style={{ left: `${((index + .5) * 100 / matrixRain.length + (index % 3 - 1) * .45).toFixed(2)}%`, animationDuration: `${8 + (index * 7) % 17}s`, animationDelay: `-${(index * 11) % 25}s`, opacity: .38 + (index % 6) * .1, fontSize: `${9 + index % 5}px`, filter: index % 11 === 0 ? "blur(.8px)" : "none" }}>{column}</span>)}</div>
      <header className="hashcat-hero">
        <div className="hashcat-topbar">
          <Link className="hashcat-brand" href="/" aria-label={t.home}><img src="/cnc-logo-hashcat.png?v=red-20261102" alt="C&C Corporation" width="1746" height="901" /></Link>
          <div className="hashcat-language"><select value={language} aria-label="Language" onChange={(event) => { setLanguage(event.target.value as HashcatLanguage); setCopyStatus(""); }}>{languages.map((code) => <option key={code} value={code}>{hashcatCopy[code].name}</option>)}</select></div>
        </div>
        <div className="hashcat-hero-grid">
          <div><p className="hashcat-kicker">{t.hero.kicker}</p><h1>{t.hero.title}<br /><em>{t.hero.accent}</em></h1><p className="hashcat-lead">{t.hero.lead}</p><a className="hashcat-primary" href="#generator">{t.hero.cta} <span aria-hidden="true">↗</span></a></div>
          <aside className="hashcat-hero-note" aria-label={t.hero.noteLabel}><span>{t.hero.noteLabel}</span><strong>{t.hero.noteTitle}</strong><p>{t.hero.note}</p></aside>
        </div>
      </header>
      <div className="hashcat-content">
        <section className="hashcat-section" aria-labelledby="use-title"><div className="hashcat-section-heading"><span>{t.scope.eyebrow}</span><h2 id="use-title">{t.scope.title}</h2></div><div className="hashcat-two-col"><article className="hashcat-card hashcat-allowed"><h3>{t.scope.allowedTitle}</h3><ul>{t.scope.allowed.map((item) => <li key={item}>{item}</li>)}</ul></article><article className="hashcat-card hashcat-forbidden"><h3>{t.scope.forbiddenTitle}</h3><ul>{t.scope.forbidden.map((item) => <li key={item}>{item}</li>)}</ul></article></div></section>
        <section className="hashcat-section" aria-labelledby="start-title"><div className="hashcat-section-heading"><span>{t.prep.eyebrow}</span><h2 id="start-title">{t.prep.title}</h2></div><div className="hashcat-steps">{t.prep.steps.map((step, index) => <article key={step.title}><b>{index + 1}</b><h3>{step.title}</h3><p>{step.body}</p>{step.link && <a href={prepLinks[index]} target="_blank" rel="noreferrer">{step.link} ↗</a>}</article>)}</div><div className="hashcat-os"><h3>{t.prep.osTitle}</h3><div><span>Windows PowerShell</span><code>cd C:\hashcat; .\hashcat.exe -I</code></div><div><span>macOS Terminal</span><code>cd ~/hashcat &amp;&amp; chmod +x ./hashcat &amp;&amp; ./hashcat -I</code></div><div><span>Linux Terminal</span><code>cd ~/hashcat &amp;&amp; chmod +x ./hashcat &amp;&amp; ./hashcat -I</code></div><p>{t.prep.osNote}</p></div></section>
        <section className="hashcat-section" aria-labelledby="methods-title"><div className="hashcat-section-heading"><span>{t.methods.eyebrow}</span><h2 id="methods-title">{t.methods.title}</h2></div><div className="hashcat-two-col">{t.methods.cards.map((card) => <article className="hashcat-card" key={card.code}><span className="hashcat-card-num">{card.code}</span><h3>{card.title}</h3><p>{card.body}</p><p>{card.examples.map((line) => <code key={line}>{line}<br /></code>)}</p></article>)}</div></section>
        <section className="hashcat-section" id="generator" aria-labelledby="generator-title"><div className="hashcat-section-heading"><span>{t.generator.eyebrow}</span><h2 id="generator-title">{t.generator.title}</h2></div><div className="hashcat-generator"><div className="hashcat-fields">
          <label>{t.generator.os}<select value={system} onChange={(event) => { setSystem(event.target.value as typeof system); setCopyStatus(""); }}><option value="windows">Windows PowerShell</option><option value="mac">macOS Terminal</option><option value="linux">Linux Terminal</option></select></label>
          <label>{t.generator.mode} <small>{t.generator.modeHint}</small><input inputMode="numeric" value={mode} onChange={(event) => { setMode(event.target.value); setCopyStatus(""); }} aria-invalid={modeError} /></label>
          <label>{t.generator.hashFile} <small>{t.generator.hashHint}</small><input value={hashFile} onChange={(event) => { setHashFile(event.target.value); setCopyStatus(""); }} aria-invalid={!validFile.test(hashFile)} /></label>
          <label>{t.generator.method}<select value={method} onChange={(event) => { setMethod(event.target.value as typeof method); setCopyStatus(""); }}><option value="wordlist">{t.generator.wordlist}</option><option value="mask">{t.generator.mask}</option></select></label>
          {method === "wordlist" ? <label>{t.generator.wordFile}<input value={wordFile} onChange={(event) => { setWordFile(event.target.value); setCopyStatus(""); }} aria-invalid={!validFile.test(wordFile)} /></label> : <label>{t.generator.mask} <small>{t.generator.maskHint}</small><input value={mask} onChange={(event) => { setMask(event.target.value); setCopyStatus(""); }} aria-invalid={maskError} /></label>}
        </div><p className="hashcat-field-help">{t.generator.help}</p><div className="hashcat-command"><span>{t.generator.command}</span><code>{command}</code></div>{!ready && <p className="hashcat-error" role="alert">{t.generator.invalid}</p>}<label className="hashcat-consent"><input type="checkbox" checked={authorized} onChange={(event) => { setAuthorized(event.target.checked); setCopyStatus(""); }} /><span>{t.generator.consent}</span></label><button type="button" className="hashcat-primary" disabled={!authorized || !ready} onClick={copyCommand}>{t.generator.copy}</button><p className="hashcat-copy-status" role="status">{copyStatus}</p><div className="hashcat-runbook"><h3>{t.generator.runTitle}</h3><ol>{t.generator.run.map((item) => <li key={item}>{item}</li>)}</ol></div></div></section>
        <section className="hashcat-section" aria-labelledby="finish-title"><div className="hashcat-section-heading"><span>{t.finish.eyebrow}</span><h2 id="finish-title">{t.finish.title}</h2></div><div className="hashcat-steps">{t.finish.steps.map((step, index) => <article key={step.title}><b>{index + 1}</b><h3>{step.title}</h3><p>{step.body}</p>{index === 1 && <p><code>{executable} --session=local-recovery --restore</code></p>}{index === 2 && <p><code>{executable} -m {modeError ? "MODE" : mode} --show {validFile.test(hashFile) ? hashFile : "my-hashes.txt"}</code></p>}</article>)}</div><aside className="hashcat-warning"><strong>{t.finish.warningTitle}</strong><p>{t.finish.warning}</p></aside></section>
        <section className="hashcat-section" aria-labelledby="terms-title"><div className="hashcat-section-heading"><span>{t.terms.eyebrow}</span><h2 id="terms-title">{t.terms.title}</h2></div><dl className="hashcat-glossary">{t.terms.items.map(([term, definition]) => <div key={term}><dt>{term}</dt><dd>{definition}</dd></div>)}</dl><p className="hashcat-sources">{t.terms.sourcePrefix} <a href={official} target="_blank" rel="noreferrer">{t.terms.release}</a> · <a href={help} target="_blank" rel="noreferrer">{t.terms.help}</a>. {t.terms.sourceSuffix}</p></section>
        <section className="hashcat-section hashcat-pricing" aria-labelledby="pricing-title"><div className="hashcat-section-heading"><span>{pricing.eyebrow}</span><h2 id="pricing-title">{pricing.title}</h2><p>{pricing.lead}</p></div><div className="hashcat-plan-grid"><article className="hashcat-plan"><span>06 MONTHS</span><h3>{pricing.six}</h3><p className="hashcat-price"><strong>$33</strong><small>USD</small></p><p>{pricing.digital}</p><a className="hashcat-paypal" href="https://www.paypal.com/ncp/payment/W7KAJ837HWYFA" target="_blank" rel="noreferrer">{pricing.pay} ↗</a></article><article className="hashcat-plan hashcat-plan-featured"><span>12 MONTHS</span><h3>{pricing.year}</h3><p className="hashcat-price"><strong>$55</strong><small>USD</small></p><p>{pricing.digital}</p><a className="hashcat-paypal" href="https://www.paypal.com/ncp/payment/HC8WC5F8MAT7A" target="_blank" rel="noreferrer">{pricing.pay} ↗</a></article></div></section>
        <footer className="hashcat-license"><div className="hashcat-license-copy"><span>{t.license.label}</span><p>{t.license.page}</p><p>{t.license.source} <a href={license} target="_blank" rel="noreferrer">MIT License ↗</a></p></div><figure className="hashcat-quote"><blockquote lang="en">“What&apos;s past is prologue.”</blockquote><p>{pricing.quote}</p><figcaption>William Shakespeare · <cite>The Tempest</cite> · Act II, Scene I</figcaption></figure></footer>
      </div>
    </main>
  );
}
