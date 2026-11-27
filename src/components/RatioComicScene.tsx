import React from 'react';
import { EpisodeSceneType, PrintInkMode } from '../types/card';

interface RatioComicSceneProps {
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
  | 'smug'
  | 'happy'
  | 'headband'
  | 'hero'
  | 'panic'
  | 'dizzy'
  | 'crying'
  | 'thinking';

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

      <circle cx="0" cy="0" r={headR} fill="#FFFFFF" stroke={strokeColor} strokeWidth="2.8" />
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

/* 세로 막대 분수 */
const SvgFraction: React.FC<{
  x: number;
  y: number;
  num: string | number;
  den: string | number;
  numColor?: string;
  denColor?: string;
  fontSize?: number;
  barWidth?: number;
}> = ({
  x,
  y,
  num,
  den,
  numColor = '#EA580C',
  denColor = '#1D4ED8',
  fontSize = 14,
  barWidth = 19,
}) => (
  <g transform={`translate(${x}, ${y})`}>
    <text x="0" y="-4" textAnchor="middle" className="font-game" fontSize={fontSize} fill={numColor}>
      {num}
    </text>
    <line x1={-barWidth / 2} y1="0" x2={barWidth / 2} y2="0" stroke={INK} strokeWidth="2.2" strokeLinecap="round" />
    <text x="0" y={fontSize + 1} textAnchor="middle" className="font-game" fontSize={fontSize} fill={denColor}>
      {den}
    </text>
  </g>
);

export const RatioComicScene: React.FC<RatioComicSceneProps> = ({
  sceneType,
  inkMode = 'full',
}) => {
  const isLightPrint = inkMode !== 'full';
  const isBw = inkMode === 'bw_worksheet';
  const softBg = (hex: string) => (isLightPrint ? '#FFFFFF' : hex);
  const shadowInk = isLightPrint ? '#CBD5E1' : INK;

  switch (sceneType) {
    /* 00. 비례식과 비례배분 도감 설명서 */
    case 'ratio_guide': {
      const legend = [
        { color: '#2563EB', tag: '기본', rank: '★ N', desc: '비의 성질 (같은 수 ×, ÷) (2장)' },
        { color: '#059669', tag: '필살', rank: '★★ R', desc: '소수·분수 비 · □구하기 · 공식 (4장)' },
        { color: '#D97706', tag: '핵심', rank: '★★★ SR', desc: '비례식 용어 · 외항=내항 · 배분뜻 (3장)' },
        { color: '#EA580C', tag: '함정/도전', rank: '★★★ SR', desc: '×0금지 · 순서 · 분모합 · 둘레÷2 (4장)' },
        { color: '#0F172A', tag: '보스·칭찬', rank: '★★★★ SSR', desc: '최종보스 3관문 · 완주 포카 (2장)' },
      ];
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#F8FAFC')} />

          <Stickman
            x={30}
            y={28}
            scale={0.7}
            pose="sunglasses"
            armL={[-14, 14]}
            armR={[16, 8]}
            legL={[-8, 42]}
            legR={[8, 42]}
          />

          <text x="136" y="24" textAnchor="middle" className="font-game" fontSize="13.2" fill={INK}>
            졸라비례식맨 포카 도감!
          </text>
          <text x="136" y="40" textAnchor="middle" className="font-game" fontSize="9.6" fill="#D97706">
            외항=내항 줄타기 하는 비례맨 모으기!
          </text>

          <rect x="12" y="54" width="218" height="29" rx="2" fill={shadowInk} />
          <rect x="10" y="52" width="218" height="29" rx="2" fill={isLightPrint ? '#FFFFFF' : '#FEF08A'} stroke={INK} strokeWidth="2.2" />
          <text x="119" y="70.5" textAnchor="middle" className="font-game" fontSize="9.2" fill={INK}>
            순서: 비의 성질 → 비례식 · □ → 비례배분
          </text>

          <rect x="12" y="93" width="218" height="128" rx="2" fill={shadowInk} />
          <rect x="10" y="91" width="218" height="128" rx="2" fill="#FFFFFF" stroke={INK} strokeWidth="2.4" />
          <text x="20" y="109" className="font-game" fontSize="10.2" fill={INK}>
            역할 &amp; 희귀도 피라미드 (표지 1 + 15장)
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

    /* 01. 비의 성질 ① 같은 수 곱하기! 2 : 3 = 8 : 12 */
    case 'ratio_prop_mul': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#EFF6FF')} />
          <line x1="0" y1="194" x2="240" y2="194" stroke={INK} strokeWidth="2.4" />

          <text x="120" y="23" textAnchor="middle" className="font-game" fontSize="13.5" fill="#1D4ED8">
            양만 4배! 맛(비율)은 똑같아!
          </text>

          {/* Big equation in center with top/bottom ×4 curved arcs */}
          <text x="48" y="88" textAnchor="middle" className="font-game" fontSize="22" fill="#2563EB">
            2
          </text>
          <text x="64" y="87" textAnchor="middle" className="font-game" fontSize="18" fill={INK}>
            :
          </text>
          <text x="80" y="88" textAnchor="middle" className="font-game" fontSize="22" fill="#EA580C">
            3
          </text>

          <text x="115" y="88" textAnchor="middle" className="font-game" fontSize="20" fill={INK}>
            =
          </text>

          <text x="148" y="88" textAnchor="middle" className="font-game" fontSize="22" fill="#2563EB">
            8
          </text>
          <text x="166" y="87" textAnchor="middle" className="font-game" fontSize="18" fill={INK}>
            :
          </text>
          <text x="188" y="88" textAnchor="middle" className="font-game" fontSize="22" fill="#EA580C">
            12
          </text>

          {/* Top Blue Arc: 2 -> 8 (×4) */}
          <path d="M 48 64 Q 98 34 148 64" fill="none" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 142 63 L 150 65 L 147 56" fill="none" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" />
          <text x="98" y="45" textAnchor="middle" className="font-game" fontSize="12" fill="#2563EB">
            × 4
          </text>

          {/* Bottom Orange Arc: 3 -> 12 (×4) */}
          <path d="M 80 96 Q 134 126 188 96" fill="none" stroke="#EA580C" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 181 95 L 189 95 L 186 103" fill="none" stroke="#EA580C" strokeWidth="2.5" strokeLinecap="round" />
          <text x="134" y="124" textAnchor="middle" className="font-game" fontSize="12" fill="#EA580C">
            × 4
          </text>

          {/* Left: small cup + happy stickman with straw */}
          <g transform="translate(46, 152)">
            <rect x="0" y="6" width="26" height="32" rx="2" fill="#FFFFFF" stroke={INK} strokeWidth="2" />
            <rect x="2" y="20" width="22" height="16" fill={isLightPrint ? '#CBD5E1' : '#FB923C'} />
            <line x1="12" y1="-4" x2="12" y2="26" stroke="#EF4444" strokeWidth="2" />
          </g>
          <Stickman
            x={26}
            y={144}
            scale={0.62}
            pose="sunglasses"
            armL={[-12, 12]}
            armR={[18, 8]}
            legL={[-8, 42]}
            legR={[8, 42]}
          />

          {/* Right: Giant pitcher with happy Jollaman cheering! */}
          <g transform="translate(154, 134)">
            <rect x="0" y="6" width="54" height="50" rx="4" fill="#FFFFFF" stroke={INK} strokeWidth="2.2" />
            <rect x="2" y="24" width="50" height="30" fill={isLightPrint ? '#CBD5E1' : '#FB923C'} />
            <path d="M 54 16 C 64 16, 64 38, 54 38" fill="none" stroke={INK} strokeWidth="2.4" />
            <text x="27" y="42" textAnchor="middle" className="font-game" fontSize="10.5" fill="#FFFFFF">
              달달함 같음!
            </text>
          </g>
          <Stickman
            x={130}
            y={146}
            scale={0.64}
            pose="happy"
            armL={[-14, 4]}
            armR={[16, 4]}
            legL={[-8, 42]}
            legR={[8, 42]}
          />

          <text x="120" y="214" textAnchor="middle" className="font-game" fontSize="11.2" fill="#1E40AF">
            전항·후항에 0 아닌 같은 수 곱해도 비율 그대로!
          </text>
        </svg>
      );
    }

    /* 02. 비의 성질 ② 같은 수 나누기! 12 : 18 -> 2 : 3 */
    case 'ratio_prop_div': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#EFF6FF')} />
          <line x1="0" y1="194" x2="240" y2="194" stroke={INK} strokeWidth="2.4" />

          <text x="120" y="23" textAnchor="middle" className="font-game" fontSize="13.5" fill="#1D4ED8">
            뚱뚱한 비 다이어트! ÷6 컷!
          </text>

          {/* Left: Sweating heavy 12 : 18 */}
          <text x="58" y="84" textAnchor="middle" className="font-game" fontSize="24" fill="#475569">
            12 : 18
          </text>
          <text x="58" y="102" textAnchor="middle" className="font-game" fontSize="9.5" fill="#DC2626">
            헥헥 무거워ㅠ
          </text>

          {/* Hero stickman slicing with ÷6 sword/arc */}
          <Stickman
            x={64}
            y={144}
            scale={0.74}
            pose="hero"
            armL={[-15, 10]}
            armR={[22, -4]}
            legL={[-9, 44]}
            legR={[9, 44]}
          />

          {/* Green curved ÷6 slash arrow */}
          <path d="M 94 64 Q 128 38 162 64" fill="none" stroke="#059669" strokeWidth="2.8" strokeLinecap="round" />
          <path d="M 155 62 L 164 65 L 160 56" fill="none" stroke="#059669" strokeWidth="2.6" strokeLinecap="round" />
          <text x="128" y="45" textAnchor="middle" className="font-game" fontSize="13" fill="#059669">
            ÷ 6 (최대공약수)
          </text>

          {/* Right: Slim cool 2 : 3 + smug stickman */}
          <text x="184" y="92" textAnchor="middle" className="font-game" fontSize="30" fill="#059669">
            2 : 3
          </text>
          <Stickman
            x={184}
            y={144}
            scale={0.74}
            pose="sunglasses"
            armL={[-15, 12]}
            armR={[16, 4]}
            legL={[-8, 44]}
            legR={[8, 44]}
          />
          <text x="184" y="114" textAnchor="middle" className="font-game" fontSize="10.2" fill="#047857">
            더 못 나눔! 1등!
          </text>

          <text x="120" y="214" textAnchor="middle" className="font-game" fontSize="11.2" fill="#1E40AF">
            전항·후항을 같은 수로 나눠 가장 작은 자연수의 비!
          </text>
        </svg>
      );
    }

    /* 03. ×0 블랙홀 & 덧셈(+) 금지 함정! (감전 뼈다귀!) */
    case 'ratio_prop_zero_trap': {
      const skelStroke = isLightPrint ? INK : '#FFFFFF';
      const yellowText = isBw ? INK : isLightPrint ? '#B45309' : '#FEF08A';
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={isLightPrint ? '#FFFFFF' : '#1E293B'} />
          <rect x="0" y="188" width="240" height="42" fill={isLightPrint ? '#F8FAFC' : '#334155'} />
          <line x1="0" y1="188" x2="240" y2="188" stroke={isLightPrint ? INK : '#94A3B8'} strokeWidth="2" />

          <text x="120" y="22" textAnchor="middle" className="font-game" fontSize="12.5" fill={yellowText}>
            0 곱하기 &amp; 같은 수 더하기 절대 금지!!
          </text>

          {/* Left: ×0 explosion zapping stickman */}
          <text x="60" y="54" textAnchor="middle" className="font-game" fontSize="14" fill="#FCA5A5">
            2 : 3 (×0)
          </text>
          <text x="60" y="80" textAnchor="middle" className="font-game" fontSize="22" fill="#EF4444">
            0 : 0 💥
          </text>
          <path d="M 52 88 L 42 102 L 54 104 L 44 116" fill="none" stroke={isBw ? INK : '#FACC15'} strokeWidth="2.8" strokeLinecap="round" />
          <SkeletonJollaman x={54} y={138} scale={0.78} strokeColor={skelStroke} />
          <text x="60" y="182" textAnchor="middle" className="font-game" fontSize="9.8" fill="#FCA5A5">
            전부 0 되는 블랙홀!
          </text>

          <line x1="120" y1="36" x2="120" y2="184" stroke="#475569" strokeWidth="2" strokeDasharray="4 3" />

          {/* Right: +2 trap -> 2:3 ≠ 4:5 */}
          <text x="180" y="54" textAnchor="middle" className="font-game" fontSize="14" fill="#FCA5A5">
            2 : 3 (+2)
          </text>
          <text x="180" y="80" textAnchor="middle" className="font-game" fontSize="20" fill="#EF4444">
            4 : 5 ❌
          </text>
          <line x1="148" y1="62" x2="210" y2="86" stroke="#EF4444" strokeWidth="3.2" strokeLinecap="round" />
          <line x1="210" y1="62" x2="148" y2="86" stroke="#EF4444" strokeWidth="3.2" strokeLinecap="round" />

          {/* Orz crying Jollaman on right */}
          <Stickman
            x={180}
            y={136}
            scale={0.78}
            pose="crying"
            armL={[-15, 10]}
            armR={[15, 10]}
            legL={[-9, 44]}
            legR={[9, 44]}
            strokeColor={skelStroke}
          />
          <text x="180" y="182" textAnchor="middle" className="font-game" fontSize="9.8" fill="#FCA5A5">
            덧셈·뺄셈 비율 바뀜!
          </text>

          <text x="120" y="213" textAnchor="middle" className="font-game" fontSize="11.5" fill={yellowText}>
            오직 0이 아닌 같은 수 ×, ÷ 만 인정!
          </text>
        </svg>
      );
    }

    /* 04. 소수의 비 -> 자연수의 비! (소수점 점프!) */
    case 'ratio_simple_decimal': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#ECFDF5')} />

          <text x="120" y="23" textAnchor="middle" className="font-game" fontSize="13.5" fill="#047857">
            소수점 점프 날리기! (×10, ×100)
          </text>

          {/* Row 1: 0.4 : 0.7 -> 4 : 7 */}
          <text x="58" y="64" textAnchor="middle" className="font-game" fontSize="20" fill={INK}>
            0<tspan fill="#DC2626">.</tspan>4 : 0<tspan fill="#DC2626">.</tspan>7
          </text>
          {/* Red 1-hop jump arrow */}
          <path d="M 30 48 Q 74 30 124 48" fill="none" stroke="#DC2626" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M 118 44 L 126 49 L 118 52" fill="none" stroke="#DC2626" strokeWidth="2.2" strokeLinecap="round" />
          <text x="78" y="39" textAnchor="middle" className="font-game" fontSize="10.5" fill="#DC2626">
            ×10 점프!
          </text>
          <text x="176" y="65" textAnchor="middle" className="font-game" fontSize="22" fill="#2563EB">
            4 : 7!
          </text>

          <line x1="18" y1="84" x2="222" y2="84" stroke="#A7F3D0" strokeWidth="2" />

          {/* Row 2: 0.5 : 1.25 -> 50 : 125 -> ÷25 -> 2 : 5 */}
          <text x="64" y="122" textAnchor="middle" className="font-game" fontSize="18" fill={INK}>
            0<tspan fill="#2563EB">.</tspan>5 : 1<tspan fill="#2563EB">.</tspan>25
          </text>
          <path d="M 80 104 Q 112 88 144 106" fill="none" stroke="#2563EB" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M 138 103 L 146 107 L 138 110" fill="none" stroke="#2563EB" strokeWidth="2.2" strokeLinecap="round" />
          <text x="112" y="96" textAnchor="middle" className="font-game" fontSize="10.2" fill="#2563EB">
            긴 쪽 맞춰 ×100!
          </text>
          <text x="184" y="122" textAnchor="middle" className="font-game" fontSize="18" fill="#EA580C">
            50 : 125
          </text>

          {/* Green curve arrow down to final reduced ratio 2 : 5 */}
          <path d="M 184 130 Q 184 156 154 162" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 160 157 L 152 162 L 160 166" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" />
          <text x="194" y="152" textAnchor="middle" className="font-game" fontSize="10.5" fill="#059669">
            ÷25 약분!
          </text>

          <Stickman
            x={42}
            y={152}
            scale={0.68}
            pose="hero"
            armL={[-14, 12]}
            armR={[18, 2]}
            legL={[-8, 42]}
            legR={[8, 42]}
          />
          <text x="112" y="170" textAnchor="middle" className="font-game" fontSize="26" fill="#DC2626">
            2 : 5!
          </text>

          <text x="120" y="214" textAnchor="middle" className="font-game" fontSize="11.2" fill="#065F46">
            소수점 없앤 뒤 끝까지 약분해야 진짜 정답!
          </text>
        </svg>
      );
    }

    /* 05. 분수의 비 -> 자연수의 비! (×6 분모 동시 컷!) */
    case 'ratio_simple_fraction': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#ECFDF5')} />

          <text x="120" y="23" textAnchor="middle" className="font-game" fontSize="13.5" fill="#047857">
            분모들의 공배수로 분모 싹 날려!
          </text>

          {/* Left: 1/2 : 1/3 */}
          <SvgFraction x={38} y={76} num={1} den={2} fontSize={17} barWidth={22} />
          <text x="64" y="81" textAnchor="middle" className="font-game" fontSize="20" fill={INK}>
            :
          </text>
          <SvgFraction x={90} y={76} num={1} den={3} fontSize={17} barWidth={22} />

          {/* Red slash shattering denominators 2 & 3 */}
          <line x1="25" y1="88" x2="103" y2="88" stroke="#EF4444" strokeWidth="2.8" strokeDasharray="4 2" />
          <path d="M 108 62 Q 132 42 158 62" fill="none" stroke="#DC2626" strokeWidth="2.6" strokeLinecap="round" />
          <path d="M 152 60 L 160 63 L 157 54" fill="none" stroke="#DC2626" strokeWidth="2.4" strokeLinecap="round" />
          <text x="133" y="47" textAnchor="middle" className="font-game" fontSize="12" fill="#DC2626">
            양쪽에 ×6!
          </text>

          {/* Right: 3 : 2 */}
          <text x="192" y="84" textAnchor="middle" className="font-game" fontSize="28" fill="#059669">
            3 : 2!
          </text>

          {/* Hero stickman cheering at bottom-left */}
          <Stickman
            x={42}
            y={142}
            scale={0.72}
            pose="hero"
            armL={[-14, 10]}
            armR={[18, 2]}
            legL={[-8, 42]}
            legR={[8, 42]}
          />

          {/* Mixed decimal + fraction tip */}
          <text x="150" y="134" textAnchor="middle" className="font-game" fontSize="11.5" fill="#1D4ED8">
            소수 + 분수 섞였을 땐?
          </text>
          <text x="150" y="156" textAnchor="middle" className="font-game" fontSize="11.5" fill={INK}>
            0.3 :
          </text>
          <SvgFraction x={182} y={152} num={2} den={5} fontSize={12} barWidth={16} />
          <text x="150" y="182" textAnchor="middle" className="font-game" fontSize="12" fill="#059669">
            → 분수로 통일 후 ×10 → 3 : 4!
          </text>

          <text x="120" y="214" textAnchor="middle" className="font-game" fontSize="11.2" fill="#065F46">
            분모 최소공배수 곱하고, 대분수는 가분수로!
          </text>
        </svg>
      );
    }

    /* 06. 비례식 용어 풀세팅: 전항·후항 · 외항·내항 */
    case 'ratio_proportion_terms': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#FFFBEB')} />

          <text x="120" y="22" textAnchor="middle" className="font-game" fontSize="13.2" fill="#B45309">
            비율 같은 두 비를 = 로 묶으면 비례식!
          </text>

          {/* Inner arch for 내항 */}
          <path d="M 88 58 Q 120 34 152 58" fill="none" stroke="#EA580C" strokeWidth="2.6" strokeLinecap="round" />
          <text x="120" y="41" textAnchor="middle" className="font-game" fontSize="12" fill="#EA580C">
            내항 (안쪽 두 항!)
          </text>

          {/* Big equation: 2 : 3 = 4 : 6 */}
          <text x="46" y="92" textAnchor="middle" className="font-game" fontSize="30" fill="#2563EB">
            2
          </text>
          <text x="68" y="90" textAnchor="middle" className="font-game" fontSize="24" fill={INK}>
            :
          </text>
          <text x="88" y="92" textAnchor="middle" className="font-game" fontSize="30" fill="#EA580C">
            3
          </text>
          <text x="120" y="91" textAnchor="middle" className="font-game" fontSize="26" fill={INK}>
            =
          </text>
          <text x="152" y="92" textAnchor="middle" className="font-game" fontSize="30" fill="#EA580C">
            4
          </text>
          <text x="172" y="90" textAnchor="middle" className="font-game" fontSize="24" fill={INK}>
            :
          </text>
          <text x="194" y="92" textAnchor="middle" className="font-game" fontSize="30" fill="#2563EB">
            6
          </text>

          {/* Outer arch for 외항 */}
          <path d="M 46 102 Q 120 136 194 102" fill="none" stroke="#2563EB" strokeWidth="2.6" strokeLinecap="round" />
          <text x="120" y="131" textAnchor="middle" className="font-game" fontSize="12" fill="#1D4ED8">
            외항 (바깥쪽 두 항!)
          </text>

          {/* Expressive mini stickmen acting out inside (squished!) vs outside (cool!) */}
          <Stickman
            x={42}
            y={156}
            scale={0.56}
            pose="sunglasses"
            armL={[-15, 10]}
            armR={[15, 10]}
            legL={[-8, 42]}
            legR={[8, 42]}
          />
          <Stickman
            x={106}
            y={156}
            scale={0.54}
            pose="panic"
            sweat
            armL={[-10, 14]}
            armR={[10, 14]}
            legL={[-6, 42]}
            legR={[6, 42]}
          />
          <Stickman
            x={134}
            y={156}
            scale={0.54}
            pose="panic"
            armL={[-10, 14]}
            armR={[10, 14]}
            legL={[-6, 42]}
            legR={[6, 42]}
          />
          <Stickman
            x={198}
            y={156}
            scale={0.56}
            pose="sunglasses"
            armL={[-15, 10]}
            armR={[15, 10]}
            legL={[-8, 42]}
            legR={[8, 42]}
          />
          <text x="120" y="196" textAnchor="middle" className="font-game" fontSize="10" fill="#EA580C">
            “안쪽 좁아!”
          </text>

          <text x="120" y="216" textAnchor="middle" className="font-game" fontSize="11" fill="#92400E">
            앞(2,4)=전항 · 뒤(3,6)=후항 | 바깥=외항 · 안=내항!
          </text>
        </svg>
      );
    }

    /* 07. 외항의 곱 = 내항의 곱! 무지개 등식 */
    case 'ratio_outer_inner_eq': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#FFFBEB')} />

          <text x="120" y="23" textAnchor="middle" className="font-game" fontSize="13.5" fill="#B45309">
            비례식 최강! 외항의 곱 = 내항의 곱!
          </text>

          {/* Top orange inner rainbow */}
          <path d="M 88 76 Q 120 34 152 76" fill="none" stroke="#EA580C" strokeWidth="3" strokeLinecap="round" />
          <text x="120" y="48" textAnchor="middle" className="font-game" fontSize="12.5" fill="#EA580C">
            3 × 4 = 12
          </text>

          {/* Equation */}
          <text x="46" y="106" textAnchor="middle" className="font-game" fontSize="28" fill="#2563EB">
            2
          </text>
          <text x="68" y="104" textAnchor="middle" className="font-game" fontSize="22" fill={INK}>
            :
          </text>
          <text x="88" y="106" textAnchor="middle" className="font-game" fontSize="28" fill="#EA580C">
            3
          </text>
          <text x="120" y="105" textAnchor="middle" className="font-game" fontSize="24" fill={INK}>
            =
          </text>
          <text x="152" y="106" textAnchor="middle" className="font-game" fontSize="28" fill="#EA580C">
            4
          </text>
          <text x="172" y="104" textAnchor="middle" className="font-game" fontSize="22" fill={INK}>
            :
          </text>
          <text x="194" y="106" textAnchor="middle" className="font-game" fontSize="28" fill="#2563EB">
            6
          </text>

          {/* Bottom blue outer rainbow */}
          <path d="M 46 114 Q 120 158 194 114" fill="none" stroke="#2563EB" strokeWidth="3" strokeLinecap="round" />
          <text x="120" y="149" textAnchor="middle" className="font-game" fontSize="12.5" fill="#1D4ED8">
            2 × 6 = 12
          </text>

          <Stickman
            x={56}
            y={160}
            scale={0.68}
            pose="hero"
            armL={[-14, 12]}
            armR={[18, 2]}
            legL={[-8, 42]}
            legR={[8, 42]}
          />

          <text x="152" y="182" textAnchor="middle" className="font-game" fontSize="17" fill="#059669">
            12 = 12 딱 같아!
          </text>

          <text x="120" y="216" textAnchor="middle" className="font-game" fontSize="11.2" fill="#92400E">
            바깥쪽 곱 = 안쪽 곱이면 무조건 올바른 비례식!
          </text>
        </svg>
      );
    }

    /* 08. □ 구하기 2비법! (한 화면 화살표 도식!) */
    case 'ratio_solve_unknown': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#ECFDF5')} />

          <text x="120" y="22" textAnchor="middle" className="font-game" fontSize="13.2" fill="#047857">
            3 : 5 = 12 : □  사냥법 2가지!
          </text>

          {/* Method 1 Blue Top Arcs: ×4 jump */}
          <path d="M 48 68 Q 95 34 142 68" fill="none" stroke="#2563EB" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M 136 66 L 144 69 L 141 60" fill="none" stroke="#2563EB" strokeWidth="2.2" strokeLinecap="round" />
          <text x="95" y="45" textAnchor="middle" className="font-game" fontSize="11.5" fill="#2563EB">
            비법① 배수 점프 ×4!
          </text>

          {/* Center equation */}
          <text x="48" y="96" textAnchor="middle" className="font-game" fontSize="24" fill="#2563EB">
            3
          </text>
          <text x="68" y="94" textAnchor="middle" className="font-game" fontSize="20" fill={INK}>
            :
          </text>
          <text x="88" y="96" textAnchor="middle" className="font-game" fontSize="24" fill="#EA580C">
            5
          </text>
          <text x="116" y="95" textAnchor="middle" className="font-game" fontSize="22" fill={INK}>
            =
          </text>
          <text x="144" y="96" textAnchor="middle" className="font-game" fontSize="24" fill="#2563EB">
            12
          </text>
          <text x="168" y="94" textAnchor="middle" className="font-game" fontSize="20" fill={INK}>
            :
          </text>
          <rect x="180" y="74" width="26" height="26" rx="2" fill="#FEF08A" stroke="#DC2626" strokeWidth="2.2" strokeDasharray="3 2" />
          <text x="193" y="95" textAnchor="middle" className="font-game" fontSize="20" fill="#DC2626">
            □
          </text>

          {/* Method 2 Bottom Orange/Red Arcs: outer = inner */}
          <path d="M 88 104 Q 116 130 144 104" fill="none" stroke="#EA580C" strokeWidth="2.3" strokeLinecap="round" />
          <path d="M 48 104 Q 120 156 193 104" fill="none" stroke="#DC2626" strokeWidth="2.3" strokeLinecap="round" />
          <text x="132" y="148" textAnchor="middle" className="font-game" fontSize="11.5" fill="#DC2626">
            비법② 3 × □ = 5 × 12 = 60
          </text>

          <Stickman
            x={42}
            y={158}
            scale={0.66}
            pose="sunglasses"
            armL={[-13, 12]}
            armR={[18, 2]}
            legL={[-8, 42]}
            legR={[8, 42]}
          />
          <text x="148" y="182" textAnchor="middle" className="font-game" fontSize="18" fill="#059669">
            □ = 60 ÷ 3 = 20!
          </text>

          <text x="120" y="215" textAnchor="middle" className="font-game" fontSize="11.2" fill="#065F46">
            딱 떨어지면 배수 점프! 아니면 외항곱 = 내항곱!
          </text>
        </svg>
      );
    }

    /* 09. 순서 뒤바뀜 함정! (가로:세로 = 3:2, 세로 10cm면 가로는?) */
    case 'ratio_order_trap': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#FFF7ED')} />

          <text x="120" y="22" textAnchor="middle" className="font-game" fontSize="12.5" fill="#DC2626">
            가로:세로 = 3:2 인데 세로 10cm면?
          </text>

          {/* Left: Upside-down dizzy Jollaman because order flipped! */}
          <text x="60" y="48" textAnchor="middle" className="font-game" fontSize="11.5" fill="#DC2626">
            ❌ 순서 무시 땡!
          </text>
          <text x="60" y="72" textAnchor="middle" className="font-game" fontSize="15" fill={INK}>
            3 : 2 = 10 : □
          </text>
          <line x1="22" y1="54" x2="98" y2="78" stroke="#EF4444" strokeWidth="3.2" strokeLinecap="round" />
          <line x1="98" y1="54" x2="22" y2="78" stroke="#EF4444" strokeWidth="3.2" strokeLinecap="round" />

          {/* Upside down stickman */}
          <Stickman
            x={58}
            y={142}
            scale={0.68}
            rotate={180}
            pose="dizzy"
            armL={[-15, 8]}
            armR={[15, 8]}
            legL={[-8, 42]}
            legR={[8, 42]}
          />
          <text x="58" y="182" textAnchor="middle" className="font-game" fontSize="10" fill="#DC2626">
            “어지러워 뒤집혔어!!”
          </text>

          <line x1="118" y1="36" x2="118" y2="190" stroke="#FED7AA" strokeWidth="2.2" strokeDasharray="4 3" />

          {/* Right: Aligned labels & matching colored arcs */}
          <text x="180" y="48" textAnchor="middle" className="font-game" fontSize="11.5" fill="#059669">
            ⭕ 자리 맞춰 정답!
          </text>
          <text x="180" y="64" textAnchor="middle" className="font-body font-bold" fontSize="8" fill="#475569">
            (가로 : 세로)   (가로 : 세로)
          </text>
          <text x="180" y="90" textAnchor="middle" className="font-game" fontSize="16" fill={INK}>
            <tspan fill="#DC2626">3</tspan> : <tspan fill="#2563EB">2</tspan> = <tspan fill="#DC2626">□</tspan> : <tspan fill="#2563EB">10</tspan>
          </text>
          <path d="M 140 74 Q 167 58 193 74" fill="none" stroke="#DC2626" strokeWidth="2" />
          <path d="M 157 96 Q 186 114 214 96" fill="none" stroke="#2563EB" strokeWidth="2" />

          <text x="180" y="130" textAnchor="middle" className="font-game" fontSize="12" fill={INK}>
            2 × □ = 30
          </text>
          <text x="180" y="154" textAnchor="middle" className="font-game" fontSize="16.5" fill="#059669">
            가로 = 15cm!
          </text>

          <text x="120" y="214" textAnchor="middle" className="font-game" fontSize="11.5" fill="#9A3412">
            식 위에 [앞:뒤] 이름표 먼저 써서 순서 일치!
          </text>
        </svg>
      );
    }

    /* 10. 비례배분 뜻! 사탕 20개를 2 : 3으로! */
    case 'ratio_alloc_concept': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#FFFBEB')} />

          <text x="120" y="22" textAnchor="middle" className="font-game" fontSize="13.5" fill="#B45309">
            사탕 20개를 2 : 3 으로 비례배분!
          </text>

          {/* 5 equal blocks bar */}
          <text x="120" y="44" textAnchor="middle" className="font-game" fontSize="11" fill={INK}>
            먼저 2 + 3 = <tspan fill="#DC2626">5묶음</tspan>으로 싹둑! (1묶음 = 4개)
          </text>
          {[0, 1, 2, 3, 4].map((idx) => {
            const bx = 22 + idx * 40;
            const isLeft = idx < 2;
            return (
              <g key={idx} transform={`translate(${bx}, 54)`}>
                <rect
                  x="0"
                  y="0"
                  width="36"
                  height="28"
                  rx="2"
                  fill={isLightPrint ? '#FFFFFF' : isLeft ? '#DBEAFE' : '#FFEDD5'}
                  stroke={isLeft ? '#2563EB' : '#EA580C'}
                  strokeWidth="2"
                />
                <text x="18" y="19" textAnchor="middle" className="font-game" fontSize="12" fill={isLeft ? '#1D4ED8' : '#EA580C'}>
                  4개
                </text>
              </g>
            );
          })}

          {/* Curved arrows to Big Bro & Little Bro stickmen */}
          <path d="M 58 86 Q 48 106 48 122" fill="none" stroke="#2563EB" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M 43 116 L 48 124 L 53 116" fill="none" stroke="#2563EB" strokeWidth="2.4" strokeLinecap="round" />

          <path d="M 162 86 Q 176 106 176 122" fill="none" stroke="#EA580C" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M 171 116 L 176 124 L 181 116" fill="none" stroke="#EA580C" strokeWidth="2.4" strokeLinecap="round" />

          {/* Left: Big Bro (2/5 -> 8) */}
          <Stickman
            x={34}
            y={144}
            scale={0.62}
            pose="sunglasses"
            armL={[-13, 12]}
            armR={[15, 4]}
            legL={[-8, 40]}
            legR={[8, 40]}
          />
          <text x="72" y="145" textAnchor="middle" className="font-game" fontSize="11.5" fill="#2563EB">
            형 2칸
          </text>
          <text x="72" y="166" textAnchor="middle" className="font-game" fontSize="16" fill="#2563EB">
            = 8개!
          </text>

          {/* Right: Little Bro (3/5 -> 12) */}
          <Stickman
            x={144}
            y={148}
            scale={0.56}
            pose="happy"
            armL={[-14, 4]}
            armR={[14, 4]}
            legL={[-8, 40]}
            legR={[8, 40]}
          />
          <text x="190" y="145" textAnchor="middle" className="font-game" fontSize="11.5" fill="#EA580C">
            동생 3칸
          </text>
          <text x="190" y="166" textAnchor="middle" className="font-game" fontSize="16" fill="#EA580C">
            = 12개!
          </text>

          <text x="120" y="214" textAnchor="middle" className="font-game" fontSize="11.2" fill="#92400E">
            비례배분 = 전체를 주어진 비의 합으로 분수배분!
          </text>
        </svg>
      );
    }

    /* 11. 비례배분 공식 2단계 & 합계 검산 (35를 3 : 4로!) */
    case 'ratio_alloc_formula': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#ECFDF5')} />

          <text x="120" y="22" textAnchor="middle" className="font-game" fontSize="13.5" fill="#047857">
            35를 <tspan fill="#2563EB">3</tspan> : <tspan fill="#EA580C">4</tspan> 로 비례배분 + 검산!
          </text>

          {/* Step 1: 3 + 4 = 7 */}
          <text x="120" y="54" textAnchor="middle" className="font-game" fontSize="18" fill={INK}>
            <tspan fill="#2563EB">3</tspan> + <tspan fill="#EA580C">4</tspan> ={' '}
            <tspan fill="#DC2626">7</tspan>  (분모!)
          </text>

          {/* Left & Right arrows down to fraction multiplications */}
          <path d="M 96 62 Q 66 74 62 90" fill="none" stroke="#2563EB" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M 58 84 L 62 92 L 67 85" fill="none" stroke="#2563EB" strokeWidth="2.2" strokeLinecap="round" />

          <path d="M 144 62 Q 174 74 178 90" fill="none" stroke="#EA580C" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M 173 85 L 178 92 L 182 84" fill="none" stroke="#EA580C" strokeWidth="2.2" strokeLinecap="round" />

          {/* Step 2 formulas with vertical fractions */}
          <text x="36" y="114" textAnchor="middle" className="font-game" fontSize="15" fill={INK}>
            35×
          </text>
          <SvgFraction x={66} y={109} num={3} den={7} numColor="#2563EB" denColor="#DC2626" fontSize={14} barWidth={18} />
          <text x="92" y="114" textAnchor="middle" className="font-game" fontSize="16" fill="#2563EB">
            =15
          </text>

          <text x="142" y="114" textAnchor="middle" className="font-game" fontSize="15" fill={INK}>
            35×
          </text>
          <SvgFraction x={172} y={109} num={4} den={7} numColor="#EA580C" denColor="#DC2626" fontSize={14} barWidth={18} />
          <text x="198" y="114" textAnchor="middle" className="font-game" fontSize="16" fill="#EA580C">
            =20
          </text>

          {/* Bottom check loop connecting 15 and 20 -> 35! */}
          <path d="M 88 128 Q 120 154 196 128" fill="none" stroke="#059669" strokeWidth="2.6" strokeLinecap="round" />
          <text x="150" y="162" textAnchor="middle" className="font-game" fontSize="13.5" fill="#059669">
            검산! 15 + 20 = 35 딱 맞아!
          </text>

          <Stickman
            x={44}
            y={156}
            scale={0.68}
            pose="happy"
            armL={[-15, 6]}
            armR={[18, 2]}
            legL={[-8, 42]}
            legR={[8, 42]}
          />

          <text x="120" y="214" textAnchor="middle" className="font-game" fontSize="11.2" fill="#065F46">
            ① 분모=(가+나) ② 약분 계산 ③ 더해서 전체 확인!
          </text>
        </svg>
      );
    }

    /* 12. 분모에 앞수만 넣는 대참사! (감전 뼈다귀!) */
    case 'ratio_alloc_denom_trap': {
      const skelStroke = isLightPrint ? INK : '#FFFFFF';
      const yellowText = isBw ? INK : isLightPrint ? '#B45309' : '#FEF08A';
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={isLightPrint ? '#FFFFFF' : '#1E293B'} />
          <rect x="0" y="188" width="240" height="42" fill={isLightPrint ? '#F8FAFC' : '#334155'} />
          <line x1="0" y1="188" x2="240" y2="188" stroke={isLightPrint ? INK : '#94A3B8'} strokeWidth="2" />

          <text x="120" y="22" textAnchor="middle" className="font-game" fontSize="12.5" fill={yellowText}>
            “20을 2 : 3 배분 = 20 × 2/3 ?!”
          </text>

          {/* Left: Wrong 20 × 2/3 zapping Jollaman */}
          <text x="42" y="68" textAnchor="middle" className="font-game" fontSize="16" fill="#FFFFFF">
            20 ×
          </text>
          <g transform="translate(76, 63)">
            <text x="0" y="-4" textAnchor="middle" className="font-game" fontSize="16" fill="#FCA5A5">
              2
            </text>
            <line x1="-11" y1="0" x2="11" y2="0" stroke="#FFFFFF" strokeWidth="2.2" />
            <text x="0" y="17" textAnchor="middle" className="font-game" fontSize="16" fill="#EF4444">
              3
            </text>
            <line x1="-18" y1="-16" x2="18" y2="20" stroke="#EF4444" strokeWidth="3.6" strokeLinecap="round" />
            <line x1="18" y1="-16" x2="-18" y2="20" stroke="#EF4444" strokeWidth="3.6" strokeLinecap="round" />
          </g>

          <path d="M 52 86 L 42 100 L 54 102 L 44 114" fill="none" stroke={isBw ? INK : '#FACC15'} strokeWidth="2.8" strokeLinecap="round" />
          <text x="86" y="106" textAnchor="middle" className="font-game" fontSize="12" fill={isBw ? INK : '#FACC15'}>
            찌릿!! 퍽!
          </text>
          <SkeletonJollaman x={48} y={136} scale={0.82} strokeColor={skelStroke} />

          {/* Sharp right card with correct 2+3=5 */}
          <rect x="129" y="50" width="98" height="118" rx="2" fill={isLightPrint ? '#E2E8F0' : '#FACC15'} />
          <rect x="126" y="47" width="98" height="118" rx="2" fill="#FFFFFF" stroke={INK} strokeWidth="2.6" />
          <text x="175" y="67" textAnchor="middle" className="font-game" fontSize="11.5" fill="#059669">
            분모는 합체!
          </text>
          <text x="150" y="102" textAnchor="middle" className="font-game" fontSize="14.5" fill={INK}>
            20 ×
          </text>
          <SvgFraction x={190} y={96} num="2" den="2+3" numColor="#2563EB" denColor="#DC2626" fontSize={14} barWidth={30} />
          <text x="175" y="140" textAnchor="middle" className="font-game" fontSize="15.5" fill="#059669">
            = 20 × 2/5 = 8!
          </text>
          <text x="175" y="156" textAnchor="middle" className="font-game" fontSize="10.2" fill="#DC2626">
            무조건 가+나!
          </text>

          <text x="120" y="213" textAnchor="middle" className="font-game" fontSize="12" fill={yellowText}>
            “으악! 분모 3이 아니라 2+3=5 라구!!”
          </text>
        </svg>
      );
    }

    /* 13. 직사각형 둘레 비례배분 도전! (둘레 28 ÷ 2 = 14cm!) */
    case 'ratio_perimeter_challenge': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#F5F3FF')} />

          <text x="120" y="22" textAnchor="middle" className="font-game" fontSize="12.5" fill="#5B21B6">
            둘레 28cm 직사각형! (가로:세로 = 4:3)
          </text>

          {/* Rectangle being karate-chopped diagonally in half! */}
          <rect x="26" y="48" width="96" height="58" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2.2" />
          {/* Active 1 pair (top width + right height) highlighted */}
          <line x1="26" y1="48" x2="122" y2="48" stroke="#DC2626" strokeWidth="4" strokeLinecap="round" />
          <line x1="122" y1="48" x2="122" y2="106" stroke="#2563EB" strokeWidth="4" strokeLinecap="round" />
          {/* Diagonal chop line */}
          <line x1="20" y1="112" x2="128" y2="42" stroke="#7C3AED" strokeWidth="2.4" strokeDasharray="4 3" />

          <text x="74" y="42" textAnchor="middle" className="font-game" fontSize="11" fill="#DC2626">
            가로(4)
          </text>
          <text x="139" y="80" textAnchor="middle" className="font-game" fontSize="11" fill="#2563EB">
            세로(3)
          </text>
          <text x="74" y="84" textAnchor="middle" className="font-game" fontSize="10.5" fill="#64748B">
            둘레=28
          </text>

          {/* Arrow to ÷2 */}
          <path d="M 142 56 Q 168 42 186 58" fill="none" stroke="#DC2626" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M 180 56 L 188 60 L 185 51" fill="none" stroke="#DC2626" strokeWidth="2.4" strokeLinecap="round" />
          <text x="190" y="76" textAnchor="middle" className="font-game" fontSize="13.5" fill="#DC2626">
            먼저 ÷ 2!
          </text>
          <text x="190" y="96" textAnchor="middle" className="font-game" fontSize="15" fill="#059669">
            = 14cm!
          </text>

          <Stickman
            x={42}
            y={144}
            scale={0.68}
            pose="hero"
            armL={[-14, 12]}
            armR={[20, -4]}
            legL={[-8, 42]}
            legR={[8, 42]}
          />

          {/* Clean fraction arrow equations */}
          <text x="110" y="138" textAnchor="middle" className="font-game" fontSize="13" fill="#DC2626">
            가로 = 14 ×
          </text>
          <SvgFraction x={156} y={133} num={4} den={7} numColor="#DC2626" denColor="#059669" fontSize={12.5} barWidth={16} />
          <text x="194" y="138" textAnchor="middle" className="font-game" fontSize="14.5" fill="#DC2626">
            = 8cm!
          </text>

          <text x="110" y="176" textAnchor="middle" className="font-game" fontSize="13" fill="#2563EB">
            세로 = 14 ×
          </text>
          <SvgFraction x={156} y={171} num={3} den={7} numColor="#2563EB" denColor="#059669" fontSize={12.5} barWidth={16} />
          <text x="194" y="176" textAnchor="middle" className="font-game" fontSize="14.5" fill="#2563EB">
            = 6cm!
          </text>

          <text x="120" y="214" textAnchor="middle" className="font-game" fontSize="11.2" fill="#4C1D95">
            둘레는 가로+세로가 2쌍! 꼭 ÷2 한 뒤 배분!
          </text>
        </svg>
      );
    }

    /* 14. 최종 보스! 비례식·비례배분 3관문 */
    case 'ratio_boss': {
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

          <text x="120" y="24" textAnchor="middle" className="font-game" fontSize="13.2" fill={bossTextColor}>
            최종 보스! 비례식·배분 3관문
          </text>

          {/* 3 Gold-shadowed Boss Challenge Podiums */}
          <g transform="translate(46, 68)">
            <rect x="-31" y="-23" width="66" height="52" rx="2" fill={bossShadow} />
            <rect x="-34" y="-26" width="66" height="52" rx="2" fill="#FFFFFF" stroke={INK} strokeWidth="2.4" />
            <text x="-1" y="-10" textAnchor="middle" className="font-game" fontSize="9.2" fill="#DC2626">
              1관문
            </text>
            <text x="-16" y="10" textAnchor="middle" className="font-game" fontSize="10.5" fill={INK}>
              0.6 :
            </text>
            <SvgFraction x={12} y={7} num={3} den={2} fontSize={10} barWidth={13} />
          </g>

          <g transform="translate(120, 68)">
            <rect x="-31" y="-23" width="66" height="52" rx="2" fill={bossShadow} />
            <rect x="-34" y="-26" width="66" height="52" rx="2" fill="#FFFFFF" stroke={INK} strokeWidth="2.4" />
            <text x="-1" y="-10" textAnchor="middle" className="font-game" fontSize="9.2" fill="#DC2626">
              2관문
            </text>
            <text x="-1" y="10" textAnchor="middle" className="font-game" fontSize="10" fill={INK}>
              4:7=□:35
            </text>
          </g>

          <g transform="translate(194, 68)">
            <rect x="-31" y="-23" width="66" height="52" rx="2" fill={bossShadow} />
            <rect x="-34" y="-26" width="66" height="52" rx="2" fill="#FFFFFF" stroke={INK} strokeWidth="2.4" />
            <text x="-1" y="-10" textAnchor="middle" className="font-game" fontSize="9.2" fill="#DC2626">
              3관문
            </text>
            <text x="-1" y="6" textAnchor="middle" className="font-game" fontSize="9.5" fill={INK}>
              45를 4:5
            </text>
            <text x="-1" y="19" textAnchor="middle" className="font-game" fontSize="9" fill="#2563EB">
              작은 수?
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
            “약분 + 외항=내항 + 분모합!”
          </text>

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

    /* 15. 완주 칭찬 포카 */
    case 'ratio_praise':
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
            6학년 2학기 4단원 완주!!
          </text>

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
            멋진 도전자, 비례식 올 클리어!
          </text>
          <text x="119" y="156" textAnchor="middle" className="font-body font-bold" fontSize="10" fill="#334155">
            비의 성질 · 외항=내항 · 비례배분 정복!
          </text>
          <text x="119" y="174" textAnchor="middle" className="font-game" fontSize="10.2" fill="#DC2626">
            ★ 졸라수학맨 공식 마스터 인증 ★
          </text>

          <text x="120" y="211" textAnchor="middle" className="font-game" fontSize="13.5" fill={goldText}>
            전설의 비례식 챔피언 등극!!
          </text>
        </svg>
      );
    }
  }
};
