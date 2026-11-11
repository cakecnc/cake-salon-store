import { test } from 'node:test';
import assert from 'node:assert/strict';
import { setup, assertSafeCircles, referenceCapacity } from './harness.mjs';

function draft(t, diameter, count, unit = 'mm') {
  if (t.el('#customCircleUnit').value !== unit) t.input('#customCircleUnit', unit, 'change');
  t.input('#customCircleInput', diameter);
  t.input('#customCircleCount', count);
}
function apply(t, diameter, count, unit = 'mm') {
  draft(t, diameter, count, unit); t.click('#customCircleApply');
  assert.equal(t.api.state.circleLayoutMode, 'flexible');
  assert.equal(t.api.state.circleCount, Number(count));
  assert.equal(t.api.state.circleDiameterMm, Number(diameter) * (unit === 'cm' ? 10 : 1));
  return t.api.getTemplateCells();
}
function changeCheck(t, selector, checked) {
  const el = t.el(selector); el.checked = checked; el.dispatchEvent(new t.w.Event('change', { bubbles: true }));
}
const json = x => JSON.stringify(x);

test('UX: tenth-mm input and hundredth-cm display survive switching, apply, and Undo', () => {
  const t = setup();
  try {
    t.add('photo');
    apply(t, 9.01, 3, 'cm');
    assert.equal(t.el('#customCircleInput').value, '9.01');
    assert.equal(t.el('#customCircleInput').step, '0.5');
    assert.equal(t.el('#customCircleInput').max, '20.6');
    assert.equal(t.api.outputIsReady(), true);
    t.input('#customCircleUnit', 'mm', 'change');
    assert.equal(t.el('#customCircleInput').value, '90.1');
    assert.equal(t.el('#customCircleInput').step, '5');
    assert.equal(t.el('#customCircleInput').max, '206');
    assert.equal(t.api.outputIsReady(), true, 'unit change alone is not a draft');
    apply(t, 73.2, 8);
    t.click('#undoButton');
    assert.equal(t.api.state.circleCount, 3);
    assert.equal(t.api.state.circleDiameterMm, 90.1);
    assert.equal(t.el('#customCircleInput').value, '90.1');
    assert.equal(t.el('#customCircleCount').value, '3');
    t.input('#customCircleUnit', 'cm', 'change');
    assert.equal(t.el('#customCircleInput').value, '9.01');
    assert.equal(t.api.outputIsReady(), true);
    assert.equal(t.el('#customCircleApply').getAttribute('aria-pressed'), 'true');
    assert.equal(t.w.document.querySelectorAll('.template-button[aria-pressed="true"]').length, 0);
  } finally { t.close(); }
});

test('UX: malformed or impossible drafts preserve last valid preview and block print', () => {
  const t = setup();
  try {
    t.add('photo');
    apply(t, 90.1, 3);
    const original = json(t.api.getTemplateCells());
    for (const [diameter, count] of [[206.1, 1], [4.9, 1], ['', 1], [90.11, 3], [90, 0], [90, -1], [90, 1.5], [90, ''], [90, 6], [90, 4097], [90, '1e30']]) {
      draft(t, diameter, count);
      assert.equal(json(t.api.getTemplateCells()), original, 'editing does not mutate applied geometry');
      assert.equal(t.api.outputIsReady(), false);
      assert.match(t.el('#customCircleStatus').textContent, /이전 배치/);
      t.click('#customCircleApply');
      assert.equal(json(t.api.getTemplateCells()), original, `failed apply preserves layout for ${diameter}/${count}`);
      assert.equal(t.api.state.circleDiameterMm, 90.1);
      assert.equal(t.api.state.circleCount, 3);
      assert.equal(t.api.getOutputPreflight().ok, false);
      t.click('#printButton');
      assert.equal(t.prints(), 0);
      assert.equal(t.el('#customCircleStatus').dataset.tone, 'danger');
    }
    draft(t, 73, 8);
    assert.equal(t.api.outputIsReady(), false, 'a valid but unapplied draft still blocks output');
    t.click('#customCircleApply');
    assert.equal(t.api.outputIsReady(), true);
    t.click('#printButton');
    assert.equal(t.prints(), 1);
    draft(t, 999, 99);
    t.click('[data-circle-preset="one-100"]');
    assert.equal(t.api.outputIsReady(), true, 'selecting a preset explicitly cancels an invalid draft');
    assert.equal(t.el('#customCircleCount').value, '1');
  } finally { t.close(); }
});

test('UX: fill capacity and count-driven size apply exact counts and report impossible totals', () => {
  const t = setup();
  try {
    t.add('photo');
    draft(t, 35, 1); t.click('#customCircleMax');
    assert.equal(t.api.state.circleCount, 40);
    assert.equal(t.api.getTemplateCells().length, 40);
    assertSafeCircles(t.api.getTemplateCells());
    assert.match(t.el('#customCircleStatus').textContent, /40개/);
    draft(t, 100, 12); t.click('#customCircleFit');
    assert.equal(t.api.state.circleDiameterMm, 65);
    assert.equal(t.api.state.circleCount, 12);
    assert.equal(t.api.getTemplateCells().length, 12);
    assertSafeCircles(t.api.getTemplateCells());
    const before = json(t.api.getTemplateCells());
    draft(t, 5, 2000); t.click('#customCircleFit');
    assert.equal(json(t.api.getTemplateCells()), before);
    assert.equal(t.api.outputIsReady(), false);
    assert.match(t.el('#customCircleStatus').textContent, /최소 지름 5mm/);
    t.click('#customCircleMax');
    assert.equal(t.api.state.circleCount, referenceCapacity(5));
    assert.equal(t.api.getTemplateCells().length, 1020);
    assert.equal(t.api.getScaleBarGeometry(210, 297), null, 'dense packing has no safe print-check placement');
    assert.equal(t.api.outputIsReady(), false);
    assert.match(t.api.getOutputPreflight().title, /검증선 공간/);
    assert.throws(() => t.api.createOutputCanvas(), /검증선/);
    changeCheck(t, '#scaleBarInput', false);
    assert.equal(t.api.getTemplateCells().length, 1020, 'disabling print check does not add circles');
    assertSafeCircles(t.api.getTemplateCells(), { width: 210, height: 297 }, 3);
    assert.equal(t.api.outputIsReady(), true);
    t.reset(); t.api.createOutputCanvas();
    assert.equal(t.drawn().length, 1020);
    assert.equal(t.labels().filter(x => /50mm/.test(x.label)).length, 0);
  } finally { t.close(); }
});

test('UX: orientation and calibration changes cannot invalidate an applied layout', () => {
  const t = setup();
  try {
    t.add('photo');
    apply(t, 206, 1);
    const portrait = json(t.api.getTemplateCells());
    changeCheck(t, '[name="orientation"][value="landscape"]', true);
    assert.equal(t.api.state.orientation, 'portrait');
    assert.equal(t.el('[name="orientation"][value="portrait"]').checked, true);
    assert.equal(json(t.api.getTemplateCells()), portrait);
    assert.equal(t.api.outputIsReady(), true);
    apply(t, 188, 1);
    changeCheck(t, '[name="orientation"][value="landscape"]', true);
    assert.equal(t.api.state.orientation, 'landscape');
    assert.equal(t.el('#customCircleInput').max, '188');
    assertSafeCircles(t.api.getTemplateCells(), { width: 297, height: 210 });
    changeCheck(t, '#scaleBarInput', false);
    assert.equal(t.el('#customCircleInput').max, '197');
    apply(t, 197, 1);
    const landscape = json(t.api.getTemplateCells());
    changeCheck(t, '#scaleBarInput', true);
    assert.equal(t.api.state.showScaleBar, false);
    assert.equal(t.el('#scaleBarInput').checked, false);
    assert.equal(json(t.api.getTemplateCells()), landscape);
    assert.equal(t.api.outputIsReady(), true);
    assertSafeCircles(t.api.getTemplateCells(), { width: 297, height: 210 }, 3);
    apply(t, 188, 1);
    changeCheck(t, '#scaleBarInput', true);
    assert.equal(t.api.state.showScaleBar, true);
    assertSafeCircles(t.api.getTemplateCells(), { width: 297, height: 210 });
  } finally { t.close(); }
});

test('UX: image assignment, per-image transforms and Undo survive repeated count changes', () => {
  const t = setup();
  try {
    apply(t, 90, 3);
    const red = t.add('red'), blue = t.add('blue');
    t.api.state.zoom = 1.7; t.api.state.rotation = 45; t.api.state.offsetXmm = 2; t.api.state.offsetYmm = 3; t.api.render();
    t.api.activateLayer(0); t.api.state.rotation = 90; t.api.render();
    const redTransform = json([red.zoom, red.rotation, red.offsetXmm, red.offsetYmm]);
    const blueTransform = json([blue.zoom, blue.rotation, blue.offsetXmm, blue.offsetYmm]);
    t.input('[aria-label="원형 3 이미지"]', 'blue', 'change');
    apply(t, 73, 8);
    assert.equal(json([red.zoom, red.rotation, red.offsetXmm, red.offsetYmm]), redTransform);
    assert.equal(json([blue.zoom, blue.rotation, blue.offsetXmm, blue.offsetYmm]), blueTransform);
    assert.equal(t.api.getCircleLayer(2).id, 'blue');
    apply(t, 100, 1);
    assert.equal(t.api.state.layers.length, 2);
    assert.match(t.el('#circleAssignmentSummary').textContent, /1장은 현재 배치되지/);
    t.click('#undoButton');
    assert.equal(t.api.getTemplateCells().length, 8);
    assert.equal(t.api.getCircleLayer(2).id, 'blue');
    t.click('#undoButton');
    assert.equal(t.api.getTemplateCells().length, 3);
    assert.equal(t.api.getCircleLayer(2).id, 'blue');
    t.reset(); t.api.createOutputCanvas();
    assert.deepEqual(t.drawn(), ['red', 'blue', 'blue']);
    assert.equal(t.labels().filter(x => /50mm/.test(x.label)).length, 1);
    assert.equal(t.labels().filter(x => /^\d+$/.test(x.label)).length, 0, 'circle number guides are not exported');
    t.click('[data-template="single"]');
    t.reset(); t.api.createOutputCanvas();
    assert.deepEqual(t.drawn(), ['red', 'blue']);
  } finally { t.close(); }
});

test('UX: existing presets and standard jig geometry remain distinct from flexible layouts', () => {
  const t = setup();
  try {
    for (const [selector, count, diameters] of [
      ['[data-circle-preset="two-90"]', 2, [90, 90]],
      ['[data-circle-preset="one-100"]', 1, [100]],
      ['[data-circle-preset="two-90-one-100"]', 3, [90, 100, 90]],
      ['[data-circle-diameter="130"]', 1, [130]],
      ['[data-circle-diameter="160"]', 1, [160]],
      ['[data-circle-diameter="180"]', 1, [180]],
      ['[data-circle-diameter="35"]', 35, Array(35).fill(35)],
      ['[data-circle-diameter="55"]', 12, Array(12).fill(55)]
    ]) {
      t.click(selector);
      const cells = t.api.getTemplateCells();
      assert.equal(cells.length, count);
      assert.deepEqual(Array.from(cells, c => c.diameter), diameters);
      assert.equal(t.el('#customCircleCount').value, String(count));
      assert.equal(t.el(selector).getAttribute('aria-pressed'), 'true');
    }
    t.click('[data-circle-diameter="35"]');
    const first = t.api.getTemplateCells()[0];
    assert.equal(first.x, 28.893); assert.equal(first.y, 28.219);
    changeCheck(t, '[name="orientation"][value="landscape"]', true);
    assert.equal(t.api.state.orientation, 'portrait');
    apply(t, 130, 2);
    assert.equal(t.api.getTemplateCells().length, 2, 'direct 130mm is not legacy centered-one preset');
    assert.equal(t.el('[data-circle-diameter="130"]').getAttribute('aria-pressed'), 'false');
    assertSafeCircles(t.api.getTemplateCells());
    assert.equal(t.api.runGeometrySelfCheck(), true);
  } finally { t.close(); }
});

test('UX: saved flexible settings restore exact decimal size and count without saving photos', async () => {
  const saved = { orientation: 'portrait', template: 'circle', circleDiameterMm: 90.1, circleLayoutMode: 'flexible', circlePresetId: '', circleCount: 5, showSafeArea: true, showScaleBar: true };
  const t = setup([], saved);
  try {
    assert.equal(t.api.state.circleCount, 5);
    assert.equal(t.api.state.circleDiameterMm, 90.1);
    assert.equal(t.el('#customCircleInput').value, '9.01');
    assert.equal(t.el('#customCircleCount').value, '5');
    assert.equal(t.api.getTemplateCells().length, 5);
    assert.equal(t.api.state.layers.length, 0);
    assert.equal(t.api.outputIsReady(), false);
    t.add('private-photo');
    apply(t, 73.2, 8);
    await new Promise(resolve => setTimeout(resolve, 390));
    const actual = JSON.parse(t.w.localStorage.getItem('cnc-designer-settings-v1'));
    assert.equal(actual.circleCount, 8); assert.equal(actual.circleDiameterMm, 73.2);
    assert.equal(actual.circleLayoutMode, 'flexible');
    assert.equal('layers' in actual, false); assert.equal('circleAssignments' in actual, false);
    assert.equal(JSON.stringify(actual).includes('private-photo'), false);
  } finally { t.close(); }
});

test('UX: Enter applies diameter/count and keyboard Undo restores the applied layout', () => {
  const t = setup();
  try {
    t.add('photo'); apply(t, 90.1, 3);
    draft(t, 73, 9);
    t.el('#customCircleCount').dispatchEvent(new t.w.KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    assert.equal(t.api.getTemplateCells().length, 9);
    assert.equal(t.api.outputIsReady(), true);
    t.w.document.dispatchEvent(new t.w.KeyboardEvent('keydown', { key: 'z', ctrlKey: true, bubbles: true }));
    assert.equal(t.api.getTemplateCells().length, 3);
    assert.equal(t.api.state.circleDiameterMm, 90.1);
    assert.equal(t.api.outputIsReady(), true);
  } finally { t.close(); }
});

test('UX: rejected orientation or calibration changes explain the reason beside the size controls', () => {
  const t = setup();
  try {
    t.add('photo'); apply(t, 206, 1);
    const before = json(t.api.getTemplateCells());
    changeCheck(t, '[name="orientation"][value="landscape"]', true);
    const status = t.el('#customCircleStatus');
    assert.equal(t.api.state.orientation, 'portrait');
    assert.equal(json(t.api.getTemplateCells()), before);
    assert.match(status.textContent, /방향|가로|landscape/i, 'visible local status identifies the rejected orientation');
    assert.match(status.textContent, /들어가지|부족|불가|바꿀 수/, 'visible local status explains the rejection');
    assert.equal(status.dataset.tone, 'danger');
    assert.equal(t.api.outputIsReady(), true, 'the valid applied layout remains printable');
    apply(t, 188, 1);
    assert.equal(status.dataset.tone, 'good', 'successful apply clears the rejection');
    changeCheck(t, '[name="orientation"][value="landscape"]', true);
    changeCheck(t, '#scaleBarInput', false);
    apply(t, 197, 1);
    changeCheck(t, '#scaleBarInput', true);
    assert.equal(t.api.state.showScaleBar, false);
    assert.match(status.textContent, /검증선/);
    assert.match(status.textContent, /들어가지|부족|불가|켤 수/);
    assert.equal(status.dataset.tone, 'danger');
    assert.equal(t.api.outputIsReady(), true);
  } finally { t.close(); }
});

test('UX: legacy custom layouts cannot be rotated into clipping and invalid saved layouts reset safely', () => {
  const legacy = { orientation: 'portrait', template: 'circle', circleDiameterMm: 205, circleLayoutMode: 'custom', circlePresetId: '', showSafeArea: true, showScaleBar: true };
  const t = setup([], legacy);
  try {
    assert.equal(t.api.state.template, 'circle');
    assert.equal(t.api.state.circleLayoutMode, 'custom');
    assert.equal(t.api.state.circleDiameterMm, 205);
    t.add('photo');
    const before = json(t.api.getTemplateCells());
    assertSafeCircles(t.api.getTemplateCells(), { width: 210, height: 297 }, 3);
    changeCheck(t, '[name="orientation"][value="landscape"]', true);
    assert.equal(t.api.state.orientation, 'portrait');
    assert.equal(t.el('[name="orientation"][value="portrait"]').checked, true);
    assert.equal(json(t.api.getTemplateCells()), before);
    assert.equal(t.api.outputIsReady(), true);
  } finally { t.close(); }

  for (const invalid of [
    { ...legacy, orientation: 'landscape' },
    { ...legacy, circleDiameterMm: 250 }
  ]) {
    const restored = setup([], invalid);
    try {
      assert.equal(restored.api.state.template, 'single', 'a saved clipped legacy layout is not silently reused');
      assert.equal(restored.api.getTemplateCells().length, 1);
      assert.notEqual(restored.api.getTemplateCells()[0].shape, 'circle');
      restored.add('photo');
      assert.equal(restored.api.outputIsReady(), true);
    } finally { restored.close(); }
  }
  const compatible = setup([], { ...legacy, orientation: 'landscape', circleDiameterMm: 197 });
  try {
    assert.equal(compatible.api.state.template, 'circle', 'legacy geometry keeps its original 3mm bottom margin');
    assert.equal(compatible.api.state.circleLayoutMode, 'custom');
    assertSafeCircles(compatible.api.getTemplateCells(), { width: 297, height: 210 }, 3);
  } finally { compatible.close(); }
});
