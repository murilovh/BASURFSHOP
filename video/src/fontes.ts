import {loadFont} from '@remotion/fonts';
import {staticFile} from 'remotion';

// As mesmas fontes do site, carregadas do public/ (arquivos variáveis, todos os pesos)
export const fontesCarregadas = Promise.all([
  loadFont({family: 'Unbounded', url: staticFile('fonts/unbounded.woff2'), weight: '200 900'}),
  loadFont({family: 'Archivo', url: staticFile('fonts/archivo.woff2'), weight: '100 900'}),
]);
