import React from 'react';
import { EpisodeSceneType, PrintInkMode } from '../types/card';

interface Clock1ComicSceneProps {
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
          <path d="M -7 -3 Q -4.5 -6 -2 -3" fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" />
          <path d="M 2 -3 Q 4.5 -6 7 -3" fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" />
          <path d="M -5 3 Q 0 10 5 3 Z" fill="#FCA5A5" stroke={INK} strokeWidth="1.6" />
        </g>
      )}
      {(pose === 'headband' || pose === 'hero' || pose === 'punch') && (
        <g>
          <line x1="-8" y1="-3" x2="-2" y2="-1" stroke={INK} strokeWidth="2.2" strokeLinecap="round" />
          <line x1="8" y1="-3" x2="2" y2="-1" stroke={INK} strokeWidth="2.2" strokeLinecap="round" />
          <circle cx="-5" cy="1" r="1.6" fill={INK} />
          <circle cx="5" cy="1" r="1.6" fill={INK} />
          <path d="M -4 6 L 4 6" stroke={INK} strokeWidth="2" strokeLinecap="round" />
        </g>
      )}
      {pose === 'panic' && (
        <g>
          <circle cx="-5" cy="-2" r="2.8" fill="#FFFFFF" stroke={INK} strokeWidth="1.8" />
          <circle cx="5" cy="-2" r="2.8" fill="#FFFFFF" stroke={INK} strokeWidth="1.8" />
          <circle cx="-5" cy="-2" r="1" fill={INK} />
          <circle cx="5" cy="-2" r="1" fill={INK} />
          <ellipse cx="0" cy="6" rx="3.5" ry="4" fill="#FCA5A5" stroke={INK} strokeWidth="1.6" />
        </g>
      )}
      {pose === 'crying' && (
        <g>
          <path d="M -7 -2 L -3 0 L -7 2" fill="none" stroke={INK} strokeWidth="1.8" strokeLinecap="round" />
          <path d="M 7 -2 L 3 0 L 7 2" fill="none" stroke={INK} strokeWidth="1.8" strokeLinecap="round" />
          <path d="M -5 3 L -6 11" stroke="#38BDF8" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M 5 3 L 6 11" stroke="#38BDF8" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M -4 7 Q 0 4 4 7" fill="none" stroke={INK} strokeWidth="1.8" strokeLinecap="round" />
        </g>
      )}
      {pose === 'strain' && (
        <g>
          <path d="M -8 -3 L -3 -1 L -8 1" fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" />
          <path d="M 8 -3 L 3 -1 L 8 1" fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" />
          <path d="M -5 6 L -2 5 L 1 7 L 4 5 L 6 6" fill="none" stroke={INK} strokeWidth="1.8" strokeLinecap="round" />
        </g>
      )}

      <line x1="0" y1={headR} x2="0" y2="36" stroke={strokeColor} strokeWidth="3.2" strokeLinecap="round" />
      <line x1="0" y1="20" x2={resolvedArmL[0]} y2={resolvedArmL[1]} stroke={strokeColor} strokeWidth="2.8" strokeLinecap="round" />
      <line x1="0" y1="20" x2={resolvedArmR[0]} y2={resolvedArmR[1]} stroke={strokeColor} strokeWidth="2.8" strokeLinecap="round" />
      <circle cx={resolvedArmL[0]} cy={resolvedArmL[1]} r="2.8" fill="#FFFFFF" stroke={strokeColor} strokeWidth="1.6" />
      <circle cx={resolvedArmR[0]} cy={resolvedArmR[1]} r="2.8" fill="#FFFFFF" stroke={strokeColor} strokeWidth="1.6" />
      <line x1="0" y1="36" x2={resolvedLegL[0]} y2={resolvedLegL[1]} stroke={strokeColor} strokeWidth="3" strokeLinecap="round" />
      <line x1="0" y1="36" x2={resolvedLegR[0]} y2={resolvedLegR[1]} stroke={strokeColor} strokeWidth="3" strokeLinecap="round" />
      <ellipse cx={resolvedLegL[0] - 1} cy={resolvedLegL[1] + 2} rx="5.5" ry="2.8" fill={shoeColor} stroke={INK} strokeWidth="1.5" />
      <ellipse cx={resolvedLegR[0] + 1} cy={resolvedLegR[1] + 2} rx="5.5" ry="2.8" fill={shoeColor} stroke={INK} strokeWidth="1.5" />
    </g>
  );
};

const SpeechBubble: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  tailX?: number;
  tailY?: number;
  fill?: string;
  stroke?: string;
  children: React.ReactNode;
}> = ({ x, y, w, h, tailX, tailY, fill = '#FFFFFF', stroke = INK, children }) => (
  <g>
    {tailX !== undefined && tailY !== undefined && (
      <polygon
        points={`${x + w * 0.35},${y + h - 2} ${tailX},${tailY} ${x + w * 0.55},${y + h - 2}`}
        fill={fill}
        stroke={stroke}
        strokeWidth="2"
        strokeLinejoin="round"
      />
    )}
    <rect x={x} y={y} width={w} height={h} rx="7" fill={fill} stroke={stroke} strokeWidth="2.2" />
    {tailX !== undefined && tailY !== undefined && (
      <rect x={x + w * 0.32} y={y + h - 5} width={w * 0.28} height={6} fill={fill} />
    )}
    {children}
  </g>
);

const AnalogClock: React.FC<{
  cx: number;
  cy: number;
  r: number;
  hour: number;
  minute: number;
  hideMinute?: boolean;
  highlightNums?: number[];
  highlightHalf?: boolean;
}> = ({
  cx,
  cy,
  r,
  hour,
  minute,
  hideMinute = false,
  highlightNums = [],
  highlightHalf = false,
}) => {
  const hourDeg = (hour % 12) * 30 + minute * 0.5;
  const minDeg = minute * 6;
  const hourRad = ((hourDeg - 90) * Math.PI) / 180;
  const minRad = ((minDeg - 90) * Math.PI) / 180;
  const hourLen = r * 0.5;
  const minLen = r * 0.74;

  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="#FFFFFF" stroke={INK} strokeWidth="2.4" />
      {highlightHalf && (
        <path
          d={`M ${cx} ${cy - r} A ${r} ${r} 0 0 1 ${cx} ${cy + r} Z`}
          fill="#FEF08A"
          opacity="0.7"
        />
      )}
      {[12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((num) => {
        const deg = num * 30;
        const rad = ((deg - 90) * Math.PI) / 180;
        const tx = cx + r * 0.77 * Math.cos(rad);
        const ty = cy + r * 0.77 * Math.sin(rad);
        const isHi = highlightNums.includes(num);
        return (
          <text
            key={num}
            x={tx}
            y={ty + (r < 34 ? 2.5 : 3)}
            textAnchor="middle"
            fontSize={r < 34 ? '7.5' : isHi ? '10.5' : '8.5'}
            fontWeight="900"
            fill={isHi ? '#DC2626' : INK}
          >
            {num}
          </text>
        );
      })}
      {/* Minute hand (long blue) */}
      {!hideMinute && (
        <line
          x1={cx}
          y1={cy}
          x2={cx + minLen * Math.cos(minRad)}
          y2={cy + minLen * Math.sin(minRad)}
          stroke="#2563EB"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
      )}
      {/* Hour hand (short red) */}
      <line
        x1={cx}
        y1={cy}
        x2={cx + hourLen * Math.cos(hourRad)}
        y2={cy + hourLen * Math.sin(hourRad)}
        stroke="#DC2626"
        strokeWidth="3.8"
        strokeLinecap="round"
      />
      <circle cx={cx} cy={cy} r="2.8" fill={INK} />
    </g>
  );
};

export const Clock1ComicScene: React.FC<Clock1ComicSceneProps> = ({
  sceneType,
  inkMode = 'full',
}) => {
  const isInkSaving = inkMode !== 'full';
  const softBg = (fullColor: string) => (isInkSaving ? '#FFFFFF' : fullColor);

  switch (sceneType) {
    /* 00. 1-2 시계 보기 도감 설명서 */
    case 'clock1_guide':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#F0F9FF')} />
          <rect x="12" y="12" width="216" height="44" rx="8" fill="#FEF08A" stroke={INK} strokeWidth="2.5" />
          <text x="120" y="31" textAnchor="middle" fontSize="13.5" fontWeight="900" fill={INK}>
            1-2 시계 보기 도감 18장 맵!
          </text>
          <text x="120" y="48" textAnchor="middle" fontSize="9.5" fontWeight="800" fill="#B45309">
            짧은 바늘(시) · 긴 바늘(분) · 몇 시 30분 정복!
          </text>

          <g transform="translate(14, 66)">
            <rect x="0" y="0" width="100" height="60" rx="6" fill="#FFFFFF" stroke={INK} strokeWidth="2" />
            <AnalogClock cx={26} cy={30} r={22} hour={4} minute={0} highlightNums={[12, 4]} />
            <text x="74" y="25" textAnchor="middle" fontSize="10" fontWeight="900" fill="#2563EB">몇 시</text>
            <text x="74" y="42" textAnchor="middle" fontSize="11.5" fontWeight="900" fill={INK}>긴=12</text>
          </g>

          <g transform="translate(126, 66)">
            <rect x="0" y="0" width="100" height="60" rx="6" fill="#FFFFFF" stroke={INK} strokeWidth="2" />
            <AnalogClock cx={26} cy={30} r={22} hour={2} minute={30} highlightNums={[6, 2]} />
            <text x="74" y="25" textAnchor="middle" fontSize="10" fontWeight="900" fill="#DC2626">30분</text>
            <text x="74" y="42" textAnchor="middle" fontSize="11.5" fontWeight="900" fill={INK}>긴=6</text>
          </g>

          <Stickman x={54} y={168} pose="hero" armR={[18, 4]} />
          <SpeechBubble x={92} y={136} w={132} h={48} tailX={74} tailY={156}>
            <text x="158" y="156" textAnchor="middle" fontSize="10.5" fontWeight="900" fill={INK}>
              선수학습 2장 + 시침 함정까지
            </text>
            <text x="158" y="173" textAnchor="middle" fontSize="11" fontWeight="900" fill="#2563EB">
              시계 읽기 1초 컷!!
            </text>
          </SpeechBubble>
          <text x="160" y="216" textAnchor="middle" fontSize="10" fontWeight="900" fill="#475569">
            ★ 1학년 시계 마스터 출발! ★
          </text>
        </svg>
      );

    /* 01. [선수학습] 시계 판 숫자 1~12 자리 외우기 */
    case 'clock1_prereq_1to12':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#EFF6FF')} />
          <rect x="14" y="10" width="212" height="28" rx="6" fill="#DBEAFE" stroke={INK} strokeWidth="2" />
          <text x="120" y="29" textAnchor="middle" fontSize="12" fontWeight="900" fill="#1E40AF">
            시계 판 기준 4대장: 12 · 3 · 6 · 9!
          </text>

          <g transform="translate(0, 6)">
            <AnalogClock cx={120} cy={98} r={52} hour={12} minute={0} hideMinute highlightNums={[12, 3, 6, 9]} />
            <line x1="120" y1="54" x2="120" y2="142" stroke="#93C5FD" strokeWidth="1.5" strokeDasharray="3 3" />
            <line x1="76" y1="98" x2="164" y2="98" stroke="#93C5FD" strokeWidth="1.5" strokeDasharray="3 3" />
            <circle cx={120} cy={98} r="4" fill={INK} />
            <path d="M 156 54 A 46 46 0 0 1 174 84" fill="none" stroke="#2563EB" strokeWidth="2.4" />
            <polygon points="171,82 178,88 178,80" fill="#2563EB" />
          </g>

          <Stickman x={54} y={196} scale={0.76} pose="happy" armR={[18, -4]} />
          <SpeechBubble x={92} y={174} w={134} h={42} tailX={74} tailY={190}>
            <text x="159" y="192" textAnchor="middle" fontSize="10" fontWeight="900" fill={INK}>
              위 12 · 아래 6 · 오 3 · 왼 9!
            </text>
            <text x="159" y="207" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#2563EB">
              시계 방향으로 1→12 빙글!
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 02. [선수학습] 둥근 시계 반 바퀴의 비밀! */
    case 'clock1_prereq_half':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#EFF6FF')} />
          <rect x="14" y="10" width="212" height="28" rx="6" fill="#DBEAFE" stroke={INK} strokeWidth="2" />
          <text x="120" y="29" textAnchor="middle" fontSize="12" fontWeight="900" fill="#1E40AF">
            12에서 6까지는 딱 반 바퀴(30분)!
          </text>

          <AnalogClock cx={74} cy={100} r={44} hour={12} minute={30} highlightHalf highlightNums={[12, 6]} />

          <g transform="translate(132, 56)">
            <rect x="0" y="0" width="94" height="90" rx="8" fill="#FFFFFF" stroke={INK} strokeWidth="2.2" />
            <text x="47" y="24" textAnchor="middle" fontSize="11" fontWeight="900" fill="#B45309">피자 딱 반쪽!</text>
            <text x="47" y="48" textAnchor="middle" fontSize="14" fontWeight="900" fill="#2563EB">12 → 6</text>
            <text x="47" y="68" textAnchor="middle" fontSize="12" fontWeight="900" fill="#DC2626">= 30분 (반)</text>
            <text x="47" y="83" textAnchor="middle" fontSize="8.5" fontWeight="800" fill="#64748B">한 바퀴=60분!</text>
          </g>

          <Stickman x={54} y={196} scale={0.76} pose="sunglasses" armR={[18, -4]} />
          <SpeechBubble x={92} y={174} w={134} h={42} tailX={74} tailY={190}>
            <text x="159" y="192" textAnchor="middle" fontSize="10" fontWeight="900" fill={INK}>
              반 바퀴만 돌았으니까
            </text>
            <text x="159" y="207" textAnchor="middle" fontSize="10" fontWeight="900" fill="#2563EB">
              ‘30분’을 ‘반’이라고도 불러!
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 03. 짧은 바늘(시) vs 긴 바늘(분) 딱 구별! */
    case 'clock1_hands_role':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#FEFCE8')} />
          <rect x="14" y="10" width="212" height="28" rx="6" fill="#FEF08A" stroke={INK} strokeWidth="2" />
          <text x="120" y="29" textAnchor="middle" fontSize="12" fontWeight="900" fill="#92400E">
            짧은 바늘 = 시!  ·  긴 바늘 = 분!
          </text>

          <g transform="translate(18, 48)">
            <rect x="0" y="0" width="96" height="108" rx="8" fill="#FFFFFF" stroke="#DC2626" strokeWidth="2.2" />
            <text x="48" y="22" textAnchor="middle" fontSize="11.5" fontWeight="900" fill="#DC2626">짧은 바늘</text>
            <line x1="48" y1="68" x2="48" y2="42" stroke="#DC2626" strokeWidth="6" strokeLinecap="round" />
            <polygon points="41,44 55,44 48,32" fill="#DC2626" />
            <text x="48" y="88" textAnchor="middle" fontSize="13" fontWeight="900" fill={INK}>몇 시!</text>
            <text x="48" y="102" textAnchor="middle" fontSize="8.5" fontWeight="800" fill="#64748B">짧고 통통해!</text>
          </g>

          <g transform="translate(126, 48)">
            <rect x="0" y="0" width="96" height="108" rx="8" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2.2" />
            <text x="48" y="22" textAnchor="middle" fontSize="11.5" fontWeight="900" fill="#2563EB">긴 바늘</text>
            <line x1="48" y1="72" x2="48" y2="32" stroke="#2563EB" strokeWidth="3.5" strokeLinecap="round" />
            <polygon points="43,34 53,34 48,25" fill="#2563EB" />
            <text x="48" y="88" textAnchor="middle" fontSize="13" fontWeight="900" fill={INK}>몇 분!</text>
            <text x="48" y="102" textAnchor="middle" fontSize="8.5" fontWeight="800" fill="#64748B">길고 뾰족해!</text>
          </g>

          <Stickman x={54} y={196} scale={0.76} pose="hero" armR={[18, -4]} />
          <SpeechBubble x={92} y={174} w={134} h={42} tailX={74} tailY={190}>
            <text x="159" y="192" textAnchor="middle" fontSize="10" fontWeight="900" fill={INK}>
              두 바늘 키부터 비교해!
            </text>
            <text x="159" y="207" textAnchor="middle" fontSize="10" fontWeight="900" fill="#B45309">
              짧은 게 시, 긴 게 분!!
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 04. 몇 시(정각) 읽기 */
    case 'clock1_oclock_read':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#EFF6FF')} />
          <rect x="14" y="10" width="212" height="28" rx="6" fill="#DBEAFE" stroke={INK} strokeWidth="2" />
          <text x="120" y="29" textAnchor="middle" fontSize="12" fontWeight="900" fill="#1E40AF">
            긴 바늘이 12를 가리키면 딱 정각!
          </text>

          <AnalogClock cx={74} cy={100} r={44} hour={4} minute={0} highlightNums={[12, 4]} />

          <g transform="translate(132, 56)">
            <rect x="0" y="0" width="94" height="90" rx="8" fill="#FFFFFF" stroke={INK} strokeWidth="2.2" />
            <text x="47" y="22" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#2563EB">긴 바늘 → 12</text>
            <text x="47" y="40" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#DC2626">짧은 바늘 → 4</text>
            <line x1="12" y1="48" x2="82" y2="48" stroke="#CBD5E1" strokeWidth="1.5" />
            <text x="47" y="74" textAnchor="middle" fontSize="20" fontWeight="900" fill="#15803D">4시!</text>
          </g>

          <Stickman x={54} y={196} scale={0.76} pose="happy" armR={[18, -4]} />
          <SpeechBubble x={92} y={174} w={134} h={42} tailX={74} tailY={190}>
            <text x="159" y="192" textAnchor="middle" fontSize="10" fontWeight="900" fill={INK}>
              긴 바늘이 12에 똑바로 서면
            </text>
            <text x="159" y="207" textAnchor="middle" fontSize="10" fontWeight="900" fill="#2563EB">
              짧은 바늘 숫자(4) → 4시!
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 05. 12시(겹침) vs 6시(일직선) 깜짝 함정! */
    case 'clock1_oclock_special_trap':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#FEF2F2')} />
          <rect x="14" y="10" width="212" height="28" rx="6" fill="#FEE2E2" stroke={INK} strokeWidth="2" />
          <text x="120" y="29" textAnchor="middle" fontSize="11.5" fontWeight="900" fill="#B91C1C">
            바늘이 1개 같거나 일직선일 때 조심!!
          </text>

          <g transform="translate(14, 46)">
            <rect x="0" y="0" width="100" height="112" rx="8" fill="#FFFFFF" stroke="#EF4444" strokeWidth="2.2" />
            <AnalogClock cx={50} cy={46} r={34} hour={12} minute={0} highlightNums={[12]} />
            <text x="50" y="94" textAnchor="middle" fontSize="12" fontWeight="900" fill="#DC2626">12시 (겹침!)</text>
            <text x="50" y="107" textAnchor="middle" fontSize="8" fontWeight="800" fill="#475569">두 바늘이 모두 12에!</text>
          </g>

          <g transform="translate(126, 46)">
            <rect x="0" y="0" width="100" height="112" rx="8" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2.2" />
            <AnalogClock cx={50} cy={46} r={34} hour={6} minute={0} highlightNums={[12, 6]} />
            <text x="50" y="94" textAnchor="middle" fontSize="12" fontWeight="900" fill="#2563EB">6시 (일직선!)</text>
            <text x="50" y="107" textAnchor="middle" fontSize="8" fontWeight="800" fill="#475569">긴 12(위) · 짧은 6(아래)</text>
          </g>

          <Stickman x={50} y={196} scale={0.76} pose="panic" armR={[18, -6]} sweat />
          <SpeechBubble x={86} y={172} w={140} h={46} tailX={68} tailY={188}>
            <text x="156" y="191" textAnchor="middle" fontSize="9.5" fontWeight="900" fill={INK}>
              12에 둘 다 모이면 12시!
            </text>
            <text x="156" y="207" textAnchor="middle" fontSize="10" fontWeight="900" fill="#2563EB">
              위아래 쭉 일직선이면 6시!
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 06. 몇 시 30분 읽기 */
    case 'clock1_half_read':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#FEFCE8')} />
          <rect x="14" y="10" width="212" height="28" rx="6" fill="#FEF08A" stroke={INK} strokeWidth="2" />
          <text x="120" y="29" textAnchor="middle" fontSize="12" fontWeight="900" fill="#92400E">
            긴 바늘이 6에 내려오면 ‘~시 30분’!
          </text>

          <AnalogClock cx={74} cy={100} r={44} hour={2} minute={30} highlightNums={[2, 6]} />

          <g transform="translate(132, 56)">
            <rect x="0" y="0" width="94" height="90" rx="8" fill="#FFFFFF" stroke={INK} strokeWidth="2.2" />
            <text x="47" y="22" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#2563EB">긴 바늘 → 6(30분)</text>
            <text x="47" y="40" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#DC2626">짧은 바늘 → 2·3 사이</text>
            <line x1="12" y1="48" x2="82" y2="48" stroke="#CBD5E1" strokeWidth="1.5" />
            <text x="47" y="74" textAnchor="middle" fontSize="16" fontWeight="900" fill="#B45309">2시 30분!</text>
          </g>

          <Stickman x={54} y={196} scale={0.76} pose="sunglasses" armR={[18, -4]} />
          <SpeechBubble x={92} y={174} w={134} h={42} tailX={74} tailY={190}>
            <text x="159" y="192" textAnchor="middle" fontSize="10" fontWeight="900" fill={INK}>
              긴 바늘이 아래 6이면
            </text>
            <text x="159" y="207" textAnchor="middle" fontSize="10" fontWeight="900" fill="#B45309">
              무조건 30분(반)이야!
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 07. 30분일 때 짧은 바늘의 진짜 위치! */
    case 'clock1_half_hourhand_pos':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#ECFDF5')} />
          <rect x="14" y="10" width="212" height="28" rx="6" fill="#D1FAE5" stroke={INK} strokeWidth="2" />
          <text x="120" y="29" textAnchor="middle" fontSize="12" fontWeight="900" fill="#065F46">
            30분일 땐 짧은 바늘도 딱 반 걸어가!
          </text>

          <AnalogClock cx={74} cy={100} r={44} hour={2} minute={30} highlightNums={[2, 3]} />

          <g transform="translate(132, 54)">
            <rect x="0" y="0" width="94" height="94" rx="8" fill="#FFFFFF" stroke="#059669" strokeWidth="2.2" />
            <text x="47" y="22" textAnchor="middle" fontSize="10" fontWeight="900" fill="#065F46">시침 확대경!</text>
            <text x="26" y="54" textAnchor="middle" fontSize="16" fontWeight="900" fill="#2563EB">2</text>
            <circle cx="47" cy="49" r="6" fill="#EF4444" />
            <text x="68" y="54" textAnchor="middle" fontSize="16" fontWeight="900" fill="#94A3B8">3</text>
            <text x="47" y="76" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#059669">2와 3의 딱 중간!</text>
          </g>

          <Stickman x={54} y={196} scale={0.76} pose="happy" armR={[18, -4]} />
          <SpeechBubble x={92} y={174} w={134} h={42} tailX={74} tailY={190}>
            <text x="159" y="192" textAnchor="middle" fontSize="10" fontWeight="900" fill={INK}>
              분침이 반 바퀴 도는 동안
            </text>
            <text x="159" y="207" textAnchor="middle" fontSize="10" fontWeight="900" fill="#059669">
              시침도 다음 숫자 반 칸 이동!
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 08. 함정! 2와 3 사이면 3시 30분? 땡!! */
    case 'clock1_half_hourhand_trap':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#FEF2F2')} />
          <rect x="14" y="10" width="212" height="28" rx="6" fill="#FEE2E2" stroke={INK} strokeWidth="2" />
          <text x="120" y="29" textAnchor="middle" fontSize="11.5" fontWeight="900" fill="#B91C1C">
            2와 3 사이면 3시 30분?! 큰일 날 소리!!
          </text>

          <AnalogClock cx={66} cy={100} r={42} hour={2} minute={30} highlightNums={[2, 3]} />

          <g transform="translate(120, 48)">
            <rect x="0" y="0" width="106" height="48" rx="7" fill="#FFFFFF" stroke="#EF4444" strokeWidth="2" />
            <text x="53" y="20" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#DC2626">뒤 숫자 읽으면 땡!</text>
            <text x="53" y="39" textAnchor="middle" fontSize="14" fontWeight="900" fill="#94A3B8">3시 30분 ✕</text>
            <line x1="16" y1="34" x2="90" y2="34" stroke="#EF4444" strokeWidth="2.2" />

            <rect x="0" y="56" width="106" height="52" rx="7" fill="#ECFDF5" stroke="#16A34A" strokeWidth="2.4" />
            <text x="53" y="75" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#15803D">지나온 앞 숫자 읽기!</text>
            <text x="53" y="97" textAnchor="middle" fontSize="16" fontWeight="900" fill="#15803D">2시 30분 ◎</text>
          </g>

          <Stickman x={50} y={196} scale={0.76} pose="panic" armR={[18, -6]} sweat />
          <SpeechBubble x={86} y={172} w={140} h={46} tailX={68} tailY={188}>
            <text x="156" y="191" textAnchor="middle" fontSize="9.5" fontWeight="900" fill={INK}>
              아직 3시에 도착 안 했어!
            </text>
            <text x="156" y="207" textAnchor="middle" fontSize="10" fontWeight="900" fill="#DC2626">
              무조건 지나온 앞 숫자(2)!!
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 09. 12시 30분 왕함정! */
    case 'clock1_12_30_trap':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#FEF2F2')} />
          <rect x="14" y="10" width="212" height="28" rx="6" fill="#FEE2E2" stroke={INK} strokeWidth="2" />
          <text x="120" y="29" textAnchor="middle" fontSize="11.5" fontWeight="900" fill="#B91C1C">
            12와 1 사이일 땐 1시 30분? 절대 아님!!
          </text>

          <AnalogClock cx={66} cy={100} r={42} hour={12} minute={30} highlightNums={[12, 1]} />

          <g transform="translate(120, 48)">
            <rect x="0" y="0" width="106" height="106" rx="8" fill="#FFFFFF" stroke={INK} strokeWidth="2.2" />
            <text x="53" y="20" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#DC2626">방향: 12 → 1 순서!</text>
            <text x="53" y="44" textAnchor="middle" fontSize="13" fontWeight="900" fill="#94A3B8">1시 30분 ✕</text>
            <line x1="18" y1="39" x2="88" y2="39" stroke="#EF4444" strokeWidth="2.2" />
            <text x="53" y="72" textAnchor="middle" fontSize="16" fontWeight="900" fill="#15803D">12시 30분 ✓</text>
            <text x="53" y="93" textAnchor="middle" fontSize="8.5" fontWeight="800" fill="#475569">12에서 출발했으니까!</text>
          </g>

          <Stickman x={50} y={196} scale={0.76} pose="headband" armR={[18, -4]} />
          <SpeechBubble x={86} y={172} w={140} h={46} tailX={68} tailY={188}>
            <text x="156" y="191" textAnchor="middle" fontSize="9.5" fontWeight="900" fill={INK}>
              숫자가 작다고 1 읽으면 땡!
            </text>
            <text x="156" y="207" textAnchor="middle" fontSize="10" fontWeight="900" fill="#DC2626">
              시계 도는 방향 지나온 12시!!
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 10. 시계 바늘 직접 그리기 비법! */
    case 'clock1_draw_hands':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#ECFDF5')} />
          <rect x="14" y="10" width="212" height="28" rx="6" fill="#D1FAE5" stroke={INK} strokeWidth="2" />
          <text x="120" y="29" textAnchor="middle" fontSize="12" fontWeight="900" fill="#065F46">
            바늘 그리기! 7시 vs 7시 30분 차이!
          </text>

          <g transform="translate(14, 46)">
            <rect x="0" y="0" width="100" height="112" rx="8" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2" />
            <AnalogClock cx={50} cy={46} r={34} hour={7} minute={0} highlightNums={[12, 7]} />
            <text x="50" y="94" textAnchor="middle" fontSize="12" fontWeight="900" fill="#2563EB">7시</text>
            <text x="50" y="107" textAnchor="middle" fontSize="8" fontWeight="800" fill="#475569">짧은 바늘 7에 딱!</text>
          </g>

          <g transform="translate(126, 46)">
            <rect x="0" y="0" width="100" height="112" rx="8" fill="#FFFFFF" stroke="#059669" strokeWidth="2.4" />
            <AnalogClock cx={50} cy={46} r={34} hour={7} minute={30} highlightNums={[6, 7, 8]} />
            <text x="50" y="94" textAnchor="middle" fontSize="12" fontWeight="900" fill="#059669">7시 30분</text>
            <text x="50" y="107" textAnchor="middle" fontSize="8" fontWeight="900" fill="#DC2626">짧은 바늘 7·8 사이!</text>
          </g>

          <Stickman x={54} y={196} scale={0.76} pose="sunglasses" armR={[18, -4]} />
          <SpeechBubble x={92} y={174} w={134} h={42} tailX={74} tailY={190}>
            <text x="159" y="192" textAnchor="middle" fontSize="9.5" fontWeight="900" fill={INK}>
              30분 그릴 땐 짧은 바늘을
            </text>
            <text x="159" y="207" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#059669">
              꼭 7과 8 중간에 그려야 해!
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 11. 숫자 시계(전자시계) ↔ 바늘 시계 짝꿍 */
    case 'clock1_digital_clock':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#EFF6FF')} />
          <rect x="14" y="10" width="212" height="28" rx="6" fill="#DBEAFE" stroke={INK} strokeWidth="2" />
          <text x="120" y="29" textAnchor="middle" fontSize="12" fontWeight="900" fill="#1E40AF">
            전자시계는 (:) 앞이 시, 뒤가 분!
          </text>

          <g transform="translate(16, 46)">
            <rect x="0" y="0" width="100" height="110" rx="8" fill="#FFFFFF" stroke={INK} strokeWidth="2" />
            <rect x="12" y="10" width="76" height="28" rx="5" fill="#0F172A" />
            <text x="50" y="30" textAnchor="middle" fontSize="16" fontWeight="900" fill="#4ADE80">5 : 00</text>
            <AnalogClock cx={50} cy={74} r={28} hour={5} minute={0} highlightNums={[12, 5]} />
          </g>

          <g transform="translate(124, 46)">
            <rect x="0" y="0" width="100" height="110" rx="8" fill="#FFFFFF" stroke={INK} strokeWidth="2" />
            <rect x="12" y="10" width="76" height="28" rx="5" fill="#0F172A" />
            <text x="50" y="30" textAnchor="middle" fontSize="16" fontWeight="900" fill="#FACC15">5 : 30</text>
            <AnalogClock cx={50} cy={74} r={28} hour={5} minute={30} highlightNums={[5, 6]} />
          </g>

          <Stickman x={54} y={196} scale={0.76} pose="happy" armR={[18, -4]} />
          <SpeechBubble x={92} y={174} w={134} h={42} tailX={74} tailY={190}>
            <text x="159" y="192" textAnchor="middle" fontSize="10" fontWeight="900" fill={INK}>
              5:00 = 5시 (긴 바늘 12)
            </text>
            <text x="159" y="207" textAnchor="middle" fontSize="10" fontWeight="900" fill="#2563EB">
              5:30 = 5시 30분 (긴 바늘 6)
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 12. 30분씩 · 1시간씩 점프 놀이! */
    case 'clock1_half_hour_jump':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#ECFDF5')} />
          <rect x="14" y="10" width="212" height="28" rx="6" fill="#D1FAE5" stroke={INK} strokeWidth="2" />
          <text x="120" y="29" textAnchor="middle" fontSize="12" fontWeight="900" fill="#065F46">
            30분이 2번 모이면 1시간 점프!
          </text>

          <g transform="translate(12, 48)">
            <rect x="0" y="0" width="66" height="104" rx="7" fill="#FFFFFF" stroke={INK} strokeWidth="2" />
            <AnalogClock cx={33} cy={38} r={25} hour={3} minute={0} />
            <text x="33" y="84" textAnchor="middle" fontSize="12" fontWeight="900" fill="#2563EB">3시</text>

            <text x="72" y="54" textAnchor="middle" fontSize="8.5" fontWeight="900" fill="#DC2626">+30분</text>

            <rect x="76" y="0" width="66" height="104" rx="7" fill="#FFFFFF" stroke={INK} strokeWidth="2" />
            <AnalogClock cx={109} cy={38} r={25} hour={3} minute={30} />
            <text x="109" y="84" textAnchor="middle" fontSize="11" fontWeight="900" fill="#B45309">3시 30분</text>

            <text x="148" y="54" textAnchor="middle" fontSize="8.5" fontWeight="900" fill="#DC2626">+30분</text>

            <rect x="152" y="0" width="64" height="104" rx="7" fill="#ECFDF5" stroke="#059669" strokeWidth="2.2" />
            <AnalogClock cx={184} cy={38} r={25} hour={4} minute={0} />
            <text x="184" y="84" textAnchor="middle" fontSize="12" fontWeight="900" fill="#059669">4시!</text>
          </g>

          <Stickman x={54} y={196} scale={0.76} pose="sunglasses" armR={[18, -4]} />
          <SpeechBubble x={92} y={174} w={134} h={42} tailX={74} tailY={190}>
            <text x="159" y="192" textAnchor="middle" fontSize="10" fontWeight="900" fill={INK}>
              3시 → 3시 30분 → 4시!
            </text>
            <text x="159" y="207" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#059669">
              반 바퀴 + 반 바퀴 = 1시간!
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 13. 12시에서 1시간 뒤는 몇 시? */
    case 'clock1_12_to_1_jump':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#ECFDF5')} />
          <rect x="14" y="10" width="212" height="28" rx="6" fill="#D1FAE5" stroke={INK} strokeWidth="2" />
          <text x="120" y="29" textAnchor="middle" fontSize="12" fontWeight="900" fill="#065F46">
            시계는 12가 끝! 다음은 다시 1시!
          </text>

          <g transform="translate(18, 52)">
            <rect x="0" y="0" width="204" height="102" rx="10" fill="#FFFFFF" stroke={INK} strokeWidth="2.2" />
            <text x="102" y="34" textAnchor="middle" fontSize="17" fontWeight="900" fill={INK}>
              11시  →  <tspan fill="#DC2626">12시</tspan>  →  <tspan fill="#059669">1시!</tspan>
            </text>
            <text x="102" y="56" textAnchor="middle" fontSize="10.5" fontWeight="900" fill="#475569">
              (13시라고 쓰면 땡! 바늘 시계는 1~12만!)
            </text>
            <rect x="20" y="68" width="164" height="24" rx="5" fill="#ECFDF5" stroke="#059669" strokeWidth="1.6" />
            <text x="102" y="84" textAnchor="middle" fontSize="10.5" fontWeight="900" fill="#065F46">
              12시 30분 + 30분 = 1시!
            </text>
          </g>

          <Stickman x={54} y={196} scale={0.76} pose="happy" armR={[18, -4]} />
          <SpeechBubble x={92} y={174} w={134} h={42} tailX={74} tailY={190}>
            <text x="159" y="192" textAnchor="middle" fontSize="10" fontWeight="900" fill={INK}>
              12시에서 1시간 전은 11시,
            </text>
            <text x="159" y="207" textAnchor="middle" fontSize="10" fontWeight="900" fill="#059669">
              1시간 후는 다시 1시야!
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 14. 하루 일과표와 시계 보기 */
    case 'clock1_daily_routine':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#EFF6FF')} />
          <rect x="14" y="10" width="212" height="28" rx="6" fill="#DBEAFE" stroke={INK} strokeWidth="2" />
          <text x="120" y="29" textAnchor="middle" fontSize="12" fontWeight="900" fill="#1E40AF">
            아침 8시 vs 밤 8시! 바늘 모양은 똑같아!
          </text>

          <g transform="translate(14, 46)">
            <rect x="0" y="0" width="100" height="112" rx="8" fill="#FFFBEB" stroke="#D97706" strokeWidth="2" />
            <circle cx="22" cy="20" r="8" fill="#FACC15" stroke="#D97706" strokeWidth="1.5" />
            <text x="64" y="24" textAnchor="middle" fontSize="10" fontWeight="900" fill="#B45309">아침 8시</text>
            <AnalogClock cx={50} cy={62} r={28} hour={8} minute={0} />
            <text x="50" y="103" textAnchor="middle" fontSize="9.5" fontWeight="900" fill={INK}>학교 가는 시간!</text>
          </g>

          <g transform="translate(126, 46)">
            <rect x="0" y="0" width="100" height="112" rx="8" fill="#1E293B" stroke={INK} strokeWidth="2" />
            <circle cx="22" cy="20" r="7" fill="#FDE047" />
            <text x="64" y="24" textAnchor="middle" fontSize="10" fontWeight="900" fill="#FDE047">밤 8시</text>
            <AnalogClock cx={50} cy={62} r={28} hour={8} minute={0} />
            <text x="50" y="103" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#FFFFFF">잘 준비하는 시간!</text>
          </g>

          <Stickman x={54} y={196} scale={0.76} pose="sunglasses" armR={[18, -4]} />
          <SpeechBubble x={92} y={174} w={134} h={42} tailX={74} tailY={190}>
            <text x="159" y="192" textAnchor="middle" fontSize="10" fontWeight="900" fill={INK}>
              시계는 하루에 두 번씩 도니까
            </text>
            <text x="159" y="207" textAnchor="middle" fontSize="10" fontWeight="900" fill="#2563EB">
              해·달 상황도 함께 봐!
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 15. 긴 바늘이 사라졌다?! 시침 추리 퀴즈! */
    case 'clock1_missing_hand_quiz':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#F5F3FF')} />
          <rect x="14" y="10" width="212" height="28" rx="6" fill="#EDE9FE" stroke={INK} strokeWidth="2" />
          <text x="120" y="29" textAnchor="middle" fontSize="11.5" fontWeight="900" fill="#5B21B6">
            긴 바늘이 부러져도 몇 시 몇 분인지 안다!
          </text>

          <g transform="translate(14, 46)">
            <rect x="0" y="0" width="100" height="112" rx="8" fill="#FFFFFF" stroke="#7C3AED" strokeWidth="2.2" />
            <AnalogClock cx={50} cy={46} r={34} hour={4} minute={30} hideMinute highlightNums={[4, 5]} />
            <text x="50" y="93" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#5B21B6">4와 5 한가운데!</text>
            <text x="50" y="107" textAnchor="middle" fontSize="10.5" fontWeight="900" fill="#15803D">→ 4시 30분!</text>
          </g>

          <g transform="translate(126, 46)">
            <rect x="0" y="0" width="100" height="112" rx="8" fill="#FFFFFF" stroke="#7C3AED" strokeWidth="2.2" />
            <AnalogClock cx={50} cy={46} r={34} hour={9} minute={0} hideMinute highlightNums={[9]} />
            <text x="50" y="93" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#5B21B6">숫자 9에 딱!</text>
            <text x="50" y="107" textAnchor="middle" fontSize="10.5" fontWeight="900" fill="#2563EB">→ 딱 9시!</text>
          </g>

          <Stickman x={50} y={198} scale={0.74} pose="headband" armR={[18, -4]} />
          <SpeechBubble x={86} y={174} w={140} h={44} tailX={68} tailY={190}>
            <text x="156" y="193" textAnchor="middle" fontSize="9.5" fontWeight="900" fill={INK}>
              숫자에 딱 붙으면 정각!
            </text>
            <text x="156" y="208" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#7C3AED">
              두 숫자 딱 사이면 ~시 30분!
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 16. 최종 보스! 1-2 시계 보기 3관문 */
    case 'clock1_boss':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#1E1B4B')} />
          <rect x="14" y="10" width="212" height="28" rx="6" fill="#EF4444" stroke="#FEF08A" strokeWidth="2" />
          <text x="120" y="29" textAnchor="middle" fontSize="12" fontWeight="900" fill="#FFFFFF">
            BOSS! 1-2 시계 보기 최종 3관문
          </text>

          <g transform="translate(18, 46)">
            <rect x="0" y="0" width="204" height="32" rx="6" fill="#FFFFFF" stroke="#FACC15" strokeWidth="2" />
            <text x="14" y="21" fontSize="10.5" fontWeight="900" fill="#DC2626">①</text>
            <text x="32" y="21" fontSize="11.5" fontWeight="900" fill={INK}>긴 12 · 짧은 8 → 몇 시?</text>

            <rect x="0" y="39" width="204" height="32" rx="6" fill="#FFFFFF" stroke="#FACC15" strokeWidth="2" />
            <text x="14" y="60" fontSize="10.5" fontWeight="900" fill="#2563EB">②</text>
            <text x="32" y="60" fontSize="11" fontWeight="900" fill={INK}>짧은 10·11 사이 · 긴 6 → ?</text>

            <rect x="0" y="78" width="204" height="32" rx="6" fill="#FFFFFF" stroke="#FACC15" strokeWidth="2" />
            <text x="14" y="99" fontSize="10.5" fontWeight="900" fill="#7C3AED">③</text>
            <text x="32" y="99" fontSize="11.5" fontWeight="900" fill={INK}>4시 30분에서 30분 뒤는?</text>
          </g>

          <Stickman x={54} y={192} scale={0.76} pose="punch" armR={[24, -4]} strokeColor="#FFFFFF" />
          <SpeechBubble x={92} y={168} w={134} h={48} tailX={74} tailY={186}>
            <text x="159" y="187" textAnchor="middle" fontSize="10" fontWeight="900" fill={INK}>
              아래 쉬운 말 팁에서
            </text>
            <text x="159" y="204" textAnchor="middle" fontSize="10.5" fontWeight="900" fill="#DC2626">
              3관문 정답 확인해 봐!!
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 17. 1-2 시계 보기 완주 축하 포카! */
    case 'clock1_praise':
    default:
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#FEF9C3')} />
          {[
            [26, 26, '#EF4444'],
            [62, 18, '#3B82F6'],
            [178, 22, '#10B981'],
            [214, 30, '#8B5CF6'],
            [32, 130, '#F59E0B'],
            [208, 136, '#EC4899'],
          ].map(([cx, cy, col], i) => (
            <circle key={i} cx={Number(cx)} cy={Number(cy)} r="4.5" fill={String(col)} />
          ))}

          <rect x="20" y="18" width="200" height="46" rx="10" fill="#FACC15" stroke={INK} strokeWidth="2.6" />
          <text x="120" y="38" textAnchor="middle" fontSize="13.5" fontWeight="900" fill={INK}>
            ★ 1-2 시계 보기 완주 축하!! ★
          </text>
          <text x="120" y="55" textAnchor="middle" fontSize="10" fontWeight="900" fill="#92400E">
            18장 올 클리어 · 시계 챔피언!
          </text>

          <AnalogClock cx={120} cy={104} r={30} hour={10} minute={30} highlightNums={[10, 6]} />

          <Stickman x={120} y={168} scale={0.9} pose="hero" armL={[-20, 4]} armR={[20, 4]} />
          <text x="120" y="222" textAnchor="middle" fontSize="10.5" fontWeight="900" fill="#B45309">
            공식 1학년 시계 읽기 마스터 인증!
          </text>
        </svg>
      );
  }
};
