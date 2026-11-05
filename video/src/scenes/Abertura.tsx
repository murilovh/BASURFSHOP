import {Img, Interactive, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {Fundo} from '../components/Fundo';
import {clamp, idaVolta, saida} from '../tema';

// Logo se revela da esquerda para a direita e entra "O site novo da BA."
const AberturaInner = () => {
  const frame = useCurrentFrame();

  return (
    <>
      <Fundo />
      <div style={{position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
        <div
          style={{
            clipPath: `inset(-4% ${interpolate(frame, [4, 34], [100, 0], {...clamp, easing: idaVolta})}% -4% 0)`,
          }}
        >
          <Img
            name="Logo"
            src={staticFile('brand/logo-ba-white.png')}
            style={{
              width: 560,
              display: 'block',
              scale: interpolate(frame, [0, 70], [1.08, 1], {...clamp, easing: saida, output: 'perceptual-scale'}),
            }}
          />
        </div>

        <div style={{overflow: 'hidden', marginTop: 70, paddingBottom: 12}}>
          <Interactive.Div
            name="Frase de abertura"
            style={{
              fontFamily: "'Unbounded', sans-serif",
              fontWeight: 800,
              fontSize: 104,
              lineHeight: 1.05,
              letterSpacing: '-0.035em',
              color: '#EDEDE8',
              translate: interpolate(frame, [38, 60], ['0px 140px', '0px 0px'], {...clamp, easing: saida}),
            }}
          >
            O site novo{' '}
            <span style={{color: '#0B0B0A', WebkitTextStroke: '0.06em #EDEDE8', paintOrder: 'stroke fill'}}>da BA.</span>
          </Interactive.Div>
        </div>
      </div>
    </>
  );
};

export const Abertura = Interactive.create({
  Component: AberturaInner,
  layout: 'absolute-fill',
  schema: {...Interactive.backgroundSchema},
});
