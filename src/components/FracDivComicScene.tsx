import React from 'react';
import { EpisodeSceneType, PrintInkMode } from '../types/card';

interface FracDivComicSceneProps {
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

type StickPose =
  | 'sunglasses'
  | 'happy'
  | 'headband'
  | 'hero'
  | 'panic'
  | 'crying'
  | 'strain'
  | 'punch';

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
  barWidth = 24,
  numColor = '#EA580C',
  denColor = '#1D4ED8',
  wholeColor = '#047857',
  barColor = INK,
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
    <line x1={-barWidth / 2} y1="0" x2={barWidth / 2} y2="0" stroke={barColor} strokeWidth="2.4" strokeLinecap="round" />
    <text x="0" y="16" textAnchor="middle" className="font-game" fontSize="16" fill={denColor}>
      {den}
    </text>
  </g>
);

export const FracDivComicScene: React.FC<FracDivComicSceneProps> = ({
  sceneType,
  inkMode = 'full',
}) => {
  const isLightPrint = inkMode !== 'full';
  const isBw = inkMode === 'bw_worksheet';
  const softBg = (fullColor: string) => (isLightPrint ? '#FFFFFF' : fullColor);

  switch (sceneType) {
    /* 00: 도감 설명서 */
    case 'fracdiv_guide': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#F8FAFC')} />

          <text x="120" y="21" textAnchor="middle" className="font-game" fontSize="13.5" fill={INK}>
            6-2 분수의 나눗셈 도감 (18종)
          </text>

          <rect x="14" y="31" width="212" height="122" rx="4" fill="#FFFFFF" stroke={INK} strokeWidth="2" />
          <line x1="14" y1="53" x2="226" y2="53" stroke={INK} strokeWidth="1.5" />
          <line x1="94" y1="31" x2="94" y2="153" stroke="#CBD5E1" strokeWidth="1.4" />
          <text x="54" y="46" textAnchor="middle" className="font-game" fontSize="10.5" fill="#475569">
            파트
          </text>
          <text x="160" y="46" textAnchor="middle" className="font-game" fontSize="10.5" fill="#475569">
            핵심 공략 코스
          </text>

          {[
            { num: '01~03', tag: '선수학습', color: '#2563EB', desc: '(자연수)÷(자연수), 분수÷자연수' },
            { num: '04~06', tag: '나눗셈원리', color: '#D97706', desc: '덜어내기 · 분자÷분자 · 통분법' },
            { num: '07~12', tag: '역수치트키', color: '#059669', desc: '× 뒤집기 · 대분수 · 함정 탈출' },
            { num: '13~17', tag: '심화·보스', color: '#7C3AED', desc: '몫 어림 · 문장제 · 3관문 클리어' },
          ].map((row, idx) => {
            const ry = 72 + idx * 21;
            return (
              <g key={row.num}>
                <text x="54" y={ry} textAnchor="middle" className="font-game" fontSize="10.2" fill={row.color}>
                  {row.num} {row.tag}
                </text>
                <text x="102" y={ry} className="font-body font-bold" fontSize="9.8" fill={INK}>
                  {row.desc}
                </text>
              </g>
            );
          })}

          <Stickman x={54} y={171} scale={0.78} pose="hero" armL={[-14, 14]} armR={[18, 6]} />
          <rect x="86" y="164" width="142" height="50" rx="5" fill={softBg('#EEF2FF')} stroke="#4F46E5" strokeWidth="2" />
          <text x="157" y="183" textAnchor="middle" className="font-game" fontSize="11.5" fill="#4338CA">
            나누는 분수만 공중제비 얍!
          </text>
          <text x="157" y="201" textAnchor="middle" className="font-body font-bold" fontSize="9.5" fill={INK}>
            왜 뒤집어 곱하는지까지 완벽 마스터!
          </text>
        </svg>
      );
    }

    /* 01: [선수학습] (자연수) ÷ (자연수) = 분수! */
    case 'fracdiv_nat_to_frac': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#EFF6FF')} />

          <text x="120" y="22" textAnchor="middle" className="font-game" fontSize="12.5" fill="#1D4ED8">
            피자 3판을 4명이 나누면?
          </text>

          {/* 3 pizza circles cut in 4 slices each */}
          {[42, 86, 130].map((px) => (
            <g key={px} transform={`translate(${px}, 56)`}>
              <circle cx="0" cy="0" r="16" fill={softBg('#FEF3C7')} stroke={INK} strokeWidth="2" />
              <path d="M 0 -16 L 0 0 L 16 0 A 16 16 0 0 0 0 -16 Z" fill="#FDBA74" />
              <line x1="-16" y1="0" x2="16" y2="0" stroke={INK} strokeWidth="1.3" />
              <line x1="0" y1="-16" x2="0" y2="16" stroke={INK} strokeWidth="1.3" />
            </g>
          ))}
          <text x="184" y="54" textAnchor="middle" className="font-game" fontSize="11" fill="#EA580C">
            1조각씩 3개!
          </text>
          <text x="184" y="69" textAnchor="middle" className="font-game" fontSize="11" fill="#047857">
            = 4분의 3판!
          </text>

          <line x1="16" y1="84" x2="224" y2="84" stroke="#BFDBFE" strokeWidth="1.6" />

          {/* Big equation: 3 ÷ 4 = 3/4 with jump arrows */}
          <text x="48" y="142" textAnchor="middle" className="font-game" fontSize="34" fill="#EA580C">
            3
          </text>
          <text x="82" y="139" textAnchor="middle" className="font-game" fontSize="26" fill={INK}>
            ÷
          </text>
          <text x="116" y="142" textAnchor="middle" className="font-game" fontSize="34" fill="#1D4ED8">
            4
          </text>
          <text x="148" y="139" textAnchor="middle" className="font-game" fontSize="26" fill={INK}>
            =
          </text>
          <Frac x={188} y={132} num={3} den={4} scale={1.45} barWidth={26} />

          {/* Orange arc from 3 to top numerator */}
          <path d="M 52 108 Q 112 78 168 106" fill="none" stroke="#EA580C" strokeWidth="2.3" strokeLinecap="round" />
          <polygon points="165,101 172,107 163,110" fill="#EA580C" />
          <text x="112" y="92" textAnchor="middle" className="font-game" fontSize="10" fill="#EA580C">
            앞 수는 위로 쏙!
          </text>

          {/* Blue arc from 4 to bottom denominator */}
          <path d="M 118 152 Q 145 178 172 156" fill="none" stroke="#1D4ED8" strokeWidth="2.3" strokeLinecap="round" />
          <polygon points="168,153 176,153 172,161" fill="#1D4ED8" />
          <text x="145" y="182" textAnchor="middle" className="font-game" fontSize="10" fill="#1D4ED8">
            ÷ 뒤는 아래로!
          </text>

          <Stickman x={44} y={178} scale={0.78} pose="happy" armL={[-12, 16]} armR={[14, 10]} />
          <text x="144" y="213" textAnchor="middle" className="font-game" fontSize="12" fill={INK}>
            앞(분자) ÷ 뒤(분모) 공식 1초 컷!
          </text>
        </svg>
      );
    }

    /* 02: [선수학습] (분수) ÷ (자연수) 2가지 방법 */
    case 'fracdiv_frac_div_nat': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#ECFDF5')} />

          <text x="120" y="21" textAnchor="middle" className="font-game" fontSize="12.5" fill="#047857">
            (분수) ÷ (자연수) 딱 2가지 길!
          </text>

          {/* Case 1: Divisible numerator */}
          <rect x="14" y="31" width="212" height="72" rx="4" fill="#FFFFFF" stroke="#059669" strokeWidth="2" />
          <text x="24" y="48" className="font-game" fontSize="10.5" fill="#059669">
            ① 분자가 나눠떨어지면 분자만 ÷!
          </text>
          <Frac x={44} y={76} num={6} den={7} scale={0.95} />
          <text x={66} y={81} textAnchor="middle" className="font-game" fontSize="16" fill={INK}>
            ÷ 2 =
          </text>
          <Frac x={122} y={76} num="6÷2" den={7} scale={0.92} barWidth={38} />
          <text x={156} y={81} textAnchor="middle" className="font-game" fontSize="16" fill={INK}>
            =
          </text>
          <Frac x={184} y={76} num={3} den={7} scale={1.05} />

          {/* Case 2: Not divisible -> multiply reciprocal */}
          <rect x="14" y="113" width="212" height="84" rx="4" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2" />
          <text x="24" y="130" className="font-game" fontSize="10.5" fill="#2563EB">
            ② 안 나눠지면 × (1 / 자연수) 변신!
          </text>
          <Frac x={36} y={162} num={3} den={4} scale={0.95} />
          <text x={58} y={167} textAnchor="middle" className="font-game" fontSize="15" fill="#DC2626">
            ÷ 2
          </text>
          <path d="M 76 162 L 94 162" stroke="#2563EB" strokeWidth="2.4" strokeLinecap="round" />
          <polygon points="90,158 97,162 90,166" fill="#2563EB" />
          <Frac x={113} y={162} num={3} den={4} scale={0.92} />
          <text x={133} y={167} textAnchor="middle" className="font-game" fontSize="14" fill="#2563EB">
            ×
          </text>
          <Frac x={152} y={162} num={1} den={2} scale={0.92} numColor="#2563EB" />
          <text x={172} y={167} textAnchor="middle" className="font-game" fontSize="15" fill={INK}>
            =
          </text>
          <Frac x={198} y={162} num={3} den={8} scale={1.05} />

          <text x="120" y="216" textAnchor="middle" className="font-game" fontSize="11.5" fill="#047857">
            분모끼리 곱해 조각을 더 작게 나누기!
          </text>
        </svg>
      );
    }

    /* 03: [함정] ÷ 자연수를 분자에 곱하면 땡! */
    case 'fracdiv_div_nat_trap': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#FFF7ED')} />

          <text x="120" y="22" textAnchor="middle" className="font-game" fontSize="13" fill="#DC2626">
            나누기 2를 했는데 왜 2배로 커져?!
          </text>

          {/* Left: Trap */}
          <rect x="12" y="34" width="104" height="114" rx="4" fill="#FFFFFF" stroke="#EF4444" strokeWidth="2" />
          <text x="64" y="51" textAnchor="middle" className="font-game" fontSize="10.5" fill="#DC2626">
            땡! (분자에 ×2)
          </text>
          <Frac x={34} y={84} num={3} den={5} scale={0.88} />
          <text x={55} y={89} textAnchor="middle" className="font-game" fontSize="13" fill={INK}>
            ÷2=
          </text>
          <Frac x={84} y={84} num={6} den={5} scale={0.95} numColor="#DC2626" />
          <line x1="68" y1="68" x2="100" y2="100" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
          <line x1="100" y1="68" x2="68" y2="100" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
          <text x="64" y="132" textAnchor="middle" className="font-body font-bold" fontSize="9.5" fill="#DC2626">
            1보다 커져버림!
          </text>

          {/* Right: Correct */}
          <rect x="124" y="34" width="104" height="114" rx="4" fill="#FFFFFF" stroke="#059669" strokeWidth="2" />
          <text x="176" y="51" textAnchor="middle" className="font-game" fontSize="10.5" fill="#059669">
            정답! (분모에 ×2)
          </text>
          <Frac x={144} y={84} num={3} den={5} scale={0.88} />
          <text x={165} y={89} textAnchor="middle" className="font-game" fontSize="13" fill="#059669">
            ×
          </text>
          <Frac x={182} y={84} num={1} den={2} scale={0.82} numColor="#059669" />
          <text x={198} y={89} textAnchor="middle" className="font-game" fontSize="13" fill={INK}>
            =
          </text>
          <Frac x={215} y={84} num={3} den={10} scale={0.85} />
          <circle cx="176" cy="126" r="10" fill="none" stroke="#059669" strokeWidth="2.5" />
          <text x="176" y="130" textAnchor="middle" className="font-game" fontSize="10" fill="#059669">
            O
          </text>

          <SkeletonJollaman x={52} y={172} scale={0.78} />
          <text x="152" y="182" textAnchor="middle" className="font-game" fontSize="11.5" fill="#B45309">
            “피자 나눴는데 왜 늘어나!!”
          </text>
          <text x="152" y="202" textAnchor="middle" className="font-body font-bold" fontSize="10" fill={INK}>
            자연수 나눗셈은 분모(아래)에 곱하기!
          </text>
        </svg>
      );
    }

    /* 04: [핵심] 분수 나눗셈의 뜻 = 몇 번 덜어내나! */
    case 'fracdiv_meaning_contain': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#FFFBEB')} />

          <g transform="translate(0, 2)">
            <Frac x={60} y={24} num={6} den={7} scale={0.85} />
            <text x={82} y={29} textAnchor="middle" className="font-game" fontSize="16" fill={INK}>
              ÷
            </text>
            <Frac x={104} y={24} num={2} den={7} scale={0.85} />
            <text x={156} y={29} textAnchor="middle" className="font-game" fontSize="12" fill="#B45309">
              = 2칸씩 몇 번?
            </text>
          </g>

          {/* 7-part bar with 6 shaded */}
          <g transform="translate(18, 56)">
            {Array.from({ length: 7 }, (_, i) => {
              const fill =
                i < 2
                  ? '#FDE047'
                  : i < 4
                  ? '#FDBA74'
                  : i < 6
                  ? '#93C5FD'
                  : '#F1F5F9';
              return (
                <rect
                  key={i}
                  x={i * 29}
                  y="0"
                  width="29"
                  height="30"
                  fill={isLightPrint && i >= 6 ? '#FFFFFF' : fill}
                  stroke={INK}
                  strokeWidth="1.8"
                />
              );
            })}
            <text x="203" y="42" textAnchor="end" className="font-mono-num font-bold" fontSize="9.5" fill="#64748B">
              전체 1 (7칸)
            </text>
          </g>

          {/* 3 scoop brackets under the 6 shaded cells */}
          {[0, 1, 2].map((idx) => {
            const bx = 18 + idx * 58;
            return (
              <g key={idx}>
                <path
                  d={`M ${bx + 2} 96 L ${bx + 2} 106 L ${bx + 56} 106 L ${bx + 56} 96`}
                  fill="none"
                  stroke="#EA580C"
                  strokeWidth="2.2"
                />
                <text x={bx + 29} y="121" textAnchor="middle" className="font-game" fontSize="11.5" fill="#EA580C">
                  {idx + 1}번!
                </text>
              </g>
            );
          })}

          <Stickman x={50} y={168} scale={0.8} pose="happy" armL={[-12, 16]} armR={[18, 4]} />

          <rect x="86" y="142" width="140" height="68" rx="4" fill="#FFFFFF" stroke={INK} strokeWidth="2.2" />
          <text x="156" y="164" textAnchor="middle" className="font-game" fontSize="13" fill="#047857">
            6조각 ÷ 2조각 = 3번!
          </text>
          <text x="156" y="185" textAnchor="middle" className="font-body font-bold" fontSize="10" fill={INK}>
            한 조각 크기가 같을 땐
          </text>
          <text x="156" y="199" textAnchor="middle" className="font-game" fontSize="11" fill="#EA580C">
            분자끼리만 나누면 끝!
          </text>
        </svg>
      );
    }

    /* 05: 분모가 같은 (분수) ÷ (분수) */
    case 'fracdiv_same_denom': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#EFF6FF')} />

          <text x="120" y="22" textAnchor="middle" className="font-game" fontSize="13" fill="#1D4ED8">
            분모가 똑같으면 분모 지우개 쓱싹!
          </text>

          {/* Main Equation with crossed-out denominators */}
          <g transform="translate(0, 12)">
            <Frac x={44} y={64} num={5} den={8} scale={1.25} />
            <text x={76} y={69} textAnchor="middle" className="font-game" fontSize="20" fill={INK}>
              ÷
            </text>
            <Frac x={108} y={64} num={3} den={8} scale={1.25} />

            {/* Strikethrough on both 8s */}
            <line x1="33" y1="84" x2="55" y2="74" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" />
            <line x1="97" y1="84" x2="119" y2="74" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" />

            <text x={140} y={69} textAnchor="middle" className="font-game" fontSize="20" fill={INK}>
              =
            </text>
            <text x={184} y={70} textAnchor="middle" className="font-game" fontSize="22" fill="#EA580C">
              5 ÷ 3
            </text>
          </g>

          {/* Arrow down to result */}
          <path d="M 184 96 L 184 118" stroke="#EA580C" strokeWidth="2.6" strokeLinecap="round" />
          <polygon points="179,114 184,122 189,114" fill="#EA580C" />

          <rect x="118" y="126" width="110" height="58" rx="4" fill="#FFFFFF" stroke={INK} strokeWidth="2.2" />
          <Frac x={144} y={155} num={5} den={3} scale={1.05} />
          <text x={169} y={160} textAnchor="middle" className="font-game" fontSize="15" fill={INK}>
            =
          </text>
          <Frac x={200} y={155} whole={1} num={2} den={3} scale={1.05} />

          {/* Eraser stickman */}
          <Stickman x={54} y={156} scale={0.85} pose="sunglasses" armL={[-16, 16]} armR={[18, 4]} />
          <rect x="64" y="138" width="20" height="11" rx="2" fill="#FDE047" stroke={INK} strokeWidth="1.6" />
          <text x="54" y="218" textAnchor="middle" className="font-game" fontSize="11" fill="#475569">
            분모 쓱싹!
          </text>

          <text x="166" y="212" textAnchor="middle" className="font-game" fontSize="11" fill="#1D4ED8">
            분자 ÷ 분자 = 답!
          </text>
        </svg>
      );
    }

    /* 06: 분모가 다르면 통분해서 분자÷분자! */
    case 'fracdiv_diff_denom_common': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#EFF6FF')} />

          <text x="120" y="21" textAnchor="middle" className="font-game" fontSize="12.5" fill="#1D4ED8">
            분모가 다르면? 통분해서 조각 맞추기!
          </text>

          {/* Row 1: Original */}
          <Frac x={54} y={55} num={3} den={4} scale={1.05} />
          <text x={80} y={60} textAnchor="middle" className="font-game" fontSize="17" fill={INK}>
            ÷
          </text>
          <Frac x={106} y={55} num={2} den={5} scale={1.05} />
          <text x={168} y={58} textAnchor="middle" className="font-game" fontSize="11.5" fill="#DC2626">
            조각 크기 다름!
          </text>

          {/* Arrow: 통분 (분모 20) */}
          <path d="M 80 80 L 80 100" stroke="#2563EB" strokeWidth="2.6" strokeLinecap="round" />
          <polygon points="75,96 80,104 85,96" fill="#2563EB" />
          <text x="150" y="96" textAnchor="middle" className="font-game" fontSize="11.5" fill="#2563EB">
            분모 20으로 통분! (×5, ×4)
          </text>

          {/* Row 2: Common denominator */}
          <rect x="14" y="108" width="212" height="58" rx="4" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2" />
          <Frac x={44} y={137} num={15} den={20} scale={0.95} barWidth={26} />
          <text x={70} y={142} textAnchor="middle" className="font-game" fontSize="16" fill={INK}>
            ÷
          </text>
          <Frac x={96} y={137} num={8} den={20} scale={0.95} barWidth={26} />
          <text x={122} y={142} textAnchor="middle" className="font-game" fontSize="16" fill={INK}>
            =
          </text>
          <text x={156} y={142} textAnchor="middle" className="font-game" fontSize="14.5" fill="#EA580C">
            15÷8
          </text>
          <text x={180} y={142} textAnchor="middle" className="font-game" fontSize="15" fill={INK}>
            =
          </text>
          <Frac x={204} y={137} num={15} den={8} scale={0.95} barWidth={24} />

          <Stickman x={48} y={182} scale={0.72} pose="happy" armL={[-12, 16]} armR={[14, 12]} />
          <text x="148" y="186" textAnchor="middle" className="font-game" fontSize="11.5" fill="#047857">
            분모 같아졌으니 15÷8 끝!
          </text>
          <text x="122" y="209" textAnchor="middle" className="font-game" fontSize="11.5" fill={INK}>
            대분수로 =
          </text>
          <Frac x={178} y={204} whole={1} num={7} den={8} scale={0.72} />
        </svg>
      );
    }

    /* 07: ‘÷ 분수’ = ‘× 뒤집기’ 원리 완전 해부! */
    case 'fracdiv_why_reciprocal': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#FFFBEB')} />

          <text x="120" y="21" textAnchor="middle" className="font-game" fontSize="12.5" fill="#B45309">
            왜 ÷ 뒤의 분수를 뒤집어 곱할까?
          </text>

          {/* Left: Step 1 & Step 2 */}
          <rect x="12" y="31" width="132" height="114" rx="4" fill="#FFFFFF" stroke={INK} strokeWidth="2" />
          <text x="20" y="48" className="font-game" fontSize="10" fill="#DC2626">
            ① 2칸 중 1칸 (÷2)
          </text>
          <text x="24" y="68" className="font-game" fontSize="11.5" fill={INK}>
            ×
          </text>
          <Frac x={44} y={64} num={1} den={2} scale={0.78} numColor={INK} denColor="#DC2626" />
          <text x="96" y="68" textAnchor="middle" className="font-body font-bold" fontSize="9.5" fill="#64748B">
            분모로 2!
          </text>

          <line x1="20" y1="86" x2="136" y2="86" stroke="#E2E8F0" strokeWidth="1.2" />

          <text x="20" y="104" className="font-game" fontSize="10" fill="#059669">
            ② 전체 5칸으로 (×5)
          </text>
          <text x="44" y="126" textAnchor="middle" className="font-game" fontSize="14" fill="#059669">
            × 5
          </text>
          <text x="98" y="125" textAnchor="middle" className="font-body font-bold" fontSize="9.5" fill="#64748B">
            분자로 5!
          </text>

          {/* Arrow to somersault flip */}
          <path d="M 148 88 L 166 88" stroke="#EA580C" strokeWidth="2.8" strokeLinecap="round" />
          <polygon points="162,83 170,88 162,93" fill="#EA580C" />

          {/* Right: Flip Result */}
          <rect x="172" y="34" width="58" height="108" rx="4" fill="#FFFFFF" stroke="#EA580C" strokeWidth="2.2" />
          <Frac x={201} y={56} num={2} den={5} scale={0.82} />
          <text x={201} y={84} textAnchor="middle" className="font-game" fontSize="10" fill="#EA580C">
            공중제비!
          </text>
          <text x={182} y={114} textAnchor="middle" className="font-game" fontSize="13" fill={INK}>
            ×
          </text>
          <Frac x={207} y={110} num={5} den={2} scale={0.95} numColor="#059669" denColor="#DC2626" />

          {/* Bottom formula bar */}
          <Stickman x={34} y={172} scale={0.72} pose="hero" armL={[-12, 16]} armR={[16, 4]} />
          <rect x="64" y="158" width="164" height="54" rx="4" fill="#FFFFFF" stroke={INK} strokeWidth="2.2" />
          <Frac x={84} y={185} num={3} den={4} scale={0.88} />
          <text x={105} y={190} textAnchor="middle" className="font-game" fontSize="14" fill="#DC2626">
            ÷
          </text>
          <Frac x={122} y={185} num={2} den={5} scale={0.88} />
          <text x={141} y={190} textAnchor="middle" className="font-game" fontSize="14" fill={INK}>
            =
          </text>
          <Frac x={159} y={185} num={3} den={4} scale={0.88} />
          <text x={179} y={190} textAnchor="middle" className="font-game" fontSize="14" fill="#059669">
            ×
          </text>
          <Frac x={199} y={185} num={5} den={2} scale={0.95} numColor="#059669" denColor="#DC2626" />
        </svg>
      );
    }

    /* 08: (자연수) ÷ (분수) 계산법 */
    case 'fracdiv_whole_div_frac': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#ECFDF5')} />

          <text x="120" y="21" textAnchor="middle" className="font-game" fontSize="12.5" fill="#047857">
            자연수 ÷ 분수도 뒤집고 약분 1초 컷!
          </text>

          {/* Main equation box */}
          <rect x="14" y="32" width="212" height="94" rx="4" fill="#FFFFFF" stroke="#059669" strokeWidth="2.2" />

          <text x="34" y="68" textAnchor="middle" className="font-game" fontSize="20" fill={INK}>
            6
          </text>
          <text x="54" y="67" textAnchor="middle" className="font-game" fontSize="16" fill="#DC2626">
            ÷
          </text>
          <Frac x={76} y={62} num={3} den={4} scale={0.95} />

          <path d="M 96 62 L 114 62" stroke="#059669" strokeWidth="2.4" strokeLinecap="round" />
          <polygon points="110,58 117,62 110,66" fill="#059669" />

          <text x="132" y="68" textAnchor="middle" className="font-game" fontSize="20" fill={INK}>
            6
          </text>
          <text x="150" y="67" textAnchor="middle" className="font-game" fontSize="15" fill="#059669">
            ×
          </text>
          <Frac x={172} y={62} num={4} den={3} scale={0.95} />

          {/* Diagonal cancel 6 <-> 3 */}
          <line x1="124" y1="68" x2="140" y2="52" stroke="#EF4444" strokeWidth="2.4" />
          <text x="132" y="47" textAnchor="middle" className="font-game" fontSize="12" fill="#EF4444">
            2
          </text>
          <line x1="165" y1="84" x2="179" y2="70" stroke="#EF4444" strokeWidth="2.4" />
          <text x="184" y="88" textAnchor="middle" className="font-game" fontSize="11.5" fill="#EF4444">
            1
          </text>

          <text x="195" y="68" textAnchor="middle" className="font-game" fontSize="16" fill={INK}>
            =
          </text>
          <text x="213" y="69" textAnchor="middle" className="font-game" fontSize="22" fill="#047857">
            8
          </text>

          <text x="120" y="114" textAnchor="middle" className="font-game" fontSize="11" fill="#059669">
            자연수(분자 자리)랑 분모 3을 미리 약분!
          </text>

          {/* Bottom check with common denominator */}
          <Stickman x={44} y={168} scale={0.78} pose="sunglasses" armL={[-12, 16]} armR={[14, 10]} />
          <rect x="74" y="142" width="152" height="62" rx="4" fill="#FFFFFF" stroke={INK} strokeWidth="2" />
          <text x="150" y="160" textAnchor="middle" className="font-game" fontSize="10.5" fill="#1D4ED8">
            통분으로 확인해도 똑같아!
          </text>
          <Frac x={100} y={185} num={24} den={4} scale={0.82} barWidth={24} />
          <text x={122} y={189} textAnchor="middle" className="font-game" fontSize="13" fill={INK}>
            ÷
          </text>
          <Frac x={140} y={185} num={3} den={4} scale={0.82} />
          <text x={184} y={189} textAnchor="middle" className="font-game" fontSize="12.5" fill="#047857">
            = 24÷3 = 8!
          </text>
        </svg>
      );
    }

    /* 09: [함정] 앞 수까지 뒤집으면 대참사! */
    case 'fracdiv_flip_front_trap': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#FFF7ED')} />

          <text x="120" y="21" textAnchor="middle" className="font-game" fontSize="12.5" fill="#DC2626">
            으악!! 앞 수까지 물구나무 서면 안 돼!
          </text>

          {/* Original expression */}
          <Frac x={84} y={50} num={3} den={4} scale={0.95} />
          <text x={114} y={55} textAnchor="middle" className="font-game" fontSize="16" fill={INK}>
            ÷
          </text>
          <Frac x={144} y={50} num={2} den={5} scale={0.95} />

          {/* Left: Front stays upright! */}
          <rect x="14" y="82" width="100" height="104" rx="4" fill="#FFFFFF" stroke="#059669" strokeWidth="2" />
          <text x="64" y="100" textAnchor="middle" className="font-game" fontSize="11" fill="#059669">
            앞 수는 제자리에!
          </text>
          <Stickman x={40} y={130} scale={0.75} pose="headband" armL={[-12, 14]} armR={[14, 14]} />
          <Frac x={84} y={142} num={3} den={4} scale={1.05} />

          {/* Right: Back flips! */}
          <rect x="126" y="82" width="100" height="104" rx="4" fill="#FFFFFF" stroke="#DC2626" strokeWidth="2" />
          <text x="176" y="100" textAnchor="middle" className="font-game" fontSize="11" fill="#DC2626">
            ÷ 뒤만 뒤집기!
          </text>
          {/* Upside-down tumbling stickman */}
          <Stickman
            x={152}
            y={152}
            scale={0.7}
            rotate={180}
            pose="panic"
            armL={[-14, 16]}
            armR={[14, 16]}
          />
          <Frac x={198} y={142} num={5} den={2} scale={1.05} />

          {/* Wrong mark example */}
          <Frac x={54} y={206} num={4} den={3} scale={0.68} numColor="#DC2626" denColor="#DC2626" />
          <text x={72} y={210} textAnchor="middle" className="font-game" fontSize="11" fill="#DC2626">
            ×
          </text>
          <Frac x={90} y={206} num={5} den={2} scale={0.68} numColor="#DC2626" denColor="#DC2626" />
          <text x="164" y="210" textAnchor="middle" className="font-game" fontSize="11.5" fill="#DC2626">
            둘 다 뒤집으면 대참사 X!
          </text>
        </svg>
      );
    }

    /* 10: [함정] 나눗셈 상태에서 성급하게 약분 금지! */
    case 'fracdiv_cancel_after_flip': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#FFF7ED')} />

          <text x="120" y="21" textAnchor="middle" className="font-game" fontSize="12.5" fill="#DC2626">
            ÷ 기호 살아있을 땐 약분 절대 금지!
          </text>

          {/* Top: Trap */}
          <rect x="14" y="32" width="212" height="72" rx="4" fill="#FFFFFF" stroke="#EF4444" strokeWidth="2" />
          <text x="24" y="49" className="font-game" fontSize="10.5" fill="#DC2626">
            땡! ÷ 상태에서 성급히 약분하면 오답!
          </text>
          <Frac x={44} y={78} num={3} den={8} scale={0.9} />
          <text x={66} y={83} textAnchor="middle" className="font-game" fontSize="15" fill="#DC2626">
            ÷
          </text>
          <Frac x={88} y={78} num={3} den={4} scale={0.9} />
          <line x1="36" y1="68" x2="96" y2="88" stroke="#EF4444" strokeWidth="2.4" strokeDasharray="3 2" />
          <text x="158" y="82" textAnchor="middle" className="font-game" fontSize="11" fill="#DC2626">
            ÷는 아직 약분 못 해! X
          </text>

          {/* Bottom: Correct */}
          <rect x="14" y="114" width="212" height="84" rx="4" fill="#FFFFFF" stroke="#059669" strokeWidth="2.2" />
          <text x="24" y="132" className="font-game" fontSize="10.5" fill="#059669">
            정답! 먼저 ×(뒤집기) 변신 후 약분!
          </text>
          <Frac x={40} y={166} num={3} den={8} scale={0.95} />
          <text x={62} y={171} textAnchor="middle" className="font-game" fontSize="15" fill="#059669">
            ×
          </text>
          <Frac x={84} y={166} num={4} den={3} scale={0.95} />

          {/* Diagonal cancel 3<->3, 4<->8 */}
          <line x1="34" y1="158" x2="46" y2="148" stroke="#EF4444" strokeWidth="2" />
          <text x="31" y="146" className="font-game" fontSize="10" fill="#EF4444">1</text>
          <line x1="78" y1="184" x2="90" y2="174" stroke="#EF4444" strokeWidth="2" />
          <text x="93" y="186" className="font-game" fontSize="10" fill="#EF4444">1</text>

          <line x1="34" y1="184" x2="46" y2="174" stroke="#2563EB" strokeWidth="2" />
          <text x="29" y="187" className="font-game" fontSize="10" fill="#2563EB">2</text>
          <line x1="78" y1="158" x2="90" y2="148" stroke="#2563EB" strokeWidth="2" />
          <text x="93" y="147" className="font-game" fontSize="10" fill="#2563EB">1</text>

          <text x={115} y={171} textAnchor="middle" className="font-game" fontSize="16" fill={INK}>
            =
          </text>
          <Frac x={142} y={166} num={1} den={2} scale={1.1} />
          <Stickman x={194} y={154} scale={0.68} pose="sunglasses" armL={[-12, 16]} armR={[14, 10]} />

          <text x="120" y="216" textAnchor="middle" className="font-game" fontSize="11.5" fill="#047857">
            “무조건 곱하기(×) 변신 먼저 → 그다음 약분!”
          </text>
        </svg>
      );
    }

    /* 11: [함정] 대분수 나눗셈 따로 나누면 땡! */
    case 'fracdiv_mixed_trap': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#FFF7ED')} />

          <text x="120" y="21" textAnchor="middle" className="font-game" fontSize="12.5" fill="#DC2626">
            대분수는 통째로 가분수 변신부터!
          </text>

          {/* Left: Trap */}
          <rect x="12" y="34" width="104" height="118" rx="4" fill="#FFFFFF" stroke="#EF4444" strokeWidth="2" />
          <text x="64" y="51" textAnchor="middle" className="font-game" fontSize="10.5" fill="#DC2626">
            따로 나누기 땡!
          </text>
          <Frac x={40} y={84} whole={2} num={2} den={3} scale={0.78} />
          <text x={64} y={89} textAnchor="middle" className="font-game" fontSize="13" fill={INK}>
            ÷
          </text>
          <Frac x={92} y={84} whole={1} num={1} den={3} scale={0.78} />

          <text x="64" y="116" textAnchor="middle" className="font-game" fontSize="9.8" fill="#64748B">
            자연수·분수 따로 ÷?!
          </text>
          <text x="64" y="138" textAnchor="middle" className="font-game" fontSize="11.5" fill="#DC2626">
            답이 2와 2?! 땡!!
          </text>
          <line x1="22" y1="106" x2="106" y2="144" stroke="#EF4444" strokeWidth="2.8" strokeLinecap="round" />

          {/* Right: Correct */}
          <rect x="124" y="34" width="104" height="118" rx="4" fill="#FFFFFF" stroke="#059669" strokeWidth="2" />
          <text x="176" y="51" textAnchor="middle" className="font-game" fontSize="10.5" fill="#059669">
            가분수 변신 정답!
          </text>
          <Frac x={148} y={84} num={8} den={3} scale={0.92} />
          <text x={174} y={89} textAnchor="middle" className="font-game" fontSize="14" fill={INK}>
            ÷
          </text>
          <Frac x={200} y={84} num={4} den={3} scale={0.92} />

          <path d="M 176 106 L 176 122" stroke="#059669" strokeWidth="2.2" />
          <polygon points="171,119 176,125 181,119" fill="#059669" />
          <text x="176" y="142" textAnchor="middle" className="font-game" fontSize="13.5" fill="#047857">
            8 ÷ 4 = 2!
          </text>

          <SkeletonJollaman x={46} y={172} scale={0.76} />
          <text x="148" y="182" textAnchor="middle" className="font-game" fontSize="11.5" fill="#B45309">
            “자연수·분수 쪼개지 마!!”
          </text>
          <text x="148" y="202" textAnchor="middle" className="font-body font-bold" fontSize="10" fill={INK}>
            대분수는 무조건 가분수로 합체 후 계산!
          </text>
        </svg>
      );
    }

    /* 12: 대분수의 나눗셈 3단계 마스터! */
    case 'fracdiv_mixed_steps': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#ECFDF5')} />

          <text x="120" y="20" textAnchor="middle" className="font-game" fontSize="12.5" fill="#047857">
            대분수 나눗셈 공식 3단계!
          </text>

          {/* Step 1 */}
          <rect x="14" y="30" width="212" height="46" rx="4" fill="#FFFFFF" stroke="#2563EB" strokeWidth="1.8" />
          <text x="22" y="45" className="font-game" fontSize="10" fill="#2563EB">
            1단계: 가분수로 변신!
          </text>
          <Frac x={42} y={56} whole={2} num={1} den={2} scale={0.68} />
          <text x={60} y={60} textAnchor="middle" className="font-game" fontSize="11.5" fill={INK}>
            ÷
          </text>
          <Frac x={84} y={56} whole={1} num={1} den={4} scale={0.68} />
          <text x={112} y={60} textAnchor="middle" className="font-game" fontSize="12" fill="#2563EB">
            →
          </text>
          <Frac x={138} y={56} num={5} den={2} scale={0.74} />
          <text x={158} y={60} textAnchor="middle" className="font-game" fontSize="12" fill={INK}>
            ÷
          </text>
          <Frac x={178} y={56} num={5} den={4} scale={0.74} />

          {/* Step 2 */}
          <rect x="14" y="84" width="212" height="52" rx="4" fill="#FFFFFF" stroke="#EA580C" strokeWidth="1.8" />
          <text x="22" y="99" className="font-game" fontSize="10" fill="#EA580C">
            2단계: ÷를 × 뒤집기로!
          </text>
          <Frac x={62} y={114} num={5} den={2} scale={0.78} />
          <text x={88} y={119} textAnchor="middle" className="font-game" fontSize="13" fill="#EA580C">
            ×
          </text>
          <Frac x={114} y={114} num={4} den={5} scale={0.78} />
          <text x={176} y={117} textAnchor="middle" className="font-game" fontSize="10.5" fill="#EA580C">
            뒤의 수만 휙!
          </text>

          {/* Step 3 */}
          <rect x="14" y="144" width="212" height="54" rx="4" fill="#FFFFFF" stroke="#059669" strokeWidth="2.2" />
          <text x="22" y="160" className="font-game" fontSize="10" fill="#059669">
            3단계: 대각선 X 약분 후 곱셈!
          </text>
          <Frac x={54} y={176} num={1} den={1} scale={0.76} numColor="#EF4444" denColor="#2563EB" />
          <text x={78} y={180} textAnchor="middle" className="font-game" fontSize="13" fill={INK}>
            ×
          </text>
          <Frac x={102} y={176} num={2} den={1} scale={0.76} numColor="#2563EB" denColor="#EF4444" />
          <text x={130} y={180} textAnchor="middle" className="font-game" fontSize="15" fill={INK}>
            =
          </text>
          <text x={158} y={182} textAnchor="middle" className="font-game" fontSize="22" fill="#047857">
            2!
          </text>

          <Stickman x={202} y={171} scale={0.62} pose="hero" armL={[-12, 16]} armR={[14, 4]} />

          <text x="120" y="216" textAnchor="middle" className="font-game" fontSize="11" fill="#047857">
            변신 → 뒤집기 → X약분! 3박자 완벽!
          </text>
        </svg>
      );
    }

    /* 13: 나누는 수 크기별 몫 어림하기! */
    case 'fracdiv_size_compare': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#FFFBEB')} />

          <text x="120" y="21" textAnchor="middle" className="font-game" fontSize="12.5" fill="#B45309">
            곱셈과 정반대! 진분수로 나누면 커져!
          </text>

          {/* Row 1: ÷ 3/2 (>1) -> smaller */}
          <rect x="14" y="33" width="212" height="50" rx="4" fill="#FFFFFF" stroke="#2563EB" strokeWidth="1.8" />
          <text x="34" y="63" textAnchor="middle" className="font-game" fontSize="16" fill={INK}>
            6 ÷
          </text>
          <Frac x={64} y={58} num={3} den={2} scale={0.78} />
          <text x={96} y={63} textAnchor="middle" className="font-game" fontSize="14" fill="#2563EB">
            = 4
          </text>
          <text x="168" y="54" textAnchor="middle" className="font-game" fontSize="10.5" fill="#2563EB">
            1보다 큰 수로 ÷
          </text>
          <text x="168" y="70" textAnchor="middle" className="font-game" fontSize="11.5" fill="#2563EB">
            ▼ 6보다 작아짐!
          </text>

          {/* Row 2: ÷ 1 -> same */}
          <rect x="14" y="90" width="212" height="44" rx="4" fill="#FFFFFF" stroke="#64748B" strokeWidth="1.8" />
          <text x="60" y="117" textAnchor="middle" className="font-game" fontSize="16" fill={INK}>
            6 ÷ 1 = 6
          </text>
          <text x="168" y="116" textAnchor="middle" className="font-game" fontSize="11" fill="#475569">
            1로 ÷ → 그대로!
          </text>

          {/* Row 3: ÷ 1/2 (<1) -> BIGGER */}
          <rect x="14" y="141" width="212" height="54" rx="4" fill="#FFFFFF" stroke="#DC2626" strokeWidth="2.2" />
          <text x="34" y="173" textAnchor="middle" className="font-game" fontSize="16" fill={INK}>
            6 ÷
          </text>
          <Frac x={64} y={168} num={1} den={2} scale={0.78} />
          <text x={98} y={173} textAnchor="middle" className="font-game" fontSize="16" fill="#DC2626">
            = 12!
          </text>
          <text x="168" y="162" textAnchor="middle" className="font-game" fontSize="10.5" fill="#DC2626">
            1보다 작은 수로 ÷
          </text>
          <text x="168" y="180" textAnchor="middle" className="font-game" fontSize="12" fill="#DC2626">
            ▲ 오히려 커짐!!
          </text>

          <text x="120" y="216" textAnchor="middle" className="font-game" fontSize="11" fill="#92400E">
            피자 6판을 반쪽씩 쪼개면 12조각 되잖아!
          </text>
        </svg>
      );
    }

    /* 14: [도전] 문장제 치트키! ‘1시간·1m당’ 구하기 */
    case 'fracdiv_word_unit_rate': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#F5F3FF')} />

          {/* Problem box */}
          <rect x="14" y="12" width="212" height="44" rx="4" fill="#FFFFFF" stroke="#7C3AED" strokeWidth="2" />
          <text x="24" y="30" className="font-game" fontSize="11" fill="#5B21B6">
            문제:
          </text>
          <Frac x={62} y={29} num={2} den={3} scale={0.62} />
          <text x="108" y="32" textAnchor="middle" className="font-body font-bold" fontSize="10.5" fill={INK}>
            시간에
          </text>
          <Frac x={138} y={29} num={4} den={5} scale={0.62} />
          <text x="184" y="32" textAnchor="middle" className="font-body font-bold" fontSize="10.5" fill={INK}>
            km 갔다면
          </text>
          <text x="120" y="49" textAnchor="middle" className="font-game" fontSize="11.5" fill="#DC2626">
            ‘1시간’ 동안 간 거리는?
          </text>

          {/* Rule callout */}
          <text x="120" y="77" textAnchor="middle" className="font-game" fontSize="11.5" fill="#6D28D9">
            1이 되는 기준 단위(시간)가 ÷ 뒤로!
          </text>

          {/* Solution card */}
          <rect x="14" y="88" width="212" height="84" rx="4" fill="#FFFFFF" stroke={INK} strokeWidth="2.2" />
          <Frac x={40} y={120} num={4} den={5} scale={0.88} />
          <text x={62} y={125} textAnchor="middle" className="font-game" fontSize="14" fill="#7C3AED">
            ÷
          </text>
          <Frac x={84} y={120} num={2} den={3} scale={0.88} numColor="#DC2626" denColor="#DC2626" />

          {/* Highlight arrow pointing to 2/3 */}
          <path d="M 84 152 L 84 142" stroke="#DC2626" strokeWidth="2" />
          <text x="84" y="164" textAnchor="middle" className="font-game" fontSize="9.5" fill="#DC2626">
            시간으로 ÷!
          </text>

          <text x={106} y={125} textAnchor="middle" className="font-game" fontSize="14" fill={INK}>
            =
          </text>
          <Frac x={128} y={120} num={4} den={5} scale={0.85} />
          <text x={148} y={125} textAnchor="middle" className="font-game" fontSize="13" fill="#059669">
            ×
          </text>
          <Frac x={168} y={120} num={3} den={2} scale={0.85} />
          <text x={188} y={125} textAnchor="middle" className="font-game" fontSize="14" fill={INK}>
            =
          </text>
          <Frac x={209} y={120} num={6} den={5} scale={0.92} />

          <Stickman x={48} y={182} scale={0.68} pose="headband" armL={[-12, 16]} armR={[16, 6]} />
          <text x="148" y="198" textAnchor="middle" className="font-game" fontSize="12" fill="#047857">
            정답: 1과 5분의 1 km!
          </text>
          <text x="148" y="216" textAnchor="middle" className="font-body font-bold" fontSize="10" fill={INK}>
            ‘1개·1시간·1m’ 구할 땐 그 단위로 나누기!
          </text>
        </svg>
      );
    }

    /* 15: [도전] 세 분수의 나눗셈·곱셈 혼합! */
    case 'fracdiv_chain_ops': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#F5F3FF')} />

          <text x="120" y="21" textAnchor="middle" className="font-game" fontSize="12.5" fill="#6D28D9">
            ÷ 뒤만 뒤집고! 원래 ×는 그대로!
          </text>

          {/* Row 1: Original */}
          <rect x="14" y="32" width="212" height="58" rx="4" fill="#FFFFFF" stroke="#7C3AED" strokeWidth="1.8" />
          <Frac x={48} y={61} num={3} den={4} scale={0.92} />
          <text x={76} y={66} textAnchor="middle" className="font-game" fontSize="15" fill="#DC2626">
            ÷
          </text>
          <Frac x={104} y={61} num={9} den={8} scale={0.92} numColor="#DC2626" denColor="#DC2626" />
          <text x={134} y={66} textAnchor="middle" className="font-game" fontSize="15" fill="#059669">
            ×
          </text>
          <Frac x={162} y={61} num={3} den={5} scale={0.92} />

          {/* Label pointing to 9/8 */}
          <rect x="180" y="42" width="40" height="36" rx="3" fill={softBg('#FEF2F2')} stroke="#DC2626" strokeWidth="1.4" />
          <text x="200" y="57" textAnchor="middle" className="font-game" fontSize="9.5" fill="#DC2626">
            얘만
          </text>
          <text x="200" y="70" textAnchor="middle" className="font-game" fontSize="9.5" fill="#DC2626">
            뒤집어!
          </text>

          {/* Down Arrow */}
          <path d="M 120 94 L 120 112" stroke="#7C3AED" strokeWidth="2.6" strokeLinecap="round" />
          <polygon points="115,108 120,116 125,108" fill="#7C3AED" />

          {/* Row 2: One-line cancel */}
          <rect x="14" y="120" width="212" height="66" rx="4" fill="#FFFFFF" stroke={INK} strokeWidth="2.2" />
          <Frac x={40} y={154} num={3} den={4} scale={0.9} />
          <text x={62} y={159} textAnchor="middle" className="font-game" fontSize="14" fill={INK}>
            ×
          </text>
          <Frac x={84} y={154} num={8} den={9} scale={0.9} />
          <text x={106} y={159} textAnchor="middle" className="font-game" fontSize="14" fill={INK}>
            ×
          </text>
          <Frac x={128} y={154} num={3} den={5} scale={0.9} />

          {/* Cancel strokes: 3x3=9 vs 9, 8 vs 4 */}
          <line x1="34" y1="146" x2="46" y2="136" stroke="#EF4444" strokeWidth="2" />
          <line x1="122" y1="146" x2="134" y2="136" stroke="#EF4444" strokeWidth="2" />
          <line x1="78" y1="172" x2="90" y2="162" stroke="#EF4444" strokeWidth="2" />
          <text x="93" y="175" className="font-game" fontSize="9.5" fill="#EF4444">1</text>

          <line x1="34" y1="172" x2="46" y2="162" stroke="#2563EB" strokeWidth="2" />
          <text x="30" y="175" className="font-game" fontSize="9.5" fill="#2563EB">1</text>
          <line x1="78" y1="146" x2="90" y2="136" stroke="#2563EB" strokeWidth="2" />
          <text x="84" y="133" textAnchor="middle" className="font-game" fontSize="10" fill="#2563EB">2</text>

          <text x={156} y={159} textAnchor="middle" className="font-game" fontSize="15" fill={INK}>
            =
          </text>
          <Frac x={188} y={154} num={2} den={5} scale={1.08} />

          <text x="120" y="212" textAnchor="middle" className="font-game" fontSize="11.5" fill="#5B21B6">
            앞·뒤 구분해서 한 줄 약분 쇼 완성!
          </text>
        </svg>
      );
    }

    /* 16: 최종 보스! 분수의 나눗셈 3관문 */
    case 'fracdiv_boss': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={isLightPrint ? '#FFFFFF' : '#0F172A'} />

          <text
            x="120"
            y="22"
            textAnchor="middle"
            className="font-game"
            fontSize="13.5"
            fill={isBw ? INK : isLightPrint ? '#B45309' : '#FACC15'}
          >
            나눗셈 최종 보스 3관문!
          </text>

          {/* Gate 1 */}
          <rect x="14" y="34" width="212" height="44" rx="4" fill="#FFFFFF" stroke={isLightPrint ? INK : '#FACC15'} strokeWidth="2" />
          <text x="26" y="60" className="font-game" fontSize="11" fill="#2563EB">
            1관문
          </text>
          <Frac x={78} y={56} num={7} den={9} scale={0.78} />
          <text x={100} y={60} textAnchor="middle" className="font-game" fontSize="13" fill={INK}>
            ÷
          </text>
          <Frac x={122} y={56} num={7} den={3} scale={0.78} />
          <text x={148} y={60} textAnchor="middle" className="font-game" fontSize="13" fill={INK}>
            =
          </text>
          <rect x="166" y="43" width="38" height="26" rx="3" fill="#FEF9C3" stroke="#D97706" strokeWidth="1.8" strokeDasharray="3 2" />
          <text x="185" y="61" textAnchor="middle" className="font-game" fontSize="13" fill="#D97706">
            ?
          </text>

          {/* Gate 2 */}
          <rect x="14" y="85" width="212" height="44" rx="4" fill="#FFFFFF" stroke={isLightPrint ? INK : '#FACC15'} strokeWidth="2" />
          <text x="26" y="111" className="font-game" fontSize="11" fill="#059669">
            2관문
          </text>
          <Frac x={78} y={107} whole={2} num={1} den={4} scale={0.72} />
          <text x={102} y={111} textAnchor="middle" className="font-game" fontSize="13" fill={INK}>
            ÷
          </text>
          <Frac x={128} y={107} whole={1} num={1} den={2} scale={0.72} />
          <text x={152} y={111} textAnchor="middle" className="font-game" fontSize="13" fill={INK}>
            =
          </text>
          <rect x="168" y="94" width="38" height="26" rx="3" fill="#FEF9C3" stroke="#D97706" strokeWidth="1.8" strokeDasharray="3 2" />
          <text x="187" y="112" textAnchor="middle" className="font-game" fontSize="13" fill="#D97706">
            ?
          </text>

          {/* Gate 3 */}
          <rect x="14" y="136" width="212" height="44" rx="4" fill="#FFFFFF" stroke={isLightPrint ? INK : '#FACC15'} strokeWidth="2" />
          <text x="26" y="162" className="font-game" fontSize="11" fill="#DC2626">
            3관문
          </text>
          <text x={68} y={163} textAnchor="middle" className="font-game" fontSize="15" fill={INK}>
            10 ÷
          </text>
          <Frac x={98} y={158} num={2} den={5} scale={0.78} />
          <circle cx="132" cy="158" r="11" fill="#FEF2F2" stroke="#DC2626" strokeWidth="1.8" strokeDasharray="3 2" />
          <text x="132" y="162" textAnchor="middle" className="font-game" fontSize="11" fill="#DC2626">
            ○
          </text>
          <text x="158" y="163" textAnchor="middle" className="font-game" fontSize="15" fill={INK}>
            10
          </text>
          <text x="196" y="162" textAnchor="middle" className="font-body font-bold" fontSize="9.5" fill="#DC2626">
            크기비교!
          </text>

          <Stickman
            x={42}
            y={192}
            scale={0.6}
            pose="hero"
            armL={[-12, 16]}
            armR={[14, 4]}
            strokeColor={isLightPrint ? INK : '#FFFFFF'}
          />
          <text
            x="140"
            y="211"
            textAnchor="middle"
            className="font-game"
            fontSize="11"
            fill={isBw ? INK : isLightPrint ? '#B45309' : '#FEF08A'}
          >
            정답은 아래 팁 창에서 확인!
          </text>
        </svg>
      );
    }

    /* 17: 6-2 분수의 나눗셈 완주 축하 포카! */
    case 'fracdiv_praise':
    default: {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={isLightPrint ? '#FFFFFF' : '#0F172A'} />

          {/* Celebration stars */}
          <polygon points="34,36 37,43 44,44 38,49 40,56 34,52 28,56 30,49 24,44 31,43" fill="#FACC15" />
          <polygon points="206,36 209,43 216,44 210,49 212,56 206,52 200,56 202,49 196,44 203,43" fill="#FACC15" />
          <circle cx="66" cy="24" r="3" fill="#38BDF8" />
          <circle cx="176" cy="24" r="3" fill="#4ADE80" />

          <text
            x="120"
            y="30"
            textAnchor="middle"
            className="font-game"
            fontSize="14.5"
            fill={isBw ? INK : isLightPrint ? '#B45309' : '#FACC15'}
          >
            초등 분수 시리즈 완결!!
          </text>

          {/* Grand Crown & Hero Stickman */}
          <polygon
            points="100,66 106,48 114,58 120,44 126,58 134,48 140,66"
            fill="#FACC15"
            stroke={INK}
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <Stickman
            x={120}
            y={86}
            scale={1.08}
            pose="hero"
            armL={[-20, 4]}
            armR={[20, 4]}
            strokeColor={isLightPrint ? INK : '#FFFFFF'}
          />

          {/* 3-2 -> 4-2 -> 5-2 -> 6-2 Progression Ribbon */}
          <rect x="16" y="156" width="208" height="32" rx="4" fill="#FFFFFF" stroke={isLightPrint ? INK : '#FACC15'} strokeWidth="2.2" />
          <text x="120" y="176" textAnchor="middle" className="font-game" fontSize="11" fill="#047857">
            3-2 기초 → 4-2 ± → 5-2 × → 6-2 ÷ 완전 정복!
          </text>

          <text
            x="120"
            y="214"
            textAnchor="middle"
            className="font-game"
            fontSize="12"
            fill={isBw ? INK : isLightPrint ? '#4338CA' : '#A7F3D0'}
          >
            축하해! 넌 진짜 분수 마스터 챔피언!
          </text>
        </svg>
      );
    }
  }
};
