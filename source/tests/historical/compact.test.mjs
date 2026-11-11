import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {JSDOM} from 'jsdom';
import {sourcePath} from './harness.mjs';
import {normalizeApproved} from './normalize-approved.mjs';
const html=readFileSync(sourcePath,'utf8');
test('compact UI keeps every original element ID and all safety details',()=>{
 const baseline=normalizeApproved(html),d=new JSDOM(html).window.document,b=new JSDOM(baseline).window.document;
 const originalIds=[...b.querySelectorAll('[id]')].map(e=>e.id);
 for(const id of originalIds)assert.equal(d.querySelectorAll('[id="'+id+'"]').length,1,id);
 const details=d.querySelector('.circle-details');assert.ok(!details.open);assert.equal(details.querySelector('p').textContent,[...b.querySelectorAll('p.custom-circle-note')].find(e=>e.textContent.startsWith('A4 원형은')).textContent);
 assert.equal(d.querySelector('#customCircleCancel').parentElement,d.querySelector('#customCircleMax').parentElement);
 assert.equal(d.querySelector('#customCircleTitle').textContent,'원형 설정');
});
test('compact pinning is desktop-only and leaves mobile, touch, short screens and focus mode in normal flow',()=>{
 assert.match(html,/min-width:761px\) and \(min-height:700px\) and \(hover:hover\) and \(pointer:fine/);
 assert.match(html,/body:not\(\.focus-mode\) \.canvas-workspace/);
 assert.match(html,/grid-template-rows:minmax\(140px,1fr\) auto/);
 assert.match(html,/max-height:40dvh;overflow:auto/);
});
