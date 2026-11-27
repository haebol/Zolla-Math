import React from 'react';
import { EpisodeSceneType, PrintInkMode } from '../types/card';

interface Time3ComicSceneProps {
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

const HmsClock: React.FC<{
  cx: number;
  cy: number;
  r: number;
  hour: number;
  minute: number;
  second?: number;
  showTicks?: boolean;
}> = ({ cx, cy, r, hour, minute, second, showTicks = true }) => {
  const hourDeg = (hour % 12) * 30 + minute * 0.5;
  const minDeg = minute * 6 + (second ? second * 0.1 : 0);
  const secDeg = (second ?? 0) * 6;
  const hourRad = ((hourDeg - 90) * Math.PI) / 180;
  const minRad = ((minDeg - 90) * Math.PI) / 180;
  const secRad = ((secDeg - 90) * Math.PI) / 180;

  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="#FFFFFF" stroke={INK} strokeWidth="2.4" />
      {showTicks &&
        Array.from({ length: 60 }, (_, idx) => {
          const rad = ((idx * 6 - 90) * Math.PI) / 180;
          const isHour = idx % 5 === 0;
          const inner = r * (isHour ? 0.87 : 0.92);
          return (
            <line
              key={idx}
              x1={cx + inner * Math.cos(rad)}
              y1={cy + inner * Math.sin(rad)}
              x2={cx + r * 0.97 * Math.cos(rad)}
              y2={cy + r * 0.97 * Math.sin(rad)}
              stroke={isHour ? INK : '#94A3B8'}
              strokeWidth={isHour ? '1.6' : '0.9'}
            />
          );
        })}
      {[12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((num) => {
        const rad = ((num * 30 - 90) * Math.PI) / 180;
        return (
          <text
            key={num}
            x={cx + r * 0.72 * Math.cos(rad)}
            y={cy + r * 0.72 * Math.sin(rad) + 2.8}
            textAnchor="middle"
            fontSize={r < 34 ? '7' : '8.2'}
            fontWeight="900"
            fill={INK}
          >
            {num}
          </text>
        );
      })}
      {/* Hour hand (short thick dark) */}
      <line
        x1={cx}
        y1={cy}
        x2={cx + r * 0.44 * Math.cos(hourRad)}
        y2={cy + r * 0.44 * Math.sin(hourRad)}
        stroke="#0F172A"
        strokeWidth="3.6"
        strokeLinecap="round"
      />
      {/* Minute hand (long blue) */}
      <line
        x1={cx}
        y1={cy}
        x2={cx + r * 0.68 * Math.cos(minRad)}
        y2={cy + r * 0.68 * Math.sin(minRad)}
        stroke="#2563EB"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      {/* Second hand (thin red) */}
      {second !== undefined && (
        <line
          x1={cx - r * 0.14 * Math.cos(secRad)}
          y1={cy - r * 0.14 * Math.sin(secRad)}
          x2={cx + r * 0.8 * Math.cos(secRad)}
          y2={cy + r * 0.8 * Math.sin(secRad)}
          stroke="#EF4444"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      )}
      <circle cx={cx} cy={cy} r="2.6" fill={second !== undefined ? '#EF4444' : INK} />
    </g>
  );
};

export const Time3ComicScene: React.FC<Time3ComicSceneProps> = ({
  sceneType,
  inkMode = 'full',
}) => {
  const isInkSaving = inkMode !== 'full';
  const softBg = (fullColor: string) => (isInkSaving ? '#FFFFFF' : fullColor);

  switch (sceneType) {
    /* 00. 3-1 시간 도감 설명서 */
    case 'time3_guide':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#F0F9FF')} />
          <rect x="12" y="10" width="216" height="44" rx="8" fill="#FEF08A" stroke={INK} strokeWidth="2.5" />
          <text x="120" y="29" textAnchor="middle" fontSize="13.5" fontWeight="900" fill={INK}>
            3-1 시간 도감 18장 맵!
          </text>
          <text x="120" y="46" textAnchor="middle" fontSize="9.2" fontWeight="800" fill="#B45309">
            1분=60초 · 시각과 시간 · 60진법 덧뺄셈!
          </text>

          <g transform="translate(14, 62)">
            <rect x="0" y="0" width="102" height="58" rx="6" fill="#FFFFFF" stroke={INK} strokeWidth="2" />
            <HmsClock cx={25} cy={29} r={20} hour={3} minute={10} second={15} showTicks={false} />
            <text x="73" y="24" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#EF4444">초침 등장</text>
            <text x="73" y="39" textAnchor="middle" fontSize="8.5" fontWeight="800" fill={INK}>1분=60초</text>
            <text x="73" y="51" textAnchor="middle" fontSize="7.8" fontWeight="700" fill="#64748B">시·분·초 읽기</text>
          </g>

          <g transform="translate(124, 62)">
            <rect x="0" y="0" width="102" height="58" rx="6" fill="#ECFDF5" stroke={INK} strokeWidth="2" />
            <text x="51" y="21" textAnchor="middle" fontSize="10" fontWeight="900" fill="#047857">60진법 계산!</text>
            <text x="51" y="36" textAnchor="middle" fontSize="8.8" fontWeight="900" fill="#2563EB">60 차면 +1 올림</text>
            <text x="51" y="50" textAnchor="middle" fontSize="8.8" fontWeight="900" fill="#DC2626">모자라면 +60 빌림</text>
          </g>

          <rect x="14" y="130" width="144" height="44" rx="7" fill="#FFFFFF" stroke={INK} strokeWidth="2" />
          <text x="86" y="149" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#7C3AED">
            선수학습 2장 + 핵심·함정·보스!
          </text>
          <text x="86" y="164" textAnchor="middle" fontSize="9" fontWeight="800" fill={INK}>
            100 올림/10 빌림 함정 완전 격파!
          </text>

          <Stickman x={196} y={150} scale={0.76} pose="hero" armL={[-16, 12]} armR={[16, 6]} />
          <text x="120" y="212" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#334155">
            ★ 3학년 시간 계산 마스터 출발! ★
          </text>
        </svg>
      );

    /* 01. [선수학습] 5분·1분 읽기 & 1시간 = 60분 */
    case 'time3_prereq_clock':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#EFF6FF')} />
          <rect x="14" y="10" width="212" height="28" rx="6" fill="#DBEAFE" stroke="#2563EB" strokeWidth="2" />
          <text x="120" y="28" textAnchor="middle" fontSize="10.5" fontWeight="900" fill="#1E3A8A">
            긴 바늘 한 바퀴(60칸) = 60분 = 1시간!
          </text>

          <HmsClock cx={74} cy={112} r={54} hour={1} minute={25} />
          <circle cx={74} cy={112} r={46} fill="none" stroke="#2563EB" strokeWidth="2" strokeDasharray="4 3" />

          <rect x="140" y="54" width="88" height="90" rx="8" fill="#FFFFFF" stroke={INK} strokeWidth="2" />
          <text x="184" y="74" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#0F172A">큰 칸 = ×5분</text>
          <text x="184" y="92" textAnchor="middle" fontSize="9" fontWeight="800" fill="#2563EB">1 → 5분</text>
          <text x="184" y="107" textAnchor="middle" fontSize="9" fontWeight="800" fill="#2563EB">5 → 25분</text>
          <text x="184" y="122" textAnchor="middle" fontSize="9" fontWeight="800" fill="#2563EB">12 → 60분</text>
          <text x="184" y="137" textAnchor="middle" fontSize="9.2" fontWeight="900" fill="#DC2626">1시간 = 60분!</text>

          <Stickman x={44} y={176} scale={0.7} pose="sunglasses" armL={[-12, 16]} armR={[16, 4]} />
          <SpeechBubble x={76} y={168} w={152} h={46} tailX={62} tailY={182}>
            <text x="152" y="187" textAnchor="middle" fontSize="9" fontWeight="900" fill={INK}>
              1시 25분처럼 분을 읽고,
            </text>
            <text x="152" y="203" textAnchor="middle" fontSize="9" fontWeight="900" fill="#2563EB">
              60분 모이면 1시간 되는 건 기본!
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 02. [선수학습] 시간은 60이 차야 올라간다! */
    case 'time3_prereq_60base':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#F0FDF4')} />
          <rect x="14" y="10" width="212" height="28" rx="6" fill="#FFFFFF" stroke={INK} strokeWidth="2" />
          <text x="120" y="28" textAnchor="middle" fontSize="10.5" fontWeight="900" fill={INK}>
            일반 수(10진법) vs 시간(60진법)
          </text>

          <rect x="14" y="48" width="100" height="92" rx="8" fill="#F8FAFC" stroke="#64748B" strokeWidth="2" />
          <text x="64" y="68" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#475569">일반 숫자·길이</text>
          <text x="64" y="92" textAnchor="middle" fontSize="17" fontWeight="900" fill="#2563EB">10개</text>
          <text x="64" y="112" textAnchor="middle" fontSize="9" fontWeight="800" fill={INK}>10이 차면 올림!</text>
          <text x="64" y="128" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#64748B">1cm = 10mm</text>

          <rect x="126" y="48" width="100" height="92" rx="8" fill="#FEF08A" stroke={INK} strokeWidth="2.4" />
          <text x="176" y="68" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#B45309">시 · 분 · 초</text>
          <text x="176" y="92" textAnchor="middle" fontSize="18" fontWeight="900" fill="#DC2626">60!</text>
          <text x="176" y="112" textAnchor="middle" fontSize="9" fontWeight="900" fill={INK}>60이 차야 올림!</text>
          <text x="176" y="128" textAnchor="middle" fontSize="8.5" fontWeight="800" fill="#047857">60초=1분 · 60분=1시</text>

          <Stickman x={44} y={168} scale={0.72} pose="headband" armL={[-12, 18]} armR={[16, 4]} />
          <SpeechBubble x={76} y={164} w={152} h={48} tailX={62} tailY={178}>
            <text x="152" y="184" textAnchor="middle" fontSize="9.2" fontWeight="900" fill={INK}>
              시계 나라의 만땅 숫자는
            </text>
            <text x="152" y="201" textAnchor="middle" fontSize="9.8" fontWeight="900" fill="#DC2626">
              10도 100도 아닌 딱 ‘60’이야!
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 03. 가장 얇고 바쁜 바늘 = 초침(1초)! */
    case 'time3_second_hand':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#FFFBEB')} />
          <HmsClock cx={78} cy={92} r={54} hour={2} minute={10} second={25} />

          {/* Pointing labels */}
          <rect x="142" y="34" width="86" height="28" rx="6" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
          <text x="185" y="52" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#0F172A">
            짧고 굵음 = 시침
          </text>

          <rect x="142" y="70" width="86" height="28" rx="6" fill="#EFF6FF" stroke="#2563EB" strokeWidth="2" />
          <text x="185" y="88" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#2563EB">
            길고 굵음 = 분침
          </text>

          <rect x="142" y="106" width="86" height="32" rx="6" fill="#FEF2F2" stroke="#EF4444" strokeWidth="2.4" />
          <text x="185" y="121" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#DC2626">
            가장 얇음 = 초침!
          </text>
          <text x="185" y="133" textAnchor="middle" fontSize="8" fontWeight="800" fill="#B91C1C">
            작은 1칸 = 1초!
          </text>

          <Stickman x={44} y={168} scale={0.72} pose="happy" armL={[-12, 16]} armR={[16, 4]} />
          <SpeechBubble x={76} y={162} w={152} h={50} tailX={62} tailY={176}>
            <text x="152" y="182" textAnchor="middle" fontSize="9.2" fontWeight="900" fill="#DC2626">
              똑딱똑딱 1초마다 달리는
            </text>
            <text x="152" y="199" textAnchor="middle" fontSize="9.2" fontWeight="900" fill={INK}>
              제일 얇은 바늘이 바로 초침!
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 04. 몇 시 몇 분 몇 초 읽기 */
    case 'time3_read_hms':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#EFF6FF')} />
          <HmsClock cx={74} cy={92} r={52} hour={3} minute={10} second={15} />

          <rect x="136" y="34" width="92" height="106" rx="8" fill="#FFFFFF" stroke={INK} strokeWidth="2.2" />
          <text x="182" y="54" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#475569">읽는 순서!</text>
          <text x="182" y="75" textAnchor="middle" fontSize="10.5" fontWeight="900" fill="#0F172A">① 시침 → 3시</text>
          <text x="182" y="96" textAnchor="middle" fontSize="10.5" fontWeight="900" fill="#2563EB">② 분침 → 10분</text>
          <text x="182" y="117" textAnchor="middle" fontSize="10.5" fontWeight="900" fill="#DC2626">③ 초침 → 15초</text>
          <text x="182" y="133" textAnchor="middle" fontSize="8.2" fontWeight="800" fill="#047857">큰 3 = 초침도 15초!</text>

          <rect x="16" y="160" width="154" height="44" rx="8" fill="#0F172A" stroke={INK} strokeWidth="2" />
          <text x="93" y="187" textAnchor="middle" fontSize="13.5" fontWeight="900" fill="#FACC15">
            3시 10분 15초!
          </text>

          <Stickman x={198} y={164} scale={0.72} pose="sunglasses" armL={[-16, 6]} armR={[12, 16]} />
        </svg>
      );

    /* 05. 초침 한 바퀴 = 60초 = 1분! */
    case 'time3_1min_60sec':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#FFFBEB')} />
          <rect x="14" y="12" width="212" height="36" rx="8" fill="#FEF08A" stroke={INK} strokeWidth="2.4" />
          <text x="120" y="35" textAnchor="middle" fontSize="15" fontWeight="900" fill="#DC2626">
            1분 = 60초!
          </text>

          <rect x="14" y="58" width="100" height="82" rx="8" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2" />
          <text x="64" y="77" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#2563EB">분 → 초 바꾸기</text>
          <text x="64" y="99" textAnchor="middle" fontSize="10.5" fontWeight="900" fill={INK}>2분 30초</text>
          <text x="64" y="116" textAnchor="middle" fontSize="8.8" fontWeight="800" fill="#475569">= 120초 + 30초</text>
          <text x="64" y="132" textAnchor="middle" fontSize="10.5" fontWeight="900" fill="#2563EB">= 150초!</text>

          <rect x="126" y="58" width="100" height="82" rx="8" fill="#FFFFFF" stroke="#059669" strokeWidth="2" />
          <text x="176" y="77" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#047857">초 → 분 바꾸기</text>
          <text x="176" y="99" textAnchor="middle" fontSize="10.5" fontWeight="900" fill={INK}>130초</text>
          <text x="176" y="116" textAnchor="middle" fontSize="8.8" fontWeight="800" fill="#475569">= 60 + 60 + 10</text>
          <text x="176" y="132" textAnchor="middle" fontSize="10.5" fontWeight="900" fill="#047857">= 2분 10초!</text>

          <Stickman x={44} y={168} scale={0.72} pose="hero" armL={[-12, 16]} armR={[16, 4]} />
          <SpeechBubble x={76} y={164} w={152} h={46} tailX={62} tailY={178}>
            <text x="152" y="183" textAnchor="middle" fontSize="9.2" fontWeight="900" fill={INK}>
              60초를 묶을 때마다 1분씩 탄생!
            </text>
            <text x="152" y="199" textAnchor="middle" fontSize="9" fontWeight="900" fill="#D97706">
              1분=60, 2분=120, 3분=180!
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 06. [함정] 1시간은 60초가 아니라 3600초! */
    case 'time3_1hour_sec_trap':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#FFF7ED')} />
          <rect x="14" y="12" width="212" height="44" rx="8" fill="#FEF2F2" stroke="#DC2626" strokeWidth="2.4" />
          <text x="120" y="31" textAnchor="middle" fontSize="11.5" fontWeight="900" fill="#DC2626">
            1시간 = 60초?! 완전 땡!!
          </text>
          <line x1="36" y1="27" x2="132" y2="27" stroke="#DC2626" strokeWidth="2.4" />
          <text x="120" y="48" textAnchor="middle" fontSize="9" fontWeight="800" fill={INK}>
            시간 → 분 → 초, 한 단계씩 건너야 해!
          </text>

          <rect x="14" y="66" width="212" height="72" rx="8" fill="#FFFFFF" stroke={INK} strokeWidth="2.2" />
          <text x="52" y="96" textAnchor="middle" fontSize="11.5" fontWeight="900" fill="#0F172A">1시간</text>
          <text x="86" y="96" textAnchor="middle" fontSize="10" fontWeight="900" fill="#2563EB">→</text>
          <text x="120" y="96" textAnchor="middle" fontSize="11.5" fontWeight="900" fill="#2563EB">60분</text>
          <text x="154" y="96" textAnchor="middle" fontSize="10" fontWeight="900" fill="#DC2626">→</text>
          <text x="192" y="96" textAnchor="middle" fontSize="11" fontWeight="900" fill="#DC2626">3600초!</text>
          <text x="120" y="122" textAnchor="middle" fontSize="9.2" fontWeight="900" fill="#047857">
            60분 × 60초 = 3600초! (1시간=60분, 1분=60초)
          </text>

          <Stickman x={44} y={166} scale={0.72} pose="panic" sweat armL={[-12, 16]} armR={[16, 4]} />
          <SpeechBubble x={76} y={162} w={152} h={48} tailX={62} tailY={176}>
            <text x="152" y="182" textAnchor="middle" fontSize="9.2" fontWeight="900" fill="#DC2626">
              1시간을 60초라고 쓰면
            </text>
            <text x="152" y="199" textAnchor="middle" fontSize="9.2" fontWeight="900" fill={INK}>
              1시간이 1분으로 쪼그라들어!!
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 07. ‘시각’(순간) vs ‘시간’(동안) 구별 */
    case 'time3_time_vs_duration':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#FEFCE8')} />
          <rect x="14" y="12" width="212" height="58" rx="8" fill="#FFFFFF" stroke={INK} strokeWidth="2.2" />
          {/* Timeline with two points and arc */}
          <line x1="34" y1="44" x2="206" y2="44" stroke={INK} strokeWidth="2.4" />
          <circle cx="56" cy="44" r="5" fill="#2563EB" />
          <circle cx="184" cy="44" r="5" fill="#2563EB" />
          <text x="56" y="30" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#2563EB">시각 2시</text>
          <text x="184" y="30" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#2563EB">시각 3시 20분</text>
          <path d="M 58 48 Q 120 66 182 48" fill="none" stroke="#DC2626" strokeWidth="2.4" />
          <text x="120" y="64" textAnchor="middle" fontSize="9.2" fontWeight="900" fill="#DC2626">
            시간: 1시간 20분 동안!
          </text>

          <rect x="14" y="80" width="100" height="62" rx="8" fill="#EFF6FF" stroke="#2563EB" strokeWidth="2" />
          <text x="64" y="99" textAnchor="middle" fontSize="10.5" fontWeight="900" fill="#2563EB">시각 (순간 점)</text>
          <text x="64" y="117" textAnchor="middle" fontSize="9.5" fontWeight="800" fill={INK}>2시 20분</text>
          <text x="64" y="132" textAnchor="middle" fontSize="8.2" fontWeight="700" fill="#475569">‘~시’로 끝남!</text>

          <rect x="126" y="80" width="100" height="62" rx="8" fill="#FEF2F2" stroke="#DC2626" strokeWidth="2" />
          <text x="176" y="99" textAnchor="middle" fontSize="10.5" fontWeight="900" fill="#DC2626">시간 (길이 선)</text>
          <text x="176" y="117" textAnchor="middle" fontSize="9.5" fontWeight="800" fill={INK}>1시간 20분</text>
          <text x="176" y="132" textAnchor="middle" fontSize="8.2" fontWeight="700" fill="#475569">‘~시간’ 동안!</text>

          <Stickman x={44} y={168} scale={0.72} pose="sunglasses" armL={[-12, 16]} armR={[16, 4]} />
          <SpeechBubble x={76} y={164} w={152} h={46} tailX={62} tailY={178}>
            <text x="152" y="183" textAnchor="middle" fontSize="9.2" fontWeight="900" fill={INK}>
              ‘몇 시’는 딱 멈춘 점(시각),
            </text>
            <text x="152" y="199" textAnchor="middle" fontSize="9.2" fontWeight="900" fill="#DC2626">
              ‘몇 시간’은 흘러간 길이(시간)!
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 08. 시간의 덧셈 — 같은 단위끼리 더하기 */
    case 'time3_add_simple':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#EFF6FF')} />
          <rect x="18" y="14" width="204" height="122" rx="8" fill="#FFFFFF" stroke={INK} strokeWidth="2.4" />
          <text x="120" y="34" textAnchor="middle" fontSize="10" fontWeight="900" fill="#2563EB">
            시 · 분 · 초 줄 맞춰 세로셈!
          </text>

          <text x="126" y="60" textAnchor="middle" fontSize="12" fontWeight="900" fill={INK}>
            2시   15분   20초
          </text>
          <text x="42" y="84" textAnchor="middle" fontSize="13" fontWeight="900" fill="#2563EB">+</text>
          <text x="126" y="84" textAnchor="middle" fontSize="12" fontWeight="900" fill={INK}>
            1시간 20분  30초
          </text>
          <line x1="34" y1="95" x2="206" y2="95" stroke={INK} strokeWidth="2.2" />
          <text x="126" y="120" textAnchor="middle" fontSize="12.5" fontWeight="900" fill="#047857">
            3시   35분   50초
          </text>

          <Stickman x={44} y={168} scale={0.72} pose="happy" armL={[-12, 16]} armR={[16, 4]} />
          <SpeechBubble x={76} y={164} w={152} h={46} tailX={62} tailY={178}>
            <text x="152" y="183" textAnchor="middle" fontSize="9.2" fontWeight="900" fill={INK}>
              초는 초끼리, 분은 분끼리,
            </text>
            <text x="152" y="199" textAnchor="middle" fontSize="9.2" fontWeight="900" fill="#047857">
              시는 시끼리 따로 더하면 끝!
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 09. 시간의 덧셈 — 초에서 분으로 받아올림 */
    case 'time3_add_carry_sec':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#ECFDF5')} />
          <rect x="16" y="12" width="208" height="128" rx="8" fill="#FFFFFF" stroke={INK} strokeWidth="2.4" />
          <text x="120" y="31" textAnchor="middle" fontSize="9.8" fontWeight="900" fill="#047857">
            60초 차면 1분으로 쏙 받아올림!
          </text>

          {/* Carry badge */}
          <rect x="92" y="38" width="38" height="18" rx="4" fill="#FEF08A" stroke="#DC2626" strokeWidth="1.6" />
          <text x="111" y="50" textAnchor="middle" fontSize="9" fontWeight="900" fill="#DC2626">+1분</text>
          <path d="M 164 56 Q 146 38 130 46" fill="none" stroke="#DC2626" strokeWidth="2" />

          <text x="128" y="72" textAnchor="middle" fontSize="11.5" fontWeight="900" fill={INK}>
            2분   40초
          </text>
          <text x="58" y="92" textAnchor="middle" fontSize="12.5" fontWeight="900" fill="#059669">+</text>
          <text x="128" y="92" textAnchor="middle" fontSize="11.5" fontWeight="900" fill={INK}>
            1분   35초
          </text>
          <line x1="48" y1="101" x2="196" y2="101" stroke={INK} strokeWidth="2.2" />
          <text x="128" y="120" textAnchor="middle" fontSize="11.5" fontWeight="900" fill="#047857">
            4분   15초!
          </text>
          <text x="128" y="134" textAnchor="middle" fontSize="8.5" fontWeight="800" fill="#DC2626">
            (75초 = 60초 + 15초 → 1분 올리고 15초!)
          </text>

          <Stickman x={44} y={168} scale={0.72} pose="headband" armL={[-12, 16]} armR={[16, 4]} />
          <SpeechBubble x={76} y={164} w={152} h={46} tailX={62} tailY={178}>
            <text x="152" y="183" textAnchor="middle" fontSize="9.2" fontWeight="900" fill={INK}>
              초가 60을 넘으면 딱 60만 빼서
            </text>
            <text x="152" y="199" textAnchor="middle" fontSize="9.2" fontWeight="900" fill="#047857">
              앞의 분에 +1 올려주면 성공!
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 10. 시간의 덧셈 — 분에서 시간으로 받아올림 */
    case 'time3_add_carry_min':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#ECFDF5')} />
          <rect x="16" y="12" width="208" height="128" rx="8" fill="#FFFFFF" stroke={INK} strokeWidth="2.4" />
          <text x="120" y="31" textAnchor="middle" fontSize="9.8" fontWeight="900" fill="#047857">
            60분 차면 1시간으로 받아올림!
          </text>

          <rect x="76" y="38" width="44" height="18" rx="4" fill="#FEF08A" stroke="#DC2626" strokeWidth="1.6" />
          <text x="98" y="50" textAnchor="middle" fontSize="8.8" fontWeight="900" fill="#DC2626">+1시간</text>
          <path d="M 156 56 Q 138 38 122 46" fill="none" stroke="#DC2626" strokeWidth="2" />

          <text x="124" y="72" textAnchor="middle" fontSize="11.5" fontWeight="900" fill={INK}>
            2시   45분
          </text>
          <text x="54" y="92" textAnchor="middle" fontSize="12.5" fontWeight="900" fill="#059669">+</text>
          <text x="124" y="92" textAnchor="middle" fontSize="11.5" fontWeight="900" fill={INK}>
            1시간 30분
          </text>
          <line x1="44" y1="101" x2="196" y2="101" stroke={INK} strokeWidth="2.2" />
          <text x="124" y="120" textAnchor="middle" fontSize="11.5" fontWeight="900" fill="#047857">
            4시   15분!
          </text>
          <text x="124" y="134" textAnchor="middle" fontSize="8.5" fontWeight="800" fill="#DC2626">
            (75분 = 60분 + 15분 → 1시간 올리고 15분!)
          </text>

          <Stickman x={44} y={168} scale={0.72} pose="sunglasses" armL={[-12, 16]} armR={[16, 4]} />
          <SpeechBubble x={76} y={164} w={152} h={46} tailX={62} tailY={178}>
            <text x="152" y="183" textAnchor="middle" fontSize="9.2" fontWeight="900" fill={INK}>
              초→분도, 분→시간도 똑같아!
            </text>
            <text x="152" y="199" textAnchor="middle" fontSize="9.2" fontWeight="900" fill="#047857">
              무조건 ‘60’이 찰 때마다 +1!
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 11. [오답 1위] 75초가 왜 1분 5초가 아니야?! */
    case 'time3_100_carry_trap':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#FFF7ED')} />
          <rect x="14" y="14" width="100" height="114" rx="8" fill="#FEF2F2" stroke="#DC2626" strokeWidth="2.2" />
          <text x="64" y="34" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#DC2626">가짜 올림 땡!</text>
          <text x="64" y="56" textAnchor="middle" fontSize="11" fontWeight="900" fill={INK}>40초 + 35초</text>
          <text x="64" y="76" textAnchor="middle" fontSize="11" fontWeight="900" fill="#DC2626">= 75초</text>
          <text x="64" y="98" textAnchor="middle" fontSize="12" fontWeight="900" fill="#DC2626">→ 1분 5초?</text>
          <line x1="28" y1="93" x2="100" y2="93" stroke="#DC2626" strokeWidth="2.4" />
          <text x="64" y="118" textAnchor="middle" fontSize="8.5" fontWeight="800" fill="#991B1B">10진법 착각!</text>

          <rect x="126" y="14" width="100" height="114" rx="8" fill="#ECFDF5" stroke="#059669" strokeWidth="2.4" />
          <text x="176" y="34" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#047857">60진법 정답!</text>
          <text x="176" y="56" textAnchor="middle" fontSize="11" fontWeight="900" fill={INK}>75초 − 60초</text>
          <text x="176" y="76" textAnchor="middle" fontSize="11" fontWeight="900" fill="#047857">= 15초!</text>
          <text x="176" y="98" textAnchor="middle" fontSize="12" fontWeight="900" fill="#047857">→ 1분 15초!</text>
          <text x="176" y="118" textAnchor="middle" fontSize="8.5" fontWeight="800" fill="#065F46">60 빼고 남김!</text>

          <Stickman x={44} y={166} scale={0.72} pose="panic" sweat armL={[-12, 16]} armR={[16, 4]} />
          <SpeechBubble x={76} y={162} w={152} h={48} tailX={62} tailY={176}>
            <text x="152" y="182" textAnchor="middle" fontSize="9.2" fontWeight="900" fill="#DC2626">
              십의 자리 7을 1로 바꿔 쓰면 땡!
            </text>
            <text x="152" y="199" textAnchor="middle" fontSize="9.2" fontWeight="900" fill={INK}>
              꼭 ‘75 − 60 = 15’를 빼고 적어!
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 12. 시간의 뺄셈 — 같은 단위끼리 빼기 */
    case 'time3_sub_simple':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#EFF6FF')} />
          <rect x="18" y="14" width="204" height="122" rx="8" fill="#FFFFFF" stroke={INK} strokeWidth="2.4" />
          <text x="120" y="34" textAnchor="middle" fontSize="10" fontWeight="900" fill="#2563EB">
            뒤(초)부터 차례대로 빼기!
          </text>

          <text x="126" y="60" textAnchor="middle" fontSize="12" fontWeight="900" fill={INK}>
            4시   40분   50초
          </text>
          <text x="42" y="84" textAnchor="middle" fontSize="13" fontWeight="900" fill="#DC2626">−</text>
          <text x="126" y="84" textAnchor="middle" fontSize="12" fontWeight="900" fill={INK}>
            2시간 15분  20초
          </text>
          <line x1="34" y1="95" x2="206" y2="95" stroke={INK} strokeWidth="2.2" />
          <text x="126" y="120" textAnchor="middle" fontSize="12.5" fontWeight="900" fill="#2563EB">
            2시   25분   30초
          </text>

          <Stickman x={44} y={168} scale={0.72} pose="sunglasses" armL={[-12, 16]} armR={[16, 4]} />
          <SpeechBubble x={76} y={164} w={152} h={46} tailX={62} tailY={178}>
            <text x="152" y="183" textAnchor="middle" fontSize="9.2" fontWeight="900" fill={INK}>
              항상 작은 단위(초 → 분 → 시)
            </text>
            <text x="152" y="199" textAnchor="middle" fontSize="9.2" fontWeight="900" fill="#2563EB">
              순서대로 뒤에서부터 빼야 안전!
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 13. 시간의 뺄셈 — 분에서 60초 받아내림 */
    case 'time3_sub_borrow_min':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#ECFDF5')} />
          <rect x="16" y="12" width="208" height="128" rx="8" fill="#FFFFFF" stroke={INK} strokeWidth="2.4" />
          <text x="120" y="30" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#047857">
            10초에서 35초 못 빼! 1분(=60초) 빌려오기!
          </text>

          {/* Borrow markings */}
          <text x="88" y="50" textAnchor="middle" fontSize="10" fontWeight="900" fill="#DC2626">3분</text>
          <text x="154" y="50" textAnchor="middle" fontSize="10" fontWeight="900" fill="#047857">60+10=70초</text>
          <path d="M 98 46 Q 116 36 130 46" fill="none" stroke="#DC2626" strokeWidth="1.8" />

          <text x="124" y="72" textAnchor="middle" fontSize="11.5" fontWeight="900" fill={INK}>
            4분   10초
          </text>
          <line x1="80" y1="68" x2="100" y2="68" stroke="#DC2626" strokeWidth="1.8" />
          <line x1="134" y1="68" x2="162" y2="68" stroke="#DC2626" strokeWidth="1.8" />

          <text x="54" y="92" textAnchor="middle" fontSize="12.5" fontWeight="900" fill="#DC2626">−</text>
          <text x="124" y="92" textAnchor="middle" fontSize="11.5" fontWeight="900" fill={INK}>
            1분   35초
          </text>
          <line x1="44" y1="101" x2="196" y2="101" stroke={INK} strokeWidth="2.2" />
          <text x="124" y="122" textAnchor="middle" fontSize="12" fontWeight="900" fill="#047857">
            2분   35초!
          </text>

          <Stickman x={44} y={168} scale={0.72} pose="headband" armL={[-12, 16]} armR={[16, 4]} />
          <SpeechBubble x={76} y={164} w={152} h={46} tailX={62} tailY={178}>
            <text x="152" y="183" textAnchor="middle" fontSize="9.2" fontWeight="900" fill={INK}>
              분에서 1 줄이고 초엔 +60!
            </text>
            <text x="152" y="199" textAnchor="middle" fontSize="9.2" fontWeight="900" fill="#047857">
              70초 − 35초 = 35초 깔끔 클리어!
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 14. 시간의 뺄셈 — 시에서 60분 받아내림 */
    case 'time3_sub_borrow_hour':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#ECFDF5')} />
          <rect x="16" y="12" width="208" height="128" rx="8" fill="#FFFFFF" stroke={INK} strokeWidth="2.4" />
          <text x="120" y="30" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#047857">
            20분에서 45분 못 빼! 1시간(=60분) 빌려오기!
          </text>

          <text x="86" y="50" textAnchor="middle" fontSize="10" fontWeight="900" fill="#DC2626">4시</text>
          <text x="154" y="50" textAnchor="middle" fontSize="10" fontWeight="900" fill="#047857">60+20=80분</text>
          <path d="M 96 46 Q 116 36 130 46" fill="none" stroke="#DC2626" strokeWidth="1.8" />

          <text x="124" y="72" textAnchor="middle" fontSize="11.5" fontWeight="900" fill={INK}>
            5시   20분
          </text>
          <line x1="78" y1="68" x2="98" y2="68" stroke="#DC2626" strokeWidth="1.8" />
          <line x1="134" y1="68" x2="162" y2="68" stroke="#DC2626" strokeWidth="1.8" />

          <text x="50" y="92" textAnchor="middle" fontSize="12.5" fontWeight="900" fill="#DC2626">−</text>
          <text x="124" y="92" textAnchor="middle" fontSize="11.5" fontWeight="900" fill={INK}>
            1시간 45분
          </text>
          <line x1="42" y1="101" x2="196" y2="101" stroke={INK} strokeWidth="2.2" />
          <text x="124" y="122" textAnchor="middle" fontSize="12" fontWeight="900" fill="#047857">
            3시   35분!
          </text>

          <Stickman x={44} y={168} scale={0.72} pose="hero" armL={[-12, 16]} armR={[16, 4]} />
          <SpeechBubble x={76} y={164} w={152} h={46} tailX={62} tailY={178}>
            <text x="152" y="183" textAnchor="middle" fontSize="9.2" fontWeight="900" fill={INK}>
              시에서 1 줄이고 분엔 +60!
            </text>
            <text x="152" y="199" textAnchor="middle" fontSize="9.2" fontWeight="900" fill="#047857">
              80분 − 45분 = 35분 1초 컷!
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 15. [함정] 빌려올 때 10 말고 무조건 +60! */
    case 'time3_100_borrow_trap':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#FFF7ED')} />
          <rect x="14" y="14" width="100" height="114" rx="8" fill="#FEF2F2" stroke="#DC2626" strokeWidth="2.2" />
          <text x="64" y="34" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#DC2626">가짜 빌림 땡!</text>
          <text x="64" y="56" textAnchor="middle" fontSize="10" fontWeight="900" fill={INK}>1분 빌려와서</text>
          <text x="64" y="78" textAnchor="middle" fontSize="12" fontWeight="900" fill="#DC2626">10초 → 110초?</text>
          <line x1="22" y1="73" x2="106" y2="73" stroke="#DC2626" strokeWidth="2.4" />
          <text x="64" y="98" textAnchor="middle" fontSize="9.5" fontWeight="800" fill="#991B1B">또는 20초?!</text>
          <text x="64" y="116" textAnchor="middle" fontSize="8.5" fontWeight="800" fill="#991B1B">10진법 함정!</text>

          <rect x="126" y="14" width="100" height="114" rx="8" fill="#ECFDF5" stroke="#059669" strokeWidth="2.4" />
          <text x="176" y="34" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#047857">무조건 +60!</text>
          <text x="176" y="56" textAnchor="middle" fontSize="10" fontWeight="900" fill={INK}>1분 빌려오면</text>
          <text x="176" y="78" textAnchor="middle" fontSize="11.5" fontWeight="900" fill="#047857">60 + 10 = 70초!</text>
          <text x="176" y="98" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#2563EB">1시간 빌리면 +60분!</text>
          <text x="176" y="116" textAnchor="middle" fontSize="8.5" fontWeight="800" fill="#065F46">시간은 무조건 60!</text>

          <Stickman x={44} y={166} scale={0.72} pose="crying" armL={[-12, 16]} armR={[16, 4]} />
          <SpeechBubble x={76} y={162} w={152} h={48} tailX={62} tailY={176}>
            <text x="152" y="182" textAnchor="middle" fontSize="9.2" fontWeight="900" fill="#DC2626">
              앞에 숫자 1만 붙이면 대참사!
            </text>
            <text x="152" y="199" textAnchor="middle" fontSize="9.2" fontWeight="900" fill={INK}>
              빌려온 1은 꼭 60으로 바꿔 더해!
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 16. [최종 보스] 걸린 시간 = 끝 시각 − 시작 시각 */
    case 'time3_boss':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#0F172A')} />
          <rect x="12" y="10" width="216" height="28" rx="6" fill="#EF4444" stroke="#FACC15" strokeWidth="2" />
          <text x="120" y="28" textAnchor="middle" fontSize="10.2" fontWeight="900" fill="#FFFFFF">
            BOSS! 연속 60 받아내림 걸린 시간!
          </text>

          <rect x="14" y="46" width="212" height="100" rx="8" fill="#1E293B" stroke="#FACC15" strokeWidth="2.2" />
          <text x="120" y="65" textAnchor="middle" fontSize="9.2" fontWeight="900" fill="#FACC15">
            3시   64분(4+60)   70초(10+60)
          </text>
          <text x="120" y="85" textAnchor="middle" fontSize="10.8" fontWeight="900" fill="#FFFFFF">
            4시   05분   10초   (끝 시각)
          </text>
          <text x="36" y="105" textAnchor="middle" fontSize="12" fontWeight="900" fill="#F87171">−</text>
          <text x="120" y="105" textAnchor="middle" fontSize="10.8" fontWeight="900" fill="#93C5FD">
            2시   15분   20초   (시작 시각)
          </text>
          <line x1="28" y1="114" x2="212" y2="114" stroke="#FACC15" strokeWidth="2" />
          <text x="120" y="135" textAnchor="middle" fontSize="12.5" fontWeight="900" fill="#4ADE80">
            = 1시간 49분 50초!!
          </text>

          <Stickman x={44} y={168} scale={0.72} pose="punch" strokeColor="#FFFFFF" armL={[-12, 16]} armR={[16, 4]} />
          <SpeechBubble x={76} y={162} w={152} h={48} tailX={62} tailY={176}>
            <text x="152" y="182" textAnchor="middle" fontSize="9.2" fontWeight="900" fill="#DC2626">
              초에서 1분, 분에서 또 1시간!
            </text>
            <text x="152" y="199" textAnchor="middle" fontSize="9.2" fontWeight="900" fill={INK}>
              두 번 다 +60 빌려오면 보스 격파!
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 17. 축하해! 3-1 시간 18장 완주 인증! */
    case 'time3_praise':
    default:
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#F5F3FF')} />
          <polygon
            points="120,16 128,36 148,36 132,48 138,68 120,56 102,68 108,48 92,36 112,36"
            fill="#FACC15"
            stroke={INK}
            strokeWidth="2"
          />
          <rect x="20" y="76" width="200" height="58" rx="9" fill="#FFFFFF" stroke="#7C3AED" strokeWidth="2.5" />
          <text x="120" y="98" textAnchor="middle" fontSize="12.5" fontWeight="900" fill="#6D28D9">
            3-1 시간 18장 올클리어!
          </text>
          <text x="120" y="118" textAnchor="middle" fontSize="9.5" fontWeight="800" fill={INK}>
            초침 · 1분=60초 · 60진법 덧뺄셈 완전 정복!
          </text>

          <Stickman x={120} y={156} scale={0.85} pose="hero" armL={[-20, 4]} armR={[20, 4]} />
          <text x="120" y="216" textAnchor="middle" fontSize="10" fontWeight="900" fill="#7C3AED">
            ★ 진짜 60진법 시간 마스터 탄생! ★
          </text>
        </svg>
      );
  }
};
