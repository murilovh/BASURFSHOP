import {Audio} from '@remotion/media';
import {linearTiming, TransitionSeries} from '@remotion/transitions';
import {fade} from '@remotion/transitions/fade';
import {slide} from '@remotion/transitions/slide';
import {Track} from 'remotion';
import {Grao} from './components/Grao';
import {Abertura} from './scenes/Abertura';
import {Celular} from './scenes/Celular';
import {Final} from './scenes/Final';
import {Manchete} from './scenes/Manchete';
import {Mapa} from './scenes/Mapa';
import {Navegador} from './scenes/Navegador';
import {WhatsApp} from './scenes/WhatsApp';

// Vídeo de apresentação do site da BA Surfboards (1920 x 1080, 30 fps, 1240 frames)
// Início de cada cena no vídeo: Abertura 0, Manchete 90, Navegador 175, WhatsApp 605,
// Celular 800, Mapa 945, Final 1090.
export const Apresentacao = () => (
  <>
    <TransitionSeries>
      <TransitionSeries.Sequence name="Abertura" durationInFrames={105}>
        <Abertura style={{backgroundColor: '#0B0B0A'}} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({durationInFrames: 15})} />
      <TransitionSeries.Sequence name="Manchete" durationInFrames={105}>
        <Manchete style={{backgroundColor: '#0B0B0A'}} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({durationInFrames: 20})} />
      <TransitionSeries.Sequence name="Site no navegador" durationInFrames={450}>
        <Navegador style={{backgroundColor: '#0B0B0A'}} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={slide({direction: 'from-bottom'})} timing={linearTiming({durationInFrames: 20})} />
      <TransitionSeries.Sequence name="WhatsApp" durationInFrames={210}>
        <WhatsApp style={{backgroundColor: '#0B0B0A'}} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({durationInFrames: 15})} />
      <TransitionSeries.Sequence name="Celular" durationInFrames={165}>
        <Celular style={{backgroundColor: '#0B0B0A'}} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={slide({direction: 'from-right'})} timing={linearTiming({durationInFrames: 20})} />
      <TransitionSeries.Sequence name="Mapa" durationInFrames={165}>
        <Mapa style={{backgroundColor: '#0B0B0A'}} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({durationInFrames: 20})} />
      <TransitionSeries.Sequence name="Final" durationInFrames={150}>
        <Final style={{backgroundColor: '#0B0B0A'}} />
      </TransitionSeries.Sequence>
    </TransitionSeries>

    <Grao />

    <Track name="Efeitos sonoros">
      <Audio name="Whoosh manchete" src="https://remotion.media/whoosh.wav" from={88} volume={0.3} />
      <Audio name="Whoosh navegador" src="https://remotion.media/whoosh.wav" from={321} volume={0.22} />
      <Audio name="Whoosh WhatsApp" src="https://remotion.media/whoosh.wav" from={603} volume={0.28} />
      <Audio name="Clique no botão" src="https://remotion.media/mouse-click.wav" from={659} volume={0.8} />
      <Audio name="Mensagem enviada" src="https://remotion.media/ding.wav" from={763} volume={0.45} />
      <Audio name="Whoosh mapa" src="https://remotion.media/whoosh.wav" from={943} volume={0.24} />
    </Track>
  </>
);
