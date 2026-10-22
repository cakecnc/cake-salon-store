"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
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

function SearchCard({ title, evidence, empty, onRetry }: { title: string; evidence?: Evidence<SearchItem>; empty: string; onRetry: () => void }) {
  return (
    <section className="research-card">
      <h3>{title}</h3>
      {!evidence ? <p>근거 조회 전입니다.</p> : !evidence.ok ? <div><p className="research-error">{evidence.error || "조회에 실패했습니다. 다시 시도해 주세요."}</p><button className="research-retry" type="button" onClick={onRetry}>이 근거 다시 조회</button></div> :
        evidence.items?.length ? <ul className="research-results">{evidence.items.map((item, index) => {
          const href = safeUrl(item.link);
          return <li key={`${item.link}-${index}`}>
            {href ? <a href={href} target="_blank" rel="noopener noreferrer">{plainText(item.title) || "네이버 원문 보기"} ↗</a> : <strong>{plainText(item.title)}</strong>}
            {item.description && <p>{plainText(item.description)}</p>}
            {/* eslint-disable-next-line @next/next/no-img-element -- Avoid proxying third-party NAVER results through this server. */}
            {safeUrl(item.thumbnail) && <img className="research-thumbnail" src={safeUrl(item.thumbnail)!} alt={`텍스트 검색 이미지: ${plainText(item.title)}`} loading="lazy" referrerPolicy="no-referrer" />}
          </li>;
        })}</ul> : <p>{empty}</p>}
    </section>
  );
}

function RatioCard({ title, evidence, query, note, directUrl, onRetry }: { title: string; evidence?: Evidence<Point>; query: string; note: string; directUrl: string; onRetry: () => void }) {
  const points = evidence?.points || evidence?.items || [];
  return (
    <section className="research-card">
      <h3>{title}</h3>
      {!evidence ? <p>근거 조회 전입니다.</p> : !evidence.ok ? <div><p className="research-error">{evidence.error || "조회에 실패했습니다. 다시 시도해 주세요."}</p><button className="research-retry" type="button" onClick={onRetry}>이 근거 다시 조회</button></div> : points.length ?
        <div className="research-ratios" aria-label={`${title} 상대 지표`}>{points.map((point, index) => <div key={`${point.period}-${index}`}>
          <span>{point.period}</span><meter min="0" max="100" value={Math.max(0, Math.min(100, Number(point.ratio) || 0))} />
          <span>{Number(point.ratio).toFixed(1)}</span>
        </div>)}</div> : <p>표시할 추이 데이터가 없습니다.</p>}
      <p className="research-note">{note}</p>
      <a href={`${directUrl}${encodeURIComponent(query)}`} target="_blank" rel="noopener noreferrer">네이버 원문에서 확인 ↗</a>
    </section>
  );
}

export default function ResearchPage() {
  const [inputs, setInputs] = useState(initialInputs);
  const [previewUrl, setPreviewUrl] = useState("");
  const [reportInputs, setReportInputs] = useState<Inputs | null>(null);
  const [data, setData] = useState<ResearchData | null>(null);
  const [loading, setLoading] = useState(false);
  const [requestError, setRequestError] = useState("");

  useEffect(() => () => { if (previewUrl) URL.revokeObjectURL(previewUrl); }, [previewUrl]);

  async function runResearch(event?: FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    if (!inputs.productName.trim() && !inputs.description.trim()) {
      setRequestError("제품명 또는 설명을 입력해 주세요. 사진만으로 제품을 자동 인식하지 않습니다.");
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
      if (!response.ok) throw new Error(result.error || "네이버 근거 조회에 실패했습니다.");
      setData(result.data || result);
    } catch (error) {
      setRequestError(error instanceof Error ? error.message : "네이버 근거 조회에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  }

  const product = reportInputs?.productName.trim() || reportInputs?.description.trim().slice(0, 40) || "입력한 제품";
  const query = data?.query || product;
  const naverSearch = (where: string) => `https://search.naver.com/search.naver?where=${where}&query=`;
  const retrievedAt = data?.retrievedAt ? new Date(data.retrievedAt).toLocaleString("ko-KR") : "조회 결과 없음";

  return <main className="research-page">
    <header className="research-hero">
      <Link href="/" className="research-back">← 케익살롱</Link>
      <span className="research-kicker">PRODUCT RESEARCH</span>
      <h1>제품 시장 가설 연구</h1>
      <p>제품 설명을 바탕으로 가설을 정리하고, NAVER API HUB 근거를 함께 확인합니다.</p>
    </header>

    <form className="research-form" onSubmit={runResearch} aria-busy={loading}>
      <div className="research-field research-photo">
        <label htmlFor="research-photo">제품 사진 (선택)</label>
        <input id="research-photo" type="file" accept="image/*" onChange={(event) => setPreviewUrl(event.currentTarget.files?.[0] ? URL.createObjectURL(event.currentTarget.files[0]) : "")} />
        {/* eslint-disable-next-line @next/next/no-img-element -- Keep the object URL in this browser instead of using an image proxy. */}
        {previewUrl && <img src={previewUrl} alt="선택한 제품 사진의 로컬 미리보기" />}
        <small>사진은 이 브라우저에서만 미리보기로 사용하며 서버나 네이버에 전송되지 않습니다. 자동 사진 분석 기능은 연결되지 않았습니다.</small>
      </div>
      <div className="research-fields">
        <label>제품명<input value={inputs.productName} maxLength={100} onChange={(event) => setInputs({ ...inputs, productName: event.target.value })} placeholder="예: 식용 아이싱시트" /></label>
        <label>제품 설명<textarea value={inputs.description} maxLength={1000} onChange={(event) => setInputs({ ...inputs, description: event.target.value })} placeholder="특징, 사용처, 재질 등을 적어 주세요" /></label>
        <label>시장<input value={inputs.market} maxLength={60} onChange={(event) => setInputs({ ...inputs, market: event.target.value })} placeholder="예: 대한민국" /></label>
        <label>판매 채널<input value={inputs.channel} maxLength={60} onChange={(event) => setInputs({ ...inputs, channel: event.target.value })} placeholder="예: 스마트스토어" /></label>
        <label>예상 판매 가격 (원)<input type="number" min="0" value={inputs.price} onChange={(event) => setInputs({ ...inputs, price: event.target.value })} placeholder="예: 40000" /></label>
        <label>네이버 쇼핑 카테고리 ID<input inputMode="numeric" pattern="[0-9]{8}" title="8자리 네이버 쇼핑 카테고리 ID" value={inputs.shoppingCategoryId} onChange={(event) => setInputs({ ...inputs, shoppingCategoryId: event.target.value })} placeholder="8자리 코드, 선택 입력" /></label>
      </div>
      <p className="research-note">검색어는 입력한 제품명·설명에서 생성합니다. 사진 업로드만으로 분석하거나 이미지 역검색을 수행하지 않습니다.</p>
      <button type="submit" disabled={loading}>{loading ? "네이버 근거 조회 중…" : reportInputs ? "근거 다시 조회" : "시장 가설 리포트 만들기"}</button>
      {requestError && <p className="research-error" role="alert">{requestError} 기존 보고서는 유지됩니다.</p>}
    </form>

    {reportInputs && <div className="research-report" aria-live="polite">
      <header><span className="research-kicker">RESEARCH REPORT</span><h2>{product}</h2><p>사용한 검색어: <strong>{query}</strong> · 조회 시각: {retrievedAt}</p></header>
      <div className="research-grid">
        <section className="research-card"><h3>우선 고객군</h3><p>{reportInputs.market || "선택한 시장"}에서 {reportInputs.channel || "선택한 판매 채널"}을 통해 {product}을(를) 찾는 고객을 먼저 검증합니다.</p><p className="research-note">입력 정보로 만든 가설이며 실제 수요를 확인한 결과는 아닙니다.</p></section>
        <section className="research-card"><h3>포지셔닝 가설</h3><p>{reportInputs.description || product}의 사용 장면과 구매 이유를 고객 인터뷰로 확인한 뒤 메시지를 정합니다.{reportInputs.price && ` 입력 가격 ${Number(reportInputs.price).toLocaleString("ko-KR")}원은 가설입니다.`}</p></section>
        <section className="research-card"><h3>경쟁 대안</h3><p>동일 제품뿐 아니라 수작업 제작, 기존 디자인 활용, 다른 장식 재료도 비교 대상으로 조사합니다. 경쟁 상품 가격은 이 리포트에서 수집하지 않습니다.</p></section>
        <SearchCard title="네이버 웹 근거" evidence={data?.web} empty="관련 웹 자료가 검색되지 않았습니다." onRetry={() => void runResearch()} />
        <SearchCard title="블로그 후기·고객 질문" evidence={data?.blog} empty="관련 블로그 자료가 검색되지 않았습니다." onRetry={() => void runResearch()} />
        <SearchCard title="유사 이미지 참고" evidence={data?.image} empty="텍스트 검색으로 찾은 이미지가 없습니다." onRetry={() => void runResearch()} />
        <RatioCard title="검색어 트렌드" evidence={data?.trend} query={query} note="상대 관심도 추이입니다. 절대 검색량, 시장규모, 판매량을 뜻하지 않습니다." directUrl="https://datalab.naver.com/keyword/trendResult.naver?keyword=" onRetry={() => void runResearch()} />
        <RatioCard title="쇼핑 카테고리 클릭 추이" evidence={data?.shoppingCategory} query={query} note="쇼핑 인사이트 ratio는 선택 조건 내 상대 클릭 지표이며 실제 검색량이나 매출이 아닙니다. 카테고리 ID가 필요합니다." directUrl="https://datalab.naver.com/shoppingInsight/sCategory.naver?keyword=" onRetry={() => void runResearch()} />
        <RatioCard title="쇼핑 키워드 클릭 추이" evidence={data?.shoppingKeyword} query={query} note="쇼핑 인사이트 ratio는 상대 클릭 지표이며 실제 판매량이나 매출이 아닙니다." directUrl="https://datalab.naver.com/shoppingInsight/sKeyword.naver?keyword=" onRetry={() => void runResearch()} />
        <section className="research-card"><h3>위험과 한계</h3><p>검색 결과 수는 시장규모나 판매량의 근거가 아닙니다. 노출된 자료에는 편향이 있을 수 있습니다. 사진은 분석되지 않았으며, 네이버 이미지 검색은 입력 텍스트 기반입니다. 고객·주문·정산 자료로 가설을 별도 검증해야 합니다.</p></section>
        <section className="research-card"><h3>7일 실행 계획</h3><ol><li>1일차: 고객·사용 장면 가설 정리</li><li>2일차: 웹·블로그 원문 확인</li><li>3일차: 이미지 표현과 대안 비교</li><li>4일차: 잠재 고객 질문 수집</li><li>5일차: 가격·구성 가설 인터뷰</li><li>6일차: 상품 페이지 문구 시험</li><li>7일차: 반응과 주문 근거로 다음 실험 결정</li></ol></section>
      </div>
      <footer className="research-sources"><h3>출처와 조회 시각</h3><p>사용 검색어: {query} · 네이버 API 조회: {retrievedAt}</p><p>각 자료 제목에서 네이버 원문으로 이동할 수 있습니다. <a href={`${naverSearch("web")}${encodeURIComponent(query)}`} target="_blank" rel="noopener noreferrer">웹 직접 검색</a> · <a href={`${naverSearch("blog")}${encodeURIComponent(query)}`} target="_blank" rel="noopener noreferrer">블로그 직접 검색</a> · <a href={`${naverSearch("image")}${encodeURIComponent(query)}`} target="_blank" rel="noopener noreferrer">이미지 직접 검색</a></p></footer>
    </div>}
  </main>;
}
