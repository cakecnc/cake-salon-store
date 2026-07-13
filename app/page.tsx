const storeUrl = "https://smartstore.naver.com/cake";

function ArrowIcon() {
  return <span aria-hidden="true">↗</span>;
}

export default function Home() {
  return (
    <main>
      <section className="hero" id="top">
        <nav className="nav-shell" aria-label="주요 메뉴">
          <a className="brand" href="#top" aria-label="케익살롱 첫 화면">
            <span className="brand-mark">C</span>
            <span>케익살롱</span>
          </a>
          <div className="nav-links">
            <a href="#about">소개</a>
            <a href="#how">활용법</a>
            <a href="#guide">구매안내</a>
          </div>
          <a className="nav-store" href={storeUrl} target="_blank" rel="noreferrer">
            스마트스토어 <ArrowIcon />
          </a>
        </nav>

        <div className="hero-layout">
          <div className="hero-copy">
            <p className="eyebrow">EDIBLE DECORATION STUDIO</p>
            <h1>
              한 장으로 완성하는
              <em>가장 특별한 순간</em>
            </h1>
            <p className="hero-description">
              케이크 위에 브랜드와 마음을 담아보세요. 케익살롱의 식용 토퍼는
              디저트를 더 선명하고 오래 기억되는 경험으로 바꿉니다.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href={storeUrl} target="_blank" rel="noreferrer">
                스마트스토어에서 보기 <ArrowIcon />
              </a>
              <a className="text-link" href="#how">활용법 살펴보기 <span>↓</span></a>
            </div>
            <dl className="hero-metrics">
              <div><dt>18개월</dt><dd>넉넉한 소비기한</dd></div>
              <div><dt>맞춤 인쇄</dt><dd>로고 · 사진 · 메시지</dd></div>
              <div><dt>케이크부터</dt><dd>음료 토퍼까지</dd></div>
            </dl>
          </div>

          <div className="cake-stage" aria-label="꽃과 식용 토퍼로 장식한 케이크 일러스트">
            <span className="sparkle sparkle-one">✦</span>
            <span className="sparkle sparkle-two">✦</span>
            <div className="arch"></div>
            <div className="cake-shadow"></div>
            <div className="cake-plate"></div>
            <div className="cake-body">
              <div className="cake-top"></div>
              <div className="cake-band"></div>
              <div className="cake-card"><span>with love</span><strong>CAKE<br />SALON</strong></div>
              <i className="flower flower-a"></i><i className="flower flower-b"></i>
              <i className="flower flower-c"></i><i className="flower flower-d"></i>
            </div>
            <p className="stage-note"><span></span> made for your celebration</p>
          </div>
        </div>
      </section>

      <section className="intro" id="about">
        <p className="eyebrow">A SMALL DETAIL, A LASTING IMPRESSION</p>
        <h2>맛있는 디저트 위에,<br />기억할 이유를 올립니다.</h2>
        <p className="intro-text">행사·매장·선물·브랜드 런칭까지. 원하는 이미지와 메시지를 식용 토퍼로 표현해 디저트의 첫인상을 완성하세요.</p>
        <div className="feature-grid">
          <article><span className="feature-number">01</span><h3>선명한 표현</h3><p>사진, 일러스트, 로고의 분위기를 디저트 위에서도 섬세하게 전달합니다.</p></article>
          <article><span className="feature-number">02</span><h3>간편한 사용</h3><p>필름에서 부드럽게 분리해 원하는 위치에 올리면 준비가 끝납니다.</p></article>
          <article><span className="feature-number">03</span><h3>넓은 활용</h3><p>케이크, 쿠키, 컵케이크, 음료 토퍼 등 다양한 메뉴에 어울립니다.</p></article>
        </div>
      </section>

      <section className="usage" id="how">
        <div className="usage-visual"><div className="cup"><div className="foam"><span className="foam-print">YOUR<br />LOGO</span></div></div><p>CAFE &amp; EVENT</p></div>
        <div className="usage-copy"><p className="eyebrow">MAKE IT YOURS</p><h2>브랜드의 한마디가<br /><em>디저트의 시그니처가 됩니다.</em></h2><p>매장 로고, 신제품 메시지, 고객 이름까지. 계절과 이벤트에 맞춘 작은 변화만으로도 고객에게 새로운 경험을 전할 수 있습니다.</p><a className="text-link dark-link" href={storeUrl} target="_blank" rel="noreferrer">맞춤 제작 문의하기 <ArrowIcon /></a></div>
      </section>

      <section className="steps" id="guide">
        <div><p className="eyebrow">EASY TO USE</p><h2>필요한 순간에,<br />가볍게 올리세요.</h2></div>
        <ol>
          <li><span>1</span><div><h3>디자인 준비</h3><p>사용할 로고·이미지·문구를 준비합니다.</p></div></li>
          <li><span>2</span><div><h3>토퍼 분리</h3><p>필름에서 천천히 분리합니다.</p></div></li>
          <li><span>3</span><div><h3>디저트 완성</h3><p>원하는 위치에 올려 특별함을 더합니다.</p></div></li>
        </ol>
      </section>

      <section className="store-cta">
        <p className="eyebrow">START YOUR SWEET STORY</p>
        <h2>오늘의 디저트를<br /><em>케익살롱으로 완성하세요.</em></h2>
        <a className="button button-primary" href={storeUrl} target="_blank" rel="noreferrer">스마트스토어 방문하기 <ArrowIcon /></a>
        <p className="cta-help">제품·주문·맞춤 제작 상담&nbsp; <a href="tel:0806647077">080-664-7077</a></p>
      </section>

      <footer><a className="brand" href="#top"><span className="brand-mark">C</span><span>케익살롱</span></a><p>CAKE SALON · EDIBLE DECORATION</p><a href={storeUrl} target="_blank" rel="noreferrer">smartstore.naver.com/cake <ArrowIcon /></a></footer>
    </main>
  );
}
