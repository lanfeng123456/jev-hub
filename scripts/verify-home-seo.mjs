import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const dist = path.join(root, 'dist');
const origin = 'https://jevtypesafe.online';

const page = async route => readFile(path.join(dist, route, 'index.html'), 'utf8');
const content = (html, pattern, label) => {
  const value = html.match(pattern)?.[1];
  assert.ok(value, `Missing ${label}`);
  return value;
};

const zh = await page('');
const en = await page('en');

const cases = [
  {
    route: '/', html: zh, lang: 'zh-CN', canonical: `${origin}/`, alternate: `${origin}/en/`,
    titleTerms: ['Jev AI', 'TypeSafe', 'System One'], descriptionTerms: ['Choice', 'Score', 'Noul'],
  },
  {
    route: '/en/', html: en, lang: 'en', canonical: `${origin}/en/`, alternate: `${origin}/`,
    titleTerms: ['Jev AI', 'TypeSafe', 'System One'], descriptionTerms: ['Choice', 'Score', 'Noul'],
  },
];

const titles = new Set();
for (const item of cases) {
  assert.ok(item.html.includes(`<html lang="${item.lang}">`), `${item.route}: language`);
  const title = content(item.html, /<title>(.*?)<\/title>/, `${item.route} title`);
  const description = content(item.html, /<meta name="description" content="([^"]*)"/, `${item.route} description`);
  assert.ok(!titles.has(title), `${item.route}: title must be unique`);
  titles.add(title);
  for (const term of item.titleTerms) assert.ok(title.includes(term), `${item.route}: title missing ${term}`);
  for (const term of item.descriptionTerms) assert.ok(description.includes(term), `${item.route}: description missing ${term}`);
  assert.ok(!description.includes('Bilingual'), `${item.route}: description must use one language`);
  assert.ok(item.html.includes(`<link rel="canonical" href="${item.canonical}"`), `${item.route}: canonical`);
  assert.ok(item.html.includes(`<link rel="alternate" hreflang="${item.lang === 'en' ? 'zh-CN' : 'en'}" href="${item.alternate}"`), `${item.route}: reciprocal hreflang`);
  assert.ok(item.html.includes(`<meta property="og:url" content="${item.canonical}"`), `${item.route}: OG URL`);
  assert.ok(!/<meta name="keywords"/i.test(item.html), `${item.route}: obsolete meta keywords must stay absent`);
}

const sitemap = await readFile(path.join(dist, 'sitemap.xml'), 'utf8');
const locations = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]);
assert.equal(locations.length, 12, 'Sitemap must contain the English homepage plus the existing 11 URLs');
assert.ok(locations.includes(`${origin}/en/`), 'Sitemap is missing /en/');

console.log('PASS: localized home metadata, reciprocal hreflang, unique titles and 12 sitemap URLs.');
