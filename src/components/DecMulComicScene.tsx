import React from 'react';
import { EpisodeSceneType, PrintInkMode } from '../types/card';

interface DecMulComicSceneProps {
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

const Frac: React.FC<{
  x: number;
  y: number;
  num: number | string;
  den: number | string;
  scale?: number;
  numColor?: string;
  denColor?: string;
  barWidth?: number;
}> = ({ x, y, num, den, scale = 1, numColor = '#EA580C', denColor = '#1D4ED8', barWidth = 22 }) => (
  <g transform={`translate(${x}, ${y}) scale(${scale})`}>
    <text x="0" y="-4" textAnchor="middle" className="font-game" fontSize="15" fill={numColor}>
      {num}
    </text>
    <line x1={-barWidth / 2} y1="0" x2={barWidth / 2} y2="0" stroke={INK} strokeWidth="2.3" strokeLinecap="round" />
    <text x="0" y="15" textAnchor="middle" className="font-game" fontSize="15" fill={denColor}>
      {den}
    </text>
  </g>
);

export const DecMulComicScene: React.FC<DecMulComicSceneProps> = ({
  sceneType,
  inkMode = 'full',
}) => {
  const isLightPrint = inkMode !== 'full';
  const isBw = inkMode === 'bw_worksheet';
  const softBg = (color: string) => (isLightPrint ? '#FFFFFF' : color);

  switch (sceneType) {
    /* 00: 소수의 곱셈 도감 설명서 */
    case 'decmul_guide': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#F0F9FF')} />
          <line x1="0" y1="192" x2="240" y2="192" stroke={INK} strokeWidth="2.4" />

          <text x="120" y="23" textAnchor="middle" className="font-game" fontSize="14.5" fill="#0369A1">
            5-2 소수의 곱셈 18장 도감!
          </text>

          <rect x="18" y="42" width="126" height="96" rx="4" fill="#FFFFFF" stroke="#0284C7" strokeWidth="2.2" />
          <text x="81" y="66" textAnchor="middle" className="font-game" fontSize="16" fill={INK}>
            0.4 × 0.3
          </text>
          <path d="M 81 74 L 81 94" stroke="#EA580C" strokeWidth="2.4" />
          <polygon points="76,90 86,90 81,97" fill="#EA580C" />
          <text x="81" y="118" textAnchor="middle" className="font-game" fontSize="19" fill="#059669">
            0.12!
          </text>
          <text x="81" y="131" textAnchor="middle" className="font-body font-bold" fontSize="8.5" fill="#64748B">
            1칸 + 1칸 = 2칸 점프!
          </text>

          <Stickman x={184} y={118} scale={0.95} pose="hero" armL={[-20, 6]} armR={[18, 2]} />

          <rect x="16" y="152" width="128" height="28" rx="3" fill="#FEF9C3" stroke="#D97706" strokeWidth="2" />
          <text x="80" y="170" textAnchor="middle" className="font-game" fontSize="10.5" fill="#B45309">
            5-2 분수의 곱셈과 짝꿍!
          </text>

          <text x="120" y="214" textAnchor="middle" className="font-game" fontSize="11.5" fill="#0F172A">
            선수학습 3장부터 소수점 함정까지 완주!
          </text>
        </svg>
      );
    }

    /* 01: [선수학습] 소수의 자릿값과 분수 변신 */
    case 'decmul_place_value': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#EFF6FF')} />

          <text x="120" y="22" textAnchor="middle" className="font-game" fontSize="13.5" fill="#1D4ED8">
            소수는 분모 10·100·1000 분수 변신!
          </text>

          {/* Place value digit cards */}
          <rect x="14" y="34" width="212" height="106" rx="3" fill="#FFFFFF" stroke={INK} strokeWidth="2.2" />
          <text x="42" y="80" textAnchor="middle" className="font-game" fontSize="34" fill={INK}>
            0
          </text>
          <circle cx="72" cy="80" r="4.2" fill="#EF4444" />
          <text x="102" y="80" textAnchor="middle" className="font-game" fontSize="34" fill="#2563EB">
            1
          </text>
          <text x="148" y="80" textAnchor="middle" className="font-game" fontSize="34" fill="#059669">
            2
          </text>
          <text x="196" y="80" textAnchor="middle" className="font-game" fontSize="34" fill="#7C3AED">
            3
          </text>

          <text x="42" y="102" textAnchor="middle" className="font-body font-bold" fontSize="9" fill="#64748B">
            자연수
          </text>
          <text x="102" y="102" textAnchor="middle" className="font-game" fontSize="9.5" fill="#2563EB">
            첫째자리
          </text>
          <text x="148" y="102" textAnchor="middle" className="font-game" fontSize="9.5" fill="#059669">
            둘째자리
          </text>
          <text x="196" y="102" textAnchor="middle" className="font-game" fontSize="9.5" fill="#7C3AED">
            셋째자리
          </text>

          <Frac x={102} y={122} num={1} den={10} scale={0.62} numColor="#2563EB" denColor="#2563EB" />
          <Frac x={148} y={122} num={2} den={100} scale={0.62} numColor="#059669" denColor="#059669" barWidth={26} />
          <Frac x={196} y={122} num={3} den={1000} scale={0.62} numColor="#7C3AED" denColor="#7C3AED" barWidth={32} />

          {/* Bottom 10-block mini bar */}
          <g transform="translate(20, 152)">
            {Array.from({ length: 10 }, (_, i) => (
              <rect
                key={i}
                x={i * 20}
                y="0"
                width="20"
                height="22"
                fill={i === 0 ? '#93C5FD' : '#FFFFFF'}
                stroke={INK}
                strokeWidth="1.6"
              />
            ))}
          </g>
          <text x="120" y="193" textAnchor="middle" className="font-game" fontSize="11.5" fill="#1D4ED8">
            10칸 중 1칸 = 0.1 = 1/10!
          </text>
          <text x="120" y="213" textAnchor="middle" className="font-game" fontSize="11" fill="#0F172A">
            소수 뒤 칸수만큼 분모에 0이 붙어!
          </text>
        </svg>
      );
    }

    /* 02: [선수학습] 소수 맨 끝 0 지우기 마법 */
    case 'decmul_trailing_zero': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#ECFDF5')} />

          <text x="120" y="22" textAnchor="middle" className="font-game" fontSize="13.5" fill="#047857">
            소수 맨 끝 0은 삭제 가능! (가운데는 금지)
          </text>

          {/* Left: OK to delete trailing zero */}
          <rect x="14" y="36" width="102" height="122" rx="3" fill="#FFFFFF" stroke="#059669" strokeWidth="2.2" />
          <text x="65" y="56" textAnchor="middle" className="font-game" fontSize="12" fill="#059669">
            ⭕ 끝자리 0
          </text>
          <text x="65" y="88" textAnchor="middle" className="font-game" fontSize="22" fill={INK}>
            0.5<tspan fill="#EF4444">0</tspan>
          </text>
          <line x1="76" y1="70" x2="88" y2="90" stroke="#EF4444" strokeWidth="2.4" />
          <text x="65" y="114" textAnchor="middle" className="font-game" fontSize="16" fill="#059669">
            = 0.5
          </text>
          <text x="65" y="142" textAnchor="middle" className="font-game" fontSize="12" fill="#047857">
            1.200 = 1.2!
          </text>

          {/* Right: NO deleting middle zero */}
          <rect x="124" y="36" width="102" height="122" rx="3" fill="#FFFFFF" stroke="#DC2626" strokeWidth="2.2" />
          <text x="175" y="56" textAnchor="middle" className="font-game" fontSize="12" fill="#DC2626">
            ❌ 가운데 낀 0
          </text>
          <text x="175" y="88" textAnchor="middle" className="font-game" fontSize="22" fill={INK}>
            1.<tspan fill="#DC2626">0</tspan>5
          </text>
          <text x="175" y="114" textAnchor="middle" className="font-game" fontSize="14" fill="#DC2626">
            ≠ 1.5 (땡!)
          </text>
          <text x="175" y="142" textAnchor="middle" className="font-body font-bold" fontSize="9.5" fill="#991B1B">
            지우면 10배 커져!
          </text>

          <Stickman x={40} y={178} scale={0.58} pose="happy" armL={[-12, 12]} armR={[16, 2]} />
          <text x="142" y="205" textAnchor="middle" className="font-game" fontSize="11.5" fill="#065F46">
            맨 끝 0만 쓱싹 지워 깔끔하게 쓰자!
          </text>
        </svg>
      );
    }

    /* 03: [선수학습] ×10, ×100 vs ×0.1, ×0.01 점프! */
    case 'decmul_shift_10_100': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#FFFBEB')} />

          <text x="120" y="21" textAnchor="middle" className="font-game" fontSize="13.5" fill="#B45309">
            ×10은 오른쪽! ×0.1은 왼쪽 점프!
          </text>

          {/* Top: ×10 -> Right jump (bigger) */}
          <rect x="14" y="34" width="212" height="76" rx="3" fill="#FFFFFF" stroke="#EA580C" strokeWidth="2.2" />
          <text x="120" y="53" textAnchor="middle" className="font-game" fontSize="12" fill="#EA580C">
            ① ×10, ×100 (커짐 → 오른쪽!)
          </text>
          <text x="64" y="84" textAnchor="middle" className="font-game" fontSize="22" fill={INK}>
            3<tspan fill="#EF4444">.</tspan>4
          </text>
          <text x="114" y="82" textAnchor="middle" className="font-game" fontSize="14" fill="#EA580C">
            ×10 →
          </text>
          <text x="174" y="84" textAnchor="middle" className="font-game" fontSize="22" fill="#059669">
            34
          </text>
          <path d="M 63 90 Q 75 103 86 90" fill="none" stroke="#EF4444" strokeWidth="2" />
          <text x="174" y="102" textAnchor="middle" className="font-body font-bold" fontSize="8.5" fill="#64748B">
            ×100이면 340!
          </text>

          {/* Bottom: ×0.1 -> Left jump (smaller) */}
          <rect x="14" y="120" width="212" height="76" rx="3" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2.2" />
          <text x="120" y="139" textAnchor="middle" className="font-game" fontSize="12" fill="#2563EB">
            ② ×0.1, ×0.01 (작아짐 ← 왼쪽!)
          </text>
          <text x="64" y="170" textAnchor="middle" className="font-game" fontSize="22" fill={INK}>
            3<tspan fill="#EF4444">.</tspan>4
          </text>
          <text x="116" y="168" textAnchor="middle" className="font-game" fontSize="13.5" fill="#2563EB">
            ×0.1 →
          </text>
          <text x="178" y="170" textAnchor="middle" className="font-game" fontSize="22" fill="#2563EB">
            0.34
          </text>
          <path d="M 63 176 Q 50 189 40 176" fill="none" stroke="#2563EB" strokeWidth="2" />
          <text x="178" y="188" textAnchor="middle" className="font-body font-bold" fontSize="8.5" fill="#64748B">
            ×0.01이면 0.034!
          </text>

          <text x="120" y="216" textAnchor="middle" className="font-game" fontSize="11.5" fill="#92400E">
            0.1 곱하면 숫자가 1/10로 작아져 왼쪽 이동!
          </text>
        </svg>
      );
    }

    /* 04: (소수) × (자연수) 뜻과 원리 */
    case 'decmul_dec_times_nat_model': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#EFF6FF')} />

          <text x="120" y="22" textAnchor="middle" className="font-game" fontSize="13.5" fill="#1D4ED8">
            0.4 × 3 = 0.4를 3번 더하기!
          </text>

          {/* Number line 0 to 1.5 with 3 hops of 0.4 */}
          <rect x="12" y="34" width="216" height="90" rx="3" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2.2" />
          <line x1="26" y1="98" x2="214" y2="98" stroke={INK} strokeWidth="2.4" />
          {[0, 0.4, 0.8, 1.2].map((val, idx) => {
            const tx = 30 + idx * 54;
            return (
              <g key={val}>
                <line x1={tx} y1="92" x2={tx} y2="104" stroke={INK} strokeWidth="2" />
                <text x={tx} y="117" textAnchor="middle" className="font-game" fontSize="11.5" fill={idx === 3 ? '#DC2626' : INK}>
                  {val === 0 ? '0' : val.toFixed(1)}
                </text>
              </g>
            );
          })}
          {[0, 1, 2].map((hop) => {
            const x1 = 30 + hop * 54;
            const x2 = x1 + 54;
            return (
              <g key={hop}>
                <path d={`M ${x1} 92 Q ${(x1 + x2) / 2} 52 ${x2} 92`} fill="none" stroke="#2563EB" strokeWidth="2.6" strokeDasharray="3 2" />
                <text x={(x1 + x2) / 2} y="64" textAnchor="middle" className="font-game" fontSize="10.5" fill="#EA580C">
                  0.4
                </text>
              </g>
            );
          })}

          {/* Fraction conversion proof */}
          <rect x="16" y="136" width="208" height="58" rx="3" fill="#FFFFFF" stroke="#059669" strokeWidth="2.2" />
          <text x="48" y="169" textAnchor="middle" className="font-game" fontSize="14" fill={INK}>
            0.4×3 =
          </text>
          <Frac x={96} y={165} num={4} den={10} scale={0.78} />
          <text x="121" y="169" textAnchor="middle" className="font-game" fontSize="14" fill={INK}>
            ×3 =
          </text>
          <Frac x={152} y={165} num={12} den={10} scale={0.78} />
          <text x="192" y="170" textAnchor="middle" className="font-game" fontSize="17" fill="#059669">
            = 1.2!
          </text>

          <text x="120" y="215" textAnchor="middle" className="font-game" fontSize="11.5" fill="#1E3A8A">
            0.1이 4×3 = 12개 모이면 1.2!
          </text>
        </svg>
      );
    }

    /* 05: (소수) × (자연수) 세로셈 2단계 치트키 */
    case 'decmul_dec_times_nat_vertical': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#ECFDF5')} />

          <text x="120" y="21" textAnchor="middle" className="font-game" fontSize="13.5" fill="#047857">
            세로셈 2단계! 곱하고 → 점 콕!
          </text>

          {/* Left: Step 1 natural multiply */}
          <rect x="14" y="34" width="96" height="134" rx="3" fill="#FFFFFF" stroke="#64748B" strokeWidth="2" />
          <text x="62" y="54" textAnchor="middle" className="font-game" fontSize="11" fill="#2563EB">
            ① 점 빼고 곱하기
          </text>
          <text x="74" y="84" textAnchor="end" className="font-game" fontSize="22" fill={INK}>
            2 4
          </text>
          <text x="34" y="112" textAnchor="middle" className="font-game" fontSize="18" fill={INK}>
            ×
          </text>
          <text x="74" y="112" textAnchor="end" className="font-game" fontSize="22" fill={INK}>
            3
          </text>
          <line x1="26" y1="122" x2="94" y2="122" stroke={INK} strokeWidth="2.4" />
          <text x="74" y="150" textAnchor="end" className="font-game" fontSize="24" fill="#2563EB">
            7 2
          </text>

          <text x="120" y="106" textAnchor="middle" className="font-game" fontSize="18" fill="#059669">
            →
          </text>

          {/* Right: Step 2 put dot */}
          <rect x="130" y="34" width="96" height="134" rx="3" fill="#FFFFFF" stroke="#059669" strokeWidth="2.4" />
          <text x="178" y="54" textAnchor="middle" className="font-game" fontSize="11" fill="#059669">
            ② 1칸 점 콕!
          </text>
          <text x="194" y="84" textAnchor="end" className="font-game" fontSize="22" fill={INK}>
            2<tspan fill="#EF4444">.</tspan>4
          </text>
          <text x="148" y="112" textAnchor="middle" className="font-game" fontSize="18" fill={INK}>
            ×
          </text>
          <text x="194" y="112" textAnchor="end" className="font-game" fontSize="22" fill={INK}>
            3
          </text>
          <line x1="142" y1="122" x2="210" y2="122" stroke={INK} strokeWidth="2.4" />
          <text x="194" y="150" textAnchor="end" className="font-game" fontSize="24" fill="#059669">
            7<tspan fill="#EF4444">.</tspan>2
          </text>
          {/* Dot alignment highlight */}
          <path d="M 193 155 Q 183 164 176 155" fill="none" stroke="#EF4444" strokeWidth="2" />

          <text x="120" y="202" textAnchor="middle" className="font-game" fontSize="11.5" fill="#065F46">
            자연수처럼 72 구하고, 1칸 왼쪽에 소수점 콕!
          </text>
        </svg>
      );
    }

    /* 06: 곱셈 세로셈 함정! 소수점 줄맞춤 금지! */
    case 'decmul_nat_times_dec_trap': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#FEF2F2')} />

          <text x="120" y="21" textAnchor="middle" className="font-game" fontSize="12.5" fill="#DC2626">
            곱셈 세로셈: 소수점 줄맞춤 금지!!
          </text>

          {/* Left: WRONG decimal-aligned */}
          <rect x="12" y="34" width="102" height="128" rx="3" fill="#FFFFFF" stroke="#DC2626" strokeWidth="2.2" />
          <text x="63" y="53" textAnchor="middle" className="font-game" fontSize="11" fill="#DC2626">
            ❌ 덧셈처럼 줄맞춤
          </text>
          <text x="68" y="82" textAnchor="middle" className="font-game" fontSize="20" fill={INK}>
            2.5
          </text>
          <text x="58" y="108" textAnchor="middle" className="font-game" fontSize="20" fill={INK}>
            × 3
          </text>
          <line x1="26" y1="118" x2="100" y2="118" stroke={INK} strokeWidth="2" />
          <text x="63" y="146" textAnchor="middle" className="font-game" fontSize="13" fill="#DC2626">
            자리 뒤죽박죽!
          </text>
          <line x1="24" y1="68" x2="98" y2="128" stroke="#EF4444" strokeWidth="2.6" />

          {/* Right: CORRECT right-aligned */}
          <rect x="126" y="34" width="102" height="128" rx="3" fill="#FFFFFF" stroke="#059669" strokeWidth="2.4" />
          <text x="177" y="53" textAnchor="middle" className="font-game" fontSize="11" fill="#059669">
            ⭕ 오른쪽 끝 맞춤!
          </text>
          <rect x="184" y="64" width="18" height="84" rx="2" fill="#DCFCE7" stroke="#22C55E" strokeWidth="1.2" strokeDasharray="2 2" />
          <text x="199" y="82" textAnchor="end" className="font-game" fontSize="20" fill={INK}>
            2.5
          </text>
          <text x="150" y="108" textAnchor="middle" className="font-game" fontSize="18" fill={INK}>
            ×
          </text>
          <text x="199" y="108" textAnchor="end" className="font-game" fontSize="20" fill={INK}>
            3
          </text>
          <line x1="140" y1="118" x2="212" y2="118" stroke={INK} strokeWidth="2.2" />
          <text x="199" y="144" textAnchor="end" className="font-game" fontSize="20" fill="#059669">
            7.5
          </text>

          <Stickman x={36} y={178} scale={0.56} pose="panic" sweat armL={[-12, 12]} armR={[14, 2]} />
          <text x="138" y="205" textAnchor="middle" className="font-game" fontSize="11.5" fill="#991B1B">
            곱셈은 무조건 오른쪽 끝숫자 줄맞춤!
          </text>
        </svg>
      );
    }

    /* 07: (자연수) × (소수) 뜻과 계산법 */
    case 'decmul_nat_times_dec': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#EFF6FF')} />

          <text x="120" y="21" textAnchor="middle" className="font-game" fontSize="13.5" fill="#1D4ED8">
            6 × 0.5 = 6의 절반(5/10)!
          </text>

          {/* 6 blocks split into half */}
          <rect x="14" y="34" width="212" height="76" rx="3" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2.2" />
          {Array.from({ length: 6 }, (_, i) => (
            <rect
              key={i}
              x={24 + i * 33}
              y="48"
              width="28"
              height="28"
              rx="3"
              fill={i < 3 ? '#93C5FD' : '#F1F5F9'}
              stroke={i < 3 ? '#1D4ED8' : '#94A3B8'}
              strokeWidth="2"
            />
          ))}
          <text x="71" y="96" textAnchor="middle" className="font-game" fontSize="11.5" fill="#1D4ED8">
            딱 절반 = 3개!
          </text>
          <text x="172" y="96" textAnchor="middle" className="font-body font-bold" fontSize="10" fill="#64748B">
            (나머지 절반)
          </text>

          {/* Vertical calculation */}
          <rect x="14" y="122" width="212" height="72" rx="3" fill="#FFFFFF" stroke="#059669" strokeWidth="2.2" />
          <text x="120" y="145" textAnchor="middle" className="font-game" fontSize="15" fill={INK}>
            6 × 0.5 → 6 × 5 = <tspan fill="#2563EB">30</tspan>
          </text>
          <text x="120" y="175" textAnchor="middle" className="font-game" fontSize="16" fill="#059669">
            1칸 점 찍기 → 3.<tspan fill="#94A3B8">0</tspan> = 3!
          </text>
          <line x1="164" y1="162" x2="174" y2="177" stroke="#EF4444" strokeWidth="2" />

          <text x="120" y="215" textAnchor="middle" className="font-game" fontSize="11.5" fill="#1E3A8A">
            자연수 × 소수도 자연수처럼 곱하고 점 콕!
          </text>
        </svg>
      );
    }

    /* 08: 곱하는 소수 크기로 결과 어림하기! */
    case 'decmul_size_compare': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#FFFBEB')} />

          <text x="120" y="21" textAnchor="middle" className="font-game" fontSize="13.5" fill="#B45309">
            곱한다고 다 커질까? NO!!
          </text>

          {/* Row 1: >1 bigger */}
          <rect x="14" y="34" width="212" height="44" rx="3" fill="#FFFFFF" stroke="#059669" strokeWidth="2.2" />
          <text x="26" y="54" className="font-game" fontSize="10.5" fill="#059669">
            1보다 큰 수
          </text>
          <text x="26" y="69" className="font-game" fontSize="12" fill={INK}>
            5 × 1.2 = <tspan fill="#059669">6</tspan>
          </text>
          <text x="166" y="61" textAnchor="middle" className="font-game" fontSize="13.5" fill="#059669">
            5보다 커짐 ↑
          </text>

          {/* Row 2: =1 same */}
          <rect x="14" y="84" width="212" height="44" rx="3" fill="#FFFFFF" stroke="#64748B" strokeWidth="2" />
          <text x="26" y="104" className="font-game" fontSize="10.5" fill="#475569">
            딱 1 곱하기
          </text>
          <text x="26" y="119" className="font-game" fontSize="12" fill={INK}>
            5 × 1 = 5
          </text>
          <text x="166" y="111" textAnchor="middle" className="font-game" fontSize="13.5" fill="#475569">
            그대로! (=)
          </text>

          {/* Row 3: <1 smaller */}
          <rect x="14" y="134" width="212" height="44" rx="3" fill="#FFFFFF" stroke="#DC2626" strokeWidth="2.4" />
          <text x="26" y="154" className="font-game" fontSize="10.5" fill="#DC2626">
            1보다 작은 소수
          </text>
          <text x="26" y="169" className="font-game" fontSize="12" fill={INK}>
            5 × 0.8 = <tspan fill="#DC2626">4</tspan>
          </text>
          <text x="166" y="161" textAnchor="middle" className="font-game" fontSize="13.5" fill="#DC2626">
            5보다 작아짐 ↓
          </text>

          <Stickman x={34} y={188} scale={0.5} pose="happy" armL={[-12, 10]} armR={[14, 2]} />
          <text x="140" y="208" textAnchor="middle" className="font-game" fontSize="11.5" fill="#92400E">
            0.몇 곱하면 원래보다 작아지는 마법!
          </text>
        </svg>
      );
    }

    /* 09: (소수) × (소수) 넓이 그림 원리 */
    case 'decmul_dec_times_dec_area': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#ECFDF5')} />

          <text x="120" y="21" textAnchor="middle" className="font-game" fontSize="13.5" fill="#047857">
            0.4 × 0.3 = 100칸 중 12칸 (0.12)!
          </text>

          {/* 10x10 area grid */}
          <g transform="translate(20, 38)">
            {/* Horizontal 0.3 highlight (3 rows = 30px) */}
            <rect x="0" y="0" width="100" height="30" fill={isLightPrint ? '#F1F5F9' : '#DBEAFE'} />
            {/* Vertical 0.4 highlight (4 cols = 40px) */}
            <rect x="0" y="0" width="40" height="100" fill={isLightPrint ? '#E2E8F0' : '#FEF3C7'} opacity="0.8" />
            {/* Overlap 4x3 = 12 squares */}
            <rect x="0" y="0" width="40" height="30" fill={isLightPrint ? '#94A3B8' : '#34D399'} />
            {/* Grid lines */}
            {Array.from({ length: 11 }, (_, i) => (
              <g key={i}>
                <line x1={i * 10} y1="0" x2={i * 10} y2="100" stroke={INK} strokeWidth={i === 0 || i === 10 ? 2 : 0.7} />
                <line x1="0" y1={i * 10} x2="100" y2={i * 10} stroke={INK} strokeWidth={i === 0 || i === 10 ? 2 : 0.7} />
              </g>
            ))}
            <text x="20" y="114" textAnchor="middle" className="font-game" fontSize="11" fill="#EA580C">
              가로 0.4
            </text>
            <text x="-8" y="19" textAnchor="middle" className="font-game" fontSize="10" fill="#2563EB">
              0.3
            </text>
          </g>

          {/* Right explanation */}
          <rect x="132" y="42" width="96" height="108" rx="3" fill="#FFFFFF" stroke="#059669" strokeWidth="2.2" />
          <text x="180" y="63" textAnchor="middle" className="font-game" fontSize="11" fill="#047857">
            겹친 칸 수!
          </text>
          <text x="180" y="84" textAnchor="middle" className="font-game" fontSize="12" fill={INK}>
            4 × 3 = 12칸
          </text>
          <Frac x={180} y={114} num={12} den={100} scale={0.78} barWidth={28} />
          <text x="180" y="142" textAnchor="middle" className="font-game" fontSize="14.5" fill="#059669">
            = 0.12!
          </text>

          <text x="120" y="192" textAnchor="middle" className="font-game" fontSize="11.5" fill="#065F46">
            10등분 × 10등분 = 전체 100칸 중 12칸!
          </text>
          <text x="120" y="212" textAnchor="middle" className="font-body font-bold" fontSize="10" fill={INK}>
            그래서 소수 한 자리 × 한 자리 = 소수 두 자리!
          </text>
        </svg>
      );
    }

    /* 10: 소수점 아래 자릿수 더하기 대원칙! */
    case 'decmul_count_decimal_places': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#FFFBEB')} />

          <text x="120" y="21" textAnchor="middle" className="font-game" fontSize="13" fill="#B45309">
            소수 칸수 = 앞 칸수 + 뒤 칸수!
          </text>

          {/* Equation card */}
          <rect x="14" y="34" width="212" height="134" rx="3" fill="#FFFFFF" stroke="#D97706" strokeWidth="2.2" />

          <text x="58" y="68" textAnchor="middle" className="font-game" fontSize="22" fill={INK}>
            1.<tspan fill="#2563EB">2</tspan>
          </text>
          <text x="98" y="68" textAnchor="middle" className="font-game" fontSize="18" fill={INK}>
            ×
          </text>
          <text x="146" y="68" textAnchor="middle" className="font-game" fontSize="22" fill={INK}>
            0.<tspan fill="#EA580C">04</tspan>
          </text>
          <text x="196" y="68" textAnchor="middle" className="font-game" fontSize="18" fill={INK}>
            = ?
          </text>

          {/* Digit count badges */}
          <rect x="34" y="80" width="48" height="20" rx="2" fill="#DBEAFE" stroke="#2563EB" strokeWidth="1.4" />
          <text x="58" y="94" textAnchor="middle" className="font-game" fontSize="10.5" fill="#1D4ED8">
            1칸
          </text>

          <text x="98" y="94" textAnchor="middle" className="font-game" fontSize="13" fill="#059669">
            +
          </text>

          <rect x="120" y="80" width="52" height="20" rx="2" fill="#FFEDD5" stroke="#EA580C" strokeWidth="1.4" />
          <text x="146" y="94" textAnchor="middle" className="font-game" fontSize="10.5" fill="#C2410C">
            2칸
          </text>

          <text x="182" y="94" textAnchor="middle" className="font-game" fontSize="13" fill="#059669">
            =
          </text>
          <text x="204" y="94" textAnchor="middle" className="font-game" fontSize="12.5" fill="#059669">
            3칸!
          </text>

          <line x1="26" y1="112" x2="214" y2="112" stroke="#FDE68A" strokeWidth="1.6" />

          <text x="120" y="136" textAnchor="middle" className="font-game" fontSize="14" fill={INK}>
            12 × 4 = 48 → 왼쪽 3칸 이동!
          </text>
          <text x="120" y="158" textAnchor="middle" className="font-game" fontSize="20" fill="#059669">
            0.048!
          </text>

          <text x="120" y="202" textAnchor="middle" className="font-game" fontSize="11.5" fill="#92400E">
            1자리 × 2자리 = 소수점 아래 총 3자리!
          </text>
        </svg>
      );
    }

    /* 11: 빈자리에 0 채우기 함정! (0.2 × 0.3) */
    case 'decmul_leading_zero_trap': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#FEF2F2')} />

          <text x="120" y="21" textAnchor="middle" className="font-game" fontSize="13" fill="#DC2626">
            0.2 × 0.3 = 0.6 이라 쓰면 대참사!!
          </text>

          {/* Wrong card */}
          <rect x="14" y="34" width="98" height="106" rx="3" fill="#FFFFFF" stroke="#DC2626" strokeWidth="2.2" />
          <text x="63" y="54" textAnchor="middle" className="font-game" fontSize="11.5" fill="#DC2626">
            ❌ 오답 함정
          </text>
          <text x="63" y="88" textAnchor="middle" className="font-game" fontSize="26" fill="#94A3B8">
            0.6
          </text>
          <line x1="36" y1="68" x2="90" y2="94" stroke="#EF4444" strokeWidth="3" />
          <line x1="90" y1="68" x2="36" y2="94" stroke="#EF4444" strokeWidth="3" />
          <text x="63" y="120" textAnchor="middle" className="font-body font-bold" fontSize="9.5" fill="#DC2626">
            1칸만 옮겼어!
          </text>

          {/* Right card */}
          <rect x="126" y="34" width="100" height="106" rx="3" fill="#FFFFFF" stroke="#059669" strokeWidth="2.4" />
          <text x="176" y="54" textAnchor="middle" className="font-game" fontSize="11.5" fill="#059669">
            ⭕ 빈자리 0 채움!
          </text>
          <text x="176" y="88" textAnchor="middle" className="font-game" fontSize="25" fill="#059669">
            0.<tspan fill="#EA580C">0</tspan>6
          </text>
          {/* Two hops under 0 and 6 */}
          <path d="M 196 94 Q 189 104 182 94" fill="none" stroke="#EA580C" strokeWidth="1.8" />
          <path d="M 182 94 Q 174 104 166 94" fill="none" stroke="#EA580C" strokeWidth="1.8" />
          <text x="176" y="122" textAnchor="middle" className="font-game" fontSize="10.5" fill="#047857">
            1칸 + 1칸 = 2칸!
          </text>

          <Stickman x={40} y={160} scale={0.62} pose="panic" sweat armL={[-12, 14]} armR={[16, 4]} />
          <rect x="76" y="154" width="150" height="52" rx="3" fill="#FFFFFF" stroke={INK} strokeWidth="2" />
          <text x="151" y="176" textAnchor="middle" className="font-game" fontSize="11.5" fill="#DC2626">
            자리가 모자라면
          </text>
          <text x="151" y="195" textAnchor="middle" className="font-game" fontSize="12" fill="#059669">
            앞에 꼭 0을 채워 0.06!
          </text>
        </svg>
      );
    }

    /* 12: 끝자리 0은 소수점 찍은 뒤 마지막에 지워! */
    case 'decmul_trailing_zero_order_trap': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#FEF2F2')} />

          <text x="120" y="21" textAnchor="middle" className="font-game" fontSize="12.5" fill="#DC2626">
            2.5 × 0.4! 끝 0 먼저 지우면 땡!!
          </text>

          {/* Wrong order */}
          <rect x="14" y="34" width="212" height="58" rx="3" fill="#FFFFFF" stroke="#DC2626" strokeWidth="2" />
          <text x="42" y="54" className="font-game" fontSize="11" fill="#DC2626">
            ❌ 0 먼저 지움
          </text>
          <text x="128" y="74" textAnchor="middle" className="font-game" fontSize="13.5" fill="#64748B">
            100 → 1 → 2칸 점 → 0.01 (대참사!)
          </text>

          {/* Correct order */}
          <rect x="14" y="102" width="212" height="86" rx="3" fill="#FFFFFF" stroke="#059669" strokeWidth="2.4" />
          <text x="120" y="122" textAnchor="middle" className="font-game" fontSize="12" fill="#059669">
            ⭕ 올바른 순서 (2.5 × 0.4)
          </text>
          <text x="120" y="146" textAnchor="middle" className="font-game" fontSize="14.5" fill={INK}>
            25×4 = 100 → ① 2칸 점: <tspan fill="#2563EB">1.00</tspan>
          </text>
          <text x="120" y="172" textAnchor="middle" className="font-game" fontSize="15" fill="#059669">
            ② 마지막에 끝 0 삭제 → 1!
          </text>

          <text x="120" y="214" textAnchor="middle" className="font-game" fontSize="11.5" fill="#991B1B">
            무조건 소수점 먼저 찍고, 끝 0은 맨 마지막!
          </text>
        </svg>
      );
    }

    /* 13: 숫자 배열 같을 때 소수점 1초 스캔 치트키 */
    case 'decmul_pattern_digits': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#ECFDF5')} />

          <text x="120" y="21" textAnchor="middle" className="font-game" fontSize="13.5" fill="#047857">
            32 × 15 = 480 알면 1초 스캔!!
          </text>

          <rect x="14" y="34" width="212" height="148" rx="3" fill="#FFFFFF" stroke="#059669" strokeWidth="2.2" />

          <text x="120" y="58" textAnchor="middle" className="font-game" fontSize="16" fill="#047857">
            기준: 32 × 15 = 480
          </text>
          <line x1="26" y1="68" x2="214" y2="68" stroke="#D1FAE5" strokeWidth="1.8" />

          <text x="28" y="92" className="font-game" fontSize="13.5" fill={INK}>
            3.2 × 1.5
          </text>
          <text x="122" y="92" textAnchor="middle" className="font-body font-bold" fontSize="10" fill="#2563EB">
            (2칸)
          </text>
          <text x="212" y="92" textAnchor="end" className="font-game" fontSize="15" fill="#059669">
            = 4.8
          </text>

          <text x="28" y="122" className="font-game" fontSize="13.5" fill={INK}>
            0.32 × 1.5
          </text>
          <text x="122" y="122" textAnchor="middle" className="font-body font-bold" fontSize="10" fill="#EA580C">
            (3칸)
          </text>
          <text x="212" y="122" textAnchor="end" className="font-game" fontSize="15" fill="#059669">
            = 0.48
          </text>

          <text x="28" y="152" className="font-game" fontSize="13.5" fill={INK}>
            0.32 × 0.15
          </text>
          <text x="122" y="152" textAnchor="middle" className="font-body font-bold" fontSize="10" fill="#7C3AED">
            (4칸)
          </text>
          <text x="212" y="152" textAnchor="end" className="font-game" fontSize="15" fill="#059669">
            = 0.048
          </text>

          <Stickman x={34} y={182} scale={0.5} pose="sunglasses" armL={[-12, 10]} armR={[14, 2]} />
          <text x="140" y="208" textAnchor="middle" className="font-game" fontSize="11.5" fill="#065F46">
            480 틀에 소수점 칸수만 세면 계산 끝!
          </text>
        </svg>
      );
    }

    /* 14: 소수의 곱셈 어림하기로 검산하기 */
    case 'decmul_estimate_round': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#F5F3FF')} />

          <text x="120" y="21" textAnchor="middle" className="font-game" fontSize="13.5" fill="#5B21B6">
            어림하기로 소수점 위치 검산!!
          </text>

          <rect x="14" y="34" width="212" height="72" rx="3" fill="#FFFFFF" stroke="#7C3AED" strokeWidth="2.2" />
          <text x="120" y="58" textAnchor="middle" className="font-game" fontSize="18" fill={INK}>
            3.98 × 5.1 = ?
          </text>
          <text x="80" y="82" textAnchor="middle" className="font-game" fontSize="12" fill="#7C3AED">
            ↓ 약 4
          </text>
          <text x="150" y="82" textAnchor="middle" className="font-game" fontSize="12" fill="#7C3AED">
            ↓ 약 5
          </text>
          <text x="120" y="99" textAnchor="middle" className="font-game" fontSize="13" fill="#059669">
            어림: 4 × 5 = 20 근처!
          </text>

          <rect x="14" y="118" width="64" height="58" rx="3" fill="#FFFFFF" stroke="#DC2626" strokeWidth="1.8" />
          <text x="46" y="144" textAnchor="middle" className="font-game" fontSize="12" fill="#94A3B8">
            2.0298
          </text>
          <text x="46" y="164" textAnchor="middle" className="font-game" fontSize="11" fill="#DC2626">
            ❌ 너무 작아
          </text>

          <rect x="86" y="114" width="68" height="64" rx="3" fill="#FEF08A" stroke="#059669" strokeWidth="2.4" />
          <text x="120" y="143" textAnchor="middle" className="font-game" fontSize="13.5" fill="#047857">
            20.298
          </text>
          <text x="120" y="165" textAnchor="middle" className="font-game" fontSize="11.5" fill="#059669">
            ⭕ 20 근처!
          </text>

          <rect x="162" y="118" width="64" height="58" rx="3" fill="#FFFFFF" stroke="#DC2626" strokeWidth="1.8" />
          <text x="194" y="144" textAnchor="middle" className="font-game" fontSize="12" fill="#94A3B8">
            202.98
          </text>
          <text x="194" y="164" textAnchor="middle" className="font-game" fontSize="11" fill="#DC2626">
            ❌ 너무 커
          </text>

          <text x="120" y="206" textAnchor="middle" className="font-game" fontSize="11.5" fill="#5B21B6">
            자연수로 대충 곱해보면 점 실수 0%!
          </text>
        </svg>
      );
    }

    /* 15: 세 소수의 곱셈! 짝꿍 먼저 묶기 치트키 */
    case 'decmul_three_or_word': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#F5F3FF')} />

          <text x="120" y="21" textAnchor="middle" className="font-game" fontSize="13" fill="#5B21B6">
            곱해서 1 되는 꿀짝꿍 먼저 묶기!!
          </text>

          <rect x="14" y="34" width="212" height="92" rx="3" fill="#FFFFFF" stroke="#7C3AED" strokeWidth="2.2" />
          <text x="120" y="64" textAnchor="middle" className="font-game" fontSize="18" fill={INK}>
            <tspan fill="#EA580C">0.5</tspan> × 3.7 × <tspan fill="#EA580C">2</tspan>
          </text>
          {/* Bracket connecting 0.5 and 2 */}
          <path d="M 60 72 L 60 84 L 180 84 L 180 72" fill="none" stroke="#EA580C" strokeWidth="2.4" />
          <text x="120" y="102" textAnchor="middle" className="font-game" fontSize="13" fill="#EA580C">
            0.5 × 2 = 1 !!
          </text>
          <text x="120" y="118" textAnchor="middle" className="font-game" fontSize="14.5" fill="#059669">
            1 × 3.7 = 3.7 (1초 암산!)
          </text>

          {/* 3 cheat pairs box */}
          <rect x="14" y="138" width="212" height="52" rx="3" fill="#FFFFFF" stroke="#059669" strokeWidth="2" />
          <text x="120" y="157" textAnchor="middle" className="font-game" fontSize="11" fill="#047857">
            필수 암기! 1 만드는 소수 꿀짝꿍
          </text>
          <text x="120" y="177" textAnchor="middle" className="font-game" fontSize="11.5" fill={INK}>
            0.5×2=1 · 0.25×4=1 · 0.125×8=1
          </text>

          <text x="120" y="214" textAnchor="middle" className="font-game" fontSize="11.5" fill="#5B21B6">
            순서 바꿔 짝꿍 먼저 곱하면 계산이 사라져!
          </text>
        </svg>
      );
    }

    /* 16: 최종 보스! 소수의 곱셈 3관문 */
    case 'decmul_boss': {
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
            소수의 곱셈 최종 보스 3관문!
          </text>

          {/* Gate 1 */}
          <rect x="14" y="34" width="212" height="44" rx="4" fill="#FFFFFF" stroke={isLightPrint ? INK : '#FACC15'} strokeWidth="2" />
          <text x="26" y="61" className="font-game" fontSize="11" fill="#2563EB">
            1관문
          </text>
          <text x="114" y="62" textAnchor="middle" className="font-game" fontSize="15" fill={INK}>
            0.03 × 0.4 =
          </text>
          <rect x="168" y="43" width="44" height="26" rx="3" fill="#FEF9C3" stroke="#D97706" strokeWidth="1.8" strokeDasharray="3 2" />
          <text x="190" y="61" textAnchor="middle" className="font-game" fontSize="13" fill="#D97706">
            ?
          </text>

          {/* Gate 2 */}
          <rect x="14" y="85" width="212" height="44" rx="4" fill="#FFFFFF" stroke={isLightPrint ? INK : '#FACC15'} strokeWidth="2" />
          <text x="26" y="112" className="font-game" fontSize="11" fill="#059669">
            2관문
          </text>
          <text x="114" y="113" textAnchor="middle" className="font-game" fontSize="15" fill={INK}>
            2.5 × 0.4 =
          </text>
          <rect x="168" y="94" width="44" height="26" rx="3" fill="#FEF9C3" stroke="#D97706" strokeWidth="1.8" strokeDasharray="3 2" />
          <text x="190" y="112" textAnchor="middle" className="font-game" fontSize="13" fill="#D97706">
            ?
          </text>

          {/* Gate 3 */}
          <rect x="14" y="136" width="212" height="44" rx="4" fill="#FFFFFF" stroke={isLightPrint ? INK : '#FACC15'} strokeWidth="2" />
          <text x="26" y="163" className="font-game" fontSize="11" fill="#DC2626">
            3관문
          </text>
          <text x="96" y="164" textAnchor="middle" className="font-game" fontSize="15" fill={INK}>
            7 × 0.8
          </text>
          <circle cx="138" cy="158" r="11" fill="#FEF2F2" stroke="#DC2626" strokeWidth="1.8" strokeDasharray="3 2" />
          <text x="138" y="162" textAnchor="middle" className="font-game" fontSize="11" fill="#DC2626">
            ○
          </text>
          <text x="164" y="164" textAnchor="middle" className="font-game" fontSize="15" fill={INK}>
            7
          </text>
          <text x="198" y="162" textAnchor="middle" className="font-body font-bold" fontSize="9.5" fill="#DC2626">
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

    /* 17: 5-2 소수의 곱셈 완주 축하 포카! */
    case 'decmul_praise':
    default: {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={isLightPrint ? '#FFFFFF' : '#0F172A'} />

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
            5-2 소수의 곱셈 마스터!!
          </text>

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

          <rect x="16" y="156" width="208" height="32" rx="4" fill="#FFFFFF" stroke={isLightPrint ? INK : '#FACC15'} strokeWidth="2.2" />
          <text x="120" y="176" textAnchor="middle" className="font-game" fontSize="10.8" fill="#047857">
            소수점 칸수 + 0 채우기 + 크기 어림 완전 정복!
          </text>

          <text
            x="120"
            y="214"
            textAnchor="middle"
            className="font-game"
            fontSize="12"
            fill={isBw ? INK : isLightPrint ? '#4338CA' : '#A7F3D0'}
          >
            축하해! 이제 6-2 소수의 나눗셈으로 가자!
          </text>
        </svg>
      );
    }
  }
};
