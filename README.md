# BA Surfboards: landing page

Site da **BA Surfboards**, a loja do Beto Alemão no centrinho da Praia do Rosa (Imbituba, SC): pranchas novas e usadas, acessórios, consertos e aluguel de prancha e roupa.

Stack: Astro + Tailwind CSS v4 (tokens em `tailwind.config.mjs`) + GSAP/ScrollTrigger/SplitText + Lenis + Alpine.js + Lucide. O build é estático e sai em `dist/`.

A direção de design (paleta, fontes, conceito e referências) está em [DESIGN.md](DESIGN.md).

## Rodar

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # gera dist/
npm run preview  # serve o dist/
```

## Onde editar

| O quê | Arquivo |
|---|---|
| Telefone, e-mail, endereço, redes, horário, mensagens do WhatsApp | `src/data/site.ts` |
| Domínio do site (sitemap, canonical, OG) | `src/data/site-url.mjs` e `public/robots.txt` |
| Fotos da galeria | `src/data/gallery.ts` |
| Respostas do FAQ | `src/components/Faq.astro` |
| Citação e foto do Beto | `src/components/Beto.astro` |
| Cores, fontes e espaçamentos | `tailwind.config.mjs` |

### Como colocar uma foto

1. Salve a foto em `src/assets/fotos/` (JPG grande, que o Astro gera AVIF e WebP).
2. Importe no componente ou no `gallery.ts` (`import foto from '../assets/fotos/x.jpg'`) e passe em `src={foto}` no `PhotoSlot`.

A logo é gerada a partir de `src/assets/logo-ba.png` com `node scripts/prepare-logo.mjs`, que cria a versão transparente, os favicons e a imagem de Open Graph sem redesenhar nada.

## Pendências (dependem do Beto)

Nada abaixo foi inventado no site: onde falta dado, há um placeholder ou um texto neutro marcado com `TODO` no código (busque por `TODO(`).

**Dados da loja**
- [ ] `TODO(horario)`: horário de funcionamento, inclusive alta e baixa temporada. Hoje aparece "Confirme o horário pelo WhatsApp antes de ir". Também falta adicionar `openingHoursSpecification` no JSON-LD.
- [ ] `TODO(geo)`: latitude e longitude do pin no Google Maps, para o JSON-LD.
- [ ] `TODO(dominio)`: domínio definitivo. Hoje está `https://www.basurfboards.com.br` como provisório.
- [ ] O perfil do Google aparece como "Baboardshop - Surf concertos". Vale corrigir o nome para "BA Surfboards" e "consertos" (com S) no Google Meu Negócio.

**Serviços e processos**
- [ ] `TODO(conserto)`: lista de reparos que a loja faz (hoje: dings e trincas, bico e rabeta, quilhas e caixas, pranchas quebradas).
- [ ] `TODO(processo)`: detalhes do passo a passo de conserto e aluguel (prazo, sinal, documento).
- [ ] `TODO(aluguel)`: tipos de prancha e tamanhos de roupa disponíveis, se o aluguel é por hora ou por dia, se pede documento ou caução. Nenhum valor foi publicado.

**FAQ (`TODO(faq)`, todas as respostas a confirmar)**
- [ ] Prazo médio de conserto e se existe serviço expresso
- [ ] Tipos de reparo (epóxi? prancha partida? pintura?)
- [ ] Como funciona o aluguel
- [ ] Prazo e sinal para encomenda de shape
- [ ] Formas de pagamento (Pix, cartão, dinheiro?)

**Beto**
- [ ] `TODO(citacao)`: a frase "Prancha boa é a que volta pra água. Traz aqui que a gente resolve." é uma **sugestão** e não uma fala dele. Confirmar ou trocar. Se ele não aprovar, mude `mostrarCitacao` para `false` em `Beto.astro`.
- [ ] `TODO(foto-beto)`: retrato do Beto (é exibido em preto e branco). Nunca usar banco de imagens.

**Fotos (`TODO(fotos)`), 13 espaços além do retrato do Beto**
- [ ] Hero: pranchas na parede, acessórios no balcão, prancha na bancada de conserto, pranchas e roupas de aluguel
- [ ] Serviços: pranchas na parede da loja, pranchas e roupas de aluguel
- [ ] Galeria: conserto antes, conserto depois, pranchas na loja, Beto no conserto ou no shape, fachada da loja, prancha shapeada pelo Beto
- [ ] Aluguel: pranchas e roupas de aluguel
- [ ] Depoimentos: só se houver depoimentos reais (aí entra o Embla Carousel). Hoje a galeria ocupa esse lugar.

## Lighthouse (build de produção, 09/10/2026)

| | Performance | Acessibilidade | Boas práticas | SEO |
|---|---|---|---|---|
| Mobile | 98 | 100 | 100 | 100 |
| Desktop | 100 | 100 | 100 | 100 |

No mobile: LCP 2,1 s, CLS 0,018, TBT 90 ms. Os números vão mudar quando as fotos reais entrarem. Rode de novo depois de colocá-las.
