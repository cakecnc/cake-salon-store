import { test } from 'node:test';
import assert from 'node:assert/strict';
import { setup, assertSafeCircles, referenceCapacity, assertSafeScaleBar } from './harness.mjs';

const functions = ['computeFlexibleCircleLayout', 'getFlexibleCircleArea', 'getMaximumCircleDiameter'];
const pages = [{ width: 210, height: 297 }, { width: 297, height: 210 }];

test('geometry: exact counts, margins, 3mm separation, and both staggered directions', () => {
  const t = setup(functions);
  try {
    for (const page of pages) for (const showBar of [true, false]) {
      const bottom = showBar ? 12 : 3;
      for (const d of [5, 5.1, 10, 10.1, 20, 35, 35.1, 40, 50, 55, 73, 90, 90.1, 100, 101.5, 102, 103, 130, 160, 180, 188, 188.1, 197, 205, 206, 206.1]) {
        const expectedCapacity = referenceCapacity(d, page, bottom);
        const one = t.api.computeFlexibleCircleLayout(page.width, page.height, d, 1, showBar);
        assert.equal(one.capacity, expectedCapacity, JSON.stringify({ page, showBar, d }));
        if (!expectedCapacity) { assert.equal(one.ok, false); continue; }
        for (const count of [...new Set([1, Math.min(3, expectedCapacity), Math.ceil(expectedCapacity / 2), expectedCapacity])]) {
          const result = t.api.computeFlexibleCircleLayout(page.width, page.height, d, count, showBar);
          assert.equal(result.ok, true, JSON.stringify({ page, showBar, d, count }));
          assert.equal(result.cells.length, count, 'requested count is not silently expanded or truncated');
          assertSafeCircles(result.cells, page, bottom);
          assert.ok(result.cells.every(c => Math.abs(c.diameter - d) < 1e-8), 'diameter is unchanged');
        }
        const impossible = t.api.computeFlexibleCircleLayout(page.width, page.height, d, expectedCapacity + 1, showBar);
        assert.equal(impossible.ok, false, 'capacity + 1 is rejected');
      }
    }
  } finally { t.close(); }
});

test('geometry: all supported 0.1mm steps have independently correct capacity', () => {
  const t = setup(functions);
  try {
    for (const page of pages) for (const showBar of [true, false]) {
      for (let tenths = 50; tenths <= 2060; tenths++) {
        const d = tenths / 10;
        const actual = t.api.computeFlexibleCircleLayout(page.width, page.height, d, 1, showBar);
        assert.equal(actual.capacity, referenceCapacity(d, page, showBar ? 12 : 3), `capacity d=${d}, page=${page.width}x${page.height}, bar=${showBar}`);
      }
    }
  } finally { t.close(); }
});

test('geometry: count-driven diameter is the largest fitting tenth of a millimeter', () => {
  const t = setup(functions);
  try {
    for (const page of pages) for (const showBar of [true, false]) {
      const maximumCount = referenceCapacity(5, page, showBar ? 12 : 3);
      for (const count of [...new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 12, 35, 100, 500, maximumCount])]) {
        if (count > maximumCount) continue;
        const d = t.api.getMaximumCircleDiameter(count, page.width, page.height, showBar);
        assert.equal(typeof d, 'number');
        assert.ok(d >= 5 && Number.isFinite(d), 'finite supported diameter');
        assert.ok(Math.abs(d * 10 - Math.round(d * 10)) < 1e-7, '0.1mm resolution');
        assert.ok(referenceCapacity(d, page, showBar ? 12 : 3) >= count, `reported maximum ${d} fits ${count}`);
        assert.ok(referenceCapacity(Math.round((d + 0.1) * 10) / 10, page, showBar ? 12 : 3) < count, `larger tenth than ${d} does not fit ${count}`);
        const result = t.api.computeFlexibleCircleLayout(page.width, page.height, d, count, showBar);
        assert.equal(result.ok, true);
        assertSafeCircles(result.cells, page, showBar ? 12 : 3);
      }
    }
  } finally { t.close(); }
});

test('geometry: custom print check has 50mm length and does not overlap any circle', () => {
  const t = setup(functions);
  try {
    for (const page of pages) {
      assertSafeScaleBar(t.api.getScaleBarGeometry(page.width, page.height, []), [], page);
      for (const d of [5, 35, 55, 73, 90, 100, 130, 180]) {
        const cap = referenceCapacity(d, page);
        const result = t.api.computeFlexibleCircleLayout(page.width, page.height, d, cap, true);
        assert.equal(result.ok, true);
        assertSafeScaleBar(t.api.getScaleBarGeometry(page.width, page.height, result.cells), result.cells, page);
      }
    }
  } finally { t.close(); }
});
