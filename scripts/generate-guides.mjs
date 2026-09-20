import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const read = (file) => readFile(path.join(root, file), 'utf8');
const articles = JSON.parse(await read('content/guides.json'));
const example = await read('content/examples/quickstart.txt');
const template = await read('index.html');
const analytics = template.match(/<!-- Google tag \(gtag\.js\) -->[\s\S]*?<\/script>\s*<script>[\s\S]*?<\/script>/)?.[0];
if (!analytics) throw new Error('Missing shared Google Analytics tag in index.html');
const clarity = template.match(/<!-- Microsoft Clarity -->[\s\S]*?<!-- \/Microsoft Clarity -->/)?.[0];
if (!clarity) throw new Error('Missing shared Microsoft Clarity tag in index.html');
const iconMetadata = template.match(/<!-- Site icons -->[\s\S]*?<!-- \/Site icons -->/)?.[0];
if (!iconMetadata) throw new Error('Missing shared site icon metadata in index.html');
const origin = 'https://jevtypesafe.online';
// Change only when the articles and their sources have actually been reviewed.
const reviewed = '2026-09-20';
const escape = (s) => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const json = (value) => JSON.stringify(value).replace(/</g, '\\u003c');
const url = (lang, slug = '') => `${lang === 'zh' ? '/zh' : ''}/guides/${slug ? `${slug}/` : ''}`;
const copy = {
  en: { lang: 'en', home: 'Home', guides: 'Guides', skip: 'Skip to content', answer: 'Quick answer', contents: 'On this page', sources: 'Sources & verification', related: 'Keep exploring', faq: 'Common questions', checked: 'Sources checked', independent: 'Independent community guide. Not affiliated with TypeSafe AI.', hubTitle: 'Jev AI Guides: API, Access, Pricing and Benchmarks', hubDescription: 'Practical Jev and TypeSafe AI guides with official sources: API setup, access and downloads, token pricing, and an honest reading of benchmark claims.', hubIntro: 'From a first look to a first request. Choose a guide for the question you need to answer, with practical examples and links back to the official documentation.', read: 'Read guide', official: 'Official docs', notice: 'Examples and explanations are editorial guidance. Current official documentation and account terms take precedence.' },
  zh: { lang: 'zh-CN', home: '首页', guides: '使用指南', skip: '跳到正文', answer: '先看结论', contents: '本文目录', sources: '资料来源与核对', related: '继续阅读', faq: '常见问题', checked: '资料核对日期', independent: '独立社区指南，与 TypeSafe AI 无隶属关系。', hubTitle: 'Jev AI 使用指南：API、访问申请、价格与评测', hubDescription: '基于官方资料的 Jev 与 TypeSafe AI 中文指南：API 接入、下载与访问申请、Token 费用和性能评测，提供代码示例及来源链接。', hubIntro: '从了解模型到完成第一次调用，按你当前的问题选择指南。每篇提供实用解释、示例与官方资料链接。', read: '阅读指南', official: '官方文档', notice: '示例和解释为社区编辑内容，最新官方文档与账号条款优先。' },
};

function cards(lang, except) {
  const c = copy[lang];
  return `<div class="cards">${articles.filter(a => a.slug !== except).map(a => `<a class="guide-card" href="${url(lang, a.slug)}"><span class="eyebrow">${escape(a[lang].category)}</span><h3>${escape(a[lang].title)}</h3><p>${escape(a[lang].description)}</p><span class="read">${c.read} <span aria-hidden="true">↗</span></span></a>`).join('')}</div>`;
}

function section(s) {
  return `<section id="${escape(s.id)}"><h2>${escape(s.title)}</h2>${(s.paragraphs || []).map(p => `<p>${escape(p)}</p>`).join('')}${s.bullets ? `<ul>${s.bullets.map(b => `<li>${escape(b)}</li>`).join('')}</ul>` : ''}${s.table ? `<div class="table-wrap" tabindex="0" role="region" aria-label="${escape(s.title)}"><table><thead><tr>${s.table.headers.map(h => `<th scope="col">${escape(h)}</th>`).join('')}</tr></thead><tbody>${s.table.rows.map(r => `<tr>${r.map(cell => `<td>${escape(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>` : ''}${s.codeKey ? `<div class="code-label">quickstart.mjs · Node.js 18+</div><pre tabindex="0" aria-label="JavaScript example"><code>${escape(example)}</code></pre>` : ''}</section>`;
}

function advertisement(lang, unit, sidebar = false) {
  const label = lang === 'zh' ? '广告' : 'Advertisement';
  const block = `<div class="ad-placement ${unit === 'short' ? 'ad-after-content' : ''}"><span class="ad-label">${label}</span><div class="ad-slot" data-ad-unit="${unit}" aria-label="${label}"></div></div>`;
  return sidebar ? `<aside class="${unit === 'short' ? 'ad-left' : 'ad-sidebar'}" aria-label="${label}">${block}</aside>` : block;
}

function document(lang, article) {
  const c = copy[lang];
  const p = article?.[lang];
  const slug = article?.slug || '';
  const canonical = origin + url(lang, slug);
  const title = p?.title || c.hubTitle;
  const seoTitle = p?.seoTitle || title;
  const description = p?.description || c.hubDescription;
  const crumbs = [{ '@type': 'ListItem', position: 1, name: c.home, item: `${origin}/` }, { '@type': 'ListItem', position: 2, name: c.guides, item: origin + url(lang) }];
  if (p) crumbs.push({ '@type': 'ListItem', position: 3, name: title, item: canonical });
  const schema = [{ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: crumbs }, p ? { '@context': 'https://schema.org', '@type': 'Article', headline: title, description, inLanguage: c.lang, datePublished: reviewed, dateModified: reviewed, mainEntityOfPage: canonical, author: { '@type': 'Organization', name: 'Jev Hub', url: origin }, citation: article.sources.map(s => s.url) } : { '@context': 'https://schema.org', '@type': 'CollectionPage', name: title, description, url: canonical, inLanguage: c.lang }];
  return `<!doctype html>
<html lang="${c.lang}"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escape(seoTitle)} | Jev Hub</title><meta name="description" content="${escape(description)}">
<link rel="canonical" href="${canonical}">
<link rel="alternate" hreflang="en" href="${origin + url('en', slug)}">
<link rel="alternate" hreflang="zh-CN" href="${origin + url('zh', slug)}">
<link rel="alternate" hreflang="x-default" href="${origin + url('en', slug)}">
<meta property="og:type" content="${p ? 'article' : 'website'}"><meta property="og:title" content="${escape(seoTitle)}">
<meta property="og:description" content="${escape(description)}"><meta property="og:url" content="${canonical}"><meta property="og:site_name" content="Jev Hub">
<meta name="twitter:card" content="summary"><meta name="twitter:title" content="${escape(seoTitle)}"><meta name="twitter:description" content="${escape(description)}">
<link rel="stylesheet" href="/guides.css"><link rel="stylesheet" href="/ads.css"><script defer src="/ads.js"></script><script type="application/ld+json">${json(schema)}</script>
${iconMetadata}
${analytics}
${clarity}
</head><body>
<a class="skip" href="#main">${c.skip}</a>
<header class="site-header"><div class="header-inner"><a class="brand" href="/">&gt;_ Jev <span>Hub</span></a><nav aria-label="${c.guides}"><a href="${url(lang)}">${c.guides}</a><a href="https://docs.typesafe.ai/">${c.official} ↗</a></nav><div class="languages"><a href="${url('en', slug)}" lang="en" hreflang="en" ${lang === 'en' ? 'aria-current="page"' : ''}>EN</a><a href="${url('zh', slug)}" lang="zh-CN" hreflang="zh-CN" ${lang === 'zh' ? 'aria-current="page"' : ''}>中文</a></div></div></header>
<main id="main" class="shell guide-shell">
<nav class="breadcrumbs" aria-label="Breadcrumb"><a href="/">${c.home}</a><span aria-hidden="true">/</span><a href="${url(lang)}">${c.guides}</a>${p ? `<span aria-hidden="true">/</span><span>${escape(p.category)}</span>` : ''}</nav>
<div class="article-heading"><p class="eyebrow">JEV / ${escape(p?.category || c.guides)}</p><h1>${escape(title)}</h1><p class="intro">${escape(p?.intro || c.hubIntro)}</p><p class="meta">${c.checked} <time datetime="${reviewed}">${reviewed}</time> · Jev Hub</p></div>
${p ? `<div class="article-layout"><aside class="toc-sidebar"><nav class="toc" aria-label="${c.contents}"><p>${c.contents}</p>${p.sections.map(s => `<a href="#${escape(s.id)}">${escape(s.title)}</a>`).join('')}<a href="#faq">${c.faq}</a><a href="#sources">${c.sources}</a></nav></aside><article><div class="answer"><h2>${c.answer}</h2><p>${escape(p.answer)}</p></div>${p.sections.map(section).join('')}<section id="faq"><h2>${c.faq}</h2>${p.faq.map(f => `<details><summary>${escape(f.q)}</summary><p>${escape(f.a)}</p></details>`).join('')}</section><section id="sources" class="sources"><h2>${c.sources}</h2><p>${c.notice}</p><ul>${article.sources.map(s => `<li><a href="${escape(s.url)}">${escape(s.label)} ↗</a></li>`).join('')}</ul></section></article>${advertisement(lang, 'short', true)}${advertisement(lang, 'tall', true)}</div><section class="related"><h2>${c.related}</h2>${cards(lang, slug)}</section>` : `<div class="guide-hub-layout"><div class="guide-hub-content">${cards(lang)}<div class="hub-note"><h2>${lang === 'zh' ? '第一次接触 Jev？' : 'New to Jev?'}</h2><p>${lang === 'zh' ? '先了解模型和三种决策类型，再根据你的任务选读指南。' : 'Start with the model overview and its three decision types, then pick a guide for your task.'}</p><a href="/#overview">${lang === 'zh' ? '查看模型介绍' : 'Explore the model overview'} →</a></div></div>${advertisement(lang, 'short', true)}${advertisement(lang, 'tall', true)}</div>`}
</main><footer><div class="shell"><a class="brand" href="/">&gt;_ Jev Hub</a><p>${c.independent}</p><a href="${url(lang)}">${c.guides}</a> · <a href="/sitemap.xml">Sitemap</a></div></footer>
</body></html>`;
}

const paths = ['/', '/en/'];
for (const lang of ['en', 'zh']) {
  for (const article of [null, ...articles]) {
    const route = url(lang, article?.slug);
    const directory = path.join(root, 'public', route);
    await mkdir(directory, { recursive: true });
    await writeFile(path.join(directory, 'index.html'), document(lang, article));
    paths.push(route);
  }
}
await writeFile(path.join(root, 'public/sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths.map(p => `  <url><loc>${origin}${p}</loc></url>`).join('\n')}\n</urlset>\n`);
console.log(`Generated ${paths.length - 2} static guide pages; sitemap contains ${paths.length} URLs.`);
