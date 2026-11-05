import {Easing} from 'remotion';

// Mesmos tokens do site (tailwind.config.mjs do BASURFSHOP)
export const cores = {
  ink: '#0B0B0A',
  ink800: '#131312',
  ink700: '#1C1C1A',
  bone: '#EDEDE8',
  bone200: '#D9D9D3',
  mute: '#A6A69F',
  stone: '#55554F',
} as const;

export const fonteTitulo = "'Unbounded', sans-serif";
export const fonteTexto = "'Archivo', sans-serif";

// Curvas usadas no site: saída suave (expo-out) e ida e volta
export const saida = Easing.bezier(0.16, 1, 0.3, 1);
export const idaVolta = Easing.bezier(0.65, 0, 0.35, 1);

export const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

// Contorno branco duplo da logo, igual ao `.ring-ba` do site
export const contornoDuplo = (a = 3, b = 9, c = 3) =>
  `0 0 0 ${a}px ${cores.bone}, 0 0 0 ${a + b}px ${cores.ink}, 0 0 0 ${a + b + c}px ${cores.bone}`;

export const mensagemConserto =
  'Olá! Vim pelo site da BA Surfboards e queria saber sobre conserto de prancha.';
