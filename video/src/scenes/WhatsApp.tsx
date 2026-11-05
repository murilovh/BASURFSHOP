import {Img, Interactive, interpolate, staticFile, useCurrentFrame} from 'remotion';
import meta from '../../public/site/meta.json';
import {Cursor} from '../components/Cursor';
import {Fundo} from '../components/Fundo';
import {Legenda} from '../components/Legenda';
import {icones} from '../icones';
import {clamp, contornoDuplo, cores, fonteTexto, fonteTitulo, idaVolta, mensagemConserto, saida} from '../tema';

// Card de Conserto do site, ampliado
const CARD_L = 1500;
const ESCALA_CARD = CARD_L / meta.conserto.card.w;
const CARD_X = 210;
const CARD_Y = 540 - (meta.conserto.card.h * ESCALA_CARD) / 2;
const btn = meta.conserto.button;
const alvoX = CARD_X + (btn.x + btn.w * 0.5) * ESCALA_CARD;
const alvoY = CARD_Y + (btn.y + btn.h * 0.5) * ESCALA_CARD;

const CLIQUE = 56;
const ENVIO = 158;

const WhatsAppInner = () => {
  const frame = useCurrentFrame();

  // Fase 1: card e clique. Fase 2: card sai, celular com a conversa entra.
  const cardSai = interpolate(frame, [70, 98], [0, 1], {...clamp, easing: idaVolta});
  const celularEntra = interpolate(frame, [76, 104], [0, 1], {...clamp, easing: saida});

  const cursorX = interpolate(frame, [14, 50], [1760, alvoX], {...clamp, easing: idaVolta});
  const cursorY = interpolate(frame, [14, 50], [980, alvoY], {...clamp, easing: idaVolta});
  const apertou = interpolate(frame, [CLIQUE - 3, CLIQUE, CLIQUE + 6], [1, 0.84, 1], clamp);

  // Mensagem sendo digitada e depois enviada
  const letras = Math.floor(interpolate(frame, [108, 150], [0, mensagemConserto.length], clamp));
  const enviada = frame >= ENVIO;
  const bolha = interpolate(frame, [ENVIO, ENVIO + 14], [0, 1], {...clamp, easing: saida});

  return (
    <>
      <Fundo />

      {/* Card de Conserto (imagem do site) */}
      <div
        style={{
          position: 'absolute',
          left: CARD_X,
          top: CARD_Y,
          width: CARD_L,
          opacity: interpolate(frame, [0, 14], [0, 1], clamp) * (1 - cardSai),
          translate: `${interpolate(cardSai, [0, 1], [0, -260])}px ${interpolate(frame, [0, 18], [50, 0], {...clamp, easing: saida})}px`,
          scale: String(interpolate(cardSai, [0, 1], [1, 0.92])),
        }}
      >
        {/* Painel claro da seção de serviços do site, atrás do card */}
        <div style={{position: 'absolute', inset: -44, backgroundColor: cores.bone, borderRadius: 48, zIndex: -1}} />
        <Img name="Card de conserto" src={staticFile('site/conserto-card.png')} style={{width: CARD_L, display: 'block', borderRadius: 26}} />
        {/* Brilho no botão no momento do clique */}
        <div
          style={{
            position: 'absolute',
            left: btn.x * ESCALA_CARD,
            top: btn.y * ESCALA_CARD,
            width: btn.w * ESCALA_CARD,
            height: btn.h * ESCALA_CARD,
            borderRadius: 999,
            boxShadow: `0 0 0 ${interpolate(frame, [CLIQUE, CLIQUE + 16], [0, 26], clamp)}px rgba(237,237,232,${interpolate(frame, [CLIQUE, CLIQUE + 16], [0.45, 0], clamp)})`,
          }}
        />
      </div>
      <Cursor x={cursorX} y={cursorY} escala={apertou} opacidade={interpolate(frame, [10, 18, 66, 76], [0, 1, 1, 0], clamp)} tamanho={64} />

      {/* Legenda */}
      <div style={{position: 'absolute', left: 120, top: 0, bottom: 0, width: 820}}>
        <Legenda
          name="Legenda WhatsApp"
          from={96}
          durationInFrames={114}
          rotulo="WhatsApp"
          titulo="Cada botão já manda a mensagem certa."
          texto="É só tocar e enviar. Conserto, prancha, shape ou aluguel."
          saidaEm={0}
        />
      </div>

      {/* Celular com a conversa */}
      <div
        style={{
          position: 'absolute',
          left: 1180,
          top: 70,
          width: 460,
          height: 940,
          borderRadius: 64,
          backgroundColor: '#26261F',
          padding: 12,
          boxShadow: `${contornoDuplo(3, 12, 3)}, 0 40px 120px rgba(0,0,0,0.6)`,
          opacity: celularEntra,
          translate: `${interpolate(celularEntra, [0, 1], [220, 0])}px 0px`,
        }}
      >
        <div style={{width: '100%', height: '100%', borderRadius: 52, overflow: 'hidden', backgroundColor: '#0E0E0D', display: 'flex', flexDirection: 'column'}}>
          {/* Topo da conversa */}
          <div style={{height: 132, backgroundColor: cores.ink700, display: 'flex', alignItems: 'flex-end', padding: '0 24px 20px', gap: 16}}>
            <div style={{width: 58, height: 58, borderRadius: 29, backgroundColor: cores.ink, border: '2px solid rgba(237,237,232,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <Img src={staticFile('brand/logo-ba-white.png')} style={{width: 40}} />
            </div>
            <div>
              <div style={{fontFamily: fonteTexto, fontWeight: 700, fontSize: 26, color: cores.bone}}>BA Surfboards</div>
              <div style={{fontFamily: fonteTexto, fontSize: 19, color: cores.mute, marginTop: 2}}>Beto Alemão</div>
            </div>
            <svg viewBox="0 0 24 24" width={34} height={34} style={{marginLeft: 'auto', marginBottom: 10}}>
              <path d={icones.whatsapp} fill={cores.bone} />
            </svg>
          </div>

          {/* Mensagens */}
          <div style={{flex: 1, position: 'relative', padding: 22}}>
            <div
              style={{
                position: 'absolute',
                top: 22,
                left: '50%',
                translate: '-50% 0',
                padding: '6px 16px',
                borderRadius: 14,
                backgroundColor: cores.ink700,
                fontFamily: fonteTexto,
                fontSize: 18,
                color: cores.mute,
              }}
            >
              Hoje
            </div>
            <div
              style={{
                position: 'absolute',
                right: 22,
                bottom: 24,
                maxWidth: 340,
                backgroundColor: cores.bone,
                color: cores.ink,
                fontFamily: fonteTexto,
                fontWeight: 500,
                fontSize: 25,
                lineHeight: 1.38,
                padding: '16px 20px',
                borderRadius: '24px 24px 6px 24px',
                opacity: bolha,
                translate: `0px ${interpolate(bolha, [0, 1], [70, 0])}px`,
                scale: String(interpolate(bolha, [0, 1], [0.92, 1])),
                transformOrigin: '100% 100%',
              }}
            >
              {mensagemConserto}
            </div>
          </div>

          {/* Campo de digitação */}
          <div style={{padding: '14px 16px 26px', display: 'flex', gap: 12, alignItems: 'flex-end', backgroundColor: cores.ink700}}>
            <div
              style={{
                flex: 1,
                minHeight: 60,
                borderRadius: 30,
                backgroundColor: cores.ink,
                padding: '15px 22px',
                fontFamily: fonteTexto,
                fontSize: 22,
                lineHeight: 1.35,
                color: enviada ? cores.stone : cores.bone,
              }}
            >
              {enviada ? 'Mensagem' : mensagemConserto.slice(0, letras)}
              {!enviada && frame % 16 < 9 ? <span style={{color: cores.mute}}>|</span> : null}
            </div>
            <div
              style={{
                width: 60,
                height: 60,
                flex: 'none',
                borderRadius: 30,
                backgroundColor: cores.bone,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                scale: String(interpolate(frame, [ENVIO - 4, ENVIO, ENVIO + 6], [1, 0.82, 1], clamp)),
              }}
            >
              <svg viewBox="0 0 24 24" width={28} height={28} fill="none" stroke={cores.ink} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                <path d={icones.enviar[0]} />
                <path d={icones.enviar[1]} />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Título "Mandou." depois do envio, embaixo da legenda */}
      <div
        style={{
          position: 'absolute',
          left: 120,
          bottom: 120,
          fontFamily: fonteTitulo,
          fontWeight: 800,
          fontSize: 40,
          letterSpacing: '-0.02em',
          color: cores.bone,
          opacity: interpolate(frame, [ENVIO + 8, ENVIO + 20], [0, 1], clamp),
          translate: `0px ${interpolate(frame, [ENVIO + 8, ENVIO + 24], [30, 0], {...clamp, easing: saida})}px`,
        }}
      >
        Mensagem enviada.
      </div>
    </>
  );
};

export const WhatsApp = Interactive.create({
  Component: WhatsAppInner,
  layout: 'absolute-fill',
  schema: {...Interactive.backgroundSchema},
});
