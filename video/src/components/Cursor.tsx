import {icones} from '../icones';

// Seta do mouse (Lucide mouse-pointer-2), branca com contorno preto
export const Cursor: React.FC<{readonly x: number; readonly y: number; readonly escala?: number; readonly opacidade?: number; readonly tamanho?: number}> = ({
  x,
  y,
  escala = 1,
  opacidade = 1,
  tamanho = 56,
}) => (
  <svg
    viewBox="0 0 24 24"
    width={tamanho}
    height={tamanho}
    style={{
      position: 'absolute',
      left: x - tamanho * 0.17,
      top: y - tamanho * 0.17,
      scale: String(escala),
      transformOrigin: '17% 17%',
      opacity: opacidade,
      filter: 'drop-shadow(0 6px 14px rgba(0,0,0,0.45))',
      overflow: 'visible',
    }}
  >
    <path d={icones.cursor} fill="#EDEDE8" stroke="#0B0B0A" strokeWidth={1.6} strokeLinejoin="round" />
  </svg>
);
