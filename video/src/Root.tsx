import React from 'react';
import {Composition} from 'remotion';
import {DURACION_TOTAL, FPS, Promo} from './Promo';

// Un video por idioma. Mismo contenido, textos distintos.
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Promo-es"
        component={Promo}
        durationInFrames={DURACION_TOTAL}
        fps={FPS}
        width={1280}
        height={720}
        defaultProps={{idioma: 'es' as const}}
      />
      <Composition
        id="Promo-en"
        component={Promo}
        durationInFrames={DURACION_TOTAL}
        fps={FPS}
        width={1280}
        height={720}
        defaultProps={{idioma: 'en' as const}}
      />
    </>
  );
};
