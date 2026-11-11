import { test } from 'node:test';
import assert from 'node:assert/strict';
import { setup, assertSafeCircles, assertTopOffset } from './harness.mjs';
const json=x=>JSON.stringify(x);
const diam=t=>Array.from(t.api.getTemplateCells(),c=>c.diameter);
function base(t,d=5,n=4) {t.input('#customCircleInput',d);t.input('#customCircleCount',n);t.click('#customCircleApply');t.flush();}
function size(t,i,d) {t.input(`[data-circle-size="${i}"]`,d);t.click(`[aria-label="원형 ${i+1} 지름 적용"]`);t.flush();}

test('individual sizes: exact 5mm buttons/arrow steps retain off-grid precision; first/Enter/repeat apply',()=>{
 const t=setup();try {t.add('red');base(t,5.01,3);
 t.click('[aria-label="전체 지름 0.5cm 늘리기"]');assert.equal(t.el('#customCircleInput').value,'5.51');
 t.click('#customCircleApply');t.flush();assert.deepEqual(diam(t),[55.1,55.1,55.1]);
 t.click('[aria-label="원형 1 지름 0.5cm 줄이기"]');assert.equal(t.el('[data-circle-size="0"]').value,'5.01');
 t.el('[data-circle-size="0"]').dispatchEvent(new t.w.KeyboardEvent('keydown',{key:'Enter',bubbles:true}));t.flush();
 assert.deepEqual(diam(t),[50.1,55.1,55.1]);assertSafeCircles(t.api.getTemplateCells());
 const before=json(t.api.getTemplateCells());t.click('[aria-label="원형 1 지름 적용"]');t.flush();assert.equal(json(t.api.getTemplateCells()),before);
 assert.equal(t.el('[aria-label="원형 1 지름 적용"]').getAttribute('aria-pressed'),'true');
 }finally{t.close();}
});

test('individual sizes: mixed geometry, indexed image assignments/transforms, Undo and count changes',()=>{
 const t=setup();try{t.add('red');t.add('blue');base(t,5.5,4);
 t.api.state.circleAssignments={0:'blue',1:'red',2:'blue',3:'red'};t.api.state.zoom=1.4;t.api.state.rotation=20;t.api.syncActiveLayer();
 size(t,0,9);size(t,1,7);assert.deepEqual(diam(t),[90,70,55,55]);assertSafeCircles(t.api.getTemplateCells());
 assert.equal(t.api.getCircleLayer(0).id,'blue');assert.equal(t.api.getCircleLayer(1).id,'red');assert.equal(t.api.state.layers[1].zoom,1.4);
 t.input('#customCircleCount',2);t.click('#customCircleApply');t.flush();assert.deepEqual(diam(t),[90,70]);
 t.click('#undoButton');t.flush();assert.deepEqual(diam(t),[90,70,55,55]);assert.equal(t.api.state.layers[1].rotation,20);
 t.input('#customCircleCount',5);t.click('#customCircleApply');t.flush();assert.deepEqual(diam(t),[90,70,55,55,55]);
 t.input('#customCircleInput',4);t.click('#customCircleApply');t.flush();assert.deepEqual(diam(t),[40,40,40,40,40]);
 }finally{t.close();}
});

test('individual sizes: invalid/empty/too precise/repeated drafts preserve valid state and block output until canceled',()=>{
 const t=setup();try{t.add('red');base(t,9,3);const before=json(t.api.getTemplateCells());
 for(const d of ['',0.49,20.7,20.6,9.011]) {size(t,0,d);assert.equal(json(t.api.getTemplateCells()),before);assert.equal(t.api.outputIsReady(),false);t.click('#printButton');assert.equal(t.prints(),0);}
 t.click('[aria-label="원형 1 지름 취소"]');t.flush();assert.equal(t.api.outputIsReady(),true);
 t.input('[data-circle-size="0"]',8);t.input('[data-circle-size="1"]',7);
 t.click('[aria-label="원형 1 지름 적용"]');t.flush();assert.equal(t.el('[data-circle-size="1"]').value,'7');assert.equal(t.api.outputIsReady(),false);
 t.click('[aria-label="원형 2 지름 적용"]');t.flush();assert.deepEqual(diam(t),[80,70,90]);assert.equal(t.api.outputIsReady(),true);
 }finally{t.close();}
});

test('individual sizes: full-layout checks across orientation and scale-line reserve',()=>{
 const t=setup(['computeVariableCircleLayout']);try{
 const cases=[[90,100,55],[130,125],[180,35],[5,10,15,20,25,30,35,40,45,50],[206],[5]];
 for(const page of [{width:210,height:297},{width:297,height:210}]) for(const scale of [true,false]) for(const ds of cases) {
  const l=t.api.computeVariableCircleLayout(page.width,page.height,ds,scale);
  if(l.ok){assertSafeCircles(l.cells,page,scale?12:3);assert.deepEqual(Array.from(l.cells,c=>c.diameter),ds);assertTopOffset(l.cells,page,scale?12:3);}
 }
 base(t,18,1);size(t,0,20.6);const before=json(t.api.getTemplateCells());const radio=t.el('[name="orientation"][value="landscape"]');radio.checked=true;radio.dispatchEvent(new t.w.Event('change',{bubbles:true}));t.flush();assert.equal(t.api.state.orientation,'portrait');assert.equal(json(t.api.getTemplateCells()),before);
 assert.equal(t.api.computeVariableCircleLayout(210,297,[206,206],true).ok,false);
 }finally{t.close();}
});

test('individual sizes: new and legacy persistence restore exact precision with no image data',async()=>{
 const saved={orientation:'portrait',template:'circle',circleLayoutMode:'flexible',circleDiameterMm:55.1,circleCount:3,circleDiametersMm:[90.1,55.1,35],showScaleBar:true};
 let t=setup([],saved);try{assert.deepEqual(diam(t),[90.1,55.1,35]);t.api.render();await new Promise(r=>setTimeout(r,400));const data=JSON.parse(t.w.localStorage.getItem('cnc-designer-settings-v1'));assert.deepEqual(data.circleDiametersMm,[90.1,55.1,35]);assert.equal(data.layers,undefined);assert.equal(data.circleAssignments,undefined);}finally{t.close();}
 delete saved.circleDiametersMm;t=setup([],saved);try{assert.deepEqual(diam(t),[55.1,55.1,55.1]);}finally{t.close();}
});

test('individual sizes: standard jig untouched until explicit size apply and Undo restores jig',()=>{
 const t=setup();try{t.click('[data-standard-jig="true"]');t.flush();const before=json(t.api.getTemplateCells());assert.equal(t.api.state.circleLayoutMode,'standard');
 t.input('[data-circle-size="0"]',3);assert.equal(json(t.api.getTemplateCells()),before);
 t.click('[aria-label="원형 1 지름 적용"]');t.flush();assert.equal(t.api.state.circleLayoutMode,'flexible');assert.equal(diam(t)[0],30);assertSafeCircles(t.api.getTemplateCells());
 t.click('#undoButton');t.flush();assert.equal(t.api.state.circleLayoutMode,'standard');assert.equal(json(t.api.getTemplateCells()),before);
 }finally{t.close();}
});

test('individual sizes: dense mixed batches do not stall and all accepted cells satisfy boundaries/gaps',()=>{
 const t=setup(['computeVariableCircleLayout']);try{const start=performance.now();
 for(let n=2;n<=200;n+=3){const ds=Array.from({length:n},(_,i)=>5+(i%5)*5);const l=t.api.computeVariableCircleLayout(210,297,ds,true);if(l.ok)assertSafeCircles(l.cells);}
 assert.ok(performance.now()-start<5000);
 }finally{t.close();}
});

test('review regression: global actions cannot discard pending individual input or re-enable output',()=>{
 const t=setup();try{t.add('red');base(t,5,2);t.input('[data-circle-size="0"]',7);t.input('#customCircleCount',3);t.click('#customCircleApply');t.flush();
 assert.deepEqual(diam(t),[50,50]);assert.equal(t.el('[data-circle-size="0"]').value,'7');assert.equal(t.api.outputIsReady(),false);
 t.click('#customCircleCancel');t.flush();assert.equal(t.el('[data-circle-size="0"]').value,'7');assert.equal(t.el('#customCircleCount').value,'2');
 t.click('[aria-label="원형 1 지름 적용"]');t.flush();assert.deepEqual(diam(t),[70,50]);assert.equal(t.api.outputIsReady(),true);
 }finally{t.close();}
});

test('review regression: uniform individual edits synchronize global size, labels, slug and Undo',()=>{
 const t=setup(['getCircleTemplateLabel','getCircleTemplateSlug']);try{t.add('red');base(t,5,3);size(t,0,7);size(t,1,7);size(t,2,7);
 assert.deepEqual(diam(t),[70,70,70]);assert.equal(t.api.state.circleDiameterMm,70);assert.equal(t.el('#customCircleInput').value,'7');assert.match(t.api.getCircleTemplateLabel(),/70mm/);assert.match(t.api.getCircleTemplateSlug(),/70mm/);
 t.click('#undoButton');t.flush();assert.deepEqual(diam(t),[70,70,50]);assert.equal(t.api.outputIsReady(),true);
 }finally{t.close();}
});

test('review regression: count-only transition from mixed preset retains indexed diameters',()=>{
 const t=setup();try{t.click('[data-circle-preset="two-90-one-100"]');t.flush();assert.deepEqual(diam(t),[90,100,90]);
 t.input('#customCircleCount',2);t.click('#customCircleApply');t.flush();assert.deepEqual(diam(t),[90,100]);assertSafeCircles(t.api.getTemplateCells());
 t.input('#customCircleCount',1);t.click('#customCircleApply');t.flush();assert.deepEqual(diam(t),[90]);assert.equal(t.api.state.circleDiameterMm,90);assert.equal(t.el('#customCircleInput').value,'9');
 }finally{t.close();}
});

test('individual sizes: orientation/scale changes retain pending individual drafts and output blocking',()=>{
 const t=setup();try{t.add('red');base(t,5,3);t.input('[data-circle-size="0"]',7);
 const radio=t.el('[name="orientation"][value="landscape"]');radio.checked=true;radio.dispatchEvent(new t.w.Event('change',{bubbles:true}));t.flush();
 assert.equal(t.el('[data-circle-size="0"]').value,'7');assert.equal(t.api.outputIsReady(),false);assert.equal(t.el('[data-circle-size="0"]').max,'18.8');
 const scale=t.el('#scaleBarInput');scale.checked=false;scale.dispatchEvent(new t.w.Event('change',{bubbles:true}));t.flush();assert.equal(t.el('[data-circle-size="0"]').value,'7');assert.equal(t.api.outputIsReady(),false);
 t.click('[aria-label="원형 1 지름 적용"]');t.flush();assert.deepEqual(diam(t),[70,50,50]);assertSafeCircles(t.api.getTemplateCells(),{width:297,height:210},3);assert.equal(t.api.outputIsReady(),true);
 const portrait=t.el('[name="orientation"][value="portrait"]');portrait.checked=true;portrait.dispatchEvent(new t.w.Event('change',{bubbles:true}));t.flush();assert.equal(t.el('[data-circle-size="0"]').max,'20.6');
 }finally{t.close();}
});

test('individual sizes: seeded mixed-diameter sweep validates every accepted circle independently',()=>{
 const t=setup(['computeVariableCircleLayout']);try{let seed=20261111,accepted=0;const rand=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/2**32;};
 for(let k=0;k<500;k++) {const page=k%2?{width:210,height:297}:{width:297,height:210},scale=k%3!==0;const ds=Array.from({length:1+Math.floor(rand()*15)},()=>5+5*Math.floor(rand()*36));
 const l=t.api.computeVariableCircleLayout(page.width,page.height,ds,scale);if(l.ok){accepted++;assertSafeCircles(l.cells,page,scale?12:3);assert.deepEqual(Array.from(l.cells,c=>c.diameter),ds);}else assert.equal(l.cells.length,0);
 }assert.ok(accepted>20);
 }finally{t.close();}
});

test('individual sizes: drafts survive deferred image decode, successive batch renders and rapid orientation changes',async()=>{
 const t=setup();try{base(t,5.5,3);
 const png=new ArrayBuffer(24),bytes=new Uint8Array(png),view=new DataView(png);bytes.set([137,80,78,71,13,10,26,10]);bytes.set([73,72,68,82],12);view.setUint32(16,600);view.setUint32(20,600);
 const decodes=[];t.w.Image=class{constructor(){this.naturalWidth=600;this.naturalHeight=600;}set src(value){decodes.push(()=>this.onload());}};
 const input=t.el('#imageInput');Object.defineProperty(input,'files',{configurable:true,value:['red','green','blue'].map(name=>({name:name+'.png',type:'image/png',size:24,arrayBuffer:async()=>png}))});
 input.dispatchEvent(new t.w.Event('change'));t.input('[data-circle-size="0"]',6.5);
 for(let i=0;i<3;i++) {
  for(let spin=0;spin<20&&!decodes.length;spin++)await new Promise(r=>setImmediate(r));assert.ok(decodes.length);
  const orientation=i%2?'portrait':'landscape',radio=t.el(`[name="orientation"][value="${orientation}"]`);radio.checked=true;radio.dispatchEvent(new t.w.Event('change',{bubbles:true}));t.flush();
  assert.equal(t.el('[data-circle-size="0"]').value,'6.5');decodes.shift()();await new Promise(r=>setImmediate(r));t.flush();
  assert.equal(t.el('[data-circle-size="0"]').value,'6.5');assert.equal(t.api.outputIsReady(),false);
 }
 for(let spin=0;spin<20&&input.disabled;spin++)await new Promise(r=>setImmediate(r));assert.equal(input.disabled,false);assert.equal(t.api.state.layers.length,3);assert.equal(t.el('[data-circle-size="0"]').value,'6.5');assert.equal(t.api.outputIsReady(),false);
 t.click('[aria-label="원형 1 지름 적용"]');t.flush();assert.deepEqual(diam(t),[65,55,55]);assert.equal(t.api.outputIsReady(),true);
 }finally{t.close();}
});
