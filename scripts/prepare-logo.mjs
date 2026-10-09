// Gera variantes da logo a partir do original (src/assets/logo-ba.png, branco sobre preto).
// Nao redesenha nada: so converte o preto em transparente e recorta as margens.
import sharp from 'sharp';

const SRC = 'src/assets/logo-ba.png';
const { data, info } = await sharp(SRC).greyscale().raw().toBuffer({ resolveWithObject: true });

// bounding box dos pixels claros (ignora a borda fina do arquivo original)
let minX = info.width, minY = info.height, maxX = 0, maxY = 0;
const m = 20;
for (let y = m; y < info.height - m; y++)
  for (let x = m; x < info.width - m; x++)
    if (data[y * info.width + x] > 128) {
      if (x < minX) minX = x; if (x > maxX) maxX = x;
      if (y < minY) minY = y; if (y > maxY) maxY = y;
    }
console.log({ minX, minY, maxX, maxY, w: info.width, h: info.height });

const pad = 4;
const box = { left: minX - pad, top: minY - pad, width: maxX - minX + pad * 2, height: maxY - minY + pad * 2 };
const alpha = await sharp(SRC).greyscale().extract(box).raw().toBuffer();
const white = Buffer.alloc(box.width * box.height * 4);
for (let i = 0; i < box.width * box.height; i++) {
  white[i * 4] = white[i * 4 + 1] = white[i * 4 + 2] = 255;
  white[i * 4 + 3] = alpha[i];
}
await sharp(white, { raw: { width: box.width, height: box.height, channels: 4 } })
  .png().toFile('src/assets/logo-ba-white.png');

// favicon / touch icon: logo completa centralizada em quadrado preto
const ink = { r: 10, g: 10, b: 10, alpha: 1 };
// icones pequenos usam so o simbolo "BA" (sem "SURFBOARDS"), recortado, sem distorcer
const markOnly = await sharp('src/assets/logo-ba-white.png').extract({ left: 0, top: 0, width: box.width, height: 958 - box.top }).toBuffer();
const mark = await sharp(markOnly).resize({ width: 440 }).toBuffer();
for (const [size, name] of [[512, 'favicon-512.png'], [180, 'apple-touch-icon.png'], [32, 'favicon-32.png']]) {
  const inner = await sharp(mark).resize({ width: Math.round(size * 0.86) }).toBuffer();
  await sharp({ create: { width: size, height: size, channels: 4, background: ink } })
    .composite([{ input: inner, gravity: 'center' }]).png().toFile(`public/${name}`);
}

// Open Graph 1200x630
const og = await sharp('src/assets/logo-ba-white.png').resize({ width: 760 }).toBuffer();
await sharp({ create: { width: 1200, height: 630, channels: 4, background: ink } })
  .composite([{ input: og, gravity: 'center' }]).jpeg({ quality: 88 }).toFile('public/og-image.jpg');
console.log('ok');

