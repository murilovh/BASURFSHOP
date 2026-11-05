import {Img, Interactive, interpolate, staticFile, Track, useCurrentFrame} from 'remotion';
import meta from '../../public/site/meta.json';
import {Cursor} from '../components/Cursor';
import {Fundo} from '../components/Fundo';
import {Legenda} from '../components/Legenda';
import {clamp, contornoDuplo, cores, fonteTexto, idaVolta, saida} from '../tema';

// Medidas do site no computador (capturadas com 1440 px de largura e tela de 900 px)
const LARGURA = 1440;
const TELA = 900;
const BARRA = 56;
const ALTURA_JANELA = BARRA + TELA;
const fimDaPagina = meta.desktop.height - TELA;

// Paradas da rolagem, a partir da posição real de cada seção
const parada = {
  servicos: meta.desktop.sections.servicos + 20,
  conserto: meta.desktop.sections.conserto - 130,
  aluguel: meta.desktop.sections.aluguel - 10,
  chegar: meta.desktop.sections.chegar - 20,
  contato: Math.min(meta.desktop.sections.cta - 60, fimDaPagina),
};

const t = meta.desktop.tiles; // os 4 atalhos do topo (Pranchas, Acessórios, Consertos, Aluguel)

const NavegadorInner = () => {
  const frame = useCurrentFrame();

  // Janela: entra no centro, depois diminui e vai para a direita para dar lugar às legendas
  const escala = interpolate(frame, [0, 24, 148, 182], [0.9, 1, 1, 0.7], {...clamp, easing: saida});
  const centroX = interpolate(frame, [148, 182], [960, 1336], {...clamp, easing: saida});
  const centroY = interpolate(frame, [0, 24, 148, 182], [600, 548, 548, 556], {...clamp, easing: saida});

  // Rolagem: anda até cada seção e para um pouco
  const rolagem = interpolate(
    frame,
    [186, 214, 240, 268, 294, 322, 348, 376, 402, 430],
    [0, parada.servicos, parada.servicos, parada.conserto, parada.conserto, parada.aluguel, parada.aluguel, parada.chegar, parada.chegar, parada.contato],
    {...clamp, easing: idaVolta},
  );

  // Destaque que passa pelos 4 atalhos do topo
  const quadros = [40, 60, 70, 90, 100, 120, 130];
  const destaqueX = interpolate(frame, quadros, [t[0].x, t[0].x, t[1].x, t[1].x, t[2].x, t[2].x, t[3].x], {...clamp, easing: idaVolta});
  const destaqueY = interpolate(frame, quadros, [t[0].y, t[0].y, t[1].y, t[1].y, t[2].y, t[2].y, t[3].y], {...clamp, easing: idaVolta});
  const destaqueOpacidade = interpolate(frame, [34, 44, 140, 150], [0, 1, 1, 0], clamp);

  return (
    <>
      <Fundo />

      {/* Janela do navegador */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: LARGURA,
          height: ALTURA_JANELA,
          transformOrigin: '0 0',
          translate: `${centroX - (LARGURA / 2) * escala}px ${centroY - (ALTURA_JANELA / 2) * escala}px`,
          scale: String(escala),
          opacity: interpolate(frame, [0, 14], [0, 1], clamp),
          borderRadius: 18,
          overflow: 'hidden',
          backgroundColor: cores.ink,
          boxShadow: `${contornoDuplo(3, 12, 3)}, 0 40px 120px rgba(0,0,0,0.6)`,
        }}
      >
        {/* Barra do navegador */}
        <div
          style={{
            height: BARRA,
            backgroundColor: cores.ink700,
            borderBottom: '1px solid rgba(237,237,232,0.08)',
            display: 'flex',
            alignItems: 'center',
            padding: '0 22px',
            gap: 10,
          }}
        >
          {[0, 1, 2].map((i) => (
            <div key={i} style={{width: 14, height: 14, borderRadius: 7, backgroundColor: cores.stone}} />
          ))}
          <div
            style={{
              marginLeft: 'auto',
              marginRight: 'auto',
              height: 34,
              padding: '0 26px',
              borderRadius: 17,
              backgroundColor: cores.ink,
              display: 'flex',
              alignItems: 'center',
              fontFamily: fonteTexto,
              fontSize: 17,
              color: cores.mute,
            }}
          >
            BA Surfboards | Loja de surf na Praia do Rosa
          </div>
          <div style={{width: 62}} />
        </div>

        {/* Página */}
        <div style={{position: 'relative', width: LARGURA, height: TELA, overflow: 'hidden'}}>
          <Img
            name="Página do site"
            src={staticFile('site/desktop-full.jpg')}
            style={{position: 'absolute', left: 0, top: 0, width: LARGURA, translate: `0px ${-rolagem}px`}}
          />
          {/* Menu fixo do site */}
          <Img name="Menu do site" src={staticFile('site/desktop-header.png')} style={{position: 'absolute', left: 0, top: 0, width: LARGURA}} />

          {/* Destaque dos atalhos (contorno duplo da logo) */}
          <div
            style={{
              position: 'absolute',
              left: destaqueX - 6,
              top: destaqueY - 6,
              width: t[0].w + 12,
              height: t[0].h + 12,
              borderRadius: 28,
              boxShadow: contornoDuplo(4, 8, 4),
              opacity: destaqueOpacidade,
            }}
          />
          <Cursor
            x={destaqueX + t[0].w * 0.72}
            y={destaqueY + t[0].h * 0.58}
            opacidade={destaqueOpacidade}
            tamanho={58}
          />
        </div>
      </div>

      {/* Legendas à esquerda, uma por parada */}
      <div style={{position: 'absolute', left: 100, top: 0, bottom: 0, width: 700}}>
        <Track name="Legendas">
          <Legenda
            name="Legenda serviços"
            from={186}
            durationInFrames={54}
            rotulo="Pranchas e acessórios"
            titulo="Nova, usada ou feita pelo Beto."
            texto="E parafina, leash, quilhas e capas pra sessão."
            saidaEm={42}
          />
          <Legenda
            name="Legenda conserto"
            from={240}
            durationInFrames={54}
            rotulo="Conserto"
            titulo="A especialidade da casa."
            texto="Do quebradinho ao estrago grande, com orçamento antes."
            saidaEm={42}
          />
          <Legenda
            name="Legenda aluguel"
            from={294}
            durationInFrames={54}
            rotulo="Aluguel"
            titulo="Pra quem chega sem prancha."
            texto="Prancha e roupa de borracha no centrinho."
            saidaEm={42}
          />
          <Legenda
            name="Legenda como chegar"
            from={348}
            durationInFrames={54}
            rotulo="Como chegar"
            titulo="Fácil de achar."
            texto="Mapa, endereço e rota que abre no celular."
            saidaEm={42}
          />
          <Legenda
            name="Legenda contato"
            from={402}
            durationInFrames={48}
            rotulo="Contato"
            titulo="Tudo termina no WhatsApp."
            texto="Um toque e você fala com o Beto."
            saidaEm={0}
          />
        </Track>
      </div>
    </>
  );
};

export const Navegador = Interactive.create({
  Component: NavegadorInner,
  layout: 'absolute-fill',
  schema: {...Interactive.backgroundSchema},
});
