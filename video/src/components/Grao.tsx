import {AbsoluteFill, random, useCurrentFrame} from 'remotion';

const RUIDO =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 .55 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

// Grão de filme por cima de tudo (mesma textura do site), mudando a cada frame
export const Grao: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{
        backgroundImage: RUIDO,
        backgroundPosition: `${Math.floor(random(`gx-${frame}`) * 220)}px ${Math.floor(random(`gy-${frame}`) * 220)}px`,
        opacity: 0.07,
        mixBlendMode: 'overlay',
        pointerEvents: 'none',
      }}
    />
  );
};
