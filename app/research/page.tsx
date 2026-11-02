"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { researchCopy, researchPricingCopy, type ResearchLanguage, type ResearchTranslation } from "./research-i18n";
import "./research.css";

type SearchItem = { title: string; link: string; description?: string; thumbnail?: string };
type Point = { period: string; ratio: number };
type Evidence<T> = { ok: boolean; items?: T[]; points?: T[]; error?: string };
type ResearchData = {
  query: string;
  retrievedAt: string;
  web: Evidence<SearchItem>;
  blog: Evidence<SearchItem>;
  image: Evidence<SearchItem>;
  trend: Evidence<Point>;
  shoppingCategory: Evidence<Point>;
  shoppingKeyword: Evidence<Point>;
};
type Inputs = {
  productName: string;
  description: string;
  market: string;
  channel: string;
  price: string;
  shoppingCategoryId: string;
};

const initialInputs: Inputs = {
  productName: "", description: "", market: "대한민국", channel: "", price: "", shoppingCategoryId: "",
};

function safeUrl(value: string | undefined) {
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:" ? url.href : null;
  } catch {
    return null;
  }
}

function plainText(value: string | undefined) {
  return (value || "").replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&");
}

function SearchCard({ title, evidence, empty, onRetry, copy }: { title: string; evidence?: Evidence<SearchItem>; empty: string; onRetry: () => void; copy: ResearchTranslation["common"] }) {
  return (
    <section className="research-card">
      <h3>{title}</h3>
      {!evidence ? <p>{copy.pending}</p> : !evidence.ok ? <div><p className="research-error">{evidence.error || copy.lookupFailed}</p><button className="research-retry" type="button" onClick={onRetry}>{copy.retry}</button></div> :
        evidence.items?.length ? <ul className="research-results">{evidence.items.map((item, index) => {
          const href = safeUrl(item.link);
          return <li key={`${item.link}-${index}`}>
            {href ? <a href={href} target="_blank" rel="noopener noreferrer">{plainText(item.title) || copy.source}</a> : <strong>{plainText(item.title)}</strong>}
            {item.description && <p>{plainText(item.description)}</p>}
            {/* eslint-disable-next-line @next/next/no-img-element -- Avoid proxying third-party NAVER results through this server. */}
            {safeUrl(item.thumbnail) && <img className="research-thumbnail" src={safeUrl(item.thumbnail)!} alt={`${copy.imageAlt}: ${plainText(item.title)}`} loading="lazy" referrerPolicy="no-referrer" />}
          </li>;
        })}</ul> : <p>{empty}</p>}
    </section>
  );
}

function RatioCard({ title, evidence, query, note, directUrl, onRetry, copy }: { title: string; evidence?: Evidence<Point>; query: string; note: string; directUrl: string; onRetry: () => void; copy: ResearchTranslation["common"] }) {
  const points = evidence?.points || evidence?.items || [];
  return (
    <section className="research-card">
      <h3>{title}</h3>
      {!evidence ? <p>{copy.pending}</p> : !evidence.ok ? <div><p className="research-error">{evidence.error || copy.lookupFailed}</p><button className="research-retry" type="button" onClick={onRetry}>{copy.retry}</button></div> : points.length ?
        <div className="research-ratios" aria-label={title}>{points.map((point, index) => <div key={`${point.period}-${index}`}>
          <span>{point.period}</span><meter min="0" max="100" value={Math.max(0, Math.min(100, Number(point.ratio) || 0))} />
          <span>{Number(point.ratio).toFixed(1)}</span>
        </div>)}</div> : <p>{copy.noPoints}</p>}
      <p className="research-note">{note}</p>
      <a href={`${directUrl}${encodeURIComponent(query)}`} target="_blank" rel="noopener noreferrer">{copy.source}</a>
    </section>
  );
}

export default function ResearchPage() {
  const [language, setLanguage] = useState<ResearchLanguage>("ko");
  const [inputs, setInputs] = useState(initialInputs);
  const [previewUrl, setPreviewUrl] = useState("");
  const [reportInputs, setReportInputs] = useState<Inputs | null>(null);
  const [data, setData] = useState<ResearchData | null>(null);
  const [loading, setLoading] = useState(false);
  const [requestError, setRequestError] = useState("");
  const t = researchCopy[language];
  const pricing = researchPricingCopy[language];
  const locale = { ko: "ko-KR", en: "en-US", ja: "ja-JP", zh: "zh-CN" }[language];

  useEffect(() => () => { if (previewUrl) URL.revokeObjectURL(previewUrl); }, [previewUrl]);
  useEffect(() => { document.title = `${t.hero.title} | C&C Corporation`; }, [t.hero.title]);

  async function runResearch(event?: FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    if (!inputs.productName.trim() && !inputs.description.trim()) {
      setRequestError(t.form.missing);
      return;
    }
    if (!reportInputs || JSON.stringify(reportInputs) !== JSON.stringify(inputs)) setData(null);
    setReportInputs({ ...inputs });
    setLoading(true);
    setRequestError("");
    try {
      // Photo stays in browser memory; only the text fields below are sent.
      const response = await fetch("/api/research/naver-search", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputs),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || t.form.failed);
      setData(result.data || result);
    } catch (error) {
      setRequestError(error instanceof Error ? error.message : t.form.failed);
    } finally {
      setLoading(false);
    }
  }

  const product = reportInputs?.productName.trim() || reportInputs?.description.trim().slice(0, 40) || t.report.productFallback;
  const query = data?.query || product;
  const naverSearch = (where: string) => `https://search.naver.com/search.naver?where=${where}&query=`;
  const retrievedAt = data?.retrievedAt ? new Date(data.retrievedAt).toLocaleString(locale) : t.report.noResult;

  return <main className="research-page" lang={t.htmlLang}>
    <header className="research-hero">
      <div className="research-topbar">
        <Link href="/" className="research-brand" aria-label="C&C Corporation"><img src="/cnc-logo-transparent.png?v=white-20261102" alt="C&C Corporation" width="1744" height="901" /></Link>
        <div className="research-language"><select value={language} aria-label={t.hero.language} onChange={(event) => setLanguage(event.target.value as ResearchLanguage)}>{(Object.keys(researchCopy) as ResearchLanguage[]).map((code) => <option key={code} value={code}>{researchCopy[code].name}</option>)}</select></div>
      </div>
      <span className="research-kicker">{t.hero.kicker}</span>
      <h1>{t.hero.title}</h1>
      <p>{t.hero.intro}</p>
    </header>

    <form className="research-form" onSubmit={runResearch} aria-busy={loading}>
      <div className="research-field research-photo">
        <label htmlFor="research-photo">{t.form.photo}</label>
        <input id="research-photo" type="file" accept="image/*" onChange={(event) => setPreviewUrl(event.currentTarget.files?.[0] ? URL.createObjectURL(event.currentTarget.files[0]) : "")} />
        {/* eslint-disable-next-line @next/next/no-img-element -- Keep the object URL in this browser instead of using an image proxy. */}
        {previewUrl && <img src={previewUrl} alt={t.form.photo} />}
        <small>{t.form.photoNote}</small>
      </div>
      <div className="research-fields">
        <label>{t.form.product}<input value={inputs.productName} maxLength={100} onChange={(event) => setInputs({ ...inputs, productName: event.target.value })} placeholder={t.form.productPh} /></label>
        <label>{t.form.description}<textarea value={inputs.description} maxLength={1000} onChange={(event) => setInputs({ ...inputs, description: event.target.value })} placeholder={t.form.descriptionPh} /></label>
        <label>{t.form.market}<input value={inputs.market} maxLength={60} onChange={(event) => setInputs({ ...inputs, market: event.target.value })} placeholder={t.form.marketPh} /></label>
        <label>{t.form.channel}<input value={inputs.channel} maxLength={60} onChange={(event) => setInputs({ ...inputs, channel: event.target.value })} placeholder={t.form.channelPh} /></label>
        <label>{t.form.price}<input type="number" min="0" value={inputs.price} onChange={(event) => setInputs({ ...inputs, price: event.target.value })} placeholder={t.form.pricePh} /></label>
        <label>{t.form.category}<input inputMode="numeric" pattern="[0-9]{8}" title={t.form.category} value={inputs.shoppingCategoryId} onChange={(event) => setInputs({ ...inputs, shoppingCategoryId: event.target.value })} placeholder={t.form.categoryPh} /></label>
      </div>
      <p className="research-note">{t.form.disclaimer}</p>
      <button type="submit" disabled={loading}>{loading ? t.form.loading : reportInputs ? t.form.rerun : t.form.create}</button>
      {requestError && <p className="research-error" role="alert">{requestError} {t.form.preserve}</p>}
    </form>

    <form className="research-payment-form" onSubmit={(event) => event.preventDefault()}>
      <header>
        <span className="research-kicker">ACCESS PLANS</span>
        <h2>{pricing.status}</h2>
        <p>{pricing.preRegistration} · {pricing.digital}</p>
      </header>
      <fieldset>
        <legend className="sr-only">{pricing.paypalCta}</legend>
        <label className="research-plan-option">
          <input type="radio" name="research-plan" value="six-month" />
          <span><strong>{pricing.sixMonth.name}</strong><small>{pricing.sixMonth.billing}</small></span>
          <b>{pricing.sixMonth.price}</b>
        </label>
        <label className="research-plan-option research-plan-pro">
          <input type="radio" name="research-plan" value="pro" defaultChecked />
          <span><strong>{pricing.pro.name}</strong><small>{pricing.pro.billing}</small></span>
          <b>{pricing.pro.price}</b>
        </label>
      </fieldset>
      <div className="research-payment-footer">
        <p>{pricing.accessCode}</p>
        <button type="submit" disabled>{pricing.paypalCta}</button>
      </div>
    </form>

    {reportInputs && <div className="research-report" aria-live="polite">
      <header><span className="research-kicker">{t.report.kicker}</span><h2>{product}</h2><p>{t.report.query}: <strong>{query}</strong> · {t.report.retrieved}: {retrievedAt}</p></header>
      <div className="research-grid">
        <section className="research-card"><h3>{t.report.customerTitle}</h3><p>{t.report.customer(reportInputs.market, reportInputs.channel, product)}</p><p className="research-note">{t.report.hypothesisNote}</p></section>
        <section className="research-card"><h3>{t.report.positioningTitle}</h3><p>{t.report.positioning(reportInputs.description, product, reportInputs.price)}</p></section>
        <section className="research-card"><h3>{t.report.competitionTitle}</h3><p>{t.report.competition}</p></section>
        <SearchCard title={t.report.webTitle} evidence={data?.web} empty={t.report.webEmpty} onRetry={() => void runResearch()} copy={t.common} />
        <SearchCard title={t.report.blogTitle} evidence={data?.blog} empty={t.report.blogEmpty} onRetry={() => void runResearch()} copy={t.common} />
        <SearchCard title={t.report.imageTitle} evidence={data?.image} empty={t.report.imageEmpty} onRetry={() => void runResearch()} copy={t.common} />
        <RatioCard title={t.report.trendTitle} evidence={data?.trend} query={query} note={t.report.trendNote} directUrl="https://datalab.naver.com/keyword/trendResult.naver?keyword=" onRetry={() => void runResearch()} copy={t.common} />
        <RatioCard title={t.report.categoryTrendTitle} evidence={data?.shoppingCategory} query={query} note={t.report.categoryTrendNote} directUrl="https://datalab.naver.com/shoppingInsight/sCategory.naver?keyword=" onRetry={() => void runResearch()} copy={t.common} />
        <RatioCard title={t.report.keywordTrendTitle} evidence={data?.shoppingKeyword} query={query} note={t.report.keywordTrendNote} directUrl="https://datalab.naver.com/shoppingInsight/sKeyword.naver?keyword=" onRetry={() => void runResearch()} copy={t.common} />
        <section className="research-card"><h3>{t.report.risksTitle}</h3><p>{t.report.risks}</p></section>
        <section className="research-card"><h3>{t.report.planTitle}</h3><ol>{t.report.plan.map((item) => <li key={item}>{item}</li>)}</ol></section>
      </div>
      <footer className="research-sources"><h3>{t.report.sourcesTitle}</h3><p>{t.report.usedQuery}: {query} · {t.report.apiTime}: {retrievedAt}</p><p>{t.report.sourcesNote} <a href={`${naverSearch("web")}${encodeURIComponent(query)}`} target="_blank" rel="noopener noreferrer">{t.report.webSearch}</a> · <a href={`${naverSearch("blog")}${encodeURIComponent(query)}`} target="_blank" rel="noopener noreferrer">{t.report.blogSearch}</a> · <a href={`${naverSearch("image")}${encodeURIComponent(query)}`} target="_blank" rel="noopener noreferrer">{t.report.imageSearch}</a></p></footer>
    </div>}
  </main>;
}
