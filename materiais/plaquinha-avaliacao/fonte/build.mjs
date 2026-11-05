// Gera a plaquinha de avaliacao no Google (A6) com o visual do site.
// Saidas: PDF A6 com sangria de 3 mm (grafica), PDF A4 com 4 plaquinhas (impressora de casa) e PNG.
import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';
import puppeteer from 'puppeteer-core';

const ROOT = 'C:/Users/vijal/OneDrive/Desktop/LOJA DO MEU PAI/BASURFSHOP';
const OUT = `${ROOT}/materiais/plaquinha-avaliacao`;
fs.mkdirSync(OUT, { recursive: true });

const f = (p) => pathToFileURL(path.join(ROOT, p)).href;
const qr = fs.readFileSync('placa/qr.svg', 'utf8').replace('<svg', '<svg class="qr-svg" shape-rendering="crispEdges"');
const star = '<svg viewBox="0 0 24 24" class="star"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/></svg>';
const camera = '<svg viewBox="0 0 24 24" class="cam" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z"/><circle cx="12" cy="13" r="3"/></svg>';

// Uma plaquinha de 105 x 148 mm. `bleed` estende o fundo para fora (sangria) sem mover o conteudo.
const plaquinha = (bleed = 0) => `
<div class="placa" style="width:${105 + 2 * bleed}mm;height:${148 + 2 * bleed}mm;padding:${bleed}mm">
  <div class="area">
    <img class="logo" src="${f('src/assets/logo-ba-white.png')}" alt="BA Surfboards">
    <p class="pre">Curtiu o atendimento?</p>
    <h1>Avalia a BA<br><span class="outline">no Google.</span></h1>
    <div class="stars">${star.repeat(5)}</div>
    <div class="qr-wrap"><div class="qr">${qr}</div></div>
    <p class="como">${camera}<span>Aponte a câmera do celular<br>para o QR code</span></p>
    <p class="rodape">@basurfboards_<span class="sep"></span>Praia do Rosa, Imbituba</p>
  </div>
</div>`;

const css = `
@font-face { font-family: 'Unbounded'; src: url('${f('node_modules/@fontsource-variable/unbounded/files/unbounded-latin-wght-normal.woff2')}') format('woff2'); font-weight: 200 900; }
@font-face { font-family: 'Archivo'; src: url('${f('node_modules/@fontsource-variable/archivo/files/archivo-latin-wght-normal.woff2')}') format('woff2'); font-weight: 100 900; }
* { box-sizing: border-box; margin: 0; padding: 0; }
html, body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
body { font-family: 'Archivo', sans-serif; color: #EDEDE8; }
.placa {
  position: relative; overflow: hidden; background-color: #0B0B0A;
  /* textura de fibra de vidro do site, bem leve */
  background-image:
    repeating-linear-gradient(45deg, rgb(237 237 232 / .035) 0 .25mm, transparent .25mm 2.4mm),
    repeating-linear-gradient(-45deg, rgb(237 237 232 / .035) 0 .25mm, transparent .25mm 2.4mm),
    radial-gradient(120% 70% at 50% 0%, rgb(237 237 232 / .06), transparent 60%);
}
.area { width: 105mm; height: 148mm; padding: 8.5mm 9mm 7.5mm; display: flex; flex-direction: column; align-items: center; text-align: center; }
.logo { width: 32mm; }
.pre { margin-top: 6mm; font-size: 3.6mm; font-weight: 600; color: #A6A69F; }
h1 { margin-top: 2mm; font-family: 'Unbounded'; font-weight: 800; font-size: 8.4mm; line-height: 1.04; letter-spacing: -0.03em; }
.outline { color: #0B0B0A; -webkit-text-stroke: .07em #EDEDE8; paint-order: stroke fill; }
.stars { display: flex; gap: 1.6mm; margin-top: 4mm; }
.star { width: 5.2mm; height: 5.2mm; fill: #EDEDE8; }
/* QR no fundo claro (leitura garantida) com o contorno duplo da logo */
.qr-wrap { margin-top: 6.5mm; background: #EDEDE8; border-radius: 5mm; padding: 3.6mm; box-shadow: 0 0 0 1.5mm #0B0B0A, 0 0 0 2.2mm #EDEDE8; }
.qr { line-height: 0; }
.qr-svg { display: block; width: 42mm; height: 42mm; }
.como { margin-top: 7.5mm; display: flex; align-items: center; gap: 2.6mm; text-align: left; font-size: 3.3mm; line-height: 1.35; font-weight: 600; }
.cam { width: 6.5mm; height: 6.5mm; flex: none; }
.rodape { margin-top: auto; font-size: 2.7mm; color: #A6A69F; display: flex; align-items: center; gap: 2.2mm; }
.sep { width: 1mm; height: 1mm; border-radius: 1mm; background: #55554F; }
`;

const page = (body, w, h) => `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>Plaquinha avaliação BA Surfboards</title>
<style>@page { size: ${w}mm ${h}mm; margin: 0; } ${css}</style></head><body>${body}</body></html>`;

// A4 com 4 plaquinhas e marcas de corte
const a4 = `
<style>
  .folha { width: 210mm; height: 297mm; position: relative; background: #fff; }
  .folha .placa { position: absolute; }
  .corte { position: absolute; background: #999; }
</style>
<div class="folha">
  ${[[0, 0], [1, 0], [0, 1], [1, 1]].map(([c, r]) => `<div style="position:absolute;left:${0 + c * 105}mm;top:${0.5 + r * 148}mm">${plaquinha(0)}</div>`).join('')}
  <div class="corte" style="left:104.9mm;top:0;width:.2mm;height:3mm"></div>
  <div class="corte" style="left:104.9mm;bottom:0;width:.2mm;height:3mm"></div>
  <div class="corte" style="left:0;top:148.4mm;width:3mm;height:.2mm"></div>
  <div class="corte" style="right:0;top:148.4mm;width:3mm;height:.2mm"></div>
</div>`;

fs.writeFileSync('placa/a6.html', page(plaquinha(3), 111, 154));
fs.writeFileSync('placa/a6-sem-sangria.html', page(plaquinha(0), 105, 148));
fs.writeFileSync('placa/a4.html', page(a4, 210, 297));

const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: 'new', args: ['--allow-file-access-from-files'] });
const render = async (file, pdfOut, pngOut, wmm, hmm) => {
  const p = await browser.newPage();
  await p.goto(pathToFileURL(path.resolve(file)).href, { waitUntil: 'networkidle0' });
  await p.evaluate(() => document.fonts.ready);
  if (pdfOut) await p.pdf({ path: pdfOut, preferCSSPageSize: true, printBackground: true });
  if (pngOut) {
    const px = (mm) => Math.round((mm / 25.4) * 96);
    await p.setViewport({ width: px(wmm), height: px(hmm), deviceScaleFactor: 300 / 96 });
    await p.screenshot({ path: pngOut, clip: { x: 0, y: 0, width: px(wmm), height: px(hmm) } });
  }
  console.log('fontes', (await p.evaluate(() => [...document.fonts].map((x) => x.family + ':' + x.status))).join(' '));
  await p.close();
};
await render('placa/a6.html', `${OUT}/plaquinha-A6-grafica-com-sangria.pdf`, null);
await render('placa/a4.html', `${OUT}/plaquinha-A4-4-unidades.pdf`, null);
await render('placa/a6-sem-sangria.html', null, `${OUT}/plaquinha-A6.png`, 105, 148);
await browser.close();
console.log('ok');
