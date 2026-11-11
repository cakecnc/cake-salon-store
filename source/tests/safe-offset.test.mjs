import {test} from 'node:test';
import assert from 'node:assert/strict';
import {setup,assertSafeCircles} from './harness.mjs';
const baseline=new URL('../../deployment-tests/fixtures/designer-pre-offset.html',import.meta.url);
const names=['computeFlexibleCircleLayout','computeVariableCircleLayout','lowerCircleArrangement','getFlexibleCircleArea','drawScaleBar'];
const plain=x=>JSON.parse(JSON.stringify(x));
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-7,`${a} != ${b}`);
const check=(before,after,w,h,bar,exempt=false)=>{
 const a={x:2,y:10,width:w-4,height:h-10-(bar?12:3)};
 const shift=!exempt&&((w===210&&h===297)||(w===297&&h===210))&&before.every(c=>c.x-c.diameter/2>=2-1e-7&&c.x+c.diameter/2<=w-2+1e-7&&c.y-c.diameter/2+5>=10-1e-7&&c.y+c.diameter/2+5<=h-(bar?12:3)+1e-7)?5:0;
 assert.equal(after.length,before.length);
 after.forEach((c,i)=>{near(c.y,before[i].y+shift);assert.deepEqual({...plain(c),y:before[i].y},plain(before[i]));});
 return shift;
};
const change=(t,s,b)=>{const e=t.el(s);e.checked=b;e.dispatchEvent(new t.w.Event('change',{bubbles:true}));};
function clear(g,cells){for(const c of cells){const dx=Math.max(g.backingX-c.x,0,c.x-g.backingX-g.backingWidth),dy=Math.max(g.backingTop-c.y,0,c.y-g.backingBottom);assert.ok(Math.hypot(dx,dy)>=c.diameter/2+1-1e-7);}}
test('safe offset: current-production exhaustive uniform sweep preserves capacity, order and exact conditional translation',ctx=>{
 const old=setup(names.filter(n=>n!=='lowerCircleArrangement'),null,baseline),t=setup(names);let cases=0,moved=0,held=0;
 try{for(const [w,h] of [[210,297],[297,210]])for(const bar of [true,false])for(let tenth=50;tenth<=2060;tenth++){
 const d=tenth/10,cap=old.api.computeFlexibleCircleLayout(w,h,d,1,bar).capacity;
 for(const n of [...new Set([1,Math.min(3,cap),Math.ceil(cap/2),cap])]){if(n<1)continue;
 const a=old.api.computeFlexibleCircleLayout(w,h,d,n,bar),b=t.api.computeFlexibleCircleLayout(w,h,d,n,bar);
 assert.equal(b.ok,a.ok);assert.equal(b.capacity,a.capacity);if(!a.ok)continue;
 const shift=check(a.cells,b.cells,w,h,bar);shift?moved++:held++;cases++;
 }}ctx.diagnostic(`${cases} layouts: ${moved} moved, ${held} held`);assert.ok(moved&&held);
 }finally{old.close();t.close();}
});
test('safe offset: mixed circles, physical jigs, presets, legacy state and A3 retain exact scope',()=>{
 const old=setup(names.filter(n=>n!=='lowerCircleArrangement'),null,baseline),t=setup(names);
 try{for(const [w,h] of [[210,297],[297,210],[297,420],[420,297]])for(const bar of [true,false]){
 for(const ds of [[35,55,90,40],[190,5],[90,100,90],Array.from({length:70},(_,i)=>20+i%4)]){
 const a=old.api.computeVariableCircleLayout(w,h,ds,bar),b=t.api.computeVariableCircleLayout(w,h,ds,bar);assert.equal(a.ok,b.ok);
 if(a.ok){check(a.cells,b.cells,w,h,bar);assertSafeCircles(b.cells,{width:w,height:h},bar?12:3);}
 }}
 for(const orientation of ['portrait','landscape'])for(const bar of [true,false])for(const selector of ['[data-circle-preset="two-90"]','[data-circle-preset="one-100"]','[data-circle-preset="two-90-one-100"]',...[35,55,130,160,180].map(d=>`[data-circle-diameter="${d}"]`)]){
 for(const x of [old,t]){x.click('[data-template="single"]');change(x,`[name="orientation"][value="${orientation}"]`,true);change(x,'#scaleBarInput',bar);x.click(selector);}
 const p=t.api.getPageSize();check(old.api.getTemplateCells(),t.api.getTemplateCells(),p.width,p.height,bar,t.api.state.circleLayoutMode==='standard');
 }
 }finally{old.close();t.close();}
});
test('safe offset: exact5mm boundary, one-micron shortfall and immutable input',()=>{
 const t=setup(names);try{const area=t.api.getFlexibleCircleArea(210,297,true);
 for(const bottom of [280,280.000001,285]){const cells=[{x:105,y:bottom-10,diameter:20,index:3}],snapshot=plain(cells);const moved=t.api.lowerCircleArrangement(cells,210,297,area);near(moved[0].y,cells[0].y+(bottom<=280?5:0));assert.deepEqual(cells,snapshot);}
 const cells=[{x:105,y:113,diameter:206}];near(t.api.lowerCircleArrangement(cells,210,297,area)[0].y,118);
 }finally{t.close();}
});
test('safe print check: analytic lateral placement uses entire backing, with deterministic safe fallback and exact50mm',()=>{
 const t=setup(names);try{for(const [w,h] of [[210,297],[297,210]]){
 for(const cells of [[],[{x:w-20,y:18,diameter:12}],[{x:w/2,y:13,diameter:w}],[{x:30,y:17,diameter:4},{x:w-20,y:16,diameter:4}]]){
 const g=t.api.getScaleBarGeometry(w,h,cells);if(cells.some(c=>c.diameter===w)){assert.equal(g,null);continue;}
 assert.ok(g);assert.equal(g.length,50);assert.equal(g.backingTop,10);assert.equal(g.backingBottom,14);assert.ok(g.backingX>=2-1e-7&&g.backingX+g.backingWidth<=w-2+1e-7);clear(g,cells);
 }
 // Independent integer bitmap mapping for both A4 orientations and two raster scales.
 for(const dpi of [150,300]){const calls=[];const c=new Proxy({canvas:{width:Math.round(w*dpi/25.4),height:Math.round(h*dpi/25.4)}},{get:(o,k)=>k in o?o[k]:(...a)=>calls.push([k,...a]),set:(o,k,v)=>(o[k]=v,true)});t.api.drawScaleBar(c,w,h);const tr=calls.find(c=>c[0]==='setTransform'),start=calls.find(c=>c[0]==='moveTo'),end=calls.find(c=>c[0]==='lineTo');near((end[1]-start[1])*tr[1]/c.canvas.width*w,50);near(start[2]*tr[4]/c.canvas.height*h,12);}
 }}finally{t.close();}
});
test('safe print check: dense collision blocks PNG and print, no preview overlay, OFF restores output',()=>{
 const t=setup(names);try{t.add('photo');t.input('#customCircleUnit','mm','change');t.input('#customCircleInput',5);t.input('#customCircleCount',1);t.pointerClick('#customCircleApply');t.click('#customCircleMax');t.pointerClick('#customCircleApply');
 assert.equal(t.api.getScaleBarGeometry(210,297),null);assert.equal(t.api.getOutputPreflight().ok,false);assert.match(t.api.getOutputPreflight().text,/끄면/);
 t.reset();t.api.render();assert.equal(t.labels().filter(x=>/50mm/.test(x.label)).length,0);let encoded=0,downloaded=0;t.w.HTMLAnchorElement.prototype.click=()=>{downloaded++;};
 t.w.HTMLCanvasElement.prototype.toBlob=()=>{encoded++;};t.w.HTMLCanvasElement.prototype.toDataURL=()=>{encoded++;return 'data:image/png;base64,';};
 t.click('#downloadButton');t.click('#printButton');assert.equal(encoded,0);assert.equal(t.prints(),0);assert.equal(downloaded,0);assert.throws(()=>t.api.createOutputCanvas(),/검증선/);
 change(t,'#scaleBarInput',false);assert.equal(t.api.getOutputPreflight().ok,true);assert.doesNotThrow(()=>t.api.createOutputCanvas());
 }finally{t.close();}
});
test('safe offset: repeated render, checkbox switches, Undo, persistence and indexed images never accumulate translation',()=>{
 const saved={template:'circle',circleLayoutMode:'flexible',circleDiameterMm:90.1,circleCount:3,circlePresetId:'',orientation:'portrait',showScaleBar:true};
 const t=setup(names,saved);try{t.add('red');t.add('blue');const cells=plain(t.api.getTemplateCells()),snap=t.api.studioSnapshot();
 for(let i=0;i<10;i++){t.api.render();assert.deepEqual(plain(t.api.getTemplateCells()),cells);}
 for(let i=0;i<3;i++){change(t,'#scaleBarInput',false);change(t,'#scaleBarInput',true);t.api.restoreSnapshot(snap);assert.deepEqual(plain(t.api.getTemplateCells()),cells);}
 const reopened=setup(names,saved);try{assert.deepEqual(plain(reopened.api.getTemplateCells()),cells);}finally{reopened.close();}
 t.reset();t.api.createOutputCanvas();assert.deepEqual(t.drawn(),['red','blue','red']);
 }finally{t.close();}
});
