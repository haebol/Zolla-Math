import React from 'react';
import { EpisodeSceneType, PrintInkMode } from '../types/card';
import { AddSubComicScene } from './AddSubComicScene';
import { FracAddComicScene } from './FracAddComicScene';
import { DecAddComicScene } from './DecAddComicScene';
import { FracMulComicScene } from './FracMulComicScene';
import { DecMulComicScene } from './DecMulComicScene';
import { FracDivComicScene } from './FracDivComicScene';
import { DecDivComicScene } from './DecDivComicScene';
import { GugudanComicScene } from './GugudanComicScene';
import { ClockComicScene } from './ClockComicScene';
import { DivisionComicScene } from './DivisionComicScene';
import { CircleComicScene } from './CircleComicScene';
import { MeasureComicScene } from './MeasureComicScene';
import { RatioComicScene } from './RatioComicScene';
import { RangeComicScene } from './RangeComicScene';
import { Mul3ComicScene } from './Mul3ComicScene';
import { FourDigitComicScene } from './FourDigitComicScene';
import { AddSub1ComicScene } from './AddSub1ComicScene';
import { Clock1ComicScene } from './Clock1ComicScene';
import { Time3ComicScene } from './Time3ComicScene';
import { Length3ComicScene } from './Length3ComicScene';
import { Area5ComicScene } from './Area5ComicScene';

interface JollamanComicSceneProps {
  sceneType: EpisodeSceneType;
  denominator: number;
  numerator: number;
  whole: number;
  inkMode?: PrintInkMode;
}

const INK = '#141B29';

const ComicFraction: React.FC<{
  x: number;
  y: number;
  num: number | string;
  den: number | string;
  whole?: number | string;
  scale?: number;
  barWidth?: number;
}> = ({ x, y, num, den, whole, scale = 1, barWidth = 22 }) => (
  <g transform={`translate(${x}, ${y}) scale(${scale})`}>
    {whole !== undefined && whole !== 0 && whole !== '' && (
      <text
        x={-barWidth / 2 - 9}
        y="7"
        textAnchor="middle"
        className="font-game"
        fontSize="22"
        fill="#047857"
      >
        {whole}
      </text>
    )}
    <text
      x="0"
      y="-5"
      textAnchor="middle"
      className="font-game"
      fontSize="16"
      fill="#EA580C"
    >
      {num}
    </text>
    <line
      x1={-barWidth / 2}
      y1="0"
      x2={barWidth / 2}
      y2="0"
      stroke={INK}
      strokeWidth="2.6"
      strokeLinecap="round"
    />
    <text
      x="0"
      y="16"
      textAnchor="middle"
      className="font-game"
      fontSize="16"
      fill="#1D4ED8"
    >
      {den}
    </text>
  </g>
);

const BlankFractionBox: React.FC<{
  x: number;
  y: number;
  hasWhole?: boolean;
}> = ({ x, y, hasWhole = false }) => (
  <g transform={`translate(${x}, ${y})`}>
    {hasWhole && (
      <rect
        x="-34"
        y="-11"
        width="18"
        height="22"
        rx="1.5"
        fill="#ECFDF5"
        stroke="#059669"
        strokeWidth="2"
        strokeDasharray="3 2"
      />
    )}
    <rect
      x="-10"
      y="-22"
      width="20"
      height="18"
      rx="1.5"
      fill="#FFF7ED"
      stroke="#EA580C"
      strokeWidth="2"
      strokeDasharray="3 2"
    />
    <line x1="-13" y1="0" x2="13" y2="0" stroke={INK} strokeWidth="2.6" strokeLinecap="round" />
    <rect
      x="-10"
      y="4"
      width="20"
      height="18"
      rx="1.5"
      fill="#EFF6FF"
      stroke="#1D4ED8"
      strokeWidth="2"
      strokeDasharray="3 2"
    />
  </g>
);

const LoopHair: React.FC<{ x?: number; y?: number; color?: string }> = ({
  x = 0,
  y = -15,
  color = INK,
}) => (
  <path
    d={`M ${x} ${y} C ${x - 2} ${y - 9}, ${x + 8} ${y - 9}, ${x + 5} ${y}`}
    fill="none"
    stroke={color}
    strokeWidth="2.4"
    strokeLinecap="round"
  />
);

/**
 * Slim white Jollaman with white face, crisp eyes/sunglasses, white slim torso, white hands, red shoes
 */
const WhiteFractionJollaman: React.FC<{
  x: number;
  y: number;
  headR: number;
  bodyW: number;
  bodyH: number;
  topNum: number | string;
  botNum: number | string;
  sunglasses?: boolean;
  crying?: boolean;
  tiltDeg?: number;
  penguinLegs?: boolean;
}> = ({
  x,
  y,
  headR,
  bodyW,
  bodyH,
  topNum,
  botNum,
  sunglasses = false,
  crying = false,
  tiltDeg = 0,
  penguinLegs = false,
}) => {
  const neckY = headR + 4;
  const bodyBottom = neckY + bodyH;
  const legLen = penguinLegs ? 11 : 25;
  const legSpread = penguinLegs ? 14 : 9;
  const shoeOffset = penguinLegs ? 16 : 11;
  return (
    <g transform={`translate(${x}, ${y}) rotate(${tiltDeg})`}>
      {/* White Head with Loop hair */}
      <circle cx="0" cy="0" r={headR} fill="#FFFFFF" stroke={INK} strokeWidth="3.2" />
      <LoopHair x={0} y={-headR} />

      {/* Eyes or Sunglasses */}
      {sunglasses ? (
        <g transform={`translate(0, ${-headR * 0.36})`}>
          <rect x={-11} y="-3" width="9.5" height="5.5" rx="1.5" fill={INK} />
          <rect x={1.5} y="-3" width="9.5" height="5.5" rx="1.5" fill={INK} />
          <line x1="-1.5" y1="-0.5" x2="1.5" y2="-0.5" stroke={INK} strokeWidth="1.8" />
        </g>
      ) : crying ? (
        <g transform={`translate(0, ${-headR * 0.34})`}>
          <path d="M -8 -2 L -4 0.5 L -8 3" fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" />
          <path d="M 8 -2 L 4 0.5 L 8 3" fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" />
          {/* Waterfall blue tears matching reference character */}
          <path d="M -8 3 L -12 11" stroke="#38BDF8" strokeWidth="2.8" strokeLinecap="round" />
          <path d="M 8 3 L 12 11" stroke="#38BDF8" strokeWidth="2.8" strokeLinecap="round" />
          <circle cx="-13" cy="14" r="1.4" fill="#38BDF8" />
          <circle cx="13" cy="14" r="1.4" fill="#38BDF8" />
        </g>
      ) : (
        <g transform={`translate(0, ${-headR * 0.34})`}>
          <circle cx="-5.5" cy="0" r="2.1" fill={INK} />
          <circle cx="5.5" cy="0" r="2.1" fill={INK} />
        </g>
      )}

      {/* Numerator inside white head */}
      <text
        x="0"
        y={headR * 0.55}
        textAnchor="middle"
        className="font-game"
        fontSize={Math.max(15, Math.min(26, headR * 0.88))}
        fill="#EA580C"
      >
        {topNum}
      </text>

      {/* Fraction Bar Neck */}
      <line x1={-bodyW / 2 - 4} y1={neckY - 1} x2={bodyW / 2 + 4} y2={neckY - 1} stroke={INK} strokeWidth="3.2" strokeLinecap="round" />

      {/* White Torso (caps rx at 13 so 1:1 wide torso preserves exact width) */}
      <rect
        x={-bodyW / 2}
        y={neckY + 2}
        width={bodyW}
        height={bodyH}
        rx={Math.min(13, bodyW / 2)}
        fill="#FFFFFF"
        stroke={INK}
        strokeWidth="3.2"
      />
      <text
        x="0"
        y={neckY + 2 + bodyH * 0.65}
        textAnchor="middle"
        className="font-game"
        fontSize={Math.max(16, Math.min(24, bodyH * 0.5))}
        fill="#1D4ED8"
      >
        {botNum}
      </text>

      {/* Slim Arms + White Hands */}
      <path d={`M ${-bodyW / 2} ${neckY + 12} L ${-bodyW / 2 - 14} ${neckY + 22}`} stroke={INK} strokeWidth="3.4" strokeLinecap="round" />
      <path d={`M ${bodyW / 2} ${neckY + 12} L ${bodyW / 2 + 14} ${neckY + 4}`} stroke={INK} strokeWidth="3.4" strokeLinecap="round" />
      <circle cx={-bodyW / 2 - 15} cy={neckY + 22} r="3.4" fill="#FFFFFF" stroke={INK} strokeWidth="1.6" />
      <circle cx={bodyW / 2 + 15} cy={neckY + 4} r="3.4" fill="#FFFFFF" stroke={INK} strokeWidth="1.6" />

      {/* Legs + Red Sneakers (short splayed penguin style when penguinLegs=true) */}
      <line x1={-5} y1={bodyBottom + 1} x2={-legSpread} y2={bodyBottom + legLen} stroke={INK} strokeWidth="3.6" strokeLinecap="round" />
      <line x1={5} y1={bodyBottom + 1} x2={legSpread} y2={bodyBottom + legLen} stroke={INK} strokeWidth="3.6" strokeLinecap="round" />
      <ellipse cx={-shoeOffset} cy={bodyBottom + legLen + 2} rx="6" ry="3.3" fill="#EF4444" stroke={INK} strokeWidth="1.5" />
      <ellipse cx={shoeOffset} cy={bodyBottom + legLen + 2} rx="6" ry="3.3" fill="#EF4444" stroke={INK} strokeWidth="1.5" />
    </g>
  );
};

export const JollamanComicScene: React.FC<JollamanComicSceneProps> = ({
  sceneType,
  denominator,
  numerator,
  whole,
  inkMode = 'full',
}) => {
  const d = Math.max(2, Math.min(8, denominator || 4));
  const n = Math.max(1, Math.min(12, numerator || 1));
  const w = Math.max(1, Math.min(3, whole || 1));
  const isInkSaving = inkMode !== 'full';
  const isBw = inkMode === 'bw_worksheet';
  const softBg = (fullColor: string) => (isInkSaving ? '#FFFFFF' : fullColor);
  const shadowInk = isInkSaving ? '#E2E8F0' : INK;

  if (sceneType.startsWith('fracadd_')) {
    return <FracAddComicScene sceneType={sceneType} inkMode={inkMode} />;
  }
  if (sceneType.startsWith('decadd_')) {
    return <DecAddComicScene sceneType={sceneType} inkMode={inkMode} />;
  }
  if (sceneType.startsWith('fracmul_')) {
    return <FracMulComicScene sceneType={sceneType} inkMode={inkMode} />;
  }
  if (sceneType.startsWith('decmul_')) {
    return <DecMulComicScene sceneType={sceneType} inkMode={inkMode} />;
  }
  if (sceneType.startsWith('fracdiv_')) {
    return <FracDivComicScene sceneType={sceneType} inkMode={inkMode} />;
  }
  if (sceneType.startsWith('decdiv_')) {
    return <DecDivComicScene sceneType={sceneType} inkMode={inkMode} />;
  }
  if (sceneType.startsWith('addsub_')) {
    return <AddSubComicScene sceneType={sceneType} inkMode={inkMode} />;
  }
  if (sceneType.startsWith('gugudan_')) {
    return <GugudanComicScene sceneType={sceneType} inkMode={inkMode} />;
  }
  if (sceneType.startsWith('clock_')) {
    return <ClockComicScene sceneType={sceneType} inkMode={inkMode} />;
  }
  if (sceneType.startsWith('division_')) {
    return <DivisionComicScene sceneType={sceneType} inkMode={inkMode} />;
  }
  if (sceneType.startsWith('circle_')) {
    return <CircleComicScene sceneType={sceneType} inkMode={inkMode} />;
  }
  if (sceneType.startsWith('measure_')) {
    return <MeasureComicScene sceneType={sceneType} inkMode={inkMode} />;
  }
  if (sceneType.startsWith('ratio_')) {
    return <RatioComicScene sceneType={sceneType} inkMode={inkMode} />;
  }
  if (sceneType.startsWith('range_')) {
    return <RangeComicScene sceneType={sceneType} inkMode={inkMode} />;
  }
  if (sceneType.startsWith('mul3_')) {
    return <Mul3ComicScene sceneType={sceneType} inkMode={inkMode} />;
  }
  if (sceneType.startsWith('fourdigit_')) {
    return <FourDigitComicScene sceneType={sceneType} inkMode={inkMode} />;
  }
  if (sceneType.startsWith('addsub1_')) {
    return <AddSub1ComicScene sceneType={sceneType} inkMode={inkMode} />;
  }
  if (sceneType.startsWith('clock1_')) {
    return <Clock1ComicScene sceneType={sceneType} inkMode={inkMode} />;
  }
  if (sceneType.startsWith('time3_')) {
    return <Time3ComicScene sceneType={sceneType} inkMode={inkMode} />;
  }
  if (sceneType.startsWith('len3_')) {
    return <Length3ComicScene sceneType={sceneType} inkMode={inkMode} />;
  }
  if (sceneType.startsWith('area5_')) {
    return <Area5ComicScene sceneType={sceneType} inkMode={inkMode} />;
  }

  switch (sceneType) {
    /* SP-1: 참고 사진 기반 통통이 분홍 원피스 엄마(사이드 포니테일+리본+앞머리) & 아기 원피스 어부바 */
    case 'intro_mother_baby': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#FFFBEB')} />
          <rect x="0" y="182" width="240" height="48" fill={isInkSaving ? '#F8FAFC' : '#FDE68A'} opacity="0.4" />
          <line x1="0" y1="204" x2="240" y2="204" stroke={INK} strokeWidth="2.8" />

          <text x="16" y="28" className="font-game" fontSize="15.5" fill="#B45309">
            분(分) = 나눌 분!
          </text>

          {/* 1) Baby riding on Mom's back (reference baby white onesie with pink dot) */}
          <g>
            {/* Baby's arm hugging Mom's shoulder */}
            <path d="M 71 96 Q 60 107 51 114" fill="none" stroke={INK} strokeWidth="3.2" strokeLinecap="round" />
            <circle cx="50" cy="114" r="3" fill="#FFFFFF" stroke={INK} strokeWidth="1.4" />

            {/* Baby cute white onesie body resting against Mom's upper back */}
            <path
              d="M 70 86 L 82 88 L 76 128 L 60 124 Z"
              fill="#FFFFFF"
              stroke={INK}
              strokeWidth="2.4"
              strokeLinejoin="round"
            />
            <circle cx="71" cy="107" r="2.6" fill="#F472B6" />

            {/* Baby Head (higher than Mom's head) */}
            <g transform="translate(79, 73)">
              <circle cx="0" cy="0" r="14" fill="#FFFFFF" stroke={INK} strokeWidth="3" />
              <LoopHair x={0} y={-14} />
              <circle cx="-5" cy="-1.5" r="2" fill={INK} />
              <circle cx="-5.6" cy="-2.2" r="0.7" fill="#FFFFFF" />
              <circle cx="3" cy="-1.5" r="2" fill={INK} />
              <circle cx="2.4" cy="-2.2" r="0.7" fill="#FFFFFF" />
              <ellipse cx="-8.5" cy="3" rx="2.3" ry="1.3" fill="#FDA4AF" />
              <ellipse cx="6.5" cy="3" rx="2.3" ry="1.3" fill="#FDA4AF" />
              <path d="M -4 5 Q -1 8.5 2 5" fill="none" stroke={INK} strokeWidth="1.8" strokeLinecap="round" />
            </g>
          </g>

          {/* 2) Mom Jollaman: Full pink A-line dress with white collar + side ponytail & ribbon (ref image 2) */}
          <g>
            {/* Mom's legs + matching pink shoes */}
            <path d="M 41 169 L 38 201" stroke={INK} strokeWidth="4.2" strokeLinecap="round" />
            <path d="M 52 169 L 57 201" stroke={INK} strokeWidth="4.2" strokeLinecap="round" />
            <ellipse cx="35" cy="203" rx="7.5" ry="4" fill="#EC4899" stroke={INK} strokeWidth="1.6" />
            <ellipse cx="60" cy="203" rx="7.5" ry="4" fill="#EC4899" stroke={INK} strokeWidth="1.6" />

            {/* Full A-line Pink Dress Body (from neck y=112 all the way to skirt hem y=170) */}
            <path
              d="M 38 112 L 55 112 L 66 170 L 29 170 Z"
              fill="#EC4899"
              stroke={INK}
              strokeWidth="2.6"
              strokeLinejoin="round"
            />
            {/* White rounded collar & dress waist seam line */}
            <path d="M 39 113 Q 46.5 120 54 113" fill="none" stroke="#FFFFFF" strokeWidth="3.6" strokeLinecap="round" />
            <path d="M 35 144 Q 47 148 59 144" fill="none" stroke="#BE185D" strokeWidth="1.6" strokeLinecap="round" />

            {/* Side ponytail + ribbon bow on back-top of head */}
            <path d="M 58 91 Q 71 95 68 112 Q 62 108 58 98 Z" fill={INK} />
            <g transform="translate(57, 83) rotate(32)">
              <polygon points="0,0 -7.5,-5 -7.5,5" fill="#EC4899" stroke={INK} strokeWidth="1.3" strokeLinejoin="round" />
              <polygon points="0,0 7.5,-5 7.5,5" fill="#EC4899" stroke={INK} strokeWidth="1.3" strokeLinejoin="round" />
              <circle cx="0" cy="0" r="2.5" fill="#FACC15" stroke={INK} strokeWidth="1.1" />
            </g>

            {/* Mom's Head + Bangs + Sparkling Eyes + Rosy Cheeks */}
            <g transform="translate(45, 96)">
              <circle cx="0" cy="0" r="16.5" fill="#FFFFFF" stroke={INK} strokeWidth="3.2" />
              {/* Bangs arc inside top of head */}
              <path d="M -10 -7 Q 0 -13 10 -7" fill="none" stroke={INK} strokeWidth="2.2" strokeLinecap="round" />
              {/* Both sparkling eyes */}
              <circle cx="-6" cy="-1.5" r="2.2" fill={INK} />
              <circle cx="-6.7" cy="-2.3" r="0.8" fill="#FFFFFF" />
              <circle cx="2.5" cy="-1.5" r="2.2" fill={INK} />
              <circle cx="1.8" cy="-2.3" r="0.8" fill="#FFFFFF" />
              {/* Rosy cheeks + warm smile */}
              <ellipse cx="-9.5" cy="3" rx="2.6" ry="1.4" fill="#FDA4AF" />
              <ellipse cx="6" cy="3" rx="2.6" ry="1.4" fill="#FDA4AF" />
              <path d="M -5.5 5 Q -1.5 9.5 2.5 5" fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" />
            </g>
          </g>

          {/* 3) Baby's leg wrapping around the waist/tummy/hip of Mom's pink dress */}
          <g>
            <path
              d="M 63 128 Q 48 138 35 143 L 32 152"
              fill="none"
              stroke={INK}
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <ellipse cx="30" cy="154" rx="5.2" ry="3" fill="#F472B6" stroke={INK} strokeWidth="1.4" />
          </g>

          {/* 4) Mom's two cradling black stick arms supporting Baby's bottom & wrapped knee */}
          <g>
            <path
              d="M 52 120 Q 56 140 69 134"
              fill="none"
              stroke={INK}
              strokeWidth="3.8"
              strokeLinecap="round"
            />
            <circle cx="70" cy="133" r="3.4" fill="#FFFFFF" stroke={INK} strokeWidth="1.5" />

            <path
              d="M 39 120 Q 32 132 36 143"
              fill="none"
              stroke={INK}
              strokeWidth="3.6"
              strokeLinecap="round"
            />
            <circle cx="36" cy="144" r="3.3" fill="#FFFFFF" stroke={INK} strokeWidth="1.5" />
          </g>

          {/* Clean labels */}
          <path d="M 134 74 L 98 74" stroke="#EA580C" strokeWidth="2.6" strokeLinecap="round" />
          <path d="M 104 69 L 97 74 L 104 79" fill="none" stroke="#EA580C" strokeWidth="2.6" strokeLinecap="round" />
          <text x="139" y="78" className="font-game" fontSize="12.5" fill="#EA580C">
            아기(자식) = 분자!
          </text>

          <path d="M 134 110 L 70 110" stroke="#1D4ED8" strokeWidth="2.6" strokeLinecap="round" />
          <path d="M 76 105 L 69 110 L 76 115" fill="none" stroke="#1D4ED8" strokeWidth="2.6" strokeLinecap="round" />
          <text x="139" y="114" className="font-game" fontSize="12.5" fill="#1D4ED8">
            엄마(부모) = 분모!
          </text>

          {/* Crisp comic formula panel */}
          <rect x="123" y="139" width="110" height="60" rx="2" fill={INK} />
          <rect x="120" y="136" width="110" height="60" rx="2" fill="#FFFFFF" stroke={INK} strokeWidth="2.6" />
          <ComicFraction x={175} y={166} num="분자(부분)" den="분모(전체)" scale={0.95} barWidth={78} />
        </svg>
      );
    }

    /* SP-2: 개수 세기 분수 (옥수수 6개 중 4개 사기 -> 4/6) */
    case 'intro_counting_fraction': {
      const totalCorns = Math.max(4, Math.min(8, d));
      const boughtCorns = Math.min(n, totalCorns);
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#FFFBEB')} />
          <line x1="0" y1="194" x2="240" y2="194" stroke={INK} strokeWidth="2.4" />

          {/* Top question */}
          <text x="120" y="21" textAnchor="middle" className="font-game" fontSize="11.8" fill="#B45309">
            옥수수 {boughtCorns}개 살 건데 분수로 표현하래ㅠ
          </text>

          {/* 6 individual corns (NOT in bags!) */}
          {Array.from({ length: totalCorns }, (_, i) => {
            const cx = 24 + i * (192 / Math.max(1, totalCorns - 1));
            const picked = i < boughtCorns;
            return (
              <g key={i} transform={`translate(${cx}, 56)`}>
                {picked && (
                  <circle cx="0" cy="0" r="16" fill="#FEF08A" stroke="#EA580C" strokeWidth="1.8" strokeDasharray="3 2" />
                )}
                <ellipse
                  cx="0"
                  cy="-2"
                  rx="6.2"
                  ry="13"
                  fill={picked ? '#FACC15' : '#E2E8F0'}
                  stroke={INK}
                  strokeWidth="1.6"
                />
                <path
                  d="M 0 6 Q -7 12 4 12"
                  fill="none"
                  stroke={picked ? '#16A34A' : '#94A3B8'}
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
              </g>
            );
          })}

          {/* Scolding buddy Jollaman on left — slim black 1-line torso + red shoes + comic anger mark */}
          <g transform="translate(46, 136)">
            {/* Comic anger symbol */}
            <path d="M -18 -14 L -13 -14 L -13 -19 M -20 -9 L -15 -9 L -15 -4" fill="none" stroke="#EF4444" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="0" cy="0" r="14" fill="#FFFFFF" stroke={INK} strokeWidth="3" />
            <LoopHair x={0} y={-14} />
            <line x1="-7" y1="-4" x2="-2" y2="-1" stroke={INK} strokeWidth="2" />
            <line x1="7" y1="-4" x2="2" y2="-1" stroke={INK} strokeWidth="2" />
            <circle cx="-4" cy="1" r="1.8" fill={INK} />
            <circle cx="4" cy="1" r="1.8" fill={INK} />
            <ellipse cx="0" cy="7" rx="4" ry="2.5" fill="#EF4444" />
            <line x1="0" y1="14" x2="0" y2="38" stroke={INK} strokeWidth="4.2" strokeLinecap="round" />
            <path d="M 0 21 L 24 14" stroke={INK} strokeWidth="3.2" strokeLinecap="round" />
            <circle cx="25" cy="14" r="3.2" fill="#FFFFFF" stroke={INK} strokeWidth="1.6" />
            <path d="M 0 21 L -16 29" stroke={INK} strokeWidth="3.2" strokeLinecap="round" />
            <line x1="0" y1="38" x2="-9" y2="56" stroke={INK} strokeWidth="3.4" strokeLinecap="round" />
            <line x1="0" y1="38" x2="9" y2="56" stroke={INK} strokeWidth="3.4" strokeLinecap="round" />
            <ellipse cx="-11" cy="57" rx="5.5" ry="3.2" fill="#EF4444" stroke={INK} strokeWidth="1.4" />
            <ellipse cx="11" cy="57" rx="5.5" ry="3.2" fill="#EF4444" stroke={INK} strokeWidth="1.4" />
          </g>

          {/* Dialogue */}
          <text x="150" y="103" textAnchor="middle" className="font-game" fontSize="13" fill="#DC2626">
            전체가 몇 개인지 세어봐!
          </text>

          {/* Sharp comic panel for 4/6 answer */}
          <rect x="89" y="127" width="140" height="60" rx="2" fill={INK} />
          <rect x="86" y="124" width="140" height="60" rx="2" fill="#FFFFFF" stroke={INK} strokeWidth="2.4" />
          <text x="132" y="147" textAnchor="middle" className="font-game" fontSize="12.5" fill="#EA580C">
            내가 산 {boughtCorns}개
          </text>
          <text x="132" y="171" textAnchor="middle" className="font-game" fontSize="12.5" fill="#1D4ED8">
            전체 {totalCorns}개
          </text>
          <ComicFraction x={198} y={154} num={boughtCorns} den={totalCorns} scale={1.08} />

          <text x="120" y="216" textAnchor="middle" className="font-game" fontSize="12" fill="#92400E">
            한 개씩 셀 땐 분모=전체 개수, 분자=산 개수!
          </text>
        </svg>
      );
    }

    /* #01: 옥수수 봉지 3묶음 — "옥수수 4개가 먹고 싶어. 몇 봉지(묶음) 사야 돼?" */
    case 'cluster_bonk': {
      const clusters = Math.max(2, Math.min(4, d));
      const picked = Math.min(n, clusters);
      const wantedCorns = picked * 2;
      const skelStroke = isInkSaving ? INK : '#FFFFFF';
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={isInkSaving ? '#FFFFFF' : '#1E293B'} />
          <rect x="0" y="186" width="240" height="44" fill={isInkSaving ? '#F8FAFC' : '#334155'} />
          <line x1="0" y1="186" x2="240" y2="186" stroke={isInkSaving ? INK : '#94A3B8'} strokeWidth="2" />

          {/* Top question requested by user */}
          <text x="120" y="18" textAnchor="middle" className="font-game" fontSize="10.8" fill={isBw ? INK : isInkSaving ? '#B45309' : '#FEF08A'}>
            “옥수수 {wantedCorns}개가 먹고 싶어. 몇 봉지(묶음) 사야 돼?”
          </text>

          {Array.from({ length: clusters }, (_, i) => {
            const bx = 18 + i * (204 / clusters);
            const bw = 204 / clusters - 10;
            const active = i < picked;
            const by = active ? 32 : 26;
            return (
              <g key={i}>
                <rect
                  x={bx}
                  y={by}
                  width={bw}
                  height={52}
                  rx="11"
                  fill={isInkSaving ? (active ? '#FEF9C3' : '#F8FAFC') : active ? '#FEF08A' : '#E0F2FE'}
                  stroke={active ? '#EA580C' : '#38BDF8'}
                  strokeWidth="2.6"
                  strokeDasharray={active ? undefined : '4 3'}
                />
                <ellipse cx={bx + bw * 0.35} cy={by + 27} rx="6.2" ry="13" fill="#FACC15" stroke={INK} strokeWidth="1.6" />
                <ellipse cx={bx + bw * 0.67} cy={by + 27} rx="6.2" ry="13" fill="#FACC15" stroke={INK} strokeWidth="1.6" />
                <path d={`M ${bx + bw * 0.35} ${by + 35} Q ${bx + bw * 0.25} ${by + 42} ${bx + bw * 0.42} ${by + 41}`} fill="none" stroke="#16A34A" strokeWidth="2.2" />
                <path d={`M ${bx + bw * 0.67} ${by + 35} Q ${bx + bw * 0.57} ${by + 42} ${bx + bw * 0.74} ${by + 41}`} fill="none" stroke="#16A34A" strokeWidth="2.2" />
              </g>
            );
          })}

          <path d="M 50 86 L 40 100 L 52 102 L 42 114" fill="none" stroke={isBw ? INK : isInkSaving ? '#D97706' : '#FACC15'} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <text x="58" y="106" className="font-game" fontSize="13" fill={isBw ? INK : isInkSaving ? '#D97706' : '#FACC15'}>
            찌릿!! 퍽!
          </text>

          {/* Skeleton Shock Jollaman */}
          <g transform="translate(46, 134)">
            <path d="M -10 -14 L -6 -22 L 0 -15 L 6 -22 L 10 -14" fill="none" stroke={skelStroke} strokeWidth="2.2" />
            <circle cx="0" cy="0" r="14" fill="#FFFFFF" stroke={INK} strokeWidth="2.8" />
            <circle cx="-5" cy="-2" r="2.2" fill={INK} />
            <circle cx="5" cy="-2" r="2.2" fill={INK} />
            <line x1="0" y1="14" x2="0" y2="38" stroke={skelStroke} strokeWidth="4" strokeLinecap="round" />
            <line x1="-7" y1="22" x2="7" y2="22" stroke={skelStroke} strokeWidth="2.4" strokeLinecap="round" />
            <line x1="-6" y1="28" x2="6" y2="28" stroke={skelStroke} strokeWidth="2.4" strokeLinecap="round" />
            <line x1="-5" y1="34" x2="5" y2="34" stroke={skelStroke} strokeWidth="2.4" strokeLinecap="round" />
            <path d="M 0 19 L -18 11" stroke={skelStroke} strokeWidth="3.4" strokeLinecap="round" />
            <path d="M 0 19 L 18 11" stroke={skelStroke} strokeWidth="3.4" strokeLinecap="round" />
            <circle cx="-19" cy="11" r="3.4" fill="#FFFFFF" stroke={INK} strokeWidth="1.6" />
            <circle cx="19" cy="11" r="3.4" fill="#FFFFFF" stroke={INK} strokeWidth="1.6" />
            <line x1="0" y1="38" x2="-10" y2="54" stroke={skelStroke} strokeWidth="3.6" strokeLinecap="round" />
            <line x1="0" y1="38" x2="10" y2="54" stroke={skelStroke} strokeWidth="3.6" strokeLinecap="round" />
            <ellipse cx="-12" cy="56" rx="6" ry="3.5" fill="#EF4444" stroke={INK} strokeWidth="1.4" />
            <ellipse cx="12" cy="56" rx="6" ry="3.5" fill="#EF4444" stroke={INK} strokeWidth="1.4" />
          </g>

          {/* Big crossed-out 4 -> "4묶음이 아님! 2묶음!" */}
          <g transform="translate(115, 162)">
            <text x="0" y="0" textAnchor="middle" className="font-game" fontSize="58" fill={isInkSaving ? '#E2E8F0' : '#475569'} stroke="#94A3B8" strokeWidth="1.5">
              {wantedCorns}
            </text>
            <line x1="-18" y1="-38" x2="18" y2="4" stroke="#EF4444" strokeWidth="4.2" strokeLinecap="round" />
            <line x1="18" y1="-38" x2="-18" y2="4" stroke="#EF4444" strokeWidth="4.2" strokeLinecap="round" />
            <text x="0" y="18" textAnchor="middle" className="font-game" fontSize="10" fill={isInkSaving ? '#DC2626' : '#FCA5A5'}>
              {wantedCorns}묶음이 아님!
            </text>
          </g>

          <rect x="159" y="105" width="74" height="74" rx="2" fill={isInkSaving ? '#E2E8F0' : '#FACC15'} />
          <rect x="156" y="102" width="74" height="74" rx="2" fill="#FFFFFF" stroke={INK} strokeWidth="2.6" />
          <text x="193" y="119" textAnchor="middle" className="font-game" fontSize="11" fill="#EA580C">
            정답: {picked}묶음!
          </text>
          <ComicFraction x={193} y={149} num={picked} den={clusters} scale={1.15} />

          <text x="120" y="214" textAnchor="middle" className="font-game" fontSize="12" fill={isBw ? INK : isInkSaving ? '#B45309' : '#FEF08A'}>
            “으악! {wantedCorns}묶음이 아니라 {picked}묶음이라구!!”
          </text>
        </svg>
      );
    }

    /* #02: 분수만큼은? 10의 3/5는? — 1단계 빨간 타원(÷) + 2단계 파란 타원(×) + 생각하는 졸라맨 */
    case 'fraction_of_set_heavy': {
      const clusters = Math.max(2, Math.min(5, d));
      const active = Math.min(n, clusters);
      const totalItems = clusters * 2;
      const resultItems = active * 2;
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#FFF7ED')} />

          {/* 1단계: 먼저 10의 1/5 구하기 (10과 5를 빨간 타원으로 + ÷ 기호) */}
          <text x="10" y="22" className="font-game" fontSize="10.5" fill="#DC2626">
            1. 먼저 {totalItems}의
          </text>
          <ComicFraction x={71} y={18} num={1} den={clusters} scale={0.55} />
          <text x="82" y="22" className="font-game" fontSize="10.5" fill="#DC2626">
            이 몇 개인지 알아보자!
          </text>

          {/* Cute thinking Jollaman face (🤔) in top-right */}
          <g transform="translate(214, 24)">
            <circle cx="0" cy="0" r="14" fill="#FFFFFF" stroke={INK} strokeWidth="2.6" />
            <LoopHair x={0} y={-14} />
            <line x1="-8" y1="-5" x2="-3" y2="-6.5" stroke={INK} strokeWidth="1.6" strokeLinecap="round" />
            <line x1="3" y1="-4.5" x2="8" y2="-3.5" stroke={INK} strokeWidth="1.6" strokeLinecap="round" />
            <circle cx="-4.5" cy="-1.5" r="1.7" fill={INK} />
            <circle cx="4.5" cy="-1.5" r="1.7" fill={INK} />
            <path d="M -3 5 Q 1 4 4 6" fill="none" stroke={INK} strokeWidth="1.6" strokeLinecap="round" />
            {/* Thinking hand on chin */}
            <path d="M -10 17 L -3 11 L 3 12" fill="none" stroke={INK} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="3" cy="11.5" r="2.6" fill="#FFFFFF" stroke={INK} strokeWidth="1.3" />
          </g>

          {/* 10의 3/5 = 6 수식 + 빨간 타원(10과 5) + ÷ 기호 */}
          <g transform="translate(0, 14)">
            <text x="28" y="54" textAnchor="middle" className="font-game" fontSize="22" fill={INK}>
              {totalItems}
            </text>
            <text x="48" y="53" textAnchor="middle" className="font-game" fontSize="13" fill="#64748B">
              의
            </text>
            <ComicFraction x={70} y={50} num={active} den={clusters} scale={0.88} />
            <text x="94" y="55" textAnchor="middle" className="font-game" fontSize="16" fill={INK}>
              = {resultItems}
            </text>

            {/* Red oval circling totalItems (10) and denominator (5) diagonally + ÷ */}
            <ellipse
              cx="47"
              cy="53.5"
              rx="37"
              ry="16"
              transform="rotate(17.5 47 53.5)"
              fill="none"
              stroke="#EF4444"
              strokeWidth="2.3"
            />
            <text x="43" y="82" textAnchor="middle" className="font-game" fontSize="15" fill="#EF4444">
              ÷
            </text>

            <text x="174" y="45" textAnchor="middle" className="font-game" fontSize="12" fill="#B91C1C">
              {totalItems} ÷ {clusters} = 2
            </text>
            <text x="174" y="63" textAnchor="middle" className="font-game" fontSize="11.5" fill={INK}>
              아하, 2개네!
            </text>
          </g>

          <line x1="14" y1="106" x2="226" y2="106" stroke="#FED7AA" strokeWidth="2" />

          {/* 2단계: 이제 10의 3/5 알아보기 (파란색 3 위 × + 파란 타원) */}
          <text x="12" y="125" className="font-game" fontSize="11" fill="#1D4ED8">
            2. 이제 {totalItems}의
          </text>
          <ComicFraction x={76} y={121} num={active} den={clusters} scale={0.58} />
          <text x="88" y="125" className="font-game" fontSize="11" fill="#1D4ED8">
            도 알아보자!
          </text>

          <g transform="translate(0, 118)">
            <text x="28" y="60" textAnchor="middle" className="font-game" fontSize="22" fill={INK}>
              {totalItems}
            </text>
            <text x="48" y="59" textAnchor="middle" className="font-game" fontSize="13" fill="#64748B">
              의
            </text>
            <ComicFraction x={70} y={56} num={active} den={clusters} scale={0.88} />
            <text x="94" y="61" textAnchor="middle" className="font-game" fontSize="16" fill={INK}>
              = {resultItems}
            </text>

            {/* Blue X slightly lowered above numerator (3) without covering 3 + Blue oval */}
            <text x="70" y="37" textAnchor="middle" className="font-game" fontSize="13.5" fill="#2563EB">
              ×
            </text>
            <ellipse
              cx="70"
              cy="40"
              rx="10.5"
              ry="16.5"
              fill="none"
              stroke="#2563EB"
              strokeWidth="2.3"
            />

            <ComicFraction x={128} y={40} num={1} den={clusters} scale={0.56} />
            <text x="172" y="44" textAnchor="middle" className="font-game" fontSize="11" fill="#475569">
              은 2개였지?
            </text>
            <text x="174" y="62" textAnchor="middle" className="font-game" fontSize="11.5" fill="#1D4ED8">
              {active}배니까 2 × {active} = {resultItems}!
            </text>
            {/* Blue curved arrow connecting blue oval to "3배" */}
            <path d="M 71 57 Q 95 77 123 66" fill="none" stroke="#2563EB" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M 116 64 L 124 65.5 L 119 72" fill="none" stroke="#2563EB" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            <text x="174" y="80" textAnchor="middle" className="font-game" fontSize="12" fill="#EA580C">
              {resultItems}개네!
            </text>
          </g>
        </svg>
      );
    }

    /* #03: 진분수 — 짧은 1/2 펭귄다리, 몸통이 거의 땅에 닿는 정상 비율 졸라맨 */
    case 'proper_normal_stickman': {
      const topNum = Math.min(n, d - 1);
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={isInkSaving ? '#FFFFFF' : '#3B428C'} />
          <polygon points="18,0 100,0 142,188 30,188" fill={isInkSaving ? '#F1F5F9' : '#636AE8'} opacity="0.58" />
          <rect x="0" y="188" width="240" height="42" fill={isInkSaving ? '#F8FAFC' : '#2C3366'} />
          <line x1="0" y1="188" x2="240" y2="188" stroke={isInkSaving ? INK : '#38BDF8'} strokeWidth="2.5" />

          {/* Subtle celebrity camera flash sparkles on runway */}
          <path d="M 22 68 L 24 73 L 29 75 L 24 77 L 22 82 L 20 77 L 15 75 L 20 73 Z" fill={isInkSaving ? '#CBD5E1' : '#FDE047'} opacity="0.85" />
          <path d="M 134 56 L 135.5 60 L 139.5 61.5 L 135.5 63 L 134 67 L 132.5 63 L 128.5 61.5 L 132.5 60 Z" fill={isInkSaving ? '#CBD5E1' : '#38BDF8'} opacity="0.85" />
          <path d="M 218 42 L 220 47 L 225 49 L 220 51 L 218 56 L 216 51 L 211 49 L 216 47 Z" fill={isInkSaving ? '#CBD5E1' : '#FDE047'} opacity="0.85" />

          {/* Sharp comic speech bubble */}
          <rect x="17" y="15" width="132" height="32" rx="2" fill={isInkSaving ? '#E2E8F0' : '#38BDF8'} />
          <rect x="14" y="12" width="132" height="32" rx="2" fill="#FFFFFF" stroke={INK} strokeWidth="2.4" />
          <polygon points="62,44 74,44 68,54" fill="#FFFFFF" stroke={INK} strokeWidth="2" strokeLinejoin="round" />
          <line x1="63" y1="44" x2="73" y2="44" stroke="#FFFFFF" strokeWidth="3" />
          <text x="80" y="33" textAnchor="middle" className="font-game" fontSize="13.5" fill="#047857">
            “날씬한 황금 비율~”
          </text>

          <WhiteFractionJollaman
            x={80}
            y={92}
            headR={18}
            bodyW={24}
            bodyH={58}
            topNum={topNum}
            botNum={d}
            sunglasses
            penguinLegs
          />

          <rect x="151" y="81" width="80" height="94" rx="2" fill={isInkSaving ? '#E2E8F0' : '#38BDF8'} />
          <rect x="148" y="78" width="80" height="94" rx="2" fill="#FFFFFF" stroke={INK} strokeWidth="2.6" />
          <ComicFraction x={188} y={116} num={topNum} den={d} scale={1.2} />
          <text x="188" y="158" textAnchor="middle" className="font-game" fontSize="11" fill="#047857">
            1보다 작아!
          </text>

          <text x="120" y="213" textAnchor="middle" className="font-game" fontSize="12" fill={isBw ? INK : isInkSaving ? '#047857' : '#A7F3D0'}>
            내 비율을 봐! 내가 진<tspan fontSize="7" fill={isBw ? INK : isInkSaving ? '#D97706' : '#FDE047'}>짜</tspan> 분수지, 진분수!
          </text>
        </svg>
      );
    }

    /* #04: 가분수 — 짧은 1/2 펭귄다리, 몸통이 거의 땅에 닿는 1:1 & 대두 졸라맨 */
    case 'improper_bighead_1to1': {
      const bigNum = Math.max(d + 1, n);
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#FFFBEB')} />
          <line x1="0" y1="194" x2="240" y2="194" stroke={INK} strokeWidth="2.6" />

          <text x="58" y="23" textAnchor="middle" className="font-game" fontSize="12" fill="#B45309">
            ① 머리 = 몸 (1:1!)
          </text>
          <WhiteFractionJollaman
            x={58}
            y={114}
            headR={20}
            bodyW={40}
            bodyH={40}
            topNum={d}
            botNum={d}
            penguinLegs
          />

          <text x="174" y="23" textAnchor="middle" className="font-game" fontSize="12" fill="#DC2626">
            ② 대두 꽈당!! (99kg)
          </text>
          {/* Dizzy spiral & comic impact lines */}
          <path d="M 135 50 Q 140 44 146 50 Q 150 55 144 58" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
          <path d="M 122 152 L 131 157 M 120 162 L 130 162 M 212 155 L 222 150" stroke="#EF4444" strokeWidth="2.2" strokeLinecap="round" />
          <text x="128" y="182" textAnchor="middle" className="font-game" fontSize="9.5" fill="#DC2626">
            쿠당탕!
          </text>
          <WhiteFractionJollaman
            x={174}
            y={108}
            headR={33}
            bodyW={21}
            bodyH={32}
            topNum={bigNum}
            botNum={d}
            crying
            tiltDeg={-14}
            penguinLegs
          />

          <text x="120" y="215" textAnchor="middle" className="font-game" fontSize="9.8" fill="#92400E">
            이렇게 머리가 크다니, 가짜 사람이야! 가<tspan fontSize="6" fill="#DC2626">짜</tspan> 분수, 가분수
          </text>
        </svg>
      );
    }

    /* #05: UFO 빔 맞고 숫자 1로 변신 — 짧은 펭귄다리 + 숫자 1 킹받는 한쪽 입꼬리 미소 */
    case 'whole_equals_one_morph': {
      const oneArmStroke = isInkSaving ? INK : '#FFFFFF';
      const beamColor = isBw ? INK : isInkSaving ? '#D97706' : '#FACC15';
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={isInkSaving ? '#FFFFFF' : '#3B4A6B'} />
          <rect x="0" y="190" width="240" height="40" fill={isInkSaving ? '#F8FAFC' : '#4C5E82'} />
          <line x1="0" y1="190" x2="240" y2="190" stroke={isInkSaving ? INK : '#94A3B8'} strokeWidth="2" />

          <polygon points="56,36 16,190 96,190" fill={isInkSaving ? '#CBD5E1' : '#6EE7B7'} opacity={isInkSaving ? '0.35' : '0.45'} />
          <ellipse cx="56" cy="26" rx="28" ry="10" fill="#64748B" stroke={INK} strokeWidth="2.2" />
          <path d="M 42 22 A 14 14 0 0 1 70 22 Z" fill="#38BDF8" stroke={INK} strokeWidth="2" />
          <circle cx="42" cy="27" r="2.5" fill="#FACC15" />
          <circle cx="56" cy="29" r="2.5" fill="#4ADE80" />
          <circle cx="70" cy="27" r="2.5" fill="#FACC15" />

          <WhiteFractionJollaman
            x={56}
            y={112}
            headR={20}
            bodyW={23}
            bodyH={40}
            topNum={d}
            botNum={d}
            crying
            penguinLegs
          />

          <path d="M 94 114 L 128 114" stroke={beamColor} strokeWidth="4" strokeLinecap="round" />
          <path d="M 120 106 L 130 114 L 120 122" fill="none" stroke={beamColor} strokeWidth="4" strokeLinecap="round" />
          <text x="111" y="100" textAnchor="middle" className="font-game" fontSize="13" fill={beamColor}>
            빔 맞고 뿅!
          </text>

          <g transform="translate(182, 162)">
            <text
              x="0"
              y="0"
              textAnchor="middle"
              className="font-game"
              fontSize="120"
              fill="#FFFFFF"
              stroke={INK}
              strokeWidth="3.5"
            >
              1
            </text>
            <rect x="-15" y="-80" width="14" height="9" rx="2" fill={INK} />
            <rect x="3" y="-80" width="14" height="9" rx="2" fill={INK} />
            <line x1="-1" y1="-76" x2="3" y2="-76" stroke={INK} strokeWidth="2.5" />
            {/* 킹받는 한쪽 입꼬리 올라간 입 */}
            <path d="M -5 -61 Q 2 -59 9 -66" fill="none" stroke={INK} strokeWidth="2.4" strokeLinecap="round" />
            <path d="M -16 -44 L -34 -32" stroke={oneArmStroke} strokeWidth="3.4" strokeLinecap="round" />
            <path d="M 18 -44 L 34 -56" stroke={oneArmStroke} strokeWidth="3.4" strokeLinecap="round" />
            {/* Legs + Red Sneakers planted on floor y=190 */}
            <line x1="-6" y1="-2" x2="-8" y2="26" stroke={oneArmStroke} strokeWidth="3.4" strokeLinecap="round" />
            <line x1="6" y1="-2" x2="8" y2="26" stroke={oneArmStroke} strokeWidth="3.4" strokeLinecap="round" />
            <ellipse cx="-10" cy="27" rx="6" ry="3.3" fill="#EF4444" stroke={INK} strokeWidth="1.4" />
            <ellipse cx="10" cy="27" rx="6" ry="3.3" fill="#EF4444" stroke={INK} strokeWidth="1.4" />
          </g>

          <rect x="108" y="12" width="124" height="40" rx="2" fill={isInkSaving ? '#E2E8F0' : '#FACC15'} />
          <rect x="105" y="9" width="124" height="40" rx="2" fill="#FFFFFF" stroke={INK} strokeWidth="2.4" />
          <polygon points="154,49 166,49 162,58" fill="#FFFFFF" stroke={INK} strokeWidth="2" strokeLinejoin="round" />
          <line x1="155" y1="49" x2="165" y2="49" stroke="#FFFFFF" strokeWidth="3" />
          <text x="115" y="29" className="font-game" fontSize="11.5" fill="#047857">
            ‘
          </text>
          <ComicFraction x={141} y={29} num={999} den={999} scale={0.72} barWidth={34} />
          <text x="191" y="33" textAnchor="middle" className="font-game" fontSize="11.5" fill="#047857">
            는 얼마게?’
          </text>

          <rect x="14" y="196" width="212" height="28" rx="2" fill="#FFFFFF" stroke={INK} strokeWidth="2" />
          <ComicFraction x={48} y={210} num={2} den={2} scale={0.6} />
          <text x="64" y="214" className="font-game" fontSize="12" fill="#5B21B6">=</text>
          <ComicFraction x={80} y={210} num={3} den={3} scale={0.6} />
          <text x="96" y="214" className="font-game" fontSize="12" fill="#5B21B6">=</text>
          <ComicFraction x={112} y={210} num={d} den={d} scale={0.6} />
          <text x="168" y="214" textAnchor="middle" className="font-game" fontSize="12" fill="#5B21B6">
            전부 1과 같다!
          </text>
        </svg>
      );
    }

    /* #06(09): 대분수 — 깜짝 퀴즈 말풍선 + 문틀 속 1과 1/4 + 우측 진분수 강조 */
    case 'mixed_wide_duo': {
      const topNum = Math.min(n, d - 1);
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#ECFDF5')} />

          {/* Top-right quiz speech bubble */}
          <rect x="79" y="10" width="152" height="58" rx="2" fill={isInkSaving ? '#E2E8F0' : '#FACC15'} />
          <rect x="76" y="7" width="152" height="58" rx="2" fill="#FFFFFF" stroke={INK} strokeWidth="2.4" />
          <polygon points="104,65 116,65 110,74" fill="#FFFFFF" stroke={INK} strokeWidth="2" strokeLinejoin="round" />
          <line x1="105" y1="65" x2="115" y2="65" stroke="#FFFFFF" strokeWidth="3" />

          <text x="152" y="22" textAnchor="middle" className="font-game" fontSize="11" fill="#DC2626">
            가짜 대분수는?
          </text>
          <ComicFraction x={119} y={45} whole={1} num={1} den={4} scale={0.76} />
          <text x={148} y={49} textAnchor="middle" className="font-game" fontSize="10.5" fill="#64748B">
            vs
          </text>
          <ComicFraction x={184} y={45} whole={1} num={5} den={4} scale={0.76} />
          <text x={212} y={49} textAnchor="middle" className="font-game" fontSize="12" fill="#DC2626">
            ?
          </text>

          {/* Left Door Frame */}
          <rect x="11" y="77" width="128" height="116" rx="1" fill={shadowInk} />
          <rect x="8" y="74" width="128" height="116" rx="1" fill="#FFFFFF" stroke={INK} strokeWidth="3.2" />

          {/* Whole 1 inside door */}
          <g transform="translate(40, 146) scale(0.84)">
            <text
              x="0"
              y="12"
              textAnchor="middle"
              className="font-game"
              fontSize="102"
              fill="#FFFFFF"
              stroke={INK}
              strokeWidth="3.5"
            >
              {w}
            </text>
            <rect x="-12" y="-62" width="10" height="6" rx="1.5" fill={INK} />
            <rect x="2" y="-62" width="10" height="6" rx="1.5" fill={INK} />
            <path d="M -5 -47 Q 2 -45 8 -51" fill="none" stroke={INK} strokeWidth="2.1" strokeLinecap="round" />
            <ellipse cx="-16" cy="-54" rx="2.2" ry="3.8" fill="#38BDF8" />
            <line x1="-8" y1="14" x2="-10" y2="42" stroke={INK} strokeWidth="3.8" strokeLinecap="round" />
            <line x1="8" y1="14" x2="10" y2="42" stroke={INK} strokeWidth="3.8" strokeLinecap="round" />
            <ellipse cx="-12" cy="44" rx="6.5" ry="3.5" fill="#EF4444" stroke={INK} strokeWidth="1.4" />
            <ellipse cx="12" cy="44" rx="6.5" ry="3.5" fill="#EF4444" stroke={INK} strokeWidth="1.4" />
          </g>

          {/* Proper fraction stickman inside door */}
          <g transform="translate(99, 102) scale(0.86)">
            <WhiteFractionJollaman
              x={0}
              y={0}
              headR={18}
              bodyW={23}
              bodyH={46}
              topNum={topNum}
              botNum={d}
              crying
            />
          </g>

          {/* Right explanation column */}
          <text x="188" y="92" textAnchor="middle" className="font-game" fontSize="9.8" fill="#DC2626">
            ▶ 문에 꽉 껴! ◀
          </text>
          <text x="188" y="122" textAnchor="middle" className="font-game" fontSize="10" fill={INK}>
            대분수 엘리베이터에
          </text>
          <text x="188" y="143" textAnchor="middle" className="font-game" fontSize="12" fill="#DC2626">
            가분수는
          </text>
          <text x="188" y="164" textAnchor="middle" className="font-game" fontSize="10.8" fill="#047857">
            탈 수 없습니다
          </text>

          {/* Bottom green banner */}
          <rect x="0" y="191" width="240" height="39" fill={softBg('#ECFDF5')} />
          <line x1="0" y1="191" x2="240" y2="191" stroke={INK} strokeWidth="2.4" />
          <text x="120" y="215" textAnchor="middle" className="font-game" fontSize="12.5" fill="#047857">
            뚱뚱이 대분수다!
          </text>
        </svg>
      );
    }

    /* #07: 대분수 -> 가분수 (#06 자연수 1 캐릭터 그대로 + 1과 3 빨간 타원 × 표시) */
    case 'mixed_to_improper_chop': {
      const rem = Math.min(n, d - 1);
      const total = w * d + rem;
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#F5F3FF')} />

          {/* Clean vertical ㅣ bar character sliced into exact d equal parts */}
          <g transform="translate(36, 94)">
            <rect x="-8" y="-45" width="16" height="57" rx="3" fill="#FFFFFF" stroke={INK} strokeWidth="2.8" />
            <rect x="-6.5" y="-40" width="5.5" height="3.6" rx="1" fill={INK} />
            <rect x="1" y="-40" width="5.5" height="3.6" rx="1" fill={INK} />
            {/* 킹받는 한쪽 입꼬리 올라간 입 */}
            <path d="M -3.5 -31 Q 0.5 -29.5 4.5 -33.5" fill="none" stroke={INK} strokeWidth="1.7" strokeLinecap="round" />
            <line x1="-5" y1="12" x2="-7" y2="26" stroke={INK} strokeWidth="2.8" strokeLinecap="round" />
            <line x1="5" y1="12" x2="7" y2="26" stroke={INK} strokeWidth="2.8" strokeLinecap="round" />
            <ellipse cx="-9" cy="28" rx="4.8" ry="2.7" fill="#EF4444" stroke={INK} strokeWidth="1.2" />
            <ellipse cx="9" cy="28" rx="4.8" ry="2.7" fill="#EF4444" stroke={INK} strokeWidth="1.2" />
            {/* Red dashed chop lines dividing the ㅣ bar into exact equal thirds */}
            {Array.from({ length: d - 1 }, (_, i) => (
              <line
                key={i}
                x1="-13"
                y1={-45 + ((i + 1) * 57) / d}
                x2="13"
                y2={-45 + ((i + 1) * 57) / d}
                stroke="#EF4444"
                strokeWidth="2.2"
                strokeDasharray="3 2"
              />
            ))}
            <text x="0" y="-58" textAnchor="middle" className="font-game" fontSize="10.5" fill="#EF4444">
              싹둑! {w * d}조각!
            </text>
          </g>

          <text x="68" y="76" textAnchor="middle" className="font-game" fontSize="16" fill={INK}>
            +
          </text>

          <g transform="translate(94, 54) scale(0.76)">
            <WhiteFractionJollaman
              x={0}
              y={0}
              headR={18}
              bodyW={22}
              bodyH={38}
              topNum={rem}
              botNum={d}
            />
          </g>

          <path d="M 118 56 Q 140 32 162 46" fill="none" stroke="#7C3AED" strokeWidth="3" strokeLinecap="round" />
          <path d="M 155 48 L 164 47 L 159 38" fill="none" stroke="#7C3AED" strokeWidth="2.8" strokeLinecap="round" />

          <g transform="translate(190, 58) scale(0.78)">
            <WhiteFractionJollaman
              x={0}
              y={0}
              headR={32}
              bodyW={22}
              bodyH={34}
              topNum={total}
              botNum={d}
              crying
            />
          </g>
          <text x="188" y="20" textAnchor="middle" className="font-game" fontSize="11.5" fill="#DC2626">
            “으악 내 머리!!”
          </text>

          {/* Crisp bottom comic formula panel */}
          <rect x="11" y="141" width="224" height="84" rx="2" fill={INK} />
          <rect x="8" y="138" width="224" height="84" rx="2" fill="#FFFFFF" stroke={INK} strokeWidth="2.4" />

          <ComicFraction x={42} y={190} whole={w} num={rem} den={d} scale={0.95} />
          {/* Blue + snug above red numerator + smaller blue oval wrapping 2 and + */}
          <text x="42" y="172" textAnchor="middle" className="font-game" fontSize="13.5" fill="#2563EB">
            +
          </text>
          <ellipse
            cx="42"
            cy="173.5"
            rx="9"
            ry="14.5"
            fill="none"
            stroke="#2563EB"
            strokeWidth="2.2"
          />
          {/* Blue circled 2 to the right of blue oval */}
          <circle cx="59" cy="169" r="6" fill="#FFFFFF" stroke="#2563EB" strokeWidth="1.8" />
          <text x="59" y="172.2" textAnchor="middle" className="font-game" fontSize="9" fill="#2563EB">
            2
          </text>

          {/* Tilted red pen oval circling whole (1) and denominator (3) + red X sign */}
          <ellipse
            cx="33"
            cy="196"
            rx="21"
            ry="9.5"
            transform="rotate(34 33 196)"
            fill="none"
            stroke="#EF4444"
            strokeWidth="2.4"
          />
          {/* Red circled 1 at top-left of red oval */}
          <circle cx="17" cy="175" r="6" fill="#FFFFFF" stroke="#EF4444" strokeWidth="1.8" />
          <text x="17" y="178.2" textAnchor="middle" className="font-game" fontSize="9" fill="#EF4444">
            1
          </text>
          <text x="24" y="213" textAnchor="middle" className="font-game" fontSize="14" fill="#EF4444">
            ×
          </text>

          <text x="72" y="195" textAnchor="middle" className="font-game" fontSize="16" fill={INK}>
            =
          </text>
          <ComicFraction
            x={122}
            y={190}
            num={`${d}×${w}+${rem}`}
            den={d}
            scale={0.85}
            barWidth={68}
          />
          <text x="172" y="195" textAnchor="middle" className="font-game" fontSize="16" fill={INK}>
            =
          </text>
          <ComicFraction x={202} y={190} num={total} den={d} scale={0.98} />
        </svg>
      );
    }

    /* #08(11): 가분수 -> 대분수 (7 ÷ 2 세로식 몫·나머지 도식) */
    case 'improper_to_mixed_drop': {
      const rem = n % d || 1;
      const wholePop = Math.max(1, Math.floor(n / d));
      const product = wholePop * d;
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#F0F9FF')} />

          {/* Top labels */}
          <text x="54" y="21" textAnchor="middle" className="font-game" fontSize="12" fill="#1D4ED8">
            {n} ÷ {d} 세로식!
          </text>
          <text x="148" y="19" textAnchor="middle" className="font-game" fontSize="10.5" fill="#DC2626">
            몫 → 자연수!
          </text>

          {/* Left vertical division card */}
          <rect x="13" y="33" width="88" height="142" rx="4" fill={shadowInk} />
          <rect x="10" y="30" width="88" height="142" rx="4" fill="#FFFFFF" stroke={INK} strokeWidth="2.4" />

          {/* Quotient red circle + label */}
          <circle cx="63" cy="52" r="11.5" fill="#FEE2E2" stroke="#EF4444" strokeWidth="2.2" />
          <text x="63" y="59" textAnchor="middle" className="font-game" fontSize="18" fill="#DC2626">
            {wholePop}
          </text>
          <text x="82" y="56" textAnchor="middle" className="font-game" fontSize="10" fill="#DC2626">
            몫
          </text>

          {/* Long division bracket + divisor + dividend */}
          <path d="M 48 69 Q 48 87 42 97" fill="none" stroke={INK} strokeWidth="2.4" strokeLinecap="round" />
          <line x1="48" y1="69" x2="82" y2="69" stroke={INK} strokeWidth="2.4" strokeLinecap="round" />
          <text x="31" y="93" textAnchor="middle" className="font-game" fontSize="19" fill="#059669">
            {d}
          </text>
          <text x="63" y="93" textAnchor="middle" className="font-game" fontSize="19" fill={INK}>
            {n}
          </text>

          {/* Subtraction step */}
          <text x="41" y="114" textAnchor="middle" className="font-game" fontSize="13" fill="#64748B">
            -
          </text>
          <text x="63" y="116" textAnchor="middle" className="font-game" fontSize="19" fill="#475569">
            {product}
          </text>
          <line x1="44" y1="123" x2="82" y2="123" stroke={INK} strokeWidth="2.2" strokeLinecap="round" />

          {/* Remainder blue circle + label */}
          <text x="29" y="148" textAnchor="middle" className="font-game" fontSize="10" fill="#2563EB">
            나머지
          </text>
          <circle cx="63" cy="144" r="11.5" fill="#DBEAFE" stroke="#2563EB" strokeWidth="2.2" />
          <text x="63" y="151" textAnchor="middle" className="font-game" fontSize="18" fill="#2563EB">
            {rem}
          </text>

          {/* Right Equation: n/d = whole rem/d */}
          <text x="122" y="96" textAnchor="middle" className="font-game" fontSize="22" fill={INK}>
            {n}
          </text>
          <line x1="110" y1="103" x2="134" y2="103" stroke={INK} strokeWidth="2.8" strokeLinecap="round" />
          <circle cx="122" cy="118" r="11" fill="#DCFCE7" stroke="#16A34A" strokeWidth="2.2" />
          <text x="122" y="124" textAnchor="middle" className="font-game" fontSize="17" fill="#059669">
            {d}
          </text>

          <text x="145" y="109" textAnchor="middle" className="font-game" fontSize="20" fill={INK}>
            =
          </text>

          {/* Whole result circle */}
          <circle cx="168" cy="103" r="13" fill="#FEE2E2" stroke="#EF4444" strokeWidth="2.3" />
          <text x="168" y="111" textAnchor="middle" className="font-game" fontSize="22" fill="#DC2626">
            {wholePop}
          </text>

          {/* Fractional remainder result */}
          <circle cx="198" cy="86" r="11" fill="#DBEAFE" stroke="#2563EB" strokeWidth="2.2" />
          <text x="198" y="92" textAnchor="middle" className="font-game" fontSize="17" fill="#2563EB">
            {rem}
          </text>
          <line x1="186" y1="103" x2="210" y2="103" stroke={INK} strokeWidth="2.8" strokeLinecap="round" />
          <circle cx="198" cy="118" r="11" fill="#DCFCE7" stroke="#16A34A" strokeWidth="2.2" />
          <text x="198" y="124" textAnchor="middle" className="font-game" fontSize="17" fill="#059669">
            {d}
          </text>

          {/* Red arch arrow: quotient -> whole */}
          <path
            d="M 73 45 Q 112 20 135 35 Q 158 49 167 86"
            fill="none"
            stroke="#EF4444"
            strokeWidth="2.3"
            strokeLinecap="round"
          />
          <path
            d="M 162 81 L 167 88 L 172 80"
            fill="none"
            stroke="#EF4444"
            strokeWidth="2.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Green curve arrow: denominator -> denominator */}
          <path
            d="M 122 130 Q 160 150 196 131"
            fill="none"
            stroke="#16A34A"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M 190 130 L 197 130 L 195 137"
            fill="none"
            stroke="#16A34A"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <text x="160" y="156" textAnchor="middle" className="font-game" fontSize="10" fill="#059669">
            분모는 그대로!
          </text>

          {/* Blue sweep arrow: remainder -> numerator */}
          <path
            d="M 63 156 Q 63 185 148 182 Q 222 180 222 122 Q 222 86 211 86"
            fill="none"
            stroke="#2563EB"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M 216 82 L 210 86 L 216 90"
            fill="none"
            stroke="#2563EB"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <text x="148" y="197" textAnchor="middle" className="font-game" fontSize="10" fill="#2563EB">
            나머지 → 분자!
          </text>
        </svg>
      );
    }

    /* #09: 분수 크기 비교 ① — 설명문구·중첩박스 전부 삭제! 예시 3개 + 승 숫자 강력 강조 */
    case 'compare_same_type': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#FFF7ED')} />

          {/* 예시 1: 3/5 < 4/5 (분자 4 크게 강조!) */}
          <text x="26" y="45" className="font-game" fontSize="14" fill="#9A3412">
            1
          </text>
          <ComicFraction x={66} y={40} num={3} den={5} scale={1.08} />
          <text x="120" y="47" textAnchor="middle" className="font-game" fontSize="22" fill="#EA580C">
            &lt;
          </text>
          <g transform="translate(166, 40)">
            <circle cx="0" cy="-14" r="14" fill="#FEE2E2" />
            <text x="0" y="-5" textAnchor="middle" className="font-game" fontSize="26" fill="#DC2626">
              4
            </text>
            <line x1="-14" y1="2" x2="14" y2="2" stroke={INK} strokeWidth="2.8" strokeLinecap="round" />
            <text x="0" y="20" textAnchor="middle" className="font-game" fontSize="17" fill="#1D4ED8">
              5
            </text>
          </g>

          <line x1="22" y1="76" x2="218" y2="76" stroke="#FED7AA" strokeWidth="2" />

          {/* 예시 2: 1과 3/5 < 2와 1/5 (자연수 2 크게 강조!) */}
          <text x="26" y="121" className="font-game" fontSize="14" fill="#9A3412">
            2
          </text>
          <ComicFraction x={82} y={115} whole={1} num={3} den={5} scale={1.05} />
          <text x="120" y="122" textAnchor="middle" className="font-game" fontSize="22" fill="#047857">
            &lt;
          </text>
          <g transform="translate(174, 115)">
            <circle cx="-24" cy="0" r="16" fill="#DCFCE7" />
            <text x="-24" y="10" textAnchor="middle" className="font-game" fontSize="31" fill="#047857">
              2
            </text>
            <ComicFraction x={2} y={0} num={1} den={5} scale={1.02} />
          </g>

          <line x1="22" y1="152" x2="218" y2="152" stroke="#FED7AA" strokeWidth="2" />

          {/* 예시 3: 2와 1/5 < 2와 3/5 (두 2에 노란 형광펜 + 분자 3 강조!) */}
          <text x="26" y="196" className="font-game" fontSize="14" fill="#9A3412">
            3
          </text>
          <g transform="translate(82, 190)">
            {/* Highlighter behind left 2 */}
            <rect x="-32" y="-12" width="20" height="26" rx="4" fill="#FEF08A" />
            <ComicFraction x={0} y={0} whole={2} num={1} den={5} scale={1.05} />
          </g>
          <text x="120" y="197" textAnchor="middle" className="font-game" fontSize="22" fill="#DC2626">
            &lt;
          </text>
          <g transform="translate(174, 190)">
            {/* Highlighter behind right 2 */}
            <rect x="-32" y="-12" width="20" height="26" rx="4" fill="#FEF08A" />
            <text x="-22" y="8" textAnchor="middle" className="font-game" fontSize="23" fill="#047857">
              2
            </text>
            <circle cx="2" cy="-13" r="14" fill="#FEE2E2" />
            <text x="2" y="-5" textAnchor="middle" className="font-game" fontSize="25" fill="#DC2626">
              3
            </text>
            <line x1="-12" y1="2" x2="16" y2="2" stroke={INK} strokeWidth="2.8" strokeLinecap="round" />
            <text x="2" y="20" textAnchor="middle" className="font-game" fontSize="17" fill="#1D4ED8">
              5
            </text>
          </g>
        </svg>
      );
    }

    /* #10(14): 대분수와 가분수 크기 비교 — 균형 잡힌 퀴즈/캐릭터/하단 결론 배치 */
    case 'compare_mixed_to_improper': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#FFFBEB')} />

          {/* Top-center Quiz: 퀴즈 : 3과 1/3 ○ 11/3 */}
          <text x="63" y="32" textAnchor="middle" className="font-game" fontSize="15.5" fill="#DC2626">
            퀴즈 :
          </text>
          <ComicFraction x={118} y={27} whole={3} num={1} den={3} scale={0.96} />
          <circle cx="151" cy="27" r="10.5" fill="#FFFFFF" stroke={INK} strokeWidth="2.4" />
          <ComicFraction x={187} y={27} num={11} den={3} scale={0.96} barWidth={26} />

          {/* Subtle center divider between the two Jollamans */}
          <line x1="120" y1="53" x2="120" y2="164" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="3 3" />

          {/* Left: Jollaman 1 (가분수로 바꾸는 중 - 의기양양) */}
          <rect x="10" y="54" width="102" height="32" rx="3" fill={shadowInk} />
          <rect x="8" y="52" width="102" height="32" rx="3" fill="#FFFFFF" stroke={INK} strokeWidth="2" />
          <polygon points="48,84 58,84 53,91" fill="#FFFFFF" stroke={INK} strokeWidth="1.8" strokeLinejoin="round" />
          <line x1="49" y1="84" x2="57" y2="84" stroke="#FFFFFF" strokeWidth="2.6" />
          <text x="59" y="65" textAnchor="middle" className="font-game" fontSize="10" fill="#1D4ED8">
            곱하고, 더하고..
          </text>
          <text x="59" y="78" textAnchor="middle" className="font-game" fontSize="11.5" fill="#EA580C">
            끝!
          </text>

          {/* Triumphant Sunglasses Jollaman 1 */}
          <g transform="translate(59, 108) scale(0.66)">
            <path d="M -22 -14 L -20 -9 L -15 -7 L -20 -5 L -22 0 L -24 -5 L -29 -7 L -24 -9 Z" fill="#FACC15" />
            <circle cx="0" cy="0" r="14" fill="#FFFFFF" stroke={INK} strokeWidth="3" />
            <LoopHair x={0} y={-14} />
            <rect x="-10" y="-4" width="9" height="5" rx="1.2" fill={INK} />
            <rect x="1" y="-4" width="9" height="5" rx="1.2" fill={INK} />
            <path d="M -5 5 Q 1 9 6 4" fill="none" stroke={INK} strokeWidth="2.1" strokeLinecap="round" />
            <line x1="0" y1="14" x2="0" y2="38" stroke={INK} strokeWidth="4.4" strokeLinecap="round" />
            <path d="M 0 21 L 20 8" stroke={INK} strokeWidth="3.2" strokeLinecap="round" />
            <circle cx="21" cy="7" r="3.4" fill="#FFFFFF" stroke={INK} strokeWidth="1.6" />
            <path d="M 0 21 L -15 26" stroke={INK} strokeWidth="3.2" strokeLinecap="round" />
            <line x1="0" y1="38" x2="-9" y2="54" stroke={INK} strokeWidth="3.4" strokeLinecap="round" />
            <line x1="0" y1="38" x2="9" y2="54" stroke={INK} strokeWidth="3.4" strokeLinecap="round" />
            <ellipse cx="-11" cy="56" rx="5.5" ry="3" fill="#EF4444" stroke={INK} strokeWidth="1.4" />
            <ellipse cx="11" cy="56" rx="5.5" ry="3" fill="#EF4444" stroke={INK} strokeWidth="1.4" />
          </g>
          <text x="59" y="161" textAnchor="middle" className="font-game" fontSize="10.2" fill="#1D4ED8">
            가분수로 바꾸는 중
          </text>

          {/* Right: Jollaman 2 (대분수로 바꾸는 중 - 다크써클) */}
          <rect x="128" y="54" width="106" height="32" rx="3" fill={shadowInk} />
          <rect x="126" y="52" width="106" height="32" rx="3" fill="#FFFFFF" stroke={INK} strokeWidth="2" />
          <polygon points="174,84 184,84 179,91" fill="#FFFFFF" stroke={INK} strokeWidth="1.8" strokeLinejoin="round" />
          <line x1="175" y1="84" x2="183" y2="84" stroke="#FFFFFF" strokeWidth="2.6" />
          <text x="179" y="65" textAnchor="middle" className="font-game" fontSize="9.3" fill="#475569">
            나누고, 몫은 자연수로,
          </text>
          <text x="179" y="78" textAnchor="middle" className="font-game" fontSize="10.5" fill="#DC2626">
            나머.. 으악!
          </text>

          {/* Kneeling-in-Despair (Orz) Jollaman 2 */}
          <g transform="translate(178, 124)">
            {/* Manga gloom lines */}
            <line x1="4" y1="-24" x2="4" y2="-13" stroke="#64748B" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="10" y1="-26" x2="10" y2="-14" stroke="#64748B" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="16" y1="-23" x2="16" y2="-12" stroke="#64748B" strokeWidth="1.8" strokeLinecap="round" />

            {/* Back kneeling leg (shortened) + red shoe */}
            <path d="M 8 8 L 4 17 L 13 17" fill="none" stroke={INK} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
            <ellipse cx="15" cy="17" rx="3.8" ry="2.2" fill="#EF4444" stroke={INK} strokeWidth="1.1" />

            {/* Front kneeling leg (shortened) + red shoe */}
            <path d="M 11 7 L 7 16 L 17 16" fill="none" stroke={INK} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
            <ellipse cx="19" cy="16" rx="4" ry="2.3" fill="#EF4444" stroke={INK} strokeWidth="1.2" />

            {/* Slumped torso */}
            <path d="M 11 7 Q 1 -1 -10 4" fill="none" stroke={INK} strokeWidth="3.8" strokeLinecap="round" />

            {/* Arms planted on floor in defeat */}
            <path d="M -8 5 L -5 17" fill="none" stroke={INK} strokeWidth="2.6" strokeLinecap="round" />
            <circle cx="-5" cy="17.5" r="2.5" fill="#FFFFFF" stroke={INK} strokeWidth="1.3" />
            <path d="M -11 4 L -15 17" fill="none" stroke={INK} strokeWidth="2.8" strokeLinecap="round" />
            <circle cx="-15" cy="17.5" r="2.7" fill="#FFFFFF" stroke={INK} strokeWidth="1.3" />

            {/* Drooping crying head */}
            <g transform="translate(-20, 2)">
              <circle cx="0" cy="0" r="10.5" fill="#FFFFFF" stroke={INK} strokeWidth="2.6" />
              <LoopHair x={0} y={-10.5} />
              <path d="M -5.5 -2.5 L -2.5 -0.5 L -5.5 1.5" fill="none" stroke={INK} strokeWidth="1.7" strokeLinecap="round" />
              <path d="M 5.5 -2.5 L 2.5 -0.5 L 5.5 1.5" fill="none" stroke={INK} strokeWidth="1.7" strokeLinecap="round" />
              <ellipse cx="-6" cy="4.5" rx="1.4" ry="2.2" fill="#38BDF8" />
              <ellipse cx="0" cy="5.5" rx="2.6" ry="2" fill="#EF4444" />
            </g>
          </g>
          <text x="180" y="161" textAnchor="middle" className="font-game" fontSize="10.2" fill="#475569">
            대분수로 바꾸는 중
          </text>

          {/* Compact Bottom Section */}
          <line x1="0" y1="171" x2="240" y2="171" stroke={INK} strokeWidth="2.2" strokeDasharray="4 3" />
          <text x="120" y="204" textAnchor="middle" className="font-game" fontSize="12" fill="#B45309">
            곱셈이 나눗셈보단 낫잖아? <tspan fill="#EA580C">한 잔 해!</tspan>
          </text>
        </svg>
      );
    }

    /* #11: 수직선 기초 (1/2, 1/3, 2/3 빈칸 네모 + 졸라맨 서 있음!) */
    case 'numberline_basic': {
      const lines = [
        { y: 48, parts: 2, target: 1 },
        { y: 116, parts: 3, target: 1 },
        { y: 184, parts: 3, target: 2 },
      ];
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#EFF6FF')} />

          {lines.map((row, rIdx) => {
            const startX = 24;
            const endX = 166;
            const span = endX - startX;
            const targetX = startX + (span * row.target) / row.parts;
            return (
              <g key={rIdx}>
                {/* Base line 0 to 1 */}
                <line x1={startX} y1={row.y} x2={endX} y2={row.y} stroke={INK} strokeWidth="2.8" strokeLinecap="round" />
                {Array.from({ length: row.parts + 1 }, (_, t) => {
                  const tx = startX + (span * t) / row.parts;
                  const isEnd = t === 0 || t === row.parts;
                  return (
                    <g key={t}>
                      <line
                        x1={tx}
                        y1={isEnd ? row.y - 7 : row.y - 4.5}
                        x2={tx}
                        y2={isEnd ? row.y + 7 : row.y + 4.5}
                        stroke={isEnd ? '#1D4ED8' : INK}
                        strokeWidth={isEnd ? '2.6' : '1.8'}
                      />
                      {t === 0 && (
                        <text x={tx} y={row.y + 17} textAnchor="middle" className="font-game" fontSize="11" fill={INK}>
                          0
                        </text>
                      )}
                      {t === row.parts && (
                        <text x={tx} y={row.y + 17} textAnchor="middle" className="font-game" fontSize="11" fill="#1D4ED8">
                          1
                        </text>
                      )}
                    </g>
                  );
                })}

                {/* Arrow pointing down + mini White Jollaman standing on it! */}
                <path d={`M ${targetX} ${row.y - 14} L ${targetX} ${row.y - 4}`} stroke="#EA580C" strokeWidth="2.2" />
                <path d={`M ${targetX - 3.5} ${row.y - 8} L ${targetX} ${row.y - 3} L ${targetX + 3.5} ${row.y - 8}`} fill="none" stroke="#EA580C" strokeWidth="2.2" />

                <g transform={`translate(${targetX}, ${row.y - 29})`}>
                  <circle cx="0" cy="-7" r="6" fill="#FFFFFF" stroke={INK} strokeWidth="1.8" />
                  <LoopHair x={0} y={-13} />
                  <circle cx="-2" cy="-7.5" r="0.9" fill={INK} />
                  <circle cx="2" cy="-7.5" r="0.9" fill={INK} />
                  <ellipse cx="0" cy="-4.5" rx="1.2" ry="1.4" fill="#EF4444" />
                  <ellipse cx="7.5" cy="-10" rx="1.2" ry="2" fill="#38BDF8" />
                  <line x1="0" y1="-1" x2="0" y2="8" stroke={INK} strokeWidth="2.2" />
                  <line x1="0" y1="2" x2="-7" y2="-2" stroke={INK} strokeWidth="1.8" strokeLinecap="round" />
                  <line x1="0" y1="2" x2="7" y2="-2" stroke={INK} strokeWidth="1.8" strokeLinecap="round" />
                  <line x1="0" y1="8" x2="-4" y2="13.5" stroke={INK} strokeWidth="2" strokeLinecap="round" />
                  <line x1="0" y1="8" x2="4" y2="13.5" stroke={INK} strokeWidth="2" strokeLinecap="round" />
                  <ellipse cx="-4.5" cy="14.5" rx="2.6" ry="1.5" fill="#EF4444" stroke={INK} strokeWidth="0.9" />
                  <ellipse cx="4.5" cy="14.5" rx="2.6" ry="1.5" fill="#EF4444" stroke={INK} strokeWidth="0.9" />
                </g>

                {/* Blank fraction box to fill in! */}
                <BlankFractionBox x={202} y={row.y - 2} />
              </g>
            );
          })}

          <text x="120" y="220" textAnchor="middle" className="font-game" fontSize="12" fill="#1E40AF">
            졸라맨이 서 있는 곳을 분수로 써 보자!
          </text>
        </svg>
      );
    }

    /* #12: 대분수와 수직선 — 상단 바 제거 + 초록 설명 글자 위로 올려 가리지 않게 */
    case 'numberline_mixed_stride': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#ECFDF5')} />

          {/* Plain text header (no dark bar) */}
          <text x="120" y="24" textAnchor="middle" className="font-game" fontSize="13.5" fill="#047857">
            뚱뚱이 분수 출동! 0 → 1 성큼!
          </text>

          {/* Green instruction raised high above jumping Jollaman! */}
          <text x="78" y="54" textAnchor="middle" className="font-game" fontSize="12" fill="#059669">
            자연수는 다리찢기 성큼!
          </text>

          {/* Blank Mixed Fraction Box cleanly without heavy box frame */}
          <text x="190" y="52" textAnchor="middle" className="font-game" fontSize="11" fill="#047857">
            여기는 얼마?
          </text>
          <BlankFractionBox x={198} y={80} hasWhole />

          {/* Number line 0 to 2 divided into 3 parts each */}
          <line x1="20" y1="160" x2="220" y2="160" stroke={INK} strokeWidth="3" strokeLinecap="round" />
          {[0, 1, 2, 3, 4, 5, 6].map((tick) => {
            const tx = 24 + tick * 32;
            const isWhole = tick % 3 === 0;
            return (
              <g key={tick}>
                <line
                  x1={tx}
                  y1={isWhole ? 150 : 154}
                  x2={tx}
                  y2={isWhole ? 170 : 166}
                  stroke={isWhole ? '#047857' : INK}
                  strokeWidth={isWhole ? '2.8' : '1.8'}
                />
                {isWhole && (
                  <text x={tx} y="184" textAnchor="middle" className="font-game" fontSize="13" fill="#047857">
                    {tick / 3}
                  </text>
                )}
              </g>
            );
          })}

          {/* Giant stride arc 0 -> 1 */}
          <path d="M 24 148 Q 72 86 120 148" fill="none" stroke="#10B981" strokeWidth="2.6" strokeDasharray="5 3" />

          {/* Leg-splitting Jollaman jumping 0 -> 1 with straining sweat & gritting teeth */}
          <g transform="translate(72, 128)">
            <ellipse cx="-14" cy="-21" rx="1.8" ry="3" fill="#38BDF8" />
            <ellipse cx="14" cy="-21" rx="1.8" ry="3" fill="#38BDF8" />
            <circle cx="0" cy="-16" r="10" fill="#FFFFFF" stroke={INK} strokeWidth="2.6" />
            <LoopHair x={0} y={-26} />
            <rect x="-7" y="-19" width="6" height="3.5" rx="1" fill={INK} />
            <rect x="1" y="-19" width="6" height="3.5" rx="1" fill={INK} />
            <path d="M -4 -11 Q 0 -13 4 -11" fill="none" stroke={INK} strokeWidth="1.6" strokeLinecap="round" />
            <text x="-23" y="-16" textAnchor="middle" className="font-game" fontSize="9" fill="#059669">끄응!</text>
            <line x1="0" y1="-6" x2="0" y2="10" stroke={INK} strokeWidth="3" />
            <line x1="0" y1="10" x2="-34" y2="22" stroke={INK} strokeWidth="3" strokeLinecap="round" />
            <line x1="0" y1="10" x2="34" y2="22" stroke={INK} strokeWidth="3" strokeLinecap="round" />
            <ellipse cx="-36" cy="23" rx="4.5" ry="2.6" fill="#EF4444" stroke={INK} strokeWidth="1.2" />
            <ellipse cx="36" cy="23" rx="4.5" ry="2.6" fill="#EF4444" stroke={INK} strokeWidth="1.2" />
          </g>

          {/* Small tiptoe hop 1 -> 1과 1/3 (x=120 to 152) */}
          <path d="M 120 150 Q 136 132 152 150" fill="none" stroke="#EA580C" strokeWidth="2.4" />
          <text x="152" y="124" textAnchor="middle" className="font-game" fontSize="11" fill="#EA580C">
            살금살금!
          </text>
          <path d="M 152 136 L 152 152" stroke="#EA580C" strokeWidth="2.2" />

          <text x="120" y="214" textAnchor="middle" className="font-game" fontSize="12" fill="#047857">
            자연수 크게 건너고 → 남은 칸 살금살금!
          </text>
        </svg>
      );
    }

    /* #13: 보스모드! 단순화 — 정답 초록박스·파랑선·5/4·상단바 삭제, 함정만 유지 + 빈칸 + "졸라맨이 서 있는 곳을 분수로 써보자" */
    case 'numberline_boss_trap': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#FFF7ED')} />

          {/* Sharp comic trap header */}
          <text x="120" y="25" textAnchor="middle" className="font-game" fontSize="14" fill="#DC2626">
            함정 발동! 0~1만 봐라!!
          </text>

          {/* Trap warning stamp */}
          <rect x="14" y="42" width="76" height="40" rx="2" fill="#FEE2E2" stroke="#DC2626" strokeWidth="2" />
          <text x="32" y="66" textAnchor="middle" className="font-game" fontSize="11.5" fill="#991B1B">
            함정:
          </text>
          <ComicFraction x={70} y={62} num={3} den={5} scale={0.82} />
          <line x1="57" y1="48" x2="83" y2="76" stroke="#EF4444" strokeWidth="3.2" strokeLinecap="round" />

          {/* Blank Answer Box cleanly at top-right (just like #11) */}
          <BlankFractionBox x={198} y={62} />

          {/* 0 to 5/4 (5 intervals, where 1 is at tick 4!) — no 5/4 label, no blue bracket */}
          <line x1="20" y1="148" x2="216" y2="148" stroke={INK} strokeWidth="3.2" strokeLinecap="round" />
          {[0, 1, 2, 3, 4, 5].map((t) => {
            const tx = 26 + t * 37;
            const isWhole = t === 0 || t === 4;
            return (
              <g key={t}>
                <line
                  x1={tx}
                  y1={isWhole ? 136 : 142}
                  x2={tx}
                  y2={isWhole ? 160 : 154}
                  stroke={t === 4 ? '#DC2626' : INK}
                  strokeWidth={isWhole ? '3' : '2'}
                />
                {t === 0 && (
                  <text x={tx} y="175" textAnchor="middle" className="font-game" fontSize="13.5" fill={INK}>
                    0
                  </text>
                )}
                {t === 4 && (
                  <text x={tx} y="175" textAnchor="middle" className="font-game" fontSize="14.5" fill="#DC2626">
                    1
                  </text>
                )}
              </g>
            );
          })}

          {/* Jollaman standing at 3/4 with black 1-line torso, red shoes & panicked expression */}
          <path d="M 137 126 L 137 142" stroke="#EA580C" strokeWidth="2.6" />
          <path d="M 132 136 L 137 143 L 142 136" fill="none" stroke="#EA580C" strokeWidth="2.4" />
          <g transform="translate(137, 96)">
            <ellipse cx="-14" cy="-16" rx="1.7" ry="2.8" fill="#38BDF8" />
            <circle cx="0" cy="-12" r="11" fill="#FFFFFF" stroke={INK} strokeWidth="2.6" />
            <LoopHair x={0} y={-23} />
            <circle cx="-4" cy="-14" r="1.6" fill={INK} />
            <circle cx="4" cy="-14" r="1.6" fill={INK} />
            <ellipse cx="0" cy="-7" rx="2.6" ry="3.2" fill="#EF4444" stroke={INK} strokeWidth="1" />
            <line x1="0" y1="-1" x2="0" y2="15" stroke={INK} strokeWidth="3.2" strokeLinecap="round" />
            <line x1="0" y1="5" x2="-10" y2="-1" stroke={INK} strokeWidth="2.4" strokeLinecap="round" />
            <line x1="0" y1="5" x2="10" y2="-1" stroke={INK} strokeWidth="2.4" strokeLinecap="round" />
            <line x1="0" y1="15" x2="-6" y2="25" stroke={INK} strokeWidth="2.6" strokeLinecap="round" />
            <line x1="0" y1="15" x2="6" y2="25" stroke={INK} strokeWidth="2.6" strokeLinecap="round" />
            <ellipse cx="-7" cy="26" rx="4" ry="2.2" fill="#EF4444" stroke={INK} strokeWidth="1.1" />
            <ellipse cx="7" cy="26" rx="4" ry="2.2" fill="#EF4444" stroke={INK} strokeWidth="1.1" />
          </g>

          <text x="120" y="214" textAnchor="middle" className="font-game" fontSize="12" fill="#B45309">
            졸라맨이 서 있는 곳을 분수로 써 보자!
          </text>
        </svg>
      );
    }

    /* TRAP: 똑같이 나누기 함정! (선행·함정 카드) */
    case 'equal_parts_trap': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#FFFBEB')} />

          <text x="120" y="22" textAnchor="middle" className="font-game" fontSize="13.5" fill="#DC2626">
            이게 진짜 3분의 1이라고?!
          </text>

          {/* Left: Unequally sliced pizza (TRAP!) */}
          <g transform="translate(64, 72)">
            <circle cx="0" cy="0" r="34" fill="#FDE047" stroke={INK} strokeWidth="2.4" />
            {/* Tiny sliver slice highlighted in red */}
            <path d="M 0 0 L 29 -17 A 34 34 0 0 1 34 2 Z" fill="#FCA5A5" stroke={INK} strokeWidth="2" />
            {/* Unequal cut lines */}
            <line x1="0" y1="0" x2="29" y2="-17" stroke={INK} strokeWidth="2.2" />
            <line x1="0" y1="0" x2="34" y2="2" stroke={INK} strokeWidth="2.2" />
            <line x1="0" y1="0" x2="10" y2="32.5" stroke={INK} strokeWidth="2.2" />
            <text x="-14" y="5" textAnchor="middle" className="font-game" fontSize="10" fill="#92400E">
              왕조각
            </text>
            {/* Crossed-out 1/3 */}
            <g transform="translate(0, 52)">
              <ComicFraction x={0} y={0} num={1} den={3} scale={0.85} />
              <line x1="-14" y1="-14" x2="14" y2="14" stroke="#EF4444" strokeWidth="3.2" strokeLinecap="round" />
              <line x1="14" y1="-14" x2="-14" y2="14" stroke="#EF4444" strokeWidth="3.2" strokeLinecap="round" />
            </g>
          </g>

          {/* Crying black 1-line Jollaman complaining about unequal slice */}
          <g transform="translate(30, 154) scale(0.82)">
            <circle cx="0" cy="0" r="13" fill="#FFFFFF" stroke={INK} strokeWidth="3" />
            <LoopHair x={0} y={-13} />
            <path d="M -6 -3 L -3 -1 L -6 1" fill="none" stroke={INK} strokeWidth="1.8" strokeLinecap="round" />
            <path d="M 6 -3 L 3 -1 L 6 1" fill="none" stroke={INK} strokeWidth="1.8" strokeLinecap="round" />
            <ellipse cx="-6" cy="4" rx="1.6" ry="2.6" fill="#38BDF8" />
            <ellipse cx="6" cy="4" rx="1.6" ry="2.6" fill="#38BDF8" />
            <ellipse cx="0" cy="7" rx="3.2" ry="2" fill="#EF4444" />
            <line x1="0" y1="13" x2="0" y2="36" stroke={INK} strokeWidth="4.2" strokeLinecap="round" />
            <path d="M 0 20 L 18 12" stroke={INK} strokeWidth="3.2" strokeLinecap="round" />
            <path d="M 0 20 L -14 14" stroke={INK} strokeWidth="3.2" strokeLinecap="round" />
            <line x1="0" y1="36" x2="-8" y2="52" stroke={INK} strokeWidth="3.4" strokeLinecap="round" />
            <line x1="0" y1="36" x2="8" y2="52" stroke={INK} strokeWidth="3.4" strokeLinecap="round" />
            <ellipse cx="-10" cy="54" rx="5.2" ry="3" fill="#EF4444" stroke={INK} strokeWidth="1.4" />
            <ellipse cx="10" cy="54" rx="5.2" ry="3" fill="#EF4444" stroke={INK} strokeWidth="1.4" />
          </g>
          <text x="64" y="188" textAnchor="middle" className="font-game" fontSize="11" fill="#DC2626">
            “사기야!!”
          </text>

          <line x1="122" y1="34" x2="122" y2="196" stroke="#FDE68A" strokeWidth="2.4" strokeDasharray="4 3" />

          {/* Right: Equally sliced pizza (REAL FRACTION!) */}
          <g transform="translate(178, 72)">
            <circle cx="0" cy="0" r="34" fill="#FDE047" stroke={INK} strokeWidth="2.4" />
            {/* Exact 120-degree slice */}
            <path d="M 0 0 L 0 -34 A 34 34 0 0 1 29.4 17 Z" fill="#86EFAC" stroke={INK} strokeWidth="2" />
            <line x1="0" y1="0" x2="0" y2="-34" stroke={INK} strokeWidth="2.2" />
            <line x1="0" y1="0" x2="29.4" y2="17" stroke={INK} strokeWidth="2.2" />
            <line x1="0" y1="0" x2="-29.4" y2="17" stroke={INK} strokeWidth="2.2" />
            {/* Green O check */}
            <g transform="translate(0, 52)">
              <ComicFraction x={0} y={0} num={1} den={3} scale={0.95} />
              <circle cx="24" cy="0" r="9" fill="none" stroke="#16A34A" strokeWidth="2.6" />
            </g>
          </g>

          {/* Happy Sunglasses black 1-line Jollaman (scaled down to clear 1/3) */}
          <g transform="translate(178, 164) scale(0.66)">
            <circle cx="0" cy="0" r="13" fill="#FFFFFF" stroke={INK} strokeWidth="3" />
            <LoopHair x={0} y={-13} />
            <rect x="-9" y="-4" width="8" height="4.8" rx="1.2" fill={INK} />
            <rect x="1" y="-4" width="8" height="4.8" rx="1.2" fill={INK} />
            <path d="M -4 5 Q 0 8 4 5" fill="none" stroke={INK} strokeWidth="1.8" strokeLinecap="round" />
            <line x1="0" y1="13" x2="0" y2="36" stroke={INK} strokeWidth="4.2" strokeLinecap="round" />
            <path d="M 0 20 L 16 10" stroke={INK} strokeWidth="3.2" strokeLinecap="round" />
            <path d="M 0 20 L -14 28" stroke={INK} strokeWidth="3.2" strokeLinecap="round" />
            <line x1="0" y1="36" x2="-8" y2="52" stroke={INK} strokeWidth="3.4" strokeLinecap="round" />
            <line x1="0" y1="36" x2="8" y2="52" stroke={INK} strokeWidth="3.4" strokeLinecap="round" />
            <ellipse cx="-10" cy="54" rx="5.2" ry="3" fill="#EF4444" stroke={INK} strokeWidth="1.4" />
            <ellipse cx="10" cy="54" rx="5.2" ry="3" fill="#EF4444" stroke={INK} strokeWidth="1.4" />
          </g>

          <text x="120" y="218" textAnchor="middle" className="font-game" fontSize="12.5" fill="#DC2626">
            크기가 다르면 분수가 아냐
          </text>
        </svg>
      );
    }

    /* #14(18): 단위분수 레고 합체! — 내용 대폭 축소 + "3/5은 1/5이 몇 개?" 집중 */
    case 'unit_fraction_lego': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#EFF6FF')} />

          {/* 3 Sharp Comic Lego 1/5 bricks snapping together */}
          {[0, 1, 2].map((idx) => {
            const bx = 18 + idx * 46;
            const by = idx === 2 ? 46 : 56;
            return (
              <g key={idx} transform={`translate(${bx}, ${by})`}>
                <rect x="2.5" y="2.5" width="36" height="44" rx="1.5" fill={shadowInk} />
                <rect x="6" y="-5" width="9" height="5" rx="1" fill="#93C5FD" stroke={INK} strokeWidth="1.8" />
                <rect x="21" y="-5" width="9" height="5" rx="1" fill="#93C5FD" stroke={INK} strokeWidth="1.8" />
                <rect x="0" y="0" width="36" height="44" rx="1.5" fill="#FFFFFF" stroke={INK} strokeWidth="2.4" />
                <ComicFraction x={18} y={22} num={1} den={5} scale={0.78} />
              </g>
            );
          })}

          <text x="128" y="38" textAnchor="middle" className="font-game" fontSize="10.5" fill="#EA580C">
            딸깍!!
          </text>
          <text x="166" y="82" textAnchor="middle" className="font-game" fontSize="16" fill={INK}>
            =
          </text>
          <rect x="183" y="51" width="46" height="54" rx="2" fill={shadowInk} />
          <rect x="180" y="48" width="46" height="54" rx="2" fill={isInkSaving ? '#FFFFFF' : '#FEF08A'} stroke={INK} strokeWidth="2.6" />
          <ComicFraction x={203} y={75} num={3} den={5} scale={1.05} />

          {/* Black 1-line Jollaman */}
          <g transform="translate(38, 134) scale(0.75)">
            <circle cx="0" cy="0" r="14" fill="#FFFFFF" stroke={INK} strokeWidth="3" />
            <LoopHair x={0} y={-14} />
            <rect x="-10" y="-4" width="9" height="5" rx="1.2" fill={INK} />
            <rect x="1" y="-4" width="9" height="5" rx="1.2" fill={INK} />
            <path d="M -4 6 Q 0 9 4 6" fill="none" stroke={INK} strokeWidth="2" />
            <line x1="0" y1="14" x2="0" y2="38" stroke={INK} strokeWidth="4.4" strokeLinecap="round" />
            <path d="M 0 21 L 20 10" stroke={INK} strokeWidth="3.2" strokeLinecap="round" />
            <path d="M 0 21 L -15 12" stroke={INK} strokeWidth="3.2" strokeLinecap="round" />
            <line x1="0" y1="38" x2="-9" y2="55" stroke={INK} strokeWidth="3.4" strokeLinecap="round" />
            <line x1="0" y1="38" x2="9" y2="55" stroke={INK} strokeWidth="3.4" strokeLinecap="round" />
            <ellipse cx="-11" cy="57" rx="5.5" ry="3.2" fill="#EF4444" stroke={INK} strokeWidth="1.4" />
            <ellipse cx="11" cy="57" rx="5.5" ry="3.2" fill="#EF4444" stroke={INK} strokeWidth="1.4" />
          </g>

          {/* Key Question Panel: 3/5은 1/5이 몇 개? */}
          <rect x="75" y="122" width="155" height="74" rx="3" fill={shadowInk} />
          <rect x="72" y="119" width="155" height="74" rx="3" fill="#FFFFFF" stroke={INK} strokeWidth="2.4" />

          <ComicFraction x={87} y={150} num={3} den={5} scale={0.78} />
          <text x="104" y="154" textAnchor="middle" className="font-game" fontSize="12.5" fill={INK}>
            은
          </text>
          <ComicFraction x={120} y={150} num={1} den={5} scale={0.78} />
          <text x="135" y="154" textAnchor="start" className="font-game" fontSize="12" fill="#1D4ED8">
            이 몇 개?
          </text>
          <rect x="191" y="138" width="31" height="24" rx="3" fill="#FEF08A" stroke="#DC2626" strokeWidth="2" />
          <text x="206.5" y="155" textAnchor="middle" className="font-game" fontSize="13.5" fill="#DC2626">
            3개!
          </text>

          <text x="150" y="185" textAnchor="middle" className="font-game" fontSize="10.5" fill="#EA580C">
            ↑ 위 숫자(분자)가 바로 개수!
          </text>

          <text x="120" y="216" textAnchor="middle" className="font-game" fontSize="11.8" fill="#1E40AF">
            분자가 1인 레고 블록 = 단위분수!
          </text>
        </svg>
      );
    }

    /* BOSS: 최종 보스! 다크&골드 보스 스테이지 + 세 분수 줄 세우기 */
    case 'boss_final_gauntlet': {
      const bossStroke = isInkSaving ? INK : '#FFFFFF';
      const bossTextColor = isBw ? INK : isInkSaving ? '#B45309' : '#FDE047';
      const bossShadow = isInkSaving ? '#CBD5E1' : '#FACC15';
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={isInkSaving ? '#FFFFFF' : '#0F172A'} />
          {/* Dramatic boss speed rays & gold lightning */}
          <polygon points="0,0 50,0 120,120 0,90" fill={isInkSaving ? '#F8FAFC' : '#1E293B'} opacity="0.65" />
          <polygon points="240,0 190,0 120,120 240,90" fill={isInkSaving ? '#F8FAFC' : '#1E293B'} opacity="0.65" />
          <path d="M 16 18 L 26 30 L 18 32 L 28 45" fill="none" stroke={isBw ? INK : isInkSaving ? '#D97706' : '#FACC15'} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 224 18 L 214 30 L 222 32 L 212 45" fill="none" stroke={isBw ? INK : isInkSaving ? '#D97706' : '#FACC15'} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />

          <text x="120" y="24" textAnchor="middle" className="font-game" fontSize="13.5" fill={isBw ? INK : isInkSaving ? '#B45309' : '#FACC15'}>
            최종 보스! 작은 순서 줄 세우기
          </text>

          {/* 3 Boss Contenders in sharp gold-shadowed frames */}
          <g transform="translate(48, 66)">
            <rect x="-29" y="-23" width="64" height="52" rx="2" fill={bossShadow} />
            <rect x="-32" y="-26" width="64" height="52" rx="2" fill="#FFFFFF" stroke={INK} strokeWidth="2.4" />
            <ComicFraction x={8} y={0} whole={1} num={3} den={4} scale={0.86} />
          </g>
          <g transform="translate(120, 66)">
            <rect x="-25" y="-23" width="56" height="52" rx="2" fill={bossShadow} />
            <rect x="-28" y="-26" width="56" height="52" rx="2" fill="#FFFFFF" stroke={INK} strokeWidth="2.4" />
            <ComicFraction x={0} y={0} num={9} den={4} scale={0.92} />
          </g>
          <g transform="translate(192, 66)">
            <rect x="-25" y="-23" width="56" height="52" rx="2" fill={bossShadow} />
            <rect x="-28" y="-26" width="56" height="52" rx="2" fill="#FFFFFF" stroke={INK} strokeWidth="2.4" />
            <ComicFraction x={0} y={0} num={4} den={4} scale={0.92} />
          </g>

          {/* Hero black 1-line Jollaman with red headband */}
          <g transform="translate(36, 134) scale(0.76)">
            <circle cx="0" cy="0" r="14" fill="#FFFFFF" stroke={isInkSaving ? INK : '#FACC15'} strokeWidth="3" />
            <LoopHair x={0} y={-14} color={isInkSaving ? INK : '#FACC15'} />
            <rect x="-13" y="-7" width="26" height="4" rx="1" fill="#EF4444" />
            <path d="M -13 -5 L -22 -9 M -13 -3 L -21 -2" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="-4" cy="0" r="1.8" fill={INK} />
            <circle cx="4" cy="0" r="1.8" fill={INK} />
            <path d="M -4 6 Q 0 9 4 6" fill="none" stroke={INK} strokeWidth="1.8" />
            <line x1="0" y1="14" x2="0" y2="38" stroke={bossStroke} strokeWidth="4.4" strokeLinecap="round" />
            <path d="M 0 21 L 24 16" stroke={bossStroke} strokeWidth="3.2" strokeLinecap="round" />
            <path d="M 0 21 L -14 29" stroke={bossStroke} strokeWidth="3.2" strokeLinecap="round" />
            <line x1="0" y1="38" x2="-9" y2="55" stroke={bossStroke} strokeWidth="3.4" strokeLinecap="round" />
            <line x1="0" y1="38" x2="9" y2="55" stroke={bossStroke} strokeWidth="3.4" strokeLinecap="round" />
            <ellipse cx="-11" cy="57" rx="5.5" ry="3.2" fill="#EF4444" stroke={isInkSaving ? INK : '#FFFFFF'} strokeWidth="1.2" />
            <ellipse cx="11" cy="57" rx="5.5" ry="3.2" fill="#EF4444" stroke={isInkSaving ? INK : '#FFFFFF'} strokeWidth="1.2" />
          </g>

          <text x="144" y="120" textAnchor="middle" className="font-game" fontSize="11.5" fill={bossTextColor}>
            “전부 가분수로 변신하면 1초 컷!”
          </text>

          {/* Crisp white podium for blank boxes */}
          <rect x="64" y="132" width="164" height="60" rx="2" fill={bossShadow} />
          <rect x="61" y="129" width="164" height="60" rx="2" fill="#FFFFFF" stroke={INK} strokeWidth="2.4" />
          <BlankFractionBox x={87} y={159} />
          <text x="115" y="164" textAnchor="middle" className="font-game" fontSize="18" fill="#DC2626">
            &lt;
          </text>
          <BlankFractionBox x={144} y={159} />
          <text x="172" y="164" textAnchor="middle" className="font-game" fontSize="18" fill="#DC2626">
            &lt;
          </text>
          <BlankFractionBox x={200} y={159} />

          <text x="120" y="214" textAnchor="middle" className="font-game" fontSize="12" fill={bossTextColor}>
            가장 작은 것부터 빈칸에 써 보자!
          </text>
        </svg>
      );
    }

    /* 21 PRAISE: 완주 기념 칭찬 포카 (히든 완주보상 SSR) */
    case 'praise_reward_master': {
      const goldAccent = isBw ? INK : isInkSaving ? '#B45309' : '#FACC15';
      const goldText = isBw ? INK : isInkSaving ? '#B45309' : '#FDE047';
      const rayFill = isInkSaving ? '#F8FAFC' : '#332C14';
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={isInkSaving ? '#FFFFFF' : '#0F172A'} />

          {/* Sunburst gold rays from center */}
          <g opacity={isInkSaving ? '0.6' : '0.45'}>
            <polygon points="120,96 0,0 38,0" fill={rayFill} />
            <polygon points="120,96 76,0 112,0" fill={rayFill} />
            <polygon points="120,96 142,0 176,0" fill={rayFill} />
            <polygon points="120,96 208,0 240,0 240,34" fill={rayFill} />
            <polygon points="120,96 240,70 240,115" fill={rayFill} />
            <polygon points="120,96 0,68 0,112" fill={rayFill} />
          </g>

          {/* Golden L-shaped corner brackets */}
          <path d="M 8 20 L 8 8 L 20 8" fill="none" stroke={goldAccent} strokeWidth="2.4" />
          <path d="M 220 8 L 232 8 L 232 20" fill="none" stroke={goldAccent} strokeWidth="2.4" />
          <path d="M 8 210 L 8 222 L 20 222" fill="none" stroke={goldAccent} strokeWidth="2.4" />
          <path d="M 220 222 L 232 222 L 232 210" fill="none" stroke={goldAccent} strokeWidth="2.4" />

          {/* Top Crown + Title */}
          <polygon
            points="103,28 106,14 114,22 120,12 126,22 134,14 137,28"
            fill={goldAccent}
            stroke={isInkSaving ? INK : '#FACC15'}
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          <text x="120" y="46" textAnchor="middle" className="font-game" fontSize="14.5" fill={goldText}>
            3학년 2학기 4단원 완주!!
          </text>

          {/* Left: Champion Sunglasses Jollaman with gold halo & red hero cape */}
          <g transform="translate(64, 90)">
            {/* Red hero shoulders/cape */}
            <path d="M -16 24 Q 0 14 16 24 L 22 36 L -22 36 Z" fill="#EF4444" stroke={INK} strokeWidth="1.8" />
            {/* Head */}
            <circle cx="0" cy="0" r="17" fill="#FFFFFF" stroke={goldAccent} strokeWidth="3.2" />
            <LoopHair x={0} y={-17} color={goldAccent} />
            <rect x="-11" y="-5" width="9.5" height="5.5" rx="1.5" fill={INK} />
            <rect x="1.5" y="-5" width="9.5" height="5.5" rx="1.5" fill={INK} />
            <line x1="-1.5" y1="-2.2" x2="1.5" y2="-2.2" stroke={INK} strokeWidth="1.6" />
            <path d="M -5 6 Q 0 11 5 6" fill="none" stroke={INK} strokeWidth="2.2" strokeLinecap="round" />
            {/* Raised cheering arm */}
            <path d="M 14 21 L 26 8" stroke={goldAccent} strokeWidth="3.4" strokeLinecap="round" />
            <circle cx="27" cy="7" r="3.6" fill="#FFFFFF" stroke={goldAccent} strokeWidth="1.8" />
          </g>

          {/* Right: Golden SSR Champion Trophy */}
          <g transform="translate(174, 88)">
            {/* Trophy Handles */}
            <path d="M -18 -14 C -30 -14, -30 4, -15 4" fill="none" stroke={goldAccent} strokeWidth="3" strokeLinecap="round" />
            <path d="M 18 -14 C 30 -14, 30 4, 15 4" fill="none" stroke={goldAccent} strokeWidth="3" strokeLinecap="round" />
            {/* Trophy Cup */}
            <path
              d="M -20 -18 L 20 -18 L 15 8 C 12 16, -12 16, -15 8 Z"
              fill={isInkSaving ? '#FEF08A' : '#FACC15'}
              stroke={INK}
              strokeWidth="2.2"
              strokeLinejoin="round"
            />
            <text x="0" y="-2" textAnchor="middle" className="font-game" fontSize="11.5" fill={INK}>
              SSR!
            </text>
            {/* Trophy Stem & Pedestal */}
            <rect x="-4" y="13" width="8" height="10" fill={goldAccent} stroke={INK} strokeWidth="1.6" />
            <rect x="-14" y="23" width="28" height="8" rx="1.5" fill={goldAccent} stroke={INK} strokeWidth="1.8" />
          </g>

          {/* Center-lower Master Certificate Box */}
          <rect x="23" y="121" width="198" height="68" rx="4" fill={isInkSaving ? '#CBD5E1' : '#000000'} />
          <rect x="20" y="118" width="198" height="68" rx="4" fill="#FFFFFF" stroke={INK} strokeWidth="2.4" />
          <text x="119" y="138" textAnchor="middle" className="font-game" fontSize="12.5" fill="#1D4ED8">
            멋진 도전자, 분수 올 클리어!
          </text>
          <text x="119" y="156" textAnchor="middle" className="font-body font-bold" fontSize="10.2" fill="#334155">
            3-2 분수 개념 포카 완전 정복!
          </text>
          <text x="119" y="174" textAnchor="middle" className="font-game" fontSize="10.2" fill="#DC2626">
            ★ 졸라수학맨 공식 마스터 인증 ★
          </text>

          {/* Bottom Champion Title */}
          <text x="120" y="211" textAnchor="middle" className="font-game" fontSize="13.5" fill={goldText}>
            전설의 분수 챔피언 등극!!
          </text>
        </svg>
      );
    }

    /* 00 GUIDE: 졸라분수맨 포카 도감 설명서 (만화책 표지 스타일 + 역할/희귀도 피라미드) */
    case 'guide_deck_manual': {
      const legend = [
        { color: '#2563EB', tag: '기본', rank: '★ N', desc: '단원 필수 기본기 (9장)' },
        { color: '#059669', tag: '필살', rank: '★★ R', desc: '변신·비교 필살기 (4장)' },
        { color: '#D97706', tag: '핵심', rank: '★★★ SR', desc: '어부바·분모고정 (2장)' },
        { color: '#EA580C', tag: '함정', rank: '★★★ SR', desc: '사기피자·수직선 (2장)' },
        { color: '#0F172A', tag: '보스·칭찬', rank: '★★★★ SSR', desc: '최종보스·완주보상 (2장)' },
      ];
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#F8FAFC')} />

          {/* Header with Mini Mascot Jollaman */}
          <g transform="translate(28, 28) scale(0.7)">
            <circle cx="0" cy="0" r="14" fill="#FFFFFF" stroke={INK} strokeWidth="3" />
            <LoopHair x={0} y={-14} />
            <rect x="-10" y="-4" width="9" height="5" rx="1.2" fill={INK} />
            <rect x="1" y="-4" width="9" height="5" rx="1.2" fill={INK} />
            <path d="M -4 6 Q 0 9 4 6" fill="none" stroke={INK} strokeWidth="2" />
            <line x1="0" y1="14" x2="0" y2="36" stroke={INK} strokeWidth="4.2" strokeLinecap="round" />
            <path d="M 0 20 L 16 10" stroke={INK} strokeWidth="3" strokeLinecap="round" />
            <path d="M 0 20 L -14 26" stroke={INK} strokeWidth="3" strokeLinecap="round" />
            <line x1="0" y1="36" x2="-7" y2="52" stroke={INK} strokeWidth="3.2" strokeLinecap="round" />
            <line x1="0" y1="36" x2="7" y2="52" stroke={INK} strokeWidth="3.2" strokeLinecap="round" />
            <ellipse cx="-9" cy="54" rx="5" ry="2.8" fill="#EF4444" stroke={INK} strokeWidth="1.2" />
            <ellipse cx="9" cy="54" rx="5" ry="2.8" fill="#EF4444" stroke={INK} strokeWidth="1.2" />
          </g>

          <text x="136" y="23" textAnchor="middle" className="font-game" fontSize="13.5" fill={INK}>
            졸라분수맨 포카 도감!
          </text>
          <text x="136" y="40" textAnchor="middle" className="font-game" fontSize="9.8" fill="#EA580C">
            오늘도 숫자한테 당하는 분수맨 모으기!
          </text>

          {/* 1. Order bar */}
          <rect x="12" y="54" width="220" height="30" rx="2" fill={shadowInk} />
          <rect x="10" y="52" width="220" height="30" rx="2" fill={isInkSaving ? '#FFFFFF' : '#FEF08A'} stroke={INK} strokeWidth="2.2" />
          <text x="120" y="71" textAnchor="middle" className="font-game" fontSize="9.6" fill={INK}>
            순서: 기초 → 변신·비교 → 수직선 → 완주
          </text>

          {/* 2. Role & Rarity Table */}
          <rect x="12" y="94" width="220" height="128" rx="2" fill={shadowInk} />
          <rect x="10" y="92" width="220" height="128" rx="2" fill="#FFFFFF" stroke={INK} strokeWidth="2.4" />
          <text x="20" y="109" className="font-game" fontSize="10.5" fill={INK}>
            역할 &amp; 희귀도 피라미드 (표지 1 + 19장)
          </text>
          {legend.map((row, idx) => {
            const ry = 127 + idx * 20;
            return (
              <g key={row.tag}>
                <rect x="16" y={ry - 7.5} width="9" height="9" rx="1" fill={row.color} stroke={INK} strokeWidth="1.3" />
                <text x="29" y={ry} className="font-game" fontSize="8.8" fill={row.color}>
                  {row.tag}
                </text>
                <text x="76" y={ry} className="font-mono-num font-bold" fontSize="7.4" fill={INK}>
                  {row.rank}
                </text>
                <text x="129" y={ry} className="font-body font-bold" fontSize="8.2" fill="#475569">
                  {row.desc}
                </text>
              </g>
            );
          })}
        </svg>
      );
    }

    default:
      return null;
  }
};
