import {Composition, Folder} from 'remotion';
import {Apresentacao} from './Apresentacao';
import './fontes';
import {Abertura} from './scenes/Abertura';
import {Celular} from './scenes/Celular';
import {Final} from './scenes/Final';
import {Manchete} from './scenes/Manchete';
import {Mapa} from './scenes/Mapa';
import {Navegador} from './scenes/Navegador';
import {WhatsApp} from './scenes/WhatsApp';

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="Apresentacao" component={Apresentacao} durationInFrames={1240} fps={30} width={1920} height={1080} />
    <Folder name="Cenas">
      <Composition id="Abertura" component={Abertura} durationInFrames={105} fps={30} width={1920} height={1080} defaultProps={{style: {backgroundColor: '#0B0B0A'}}} />
      <Composition id="Manchete" component={Manchete} durationInFrames={105} fps={30} width={1920} height={1080} defaultProps={{style: {backgroundColor: '#0B0B0A'}}} />
      <Composition id="Navegador" component={Navegador} durationInFrames={450} fps={30} width={1920} height={1080} defaultProps={{style: {backgroundColor: '#0B0B0A'}}} />
      <Composition id="WhatsApp" component={WhatsApp} durationInFrames={210} fps={30} width={1920} height={1080} defaultProps={{style: {backgroundColor: '#0B0B0A'}}} />
      <Composition id="Celular" component={Celular} durationInFrames={165} fps={30} width={1920} height={1080} defaultProps={{style: {backgroundColor: '#0B0B0A'}}} />
      <Composition id="Mapa" component={Mapa} durationInFrames={165} fps={30} width={1920} height={1080} defaultProps={{style: {backgroundColor: '#0B0B0A'}}} />
      <Composition id="Final" component={Final} durationInFrames={150} fps={30} width={1920} height={1080} defaultProps={{style: {backgroundColor: '#0B0B0A'}}} />
    </Folder>
  </>
);
