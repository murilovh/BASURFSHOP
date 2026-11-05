import {Interactive, interpolate, useCurrentFrame} from 'remotion';
import {Fundo} from '../components/Fundo';
import {clamp, saida} from '../tema';

// A frase do topo do site, gigante, linha a linha
const MancheteInner = () => {
  const frame = useCurrentFrame();

  return (
    <>
      <Fundo />
      <div
        style={{
          position: 'absolute',
          left: 130,
          top: 0,
          bottom: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          scale: String(interpolate(frame, [0, 105], [1, 1.04], clamp)),
          transformOrigin: '0% 50%',
        }}
      >
        <div style={{overflow: 'hidden', paddingBottom: 14}}>
          <Interactive.Div
            name="Linha 1"
            style={{
              fontFamily: "'Unbounded', sans-serif",
              fontWeight: 800,
              fontSize: 178,
              lineHeight: 1,
              letterSpacing: '-0.04em',
              color: '#EDEDE8',
              translate: interpolate(frame, [4, 24], ['0px 220px', '0px 0px'], {...clamp, easing: saida}),
            }}
          >
            Loja de surf
          </Interactive.Div>
        </div>
        <div style={{overflow: 'hidden', paddingBottom: 14}}>
          <Interactive.Div
            name="Linha 2"
            style={{
              fontFamily: "'Unbounded', sans-serif",
              fontWeight: 800,
              fontSize: 178,
              lineHeight: 1,
              letterSpacing: '-0.04em',
              color: '#EDEDE8',
              translate: interpolate(frame, [10, 30], ['0px 220px', '0px 0px'], {...clamp, easing: saida}),
            }}
          >
            no centrinho
          </Interactive.Div>
        </div>
        <div style={{overflow: 'hidden', paddingBottom: 18}}>
          <Interactive.Div
            name="Linha 3 (vazada)"
            style={{
              fontFamily: "'Unbounded', sans-serif",
              fontWeight: 800,
              fontSize: 178,
              lineHeight: 1,
              letterSpacing: '-0.04em',
              color: '#0B0B0A',
              WebkitTextStroke: '0.055em #EDEDE8',
              paintOrder: 'stroke fill',
              translate: interpolate(frame, [16, 36], ['0px 220px', '0px 0px'], {...clamp, easing: saida}),
            }}
          >
            da Rosa.
          </Interactive.Div>
        </div>
        <div style={{overflow: 'hidden', marginTop: 40}}>
          <Interactive.Div
            name="Local"
            style={{
              fontFamily: "'Archivo', sans-serif",
              fontWeight: 600,
              fontSize: 44,
              color: '#A6A69F',
              translate: interpolate(frame, [30, 48], ['0px 70px', '0px 0px'], {...clamp, easing: saida}),
            }}
          >
            Praia do Rosa, Imbituba - SC
          </Interactive.Div>
        </div>
      </div>
    </>
  );
};

export const Manchete = Interactive.create({
  Component: MancheteInner,
  layout: 'absolute-fill',
  schema: {...Interactive.backgroundSchema},
});
