import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { setup, sourcePath } from './harness.mjs';
import {normalizeApproved} from './normalize-approved.mjs';
const KEY='cake-designer-tutorial-v1';
const html=readFileSync(sourcePath,'utf8');
const script=html.match(/<script id="designerTutorialScript">([\s\S]*?)<\/script>/)[1];
function init({seen=false,native=true,blocked=false}={}) {
 const h=setup(['undoHistory','mobileStep','individualSizeDrafts']);
 const {w}=h;w.scrollTo=()=>{};
 if(seen)w.localStorage.setItem(KEY,'seen');
 if(native){w.HTMLDialogElement.prototype.showModal=function(){this.setAttribute('open','');};w.HTMLDialogElement.prototype.close=function(){this.removeAttribute('open');};}
 if(blocked){Object.defineProperty(w,'localStorage',{get(){throw new w.DOMException('Denied','SecurityError');}});}
 w.eval(script);w.document.dispatchEvent(new w.Event('DOMContentLoaded'));
 return {...h,dialog:h.el('#designerTutorial'),key:(key,options={})=>h.el('#designerTutorialStepTitle').dispatchEvent(new w.KeyboardEvent('keydown',{key,bubbles:true,cancelable:true,...options}))};
}
test('tutorial and compact UI contain only explicitly approved additions and copy changes',()=>{
 normalizeApproved(html);
 assert.equal((html.match(/id="designerTutorialReplay"/g)||[]).length,1);
 assert.ok(!script.includes('fetch(')&&!script.includes('XMLHttpRequest'));
});
test('first visit opens; all five steps work, previous works and completion persists only the guide marker',()=>{
 const h=init();try{
  assert.ok(h.dialog.open);assert.equal(h.el('#designerTutorialPrevious').disabled,true);assert.match(h.el('#designerTutorialStepTitle').textContent,/이미지/);
  h.click('#designerTutorialNext');assert.match(h.el('#designerTutorialStepTitle').textContent,/시트/);
  h.click('#designerTutorialPrevious');assert.match(h.el('#designerTutorialStepTitle').textContent,/이미지/);
  for(let i=0;i<4;i++)h.click('#designerTutorialNext');
  assert.equal(h.el('#designerTutorialNext').textContent,'시작하기');h.click('#designerTutorialNext');assert.equal(h.dialog.open,false);assert.equal(h.w.localStorage.getItem(KEY),'seen');
 }finally{h.close();}
});
test('skip, close, Escape and native cancel all dismiss without changing existing settings',()=>{
 for(const action of ['skip','close','escape','cancel']){
  const h=init();try{const before=h.w.localStorage.getItem('cnc-designer-settings-v1');
   if(action==='skip')h.click('#designerTutorialSkip');if(action==='close')h.click('#designerTutorialClose');if(action==='escape')h.key('Escape');if(action==='cancel')h.dialog.dispatchEvent(new h.w.Event('cancel',{cancelable:true}));
   assert.equal(h.dialog.open,false);assert.equal(h.w.localStorage.getItem(KEY),'seen');assert.equal(h.w.localStorage.getItem('cnc-designer-settings-v1'),before);assert.equal(h.w.document.body.style.overflow,'');
  }finally{h.close();}
 }
});
test('return visits do not auto-open and manual replay starts at step 1; repeated open/close remains stable',()=>{
 const h=init({seen:true});try{assert.equal(h.dialog.open,false);
  for(let i=0;i<3;i++){h.el('#designerTutorialReplay').focus();h.click('#designerTutorialReplay');assert.ok(h.dialog.open);assert.match(h.el('#designerTutorialProgress').textContent,/1 \/ 5/);h.click('#designerTutorialNext');h.click('#designerTutorialClose');assert.equal(h.w.document.activeElement.id,'designerTutorialReplay');}
 }finally{h.close();}
});
test('live layers, layout, pending input, Undo, focus mode and mobile step survive replay/keyboard/dismiss',()=>{
 const h=init({seen:true});try{
  h.add('existing-image');h.api.captureUndo();h.w.document.body.classList.add('focus-mode');h.input('#customCircleInput','6.75');
  const before=JSON.stringify(h.api.studioSnapshot()),undo=h.api.undoHistory.length,step=h.api.mobileStep,value=h.el('#customCircleInput').value;
  const images=h.api.state.layers.map(x=>x.image);h.click('#designerTutorialReplay');h.key('z',{ctrlKey:true});h.key('z',{metaKey:true});h.click('#designerTutorialNext');h.key('Escape');
  assert.equal(JSON.stringify(h.api.studioSnapshot()),before);assert.equal(h.api.undoHistory.length,undo);assert.equal(h.api.mobileStep,step);assert.equal(h.el('#customCircleInput').value,value);assert.deepEqual(h.api.state.layers.map(x=>x.image),images);assert.ok(h.w.document.body.classList.contains('focus-mode'));assert.equal(h.prints(),0);
 }finally{h.close();}
});
test('keyboard focus remains inside the guide and restores after close',()=>{
 const h=init({seen:true});try{h.el('#zoomInput').focus();h.click('#designerTutorialReplay');h.key('Tab',{shiftKey:true});assert.equal(h.w.document.activeElement.id,'designerTutorialNext');h.el('#designerTutorialNext').dispatchEvent(new h.w.KeyboardEvent('keydown',{key:'Tab',bubbles:true,cancelable:true}));assert.equal(h.w.document.activeElement.id,'designerTutorialClose');h.click('#designerTutorialClose');assert.equal(h.w.document.activeElement.id,'zoomInput');}finally{h.close();}
});
test('storage denied and dialog fallback still allow skip and replay',()=>{
 const h=init({native:false,blocked:true});try{assert.ok(h.dialog.open);assert.ok(h.dialog.classList.contains('tutorial-fallback'));h.click('#designerTutorialSkip');assert.equal(h.dialog.open,false);h.click('#designerTutorialReplay');assert.ok(h.dialog.open);h.key('Escape');assert.equal(h.dialog.open,false);}finally{h.close();}
});
test('dialog is labelled, touch controls have minimum size, print hides it and reduced motion is respected',()=>{
 const h=init({seen:true});try{assert.equal(h.dialog.getAttribute('aria-modal'),'true');assert.equal(h.dialog.getAttribute('aria-labelledby'),'designerTutorialTitle');assert.match(html,/min-height:44px/);assert.match(html,/@media print\{#designerTutorial,\.tutorial-entry\{display:none!important\}\}/);assert.match(html,/prefers-reduced-motion:reduce/);}finally{h.close();}
});
