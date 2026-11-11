
(() => {
  "use strict";
  const KEY = "cake-designer-tutorial-v1";
  const dialog = document.getElementById("designerTutorial");
  const replay = document.getElementById("designerTutorialReplay");
  if (!dialog || !replay) return;
  const stepTitle = document.getElementById("designerTutorialStepTitle");
  const description = document.getElementById("designerTutorialDescription");
  const note = document.getElementById("designerTutorialNote");
  const previous = document.getElementById("designerTutorialPrevious");
  const next = document.getElementById("designerTutorialNext");
  const closeButton = document.getElementById("designerTutorialClose");
  const skip = document.getElementById("designerTutorialSkip");
  const steps = [
    {title:"이미지를 불러오세요",description:"‘이미지 불러오기’에서 JPG·PNG·WebP 사진이나 로고를 선택하세요. 최대 8장까지 함께 불러올 수 있고, 원형에는 이미지를 순서대로 배치합니다.",note:"각 파일은 최대 15MB / 16MP입니다. HEIC는 JPG 또는 PNG로 바꿔 주세요. 이미지는 이 기기 안에서만 처리됩니다."},
    {title:"시트와 원형 배치를 정하세요",description:"A4 용지의 세로·가로 방향과 배치 방식을 고르세요. 원하는 원형 지름과 개수는 캔버스 바로 아래에서 입력할 수 있습니다.",note:"직접 입력한 값은 ‘적용’을 눌러야 반영됩니다. 용지에 들어가지 않는 조합은 안내에 따라 조정하세요."},
    {title:"사진을 알맞게 조정하세요",description:"‘맞춤’은 사진 전체가 보이도록, ‘채우기’는 출력 영역이 채워지도록 맞춥니다. 확대·회전하거나 캔버스에서 사진을 끌어 위치를 조정하세요.",note:"‘채우기’에서는 사진 가장자리가 잘릴 수 있습니다. 원형별 이미지·크기도 조정할 수 있고, 잘못 바꿨다면 ‘실행 취소’를 이용하세요."},
    {title:"품질과 실제 크기를 확인하세요",description:"‘품질 확인’에서 해상도 경고와 빈 출력 영역을 확인하세요. 중요한 글자나 얼굴이 잘리거나 원형 밖으로 나가지 않았는지도 살펴보세요.",note:"50mm 검증선을 사용하는 경우, 실제 크기(100%)로 인쇄한 뒤 자로 길이를 확인하세요. 프린터의 자동 맞춤 배율은 크기를 바꿀 수 있습니다."},
    {title:"저장하거나 인쇄하면 완성이에요",description:"‘PNG 저장’으로 파일을 내려받거나 ‘실제 크기 인쇄’로 출력하세요. 인쇄 창에서도 배율 100% 또는 Actual Size를 확인해 주세요.",note:"시트 설정은 이 브라우저에 저장되지만 이미지 원본은 저장되지 않습니다. 다시 방문하면 이미지를 다시 불러오세요. 이 안내는 ‘사용 가이드’에서 언제든 다시 볼 수 있어요."}
  ];
  let index = 0, opened = false, restored = null, inertNodes = [];
  const hasSeen = () => { try { return localStorage.getItem(KEY) === "seen"; } catch { return false; } };
  const remember = () => { try { localStorage.setItem(KEY, "seen"); } catch { /* The editor remains usable if storage is unavailable. */ } };
  function renderStep() {
    const step = steps[index];
    stepTitle.textContent = step.title; description.textContent = step.description; note.textContent = step.note;
    document.getElementById("designerTutorialProgress").textContent = `${index + 1} / ${steps.length} 단계`;
    document.getElementById("designerTutorialNumber").textContent = String(index + 1).padStart(2, "0");
    dialog.querySelectorAll(".tutorial-progress span").forEach((node, n) => node.classList.toggle("is-current", n <= index));
    previous.disabled = index === 0; next.textContent = index === steps.length - 1 ? "시작하기" : "다음";
    dialog.querySelector(".tutorial-content").scrollTop = 0;
    stepTitle.focus({preventScroll:true});
  }
  function openGuide() {
    if (opened) return;
    restored = {focus:document.activeElement, x:window.scrollX, y:window.scrollY,
      overflow:document.body.style.getPropertyValue("overflow"), priority:document.body.style.getPropertyPriority("overflow")};
    opened = true; index = 0;
    if (typeof dialog.showModal === "function") dialog.showModal();
    else {
      dialog.setAttribute("open", ""); dialog.setAttribute("role", "dialog"); dialog.setAttribute("aria-modal", "true"); dialog.classList.add("tutorial-fallback");
      inertNodes = [...document.body.children].filter(node => node !== dialog && !["SCRIPT","STYLE"].includes(node.tagName)).map(node => ({node,inert:node.inert}));
      inertNodes.forEach(({node}) => {node.inert = true;});
    }
    document.body.style.setProperty("overflow", "hidden"); renderStep();
  }
  function closeGuide() {
    if (!opened) return;
    opened = false; remember();
    if (typeof dialog.close === "function") dialog.close(); else dialog.removeAttribute("open");
    dialog.classList.remove("tutorial-fallback"); inertNodes.forEach(({node,inert}) => {node.inert = inert;}); inertNodes = [];
    if (restored) {
      if (restored.overflow) document.body.style.setProperty("overflow", restored.overflow, restored.priority); else document.body.style.removeProperty("overflow");
      const target = restored.focus && restored.focus.isConnected && restored.focus !== document.body ? restored.focus : replay;
      target.focus({preventScroll:true}); window.scrollTo(restored.x, restored.y);
    }
  }
  replay.addEventListener("click", openGuide);
  closeButton.addEventListener("click", closeGuide); skip.addEventListener("click", closeGuide);
  previous.addEventListener("click", () => {if(index > 0){index--;renderStep();}});
  next.addEventListener("click", () => {if(index < steps.length - 1){index++;renderStep();} else closeGuide();});
  dialog.addEventListener("cancel", event => {event.preventDefault();closeGuide();});
  dialog.addEventListener("keydown", event => {
    event.stopPropagation();
    if (event.key === "Escape") {event.preventDefault();closeGuide();return;}
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "z") {event.preventDefault();return;}
    if (event.key === "Tab") {
      const nodes = [...dialog.querySelectorAll("button:not(:disabled)")]; const first = nodes[0], last = nodes[nodes.length-1];
      if(event.shiftKey && (document.activeElement === first || document.activeElement === stepTitle)){event.preventDefault();last.focus();}
      else if(!event.shiftKey && document.activeElement === last){event.preventDefault();first.focus();}
    }
  });
  // Prevent existing workspace pointer/audio effects from running over the guide.
  ["pointerdown","pointermove","touchstart","touchmove"].forEach(type => dialog.addEventListener(type,event => event.stopPropagation(),{passive:true}));
  const start = () => {if(!hasSeen()) openGuide();};
  if(document.readyState === "loading") document.addEventListener("DOMContentLoaded",start,{once:true}); else start();
})();
