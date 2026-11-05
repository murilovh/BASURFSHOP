import {AbsoluteFill} from 'remotion';

// Fundo preto com a textura de fibra de vidro do site e um leve brilho no topo
export const Fundo: React.FC = () => (
  <AbsoluteFill
    style={{
      backgroundColor: '#0B0B0A',
      backgroundImage:
        'repeating-linear-gradient(45deg, rgba(237,237,232,0.035) 0 1px, transparent 1px 14px), repeating-linear-gradient(-45deg, rgba(237,237,232,0.035) 0 1px, transparent 1px 14px), radial-gradient(120% 80% at 30% 0%, rgba(237,237,232,0.07), transparent 60%)',
    }}
  />
);
