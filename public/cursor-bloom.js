(() => {
  if (document.getElementById("siteCursorBloom")) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reducedMotion) return;

  const coarsePointer = window.matchMedia("(hover: none), (pointer: coarse)").matches;
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (!context) return;

  const blooms = [];
  const maxBlooms = coarsePointer ? 8 : 24;
  const lifeStep = coarsePointer ? 0.035 : 0.025;
  const maxRadius = coarsePointer ? 70 : 110;
  const minDistance = coarsePointer ? 22 : 12;
  let frame = 0;
  let lastX = -100;
  let lastY = -100;

  canvas.id = "siteCursorBloom";
  canvas.setAttribute("aria-hidden", "true");
  canvas.style.cssText = `position:fixed;inset:0;width:100vw;height:100vh;pointer-events:none;z-index:2;opacity:${coarsePointer ? ".34" : ".48"};mix-blend-mode:screen`;
  document.body.append(canvas);

  const resize = () => {
    const pixelRatio = Math.min(window.devicePixelRatio || 1, coarsePointer ? 1 : 1.5);
    canvas.width = Math.round(window.innerWidth * pixelRatio);
    canvas.height = Math.round(window.innerHeight * pixelRatio);
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  };

  const draw = () => {
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    context.globalCompositeOperation = "lighter";

    for (let index = blooms.length - 1; index >= 0; index -= 1) {
      const bloom = blooms[index];
      bloom.life += lifeStep;

      if (bloom.life >= 1) {
        blooms.splice(index, 1);
        continue;
      }

      const radius = 16 + bloom.life * (maxRadius - 16);
      const alpha = (1 - bloom.life) * 0.2;
      const gradient = context.createRadialGradient(bloom.x, bloom.y, 0, bloom.x, bloom.y, radius);
      gradient.addColorStop(0, `rgba(255, 241, 211, ${alpha})`);
      gradient.addColorStop(0.42, `rgba(231, 183, 111, ${alpha * 0.72})`);
      gradient.addColorStop(0.72, `rgba(218, 139, 166, ${alpha * 0.36})`);
      gradient.addColorStop(1, "rgba(218, 139, 166, 0)");
      context.fillStyle = gradient;
      context.beginPath();
      context.arc(bloom.x, bloom.y, radius, 0, Math.PI * 2);
      context.fill();
    }

    frame = blooms.length ? window.requestAnimationFrame(draw) : 0;
  };

  const addBloom = (event, force = false) => {
    if (document.visibilityState === "hidden") return;

    const distance = Math.hypot(event.clientX - lastX, event.clientY - lastY);
    if (!force && distance < minDistance) return;

    lastX = event.clientX;
    lastY = event.clientY;
    blooms.push({ x: event.clientX, y: event.clientY, life: 0 });
    if (blooms.length > maxBlooms) blooms.shift();
    if (!frame) frame = window.requestAnimationFrame(draw);
  };

  window.addEventListener("pointermove", addBloom, { passive: true });
  if (coarsePointer) {
    window.addEventListener("pointerdown", (event) => addBloom(event, true), { passive: true });
  }
  window.addEventListener("resize", resize, { passive: true });
  resize();
})();
