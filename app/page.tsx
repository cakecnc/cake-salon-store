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
            <a href="#about">상품특징</a>
            <a href="#examples">활용예시</a>
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
              <div><dt>4.8 / 5.0</dt><dd>아마존 평균 별점</dd></div>
              <div><dt>GLOBAL</dt><dd>해외 판매 상품</dd></div>
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

      <section className="trust-strip" aria-label="제품 핵심 정보">
        <p><b>FOOD GRADE</b><span>식용 토퍼를 위한 원료 기준</span></p>
        <p><b>LONG SHELF LIFE</b><span>소비기한 18개월</span></p>
        <p><b>GLOBAL REVIEW</b><span>아마존 평균 별점 4.8 / 5.0</span></p>
        <p><b>EXPORT READY</b><span>전 세계 고객을 위한 상품</span></p>
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

      <section className="product-detail" aria-labelledby="product-heading">
        <div className="detail-heading">
          <p className="eyebrow">WHAT MAKES IT SPECIAL</p>
          <h2 id="product-heading">보기 좋은 장식이 아니라,<br /><em>먹을 수 있는 경험입니다.</em></h2>
          <p>케익살롱 식용 토퍼는 케이크·쿠키·컵케이크·음료 위에 올려 사용하는 식용 장식 소재입니다. 기념일의 한마디부터 브랜드의 정체성까지, 디저트 위에서 자연스럽게 전달하세요.</p>
        </div>
        <div className="detail-cards">
          <article className="detail-card print-card"><span>01</span><h3>원하는 디자인 그대로</h3><p>사진, 로고, 캐릭터, 이름, 행사 문구를 활용해 작은 디저트도 단 하나의 메시지로 완성합니다.</p><div className="mini-sheet"><strong>HAPPY<br />BIRTHDAY</strong></div></article>
          <article className="detail-card peel-card"><span>02</span><h3>가볍게 분리하고 올리기</h3><p>PET 필름에서 스티커처럼 천천히 분리한 뒤, 평평한 디저트 표면에 올리면 됩니다.</p><div className="peel-visual"><i></i><b>PEEL &amp; PLACE</b></div></article>
          <article className="detail-card storage-card"><span>03</span><h3>여유 있는 보관</h3><p>소비기한 18개월. 필요한 행사와 시즌을 미리 준비해 두고 활용할 수 있습니다.</p><div className="storage-number">18<small>MONTHS</small></div></article>
        </div>
      </section>

      <section className="usage" id="how">
        <div className="usage-visual"><div className="cup"><div className="foam"><span className="foam-print">YOUR<br />LOGO</span></div></div><p>CAFE &amp; EVENT</p></div>
        <div className="usage-copy"><p className="eyebrow">MAKE IT YOURS</p><h2>브랜드의 한마디가<br /><em>디저트의 시그니처가 됩니다.</em></h2><p>매장 로고, 신제품 메시지, 고객 이름까지. 계절과 이벤트에 맞춘 작은 변화만으로도 고객에게 새로운 경험을 전할 수 있습니다.</p><a className="text-link dark-link" href={storeUrl} target="_blank" rel="noreferrer">맞춤 제작 문의하기 <ArrowIcon /></a></div>
      </section>

      <section className="examples" id="examples">
        <div className="examples-heading"><p className="eyebrow">IDEAS FOR EVERY OCCASION</p><h2>이렇게 사용하면<br /><em>더 특별해집니다.</em></h2><p>무료로 사용할 수 있는 일반 이미지, 브랜드 로고, 고객 이름 등으로 디저트의 목적을 한눈에 전달하세요.</p></div>
        <div className="example-grid">
          <article className="example birthday"><div className="example-art"><span>HAPPY<br />DAY!</span></div><h3>기념일 케이크</h3><p>생일·돌잔치·웨딩·파티</p></article>
          <article className="example cafe"><div className="example-art"><span>CAFE<br />LOGO</span></div><h3>카페 &amp; 음료 토퍼</h3><p>시그니처 메뉴·이벤트 음료</p></article>
          <article className="example brand-example"><div className="example-art"><span>NEW<br />BRAND</span></div><h3>브랜드 프로모션</h3><p>론칭·팝업·VIP 선물</p></article>
          <article className="example cookie"><div className="example-art"><span>THANK<br />YOU</span></div><h3>쿠키 &amp; 답례품</h3><p>감사 인사·기업 행사·선물</p></article>
        </div>
      </section>

      <section className="steps" id="guide">
        <div><p className="eyebrow">EASY TO USE</p><h2>필요한 순간에,<br />가볍게 올리세요.</h2></div>
        <ol>
          <li><span>1</span><div><h3>디자인 준비</h3><p>사용할 로고·이미지·문구를 준비합니다.</p></div></li>
          <li><span>2</span><div><h3>토퍼 분리</h3><p>필름에서 천천히 분리합니다.</p></div></li>
          <li><span>3</span><div><h3>디저트 완성</h3><p>원하는 위치에 올려 특별함을 더합니다.</p></div></li>
        </ol>
      </section>

      <section className="business-use">
        <div className="business-copy"><p className="eyebrow">FOR CAFÉ, HOTEL &amp; BRAND</p><h2>디저트 한 조각을<br /><em>브랜드 접점으로.</em></h2><p>매장 로고가 담긴 케이크와 음료 토퍼는 사진으로 공유되고, 다시 방문할 이유가 됩니다. 카페·베이커리·호텔·행사 운영을 위한 맞춤 제작도 상담할 수 있습니다.</p><a className="button button-outline" href="tel:0806647077">맞춤 제작 상담하기 <span>080-664-7077</span></a></div>
        <div className="business-stats"><div><b>01</b><p>매장 로고를 메뉴 위에</p></div><div><b>02</b><p>시즌·이벤트마다 새롭게</p></div><div><b>03</b><p>선물과 답례품까지 확장</p></div></div>
      </section>

      <section className="faq-section">
        <p className="eyebrow">BEFORE YOU ORDER</p><h2>구매 전 자주 묻는 질문</h2>
        <div className="faq-list">
          <details open><summary>어떤 디저트에 사용할 수 있나요?<span>+</span></summary><p>케이크, 컵케이크, 쿠키, 마카롱, 음료 토퍼 등 평평한 표면의 다양한 디저트에 활용할 수 있습니다.</p></details>
          <details><summary>사용 방법이 어렵지 않나요?<span>+</span></summary><p>필름에서 천천히 분리한 뒤 원하는 위치에 올리는 방식입니다. 상세 사용 방법과 보관 조건은 스마트스토어 상품 페이지에서 확인하세요.</p></details>
          <details><summary>인증·원료 관련 정보는 어디에서 확인하나요?<span>+</span></summary><p>원료, 인증·수출 관련 표기 범위 및 주문 단위별 안내는 구매 전 스마트스토어 상품 상세와 상담을 통해 확인하세요.</p></details>
          <details><summary>맞춤 제작도 가능한가요?<span>+</span></summary><p>로고·사진·행사 문구 등 사용 목적에 맞는 맞춤 제작은 전화 상담으로 안내합니다.</p></details>
        </div>
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
