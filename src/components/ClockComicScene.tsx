import React from 'react';
import { EpisodeSceneType, PrintInkMode } from '../types/card';

interface ClockComicSceneProps {
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

/** Polar helper: angleDeg measured clockwise from 12 o'clock */
function clockPoint(cx: number, cy: number, radius: number, angleDeg: number): [number, number] {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return [cx + radius * Math.cos(rad), cy + radius * Math.sin(rad)];
}

interface AnalogClockProps {
  x: number;
  y: number;
  r: number;
  hour: number;
  min: number;
  show60Ticks?: boolean;
  highlightNums?: number[];
  hourColor?: string;
  minColor?: string;
  rimColor?: string;
  numSize?: number;
}

const AnalogClock: React.FC<AnalogClockProps> = ({
  x,
  y,
  r,
  hour,
  min,
  show60Ticks = false,
  highlightNums = [],
  hourColor = '#EA580C',
  minColor = '#2563EB',
  rimColor = INK,
  numSize,
}) => {
  const hourAngle = (hour % 12) * 30 + min * 0.5;
  const minAngle = min * 6;
  const [hx, hy] = clockPoint(x, y, r * 0.52, hourAngle);
  const [mx, my] = clockPoint(x, y, r * 0.78, minAngle);
  const labelFontSize = numSize ?? Math.max(8, r * 0.21);

  return (
    <g>
      <circle cx={x} cy={y} r={r} fill="#FFFFFF" stroke={rimColor} strokeWidth={Math.max(2, r * 0.065)} />
      {show60Ticks
        ? Array.from({ length: 60 }, (_, i) => {
            const isMajor = i % 5 === 0;
            const deg = i * 6;
            const [x1, y1] = clockPoint(x, y, r * (isMajor ? 0.85 : 0.9), deg);
            const [x2, y2] = clockPoint(x, y, r * 0.96, deg);
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={isMajor ? INK : '#64748B'}
                strokeWidth={isMajor ? 1.8 : 0.9}
                strokeLinecap="round"
              />
            );
          })
        : Array.from({ length: 12 }, (_, i) => {
            const deg = i * 30;
            const [x1, y1] = clockPoint(x, y, r * 0.86, deg);
            const [x2, y2] = clockPoint(x, y, r * 0.95, deg);
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={INK}
                strokeWidth={1.6}
                strokeLinecap="round"
              />
            );
          })}

      {Array.from({ length: 12 }, (_, idx) => {
        const num = idx === 0 ? 12 : idx;
        const [nx, ny] = clockPoint(x, y, r * 0.72, idx * 30);
        const isHi = highlightNums.includes(num);
        return (
          <text
            key={num}
            x={nx}
            y={ny + labelFontSize * 0.35}
            textAnchor="middle"
            className="font-game"
            fontSize={labelFontSize}
            fill={isHi ? '#DC2626' : INK}
          >
            {num}
          </text>
        );
      })}

      {/* Minute hand (long & sleek) */}
      <line
        x1={x}
        y1={y}
        x2={mx}
        y2={my}
        stroke={minColor}
        strokeWidth={Math.max(2, r * 0.055)}
        strokeLinecap="round"
      />
      {/* Hour hand (short & thick) */}
      <line
        x1={x}
        y1={y}
        x2={hx}
        y2={hy}
        stroke={hourColor}
        strokeWidth={Math.max(3.2, r * 0.095)}
        strokeLinecap="round"
      />
      <circle cx={x} cy={y} r={Math.max(2.6, r * 0.075)} fill={INK} />
    </g>
  );
};

/** Helper SVG arc path (clockwise from startDeg to endDeg, 0° = 12 o'clock) */
function clockArcPath(cx: number, cy: number, r: number, startDeg: number, endDeg: number): string {
  const [sx, sy] = clockPoint(cx, cy, r, startDeg);
  const [ex, ey] = clockPoint(cx, cy, r, endDeg);
  const sweep = endDeg >= startDeg ? endDeg - startDeg : 360 - startDeg + endDeg;
  const largeArc = sweep > 180 ? 1 : 0;
  return `M ${sx} ${sy} A ${r} ${r} 0 ${largeArc} 1 ${ex} ${ey}`;
}

export const ClockComicScene: React.FC<ClockComicSceneProps> = ({
  sceneType,
  inkMode = 'full',
}) => {
  const isLightPrint = inkMode !== 'full';
  const isBw = inkMode === 'bw_worksheet';
  const softBg = (color: string) => (isLightPrint ? '#FFFFFF' : color);

  switch (sceneType) {
    /* 00: 시각과 시간 도감 설명서 */
    case 'clock_guide': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#F0F9FF')} />
          <line x1="0" y1="192" x2="240" y2="192" stroke={INK} strokeWidth="2.4" />

          <text x="120" y="24" textAnchor="middle" className="font-game" fontSize="14.5" fill="#0369A1">
            2-2 시각과 시간 18장 도감!
          </text>

          <AnalogClock x={78} y={95} r={46} hour={3} min={0} show60Ticks highlightNums={[12, 3]} />

          {/* Mini Calendar */}
          <g transform="translate(154, 48)">
            <rect x="0" y="0" width="58" height="48" rx="3" fill="#FFFFFF" stroke={INK} strokeWidth="2.2" />
            <rect x="0" y="0" width="58" height="14" rx="2" fill="#EF4444" stroke={INK} strokeWidth="2.2" />
            <text x="29" y="10.5" textAnchor="middle" className="font-game" fontSize="8.5" fill="#FFFFFF">
              1년=12월
            </text>
            <text x="29" y="34" textAnchor="middle" className="font-game" fontSize="14" fill={INK}>
              31일
            </text>
            <text x="29" y="44" textAnchor="middle" className="font-body font-bold" fontSize="7.5" fill="#059669">
              1주=7일
            </text>
          </g>

          <Stickman
            x={178}
            y={132}
            scale={0.9}
            pose="hero"
            armL={[-20, 6]}
            armR={[18, 2]}
          />

          <rect x="16" y="156" width="122" height="28" rx="3" fill="#FFFFFF" stroke="#0284C7" strokeWidth="2" />
          <text x="77" y="174" textAnchor="middle" className="font-game" fontSize="10.5" fill="#0369A1">
            시계 + 60분 + 달력 코스!
          </text>

          <text x="120" y="214" textAnchor="middle" className="font-game" fontSize="11.5" fill="#0F172A">
            선수학습 3장부터 보스까지 완주하자!
          </text>
        </svg>
      );
    }

    /* 01: [선수학습] 시침 vs 분침 딱 구별! */
    case 'clock_hands_intro': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#EFF6FF')} />

          <text x="120" y="22" textAnchor="middle" className="font-game" fontSize="13.5" fill="#1D4ED8">
            짧은 시침 vs 긴 분침 구별!
          </text>

          <AnalogClock x={120} y={106} r={60} hour={3} min={5} show60Ticks highlightNums={[3, 1]} />

          {/* Orange callout for Hour Hand (short thick) */}
          <path d="M 150 112 L 178 134" stroke="#EA580C" strokeWidth="2.2" strokeLinecap="round" />
          <circle cx="150" cy="112" r="2.8" fill="#EA580C" />
          <text x="198" y="148" textAnchor="middle" className="font-game" fontSize="12" fill="#EA580C">
            짧고 굵은
          </text>
          <text x="198" y="164" textAnchor="middle" className="font-game" fontSize="12.5" fill="#EA580C">
            시침 (몇 시!)
          </text>

          {/* Blue callout for Minute Hand (long thin) */}
          <path d="M 134 65 L 170 46" stroke="#2563EB" strokeWidth="2.2" strokeLinecap="round" />
          <circle cx="134" cy="65" r="2.8" fill="#2563EB" />
          <text x="198" y="42" textAnchor="middle" className="font-game" fontSize="12" fill="#2563EB">
            길고 날씬
          </text>
          <text x="198" y="58" textAnchor="middle" className="font-game" fontSize="12.5" fill="#2563EB">
            분침 (몇 분!)
          </text>

          {/* Left mini Stickman pointing */}
          <Stickman x={34} y={122} scale={0.78} pose="happy" armL={[-12, 20]} armR={[16, 4]} />

          <rect x="18" y="184" width="204" height="32" rx="3" fill="#FFFFFF" stroke={INK} strokeWidth="2.2" />
          <text x="120" y="205" textAnchor="middle" className="font-game" fontSize="12" fill={INK}>
            <tspan fill="#EA580C">시침</tspan>=큰 숫자 1칸씩 · <tspan fill="#2563EB">분침</tspan>=작은 눈금 1칸씩!
          </text>
        </svg>
      );
    }

    /* 02: [선수학습] 정각과 몇 시 30분 읽기 */
    case 'clock_oclock_half': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#EFF6FF')} />

          <text x="120" y="21" textAnchor="middle" className="font-game" fontSize="13.5" fill="#1D4ED8">
            12는 정각! 6은 딱 반(30분)!
          </text>

          {/* Left clock: 3:00 */}
          <text x="64" y="45" textAnchor="middle" className="font-game" fontSize="12" fill="#0369A1">
            ① 3시 정각
          </text>
          <AnalogClock x={64} y={98} r={42} hour={3} min={0} highlightNums={[12, 3]} />
          <text x="64" y="158" textAnchor="middle" className="font-game" fontSize="11" fill="#2563EB">
            분침이 12 → 00분!
          </text>

          {/* Right clock: 3:30 */}
          <text x="176" y="45" textAnchor="middle" className="font-game" fontSize="12" fill="#059669">
            ② 3시 30분
          </text>
          <AnalogClock x={176} y={98} r={42} hour={3} min={30} highlightNums={[6, 3, 4]} />
          {/* Half circle dashed arc showing 30-min half turn */}
          <path
            d={clockArcPath(176, 98, 46, 0, 180)}
            fill="none"
            stroke="#10B981"
            strokeWidth="2.4"
            strokeDasharray="4 2"
          />
          <text x="176" y="158" textAnchor="middle" className="font-game" fontSize="11" fill="#059669">
            분침이 6 → 반 바퀴!
          </text>

          <rect x="14" y="176" width="212" height="38" rx="3" fill="#FFFFFF" stroke="#059669" strokeWidth="2.2" />
          <text x="120" y="193" textAnchor="middle" className="font-game" fontSize="11.5" fill="#EA580C">
            ★ 3시 30분엔 시침이 3과 4의 딱 중간!
          </text>
          <text x="120" y="208" textAnchor="middle" className="font-body font-bold" fontSize="9.5" fill={INK}>
            아직 4시 전이니까 꼭 ‘3시 30분’으로 읽어!
          </text>
        </svg>
      );
    }

    /* 03: [선수학습] 3시 50분인데 왜 4시 같지?! */
    case 'clock_hour_hand_trap': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#FFF7ED')} />

          <text x="120" y="22" textAnchor="middle" className="font-game" fontSize="13.5" fill="#DC2626">
            함정! 4시 같지만 아직 3시야!!
          </text>

          {/* 3:50 clock: hour hand at 115 deg (right before 4 at 120 deg) */}
          <AnalogClock x={78} y={102} r={54} hour={3} min={50} show60Ticks highlightNums={[3, 4, 10]} />

          {/* Red dashed boundary line at 4 o'clock (120 deg) */}
          {(() => {
            const [bx, by] = clockPoint(78, 102, 52, 120);
            return (
              <g>
                <line x1={78} y1={102} x2={bx} y2={by} stroke="#EF4444" strokeWidth="2" strokeDasharray="3 2" />
                <circle cx={bx} cy={by} r="6.5" fill="none" stroke="#EF4444" strokeWidth="2" />
              </g>
            );
          })()}

          <Stickman x={174} y={64} scale={0.78} pose="panic" sweat armL={[-16, 8]} armR={[16, 8]} />

          <rect x="140" y="114" width="90" height="58" rx="3" fill="#FFFFFF" stroke={INK} strokeWidth="2.2" />
          <text x="185" y="133" textAnchor="middle" className="font-game" fontSize="12" fill="#DC2626">
            ❌ 4시 50분
          </text>
          <line x1="150" y1="129" x2="220" y2="129" stroke="#DC2626" strokeWidth="2" />
          <text x="185" y="153" textAnchor="middle" className="font-game" fontSize="13" fill="#059669">
            ⭕ 3시 50분!
          </text>
          <text x="185" y="166" textAnchor="middle" className="font-body font-bold" fontSize="8.5" fill="#475569">
            4 문턱 안 넘었어!
          </text>

          <rect x="14" y="182" width="212" height="34" rx="3" fill="#FFFFFF" stroke="#EA580C" strokeWidth="2" />
          <text x="120" y="203" textAnchor="middle" className="font-game" fontSize="11" fill="#9A3412">
            분침이 10·11에 오면 시침은 다음 숫자 코앞!
          </text>
        </svg>
      );
    }

    /* 04: 긴 바늘은 5씩 점프! (5분 단위) */
    case 'clock_skip_5min': {
      const cx = 86;
      const cy = 110;
      const r = 52;
      const labels = [
        { num: 1, min: '5분', deg: 30 },
        { num: 2, min: '10분', deg: 60 },
        { num: 3, min: '15분', deg: 90 },
        { num: 4, min: '20분', deg: 120 },
      ];
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#ECFDF5')} />

          <text x="120" y="22" textAnchor="middle" className="font-game" fontSize="13.5" fill="#047857">
            분침은 5단 구구단 점프!!
          </text>

          <AnalogClock x={cx} y={cy} r={r} hour={4} min={20} show60Ticks highlightNums={[1, 2, 3, 4]} />

          {/* Outer +5 hop labels from 12 -> 1 -> 2 -> 3 -> 4 */}
          <path
            d={clockArcPath(cx, cy, r + 9, 0, 120)}
            fill="none"
            stroke="#10B981"
            strokeWidth="2.8"
            strokeDasharray="4 2"
          />
          {labels.map((item) => {
            const [lx, ly] = clockPoint(cx, cy, r + 21, item.deg);
            return (
              <text
                key={item.num}
                x={lx}
                y={ly + 3.5}
                textAnchor="middle"
                className="font-game"
                fontSize="10"
                fill="#047857"
              >
                {item.min}
              </text>
            );
          })}

          {/* Right formula box */}
          <rect x="156" y="44" width="76" height="92" rx="3" fill="#FFFFFF" stroke="#059669" strokeWidth="2.2" />
          <text x="194" y="64" textAnchor="middle" className="font-game" fontSize="11" fill="#059669">
            큰 숫자 × 5
          </text>
          <text x="194" y="88" textAnchor="middle" className="font-game" fontSize="15" fill="#2563EB">
            4 × 5 = 20
          </text>
          <line x1="166" y1="98" x2="222" y2="98" stroke="#CBD5E1" strokeWidth="1.5" />
          <text x="194" y="120" textAnchor="middle" className="font-game" fontSize="13" fill="#EA580C">
            4시 20분!
          </text>

          <Stickman x={194} y={162} scale={0.62} pose="happy" armL={[-14, 14]} armR={[16, 2]} />

          <text x="120" y="216" textAnchor="middle" className="font-game" fontSize="11.5" fill="#065F46">
            6→30분 · 9→45분! 구구단 5단이면 1초 컷!
          </text>
        </svg>
      );
    }

    /* 05: 몇 시 몇 분 (1분 단위 정확히 읽기) */
    case 'clock_1min_read': {
      const cx = 78;
      const cy = 104;
      const r = 56;
      const [p15x, p15y] = clockPoint(cx, cy, r * 0.92, 90);
      const [p17x, p17y] = clockPoint(cx, cy, r * 0.92, 102);
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#EFF6FF')} />

          <text x="120" y="21" textAnchor="middle" className="font-game" fontSize="13" fill="#1D4ED8">
            5단 점프 + 작은 눈금 1칸씩!
          </text>

          <AnalogClock x={cx} y={cy} r={r} hour={2} min={17} show60Ticks highlightNums={[2, 3]} />

          {/* Highlight arc from 12->3 (15min) in blue and 3->17min (+2) in orange */}
          <path d={clockArcPath(cx, cy, r + 6, 0, 90)} fill="none" stroke="#2563EB" strokeWidth="3" />
          <path d={clockArcPath(cx, cy, r + 6, 90, 102)} fill="none" stroke="#EA580C" strokeWidth="4" />
          <circle cx={p15x} cy={p15y} r="3" fill="#2563EB" />
          <circle cx={p17x} cy={p17y} r="3.4" fill="#EA580C" />

          {/* Step-by-step right panel */}
          <rect x="145" y="42" width="87" height="124" rx="3" fill="#FFFFFF" stroke={INK} strokeWidth="2.2" />
          <text x="188" y="61" textAnchor="middle" className="font-game" fontSize="10.5" fill="#EA580C">
            시침: 2와 3 사이
          </text>
          <text x="188" y="77" textAnchor="middle" className="font-game" fontSize="12" fill={INK}>
            → 2시!
          </text>
          <line x1="154" y1="86" x2="224" y2="86" stroke="#E2E8F0" strokeWidth="1.5" />
          <text x="188" y="103" textAnchor="middle" className="font-game" fontSize="10.5" fill="#2563EB">
            ① 3까지 15분
          </text>
          <text x="188" y="121" textAnchor="middle" className="font-game" fontSize="10.5" fill="#EA580C">
            ② +2칸 → 17분!
          </text>
          <line x1="154" y1="130" x2="224" y2="130" stroke="#E2E8F0" strokeWidth="1.5" />
          <text x="188" y="153" textAnchor="middle" className="font-game" fontSize="14.5" fill="#047857">
            2시 17분!
          </text>

          <text x="120" y="206" textAnchor="middle" className="font-game" fontSize="11.5" fill="#1E3A8A">
            큰 숫자까지 5씩 세고, 남은 눈금 16, 17!
          </text>
        </svg>
      );
    }

    /* 06: ‘몇 시 몇 분 전’ 거꾸로 읽기 치트키 */
    case 'clock_minutes_before': {
      const cx = 78;
      const cy = 104;
      const r = 54;
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#ECFDF5')} />

          <text x="120" y="21" textAnchor="middle" className="font-game" fontSize="13.5" fill="#047857">
            12까지 몇 분 남았나? 거꾸로 읽기!
          </text>

          <AnalogClock x={cx} y={cy} r={r} hour={4} min={55} show60Ticks highlightNums={[11, 12, 5]} />

          {/* Bright green arc from 11 (330 deg) to 12 (360 deg) */}
          <path d={clockArcPath(cx, cy, r + 7, 330, 360)} fill="none" stroke="#10B981" strokeWidth="4.5" />
          <text x={52} y={38} textAnchor="middle" className="font-game" fontSize="11.5" fill="#059669">
            딱 5분 전!
          </text>

          <rect x="144" y="46" width="88" height="114" rx="3" fill="#FFFFFF" stroke="#059669" strokeWidth="2.2" />
          <text x="188" y="68" textAnchor="middle" className="font-game" fontSize="12.5" fill={INK}>
            4시 55분
          </text>
          <text x="188" y="88" textAnchor="middle" className="font-game" fontSize="14" fill="#059669">
            =
          </text>
          <text x="188" y="109" textAnchor="middle" className="font-game" fontSize="13" fill="#EA580C">
            5시 5분 전!
          </text>
          <line x1="154" y1="120" x2="222" y2="120" stroke="#E2E8F0" strokeWidth="1.5" />
          <text x="188" y="137" textAnchor="middle" className="font-body font-bold" fontSize="9.5" fill="#475569">
            4시 50분은?
          </text>
          <text x="188" y="151" textAnchor="middle" className="font-game" fontSize="10.5" fill="#2563EB">
            5시 10분 전!
          </text>

          <text x="120" y="206" textAnchor="middle" className="font-game" fontSize="11.5" fill="#065F46">
            12까지 거꾸로 세면 ‘~분 전’ 한 방에 끝!
          </text>
        </svg>
      );
    }

    /* 07: ‘3시 50분’을 ‘3시 10분 전’이라 하면 땡! */
    case 'clock_before_trap': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#FEF2F2')} />

          <text x="120" y="21" textAnchor="middle" className="font-game" fontSize="12.5" fill="#DC2626">
            ‘~분 전’은 앞으로 올 다음 시각 기준!
          </text>

          {/* Left: 3:50 = 4시 10분 전 */}
          <rect x="12" y="34" width="102" height="132" rx="3" fill="#FFFFFF" stroke="#059669" strokeWidth="2.2" />
          <AnalogClock x={63} y={78} r={34} hour={3} min={50} highlightNums={[3, 4, 10]} />
          <text x="63" y="128" textAnchor="middle" className="font-game" fontSize="11.5" fill={INK}>
            3시 50분
          </text>
          <text x="63" y="146" textAnchor="middle" className="font-game" fontSize="11.5" fill="#059669">
            ⭕ 4시 10분 전!
          </text>
          <text x="63" y="159" textAnchor="middle" className="font-body font-bold" fontSize="8.5" fill="#475569">
            (곧 4시가 되니까!)
          </text>

          {/* Right: 2:50 = 3시 10분 전 */}
          <rect x="126" y="34" width="102" height="132" rx="3" fill="#FFFFFF" stroke="#DC2626" strokeWidth="2.2" />
          <AnalogClock x={177} y={78} r={34} hour={2} min={50} highlightNums={[2, 3, 10]} />
          <text x="177" y="128" textAnchor="middle" className="font-game" fontSize="11.5" fill={INK}>
            2시 50분
          </text>
          <text x="177" y="146" textAnchor="middle" className="font-game" fontSize="11.5" fill="#DC2626">
            = 3시 10분 전!
          </text>
          <text x="177" y="159" textAnchor="middle" className="font-body font-bold" fontSize="8.5" fill="#DC2626">
            (3시 50분이 아님!)
          </text>

          <Stickman x={34} y={180} scale={0.56} pose="panic" sweat armL={[-12, 12]} armR={[14, 4]} />
          <text x="136" y="205" textAnchor="middle" className="font-game" fontSize="11.5" fill="#991B1B">
            3시 50분을 3시 10분 전이라 쓰면 땡!!
          </text>
        </svg>
      );
    }

    /* 08: 1시간 = 60분! 분침 한 바퀴 마법 */
    case 'clock_hour_60min': {
      const cx = 74;
      const cy = 104;
      const r = 50;
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#FFFBEB')} />

          <text x="120" y="22" textAnchor="middle" className="font-game" fontSize="14" fill="#B45309">
            1시간 = 60분! (100분 아님!)
          </text>

          <AnalogClock x={cx} y={cy} r={r} hour={2} min={0} show60Ticks highlightNums={[1, 2, 12]} />

          {/* Full 360 sweep arrow around clock */}
          <path d={clockArcPath(cx, cy, r + 9, 10, 345)} fill="none" stroke="#2563EB" strokeWidth="3" />
          <polygon points="62,43 70,40 68,48" fill="#2563EB" />
          <text x={cx} y={175} textAnchor="middle" className="font-game" fontSize="11" fill="#2563EB">
            분침 1바퀴 = 60칸!
          </text>

          {/* Hour 1->2 arc */}
          <path d={clockArcPath(cx, cy, r * 0.52, 30, 60)} fill="none" stroke="#EA580C" strokeWidth="3" />

          {/* Conversion cards */}
          <rect x="138" y="42" width="92" height="122" rx="3" fill="#FFFFFF" stroke="#D97706" strokeWidth="2.2" />
          <text x="184" y="64" textAnchor="middle" className="font-game" fontSize="13.5" fill="#B45309">
            1시간 = 60분
          </text>
          <line x1="146" y1="74" x2="222" y2="74" stroke="#FDE68A" strokeWidth="1.5" />
          <text x="184" y="96" textAnchor="middle" className="font-game" fontSize="11" fill={INK}>
            1시간 20분
          </text>
          <text x="184" y="113" textAnchor="middle" className="font-game" fontSize="11.5" fill="#059669">
            = 60+20 = 80분
          </text>
          <line x1="146" y1="122" x2="222" y2="122" stroke="#FDE68A" strokeWidth="1.5" />
          <text x="184" y="141" textAnchor="middle" className="font-game" fontSize="11" fill={INK}>
            90분 =
          </text>
          <text x="184" y="157" textAnchor="middle" className="font-game" fontSize="11.5" fill="#2563EB">
            1시간 30분!
          </text>

          <text x="120" y="210" textAnchor="middle" className="font-game" fontSize="11.5" fill="#92400E">
            분침이 60칸 돌면 시침은 딱 큰 숫자 1칸!
          </text>
        </svg>
      );
    }

    /* 09: ‘시각’과 ‘시간’ 차이 1초 구별! */
    case 'clock_time_vs_duration': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#EFF6FF')} />

          <text x="120" y="22" textAnchor="middle" className="font-game" fontSize="13.5" fill="#1D4ED8">
            시각(딱 한 순간) vs 시간(길이)!
          </text>

          {/* Top panel: 시각 = point */}
          <rect x="14" y="34" width="212" height="72" rx="3" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2.2" />
          <AnalogClock x={48} y={70} r={24} hour={3} min={10} />
          <line x1="88" y1="78" x2="210" y2="78" stroke="#CBD5E1" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="148" cy="78" r="6" fill="#EF4444" stroke={INK} strokeWidth="2" />
          <text x="148" y="54" textAnchor="middle" className="font-game" fontSize="12.5" fill="#DC2626">
            ① 시각 = 찰칵! 한 점!
          </text>
          <text x="148" y="98" textAnchor="middle" className="font-body font-bold" fontSize="9.5" fill="#1D4ED8">
            “지금 3시 10분!”
          </text>

          {/* Bottom panel: 시간 = length */}
          <rect x="14" y="118" width="212" height="76" rx="3" fill="#FFFFFF" stroke="#059669" strokeWidth="2.2" />
          <text x="120" y="138" textAnchor="middle" className="font-game" fontSize="12.5" fill="#059669">
            ② 시간 = 여기서 저기까지 길이!
          </text>
          <line x1="44" y1="166" x2="196" y2="166" stroke="#10B981" strokeWidth="5" strokeLinecap="round" />
          <circle cx="44" cy="166" r="5" fill="#FFFFFF" stroke="#059669" strokeWidth="2.4" />
          <circle cx="196" cy="166" r="5" fill="#FFFFFF" stroke="#059669" strokeWidth="2.4" />
          <text x="44" y="185" textAnchor="middle" className="font-game" fontSize="10" fill={INK}>
            3시
          </text>
          <text x="120" y="158" textAnchor="middle" className="font-game" fontSize="11.5" fill="#047857">
            ← 1시간 동안 →
          </text>
          <text x="196" y="185" textAnchor="middle" className="font-game" fontSize="10" fill={INK}>
            4시
          </text>

          <text x="120" y="216" textAnchor="middle" className="font-game" fontSize="11.5" fill="#0F172A">
            몇 시야?(시각) · 얼마나 걸렸어?(시간)
          </text>
        </svg>
      );
    }

    /* 10: 걸린 시간 구하기 (정각 징검다리) */
    case 'clock_elapsed_time': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#ECFDF5')} />

          <text x="120" y="22" textAnchor="middle" className="font-game" fontSize="13.5" fill="#047857">
            걸린 시간: 정각 징검다리 건너기!
          </text>

          {/* River backdrop */}
          <rect x="0" y="114" width="240" height="58" fill={isLightPrint ? '#F8FAFC' : '#BAE6FD'} opacity="0.65" />

          {/* Hop 1 arc: 2:40 -> 3:00 */}
          <path d="M 42 126 Q 81 74 120 120" fill="none" stroke="#2563EB" strokeWidth="3" strokeDasharray="4 2" />
          <polygon points="115,113 122,121 112,121" fill="#2563EB" />
          <text x="80" y="88" textAnchor="middle" className="font-game" fontSize="13" fill="#1D4ED8">
            +20분
          </text>

          {/* Hop 2 arc: 3:00 -> 3:15 */}
          <path d="M 120 120 Q 159 74 198 126" fill="none" stroke="#EA580C" strokeWidth="3" strokeDasharray="4 2" />
          <polygon points="193,119 200,127 190,127" fill="#EA580C" />
          <text x="160" y="88" textAnchor="middle" className="font-game" fontSize="13" fill="#EA580C">
            +15분
          </text>

          {/* 3 Stepping Stones */}
          <ellipse cx="42" cy="144" rx="34" ry="16" fill="#FFFFFF" stroke={INK} strokeWidth="2.2" />
          <text x="42" y="148" textAnchor="middle" className="font-game" fontSize="11.5" fill={INK}>
            2시 40분
          </text>

          <ellipse cx="120" cy="138" rx="34" ry="18" fill="#FEF08A" stroke="#D97706" strokeWidth="2.4" />
          <text x="120" y="136" textAnchor="middle" className="font-game" fontSize="11.5" fill="#B45309">
            3시 정각
          </text>
          <text x="120" y="150" textAnchor="middle" className="font-body font-bold" fontSize="8" fill="#92400E">
            징검다리!
          </text>

          <ellipse cx="198" cy="144" rx="34" ry="16" fill="#FFFFFF" stroke={INK} strokeWidth="2.2" />
          <text x="198" y="148" textAnchor="middle" className="font-game" fontSize="11.5" fill={INK}>
            3시 15분
          </text>

          <Stickman x={120} y={56} scale={0.58} pose="happy" armL={[-16, 6]} armR={[16, 6]} />

          <rect x="18" y="182" width="204" height="32" rx="3" fill="#FFFFFF" stroke="#059669" strokeWidth="2.2" />
          <text x="120" y="203" textAnchor="middle" className="font-game" fontSize="13.5" fill="#047857">
            20분 + 15분 = 총 35분 걸림!
          </text>
        </svg>
      );
    }

    /* 11: 시간 뺄셈 함정! 100이 아니라 60 빌려와! */
    case 'clock_60_borrow_trap': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#FEF2F2')} />

          <text x="120" y="21" textAnchor="middle" className="font-game" fontSize="12.5" fill="#DC2626">
            받아내림! 100 말고 60 빌려와!
          </text>

          {/* Vertical subtraction board */}
          <rect x="14" y="34" width="144" height="140" rx="3" fill="#FFFFFF" stroke={INK} strokeWidth="2.4" />

          {/* Borrowed 2 and +60=70 above */}
          <text x="58" y="56" textAnchor="middle" className="font-game" fontSize="14" fill="#2563EB">
            2
          </text>
          <text x="114" y="56" textAnchor="middle" className="font-game" fontSize="13" fill="#059669">
            +60 → 70
          </text>
          <path d="M 66 52 Q 86 38 98 48" fill="none" stroke="#059669" strokeWidth="2" />

          {/* Top row: 3시 10분 */}
          <text x="58" y="84" textAnchor="middle" className="font-game" fontSize="18" fill={INK}>
            3시
          </text>
          <line x1="46" y1="68" x2="66" y2="86" stroke="#EF4444" strokeWidth="2.4" />
          <text x="116" y="84" textAnchor="middle" className="font-game" fontSize="18" fill={INK}>
            10분
          </text>
          <line x1="102" y1="68" x2="128" y2="86" stroke="#EF4444" strokeWidth="2.4" />

          {/* Second row: - 2시 40분 */}
          <text x="27" y="114" textAnchor="middle" className="font-game" fontSize="18" fill={INK}>
            -
          </text>
          <text x="58" y="114" textAnchor="middle" className="font-game" fontSize="18" fill={INK}>
            2시
          </text>
          <text x="116" y="114" textAnchor="middle" className="font-game" fontSize="18" fill={INK}>
            40분
          </text>

          <line x1="22" y1="126" x2="148" y2="126" stroke={INK} strokeWidth="2.6" />

          {/* Result: 30분 */}
          <text x="116" y="156" textAnchor="middle" className="font-game" fontSize="22" fill="#059669">
            30분!
          </text>

          {/* Right: Jollaman punching out 100 */}
          <Stickman x={196} y={78} scale={0.78} pose="punch" armL={[-16, 12]} armR={[-6, 34]} />
          <text x="196" y="154" textAnchor="middle" className="font-game" fontSize="18" fill="#94A3B8">
            +100
          </text>
          <line x1="176" y1="138" x2="216" y2="160" stroke="#EF4444" strokeWidth="3.2" />
          <line x1="216" y1="138" x2="176" y2="160" stroke="#EF4444" strokeWidth="3.2" />
          <text x="196" y="175" textAnchor="middle" className="font-game" fontSize="10" fill="#DC2626">
            100 땡!!
          </text>

          <text x="120" y="206" textAnchor="middle" className="font-game" fontSize="11.5" fill="#991B1B">
            1시간 빌려오면 +60분! (60+10=70분!)
          </text>
        </svg>
      );
    }

    /* 12: 하루는 24시간! 오전과 오후 */
    case 'clock_am_pm_24h': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#FFFBEB')} />

          <text x="120" y="21" textAnchor="middle" className="font-game" fontSize="13.5" fill="#B45309">
            하루 = 오전 12 + 오후 12 = 24시간!
          </text>

          {/* Left: 오전 (Moon -> Sun, 1st lap) */}
          <rect x="12" y="34" width="102" height="122" rx="3" fill="#FFFFFF" stroke="#0284C7" strokeWidth="2.2" />
          <text x="63" y="54" textAnchor="middle" className="font-game" fontSize="13" fill="#0369A1">
            오전 (1바퀴)
          </text>
          <AnalogClock x={63} y={96} r={28} hour={12} min={0} />
          <path d={clockArcPath(63, 96, 33, 15, 345)} fill="none" stroke="#38BDF8" strokeWidth="2.4" />
          <text x="63" y="144" textAnchor="middle" className="font-game" fontSize="10.5" fill="#0369A1">
            밤 12시~낮 12시
          </text>

          {/* Plus sign */}
          <text x="120" y="102" textAnchor="middle" className="font-game" fontSize="16" fill="#EA580C">
            +
          </text>

          {/* Right: 오후 (Sun -> Moon, 2nd lap) */}
          <rect x="126" y="34" width="102" height="122" rx="3" fill="#FFFFFF" stroke="#EA580C" strokeWidth="2.2" />
          <text x="177" y="54" textAnchor="middle" className="font-game" fontSize="13" fill="#C2410C">
            오후 (2바퀴)
          </text>
          <AnalogClock x={177} y={96} r={28} hour={12} min={0} />
          <path d={clockArcPath(177, 96, 33, 15, 345)} fill="none" stroke="#F97316" strokeWidth="2.4" />
          <text x="177" y="144" textAnchor="middle" className="font-game" fontSize="10.5" fill="#C2410C">
            낮 12시~밤 12시
          </text>

          <rect x="20" y="170" width="200" height="44" rx="3" fill="#FFFFFF" stroke="#D97706" strokeWidth="2.2" />
          <text x="120" y="191" textAnchor="middle" className="font-game" fontSize="13.5" fill="#B45309">
            12시간 + 12시간 = 하루 24시간!
          </text>
          <text x="120" y="207" textAnchor="middle" className="font-body font-bold" fontSize="9.5" fill={INK}>
            시침이 하루에 2바퀴 돌아야 하루 끝!
          </text>
        </svg>
      );
    }

    /* 13: 달력 단위! 1주일과 1년 */
    case 'clock_week_year': {
      const days = ['월', '화', '수', '목', '금', '토', '일'];
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#EFF6FF')} />

          <text x="120" y="21" textAnchor="middle" className="font-game" fontSize="13.5" fill="#1D4ED8">
            달력 공식! 1주=7일 · 1년=12개월
          </text>

          {/* Top Card: 1주 = 7일 */}
          <rect x="14" y="34" width="212" height="76" rx="3" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2.2" />
          <text x="120" y="52" textAnchor="middle" className="font-game" fontSize="12" fill="#1D4ED8">
            1주일 = 딱 7일! (7단)
          </text>
          {days.map((d, i) => {
            const dx = 28 + i * 27;
            const isWeekend = i >= 5;
            return (
              <g key={d} transform={`translate(${dx}, 60)`}>
                <rect
                  x="0"
                  y="0"
                  width="22"
                  height="22"
                  rx="2"
                  fill={isWeekend ? '#FEE2E2' : '#EFF6FF'}
                  stroke={isWeekend ? '#EF4444' : '#2563EB'}
                  strokeWidth="1.5"
                />
                <text
                  x="11"
                  y="15"
                  textAnchor="middle"
                  className="font-game"
                  fontSize="11"
                  fill={isWeekend ? '#DC2626' : '#1E40AF'}
                >
                  {d}
                </text>
              </g>
            );
          })}
          <text x="120" y="101" textAnchor="middle" className="font-game" fontSize="10.5" fill="#059669">
            2주일 3일 = 14 + 3 = 17일!
          </text>

          {/* Bottom Card: 1년 = 12개월 */}
          <rect x="14" y="122" width="212" height="76" rx="3" fill="#FFFFFF" stroke="#059669" strokeWidth="2.2" />
          <text x="120" y="140" textAnchor="middle" className="font-game" fontSize="12" fill="#047857">
            1년 = 1월 ~ 12월 = 12개월!
          </text>
          <g transform="translate(24, 148)">
            {Array.from({ length: 12 }, (_, m) => (
              <g key={m} transform={`translate(${m * 16.2}, 0)`}>
                <rect x="0" y="0" width="14" height="20" rx="1.5" fill="#ECFDF5" stroke="#10B981" strokeWidth="1.2" />
                <text x="7" y="13.5" textAnchor="middle" className="font-game" fontSize="8.5" fill="#065F46">
                  {m + 1}
                </text>
              </g>
            ))}
          </g>
          <text x="120" y="189" textAnchor="middle" className="font-game" fontSize="10.5" fill="#EA580C">
            1년 4개월 = 12 + 4 = 16개월!
          </text>

          <text x="120" y="218" textAnchor="middle" className="font-game" fontSize="11" fill={INK}>
            주→×7, 년→×12 하면 날짜 변환 성공!
          </text>
        </svg>
      );
    }

    /* 14: 31일 vs 30일! 주먹 마디 치트키 */
    case 'clock_knuckle_months': {
      // Knuckle heights: up=peak (31), down=valley (30/28)
      const leftHand = [
        { m: '1월', days: '31', up: true },
        { m: '2월', days: '28·29', up: false, feb: true },
        { m: '3월', days: '31', up: true },
        { m: '4월', days: '30', up: false },
        { m: '5월', days: '31', up: true },
        { m: '6월', days: '30', up: false },
        { m: '7월', days: '31', up: true },
      ];
      const rightHand = [
        { m: '8월', days: '31', up: true },
        { m: '9월', days: '30', up: false },
        { m: '10월', days: '31', up: true },
        { m: '11월', days: '30', up: false },
        { m: '12월', days: '31', up: true },
      ];
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#ECFDF5')} />

          <text x="120" y="21" textAnchor="middle" className="font-game" fontSize="13.5" fill="#047857">
            주먹 뼈 볼록=31일 · 쏙=30일!
          </text>

          {/* Knuckle wave line (Jan-Jul) */}
          <polyline
            points="24,62 54,94 84,62 114,94 144,62 174,94 204,62"
            fill="none"
            stroke="#059669"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          {leftHand.map((item, idx) => {
            const px = 24 + idx * 30;
            const py = item.up ? 62 : 94;
            return (
              <g key={item.m}>
                <circle
                  cx={px}
                  cy={py}
                  r="11"
                  fill={item.up ? '#FEF08A' : item.feb ? '#DBEAFE' : '#FFFFFF'}
                  stroke={item.up ? '#EA580C' : item.feb ? '#2563EB' : '#64748B'}
                  strokeWidth="2"
                />
                <text x={px} y={py + 3.5} textAnchor="middle" className="font-game" fontSize="9.5" fill={INK}>
                  {item.m}
                </text>
                <text
                  x={px}
                  y={item.up ? py - 15 : py + 21}
                  textAnchor="middle"
                  className="font-game"
                  fontSize="8.5"
                  fill={item.up ? '#DC2626' : item.feb ? '#1D4ED8' : '#475569'}
                >
                  {item.days}
                </text>
              </g>
            );
          })}

          {/* Second knuckle wave (Aug-Dec) */}
          <polyline
            points="44,148 79,176 114,148 149,176 184,148"
            fill="none"
            stroke="#059669"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          {rightHand.map((item, idx) => {
            const px = 44 + idx * 35;
            const py = item.up ? 148 : 176;
            return (
              <g key={item.m}>
                <circle
                  cx={px}
                  cy={py}
                  r="11"
                  fill={item.up ? '#FEF08A' : '#FFFFFF'}
                  stroke={item.up ? '#EA580C' : '#64748B'}
                  strokeWidth="2"
                />
                <text x={px} y={py + 3.5} textAnchor="middle" className="font-game" fontSize="9" fill={INK}>
                  {item.m}
                </text>
                <text
                  x={px}
                  y={item.up ? py - 14 : py + 20}
                  textAnchor="middle"
                  className="font-game"
                  fontSize="8.5"
                  fill={item.up ? '#DC2626' : '#475569'}
                >
                  {item.days}
                </text>
              </g>
            );
          })}

          <text x="120" y="218" textAnchor="middle" className="font-game" fontSize="11" fill="#065F46">
            ★ 7·8월 연속 볼록(31일) · 2월만 28·29일!
          </text>
        </svg>
      );
    }

    /* 15: 몇 시 몇 분 전·후 시각 추리하기 */
    case 'clock_before_after_puzzle': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#F5F3FF')} />

          <text x="120" y="21" textAnchor="middle" className="font-game" fontSize="12.5" fill="#5B21B6">
            “4시 10분에서 35분 전 시각은?”
          </text>

          {/* Reverse jump arrows (right -> middle -> left) */}
          <path d="M 196 106 Q 158 58 120 100" fill="none" stroke="#7C3AED" strokeWidth="3" strokeDasharray="4 2" />
          <polygon points="127,93 118,101 128,102" fill="#7C3AED" />
          <text x="160" y="68" textAnchor="middle" className="font-game" fontSize="12.5" fill="#7C3AED">
            -10분
          </text>

          <path d="M 120 100 Q 82 58 44 106" fill="none" stroke="#EA580C" strokeWidth="3" strokeDasharray="4 2" />
          <polygon points="51,99 42,107 52,108" fill="#EA580C" />
          <text x="80" y="68" textAnchor="middle" className="font-game" fontSize="12.5" fill="#EA580C">
            -25분
          </text>

          {/* Boxes: Left Answer <- Mid O'clock <- Right Start */}
          <rect x="10" y="114" width="68" height="44" rx="3" fill="#FEF08A" stroke="#EA580C" strokeWidth="2.4" />
          <text x="44" y="133" textAnchor="middle" className="font-game" fontSize="12" fill="#DC2626">
            3시 35분!
          </text>
          <text x="44" y="149" textAnchor="middle" className="font-body font-bold" fontSize="8.5" fill="#9A3412">
            60-25=35분
          </text>

          <rect x="86" y="110" width="68" height="44" rx="3" fill="#FFFFFF" stroke="#7C3AED" strokeWidth="2.2" />
          <text x="120" y="131" textAnchor="middle" className="font-game" fontSize="12" fill="#5B21B6">
            4시 정각
          </text>
          <text x="120" y="146" textAnchor="middle" className="font-body font-bold" fontSize="8.5" fill="#64748B">
            (60분)
          </text>

          <rect x="162" y="114" width="68" height="44" rx="3" fill="#FFFFFF" stroke={INK} strokeWidth="2.2" />
          <text x="196" y="134" textAnchor="middle" className="font-game" fontSize="12" fill={INK}>
            4시 10분
          </text>
          <text x="196" y="149" textAnchor="middle" className="font-body font-bold" fontSize="8.5" fill="#64748B">
            출발!
          </text>

          <Stickman x={196} y={56} scale={0.56} pose="headband" armL={[-16, 4]} armR={[14, 14]} />

          <rect x="18" y="172" width="204" height="40" rx="3" fill="#FFFFFF" stroke="#7C3AED" strokeWidth="2" />
          <text x="120" y="190" textAnchor="middle" className="font-game" fontSize="11" fill="#5B21B6">
            35분 = ① 10분 먼저 빼고(4시) ② 남은 25분 빼기!
          </text>
          <text x="120" y="205" textAnchor="middle" className="font-game" fontSize="11.5" fill="#EA580C">
            정각 먼저 맞추면 거꾸로 시간도 1초 컷!
          </text>
        </svg>
      );
    }

    /* 16: 최종 보스! 시각과 시간 3관문 */
    case 'clock_boss': {
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
            시각과 시간 최종 보스 3관문!
          </text>

          {/* Gate 1: Analog clock 6:45 */}
          <rect x="14" y="34" width="212" height="48" rx="4" fill="#FFFFFF" stroke={isLightPrint ? INK : '#FACC15'} strokeWidth="2" />
          <text x="26" y="62" className="font-game" fontSize="11" fill="#2563EB">
            1관문
          </text>
          <AnalogClock x={96} y={58} r={20} hour={6} min={45} numSize={5.5} />
          <text x="146" y="62" textAnchor="middle" className="font-game" fontSize="11" fill={INK}>
            몇 시 몇 분?
          </text>
          <rect x="184" y="45" width="34" height="26" rx="3" fill="#FEF9C3" stroke="#D97706" strokeWidth="1.8" strokeDasharray="3 2" />
          <text x="201" y="63" textAnchor="middle" className="font-game" fontSize="13" fill="#D97706">
            ?
          </text>

          {/* Gate 2: 1시간 40분 = ?분 */}
          <rect x="14" y="88" width="212" height="42" rx="4" fill="#FFFFFF" stroke={isLightPrint ? INK : '#FACC15'} strokeWidth="2" />
          <text x="26" y="113" className="font-game" fontSize="11" fill="#059669">
            2관문
          </text>
          <text x="112" y="114" textAnchor="middle" className="font-game" fontSize="13.5" fill={INK}>
            1시간 40분 =
          </text>
          <rect x="166" y="96" width="46" height="26" rx="3" fill="#FEF9C3" stroke="#D97706" strokeWidth="1.8" strokeDasharray="3 2" />
          <text x="189" y="114" textAnchor="middle" className="font-game" fontSize="12" fill="#D97706">
            ? 분
          </text>

          {/* Gate 3: 9시 50분 ~ 10시 25분 */}
          <rect x="14" y="136" width="212" height="42" rx="4" fill="#FFFFFF" stroke={isLightPrint ? INK : '#FACC15'} strokeWidth="2" />
          <text x="26" y="161" className="font-game" fontSize="11" fill="#DC2626">
            3관문
          </text>
          <text x="116" y="162" textAnchor="middle" className="font-game" fontSize="11.5" fill={INK}>
            9시50분 ~ 10시25분
          </text>
          <rect x="174" y="144" width="42" height="26" rx="3" fill="#FEF9C3" stroke="#D97706" strokeWidth="1.8" strokeDasharray="3 2" />
          <text x="195" y="162" textAnchor="middle" className="font-game" fontSize="12" fill="#D97706">
            ? 분
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

    /* 17: 2-2 시각과 시간 완주 축하 포카! */
    case 'clock_praise':
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
            2-2 시각과 시간 마스터!!
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

          <AnalogClock x={44} y={108} r={22} hour={10} min={10} numSize={5.5} />
          <g transform="translate(178, 86)">
            <rect x="0" y="0" width="38" height="36" rx="3" fill="#FFFFFF" stroke={INK} strokeWidth="2" />
            <rect x="0" y="0" width="38" height="11" rx="2" fill="#EF4444" stroke={INK} strokeWidth="2" />
            <text x="19" y="28" textAnchor="middle" className="font-game" fontSize="11" fill="#059669">
              24h
            </text>
          </g>

          <rect x="16" y="156" width="208" height="32" rx="4" fill="#FFFFFF" stroke={isLightPrint ? INK : '#FACC15'} strokeWidth="2.2" />
          <text x="120" y="176" textAnchor="middle" className="font-game" fontSize="10.8" fill="#047857">
            시침·분침 → ~분 전 → 60분 → 달력 완전 정복!
          </text>

          <text
            x="120"
            y="214"
            textAnchor="middle"
            className="font-game"
            fontSize="12"
            fill={isBw ? INK : isLightPrint ? '#4338CA' : '#A7F3D0'}
          >
            축하해! 넌 공식 시계·시간 챔피언!
          </text>
        </svg>
      );
    }
  }
};
