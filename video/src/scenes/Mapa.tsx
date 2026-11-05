import * as maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import {useEffect, useRef, useState} from 'react';
import {Easing, Interactive, interpolate, staticFile, useCurrentFrame, useDelayRender} from 'remotion';
import {Legenda} from '../components/Legenda';
import {clamp, cores, fonteTitulo, saida} from '../tema';

// Ponto do perfil da loja no Google Maps ([longitude, latitude])
const LOJA: [number, number] = [-48.6494691, -28.1255843];

// "Placa fixa": o mapa é desenhado uma vez, grande, e o zoom da câmera é feito com CSS.
// Isso evita o tremor que aparece quando o MapLibre redesenha a cada frame.
const PLACA_L = 3840;
const PLACA_A = 2160;
const ZOOM_PLACA = 16;
// Onde o pino fica na tela; a câmera aproxima mantendo o pino parado aqui
const PINO = {x: 1250, y: 560};
// Posição do pino na placa que garante a tela coberta com a escala mínima (0,52)
const PINO_NA_PLACA = {x: PINO.x / 0.5, y: PINO.y / 0.5};

const MapaInner = () => {
  const frame = useCurrentFrame();
  const container = useRef<HTMLDivElement>(null);
  const {delayRender, continueRender} = useDelayRender();
  const [carregando] = useState(() => delayRender('Carregando o mapa', {timeoutInMilliseconds: 90000}));
  const [pinoNaPlaca, setPinoNaPlaca] = useState(PINO_NA_PLACA);

  useEffect(() => {
    if (!container.current) {
      return;
    }
    // Worker do MapLibre servido do próprio projeto (public/maplibre), sem CDN
    maplibregl.setWorkerUrl(staticFile('maplibre/maplibre-gl-worker.mjs'));

    const mapa = new maplibregl.Map({
      container: container.current,
      style: 'https://tiles.openfreemap.org/styles/dark',
      center: LOJA,
      zoom: ZOOM_PLACA,
      pixelRatio: 1,
      interactive: false,
      attributionControl: false,
      fadeDuration: 0,
      canvasContextAttributes: {preserveDrawingBuffer: true},
    });

    mapa.on('load', () => {
      // Estilo escuro ajustado ao preto e branco do site: ruas claras e grossas (o mapa é reduzido na tela),
      // mar um pouco mais claro que a terra para desenhar a costa, sem os textos pequenos.
      const largura = (z13: number, z16: number, z18: number) =>
        ['interpolate', ['exponential', 1.5], ['zoom'], 13, z13, 16, z16, 18, z18] as maplibregl.ExpressionSpecification;
      for (const camada of mapa.getStyle().layers) {
        if (camada.type === 'symbol') {
          mapa.setLayoutProperty(camada.id, 'visibility', 'none');
        }
      }
      mapa.setPaintProperty('background', 'background-color', '#0B0B0A');
      mapa.setPaintProperty('water', 'fill-color', '#262623');
      mapa.setPaintProperty('waterway', 'line-color', '#262623');
      mapa.setPaintProperty('landuse_residential', 'fill-color', '#0F0F0E');
      mapa.setPaintProperty('landcover_wood', 'fill-color', '#121211');
      mapa.setPaintProperty('landuse_park', 'fill-color', '#121211');
      mapa.setPaintProperty('building', 'fill-color', '#1A1A18');
      mapa.setPaintProperty('highway_path', 'line-color', '#3C3C38');
      mapa.setPaintProperty('highway_path', 'line-width', largura(0.5, 2, 4));
      mapa.setPaintProperty('highway_minor', 'line-color', '#6E6E68');
      mapa.setPaintProperty('highway_minor', 'line-width', largura(1, 6, 14));
      for (const id of ['highway_major_casing', 'highway_motorway_casing']) {
        mapa.setPaintProperty(id, 'line-color', 'rgba(237,237,232,0.18)');
        mapa.setPaintProperty(id, 'line-width', largura(2, 13, 26));
      }
      for (const id of ['highway_major_inner', 'highway_motorway_inner', 'highway_major_subtle', 'highway_motorway_subtle']) {
        mapa.setPaintProperty(id, 'line-color', '#A6A69F');
        mapa.setPaintProperty(id, 'line-width', largura(1.5, 9, 20));
      }

      // Desloca o centro para a loja cair no ponto certo da placa
      const centro = mapa.unproject([PLACA_L - PINO_NA_PLACA.x, PLACA_A - PINO_NA_PLACA.y]);
      mapa.jumpTo({center: centro, zoom: ZOOM_PLACA});
      mapa.once('idle', () => {
        const p = mapa.project(LOJA);
        setPinoNaPlaca({x: p.x, y: p.y});
        continueRender(carregando);
      });
    });
  }, [carregando, continueRender]);

  // Aproximação lenta, sempre com o pino no mesmo lugar da tela
  const escala = interpolate(frame, [0, 165], [0.52, 0.86], {...clamp, easing: Easing.bezier(0.33, 0, 0.2, 1)});
  const pulso = (atraso: number) => ((frame + atraso) % 45) / 45;
  const pinoEntra = interpolate(frame, [14, 32], [0, 1], {...clamp, easing: saida});

  return (
    <>
      <div style={{position: 'absolute', inset: 0, backgroundColor: cores.ink}} />

      {/* Placa do mapa, em preto e branco como o site */}
      <div
        ref={container}
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: PLACA_L,
          height: PLACA_A,
          transformOrigin: '0 0',
          translate: `${PINO.x - pinoNaPlaca.x * escala}px ${PINO.y - pinoNaPlaca.y * escala}px`,
          scale: String(escala),
          filter: 'grayscale(1)',
        }}
      />

      {/* Escurece a esquerda para a legenda */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(90deg, rgba(11,11,10,0.94) 0%, rgba(11,11,10,0.8) 36%, rgba(11,11,10,0) 62%)',
        }}
      />

      {/* Pino da loja: pulso + contorno duplo da logo */}
      <div style={{position: 'absolute', left: PINO.x, top: PINO.y, scale: String(pinoEntra)}}>
        {[0, 22].map((atraso) => (
          <div
            key={atraso}
            style={{
              position: 'absolute',
              left: -26,
              top: -26,
              width: 52,
              height: 52,
              borderRadius: 26,
              border: `3px solid ${cores.bone}`,
              scale: String(1 + pulso(atraso) * 2.4),
              opacity: 0.7 * (1 - pulso(atraso)),
            }}
          />
        ))}
        <div
          style={{
            position: 'absolute',
            left: -17,
            top: -17,
            width: 34,
            height: 34,
            borderRadius: 17,
            backgroundColor: cores.bone,
            boxShadow: `0 0 0 7px ${cores.ink}, 0 0 0 11px ${cores.bone}`,
          }}
        />
      </div>
      <div
        style={{
          position: 'absolute',
          left: PINO.x + 44,
          top: PINO.y - 34,
          height: 68,
          padding: '0 30px',
          borderRadius: 34,
          backgroundColor: cores.bone,
          color: cores.ink,
          display: 'flex',
          alignItems: 'center',
          fontFamily: fonteTitulo,
          fontWeight: 800,
          fontSize: 30,
          letterSpacing: '-0.02em',
          opacity: interpolate(frame, [24, 36], [0, 1], clamp),
          translate: `${interpolate(frame, [24, 40], [-24, 0], {...clamp, easing: saida})}px 0px`,
        }}
      >
        BA Surfboards
      </div>

      <div style={{position: 'absolute', left: 120, top: 0, bottom: 0, width: 760}}>
        <Legenda
          name="Legenda mapa"
          from={8}
          durationInFrames={157}
          rotulo="Como chegar"
          titulo="No centrinho da Praia do Rosa."
          texto="Estrada do Vale, Galeria Centrinho. Imbituba - SC."
          saidaEm={0}
        />
      </div>

      {/* Atribuição exigida pelos dados do mapa */}
      <div
        style={{
          position: 'absolute',
          right: 36,
          bottom: 26,
          fontFamily: "'Archivo', sans-serif",
          fontSize: 18,
          color: 'rgba(237,237,232,0.6)',
        }}
      >
        © OpenFreeMap © OpenMapTiles © OpenStreetMap
      </div>
    </>
  );
};

export const Mapa = Interactive.create({
  Component: MapaInner,
  layout: 'absolute-fill',
  schema: {...Interactive.backgroundSchema},
});
