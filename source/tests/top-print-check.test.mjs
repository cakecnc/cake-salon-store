import {test} from 'node:test';
import assert from 'node:assert/strict';
import {setup, expectedSafeLowering, assertSafeScaleBar} from './harness.mjs';
const plain=x=>JSON.parse(JSON.stringify(x));
const baseline=new URL('../../deployment-tests/fixtures/designer-pre-offset.html',import.meta.url);
const names=['drawScaleBar','computeVariableCircleLayout','computeFlexibleCircleLayout'];
const change=(t,s,v)=>{const e=t.el(s);e.checked=v;e.dispatchEvent(new t.w.Event('change',{bubbles:true}));};
test('top print check: full backing, stroke, ticks and clipped side label stay in the 10–14mm safe band',()=>{
 const t=setup(names);try {for(const [w,h] of [[210,297],[297,210]]){
 const g=t.api.getScaleBarGeometry(w,h);
 assertSafeScaleBar(g, [], {width:w,height:h});
 assert.equal(g.length,50);assert.ok(g.backingX>=2&&g.backingX+g.backingWidth<=w-2);
 assert.equal(g.backingTop,10);assert.equal(g.backingBottom,14);
 assert.ok(g.y-g.tick-.14>=g.backingTop&&g.y+g.tick+.14<=g.backingBottom);
 const calls=[];const c=new Proxy({canvas:{width:Math.round(w*300/25.4),height:Math.round(h*300/25.4)}},{get:(o,k)=>k in o?o[k]:(...a)=>calls.push([k,...a]),set:(o,k,v)=>(o[k]=v,true)});
 t.api.drawScaleBar(c,w,h);
 const tr=calls.find(a=>a[0]==='setTransform');assert.equal(tr[1],c.canvas.width/w);assert.equal(tr[4],c.canvas.height/h);
 const line=calls.filter(a=>a[0]==='lineTo')[0];const start=calls.filter(a=>a[0]==='moveTo')[0];
 assert.ok(Math.abs((line[1]-start[1])*tr[1]/c.canvas.width*w-50)<1e-12);
 assert.ok(Math.abs((line[2]*tr[4])/c.canvas.height*h-12)<1e-12);
 assert.equal(c.lineWidth,.28);assert.equal(c.lineCap,'butt');assert.equal(c.textBaseline,'middle');
 assert.deepEqual(calls.find(a=>a[0]==='fillRect'),['fillRect',g.backingX,10,96,4]);
 assert.deepEqual(calls.find(a=>a[0]==='rect'),['rect',g.textX,10.5,38,3]);assert.ok(calls.some(a=>a[0]==='clip'));
 assert.ok(calls.findIndex(a=>a[0]==='clip')<calls.findIndex(a=>a[0]==='fillText'));
 }}finally{t.close();}
});
test('top print check: presets and flexible equal/mixed layouts receive only safe offsets; jigs stay fixed',context=>{
 const old=setup(names,null,baseline),now=setup(names);let minimum=Infinity;try{
 for(const orientation of ['portrait','landscape'])for(const bar of [true,false]){
 for(const t of [old,now]){change(t,`[name="orientation"][value="${orientation}"]`,true);change(t,'#scaleBarInput',bar);}
 for(const selector of ['[data-circle-preset="two-90"]','[data-circle-preset="one-100"]','[data-circle-preset="two-90-one-100"]',...[35,55,130,160,180].map(d=>`[data-circle-diameter="${d}"]`)]){
 for(const t of [old,now])t.click(selector);
 const previous=old.api.getTemplateCells(),page=old.api.getPageSize();
 const shift=expectedSafeLowering(previous,page,bar?12:3,old.api.state.circleLayoutMode==='standard');
 assert.deepEqual(plain(now.api.getTemplateCells()),plain(previous.map(c=>({...c,y:c.y+shift}))));
 if(bar)assertSafeScaleBar(now.api.getScaleBarGeometry(page.width,page.height),now.api.getTemplateCells(),page);
 for(const c of now.api.getTemplateCells()){minimum=Math.min(minimum,c.y-c.diameter/2);assert.ok(c.y-c.diameter/2>=10-1e-8,selector);}
 }
 const page=now.api.getPageSize();for(const ds of [[73.2,73.2,73.2],[35,55,90,40],[130],[55,55,55,55,55,55]]){
 const a=old.api.computeVariableCircleLayout(page.width,page.height,ds,bar),b=now.api.computeVariableCircleLayout(page.width,page.height,ds,bar);const shift=a.ok?expectedSafeLowering(a.cells,page,bar?12:3):0;assert.deepEqual(plain(b),plain({...a,cells:a.cells.map(c=>({...c,y:c.y+shift}))}));
 if(b.ok&&bar)assertSafeScaleBar(now.api.getScaleBarGeometry(page.width,page.height,b.cells),b.cells,page);
 if(b.ok)for(const c of b.cells)assert.ok(c.y-c.diameter/2>=10-1e-8);
 }
 }
 context.diagnostic(`Minimum top circle edge among presets/jigs: ${minimum}mm; backing band:10–14mm. Every available bar independently clears all circles by at least 1mm.`);
 }finally{old.close();now.close();}
});
test('top print check: enabled/disabled exports change only overlay, not full-sheet image transforms',()=>{
 const t=setup(names);try{t.add('photo');for(const o of ['portrait','landscape']){
 change(t,`[name="orientation"][value="${o}"]`,true);t.click('[data-template="single"]');
 const state=plain(t.api.state.layers.map(l=>[l.zoom,l.rotation,l.offsetXmm,l.offsetYmm]));
 for(const bar of [true,false]){change(t,'#scaleBarInput',bar);t.reset();t.api.createOutputCanvas();assert.equal(t.labels().filter(l=>/50mm/.test(l.label)).length,bar?1:0);assert.deepEqual(plain(t.api.state.layers.map(l=>[l.zoom,l.rotation,l.offsetXmm,l.offsetYmm])),state);assert.deepEqual(t.drawn(),['photo']);}
 }}finally{t.close();}
});
test('below-canvas controls: one original accessible control set, responsive layout and keyboard/first-click safety',()=>{
 const t=setup();try{
 const editor=t.el('.custom-circle-editor'),canvas=t.el('#designCanvas');assert.equal(editor.parentElement,canvas.parentElement.parentElement);assert.equal(editor.previousElementSibling,canvas.parentElement);assert.equal(editor.getAttribute('aria-labelledby'),'customCircleTitle');
 for(const id of ['customCircleInput','customCircleUnit','customCircleCount','customCircleApply'])assert.equal(t.w.document.querySelectorAll('#'+id).length,1);
 assert.equal(t.w.getComputedStyle(t.el('.custom-circle-primary')).display,'flex');assert.equal(t.w.getComputedStyle(t.el('.custom-circle-primary')).flexWrap,'wrap');
 t.add('photo');t.input('#customCircleInput',9);t.input('#customCircleCount',3);assert.equal(t.api.outputIsReady(),false);t.pointerClick('#customCircleApply');assert.equal(t.api.state.circleDiameterMm,90);assert.equal(t.api.state.circleCount,3);assert.equal(t.api.outputIsReady(),true);
 t.input('#customCircleCount',2);t.el('#customCircleCount').dispatchEvent(new t.w.KeyboardEvent('keydown',{key:'Enter',bubbles:true}));assert.equal(t.api.state.circleCount,2);
 for(let i=1;i<=5;i++){t.click(`[data-step="${i}"]`);assert.equal(t.el(`[data-step="${i}"]`).getAttribute('aria-current'),'step');assert.ok(t.el('.custom-circle-editor').isConnected);}
 }finally{t.close();}
});
