import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = fileURLToPath(new URL('../', import.meta.url));
const publicDir = path.join(root, 'public');
const distDir = path.join(root, 'dist');

function invariant(condition, message) {
  if (!condition) throw new Error(message);
}

async function read(relativePath) {
  return readFile(path.join(root, relativePath));
}

async function verifySvg(relativePath, viewBox) {
  const data = await read(relativePath);
  const svg = data.toString('utf8');
  invariant(data.length < 5 * 1024, `${relativePath} must stay below 5KB`);
  invariant(svg.includes(`viewBox="${viewBox}"`), `${relativePath} must use viewBox ${viewBox}`);
  invariant(!/<text\b/i.test(svg), `${relativePath} must not depend on installed fonts`);
}

async function verifyPng(relativePath, expectedSize) {
  const png = await read(relativePath);
  invariant(png.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])), `${relativePath} is not PNG`);
  invariant(png.readUInt32BE(16) === expectedSize && png.readUInt32BE(20) === expectedSize, `${relativePath} must be ${expectedSize}x${expectedSize}`);
  invariant((await sharp(png).stats()).isOpaque, `${relativePath} must use an opaque background for OS masks`);
}

async function listHtml(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(async entry => {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return listHtml(fullPath);
    return entry.name === 'index.html' ? [fullPath] : [];
  }));
  return nested.flat();
}

await verifySvg('public/icon.svg', '0 0 512 512');
await verifySvg('public/favicon.svg', '0 0 64 64');
await verifyPng('public/apple-touch-icon.png', 180);
await verifyPng('public/icon-192.png', 192);
await verifyPng('public/icon-512.png', 512);

const ico = await read('public/favicon.ico');
invariant(ico.readUInt16LE(0) === 0 && ico.readUInt16LE(2) === 1, 'favicon.ico has an invalid header');
invariant(ico.readUInt16LE(4) === 3, 'favicon.ico must contain 16px, 32px and 48px images');
const icoSizes = [0, 1, 2].map(index => ico[6 + index * 16]);
invariant(icoSizes.join(',') === '16,32,48', `favicon.ico has unexpected sizes: ${icoSizes.join(',')}`);

const manifest = JSON.parse((await read('public/site.webmanifest')).toString('utf8'));
invariant(manifest.name === 'Jev Hub', 'Manifest name must be Jev Hub');
invariant(manifest.theme_color === '#49e39a', 'Manifest theme color must match the Jev green');
for (const size of ['192x192', '512x512']) {
  invariant(manifest.icons.some(icon => icon.sizes === size), `Manifest is missing the ${size} icon`);
}

const htmlFiles = await listHtml(distDir);
invariant(htmlFiles.length === 11, `Expected 11 indexable HTML pages, found ${htmlFiles.length}`);
for (const htmlFile of htmlFiles) {
  const html = await readFile(htmlFile, 'utf8');
  const page = path.relative(distDir, htmlFile);
  for (const expected of ['/favicon.ico', '/favicon.svg', '/apple-touch-icon.png', '/site.webmanifest']) {
    invariant(html.includes(expected), `${page} is missing ${expected}`);
  }
  invariant(html.includes('<meta name="theme-color" content="#49e39a">'), `${page} is missing the Jev theme color`);
}

for (const relativePath of ['public/icon.svg', 'public/favicon.svg', 'public/favicon.ico', 'public/apple-touch-icon.png', 'public/icon-192.png', 'public/icon-512.png', 'public/site.webmanifest']) {
  invariant((await stat(path.join(root, relativePath))).size > 0, `${relativePath} is empty`);
}

console.log(`PASS: complete Jev icon set and metadata on ${htmlFiles.length} pages.`);
