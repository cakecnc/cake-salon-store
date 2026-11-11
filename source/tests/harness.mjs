import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { JSDOM } = require('jsdom');
export const sourcePath = process.env.CANDIDATE_HTML || new URL('../public/designer-payload.txt', import.meta.url);

export function setup(extraNames = [], savedSettings = null, inputPath = sourcePath) {
  const html = readFileSync(inputPath, 'utf8');
  const dom = new JSDOM(html, { url: 'https://designer.test/designer', runScripts: 'outside-only', pretendToBeVisual: true });
  const w = dom.window;
  let draws = [], labels = [], arcs = [], rectangles = [], frames = [], prints = 0;
  w.HTMLCanvasElement.prototype.getContext = function () {
    return new Proxy({
      canvas: this,
      drawImage: (image, ...args) => draws.push({ image, args }),
      fillText: (label, ...args) => labels.push({ label, args }),
      arc: (...args) => arcs.push(args),
      fillRect: (...args) => rectangles.push(args),
      measureText: () => ({ width: 20 })
    }, { get(t, k) { return k in t ? t[k] : () => {}; }, set(t, k, v) { t[k] = v; return true; } });
  };
  w.HTMLElement.prototype.scrollIntoView = () => {};
  w.HTMLCanvasElement.prototype.setPointerCapture = () => {};
  w.requestAnimationFrame = fn => { frames.push(fn); return frames.length; };
  w.matchMedia = () => ({ matches: false });
  w.fetch = async () => ({ ok: false });
  w.URL.createObjectURL = () => 'blob:test';
  w.URL.revokeObjectURL = () => {};
  w.print = () => prints++;
  if (savedSettings) w.localStorage.setItem('cnc-designer-settings-v1', JSON.stringify(savedSettings));
  const names = [
    'state', 'runGeometrySelfCheck', 'getCircleLayer', 'getTemplateCells', 'render', 'renderArtwork',
    'getOutputPreflight', 'estimateEffectiveDpi', 'studioSnapshot', 'restoreSnapshot', 'captureUndo',
    'syncActiveLayer', 'activateLayer', 'loadSelectedImage', 'outputIsReady', 'createOutputCanvas',
    'getScaleBarGeometry', 'getPageSize', 'updateCustomCircleBounds', 'applyCustomCircle', ...extraNames
  ];
  const script = html.match(/<script>([\s\S]*?)<\/script>/)[1];
  w.eval(script + '\nwindow.testAPI = {' + [...new Set(names)].join(',') + '};');
  const api = w.testAPI;
  const el = selector => {
    const element = w.document.querySelector(selector);
    assert.ok(element, `Missing UI element: ${selector}`);
    return element;
  };
  const input = (selector, value, type = 'input') => {
    const element = el(selector); element.value = String(value);
    element.dispatchEvent(new w.Event(type, { bubbles: true }));
    return element;
  };
  const click = selector => el(selector).click();
  const pointerClick = selector => {
    const element = el(selector);
    element.dispatchEvent(new w.Event('pointerdown', { bubbles: true })); element.click();
  };
  const flush = () => { let i = 0; while (frames.length) { assert.ok(++i < 100, 'RAF loop does not settle'); const f = frames; frames = []; f.forEach(x => x()); } };
  const add = name => {
    const layer = { id: name, image: { name, naturalWidth: 900, naturalHeight: 900 }, previewImage: { name: name + '-preview', width: 900, height: 900 }, imageName: name + '.png', imageWidth: 900, imageHeight: 900, fitMode: 'fit', zoom: 1, rotation: 0, offsetXmm: 0, offsetYmm: 0 };
    api.state.layers.push(layer); api.activateLayer(api.state.layers.length - 1); api.render(); return layer;
  };
  return { dom, w, api, el, input, click, pointerClick, flush, add,
    drawn: () => draws.map(x => x.image.name), labels: () => labels, arcs: () => arcs, rectangles: () => rectangles,
    reset: () => { draws = []; labels = []; arcs = []; rectangles = []; },
    prints: () => prints, close: () => dom.window.close() };
}

// Test-side independent geometric checks, deliberately not reusing app constants.
export function assertSafeCircles(cells, page = { width: 210, height: 297 }, bottom = 12, gap = 3) {
  assert.ok(cells.length > 0, 'at least one circle is placed');
  for (const [i, c] of cells.entries()) {
    assert.ok(Number.isFinite(c.x) && Number.isFinite(c.y) && c.diameter > 0, `finite geometry at ${i}`);
    assert.ok(c.x - c.diameter / 2 >= 2 - 1e-7, `left safe boundary at ${i}`);
    assert.ok(c.x + c.diameter / 2 <= page.width - 2 + 1e-7, `right safe boundary at ${i}`);
    assert.ok(c.y - c.diameter / 2 >= 10 - 1e-7, `top safe boundary at ${i}`);
    assert.ok(c.y + c.diameter / 2 <= page.height - bottom + 1e-7, `bottom reserve boundary at ${i}`);
    for (let j = 0; j < i; j++) {
      const previous = cells[j];
      assert.ok(Math.hypot(c.x - previous.x, c.y - previous.y) >= (c.diameter + previous.diameter) / 2 + gap - 1e-7, `gap ${j} to ${i}`);
    }
  }
}

// Capacity for a rectangular grid, or triangular rows in either orientation.
export function referenceCapacity(d, page = { width: 210, height: 297 }, bottom = 12) {
  const w = page.width - 4, h = page.height - 10 - bottom, p = d + 3, q = p * Math.sqrt(3) / 2;
  if (!Number.isFinite(d) || d <= 0 || d > Math.min(w, h) + 1e-8) return 0;
  const count = (available, offset, step) => available + 1e-8 < offset ? 0 : Math.floor((available - offset + 1e-8) / step) + 1;
  const rect = count(w - d, 0, p) * count(h - d, 0, p);
  const triangular = (width, height) => {
    const rows = count(height - d, 0, q);
    const first = count(width - d, 0, p), second = count(width - d, p / 2, p);
    return Math.ceil(rows / 2) * first + Math.floor(rows / 2) * second;
  };
  return Math.max(rect, triangular(w, h), triangular(h, w));
}


// Approved A4 movement oracle, independent of app functions and packing capacity.
export function expectedSafeLowering(cells, page, bottom = 12, excluded = false) {
  if (excluded || !cells.length || !((page.width === 210 && page.height === 297) || (page.width === 297 && page.height === 210))) return 0;
  return cells.every(c => c.x - c.diameter / 2 >= 2 - 1e-7
    && c.x + c.diameter / 2 <= page.width - 2 + 1e-7
    && c.y + 5 - c.diameter / 2 >= 10 - 1e-7
    && c.y + 5 + c.diameter / 2 <= page.height - bottom + 1e-7) ? 5 : 0;
}

export function assertTopOffset(cells, page, bottom = 12) {
  const top = Math.min(...cells.map(c => c.y - c.diameter / 2));
  const unshifted = cells.map(c => ({ ...c, y: c.y + 10 - top }));
  const expected = 10 + expectedSafeLowering(unshifted, page, bottom);
  assert.ok(Math.abs(top - expected) < 1e-7, `top edge is ${expected}mm after the all-or-nothing safe offset, got ${top}mm`);
}

// Merge open forbidden intervals independently to prove whether a legal 96mm backing exists.
// Touching an interval endpoint is allowed: it means exactly 1mm circle clearance.
export function hasScaleBarSpace(cells, page) {
  const left = 2, right = page.width - 2 - 96, epsilon = 1e-7;
  if (right < left) return false;
  const intervals = cells.flatMap(c => {
    const verticalDistance = Math.max(10 - c.y, c.y - 14, 0), r = c.diameter / 2 + 1;
    if (verticalDistance >= r) return [];
    const reach = Math.sqrt(r * r - verticalDistance * verticalDistance);
    return [[c.x - reach - 96, c.x + reach]];
  }).sort((a, b) => a[0] - b[0]);
  let coveredEnd = null;
  for (const [start, end] of intervals) {
    if (end <= left + epsilon || start >= right - epsilon) continue;
    if (coveredEnd === null) {
      if (start >= left - epsilon) return true;
      coveredEnd = end;
    } else {
      if (start >= coveredEnd - epsilon) return true;
      coveredEnd = Math.max(coveredEnd, end);
    }
    if (coveredEnd > right + epsilon) return false;
  }
  return true;
}

export function assertSafeScaleBar(bar, cells, page) {
  assert.equal(bar !== null, hasScaleBarSpace(cells, page), 'bar availability matches independent forbidden-interval coverage');
  if (!bar) return;
  assert.equal(bar.length, 50); assert.equal(bar.backingWidth, 96);
  assert.equal(bar.backingTop, 10); assert.equal(bar.backingBottom, 14); assert.equal(bar.y, 12);
  assert.ok(bar.backingX >= 2 - 1e-7 && bar.backingX + bar.backingWidth <= page.width - 2 + 1e-7, 'full backing stays within horizontal safe bounds');
  assert.ok(bar.x - 0.14 >= bar.backingX && bar.x + 50 + 0.14 <= bar.backingX + 96, 'line and stroke stay inside backing');
  assert.ok(bar.y - bar.tick - 0.14 >= 10 && bar.y + bar.tick + 0.14 <= 14, 'ticks and stroke stay inside backing');
  assert.ok(bar.textX >= bar.x + 50 && bar.textX + bar.textWidth <= bar.backingX + 96, 'text clip is beside the line and inside backing');
  assert.ok(bar.textTop >= 10 && bar.textTop + bar.textHeight <= 14, 'text clip is vertically inside backing');
  for (const [i, c] of cells.entries()) {
    const dx = Math.max(bar.backingX - c.x, c.x - (bar.backingX + 96), 0);
    const dy = Math.max(10 - c.y, c.y - 14, 0);
    assert.ok(Math.hypot(dx, dy) - c.diameter / 2 >= 1 - 1e-7, `full backing clears circle ${i} by at least 1mm`);
  }
}
