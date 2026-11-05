// Captura o site para as cenas do video: gera public/site/*.jpg|png e public/site/meta.json (posicao de cada secao).
// Uso, na pasta BASURFSHOP: npm run build && npm run preview -- --port 4322   e, em outro terminal: node video/scripts/capturar-site.mjs
import puppeteer from 'puppeteer-core';
import fs from 'fs';
import { fileURLToPath } from 'url';
const OUT = fileURLToPath(new URL('../public/site', import.meta.url));
const URL = 'http://localhost:4322/';
const browser = await puppeteer.launch({
  executablePath: process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: 'new',
  args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'],
});
const CLEAN = `[data-todo-foto] > div > span { display: none !important; } [data-fab] { display: none !important; }`;

async function open(w, h, dpr) {
  const page = await browser.newPage();
  await page.setViewport({ width: w, height: h, deviceScaleFactor: dpr });
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await page.goto(URL, { waitUntil: 'networkidle0' });
  await page.addStyleTag({ content: CLEAN });
  // carrega tudo o que e lazy (imagens, mapa)
  await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); } scrollTo(0, 0); });
  const frame = await (await page.$('#como-chegar iframe'))?.contentFrame();
  if (frame) await frame.waitForSelector('img, canvas', { timeout: 20000 }).catch(() => {});
  await new Promise((r) => setTimeout(r, 6000));
  return page;
}

const meta = {};
import { createRequire } from 'module';
// sharp vem do projeto do site (pasta acima)
const require = createRequire(new URL('../../package.json', import.meta.url));
const sharp = require('sharp');

// Captura a pagina rolando de tela em tela e costura as partes (o fullPage do Chrome repete conteudo em paginas longas)
async function stitched(page, cssW, cssVH, dpr, maxCssH, out) {
  await page.addStyleTag({ content: '[class*=\"sticky\"] { position: relative !important; top: auto !important; }' });
  const total = Math.min(await page.evaluate(() => document.documentElement.scrollHeight), maxCssH);
  const parts = [];
  for (let y = 0; y < total; y += cssVH) {
    await page.evaluate((y) => scrollTo(0, y), y);
    await new Promise((r) => setTimeout(r, 350));
    const mapaNaTela = await page.evaluate(() => { const f = document.querySelector('#como-chegar iframe'); if (!f) return false; const r = f.getBoundingClientRect(); return r.bottom > 0 && r.top < innerHeight; });
    if (mapaNaTela) await new Promise((r) => setTimeout(r, 7000));
    const realY = await page.evaluate(() => scrollY);
    const buf = await page.screenshot({ type: 'png' });
    const offset = Math.round((y - realY) * dpr); // a ultima tela para no fim da pagina
    const bufMeta = await sharp(buf).metadata();
    const top = Math.round(y * dpr);
    const h = Math.min(Math.round(Math.min(cssVH, total - y) * dpr), bufMeta.height - offset, Math.round(total * dpr) - top);
    parts.push({ input: await sharp(buf).extract({ left: 0, top: offset, width: Math.round(cssW * dpr), height: h }).toBuffer(), top, left: 0 });
  }
  await sharp({ create: { width: Math.round(cssW * dpr), height: Math.round(total * dpr), channels: 3, background: '#0B0B0A' } })
    .composite(parts).jpeg({ quality: 86 }).toFile(out);
  return total;
}

// ---------- Desktop ----------
{
  const page = await open(1440, 900, 1.25);
  // menu fixo, capturado separado
  await page.screenshot({ path: `${OUT}/desktop-header.png`, clip: { x: 0, y: 0, width: 1440, height: 68 } });
  await page.addStyleTag({ content: 'header { visibility: hidden !important; }' });
  const info = await page.evaluate(() => {
    const top = (sel) => { const el = document.querySelector(sel); return el ? Math.round(el.getBoundingClientRect().top + scrollY) : null; };
    return {
      height: document.documentElement.scrollHeight,
      sections: {
        servicos: top('#servicos'), pranchas: top('#pranchas'), conserto: top('#conserto'),
        problema: top('section[aria-labelledby=problema-titulo]'), como: top('section[aria-labelledby=como-titulo]'),
        galeria: top('section[aria-labelledby=galeria-titulo]'), aluguel: top('#aluguel'), chegar: top('#como-chegar'),
        faq: top('#faq'), beto: top('section[aria-labelledby=beto-titulo]'), cta: top('section[aria-labelledby=cta-titulo]'),
      },
      tiles: [...document.querySelectorAll('#topo nav li')].map((li) => { const r = li.getBoundingClientRect(); return { x: r.x, y: r.y + scrollY, w: r.width, h: r.height }; }),
      heroCta: (() => { const r = document.querySelector('#topo .btn-primary').getBoundingClientRect(); return { x: r.x, y: r.y + scrollY, w: r.width, h: r.height }; })(),
    };
  });
  meta.desktop = { width: 1440, dpr: 1.25, ...info };
  await stitched(page, 1440, 900, 1.25, 99999, `${OUT}/desktop-full.jpg`);
  await page.close();
}

// ---------- Card de conserto em alta ----------
{
  const page = await open(1440, 900, 2);
  await page.addStyleTag({ content: 'header { visibility: hidden !important; }' });
  const card = await page.$('#conserto');
  const r = await page.evaluate(() => {
    const c = document.querySelector('#conserto').getBoundingClientRect();
    const b = document.querySelector('#conserto a.btn').getBoundingClientRect();
    return { card: { w: c.width, h: c.height }, button: { x: b.x - c.x, y: b.y - c.y, w: b.width, h: b.height } };
  });
  meta.conserto = r;
  await card.screenshot({ path: `${OUT}/conserto-card.png` });
  await page.close();
}

// ---------- Celular ----------
{
  const page = await open(390, 844, 2);
  await page.screenshot({ path: `${OUT}/mobile-header.png`, clip: { x: 0, y: 0, width: 390, height: 68 } });
  await page.addStyleTag({ content: 'header { visibility: hidden !important; }' });
  const info = await page.evaluate(() => {
    const top = (sel) => Math.round(document.querySelector(sel).getBoundingClientRect().top + scrollY);
    return { height: document.documentElement.scrollHeight, sections: { servicos: top('#servicos'), conserto: top('#conserto'), aluguel: top('#aluguel'), faq: top('#faq') } };
  });
  meta.mobile = { width: 390, dpr: 2, ...info };
  // so ate o fim do aluguel: o suficiente para a rolagem no celular e abaixo do limite de textura
  const clipH = Math.min(info.sections.aluguel + 900, 7800);
  meta.mobile.clipHeight = clipH;
  await stitched(page, 390, 844, 2, clipH, `${OUT}/mobile-top.jpg`);
  await page.close();
}

fs.writeFileSync(`${OUT}/meta.json`, JSON.stringify(meta, null, 2));
await browser.close();
console.log(JSON.stringify(meta, null, 1));
