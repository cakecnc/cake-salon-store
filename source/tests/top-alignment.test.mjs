import { test } from 'node:test';
import assert from 'node:assert/strict';
import { setup, assertSafeCircles, referenceCapacity, expectedSafeLowering, assertTopOffset, assertSafeScaleBar } from './harness.mjs';

const baselinePath = new URL('../../deployment-tests/fixtures/designer-baseline.html', import.meta.url);
const names = ['computeFlexibleCircleLayout', 'getFlexibleCircleArea', 'getMaximumCircleDiameter', 'readCustomCircleDraft', 'mmToPx'];
const pages = [{ width: 210, height: 297 }, { width: 297, height: 210 }];
const near = (a, b, message) => assert.ok(Math.abs(a - b) < 1e-7, `${message}: ${a} versus ${b}`);
const plain = x => JSON.parse(JSON.stringify(x));
const bounds = cells => ({
  left: Math.min(...cells.map(c => c.x - c.diameter / 2)),
  right: Math.max(...cells.map(c => c.x + c.diameter / 2)),
  top: Math.min(...cells.map(c => c.y - c.diameter / 2)),
  bottom: Math.max(...cells.map(c => c.y + c.diameter / 2))
});
function checkTop(cells, page, bottom = 12) {
  const b = bounds(cells);
  assertTopOffset(cells, page, bottom);
  near((b.left + b.right) / 2, page.width / 2, 'cluster remains horizontally centered');
  for (let i = 1; i < cells.length; i++) {
    const previous = cells[i - 1], cell = cells[i];
    assert.ok(cell.y > previous.y - 1e-7, `top-to-bottom row order at ${i}`);
    if (Math.abs(cell.y - previous.y) < 1e-7) assert.ok(cell.x >= previous.x - 1e-7, `left-to-right order at ${i}`);
  }
}
function change(t, selector, checked) {
  const el = t.el(selector); el.checked = checked; el.dispatchEvent(new t.w.Event('change', { bubbles: true }));
}
function draft(t, d, count) {
  if (t.el('#customCircleUnit').value !== 'mm') t.input('#customCircleUnit', 'mm', 'change');
  t.input('#customCircleInput', d); t.input('#customCircleCount', count);
}
function physicalClick(t, selector) {
  const button = t.el(selector);
  for (const type of ['pointerdown', 'mousedown']) button.dispatchEvent(new t.w.MouseEvent(type, { bubbles: true, button: 0 }));
  button.focus();
  for (const type of ['pointerup', 'mouseup']) button.dispatchEvent(new t.w.MouseEvent(type, { bubbles: true, button: 0 }));
  button.click(); t.flush();
}
function apply(t, d, count) {
  draft(t, d, count); physicalClick(t, '#customCircleApply');
  assert.equal(t.api.state.circleLayoutMode, 'flexible');
  assert.equal(t.api.state.circleDiameterMm, d); assert.equal(t.api.state.circleCount, count);
  return t.api.getTemplateCells();
}

test('top alignment: every 0.1mm diameter, both A4 orientations, and calibration ON/OFF', context => {
  const t = setup(names); let checked = 0;
  try {
    for (const page of pages) for (const bar of [true, false]) for (let tenth = 50; tenth <= 2060; tenth++) {
      const d = tenth / 10;
      const result = t.api.computeFlexibleCircleLayout(page.width, page.height, d, 1, bar);
      assert.equal(result.capacity, referenceCapacity(d, page, bar ? 12 : 3));
      if (!result.ok) continue;
      assert.equal(result.cells.length, 1); near(result.cells[0].diameter, d, 'exact diameter');
      checkTop(result.cells, page, bar ? 12 : 3); checked++;
    }
    context.diagnostic(`${checked} valid single-circle layouts checked; 8,044 capacity combinations.`);
  } finally { t.close(); }
});

test('top alignment: baseline capacity, count, diameter, x coordinates and relative y stay unchanged', context => {
  const old = setup(names, null, baselinePath), now = setup(names); let checked = 0;
  try {
    for (const page of pages) for (const bar of [true, false]) for (let tenth = 50; tenth <= 2060; tenth++) {
      const d = tenth / 10, cap = referenceCapacity(d, page, bar ? 12 : 3);
      if (!cap) continue;
      for (const count of [...new Set([1, Math.min(3, cap), Math.ceil(cap / 2), Math.max(1, cap - 1), cap])]) {
        const before = old.api.computeFlexibleCircleLayout(page.width, page.height, d, count, bar);
        const after = now.api.computeFlexibleCircleLayout(page.width, page.height, d, count, bar);
        assert.equal(after.ok, true); assert.equal(after.capacity, before.capacity);
        assert.equal(after.cells.length, count); assert.equal(before.cells.length, count);
        const alignmentShift = 10 - bounds(before.cells).top;
        const aligned = before.cells.map(c => ({ ...c, y: c.y + alignmentShift }));
        const shift = alignmentShift + expectedSafeLowering(aligned, page, bar ? 12 : 3);
        for (let i = 0; i < count; i++) {
          near(after.cells[i].x, before.cells[i].x, 'x coordinate preserved');
          near(after.cells[i].y - before.cells[i].y, shift, 'every circle receives one identical y translation');
          assert.equal(after.cells[i].diameter, before.cells[i].diameter);
        }
        checkTop(after.cells, page, bar ? 12 : 3); checked++;
      }
    }
    context.diagnostic(`${checked} layouts compared with the unchanged baseline.`);
  } finally { old.close(); now.close(); }
});

test('top alignment: dense and partial rows retain safe bounds, 3mm gaps and print-check clearance', () => {
  const t = setup(names);
  try {
    for (const page of pages) for (const bar of [true, false]) for (const d of [5, 10, 35, 55, 73.2, 90.1, 100, 130, 188, 197, 206]) {
      const cap = referenceCapacity(d, page, bar ? 12 : 3); if (!cap) continue;
      for (const count of [...new Set([1, Math.min(8, cap), Math.ceil(cap / 2), Math.max(1, cap - 1), cap])]) {
        const result = t.api.computeFlexibleCircleLayout(page.width, page.height, d, count, bar);
        assert.equal(result.ok, true); checkTop(result.cells, page, bar ? 12 : 3);
        assertSafeCircles(result.cells, page, bar ? 12 : 3);
        if (bar) assertSafeScaleBar(t.api.getScaleBarGeometry(page.width, page.height, result.cells), result.cells, page);
      }
    }
  } finally { t.close(); }
});

test('top alignment: presets and legacy layouts move safely while standard jig and full-sheet geometry stay unchanged', () => {
  const old = setup(names, null, baselinePath), now = setup(names);
  try {
    for (const orientation of ['portrait', 'landscape']) for (const showScaleBar of [true, false]) {
      for (const selector of ['[data-template="single"]', '[data-circle-preset="two-90"]', '[data-circle-preset="one-100"]', '[data-circle-preset="two-90-one-100"]', '[data-circle-diameter="130"]', '[data-circle-diameter="160"]', '[data-circle-diameter="180"]', '[data-circle-diameter="35"]', '[data-circle-diameter="55"]']) {
        for (const t of [old, now]) {
          t.click('[data-template="single"]'); change(t, `[name="orientation"][value="${orientation}"]`, true); change(t, '#scaleBarInput', showScaleBar); physicalClick(t, selector);
        }
        const previous = old.api.getTemplateCells(), page = old.api.getPageSize();
        const excluded = old.api.state.template !== 'circle' || old.api.state.circleLayoutMode === 'standard';
        const shift = expectedSafeLowering(previous, page, showScaleBar ? 12 : 3, excluded);
        assert.deepEqual(plain(now.api.getTemplateCells()), plain(previous.map(c => ({ ...c, y: c.y + shift }))), `${orientation}, bar=${showScaleBar}, ${selector}`);
        assert.equal(now.api.state.circleLayoutMode, old.api.state.circleLayoutMode);
      }
    }
    assert.equal(now.api.runGeometrySelfCheck(), true);
  } finally { old.close(); now.close(); }
  for (const orientation of ['portrait', 'landscape']) for (const d of [35, 55, 73.2, 130, 180, 197]) {
    const saved = { template: 'circle', orientation, circleLayoutMode: 'custom', circleDiameterMm: d, circlePresetId: '', showSafeArea: true, showScaleBar: true };
    const before = setup([], saved, baselinePath), after = setup([], saved);
    try {
      const previous = before.api.getTemplateCells(), shift = expectedSafeLowering(previous, before.api.getPageSize(), 12);
      assert.deepEqual(plain(after.api.getTemplateCells()), plain(previous.map(c => ({ ...c, y: c.y + shift }))));
    }
    finally { before.close(); after.close(); }
  }
});

test('top alignment: PNG export uses top-aligned full-resolution photos, correct assignments, and no circle numbers', () => {
  const t = setup(names);
  try {
    apply(t, 73.2, 8); const red = t.add('red'), blue = t.add('blue');
    t.input('[aria-label="원형 3 이미지"]', 'blue', 'change');
    const transforms = plain(t.api.state.layers.map(l => [l.id, l.zoom, l.rotation, l.offsetXmm, l.offsetYmm]));
    for (const orientation of ['portrait', 'landscape']) for (const bar of [true, false]) {
      change(t, `[name="orientation"][value="${orientation}"]`, true); change(t, '#scaleBarInput', bar); apply(t, 73.2, 8);
      const pageBeforeExport = t.api.getPageSize(), cellsBeforeExport = t.api.getTemplateCells();
      const geometry = t.api.getScaleBarGeometry(pageBeforeExport.width, pageBeforeExport.height, cellsBeforeExport);
      if (bar) assertSafeScaleBar(geometry, cellsBeforeExport, pageBeforeExport);
      if (bar && !geometry) {
        t.reset(); assert.equal(t.api.outputIsReady(), false);
        assert.throws(() => t.api.createOutputCanvas(), /검증선/);
        assert.deepEqual(t.drawn(), [], 'blocked export does not draw artwork');
        change(t, '#scaleBarInput', false);
        assert.equal(t.api.outputIsReady(), true, 'explicitly disabling the unavailable bar permits export');
      }
      t.reset(); const output = t.api.createOutputCanvas();
      assert.deepEqual(t.drawn(), ['red', 'blue', 'blue', 'blue', 'red', 'blue', 'red', 'blue']);
      assert.equal(t.arcs().length, 8);
      const cells = t.api.getTemplateCells(); checkTop(cells, t.api.getPageSize(), t.api.state.showScaleBar ? 12 : 3);
      near(Math.min(...t.arcs().map(a => a[1] - a[2])), t.api.mmToPx(bounds(cells).top), 'exported top clip matches the safely offset layout');
      assert.equal(t.labels().filter(l => /^\d+$/.test(l.label)).length, 0, 'no editing numbers');
      assert.equal(t.labels().filter(l => /50mm/.test(l.label)).length, t.api.state.showScaleBar ? 1 : 0);
      const page = t.api.getPageSize(); assert.equal(output.width, Math.round(t.api.mmToPx(page.width))); assert.equal(output.height, Math.round(t.api.mmToPx(page.height)));
      assert.deepEqual(plain(t.api.state.layers.map(l => [l.id, l.zoom, l.rotation, l.offsetXmm, l.offsetYmm])), transforms);
    }
    let encoded = 0, downloaded = 0;
    t.w.HTMLCanvasElement.prototype.toBlob = function(callback, type) { assert.equal(type, 'image/png'); encoded++; callback(new t.w.Blob(['stub'], { type })); };
    t.w.HTMLAnchorElement.prototype.click = function() { assert.match(this.download, /^cnc-a4-landscape-circle-73p2mm-x8\.png$/); assert.equal(this.href, 'blob:test'); downloaded++; };
    physicalClick(t, '#downloadButton'); assert.equal(encoded, 1); assert.equal(downloaded, 1);
    assert.equal(red.image.name, 'red'); assert.equal(blue.image.name, 'blue');
  } finally { t.close(); }
});

test('click regression: pointerdown captureUndo, focus/blur and repeated Apply always apply on the first click', () => {
  for (const path of [baselinePath, undefined]) for (const photoCount of [0, 1, 2]) {
    const t = setup(names, null, path);
    try {
      for (let i = 0; i < photoCount; i++) t.add(`photo-${i}`);
      for (const [d, count] of [[90.1, 3], [73.2, 8], [100, 1], [35, 39], [90.1, 3]]) {
        draft(t, d, count); t.el('#customCircleCount').focus();
        const button = t.el('#customCircleApply'); assert.equal(button.disabled, false);
        physicalClick(t, '#customCircleApply');
        assert.equal(t.el('#customCircleApply'), button, 'button is not replaced during pointerdown');
        assert.equal(t.api.state.circleLayoutMode, 'flexible'); assert.equal(t.api.state.circleCount, count); assert.equal(t.api.state.circleDiameterMm, d);
        assert.equal(t.api.readCustomCircleDraft().ok, true); assert.equal(t.api.getTemplateCells().length, count);
        assert.doesNotMatch(t.el('#customCircleStatus').textContent, /아직 적용 전/);
        assert.equal(button.getAttribute('aria-pressed'), 'true');
      }
      draft(t, 73, 9); t.el('#customCircleCount').dispatchEvent(new t.w.KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
      assert.equal(t.api.state.circleCount, 9);
      for (const [selector, count] of [['[data-circle-preset="two-90"]', 2], ['[data-circle-diameter="35"]', 35], ['[data-circle-diameter="55"]', 12], ['[data-circle-preset="one-100"]', 1]]) {
        physicalClick(t, selector); assert.equal(t.api.getTemplateCells().length, count); assert.equal(t.el(selector).getAttribute('aria-pressed'), 'true');
      }
    } finally { t.close(); }
  }
});

test('click regression: invalid draft stays blocked, then correction applies immediately without a second click', () => {
  const t = setup(names);
  try {
    t.add('photo'); apply(t, 90, 3);
    for (const [d, count] of [[90, 6], [999, 1], [73, 0], ['', 1]]) {
      const before = plain(t.api.getTemplateCells()); draft(t, d, count); physicalClick(t, '#customCircleApply');
      assert.deepEqual(plain(t.api.getTemplateCells()), before); assert.equal(t.api.outputIsReady(), false);
      assert.equal(t.el('#customCircleStatus').dataset.tone, 'danger');
      apply(t, 73.2, 8); assert.equal(t.api.outputIsReady(), true); checkTop(t.api.getTemplateCells(), t.api.getPageSize());
    }
  } finally { t.close(); }
});

test('top alignment: restore, Undo and clicked circle selection use the moved coordinates', () => {
  const saved = { orientation: 'portrait', template: 'circle', circleDiameterMm: 90.1, circleLayoutMode: 'flexible', circlePresetId: '', circleCount: 3, showSafeArea: true, showScaleBar: true };
  const t = setup(names, saved);
  try {
    checkTop(t.api.getTemplateCells(), t.api.getPageSize()); t.add('red'); t.add('blue');
    apply(t, 73.2, 8); physicalClick(t, '#undoButton');
    assert.equal(t.api.state.circleCount, 3); checkTop(t.api.getTemplateCells(), t.api.getPageSize());
    const canvas = t.el('#designCanvas'); canvas.getBoundingClientRect = () => ({ left: 0, top: 0, width: canvas.width, height: canvas.height });
    const first = t.api.getTemplateCells()[0], x = t.api.mmToPx(first.x), y = t.api.mmToPx(first.y);
    const pointer = (type, clientX, clientY) => { const event = new t.w.Event(type, { bubbles: true }); Object.assign(event, { pointerId: 1, clientX, clientY }); canvas.dispatchEvent(event); };
    pointer('pointerdown', x, y); assert.equal(t.api.state.imageName, 'red.png'); pointer('pointermove', x + t.api.mmToPx(1), y); t.flush();
    near(t.api.state.layers[0].offsetXmm, 1, 'drag uses moved circle hit target'); near(t.api.state.layers[1].offsetXmm, 0, 'other photo unchanged');
  } finally { t.close(); }
});

test('feedback: applying reports completion, editing restores Apply label, and presets do not claim a flexible apply', () => {
  const t = setup(names);
  try {
    assert.equal(t.el('#customCircleApply').textContent, '적용');
    apply(t, 90.1, 3);
    assert.match(t.el('#customCircleStatus').textContent, /^적용 완료 · /);
    assert.equal(t.el('#customCircleApply').textContent, '적용됨');
    assert.equal(t.el('#customCircleApply').getAttribute('aria-pressed'), 'true');
    t.input('#customCircleCount', 4);
    assert.equal(t.el('#customCircleApply').getAttribute('aria-pressed'), 'false');
    assert.doesNotMatch(t.el('#customCircleStatus').textContent, /^적용 완료/);
    assert.match(t.el('#customCircleStatus').textContent, /아직 적용 전/);
    assert.equal(t.el('#customCircleApply').textContent, '적용');
    physicalClick(t, '#customCircleApply');
    assert.equal(t.api.state.circleCount, 4);
    assert.match(t.el('#customCircleStatus').textContent, /^적용 완료 · /);
    t.input('#customCircleCount', 99); physicalClick(t, '#customCircleApply');
    assert.equal(t.el('#customCircleApply').textContent, '적용');
    assert.doesNotMatch(t.el('#customCircleStatus').textContent, /^적용 완료/);
    physicalClick(t, '[data-circle-preset="one-100"]');
    assert.equal(t.el('#customCircleApply').textContent, '적용');
    assert.doesNotMatch(t.el('#customCircleStatus').textContent, /^적용 완료/);
  } finally { t.close(); }
});

test('preview style contract: stage avoids grid stretching and places the canvas at its top center', () => {
  const t = setup();
  try {
    const panel = t.w.getComputedStyle(t.el('.stage-panel'));
    const wrap = t.w.getComputedStyle(t.el('.stage-wrap'));
    assert.equal(panel.display, 'grid');
    assert.match(panel.gridTemplateRows, /^auto auto minmax\(0(?:px)?, 1fr\)$/);
    assert.equal(panel.alignSelf, 'start');
    assert.equal(wrap.placeItems, 'start center');
    assert.equal(t.el('.stage-panel').children.length, 3, 'grid row count matches toolbar, editing tools and canvas stage');
    assert.equal(t.el('#designCanvas').width, 2480); assert.equal(t.el('#designCanvas').height, 3508);
  } finally { t.close(); }
});
