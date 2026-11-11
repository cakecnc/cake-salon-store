import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
const input = await readFile(new URL('../source/public/designer-payload.txt', import.meta.url));
const sha = createHash('sha256').update(input).digest('hex');
const expected = 'c2280346a3584cdc3a0567eed55bdc158ee2eac6825ff22636898010f56ecaa1';
if (sha !== expected) throw new Error('Source differs from the reviewed designer baseline. Review and update the expected hash explicitly.');
await mkdir(new URL('../out/designer/', import.meta.url), { recursive: true });
await writeFile(new URL('../out/designer/index.html', import.meta.url), input);
console.log(`Designer output verified: ${sha}`);
