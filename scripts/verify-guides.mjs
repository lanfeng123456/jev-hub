import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const dist = path.join(root, 'dist');
const articles = JSON.parse(await readFile(path.join(root, 'content/guides.json'), 'utf8'));
const origin = 'https://jevtypesafe.online';
const guidePaths = ['', '/zh'].flatMap(prefix => [`${prefix}/guides/`, ...articles.map(a => `${prefix}/guides/${a.slug}/`)]);
const paths = ['/', '/en/', ...guidePaths];
const sitemap = await readFile(path.join(dist, 'sitemap.xml'), 'utf8');
const locations = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
assert.deepEqual(new Set(locations), new Set(paths.map(p => origin + p)));
assert.equal(locations.length, paths.length);
const titles = new Set();

for (const route of guidePaths) {
  const html = await readFile(path.join(dist, route, 'index.html'), 'utf8');
  assert.equal((html.match(/<h1>/g) || []).length, 1, `${route}: one H1`);
  const title = html.match(/<title>(.*?)<\/title>/)?.[1];
  assert.ok(title && !titles.has(title), `${route}: unique title`);
  titles.add(title);
  assert.ok(html.includes(`<link rel="canonical" href="${origin}${route}">`), `${route}: canonical`);
  assert.ok(html.includes(`lang="${route.startsWith('/zh/') ? 'zh-CN' : 'en'}"`));
  const alternates = [...html.matchAll(/<link rel="alternate" hreflang="(.*?)" href="(.*?)">/g)];
  assert.equal(alternates.length, 3);
  for (const [, , alternate] of alternates) {
    const target = await readFile(path.join(dist, new URL(alternate).pathname, 'index.html'), 'utf8');
    assert.ok(target.includes(`href="${origin}${route}"`), `${route}: reciprocal alternate`);
  }
  assert.equal((html.match(/googletagmanager\.com\/gtag\/js\?id=G-71QV99MF7V/g) || []).length, 1);
  assert.equal((html.match(/gtag\('config', 'G-71QV99MF7V'\)/g) || []).length, 1);
  for (const [, data] of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) JSON.parse(data);
  for (const [, href] of html.matchAll(/href="([^"#][^"]*)"/g)) {
    if (!href.startsWith('/')) continue;
    const pathname = href.split('#')[0];
    await access(path.join(dist, pathname, pathname.endsWith('/') ? 'index.html' : ''));
  }
  for (const [, fragment] of html.matchAll(/href="#([^"]+)"/g)) {
    assert.ok(html.includes(`id="${fragment}"`), `${route}: broken anchor ${fragment}`);
  }
  const article = articles.find(a => route.endsWith(`/${a.slug}/`));
  if (article) {
    const language = route.startsWith('/zh/') ? 'zh' : 'en';
    for (const section of article[language].sections) {
      assert.ok(html.includes(`id="${section.id}"`), `${route}: missing static section`);
    }
    assert.ok(html.includes('<article>') && html.includes('id="sources"'));
  } else {
    for (const item of articles) assert.ok(html.includes(`/${item.slug}/`), `${route}: missing guide card`);
  }
}

// Run the published example against a mock; never issue a paid model request.
const example = await readFile(path.join(root, 'content/examples/quickstart.txt'), 'utf8');
const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
const run = new AsyncFunction('process', 'fetch', 'console', example);
let payload;
let output;
await run({ env: { TYPESAFE_API_KEY: 'test-only' } }, async (endpoint, options) => {
  assert.equal(endpoint, 'https://api.typesafe.ai/v1/systemone');
  payload = JSON.parse(options.body);
  assert.equal(payload.model, 'jev-latest');
  assert.ok(!Array.isArray(payload.questions));
  assert.deepEqual(Object.keys(payload.questions), ['team', 'urgency', 'refund']);
  for (const question of Object.values(payload.questions)) assert.ok(question.instructions);
  return { ok: true, json: async () => ({ answers: { team: { choice: 'billing', confidence: .8 }, urgency: { score: 0.2 }, refund: { noul: .95 } }, usage: { input_tokens: 1000 } }) };
}, { log: value => { output = value; } });
assert.equal(output.refundProbability, .95);
assert.equal(output.urgency, .2);
await assert.rejects(() => run({ env: {} }, () => { throw new Error('Must not call fetch'); }, console), /Set TYPESAFE_API_KEY/);
await assert.rejects(() => run({ env: { TYPESAFE_API_KEY: 'test-only' } }, async () => ({ ok: false, status: 401 }), console), /HTTP 401/);
console.log(`PASS: ${guidePaths.length} static guide pages, canonical/hreflang, schema, internal links, anchors, GA, sitemap, and mock API example.`);
