import React from 'react';
import { EpisodeSceneType, PrintInkMode } from '../types/card';

interface DivisionComicSceneProps {
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
    strokeWidth="2.3"
    strokeLinecap="round"
  />
);

type StickPose =
  | 'sunglasses'
  | 'happy'
  | 'headband'
  | 'hero'
  | 'panic'
  | 'dizzy'
  | 'crying'
  | 'thinking'
  | 'smug';

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
  const hasHeadband = pose === 'headband' || isHero;

  const resolvedArmL: [number, number] = armL ?? [-15, 22];
  const resolvedArmR: [number, number] = armR ?? [16, 10];
  const resolvedLegL: [number, number] = legL ?? [-9, 50];
  const resolvedLegR: [number, number] = legR ?? [9, 50];
  const shoeColor = isHero ? '#FACC15' : '#EF4444';

  return (
    <g transform={`translate(${x}, ${y}) rotate(${rotate}) scale(${scale})`}>
      {isHero && (
        <polygon
          points="-2,16 -24,34 -14,45 -1,31"
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
          d="M 15 -11 Q 18 -6 16 -2 Q 13 -3 15 -11 Z"
          fill="#38BDF8"
          stroke={INK}
          strokeWidth="1.2"
        />
      )}

      {pose === 'sunglasses' && (
        <g>
          <rect x="-10" y="-4" width="9" height="5.8" rx="1.2" fill={INK} />
          <rect x="1" y="-4" width="9" height="5.8" rx="1.2" fill={INK} />
          <line x1="-1" y1="-1" x2="1" y2="-1" stroke={INK} strokeWidth="2" />
          <path d="M -5 6 Q 0 10 6 5" fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" />
        </g>
      )}
      {pose === 'smug' && (
        <g>
          <rect x="-10" y="-4" width="9" height="5.5" rx="1.2" fill={INK} />
          <rect x="1" y="-4" width="9" height="5.5" rx="1.2" fill={INK} />
          <line x1="-1" y1="-1" x2="1" y2="-1" stroke={INK} strokeWidth="2" />
          <path d="M -4 6.5 Q 2 8 7 3.5" fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" />
        </g>
      )}
      {pose === 'happy' && (
        <g>
          <path d="M -7 -2 Q -4.5 -5.5 -2 -2" fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" />
          <path d="M 2 -2 Q 4.5 -5.5 7 -2" fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" />
          <path d="M -5 4.5 Q 0 10 5 4.5 Z" fill="#EF4444" stroke={INK} strokeWidth="1.5" />
        </g>
      )}
      {pose === 'panic' && (
        <g>
          <circle cx="-5" cy="-2" r="3" fill="#FFFFFF" stroke={INK} strokeWidth="1.7" />
          <circle cx="-5" cy="-2" r="1.1" fill={INK} />
          <circle cx="5" cy="-2" r="3" fill="#FFFFFF" stroke={INK} strokeWidth="1.7" />
          <circle cx="5" cy="-2" r="1.1" fill={INK} />
          <ellipse cx="0" cy="6.2" rx="3.4" ry="4.2" fill="#EF4444" stroke={INK} strokeWidth="1.5" />
        </g>
      )}
      {pose === 'crying' && (
        <g>
          <path d="M -7.5 -3 L -3.5 -0.5 L -7.5 2" fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" />
          <path d="M 7.5 -3 L 3.5 -0.5 L 7.5 2" fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" />
          <path d="M -7 2.5 L -11 10.5" stroke="#38BDF8" strokeWidth="2.6" strokeLinecap="round" />
          <path d="M 7 2.5 L 11 10.5" stroke="#38BDF8" strokeWidth="2.6" strokeLinecap="round" />
          <ellipse cx="0" cy="6.5" rx="3.2" ry="2.2" fill="#EF4444" />
        </g>
      )}
      {pose === 'thinking' && (
        <g>
          <line x1="-8" y1="-5.5" x2="-3" y2="-7" stroke={INK} strokeWidth="1.6" strokeLinecap="round" />
          <line x1="3" y1="-4.5" x2="8" y2="-3.5" stroke={INK} strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="-4.5" cy="-1.5" r="1.7" fill={INK} />
          <circle cx="4.5" cy="-1.5" r="1.7" fill={INK} />
          <path d="M -3 5.5 Q 1 4.5 4 6.5" fill="none" stroke={INK} strokeWidth="1.7" strokeLinecap="round" />
        </g>
      )}
      {pose === 'dizzy' && (
        <g>
          <line x1="-7" y1="-4" x2="-3" y2="0" stroke={INK} strokeWidth="1.8" strokeLinecap="round" />
          <line x1="-3" y1="-4" x2="-7" y2="0" stroke={INK} strokeWidth="1.8" strokeLinecap="round" />
          <line x1="3" y1="-4" x2="7" y2="0" stroke={INK} strokeWidth="1.8" strokeLinecap="round" />
          <line x1="7" y1="-4" x2="3" y2="0" stroke={INK} strokeWidth="1.8" strokeLinecap="round" />
          <path d="M -4 6 Q -2 4 0 6 Q 2 8 4 6" fill="none" stroke={INK} strokeWidth="1.8" strokeLinecap="round" />
        </g>
      )}
      {(pose === 'headband' || isHero) && (
        <g>
          <line x1="-8" y1="-2" x2="-2" y2="-0.5" stroke={INK} strokeWidth="2" strokeLinecap="round" />
          <line x1="8" y1="-2" x2="2" y2="-0.5" stroke={INK} strokeWidth="2" strokeLinecap="round" />
          <circle cx="-4.8" cy="1" r="1.7" fill={INK} />
          <circle cx="4.8" cy="1" r="1.7" fill={INK} />
          <path d="M -3.5 7 Q 0 4.5 3.5 7" fill="none" stroke={INK} strokeWidth="1.9" strokeLinecap="round" />
        </g>
      )}

      <line x1="0" y1={headR} x2="0" y2="34" stroke={strokeColor} strokeWidth="3.6" strokeLinecap="round" />
      <line x1="0" y1="20" x2={resolvedArmL[0]} y2={resolvedArmL[1]} stroke={strokeColor} strokeWidth="2.8" strokeLinecap="round" />
      <line x1="0" y1="20" x2={resolvedArmR[0]} y2={resolvedArmR[1]} stroke={strokeColor} strokeWidth="2.8" strokeLinecap="round" />
      <circle cx={resolvedArmL[0]} cy={resolvedArmL[1]} r="2.8" fill="#FFFFFF" stroke={INK} strokeWidth="1.5" />
      <circle cx={resolvedArmR[0]} cy={resolvedArmR[1]} r="2.8" fill="#FFFFFF" stroke={INK} strokeWidth="1.5" />

      <line x1="0" y1="34" x2={resolvedLegL[0]} y2={resolvedLegL[1]} stroke={strokeColor} strokeWidth="3" strokeLinecap="round" />
      <line x1="0" y1="34" x2={resolvedLegR[0]} y2={resolvedLegR[1]} stroke={strokeColor} strokeWidth="3" strokeLinecap="round" />
      <ellipse cx={resolvedLegL[0] - 2} cy={resolvedLegL[1] + 1.5} rx="4.8" ry="2.6" fill={shoeColor} stroke={INK} strokeWidth="1.3" />
      <ellipse cx={resolvedLegR[0] + 2} cy={resolvedLegR[1] + 1.5} rx="4.8" ry="2.6" fill={shoeColor} stroke={INK} strokeWidth="1.3" />
    </g>
  );
};

/* 감전 뼈다귀 졸라맨 */
const SkeletonJollaman: React.FC<{ x: number; y: number; scale?: number; strokeColor?: string }> = ({
  x,
  y,
  scale = 1,
  strokeColor = '#FFFFFF',
}) => (
  <g transform={`translate(${x}, ${y}) scale(${scale})`}>
    <path d="M -10 -14 L -6 -22 L 0 -15 L 6 -22 L 10 -14" fill="none" stroke={strokeColor} strokeWidth="2.2" />
    <circle cx="0" cy="0" r="13.5" fill="#FFFFFF" stroke={INK} strokeWidth="2.8" />
    <circle cx="-5" cy="-2" r="2.2" fill={INK} />
    <circle cx="5" cy="-2" r="2.2" fill={INK} />
    <line x1="0" y1="13.5" x2="0" y2="37" stroke={strokeColor} strokeWidth="3.8" strokeLinecap="round" />
    <line x1="-7" y1="21" x2="7" y2="21" stroke={strokeColor} strokeWidth="2.2" strokeLinecap="round" />
    <line x1="-6" y1="27" x2="6" y2="27" stroke={strokeColor} strokeWidth="2.2" strokeLinecap="round" />
    <line x1="-5" y1="33" x2="5" y2="33" stroke={strokeColor} strokeWidth="2.2" strokeLinecap="round" />
    <path d="M 0 18 L -17 10" stroke={strokeColor} strokeWidth="3.2" strokeLinecap="round" />
    <path d="M 0 18 L 17 10" stroke={strokeColor} strokeWidth="3.2" strokeLinecap="round" />
    <circle cx="-18" cy="10" r="3.2" fill="#FFFFFF" stroke={INK} strokeWidth="1.5" />
    <circle cx="18" cy="10" r="3.2" fill="#FFFFFF" stroke={INK} strokeWidth="1.5" />
    <line x1="0" y1="37" x2="-9" y2="52" stroke={strokeColor} strokeWidth="3.2" strokeLinecap="round" />
    <line x1="0" y1="37" x2="9" y2="52" stroke={strokeColor} strokeWidth="3.2" strokeLinecap="round" />
    <ellipse cx="-11" cy="54" rx="5.5" ry="3" fill="#EF4444" stroke={INK} strokeWidth="1.3" />
    <ellipse cx="11" cy="54" rx="5.5" ry="3" fill="#EF4444" stroke={INK} strokeWidth="1.3" />
  </g>
);

const Coin10: React.FC<{ x: number; y: number; r?: number; fill?: string }> = ({
  x,
  y,
  r = 9.5,
  fill = '#FDE047',
}) => (
  <g transform={`translate(${x}, ${y})`}>
    <circle cx="0" cy="0" r={r} fill={fill} stroke={INK} strokeWidth="1.8" />
    <text x="0" y="3.5" textAnchor="middle" className="font-mono-num font-bold" fontSize={r * 0.9} fill={INK}>
      10
    </text>
  </g>
);

const Coin1: React.FC<{ x: number; y: number; r?: number; fill?: string }> = ({
  x,
  y,
  r = 6.2,
  fill = '#FED7AA',
}) => (
  <g transform={`translate(${x}, ${y})`}>
    <circle cx="0" cy="0" r={r} fill={fill} stroke={INK} strokeWidth="1.4" />
    <text x="0" y="2.5" textAnchor="middle" className="font-mono-num font-bold" fontSize={r * 1.05} fill={INK}>
      1
    </text>
  </g>
);

export const DivisionComicScene: React.FC<DivisionComicSceneProps> = ({
  sceneType,
  inkMode = 'full',
}) => {
  const isLightPrint = inkMode !== 'full';
  const isBw = inkMode === 'bw_worksheet';
  const softBg = (hex: string) => (isLightPrint ? '#FFFFFF' : hex);
  const shadowInk = isLightPrint ? '#CBD5E1' : INK;

  switch (sceneType) {
    /* 00. 나눗셈 도감 설명서 */
    case 'division_guide': {
      const legend = [
        { color: '#2563EB', tag: '기본', rank: '★ N', desc: '몇십÷몇 · 내림없는 세로셈 (3장)' },
        { color: '#059669', tag: '필살', rank: '★★ R', desc: '10원 쪼개기 · 내림 합체 · 검산 (3장)' },
        { color: '#D97706', tag: '핵심', rank: '★★★ SR', desc: '나머지 뜻 · 나누어떨어진다 (2장)' },
        { color: '#EA580C', tag: '함정', rank: '★★★ SR', desc: '0함정 · 나머지<수 · 중간 0 (3장)' },
        { color: '#0F172A', tag: '보스·칭찬', rank: '★★★★ SSR', desc: '최종보스 3관문 · 완주 포카 (2장)' },
      ];
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#F8FAFC')} />

          <Stickman
            x={30}
            y={28}
            scale={0.7}
            pose="headband"
            armL={[-14, 14]}
            armR={[16, 8]}
            legL={[-8, 42]}
            legR={[8, 42]}
          />

          <text x="136" y="24" textAnchor="middle" className="font-game" fontSize="13.5" fill={INK}>
            졸라나눗셈맨 포카 도감!
          </text>
          <text x="136" y="40" textAnchor="middle" className="font-game" fontSize="9.6" fill="#2563EB">
            오늘도 동전 쪼개며 구르는 나눗셈맨!
          </text>

          <rect x="12" y="54" width="218" height="29" rx="2" fill={shadowInk} />
          <rect x="10" y="52" width="218" height="29" rx="2" fill={isLightPrint ? '#FFFFFF' : '#FEF08A'} stroke={INK} strokeWidth="2.2" />
          <text x="119" y="70.5" textAnchor="middle" className="font-game" fontSize="9.2" fill={INK}>
            순서: 몇십÷몇 → 세로셈·합체 → 나머지·검산
          </text>

          <rect x="12" y="93" width="218" height="128" rx="2" fill={shadowInk} />
          <rect x="10" y="91" width="218" height="128" rx="2" fill="#FFFFFF" stroke={INK} strokeWidth="2.4" />
          <text x="20" y="109" className="font-game" fontSize="10.2" fill={INK}>
            역할 &amp; 희귀도 피라미드 (표지 1 + 13장)
          </text>
          {legend.map((row, idx) => {
            const ry = 128 + idx * 19.5;
            return (
              <g key={row.tag}>
                <rect x="16" y={ry - 7.5} width="8.5" height="8.5" rx="1" fill={row.color} stroke={INK} strokeWidth="1.2" />
                <text x="28" y={ry} className="font-game" fontSize="8.2" fill={row.color}>
                  {row.tag}
                </text>
                <text x="77" y={ry} className="font-mono-num font-bold" fontSize="7" fill={INK}>
                  {row.rank}
                </text>
                <text x="121" y={ry} className="font-body font-bold" fontSize="7.4" fill="#475569">
                  {row.desc}
                </text>
              </g>
            );
          })}
        </svg>
      );
    }

    /* 01. (몇십)÷(몇) 딱 떨어져! 60 ÷ 3 = 20 */
    case 'division_tens_exact': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#EFF6FF')} />
          <line x1="0" y1="196" x2="240" y2="196" stroke={INK} strokeWidth="2.4" />

          {/* Clean floating headline */}
          <text x="120" y="24" textAnchor="middle" className="font-game" fontSize="13.5" fill="#1D4ED8">
            10원 동전 6개를 3명이 나누면?
          </text>

          {/* Big equation with curved arrow swooping the 0 over */}
          <text x="58" y="68" textAnchor="middle" className="font-game" fontSize="24" fill={INK}>
            <tspan fill="#2563EB">6</tspan>
            <tspan fill="#DC2626">0</tspan> ÷ 3 ={' '}
          </text>
          <text x="150" y="68" textAnchor="middle" className="font-game" fontSize="28" fill="#059669">
            2
          </text>
          <text x="172" y="68" textAnchor="middle" className="font-game" fontSize="28" fill="#DC2626">
            0
          </text>

          {/* Red arch arrow carrying 0 to the end */}
          <path d="M 39 46 Q 105 23 170 43" fill="none" stroke="#DC2626" strokeWidth="2.3" strokeLinecap="round" />
          <path d="M 164 38 L 172 44 L 164 47" fill="none" stroke="#DC2626" strokeWidth="2.3" strokeLinecap="round" />
          <text x="106" y="34" textAnchor="middle" className="font-game" fontSize="9.8" fill="#DC2626">
            0 하나 떼고 다시 쏙!
          </text>

          {/* 3 Stickmen catching 2x 10-won coins each in the air (no boxes!) */}
          {[0, 1, 2].map((i) => {
            const sx = 46 + i * 74;
            return (
              <g key={i}>
                <Coin10 x={sx - 11} y={102} r={9.5} fill={isLightPrint ? '#FFFFFF' : '#FDE047'} />
                <Coin10 x={sx + 11} y={102} r={9.5} fill={isLightPrint ? '#FFFFFF' : '#FDE047'} />
                <Stickman
                  x={sx}
                  y={142}
                  scale={0.76}
                  pose={i === 1 ? 'sunglasses' : 'happy'}
                  armL={[-13, 1]}
                  armR={[13, 1]}
                  legL={[-8, 46]}
                  legR={[8, 46]}
                />
                <text x={sx} y={127} textAnchor="middle" className="font-game" fontSize="9.5" fill="#1D4ED8">
                  20원!
                </text>
              </g>
            );
          })}

          <text x="120" y="216" textAnchor="middle" className="font-game" fontSize="11.8" fill="#1E40AF">
            6 ÷ 3 = 2  →  60 ÷ 3 = 20원씩!
          </text>
        </svg>
      );
    }

    /* 02. 남은 10원은 1원 10개로 쪼개! 50 ÷ 2 = 25 */
    case 'division_tens_split': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#ECFDF5')} />
          <line x1="0" y1="194" x2="240" y2="194" stroke={INK} strokeWidth="2.4" />

          <text x="120" y="22" textAnchor="middle" className="font-game" fontSize="13.5" fill="#047857">
            50 ÷ 2! 남은 10원 쪼개기 변신!
          </text>

          {/* Left: 40 split + 1 leftover 10-won coin getting karate-chopped */}
          <Coin10 x={26} y={54} r={8.5} fill={isLightPrint ? '#FFFFFF' : '#FDE047'} />
          <Coin10 x={46} y={54} r={8.5} fill={isLightPrint ? '#FFFFFF' : '#FDE047'} />
          <Coin10 x={26} y={76} r={8.5} fill={isLightPrint ? '#FFFFFF' : '#FDE047'} />
          <Coin10 x={46} y={76} r={8.5} fill={isLightPrint ? '#FFFFFF' : '#FDE047'} />
          <text x="36" y="99" textAnchor="middle" className="font-game" fontSize="9.5" fill="#047857">
            20원씩!
          </text>

          {/* Hero Jollaman karate-chopping the leftover 10-won coin */}
          <Stickman
            x={38}
            y={132}
            scale={0.78}
            pose="hero"
            armL={[-14, 14]}
            armR={[24, 6]}
            legL={[-10, 44]}
            legR={[10, 44]}
          />
          <text x="72" y="114" textAnchor="middle" className="font-game" fontSize="11.5" fill="#DC2626">
            이얍!!
          </text>
          {/* Cracked 10-won coin */}
          <g transform="translate(86, 134)">
            <circle cx="0" cy="0" r="14" fill={isLightPrint ? '#FFFFFF' : '#FCA5A5'} stroke="#DC2626" strokeWidth="2.2" />
            <text x="0" y="4.5" textAnchor="middle" className="font-mono-num font-bold" fontSize="11" fill={INK}>
              10
            </text>
            <path d="M -3 -14 L 2 -4 L -4 3 L 2 14" fill="none" stroke="#DC2626" strokeWidth="2.2" />
          </g>

          {/* Red curved arrow bursting into 10 x 1-won coins */}
          <path d="M 103 128 Q 124 106 146 116" fill="none" stroke="#EA580C" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M 140 112 L 148 117 L 139 120" fill="none" stroke="#EA580C" strokeWidth="2.4" strokeLinecap="round" />

          {/* 10 x 1-won coins split into 5 + 5 */}
          <text x="184" y="99" textAnchor="middle" className="font-game" fontSize="10" fill="#EA580C">
            1원 10개로 변신!
          </text>
          {[0, 1, 2, 3, 4].map((i) => (
            <Coin1 key={`t-${i}`} x={152 + i * 16} y={118} r={6.5} fill={isLightPrint ? '#FFFFFF' : '#FED7AA'} />
          ))}
          {[0, 1, 2, 3, 4].map((i) => (
            <Coin1 key={`b-${i}`} x={152 + i * 16} y={136} r={6.5} fill={isLightPrint ? '#FFFFFF' : '#FED7AA'} />
          ))}
          <text x="184" y="156" textAnchor="middle" className="font-game" fontSize="10.5" fill="#059669">
            5원씩 더!
          </text>

          {/* Clean result card at top-right */}
          <rect x="131" y="38" width="96" height="40" rx="2" fill={shadowInk} />
          <rect x="128" y="35" width="96" height="40" rx="2" fill="#FFFFFF" stroke={INK} strokeWidth="2.2" />
          <text x="176" y="61" textAnchor="middle" className="font-game" fontSize="15.5" fill={INK}>
            <tspan fill="#059669">20</tspan> + <tspan fill="#EA580C">5</tspan> = <tspan fill="#DC2626">25!</tspan>
          </text>

          <text x="120" y="214" textAnchor="middle" className="font-game" fontSize="11.5" fill="#065F46">
            남은 10원 1개 → 1원 10개로 쪼개서 나누자!
          </text>
        </svg>
      );
    }

    /* 03. 내림 없는 세로셈 (48 ÷ 2 = 24) — 7÷2 세로식 스타일 색깔 화살표! */
    case 'division_2by1_exact': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#EFF6FF')} />

          <text x="58" y="23" textAnchor="middle" className="font-game" fontSize="12.5" fill="#1D4ED8">
            48 ÷ 2 세로식!
          </text>
          <text x="174" y="23" textAnchor="middle" className="font-game" fontSize="11" fill="#2563EB">
            무조건 큰 자리부터!
          </text>

          {/* Single crisp vertical division board */}
          <rect x="15" y="37" width="98" height="148" rx="4" fill={shadowInk} />
          <rect x="12" y="34" width="98" height="148" rx="4" fill="#FFFFFF" stroke={INK} strokeWidth="2.4" />

          {/* Quotient */}
          <circle cx="66" cy="54" r="11" fill="#DBEAFE" stroke="#2563EB" strokeWidth="2" />
          <text x="66" y="60" textAnchor="middle" className="font-game" fontSize="17" fill="#2563EB">
            2
          </text>
          <circle cx="90" cy="54" r="11" fill="#FFEDD5" stroke="#EA580C" strokeWidth="2" />
          <text x="90" y="60" textAnchor="middle" className="font-game" fontSize="17" fill="#EA580C">
            4
          </text>

          <path d="M 46 71 Q 47 89 40 99" fill="none" stroke={INK} strokeWidth="2.4" strokeLinecap="round" />
          <line x1="46" y1="71" x2="102" y2="71" stroke={INK} strokeWidth="2.4" strokeLinecap="round" />
          <text x="29" y="95" textAnchor="middle" className="font-game" fontSize="18" fill={INK}>
            2
          </text>
          <text x="66" y="95" textAnchor="middle" className="font-game" fontSize="18" fill="#2563EB">
            4
          </text>
          <text x="90" y="95" textAnchor="middle" className="font-game" fontSize="18" fill="#EA580C">
            8
          </text>

          <text x="66" y="117" textAnchor="middle" className="font-mono-num font-bold" fontSize="16" fill="#2563EB">
            4
          </text>
          <line x1="46" y1="123" x2="102" y2="123" stroke={INK} strokeWidth="1.8" />
          <path d="M 90 101 L 90 128" stroke="#EA580C" strokeWidth="2" strokeDasharray="2.5 2" />
          <text x="90" y="143" textAnchor="middle" className="font-mono-num font-bold" fontSize="16" fill="#EA580C">
            8
          </text>
          <text x="90" y="160" textAnchor="middle" className="font-mono-num font-bold" fontSize="16" fill="#EA580C">
            8
          </text>
          <line x1="46" y1="165" x2="102" y2="165" stroke={INK} strokeWidth="1.8" />
          <text x="90" y="179" textAnchor="middle" className="font-mono-num font-bold" fontSize="14" fill="#059669">
            0
          </text>

          {/* Blue curved arrow: Step 1 tens */}
          <path d="M 76 47 Q 124 30 148 54" fill="none" stroke="#2563EB" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M 142 53 L 150 56 L 147 47" fill="none" stroke="#2563EB" strokeWidth="2.4" strokeLinecap="round" />
          <text x="176" y="68" textAnchor="middle" className="font-game" fontSize="12" fill="#2563EB">
            ① 십: 4 ÷ 2 = 2
          </text>

          {/* Orange curved arrow: Step 2 ones */}
          <path d="M 102 138 Q 134 128 152 106" fill="none" stroke="#EA580C" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M 145 107 L 154 104 L 152 113" fill="none" stroke="#EA580C" strokeWidth="2.4" strokeLinecap="round" />
          <text x="178" y="102" textAnchor="middle" className="font-game" fontSize="12" fill="#EA580C">
            ② 일: 8 내려 ÷ 2 = 4
          </text>

          {/* Sunglasses Jollaman pointing to answer */}
          <Stickman
            x={152}
            y={142}
            scale={0.72}
            pose="sunglasses"
            armL={[-15, 10]}
            armR={[18, 2]}
            legL={[-8, 42]}
            legR={[8, 42]}
          />
          <text x="200" y="152" textAnchor="middle" className="font-game" fontSize="16" fill="#059669">
            몫 = 24!
          </text>

          <text x="120" y="213" textAnchor="middle" className="font-game" fontSize="11.5" fill="#1E40AF">
            십의 자리 먼저, 일의 자리 내려서 차례로!
          </text>
        </svg>
      );
    }

    /* 04. 내림 합체! 52 ÷ 2 = 26 */
    case 'division_2by1_regroup': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#ECFDF5')} />

          <text x="120" y="22" textAnchor="middle" className="font-game" fontSize="13" fill="#047857">
            남은 <tspan fill="#DC2626">1</tspan>과 <tspan fill="#EA580C">2</tspan>가 만나 <tspan fill="#059669">12로 합체!!</tspan>
          </text>

          {/* Left vertical board */}
          <rect x="15" y="37" width="98" height="148" rx="4" fill={shadowInk} />
          <rect x="12" y="34" width="98" height="148" rx="4" fill="#FFFFFF" stroke={INK} strokeWidth="2.4" />

          <text x="66" y="57" textAnchor="middle" className="font-game" fontSize="17" fill="#059669">
            2
          </text>
          <text x="90" y="57" textAnchor="middle" className="font-game" fontSize="17" fill="#EA580C">
            6
          </text>
          <path d="M 46 66 Q 47 84 40 94" fill="none" stroke={INK} strokeWidth="2.4" strokeLinecap="round" />
          <line x1="46" y1="66" x2="102" y2="66" stroke={INK} strokeWidth="2.4" strokeLinecap="round" />
          <text x="29" y="88" textAnchor="middle" className="font-game" fontSize="18" fill={INK}>
            2
          </text>
          <text x="66" y="88" textAnchor="middle" className="font-game" fontSize="18" fill={INK}>
            5
          </text>
          <text x="90" y="88" textAnchor="middle" className="font-game" fontSize="18" fill="#EA580C">
            2
          </text>
          <text x="66" y="109" textAnchor="middle" className="font-mono-num font-bold" fontSize="15" fill="#2563EB">
            4
          </text>
          <line x1="46" y1="114" x2="102" y2="114" stroke={INK} strokeWidth="1.6" />

          {/* Highlighted 12 */}
          <rect x="53" y="119" width="49" height="22" rx="3" fill="#FEF08A" stroke="#DC2626" strokeWidth="1.8" />
          <text x="66" y="135" textAnchor="middle" className="font-mono-num font-bold" fontSize="16" fill="#DC2626">
            1
          </text>
          <text x="90" y="135" textAnchor="middle" className="font-mono-num font-bold" fontSize="16" fill="#EA580C">
            2
          </text>
          <path d="M 90 93 L 90 118" stroke="#EA580C" strokeWidth="2" strokeDasharray="2 2" />
          <text x="78" y="157" textAnchor="middle" className="font-mono-num font-bold" fontSize="15" fill="#059669">
            1 2
          </text>
          <line x1="46" y1="162" x2="102" y2="162" stroke={INK} strokeWidth="1.6" />
          <text x="90" y="177" textAnchor="middle" className="font-mono-num font-bold" fontSize="14" fill={INK}>
            0
          </text>

          {/* Red curved arrow flying from 12 to Comic Fusion */}
          <path d="M 105 130 Q 130 120 144 92" fill="none" stroke="#DC2626" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M 138 94 L 145 89 L 146 98" fill="none" stroke="#DC2626" strokeWidth="2.4" strokeLinecap="round" />

          {/* Comic Fusion: 1 + 2 -> BOOM 12! */}
          <circle cx="152" cy="64" r="13" fill="#FEE2E2" stroke="#DC2626" strokeWidth="2" />
          <text x="152" y="70" textAnchor="middle" className="font-game" fontSize="15" fill="#DC2626">
            1
          </text>
          <text x="176" y="69" textAnchor="middle" className="font-game" fontSize="14" fill={INK}>
            +
          </text>
          <circle cx="200" cy="64" r="13" fill="#FFEDD5" stroke="#EA580C" strokeWidth="2" />
          <text x="200" y="70" textAnchor="middle" className="font-game" fontSize="15" fill="#EA580C">
            2
          </text>
          <text x="176" y="96" textAnchor="middle" className="font-game" fontSize="13.5" fill="#059669">
            ⚡ 12 합체!
          </text>
          <text x="176" y="115" textAnchor="middle" className="font-game" fontSize="12.5" fill={INK}>
            12 ÷ 2 = <tspan fill="#EA580C">6!</tspan>
          </text>

          <HeroSparkAndStickman x={156} y={145} />
          <text x="202" y="160" textAnchor="middle" className="font-game" fontSize="17" fill="#059669">
            26!
          </text>

          <text x="120" y="213" textAnchor="middle" className="font-game" fontSize="11.5" fill="#065F46">
            십의 자리에서 남은 1이 내려와 12로 변신!
          </text>
        </svg>
      );
    }

    /* 05. 세로셈 줄맞춤 & 0 함정! 60 ÷ 3 = 20 */
    case 'division_vertical_trap': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#FFF7ED')} />

          <text x="120" y="24" textAnchor="middle" className="font-game" fontSize="14" fill="#DC2626">
            60원 ÷ 3명 = 2원?! 엉터리야!!
          </text>

          {/* Left: WRONG (missing 0 -> crying stickman) */}
          <g transform="translate(26, 46)">
            <text x="34" y="14" textAnchor="middle" className="font-game" fontSize="18" fill="#DC2626">
              2
            </text>
            <text x="53" y="14" textAnchor="middle" className="font-game" fontSize="13" fill="#94A3B8">
              ?
            </text>
            <path d="M 16 40 Q 20 29 18 19 L 64 19" fill="none" stroke={INK} strokeWidth="2.2" />
            <text x="6" y="38" className="font-game" fontSize="16" fill={INK}>
              3
            </text>
            <text x="34" y="38" textAnchor="middle" className="font-game" fontSize="16" fill={INK}>
              6
            </text>
            <text x="53" y="38" textAnchor="middle" className="font-game" fontSize="16" fill={INK}>
              0
            </text>
            <text x="34" y="58" textAnchor="middle" className="font-mono-num font-bold" fontSize="14" fill="#64748B">
              6
            </text>
            <line x1="20" y1="63" x2="62" y2="63" stroke={INK} strokeWidth="1.6" />
            {/* Big red X */}
            <line x1="16" y1="2" x2="64" y2="54" stroke="#EF4444" strokeWidth="3.6" strokeLinecap="round" />
            <line x1="64" y1="2" x2="16" y2="54" stroke="#EF4444" strokeWidth="3.6" strokeLinecap="round" />
          </g>

          <Stickman
            x={46}
            y={142}
            scale={0.78}
            pose="crying"
            armL={[-15, 8]}
            armR={[14, 14]}
            legL={[-9, 44]}
            legR={[9, 44]}
          />
          <text x="80" y="160" textAnchor="middle" className="font-game" fontSize="10.5" fill="#DC2626">
            “2원은 너무해ㅠ”
          </text>

          <line x1="121" y1="36" x2="121" y2="192" stroke="#FED7AA" strokeWidth="2.2" strokeDasharray="4 3" />

          {/* Right: RIGHT (aligned 20!) */}
          <g transform="translate(142, 46)">
            <rect x="44" y="-2" width="20" height="22" rx="3" fill="#FEF08A" stroke="#DC2626" strokeWidth="2" />
            <text x="34" y="14" textAnchor="middle" className="font-game" fontSize="18" fill="#059669">
              2
            </text>
            <text x="54" y="14" textAnchor="middle" className="font-game" fontSize="18" fill="#DC2626">
              0
            </text>
            <path d="M 16 40 Q 20 29 18 19 L 66 19" fill="none" stroke={INK} strokeWidth="2.2" />
            <text x="6" y="38" className="font-game" fontSize="16" fill={INK}>
              3
            </text>
            <text x="34" y="38" textAnchor="middle" className="font-game" fontSize="16" fill={INK}>
              6
            </text>
            <text x="54" y="38" textAnchor="middle" className="font-game" fontSize="16" fill={INK}>
              0
            </text>
            <text x="34" y="58" textAnchor="middle" className="font-mono-num font-bold" fontSize="14" fill="#64748B">
              6
            </text>
            <line x1="20" y1="63" x2="64" y2="63" stroke={INK} strokeWidth="1.6" />
            <text x="54" y="79" textAnchor="middle" className="font-mono-num font-bold" fontSize="14" fill="#059669">
              0
            </text>
          </g>

          {/* Arrow emphasizing the 0 */}
          <path d="M 218 82 Q 228 60 209 54" fill="none" stroke="#DC2626" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M 214 50 L 207 54 L 214 58" fill="none" stroke="#DC2626" strokeWidth="2.2" strokeLinecap="round" />

          <Stickman
            x={178}
            y={146}
            scale={0.76}
            pose="smug"
            armL={[-15, 16]}
            armR={[16, 4]}
            legL={[-8, 44]}
            legR={[8, 44]}
          />
          <text x="210" y="156" textAnchor="middle" className="font-game" fontSize="11.5" fill="#059669">
            20원!
          </text>

          <text x="120" y="214" textAnchor="middle" className="font-game" fontSize="11.5" fill="#9A3412">
            십은 십 위에, 일의 자리 0도 꼭 써야 해!
          </text>
        </svg>
      );
    }

    /* 06. 남으면 그건 바로 나머지! 47 ÷ 3 = 15 ... 2 */
    case 'division_remainder_basic': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#FFFBEB')} />
          <line x1="0" y1="194" x2="240" y2="194" stroke={INK} strokeWidth="2.4" />

          <text x="120" y="22" textAnchor="middle" className="font-game" fontSize="14" fill={INK}>
            47 ÷ 3 = <tspan fill="#2563EB">15</tspan> … <tspan fill="#DC2626">2</tspan>
          </text>

          {/* Left clean vertical division */}
          <rect x="15" y="36" width="90" height="148" rx="4" fill={shadowInk} />
          <rect x="12" y="33" width="90" height="148" rx="4" fill="#FFFFFF" stroke={INK} strokeWidth="2.4" />
          <text x="64" y="54" textAnchor="middle" className="font-game" fontSize="16" fill="#2563EB">
            1
          </text>
          <text x="84" y="54" textAnchor="middle" className="font-game" fontSize="16" fill="#2563EB">
            5
          </text>
          <path d="M 46 62 Q 48 79 41 88" fill="none" stroke={INK} strokeWidth="2.2" />
          <line x1="46" y1="62" x2="96" y2="62" stroke={INK} strokeWidth="2.2" />
          <text x="31" y="83" textAnchor="middle" className="font-game" fontSize="16" fill={INK}>
            3
          </text>
          <text x="64" y="83" textAnchor="middle" className="font-game" fontSize="16" fill={INK}>
            4
          </text>
          <text x="84" y="83" textAnchor="middle" className="font-game" fontSize="16" fill={INK}>
            7
          </text>
          <text x="64" y="102" textAnchor="middle" className="font-mono-num font-bold" fontSize="14" fill="#475569">
            3
          </text>
          <line x1="48" y1="107" x2="95" y2="107" stroke={INK} strokeWidth="1.5" />
          <text x="74" y="124" textAnchor="middle" className="font-mono-num font-bold" fontSize="14" fill={INK}>
            1 7
          </text>
          <text x="74" y="142" textAnchor="middle" className="font-mono-num font-bold" fontSize="14" fill="#475569">
            1 5
          </text>
          <line x1="48" y1="147" x2="95" y2="147" stroke={INK} strokeWidth="1.5" />
          <circle cx="84" cy="164" r="11.5" fill="#FEE2E2" stroke="#DC2626" strokeWidth="2" />
          <text x="84" y="169" textAnchor="middle" className="font-game" fontSize="16" fill="#DC2626">
            2
          </text>

          {/* Red curved arrow sweeping out from remainder 2 */}
          <path d="M 96 164 Q 124 164 138 142" fill="none" stroke="#DC2626" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M 132 143 L 140 140 L 139 149" fill="none" stroke="#DC2626" strokeWidth="2.4" strokeLinecap="round" />

          {/* Right: 3 mini stickmen holding 15 each + 2 lonely candies */}
          {[0, 1, 2].map((i) => {
            const cx = 132 + i * 38;
            return (
              <g key={i}>
                <text x={cx} y={54} textAnchor="middle" className="font-game" fontSize="11.5" fill="#2563EB">
                  15개
                </text>
                <Stickman
                  x={cx}
                  y={74}
                  scale={0.56}
                  pose="happy"
                  armL={[-13, 8]}
                  armR={[13, 8]}
                  legL={[-8, 42]}
                  legR={[8, 42]}
                />
              </g>
            );
          })}

          {/* 2 leftover candies rolling with sad eyes */}
          <g transform="translate(156, 138)">
            <circle cx="0" cy="0" r="10.5" fill="#FCA5A5" stroke={INK} strokeWidth="1.8" />
            <circle cx="-3" cy="-2" r="1.4" fill={INK} />
            <circle cx="3" cy="-2" r="1.4" fill={INK} />
            <path d="M -3 4 Q 0 1 3 4" fill="none" stroke={INK} strokeWidth="1.4" />
          </g>
          <g transform="translate(184, 138)">
            <circle cx="0" cy="0" r="10.5" fill="#FCA5A5" stroke={INK} strokeWidth="1.8" />
            <circle cx="-3" cy="-2" r="1.4" fill={INK} />
            <circle cx="3" cy="-2" r="1.4" fill={INK} />
            <path d="M -3 4 Q 0 1 3 4" fill="none" stroke={INK} strokeWidth="1.4" />
          </g>
          <text x="172" y="168" textAnchor="middle" className="font-game" fontSize="13.5" fill="#DC2626">
            짜투리 2 = 나머지!
          </text>

          <text x="120" y="214" textAnchor="middle" className="font-game" fontSize="11.5" fill="#92400E">
            더 이상 못 나눠 남는 수 = 나머지 (… 뒤에 표기!)
          </text>
        </svg>
      );
    }

    /* 07. 나머지 < 나누는 수 철칙! (감전 뼈다귀 스타일!) */
    case 'division_remainder_rule_trap': {
      const skelStroke = isLightPrint ? INK : '#FFFFFF';
      const yellowText = isBw ? INK : isLightPrint ? '#B45309' : '#FEF08A';
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={isLightPrint ? '#FFFFFF' : '#1E293B'} />
          <rect x="0" y="188" width="240" height="42" fill={isLightPrint ? '#F8FAFC' : '#334155'} />
          <line x1="0" y1="188" x2="240" y2="188" stroke={isLightPrint ? INK : '#94A3B8'} strokeWidth="2" />

          <text x="120" y="22" textAnchor="middle" className="font-game" fontSize="12.5" fill={yellowText}>
            “23 ÷ 4 = 4 … 7 이라구?!”
          </text>

          {/* Giant 7 zapping Jollaman */}
          <g transform="translate(52, 74)">
            <text x="0" y="0" textAnchor="middle" className="font-game" fontSize="48" fill={isLightPrint ? '#E2E8F0' : '#64748B'} stroke="#EF4444" strokeWidth="1.5">
              7
            </text>
            <line x1="-18" y1="-34" x2="18" y2="4" stroke="#EF4444" strokeWidth="4" strokeLinecap="round" />
            <line x1="18" y1="-34" x2="-18" y2="4" stroke="#EF4444" strokeWidth="4" strokeLinecap="round" />
            <text x="0" y="20" textAnchor="middle" className="font-game" fontSize="10" fill="#FCA5A5">
              4보다 크잖아!!
            </text>
          </g>

          <path d="M 52 98 L 42 112 L 54 114 L 44 126" fill="none" stroke={isBw ? INK : '#FACC15'} strokeWidth="3" strokeLinecap="round" />
          <text x="86" y="118" textAnchor="middle" className="font-game" fontSize="12.5" fill={isBw ? INK : '#FACC15'}>
            찌릿!! 퍽!
          </text>

          <SkeletonJollaman x={46} y={142} scale={0.86} strokeColor={skelStroke} />

          {/* Sharp white answer card on right */}
          <rect x="131" y="54" width="96" height="114" rx="2" fill={isLightPrint ? '#E2E8F0' : '#FACC15'} />
          <rect x="128" y="51" width="96" height="114" rx="2" fill="#FFFFFF" stroke={INK} strokeWidth="2.6" />
          <text x="176" y="72" textAnchor="middle" className="font-game" fontSize="11.5" fill="#059669">
            한 번 더 나눠!
          </text>
          <text x="176" y="102" textAnchor="middle" className="font-game" fontSize="16.5" fill={INK}>
            23 ÷ 4
          </text>
          <text x="176" y="128" textAnchor="middle" className="font-game" fontSize="18.5" fill="#2563EB">
            = 5 … <tspan fill="#DC2626">3</tspan>
          </text>
          <text x="176" y="152" textAnchor="middle" className="font-game" fontSize="11.5" fill="#059669">
            3 &lt; 4 합격!
          </text>

          <text x="120" y="213" textAnchor="middle" className="font-game" fontSize="12" fill={yellowText}>
            “으악! 나머지는 나누는 수보다 작아야지!!”
          </text>
        </svg>
      );
    }

    /* 08. 나머지 0 = 나누어떨어진다! 24 ÷ 4 = 6 */
    case 'division_exact_zero': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#FFFBEB')} />
          <line x1="0" y1="192" x2="240" y2="192" stroke={INK} strokeWidth="2.4" />

          <text x="120" y="24" textAnchor="middle" className="font-game" fontSize="14.5" fill={INK}>
            24 ÷ 4 = 6  (나머지 <tspan fill="#059669">0!</tspan>)
          </text>

          {/* 4 floating groups of 6 */}
          {[0, 1, 2, 3].map((i) => (
            <g key={i} transform={`translate(${36 + i * 56}, 54)`}>
              <circle cx="0" cy="0" r="19" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2" />
              <text x="0" y="5" textAnchor="middle" className="font-game" fontSize="14" fill="#2563EB">
                6개
              </text>
            </g>
          ))}

          {/* Happy Jollaman holding sparkling clean empty plate showing 0! */}
          <Stickman
            x={64}
            y={132}
            scale={0.84}
            pose="happy"
            armL={[-16, 4]}
            armR={[22, 6]}
            legL={[-9, 44]}
            legR={[9, 44]}
          />

          {/* Sparkling clean empty plate */}
          <ellipse cx="146" cy="134" rx="44" ry="18" fill="#FFFFFF" stroke={INK} strokeWidth="2.4" />
          <ellipse cx="146" cy="134" rx="31" ry="11" fill="none" stroke="#CBD5E1" strokeWidth="1.6" />
          <text x="146" y="139" textAnchor="middle" className="font-game" fontSize="17" fill="#059669">
            0!
          </text>
          {/* Sparkles around plate */}
          <path d="M 108 106 L 110 111 L 115 113 L 110 115 L 108 120 L 106 115 L 101 113 L 106 111 Z" fill="#FACC15" />
          <path d="M 188 104 L 190 109 L 195 111 L 190 113 L 188 118 L 186 113 L 181 111 L 186 109 Z" fill="#FACC15" />
          <text x="150" y="102" textAnchor="middle" className="font-game" fontSize="11.5" fill="#059669">
            남은 게 하나도 없어!
          </text>

          <text x="150" y="176" textAnchor="middle" className="font-game" fontSize="15.5" fill="#047857">
            “나누어떨어진다!”
          </text>

          <text x="120" y="214" textAnchor="middle" className="font-game" fontSize="11.5" fill="#92400E">
            나머지가 0으로 남는 게 없으면 ‘나누어떨어진다’!
          </text>
        </svg>
      );
    }

    /* 09. (세 자리)÷(한 자리) 486 ÷ 2 = 243 — 3층 계단 내려오는 졸라맨! */
    case 'division_3by1_basic': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#EFF6FF')} />

          <text x="120" y="22" textAnchor="middle" className="font-game" fontSize="13.5" fill="#1D4ED8">
            백 → 십 → 일! 3층 계단 내려오기!
          </text>

          {/* Left vertical division */}
          <rect x="13" y="36" width="104" height="154" rx="4" fill={shadowInk} />
          <rect x="10" y="33" width="104" height="154" rx="4" fill="#FFFFFF" stroke={INK} strokeWidth="2.4" />
          <text x="54" y="54" textAnchor="middle" className="font-game" fontSize="15" fill="#2563EB">
            2
          </text>
          <text x="74" y="54" textAnchor="middle" className="font-game" fontSize="15" fill="#059669">
            4
          </text>
          <text x="94" y="54" textAnchor="middle" className="font-game" fontSize="15" fill="#EA580C">
            3
          </text>
          <path d="M 38 61 Q 40 76 34 84" fill="none" stroke={INK} strokeWidth="2.2" />
          <line x1="38" y1="61" x2="106" y2="61" stroke={INK} strokeWidth="2.2" />
          <text x="24" y="80" textAnchor="middle" className="font-game" fontSize="15" fill={INK}>
            2
          </text>
          <text x="54" y="80" textAnchor="middle" className="font-game" fontSize="15" fill="#2563EB">
            4
          </text>
          <text x="74" y="80" textAnchor="middle" className="font-game" fontSize="15" fill="#059669">
            8
          </text>
          <text x="94" y="80" textAnchor="middle" className="font-game" fontSize="15" fill="#EA580C">
            6
          </text>
          <text x="54" y="99" textAnchor="middle" className="font-mono-num font-bold" fontSize="13.5" fill="#2563EB">
            4
          </text>
          <line x1="40" y1="104" x2="104" y2="104" stroke={INK} strokeWidth="1.4" />
          <text x="74" y="121" textAnchor="middle" className="font-mono-num font-bold" fontSize="13.5" fill="#059669">
            8
          </text>
          <text x="74" y="137" textAnchor="middle" className="font-mono-num font-bold" fontSize="13.5" fill="#059669">
            8
          </text>
          <line x1="40" y1="142" x2="104" y2="142" stroke={INK} strokeWidth="1.4" />
          <text x="94" y="159" textAnchor="middle" className="font-mono-num font-bold" fontSize="13.5" fill="#EA580C">
            6
          </text>
          <text x="94" y="174" textAnchor="middle" className="font-mono-num font-bold" fontSize="13.5" fill="#EA580C">
            6
          </text>
          <line x1="40" y1="178" x2="104" y2="178" stroke={INK} strokeWidth="1.4" />

          {/* Right: Real staircase drawn cleanly (not 3 boxes!) + Jollaman hopping down */}
          <path
            d="M 124 72 L 164 72 L 164 116 L 198 116 L 198 160 L 232 160"
            fill="none"
            stroke={INK}
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <text x="142" y="65" textAnchor="middle" className="font-game" fontSize="10.5" fill="#2563EB">
            4÷2=2
          </text>
          <text x="180" y="109" textAnchor="middle" className="font-game" fontSize="10.5" fill="#059669">
            8÷2=4
          </text>
          <text x="214" y="153" textAnchor="middle" className="font-game" fontSize="10.5" fill="#EA580C">
            6÷2=3
          </text>

          {/* Hopping Jollaman on staircase */}
          <Stickman
            x={196}
            y={74}
            scale={0.62}
            pose="sunglasses"
            armL={[-16, 4]}
            armR={[16, 4]}
            legL={[-10, 42]}
            legR={[10, 42]}
          />
          <path d="M 150 48 Q 168 35 184 54" fill="none" stroke="#059669" strokeWidth="2.2" strokeDasharray="3 2" />
          <path d="M 186 100 Q 208 90 218 134" fill="none" stroke="#EA580C" strokeWidth="2.2" strokeDasharray="3 2" />

          <text x="120" y="214" textAnchor="middle" className="font-game" fontSize="11.8" fill="#1E40AF">
            세 자리도 똑같아! 한 층씩 내려오면 243!
          </text>
        </svg>
      );
    }

    /* 10. 몫이 두 자리 & 중간 0 함정! 612÷3=204 & 246÷3=82 */
    case 'division_3by1_zero_trap': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#FFF7ED')} />

          <text x="120" y="23" textAnchor="middle" className="font-game" fontSize="13.5" fill="#DC2626">
            중간 0 빼먹으면 구멍에 풍덩!!
          </text>

          {/* Left: Missing 0 pitfall where Jollaman falls head-first into a pit */}
          <g transform="translate(18, 44)">
            <text x="34" y="14" textAnchor="middle" className="font-game" fontSize="16" fill={INK}>
              2
            </text>
            {/* Black pit where 0 should be */}
            <ellipse cx="52" cy="11" rx="8" ry="5" fill={INK} />
            <text x="70" y="14" textAnchor="middle" className="font-game" fontSize="16" fill={INK}>
              4
            </text>
            <path d="M 18 39 Q 22 29 20 19 L 82 19" fill="none" stroke={INK} strokeWidth="2.2" />
            <text x="8" y="36" className="font-game" fontSize="15" fill={INK}>
              3
            </text>
            <text x="34" y="36" textAnchor="middle" className="font-game" fontSize="15" fill={INK}>
              6
            </text>
            <text x="52" y="36" textAnchor="middle" className="font-game" fontSize="15" fill="#DC2626">
              1
            </text>
            <text x="70" y="36" textAnchor="middle" className="font-game" fontSize="15" fill={INK}>
              2
            </text>
            <text x="34" y="54" textAnchor="middle" className="font-mono-num font-bold" fontSize="13" fill="#64748B">
              6
            </text>
            <line x1="22" y1="59" x2="78" y2="59" stroke={INK} strokeWidth="1.4" />
            <text x="61" y="73" textAnchor="middle" className="font-mono-num font-bold" fontSize="13" fill="#DC2626">
              12
            </text>
          </g>

          {/* Panicked Jollaman falling upside-down! */}
          <Stickman
            x={54}
            y={156}
            scale={0.68}
            rotate={155}
            pose="panic"
            sweat
            armL={[-16, 4]}
            armR={[16, 4]}
            legL={[-10, 40]}
            legR={[10, 40]}
          />
          <text x="62" y="182" textAnchor="middle" className="font-game" fontSize="10.5" fill="#DC2626">
            “으악 24가 됐어!!”
          </text>

          {/* Red rescue arrow bridging left to right */}
          <path d="M 96 68 Q 118 44 148 56" fill="none" stroke="#059669" strokeWidth="2.6" strokeLinecap="round" />
          <path d="M 142 51 L 150 57 L 141 60" fill="none" stroke="#059669" strokeWidth="2.6" strokeLinecap="round" />

          {/* Right: Rescued 204! */}
          <g transform="translate(142, 44)">
            <text x="32" y="14" textAnchor="middle" className="font-game" fontSize="18" fill="#059669">
              2
            </text>
            <circle cx="52" cy="8" r="11" fill="#FEF08A" stroke="#DC2626" strokeWidth="2.2" />
            <text x="52" y="14" textAnchor="middle" className="font-game" fontSize="18" fill="#DC2626">
              0
            </text>
            <text x="72" y="14" textAnchor="middle" className="font-game" fontSize="18" fill="#059669">
              4
            </text>
            <path d="M 16 39 Q 20 29 18 19 L 84 19" fill="none" stroke={INK} strokeWidth="2.2" />
            <text x="6" y="36" className="font-game" fontSize="15" fill={INK}>
              3
            </text>
            <text x="32" y="36" textAnchor="middle" className="font-game" fontSize="15" fill={INK}>
              6
            </text>
            <text x="52" y="36" textAnchor="middle" className="font-game" fontSize="15" fill="#DC2626">
              1
            </text>
            <text x="72" y="36" textAnchor="middle" className="font-game" fontSize="15" fill={INK}>
              2
            </text>
          </g>
          <text x="180" y="114" textAnchor="middle" className="font-game" fontSize="10.5" fill="#059669">
            1÷3 못 나눠? 0 쓰고 2 내려!
          </text>
          <text x="180" y="146" textAnchor="middle" className="font-body font-bold" fontSize="9.2" fill="#2563EB">
            ※ 246÷3처럼 맨 앞이
          </text>
          <text x="180" y="160" textAnchor="middle" className="font-body font-bold" fontSize="9.2" fill="#2563EB">
            작으면 82 (앞 0 생략!)
          </text>

          <text x="120" y="214" textAnchor="middle" className="font-game" fontSize="11.5" fill="#9A3412">
            맨 앞 0은 빼고, 중간·끝 0은 무조건 사수!
          </text>
        </svg>
      );
    }

    /* 11. 역돌리기 검산 치트키! 19 ÷ 4 = 4 ... 3 -> 4 × 4 + 3 = 19 */
    case 'division_check_verify': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#ECFDF5')} />

          <text x="120" y="23" textAnchor="middle" className="font-game" fontSize="13.5" fill="#047857">
            시간 역돌리기 검산 치트키!
          </text>

          {/* Big colored circles equation */}
          <circle cx="48" cy="78" r="17" fill="#EDE9FE" stroke="#7C3AED" strokeWidth="2.4" />
          <text x="48" y="85" textAnchor="middle" className="font-game" fontSize="20" fill="#7C3AED">
            19
          </text>
          <text x="76" y="84" textAnchor="middle" className="font-game" fontSize="18" fill={INK}>
            ÷
          </text>

          <circle cx="102" cy="78" r="15" fill="#DBEAFE" stroke="#2563EB" strokeWidth="2.4" />
          <text x="102" y="85" textAnchor="middle" className="font-game" fontSize="20" fill="#2563EB">
            4
          </text>
          <text x="126" y="84" textAnchor="middle" className="font-game" fontSize="18" fill={INK}>
            =
          </text>

          <circle cx="150" cy="78" r="15" fill="#DCFCE7" stroke="#059669" strokeWidth="2.4" />
          <text x="150" y="85" textAnchor="middle" className="font-game" fontSize="20" fill="#059669">
            4
          </text>
          <text x="176" y="84" textAnchor="middle" className="font-game" fontSize="18" fill={INK}>
            …
          </text>

          <circle cx="202" cy="78" r="15" fill="#FEE2E2" stroke="#DC2626" strokeWidth="2.4" />
          <text x="202" y="85" textAnchor="middle" className="font-game" fontSize="20" fill="#DC2626">
            3
          </text>

          {/* Blue bottom arc: 4 × 4 = 16 */}
          <path d="M 102 95 Q 126 128 150 95" fill="none" stroke="#2563EB" strokeWidth="2.6" strokeLinecap="round" />
          <path d="M 143 97 L 151 94 L 150 103" fill="none" stroke="#2563EB" strokeWidth="2.4" strokeLinecap="round" />
          <text x="126" y="129" textAnchor="middle" className="font-game" fontSize="11.5" fill="#2563EB">
            ① × 곱하기 (16)
          </text>

          {/* Red top arc: + 3 */}
          <path d="M 154 61 Q 178 34 202 61" fill="none" stroke="#DC2626" strokeWidth="2.6" strokeLinecap="round" />
          <path d="M 195 59 L 203 62 L 202 53" fill="none" stroke="#DC2626" strokeWidth="2.4" strokeLinecap="round" />
          <text x="178" y="42" textAnchor="middle" className="font-game" fontSize="11.5" fill="#DC2626">
            ② + 나머지!
          </text>

          {/* Green sweeping check arc back to 19 */}
          <path d="M 202 95 Q 202 158 118 158 Q 48 158 48 99" fill="none" stroke="#059669" strokeWidth="2.6" strokeLinecap="round" />
          <path d="M 43 105 L 48 97 L 53 105" fill="none" stroke="#059669" strokeWidth="2.6" strokeLinecap="round" />
          <text x="136" y="176" textAnchor="middle" className="font-game" fontSize="12.5" fill="#059669">
            ③ 4 × 4 + 3 = 19 딱 맞아!!
          </text>

          <Stickman
            x={36}
            y={146}
            scale={0.68}
            pose="hero"
            armL={[-14, 12]}
            armR={[18, 2]}
            legL={[-8, 42]}
            legR={[8, 42]}
          />

          <text x="120" y="214" textAnchor="middle" className="font-game" fontSize="11.2" fill="#065F46">
            (나누는 수 × 몫) + 나머지 = 처음 수면 100점!
          </text>
        </svg>
      );
    }

    /* 12. 최종 보스! 나눗셈 3관문 (다크&골드 보스 스테이지!) */
    case 'division_boss': {
      const bossStroke = isLightPrint ? INK : '#FFFFFF';
      const bossTextColor = isBw ? INK : isLightPrint ? '#B45309' : '#FDE047';
      const bossShadow = isLightPrint ? '#CBD5E1' : '#FACC15';
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={isLightPrint ? '#FFFFFF' : '#0F172A'} />
          <polygon points="0,0 50,0 120,120 0,90" fill={isLightPrint ? '#F8FAFC' : '#1E293B'} opacity="0.65" />
          <polygon points="240,0 190,0 120,120 240,90" fill={isLightPrint ? '#F8FAFC' : '#1E293B'} opacity="0.65" />
          <path d="M 16 18 L 26 30 L 18 32 L 28 45" fill="none" stroke={isBw ? INK : isLightPrint ? '#D97706' : '#FACC15'} strokeWidth="2.4" strokeLinecap="round" />
          <path d="M 224 18 L 214 30 L 222 32 L 212 45" fill="none" stroke={isBw ? INK : isLightPrint ? '#D97706' : '#FACC15'} strokeWidth="2.4" strokeLinecap="round" />

          <text x="120" y="24" textAnchor="middle" className="font-game" fontSize="13.5" fill={bossTextColor}>
            최종 보스! 나눗셈 3관문
          </text>

          {/* 3 Gold-shadowed Boss Challenge Podiums (answers stay in easyTipText!) */}
          <g transform="translate(46, 68)">
            <rect x="-31" y="-23" width="66" height="52" rx="2" fill={bossShadow} />
            <rect x="-34" y="-26" width="66" height="52" rx="2" fill="#FFFFFF" stroke={INK} strokeWidth="2.4" />
            <text x="-1" y="-8" textAnchor="middle" className="font-game" fontSize="9.5" fill="#DC2626">
              1관문
            </text>
            <text x="-1" y="12" textAnchor="middle" className="font-game" fontSize="12" fill={INK}>
              612 ÷ 3
            </text>
          </g>

          <g transform="translate(120, 68)">
            <rect x="-31" y="-23" width="66" height="52" rx="2" fill={bossShadow} />
            <rect x="-34" y="-26" width="66" height="52" rx="2" fill="#FFFFFF" stroke={INK} strokeWidth="2.4" />
            <text x="-1" y="-8" textAnchor="middle" className="font-game" fontSize="9.5" fill="#DC2626">
              2관문
            </text>
            <text x="-1" y="11" textAnchor="middle" className="font-game" fontSize="10.2" fill={INK}>
              □÷5=14…3
            </text>
          </g>

          <g transform="translate(194, 68)">
            <rect x="-31" y="-23" width="66" height="52" rx="2" fill={bossShadow} />
            <rect x="-34" y="-26" width="66" height="52" rx="2" fill="#FFFFFF" stroke={INK} strokeWidth="2.4" />
            <text x="-1" y="-8" textAnchor="middle" className="font-game" fontSize="9.5" fill="#DC2626">
              3관문
            </text>
            <text x="-1" y="11" textAnchor="middle" className="font-game" fontSize="9.8" fill={INK}>
              나머지5 최소△
            </text>
          </g>

          <Stickman
            x={38}
            y={132}
            scale={0.78}
            pose="hero"
            strokeColor={bossStroke}
            armL={[-15, 16]}
            armR={[20, 6]}
            legL={[-9, 44]}
            legR={[9, 44]}
          />

          <text x="148" y="122" textAnchor="middle" className="font-game" fontSize="11.2" fill={bossTextColor}>
            “중간 0 · 검산 · 나머지&lt;수!”
          </text>

          {/* 3 Blank answer boxes */}
          <rect x="69" y="135" width="160" height="52" rx="2" fill={bossShadow} />
          <rect x="66" y="132" width="160" height="52" rx="2" fill="#FFFFFF" stroke={INK} strokeWidth="2.4" />
          {[0, 1, 2].map((idx) => (
            <g key={idx} transform={`translate(${94 + idx * 52}, 158)`}>
              <rect x="-18" y="-12" width="36" height="24" rx="2" fill="#FFF7ED" stroke="#EA580C" strokeWidth="2" strokeDasharray="3 2" />
              <text x="0" y="5" textAnchor="middle" className="font-game" fontSize="13" fill="#DC2626">
                ?
              </text>
            </g>
          ))}

          <text x="120" y="214" textAnchor="middle" className="font-game" fontSize="11.8" fill={bossTextColor}>
            빈칸 3개 정답을 머릿속으로 외쳐 보자!
          </text>
        </svg>
      );
    }

    /* 14. 나눗셈 완주 칭찬 포카 */
    case 'division_praise':
    default: {
      const goldAccent = isBw ? INK : isLightPrint ? '#B45309' : '#FACC15';
      const goldText = isBw ? INK : isLightPrint ? '#B45309' : '#FDE047';
      const rayFill = isLightPrint ? '#F8FAFC' : '#332C14';
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={isLightPrint ? '#FFFFFF' : '#0F172A'} />

          <g opacity={isLightPrint ? '0.6' : '0.45'}>
            <polygon points="120,96 0,0 38,0" fill={rayFill} />
            <polygon points="120,96 76,0 112,0" fill={rayFill} />
            <polygon points="120,96 142,0 176,0" fill={rayFill} />
            <polygon points="120,96 208,0 240,0 240,34" fill={rayFill} />
            <polygon points="120,96 240,70 240,115" fill={rayFill} />
            <polygon points="120,96 0,68 0,112" fill={rayFill} />
          </g>

          <path d="M 8 20 L 8 8 L 20 8" fill="none" stroke={goldAccent} strokeWidth="2.4" />
          <path d="M 220 8 L 232 8 L 232 20" fill="none" stroke={goldAccent} strokeWidth="2.4" />
          <path d="M 8 210 L 8 222 L 20 222" fill="none" stroke={goldAccent} strokeWidth="2.4" />
          <path d="M 220 222 L 232 222 L 232 210" fill="none" stroke={goldAccent} strokeWidth="2.4" />

          <polygon
            points="103,28 106,14 114,22 120,12 126,22 134,14 137,28"
            fill={goldAccent}
            stroke={isLightPrint ? INK : '#FACC15'}
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          <text x="120" y="46" textAnchor="middle" className="font-game" fontSize="14.5" fill={goldText}>
            3학년 2학기 2단원 완주!!
          </text>

          {/* Left: Champion Hero Jollaman */}
          <g transform="translate(64, 90)">
            <path d="M -16 24 Q 0 14 16 24 L 22 36 L -22 36 Z" fill="#EF4444" stroke={INK} strokeWidth="1.8" />
            <circle cx="0" cy="0" r="17" fill="#FFFFFF" stroke={goldAccent} strokeWidth="3.2" />
            <LoopHair x={0} y={-17} color={goldAccent} />
            <rect x="-11" y="-5" width="9.5" height="5.5" rx="1.5" fill={INK} />
            <rect x="1.5" y="-5" width="9.5" height="5.5" rx="1.5" fill={INK} />
            <line x1="-1.5" y1="-2.2" x2="1.5" y2="-2.2" stroke={INK} strokeWidth="1.6" />
            <path d="M -5 6 Q 0 11 5 6" fill="none" stroke={INK} strokeWidth="2.2" strokeLinecap="round" />
            <path d="M 14 21 L 26 8" stroke={goldAccent} strokeWidth="3.4" strokeLinecap="round" />
            <circle cx="27" cy="7" r="3.6" fill="#FFFFFF" stroke={goldAccent} strokeWidth="1.8" />
          </g>

          {/* Right: Golden SSR Trophy */}
          <g transform="translate(174, 88)">
            <path d="M -18 -14 C -30 -14, -30 4, -15 4" fill="none" stroke={goldAccent} strokeWidth="3" strokeLinecap="round" />
            <path d="M 18 -14 C 30 -14, 30 4, 15 4" fill="none" stroke={goldAccent} strokeWidth="3" strokeLinecap="round" />
            <path
              d="M -20 -18 L 20 -18 L 15 8 C 12 16, -12 16, -15 8 Z"
              fill={isLightPrint ? '#FEF08A' : '#FACC15'}
              stroke={INK}
              strokeWidth="2.2"
              strokeLinejoin="round"
            />
            <text x="0" y="-2" textAnchor="middle" className="font-game" fontSize="11.5" fill={INK}>
              SSR!
            </text>
            <rect x="-4" y="13" width="8" height="10" fill={goldAccent} stroke={INK} strokeWidth="1.6" />
            <rect x="-14" y="23" width="28" height="8" rx="1.5" fill={goldAccent} stroke={INK} strokeWidth="1.8" />
          </g>

          <rect x="23" y="121" width="198" height="68" rx="4" fill={isLightPrint ? '#CBD5E1' : '#000000'} />
          <rect x="20" y="118" width="198" height="68" rx="4" fill="#FFFFFF" stroke={INK} strokeWidth="2.4" />
          <text x="119" y="138" textAnchor="middle" className="font-game" fontSize="12.5" fill="#1D4ED8">
            멋진 도전자, 나눗셈 올 클리어!
          </text>
          <text x="119" y="156" textAnchor="middle" className="font-body font-bold" fontSize="10" fill="#334155">
            내림 세로셈 · 나머지 · 중간 0 · 검산 정복!
          </text>
          <text x="119" y="174" textAnchor="middle" className="font-game" fontSize="10.2" fill="#DC2626">
            ★ 졸라수학맨 공식 마스터 인증 ★
          </text>

          <text x="120" y="211" textAnchor="middle" className="font-game" fontSize="13.5" fill={goldText}>
            전설의 나눗셈 챔피언 등극!!
          </text>
        </svg>
      );
    }
  }
};

const HeroSparkAndStickman: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g>
    <path
      d={`M ${x - 20} ${y - 16} L ${x - 18} ${y - 11} L ${x - 13} ${y - 9} L ${x - 18} ${y - 7} L ${x - 20} ${y - 2} L ${x - 22} ${y - 7} L ${x - 27} ${y - 9} L ${x - 22} ${y - 11} Z`}
      fill="#FACC15"
    />
    <Stickman
      x={x}
      y={y}
      scale={0.72}
      pose="hero"
      armL={[-15, 10]}
      armR={[18, 2]}
      legL={[-8, 42]}
      legR={[8, 42]}
    />
  </g>
);
