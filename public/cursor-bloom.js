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
  const lifeStep = coarsePointer ? 0.024 : 0.025;
  const maxRadius = coarsePointer ? 96 : 110;
  const minDistance = coarsePointer ? 16 : 12;
  const maxAlpha = coarsePointer ? 0.46 : 0.2;
  let frame = 0;
  let lastX = -100;
  let lastY = -100;
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  const fluteScale = [523.25, 587.33, 659.25, 698.46, 783.99, 880, 987.77, 1046.5];
  let audioContext;
  let lastToneAt = -Infinity;
  let fluteNoteIndex = 0;

  canvas.id = "siteCursorBloom";
  canvas.setAttribute("aria-hidden", "true");
  canvas.style.cssText = `position:fixed;inset:0;width:100vw;height:100vh;pointer-events:none;z-index:2;opacity:${coarsePointer ? ".9" : ".48"};mix-blend-mode:${coarsePointer ? "normal" : "screen"}`;
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
      const alpha = (1 - bloom.life) * maxAlpha;
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

  const playFluteTone = () => {
    const nowMs = performance.now();
    const elapsed = nowMs - lastToneAt;
    if (!AudioContextClass || elapsed < 400) return;
    if (elapsed > 3500) fluteNoteIndex = 0;
    lastToneAt = nowMs;

    try {
      if (!audioContext) audioContext = new AudioContextClass();
    } catch {
      return;
    }

    if (audioContext.state === "suspended") void audioContext.resume().catch(() => {});

    const now = audioContext.currentTime;
    const oscillator = audioContext.createOscillator();
    const vibrato = audioContext.createOscillator();
    const vibratoDepth = audioContext.createGain();
    const gain = audioContext.createGain();
    const frequency = fluteScale[fluteNoteIndex];
    fluteNoteIndex = (fluteNoteIndex + 1) % fluteScale.length;

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(frequency, now);
    vibrato.frequency.setValueAtTime(5, now);
    vibratoDepth.gain.setValueAtTime(3, now);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.04, now + 0.06);
    gain.gain.exponentialRampToValueAtTime(0.016, now + 0.46);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.72);

    vibrato.connect(vibratoDepth).connect(oscillator.frequency);
    oscillator.connect(gain).connect(audioContext.destination);
    oscillator.start(now);
    vibrato.start(now);
    oscillator.stop(now + 0.72);
    vibrato.stop(now + 0.72);
  };

  const addBloom = (event, force = false) => {
    if (document.visibilityState === "hidden") return false;

    const distance = Math.hypot(event.clientX - lastX, event.clientY - lastY);
    if (!force && distance < minDistance) return false;

    lastX = event.clientX;
    lastY = event.clientY;
    blooms.push({ x: event.clientX, y: event.clientY, life: 0 });
    if (blooms.length > maxBlooms) blooms.shift();
    if (!frame) frame = window.requestAnimationFrame(draw);
    return true;
  };

  if (coarsePointer) {
    const addTouchBloom = (event, force = false) => {
      const touch = event.touches[0];
      if (!touch) return;
      const added = addBloom(touch, force);
      if (force && added) playFluteTone();
    };

    window.addEventListener("touchstart", (event) => addTouchBloom(event, true), { passive: true });
    window.addEventListener("touchmove", addTouchBloom, { passive: true });
  } else {
    window.addEventListener("pointermove", addBloom, { passive: true });
    window.addEventListener("pointerdown", (event) => {
      if (addBloom(event, true)) playFluteTone();
    }, { passive: true });
  }
  window.addEventListener("resize", resize, { passive: true });
  resize();
})();
