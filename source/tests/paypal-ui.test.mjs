import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {JSDOM} from 'jsdom';
const html=readFileSync(new URL('../public/designer-payload.txt',import.meta.url),'utf8');
test('reviewed PayPal link is exact and legacy membership controls stay hidden and inert',()=>{
 const d=new JSDOM(html).window.document;
 const section=d.querySelector('#membershipSection');
 assert.ok(section.classList.contains('paypal-checkout'));
 const legacy=section.querySelector('.membership-legacy');
 assert.ok(legacy.hasAttribute('hidden'));assert.ok(legacy.hasAttribute('inert'));
 const link=section.querySelector('a[href="https://www.paypal.com/ncp/payment/CBYLHTSA8TSA2"]');
 assert.ok(link);assert.match(link.textContent,/24/);assert.match(link.textContent,/USD/);assert.ok(!legacy.contains(link));
 assert.match(html,/\.membership-legacy\[hidden\]\{display:none!important\}/);
 assert.match(html,/@media print\{\.paypal-checkout\{display:none!important\}\}/);
});
