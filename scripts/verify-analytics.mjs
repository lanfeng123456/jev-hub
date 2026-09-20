import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const dist = path.join(root, 'dist');

async function indexPages(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const pages = await Promise.all(entries.map(async entry => {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return indexPages(fullPath);
    return entry.name === 'index.html' ? [fullPath] : [];
  }));
  return pages.flat();
}

const pages = await indexPages(dist);
assert.equal(pages.length, 12, 'Expected 12 indexable pages');

for (const file of pages) {
  const html = await readFile(file, 'utf8');
  const route = path.relative(dist, file);
  assert.equal((html.match(/www\.clarity\.ms\/tag\//g) || []).length, 1, `${route}: Clarity loader count`);
  assert.equal((html.match(/yl2tqgn5sn/g) || []).length, 1, `${route}: Clarity project ID count`);
  assert.equal((html.match(/googletagmanager\.com\/gtag\/js\?id=G-71QV99MF7V/g) || []).length, 1, `${route}: GA loader count`);
}

console.log(`PASS: GA and Microsoft Clarity appear once on ${pages.length} pages.`);
