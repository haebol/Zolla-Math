import React from 'react';
import { EpisodeSceneType, PrintInkMode } from '../types/card';

interface FracMulComicSceneProps {
  sceneType: EpisodeSceneType;
  inkMode?: PrintInkMode;
}

const INK = '#141B29';

const LoopHair: React.FC<{ x?: number; y?: number; color?: string }> = ({
  x = 0,
  y = -13,
  color = INK,
}) => (
  <path
    d={`M ${x} ${y} C ${x - 2} ${y - 8}, ${x + 7} ${y - 8}, ${x + 4.5} ${y}`}
    fill="none"
    stroke={color}
    strokeWidth="2.2"
    strokeLinecap="round"
  />
);

type StickPose = 'sunglasses' | 'happy' | 'headband' | 'hero' | 'panic' | 'crying' | 'strain' | 'punch';

const Stickman: React.FC<{
  x: number;
  y: number;
  scale?: number;
  rotate?: number;
  pose?: StickPose;
  armL?: [number, number];
  armR?: [number, number];
  legL?: [number, number];
  legR?: [number, number];
  sweat?: boolean;
  strokeColor?: string;
}> = ({
  x,
  y,
  scale = 1,
  rotate = 0,
  pose = 'sunglasses',
  armL,
  armR,
  legL,
  legR,
  sweat = false,
  strokeColor = INK,
}) => {
  const headR = 13.5;
  const isHero = pose === 'hero';
  const hasHeadband = pose === 'headband' || isHero || pose === 'punch';

  const resolvedArmL: [number, number] = armL ?? [-14, 24];
  const resolvedArmR: [number, number] = armR ?? [14, 10];
  const resolvedLegL: [number, number] = legL ?? [-9, 50];
  const resolvedLegR: [number, number] = legR ?? [9, 50];
  const shoeColor = isHero ? '#FACC15' : '#EF4444';

  return (
    <g transform={`translate(${x}, ${y}) rotate(${rotate}) scale(${scale})`}>
      {isHero && (
        <polygon
          points="-2,16 -22,34 -13,44 -1,31"
          fill="#EF4444"
          stroke={INK}
          strokeWidth="2"
          strokeLinejoin="round"
        />
      )}

      {hasHeadband && (
        <path
          d={`M ${-headR + 1} -6 L ${-headR - 8} -9 Q ${-headR - 11} -6 ${-headR - 9} -2`}
          fill="none"
          stroke="#EF4444"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
      )}

      <circle
        cx="0"
        cy="0"
        r={headR}
        fill="#FFFFFF"
        stroke={strokeColor}
        strokeWidth="2.8"
      />
      <LoopHair x={0} y={-headR} color={strokeColor} />

      {hasHeadband && (
        <path
          d={`M ${-headR + 0.5} -5.5 Q 0 -3.5 ${headR - 0.5} -5.5`}
          fill="none"
          stroke="#EF4444"
          strokeWidth="3.6"
          strokeLinecap="round"
        />
      )}

      {sweat && (
        <path
          d="M 14 -10 Q 17 -6 15 -2 Q 12 -3 14 -10 Z"
          fill="#38BDF8"
          stroke={INK}
          strokeWidth="1.2"
        />
      )}

      {pose === 'sunglasses' && (
        <g>
          <rect x="-10" y="-4" width="9" height="6" rx="1" fill={INK} />
          <rect x="1" y="-4" width="9" height="6" rx="1" fill={INK} />
          <line x1="-1" y1="-1" x2="1" y2="-1" stroke={INK} strokeWidth="2" />
          <path d="M -5 6 Q 0 10 6 5" fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" />
        </g>
      )}
      {pose === 'happy' && (
        <g>
          <path d="M -7 -2 Q -4.5 -5 -2 -2" fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" />
          <path d="M 2 -2 Q 4.5 -5 7 -2" fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" />
          <path d="M -5 4.5 Q 0 10 5 4.5 Z" fill="#EF4444" stroke={INK} strokeWidth="1.5" />
        </g>
      )}
      {pose === 'panic' && (
        <g>
          <circle cx="-4.8" cy="-2" r="2.8" fill="#FFFFFF" stroke={INK} strokeWidth="1.6" />
          <circle cx="-4.8" cy="-2" r="1" fill={INK} />
          <circle cx="4.8" cy="-2" r="2.8" fill="#FFFFFF" stroke={INK} strokeWidth="1.6" />
          <circle cx="4.8" cy="-2" r="1" fill={INK} />
          <ellipse cx="0" cy="6.2" rx="3.2" ry="4" fill="#EF4444" stroke={INK} strokeWidth="1.5" />
        </g>
      )}
      {pose === 'crying' && (
        <g>
          <path d="M -7 -3 L -3.5 -0.5 L -7 2" fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" />
          <path d="M 7 -3 L 3.5 -0.5 L 7 2" fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" />
          <path d="M -7 2.5 L -11 12" stroke="#38BDF8" strokeWidth="2.8" strokeLinecap="round" />
          <path d="M 7 2.5 L 11 12" stroke="#38BDF8" strokeWidth="2.8" strokeLinecap="round" />
          <circle cx="-11.5" cy="15" r="1.6" fill="#38BDF8" />
          <circle cx="11.5" cy="15" r="1.6" fill="#38BDF8" />
          <ellipse cx="0" cy="7.5" rx="3" ry="2.2" fill="#EF4444" />
        </g>
      )}
      {pose === 'strain' && (
        <g>
          <polyline points="-8,-4 -3,-1 -8,2" fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <polyline points="8,-4 3,-1 8,2" fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M -4 6 Q 0 3 4 6" fill="none" stroke={INK} strokeWidth="1.9" strokeLinecap="round" />
        </g>
      )}
      {(pose === 'headband' || isHero || pose === 'punch') && (
        <g>
          <line x1="-8" y1="-2" x2="-2" y2="-0.5" stroke={INK} strokeWidth="2" strokeLinecap="round" />
          <line x1="8" y1="-2" x2="2" y2="-0.5" stroke={INK} strokeWidth="2" strokeLinecap="round" />
          <circle cx="-4.8" cy="1" r="1.7" fill={INK} />
          <circle cx="4.8" cy="1" r="1.7" fill={INK} />
          <path d="M -3.5 7 Q 0 4.5 3.5 7" fill="none" stroke={INK} strokeWidth="1.9" strokeLinecap="round" />
        </g>
      )}

      <line x1="0" y1={headR} x2="0" y2="34" stroke={strokeColor} strokeWidth="3.2" strokeLinecap="round" />
      <line x1="0" y1="20" x2={resolvedArmL[0]} y2={resolvedArmL[1]} stroke={strokeColor} strokeWidth="2.6" strokeLinecap="round" />
      <line x1="0" y1="20" x2={resolvedArmR[0]} y2={resolvedArmR[1]} stroke={strokeColor} strokeWidth="2.6" strokeLinecap="round" />
      <circle cx={resolvedArmL[0]} cy={resolvedArmL[1]} r="2.6" fill="#FFFFFF" stroke={INK} strokeWidth="1.5" />
      <circle cx={resolvedArmR[0]} cy={resolvedArmR[1]} r="2.6" fill="#FFFFFF" stroke={INK} strokeWidth="1.5" />

      <line x1="0" y1="34" x2={resolvedLegL[0]} y2={resolvedLegL[1]} stroke={strokeColor} strokeWidth="2.8" strokeLinecap="round" />
      <line x1="0" y1="34" x2={resolvedLegR[0]} y2={resolvedLegR[1]} stroke={strokeColor} strokeWidth="2.8" strokeLinecap="round" />
      <ellipse cx={resolvedLegL[0] - 2} cy={resolvedLegL[1] + 1.5} rx="4.6" ry="2.5" fill={shoeColor} stroke={INK} strokeWidth="1.3" />
      <ellipse cx={resolvedLegR[0] + 2} cy={resolvedLegR[1] + 1.5} rx="4.6" ry="2.5" fill={shoeColor} stroke={INK} strokeWidth="1.3" />
    </g>
  );
};

/* 감전 뼈다귀 졸라맨 */
const SkeletonJollaman: React.FC<{ x: number; y: number; scale?: number }> = ({
  x,
  y,
  scale = 1,
}) => (
  <g transform={`translate(${x}, ${y}) scale(${scale})`}>
    <path d="M -9 -14 L -5 -21 L 0 -15 L 5 -21 L 9 -14" fill="none" stroke="#FACC15" strokeWidth="2.2" />
    <circle cx="0" cy="0" r="13" fill="#FFFFFF" stroke={INK} strokeWidth="2.8" />
    <circle cx="-4.8" cy="-2" r="2.1" fill={INK} />
    <circle cx="4.8" cy="-2" r="2.1" fill={INK} />
    <line x1="0" y1="13" x2="0" y2="36" stroke="#FFFFFF" strokeWidth="3.8" strokeLinecap="round" />
    <line x1="0" y1="13" x2="0" y2="36" stroke={INK} strokeWidth="2.4" strokeLinecap="round" />
    <line x1="-6" y1="20" x2="6" y2="20" stroke={INK} strokeWidth="2.2" strokeLinecap="round" />
    <line x1="-5" y1="26" x2="5" y2="26" stroke={INK} strokeWidth="2.2" strokeLinecap="round" />
    <line x1="-4" y1="32" x2="4" y2="32" stroke={INK} strokeWidth="2.2" strokeLinecap="round" />
    <path d="M 0 18 L -16 10" stroke={INK} strokeWidth="3" strokeLinecap="round" />
    <path d="M 0 18 L 16 10" stroke={INK} strokeWidth="3" strokeLinecap="round" />
    <circle cx="-17" cy="10" r="3" fill="#FFFFFF" stroke={INK} strokeWidth="1.5" />
    <circle cx="17" cy="10" r="3" fill="#FFFFFF" stroke={INK} strokeWidth="1.5" />
    <line x1="0" y1="36" x2="-8" y2="50" stroke={INK} strokeWidth="3" strokeLinecap="round" />
    <line x1="0" y1="36" x2="8" y2="50" stroke={INK} strokeWidth="3" strokeLinecap="round" />
    <ellipse cx="-10" cy="52" rx="5" ry="2.8" fill="#EF4444" stroke={INK} strokeWidth="1.3" />
    <ellipse cx="10" cy="52" rx="5" ry="2.8" fill="#EF4444" stroke={INK} strokeWidth="1.3" />
  </g>
);

/* 깔끔한 세로 분수 컴포넌트 */
const Frac: React.FC<{
  x: number;
  y: number;
  num: string | number;
  den: string | number;
  whole?: string | number;
  scale?: number;
  barWidth?: number;
  numColor?: string;
  denColor?: string;
  wholeColor?: string;
}> = ({
  x,
  y,
  num,
  den,
  whole,
  scale = 1,
  barWidth = 24,
  numColor = '#EA580C',
  denColor = '#1D4ED8',
  wholeColor = '#047857',
}) => (
  <g transform={`translate(${x}, ${y}) scale(${scale})`}>
    {whole !== undefined && whole !== '' && (
      <text x={-barWidth / 2 - 9} y="6" textAnchor="middle" className="font-game" fontSize="20" fill={wholeColor}>
        {whole}
      </text>
    )}
    <text x="0" y="-5" textAnchor="middle" className="font-game" fontSize="16" fill={numColor}>
      {num}
    </text>
    <line x1={-barWidth / 2} y1="0" x2={barWidth / 2} y2="0" stroke={INK} strokeWidth="2.4" strokeLinecap="round" />
    <text x="0" y="16" textAnchor="middle" className="font-game" fontSize="16" fill={denColor}>
      {den}
    </text>
  </g>
);

export const FracMulComicScene: React.FC<FracMulComicSceneProps> = ({
  sceneType,
  inkMode = 'full',
}) => {
  const isLightPrint = inkMode !== 'full';
  const isBw = inkMode === 'bw_worksheet';

  const softBg = (hex: string) => (isLightPrint ? '#FFFFFF' : hex);
  const hlBg = (hex: string) => (isLightPrint ? '#F8FAFC' : hex);
  const shadowInk = isLightPrint ? '#CBD5E1' : INK;

  switch (sceneType) {
    /* 00. 5-2 분수의 곱셈 도감 설명서 */
    case 'fracmul_guide': {
      const legend = [
        { color: '#2563EB', tag: '기본', rank: '★ N', desc: '크기같은 분수 · 진분수×자연수 (3장)' },
        { color: '#059669', tag: '필살', rank: '★★ R', desc: '약분·통분 ㄴ법 · 넓이 · 대각선약분 (6장)' },
        { color: '#D97706', tag: '핵심', rank: '★★★ SR', desc: '통분·약분 이유 · 크기 어림하기 (3장)' },
        { color: '#EA580C', tag: '함정/도전', rank: '★★★ SR', desc: '분모곱 땡 · 대분수 쪼개기 · 세분수 (4장)' },
        { color: '#0F172A', tag: '보스/칭찬', rank: '★★★★ SSR', desc: '3관문 보스 + 마스터 인증 (2장)' },
      ];
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#FFFDF2')} />

          <Frac x={34} y={36} num={3} den={4} scale={0.92} />
          <text x="53" y="42" textAnchor="middle" className="font-game" fontSize="14" fill="#DC2626">
            ×
          </text>
          <Frac x={70} y={36} num={2} den={5} scale={0.92} />
          <Stickman x={100} y={26} scale={0.62} pose="hero" armL={[-13, 12]} armR={[15, 4]} legL={[-8, 40]} legR={[8, 40]} />

          <text x="174" y="30" textAnchor="middle" className="font-game" fontSize="12.5" fill={INK}>
            분수곱셈 도감!
          </text>
          <text x="174" y="47" textAnchor="middle" className="font-body font-bold" fontSize="8.4" fill="#2563EB">
            5학년 2학기 2단원 (19장)
          </text>

          <rect x="12" y="68" width="218" height="22" rx="2" fill={shadowInk} />
          <rect x="10" y="66" width="218" height="22" rx="2" fill={hlBg('#FEF08A')} stroke={INK} strokeWidth="2" />
          <text x="119" y="81" textAnchor="middle" className="font-game" fontSize="9.1" fill={INK}>
            선수학습 약분·통분(01~07) → 곱셈 마스터(08~18)
          </text>

          <rect x="12" y="100" width="218" height="122" rx="2" fill={shadowInk} />
          <rect x="10" y="98" width="218" height="122" rx="2" fill="#FFFFFF" stroke={INK} strokeWidth="2.2" />
          <text x="20" y="114" className="font-game" fontSize="9.8" fill={INK}>
            카드 등급표 (표지 1 + 학습·칭찬 18장)
          </text>
          {legend.map((row, idx) => {
            const ry = 133 + idx * 18.2;
            return (
              <g key={row.tag}>
                <rect x="16" y={ry - 7.5} width="8.5" height="8.5" rx="1" fill={row.color} stroke={INK} strokeWidth="1.2" />
                <text x="28" y={ry} className="font-game" fontSize="7.9" fill={row.color}>
                  {row.tag}
                </text>
                <text x="66" y={ry} className="font-mono-num font-bold" fontSize="6.6" fill={INK}>
                  {row.rank}
                </text>
                <text x="105" y={ry} className="font-body font-bold" fontSize="6.6" fill="#475569">
                  {row.desc}
                </text>
              </g>
            );
          })}
        </svg>
      );
    }

    /* 01. [선수학습] 크기가 같은 분수 만들기 (1/2 = 2/4 = 3/6) */
    case 'fracmul_equiv_fraction': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#EFF6FF')} />

          <text x="120" y="22" textAnchor="middle" className="font-game" fontSize="13.5" fill="#1D4ED8">
            조각 수만 달라도 먹은 양은 똑같아!
          </text>

          {/* Top 3 Pizza circles showing exact same half shaded! */}
          {/* 1/2 */}
          <g transform="translate(42, 66)">
            <circle cx="0" cy="0" r="24" fill="#FFFFFF" stroke={INK} strokeWidth="2" />
            <path d="M 0 -24 A 24 24 0 0 0 0 24 Z" fill="#FDE047" stroke={INK} strokeWidth="1.8" />
            <line x1="0" y1="-24" x2="0" y2="24" stroke={INK} strokeWidth="1.8" />
          </g>
          {/* 2/4 */}
          <g transform="translate(120, 66)">
            <circle cx="0" cy="0" r="24" fill="#FFFFFF" stroke={INK} strokeWidth="2" />
            <path d="M 0 -24 A 24 24 0 0 0 0 24 Z" fill="#FDE047" stroke={INK} strokeWidth="1.8" />
            <line x1="0" y1="-24" x2="0" y2="24" stroke={INK} strokeWidth="1.8" />
            <line x1="-24" y1="0" x2="24" y2="0" stroke={INK} strokeWidth="1.8" />
          </g>
          {/* 3/6 */}
          <g transform="translate(198, 66)">
            <circle cx="0" cy="0" r="24" fill="#FFFFFF" stroke={INK} strokeWidth="2" />
            <path d="M 0 -24 A 24 24 0 0 0 0 24 Z" fill="#FDE047" stroke={INK} strokeWidth="1.8" />
            <line x1="0" y1="-24" x2="0" y2="24" stroke={INK} strokeWidth="1.6" />
            <line x1="-20.8" y1="-12" x2="20.8" y2="12" stroke={INK} strokeWidth="1.6" />
            <line x1="-20.8" y1="12" x2="20.8" y2="-12" stroke={INK} strokeWidth="1.6" />
          </g>

          {/* Bottom Equations with top & bottom ×2 / ×3 arrows */}
          <Frac x={42} y={136} num={1} den={2} scale={1.08} />
          <text x="80" y="142" textAnchor="middle" className="font-game" fontSize="18" fill={INK}>
            =
          </text>
          <Frac x={120} y={136} num={2} den={4} scale={1.08} />
          <text x="160" y="142" textAnchor="middle" className="font-game" fontSize="18" fill={INK}>
            =
          </text>
          <Frac x={198} y={136} num={3} den={6} scale={1.08} />

          {/* Top ×2, ×3 curved arrows */}
          <path d="M 46 112 Q 80 96 114 112" fill="none" stroke="#EA580C" strokeWidth="2.2" />
          <text x="80" y="102" textAnchor="middle" className="font-game" fontSize="10" fill="#EA580C">
            ×2
          </text>
          <path d="M 46 164 Q 120 184 194 164" fill="none" stroke="#2563EB" strokeWidth="2.2" />
          <text x="120" y="185" textAnchor="middle" className="font-game" fontSize="10" fill="#2563EB">
            위·아래 똑같이 ×2, ×3!
          </text>

          <Stickman x={34} y={168} scale={0.56} pose="sunglasses" armL={[-13, 14]} armR={[15, 2]} legL={[-7, 36]} legR={[7, 36]} />

          <text x="132" y="214" textAnchor="middle" className="font-game" fontSize="11.2" fill={INK}>
            분모·분자에 <tspan fill="#DC2626">같은 수</tspan> 곱하고 나누면 크기 그대로!
          </text>
        </svg>
      );
    }

    /* 02. [선수학습] 약분 & 한 번에 기약분수! (최대공약수 활용) */
    case 'fracmul_reduce_gcd': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#ECFDF5')} />

          <text x="120" y="22" textAnchor="middle" className="font-game" fontSize="13.2" fill="#047857">
            최대공약수로 한 방에 기약분수!!
          </text>

          {/* Left: 12/18 */}
          <Frac x={36} y={96} num={12} den={18} scale={1.15} barWidth={28} />

          {/* Top Slow Path: ÷2 -> 6/9 -> ÷3 -> 2/3 */}
          <path d="M 56 80 Q 82 54 108 66" fill="none" stroke="#94A3B8" strokeWidth="2.2" strokeDasharray="3 2" />
          <text x="80" y="54" textAnchor="middle" className="font-game" fontSize="9.5" fill="#64748B">
            ÷2 (헥헥)
          </text>
          <Frac x={122} y={66} num={6} den={9} scale={0.88} numColor="#64748B" denColor="#64748B" />
          <path d="M 138 66 Q 164 54 188 76" fill="none" stroke="#94A3B8" strokeWidth="2.2" strokeDasharray="3 2" />
          <text x="164" y="54" textAnchor="middle" className="font-game" fontSize="9.5" fill="#64748B">
            또 ÷3
          </text>
          <Stickman x={152} y={92} scale={0.44} pose="strain" sweat armL={[-13, 14]} armR={[13, 14]} legL={[-7, 34]} legR={[7, 34]} />

          {/* Bottom Fast Path: Hero Jollaman GCD ÷6 Laser! */}
          <path d="M 52 118 Q 118 168 184 114" fill="none" stroke="#DC2626" strokeWidth="3.2" strokeLinecap="round" />
          <path d="M 176 114 L 186 112 L 182 122" fill="none" stroke="#DC2626" strokeWidth="2.8" strokeLinecap="round" />
          <text x="118" y="160" textAnchor="middle" className="font-game" fontSize="11.5" fill="#DC2626">
            최대공약수 ÷6 한 방!!
          </text>

          {/* Final 2/3 glowing */}
          <circle cx="204" cy="96" r="24" fill={hlBg('#FEF08A')} stroke="#059669" strokeWidth="2.4" />
          <Frac x={204} y={96} num={2} den={3} scale={1.08} />
          <text x="204" y="132" textAnchor="middle" className="font-game" fontSize="10.5" fill="#047857">
            기약분수!
          </text>

          <Stickman x={44} y={146} scale={0.68} pose="hero" armL={[-13, 14]} armR={[18, 2]} legL={[-8, 38]} legR={[8, 38]} />

          <text x="132" y="192" textAnchor="middle" className="font-game" fontSize="11" fill="#047857">
            더 이상 공약수(1뿐!)가 없을 때까지!
          </text>
          <text x="120" y="214" textAnchor="middle" className="font-game" fontSize="11.5" fill={INK}>
            <tspan fill="#DC2626">최대공약수</tspan>로 나누면 한 방에 기약분수!
          </text>
        </svg>
      );
    }

    /* 03. [선수학습] 분수 덧셈에 통분이 필요한 이유! */
    case 'fracmul_why_common_denom': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#FFFBEB')} />

          <text x="120" y="22" textAnchor="middle" className="font-game" fontSize="13.2" fill="#B45309">
            왜 분수 덧셈엔 통분이 필요할까?
          </text>

          {/* Top: Mismatched slice sizes! 1/2 + 1/3 */}
          <g transform="translate(46, 62)">
            <circle cx="0" cy="0" r="20" fill="#FFFFFF" stroke={INK} strokeWidth="2" />
            <path d="M 0 -20 A 20 20 0 0 0 0 20 Z" fill="#93C5FD" stroke={INK} strokeWidth="1.6" />
          </g>
          <text x="74" y="68" textAnchor="middle" className="font-game" fontSize="15" fill={INK}>
            +
          </text>
          <g transform="translate(102, 62)">
            <circle cx="0" cy="0" r="20" fill="#FFFFFF" stroke={INK} strokeWidth="2" />
            <path d="M 0 0 L 0 -20 A 20 20 0 0 1 17.3 10 Z" fill="#FDBA74" stroke={INK} strokeWidth="1.6" />
          </g>

          <Stickman x={144} y={56} scale={0.58} pose="panic" sweat armL={[-14, 6]} armR={[14, 6]} legL={[-7, 34]} legR={[7, 34]} />
          <text x="196" y="58" textAnchor="middle" className="font-game" fontSize="10.5" fill="#DC2626">
            크기가 달라!
          </text>
          <text x="196" y="74" textAnchor="middle" className="font-game" fontSize="10.5" fill="#DC2626">
            못 세겠어!!
          </text>

          {/* Conversion arrow down */}
          <path d="M 120 90 L 120 110" stroke="#059669" strokeWidth="2.8" strokeLinecap="round" />
          <path d="M 114 104 L 120 112 L 126 104" fill="none" stroke="#059669" strokeWidth="2.6" strokeLinecap="round" />
          <text x="166" y="106" textAnchor="middle" className="font-game" fontSize="10.8" fill="#059669">
            통분! (6조각 맞추기)
          </text>

          {/* Bottom: Matching 6-slice pies! 3/6 + 2/6 = 5/6 */}
          <g transform="translate(46, 146)">
            <circle cx="0" cy="0" r="20" fill="#FFFFFF" stroke="#059669" strokeWidth="2" />
            <path d="M 0 -20 A 20 20 0 0 0 0 20 Z" fill="#93C5FD" stroke={INK} strokeWidth="1.4" />
            <line x1="0" y1="-20" x2="0" y2="20" stroke={INK} strokeWidth="1.2" />
            <line x1="-17.3" y1="-10" x2="17.3" y2="10" stroke={INK} strokeWidth="1.2" />
            <line x1="-17.3" y1="10" x2="17.3" y2="-10" stroke={INK} strokeWidth="1.2" />
          </g>
          <text x="74" y="152" textAnchor="middle" className="font-game" fontSize="15" fill={INK}>
            +
          </text>
          <g transform="translate(102, 146)">
            <circle cx="0" cy="0" r="20" fill="#FFFFFF" stroke="#059669" strokeWidth="2" />
            <path d="M 0 0 L 0 -20 A 20 20 0 0 1 17.3 10 Z" fill="#FDBA74" stroke={INK} strokeWidth="1.4" />
            <line x1="0" y1="-20" x2="0" y2="20" stroke={INK} strokeWidth="1.2" />
            <line x1="-17.3" y1="-10" x2="17.3" y2="10" stroke={INK} strokeWidth="1.2" />
            <line x1="-17.3" y1="10" x2="17.3" y2="-10" stroke={INK} strokeWidth="1.2" />
          </g>
          <text x="132" y="152" textAnchor="middle" className="font-game" fontSize="15" fill={INK}>
            =
          </text>
          <Frac x={162} y={146} num={5} den={6} scale={1.12} numColor="#059669" denColor="#059669" />

          <Stickman x={204} y={140} scale={0.58} pose="happy" armL={[-13, 14]} armR={[15, 2]} legL={[-7, 34]} legR={[7, 34]} />

          <text x="120" y="192" textAnchor="middle" className="font-game" fontSize="11" fill="#059669">
            조각 크기(분모)가 같아야 분자끼리 덧·뺄셈 OK!
          </text>
          <text x="120" y="214" textAnchor="middle" className="font-game" fontSize="11" fill={INK}>
            분모끼리 그냥 더하면 (<tspan fill="#DC2626">2/5</tspan>?) 완전 땡!
          </text>
        </svg>
      );
    }

    /* 04. [선수학습] 통분 2가지 방법 (두 분모의 곱 vs 최소공배수) */
    case 'fracmul_common_denom_methods': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#ECFDF5')} />

          <text x="120" y="22" textAnchor="middle" className="font-game" fontSize="13.2" fill="#047857">
            통분 2가지! 두 분모 곱 vs 최소공배수
          </text>

          {/* Target fractions */}
          <Frac x={96} y={50} num={1} den={4} scale={0.95} />
          <text x="120" y="56" textAnchor="middle" className="font-game" fontSize="14" fill={INK}>
            와
          </text>
          <Frac x={144} y={50} num={1} den={6} scale={0.95} />

          {/* Left Method 1: Multiply denominators (4*6=24) */}
          <text x="60" y="88" textAnchor="middle" className="font-game" fontSize="11" fill="#EA580C">
            방법① 두 분모 곱!
          </text>
          <text x="60" y="104" textAnchor="middle" className="font-game" fontSize="10" fill="#64748B">
            4 × 6 = 24
          </text>
          <Frac x={38} y={132} num={6} den={24} scale={0.95} />
          <text x="60" y="138" textAnchor="middle" className="font-game" fontSize="12" fill={INK}>
            ,
          </text>
          <Frac x={82} y={132} num={4} den={24} scale={0.95} />
          <Stickman x={30} y={160} scale={0.48} pose="strain" sweat armL={[-13, 14]} armR={[13, 14]} />
          <text x="76" y="176" textAnchor="middle" className="font-game" fontSize="9.8" fill="#EA580C">
            숫자가 크다ㅠ
          </text>

          <line x1="120" y1="78" x2="120" y2="188" stroke="#A7F3D0" strokeWidth="2" strokeDasharray="4 3" />

          {/* Right Method 2: LCM (12) */}
          <text x="180" y="88" textAnchor="middle" className="font-game" fontSize="11" fill="#059669">
            방법② 최소공배수!
          </text>
          <text x="180" y="104" textAnchor="middle" className="font-game" fontSize="10.5" fill="#2563EB">
            가장 작은 공통 12!
          </text>
          <Frac x={158} y={132} num={3} den={12} scale={0.95} numColor="#059669" denColor="#059669" />
          <text x="180" y="138" textAnchor="middle" className="font-game" fontSize="12" fill={INK}>
            ,
          </text>
          <Frac x={202} y={132} num={2} den={12} scale={0.95} numColor="#059669" denColor="#059669" />
          <Stickman x={152} y={160} scale={0.48} pose="hero" armL={[-13, 14]} armR={[15, 4]} />
          <text x="196" y="176" textAnchor="middle" className="font-game" fontSize="10.2" fill="#059669">
            작고 깔끔!!
          </text>

          <text x="120" y="214" textAnchor="middle" className="font-game" fontSize="11.5" fill={INK}>
            <tspan fill="#059669">최소공배수</tspan>로 통분하면 약분할 일도 줄어들어!
          </text>
        </svg>
      );
    }

    /* 05. [선수학습] 한 번에 통분·약분! 최소공배수 ㄴ자 비법 */
    case 'fracmul_lcm_gcd_ladder': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#ECFDF5')} />

          <text x="120" y="22" textAnchor="middle" className="font-game" fontSize="13.2" fill="#047857">
            니은(ㄴ)자 하나로 약분·통분 다 끝!
          </text>

          {/* Inverted Division Ladder (ㄴ-shape) for 12 and 18 */}
          {/* Step 1: 2 | 12  18 */}
          <text x="46" y="66" textAnchor="middle" className="font-game" fontSize="18" fill="#DC2626">
            2
          </text>
          <path d="M 62 46 L 62 74 L 136 74" fill="none" stroke={INK} strokeWidth="2.4" strokeLinecap="round" />
          <text x="84" y="66" textAnchor="middle" className="font-game" fontSize="18" fill={INK}>
            12
          </text>
          <text x="120" y="66" textAnchor="middle" className="font-game" fontSize="18" fill={INK}>
            18
          </text>

          {/* Step 2: 3 | 6  9 */}
          <text x="46" y="100" textAnchor="middle" className="font-game" fontSize="18" fill="#DC2626">
            3
          </text>
          <path d="M 62 80 L 62 108 L 136 108" fill="none" stroke={INK} strokeWidth="2.4" strokeLinecap="round" />
          <text x="84" y="100" textAnchor="middle" className="font-game" fontSize="18" fill={INK}>
            6
          </text>
          <text x="120" y="100" textAnchor="middle" className="font-game" fontSize="18" fill={INK}>
            9
          </text>

          {/* Bottom coprime 2  3 */}
          <text x="84" y="132" textAnchor="middle" className="font-game" fontSize="18" fill="#2563EB">
            2
          </text>
          <text x="120" y="132" textAnchor="middle" className="font-game" fontSize="18" fill="#2563EB">
            3
          </text>

          {/* Red loop around left column (2, 3) = GCD! */}
          <rect x="33" y="45" width="26" height="65" rx="12" fill="none" stroke="#DC2626" strokeWidth="2.4" strokeDasharray="3 2" />

          {/* Blue L-sweep arrow under 2, 3, 2, 3 = LCM! */}
          <path d="M 24 46 L 24 146 L 136 146" fill="none" stroke="#2563EB" strokeWidth="3.2" strokeLinecap="round" />
          <path d="M 129 140 L 138 146 L 129 152" fill="none" stroke="#2563EB" strokeWidth="2.8" strokeLinecap="round" />

          {/* Right callouts */}
          <text x="190" y="70" textAnchor="middle" className="font-game" fontSize="11.2" fill="#DC2626">
            왼쪽만 곱!
          </text>
          <text x="190" y="86" textAnchor="middle" className="font-game" fontSize="11.5" fill="#DC2626">
            2×3 = 6
          </text>
          <text x="190" y="100" textAnchor="middle" className="font-game" fontSize="9.5" fill={INK}>
            (약분용 최대공약수)
          </text>

          <Stickman x={190} y={136} scale={0.58} pose="hero" armL={[-13, 12]} armR={[15, 2]} legL={[-7, 36]} legR={[7, 36]} />

          <text x="120" y="188" textAnchor="middle" className="font-game" fontSize="12" fill="#2563EB">
            ㄴ자 싹 다 곱! 2×3×2×3 = 36 (한 번에 통분!)
          </text>
          <text x="120" y="214" textAnchor="middle" className="font-game" fontSize="11" fill={INK}>
            세로줄=약분 치트키, ㄴ자 전체=통분 치트키!
          </text>
        </svg>
      );
    }

    /* 06. [선수학습] 분자만 곱하면 크기가 뻥튀기! (한쪽만 곱하기 함정) */
    case 'fracmul_one_side_trap': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#FEF2F2')} />

          <text x="120" y="22" textAnchor="middle" className="font-game" fontSize="13.2" fill="#B91C1C">
            분자만 ×2 하면 크기가 변신해 땡!
          </text>

          {/* Left: Proper 2/3 */}
          <Frac x={38} y={84} num={2} den={3} scale={1.15} />
          <circle cx="38" cy="134" r="20" fill="#FFFFFF" stroke={INK} strokeWidth="2" />
          <path d="M 38 134 L 38 114 A 20 20 0 1 0 55.3 144 Z" fill="#93C5FD" stroke={INK} strokeWidth="1.6" />
          <text x="38" y="168" textAnchor="middle" className="font-game" fontSize="10.5" fill="#2563EB">
            1판보다 작음
          </text>

          {/* Arrow with ONLY top ×2 */}
          <path d="M 60 66 Q 92 48 124 66" fill="none" stroke="#DC2626" strokeWidth="2.8" />
          <path d="M 118 66 L 126 67 L 122 59" fill="none" stroke="#DC2626" strokeWidth="2.4" />
          <text x="92" y="50" textAnchor="middle" className="font-game" fontSize="10.5" fill="#DC2626">
            위만 ×2?!
          </text>
          <text x="92" y="102" textAnchor="middle" className="font-game" fontSize="10" fill="#94A3B8">
            아래는 그대로?!
          </text>

          {/* Right: Giant monster 4/3 squashing Jollaman! */}
          <Frac x={152} y={84} num={4} den={3} scale={1.15} numColor="#DC2626" />
          <line x1="136" y1="68" x2="168" y2="100" stroke="#DC2626" strokeWidth="3" />
          <line x1="168" y1="68" x2="136" y2="100" stroke="#DC2626" strokeWidth="3" />

          <SkeletonJollaman x={200} y={96} scale={0.76} />
          <text x="172" y="168" textAnchor="middle" className="font-game" fontSize="11.5" fill="#DC2626">
            1판 넘은 괴물 4/3!
          </text>

          <text x="120" y="194" textAnchor="middle" className="font-game" fontSize="11.5" fill="#059669">
            정답: 분모·분자 둘 다 ×2 → 4/6 (크기 같음!)
          </text>
          <text x="120" y="215" textAnchor="middle" className="font-game" fontSize="11" fill={INK}>
            크기가 같은 분수는 <tspan fill="#DC2626">위·아래 공평하게!</tspan>
          </text>
        </svg>
      );
    }

    /* 07. [핵심] 분수의 곱셈에서 약분이 필요한 이유! (돌덩이 vs 깃털) */
    case 'fracmul_why_cancel_mul': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#FFFBEB')} />

          <text x="120" y="22" textAnchor="middle" className="font-game" fontSize="13.2" fill="#B45309">
            왜 곱하기 전에 약분해야 할까?!
          </text>

          {/* Top: Heavy boulder 40/180 crushing sweating Jollaman! */}
          <text x="64" y="54" textAnchor="middle" className="font-game" fontSize="11" fill="#64748B">
            그냥 곱하면...
          </text>
          <Frac x={34} y={84} num={5} den={12} scale={0.86} />
          <text x="54" y="89" textAnchor="middle" className="font-game" fontSize="12" fill={INK}>
            ×
          </text>
          <Frac x={74} y={84} num={8} den={15} scale={0.86} />
          <text x="96" y="89" textAnchor="middle" className="font-game" fontSize="12" fill={INK}>
            =
          </text>

          {/* Huge boulder 40/180 */}
          <ellipse cx="144" cy="74" rx="28" ry="24" fill="#94A3B8" stroke={INK} strokeWidth="2.4" />
          <Frac x={144} y={74} num={40} den={180} scale={0.88} barWidth={30} numColor="#FFFFFF" denColor="#FFFFFF" />
          <Stickman x={198} y={66} scale={0.62} pose="strain" sweat armL={[-20, 6]} armR={[12, 16]} legL={[-10, 36]} legR={[10, 36]} />
          <text x="198" y="114" textAnchor="middle" className="font-game" fontSize="9.8" fill="#DC2626">
            너무 무거워ㅠ
          </text>

          <line x1="16" y1="124" x2="224" y2="124" stroke="#FDE68A" strokeWidth="2" strokeDasharray="4 3" />

          {/* Bottom: Pre-cancel with Hero Jollaman -> feather 2/9! */}
          <text x="64" y="144" textAnchor="middle" className="font-game" fontSize="11.5" fill="#059669">
            미리 약분하면!
          </text>
          <Frac x={34} y={176} num={5} den={12} scale={0.86} />
          <line x1="25" y1="170" x2="43" y2="156" stroke="#DC2626" strokeWidth="2.4" />
          <text x="20" y="158" className="font-game" fontSize="10" fill="#DC2626">
            1
          </text>
          <line x1="23" y1="184" x2="44" y2="196" stroke="#2563EB" strokeWidth="2.4" />
          <text x="20" y="196" className="font-game" fontSize="10" fill="#2563EB">
            3
          </text>

          <text x="54" y="181" textAnchor="middle" className="font-game" fontSize="12" fill={INK}>
            ×
          </text>
          <Frac x={74} y={176} num={8} den={15} scale={0.86} />
          <line x1="65" y1="170" x2="83" y2="156" stroke="#2563EB" strokeWidth="2.4" />
          <text x="86" y="158" className="font-game" fontSize="10" fill="#2563EB">
            2
          </text>
          <line x1="64" y1="184" x2="84" y2="196" stroke="#DC2626" strokeWidth="2.4" />
          <text x="88" y="196" className="font-game" fontSize="10" fill="#DC2626">
            3
          </text>

          <text x="104" y="181" textAnchor="middle" className="font-game" fontSize="12" fill={INK}>
            =
          </text>
          <circle cx="132" cy="176" r="18" fill={hlBg('#D1FAE5')} stroke="#059669" strokeWidth="2.2" />
          <Frac x={132} y={176} num={2} den={9} scale={0.92} numColor="#059669" denColor="#059669" />

          <Stickman x={190} y={154} scale={0.62} pose="hero" armL={[-13, 12]} armR={[16, 2]} legL={[-8, 36]} legR={[8, 36]} />
          <text x="190" y="198" textAnchor="middle" className="font-game" fontSize="10.2" fill="#059669">
            깃털 1초 컷!!
          </text>

          <text x="120" y="218" textAnchor="middle" className="font-game" fontSize="11.2" fill={INK}>
            곱하기 전에 미리 줄이면 숫자가 커질 틈이 없어!
          </text>
        </svg>
      );
    }

    /* 08. (진분수) × (자연수) — 자연수는 위로 올라타! */
    case 'fracmul_frac_times_whole': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#EFF6FF')} />

          <text x="120" y="23" textAnchor="middle" className="font-game" fontSize="13.5" fill="#1D4ED8">
            자연수는 분자(위)로 올라탄다!
          </text>

          {/* Left equation: 3/4 × 2 */}
          <Frac x={38} y={96} num={3} den={4} scale={1.18} />
          <text x="68" y="102" textAnchor="middle" className="font-game" fontSize="16" fill={INK}>
            ×
          </text>
          <text x="90" y="104" textAnchor="middle" className="font-game" fontSize="24" fill="#EA580C">
            2
          </text>

          {/* Jumping arc of 2 climbing onto numerator 3! */}
          <path d="M 90 80 Q 104 42 138 66" fill="none" stroke="#EA580C" strokeWidth="2.8" strokeDasharray="4 2" />
          <path d="M 131 66 L 140 68 L 136 59" fill="none" stroke="#EA580C" strokeWidth="2.4" strokeLinecap="round" />
          <Stickman x={108} y={50} scale={0.48} pose="hero" armL={[-13, 12]} armR={[15, 2]} legL={[-8, 34]} legR={[8, 34]} />

          <text x="114" y="102" textAnchor="middle" className="font-game" fontSize="16" fill={INK}>
            =
          </text>

          {/* Middle fraction: (3 × 2) / 4 */}
          <Frac x={152} y={96} num="3×2" den={4} scale={1.12} barWidth={38} />
          <text x="190" y="102" textAnchor="middle" className="font-game" fontSize="16" fill={INK}>
            =
          </text>
          <Frac x={216} y={96} num={6} den={4} scale={1.08} />

          {/* Bottom: Visual bar addition 3/4 + 3/4 = 6/4 = 1 1/2 */}
          <text x="120" y="144" textAnchor="middle" className="font-game" fontSize="11.5" fill="#2563EB">
            3/4을 2번 더한 것과 똑같지!
          </text>
          <Frac x={74} y={176} num={3} den={4} scale={0.86} />
          <text x="95" y="182" textAnchor="middle" className="font-game" fontSize="14" fill={INK}>
            +
          </text>
          <Frac x={116} y={176} num={3} den={4} scale={0.86} />
          <text x="138" y="182" textAnchor="middle" className="font-game" fontSize="14" fill={INK}>
            =
          </text>
          <Frac x={172} y={176} whole={1} num={1} den={2} scale={0.98} />

          <text x="120" y="214" textAnchor="middle" className="font-game" fontSize="11.5" fill={INK}>
            분모는 그대로! <tspan fill="#EA580C">자연수</tspan>는 무조건 <tspan fill="#EA580C">분자</tspan>에만 곱해!
          </text>
        </svg>
      );
    }

    /* 09. 자연수를 분모에 곱하면 절대 땡! (골키퍼 졸라맨) */
    case 'fracmul_whole_denom_trap': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#FEF2F2')} />

          <text x="120" y="22" textAnchor="middle" className="font-game" fontSize="13.2" fill="#B91C1C">
            아래(분모) 출입 금지! 통분 아니야!
          </text>

          {/* Left: Fraction 3/4 with Goalkeeper Jollaman standing ON the bar blocking 2! */}
          <text x="48" y="64" textAnchor="middle" className="font-game" fontSize="22" fill="#EA580C">
            3
          </text>
          <line x1="28" y1="74" x2="68" y2="74" stroke={INK} strokeWidth="3.2" strokeLinecap="round" />
          <text x="48" y="100" textAnchor="middle" className="font-game" fontSize="22" fill="#2563EB">
            4
          </text>

          <text x="84" y="80" textAnchor="middle" className="font-game" fontSize="16" fill={INK}>
            ×
          </text>
          <text x="104" y="82" textAnchor="middle" className="font-game" fontSize="22" fill="#EA580C">
            2
          </text>

          {/* Goalkeeper blocking the downward arrow to 4 */}
          <path d="M 104 90 Q 86 122 64 106" fill="none" stroke="#DC2626" strokeWidth="2.4" strokeDasharray="3 2" />
          <line x1="78" y1="102" x2="94" y2="118" stroke="#DC2626" strokeWidth="3" />
          <line x1="94" y1="102" x2="78" y2="118" stroke="#DC2626" strokeWidth="3" />

          <Stickman x={136} y={76} scale={0.72} pose="headband" armL={[-18, -4]} armR={[18, -4]} legL={[-10, 42]} legR={[10, 42]} />
          <text x="136" y="132" textAnchor="middle" className="font-game" fontSize="10.2" fill="#DC2626">
            아래 출입금지!!
          </text>

          {/* Right: Shocked Skeleton on 3/8 or 6/8 */}
          <SkeletonJollaman x={200} y={64} scale={0.76} />
          <Frac x={200} y={134} num={3} den={8} scale={0.95} numColor="#94A3B8" denColor="#94A3B8" />
          <line x1="184" y1="118" x2="216" y2="148" stroke="#DC2626" strokeWidth="2.8" />
          <line x1="216" y1="118" x2="184" y2="148" stroke="#DC2626" strokeWidth="2.8" />

          <text x="120" y="184" textAnchor="middle" className="font-game" fontSize="12.5" fill="#059669">
            정답: 위(분자)에만 곱해서 6/4 (= 1과 1/2)!
          </text>
          <text x="120" y="214" textAnchor="middle" className="font-game" fontSize="11" fill={INK}>
            자연수 × 분수 할 땐 <tspan fill="#2563EB">분모</tspan>는 가만히 두기!
          </text>
        </svg>
      );
    }

    /* 10. (자연수) × (진분수) 뜻과 계산 (6 × 2/3 = 4) */
    case 'fracmul_whole_times_frac': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#EFF6FF')} />

          <text x="120" y="22" textAnchor="middle" className="font-game" fontSize="13.5" fill="#1D4ED8">
            6 × 2/3 = ‘6의 2/3만큼’ 챙기기!
          </text>

          {/* 6 apples grouped into 3 baskets (2 per basket), 2 baskets circled/taken! */}
          {[0, 1, 2].map((g) => {
            const gx = 30 + g * 66;
            const taken = g < 2;
            return (
              <g key={g}>
                <rect
                  x={gx}
                  y="44"
                  width="54"
                  height="42"
                  rx="8"
                  fill={taken ? hlBg('#DBEAFE') : '#FFFFFF'}
                  stroke={taken ? '#2563EB' : '#94A3B8'}
                  strokeWidth={taken ? 2.4 : 1.6}
                  strokeDasharray={taken ? 'none' : '3 2'}
                />
                <circle cx={gx + 17} cy="65" r="8.5" fill={taken ? '#FB923C' : '#E2E8F0'} stroke={INK} strokeWidth="1.5" />
                <circle cx={gx + 37} cy="65" r="8.5" fill={taken ? '#FB923C' : '#E2E8F0'} stroke={INK} strokeWidth="1.5" />
                <text x={gx + 27} y="101" textAnchor="middle" className="font-game" fontSize="9.8" fill={taken ? '#2563EB' : '#94A3B8'}>
                  {taken ? `${g + 1}묶음 GET!` : '패스'}
                </text>
              </g>
            );
          })}

          {/* Jollaman hugging the 2 baskets (=4) */}
          <Stickman x={44} y={146} scale={0.72} pose="happy" armL={[-13, 14]} armR={[16, 4]} legL={[-8, 40]} legR={[8, 40]} />

          <text x="108" y="156" textAnchor="middle" className="font-game" fontSize="22" fill="#EA580C">
            6
          </text>
          <text x="128" y="154" textAnchor="middle" className="font-game" fontSize="16" fill={INK}>
            ×
          </text>
          <Frac x={152} y={148} num={2} den={3} scale={1.08} />
          <text x="176" y="154" textAnchor="middle" className="font-game" fontSize="16" fill={INK}>
            =
          </text>
          <text x="204" y="158" textAnchor="middle" className="font-game" fontSize="26" fill="#059669">
            4!
          </text>

          <text x="120" y="214" textAnchor="middle" className="font-game" fontSize="11.5" fill={INK}>
            순서 바꿔 <tspan fill="#2563EB">2/3 × 6</tspan> 해도 계산은 똑같이 <tspan fill="#059669">4</tspan>!
          </text>
        </svg>
      );
    }

    /* 11. 곱하는 수의 크기별 결과 어림하기! (>1, =1, <1) */
    case 'fracmul_size_compare': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#FFFBEB')} />
          <line x1="0" y1="184" x2="240" y2="184" stroke={INK} strokeWidth="2.2" />

          <text x="120" y="22" textAnchor="middle" className="font-game" fontSize="13.2" fill="#B45309">
            곱한다고 다 커지나? 1을 기준으로 봐!
          </text>

          {/* Left: > 1 (Giant Jollaman!) */}
          <text x="42" y="44" textAnchor="middle" className="font-game" fontSize="11.5" fill="#DC2626">
            6 × 3/2 = 9
          </text>
          <text x="42" y="59" textAnchor="middle" className="font-game" fontSize="9.8" fill="#DC2626">
            (1보다 큼 → 커져!)
          </text>
          <Stickman x={42} y={96} scale={1.12} pose="hero" armL={[-15, 10]} armR={[15, 10]} legL={[-9, 50]} legR={[9, 50]} />

          {/* Middle: = 1 (Normal Jollaman) */}
          <text x="120" y="66" textAnchor="middle" className="font-game" fontSize="11.5" fill="#2563EB">
            6 × 1 = 6
          </text>
          <text x="120" y="81" textAnchor="middle" className="font-game" fontSize="9.8" fill="#2563EB">
            (1이면 → 그대로!)
          </text>
          <Stickman x={120} y={118} scale={0.86} pose="sunglasses" armL={[-13, 18]} armR={[13, 18]} legL={[-8, 50]} legR={[8, 50]} />

          {/* Right: < 1 (Tiny shrinking Jollaman!) */}
          <text x="196" y="84" textAnchor="middle" className="font-game" fontSize="11.5" fill="#059669">
            6 × 1/2 = 3
          </text>
          <text x="196" y="99" textAnchor="middle" className="font-game" fontSize="9.8" fill="#059669">
            (1보다 작음 → 작아져!)
          </text>
          <Stickman x={196} y={146} scale={0.54} pose="panic" armL={[-12, 16]} armR={[12, 16]} legL={[-7, 46]} legR={[7, 46]} />

          <text x="120" y="212" textAnchor="middle" className="font-game" fontSize="11.5" fill={INK}>
            <tspan fill="#059669">1보다 작은 진분수</tspan> 곱하면 원래 수보다 작아져!
          </text>
        </svg>
      );
    }

    /* 12. (진분수) × (진분수) 넓이 그림 원리 (2/3 × 3/4 = 6/12) */
    case 'fracmul_area_model': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#ECFDF5')} />

          <text x="120" y="22" textAnchor="middle" className="font-game" fontSize="13.2" fill="#047857">
            2/3 × 3/4 → 겹친 밭 넓이로 원리 끝!
          </text>

          {/* 3 rows x 4 cols Area Grid */}
          <g transform="translate(40, 62)">
            {Array.from({ length: 3 }).map((_, r) =>
              Array.from({ length: 4 }).map((__, c) => {
                const in23 = r < 2; // 2/3 horizontally
                const in34 = c < 3; // 3/4 vertically
                const fill =
                  in23 && in34
                    ? '#10B981' // double overlap!
                    : in23
                    ? '#BFDBFE'
                    : in34
                    ? '#FED7AA'
                    : '#FFFFFF';
                return (
                  <rect
                    key={`${r}-${c}`}
                    x={c * 22}
                    y={r * 24}
                    width="22"
                    height="24"
                    fill={fill}
                    stroke={INK}
                    strokeWidth="1.6"
                  />
                );
              })
            )}
            {/* Brackets showing 2/3 (blue left) and 3/4 (orange top) */}
            <path d="M -5 1 L -9 1 L -9 47 L -5 47" fill="none" stroke="#2563EB" strokeWidth="1.8" />
            <Frac x={-21} y={24} num={2} den={3} scale={0.74} barWidth={18} numColor="#2563EB" denColor="#2563EB" />
            <path d="M 1 -5 L 1 -9 L 65 -9 L 65 -5" fill="none" stroke="#EA580C" strokeWidth="1.8" />
            <Frac x={33} y={-20} num={3} den={4} scale={0.74} barWidth={18} numColor="#EA580C" denColor="#EA580C" />
          </g>

          {/* Jollaman pointing to overlapping green 6 cells */}
          <Stickman x={176} y={76} scale={0.72} pose="happy" armL={[-18, 6]} armR={[14, 16]} legL={[-8, 40]} legR={[8, 40]} />
          <text x="194" y="60" textAnchor="middle" className="font-game" fontSize="10.5" fill="#047857">
            겹친 6칸!
          </text>

          {/* Equation below */}
          <Frac x={44} y={168} num={2} den={3} scale={0.96} />
          <text x="66" y="174" textAnchor="middle" className="font-game" fontSize="15" fill={INK}>
            ×
          </text>
          <Frac x={88} y={168} num={3} den={4} scale={0.96} />
          <text x="112" y="174" textAnchor="middle" className="font-game" fontSize="15" fill={INK}>
            =
          </text>
          <Frac x={150} y={168} num="2×3" den="3×4" scale={0.96} barWidth={34} />
          <text x="184" y="174" textAnchor="middle" className="font-game" fontSize="15" fill={INK}>
            =
          </text>
          <Frac x={210} y={168} num={6} den={12} scale={0.98} numColor="#059669" denColor="#059669" />

          <text x="120" y="214" textAnchor="middle" className="font-game" fontSize="11.5" fill={INK}>
            <tspan fill="#2563EB">분모는 분모끼리</tspan>, <tspan fill="#EA580C">분자는 분자끼리</tspan> 곱하기!
          </text>
        </svg>
      );
    }

    /* 13. 위·아래 대각선 약분 치트키! (4/9 × 3/8 = 1/6) */
    case 'fracmul_cross_cancel': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#ECFDF5')} />

          <text x="120" y="22" textAnchor="middle" className="font-game" fontSize="13.5" fill="#047857">
            위↔아래 대각선 X 레이저 약분!
          </text>

          {/* Big fractions 4/9 × 3/8 */}
          <Frac x={60} y={96} num={4} den={9} scale={1.32} barWidth={30} />
          <text x="102" y="102" textAnchor="middle" className="font-game" fontSize="18" fill={INK}>
            ×
          </text>
          <Frac x={144} y={96} num={3} den={8} scale={1.32} barWidth={30} />

          {/* Cross-cancel X lasers! */}
          {/* 4 <-> 8 (÷4 -> 1, 2) */}
          <line x1="50" y1="68" x2="154" y2="122" stroke="#DC2626" strokeWidth="2.8" strokeLinecap="round" />
          <circle cx="48" cy="52" r="10" fill="#FEF2F2" stroke="#DC2626" strokeWidth="1.8" />
          <text x="48" y="56" textAnchor="middle" className="font-game" fontSize="13" fill="#DC2626">
            1
          </text>
          <circle cx="156" cy="142" r="10" fill="#FEF2F2" stroke="#DC2626" strokeWidth="1.8" />
          <text x="156" y="146" textAnchor="middle" className="font-game" fontSize="13" fill="#DC2626">
            2
          </text>

          {/* 3 <-> 9 (÷3 -> 1, 3) */}
          <line x1="154" y1="68" x2="50" y2="122" stroke="#2563EB" strokeWidth="2.8" strokeLinecap="round" />
          <circle cx="156" cy="52" r="10" fill="#EFF6FF" stroke="#2563EB" strokeWidth="1.8" />
          <text x="156" y="56" textAnchor="middle" className="font-game" fontSize="13" fill="#2563EB">
            1
          </text>
          <circle cx="48" cy="142" r="10" fill="#EFF6FF" stroke="#2563EB" strokeWidth="1.8" />
          <text x="48" y="146" textAnchor="middle" className="font-game" fontSize="13" fill="#2563EB">
            3
          </text>

          {/* Answer 1/6 */}
          <text x="180" y="102" textAnchor="middle" className="font-game" fontSize="18" fill={INK}>
            =
          </text>
          <Frac x={212} y={96} num={1} den={6} scale={1.32} numColor="#059669" denColor="#059669" />

          <Stickman x={34} y={172} scale={0.58} pose="hero" armL={[-13, 12]} armR={[16, 2]} legL={[-7, 34]} legR={[7, 34]} />
          <text x="142" y="182" textAnchor="middle" className="font-game" fontSize="11.2" fill="#DC2626">
            옆줄(분자끼리·분모끼리) 약분은 절대 땡!
          </text>
          <text x="142" y="212" textAnchor="middle" className="font-game" fontSize="11.5" fill={INK}>
            <tspan fill="#DC2626">위</tspan>랑 <tspan fill="#2563EB">아래</tspan>면 대각선 약분 무조건 OK!
          </text>
        </svg>
      );
    }

    /* 14. 대분수 곱셈 함정! 따로 곱하면 땡! */
    case 'fracmul_mixed_split_trap': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#FEF2F2')} />

          <text x="120" y="22" textAnchor="middle" className="font-game" fontSize="13" fill="#B91C1C">
            자연수·분수 따로 쪼개 곱하면 땡!
          </text>

          {/* Left Wrong Split */}
          <Frac x={42} y={64} whole={1} num={1} den={2} scale={0.94} />
          <text x="64" y="70" textAnchor="middle" className="font-game" fontSize="14" fill={INK}>
            ×
          </text>
          <Frac x={94} y={64} whole={2} num={1} den={3} scale={0.94} />

          <path d="M 32 82 Q 56 102 82 82" fill="none" stroke="#DC2626" strokeWidth="2.2" strokeDasharray="3 2" />
          <text x="62" y="116" textAnchor="middle" className="font-game" fontSize="11.5" fill="#94A3B8">
            1×2 + 1/6 = 2와 1/6?!
          </text>
          <line x1="16" y1="104" x2="108" y2="122" stroke="#DC2626" strokeWidth="2.8" />
          <line x1="108" y1="104" x2="16" y2="122" stroke="#DC2626" strokeWidth="2.8" />

          <SkeletonJollaman x={60} y={142} scale={0.68} />

          <line x1="122" y1="38" x2="122" y2="188" stroke="#FECACA" strokeWidth="2" strokeDasharray="4 3" />

          {/* Right Correct Transform to Improper */}
          <text x="180" y="50" textAnchor="middle" className="font-game" fontSize="11.5" fill="#059669">
            무조건 가분수 변신!
          </text>
          <Frac x={156} y={84} num={3} den={2} scale={1.04} />
          <text x="178" y="90" textAnchor="middle" className="font-game" fontSize="14" fill={INK}>
            ×
          </text>
          <Frac x={200} y={84} num={7} den={3} scale={1.04} />

          {/* Cancel 3s */}
          <line x1="146" y1="68" x2="166" y2="82" stroke="#DC2626" strokeWidth="2.2" />
          <line x1="190" y1="88" x2="210" y2="102" stroke="#DC2626" strokeWidth="2.2" />

          <path d="M 180 108 L 180 124" stroke="#059669" strokeWidth="2.4" />
          <Frac x={180} y={150} whole={3} num={1} den={2} scale={1.08} />

          <text x="120" y="214" textAnchor="middle" className="font-game" fontSize="11.5" fill={INK}>
            대분수 곱셈은 <tspan fill="#059669">가분수로 변신</tspan>이 첫 번째 규칙!
          </text>
        </svg>
      );
    }

    /* 15. 대분수의 곱셈 3단계 마스터! (2 1/4 × 1 1/3 = 3) */
    case 'fracmul_mixed_steps': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#ECFDF5')} />

          <text x="120" y="22" textAnchor="middle" className="font-game" fontSize="13.5" fill="#047857">
            대분수 곱셈 3단계 필살 공식!
          </text>

          {/* Step 1: Mixed -> Improper */}
          <text x="34" y="54" textAnchor="middle" className="font-game" fontSize="10.5" fill="#EA580C">
            ① 가분수!
          </text>
          <Frac x={84} y={54} whole={2} num={1} den={4} scale={0.92} />
          <text x="108" y="60" textAnchor="middle" className="font-game" fontSize="14" fill={INK}>
            ×
          </text>
          <Frac x={138} y={54} whole={1} num={1} den={3} scale={0.92} />

          <path d="M 156 58 Q 178 68 164 86" fill="none" stroke="#EA580C" strokeWidth="2.6" strokeLinecap="round" />
          <path d="M 161 79 L 163 87 L 171 84" fill="none" stroke="#EA580C" strokeWidth="2.4" strokeLinecap="round" />

          {/* Step 2: 9/4 × 4/3 with X-cancel */}
          <text x="42" y="114" textAnchor="middle" className="font-game" fontSize="10.5" fill="#2563EB">
            ② X 약분!
          </text>
          <Frac x={100} y={114} num={9} den={4} scale={1.12} />
          <text x="126" y="120" textAnchor="middle" className="font-game" fontSize="16" fill={INK}>
            ×
          </text>
          <Frac x={152} y={114} num={4} den={3} scale={1.12} />

          {/* Cancel slashes */}
          <line x1="90" y1="120" x2="162" y2="108" stroke="#2563EB" strokeWidth="2.4" />
          <text x="84" y="138" className="font-game" fontSize="10" fill="#2563EB">
            1
          </text>
          <text x="166" y="100" className="font-game" fontSize="10" fill="#2563EB">
            1
          </text>

          <line x1="92" y1="98" x2="160" y2="130" stroke="#DC2626" strokeWidth="2.4" />
          <text x="84" y="96" className="font-game" fontSize="10" fill="#DC2626">
            3
          </text>
          <text x="166" y="138" className="font-game" fontSize="10" fill="#DC2626">
            1
          </text>

          {/* Step 3: = 3! */}
          <text x="44" y="172" textAnchor="middle" className="font-game" fontSize="10.5" fill="#059669">
            ③ 곱하기!
          </text>
          <Frac x={106} y={170} num="3×1" den="1×1" scale={0.96} barWidth={34} numColor="#059669" denColor="#059669" />
          <text x="148" y="176" textAnchor="middle" className="font-game" fontSize="22" fill="#059669">
            = 3!
          </text>

          <Stickman x={208} y={90} scale={0.68} pose="hero" armL={[-13, 12]} armR={[15, 2]} legL={[-8, 38]} legR={[8, 38]} />

          <text x="120" y="214" textAnchor="middle" className="font-game" fontSize="11.5" fill={INK}>
            <tspan fill="#EA580C">① 변신</tspan> → <tspan fill="#2563EB">② 약분</tspan> → <tspan fill="#059669">③ 곱셈</tspan> 순서만 지키자!
          </text>
        </svg>
      );
    }

    /* 16. 세 분수의 곱셈 — 한 줄 도미노 약분 쇼! */
    case 'fracmul_three_fractions': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#F5F3FF')} />

          <text x="120" y="22" textAnchor="middle" className="font-game" fontSize="13.5" fill="#5B21B6">
            세 분수 한 줄 도미노 약분 쇼!!
          </text>

          {/* Hero surfing across the 3 fractions */}
          <Stickman x={108} y={38} scale={0.56} pose="hero" armL={[-16, 8]} armR={[16, 8]} legL={[-12, 34]} legR={[12, 34]} />

          {/* 3 fractions in a row */}
          <Frac x={44} y={108} num={3} den={4} scale={1.18} />
          <text x="72" y="114" textAnchor="middle" className="font-game" fontSize="16" fill={INK}>
            ×
          </text>
          <Frac x={100} y={108} num={8} den={9} scale={1.18} />
          <text x="128" y="114" textAnchor="middle" className="font-game" fontSize="16" fill={INK}>
            ×
          </text>
          <Frac x={156} y={108} num={3} den={5} scale={1.18} />

          {/* Domino cancel slashes */}
          {/* 4 <-> 8 */}
          <line x1="36" y1="128" x2="106" y2="92" stroke="#2563EB" strokeWidth="2.4" />
          <text x="30" y="140" className="font-game" fontSize="10.5" fill="#2563EB">
            1
          </text>
          <text x="108" y="86" className="font-game" fontSize="10.5" fill="#2563EB">
            2
          </text>

          {/* 3 <-> 9 */}
          <line x1="38" y1="92" x2="106" y2="128" stroke="#DC2626" strokeWidth="2.4" />
          <text x="30" y="86" className="font-game" fontSize="10.5" fill="#DC2626">
            1
          </text>
          <text x="108" y="140" className="font-game" fontSize="10.5" fill="#DC2626">
            3
          </text>

          {/* remaining 3 <-> 3 */}
          <line x1="94" y1="128" x2="162" y2="92" stroke="#059669" strokeWidth="2.4" />
          <text x="122" y="144" className="font-game" fontSize="10.5" fill="#059669">
            1
          </text>
          <text x="164" y="86" className="font-game" fontSize="10.5" fill="#059669">
            1
          </text>

          {/* Answer 2/5 */}
          <text x="186" y="114" textAnchor="middle" className="font-game" fontSize="18" fill={INK}>
            =
          </text>
          <circle cx="214" cy="108" r="20" fill={hlBg('#EDE9FE')} stroke="#7C3AED" strokeWidth="2.2" />
          <Frac x={214} y={108} num={2} den={5} scale={1.1} numColor="#5B21B6" denColor="#5B21B6" />

          <text x="120" y="182" textAnchor="middle" className="font-game" fontSize="12" fill="#5B21B6">
            남은 수만 쏙 곱해: 1×2×1 / 1×1×5 = 2/5!
          </text>
          <text x="120" y="214" textAnchor="middle" className="font-game" fontSize="11.2" fill={INK}>
            세 개도 한 줄로 쭉 써서 <tspan fill="#DC2626">도미노 약분</tspan> 하면 1초 컷!
          </text>
        </svg>
      );
    }

    /* 17. 최종 보스! 분수의 곱셈 3관문 */
    case 'fracmul_boss': {
      const darkBg = isLightPrint ? '#FFFFFF' : '#0F172A';
      const goldText = isBw ? INK : isLightPrint ? '#B45309' : '#FACC15';
      const bossShadow = isLightPrint ? '#CBD5E1' : '#FACC15';
      const bossStroke = isLightPrint ? INK : '#FFFFFF';
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={darkBg} />

          <path
            d="M 8 22 V 8 H 22 M 218 8 H 232 V 22 M 8 208 V 222 H 22 M 218 222 H 232 V 208"
            fill="none"
            stroke={goldText}
            strokeWidth="2.4"
          />

          <text x="120" y="26" textAnchor="middle" className="font-game" fontSize="13.5" fill={goldText}>
            최종 보스! 분수의 곱셈 3관문
          </text>

          {/* 3 Boss Podiums */}
          <g transform="translate(46, 70)">
            <rect x="-31" y="-25" width="66" height="56" rx="2" fill={bossShadow} />
            <rect x="-34" y="-28" width="66" height="56" rx="2" fill="#FFFFFF" stroke={INK} strokeWidth="2.4" />
            <text x="-1" y="-12" textAnchor="middle" className="font-game" fontSize="9.2" fill="#DC2626">
              1관문
            </text>
            <Frac x={-12} y={10} num={5} den={12} scale={0.78} />
            <text x="14" y="14" textAnchor="middle" className="font-game" fontSize="11" fill={INK}>
              × 4
            </text>
          </g>

          <g transform="translate(120, 70)">
            <rect x="-31" y="-25" width="66" height="56" rx="2" fill={bossShadow} />
            <rect x="-34" y="-28" width="66" height="56" rx="2" fill="#FFFFFF" stroke={INK} strokeWidth="2.4" />
            <text x="-1" y="-12" textAnchor="middle" className="font-game" fontSize="9.2" fill="#DC2626">
              2관문
            </text>
            <Frac x={-14} y={10} whole={1} num={2} den={3} scale={0.72} barWidth={18} />
            <text x="2" y="14" textAnchor="middle" className="font-game" fontSize="9.5" fill={INK}>
              ×
            </text>
            <Frac x={18} y={10} num={3} den={10} scale={0.72} barWidth={18} />
          </g>

          <g transform="translate(194, 70)">
            <rect x="-31" y="-25" width="66" height="56" rx="2" fill={bossShadow} />
            <rect x="-34" y="-28" width="66" height="56" rx="2" fill="#FFFFFF" stroke={INK} strokeWidth="2.4" />
            <text x="-1" y="-12" textAnchor="middle" className="font-game" fontSize="9.2" fill="#DC2626">
              3관문
            </text>
            <text x="-17" y="14" textAnchor="middle" className="font-game" fontSize="10.5" fill={INK}>
              8×
            </text>
            <Frac x={2} y={10} num={3} den={4} scale={0.72} barWidth={16} />
            <text x="20" y="14" textAnchor="middle" className="font-game" fontSize="9.8" fill="#DC2626">
              ○ 8
            </text>
          </g>

          <Stickman x={54} y={142} scale={0.84} pose="hero" armL={[-14, 18]} armR={[16, 2]} strokeColor={bossStroke} />

          <text x="150" y="148" textAnchor="middle" className="font-game" fontSize="11.5" fill={goldText}>
            가분수 변신 &amp; X약분 총출동!
          </text>
          <text x="150" y="170" textAnchor="middle" className="font-game" fontSize="10.8" fill={isBw ? INK : '#FCA5A5'}>
            크기 비교까지 맞추면 마스터!
          </text>

          <text x="120" y="212" textAnchor="middle" className="font-game" fontSize="11.5" fill={goldText}>
            세 관문 정답을 아래 팁에서 확인하자!
          </text>
        </svg>
      );
    }

    /* 18. 5-2 분수의 곱셈 완주 축하 포카 */
    case 'fracmul_praise':
    default: {
      const darkBg = isLightPrint ? '#FFFFFF' : '#0F172A';
      const goldText = isBw ? INK : isLightPrint ? '#B45309' : '#FACC15';
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={darkBg} />

          {!isLightPrint && (
            <g opacity="0.16" fill="#FACC15">
              <polygon points="120,115 20,0 55,0" />
              <polygon points="120,115 95,0 145,0" />
              <polygon points="120,115 185,0 220,0" />
            </g>
          )}

          <path
            d="M 8 22 V 8 H 22 M 218 8 H 232 V 22 M 8 208 V 222 H 22 M 218 222 H 232 V 208"
            fill="none"
            stroke={goldText}
            strokeWidth="2.4"
          />

          <polygon points="103,26 105,12 113,18 120,10 127,18 135,12 137,26" fill={goldText} stroke={isBw ? INK : 'none'} strokeWidth="1.2" />

          <text x="120" y="46" textAnchor="middle" className="font-game" fontSize="13" fill={goldText}>
            5-2 분수의 곱셈 완주 축하!!
          </text>

          <Stickman
            x={66}
            y={76}
            scale={0.85}
            pose="hero"
            armL={[-16, 10]}
            armR={[16, 10]}
            strokeColor={isLightPrint ? INK : '#FFFFFF'}
          />

          <g transform="translate(154, 82)">
            <path d="M -22 -18 H 22 L 15 10 Q 0 18 -15 10 Z" fill="#FACC15" stroke={INK} strokeWidth="2" />
            <text x="0" y="-1" textAnchor="middle" className="font-game" fontSize="11.2" fill={INK}>
              약분 마법
            </text>
            <rect x="-4" y="13" width="8" height="10" fill="#FACC15" stroke={INK} strokeWidth="1.5" />
            <rect x="-15" y="23" width="30" height="7" rx="1.5" fill="#FFFFFF" stroke={INK} strokeWidth="1.5" />
          </g>

          <rect x="20" y="134" width="204" height="58" rx="4" fill={shadowInk} />
          <rect x="17" y="131" width="204" height="58" rx="4" fill="#FFFFFF" stroke="#FACC15" strokeWidth="2.2" />
          <text x="119" y="149" textAnchor="middle" className="font-game" fontSize="11.2" fill="#1D4ED8">
            분수의 곱셈 19장 올 클리어!
          </text>
          <text x="119" y="166" textAnchor="middle" className="font-body font-bold" fontSize="8.8" fill={INK}>
            약분·통분부터 대분수·세 분수의 곱셈까지 정복!
          </text>
          <text x="119" y="182" textAnchor="middle" className="font-game" fontSize="9.5" fill="#DC2626">
            ★ 졸라수학맨 공식 분수곱셈 마스터 ★
          </text>

          <text x="120" y="212" textAnchor="middle" className="font-game" fontSize="11" fill={goldText}>
            최강 X약분 챔피언 탄생!!
          </text>
        </svg>
      );
    }
  }
};
