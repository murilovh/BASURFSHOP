# BA Surfboards: direção de design

**Leitura do briefing:** landing page de loja de surf local para surfistas e turistas que chegam pelo Instagram no celular. Linguagem raiz e artesanal, em preto e branco como a logo, com tipografia grossa e arredondada. Feita com Astro, Tailwind, GSAP e Alpine.

**Ajustes de intensidade (taste-skill):** variação 7, movimento 5, densidade 4. É uma loja de verdade e não uma agência: o layout pode ser assimétrico, mas o movimento é contido, porque quem abre no 4G precisa achar o WhatsApp rápido.

## Conceito: "etiqueta de prancha"

A página se apoia em três coisas que já existem na loja:

1. **A logo.** O contorno branco duplo do "BA" virou a assinatura visual (`.ring-ba`), usada no hero, no mapa e na foto do Beto. Os cantos arredondados das letras definem o raio de todos os blocos (`rounded-board`). Os botões são pílula.
2. **A bancada.** A textura de tecido de fibra de vidro (`.fiber`) fica nos espaços de foto, e um grão fixo leve sobre a página lembra resina lixada.
3. **O selo da prancha.** Os serviços aparecem como etiquetas com borda grossa, numa única faixa clara (cor de parafina) no meio da página escura.

## Paleta

| Token | Hex | Uso |
|---|---|---|
| `ink` | `#0B0B0A` | fundo (o preto da logo, sem ser #000) |
| `ink-800` | `#131312` | superfícies elevadas, placeholders |
| `bone` | `#EDEDE8` | texto principal e faixa de Serviços (branco parafina) |
| `mute` | `#A6A69F` | texto secundário sobre ink (contraste ~8:1) |
| `stone` | `#55554F` | texto secundário sobre bone (contraste ~7:1) |
| `rosa` | `#FF5C8A` | **acento único** |

**Por que rosa:** o nome da praia é Rosa, e o rosa fluorescente é a cor clássica de decal, lycra e quilha do surf dos anos 80 e 90, o que combina com uma loja tradicional. Sobre o preto ele dá contraste de 6,7:1 (AA para texto). No bloco claro ele só aparece como fundo, com texto `ink` por cima, nunca como texto sobre `bone`.

## Tipografia

- **Display: Unbounded** (variável, 700 a 800). É larga, geométrica e com terminais arredondados, a mais próxima do desenho grosso e arredondado do "BA" sem imitar a logo.
- **Texto: Archivo** (variável). Grotesca robusta e muito legível no celular, parente do "SURFBOARDS" em caixa alta da logo.
- As duas são auto-hospedadas via Fontsource, com `font-display: swap` e subsets por `unicode-range`.

## Referências pesquisadas

- **Folklore Surf** ([Awwwards, Honorable Mention](https://www.awwwards.com/sites/folklore-surf)): a paleta é literalmente #000 e #fff, com narrativa de cultura do surf e parallax. Mostra que preto e branco puro sustenta uma marca de surf sem parecer sem graça.
- **Pilgrim Surf Supply** ([Land-book](https://land-book.com/websites/57777-pilgrim-surf-supply)): loja e oficina de surf com cara de loja de verdade, com tipografia utilitária, listas editoriais e foto de produto em vez de "lifestyle" genérico. Serviu de base para o tom de balcão.
- **Setform Surf** ([Awwwards, Nominee 2026](https://www.awwwards.com/sites/setform-surf)): mar como visual cinético. Foi descartado como WebGL (não combinava com uma loja raiz e pesaria no 4G), mas inspirou a ideia de deixar o movimento só no que conta a história, como o "riscado" dos problemas.
- O Godly (godly.website) hoje redireciona para outro site e não teve resultado de surf utilizável.

## Movimento

- Títulos linha a linha com SplitText (`[data-split]`), blocos com reveal (`[data-reveal]`), parallax leve nas fotos (`[data-parallax]`) e problemas riscados em sequência (`[data-strike]`).
- Lenis para o smooth scroll, ligado ao ticker do GSAP.
- Um único marquee na página: "Feito na Praia do Rosa".
- Com `prefers-reduced-motion: reduce` nada disso roda: sem Lenis e sem marquee, e o conteúdo aparece estático.
