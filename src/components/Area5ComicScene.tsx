import React from 'react';
import { EpisodeSceneType, PrintInkMode } from '../types/card';

interface Area5ComicSceneProps {
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

export const Area5ComicScene: React.FC<Area5ComicSceneProps> = ({
  sceneType,
  inkMode = 'full',
}) => {
  const isInkSaving = inkMode !== 'full';
  const softBg = (color: string) => (isInkSaving ? '#FFFFFF' : color);

  switch (sceneType) {
    /* 00: 도감 설명서 */
    case 'area5_guide':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#F5F3FF')} />
          <rect x="10" y="10" width="220" height="32" rx="4" fill="#6D28D9" stroke={INK} strokeWidth="2.2" />
          <text x="120" y="31" textAnchor="middle" fontSize="12.5" fontWeight="900" fill="#FFFFFF">
            5-1 다각형 둘레·넓이 18장 맵!
          </text>

          {/* 3-card preview boxes */}
          <rect x="14" y="52" width="66" height="58" rx="4" fill="#DBEAFE" stroke={INK} strokeWidth="2" />
          <text x="47" y="72" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#1D4ED8">
            둘레 공식
          </text>
          <rect x="28" y="80" width="38" height="20" fill="#FFFFFF" stroke="#1D4ED8" strokeWidth="2.2" />
          <text x="47" y="94" textAnchor="middle" fontSize="8" fontWeight="900" fill={INK}>
            겉 한바퀴
          </text>

          <rect x="87" y="52" width="66" height="58" rx="4" fill="#DCFCE7" stroke={INK} strokeWidth="2" />
          <text x="120" y="72" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#047857">
            넓이 6종
          </text>
          <polygon points="103,100 137,100 120,78" fill="#86EFAC" stroke={INK} strokeWidth="1.8" />
          <text x="120" y="97" textAnchor="middle" fontSize="8" fontWeight="900" fill={INK}>
            ÷2 주의!
          </text>

          <rect x="160" y="52" width="66" height="58" rx="4" fill="#FEF3C7" stroke={INK} strokeWidth="2" />
          <text x="193" y="71" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#B45309">
            단위 제곱²
          </text>
          <text x="193" y="88" textAnchor="middle" fontSize="9" fontWeight="900" fill={INK}>
            cm²·m²·km²
          </text>
          <text x="193" y="102" textAnchor="middle" fontSize="7.8" fontWeight="900" fill="#DC2626">
            0이 2배!!
          </text>

          <Stickman x={44} y={154} scale={0.95} pose="hero" armR={[20, 6]} />
          <SpeechBubble x={80} y={124} w={146} h={64} tailX={62} tailY={148}>
            <text x="153" y="144" textAnchor="middle" fontSize="10.5" fontWeight="900" fill="#6D28D9">
              선수학습 2장 + 단위 제곱 계단
            </text>
            <text x="153" y="160" textAnchor="middle" fontSize="10" fontWeight="900" fill={INK}>
              평행·삼각·사다리·마름모 넓이
            </text>
            <text x="153" y="176" textAnchor="middle" fontSize="10" fontWeight="900" fill="#DC2626">
              ÷2 함정 &amp; ㄱ자 보스까지!
            </text>
          </SpeechBubble>

          <rect x="14" y="198" width="212" height="22" rx="4" fill="#1E293B" />
          <text x="120" y="213" textAnchor="middle" fontSize="10" fontWeight="900" fill="#FACC15">
            ★ 3-1 길이(cm·m·km)가 제곱(²)으로 업그레이드! ★
          </text>
        </svg>
      );

    /* 01: [선수학습] 정다각형 & 수직(높이) */
    case 'area5_prereq_poly':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#EFF6FF')} />
          <rect x="10" y="10" width="220" height="26" rx="4" fill="#1D4ED8" stroke={INK} strokeWidth="2" />
          <text x="120" y="27" textAnchor="middle" fontSize="11" fontWeight="900" fill="#FFFFFF">
            선수학습 ① 정다각형 &amp; 수직 높이(90°)
          </text>

          {/* Left: 정다각형 */}
          <rect x="12" y="46" width="102" height="114" rx="4" fill="#FFFFFF" stroke={INK} strokeWidth="2" />
          <text x="63" y="63" textAnchor="middle" fontSize="10" fontWeight="900" fill="#1D4ED8">
            정다각형 (변·각 같음)
          </text>
          <polygon points="36,110 56,110 46,92" fill="#BFDBFE" stroke={INK} strokeWidth="2" />
          <rect x="68" y="88" width="24" height="24" fill="#BFDBFE" stroke={INK} strokeWidth="2" />
          <text x="46" y="128" textAnchor="middle" fontSize="8.5" fontWeight="900" fill={INK}>
            정삼각
          </text>
          <text x="80" y="128" textAnchor="middle" fontSize="8.5" fontWeight="900" fill={INK}>
            정사각
          </text>
          <text x="63" y="148" textAnchor="middle" fontSize="8.8" fontWeight="900" fill="#047857">
            모든 변 길이 똑같아!
          </text>

          {/* Right: 밑변과 수직 높이 */}
          <rect x="122" y="46" width="106" height="114" rx="4" fill="#FFFFFF" stroke={INK} strokeWidth="2" />
          <text x="175" y="63" textAnchor="middle" fontSize="10" fontWeight="900" fill="#DC2626">
            높이 = 밑변과 수직!
          </text>
          <polygon points="134,132 194,132 214,82 154,82" fill="#FEF3C7" stroke={INK} strokeWidth="2" />
          {/* Vertical height dashed */}
          <line x1="154" y1="82" x2="154" y2="132" stroke="#DC2626" strokeWidth="2.4" strokeDasharray="3 2" />
          {/* Right angle mark */}
          <polyline points="154,124 162,124 162,132" fill="none" stroke="#DC2626" strokeWidth="1.8" />
          <text x="166" y="108" fontSize="9.5" fontWeight="900" fill="#DC2626">
            높이
          </text>
          <text x="164" y="146" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#1D4ED8">
            밑변
          </text>
          <line x1="138" y1="107" x2="148" y2="107" stroke="#94A3B8" strokeWidth="1.5" />
          <text x="131" y="96" fontSize="7.5" fontWeight="900" fill="#64748B">
            옆변×
          </text>

          <Stickman x={40} y={170} scale={0.8} pose="headband" />
          <SpeechBubble x={72} y={168} w={156} h={50} tailX={56} tailY={176}>
            <text x="150" y="188" textAnchor="middle" fontSize="10.5" fontWeight="900" fill={INK}>
              비스듬한 옆변은 높이 아님!
            </text>
            <text x="150" y="206" textAnchor="middle" fontSize="10.5" fontWeight="900" fill="#DC2626">
              꼭 바닥과 90° 직각(⊥)인 선!
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 02: [선수학습] 길이 단위 복습 (1m=100cm, 1km=1000m) */
    case 'area5_prereq_unit_len':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#EFF6FF')} />
          <rect x="10" y="10" width="220" height="26" rx="4" fill="#1D4ED8" stroke={INK} strokeWidth="2" />
          <text x="120" y="27" textAnchor="middle" fontSize="11" fontWeight="900" fill="#FFFFFF">
            선수학습 ② 3-1 길이 단위 복습!
          </text>

          {/* 1m = 100cm */}
          <rect x="14" y="46" width="212" height="44" rx="4" fill="#FFFFFF" stroke={INK} strokeWidth="2" />
          <text x="72" y="74" textAnchor="middle" fontSize="15" fontWeight="900" fill="#047857">
            1 m = 100 cm
          </text>
          <rect x="136" y="54" width="80" height="28" rx="4" fill="#DCFCE7" stroke="#047857" strokeWidth="1.5" />
          <text x="176" y="72" textAnchor="middle" fontSize="10.5" fontWeight="900" fill="#047857">
            0이 2개! (×100)
          </text>

          {/* 1km = 1000m */}
          <rect x="14" y="98" width="212" height="44" rx="4" fill="#FFFFFF" stroke={INK} strokeWidth="2" />
          <text x="72" y="126" textAnchor="middle" fontSize="15" fontWeight="900" fill="#6D28D9">
            1 km = 1000 m
          </text>
          <rect x="136" y="106" width="80" height="28" rx="4" fill="#EDE9FE" stroke="#6D28D9" strokeWidth="1.5" />
          <text x="176" y="124" textAnchor="middle" fontSize="10.5" fontWeight="900" fill="#6D28D9">
            0이 3개! (×1000)
          </text>

          <Stickman x={44} y={162} scale={0.85} pose="sunglasses" armR={[18, 8]} />
          <SpeechBubble x={76} y={152} w={152} h={64} tailX={58} tailY={166}>
            <text x="152" y="172" textAnchor="middle" fontSize="10" fontWeight="900" fill="#1D4ED8">
              길이는 1줄이라 100, 1000!
            </text>
            <text x="152" y="189" textAnchor="middle" fontSize="10.5" fontWeight="900" fill="#DC2626">
              넓이(²)는 가로×세로 두 줄!
            </text>
            <text x="152" y="206" textAnchor="middle" fontSize="9.5" fontWeight="900" fill={INK}>
              그래서 0이 두 배로 불어난다!
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 03: 정다각형의 둘레 */
    case 'area5_perimeter_poly':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#F0F9FF')} />
          <rect x="10" y="10" width="220" height="26" rx="4" fill="#0284C7" stroke={INK} strokeWidth="2" />
          <text x="120" y="27" textAnchor="middle" fontSize="11" fontWeight="900" fill="#FFFFFF">
            정다각형 둘레 = 한 변 × 변의 수
          </text>

          {/* 정삼각형 */}
          <rect x="12" y="46" width="68" height="96" rx="4" fill="#FFFFFF" stroke={INK} strokeWidth="2" />
          <polygon points="46,60 22,104 70,104" fill="#BAE6FD" stroke="#DC2626" strokeWidth="2.8" />
          <text x="46" y="96" textAnchor="middle" fontSize="9" fontWeight="900" fill={INK}>
            5 cm
          </text>
          <text x="46" y="122" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#0284C7">
            5 × 3
          </text>
          <text x="46" y="135" textAnchor="middle" fontSize="10" fontWeight="900" fill="#DC2626">
            = 15 cm
          </text>

          {/* 정사각형 */}
          <rect x="86" y="46" width="68" height="96" rx="4" fill="#FFFFFF" stroke={INK} strokeWidth="2" />
          <rect x="102" y="64" width="36" height="36" fill="#BBF7D0" stroke="#DC2626" strokeWidth="2.8" />
          <text x="120" y="86" textAnchor="middle" fontSize="9" fontWeight="900" fill={INK}>
            5 cm
          </text>
          <text x="120" y="122" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#047857">
            5 × 4
          </text>
          <text x="120" y="135" textAnchor="middle" fontSize="10" fontWeight="900" fill="#DC2626">
            = 20 cm
          </text>

          {/* 정오각형 */}
          <rect x="160" y="46" width="68" height="96" rx="4" fill="#FFFFFF" stroke={INK} strokeWidth="2" />
          <polygon
            points="194,60 214,76 206,102 182,102 174,76"
            fill="#FDE68A"
            stroke="#DC2626"
            strokeWidth="2.8"
          />
          <text x="194" y="88" textAnchor="middle" fontSize="9" fontWeight="900" fill={INK}>
            5 cm
          </text>
          <text x="194" y="122" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#B45309">
            5 × 5
          </text>
          <text x="194" y="135" textAnchor="middle" fontSize="10" fontWeight="900" fill="#DC2626">
            = 25 cm
          </text>

          <Stickman x={40} y={162} scale={0.85} pose="happy" />
          <SpeechBubble x={72} y={154} w={156} h={62} tailX={56} tailY={166}>
            <text x="150" y="174" textAnchor="middle" fontSize="10.5" fontWeight="900" fill="#DC2626">
              둘레 = 빨간 울타리 한 바퀴!
            </text>
            <text x="150" y="191" textAnchor="middle" fontSize="10" fontWeight="900" fill={INK}>
              같은 길이 변만 빙 둘러 있으니까
            </text>
            <text x="150" y="207" textAnchor="middle" fontSize="10" fontWeight="900" fill="#0284C7">
              변의 개수만 곱하면 끝!
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 04: 사각형의 둘레 */
    case 'area5_perimeter_rect':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#ECFDF5')} />
          <rect x="10" y="10" width="220" height="26" rx="4" fill="#047857" stroke={INK} strokeWidth="2" />
          <text x="120" y="27" textAnchor="middle" fontSize="11" fontWeight="900" fill="#FFFFFF">
            직사각형·평행사변형·마름모 둘레!
          </text>

          {/* Rect */}
          <rect x="14" y="46" width="102" height="106" rx="4" fill="#FFFFFF" stroke={INK} strokeWidth="2" />
          <rect x="30" y="64" width="68" height="42" fill="#D1FAE5" stroke={INK} strokeWidth="2" />
          <line x1="30" y1="64" x2="98" y2="64" stroke="#2563EB" strokeWidth="3.2" />
          <line x1="30" y1="106" x2="98" y2="106" stroke="#2563EB" strokeWidth="3.2" />
          <line x1="30" y1="64" x2="30" y2="106" stroke="#DC2626" strokeWidth="3.2" />
          <line x1="98" y1="64" x2="98" y2="106" stroke="#DC2626" strokeWidth="3.2" />
          <text x="64" y="59" textAnchor="middle" fontSize="9" fontWeight="900" fill="#2563EB">
            가로 6
          </text>
          <text x="109" y="89" fontSize="9" fontWeight="900" fill="#DC2626">
            4
          </text>
          <text x="65" y="126" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#047857">
            (6 + 4) × 2
          </text>
          <text x="65" y="142" textAnchor="middle" fontSize="10" fontWeight="900" fill={INK}>
            = 20 cm
          </text>

          {/* Rhombus */}
          <rect x="124" y="46" width="102" height="106" rx="4" fill="#FFFFFF" stroke={INK} strokeWidth="2" />
          <polygon points="175,58 205,85 175,112 145,85" fill="#FEF3C7" stroke="#D97706" strokeWidth="2.8" />
          <text x="175" y="88" textAnchor="middle" fontSize="9" fontWeight="900" fill="#B45309">
            마름모
          </text>
          <text x="200" y="68" fontSize="9" fontWeight="900" fill={INK}>
            5
          </text>
          <text x="175" y="127" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#B45309">
            네 변 같다!
          </text>
          <text x="175" y="142" textAnchor="middle" fontSize="10" fontWeight="900" fill="#DC2626">
            5 × 4 = 20 cm
          </text>

          <Stickman x={40} y={168} scale={0.8} pose="sunglasses" />
          <SpeechBubble x={72} y={162} w={156} h={56} tailX={56} tailY={172}>
            <text x="150" y="182" textAnchor="middle" fontSize="10" fontWeight="900" fill="#047857">
              직사각·평행사변형: (가로+세로)×2
            </text>
            <text x="150" y="198" textAnchor="middle" fontSize="10" fontWeight="900" fill="#B45309">
              마름모·정사각형: (한 변)×4
            </text>
            <text x="150" y="212" textAnchor="middle" fontSize="9" fontWeight="900" fill="#DC2626">
              괄호 빼먹고 6+4×2 하면 오답!
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 05: 넓이의 단위 1 cm² */
    case 'area5_area_1cm2':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#FFFBEB')} />
          <rect x="10" y="10" width="220" height="26" rx="4" fill="#D97706" stroke={INK} strokeWidth="2" />
          <text x="120" y="27" textAnchor="middle" fontSize="11" fontWeight="900" fill="#FFFFFF">
            넓이의 기준 ① 1 cm² (제곱센티미터)
          </text>

          {/* Big 1 cm² tile */}
          <rect x="20" y="54" width="66" height="66" fill="#FDE047" stroke={INK} strokeWidth="2.8" />
          <text x="53" y="48" textAnchor="middle" fontSize="10.5" fontWeight="900" fill="#1D4ED8">
            1 cm
          </text>
          <text x="98" y="90" fontSize="10.5" fontWeight="900" fill="#1D4ED8">
            1 cm
          </text>
          <text x="53" y="92" textAnchor="middle" fontSize="14" fontWeight="900" fill="#DC2626">
            1 cm²
          </text>

          {/* Meaning of ² */}
          <rect x="128" y="48" width="98" height="82" rx="4" fill="#FFFFFF" stroke={INK} strokeWidth="2" />
          <text x="177" y="68" textAnchor="middle" fontSize="11.5" fontWeight="900" fill="#B45309">
            작은 ‘2’의 비밀!
          </text>
          <text x="177" y="92" textAnchor="middle" fontSize="17" fontWeight="900" fill="#DC2626">
            cm<tspan fontSize="12" dy="-6">2</tspan>
          </text>
          <text x="177" y="114" textAnchor="middle" fontSize="9.5" fontWeight="900" fill={INK}>
            cm를 가로×세로
          </text>
          <text x="177" y="126" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#1D4ED8">
            2번 곱했단 뜻!
          </text>

          <Stickman x={44} y={156} scale={0.85} pose="happy" armR={[18, 4]} />
          <SpeechBubble x={76} y={144} w={152} h={72} tailX={58} tailY={160}>
            <text x="152" y="164" textAnchor="middle" fontSize="10.5" fontWeight="900" fill="#B45309">
              넓이 = 1 cm² 타일 개수!
            </text>
            <text x="152" y="182" textAnchor="middle" fontSize="10" fontWeight="900" fill={INK}>
              타일이 6개 채워지면 6 cm²!
            </text>
            <text x="152" y="200" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#DC2626">
              선(둘레)은 cm, 면(넓이)은 cm²!
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 06: 직사각형·정사각형 넓이 */
    case 'area5_rect_square_area':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#EFF6FF')} />
          <rect x="10" y="10" width="220" height="26" rx="4" fill="#1D4ED8" stroke={INK} strokeWidth="2" />
          <text x="120" y="27" textAnchor="middle" fontSize="11" fontWeight="900" fill="#FFFFFF">
            직사각형 넓이 = 가로 × 세로
          </text>

          {/* 4x3 grid */}
          <rect x="20" y="54" width="112" height="84" fill="#BFDBFE" stroke={INK} strokeWidth="2.4" />
          {[1, 2, 3].map((i) => (
            <line key={`v${i}`} x1={20 + i * 28} y1="54" x2={20 + i * 28} y2="138" stroke="#1D4ED8" strokeWidth="1.4" />
          ))}
          {[1, 2].map((j) => (
            <line key={`h${j}`} x1="20" y1={54 + j * 28} x2="132" y2={54 + j * 28} stroke="#1D4ED8" strokeWidth="1.4" />
          ))}
          <text x="76" y="48" textAnchor="middle" fontSize="10" fontWeight="900" fill="#1D4ED8">
            가로 4 cm (4칸)
          </text>
          <text x="142" y="99" fontSize="9.5" fontWeight="900" fill="#DC2626">
            세로 3 cm
          </text>
          <text x="34" y="72" textAnchor="middle" fontSize="8.5" fontWeight="900" fill={INK}>
            1cm²
          </text>

          {/* Formula card */}
          <rect x="140" y="114" width="88" height="44" rx="4" fill="#FEF08A" stroke={INK} strokeWidth="2" />
          <text x="184" y="133" textAnchor="middle" fontSize="10.5" fontWeight="900" fill={INK}>
            4 × 3 = 12
          </text>
          <text x="184" y="150" textAnchor="middle" fontSize="11" fontWeight="900" fill="#DC2626">
            12 cm²!
          </text>

          <Stickman x={40} y={168} scale={0.8} pose="sunglasses" />
          <SpeechBubble x={72} y={166} w={156} h={52} tailX={56} tailY={176}>
            <text x="150" y="185" textAnchor="middle" fontSize="10" fontWeight="900" fill="#1D4ED8">
              직사각형: 가로 × 세로
            </text>
            <text x="150" y="203" textAnchor="middle" fontSize="10" fontWeight="900" fill="#047857">
              정사각형: 한 변 × 한 변!
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 07: [단위 연결 함정] 1 m² = 10000 cm² */
    case 'area5_1m2_trap':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#FEF2F2')} />
          <rect x="10" y="10" width="220" height="26" rx="4" fill="#DC2626" stroke={INK} strokeWidth="2" />
          <text x="120" y="27" textAnchor="middle" fontSize="11" fontWeight="900" fill="#FFFFFF">
            [함정] 1 m² = 100 cm²? 땡! 10000 cm²!
          </text>

          {/* 1m x 1m square */}
          <rect x="20" y="54" width="82" height="82" fill="#FEE2E2" stroke={INK} strokeWidth="2.4" />
          {[1, 2, 3, 4].map((i) => (
            <g key={i}>
              <line x1={20 + i * 16.4} y1="54" x2={20 + i * 16.4} y2="136" stroke="#FCA5A5" strokeWidth="1" />
              <line x1="20" y1={54 + i * 16.4} x2="102" y2={54 + i * 16.4} stroke="#FCA5A5" strokeWidth="1" />
            </g>
          ))}
          <text x="61" y="48" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#DC2626">
            1 m = 100 cm
          </text>
          <text x="61" y="150" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#1D4ED8">
            세로도 100 cm!
          </text>
          <text x="61" y="99" textAnchor="middle" fontSize="13" fontWeight="900" fill={INK}>
            1 m²
          </text>

          {/* Wrong vs Right */}
          <rect x="114" y="46" width="114" height="44" rx="4" fill="#FFFFFF" stroke="#DC2626" strokeWidth="2" />
          <text x="171" y="64" textAnchor="middle" fontSize="10" fontWeight="900" fill="#94A3B8">
            1 m² = 100 cm²
          </text>
          <line x1="126" y1="60" x2="216" y2="60" stroke="#DC2626" strokeWidth="2.4" />
          <text x="171" y="81" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#DC2626">
            한 번만 곱하면 대참사!
          </text>

          <rect x="114" y="96" width="114" height="52" rx="4" fill="#DCFCE7" stroke="#047857" strokeWidth="2.2" />
          <text x="171" y="114" textAnchor="middle" fontSize="10" fontWeight="900" fill="#047857">
            100 cm × 100 cm
          </text>
          <text x="171" y="135" textAnchor="middle" fontSize="13.5" fontWeight="900" fill="#047857">
            = 10000 cm²!
          </text>

          <Stickman x={40} y={170} scale={0.8} pose="panic" sweat />
          <SpeechBubble x={72} y={162} w={156} h={56} tailX={56} tailY={174}>
            <text x="150" y="182" textAnchor="middle" fontSize="10" fontWeight="900" fill="#DC2626">
              ²(제곱) = 100을 두 번 곱하기!
            </text>
            <text x="150" y="200" textAnchor="middle" fontSize="10.5" fontWeight="900" fill="#047857">
              0이 2개 + 2개 = 0이 4개(만)!
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 08: [단위 통합] 1 km² = 1000000 m² & cm²·m²·km² 계단 */
    case 'area5_1km2_scale':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#F5F3FF')} />
          <rect x="10" y="10" width="220" height="26" rx="4" fill="#6D28D9" stroke={INK} strokeWidth="2" />
          <text x="120" y="27" textAnchor="middle" fontSize="11" fontWeight="900" fill="#FFFFFF">
            [단위 통합] cm² ↔ m² ↔ km² 계단!
          </text>

          {/* Unit ladder */}
          <rect x="16" y="46" width="64" height="36" rx="4" fill="#EDE9FE" stroke="#6D28D9" strokeWidth="2.2" />
          <text x="48" y="69" textAnchor="middle" fontSize="13" fontWeight="900" fill="#6D28D9">
            1 km²
          </text>

          <path d="M 82 64 L 112 64" stroke="#DC2626" strokeWidth="2.2" />
          <polygon points="110,60 118,64 110,68" fill="#DC2626" />
          <text x="100" y="57" textAnchor="middle" fontSize="8" fontWeight="900" fill="#DC2626">
            ×1000²
          </text>
          <text x="100" y="77" textAnchor="middle" fontSize="8" fontWeight="900" fill="#DC2626">
            (0×6)
          </text>

          <rect x="120" y="46" width="106" height="36" rx="4" fill="#FFFFFF" stroke={INK} strokeWidth="2" />
          <text x="173" y="69" textAnchor="middle" fontSize="12.5" fontWeight="900" fill="#047857">
            1000000 m²
          </text>

          {/* Second row: 1 m² = 10000 cm² */}
          <rect x="16" y="92" width="64" height="36" rx="4" fill="#DCFCE7" stroke="#047857" strokeWidth="2.2" />
          <text x="48" y="115" textAnchor="middle" fontSize="13" fontWeight="900" fill="#047857">
            1 m²
          </text>

          <path d="M 82 110 L 112 110" stroke="#1D4ED8" strokeWidth="2.2" />
          <polygon points="110,106 118,110 110,114" fill="#1D4ED8" />
          <text x="100" y="103" textAnchor="middle" fontSize="8" fontWeight="900" fill="#1D4ED8">
            ×100²
          </text>
          <text x="100" y="123" textAnchor="middle" fontSize="8" fontWeight="900" fill="#1D4ED8">
            (0×4)
          </text>

          <rect x="120" y="92" width="106" height="36" rx="4" fill="#FFFFFF" stroke={INK} strokeWidth="2" />
          <text x="173" y="115" textAnchor="middle" fontSize="12.5" fontWeight="900" fill="#1D4ED8">
            10000 cm²
          </text>

          {/* Bottom rule connecting 3-1 length */}
          <Stickman x={40} y={162} scale={0.85} pose="hero" />
          <SpeechBubble x={72} y={142} w={156} h={74} tailX={56} tailY={160}>
            <text x="150" y="160" textAnchor="middle" fontSize="10" fontWeight="900" fill="#6D28D9">
              1 km = 1000 m (0이 3개)
            </text>
            <text x="150" y="177" textAnchor="middle" fontSize="10.5" fontWeight="900" fill="#DC2626">
              1 km² = 1000×1000 = 100만 m²!
            </text>
            <text x="150" y="195" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#047857">
              단위 제곱(²)에선 0 개수 2배!
            </text>
            <text x="150" y="210" textAnchor="middle" fontSize="8.8" fontWeight="900" fill={INK}>
              (km²→m² 0여섯, m²→cm² 0넷!)
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 09: [오답 1위] 둘레 vs 넓이 */
    case 'area5_perim_vs_area_trap':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#FEF2F2')} />
          <rect x="10" y="10" width="220" height="26" rx="4" fill="#DC2626" stroke={INK} strokeWidth="2" />
          <text x="120" y="27" textAnchor="middle" fontSize="11" fontWeight="900" fill="#FFFFFF">
            [오답 1위] 둘레 같아도 넓이는 다르다!
          </text>

          {/* 1x5 rect */}
          <rect x="14" y="46" width="102" height="102" rx="4" fill="#FFFFFF" stroke={INK} strokeWidth="2" />
          <rect x="25" y="70" width="80" height="16" fill="#FCA5A5" stroke="#DC2626" strokeWidth="2.2" />
          <text x="65" y="64" textAnchor="middle" fontSize="9" fontWeight="900" fill={INK}>
            가로 5, 세로 1
          </text>
          <text x="65" y="110" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#1D4ED8">
            둘레: 12 cm
          </text>
          <text x="65" y="128" textAnchor="middle" fontSize="10.5" fontWeight="900" fill="#DC2626">
            넓이: 5 cm²
          </text>

          {/* 3x3 square */}
          <rect x="124" y="46" width="102" height="102" rx="4" fill="#FFFFFF" stroke={INK} strokeWidth="2" />
          <rect x="151" y="54" width="48" height="48" fill="#86EFAC" stroke="#047857" strokeWidth="2.2" />
          <text x="175" y="82" textAnchor="middle" fontSize="9.5" fontWeight="900" fill={INK}>
            3 × 3
          </text>
          <text x="175" y="117" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#1D4ED8">
            둘레: 12 cm
          </text>
          <text x="175" y="135" textAnchor="middle" fontSize="10.5" fontWeight="900" fill="#047857">
            넓이: 9 cm²!
          </text>

          <Stickman x={40} y={168} scale={0.8} pose="crying" />
          <SpeechBubble x={72} y={158} w={156} h={60} tailX={56} tailY={172}>
            <text x="150" y="177" textAnchor="middle" fontSize="10" fontWeight="900" fill="#1D4ED8">
              둘레는 똑같이 12 cm인데
            </text>
            <text x="150" y="194" textAnchor="middle" fontSize="10.5" fontWeight="900" fill="#DC2626">
              넓이는 5 cm² vs 9 cm²!
            </text>
            <text x="150" y="210" textAnchor="middle" fontSize="9" fontWeight="900" fill={INK}>
              정사각형에 가까울수록 넓이 커져!
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 10: 평행사변형 넓이 */
    case 'area5_parallelogram':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#ECFDF5')} />
          <rect x="10" y="10" width="220" height="26" rx="4" fill="#047857" stroke={INK} strokeWidth="2" />
          <text x="120" y="27" textAnchor="middle" fontSize="11" fontWeight="900" fill="#FFFFFF">
            평행사변형 넓이 = 밑변 × 높이!
          </text>

          {/* Left: parallelogram with cut triangle */}
          <rect x="12" y="44" width="216" height="104" rx="4" fill="#FFFFFF" stroke={INK} strokeWidth="2" />
          {/* Left triangle cut */}
          <polygon points="22,120 46,120 46,64" fill="#FDE047" stroke="#DC2626" strokeWidth="1.8" strokeDasharray="3 2" />
          {/* Main trapezoid body */}
          <polygon points="46,120 100,120 124,64 46,64" fill="#86EFAC" stroke={INK} strokeWidth="2" />
          {/* Right moved ghost */}
          <polygon points="100,120 124,120 124,64" fill="#FDE047" opacity="0.65" stroke="#DC2626" strokeWidth="1.6" strokeDasharray="3 2" />
          <path d="M 35 104 Q 72 138 112 108" fill="none" stroke="#DC2626" strokeWidth="2" />
          <polygon points="108,106 115,106 112,113" fill="#DC2626" />

          <text x="72" y="138" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#1D4ED8">
            밑변 5 cm
          </text>
          <text x="64" y="96" fontSize="9" fontWeight="900" fill="#DC2626">
            높이3
          </text>

          {/* Arrow to rectangle */}
          <path d="M 134 92 L 154 92" stroke={INK} strokeWidth="2.4" />
          <polygon points="152,88 160,92 152,96" fill={INK} />

          <rect x="164" y="64" width="52" height="56" fill="#A7F3D0" stroke={INK} strokeWidth="2" />
          <text x="190" y="90" textAnchor="middle" fontSize="9.5" fontWeight="900" fill={INK}>
            직사각형
          </text>
          <text x="190" y="106" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#047857">
            변신!
          </text>
          <text x="190" y="136" textAnchor="middle" fontSize="10" fontWeight="900" fill="#DC2626">
            5×3=15cm²
          </text>

          <Stickman x={40} y={168} scale={0.8} pose="headband" />
          <SpeechBubble x={72} y={158} w={156} h={60} tailX={56} tailY={172}>
            <text x="150" y="177" textAnchor="middle" fontSize="10" fontWeight="900" fill="#047857">
              왼쪽 삼각형 싹둑 잘라 붙이면
            </text>
            <text x="150" y="194" textAnchor="middle" fontSize="10.5" fontWeight="900" fill={INK}>
              직사각형(가로×세로)이랑 똑같아!
            </text>
            <text x="150" y="210" textAnchor="middle" fontSize="9" fontWeight="900" fill="#DC2626">
              ★ 비스듬한 옆변 곱하면 오답!
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 11: 삼각형 넓이 */
    case 'area5_triangle':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#FFFBEB')} />
          <rect x="10" y="10" width="220" height="26" rx="4" fill="#D97706" stroke={INK} strokeWidth="2" />
          <text x="120" y="27" textAnchor="middle" fontSize="11" fontWeight="900" fill="#FFFFFF">
            삼각형 넓이 = 밑변 × 높이 ÷ 2!
          </text>

          {/* 2 triangles forming parallelogram */}
          <rect x="14" y="44" width="212" height="102" rx="4" fill="#FFFFFF" stroke={INK} strokeWidth="2" />
          <polygon points="30,118 110,118 76,60" fill="#FDE047" stroke={INK} strokeWidth="2.2" />
          <polygon points="110,118 76,60 156,60" fill="#FED7AA" stroke="#DC2626" strokeWidth="2" strokeDasharray="3 2" />
          <line x1="76" y1="60" x2="76" y2="118" stroke="#1D4ED8" strokeWidth="2" strokeDasharray="3 2" />
          <polyline points="76,110 84,110 84,118" fill="none" stroke="#1D4ED8" strokeWidth="1.6" />
          <text x="70" y="134" textAnchor="middle" fontSize="9.5" fontWeight="900" fill={INK}>
            밑변
          </text>
          <text x="89" y="96" fontSize="9" fontWeight="900" fill="#1D4ED8">
            높이
          </text>

          <text x="188" y="80" textAnchor="middle" fontSize="10" fontWeight="900" fill="#B45309">
            2개 합체 =
          </text>
          <text x="188" y="96" textAnchor="middle" fontSize="10" fontWeight="900" fill="#B45309">
            평행사변형!
          </text>
          <text x="188" y="118" textAnchor="middle" fontSize="11.5" fontWeight="900" fill="#DC2626">
            1개는 ÷ 2!
          </text>

          <Stickman x={40} y={166} scale={0.8} pose="sunglasses" />
          <SpeechBubble x={72} y={156} w={156} h={62} tailX={56} tailY={170}>
            <text x="150" y="176" textAnchor="middle" fontSize="10" fontWeight="900" fill="#B45309">
              똑같은 삼각형 하나 더 복제해
            </text>
            <text x="150" y="193" textAnchor="middle" fontSize="10" fontWeight="900" fill={INK}>
              뒤집어 붙이면 평행사변형!
            </text>
            <text x="150" y="210" textAnchor="middle" fontSize="10.5" fontWeight="900" fill="#DC2626">
              그래서 마지막에 무조건 ÷ 2!
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 12: [함정] 삼·사·마 ÷2 실종 사건 */
    case 'area5_div2_forget_trap':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#FEF2F2')} />
          <rect x="10" y="10" width="220" height="26" rx="4" fill="#DC2626" stroke={INK} strokeWidth="2" />
          <text x="120" y="27" textAnchor="middle" fontSize="11" fontWeight="900" fill="#FFFFFF">
            [함정] 삼·사·마 넓이 ÷2 실종 사건!!
          </text>

          <rect x="14" y="44" width="212" height="50" rx="4" fill="#FFFFFF" stroke="#DC2626" strokeWidth="2" />
          <text x="120" y="64" textAnchor="middle" fontSize="11" fontWeight="900" fill="#DC2626">
            삼각형 · 사다리꼴 · 마름모
          </text>
          <text x="120" y="83" textAnchor="middle" fontSize="11.5" fontWeight="900" fill={INK}>
            전부 큰 도형의 절반 → <tspan fill="#DC2626">÷ 2 필수!</tspan>
          </text>

          {/* Reverse rule box */}
          <rect x="14" y="100" width="212" height="50" rx="4" fill="#FEF3C7" stroke={INK} strokeWidth="2" />
          <text x="120" y="119" textAnchor="middle" fontSize="10" fontWeight="900" fill="#B45309">
            거꾸로 넓이로 밑변·높이 구할 땐?
          </text>
          <text x="120" y="139" textAnchor="middle" fontSize="11" fontWeight="900" fill="#1D4ED8">
            예) 넓이 12, 밑변 6 → 높이 = (12 <tspan fill="#DC2626">× 2</tspan>) ÷ 6 = 4!
          </text>

          <Stickman x={40} y={168} scale={0.8} pose="panic" sweat />
          <SpeechBubble x={72} y={158} w={156} h={60} tailX={56} tailY={172}>
            <text x="150" y="177" textAnchor="middle" fontSize="10" fontWeight="900" fill="#DC2626">
              넓이 구할 땐 ÷ 2 까먹기 금지!
            </text>
            <text x="150" y="195" textAnchor="middle" fontSize="10" fontWeight="900" fill="#1D4ED8">
              밑변·높이 거꾸로 찾을 땐
            </text>
            <text x="150" y="211" textAnchor="middle" fontSize="10" fontWeight="900" fill="#047857">
              넓이에 먼저 × 2 해주는 센스!
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 13: 사다리꼴 넓이 */
    case 'area5_trapezoid':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#ECFDF5')} />
          <rect x="10" y="10" width="220" height="26" rx="4" fill="#047857" stroke={INK} strokeWidth="2" />
          <text x="120" y="27" textAnchor="middle" fontSize="11" fontWeight="900" fill="#FFFFFF">
            사다리꼴 = (윗변+아랫변) × 높이 ÷ 2
          </text>

          <rect x="14" y="44" width="212" height="102" rx="4" fill="#FFFFFF" stroke={INK} strokeWidth="2" />
          {/* Trapezoid 1 */}
          <polygon points="36,64 78,64 102,118 22,118" fill="#86EFAC" stroke={INK} strokeWidth="2.2" />
          {/* Flipped trapezoid 2 */}
          <polygon points="78,64 158,64 144,118 102,118" fill="#BAE6FD" stroke="#1D4ED8" strokeWidth="2" strokeDasharray="3 2" />
          <line x1="36" y1="64" x2="36" y2="118" stroke="#DC2626" strokeWidth="2" strokeDasharray="3 2" />
          <text x="57" y="59" textAnchor="middle" fontSize="9" fontWeight="900" fill="#047857">
            윗변
          </text>
          <text x="62" y="132" textAnchor="middle" fontSize="9" fontWeight="900" fill="#047857">
            아랫변
          </text>
          <text x="118" y="59" textAnchor="middle" fontSize="8.5" fontWeight="900" fill="#1D4ED8">
            +아랫변
          </text>
          <text x="51" y="96" fontSize="8.5" fontWeight="900" fill="#DC2626">
            높이
          </text>

          <text x="190" y="84" textAnchor="middle" fontSize="9.5" fontWeight="900" fill={INK}>
            합체하면
          </text>
          <text x="190" y="100" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#1D4ED8">
            큰 평행사변형!
          </text>
          <text x="190" y="120" textAnchor="middle" fontSize="10.5" fontWeight="900" fill="#DC2626">
            절반이니 ÷ 2
          </text>

          <Stickman x={40} y={166} scale={0.8} pose="headband" />
          <SpeechBubble x={72} y={156} w={156} h={62} tailX={56} tailY={170}>
            <text x="150" y="176" textAnchor="middle" fontSize="10" fontWeight="900" fill="#047857">
              윗변 + 아랫변을 꼭 괄호 ( )로
            </text>
            <text x="150" y="193" textAnchor="middle" fontSize="10" fontWeight="900" fill={INK}>
              먼저 더한 뒤 높이 곱하고 ÷ 2!
            </text>
            <text x="150" y="210" textAnchor="middle" fontSize="9" fontWeight="900" fill="#DC2626">
              괄호 안 쓰면 덧셈 순서 틀려!
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 14: 마름모 넓이 */
    case 'area5_rhombus':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#ECFDF5')} />
          <rect x="10" y="10" width="220" height="26" rx="4" fill="#047857" stroke={INK} strokeWidth="2" />
          <text x="120" y="27" textAnchor="middle" fontSize="11" fontWeight="900" fill="#FFFFFF">
            마름모 = 한 대각선 × 다른 대각선 ÷ 2
          </text>

          <rect x="14" y="44" width="212" height="102" rx="4" fill="#FFFFFF" stroke={INK} strokeWidth="2" />
          {/* Outer rectangle */}
          <rect x="28" y="54" width="96" height="72" fill="#F1F5F9" stroke="#64748B" strokeWidth="1.8" strokeDasharray="3 2" />
          {/* Rhombus inside */}
          <polygon points="76,54 124,90 76,126 28,90" fill="#6EE7B7" stroke={INK} strokeWidth="2.2" />
          {/* Diagonals */}
          <line x1="28" y1="90" x2="124" y2="90" stroke="#DC2626" strokeWidth="2" strokeDasharray="3 2" />
          <line x1="76" y1="54" x2="76" y2="126" stroke="#1D4ED8" strokeWidth="2" strokeDasharray="3 2" />

          <text x="76" y="140" textAnchor="middle" fontSize="9" fontWeight="900" fill="#DC2626">
            대각선1 (가로)
          </text>
          <text x="178" y="76" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#1D4ED8">
            바깥 직사각형
          </text>
          <text x="178" y="94" textAnchor="middle" fontSize="9.5" fontWeight="900" fill={INK}>
            8조각 중 4조각!
          </text>
          <text x="178" y="114" textAnchor="middle" fontSize="11" fontWeight="900" fill="#DC2626">
            딱 절반(÷ 2)!
          </text>

          <Stickman x={40} y={166} scale={0.8} pose="sunglasses" />
          <SpeechBubble x={72} y={156} w={156} h={62} tailX={56} tailY={170}>
            <text x="150" y="176" textAnchor="middle" fontSize="10" fontWeight="900" fill="#047857">
              둘레는 변 길이 × 4 이지만,
            </text>
            <text x="150" y="193" textAnchor="middle" fontSize="10" fontWeight="900" fill="#DC2626">
              넓이는 안쪽 두 대각선 × ÷ 2!
            </text>
            <text x="150" y="210" textAnchor="middle" fontSize="9" fontWeight="900" fill={INK}>
              대각선 반토막만 곱하지 않게 주의!
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 15: [스페셜] 밑변과 높이가 같으면 넓이 쌍둥이 */
    case 'area5_same_base_height':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#F5F3FF')} />
          <rect x="10" y="10" width="220" height="26" rx="4" fill="#6D28D9" stroke={INK} strokeWidth="2" />
          <text x="120" y="27" textAnchor="middle" fontSize="10.5" fontWeight="900" fill="#FFFFFF">
            [스페셜] 밑변·높이 같으면 넓이 100% 같다!
          </text>

          <rect x="14" y="44" width="212" height="102" rx="4" fill="#FFFFFF" stroke={INK} strokeWidth="2" />
          {/* Parallel lines */}
          <line x1="20" y1="62" x2="220" y2="62" stroke="#6D28D9" strokeWidth="2" />
          <line x1="20" y1="126" x2="220" y2="126" stroke="#6D28D9" strokeWidth="2" />
          <text x="206" y="57" textAnchor="middle" fontSize="8.5" fontWeight="900" fill="#6D28D9">
            평행선
          </text>

          {/* Triangle 1 */}
          <polygon points="30,126 70,126 50,62" fill="#DDD6FE" stroke={INK} strokeWidth="2" />
          {/* Triangle 2 tilted */}
          <polygon points="88,126 128,126 146,62" fill="#BAE6FD" stroke={INK} strokeWidth="2" />
          {/* Triangle 3 super tilted */}
          <polygon points="154,126 194,126 218,62" fill="#FDE68A" stroke={INK} strokeWidth="2" />

          <text x="50" y="140" textAnchor="middle" fontSize="9" fontWeight="900" fill="#6D28D9">
            밑변 4
          </text>
          <text x="108" y="140" textAnchor="middle" fontSize="9" fontWeight="900" fill="#0284C7">
            밑변 4
          </text>
          <text x="174" y="140" textAnchor="middle" fontSize="9" fontWeight="900" fill="#B45309">
            밑변 4
          </text>

          <Stickman x={40} y={166} scale={0.8} pose="happy" />
          <SpeechBubble x={72} y={156} w={156} h={62} tailX={56} tailY={170}>
            <text x="150" y="176" textAnchor="middle" fontSize="10" fontWeight="900" fill="#6D28D9">
              셋 다 모양은 완전 다르지만
            </text>
            <text x="150" y="193" textAnchor="middle" fontSize="10" fontWeight="900" fill="#DC2626">
              밑변(4)과 높이(평행선 간격) 같아!
            </text>
            <text x="150" y="210" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#047857">
              세 삼각형의 넓이는 모두 똑같아!
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 16: [최종 보스] 계단형(ㄱ자) 둘레·넓이 */
    case 'area5_boss':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#FFF1F2')} />
          <rect x="10" y="10" width="220" height="26" rx="4" fill="#1E293B" stroke={INK} strokeWidth="2" />
          <text x="120" y="27" textAnchor="middle" fontSize="11" fontWeight="900" fill="#FACC15">
            [보스] 계단형(ㄱ자) 둘레 밀기 &amp; 넓이 빼기!
          </text>

          {/* L-shape */}
          <rect x="14" y="44" width="102" height="106" rx="4" fill="#FFFFFF" stroke={INK} strokeWidth="2" />
          <polygon points="28,58 64,58 64,88 100,88 100,122 28,122" fill="#FDBA74" stroke={INK} strokeWidth="2.2" />
          {/* Ghost pushed edges */}
          <line x1="64" y1="58" x2="100" y2="58" stroke="#DC2626" strokeWidth="1.8" strokeDasharray="3 2" />
          <line x1="100" y1="58" x2="100" y2="88" stroke="#DC2626" strokeWidth="1.8" strokeDasharray="3 2" />
          <text x="64" y="138" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#DC2626">
            밀면 큰 직사각형 둘레!
          </text>

          {/* Area strategies */}
          <rect x="124" y="44" width="102" height="106" rx="4" fill="#FFFFFF" stroke={INK} strokeWidth="2" />
          <text x="175" y="64" textAnchor="middle" fontSize="10" fontWeight="900" fill="#1D4ED8">
            넓이 필살기 2가지
          </text>
          <text x="175" y="86" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#047857">
            ① 두 조각 쪼개 더하기
          </text>
          <text x="175" y="106" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#DC2626">
            ② 큰 넓이 − 빈 넓이
          </text>
          <text x="175" y="134" textAnchor="middle" fontSize="9" fontWeight="900" fill={INK}>
            빈 곳 빼기가 초고속!
          </text>

          <Stickman x={40} y={168} scale={0.8} pose="punch" armR={[18, 6]} />
          <SpeechBubble x={72} y={158} w={156} h={60} tailX={56} tailY={172}>
            <text x="150" y="177" textAnchor="middle" fontSize="10" fontWeight="900" fill="#DC2626">
              둘레는 움푹 들어간 선을 밖으로!
            </text>
            <text x="150" y="195" textAnchor="middle" fontSize="10" fontWeight="900" fill="#1D4ED8">
              넓이는 큰 직사각형 − 빈 직사각형!
            </text>
            <text x="150" y="211" textAnchor="middle" fontSize="9" fontWeight="900" fill="#047857">
              단위(cm vs cm²)만 끝까지 확인!
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 17: 완주 칭찬 포카 */
    case 'area5_praise':
    default:
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#F5F3FF')} />
          <rect x="10" y="10" width="220" height="28" rx="4" fill="#6D28D9" stroke={INK} strokeWidth="2" />
          <text x="120" y="28" textAnchor="middle" fontSize="12" fontWeight="900" fill="#FACC15">
            ★ 5-1 다각형 둘레·넓이 18장 완주! ★
          </text>

          {/* Trophy badge */}
          <circle cx="120" cy="82" r="34" fill="#FEF08A" stroke={INK} strokeWidth="2.4" />
          <text x="120" y="76" textAnchor="middle" fontSize="11.5" fontWeight="900" fill="#B45309">
            측정 마스터
          </text>
          <text x="120" y="96" textAnchor="middle" fontSize="12" fontWeight="900" fill="#6D28D9">
            cm²·m²·km²
          </text>

          <Stickman x={44} y={136} scale={0.9} pose="hero" armL={[-16, 4]} armR={[16, 4]} />
          <Stickman x={196} y={136} scale={0.9} pose="happy" armL={[-16, 4]} armR={[16, 4]} />

          <rect x="16" y="186" width="208" height="32" rx="4" fill="#FFFFFF" stroke={INK} strokeWidth="2" />
          <text x="120" y="201" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#1D4ED8">
            둘레·넓이 6공식 + ÷2 함정 + 단위 제곱 계단 정복!
          </text>
          <text x="120" y="213" textAnchor="middle" fontSize="8.8" fontWeight="900" fill="#047857">
            3-1 길이(cm·m·km)와 완벽 연결 완료!
          </text>
        </svg>
      );
  }
};
