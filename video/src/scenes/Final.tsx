import {Img, Interactive, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {Fundo} from '../components/Fundo';
import {icones} from '../icones';
import {clamp, cores, saida} from '../tema';

// Fechamento: logo, chamada para o WhatsApp, telefone e Instagram
const FinalInner = () => {
  const frame = useCurrentFrame();

  return (
    <>
      <Fundo />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <Img
          name="Logo final"
          src={staticFile('brand/logo-ba-white.png')}
          style={{
            width: 330,
            opacity: interpolate(frame, [0, 16], [0, 1], clamp),
            scale: interpolate(frame, [0, 30], [0.9, 1], {...clamp, easing: saida, output: 'perceptual-scale'}),
          }}
        />

        <div style={{overflow: 'hidden', marginTop: 64, paddingBottom: 12}}>
          <Interactive.Div
            name="Chamada 1"
            style={{
              fontFamily: "'Unbounded', sans-serif",
              fontWeight: 800,
              fontSize: 118,
              lineHeight: 1.02,
              letterSpacing: '-0.04em',
              color: '#EDEDE8',
              translate: interpolate(frame, [10, 30], ['0px 160px', '0px 0px'], {...clamp, easing: saida}),
            }}
          >
            Chama o Beto
          </Interactive.Div>
        </div>
        <div style={{overflow: 'hidden', paddingBottom: 16}}>
          <Interactive.Div
            name="Chamada 2 (vazada)"
            style={{
              fontFamily: "'Unbounded', sans-serif",
              fontWeight: 800,
              fontSize: 118,
              lineHeight: 1.02,
              letterSpacing: '-0.04em',
              color: '#0B0B0A',
              WebkitTextStroke: '0.055em #EDEDE8',
              paintOrder: 'stroke fill',
              translate: interpolate(frame, [16, 36], ['0px 160px', '0px 0px'], {...clamp, easing: saida}),
            }}
          >
            no WhatsApp.
          </Interactive.Div>
        </div>

        <div
          style={{
            marginTop: 56,
            display: 'flex',
            alignItems: 'center',
            gap: 22,
            height: 104,
            padding: '0 48px',
            borderRadius: 52,
            backgroundColor: cores.bone,
            color: cores.ink,
            opacity: interpolate(frame, [34, 46], [0, 1], clamp),
            translate: `0px ${interpolate(frame, [34, 52], [40, 0], {...clamp, easing: saida})}px`,
          }}
        >
          <svg viewBox="0 0 24 24" width={46} height={46}>
            <path d={icones.whatsapp} fill={cores.ink} />
          </svg>
          <Interactive.Div
            name="Telefone"
            style={{fontFamily: "'Unbounded', sans-serif", fontWeight: 800, fontSize: 52, letterSpacing: '-0.02em', color: '#0B0B0A'}}
          >
            (48) 98841-1270
          </Interactive.Div>
        </div>

        <Interactive.Div
          name="Rodapé"
          style={{
            marginTop: 44,
            fontFamily: "'Archivo', sans-serif",
            fontWeight: 600,
            fontSize: 36,
            color: '#A6A69F',
            opacity: interpolate(frame, [46, 60], [0, 1], clamp),
          }}
        >
          @basurfboards_   |   Estrada do Vale, Galeria Centrinho, Praia do Rosa
        </Interactive.Div>
      </div>

      {/* Escurece no fim */}
      <div style={{position: 'absolute', inset: 0, backgroundColor: cores.ink, opacity: interpolate(frame, [136, 150], [0, 1], clamp)}} />
    </>
  );
};

export const Final = Interactive.create({
  Component: FinalInner,
  layout: 'absolute-fill',
  schema: {...Interactive.backgroundSchema},
});
