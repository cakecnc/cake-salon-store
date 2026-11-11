import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {JSDOM} from 'jsdom';
import {createHash} from 'node:crypto';
// Pin the exact current production document, including the reviewed tutorial and PayPal UI.
const html=fs.readFileSync(new URL('../public/designer-payload.txt',import.meta.url),'utf8');
const baseline=fs.readFileSync(new URL('./fixtures/sticky-baseline.html',import.meta.url),'utf8');
test('current production document remains byte-identical to the reviewed deployment',()=>{
 assert.equal(createHash('sha256').update(html).digest('hex'),'2806032d64b8a89cc5247968050a89403b97a615690d15c12ce08cac9140a006');
});
test('sticky preview is contained in its own first-row grid column',()=>{
 const d=new JSDOM(html).window.document;
 const workspace=d.querySelector('.workspace'),column=d.querySelector('.stage-column'),stage=d.querySelector('.stage-panel');
 assert.equal(column.parentElement,workspace);assert.equal(stage.parentElement,column);
 assert.equal(column.querySelectorAll('.stage-panel').length,1);
 assert.equal(d.querySelector('.output-panel').parentElement,workspace);
 assert.ok(!column.contains(d.querySelector('.output-panel')));
});
test('canvas and existing controls retain order, ids and accessibility',()=>{
 const a=new JSDOM(html).window.document,b=new JSDOM(baseline).window.document;
 const ids=d=>[...d.querySelectorAll('[id]')].map(e=>e.id);
 for(const id of ids(b))assert.equal(a.querySelectorAll('[id="'+id+'"]').length,1,id);assert.equal(new Set(ids(a)).size,ids(a).length);
 assert.ok(a.querySelector('#designCanvas').compareDocumentPosition(a.querySelector('.custom-circle-editor'))&4);
 const region=a.querySelector('.stage-wrap');assert.equal(region.tabIndex,0);assert.equal(region.getAttribute('role'),'region');
 assert.match(region.getAttribute('aria-label'),/Scroll preview/);
});
test('desktop-only sticky rules leave mobile, touch and focus flow available',()=>{
 assert.match(html,/@media screen and \(min-width: 761px\) and \(hover: hover\) and \(pointer: fine\)/);
 const sticky=html.slice(html.indexOf('    /* Desktop preview follows'),html.indexOf('    @media print {'));
 assert.match(sticky,/position: sticky/);assert.match(sticky,/max-height: max\(180px, calc\(100dvh - 112px\)\)/);
 assert.match(sticky,/overflow: auto/);assert.match(sticky,/body\.focus-mode \.stage-panel\s*\{\s*position: static/);
 assert.match(html,/\.controls, \.output-panel \{ position: static; \}/);
});
