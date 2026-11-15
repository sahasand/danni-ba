import React from 'react';
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {linearTiming, TransitionSeries} from '@remotion/transitions';
import {fade} from '@remotion/transitions/fade';
import {loadFont as cargarMarcellus} from '@remotion/google-fonts/Marcellus';
import {loadFont as cargarFigtree} from '@remotion/google-fonts/Figtree';

const {fontFamily: TITULOS} = cargarMarcellus('normal', {weights: ['400'], subsets: ['latin']});
const {fontFamily: TEXTO} = cargarFigtree('normal', {weights: ['400', '600'], subsets: ['latin']});

// Los mismos colores que claro.html
const VERDE = '#0A6E64';
const HONDO = '#0B3F39';
const PAPEL = '#FBF8F3';
const ARENA = '#F1EBE1';
const TINTA = '#26302D';
const GRIS = '#5D6965';
const CREMA = '#F4EFE8';
const CAFE = '#1E1510';
const WA = '#1F9D55';

export const FPS = 30;
const CRUCE = 15;
// Duración de cada escena, en cuadros. El total da 20 segundos.
const ESCENAS = {portada: 120, danni: 135, tratamientos: 165, lugar: 120, cierre: 120};
export const DURACION_TOTAL =
  ESCENAS.portada + ESCENAS.danni + ESCENAS.tratamientos + ESCENAS.lugar + ESCENAS.cierre - CRUCE * 4;

type Idioma = 'es' | 'en';
export type PromoProps = {idioma: Idioma};

// TEXTOS DEL VIDEO. Para cambiarlos, editá acá y volvé a generar con "npm run render".
const TEXTOS = {
  es: {
    marca: "Lucy's Spa, Buenos Aires",
    hola: 'Soy Danni.',
    bajada: 'Masajes y estética en el Microcentro',
    quien: 'Quién te atiende',
    oficio: 'Diez años de masajes y estética',
    datos: ['Formada en IDRAET e IDIP', 'Atención en español y en inglés'],
    tratamientos: 'Tratamientos',
    elegi: 'Elegí el tuyo',
    lista: [
      'Relajante',
      'Descontracturante',
      'Piedras calientes',
      'Tailandés',
      'Sueco',
      'Drenaje linfático',
      'Reflexología',
      'Limpieza facial',
      'Depilación',
      'Piernas cansadas',
    ],
    lugar: 'El lugar',
    direccion: 'Tres Sargentos 421',
    piso: 'Piso 2, Microcentro',
    horario: 'Todos los días de 9 a 21',
    cuando: '¿Cuándo venís?',
    reservar: 'Reservá por WhatsApp',
    numero: '11 2455-9977',
  },
  en: {
    marca: "Lucy's Spa, Buenos Aires",
    hola: "I'm Danni.",
    bajada: 'Massage and skin care in downtown Buenos Aires',
    quien: "Who you'll meet",
    oficio: 'Ten years in massage and skin care',
    datos: ['Trained at IDRAET and IDIP', 'Sessions in Spanish or English'],
    tratamientos: 'Treatments',
    elegi: 'Choose yours',
    lista: [
      'Relaxing',
      'Deep tissue',
      'Hot stone',
      'Thai',
      'Swedish',
      'Lymphatic drainage',
      'Reflexology',
      'Facial cleansing',
      'Hair removal',
      'Tired legs',
    ],
    lugar: 'The place',
    direccion: 'Tres Sargentos 421',
    piso: '2nd floor, downtown Buenos Aires',
    horario: 'Every day, 9 am to 9 pm',
    cuando: 'When suits you?',
    reservar: 'Book on WhatsApp',
    numero: '+54 9 11 2455-9977',
  },
} as const;

const rotulo: React.CSSProperties = {
  fontFamily: TEXTO,
  fontWeight: 600,
  fontSize: 19,
  letterSpacing: '0.17em',
  textTransform: 'uppercase',
};

// Entra con un fundido y sube unos píxeles. "desde" va en segundos.
const Aparecer: React.FC<{desde: number; children: React.ReactNode; style?: React.CSSProperties}> = ({
  desde,
  children,
  style,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const avance = interpolate(frame, [desde * fps, (desde + 0.8) * fps], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  return (
    <div style={{opacity: avance, transform: `translateY(${(1 - avance) * 18}px)`, ...style}}>
      {children}
    </div>
  );
};

// Foto con un acercamiento muy lento durante toda la escena
const Foto: React.FC<{archivo: string; cuadros: number; posicion?: string}> = ({
  archivo,
  cuadros,
  posicion = 'center',
}) => {
  const frame = useCurrentFrame();
  const escala = interpolate(frame, [0, cuadros], [1.02, 1.1], {extrapolateRight: 'clamp'});
  return (
    <Img
      src={staticFile(archivo)}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: posicion,
        transform: `scale(${escala})`,
      }}
    />
  );
};

const Portada: React.FC<{idioma: Idioma}> = ({idioma}) => {
  const t = TEXTOS[idioma];
  const frame = useCurrentFrame();
  // Arranca desde el color del cierre, para que la repetición no salte
  const velo = interpolate(frame, [0, 14], [1, 0], {extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{backgroundColor: CAFE}}>
      <Foto archivo="portada.jpg" cuadros={ESCENAS.portada} posicion="center 42%" />
      <AbsoluteFill
        style={{background: 'linear-gradient(90deg, rgba(30,21,16,0.86) 0%, rgba(30,21,16,0.5) 100%)'}}
      />
      <AbsoluteFill style={{justifyContent: 'center', padding: '0 96px', color: CREMA}}>
        <Aparecer desde={0.5} style={{...rotulo, color: 'rgba(244,239,232,0.85)'}}>
          {t.marca}
        </Aparecer>
        <Aparecer desde={0.8} style={{fontFamily: TITULOS, fontSize: 132, lineHeight: 1.1, marginTop: 18}}>
          {t.hola}
        </Aparecer>
        <Aparecer desde={1.5} style={{fontFamily: TITULOS, fontSize: 44, lineHeight: 1.25, marginTop: 10, maxWidth: 820}}>
          {t.bajada}
        </Aparecer>
      </AbsoluteFill>
      <AbsoluteFill style={{backgroundColor: PAPEL, opacity: velo}} />
    </AbsoluteFill>
  );
};

const Danni: React.FC<{idioma: Idioma}> = ({idioma}) => {
  const t = TEXTOS[idioma];
  return (
    <AbsoluteFill style={{backgroundColor: ARENA, color: TINTA, flexDirection: 'row', alignItems: 'center'}}>
      <div style={{flex: 1, padding: '0 40px 0 96px'}}>
        <Aparecer desde={0.4} style={{...rotulo, color: GRIS}}>
          {t.quien}
        </Aparecer>
        <Aparecer desde={0.7} style={{fontFamily: TITULOS, fontSize: 66, lineHeight: 1.14, marginTop: 20}}>
          {t.oficio}
        </Aparecer>
        <div style={{marginTop: 34}}>
          {t.datos.map((dato, i) => (
            <Aparecer
              key={dato}
              desde={1.5 + i * 0.5}
              style={{
                fontFamily: TITULOS,
                fontSize: 32,
                color: VERDE,
                padding: '18px 0',
                borderTop: '1px solid #D6CBBB',
              }}
            >
              {dato}
            </Aparecer>
          ))}
        </div>
      </div>
      <div style={{width: 470, display: 'flex', justifyContent: 'center', paddingRight: 56}}>
        <Aparecer desde={0.2}>
          <div style={{padding: 12, borderRadius: 999, border: `2px solid ${VERDE}`}}>
            <div style={{position: 'relative', width: 330, height: 462, borderRadius: 999, overflow: 'hidden'}}>
              <Foto archivo="danni.jpg" cuadros={ESCENAS.danni} />
            </div>
          </div>
        </Aparecer>
      </div>
    </AbsoluteFill>
  );
};

const Pastilla: React.FC<{texto: string; orden: number}> = ({texto, orden}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const avance = spring({frame, fps, delay: Math.round((1.3 + orden * 0.22) * fps), config: {damping: 200}});
  return (
    <div
      style={{
        opacity: avance,
        transform: `translateY(${(1 - avance) * 16}px)`,
        fontFamily: TITULOS,
        fontSize: 33,
        lineHeight: 1,
        color: HONDO,
        backgroundColor: PAPEL,
        padding: '18px 30px',
        borderRadius: 999,
      }}
    >
      {texto}
    </div>
  );
};

const Tratamientos: React.FC<{idioma: Idioma}> = ({idioma}) => {
  const t = TEXTOS[idioma];
  return (
    <AbsoluteFill style={{backgroundColor: HONDO, color: CREMA, justifyContent: 'center', padding: '0 96px'}}>
      <Aparecer desde={0.4} style={{...rotulo, color: 'rgba(244,239,232,0.75)'}}>
        {t.tratamientos}
      </Aparecer>
      <Aparecer desde={0.7} style={{fontFamily: TITULOS, fontSize: 72, lineHeight: 1.14, marginTop: 18}}>
        {t.elegi}
      </Aparecer>
      <div style={{display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 44}}>
        {t.lista.map((nombre, i) => (
          <Pastilla key={nombre} texto={nombre} orden={i} />
        ))}
      </div>
    </AbsoluteFill>
  );
};

const Lugar: React.FC<{idioma: Idioma}> = ({idioma}) => {
  const t = TEXTOS[idioma];
  return (
    <AbsoluteFill style={{backgroundColor: PAPEL, color: TINTA, flexDirection: 'row'}}>
      <div style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 40px 0 96px'}}>
        <Aparecer desde={0.4} style={{...rotulo, color: GRIS}}>
          {t.lugar}
        </Aparecer>
        <Aparecer desde={0.7} style={{fontFamily: TITULOS, fontSize: 68, lineHeight: 1.14, marginTop: 20}}>
          {t.direccion}
        </Aparecer>
        <Aparecer desde={1.2} style={{fontFamily: TEXTO, fontSize: 31, color: GRIS, marginTop: 16}}>
          {t.piso}
        </Aparecer>
        <Aparecer
          desde={1.7}
          style={{
            fontFamily: TITULOS,
            fontSize: 32,
            color: VERDE,
            marginTop: 34,
            paddingTop: 22,
            borderTop: '1px solid #E0D7C9',
          }}
        >
          {t.horario}
        </Aparecer>
      </div>
      <div style={{position: 'relative', width: 540, margin: '44px 44px 44px 0', borderRadius: 24, overflow: 'hidden'}}>
        <Foto archivo="sala.jpg" cuadros={ESCENAS.lugar} posicion="center 70%" />
      </div>
    </AbsoluteFill>
  );
};

const Cierre: React.FC<{idioma: Idioma}> = ({idioma}) => {
  const t = TEXTOS[idioma];
  const frame = useCurrentFrame();
  // Se va todo al final para empalmar con el comienzo
  const salida = interpolate(frame, [ESCENAS.cierre - 14, ESCENAS.cierre - 2], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <AbsoluteFill style={{backgroundColor: PAPEL, color: TINTA}}>
      <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', opacity: salida}}>
        <Aparecer desde={0.4} style={{fontFamily: TITULOS, fontSize: 40, color: VERDE}}>
          Lucy's Spa
        </Aparecer>
        <Aparecer desde={0.7} style={{fontFamily: TITULOS, fontSize: 96, lineHeight: 1.1, marginTop: 14}}>
          {t.cuando}
        </Aparecer>
        <Aparecer desde={1.3} style={{marginTop: 40}}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              fontFamily: TEXTO,
              fontWeight: 600,
              fontSize: 36,
              color: '#fff',
              backgroundColor: WA,
              padding: '24px 44px',
              borderRadius: 999,
            }}
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinejoin="round">
              <path d="M20 11.5a8 8 0 0 1-11.6 7.1L4 20l1.4-4.2A8 8 0 1 1 20 11.5z" />
            </svg>
            {t.reservar}
          </div>
        </Aparecer>
        <Aparecer desde={1.8} style={{fontFamily: TEXTO, fontSize: 30, color: GRIS, marginTop: 26}}>
          {t.numero}
        </Aparecer>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const Promo: React.FC<PromoProps> = ({idioma}) => {
  const cruce = (
    <TransitionSeries.Transition presentation={fade()} timing={linearTiming({durationInFrames: CRUCE})} />
  );
  return (
    <AbsoluteFill style={{backgroundColor: PAPEL}}>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={ESCENAS.portada}>
          <Portada idioma={idioma} />
        </TransitionSeries.Sequence>
        {cruce}
        <TransitionSeries.Sequence durationInFrames={ESCENAS.danni}>
          <Danni idioma={idioma} />
        </TransitionSeries.Sequence>
        {cruce}
        <TransitionSeries.Sequence durationInFrames={ESCENAS.tratamientos}>
          <Tratamientos idioma={idioma} />
        </TransitionSeries.Sequence>
        {cruce}
        <TransitionSeries.Sequence durationInFrames={ESCENAS.lugar}>
          <Lugar idioma={idioma} />
        </TransitionSeries.Sequence>
        {cruce}
        <TransitionSeries.Sequence durationInFrames={ESCENAS.cierre}>
          <Cierre idioma={idioma} />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
