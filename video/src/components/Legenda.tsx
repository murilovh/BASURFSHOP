import type React from 'react';
import {Interactive, interpolate, useCurrentFrame} from 'remotion';
import {clamp, cores, fonteTexto, fonteTitulo, saida} from '../tema';

type Props = {
  readonly rotulo: string;
  readonly titulo: string;
  readonly texto: string;
  /** Frame (local) em que a legenda começa a sair. 0 = não sai (a transição de cena cuida). */
  readonly saidaEm: number;
  readonly style?: React.CSSProperties;
};

// Bloco de legenda: rótulo pequeno, título grande (Unbounded) e uma linha de apoio.
// Entra deslizando de baixo por trás de uma máscara e sai para cima.
const LegendaInner: React.FC<Props> = ({rotulo, titulo, texto, saidaEm, style}) => {
  const frame = useCurrentFrame();
  const sai = saidaEm > 0;
  const subida = (inicio: number) =>
    interpolate(frame, [inicio, inicio + 18], [110, 0], {...clamp, easing: saida}) +
    (sai ? interpolate(frame, [saidaEm, saidaEm + 12], [0, -110], {...clamp, easing: saida}) : 0);
  const opacidadeSaida = sai ? interpolate(frame, [saidaEm, saidaEm + 12], [1, 0], clamp) : 1;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        opacity: opacidadeSaida,
        ...style,
      }}
    >
      <div style={{overflow: 'hidden', paddingBottom: 6}}>
        <div
          style={{
            translate: `0 ${subida(0)}%`,
            fontFamily: fonteTexto,
            fontWeight: 700,
            fontSize: 26,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: cores.mute,
          }}
        >
          {rotulo}
        </div>
      </div>
      <div style={{overflow: 'hidden', marginTop: 18, paddingBottom: 10}}>
        <div
          style={{
            translate: `0 ${subida(3)}%`,
            fontFamily: fonteTitulo,
            fontWeight: 800,
            fontSize: 70,
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            color: cores.bone,
          }}
        >
          {titulo}
        </div>
      </div>
      <div style={{overflow: 'hidden', marginTop: 22}}>
        <div
          style={{
            translate: `0 ${subida(7)}%`,
            fontFamily: fonteTexto,
            fontWeight: 500,
            fontSize: 38,
            lineHeight: 1.4,
            color: cores.mute,
            maxWidth: 640,
          }}
        >
          {texto}
        </div>
      </div>
    </div>
  );
};

export const Legenda = Interactive.create({
  Component: LegendaInner,
  layout: 'none',
  schema: {
    rotulo: {type: 'string', default: '', description: 'Rótulo'},
    titulo: {type: 'string', default: '', description: 'Título'},
    texto: {type: 'string', default: '', description: 'Texto de apoio'},
    saidaEm: {type: 'number', default: 0, min: 0, step: 1, hiddenFromList: false, keyframable: false, description: 'Frame em que começa a sair (0 = não sai)'},
  },
});
