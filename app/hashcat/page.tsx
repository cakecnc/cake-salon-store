"use client";

import { useState } from "react";
import Link from "next/link";
import "./hashcat.css";

const official = "https://github.com/cakecnc/hashcat/tree/main";
const help = "https://github.com/cakecnc/hashcat/blob/main/docs/hashcat-help.md";

const validFile = /^[A-Za-z0-9][A-Za-z0-9._-]{0,79}$/;

export default function HashcatPage() {
  const [system, setSystem] = useState<"windows" | "mac" | "linux">("windows");
  const [mode, setMode] = useState("0");
  const [hashFile, setHashFile] = useState("my-hashes.txt");
  const [wordFile, setWordFile] = useState("my-words.txt");
  const [method, setMethod] = useState<"wordlist" | "mask">("wordlist");
  const [mask, setMask] = useState("?l?l?l?l?d?d");
  const [authorized, setAuthorized] = useState(false);
  const [copyStatus, setCopyStatus] = useState("");

  const fileError = !validFile.test(hashFile) || (method === "wordlist" && !validFile.test(wordFile));
  const modeError = !/^\d{1,5}$/.test(mode);
  const maskError = method === "mask" && !/^(?:\?[ludsab]){1,12}$/.test(mask);
  const ready = !fileError && !modeError && !maskError;
  const executable = system === "windows" ? ".\\hashcat.exe" : "./hashcat";
  const command = ready
    ? `${executable} --session=local-recovery --status -m ${mode} -a ${method === "wordlist" ? "0" : "3"} ${hashFile} ${method === "wordlist" ? wordFile : system === "windows" ? `"${mask}"` : `'${mask}'`}`
    : "입력값을 확인하면 명령어가 표시됩니다.";

  async function copyCommand() {
    if (!authorized || !ready) return;
    try {
      await navigator.clipboard.writeText(command);
      setCopyStatus("명령어를 복사했습니다. 실행 전 파일 경로와 해시 형식을 다시 확인하세요.");
    } catch {
      setCopyStatus("복사하지 못했습니다. 브라우저의 클립보드 권한을 확인하세요.");
    }
  }

  return (
    <main className="hashcat-page">
      <header className="hashcat-hero">
        <nav aria-label="현재 위치"><Link href="/">케익살롱</Link><span aria-hidden="true">/</span><span>Hashcat 안내</span></nav>
        <div className="hashcat-hero-grid">
          <div>
            <p className="hashcat-kicker">LOCAL SECURITY TOOL · BEGINNER GUIDE</p>
            <h1>Hashcat을<br /><em>안전하게 시작하기</em></h1>
            <p className="hashcat-lead">Hashcat은 비밀번호를 알아내기 위해 후보를 해시와 비교하는 로컬 복구 도구입니다. 본인 소유 자료의 복구나 승인된 보안 점검에만 사용하세요.</p>
            <a className="hashcat-primary" href="#generator">로컬 명령어 만들기 <span aria-hidden="true">↗</span></a>
          </div>
          <aside className="hashcat-hero-note" aria-label="사용 전 핵심 안내">
            <span>01 / 먼저 확인하세요</span>
            <strong>권한이 있는 자료인가요?</strong>
            <p>이 페이지는 명령어만 만들고 복사합니다. 해시나 파일을 업로드받지 않으며, 웹 서버에서 Hashcat을 실행하지 않습니다.</p>
          </aside>
        </div>
      </header>

      <div className="hashcat-content">
        <section className="hashcat-section" aria-labelledby="use-title">
          <div className="hashcat-section-heading"><span>01 / 사용 범위</span><h2 id="use-title">어디에 쓸 수 있나요?</h2></div>
          <div className="hashcat-two-col">
            <article className="hashcat-card hashcat-allowed"><h3>허용되는 활용</h3><ul><li>본인 소유 압축파일·백업 비밀번호 복구</li><li>서면 또는 명확한 승인을 받은 사내 보안감사</li><li>시스템 이전 및 백업의 복구 가능성 검증</li><li>개발용 테스트 해시 확인</li></ul></article>
            <article className="hashcat-card hashcat-forbidden"><h3>허용되지 않는 활용</h3><ul><li>타인 계정이나 파일의 비밀번호 해제</li><li>유출된 계정정보를 이용한 공격</li><li>승인받지 않은 회사 데이터나 Wi-Fi 공격</li></ul></article>
          </div>
        </section>

        <section className="hashcat-section" aria-labelledby="start-title">
          <div className="hashcat-section-heading"><span>02 / 준비 순서</span><h2 id="start-title">설치부터 첫 확인까지</h2></div>
          <div className="hashcat-steps">
            <article><b>1</b><h3>공식 파일 받기</h3><p><a href={official} target="_blank" rel="noreferrer">공식 저장소</a>의 최신 릴리스 링크에서 운영체제에 맞는 파일을 받고 압축을 풉니다. 제공되는 실행 파일을 먼저 사용하고, 필요한 GPU 드라이버·런타임은 <a href="https://github.com/cakecnc/hashcat/blob/main/docs/hashcat-requirements.md" target="_blank" rel="noreferrer">요구사항 문서</a>를 확인하세요.</p></article>
            <article><b>2</b><h3>장치 확인</h3><p>터미널에서 <code>hashcat -I</code>를 실행해 사용 가능한 GPU·CPU와 백엔드를 확인합니다. 장치가 표시되지 않으면 드라이버와 런타임을 먼저 점검하세요.</p></article>
            <article><b>3</b><h3>해시 형식 확인</h3><p>원본 파일을 그대로 명령어에 넣는 방식이 아닙니다. 본인 자료에서 추출한 해시 파일을 준비하고 <code>hashcat --identify my-hashes.txt</code>로 가능한 형식을 확인한 뒤, <a href="https://github.com/cakecnc/hashcat/blob/main/docs/hashcat-example-hashes.md" target="_blank" rel="noreferrer">공식 예시</a>와 대조해 <code>-m</code> 번호를 선택하세요. 자동 판별 결과도 검증이 필요합니다.</p></article>
          </div>
          <div className="hashcat-os">
            <h3>운영체제별 첫 실행 예시</h3>
            <div><span>Windows PowerShell</span><code>.\hashcat.exe -I</code></div>
            <div><span>macOS 터미널</span><code>./hashcat -I</code></div>
            <div><span>Linux 터미널</span><code>./hashcat -I</code></div>
            <p>압축을 푼 Hashcat 폴더에서 실행한 예시입니다. 시스템 설치본은 실행 파일 이름만 <code>hashcat</code>으로 바꾸세요.</p>
          </div>
        </section>

        <section className="hashcat-section" aria-labelledby="methods-title">
          <div className="hashcat-section-heading"><span>03 / 방법 이해</span><h2 id="methods-title">워드리스트와 마스크</h2></div>
          <div className="hashcat-two-col">
            <article className="hashcat-card"><span className="hashcat-card-num">-a 0</span><h3>워드리스트 방식</h3><p>내가 기억하는 단어·암호 후보를 텍스트 파일에 한 줄씩 적고 순서대로 비교합니다. 후보가 좁혀져 있을 때 먼저 사용하세요.</p></article>
            <article className="hashcat-card"><span className="hashcat-card-num">-a 3</span><h3>마스크 방식</h3><p>길이와 문자 패턴을 알고 있을 때 씁니다. <code>?l</code>은 영문 소문자, <code>?u</code>는 대문자, <code>?d</code>는 숫자, <code>?s</code>는 기호를 뜻합니다. 경우의 수가 빠르게 커질 수 있습니다.</p></article>
          </div>
        </section>

        <section className="hashcat-section" id="generator" aria-labelledby="generator-title">
          <div className="hashcat-section-heading"><span>04 / 내 컴퓨터에서 실행</span><h2 id="generator-title">명령어 생성기</h2></div>
          <div className="hashcat-generator">
            <div className="hashcat-fields">
              <label>운영체제<select value={system} onChange={(event) => { setSystem(event.target.value as typeof system); setCopyStatus(""); }}><option value="windows">Windows PowerShell</option><option value="mac">macOS 터미널</option><option value="linux">Linux 터미널</option></select></label>
              <label>해시 모드 번호 <small>공식 예시에서 확인</small><input inputMode="numeric" value={mode} onChange={(event) => { setMode(event.target.value); setCopyStatus(""); }} aria-invalid={modeError} /></label>
              <label>해시 파일 이름 <small>Hashcat 폴더에 준비</small><input value={hashFile} onChange={(event) => { setHashFile(event.target.value); setCopyStatus(""); }} aria-invalid={!validFile.test(hashFile)} /></label>
              <label>후보 방식<select value={method} onChange={(event) => { setMethod(event.target.value as typeof method); setCopyStatus(""); }}><option value="wordlist">워드리스트</option><option value="mask">마스크</option></select></label>
              {method === "wordlist" ? <label>워드리스트 파일 이름<input value={wordFile} onChange={(event) => { setWordFile(event.target.value); setCopyStatus(""); }} aria-invalid={!validFile.test(wordFile)} /></label> : <label>마스크 <small>?l ?u ?d ?s ?a ?b 조합, 최대 12자리</small><input value={mask} onChange={(event) => { setMask(event.target.value); setCopyStatus(""); }} aria-invalid={maskError} /></label>}
            </div>
            <p className="hashcat-field-help">파일 이름은 영문·숫자·마침표·밑줄·하이픈만 허용합니다. 파일은 브라우저에 올리지 않고 사용자 컴퓨터의 Hashcat 실행 폴더에 둡니다.</p>
            <div className="hashcat-command"><span>생성된 로컬 명령어</span><code>{command}</code></div>
            {!ready && <p className="hashcat-error" role="alert">해시 모드는 숫자 1~5자리, 파일 이름은 허용 문자, 마스크는 지원하는 기호 조합으로 입력하세요.</p>}
            <label className="hashcat-consent"><input type="checkbox" checked={authorized} onChange={(event) => { setAuthorized(event.target.checked); setCopyStatus(""); }} /><span>이 자료는 내 소유이거나 사용 권한을 명확히 받았으며, 실행 전 대상과 범위를 확인했습니다.</span></label>
            <button type="button" className="hashcat-primary" disabled={!authorized || !ready} onClick={copyCommand}>명령어 복사</button>
            <p className="hashcat-copy-status" role="status">{copyStatus}</p>
          </div>
        </section>

        <section className="hashcat-section" aria-labelledby="finish-title">
          <div className="hashcat-section-heading"><span>05 / 실행 후</span><h2 id="finish-title">중단·재개·결과 확인</h2></div>
          <div className="hashcat-steps">
            <article><b>1</b><h3>세션 저장</h3><p>생성 명령의 <code>--session=local-recovery</code>가 작업 이름을 정합니다. 진행 상태는 로컬 복원 파일에 기록됩니다.</p></article>
            <article><b>2</b><h3>중단 후 재개</h3><p>실행 창에서 <code>q</code>로 정상 종료하고, 같은 폴더에서 <code>{executable} --session=local-recovery --restore</code>로 재개합니다. 저장 파일을 지우면 재개할 수 없습니다.</p></article>
            <article><b>3</b><h3>결과 확인</h3><p><code>{executable} -m {modeError ? "모드번호" : mode} --show {validFile.test(hashFile) ? hashFile : "my-hashes.txt"}</code>로 로컬 potfile과 해시 파일을 대조합니다. 결과에는 평문 비밀번호가 표시될 수 있습니다.</p></article>
          </div>
          <aside className="hashcat-warning"><strong>민감한 결과를 보호하세요</strong><p>출력 결과와 potfile에 평문 비밀번호가 포함될 수 있습니다. 화면 공유·로그·클라우드 동기화에 주의하고, 필요가 끝나면 조직의 보관 정책에 따라 안전하게 처리하세요.</p></aside>
        </section>

        <section className="hashcat-section" aria-labelledby="terms-title">
          <div className="hashcat-section-heading"><span>06 / 용어</span><h2 id="terms-title">초보자용 짧은 설명</h2></div>
          <dl className="hashcat-glossary"><div><dt>해시</dt><dd>비밀번호를 일정한 규칙으로 변환한 값. 원래 비밀번호 자체가 아닙니다.</dd></div><div><dt>해시 모드 (-m)</dt><dd>해시가 만들어진 방식에 맞는 Hashcat의 번호입니다.</dd></div><div><dt>워드리스트</dt><dd>확인할 비밀번호 후보를 한 줄씩 담은 로컬 텍스트 파일입니다.</dd></div><div><dt>마스크</dt><dd>기억하는 문자 패턴을 기호로 나타낸 것입니다.</dd></div><div><dt>세션·복원 파일</dt><dd>중단한 작업을 같은 컴퓨터에서 이어가기 위한 작업 이름과 상태입니다.</dd></div><div><dt>potfile</dt><dd>찾은 결과를 저장하는 로컬 파일로, 평문 비밀번호가 포함될 수 있습니다.</dd></div></dl>
          <p className="hashcat-sources">사용법 기준: <a href={official} target="_blank" rel="noreferrer">cakecnc/hashcat 공식 저장소</a> · <a href={help} target="_blank" rel="noreferrer">공식 명령어 도움말</a>. 실제 설치 버전의 <code>--help</code>와 형식 예시를 최종 기준으로 확인하세요.</p>
        </section>
      </div>
    </main>
  );
}
