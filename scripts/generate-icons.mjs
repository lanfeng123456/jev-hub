import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import sharp from 'sharp';

const root = fileURLToPath(new URL('../', import.meta.url));
const publicDir = path.join(root, 'public');
const iconSvg = await readFile(path.join(publicDir, 'icon.svg'));
const faviconSvg = await readFile(path.join(publicDir, 'favicon.svg'));

async function png(svg, size, output) {
  const image = await sharp(svg, { density: 384 })
    .resize(size, size, { fit: 'fill' })
    .png({ compressionLevel: 9, palette: true })
    .toBuffer();
  await writeFile(path.join(publicDir, output), image);
  return image;
}

function ico(images) {
  const headerSize = 6 + images.length * 16;
  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  let offset = headerSize;
  images.forEach(({ size, image }, index) => {
    const entry = 6 + index * 16;
    header.writeUInt8(size === 256 ? 0 : size, entry);
    header.writeUInt8(size === 256 ? 0 : size, entry + 1);
    header.writeUInt8(0, entry + 2);
    header.writeUInt8(0, entry + 3);
    header.writeUInt16LE(1, entry + 4);
    header.writeUInt16LE(32, entry + 6);
    header.writeUInt32LE(image.length, entry + 8);
    header.writeUInt32LE(offset, entry + 12);
    offset += image.length;
  });
  return Buffer.concat([header, ...images.map(item => item.image)]);
}

await png(iconSvg, 180, 'apple-touch-icon.png');
await png(iconSvg, 192, 'icon-192.png');
await png(iconSvg, 512, 'icon-512.png');
const faviconImages = await Promise.all([16, 32, 48].map(async size => ({
  size,
  image: await sharp(faviconSvg, { density: 384 }).resize(size, size).png().toBuffer(),
})));
await writeFile(path.join(publicDir, 'favicon.ico'), ico(faviconImages));

console.log('Generated Jev icons: ICO 16/32/48, PNG 180/192/512.');
