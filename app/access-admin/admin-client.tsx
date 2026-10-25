"use client";

import { useEffect, useState } from "react";

type RequestRow = { id: number; product: string; provider: string; reference: string; buyer_email: string; status: string; created_at: number };

export default function AdminClient() {
  const [rows, setRows] = useState<RequestRow[]>([]);
  const [issued, setIssued] = useState<{ code: string; email: string } | null>(null);
  const [message, setMessage] = useState("");

  async function load() {
    const response = await fetch("/api/access", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "admin-list", product: "designer-pro" }) });
    const result = await response.json();
    if (response.ok) setRows(result.requests || []);
    else setMessage(result.error || "목록을 불러오지 못했습니다.");
  }

  useEffect(() => { void load(); }, []);

  async function issue(row: RequestRow) {
    if (!window.confirm(`${row.reference} 결제를 PayPal 또는 네이버에서 직접 확인하셨습니까?`)) return;
    const response = await fetch("/api/access", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "admin-issue", product: row.product, requestId: row.id }) });
    const result = await response.json();
    if (!response.ok) return setMessage(result.error || "발급하지 못했습니다.");
    setIssued({ code: result.code, email: result.email });
    setMessage(result.message);
    await load();
  }

  return <main style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 20px", fontFamily: "sans-serif" }}>
    <p><a href="/">C&amp;C Corporation</a></p>
    <h1>Pro 등록코드 관리</h1>
    <p>결제 사업자 화면에서 입금 완료를 직접 확인한 요청만 발급하세요. 코드는 발급 직후 한 번만 표시됩니다.</p>
    {issued && <section style={{ padding: 20, background: "#eef8ef", border: "1px solid #8ab28d", margin: "24px 0" }}><strong>{issued.code}</strong><p>전달 대상: {issued.email}</p></section>}
    {message && <p role="status">{message}</p>}
    <div style={{ overflowX: "auto" }}><table style={{ width: "100%", borderCollapse: "collapse" }}><thead><tr><th>상품</th><th>결제</th><th>거래번호</th><th>이메일</th><th>상태</th><th>관리</th></tr></thead><tbody>
      {rows.map((row) => <tr key={row.id}>{[row.product, row.provider, row.reference, row.buyer_email, row.status].map((value) => <td key={value} style={{ padding: 10, borderTop: "1px solid #ddd" }}>{value}</td>)}<td style={{ padding: 10, borderTop: "1px solid #ddd" }}>{row.status === "pending" && <button onClick={() => void issue(row)}>결제 확인 후 코드 발급</button>}</td></tr>)}
    </tbody></table></div>
  </main>;
}
