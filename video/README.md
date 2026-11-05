# Vídeo de apresentação do site (Remotion)

Vídeo de cerca de 41 segundos (1920 × 1080, 30 fps) apresentando o site da BA Surfboards, no mesmo visual do site: preto e branco, fontes Unbounded e Archivo, letra vazada e o contorno duplo da logo.

O MP4 pronto fica em `../materiais/video/apresentacao-site-ba-surfboards.mp4`.

## Cenas

| Cena | Duração | O que mostra |
|---|---|---|
| Abertura | 3,5 s | A logo se revela e entra "O site novo da BA." |
| Manchete | 3,5 s | "Loja de surf no centrinho da Rosa." linha a linha |
| Site no navegador | 15 s | O topo com os 4 atalhos destacados e depois a rolagem por pranchas, conserto, aluguel, como chegar e contato, com legendas |
| WhatsApp | 7 s | Clique em "Mandar foto do estrago" e a mensagem pronta sendo digitada e enviada |
| Celular | 5,5 s | O site rolando no celular, com o botão flutuante do WhatsApp |
| Mapa | 5,5 s | Mapa da Praia do Rosa aproximando até o pino da loja (MapLibre + OpenFreeMap, sem chave) |
| Final | 5 s | "Chama o Beto no WhatsApp.", telefone e Instagram |

Efeitos sonoros: whoosh, clique e aviso de mensagem, da biblioteca de efeitos do Remotion (`remotion.media`). O vídeo não tem música. Para postar no Instagram, a música pode ser escolhida no próprio app, que já tem as licenças.

## Rodar

```bash
cd video
npm install
npm run dev
```

Abre o Remotion Studio, que mostra a prévia, deixa editar textos, tempos e posições e também exportar o vídeo pelo botão Render.

Para gerar o MP4 pelo terminal (o mapa precisa de WebGL, por isso o `--gl=angle`):

```bash
npx remotion render Apresentacao out/apresentacao-site-ba-surfboards.mp4 --codec=h264 --crf=20 --gl=angle --concurrency=3
```

## Atualizar as imagens do site

As cenas usam capturas do site guardadas em `public/site/`, junto com `meta.json`, que tem a posição de cada seção. Quando as fotos reais entrarem no site, gere as capturas de novo e o vídeo se ajusta sozinho:

```bash
cd ..            # pasta BASURFSHOP
npm run build
npm run preview -- --port 4322
# em outro terminal:
node video/scripts/capturar-site.mjs
```

O script precisa do `puppeteer-core` (instalado como dependência de desenvolvimento) e do Google Chrome instalado. Se o Chrome estiver em outro lugar, informe o caminho em `CHROME_PATH`.

## Licenças

- **Remotion:** gratuito para pessoas físicas e empresas de até 3 pessoas (remotion.dev/license).
- **Mapa:** © OpenFreeMap © OpenMapTiles © OpenStreetMap. A atribuição aparece na cena.
