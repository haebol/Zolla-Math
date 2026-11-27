import React from 'react';
import { EpisodeSceneType, PrintInkMode } from '../types/card';

interface FracAddComicSceneProps {
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
  barColor?: string;
}> = ({
  x,
  y,
  num,
  den,
  whole,
  scale = 1,
  barWidth = 22,
  numColor = '#EA580C',
  denColor = '#1D4ED8',
  wholeColor = '#047857',
  barColor = INK,
}) => (
  <g transform={`translate(${x}, ${y}) scale(${scale})`}>
    {whole !== undefined && whole !== '' && (
      <text x={-barWidth / 2 - 9} y="7" textAnchor="middle" className="font-game" fontSize="21" fill={wholeColor}>
        {whole}
      </text>
    )}
    <text x="0" y="-5" textAnchor="middle" className="font-game" fontSize="16" fill={numColor}>
      {num}
    </text>
    <line x1={-barWidth / 2} y1="0" x2={barWidth / 2} y2="0" stroke={barColor} strokeWidth="2.4" strokeLinecap="round" />
    <text x="0" y="16" textAnchor="middle" className="font-game" fontSize="16" fill={denColor}>
      {den}
    </text>
  </g>
);

export const FracAddComicScene: React.FC<FracAddComicSceneProps> = ({
  sceneType,
  inkMode = 'full',
}) => {
  const isLightPrint = inkMode !== 'full';
  const isBw = inkMode === 'bw_worksheet';

  const softBg = (hex: string) => (isLightPrint ? '#FFFFFF' : hex);
  const hlBg = (hex: string) => (isLightPrint ? '#F8FAFC' : hex);
  const shadowInk = isLightPrint ? '#CBD5E1' : INK;

  switch (sceneType) {
    /* 00. 4-2 분수의 덧셈과 뺄셈 도감 설명서 */
    case 'fracadd_guide': {
      const legend = [
        { color: '#2563EB', tag: '기본', rank: '★ N', desc: '단위분수 · 진분수 덧·뺄셈 · 쉬운 대분수 (5장)' },
        { color: '#059669', tag: '필살', rank: '★★ R', desc: '대분수 변신 · 덧셈2법 · 받아내림 펀치 (5장)' },
        { color: '#D97706', tag: '핵심', rank: '★★★ SR', desc: '1의 변신술 · 자연수 - 진분수 (2장)' },
        { color: '#EA580C', tag: '함정/도전', rank: '★★★ SR', desc: '분모덧셈 땡 · 빼기착각 · 빈칸추리 (3장)' },
        { color: '#0F172A', tag: '보스/칭찬', rank: '★★★★ SSR', desc: '3관문 최종 보스 + 마스터 인증 (2장)' },
      ];
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#FFFDF2')} />

          <Frac x={34} y={36} whole={2} num={1} den={4} scale={0.9} />
          <text x="58" y="42" textAnchor="middle" className="font-game" fontSize="15" fill="#DC2626">
            −
          </text>
          <Frac x={78} y={36} num={3} den={4} scale={0.9} />
          <Stickman x={108} y={26} scale={0.6} pose="punch" armL={[-13, 12]} armR={[16, 2]} legL={[-8, 40]} legR={[8, 40]} />

          <text x="176" y="30" textAnchor="middle" className="font-game" fontSize="12" fill={INK}>
            분수 덧·뺄셈 도감!
          </text>
          <text x="176" y="47" textAnchor="middle" className="font-body font-bold" fontSize="8.4" fill="#2563EB">
            4학년 2학기 1단원 (18장)
          </text>

          <rect x="12" y="68" width="218" height="22" rx="2" fill={shadowInk} />
          <rect x="10" y="66" width="218" height="22" rx="2" fill={hlBg('#FEF08A')} stroke={INK} strokeWidth="2" />
          <text x="119" y="81" textAnchor="middle" className="font-game" fontSize="9.1" fill={INK}>
            선수학습(01~03) → 덧셈(04~08) → 뺄셈·받아내림(09~17)
          </text>

          <rect x="12" y="100" width="218" height="122" rx="2" fill={shadowInk} />
          <rect x="10" y="98" width="218" height="122" rx="2" fill="#FFFFFF" stroke={INK} strokeWidth="2.2" />
          <text x="20" y="114" className="font-game" fontSize="9.8" fill={INK}>
            카드 등급표 (표지 1 + 학습·칭찬 17장)
          </text>
          {legend.map((row, idx) => {
            const ry = 133 + idx * 18.2;
            return (
              <g key={row.tag}>
                <rect x="16" y={ry - 7.5} width="8.5" height="8.5" rx="1" fill={row.color} stroke={INK} strokeWidth="1.2" />
                <text x="28" y={ry} className="font-game" fontSize="7.7" fill={row.color}>
                  {row.tag}
                </text>
                <text x="66" y={ry} className="font-mono-num font-bold" fontSize="6.5" fill={INK}>
                  {row.rank}
                </text>
                <text x="103" y={ry} className="font-body font-bold" fontSize="6.4" fill="#475569">
                  {row.desc}
                </text>
              </g>
            );
          })}
        </svg>
      );
    }

    /* 01. [선수학습] 단위분수 몇 개? (1/5 블록 3개 합체 = 3/5) */
    case 'fracadd_unit_count': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#EFF6FF')} />

          <text x="120" y="22" textAnchor="middle" className="font-game" fontSize="13.2" fill="#1D4ED8">
            조각 크기가 같아야 합칠 수 있어!
          </text>

          {/* 5-slot fraction bar at top */}
          <g transform="translate(20, 44)">
            {[0, 1, 2, 3, 4].map((i) => {
              const filled = i < 3;
              return (
                <g key={i}>
                  <rect
                    x={i * 40}
                    y="0"
                    width="40"
                    height="36"
                    fill={filled ? hlBg('#93C5FD') : '#FFFFFF'}
                    stroke={INK}
                    strokeWidth="2"
                  />
                  <Frac
                    x={i * 40 + 20}
                    y={18}
                    num={1}
                    den={5}
                    scale={0.7}
                    barWidth={16}
                    numColor={filled ? '#EA580C' : '#94A3B8'}
                    denColor={filled ? '#1D4ED8' : '#94A3B8'}
                  />
                </g>
              );
            })}
          </g>

          {/* Three curved orange arrows jumping from 1/5 blocks into 3/5! */}
          <path d="M 40 84 Q 70 112 128 118" fill="none" stroke="#EA580C" strokeWidth="2.2" />
          <path d="M 80 84 Q 100 106 132 116" fill="none" stroke="#EA580C" strokeWidth="2.2" />
          <path d="M 120 84 Q 126 102 136 114" fill="none" stroke="#EA580C" strokeWidth="2.2" />

          {/* Jollaman lifting the 3rd block */}
          <Stickman x={54} y={138} scale={0.72} pose="happy" armL={[-13, 12]} armR={[16, -2]} legL={[-8, 38]} legR={[8, 38]} />

          <text x="116" y="150" textAnchor="middle" className="font-game" fontSize="11.5" fill="#EA580C">
            3개 합체!
          </text>

          <Frac x={172} y={144} num={3} den={5} scale={1.38} barWidth={26} />

          <text x="120" y="212" textAnchor="middle" className="font-game" fontSize="11.5" fill={INK}>
            분모(5)는 조각 크기! <tspan fill="#EA580C">분자(3)</tspan>는 조각 개수!
          </text>
        </svg>
      );
    }

    /* 02. [선수학습] 1은 분모·분자가 같은 분수! (1 = 4/4 = 5/5) */
    case 'fracadd_whole_one': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#FFFBEB')} />

          <text x="120" y="22" textAnchor="middle" className="font-game" fontSize="13.5" fill="#B45309">
            1은 분모에 맞춰 자유자재 변신술!
          </text>

          {/* Left: Giant whole 1 with hero Jollaman zapping it */}
          <text x="40" y="108" textAnchor="middle" className="font-game" fontSize="66" fill="#047857" stroke={INK} strokeWidth="2">
            1
          </text>
          <Stickman x={78} y={120} scale={0.62} pose="hero" armL={[-14, 14]} armR={[18, 0]} legL={[-8, 36]} legR={[8, 36]} />

          {/* Magic Split Beams */}
          <path d="M 96 108 Q 124 70 152 68" fill="none" stroke="#EA580C" strokeWidth="2.4" strokeDasharray="4 2" />
          <path d="M 96 116 L 152 116" fill="none" stroke="#2563EB" strokeWidth="2.4" strokeDasharray="4 2" />
          <path d="M 96 124 Q 124 156 152 158" fill="none" stroke="#059669" strokeWidth="2.4" strokeDasharray="4 2" />

          {/* 3 visual transformations on right */}
          {/* 3/3 */}
          <Frac x={170} y={66} num={3} den={3} scale={0.95} />
          <g transform="translate(192, 54)">
            {[0, 1, 2].map((i) => (
              <rect key={i} x={i * 12} y="0" width="12" height="22" fill={hlBg('#FED7AA')} stroke={INK} strokeWidth="1.5" />
            ))}
          </g>

          {/* 4/4 */}
          <Frac x={170} y={114} num={4} den={4} scale={0.95} />
          <g transform="translate(192, 102)">
            {[0, 1, 2, 3].map((i) => (
              <rect key={i} x={i * 9} y="0" width="9" height="22" fill={hlBg('#BFDBFE')} stroke={INK} strokeWidth="1.5" />
            ))}
          </g>

          {/* 5/5 */}
          <Frac x={170} y={162} num={5} den={5} scale={0.95} />
          <g transform="translate(192, 150)">
            {[0, 1, 2, 3, 4].map((i) => (
              <rect key={i} x={i * 7.2} y="0" width="7.2" height="22" fill={hlBg('#A7F3D0')} stroke={INK} strokeWidth="1.5" />
            ))}
          </g>

          <text x="120" y="212" textAnchor="middle" className="font-game" fontSize="11.2" fill={INK}>
            뺄셈할 땐 상대 <tspan fill="#2563EB">분모</tspan>를 보고 <tspan fill="#059669">1을 변신</tspan>시켜!
          </text>
        </svg>
      );
    }

    /* 03. [선수학습] 대분수 ↔ 가분수 순간 변신 (2 1/4 = 1 5/4 = 9/4) */
    case 'fracadd_mixed_improper': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#ECFDF5')} />

          <text x="120" y="22" textAnchor="middle" className="font-game" fontSize="13.2" fill="#047857">
            자연수 1이 넘어오면 분자 +분모!!
          </text>

          {/* Left: 2 1/4 */}
          <Frac x={44} y={84} whole={2} num={1} den={4} scale={1.14} />

          {/* Arrow 1: 1 splits into +4! */}
          <path d="M 62 66 Q 94 42 122 64" fill="none" stroke="#EA580C" strokeWidth="2.4" />
          <path d="M 116 64 L 124 66 L 120 58" fill="none" stroke="#EA580C" strokeWidth="2.2" strokeLinecap="round" />
          <text x="92" y="46" textAnchor="middle" className="font-game" fontSize="9.8" fill="#EA580C">
            1 빌려 +4!
          </text>

          {/* Middle: 1 5/4 */}
          <Frac x={128} y={84} whole={1} num={5} den={4} scale={1.14} />

          {/* Arrow 2: another 1 splits into +4! */}
          <path d="M 146 66 Q 178 42 204 64" fill="none" stroke="#2563EB" strokeWidth="2.4" />
          <path d="M 198 64 L 206 66 L 202 58" fill="none" stroke="#2563EB" strokeWidth="2.2" strokeLinecap="round" />
          <text x="176" y="46" textAnchor="middle" className="font-game" fontSize="9.8" fill="#2563EB">
            또 +4!
          </text>

          {/* Right: 9/4 */}
          <Frac x={208} y={84} num={9} den={4} scale={1.18} />

          {/* Visual chocolate bars at bottom showing 2 whole + 1/4 */}
          <g transform="translate(22, 124)">
            <rect x="0" y="0" width="56" height="24" fill={hlBg('#A7F3D0')} stroke={INK} strokeWidth="1.8" />
            <text x="28" y="16" textAnchor="middle" className="font-game" fontSize="11" fill="#047857">
              1 (4조각)
            </text>
            <rect x="64" y="0" width="56" height="24" fill={hlBg('#FEF08A')} stroke={INK} strokeWidth="1.8" strokeDasharray="3 2" />
            {[1, 2, 3].map((k) => (
              <line key={k} x1={64 + k * 14} y1="0" x2={64 + k * 14} y2="24" stroke={INK} strokeWidth="1.2" />
            ))}
            <text x="92" y="38" textAnchor="middle" className="font-game" fontSize="9.5" fill="#EA580C">
              쪼개면 +4조각!
            </text>
            <rect x="128" y="0" width="14" height="24" fill={hlBg('#FED7AA')} stroke={INK} strokeWidth="1.8" />
            <rect x="142" y="0" width="42" height="24" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="1.4" strokeDasharray="2 2" />
          </g>

          <Stickman x={208} y={142} scale={0.58} pose="sunglasses" armL={[-13, 14]} armR={[14, 6]} legL={[-7, 34]} legR={[7, 34]} />

          <text x="120" y="212" textAnchor="middle" className="font-game" fontSize="11.2" fill={INK}>
            자연수 1이 분자로 넘어가면 <tspan fill="#EA580C">분모만큼(+4)</tspan> 커져!
          </text>
        </svg>
      );
    }

    /* 04. 진분수의 덧셈 (분모 같을 때: 2/5 + 1/5 = 3/5) */
    case 'fracadd_proper_add': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#EFF6FF')} />

          <text x="120" y="22" textAnchor="middle" className="font-game" fontSize="13.5" fill="#1D4ED8">
            분모는 그대로! 분자끼리만 더해!
          </text>

          {/* Visual 5-slot bar combining 2 blue + 1 orange */}
          <g transform="translate(20, 40)">
            {[0, 1, 2, 3, 4].map((i) => (
              <rect
                key={i}
                x={i * 40}
                y="0"
                width="40"
                height="28"
                fill={i < 2 ? hlBg('#93C5FD') : i === 2 ? hlBg('#FED7AA') : '#FFFFFF'}
                stroke={INK}
                strokeWidth="2"
              />
            ))}
            <text x="40" y="42" textAnchor="middle" className="font-game" fontSize="10" fill="#2563EB">
              2조각
            </text>
            <text x="100" y="42" textAnchor="middle" className="font-game" fontSize="10" fill="#EA580C">
              + 1조각!
            </text>
          </g>

          {/* Equation with color arrows */}
          <Frac x={38} y={136} num={2} den={5} scale={1.15} />
          <text x="64" y="142" textAnchor="middle" className="font-game" fontSize="18" fill={INK}>
            +
          </text>
          <Frac x={90} y={136} num={1} den={5} scale={1.15} />
          <text x="116" y="142" textAnchor="middle" className="font-game" fontSize="18" fill={INK}>
            =
          </text>
          <Frac x={156} y={136} num="2+1" den={5} scale={1.12} barWidth={36} />
          <text x="194" y="142" textAnchor="middle" className="font-game" fontSize="18" fill={INK}>
            =
          </text>
          <Frac x={218} y={136} num={3} den={5} scale={1.18} numColor="#059669" denColor="#1D4ED8" />

          {/* Top orange arrow (numerators add) */}
          <path d="M 38 110 Q 64 94 90 110" fill="none" stroke="#EA580C" strokeWidth="2.4" />
          <text x="64" y="100" textAnchor="middle" className="font-game" fontSize="10" fill="#EA580C">
            분자끼리 +
          </text>

          {/* Bottom blue bridge (denominator stays 5) */}
          <path d="M 38 164 Q 96 184 156 164" fill="none" stroke="#2563EB" strokeWidth="2.4" />
          <text x="96" y="185" textAnchor="middle" className="font-game" fontSize="10" fill="#2563EB">
            분모 5는 꼼짝 마!!
          </text>

          <Stickman x={208} y={168} scale={0.52} pose="happy" armL={[-13, 12]} armR={[15, 2]} legL={[-7, 32]} legR={[7, 32]} />

          <text x="120" y="214" textAnchor="middle" className="font-game" fontSize="11.5" fill={INK}>
            1/5이 <tspan fill="#EA580C">2개 + 1개 = 3개</tspan>니까 정답 <tspan fill="#059669">3/5</tspan>!
          </text>
        </svg>
      );
    }

    /* 05. [함정] 분모까지 더하면 대폭발 땡! (2/5 + 1/5 = 3/10 X) */
    case 'fracadd_denom_add_trap': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#FEF2F2')} />

          <text x="120" y="22" textAnchor="middle" className="font-game" fontSize="13.2" fill="#B91C1C">
            분모끼리 더하면 조각이 반토막 땡!!
          </text>

          <Frac x={34} y={78} num={2} den={5} scale={1.12} />
          <text x="58" y="84" textAnchor="middle" className="font-game" fontSize="16" fill={INK}>
            +
          </text>
          <Frac x={82} y={78} num={1} den={5} scale={1.12} />
          <text x="108" y="84" textAnchor="middle" className="font-game" fontSize="16" fill={INK}>
            =
          </text>

          {/* Wrong 3/10 with red X & lightning */}
          <Frac x={144} y={78} num={3} den={10} scale={1.18} numColor="#94A3B8" denColor="#DC2626" barWidth={26} />
          <path d="M 34 104 Q 88 124 140 104" fill="none" stroke="#DC2626" strokeWidth="2.4" strokeDasharray="3 2" />
          <text x="88" y="128" textAnchor="middle" className="font-game" fontSize="10.2" fill="#DC2626">
            5 + 5 = 10?! 절대 금지!
          </text>
          <line x1="126" y1="54" x2="162" y2="102" stroke="#DC2626" strokeWidth="3.2" />
          <line x1="162" y1="54" x2="126" y2="102" stroke="#DC2626" strokeWidth="3.2" />

          {/* Shocked skeleton */}
          <SkeletonJollaman x={202} y={76} scale={0.82} />

          {/* Comparison pizza slices: 3/5 vs tiny 3/10 */}
          <text x="56" y="156" textAnchor="middle" className="font-game" fontSize="10.8" fill="#059669">
            진짜 답 (3/5)
          </text>
          <g transform="translate(22, 164)">
            {[0, 1, 2, 3, 4].map((i) => (
              <rect key={i} x={i * 14} y="0" width="14" height="18" fill={i < 3 ? '#6EE7B7' : '#FFFFFF'} stroke={INK} strokeWidth="1.4" />
            ))}
          </g>

          <text x="174" y="156" textAnchor="middle" className="font-game" fontSize="10.8" fill="#DC2626">
            망한 답 (3/10)
          </text>
          <g transform="translate(134, 164)">
            {Array.from({ length: 10 }).map((_, i) => (
              <rect key={i} x={i * 8} y="0" width="8" height="18" fill={i < 3 ? '#FCA5A5' : '#FFFFFF'} stroke={INK} strokeWidth="1.2" />
            ))}
          </g>

          <text x="120" y="214" textAnchor="middle" className="font-game" fontSize="11.2" fill={INK}>
            더했는데 오히려 작아졌지? <tspan fill="#DC2626">분모는 절대 안 더해!</tspan>
          </text>
        </svg>
      );
    }

    /* 06. 합이 1을 넘는 진분수의 덧셈 (3/4 + 2/4 = 5/4 -> 1 1/4) */
    case 'fracadd_proper_carry': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#ECFDF5')} />

          <text x="120" y="22" textAnchor="middle" className="font-game" fontSize="13.2" fill="#047857">
            합이 1을 넘기면 대분수로 변신!
          </text>

          {/* 3/4 + 2/4 = 5/4 */}
          <Frac x={34} y={66} num={3} den={4} scale={1.08} />
          <text x="58" y="72" textAnchor="middle" className="font-game" fontSize="16" fill={INK}>
            +
          </text>
          <Frac x={82} y={66} num={2} den={4} scale={1.08} />
          <text x="106" y="72" textAnchor="middle" className="font-game" fontSize="16" fill={INK}>
            =
          </text>
          <Frac x={132} y={66} num={5} den={4} scale={1.14} numColor="#DC2626" />

          {/* Arrow to 1 1/4 */}
          <path d="M 152 66 L 176 66" stroke="#059669" strokeWidth="2.8" strokeLinecap="round" />
          <path d="M 170 61 L 178 66 L 170 71" fill="none" stroke="#059669" strokeWidth="2.4" strokeLinecap="round" />
          <Frac x={210} y={66} whole={1} num={1} den={4} scale={1.16} />

          {/* Visual 2 bars showing 4/4 fills 1 whole + 1/4 extra */}
          <g transform="translate(22, 110)">
            {[0, 1, 2, 3].map((i) => (
              <rect
                key={`a-${i}`}
                x={i * 22}
                y="0"
                width="22"
                height="26"
                fill={i < 3 ? hlBg('#93C5FD') : hlBg('#FED7AA')}
                stroke={INK}
                strokeWidth="1.8"
              />
            ))}
            <text x="44" y="42" textAnchor="middle" className="font-game" fontSize="11" fill="#047857">
              1판 꽉 참! (4/4 = 1)
            </text>

            <rect x="104" y="0" width="22" height="26" fill={hlBg('#FED7AA')} stroke={INK} strokeWidth="1.8" />
            {[1, 2, 3].map((i) => (
              <rect key={`b-${i}`} x={104 + i * 22} y="0" width="22" height="26" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="1.4" strokeDasharray="3 2" />
            ))}
            <text x="115" y="42" textAnchor="middle" className="font-game" fontSize="11" fill="#EA580C">
              남은 1/4!
            </text>
          </g>

          <Stickman x={198} y={142} scale={0.58} pose="hero" armL={[-13, 12]} armR={[15, 2]} legL={[-7, 34]} legR={[7, 34]} />

          <text x="120" y="212" textAnchor="middle" className="font-game" fontSize="11.2" fill={INK}>
            가분수 <tspan fill="#DC2626">5/4</tspan>는 <tspan fill="#047857">4/4(=1)</tspan> + <tspan fill="#EA580C">1/4</tspan> = <tspan fill="#059669">1과 1/4</tspan>!
          </text>
        </svg>
      );
    }

    /* 07. 자연수+진분수 & 받아올림 덧셈 (2 + 3/5 = 2 3/5, 2/5 + 1 4/5 = 2 1/5) */
    case 'fracadd_whole_plus_frac': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#EFF6FF')} />

          <text x="120" y="22" textAnchor="middle" className="font-game" fontSize="13.2" fill="#1D4ED8">
            자연수는 자연수 자리에 쏙!
          </text>

          {/* Top: Simple combine 2 + 3/5 = 2 3/5 */}
          <text x="48" y="64" textAnchor="middle" className="font-game" fontSize="24" fill="#047857">
            2
          </text>
          <text x="72" y="62" textAnchor="middle" className="font-game" fontSize="16" fill={INK}>
            +
          </text>
          <Frac x={98} y={56} num={3} den={5} scale={1.06} />
          <text x="126" y="62" textAnchor="middle" className="font-game" fontSize="16" fill={INK}>
            =
          </text>
          <Frac x={166} y={56} whole={2} num={3} den={5} scale={1.12} />
          <text x="206" y="62" textAnchor="middle" className="font-game" fontSize="11" fill="#059669">
            합체 끝!
          </text>

          <line x1="16" y1="92" x2="224" y2="92" stroke="#BFDBFE" strokeWidth="2" strokeDasharray="4 3" />

          {/* Bottom: 2/5 + 1 4/5 = 1 6/5 -> 2 1/5! */}
          <text x="120" y="114" textAnchor="middle" className="font-game" fontSize="11.5" fill="#EA580C">
            분수가 1을 넘으면 자연수로 +1 점프!
          </text>

          <Frac x={34} y={148} num={2} den={5} scale={1.02} />
          <text x="56" y="154" textAnchor="middle" className="font-game" fontSize="15" fill={INK}>
            +
          </text>
          <Frac x={88} y={148} whole={1} num={4} den={5} scale={1.02} />
          <text x="112" y="154" textAnchor="middle" className="font-game" fontSize="15" fill={INK}>
            =
          </text>
          <Frac x={144} y={148} whole={1} num={6} den={5} scale={1.02} numColor="#DC2626" />

          {/* Carry arrow from 6/5 to whole 1 -> 2 */}
          <path d="M 144 126 Q 134 114 124 134" fill="none" stroke="#DC2626" strokeWidth="2" />
          <text x="170" y="154" textAnchor="middle" className="font-game" fontSize="15" fill={INK}>
            →
          </text>
          <Frac x={208} y={148} whole={2} num={1} den={5} scale={1.12} />

          <Stickman x={34} y={168} scale={0.48} pose="happy" armL={[-12, 12]} armR={[14, 2]} legL={[-7, 32]} legR={[7, 32]} />

          <text x="130" y="212" textAnchor="middle" className="font-game" fontSize="11.2" fill={INK}>
            <tspan fill="#DC2626">6/5 = 1과 1/5</tspan>이니까 앞 자연수에 <tspan fill="#059669">+1</tspan> 올려 <tspan fill="#047857">2와 1/5</tspan>!
          </text>
        </svg>
      );
    }

    /* 08. 대분수의 덧셈 2가지 방법! (1 3/5 + 2 4/5 = 4 2/5) */
    case 'fracadd_mixed_add_methods': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#ECFDF5')} />

          <text x="120" y="22" textAnchor="middle" className="font-game" fontSize="13.2" fill="#047857">
            대분수 덧셈! 따로 vs 가분수 2가지 길
          </text>

          <Frac x={96} y={48} whole={1} num={3} den={5} scale={0.92} />
          <text x="120" y="54" textAnchor="middle" className="font-game" fontSize="14" fill={INK}>
            +
          </text>
          <Frac x={148} y={48} whole={2} num={4} den={5} scale={0.92} />

          {/* Left Method 1: Separate Whole + Frac */}
          <text x="60" y="88" textAnchor="middle" className="font-game" fontSize="11" fill="#059669">
            방법① 따로 더해 합체!
          </text>
          <text x="60" y="106" textAnchor="middle" className="font-game" fontSize="10.5" fill="#047857">
            자연수: 1 + 2 = 3
          </text>
          <text x="26" y="132" textAnchor="middle" className="font-game" fontSize="10.5" fill="#EA580C">
            분수:
          </text>
          <Frac x={56} y={128} num={7} den={5} scale={0.78} numColor="#DC2626" />
          <text x="78" y="132" textAnchor="middle" className="font-game" fontSize="11" fill={INK}>
            =
          </text>
          <Frac x={102} y={128} whole={1} num={2} den={5} scale={0.78} />

          <Frac x={64} y={168} whole={4} num={2} den={5} scale={1.06} />

          <line x1="120" y1="76" x2="120" y2="188" stroke="#A7F3D0" strokeWidth="2" strokeDasharray="4 3" />

          {/* Right Method 2: Improper */}
          <text x="180" y="88" textAnchor="middle" className="font-game" fontSize="11" fill="#2563EB">
            방법② 가분수 변신!
          </text>
          <Frac x={152} y={118} num={8} den={5} scale={0.86} />
          <text x="174" y="124" textAnchor="middle" className="font-game" fontSize="12" fill={INK}>
            +
          </text>
          <Frac x={196} y={118} num={14} den={5} scale={0.86} barWidth={26} />

          <path d="M 176 138 L 176 150" stroke="#2563EB" strokeWidth="2.2" />
          <Frac x={156} y={168} num={22} den={5} scale={0.88} barWidth={26} />
          <text x="178" y="174" textAnchor="middle" className="font-game" fontSize="12" fill={INK}>
            =
          </text>
          <Frac x={208} y={168} whole={4} num={2} den={5} scale={1.0} />

          <text x="120" y="214" textAnchor="middle" className="font-game" fontSize="11.2" fill={INK}>
            어느 길로 가도 똑같은 정답 <tspan fill="#059669">4와 2/5</tspan> 완성!
          </text>
        </svg>
      );
    }

    /* 09. 진분수의 뺄셈 (4/5 - 1/5 = 3/5) */
    case 'fracadd_proper_sub': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#EFF6FF')} />

          <text x="120" y="22" textAnchor="middle" className="font-game" fontSize="13.5" fill="#1D4ED8">
            뺄셈도 분모는 그대로! 분자만 빼!
          </text>

          {/* Number line 0 to 1 in 5 steps */}
          <line x1="20" y1="88" x2="220" y2="88" stroke={INK} strokeWidth="2.6" />
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const tx = 28 + i * 36.8;
            return (
              <g key={i}>
                <line x1={tx} y1="82" x2={tx} y2="94" stroke={INK} strokeWidth={i === 0 || i === 5 ? 2.6 : 1.6} />
                {i === 0 && (
                  <text x={tx} y="108" textAnchor="middle" className="font-game" fontSize="11" fill={INK}>
                    0
                  </text>
                )}
                {i === 3 && (
                  <Frac x={tx} y={108} num={3} den={5} scale={0.68} numColor="#059669" denColor="#059669" />
                )}
                {i === 4 && (
                  <Frac x={tx} y={108} num={4} den={5} scale={0.68} />
                )}
                {i === 5 && (
                  <text x={tx} y="108" textAnchor="middle" className="font-game" fontSize="11" fill={INK}>
                    1
                  </text>
                )}
              </g>
            );
          })}

          {/* Forward jump 0 -> 4/5 */}
          <path d="M 28 82 Q 100 38 175 82" fill="none" stroke="#2563EB" strokeWidth="2.2" strokeDasharray="4 2" />
          {/* Backward jump 4/5 -> 3/5 */}
          <path d="M 175 80 Q 156 54 138 80" fill="none" stroke="#DC2626" strokeWidth="2.6" />
          <path d="M 143 76 L 137 81 L 145 83" fill="none" stroke="#DC2626" strokeWidth="2.2" strokeLinecap="round" />
          <text x="156" y="54" textAnchor="middle" className="font-game" fontSize="10.5" fill="#DC2626">
            -1/5 쩜프!
          </text>

          <Stickman x={136} y={40} scale={0.44} pose="hero" armL={[-13, 12]} armR={[14, 4]} legL={[-7, 32]} legR={[7, 32]} />

          {/* Equation below */}
          <Frac x={44} y={162} num={4} den={5} scale={1.12} />
          <text x="68" y="168" textAnchor="middle" className="font-game" fontSize="18" fill="#DC2626">
            −
          </text>
          <Frac x={92} y={162} num={1} den={5} scale={1.12} />
          <text x="116" y="168" textAnchor="middle" className="font-game" fontSize="18" fill={INK}>
            =
          </text>
          <Frac x={156} y={162} num="4−1" den={5} scale={1.12} barWidth={34} />
          <text x="192" y="168" textAnchor="middle" className="font-game" fontSize="18" fill={INK}>
            =
          </text>
          <Frac x={216} y={162} num={3} den={5} scale={1.16} numColor="#059669" denColor="#1D4ED8" />

          <text x="120" y="214" textAnchor="middle" className="font-game" fontSize="11.5" fill={INK}>
            1/5이 <tspan fill="#EA580C">4개 - 1개 = 3개</tspan>니까 <tspan fill="#059669">3/5</tspan>!
          </text>
        </svg>
      );
    }

    /* 10. (자연수) - (진분수) : 3 - 1/4 = 2 4/4 - 1/4 = 2 3/4 */
    case 'fracadd_whole_minus_frac': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#FFFBEB')} />

          <text x="120" y="22" textAnchor="middle" className="font-game" fontSize="13.2" fill="#B45309">
            자연수에서 1만 떼어 분수로 변신!!
          </text>

          {/* 3 blocks: 1, 1, and 1 split into 4/4 with 1/4 crossed off */}
          <g transform="translate(22, 42)">
            <rect x="0" y="0" width="44" height="32" fill={hlBg('#A7F3D0')} stroke={INK} strokeWidth="2" />
            <text x="22" y="21" textAnchor="middle" className="font-game" fontSize="15" fill="#047857">
              1
            </text>
            <rect x="52" y="0" width="44" height="32" fill={hlBg('#A7F3D0')} stroke={INK} strokeWidth="2" />
            <text x="74" y="21" textAnchor="middle" className="font-game" fontSize="15" fill="#047857">
              1
            </text>

            {/* 3rd block split into 4 quarters */}
            {[0, 1, 2, 3].map((i) => (
              <rect
                key={i}
                x={108 + i * 22}
                y="0"
                width="22"
                height="32"
                fill={i < 3 ? hlBg('#FDE047') : '#F1F5F9'}
                stroke={INK}
                strokeWidth="1.8"
              />
            ))}
            {/* Cross out the 4th quarter (-1/4) */}
            <line x1="176" y1="3" x2="194" y2="29" stroke="#DC2626" strokeWidth="2.8" />
            <line x1="194" y1="3" x2="176" y2="29" stroke="#DC2626" strokeWidth="2.8" />
            <text x="185" y="47" textAnchor="middle" className="font-game" fontSize="10" fill="#DC2626">
              -1/4 먹음!
            </text>
          </g>

          <Stickman x={38} y={132} scale={0.58} pose="hero" armL={[-13, 12]} armR={[16, -2]} legL={[-7, 34]} legR={[7, 34]} />

          {/* Formula transformation */}
          <text x="78" y="138" textAnchor="middle" className="font-game" fontSize="22" fill="#047857">
            3
          </text>
          <text x="98" y="136" textAnchor="middle" className="font-game" fontSize="15" fill="#DC2626">
            −
          </text>
          <Frac x={120} y={130} num={1} den={4} scale={0.96} />
          <text x="142" y="136" textAnchor="middle" className="font-game" fontSize="15" fill={INK}>
            =
          </text>
          <Frac x={174} y={130} whole={2} num={4} den={4} scale={0.96} />
          <text x="196" y="136" textAnchor="middle" className="font-game" fontSize="15" fill="#DC2626">
            −
          </text>
          <Frac x={218} y={130} num={1} den={4} scale={0.96} />

          <text x="150" y="182" textAnchor="middle" className="font-game" fontSize="16" fill={INK}>
            =
          </text>
          <Frac x={186} y={176} whole={2} num={3} den={4} scale={1.12} />

          <text x="120" y="214" textAnchor="middle" className="font-game" fontSize="11.2" fill={INK}>
            3에서 1만 쪼개 <tspan fill="#059669">2와 4/4</tspan> 만든 뒤 분자끼리 쏙 빼!
          </text>
        </svg>
      );
    }

    /* 11. [함정] 3 - 1/4 = 3 1/4?! 또는 자연수 2 까먹음! */
    case 'fracadd_whole_sub_trap': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#FEF2F2')} />

          <text x="120" y="22" textAnchor="middle" className="font-game" fontSize="13.2" fill="#B91C1C">
            3 − 1/4 함정! 남은 2 어디 갔어?!
          </text>

          <text x="48" y="66" textAnchor="middle" className="font-game" fontSize="24" fill="#047857">
            3
          </text>
          <text x="68" y="64" textAnchor="middle" className="font-game" fontSize="16" fill="#DC2626">
            −
          </text>
          <Frac x={90} y={58} num={1} den={4} scale={1.04} />

          {/* Trap 1: 3 1/4 */}
          <text x="58" y="102" textAnchor="middle" className="font-game" fontSize="10.2" fill="#DC2626">
            함정① 더하기 착각!
          </text>
          <Frac x={58} y={128} whole={3} num={1} den={4} scale={0.96} wholeColor="#94A3B8" numColor="#94A3B8" denColor="#94A3B8" />
          <line x1="34" y1="112" x2="82" y2="144" stroke="#DC2626" strokeWidth="2.8" />
          <line x1="82" y1="112" x2="34" y2="144" stroke="#DC2626" strokeWidth="2.8" />

          {/* Trap 2: 3/4 (forgot 2!) */}
          <text x="168" y="102" textAnchor="middle" className="font-game" fontSize="10.2" fill="#DC2626">
            함정② 2는 안 데려가?!
          </text>
          <Frac x={152} y={128} num={3} den={4} scale={0.96} numColor="#94A3B8" denColor="#94A3B8" />
          <line x1="136" y1="112" x2="168" y2="144" stroke="#DC2626" strokeWidth="2.8" />
          <line x1="168" y1="112" x2="136" y2="144" stroke="#DC2626" strokeWidth="2.8" />

          <Stickman x={204} y={118} scale={0.56} pose="crying" armL={[-13, 12]} armR={[13, 12]} legL={[-7, 32]} legR={[7, 32]} />
          <SkeletonJollaman x={54} y={156} scale={0.56} />

          <text x="148" y="182" textAnchor="middle" className="font-game" fontSize="12" fill="#059669">
            정답: 남은 2 꼭 챙겨 2와 3/4!
          </text>

          <text x="120" y="214" textAnchor="middle" className="font-game" fontSize="11.2" fill={INK}>
            1 빌려줬으면 앞 숫자는 꼭 <tspan fill="#DC2626">하나 작은 수(2)</tspan>로!
          </text>
        </svg>
      );
    }

    /* 12. 대분수의 뺄셈 (받아내림 없음: 3 4/5 - 1 2/5 = 2 2/5) */
    case 'fracadd_mixed_sub_easy': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#EFF6FF')} />

          <text x="120" y="22" textAnchor="middle" className="font-game" fontSize="13.2" fill="#1D4ED8">
            앞 분자가 더 크면? 그냥 바로 빼기!
          </text>

          {/* Left: 3 4/5 - 1 2/5 */}
          <Frac x={54} y={92} whole={3} num={4} den={5} scale={1.18} />
          <text x="86" y="98" textAnchor="middle" className="font-game" fontSize="18" fill="#DC2626">
            −
          </text>
          <Frac x={122} y={92} whole={1} num={2} den={5} scale={1.18} />
          <text x="156" y="98" textAnchor="middle" className="font-game" fontSize="18" fill={INK}>
            =
          </text>
          <Frac x={198} y={92} whole={2} num={2} den={5} scale={1.22} />

          {/* Green arc for wholes: 3 - 1 = 2 */}
          <path d="M 32 108 Q 70 134 102 108" fill="none" stroke="#059669" strokeWidth="2.4" />
          <text x="68" y="136" textAnchor="middle" className="font-game" fontSize="10.5" fill="#059669">
            자연수 3−1=2
          </text>

          {/* Orange arc for numerators: 4 - 2 = 2 */}
          <path d="M 54 62 Q 88 38 122 62" fill="none" stroke="#EA580C" strokeWidth="2.4" />
          <text x="88" y="45" textAnchor="middle" className="font-game" fontSize="10.5" fill="#EA580C">
            분자 4−2=2 (빌릴 필요 X!)
          </text>

          <Stickman x={46} y={160} scale={0.62} pose="sunglasses" armL={[-13, 14]} armR={[16, 2]} legL={[-7, 34]} legR={[7, 34]} />
          <text x="148" y="176" textAnchor="middle" className="font-game" fontSize="12" fill="#059669">
            1초 컷 럭키 문제!!
          </text>

          <text x="120" y="214" textAnchor="middle" className="font-game" fontSize="11.2" fill={INK}>
            분자끼리 뺄 수 있으면 <tspan fill="#059669">자연수끼리, 분수끼리</tspan> 따로 빼!
          </text>
        </svg>
      );
    }

    /* 13. [필살] 대분수 뺄셈 받아내림 (3 1/4 - 1 3/4 -> 펀치로 2 5/4 변신!) */
    case 'fracadd_mixed_borrow': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#ECFDF5')} />

          <text x="120" y="21" textAnchor="middle" className="font-game" fontSize="13.2" fill="#047857">
            1에서 3을 못 빼?! 받아내림 펀치!!
          </text>

          {/* Top: 3 1/4 - 1 3/4 with Jollaman punching 3 -> 2 and boosting 1 -> 5! */}
          <Frac x={88} y={62} whole={3} num={1} den={4} scale={1.08} />
          {/* Slash on 3 -> 2 above */}
          <line x1="60" y1="70" x2="72" y2="58" stroke="#DC2626" strokeWidth="2.4" />
          <text x="66" y="48" textAnchor="middle" className="font-game" fontSize="14" fill="#DC2626">
            2
          </text>
          {/* Punching Jollaman from left */}
          <Stickman x={26} y={48} scale={0.58} pose="punch" armL={[-10, 18]} armR={[24, 14]} legL={[-8, 36]} legR={[8, 36]} />

          {/* Curved +4 jump from 3 to 1 */}
          <path d="M 66 56 Q 78 32 90 48" fill="none" stroke="#EA580C" strokeWidth="2.2" />
          <text x="108" y="48" textAnchor="middle" className="font-game" fontSize="11" fill="#EA580C">
            +4!
          </text>

          <text x="130" y="68" textAnchor="middle" className="font-game" fontSize="16" fill="#DC2626">
            −
          </text>
          <Frac x={164} y={62} whole={1} num={3} den={4} scale={1.08} />

          {/* Arrow down to transformed subtraction */}
          <path d="M 120 90 L 120 110" stroke="#059669" strokeWidth="2.6" strokeLinecap="round" />
          <path d="M 114 104 L 120 112 L 126 104" fill="none" stroke="#059669" strokeWidth="2.4" strokeLinecap="round" />
          <text x="172" y="106" textAnchor="middle" className="font-game" fontSize="10.2" fill="#059669">
            2와 5/4로 변신!
          </text>

          {/* Bottom row: 2 5/4 - 1 3/4 = 1 2/4 */}
          <Frac x={44} y={148} whole={2} num={5} den={4} scale={1.12} wholeColor="#DC2626" />
          <text x="78" y="154" textAnchor="middle" className="font-game" fontSize="16" fill="#DC2626">
            −
          </text>
          <Frac x={112} y={148} whole={1} num={3} den={4} scale={1.12} />
          <text x="144" y="154" textAnchor="middle" className="font-game" fontSize="16" fill={INK}>
            =
          </text>
          <Frac x={186} y={148} whole={1} num={2} den={4} scale={1.2} />

          <text x="120" y="214" textAnchor="middle" className="font-game" fontSize="11.2" fill={INK}>
            앞 자연수 <tspan fill="#DC2626">-1</tspan> 줄이고, 분자에 <tspan fill="#EA580C">+분모(4)</tspan> 얹으면 끝!
          </text>
        </svg>
      );
    }

    /* 14. [필살] 대분수 뺄셈 ② 가분수 한 방 컷! (3 1/4 - 1 3/4 = 13/4 - 7/4 = 6/4 = 1 2/4) */
    case 'fracadd_mixed_sub_improper': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#ECFDF5')} />

          <text x="120" y="22" textAnchor="middle" className="font-game" fontSize="13.2" fill="#047857">
            빌려오기 헷갈릴 땐? 둘 다 가분수 치트키!
          </text>

          {/* Step 1: 3 1/4 - 1 3/4 */}
          <Frac x={64} y={56} whole={3} num={1} den={4} scale={1.04} />
          <text x="96" y="62" textAnchor="middle" className="font-game" fontSize="16" fill="#DC2626">
            −
          </text>
          <Frac x={130} y={56} whole={1} num={3} den={4} scale={1.04} />
          <text x="178" y="62" textAnchor="middle" className="font-game" fontSize="10.5" fill="#2563EB">
            둘 다 가분수!
          </text>

          {/* Downward conversion arrows */}
          <path d="M 64 82 L 64 102" stroke="#EA580C" strokeWidth="2.4" />
          <path d="M 130 82 L 130 102" stroke="#EA580C" strokeWidth="2.4" />

          {/* Step 2: 13/4 - 7/4 = 6/4 = 1 2/4 */}
          <Frac x={44} y={136} num={13} den={4} scale={1.08} barWidth={26} />
          <text x="72" y="142" textAnchor="middle" className="font-game" fontSize="16" fill="#DC2626">
            −
          </text>
          <Frac x={96} y={136} num={7} den={4} scale={1.08} />
          <text x="120" y="142" textAnchor="middle" className="font-game" fontSize="16" fill={INK}>
            =
          </text>
          <Frac x={144} y={136} num={6} den={4} scale={1.08} numColor="#059669" />
          <text x="168" y="142" textAnchor="middle" className="font-game" fontSize="16" fill={INK}>
            =
          </text>
          <Frac x={202} y={136} whole={1} num={2} den={4} scale={1.12} />

          <Stickman x={40} y={166} scale={0.54} pose="hero" armL={[-13, 12]} armR={[15, 2]} legL={[-7, 32]} legR={[7, 32]} />
          <text x="142" y="182" textAnchor="middle" className="font-game" fontSize="11.2" fill="#059669">
            13 − 7 = 6! 받아내림 실수 0%!
          </text>

          <text x="120" y="214" textAnchor="middle" className="font-game" fontSize="11.2" fill={INK}>
            가분수로 바꾸고 <tspan fill="#EA580C">분자끼리만 쏙 빼고</tspan> 다시 대분수로!
          </text>
        </svg>
      );
    }

    /* 15. 크기 비교 & 빈칸 □ 구하기 (1 2/5 + □ = 3 1/5) */
    case 'fracadd_compare_blank': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#F5F3FF')} />

          <text x="120" y="22" textAnchor="middle" className="font-game" fontSize="13.2" fill="#5B21B6">
            덧셈 빈칸 □는 거꾸로 빼서 구해!!
          </text>

          {/* Equation: 1 2/5 + □ = 3 1/5 */}
          <Frac x={54} y={62} whole={1} num={2} den={5} scale={1.04} />
          <text x="86" y="68" textAnchor="middle" className="font-game" fontSize="16" fill={INK}>
            +
          </text>
          <rect x="100" y="48" width="28" height="28" rx="3" fill={hlBg('#FEF08A')} stroke="#7C3AED" strokeWidth="2.4" strokeDasharray="3 2" />
          <text x="114" y="68" textAnchor="middle" className="font-game" fontSize="16" fill="#7C3AED">
            ?
          </text>
          <text x="144" y="68" textAnchor="middle" className="font-game" fontSize="16" fill={INK}>
            =
          </text>
          <Frac x={182} y={62} whole={3} num={1} den={5} scale={1.04} />

          {/* Reverse subtraction arrow */}
          <path d="M 182 88 Q 148 112 114 96" fill="none" stroke="#DC2626" strokeWidth="2.4" />
          <path d="M 120 93 L 112 95 L 117 102" fill="none" stroke="#DC2626" strokeWidth="2.2" strokeLinecap="round" />
          <text x="150" y="116" textAnchor="middle" className="font-game" fontSize="10.2" fill="#DC2626">
            거꾸로 빼기!
          </text>

          {/* Solving row: 2 6/5 - 1 2/5 = 1 4/5 */}
          <Frac x={44} y={154} whole={2} num={6} den={5} scale={1.04} />
          <text x="76" y="160" textAnchor="middle" className="font-game" fontSize="16" fill="#DC2626">
            −
          </text>
          <Frac x={108} y={154} whole={1} num={2} den={5} scale={1.04} />
          <text x="138" y="160" textAnchor="middle" className="font-game" fontSize="16" fill={INK}>
            =
          </text>
          <Frac x={176} y={154} whole={1} num={4} den={5} scale={1.16} />

          <Stickman x={212} y={142} scale={0.54} pose="sunglasses" armL={[-13, 12]} armR={[14, 4]} legL={[-7, 32]} legR={[7, 32]} />

          <text x="120" y="214" textAnchor="middle" className="font-game" fontSize="11.2" fill={INK}>
            <tspan fill="#7C3AED">3과 1/5</tspan>을 <tspan fill="#EA580C">2와 6/5</tspan>로 빌려 빼면 □ = <tspan fill="#059669">1과 4/5</tspan>!
          </text>
        </svg>
      );
    }

    /* 16. 최종 보스! 분수 덧·뺄셈 3관문 */
    case 'fracadd_boss': {
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
            최종 보스! 분수 덧·뺄셈 3관문
          </text>

          {/* 3 Boss Podiums */}
          <g transform="translate(46, 70)">
            <rect x="-31" y="-25" width="66" height="56" rx="2" fill={bossShadow} />
            <rect x="-34" y="-28" width="66" height="56" rx="2" fill="#FFFFFF" stroke={INK} strokeWidth="2.4" />
            <text x="-1" y="-12" textAnchor="middle" className="font-game" fontSize="9.2" fill="#DC2626">
              1관문
            </text>
            <Frac x={-16} y={10} num={3} den={7} scale={0.74} barWidth={16} />
            <text x="-1" y="14" textAnchor="middle" className="font-game" fontSize="11" fill={INK}>
              +
            </text>
            <Frac x={15} y={10} num={6} den={7} scale={0.74} barWidth={16} />
          </g>

          <g transform="translate(120, 70)">
            <rect x="-31" y="-25" width="66" height="56" rx="2" fill={bossShadow} />
            <rect x="-34" y="-28" width="66" height="56" rx="2" fill="#FFFFFF" stroke={INK} strokeWidth="2.4" />
            <text x="-1" y="-12" textAnchor="middle" className="font-game" fontSize="9.2" fill="#DC2626">
              2관문
            </text>
            <text x="-16" y="15" textAnchor="middle" className="font-game" fontSize="16" fill="#047857">
              4
            </text>
            <text x="-2" y="14" textAnchor="middle" className="font-game" fontSize="11" fill="#DC2626">
              −
            </text>
            <Frac x={15} y={10} num={2} den={5} scale={0.76} barWidth={16} />
          </g>

          <g transform="translate(194, 70)">
            <rect x="-31" y="-25" width="66" height="56" rx="2" fill={bossShadow} />
            <rect x="-34" y="-28" width="66" height="56" rx="2" fill="#FFFFFF" stroke={INK} strokeWidth="2.4" />
            <text x="-1" y="-12" textAnchor="middle" className="font-game" fontSize="9.2" fill="#DC2626">
              3관문
            </text>
            <Frac x={-14} y={10} whole={3} num={2} den={6} scale={0.68} barWidth={15} />
            <text x="1" y="14" textAnchor="middle" className="font-game" fontSize="10" fill="#DC2626">
              −
            </text>
            <Frac x={19} y={10} whole={1} num={5} den={6} scale={0.68} barWidth={15} />
          </g>

          <Stickman x={54} y={142} scale={0.84} pose="hero" armL={[-14, 18]} armR={[16, 2]} strokeColor={bossStroke} />

          <text x="150" y="148" textAnchor="middle" className="font-game" fontSize="11.5" fill={goldText}>
            1 빌려오기 &amp; 가분수 변신 출동!
          </text>
          <text x="150" y="170" textAnchor="middle" className="font-game" fontSize="10.8" fill={isBw ? INK : '#FCA5A5'}>
            받아내림 펀치로 3관문 클리어!
          </text>

          <text x="120" y="212" textAnchor="middle" className="font-game" fontSize="11.5" fill={goldText}>
            세 관문 정답을 아래 팁에서 확인하자!
          </text>
        </svg>
      );
    }

    /* 17. 4-2 분수의 덧셈과 뺄셈 완주 축하 포카 */
    case 'fracadd_praise':
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
            4-2 분수 덧·뺄셈 완주 축하!!
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
            <text x="0" y="-1" textAnchor="middle" className="font-game" fontSize="10.5" fill={INK}>
              받아내림왕
            </text>
            <rect x="-4" y="13" width="8" height="10" fill="#FACC15" stroke={INK} strokeWidth="1.5" />
            <rect x="-15" y="23" width="30" height="7" rx="1.5" fill="#FFFFFF" stroke={INK} strokeWidth="1.5" />
          </g>

          <rect x="20" y="134" width="204" height="58" rx="4" fill={shadowInk} />
          <rect x="17" y="131" width="204" height="58" rx="4" fill="#FFFFFF" stroke="#FACC15" strokeWidth="2.2" />
          <text x="119" y="149" textAnchor="middle" className="font-game" fontSize="11.2" fill="#1D4ED8">
            분수의 덧셈과 뺄셈 18장 클리어!
          </text>
          <text x="119" y="166" textAnchor="middle" className="font-body font-bold" fontSize="8.8" fill={INK}>
            자연수-분수부터 대분수 받아내림까지 완전 정복!
          </text>
          <text x="119" y="182" textAnchor="middle" className="font-game" fontSize="9.5" fill="#DC2626">
            ★ 졸라수학맨 공식 4-2 분수 마스터 ★
          </text>

          <text x="120" y="212" textAnchor="middle" className="font-game" fontSize="11" fill={goldText}>
            최강 받아내림 펀치 챔피언!!
          </text>
        </svg>
      );
    }
  }
};
