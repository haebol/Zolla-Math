import React from 'react';
import { EpisodeSceneType, PrintInkMode } from '../types/card';

interface RangeComicSceneProps {
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

export const RangeComicScene: React.FC<RangeComicSceneProps> = ({
  sceneType,
  inkMode = 'full',
}) => {
  const isLightPrint = inkMode !== 'full';
  const isBw = inkMode === 'bw_worksheet';
  const softBg = (color: string) => (isLightPrint ? '#FFFFFF' : color);

  switch (sceneType) {
    /* 00: 수의 범위와 어림하기 도감 설명서 */
    case 'range_guide': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#F0F9FF')} />
          <line x1="0" y1="192" x2="240" y2="192" stroke={INK} strokeWidth="2.4" />

          <text x="120" y="23" textAnchor="middle" className="font-game" fontSize="14" fill="#0369A1">
            5-2 수의 범위와 어림하기 18장!
          </text>

          <rect x="14" y="38" width="132" height="98" rx="4" fill="#FFFFFF" stroke="#0284C7" strokeWidth="2.2" />
          {/* Mini number line ● to ○ */}
          <line x1="28" y1="74" x2="132" y2="74" stroke={INK} strokeWidth="2" />
          <line x1="48" y1="74" x2="112" y2="74" stroke="#2563EB" strokeWidth="4.5" />
          <circle cx="48" cy="74" r="5" fill="#2563EB" stroke={INK} strokeWidth="1.6" />
          <circle cx="112" cy="74" r="5" fill="#FFFFFF" stroke="#EA580C" strokeWidth="2" />
          <text x="48" y="92" textAnchor="middle" className="font-game" fontSize="10" fill="#2563EB">
            ● 이상
          </text>
          <text x="112" y="92" textAnchor="middle" className="font-game" fontSize="10" fill="#EA580C">
            ○ 미만
          </text>
          <text x="80" y="122" textAnchor="middle" className="font-game" fontSize="12" fill="#059669">
            올림 · 버림 · 반올림!
          </text>

          <Stickman x={184} y={118} scale={0.95} pose="hero" armL={[-20, 6]} armR={[18, 2]} />

          <rect x="16" y="152" width="128" height="28" rx="3" fill="#FEF9C3" stroke="#D97706" strokeWidth="2" />
          <text x="80" y="170" textAnchor="middle" className="font-game" fontSize="10.5" fill="#B45309">
            ‘까지 vs 에서’ 함정 정복!
          </text>

          <text x="120" y="214" textAnchor="middle" className="font-game" fontSize="11.5" fill="#0F172A">
            포함·미포함부터 연쇄 반올림까지 마스터!
          </text>
        </svg>
      );
    }

    /* 01: [선수학습] 크다(>) · 작다(<) · 같다(=) */
    case 'range_prereq_compare': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#EFF6FF')} />

          <text x="120" y="21" textAnchor="middle" className="font-game" fontSize="13.5" fill="#1D4ED8">
            수직선은 오른쪽으로 갈수록 커져!
          </text>

          <rect x="14" y="34" width="212" height="86" rx="3" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2.2" />
          <line x1="26" y1="84" x2="214" y2="84" stroke={INK} strokeWidth="2.4" />
          <polygon points="208,79 216,84 208,89" fill={INK} />
          {[47, 48, 49, 50, 51, 52].map((n, idx) => {
            const nx = 38 + idx * 32;
            const hi = n === 49 || n === 52;
            return (
              <g key={n}>
                <line x1={nx} y1="78" x2={nx} y2="90" stroke={INK} strokeWidth="1.8" />
                <text
                  x={nx}
                  y="105"
                  textAnchor="middle"
                  className="font-game"
                  fontSize="12"
                  fill={n === 52 ? '#DC2626' : n === 49 ? '#2563EB' : '#64748B'}
                >
                  {n}
                </text>
                {hi && <circle cx={nx} cy="84" r="4.2" fill={n === 52 ? '#DC2626' : '#2563EB'} />}
              </g>
            );
          })}
          <text x="120" y="55" textAnchor="middle" className="font-game" fontSize="12" fill="#059669">
            ← 작아짐      커짐 →
          </text>

          <rect x="14" y="132" width="212" height="58" rx="3" fill="#FFFFFF" stroke="#059669" strokeWidth="2.2" />
          <text x="120" y="167" textAnchor="middle" className="font-game" fontSize="22" fill={INK}>
            <tspan fill="#DC2626">52</tspan> &gt; <tspan fill="#2563EB">49</tspan>
          </text>

          <text x="120" y="214" textAnchor="middle" className="font-game" fontSize="11.5" fill="#1E3A8A">
            큰 수 쪽으로 입(＞)을 쩍! 벌려 비교해!
          </text>
        </svg>
      );
    }

    /* 02: [선수학습] 어림수란? 대충 얼마쯤일까? */
    case 'range_prereq_approx': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#EFF6FF')} />

          <text x="120" y="21" textAnchor="middle" className="font-game" fontSize="13.5" fill="#1D4ED8">
            어림수 = 딱 떨어지게 묶은 수!
          </text>

          <rect x="14" y="34" width="212" height="68" rx="3" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2.2" />
          <text x="64" y="64" textAnchor="middle" className="font-game" fontSize="17" fill={INK}>
            298원
          </text>
          <text x="114" y="64" textAnchor="middle" className="font-game" fontSize="15" fill="#EA580C">
            →
          </text>
          <text x="172" y="64" textAnchor="middle" className="font-game" fontSize="18" fill="#059669">
            약 300원!
          </text>
          <text x="120" y="88" textAnchor="middle" className="font-body font-bold" fontSize="9.5" fill="#475569">
            300원에 아주 가까우니까 어림해 말하기!
          </text>

          <rect x="14" y="114" width="212" height="68" rx="3" fill="#FFFFFF" stroke="#059669" strokeWidth="2.2" />
          <text x="64" y="144" textAnchor="middle" className="font-game" fontSize="17" fill={INK}>
            42명
          </text>
          <text x="114" y="144" textAnchor="middle" className="font-game" fontSize="15" fill="#EA580C">
            →
          </text>
          <text x="172" y="144" textAnchor="middle" className="font-game" fontSize="18" fill="#2563EB">
            약 40명!
          </text>
          <text x="120" y="168" textAnchor="middle" className="font-body font-bold" fontSize="9.5" fill="#475569">
            이처럼 대충 나타낸 수를 ‘어림수’라고 해!
          </text>

          <text x="120" y="210" textAnchor="middle" className="font-game" fontSize="11.5" fill="#1E3A8A">
            생활 속 어림: 올림·버림·반올림으로 배우자!
          </text>
        </svg>
      );
    }

    /* 03: 이상과 이하 — 내 숫자까지 포함(●)! */
    case 'range_gte_lte': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#FFFBEB')} />

          <text x="120" y="21" textAnchor="middle" className="font-game" fontSize="13.5" fill="#B45309">
            ‘이’상 · ‘이’하 = 내 숫자도 포함(●)!!
          </text>

          {/* Top: 5 이상 */}
          <rect x="14" y="34" width="212" height="72" rx="3" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2.2" />
          <text x="58" y="57" textAnchor="middle" className="font-game" fontSize="13" fill="#2563EB">
            5 이상 (≥ 5)
          </text>
          <text x="158" y="57" textAnchor="middle" className="font-game" fontSize="12" fill="#059669">
            5 포함! 5, 6, 7…
          </text>
          <line x1="28" y1="84" x2="210" y2="84" stroke="#CBD5E1" strokeWidth="2" />
          <line x1="90" y1="84" x2="206" y2="84" stroke="#2563EB" strokeWidth="4.5" />
          <polygon points="200,79 210,84 200,89" fill="#2563EB" />
          <circle cx="90" cy="84" r="6" fill="#2563EB" stroke={INK} strokeWidth="2" />
          <text x="90" y="100" textAnchor="middle" className="font-game" fontSize="10.5" fill="#2563EB">
            5 (●)
          </text>

          {/* Bottom: 8 이하 */}
          <rect x="14" y="116" width="212" height="72" rx="3" fill="#FFFFFF" stroke="#EA580C" strokeWidth="2.2" />
          <text x="58" y="139" textAnchor="middle" className="font-game" fontSize="13" fill="#EA580C">
            8 이하 (≤ 8)
          </text>
          <text x="158" y="139" textAnchor="middle" className="font-game" fontSize="12" fill="#059669">
            8 포함! 8, 7, 6…
          </text>
          <line x1="28" y1="166" x2="210" y2="166" stroke="#CBD5E1" strokeWidth="2" />
          <line x1="34" y1="166" x2="150" y2="166" stroke="#EA580C" strokeWidth="4.5" />
          <polygon points="40,161 30,166 40,171" fill="#EA580C" />
          <circle cx="150" cy="166" r="6" fill="#EA580C" stroke={INK} strokeWidth="2" />
          <text x="150" y="182" textAnchor="middle" className="font-game" fontSize="10.5" fill="#EA580C">
            8 (●)
          </text>

          <text x="120" y="212" textAnchor="middle" className="font-game" fontSize="11.5" fill="#92400E">
            “이(이것)도 포함!” 까만 점 ● 꽉 채워!
          </text>
        </svg>
      );
    }

    /* 04: 초과와 미만 — 내 숫자는 제외(○)! */
    case 'range_gt_lt': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#FFFBEB')} />

          <text x="120" y="21" textAnchor="middle" className="font-game" fontSize="13.5" fill="#B45309">
            초과 · 미만 = 내 숫자는 빼고(○)!!
          </text>

          {/* Top: 5 초과 */}
          <rect x="14" y="34" width="212" height="72" rx="3" fill="#FFFFFF" stroke="#059669" strokeWidth="2.2" />
          <text x="58" y="57" textAnchor="middle" className="font-game" fontSize="13" fill="#059669">
            5 초과 (&gt; 5)
          </text>
          <text x="158" y="57" textAnchor="middle" className="font-game" fontSize="12" fill="#DC2626">
            5 빼고! 6, 7, 8…
          </text>
          <line x1="28" y1="84" x2="210" y2="84" stroke="#CBD5E1" strokeWidth="2" />
          <line x1="90" y1="84" x2="206" y2="84" stroke="#059669" strokeWidth="4.5" />
          <polygon points="200,79 210,84 200,89" fill="#059669" />
          <circle cx="90" cy="84" r="6" fill="#FFFFFF" stroke="#059669" strokeWidth="2.4" />
          <text x="90" y="100" textAnchor="middle" className="font-game" fontSize="10.5" fill="#DC2626">
            5 제외 (○)
          </text>

          {/* Bottom: 8 미만 */}
          <rect x="14" y="116" width="212" height="72" rx="3" fill="#FFFFFF" stroke="#7C3AED" strokeWidth="2.2" />
          <text x="58" y="139" textAnchor="middle" className="font-game" fontSize="13" fill="#7C3AED">
            8 미만 (&lt; 8)
          </text>
          <text x="158" y="139" textAnchor="middle" className="font-game" fontSize="12" fill="#DC2626">
            8 빼고! 7, 6, 5…
          </text>
          <line x1="28" y1="166" x2="210" y2="166" stroke="#CBD5E1" strokeWidth="2" />
          <line x1="34" y1="166" x2="150" y2="166" stroke="#7C3AED" strokeWidth="4.5" />
          <polygon points="40,161 30,166 40,171" fill="#7C3AED" />
          <circle cx="150" cy="166" r="6" fill="#FFFFFF" stroke="#7C3AED" strokeWidth="2.4" />
          <text x="150" y="182" textAnchor="middle" className="font-game" fontSize="10.5" fill="#DC2626">
            8 제외 (○)
          </text>

          <text x="120" y="212" textAnchor="middle" className="font-game" fontSize="11.5" fill="#92400E">
            기준 수는 쏙 빼고 하얀 원 ○ 으로 비워둬!
          </text>
        </svg>
      );
    }

    /* 05: ‘5 이상 8 이하’ vs ‘5 초과 8 미만’ 개수 차이! */
    case 'range_boundary_trap': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#FEF2F2')} />

          <text x="120" y="21" textAnchor="middle" className="font-game" fontSize="13" fill="#DC2626">
            경계 숫자 포함 여부에 따라 개수 딴판!
          </text>

          <rect x="14" y="34" width="212" height="68" rx="3" fill="#FFFFFF" stroke="#059669" strokeWidth="2.2" />
          <text x="120" y="55" textAnchor="middle" className="font-game" fontSize="12.5" fill="#059669">
            5 이상 8 이하인 자연수 (5● ~ 8●)
          </text>
          <text x="120" y="83" textAnchor="middle" className="font-game" fontSize="16" fill={INK}>
            <tspan fill="#059669">5</tspan>, 6, 7, <tspan fill="#059669">8</tspan> → <tspan fill="#2563EB">4개!</tspan>
          </text>

          <rect x="14" y="114" width="212" height="68" rx="3" fill="#FFFFFF" stroke="#DC2626" strokeWidth="2.2" />
          <text x="120" y="135" textAnchor="middle" className="font-game" fontSize="12.5" fill="#DC2626">
            5 초과 8 미만인 자연수 (5○ ~ 8○)
          </text>
          <text x="120" y="163" textAnchor="middle" className="font-game" fontSize="16" fill={INK}>
            <tspan fill="#CBD5E1">5</tspan>  <tspan fill="#DC2626">6, 7</tspan>  <tspan fill="#CBD5E1">8</tspan> → <tspan fill="#DC2626">2개뿐!</tspan>
          </text>

          <Stickman x={34} y={184} scale={0.52} pose="panic" sweat armL={[-12, 10]} armR={[14, 2]} />
          <text x="140" y="209" textAnchor="middle" className="font-game" fontSize="11.5" fill="#991B1B">
            양쪽 끝 숫자 넣을지 뺄지 동그라미 체크!
          </text>
        </svg>
      );
    }

    /* 06: 수직선 점 색칠 치트키! (● vs ○) */
    case 'range_numberline_dots': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#ECFDF5')} />

          <text x="120" y="21" textAnchor="middle" className="font-game" fontSize="13.5" fill="#047857">
            “10 이상 20 미만” 수직선 그리기!
          </text>

          <rect x="14" y="34" width="212" height="104" rx="3" fill="#FFFFFF" stroke="#059669" strokeWidth="2.2" />
          <line x1="26" y1="86" x2="214" y2="86" stroke={INK} strokeWidth="2" />
          {[5, 10, 15, 20, 25].map((v, i) => {
            const vx = 36 + i * 42;
            return (
              <g key={v}>
                <line x1={vx} y1="80" x2={vx} y2="92" stroke={INK} strokeWidth="1.6" />
                <text x={vx} y="108" textAnchor="middle" className="font-game" fontSize="11.5" fill={INK}>
                  {v}
                </text>
              </g>
            );
          })}

          {/* Highlighted segment from 10 (x=78) to 20 (x=162) */}
          <line x1="78" y1="86" x2="162" y2="86" stroke="#10B981" strokeWidth="5.5" />
          <circle cx="78" cy="86" r="6.5" fill="#059669" stroke={INK} strokeWidth="2" />
          <circle cx="162" cy="86" r="6.5" fill="#FFFFFF" stroke="#059669" strokeWidth="2.4" />

          <text x="78" y="65" textAnchor="middle" className="font-game" fontSize="10.5" fill="#059669">
            ● 10 포함!
          </text>
          <text x="162" y="65" textAnchor="middle" className="font-game" fontSize="10.5" fill="#DC2626">
            ○ 20 제외!
          </text>

          <rect x="14" y="148" width="212" height="44" rx="3" fill="#FFFFFF" stroke={INK} strokeWidth="2" />
          <text x="120" y="175" textAnchor="middle" className="font-game" fontSize="12" fill="#047857">
            이상·이하 = ● (꽉 참) | 초과·미만 = ○ (비어있음)
          </text>

          <text x="120" y="214" textAnchor="middle" className="font-game" fontSize="11.5" fill="#065F46">
            점 모양만 봐도 포함/미포함이 한눈에 쏙!
          </text>
        </svg>
      );
    }

    /* 07: ‘5 초과 7 미만’이 6 하나뿐이라고?! 땡!! */
    case 'range_decimal_count_trap': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#FEF2F2')} />

          <text x="120" y="21" textAnchor="middle" className="font-game" fontSize="13" fill="#DC2626">
            ‘자연수’ 말 없으면 6 하나뿐이 아님!!
          </text>

          <rect x="14" y="34" width="212" height="72" rx="3" fill="#FFFFFF" stroke="#DC2626" strokeWidth="2.2" />
          <text x="120" y="55" textAnchor="middle" className="font-game" fontSize="12.5" fill={INK}>
            “5 초과 7 미만인 <tspan fill="#DC2626">수</tspan>는 모두 몇 개?”
          </text>
          <text x="64" y="84" textAnchor="middle" className="font-game" fontSize="14" fill="#94A3B8">
            ❌ 1개 (6)
          </text>
          <line x1="30" y1="76" x2="94" y2="86" stroke="#EF4444" strokeWidth="2.4" />
          <text x="166" y="84" textAnchor="middle" className="font-game" fontSize="14" fill="#059669">
            ⭕ 셀 수 없이 많음!
          </text>

          <rect x="14" y="116" width="212" height="68" rx="3" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2.2" />
          <text x="120" y="137" textAnchor="middle" className="font-game" fontSize="11.5" fill="#1D4ED8">
            소수·분수도 5 초과 7 미만에 포함돼!
          </text>
          <text x="120" y="164" textAnchor="middle" className="font-game" fontSize="13.5" fill={INK}>
            5.1,  5.5,  6,  6.25,  6.999…
          </text>

          <text x="120" y="208" textAnchor="middle" className="font-game" fontSize="11.5" fill="#991B1B">
            문제에서 ‘자연수’ 조건 있는지 꼭 확인!
          </text>
        </svg>
      );
    }

    /* 08: 올림 — 아래에 0이 아니면 무조건 올려! */
    case 'range_ceil_up': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#EFF6FF')} />

          <text x="120" y="21" textAnchor="middle" className="font-game" fontSize="13.5" fill="#1D4ED8">
            올림: 티끌(12)만 있어도 +100 UP!!
          </text>

          <rect x="14" y="34" width="212" height="106" rx="3" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2.2" />
          <text x="120" y="55" textAnchor="middle" className="font-game" fontSize="11.5" fill="#2563EB">
            3412를 백의 자리까지 올림!
          </text>
          <text x="120" y="92" textAnchor="middle" className="font-game" fontSize="26" fill={INK}>
            3<tspan fill="#2563EB">4</tspan><tspan fill="#EA580C">12</tspan> → 3<tspan fill="#059669">500!</tspan>
          </text>
          <text x="120" y="122" textAnchor="middle" className="font-game" fontSize="11.5" fill="#EA580C">
            아래 12가 0이 아니니 4→5로 1 올리고 00!
          </text>

          <rect x="14" y="150" width="212" height="42" rx="3" fill="#FFFFFF" stroke="#64748B" strokeWidth="2" />
          <text x="120" y="176" textAnchor="middle" className="font-game" fontSize="12" fill={INK}>
            ★ 단, 34<tspan fill="#2563EB">00</tspan>은 아래가 모두 0 → 그대로 3400!
          </text>

          <text x="120" y="214" textAnchor="middle" className="font-game" fontSize="11.5" fill="#1E3A8A">
            구하려는 자리 아래가 0 아니면 무조건 올려!
          </text>
        </svg>
      );
    }

    /* 09: 버림 — 아래 숫자를 모두 0으로 싹뚝! */
    case 'range_floor_down': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#EFF6FF')} />

          <text x="120" y="21" textAnchor="middle" className="font-game" fontSize="13.5" fill="#1D4ED8">
            버림: 98이 남아도 자비 없이 00!!
          </text>

          <rect x="14" y="34" width="212" height="146" rx="3" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2.2" />
          <text x="120" y="58" textAnchor="middle" className="font-game" fontSize="12" fill="#2563EB">
            3498을 백의 자리까지 버림!
          </text>

          <text x="84" y="102" textAnchor="middle" className="font-game" fontSize="28" fill={INK}>
            34<tspan fill="#DC2626">98</tspan>
          </text>
          <line x1="88" y1="74" x2="120" y2="108" stroke="#EF4444" strokeWidth="3" />
          <text x="134" y="102" textAnchor="middle" className="font-game" fontSize="18" fill="#059669">
            →
          </text>
          <text x="182" y="102" textAnchor="middle" className="font-game" fontSize="28" fill="#059669">
            3400!
          </text>

          <line x1="26" y1="120" x2="214" y2="120" stroke="#DBEAFE" strokeWidth="1.8" />
          <text x="120" y="146" textAnchor="middle" className="font-game" fontSize="12.5" fill="#DC2626">
            98이 아까워도 절대 올리면 안 돼!
          </text>
          <text x="120" y="166" textAnchor="middle" className="font-body font-bold" fontSize="10" fill="#475569">
            구하려는 자리 아래를 무조건 0으로 싹뚝!
          </text>

          <text x="120" y="208" textAnchor="middle" className="font-game" fontSize="11.5" fill="#1E3A8A">
            버림은 숫자가 아무리 커도 다 버리고 0!
          </text>
        </svg>
      );
    }

    /* 10: 반올림 — 바로 아래 1자리만 보고 결정! */
    case 'range_round_rule': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#FFFBEB')} />

          <text x="120" y="21" textAnchor="middle" className="font-game" fontSize="13.5" fill="#B45309">
            반올림: 0~4 버림 · 5~9 올림!!
          </text>

          {/* Split rule boxes */}
          <rect x="14" y="34" width="102" height="66" rx="3" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2.2" />
          <text x="65" y="55" textAnchor="middle" className="font-game" fontSize="12" fill="#2563EB">
            0, 1, 2, 3, 4
          </text>
          <text x="65" y="82" textAnchor="middle" className="font-game" fontSize="15" fill="#2563EB">
            버림! ↓
          </text>

          <rect x="124" y="34" width="102" height="66" rx="3" fill="#FFFFFF" stroke="#EA580C" strokeWidth="2.2" />
          <text x="175" y="55" textAnchor="middle" className="font-game" fontSize="12" fill="#EA580C">
            5, 6, 7, 8, 9
          </text>
          <text x="175" y="82" textAnchor="middle" className="font-game" fontSize="15" fill="#EA580C">
            올림! ↑
          </text>

          {/* Example 3452 */}
          <rect x="14" y="112" width="212" height="74" rx="3" fill="#FFFFFF" stroke="#059669" strokeWidth="2.2" />
          <text x="120" y="134" textAnchor="middle" className="font-game" fontSize="11.5" fill="#047857">
            3452를 백의 자리까지 반올림!
          </text>
          <text x="120" y="166" textAnchor="middle" className="font-game" fontSize="22" fill={INK}>
            34<tspan fill="#EA580C">5</tspan>2 → <tspan fill="#059669">3500!</tspan>
          </text>
          <circle cx="101" cy="158" r="11" fill="none" stroke="#EA580C" strokeWidth="2" />

          <text x="120" y="212" textAnchor="middle" className="font-game" fontSize="11.5" fill="#92400E">
            바로 뒷자리 숫자 1개만 보고 올릴지 결정!
          </text>
        </svg>
      );
    }

    /* 11: ‘백의 자리까지’ vs ‘백의 자리에서’ 완전 딴판! */
    case 'range_place_word_trap': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#FEF2F2')} />

          <text x="120" y="21" textAnchor="middle" className="font-game" fontSize="13" fill="#DC2626">
            오답 1위! ‘~까지’ vs ‘~에서’ 구별!!
          </text>

          {/* Case 1: 백의 자리까지 */}
          <rect x="14" y="34" width="212" height="68" rx="3" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2.2" />
          <text x="120" y="54" textAnchor="middle" className="font-game" fontSize="12" fill="#2563EB">
            ① 2468을 백의 자리<tspan fill="#EA580C">까지</tspan> 반올림 (백 살리기!)
          </text>
          <text x="120" y="83" textAnchor="middle" className="font-game" fontSize="18" fill={INK}>
            24<tspan fill="#EA580C">6</tspan>8 (6↑ 올림) → <tspan fill="#2563EB">2500!</tspan>
          </text>

          {/* Case 2: 백의 자리에서 */}
          <rect x="14" y="112" width="212" height="68" rx="3" fill="#FFFFFF" stroke="#DC2626" strokeWidth="2.4" />
          <text x="120" y="132" textAnchor="middle" className="font-game" fontSize="12" fill="#DC2626">
            ② 2468을 백의 자리<tspan fill="#059669">에서</tspan> 반올림 (백을 처리!)
          </text>
          <text x="120" y="161" textAnchor="middle" className="font-game" fontSize="18" fill={INK}>
            2<tspan fill="#DC2626">4</tspan>68 (4↓ 버림) → <tspan fill="#DC2626">2000!</tspan>
          </text>

          <Stickman x={34} y={184} scale={0.5} pose="panic" sweat armL={[-12, 10]} armR={[14, 2]} />
          <text x="140" y="209" textAnchor="middle" className="font-game" fontSize="11.5" fill="#991B1B">
            ‘까지’=뒷자리 보기 · ‘에서’=그 자리 보기!
          </text>
        </svg>
      );
    }

    /* 12: 연쇄 반올림 함정! 996 → 1000 도미노! */
    case 'range_chain_carry_trap': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#FEF2F2')} />

          <text x="120" y="21" textAnchor="middle" className="font-game" fontSize="13" fill="#DC2626">
            996 십의 자리까지 반올림 = 도미노!!
          </text>

          <rect x="14" y="34" width="212" height="122" rx="3" fill="#FFFFFF" stroke="#DC2626" strokeWidth="2.2" />

          {/* Domino arrows: 6 up -> 9+1=10 -> 9+1=10 -> 1000 */}
          <text x="120" y="84" textAnchor="middle" className="font-game" fontSize="30" fill={INK}>
            9 9 <tspan fill="#EA580C">6</tspan>
          </text>
          <path d="M 142 56 Q 128 42 118 54" fill="none" stroke="#EA580C" strokeWidth="2.2" />
          <polygon points="122,49 116,56 125,55" fill="#EA580C" />
          <path d="M 114 56 Q 100 42 90 54" fill="none" stroke="#DC2626" strokeWidth="2.2" />
          <polygon points="94,49 88,56 97,55" fill="#DC2626" />

          <text x="120" y="114" textAnchor="middle" className="font-game" fontSize="12" fill="#EA580C">
            6↑ 올려서 9+1=10 → 앞 9도 9+1=10!
          </text>
          <text x="120" y="142" textAnchor="middle" className="font-game" fontSize="22" fill="#059669">
            정답: 1000!!
          </text>

          <text x="120" y="182" textAnchor="middle" className="font-game" fontSize="12" fill="#DC2626">
            ❌ 900 이나 9100 쓰면 대참사!
          </text>
          <text x="120" y="208" textAnchor="middle" className="font-game" fontSize="11.5" fill="#991B1B">
            9에 1 더해지면 자릿수 하나가 더 생겨 1000!
          </text>
        </svg>
      );
    }

    /* 13: 소수의 올림·버림·반올림 (첫째 자리까지) */
    case 'range_decimal_round': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#ECFDF5')} />

          <text x="120" y="21" textAnchor="middle" className="font-game" fontSize="13.5" fill="#047857">
            소수도 똑같아! (소수 첫째 자리까지)
          </text>

          <rect x="14" y="34" width="212" height="104" rx="3" fill="#FFFFFF" stroke="#059669" strokeWidth="2.2" />
          <text x="120" y="58" textAnchor="middle" className="font-game" fontSize="19" fill={INK}>
            4.3<tspan fill="#EA580C">7</tspan>
          </text>
          <text x="120" y="84" textAnchor="middle" className="font-game" fontSize="12.5" fill="#2563EB">
            올림 → <tspan fill="#059669">4.4</tspan>  |  버림 → <tspan fill="#2563EB">4.3</tspan>
          </text>
          <text x="120" y="110" textAnchor="middle" className="font-game" fontSize="13.5" fill="#EA580C">
            반올림 (둘째 자리 7↑) → 4.4!
          </text>

          <rect x="14" y="148" width="212" height="42" rx="3" fill="#FFFFFF" stroke="#D97706" strokeWidth="2" />
          <text x="120" y="174" textAnchor="middle" className="font-game" fontSize="12" fill="#B45309">
            ★ 3.96 반올림 → 4.<tspan fill="#94A3B8">0</tspan> → 끝 0 지워 4!
          </text>

          <text x="120" y="212" textAnchor="middle" className="font-game" fontSize="11.5" fill="#065F46">
            소수 첫째 자리까지라면 둘째 자리만 확인!
          </text>
        </svg>
      );
    }

    /* 14: 생활 속 선택! 언제 올림? 언제 버림? */
    case 'range_reallife_choice': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#ECFDF5')} />

          <text x="120" y="21" textAnchor="middle" className="font-game" fontSize="13.5" fill="#047857">
            실생활! 언제 올림? 언제 버림?
          </text>

          {/* Ceil case */}
          <rect x="14" y="34" width="212" height="68" rx="3" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2.2" />
          <text x="120" y="55" textAnchor="middle" className="font-game" fontSize="12" fill="#2563EB">
            ① 25명이 4인용 배에 <tspan fill="#DC2626">모두</tspan> 타려면?
          </text>
          <text x="120" y="83" textAnchor="middle" className="font-game" fontSize="13" fill={INK}>
            6척(24명)+1명 → <tspan fill="#059669">올림해서 7척!</tspan>
          </text>

          {/* Floor case */}
          <rect x="14" y="114" width="212" height="68" rx="3" fill="#FFFFFF" stroke="#EA580C" strokeWidth="2.2" />
          <text x="120" y="135" textAnchor="middle" className="font-game" fontSize="12" fill="#EA580C">
            ② 1350원으로 500원 연필 최대 몇 자루?
          </text>
          <text x="120" y="163" textAnchor="middle" className="font-game" fontSize="13" fill={INK}>
            350원 남음 → <tspan fill="#EA580C">버림해서 2자루!</tspan>
          </text>

          <text x="120" y="210" textAnchor="middle" className="font-game" fontSize="11.5" fill="#065F46">
            다 태우거나 담을 땐 올림 · 물건 살 땐 버림!
          </text>
        </svg>
      );
    }

    /* 15: 반올림해서 300이 되는 자연수의 범위! */
    case 'range_reverse_original': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#F5F3FF')} />

          <text x="120" y="21" textAnchor="middle" className="font-game" fontSize="12.5" fill="#5B21B6">
            백의 자리까지 반올림해서 300 되는 수!
          </text>

          <rect x="14" y="34" width="212" height="104" rx="3" fill="#FFFFFF" stroke="#7C3AED" strokeWidth="2.2" />
          <line x1="26" y1="86" x2="214" y2="86" stroke="#CBD5E1" strokeWidth="2" />
          <line x1="66" y1="86" x2="174" y2="86" stroke="#7C3AED" strokeWidth="5" />
          <circle cx="66" cy="86" r="6" fill="#7C3AED" stroke={INK} strokeWidth="2" />
          <circle cx="174" cy="86" r="6" fill="#FFFFFF" stroke="#DC2626" strokeWidth="2.4" />

          <text x="66" y="66" textAnchor="middle" className="font-game" fontSize="11" fill="#7C3AED">
            ● 250
          </text>
          <text x="120" y="66" textAnchor="middle" className="font-game" fontSize="12" fill="#059669">
            300
          </text>
          <text x="174" y="66" textAnchor="middle" className="font-game" fontSize="11" fill="#DC2626">
            ○ 350 (제외!)
          </text>

          <text x="120" y="118" textAnchor="middle" className="font-game" fontSize="12.5" fill="#5B21B6">
            250 이상 350 미만!
          </text>

          <rect x="14" y="148" width="212" height="42" rx="3" fill="#FFFFFF" stroke="#059669" strokeWidth="2" />
          <text x="120" y="174" textAnchor="middle" className="font-game" fontSize="12.5" fill="#047857">
            자연수: 250 이상 349 이하! (350은 400됨!)
          </text>

          <text x="120" y="214" textAnchor="middle" className="font-game" fontSize="11.5" fill="#5B21B6">
            가장 큰 자연수는 350이 아니라 349!
          </text>
        </svg>
      );
    }

    /* 16: 최종 보스! 수의 범위와 어림하기 3관문 */
    case 'range_boss': {
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
            범위·어림하기 최종 보스 3관문!
          </text>

          {/* Gate 1 */}
          <rect x="14" y="34" width="212" height="44" rx="4" fill="#FFFFFF" stroke={isLightPrint ? INK : '#FACC15'} strokeWidth="2" />
          <text x="26" y="61" className="font-game" fontSize="11" fill="#2563EB">
            1관문
          </text>
          <text x="116" y="61" textAnchor="middle" className="font-game" fontSize="12" fill={INK}>
            12 이상 15 미만 자연수
          </text>
          <rect x="178" y="43" width="38" height="26" rx="3" fill="#FEF9C3" stroke="#D97706" strokeWidth="1.8" strokeDasharray="3 2" />
          <text x="197" y="61" textAnchor="middle" className="font-game" fontSize="12" fill="#D97706">
            ?
          </text>

          {/* Gate 2 */}
          <rect x="14" y="85" width="212" height="44" rx="4" fill="#FFFFFF" stroke={isLightPrint ? INK : '#FACC15'} strokeWidth="2" />
          <text x="26" y="112" className="font-game" fontSize="11" fill="#059669">
            2관문
          </text>
          <text x="116" y="112" textAnchor="middle" className="font-game" fontSize="11.5" fill={INK}>
            2468 백의 자리‘에서’ 반올림
          </text>
          <rect x="178" y="94" width="38" height="26" rx="3" fill="#FEF9C3" stroke="#D97706" strokeWidth="1.8" strokeDasharray="3 2" />
          <text x="197" y="112" textAnchor="middle" className="font-game" fontSize="12" fill="#D97706">
            ?
          </text>

          {/* Gate 3 */}
          <rect x="14" y="136" width="212" height="44" rx="4" fill="#FFFFFF" stroke={isLightPrint ? INK : '#FACC15'} strokeWidth="2" />
          <text x="26" y="163" className="font-game" fontSize="11" fill="#DC2626">
            3관문
          </text>
          <text x="116" y="163" textAnchor="middle" className="font-game" fontSize="11.5" fill={INK}>
            25명 → 6인승 배 최소 몇 척?
          </text>
          <rect x="178" y="145" width="38" height="26" rx="3" fill="#FEF9C3" stroke="#D97706" strokeWidth="1.8" strokeDasharray="3 2" />
          <text x="197" y="163" textAnchor="middle" className="font-game" fontSize="12" fill="#D97706">
            ? 척
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

    /* 17: 5-2 수의 범위와 어림하기 완주 축하 포카! */
    case 'range_praise':
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
            fontSize="13.5"
            fill={isBw ? INK : isLightPrint ? '#B45309' : '#FACC15'}
          >
            5-2 수의 범위·어림 마스터!!
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
            이상·이하(●) + 초과·미만(○) + 반올림 정복!
          </text>

          <text
            x="120"
            y="214"
            textAnchor="middle"
            className="font-game"
            fontSize="12"
            fill={isBw ? INK : isLightPrint ? '#4338CA' : '#A7F3D0'}
          >
            축하해! 넌 공식 수의 범위·어림 챔피언!
          </text>
        </svg>
      );
    }
  }
};
