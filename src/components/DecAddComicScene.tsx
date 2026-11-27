import React from 'react';
import { EpisodeSceneType, PrintInkMode } from '../types/card';

interface DecAddComicSceneProps {
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

export const DecAddComicScene: React.FC<DecAddComicSceneProps> = ({
  sceneType,
  inkMode = 'full',
}) => {
  const isLightPrint = inkMode !== 'full';
  const isBw = inkMode === 'bw_worksheet';
  const softBg = (color: string) => (isLightPrint ? '#FFFFFF' : color);

  switch (sceneType) {
    /* 00: 소수의 덧셈과 뺄셈 도감 설명서 */
    case 'decadd_guide': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#F0F9FF')} />
          <line x1="0" y1="192" x2="240" y2="192" stroke={INK} strokeWidth="2.4" />

          <text x="120" y="23" textAnchor="middle" className="font-game" fontSize="14" fill="#0369A1">
            4-2 소수의 덧셈·뺄셈 18장 도감!
          </text>

          <rect x="16" y="40" width="128" height="98" rx="4" fill="#FFFFFF" stroke="#0284C7" strokeWidth="2.2" />
          <text x="80" y="65" textAnchor="middle" className="font-game" fontSize="16" fill={INK}>
            1<tspan fill="#EF4444">.</tspan>40
          </text>
          <text x="80" y="88" textAnchor="middle" className="font-game" fontSize="16" fill={INK}>
            + 0<tspan fill="#EF4444">.</tspan>25
          </text>
          <line x1="36" y1="96" x2="124" y2="96" stroke={INK} strokeWidth="2" />
          <text x="80" y="120" textAnchor="middle" className="font-game" fontSize="18" fill="#059669">
            1<tspan fill="#EF4444">.</tspan>65!
          </text>
          <line x1="65" y1="48" x2="65" y2="128" stroke="#EF4444" strokeWidth="1.3" strokeDasharray="2 2" />

          <Stickman x={184} y={118} scale={0.95} pose="hero" armL={[-20, 6]} armR={[18, 2]} />

          <rect x="16" y="152" width="128" height="28" rx="3" fill="#FEF9C3" stroke="#D97706" strokeWidth="2" />
          <text x="80" y="170" textAnchor="middle" className="font-game" fontSize="10.5" fill="#B45309">
            무조건 소수점 세로 줄맞춤!
          </text>

          <text x="120" y="214" textAnchor="middle" className="font-game" fontSize="11.5" fill="#0F172A">
            자연수에서 빼기·끝 0 지우기까지 완성!
          </text>
        </svg>
      );
    }

    /* 01: [선수학습] 0.1(한 자리) · 0.01(두 자리) · 0.001 */
    case 'decadd_prereq_tenths_hundredths': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#EFF6FF')} />

          <text x="120" y="21" textAnchor="middle" className="font-game" fontSize="13.5" fill="#1D4ED8">
            0.1 = 0.10 (크기 똑같다!!)
          </text>

          {/* Left: 10-bar showing 0.1 */}
          <rect x="14" y="34" width="98" height="118" rx="3" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2.2" />
          <text x="63" y="53" textAnchor="middle" className="font-game" fontSize="13" fill="#2563EB">
            0.1 (10등분)
          </text>
          <g transform="translate(26, 62)">
            {Array.from({ length: 10 }, (_, i) => (
              <rect
                key={i}
                x={i * 7.4}
                y="0"
                width="7.4"
                height="68"
                fill={i === 0 ? '#60A5FA' : '#FFFFFF'}
                stroke={INK}
                strokeWidth="1.2"
              />
            ))}
          </g>
          <text x="63" y="144" textAnchor="middle" className="font-game" fontSize="11" fill={INK}>
            10칸 중 1줄!
          </text>

          <text x="120" y="96" textAnchor="middle" className="font-game" fontSize="18" fill="#059669">
            =
          </text>

          {/* Right: 100-grid showing 0.10 */}
          <rect x="128" y="34" width="98" height="118" rx="3" fill="#FFFFFF" stroke="#059669" strokeWidth="2.2" />
          <text x="177" y="53" textAnchor="middle" className="font-game" fontSize="13" fill="#059669">
            0.10 (100등분)
          </text>
          <g transform="translate(143, 62)">
            <rect x="0" y="0" width="6.8" height="68" fill="#34D399" />
            {Array.from({ length: 11 }, (_, i) => (
              <g key={i}>
                <line x1={i * 6.8} y1="0" x2={i * 6.8} y2="68" stroke={INK} strokeWidth={i === 0 || i === 10 ? 1.6 : 0.7} />
                <line x1="0" y1={i * 6.8} x2="68" y2={i * 6.8} stroke={INK} strokeWidth={i === 0 || i === 10 ? 1.6 : 0.7} />
              </g>
            ))}
          </g>
          <text x="177" y="144" textAnchor="middle" className="font-game" fontSize="11" fill={INK}>
            100칸 중 10칸!
          </text>

          <rect x="16" y="164" width="208" height="46" rx="3" fill="#FFFFFF" stroke={INK} strokeWidth="2" />
          <text x="120" y="184" textAnchor="middle" className="font-game" fontSize="12.5" fill="#EA580C">
            0.1 = 0.10 = 0.100 (실제 양 똑같아!)
          </text>
          <text x="120" y="201" textAnchor="middle" className="font-body font-bold" fontSize="9.5" fill="#475569">
            0.001은 1을 1000조각 낸 것 중 1조각!
          </text>
        </svg>
      );
    }

    /* 02: [선수학습] 0.9 vs 0.12 누가 더 클까?! */
    case 'decadd_prereq_size_trap': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#FEF2F2')} />

          <text x="120" y="21" textAnchor="middle" className="font-game" fontSize="13.5" fill="#DC2626">
            0.9 vs 0.12 누가 더 클까?!
          </text>

          {/* Wrong thought */}
          <rect x="14" y="34" width="212" height="48" rx="3" fill="#FFFFFF" stroke="#DC2626" strokeWidth="2" />
          <text x="120" y="63" textAnchor="middle" className="font-game" fontSize="13.5" fill="#94A3B8">
            ❌ “12가 9보다 크니 0.12가 더 크다!”
          </text>
          <line x1="28" y1="50" x2="212" y2="66" stroke="#EF4444" strokeWidth="2.4" />

          {/* Correct comparison */}
          <rect x="14" y="92" width="212" height="90" rx="3" fill="#FFFFFF" stroke="#059669" strokeWidth="2.4" />
          <text x="120" y="113" textAnchor="middle" className="font-game" fontSize="12" fill="#059669">
            ⭕ 뒤에 0 채워 자릿수 맞추기!
          </text>
          <text x="68" y="148" textAnchor="middle" className="font-game" fontSize="22" fill="#059669">
            0.9<tspan fill="#EA580C">0</tspan>
          </text>
          <text x="120" y="148" textAnchor="middle" className="font-game" fontSize="24" fill="#DC2626">
            &gt;
          </text>
          <text x="174" y="148" textAnchor="middle" className="font-game" fontSize="22" fill={INK}>
            0.12
          </text>
          <text x="120" y="172" textAnchor="middle" className="font-body font-bold" fontSize="9.5" fill="#047857">
            90조각 vs 12조각! 0.9가 압승!
          </text>

          <Stickman x={34} y={186} scale={0.5} pose="panic" sweat armL={[-12, 10]} armR={[14, 2]} />
          <text x="140" y="210" textAnchor="middle" className="font-game" fontSize="11.5" fill="#991B1B">
            숫자 길이로 비교 금지! 첫째 자리부터 비교!
          </text>
        </svg>
      );
    }

    /* 03: [선수학습] 10배 하면 오른쪽, 1/10배 하면 왼쪽! */
    case 'decadd_prereq_10x_shift': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#FFFBEB')} />

          <text x="120" y="21" textAnchor="middle" className="font-game" fontSize="13.5" fill="#B45309">
            10배(커짐) ↔ 1/10배(작아짐) 계단!
          </text>

          <rect x="14" y="34" width="212" height="146" rx="3" fill="#FFFFFF" stroke="#D97706" strokeWidth="2.2" />

          {/* Boxes: 0.01 <-> 0.1 <-> 1 */}
          <rect x="24" y="78" width="52" height="44" rx="3" fill="#DBEAFE" stroke="#2563EB" strokeWidth="2" />
          <text x="50" y="106" textAnchor="middle" className="font-game" fontSize="15" fill="#1D4ED8">
            0.01
          </text>

          <rect x="94" y="78" width="52" height="44" rx="3" fill="#FEF3C7" stroke="#D97706" strokeWidth="2" />
          <text x="120" y="106" textAnchor="middle" className="font-game" fontSize="16" fill="#B45309">
            0.1
          </text>

          <rect x="164" y="78" width="52" height="44" rx="3" fill="#DCFCE7" stroke="#059669" strokeWidth="2" />
          <text x="190" y="106" textAnchor="middle" className="font-game" fontSize="18" fill="#047857">
            1
          </text>

          {/* Top arrows: x10 right */}
          <path d="M 52 72 Q 86 48 118 72" fill="none" stroke="#EA580C" strokeWidth="2.4" />
          <polygon points="113,66 120,73 111,74" fill="#EA580C" />
          <text x="85" y="54" textAnchor="middle" className="font-game" fontSize="10.5" fill="#EA580C">
            ×10배
          </text>

          <path d="M 122 72 Q 156 48 188 72" fill="none" stroke="#EA580C" strokeWidth="2.4" />
          <polygon points="183,66 190,73 181,74" fill="#EA580C" />
          <text x="155" y="54" textAnchor="middle" className="font-game" fontSize="10.5" fill="#EA580C">
            ×10배
          </text>

          {/* Bottom arrows: 1/10 left */}
          <path d="M 188 128 Q 156 152 122 128" fill="none" stroke="#2563EB" strokeWidth="2.4" />
          <polygon points="127,134 120,127 129,126" fill="#2563EB" />
          <text x="155" y="160" textAnchor="middle" className="font-game" fontSize="10.5" fill="#2563EB">
            1/10배
          </text>

          <path d="M 118 128 Q 86 152 52 128" fill="none" stroke="#2563EB" strokeWidth="2.4" />
          <polygon points="57,134 50,127 59,126" fill="#2563EB" />
          <text x="85" y="160" textAnchor="middle" className="font-game" fontSize="10.5" fill="#2563EB">
            1/10배
          </text>

          <text x="120" y="208" textAnchor="middle" className="font-game" fontSize="11.5" fill="#92400E">
            10배마다 한 칸씩 UP! 1/10배마다 한 칸씩 DOWN!
          </text>
        </svg>
      );
    }

    /* 04: 소수 덧·뺄셈 1원칙: 소수점 세로 줄맞춤! */
    case 'decadd_align_dot_rule': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#FFFBEB')} />

          <text x="120" y="21" textAnchor="middle" className="font-game" fontSize="13.5" fill="#B45309">
            절대 원칙: 소수점을 일렬로 줄 세워!!
          </text>

          <rect x="24" y="34" width="192" height="148" rx="3" fill="#FFFFFF" stroke="#D97706" strokeWidth="2.4" />

          {/* Vertical red alignment track */}
          <rect x="104" y="46" width="14" height="122" rx="2" fill="#FEE2E2" stroke="#EF4444" strokeWidth="1.4" strokeDasharray="3 2" />

          <text x="96" y="76" textAnchor="end" className="font-game" fontSize="24" fill={INK}>
            1
          </text>
          <text x="111" y="76" textAnchor="middle" className="font-game" fontSize="26" fill="#DC2626">
            .
          </text>
          <text x="124" y="76" textAnchor="start" className="font-game" fontSize="24" fill={INK}>
            4<tspan fill="#94A3B8">0</tspan>
          </text>

          <text x="64" y="110" textAnchor="middle" className="font-game" fontSize="20" fill={INK}>
            +
          </text>
          <text x="96" y="110" textAnchor="end" className="font-game" fontSize="24" fill={INK}>
            0
          </text>
          <text x="111" y="110" textAnchor="middle" className="font-game" fontSize="26" fill="#DC2626">
            .
          </text>
          <text x="124" y="110" textAnchor="start" className="font-game" fontSize="24" fill={INK}>
            25
          </text>

          <line x1="50" y1="122" x2="178" y2="122" stroke={INK} strokeWidth="2.6" />

          <text x="96" y="156" textAnchor="end" className="font-game" fontSize="25" fill="#059669">
            1
          </text>
          <text x="111" y="156" textAnchor="middle" className="font-game" fontSize="27" fill="#DC2626">
            .
          </text>
          <text x="124" y="156" textAnchor="start" className="font-game" fontSize="25" fill="#059669">
            65
          </text>

          <text x="120" y="208" textAnchor="middle" className="font-game" fontSize="11.5" fill="#92400E">
            소수점 줄을 똑바로 맞춰야 같은 자리끼리 계산!
          </text>
        </svg>
      );
    }

    /* 05: 곱셈이랑 반대! 오른쪽 끝 맞추면 땡!! */
    case 'decadd_right_align_trap': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#FEF2F2')} />

          <text x="120" y="21" textAnchor="middle" className="font-game" fontSize="12.5" fill="#DC2626">
            오른쪽 끝 맞추면 대참사!! (곱셈과 반대!)
          </text>

          {/* Left: WRONG right aligned */}
          <rect x="12" y="34" width="102" height="126" rx="3" fill="#FFFFFF" stroke="#DC2626" strokeWidth="2.2" />
          <text x="63" y="53" textAnchor="middle" className="font-game" fontSize="11" fill="#DC2626">
            ❌ 오른쪽 끝 맞춤
          </text>
          <text x="92" y="82" textAnchor="end" className="font-game" fontSize="19" fill={INK}>
            1.4
          </text>
          <text x="92" y="108" textAnchor="end" className="font-game" fontSize="19" fill={INK}>
            + 0.25
          </text>
          <line x1="26" y1="116" x2="98" y2="116" stroke={INK} strokeWidth="2" />
          <text x="92" y="142" textAnchor="end" className="font-game" fontSize="18" fill="#94A3B8">
            0.39
          </text>
          <line x1="34" y1="68" x2="96" y2="146" stroke="#EF4444" strokeWidth="2.8" />

          {/* Right: CORRECT dot aligned */}
          <rect x="126" y="34" width="102" height="126" rx="3" fill="#FFFFFF" stroke="#059669" strokeWidth="2.4" />
          <text x="177" y="53" textAnchor="middle" className="font-game" fontSize="11" fill="#059669">
            ⭕ 소수점 줄맞춤!
          </text>
          <text x="172" y="82" textAnchor="end" className="font-game" fontSize="19" fill={INK}>
            1.
          </text>
          <text x="172" y="82" textAnchor="start" className="font-game" fontSize="19" fill={INK}>
            4<tspan fill="#94A3B8">0</tspan>
          </text>
          <text x="142" y="108" textAnchor="middle" className="font-game" fontSize="17" fill={INK}>
            +
          </text>
          <text x="172" y="108" textAnchor="end" className="font-game" fontSize="19" fill={INK}>
            0.
          </text>
          <text x="172" y="108" textAnchor="start" className="font-game" fontSize="19" fill={INK}>
            25
          </text>
          <line x1="138" y1="116" x2="212" y2="116" stroke={INK} strokeWidth="2" />
          <text x="172" y="142" textAnchor="end" className="font-game" fontSize="19" fill="#059669">
            1.
          </text>
          <text x="172" y="142" textAnchor="start" className="font-game" fontSize="19" fill="#059669">
            65
          </text>

          <Stickman x={34} y={178} scale={0.56} pose="panic" sweat armL={[-12, 12]} armR={[14, 2]} />
          <text x="140" y="205" textAnchor="middle" className="font-game" fontSize="11.5" fill="#991B1B">
            덧셈·뺄셈은 소수점, 곱셈만 끝맞춤!
          </text>
        </svg>
      );
    }

    /* 06: 소수 첫째·둘째 자리 덧셈 기본 */
    case 'decadd_add_basic': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#EFF6FF')} />

          <text x="120" y="21" textAnchor="middle" className="font-game" fontSize="13.5" fill="#1D4ED8">
            0.24 + 0.35 = 0.01이 몇 개?!
          </text>

          {/* 100-grid showing 24 blue + 35 green = 59 */}
          <g transform="translate(20, 38)">
            <rect x="0" y="0" width="100" height="100" fill="#FFFFFF" />
            {/* 24 squares */}
            <rect x="0" y="0" width="20" height="100" fill="#93C5FD" />
            <rect x="20" y="0" width="10" height="40" fill="#93C5FD" />
            {/* 35 squares */}
            <rect x="20" y="40" width="10" height="60" fill="#6EE7B7" />
            <rect x="30" y="0" width="20" height="100" fill="#6EE7B7" />
            <rect x="50" y="0" width="10" height="90" fill="#6EE7B7" />
            {Array.from({ length: 11 }, (_, i) => (
              <g key={i}>
                <line x1={i * 10} y1="0" x2={i * 10} y2="100" stroke={INK} strokeWidth={i === 0 || i === 10 ? 2 : 0.7} />
                <line x1="0" y1={i * 10} x2="100" y2={i * 10} stroke={INK} strokeWidth={i === 0 || i === 10 ? 2 : 0.7} />
              </g>
            ))}
          </g>

          <rect x="132" y="38" width="96" height="102" rx="3" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2.2" />
          <text x="180" y="64" textAnchor="middle" className="font-game" fontSize="14" fill="#2563EB">
            0.24 (24칸)
          </text>
          <text x="180" y="88" textAnchor="middle" className="font-game" fontSize="14" fill="#059669">
            + 0.35 (35칸)
          </text>
          <line x1="142" y1="98" x2="218" y2="98" stroke={INK} strokeWidth="2" />
          <text x="180" y="124" textAnchor="middle" className="font-game" fontSize="18" fill={INK}>
            = 0.59!
          </text>

          <rect x="16" y="156" width="208" height="46" rx="3" fill="#FFFFFF" stroke={INK} strokeWidth="2" />
          <text x="120" y="177" textAnchor="middle" className="font-game" fontSize="12" fill="#1D4ED8">
            24 + 35 = 59 → 총 59칸 = 0.59!
          </text>
          <text x="120" y="194" textAnchor="middle" className="font-body font-bold" fontSize="9.5" fill="#475569">
            같은 자리끼리 더하고 소수점 그대로 콕!
          </text>
        </svg>
      );
    }

    /* 07: 소수점 넘어서 받아올림! (0.7 + 0.8 = 1.5) */
    case 'decadd_add_carry_point': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#ECFDF5')} />

          <text x="120" y="21" textAnchor="middle" className="font-game" fontSize="13.5" fill="#047857">
            0.1이 10개 모이면 자연수 1 변신!!
          </text>

          <rect x="20" y="34" width="200" height="148" rx="3" fill="#FFFFFF" stroke="#059669" strokeWidth="2.2" />

          {/* Carry 1 above ones place */}
          <circle cx="96" cy="54" r="10" fill="#FEF08A" stroke="#EA580C" strokeWidth="2" />
          <text x="96" y="59" textAnchor="middle" className="font-game" fontSize="13" fill="#DC2626">
            1
          </text>
          <path d="M 128 62 Q 114 44 106 52" fill="none" stroke="#EA580C" strokeWidth="2" />

          <text x="120" y="84" textAnchor="middle" className="font-game" fontSize="24" fill={INK}>
            0<tspan fill="#EF4444">.</tspan>7
          </text>
          <text x="120" y="114" textAnchor="middle" className="font-game" fontSize="24" fill={INK}>
            + 0<tspan fill="#EF4444">.</tspan>8
          </text>
          <line x1="68" y1="124" x2="172" y2="124" stroke={INK} strokeWidth="2.4" />
          <text x="120" y="156" textAnchor="middle" className="font-game" fontSize="26" fill="#059669">
            1<tspan fill="#EF4444">.</tspan>5!
          </text>

          <text x="120" y="208" textAnchor="middle" className="font-game" fontSize="11.5" fill="#065F46">
            7+8=15 → 10은 자연수 1로 쏙, 0.5만 남아!
          </text>
        </svg>
      );
    }

    /* 08: 더한 뒤 소수 끝자리 0은 생략하기! */
    case 'decadd_trailing_zero_drop': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#ECFDF5')} />

          <text x="120" y="21" textAnchor="middle" className="font-game" fontSize="13.5" fill="#047857">
            계산 끝! 남는 끝자리 0은 지워 정리!
          </text>

          <rect x="14" y="34" width="212" height="70" rx="3" fill="#FFFFFF" stroke="#059669" strokeWidth="2.2" />
          <text x="120" y="59" textAnchor="middle" className="font-game" fontSize="16" fill={INK}>
            1.35 + 0.65 = 2.<tspan fill="#94A3B8">00</tspan>
          </text>
          <line x1="158" y1="45" x2="180" y2="62" stroke="#EF4444" strokeWidth="2.4" />
          <text x="120" y="88" textAnchor="middle" className="font-game" fontSize="18" fill="#059669">
            = 딱 자연수 2!
          </text>

          <rect x="14" y="114" width="212" height="70" rx="3" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2.2" />
          <text x="120" y="139" textAnchor="middle" className="font-game" fontSize="16" fill={INK}>
            0.48 + 0.12 = 0.6<tspan fill="#94A3B8">0</tspan>
          </text>
          <line x1="170" y1="125" x2="182" y2="142" stroke="#EF4444" strokeWidth="2.4" />
          <text x="120" y="168" textAnchor="middle" className="font-game" fontSize="18" fill="#2563EB">
            = 0.6!
          </text>

          <text x="120" y="210" textAnchor="middle" className="font-game" fontSize="11.5" fill="#065F46">
            정답 적을 땐 소수 맨 끝 0을 깔끔하게 삭제!
          </text>
        </svg>
      );
    }

    /* 09: 자릿수 다른 소수 덧셈 (2.4 + 1.37) */
    case 'decadd_diff_places_add': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#ECFDF5')} />

          <text x="120" y="21" textAnchor="middle" className="font-game" fontSize="13.5" fill="#047857">
            길이가 다를 땐 빈칸에 0 채우고 더하기!
          </text>

          <rect x="20" y="34" width="200" height="148" rx="3" fill="#FFFFFF" stroke="#059669" strokeWidth="2.2" />

          <text x="122" y="72" textAnchor="middle" className="font-game" fontSize="24" fill={INK}>
            2.4<tspan fill="#EA580C">0</tspan>
          </text>
          <rect x="131" y="51" width="18" height="25" rx="2" fill="none" stroke="#EA580C" strokeWidth="1.6" strokeDasharray="3 2" />

          <text x="115" y="106" textAnchor="middle" className="font-game" fontSize="24" fill={INK}>
            + 1.37
          </text>
          <line x1="58" y1="116" x2="174" y2="116" stroke={INK} strokeWidth="2.4" />
          <text x="122" y="150" textAnchor="middle" className="font-game" fontSize="26" fill="#059669">
            3.77!
          </text>
          <text x="184" y="68" textAnchor="middle" className="font-game" fontSize="10.5" fill="#EA580C">
            숨은 0!
          </text>

          <text x="120" y="208" textAnchor="middle" className="font-game" fontSize="11.5" fill="#065F46">
            2.4를 2.40으로 맞추면 실수 0%!
          </text>
        </svg>
      );
    }

    /* 10: 소수의 뺄셈과 받아내림 (1.5 - 0.8) */
    case 'decadd_sub_basic': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#EFF6FF')} />

          <text x="120" y="21" textAnchor="middle" className="font-game" fontSize="13.5" fill="#1D4ED8">
            1.5 - 0.8! 1 빌려오면 +10칸!!
          </text>

          <rect x="20" y="34" width="200" height="148" rx="3" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2.2" />

          <text x="100" y="56" textAnchor="middle" className="font-game" fontSize="13" fill="#2563EB">
            0
          </text>
          <text x="134" y="56" textAnchor="middle" className="font-game" fontSize="13" fill="#EA580C">
            15
          </text>

          <text x="100" y="84" textAnchor="middle" className="font-game" fontSize="24" fill={INK}>
            1
          </text>
          <line x1="92" y1="68" x2="108" y2="86" stroke="#EF4444" strokeWidth="2.2" />
          <text x="117" y="84" textAnchor="middle" className="font-game" fontSize="24" fill="#EF4444">
            .
          </text>
          <text x="134" y="84" textAnchor="middle" className="font-game" fontSize="24" fill={INK}>
            5
          </text>
          <line x1="126" y1="68" x2="142" y2="86" stroke="#EF4444" strokeWidth="2.2" />

          <text x="72" y="114" textAnchor="middle" className="font-game" fontSize="22" fill={INK}>
            -
          </text>
          <text x="117" y="114" textAnchor="middle" className="font-game" fontSize="24" fill={INK}>
            0<tspan fill="#EF4444">.</tspan>8
          </text>

          <line x1="58" y1="124" x2="172" y2="124" stroke={INK} strokeWidth="2.4" />

          <text x="117" y="156" textAnchor="middle" className="font-game" fontSize="26" fill="#059669">
            <tspan fill="#DC2626">0.</tspan>7!
          </text>

          <text x="120" y="208" textAnchor="middle" className="font-game" fontSize="11.5" fill="#1E3A8A">
            자연수 0이 남아도 꼭 0.7로 써야 해!
          </text>
        </svg>
      );
    }

    /* 11: 자릿수 다른 소수 뺄셈 (3.2 - 1.45) */
    case 'decadd_diff_places_sub': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#ECFDF5')} />

          <text x="120" y="21" textAnchor="middle" className="font-game" fontSize="13" fill="#047857">
            3.2 - 1.45! 뒤에 0 채우고 빌려오기!
          </text>

          <rect x="20" y="34" width="200" height="148" rx="3" fill="#FFFFFF" stroke="#059669" strokeWidth="2.2" />

          {/* Borrow marks: 2, 11, 10 */}
          <text x="92" y="56" textAnchor="middle" className="font-game" fontSize="13" fill="#2563EB">
            2
          </text>
          <text x="124" y="56" textAnchor="middle" className="font-game" fontSize="13" fill="#EA580C">
            11
          </text>
          <text x="148" y="56" textAnchor="middle" className="font-game" fontSize="13" fill="#DC2626">
            10
          </text>

          <text x="92" y="84" textAnchor="middle" className="font-game" fontSize="22" fill={INK}>
            3
          </text>
          <line x1="84" y1="68" x2="100" y2="84" stroke="#EF4444" strokeWidth="2" />
          <text x="108" y="84" textAnchor="middle" className="font-game" fontSize="22" fill="#EF4444">
            .
          </text>
          <text x="124" y="84" textAnchor="middle" className="font-game" fontSize="22" fill={INK}>
            2
          </text>
          <line x1="116" y1="68" x2="132" y2="84" stroke="#EF4444" strokeWidth="2" />
          <text x="148" y="84" textAnchor="middle" className="font-game" fontSize="22" fill="#2563EB">
            0
          </text>
          <rect x="139" y="65" width="18" height="22" rx="2" fill="none" stroke="#2563EB" strokeWidth="1.5" strokeDasharray="3 2" />

          <text x="64" y="114" textAnchor="middle" className="font-game" fontSize="20" fill={INK}>
            -
          </text>
          <text x="122" y="114" textAnchor="middle" className="font-game" fontSize="22" fill={INK}>
            1.45
          </text>

          <line x1="54" y1="124" x2="178" y2="124" stroke={INK} strokeWidth="2.4" />
          <text x="122" y="156" textAnchor="middle" className="font-game" fontSize="25" fill="#059669">
            1.75!
          </text>

          <text x="120" y="208" textAnchor="middle" className="font-game" fontSize="11.5" fill="#065F46">
            3.20으로 0을 써야 0-5 받아내림이 보여!
          </text>
        </svg>
      );
    }

    /* 12: 3.2 - 1.45에서 5를 그냥 내리면 땡!! */
    case 'decadd_drop_digit_trap': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#FEF2F2')} />

          <text x="120" y="21" textAnchor="middle" className="font-game" fontSize="13" fill="#DC2626">
            뺄셈에서 5를 그냥 내리면 대참사!!
          </text>

          {/* Wrong */}
          <rect x="12" y="34" width="102" height="126" rx="3" fill="#FFFFFF" stroke="#DC2626" strokeWidth="2.2" />
          <text x="63" y="53" textAnchor="middle" className="font-game" fontSize="11" fill="#DC2626">
            ❌ 5 그냥 내림!
          </text>
          <text x="68" y="82" textAnchor="middle" className="font-game" fontSize="19" fill={INK}>
            3.2
          </text>
          <text x="63" y="108" textAnchor="middle" className="font-game" fontSize="19" fill={INK}>
            - 1.45
          </text>
          <line x1="24" y1="116" x2="100" y2="116" stroke={INK} strokeWidth="2" />
          <text x="63" y="142" textAnchor="middle" className="font-game" fontSize="18" fill="#94A3B8">
            1.85
          </text>
          <line x1="28" y1="70" x2="96" y2="146" stroke="#EF4444" strokeWidth="2.8" />

          {/* Right */}
          <rect x="126" y="34" width="102" height="126" rx="3" fill="#FFFFFF" stroke="#059669" strokeWidth="2.4" />
          <text x="177" y="53" textAnchor="middle" className="font-game" fontSize="11" fill="#059669">
            ⭕ 0에서 5 빼기!
          </text>
          <text x="177" y="82" textAnchor="middle" className="font-game" fontSize="19" fill={INK}>
            3.2<tspan fill="#2563EB">0</tspan>
          </text>
          <text x="177" y="108" textAnchor="middle" className="font-game" fontSize="19" fill={INK}>
            - 1.45
          </text>
          <line x1="138" y1="116" x2="214" y2="116" stroke={INK} strokeWidth="2" />
          <text x="177" y="142" textAnchor="middle" className="font-game" fontSize="19" fill="#059669">
            1.75!
          </text>

          <Stickman x={34} y={178} scale={0.56} pose="panic" sweat armL={[-12, 12]} armR={[14, 2]} />
          <text x="140" y="205" textAnchor="middle" className="font-game" fontSize="11.5" fill="#991B1B">
            위 칸이 비어있으면 0 - 5! 꼭 빌려와!
          </text>
        </svg>
      );
    }

    /* 13: (자연수) - (소수) 필살기! (3 - 1.45) */
    case 'decadd_whole_minus_dec': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#FFFBEB')} />

          <text x="120" y="21" textAnchor="middle" className="font-game" fontSize="13.5" fill="#B45309">
            자연수 뒤엔 .00 이 숨어 있어!!
          </text>

          <rect x="20" y="34" width="200" height="148" rx="3" fill="#FFFFFF" stroke="#D97706" strokeWidth="2.4" />

          {/* Borrow 2, 9, 10 */}
          <text x="92" y="56" textAnchor="middle" className="font-game" fontSize="13" fill="#2563EB">
            2
          </text>
          <text x="124" y="56" textAnchor="middle" className="font-game" fontSize="13" fill="#EA580C">
            9
          </text>
          <text x="148" y="56" textAnchor="middle" className="font-game" fontSize="13" fill="#DC2626">
            10
          </text>

          <text x="92" y="84" textAnchor="middle" className="font-game" fontSize="22" fill={INK}>
            3
          </text>
          <line x1="84" y1="68" x2="100" y2="84" stroke="#EF4444" strokeWidth="2" />
          <text x="108" y="84" textAnchor="middle" className="font-game" fontSize="22" fill="#EF4444">
            .
          </text>
          <text x="136" y="84" textAnchor="middle" className="font-game" fontSize="22" fill="#2563EB">
            00
          </text>

          <text x="64" y="114" textAnchor="middle" className="font-game" fontSize="20" fill={INK}>
            -
          </text>
          <text x="122" y="114" textAnchor="middle" className="font-game" fontSize="22" fill={INK}>
            1.45
          </text>

          <line x1="54" y1="124" x2="178" y2="124" stroke={INK} strokeWidth="2.4" />
          <text x="122" y="156" textAnchor="middle" className="font-game" fontSize="25" fill="#059669">
            1.55!
          </text>

          <text x="120" y="208" textAnchor="middle" className="font-game" fontSize="11.5" fill="#92400E">
            3.00 만들고 → 2, 9, 10 받아내림하면 100점!
          </text>
        </svg>
      );
    }

    /* 14: 자연수 - 소수 함정! 소수 그대로 붙이지 마! */
    case 'decadd_whole_sub_trap': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#FEF2F2')} />

          <text x="120" y="21" textAnchor="middle" className="font-game" fontSize="13" fill="#DC2626">
            3 - 1.45 = 2.45 라고 쓰면 대참사!!
          </text>

          {/* Wrong */}
          <rect x="14" y="36" width="98" height="114" rx="3" fill="#FFFFFF" stroke="#DC2626" strokeWidth="2.2" />
          <text x="63" y="56" textAnchor="middle" className="font-game" fontSize="11.5" fill="#DC2626">
            ❌ 그대로 붙임
          </text>
          <text x="63" y="88" textAnchor="middle" className="font-game" fontSize="22" fill="#94A3B8">
            2.45
          </text>
          <line x1="28" y1="70" x2="96" y2="96" stroke="#EF4444" strokeWidth="2.8" />
          <text x="63" y="124" textAnchor="middle" className="font-body font-bold" fontSize="9.5" fill="#DC2626">
            1에서 0.45 안 뺐어!
          </text>

          {/* Right */}
          <rect x="126" y="36" width="100" height="114" rx="3" fill="#FFFFFF" stroke="#059669" strokeWidth="2.4" />
          <text x="176" y="56" textAnchor="middle" className="font-game" fontSize="11.5" fill="#059669">
            ⭕ 1.00 - 0.45
          </text>
          <text x="176" y="88" textAnchor="middle" className="font-game" fontSize="22" fill="#059669">
            1.55!
          </text>
          <text x="176" y="124" textAnchor="middle" className="font-game" fontSize="11" fill="#047857">
            3.00 - 1.45!
          </text>

          <Stickman x={34} y={172} scale={0.56} pose="panic" sweat armL={[-12, 12]} armR={[14, 2]} />
          <text x="140" y="204" textAnchor="middle" className="font-game" fontSize="11.5" fill="#991B1B">
            자연수는 3.00으로 변신시켜 꼭 빼야 해!
          </text>
        </svg>
      );
    }

    /* 15: 거꾸로 계산! □ 안에 알맞은 소수 구하기 */
    case 'decadd_missing_box_puzzle': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#F5F3FF')} />

          <text x="120" y="21" textAnchor="middle" className="font-game" fontSize="13.5" fill="#5B21B6">
            거꾸로 계산! □ 안의 소수 찾기!
          </text>

          {/* Case 1: □ + 1.35 = 4.1 */}
          <rect x="14" y="34" width="212" height="68" rx="3" fill="#FFFFFF" stroke="#7C3AED" strokeWidth="2.2" />
          <text x="120" y="57" textAnchor="middle" className="font-game" fontSize="15" fill={INK}>
            □ + 1.35 = 4.1
          </text>
          <text x="120" y="84" textAnchor="middle" className="font-game" fontSize="14.5" fill="#059669">
            → □ = 4.10 - 1.35 = 2.75!
          </text>

          {/* Case 2: 5 - □ = 2.64 */}
          <rect x="14" y="114" width="212" height="68" rx="3" fill="#FFFFFF" stroke="#EA580C" strokeWidth="2.2" />
          <text x="120" y="137" textAnchor="middle" className="font-game" fontSize="15" fill={INK}>
            5 - □ = 2.64
          </text>
          <text x="120" y="164" textAnchor="middle" className="font-game" fontSize="14.5" fill="#EA580C">
            → □ = 5.00 - 2.64 = 2.36!
          </text>

          <text x="120" y="208" textAnchor="middle" className="font-game" fontSize="11.5" fill="#5B21B6">
            □+A=B는 B-A! A-□=B는 A-B!
          </text>
        </svg>
      );
    }

    /* 16: 최종 보스! 소수의 덧셈과 뺄셈 3관문 */
    case 'decadd_boss': {
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
            소수의 덧·뺄셈 최종 보스 3관문!
          </text>

          {/* Gate 1 */}
          <rect x="14" y="34" width="212" height="44" rx="4" fill="#FFFFFF" stroke={isLightPrint ? INK : '#FACC15'} strokeWidth="2" />
          <text x="26" y="61" className="font-game" fontSize="11" fill="#2563EB">
            1관문
          </text>
          <text x="114" y="62" textAnchor="middle" className="font-game" fontSize="15" fill={INK}>
            2.4 + 1.37 =
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
            3 - 1.45 =
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
          <text x="98" y="164" textAnchor="middle" className="font-game" fontSize="15.5" fill={INK}>
            0.9
          </text>
          <circle cx="134" cy="158" r="11" fill="#FEF2F2" stroke="#DC2626" strokeWidth="1.8" strokeDasharray="3 2" />
          <text x="134" y="162" textAnchor="middle" className="font-game" fontSize="11" fill="#DC2626">
            ○
          </text>
          <text x="166" y="164" textAnchor="middle" className="font-game" fontSize="15.5" fill={INK}>
            0.12
          </text>
          <text x="200" y="162" textAnchor="middle" className="font-body font-bold" fontSize="9" fill="#DC2626">
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

    /* 17: 4-2 소수의 덧셈과 뺄셈 완주 축하 포카! */
    case 'decadd_praise':
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
            fontSize="14"
            fill={isBw ? INK : isLightPrint ? '#B45309' : '#FACC15'}
          >
            4-2 소수 덧·뺄셈 마스터!!
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
            4-2 ± → 5-2 × → 6-2 ÷ 소수 3종 완전 정복!
          </text>

          <text
            x="120"
            y="214"
            textAnchor="middle"
            className="font-game"
            fontSize="12"
            fill={isBw ? INK : isLightPrint ? '#4338CA' : '#A7F3D0'}
          >
            축하해! 넌 공식 초등 소수 사칙연산 챔피언!
          </text>
        </svg>
      );
    }
  }
};
