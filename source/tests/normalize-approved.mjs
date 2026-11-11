import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
export function normalizeApproved(html){
 const baseline=readFileSync(new URL('./fixtures/tutorial-baseline.html',import.meta.url),'utf8');
 const changes=JSON.parse(readFileSync(new URL('./fixtures/compact-approved-changes.json',import.meta.url),'utf8'));
 let expected=baseline;
 for(const {from,to} of changes){assert.ok(expected.includes(from),'approved input must exist');expected=expected.split(from).join(to);}
 const stripped=html.replace(/\n(?:    )?<!-- DESIGNER_TUTORIAL_(STYLE|ENTRY|DIALOG|SCRIPT)_START -->[\s\S]*?<!-- DESIGNER_TUTORIAL_\1_END -->\n/g,'').replace(/\n<!-- DESIGNER_COMPACT_STYLE_START -->[\s\S]*?<!-- DESIGNER_COMPACT_STYLE_END -->\n/,'');
 assert.equal(stripped,expected,'only explicitly listed copy/markup edits plus isolated CSS and tutorial are allowed');
 return baseline;
}
