import React from 'react';
import { EpisodeSceneType, PrintInkMode } from '../types/card';

interface DecDivComicSceneProps {
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

export const DecDivComicScene: React.FC<DecDivComicSceneProps> = ({
  sceneType,
  inkMode = 'full',
}) => {
  const isLightPrint = inkMode !== 'full';
  const isBw = inkMode === 'bw_worksheet';
  const softBg = (color: string) => (isLightPrint ? '#FFFFFF' : color);

  switch (sceneType) {
    /* 00: 소수의 나눗셈 도감 설명서 */
    case 'decdiv_guide': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#F0F9FF')} />
          <line x1="0" y1="192" x2="240" y2="192" stroke={INK} strokeWidth="2.4" />

          <text x="120" y="23" textAnchor="middle" className="font-game" fontSize="14.5" fill="#0369A1">
            6-2 소수의 나눗셈 18장 도감!
          </text>

          <rect x="16" y="40" width="128" height="98" rx="4" fill="#FFFFFF" stroke="#0284C7" strokeWidth="2.2" />
          <text x="80" y="64" textAnchor="middle" className="font-game" fontSize="15" fill={INK}>
            4.7 ÷ 0.8
          </text>
          <text x="80" y="86" textAnchor="middle" className="font-game" fontSize="13.5" fill="#059669">
            = 47 ÷ 8 = 몫 5!
          </text>
          <text x="80" y="112" textAnchor="middle" className="font-game" fontSize="13.5" fill="#DC2626">
            나머지: 0.7!!
          </text>
          <text x="80" y="129" textAnchor="middle" className="font-body font-bold" fontSize="8.5" fill="#64748B">
            원래 소수점 자리 기억!
          </text>

          <Stickman x={184} y={118} scale={0.95} pose="hero" armL={[-20, 6]} armR={[18, 2]} />

          <rect x="16" y="152" width="128" height="28" rx="3" fill="#FEF9C3" stroke="#D97706" strokeWidth="2" />
          <text x="80" y="170" textAnchor="middle" className="font-game" fontSize="10.5" fill="#B45309">
            6-1 복습 + 오답률 1위 격파!
          </text>

          <text x="120" y="214" textAnchor="middle" className="font-game" fontSize="11.5" fill="#0F172A">
            소수점 이동부터 나머지 함정까지 올 클리어!
          </text>
        </svg>
      );
    }

    /* 01: [선수학습] (소수) ÷ (자연수) 기본 세로셈 */
    case 'decdiv_prereq_div_nat': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#EFF6FF')} />

          <text x="120" y="21" textAnchor="middle" className="font-game" fontSize="13" fill="#1D4ED8">
            6-1 복습! 소수점 그대로 위로 콕!
          </text>

          {/* Left: 4.8 ÷ 4 = 1.2 */}
          <rect x="14" y="34" width="100" height="132" rx="3" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2.2" />
          <text x="72" y="56" textAnchor="middle" className="font-game" fontSize="17" fill="#059669">
            1<tspan fill="#EF4444">.</tspan>2
          </text>
          <path d="M 48 64 L 96 64" stroke={INK} strokeWidth="2.2" />
          <path d="M 48 64 Q 44 76 42 84" fill="none" stroke={INK} strokeWidth="2.2" />
          <text x="32" y="84" textAnchor="middle" className="font-game" fontSize="17" fill={INK}>
            4
          </text>
          <text x="72" y="84" textAnchor="middle" className="font-game" fontSize="17" fill={INK}>
            4<tspan fill="#EF4444">.</tspan>8
          </text>
          {/* Vertical dashed alignment guide for dot */}
          <line x1="72" y1="58" x2="72" y2="78" stroke="#EF4444" strokeWidth="1.4" strokeDasharray="2 2" />
          <text x="64" y="152" textAnchor="middle" className="font-body font-bold" fontSize="9.5" fill="#1D4ED8">
            점 그대로 위로!
          </text>

          {/* Right: 0.36 ÷ 4 = 0.09 */}
          <rect x="126" y="34" width="100" height="132" rx="3" fill="#FFFFFF" stroke="#EA580C" strokeWidth="2.2" />
          <text x="180" y="56" textAnchor="middle" className="font-game" fontSize="17" fill="#EA580C">
            0.<tspan fill="#DC2626">0</tspan>9
          </text>
          <path d="M 152 64 L 210 64" stroke={INK} strokeWidth="2.2" />
          <path d="M 152 64 Q 148 76 146 84" fill="none" stroke={INK} strokeWidth="2.2" />
          <text x="137" y="84" textAnchor="middle" className="font-game" fontSize="17" fill={INK}>
            4
          </text>
          <text x="184" y="84" textAnchor="middle" className="font-game" fontSize="17" fill={INK}>
            0.36
          </text>
          <text x="176" y="114" textAnchor="middle" className="font-game" fontSize="11" fill="#DC2626">
            3은 4로 못 나눠
          </text>
          <text x="176" y="130" textAnchor="middle" className="font-game" fontSize="11" fill="#DC2626">
            → 몫에 0 꼭!
          </text>
          <text x="176" y="152" textAnchor="middle" className="font-body font-bold" fontSize="9.5" fill="#64748B">
            (0.9 쓰면 땡!)
          </text>

          <text x="120" y="202" textAnchor="middle" className="font-game" fontSize="11.5" fill="#1E3A8A">
            자연수로 나눌 땐 점 안 옮기고 바로 위로!
          </text>
        </svg>
      );
    }

    /* 02: [선수학습] 안 나눠 떨어질 땐 끝 0 내려받기! */
    case 'decdiv_prereq_zero_drop': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#ECFDF5')} />

          <text x="120" y="21" textAnchor="middle" className="font-game" fontSize="13.5" fill="#047857">
            끝에 숨은 0 내려받아 끝까지 나누기!
          </text>

          <rect x="20" y="34" width="200" height="148" rx="3" fill="#FFFFFF" stroke="#059669" strokeWidth="2.2" />

          {/* Vertical division 1.5 ÷ 2 = 0.75 */}
          <text x="120" y="58" textAnchor="middle" className="font-game" fontSize="19" fill="#059669">
            0.75
          </text>
          <path d="M 86 66 L 166 66" stroke={INK} strokeWidth="2.2" />
          <path d="M 86 66 Q 82 78 80 86" fill="none" stroke={INK} strokeWidth="2.2" />
          <text x="68" y="88" textAnchor="middle" className="font-game" fontSize="18" fill={INK}>
            2
          </text>
          <text x="124" y="88" textAnchor="middle" className="font-game" fontSize="18" fill={INK}>
            1.5<tspan fill="#2563EB">0</tspan>
          </text>

          <text x="116" y="109" textAnchor="middle" className="font-game" fontSize="15" fill={INK}>
            14
          </text>
          <line x1="94" y1="115" x2="152" y2="115" stroke={INK} strokeWidth="1.8" />
          <text x="128" y="135" textAnchor="middle" className="font-game" fontSize="15" fill="#2563EB">
            10
          </text>
          {/* Arrow dropping 0 down */}
          <path d="M 139 92 L 139 118" stroke="#2563EB" strokeWidth="2" strokeDasharray="2 2" />
          <polygon points="135,115 143,115 139,121" fill="#2563EB" />

          <text x="128" y="153" textAnchor="middle" className="font-game" fontSize="15" fill={INK}>
            10
          </text>
          <line x1="106" y1="158" x2="152" y2="158" stroke={INK} strokeWidth="1.8" />
          <text x="134" y="174" textAnchor="middle" className="font-game" fontSize="14" fill="#059669">
            0 (끝!)
          </text>

          <text x="192" y="114" textAnchor="middle" className="font-game" fontSize="10" fill="#2563EB">
            숨은 0
          </text>
          <text x="192" y="128" textAnchor="middle" className="font-game" fontSize="10" fill="#2563EB">
            소환!
          </text>

          <text x="120" y="210" textAnchor="middle" className="font-game" fontSize="11.5" fill="#065F46">
            나머지가 남으면 소수 끝 0을 계속 내려받아!
          </text>
        </svg>
      );
    }

    /* 03: [선수학습] 똑같이 ×10, ×100 해도 몫은 그대로! */
    case 'decdiv_prereq_same_scale': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#FFFBEB')} />

          <text x="120" y="21" textAnchor="middle" className="font-game" fontSize="13.5" fill="#B45309">
            양쪽에 똑같이 ×10 해도 몫은 똑같다!!
          </text>

          <rect x="14" y="36" width="212" height="138" rx="3" fill="#FFFFFF" stroke="#D97706" strokeWidth="2.2" />

          <text x="120" y="64" textAnchor="middle" className="font-game" fontSize="17" fill={INK}>
            3.6 ÷ 0.9 = <tspan fill="#059669">4</tspan>
          </text>
          <text x="120" y="83" textAnchor="middle" className="font-game" fontSize="11" fill="#EA580C">
            ↓ 둘 다 똑같이 ×10 ↓
          </text>

          <text x="120" y="109" textAnchor="middle" className="font-game" fontSize="18" fill="#2563EB">
            36 ÷ 9 = <tspan fill="#059669">4</tspan>
          </text>
          <text x="120" y="128" textAnchor="middle" className="font-game" fontSize="11" fill="#EA580C">
            ↓ 둘 다 똑같이 ×10 ↓
          </text>

          <text x="120" y="155" textAnchor="middle" className="font-game" fontSize="18" fill="#7C3AED">
            360 ÷ 90 = <tspan fill="#059669">4</tspan>
          </text>

          <Stickman x={36} y={184} scale={0.54} pose="happy" armL={[-12, 12]} armR={[14, 2]} />
          <text x="140" y="206" textAnchor="middle" className="font-game" fontSize="11.5" fill="#92400E">
            이 성질로 소수를 자연수 나눗셈으로 변신!
          </text>
        </svg>
      );
    }

    /* 04: (소수) ÷ (소수) 뜻! 몇 컵 담을 수 있을까? */
    case 'decdiv_meaning_contain': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#EFF6FF')} />

          <text x="120" y="21" textAnchor="middle" className="font-game" fontSize="13.5" fill="#1D4ED8">
            1.2L ÷ 0.4L = 0.4L씩 몇 컵?!
          </text>

          {/* 1.2L big pitcher bar split into three 0.4L cups */}
          <rect x="16" y="34" width="208" height="78" rx="3" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2.2" />
          {[0, 1, 2].map((cup) => (
            <g key={cup} transform={`translate(${32 + cup * 62}, 46)`}>
              <rect x="0" y="0" width="52" height="36" rx="3" fill="#BAE6FD" stroke="#0284C7" strokeWidth="2" />
              <text x="26" y="23" textAnchor="middle" className="font-game" fontSize="13" fill="#0369A1">
                0.4L
              </text>
              <text x="26" y="53" textAnchor="middle" className="font-game" fontSize="11" fill="#EA580C">
                {cup + 1}컵
              </text>
            </g>
          ))}

          {/* Fraction proof */}
          <rect x="16" y="124" width="208" height="62" rx="3" fill="#FFFFFF" stroke="#059669" strokeWidth="2.2" />
          <text x="48" y="158" textAnchor="middle" className="font-game" fontSize="12.5" fill={INK}>
            1.2÷0.4 =
          </text>
          <Frac x={96} y={154} num={12} den={10} scale={0.74} />
          <text x={118} y="158" textAnchor="middle" className="font-game" fontSize="13" fill={INK}>
            ÷
          </text>
          <Frac x={140} y={154} num={4} den={10} scale={0.74} />
          <text x={188} y="159" textAnchor="middle" className="font-game" fontSize="14.5" fill="#059669">
            = 12÷4 = 3!
          </text>

          <text x="120" y="212" textAnchor="middle" className="font-game" fontSize="11.5" fill="#1E3A8A">
            소수 첫째 자리끼리는 그냥 자연수처럼 12÷4!
          </text>
        </svg>
      );
    }

    /* 05: 소수점 똑같이 옮기기 (같은 칸 수 이동!) */
    case 'decdiv_shift_equal': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#ECFDF5')} />

          <text x="120" y="21" textAnchor="middle" className="font-game" fontSize="13.5" fill="#047857">
            뒤 수(나누는 수)만큼 똑같이 점 옮기기!
          </text>

          <rect x="14" y="34" width="212" height="148" rx="3" fill="#FFFFFF" stroke="#059669" strokeWidth="2.2" />

          {/* Shift diagram: 1.25 ÷ 0.5 -> 12.5 ÷ 5 = 2.5 */}
          <text x="120" y="64" textAnchor="middle" className="font-game" fontSize="18" fill={INK}>
            1<tspan fill="#94A3B8">.</tspan>2<tspan fill="#EF4444">.</tspan>5 ÷ 0<tspan fill="#94A3B8">.</tspan>5<tspan fill="#EF4444">.</tspan>
          </text>
          {/* Hop 1 right under both */}
          <path d="M 65 70 Q 74 82 83 70" fill="none" stroke="#EA580C" strokeWidth="2.2" />
          <path d="M 149 70 Q 158 82 167 70" fill="none" stroke="#2563EB" strokeWidth="2.2" />
          <text x="74" y="94" textAnchor="middle" className="font-game" fontSize="10" fill="#EA580C">
            같이 1칸!
          </text>
          <text x="158" y="94" textAnchor="middle" className="font-game" fontSize="10" fill="#2563EB">
            1칸→자연수 5!
          </text>

          <line x1="26" y1="106" x2="214" y2="106" stroke="#D1FAE5" strokeWidth="1.8" />

          <text x="120" y="134" textAnchor="middle" className="font-game" fontSize="17" fill="#2563EB">
            → 12.5 ÷ 5
          </text>
          <text x="120" y="164" textAnchor="middle" className="font-game" fontSize="21" fill="#059669">
            = 2.5!
          </text>

          <text x="120" y="208" textAnchor="middle" className="font-game" fontSize="11.5" fill="#065F46">
            나누는 수(0.5)만 자연수 5로 변신시키면 성공!
          </text>
        </svg>
      );
    }

    /* 06: 소수점 이동 함정! 기준은 무조건 나누는 수! */
    case 'decdiv_shift_mismatch_trap': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#FEF2F2')} />

          <text x="120" y="21" textAnchor="middle" className="font-game" fontSize="13" fill="#DC2626">
            앞·뒤 다른 칸수 옮기면 대참사!!
          </text>

          {/* Wrong: 2칸 vs 1칸 */}
          <rect x="12" y="34" width="102" height="122" rx="3" fill="#FFFFFF" stroke="#DC2626" strokeWidth="2.2" />
          <text x="63" y="53" textAnchor="middle" className="font-game" fontSize="11" fill="#DC2626">
            ❌ 각자 맘대로!
          </text>
          <text x="63" y="78" textAnchor="middle" className="font-game" fontSize="13" fill={INK}>
            1.25 ÷ 0.5
          </text>
          <text x="63" y="98" textAnchor="middle" className="font-body font-bold" fontSize="9.5" fill="#DC2626">
            (2칸)   (1칸)
          </text>
          <text x="63" y="122" textAnchor="middle" className="font-game" fontSize="13" fill="#94A3B8">
            125 ÷ 5 = 25
          </text>
          <line x1="26" y1="108" x2="100" y2="128" stroke="#EF4444" strokeWidth="2.6" />
          <text x="63" y="144" textAnchor="middle" className="font-game" fontSize="10.5" fill="#DC2626">
            10배 뻥튀기 땡!
          </text>

          {/* Right: 1칸 vs 1칸 */}
          <rect x="126" y="34" width="102" height="122" rx="3" fill="#FFFFFF" stroke="#059669" strokeWidth="2.4" />
          <text x="177" y="53" textAnchor="middle" className="font-game" fontSize="11" fill="#059669">
            ⭕ 똑같이 1칸!
          </text>
          <text x="177" y="78" textAnchor="middle" className="font-game" fontSize="13" fill={INK}>
            1.25 ÷ 0.5
          </text>
          <text x="177" y="98" textAnchor="middle" className="font-body font-bold" fontSize="9.5" fill="#059669">
            (1칸)   (1칸)
          </text>
          <text x="177" y="124" textAnchor="middle" className="font-game" fontSize="13" fill="#059669">
            12.5 ÷ 5 = 2.5
          </text>
          <text x="177" y="144" textAnchor="middle" className="font-game" fontSize="10.5" fill="#047857">
            기준=뒤의 수!
          </text>

          <Stickman x={36} y={176} scale={0.56} pose="panic" sweat armL={[-12, 12]} armR={[14, 2]} />
          <text x="140" y="204" textAnchor="middle" className="font-game" fontSize="11.5" fill="#991B1B">
            뒤의 수가 1칸 가면 앞의 수도 딱 1칸만!
          </text>
        </svg>
      );
    }

    /* 07: (자연수) ÷ (소수) 빈칸에 0 붙이기 마법! */
    case 'decdiv_nat_div_dec': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#EFF6FF')} />

          <text x="120" y="21" textAnchor="middle" className="font-game" fontSize="13.5" fill="#1D4ED8">
            자연수 ÷ 소수! 빈칸에 0 붙이기!
          </text>

          <rect x="14" y="34" width="212" height="148" rx="3" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2.2" />

          <text x="120" y="64" textAnchor="middle" className="font-game" fontSize="20" fill={INK}>
            6<tspan fill="#2563EB">.0</tspan> ÷ 0.4
          </text>
          <text x="120" y="88" textAnchor="middle" className="font-game" fontSize="11" fill="#EA580C">
            0.4가 1칸 가면 → 6 뒤에도 0 하나 붙어!
          </text>

          <path d="M 88 94 L 88 112" stroke="#2563EB" strokeWidth="2.2" />
          <polygon points="83,108 93,108 88,115" fill="#2563EB" />

          <text x="120" y="138" textAnchor="middle" className="font-game" fontSize="20" fill="#2563EB">
            6<tspan fill="#EA580C">0</tspan> ÷ 4 = <tspan fill="#059669">15!</tspan>
          </text>
          <text x="120" y="166" textAnchor="middle" className="font-body font-bold" fontSize="10" fill="#475569">
            (예: 6 ÷ 0.04 라면 2칸 이동 → 600 ÷ 4 = 150!)
          </text>

          <text x="120" y="208" textAnchor="middle" className="font-game" fontSize="11.5" fill="#1E3A8A">
            자연수 뒤엔 .000… 소수점이 숨어 있어!
          </text>
        </svg>
      );
    }

    /* 08: 몫 중간에 0 빼먹지 마!! (8.24 ÷ 0.4) */
    case 'decdiv_quotient_zero_trap': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#FEF2F2')} />

          <text x="120" y="21" textAnchor="middle" className="font-game" fontSize="13" fill="#DC2626">
            몫 중간 0 빼먹으면 10분의 1 참사!!
          </text>

          {/* Left: Vertical division 82.4 ÷ 4 = 20.6 */}
          <rect x="14" y="34" width="128" height="148" rx="3" fill="#FFFFFF" stroke={INK} strokeWidth="2.2" />
          <text x="86" y="58" textAnchor="middle" className="font-game" fontSize="19" fill="#059669">
            2<tspan fill="#DC2626">0</tspan>.6
          </text>
          <path d="M 48 66 L 130 66" stroke={INK} strokeWidth="2.2" />
          <path d="M 48 66 Q 44 78 42 86" fill="none" stroke={INK} strokeWidth="2.2" />
          <text x="32" y="88" textAnchor="middle" className="font-game" fontSize="18" fill={INK}>
            4
          </text>
          <text x="88" y="88" textAnchor="middle" className="font-game" fontSize="18" fill={INK}>
            82.4
          </text>
          <text x="72" y="109" textAnchor="middle" className="font-game" fontSize="14" fill={INK}>
            8
          </text>
          <line x1="56" y1="115" x2="122" y2="115" stroke={INK} strokeWidth="1.6" />
          <text x="88" y="134" textAnchor="middle" className="font-game" fontSize="14" fill="#DC2626">
            2  ← 못 나눠!
          </text>
          <text x="92" y="153" textAnchor="middle" className="font-game" fontSize="14" fill="#059669">
            24 → 24 (끝!)
          </text>
          <circle cx="84" cy="51" r="10" fill="none" stroke="#DC2626" strokeWidth="2" />

          {/* Right comparison */}
          <rect x="148" y="34" width="80" height="148" rx="3" fill="#FFFFFF" stroke="#DC2626" strokeWidth="2" />
          <text x="188" y="64" textAnchor="middle" className="font-game" fontSize="12" fill="#DC2626">
            ❌ 2.6
          </text>
          <line x1="166" y1="54" x2="210" y2="66" stroke="#EF4444" strokeWidth="2.2" />
          <text x="188" y="84" textAnchor="middle" className="font-body font-bold" fontSize="9" fill="#DC2626">
            0 빠트림!
          </text>
          <line x1="158" y1="98" x2="218" y2="98" stroke="#E2E8F0" strokeWidth="1.5" />
          <text x="188" y="128" textAnchor="middle" className="font-game" fontSize="15" fill="#059669">
            ⭕ 20.6!
          </text>
          <text x="188" y="148" textAnchor="middle" className="font-body font-bold" fontSize="9" fill="#047857">
            2÷4 안 되면
          </text>
          <text x="188" y="162" textAnchor="middle" className="font-body font-bold" fontSize="9" fill="#047857">
            몫에 0 꼭!
          </text>

          <text x="120" y="210" textAnchor="middle" className="font-game" fontSize="11.5" fill="#991B1B">
            내린 수 못 나누면 몫 자리에 0 쓰고 다음 내려!
          </text>
        </svg>
      );
    }

    /* 09: 1보다 작은 소수로 나누면 오히려 커진다! */
    case 'decdiv_size_compare': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#FFFBEB')} />

          <text x="120" y="21" textAnchor="middle" className="font-game" fontSize="13" fill="#B45309">
            0.몇으로 나누면 오히려 커진다!!
          </text>

          <rect x="14" y="34" width="212" height="44" rx="3" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2" />
          <text x="26" y="54" className="font-game" fontSize="10.5" fill="#2563EB">
            1보다 큰 수로 ÷
          </text>
          <text x="26" y="69" className="font-game" fontSize="12.5" fill={INK}>
            6 ÷ 1.5 = <tspan fill="#2563EB">4</tspan>
          </text>
          <text x="166" y="61" textAnchor="middle" className="font-game" fontSize="13.5" fill="#2563EB">
            6보다 작아짐 ↓
          </text>

          <rect x="14" y="84" width="212" height="44" rx="3" fill="#FFFFFF" stroke="#64748B" strokeWidth="2" />
          <text x="26" y="104" className="font-game" fontSize="10.5" fill="#475569">
            딱 1로 ÷
          </text>
          <text x="26" y="119" className="font-game" fontSize="12.5" fill={INK}>
            6 ÷ 1 = 6
          </text>
          <text x="166" y="111" textAnchor="middle" className="font-game" fontSize="13.5" fill="#475569">
            그대로! (=)
          </text>

          <rect x="14" y="134" width="212" height="44" rx="3" fill="#FFFFFF" stroke="#059669" strokeWidth="2.4" />
          <text x="26" y="154" className="font-game" fontSize="10.5" fill="#059669">
            1보다 작은 소수로 ÷
          </text>
          <text x="26" y="169" className="font-game" fontSize="12.5" fill={INK}>
            6 ÷ 0.5 = <tspan fill="#059669">12</tspan>
          </text>
          <text x="166" y="161" textAnchor="middle" className="font-game" fontSize="13.5" fill="#059669">
            6보다 커짐 ↑
          </text>

          <Stickman x={34} y={188} scale={0.5} pose="happy" armL={[-12, 10]} armR={[14, 2]} />
          <text x="140" y="208" textAnchor="middle" className="font-game" fontSize="11.5" fill="#92400E">
            작게 쪼갤수록 개수는 더 늘어나!
          </text>
        </svg>
      );
    }

    /* 10: 분수로 바꿔서 푸는 또 하나의 치트키 */
    case 'decdiv_diff_denom_frac': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#ECFDF5')} />

          <text x="120" y="21" textAnchor="middle" className="font-game" fontSize="13.5" fill="#047857">
            헷갈릴 땐 분모 100 분수 변신!
          </text>

          <rect x="14" y="34" width="212" height="148" rx="3" fill="#FFFFFF" stroke="#059669" strokeWidth="2.2" />

          <text x="120" y="60" textAnchor="middle" className="font-game" fontSize="18" fill={INK}>
            0.75 ÷ 0.5 = ?
          </text>

          <text x="120" y="82" textAnchor="middle" className="font-game" fontSize="11" fill="#2563EB">
            ↓ 분모 100으로 통분! ↓
          </text>

          <Frac x={68} y={114} num={75} den={100} scale={0.85} barWidth={28} />
          <text x="102" y="118" textAnchor="middle" className="font-game" fontSize="15" fill={INK}>
            ÷
          </text>
          <Frac x={136} y={114} num={50} den={100} scale={0.85} barWidth={28} />
          <text x="184" y="118" textAnchor="middle" className="font-game" fontSize="13" fill="#059669">
            (분모 삭제!)
          </text>

          <line x1="26" y1="142" x2="214" y2="142" stroke="#D1FAE5" strokeWidth="1.8" />
          <text x="120" y="168" textAnchor="middle" className="font-game" fontSize="16" fill="#047857">
            = 75 ÷ 50 = 1.5!
          </text>

          <text x="120" y="208" textAnchor="middle" className="font-game" fontSize="11.5" fill="#065F46">
            분모 100 맞추면 분자끼리 자연수 나눗셈!
          </text>
        </svg>
      );
    }

    /* 11: 나누어 주고 남는 양 구하기 (몫은 자연수) */
    case 'decdiv_remainder_rule': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#FFFBEB')} />

          <text x="120" y="21" textAnchor="middle" className="font-game" fontSize="13" fill="#B45309">
            8.5m 리본을 2.5m씩 자르면?
          </text>

          {/* Ribbon visual: 3 pieces of 2.5m + 1m leftover */}
          <rect x="14" y="34" width="212" height="72" rx="3" fill="#FFFFFF" stroke="#D97706" strokeWidth="2.2" />
          <rect x="24" y="52" width="54" height="24" fill="#FDE047" stroke={INK} strokeWidth="1.8" />
          <text x="51" y="68" textAnchor="middle" className="font-game" fontSize="11" fill={INK}>
            2.5m
          </text>
          <rect x="78" y="52" width="54" height="24" fill="#FDE047" stroke={INK} strokeWidth="1.8" />
          <text x="105" y="68" textAnchor="middle" className="font-game" fontSize="11" fill={INK}>
            2.5m
          </text>
          <rect x="132" y="52" width="54" height="24" fill="#FDE047" stroke={INK} strokeWidth="1.8" />
          <text x="159" y="68" textAnchor="middle" className="font-game" fontSize="11" fill={INK}>
            2.5m
          </text>
          <rect x="186" y="52" width="28" height="24" fill="#FCA5A5" stroke="#DC2626" strokeWidth="1.8" />
          <text x="200" y="68" textAnchor="middle" className="font-game" fontSize="10.5" fill="#991B1B">
            1m
          </text>
          <text x="105" y="94" textAnchor="middle" className="font-game" fontSize="11" fill="#059669">
            ← 딱 3도막! (자연수 몫) →
          </text>
          <text x="200" y="94" textAnchor="middle" className="font-game" fontSize="10.5" fill="#DC2626">
            남은양
          </text>

          <rect x="14" y="116" width="212" height="72" rx="3" fill="#FFFFFF" stroke={INK} strokeWidth="2" />
          <text x="120" y="140" textAnchor="middle" className="font-game" fontSize="14.5" fill={INK}>
            85 ÷ 25 = 몫 <tspan fill="#059669">3</tspan>, 남은 수 10
          </text>
          <text x="120" y="166" textAnchor="middle" className="font-game" fontSize="13.5" fill="#DC2626">
            원래 점 자리 내리면 → 1.0m = 1m!
          </text>

          <text x="120" y="212" textAnchor="middle" className="font-game" fontSize="11" fill="#92400E">
            도막 수·사람 수는 자연수까지만 구해!
          </text>
        </svg>
      );
    }

    /* 12: 나머지 소수점은 ‘옮기기 전 원래 점’!! */
    case 'decdiv_remainder_dot_trap': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#FEF2F2')} />

          <text x="120" y="21" textAnchor="middle" className="font-game" fontSize="13" fill="#DC2626">
            오답률 1위! 나머지 소수점 위치!!
          </text>

          {/* Left: Vertical division 4.7 ÷ 0.8 */}
          <rect x="14" y="34" width="132" height="150" rx="3" fill="#FFFFFF" stroke={INK} strokeWidth="2.2" />
          <text x="108" y="56" textAnchor="middle" className="font-game" fontSize="18" fill="#059669">
            5
          </text>
          <path d="M 60 64 L 130 64" stroke={INK} strokeWidth="2.2" />
          <path d="M 60 64 Q 56 76 54 84" fill="none" stroke={INK} strokeWidth="2.2" />

          {/* 0.8 shifted to 8 */}
          <text x="38" y="86" textAnchor="middle" className="font-game" fontSize="16" fill={INK}>
            0.8.
          </text>
          <line x1="25" y1="88" x2="36" y2="76" stroke="#94A3B8" strokeWidth="1.6" />

          {/* 4.7 shifted to 47 with original dot highlighted */}
          <text x="96" y="86" textAnchor="middle" className="font-game" fontSize="17" fill={INK}>
            4<tspan fill="#DC2626">.</tspan>7<tspan fill="#94A3B8">.</tspan>
          </text>
          <text x="96" y="108" textAnchor="middle" className="font-game" fontSize="16" fill={INK}>
            4 0
          </text>
          <line x1="70" y1="114" x2="122" y2="114" stroke={INK} strokeWidth="1.8" />
          <text x="96" y="138" textAnchor="middle" className="font-game" fontSize="18" fill="#DC2626">
            0.7
          </text>
          {/* Dashed red vertical line dropping original dot straight down */}
          <line x1="91" y1="88" x2="91" y2="140" stroke="#EF4444" strokeWidth="2" strokeDasharray="3 2" />
          <text x="96" y="164" textAnchor="middle" className="font-game" fontSize="10" fill="#DC2626">
            원래 점 뚝 떨어짐!
          </text>

          {/* Right trap callout */}
          <rect x="152" y="34" width="76" height="150" rx="3" fill="#FFFFFF" stroke="#DC2626" strokeWidth="2" />
          <text x="190" y="64" textAnchor="middle" className="font-game" fontSize="12.5" fill="#DC2626">
            ❌ 나머지 7
          </text>
          <line x1="164" y1="54" x2="216" y2="66" stroke="#EF4444" strokeWidth="2.4" />
          <text x="190" y="82" textAnchor="middle" className="font-body font-bold" fontSize="8.5" fill="#DC2626">
            4.7보다 커!
          </text>
          <line x1="160" y1="98" x2="220" y2="98" stroke="#E2E8F0" strokeWidth="1.5" />
          <text x="190" y="128" textAnchor="middle" className="font-game" fontSize="14.5" fill="#059669">
            ⭕ 0.7!
          </text>
          <text x="190" y="150" textAnchor="middle" className="font-body font-bold" fontSize="8.5" fill="#047857">
            옮기기 전
          </text>
          <text x="190" y="164" textAnchor="middle" className="font-body font-bold" fontSize="8.5" fill="#047857">
            원래 점!
          </text>

          <text x="120" y="210" textAnchor="middle" className="font-game" fontSize="11.5" fill="#991B1B">
            나머지는 무조건 옮기기 전 ‘원래 소수점’!
          </text>
        </svg>
      );
    }

    /* 13: 안 나눠 떨어지는 몫, 반올림해서 구하기 */
    case 'decdiv_quotient_round': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#ECFDF5')} />

          <text x="120" y="21" textAnchor="middle" className="font-game" fontSize="13.5" fill="#047857">
            안 나눠 떨어질 땐 반올림으로 컷!
          </text>

          <rect x="14" y="34" width="212" height="148" rx="3" fill="#FFFFFF" stroke="#059669" strokeWidth="2.2" />
          <text x="120" y="58" textAnchor="middle" className="font-game" fontSize="14" fill={INK}>
            5 ÷ 0.7 = 7.1428…
          </text>
          <text x="120" y="80" textAnchor="middle" className="font-game" fontSize="11.5" fill="#2563EB">
            “소수 첫째 자리까지 구해봐!”
          </text>

          <text x="120" y="116" textAnchor="middle" className="font-game" fontSize="24" fill={INK}>
            7.<tspan fill="#059669">1</tspan><tspan fill="#DC2626">4</tspan>2…
          </text>
          <circle cx="131" cy="108" r="12" fill="none" stroke="#DC2626" strokeWidth="2" />
          <text x="164" y="142" textAnchor="middle" className="font-game" fontSize="10.5" fill="#DC2626">
            둘째 자리 4 → 버림!
          </text>

          <text x="120" y="168" textAnchor="middle" className="font-game" fontSize="18" fill="#059669">
            정답: 약 7.1!
          </text>

          <text x="120" y="208" textAnchor="middle" className="font-game" fontSize="11.5" fill="#065F46">
            구하는 자리 바로 다음 칸만 보고 반올림!
          </text>
        </svg>
      );
    }

    /* 14: 나머지 맞는지 1초 검산 치트키! */
    case 'decdiv_verify_check': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#F5F3FF')} />

          <text x="120" y="21" textAnchor="middle" className="font-game" fontSize="13.5" fill="#5B21B6">
            검산식 넣으면 나머지 실수 1초 적발!
          </text>

          <rect x="14" y="34" width="212" height="72" rx="3" fill="#FFFFFF" stroke="#7C3AED" strokeWidth="2.2" />
          <text x="120" y="56" textAnchor="middle" className="font-game" fontSize="11.5" fill="#5B21B6">
            4.7 ÷ 0.8 = 몫 5, 나머지 0.7 맞나?
          </text>
          <text x="120" y="84" textAnchor="middle" className="font-game" fontSize="15" fill="#059669">
            0.8 × 5 + 0.7 = 4.7 (⭕ 통과!)
          </text>

          <rect x="14" y="116" width="212" height="68" rx="3" fill="#FFFFFF" stroke="#DC2626" strokeWidth="2.2" />
          <text x="120" y="138" textAnchor="middle" className="font-game" fontSize="11.5" fill="#DC2626">
            만약 나머지를 7로 잘못 썼다면?
          </text>
          <text x="120" y="164" textAnchor="middle" className="font-game" fontSize="15" fill="#DC2626">
            0.8 × 5 + 7 = 11 ≠ 4.7 (❌ 들통!)
          </text>

          <text x="120" y="210" textAnchor="middle" className="font-game" fontSize="11.5" fill="#5B21B6">
            (나누는 수)×(몫)+(나머지) = 처음 수!
          </text>
        </svg>
      );
    }

    /* 15: 문장제 필살기! ‘무엇으로 나눌지’ 1초 구별 */
    case 'decdiv_unit_rate_word': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#F5F3FF')} />

          <text x="120" y="21" textAnchor="middle" className="font-game" fontSize="13" fill="#5B21B6">
            1로 만들고 싶은 단위가 ÷ 뒤로!!
          </text>

          <rect x="14" y="34" width="212" height="64" rx="3" fill="#FFFFFF" stroke="#7C3AED" strokeWidth="2.2" />
          <text x="120" y="56" textAnchor="middle" className="font-game" fontSize="12" fill={INK}>
            “사과 <tspan fill="#DC2626">0.6kg</tspan>에 2.4만 원! <tspan fill="#DC2626">1kg</tspan> 가격은?”
          </text>
          <text x="120" y="80" textAnchor="middle" className="font-game" fontSize="11.5" fill="#DC2626">
            0.6kg → 1kg 만들고 싶으니 0.6이 ÷ 뒤!
          </text>

          <rect x="14" y="110" width="212" height="72" rx="3" fill="#FFFFFF" stroke="#059669" strokeWidth="2.4" />
          <text x="120" y="138" textAnchor="middle" className="font-game" fontSize="18" fill={INK}>
            2.4 ÷ <tspan fill="#DC2626">0.6</tspan> = 24 ÷ 6
          </text>
          <text x="120" y="166" textAnchor="middle" className="font-game" fontSize="18" fill="#059669">
            = 4만 원!!
          </text>

          <text x="120" y="208" textAnchor="middle" className="font-game" fontSize="11.5" fill="#5B21B6">
            1kg·1시간·1L ← ‘1’ 붙는 단위가 나누는 수!
          </text>
        </svg>
      );
    }

    /* 16: 최종 보스! 소수의 나눗셈 3관문 */
    case 'decdiv_boss': {
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
            소수의 나눗셈 최종 보스 3관문!
          </text>

          {/* Gate 1 */}
          <rect x="14" y="34" width="212" height="44" rx="4" fill="#FFFFFF" stroke={isLightPrint ? INK : '#FACC15'} strokeWidth="2" />
          <text x="26" y="61" className="font-game" fontSize="11" fill="#2563EB">
            1관문
          </text>
          <text x="114" y="62" textAnchor="middle" className="font-game" fontSize="15.5" fill={INK}>
            6 ÷ 0.4 =
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
          <text x="108" y="113" textAnchor="middle" className="font-game" fontSize="13.5" fill={INK}>
            4.7÷0.8 → 몫·나머지
          </text>
          <rect x="174" y="94" width="42" height="26" rx="3" fill="#FEF9C3" stroke="#D97706" strokeWidth="1.8" strokeDasharray="3 2" />
          <text x="195" y="112" textAnchor="middle" className="font-game" fontSize="12" fill="#D97706">
            ? , ?
          </text>

          {/* Gate 3 */}
          <rect x="14" y="136" width="212" height="44" rx="4" fill="#FFFFFF" stroke={isLightPrint ? INK : '#FACC15'} strokeWidth="2" />
          <text x="26" y="163" className="font-game" fontSize="11" fill="#DC2626">
            3관문
          </text>
          <text x="96" y="164" textAnchor="middle" className="font-game" fontSize="15" fill={INK}>
            8 ÷ 0.5
          </text>
          <circle cx="138" cy="158" r="11" fill="#FEF2F2" stroke="#DC2626" strokeWidth="1.8" strokeDasharray="3 2" />
          <text x="138" y="162" textAnchor="middle" className="font-game" fontSize="11" fill="#DC2626">
            ○
          </text>
          <text x="164" y="164" textAnchor="middle" className="font-game" fontSize="15" fill={INK}>
            8
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

    /* 17: 6-2 소수의 나눗셈 완주 축하 포카! */
    case 'decdiv_praise':
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
            6-2 소수의 나눗셈 마스터!!
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
            소수점 이동 + 몫 0 + 나머지 원래점 정복!
          </text>

          <text
            x="120"
            y="214"
            textAnchor="middle"
            className="font-game"
            fontSize="12"
            fill={isBw ? INK : isLightPrint ? '#4338CA' : '#A7F3D0'}
          >
            축하해! 이제 4-2 소수 덧·뺄셈으로 가자!
          </text>
        </svg>
      );
    }
  }
};
