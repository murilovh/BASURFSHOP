import {Img, Interactive, interpolate, staticFile, useCurrentFrame} from 'remotion';
import meta from '../../public/site/meta.json';
import {Fundo} from '../components/Fundo';
import {Legenda} from '../components/Legenda';
import {icones} from '../icones';
import {clamp, contornoDuplo, cores, idaVolta, saida} from '../tema';

// Site no celular (390 x 844, a tela de um iPhone comum)
const LARGURA = 390;
const TELA = 844;
const BORDA = 14;
const ESCALA = 1.04;
// Para no Conserto: mais abaixo vem a galeria, ainda sem as fotos reais
const parada = {
  servicos: meta.mobile.sections.servicos + 10,
  conserto: meta.mobile.sections.conserto - 70,
};

const CelularInner = () => {
  const frame = useCurrentFrame();
  const entra = interpolate(frame, [0, 26], [0, 1], {...clamp, easing: saida});
  const rolagem = interpolate(frame, [30, 60, 88, 118], [0, parada.servicos, parada.servicos, parada.conserto], {
    ...clamp,
    easing: idaVolta,
  });
  // O botão flutuante do WhatsApp aparece depois que o topo sai da tela, como no site
  const botao = interpolate(rolagem, [300, 520], [0, 1], clamp);

  return (
    <>
      <Fundo />

      <div style={{position: 'absolute', left: 120, top: 0, bottom: 0, width: 860}}>
        <Legenda
          name="Legenda celular"
          from={10}
          durationInFrames={155}
          rotulo="Celular"
          titulo="Feito primeiro pro celular."
          texto="Quem chega pelo Instagram acha tudo na palma da mão, com o WhatsApp sempre à vista."
          saidaEm={0}
        />
      </div>

      <div
        style={{
          position: 'absolute',
          left: 1210,
          top: 540 - ((TELA + BORDA * 2) * ESCALA) / 2,
          width: LARGURA + BORDA * 2,
          height: TELA + BORDA * 2,
          scale: String(ESCALA),
          transformOrigin: '0 0',
          borderRadius: 62,
          backgroundColor: '#26261F',
          padding: BORDA,
          boxShadow: `${contornoDuplo(3, 12, 3)}, 0 40px 120px rgba(0,0,0,0.6)`,
          opacity: entra,
          translate: `0px ${interpolate(entra, [0, 1], [160, 0])}px`,
          rotate: `${interpolate(entra, [0, 1], [5, 0])}deg`,
        }}
      >
        <div style={{position: 'relative', width: LARGURA, height: TELA, borderRadius: 48, overflow: 'hidden', backgroundColor: cores.ink}}>
          <Img
            name="Site no celular"
            src={staticFile('site/mobile-top.jpg')}
            style={{position: 'absolute', left: 0, top: 0, width: LARGURA, translate: `0px ${-rolagem}px`}}
          />
          <Img name="Menu no celular" src={staticFile('site/mobile-header.png')} style={{position: 'absolute', left: 0, top: 0, width: LARGURA}} />
          {/* Botão flutuante do WhatsApp (igual ao do site) */}
          <div
            style={{
              position: 'absolute',
              right: 16,
              bottom: 22,
              width: 56,
              height: 56,
              borderRadius: 28,
              backgroundColor: cores.bone,
              border: `2px solid ${cores.ink}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: botao,
              scale: String(interpolate(botao, [0, 1], [0.6, 1])),
              boxShadow: '0 10px 30px -8px rgba(0,0,0,0.6)',
            }}
          >
            <svg viewBox="0 0 24 24" width={28} height={28}>
              <path d={icones.whatsapp} fill={cores.ink} />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
};

export const Celular = Interactive.create({
  Component: CelularInner,
  layout: 'absolute-fill',
  schema: {...Interactive.backgroundSchema},
});
