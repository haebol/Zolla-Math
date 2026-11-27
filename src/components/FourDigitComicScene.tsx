import React from 'react';
import { EpisodeSceneType, PrintInkMode } from '../types/card';

interface FourDigitComicSceneProps {
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

export const FourDigitComicScene: React.FC<FourDigitComicSceneProps> = ({
  sceneType,
  inkMode = 'full',
}) => {
  const isInkSaving = inkMode !== 'full';
  const softBg = (fullColor: string) => (isInkSaving ? '#FFFFFF' : fullColor);

  switch (sceneType) {
    /* 00. 네 자리 수 도감 설명서 */
    case 'fourdigit_guide':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#F0F9FF')} />
          <rect x="12" y="12" width="216" height="44" rx="8" fill="#FEF08A" stroke={INK} strokeWidth="2.5" />
          <text x="120" y="31" textAnchor="middle" fontSize="13.5" fontWeight="900" fill={INK}>
            네 자리 수 도감 18장 완주 맵!
          </text>
          <text x="120" y="48" textAnchor="middle" fontSize="9.5" fontWeight="800" fill="#B45309">
            999 다음 1000 탄생부터 크기 비교·카드 퍼즐까지!
          </text>

          <g transform="translate(14, 66)">
            <rect x="0" y="0" width="100" height="58" rx="6" fill="#FFFFFF" stroke={INK} strokeWidth="2" />
            <text x="50" y="16" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#2563EB">
              1000 &amp; 자릿값
            </text>
            <text x="50" y="35" textAnchor="middle" fontSize="13.5" fontWeight="900" fill={INK}>
              3 0 4 0
            </text>
            <text x="50" y="50" textAnchor="middle" fontSize="8.5" fontWeight="800" fill="#DC2626">
              빈자리 0 빼먹지 마!
            </text>
          </g>

          <g transform="translate(126, 66)">
            <rect x="0" y="0" width="100" height="58" rx="6" fill="#FFFFFF" stroke={INK} strokeWidth="2" />
            <text x="50" y="16" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#059669">
              뛰어 세기 &amp; 비교
            </text>
            <text x="50" y="35" textAnchor="middle" fontSize="12" fontWeight="900" fill={INK}>
              2950 → 3050
            </text>
            <text x="50" y="50" textAnchor="middle" fontSize="8.5" fontWeight="800" fill="#7C3AED">
              왼쪽(천)부터 대결!
            </text>
          </g>

          <Stickman x={54} y={168} pose="hero" armR={[18, 4]} />
          <SpeechBubble x={92} y={136} w={132} h={48} tailX={74} tailY={156}>
            <text x="158" y="156" textAnchor="middle" fontSize="10.5" fontWeight="900" fill={INK}>
              선수학습 2장 + 함정까지
            </text>
            <text x="158" y="173" textAnchor="middle" fontSize="11" fontWeight="900" fill="#DC2626">
              네 자리 수 마스터!!
            </text>
          </SpeechBubble>
          <text x="160" y="216" textAnchor="middle" fontSize="10" fontWeight="900" fill="#475569">
            ★ 천·백·십·일 정복 출발! ★
          </text>
        </svg>
      );

    /* 01. [선수학습] 10이 10개 모이면 100! */
    case 'fourdigit_prereq_100':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#EFF6FF')} />
          <rect x="14" y="12" width="212" height="30" rx="7" fill="#DBEAFE" stroke={INK} strokeWidth="2.2" />
          <text x="120" y="32" textAnchor="middle" fontSize="13" fontWeight="900" fill="#1E40AF">
            10원 동전 10개 = 100원!
          </text>

          <g transform="translate(16, 52)">
            <rect x="0" y="0" width="124" height="106" rx="8" fill="#FFFFFF" stroke={INK} strokeWidth="2.2" />
            {[0, 1].map((row) =>
              [0, 1, 2, 3, 4].map((col) => (
                <g key={`${row}-${col}`} transform={`translate(${18 + col * 22}, ${28 + row * 30})`}>
                  <circle cx="0" cy="0" r="9.5" fill="#FDE047" stroke={INK} strokeWidth="1.6" />
                  <text x="0" y="3.5" textAnchor="middle" fontSize="8" fontWeight="900" fill={INK}>10</text>
                </g>
              ))
            )}
            <text x="62" y="92" textAnchor="middle" fontSize="10.5" fontWeight="900" fill="#B45309">
              10이 10개 모였다!
            </text>
          </g>

          <path d="M 144 104 L 156 104" stroke="#DC2626" strokeWidth="3" strokeLinecap="round" />
          <polygon points="154,98 162,104 154,110" fill="#DC2626" />

          <g transform="translate(166, 56)">
            <rect x="0" y="0" width="60" height="96" rx="8" fill="#FEF9C3" stroke={INK} strokeWidth="2.2" />
            <circle cx="30" cy="40" r="22" fill="#E2E8F0" stroke={INK} strokeWidth="2.2" />
            <text x="30" y="45" textAnchor="middle" fontSize="14" fontWeight="900" fill={INK}>100</text>
            <text x="30" y="82" textAnchor="middle" fontSize="10" fontWeight="900" fill="#1D4ED8">백 (100)</text>
          </g>

          <Stickman x={54} y={196} scale={0.76} pose="happy" armR={[18, -4]} />
          <SpeechBubble x={92} y={174} w={134} h={42} tailX={74} tailY={190}>
            <text x="159" y="192" textAnchor="middle" fontSize="10" fontWeight="900" fill={INK}>
              99보다 1 큰 수도 100!
            </text>
            <text x="159" y="207" textAnchor="middle" fontSize="10" fontWeight="900" fill="#2563EB">
              10이 10개면 100 변신!
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 02. [선수학습] 세 자리 수 425 해부하기 */
    case 'fourdigit_prereq_3digit':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#EFF6FF')} />
          <rect x="14" y="12" width="212" height="30" rx="7" fill="#DBEAFE" stroke={INK} strokeWidth="2.2" />
          <text x="120" y="32" textAnchor="middle" fontSize="13" fontWeight="900" fill="#1E40AF">
            세 자리 수 425 = 400 + 20 + 5
          </text>

          <g transform="translate(16, 52)">
            <rect x="0" y="0" width="64" height="108" rx="8" fill="#DBEAFE" stroke={INK} strokeWidth="2" />
            <text x="32" y="20" textAnchor="middle" fontSize="10" fontWeight="900" fill="#1E40AF">백의 자리</text>
            <text x="32" y="54" textAnchor="middle" fontSize="26" fontWeight="900" fill="#2563EB">4</text>
            <text x="32" y="78" textAnchor="middle" fontSize="9.5" fontWeight="800" fill={INK}>100이 4개</text>
            <text x="32" y="96" textAnchor="middle" fontSize="12" fontWeight="900" fill="#1E40AF">400</text>

            <rect x="72" y="0" width="64" height="108" rx="8" fill="#FEF08A" stroke={INK} strokeWidth="2" />
            <text x="104" y="20" textAnchor="middle" fontSize="10" fontWeight="900" fill="#92400E">십의 자리</text>
            <text x="104" y="54" textAnchor="middle" fontSize="26" fontWeight="900" fill="#B45309">2</text>
            <text x="104" y="78" textAnchor="middle" fontSize="9.5" fontWeight="800" fill={INK}>10이 2개</text>
            <text x="104" y="96" textAnchor="middle" fontSize="12" fontWeight="900" fill="#92400E">20</text>

            <rect x="144" y="0" width="64" height="108" rx="8" fill="#FCE7F3" stroke={INK} strokeWidth="2" />
            <text x="176" y="20" textAnchor="middle" fontSize="10" fontWeight="900" fill="#9D174D">일의 자리</text>
            <text x="176" y="54" textAnchor="middle" fontSize="26" fontWeight="900" fill="#BE185D">5</text>
            <text x="176" y="78" textAnchor="middle" fontSize="9.5" fontWeight="800" fill={INK}>1이 5개</text>
            <text x="176" y="96" textAnchor="middle" fontSize="12" fontWeight="900" fill="#9D174D">5</text>
          </g>

          <Stickman x={54} y={196} scale={0.76} pose="sunglasses" armR={[18, -4]} />
          <SpeechBubble x={92} y={174} w={134} h={42} tailX={74} tailY={190}>
            <text x="159" y="192" textAnchor="middle" fontSize="10" fontWeight="900" fill={INK}>
              자리마다 가치가 다르지!
            </text>
            <text x="159" y="207" textAnchor="middle" fontSize="10" fontWeight="900" fill="#2563EB">
              합쳐서 사백이십오(425)!
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 03. 100이 10개 모이면 1000(천)! */
    case 'fourdigit_make_1000':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#FEFCE8')} />
          <rect x="14" y="10" width="212" height="30" rx="7" fill="#FEF08A" stroke={INK} strokeWidth="2.2" />
          <text x="120" y="30" textAnchor="middle" fontSize="12.5" fontWeight="900" fill="#92400E">
            100이 10개 모이면 1000(천) 탄생!!
          </text>

          {/* 1000원 지폐 */}
          <g transform="translate(22, 48)">
            <rect x="0" y="0" width="196" height="60" rx="8" fill="#BFDBFE" stroke={INK} strokeWidth="2.4" />
            <rect x="8" y="8" width="180" height="44" rx="5" fill="#EFF6FF" stroke="#2563EB" strokeWidth="1.6" />
            <text x="26" y="36" fontSize="18" fontWeight="900" fill="#1D4ED8">1000</text>
            <text x="132" y="28" textAnchor="middle" fontSize="11.5" fontWeight="900" fill={INK}>천 원 = 100 × 10</text>
            <text x="132" y="45" textAnchor="middle" fontSize="9.5" fontWeight="800" fill="#2563EB">100원 동전 10개와 같아!</text>
          </g>

          {/* 3가지 경로 */}
          <g transform="translate(18, 118)">
            <rect x="0" y="0" width="204" height="44" rx="7" fill="#FFFFFF" stroke={INK} strokeWidth="2" />
            <text x="102" y="17" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#475569">
              모두 1000이 되는 순간!
            </text>
            <text x="102" y="35" textAnchor="middle" fontSize="10.5" fontWeight="900" fill="#DC2626">
              900+100 = 1000 · 990+10 = 1000 · 999+1 = 1000
            </text>
          </g>

          <Stickman x={54} y={196} scale={0.74} pose="hero" armR={[18, -4]} />
          <SpeechBubble x={92} y={174} w={134} h={42} tailX={74} tailY={190}>
            <text x="159" y="192" textAnchor="middle" fontSize="10" fontWeight="900" fill={INK}>
              999 다음엔 네 자리 수
            </text>
            <text x="159" y="207" textAnchor="middle" fontSize="10.5" fontWeight="900" fill="#B45309">
              1000(천)이 짠 하고 등장!
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 04. 몇천 읽고 쓰기 */
    case 'fourdigit_thousands':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#EFF6FF')} />
          <rect x="14" y="12" width="212" height="30" rx="7" fill="#DBEAFE" stroke={INK} strokeWidth="2.2" />
          <text x="120" y="32" textAnchor="middle" fontSize="12.5" fontWeight="900" fill="#1E40AF">
            ‘몇천’은 숫자 뒤에 0이 3개(000)!
          </text>

          {/* 1000 지폐 3장 겹침 */}
          <g transform="translate(22, 52)">
            {[0, 1, 2].map((i) => (
              <g key={i} transform={`translate(${i * 12}, ${i * 18})`}>
                <rect x="0" y="0" width="96" height="40" rx="6" fill="#93C5FD" stroke={INK} strokeWidth="2" />
                <text x="48" y="25" textAnchor="middle" fontSize="14" fontWeight="900" fill="#1E3A8A">
                  1000원
                </text>
              </g>
            ))}
          </g>

          {/* 결과 카드 */}
          <g transform="translate(152, 54)">
            <rect x="0" y="0" width="74" height="100" rx="8" fill="#FFFFFF" stroke={INK} strokeWidth="2.4" />
            <text x="37" y="20" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#475569">1000이 3개</text>
            <text x="37" y="52" textAnchor="middle" fontSize="20" fontWeight="900" fill="#2563EB">
              3<tspan fill="#DC2626">000</tspan>
            </text>
            <text x="37" y="75" textAnchor="middle" fontSize="13" fontWeight="900" fill={INK}>삼천</text>
            <text x="37" y="92" textAnchor="middle" fontSize="8.5" fontWeight="800" fill="#DC2626">0이 3개!</text>
          </g>

          <Stickman x={54} y={196} scale={0.76} pose="happy" armR={[18, -4]} />
          <SpeechBubble x={92} y={174} w={134} h={42} tailX={74} tailY={190}>
            <text x="159" y="192" textAnchor="middle" fontSize="10" fontWeight="900" fill={INK}>
              1000이 7개면 7000(칠천)!
            </text>
            <text x="159" y="207" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#2563EB">
              뒤에 0 세 개 꼭 세어 봐!
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 05. 네 자리 수 합체! (2537) */
    case 'fourdigit_4digit_read_write':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#ECFDF5')} />
          <rect x="14" y="10" width="212" height="28" rx="6" fill="#D1FAE5" stroke={INK} strokeWidth="2" />
          <text x="120" y="29" textAnchor="middle" fontSize="12" fontWeight="900" fill="#065F46">
            천·백·십·일 4단 합체 → 2537!
          </text>

          <g transform="translate(14, 46)">
            {[
              { label: '천의 자리', num: '2', val: '2000', bg: '#DBEAFE', col: '#1D4ED8' },
              { label: '백의 자리', num: '5', val: '500', bg: '#D1FAE5', col: '#059669' },
              { label: '십의 자리', num: '3', val: '30', bg: '#FEF08A', col: '#B45309' },
              { label: '일의 자리', num: '7', val: '7', bg: '#FCE7F3', col: '#BE185D' },
            ].map((item, idx) => (
              <g key={idx} transform={`translate(${idx * 54}, 0)`}>
                <rect x="0" y="0" width="50" height="84" rx="7" fill={item.bg} stroke={INK} strokeWidth="2" />
                <text x="25" y="16" textAnchor="middle" fontSize="8.5" fontWeight="900" fill={item.col}>{item.label}</text>
                <text x="25" y="50" textAnchor="middle" fontSize="24" fontWeight="900" fill={item.col}>{item.num}</text>
                <text x="25" y="72" textAnchor="middle" fontSize="10" fontWeight="900" fill={INK}>{item.val}</text>
              </g>
            ))}

            <rect x="12" y="92" width="188" height="26" rx="6" fill="#FFFFFF" stroke={INK} strokeWidth="2" />
            <text x="106" y="109" textAnchor="middle" fontSize="11.5" fontWeight="900" fill="#059669">
              쓰기: 2537  ·  읽기: 이천오백삼십칠
            </text>
          </g>

          <Stickman x={54} y={198} scale={0.74} pose="sunglasses" armR={[18, -4]} />
          <SpeechBubble x={92} y={176} w={134} h={40} tailX={74} tailY={190}>
            <text x="159" y="194" textAnchor="middle" fontSize="10" fontWeight="900" fill={INK}>
              2000+500+30+7 = 2537!
            </text>
            <text x="159" y="209" textAnchor="middle" fontSize="9.5" fontWeight="800" fill="#059669">
              자리 순서대로 쏙 붙이기!
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 06. 가운데 0 쓰기 함정! 삼천사십 = 3040 */
    case 'fourdigit_zero_middle_trap':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#FEF2F2')} />
          <rect x="14" y="10" width="212" height="28" rx="6" fill="#FEE2E2" stroke={INK} strokeWidth="2" />
          <text x="120" y="29" textAnchor="middle" fontSize="11.5" fontWeight="900" fill="#B91C1C">
            문제: ‘삼천사십’을 숫자로 쓰면?!
          </text>

          {/* 땡 */}
          <g transform="translate(14, 46)">
            <rect x="0" y="0" width="98" height="114" rx="8" fill="#FFFFFF" stroke="#EF4444" strokeWidth="2.4" />
            <text x="49" y="18" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#DC2626">빈자리 빼먹기 땡!</text>
            <text x="49" y="56" textAnchor="middle" fontSize="24" fontWeight="900" fill="#DC2626">340</text>
            <text x="49" y="80" textAnchor="middle" fontSize="9" fontWeight="800" fill="#DC2626">이건 삼백사십이야!!</text>
            <text x="49" y="98" textAnchor="middle" fontSize="8.5" fontWeight="800" fill="#64748B">(세 자리로 줄어듦)</text>
            <line x1="18" y1="36" x2="80" y2="66" stroke="#EF4444" strokeWidth="2.8" />
          </g>

          {/* 정답 */}
          <g transform="translate(128, 46)">
            <rect x="0" y="0" width="98" height="114" rx="8" fill="#FFFFFF" stroke="#16A34A" strokeWidth="2.6" />
            <text x="49" y="18" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#15803D">빈자리는 0으로! ✓</text>
            <text x="49" y="56" textAnchor="middle" fontSize="23" fontWeight="900" fill="#15803D">
              3<tspan fill="#DC2626">0</tspan>4<tspan fill="#DC2626">0</tspan>
            </text>
            <text x="49" y="80" textAnchor="middle" fontSize="8.5" fontWeight="900" fill={INK}>천3 · 백0 · 십4 · 일0</text>
            <text x="49" y="98" textAnchor="middle" fontSize="9" fontWeight="900" fill="#15803D">사천오 → 4005 ◎</text>
          </g>

          <Stickman x={50} y={196} scale={0.76} pose="panic" armR={[18, -6]} sweat />
          <SpeechBubble x={86} y={172} w={140} h={46} tailX={68} tailY={188}>
            <text x="156" y="191" textAnchor="middle" fontSize="10" fontWeight="900" fill={INK}>
              네 자리 수는 무조건 4칸!
            </text>
            <text x="156" y="207" textAnchor="middle" fontSize="10" fontWeight="900" fill="#DC2626">
              없는 자리는 0이 보초 서야 해!
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 07. 읽기 함정! 1025 */
    case 'fourdigit_zero_read_trap':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#FEF2F2')} />
          <rect x="14" y="10" width="212" height="28" rx="6" fill="#FEE2E2" stroke={INK} strokeWidth="2" />
          <text x="120" y="29" textAnchor="middle" fontSize="11.5" fontWeight="900" fill="#B91C1C">
            읽기 함정! 1025 어떻게 읽을까?
          </text>

          <g transform="translate(18, 46)">
            <rect x="0" y="0" width="204" height="50" rx="8" fill="#FFFFFF" stroke="#EF4444" strokeWidth="2.2" />
            <text x="102" y="20" textAnchor="middle" fontSize="10" fontWeight="900" fill="#DC2626">
              ✕ 이렇게 읽으면 땡!!
            </text>
            <text x="102" y="40" textAnchor="middle" fontSize="13.5" fontWeight="900" fill="#94A3B8">
              일천 영백 이십오 (✕✕)
            </text>
            <line x1="28" y1="35" x2="176" y2="35" stroke="#EF4444" strokeWidth="2.2" />
          </g>

          <g transform="translate(18, 104)">
            <rect x="0" y="0" width="204" height="58" rx="8" fill="#ECFDF5" stroke="#16A34A" strokeWidth="2.5" />
            <text x="102" y="19" textAnchor="middle" fontSize="10" fontWeight="900" fill="#15803D">
              ✓ 올바른 읽기! (1은 그냥 ‘천’, 0은 건너뛰기!)
            </text>
            <text x="102" y="46" textAnchor="middle" fontSize="18" fontWeight="900" fill="#15803D">
              천이십오 ◎
            </text>
          </g>

          <Stickman x={54} y={196} scale={0.74} pose="headband" armR={[18, -4]} />
          <SpeechBubble x={92} y={174} w={134} h={42} tailX={74} tailY={190}>
            <text x="159" y="192" textAnchor="middle" fontSize="10" fontWeight="900" fill={INK}>
              맨 앞 1은 ‘일천’ 안 하고 ‘천’!
            </text>
            <text x="159" y="207" textAnchor="middle" fontSize="10" fontWeight="900" fill="#15803D">
              가운데 0은 입 꾹 닫기!!
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 08. 자릿값 함정! 3525에서 앞 5와 뒤 5 */
    case 'fourdigit_digit_value_trap':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#FEF2F2')} />
          <rect x="14" y="10" width="212" height="28" rx="6" fill="#FEE2E2" stroke={INK} strokeWidth="2" />
          <text x="120" y="29" textAnchor="middle" fontSize="11.5" fontWeight="900" fill="#B91C1C">
            3525에서 두 개의 5! 몸값이 100배 차이!
          </text>

          <g transform="translate(18, 46)">
            <rect x="0" y="0" width="204" height="114" rx="10" fill="#FFFFFF" stroke={INK} strokeWidth="2.4" />
            <text x="102" y="42" textAnchor="middle" fontSize="30" fontWeight="900" fill={INK}>
              3 <tspan fill="#2563EB">5</tspan> 2 <tspan fill="#DC2626">5</tspan>
            </text>

            {/* 앞 5 화살표 */}
            <path d="M 88 48 L 54 68" stroke="#2563EB" strokeWidth="2.2" />
            <rect x="10" y="68" width="90" height="38" rx="6" fill="#DBEAFE" stroke="#2563EB" strokeWidth="1.6" />
            <text x="55" y="83" textAnchor="middle" fontSize="8.5" fontWeight="900" fill="#1E40AF">백의 자리 숫자: 5</text>
            <text x="55" y="99" textAnchor="middle" fontSize="10.5" fontWeight="900" fill="#2563EB">나타내는 값: 500</text>

            {/* 뒤 5 화살표 */}
            <path d="M 134 48 L 154 68" stroke="#DC2626" strokeWidth="2.2" />
            <rect x="108" y="68" width="88" height="38" rx="6" fill="#FEE2E2" stroke="#DC2626" strokeWidth="1.6" />
            <text x="152" y="83" textAnchor="middle" fontSize="8.5" fontWeight="900" fill="#991B1B">일의 자리 숫자: 5</text>
            <text x="152" y="99" textAnchor="middle" fontSize="10.5" fontWeight="900" fill="#DC2626">나타내는 값: 5</text>
          </g>

          <Stickman x={54} y={196} scale={0.74} pose="strain" armR={[18, -4]} sweat />
          <SpeechBubble x={92} y={174} w={134} h={42} tailX={74} tailY={190}>
            <text x="159" y="192" textAnchor="middle" fontSize="9.5" fontWeight="900" fill={INK}>
              “숫자” 물으면 한 글자(5)!
            </text>
            <text x="159" y="207" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#2563EB">
              “나타내는 값” 물으면 500!
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 09. 2400은 100이 몇 개? */
    case 'fourdigit_100_count_trick':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#ECFDF5')} />
          <rect x="14" y="12" width="212" height="30" rx="7" fill="#D1FAE5" stroke={INK} strokeWidth="2.2" />
          <text x="120" y="32" textAnchor="middle" fontSize="12.5" fontWeight="900" fill="#065F46">
            2400은 100이 몇 개? 뒤 0 두 개 가리기!
          </text>

          <g transform="translate(18, 52)">
            <rect x="0" y="0" width="204" height="108" rx="10" fill="#FFFFFF" stroke={INK} strokeWidth="2.2" />
            <text x="102" y="22" textAnchor="middle" fontSize="10" fontWeight="900" fill="#475569">
              1000엔 100이 10개! 2000엔 20개!
            </text>

            {/* 2400 숫자 & 가림 스티커 */}
            <rect x="34" y="32" width="136" height="42" rx="8" fill="#ECFDF5" stroke="#059669" strokeWidth="2" />
            <text x="74" y="61" textAnchor="middle" fontSize="24" fontWeight="900" fill="#059669">24</text>
            <rect x="104" y="37" width="52" height="32" rx="5" fill="#94A3B8" stroke={INK} strokeWidth="1.6" />
            <text x="130" y="57" textAnchor="middle" fontSize="13" fontWeight="900" fill="#FFFFFF">가림!</text>

            <text x="102" y="96" textAnchor="middle" fontSize="13" fontWeight="900" fill="#059669">
              → 100이 모두 24개!!
            </text>
          </g>

          <Stickman x={54} y={196} scale={0.76} pose="sunglasses" armR={[18, -4]} />
          <SpeechBubble x={92} y={174} w={134} h={42} tailX={74} tailY={190}>
            <text x="159" y="192" textAnchor="middle" fontSize="10" fontWeight="900" fill={INK}>
              “100이 몇 개?” → 뒤 00 가려!
            </text>
            <text x="159" y="207" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#059669">
              “10이 몇 개?” → 뒤 0 가려(240)!
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 10. 뛰어 세기 ① — 1000씩 · 100씩 */
    case 'fourdigit_skip_1000_100':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#EFF6FF')} />
          <rect x="14" y="12" width="212" height="28" rx="6" fill="#DBEAFE" stroke={INK} strokeWidth="2" />
          <text x="120" y="31" textAnchor="middle" fontSize="12.5" fontWeight="900" fill="#1E40AF">
            뛰어 세기! 그 자리 숫자만 +1씩 점프!
          </text>

          {/* 1000씩 */}
          <g transform="translate(14, 48)">
            <rect x="0" y="0" width="212" height="52" rx="8" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2" />
            <text x="12" y="17" fontSize="9.5" fontWeight="900" fill="#2563EB">1000씩 뛰어 세기 (천의 자리 +1)</text>
            <text x="106" y="40" textAnchor="middle" fontSize="14.5" fontWeight="900" fill={INK}>
              <tspan fill="#DC2626">2</tspan>450 → <tspan fill="#DC2626">3</tspan>450 → <tspan fill="#DC2626">4</tspan>450
            </text>
          </g>

          {/* 100씩 */}
          <g transform="translate(14, 108)">
            <rect x="0" y="0" width="212" height="52" rx="8" fill="#FFFFFF" stroke="#059669" strokeWidth="2" />
            <text x="12" y="17" fontSize="9.5" fontWeight="900" fill="#059669">100씩 뛰어 세기 (백의 자리 +1)</text>
            <text x="106" y="40" textAnchor="middle" fontSize="14.5" fontWeight="900" fill={INK}>
              2<tspan fill="#2563EB">4</tspan>50 → 2<tspan fill="#2563EB">5</tspan>50 → 2<tspan fill="#2563EB">6</tspan>50
            </text>
          </g>

          <Stickman x={54} y={196} scale={0.76} pose="happy" armR={[18, -4]} />
          <SpeechBubble x={92} y={174} w={134} h={42} tailX={74} tailY={190}>
            <text x="159" y="192" textAnchor="middle" fontSize="10" fontWeight="900" fill={INK}>
              1000씩이면 천 자리만 변해!
            </text>
            <text x="159" y="207" textAnchor="middle" fontSize="10" fontWeight="900" fill="#059669">
              100씩이면 백 자리만 +1!
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 11. 뛰어 세기 올림 함정! 2950 -> 3050 */
    case 'fourdigit_skip_carry_trap':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#FEF2F2')} />
          <rect x="14" y="10" width="212" height="28" rx="6" fill="#FEE2E2" stroke={INK} strokeWidth="2" />
          <text x="120" y="29" textAnchor="middle" fontSize="11.5" fontWeight="900" fill="#B91C1C">
            2950에서 100씩 뛰면? 21050 땡!!
          </text>

          <g transform="translate(16, 46)">
            <rect x="0" y="0" width="208" height="114" rx="10" fill="#FFFFFF" stroke={INK} strokeWidth="2.4" />
            <text x="104" y="24" textAnchor="middle" fontSize="13" fontWeight="900" fill={INK}>
              2850 → 2950 → <tspan fill="#16A34A" fontSize="17">3050!</tspan>
            </text>

            {/* 땡 vs 정답 비교 */}
            <rect x="10" y="38" width="90" height="64" rx="6" fill="#FEF2F2" stroke="#EF4444" strokeWidth="1.8" />
            <text x="55" y="56" textAnchor="middle" fontSize="9" fontWeight="900" fill="#DC2626">자리 올림 망각 ✕</text>
            <text x="55" y="82" textAnchor="middle" fontSize="15" fontWeight="900" fill="#DC2626">21050</text>
            <line x1="20" y1="68" x2="90" y2="88" stroke="#EF4444" strokeWidth="2.5" />

            <rect x="108" y="38" width="90" height="64" rx="6" fill="#ECFDF5" stroke="#16A34A" strokeWidth="2" />
            <text x="153" y="56" textAnchor="middle" fontSize="9" fontWeight="900" fill="#15803D">29백→30백 ◎</text>
            <text x="153" y="82" textAnchor="middle" fontSize="16" fontWeight="900" fill="#15803D">3050</text>
            <text x="153" y="96" textAnchor="middle" fontSize="8" fontWeight="800" fill="#065F46">3890→3900(10씩)</text>
          </g>

          <Stickman x={50} y={196} scale={0.76} pose="panic" armR={[18, -6]} sweat />
          <SpeechBubble x={86} y={172} w={140} h={46} tailX={68} tailY={188}>
            <text x="156" y="191" textAnchor="middle" fontSize="9.5" fontWeight="900" fill={INK}>
              9에서 1이 더 올라갈 땐
            </text>
            <text x="156" y="207" textAnchor="middle" fontSize="10" fontWeight="900" fill="#15803D">
              앞자리 +1하고 0으로! (3050)
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 12. 거꾸로 규칙 찾기! */
    case 'fourdigit_skip_find_rule':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#ECFDF5')} />
          <rect x="14" y="12" width="212" height="28" rx="6" fill="#D1FAE5" stroke={INK} strokeWidth="2" />
          <text x="120" y="31" textAnchor="middle" fontSize="12" fontWeight="900" fill="#065F46">
            변한 자리만 찾으면 몇씩 뛰었는지 1초 컷!
          </text>

          <g transform="translate(16, 48)">
            <rect x="0" y="0" width="208" height="52" rx="8" fill="#FFFFFF" stroke="#059669" strokeWidth="2" />
            <text x="104" y="22" textAnchor="middle" fontSize="14" fontWeight="900" fill={INK}>
              4<tspan fill="#DC2626">1</tspan>20 → 4<tspan fill="#DC2626">2</tspan>20 → 4<tspan fill="#DC2626">3</tspan>20
            </text>
            <text x="104" y="42" textAnchor="middle" fontSize="10" fontWeight="900" fill="#059669">
              백의 자리만 1씩 커져! → 100씩 뛰어 세기!
            </text>
          </g>

          <g transform="translate(16, 108)">
            <rect x="0" y="0" width="208" height="52" rx="8" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2" />
            <text x="104" y="22" textAnchor="middle" fontSize="14" fontWeight="900" fill={INK}>
              53<tspan fill="#2563EB">4</tspan>0 → 53<tspan fill="#2563EB">6</tspan>0 → 53<tspan fill="#2563EB">8</tspan>0
            </text>
            <text x="104" y="42" textAnchor="middle" fontSize="10" fontWeight="900" fill="#2563EB">
              십의 자리만 2씩 커져! → 20씩 뛰어 세기!
            </text>
          </g>

          <Stickman x={54} y={196} scale={0.76} pose="sunglasses" armR={[18, -4]} />
          <SpeechBubble x={92} y={174} w={134} h={42} tailX={74} tailY={190}>
            <text x="159" y="192" textAnchor="middle" fontSize="10" fontWeight="900" fill={INK}>
              앞뒤 숫자 나란히 비교해서
            </text>
            <text x="159" y="207" textAnchor="middle" fontSize="10" fontWeight="900" fill="#059669">
              바뀐 자리만 동그라미 치자!
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 13. 크기 비교 — 큰 자리부터 한 판 대결! */
    case 'fourdigit_compare_size':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#FEFCE8')} />
          <rect x="14" y="10" width="212" height="28" rx="6" fill="#FEF08A" stroke={INK} strokeWidth="2" />
          <text x="120" y="29" textAnchor="middle" fontSize="12" fontWeight="900" fill="#92400E">
            크기 비교는 왼쪽(천의 자리)부터 대결!
          </text>

          <g transform="translate(18, 46)">
            <rect x="0" y="0" width="204" height="114" rx="10" fill="#FFFFFF" stroke={INK} strokeWidth="2.4" />
            <text x="58" y="34" textAnchor="middle" fontSize="20" fontWeight="900" fill="#2563EB">4 5 2 0</text>
            <text x="102" y="34" textAnchor="middle" fontSize="22" fontWeight="900" fill="#DC2626">&gt;</text>
            <text x="148" y="34" textAnchor="middle" fontSize="20" fontWeight="900" fill="#64748B">4 3 9 9</text>

            {/* 1라운드 천 */}
            <rect x="12" y="48" width="84" height="54" rx="6" fill="#F1F5F9" stroke={INK} strokeWidth="1.6" />
            <text x="54" y="65" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#475569">① 천의 자리</text>
            <text x="54" y="88" textAnchor="middle" fontSize="15" fontWeight="900" fill={INK}>4 = 4</text>
            <text x="54" y="99" textAnchor="middle" fontSize="8" fontWeight="800" fill="#64748B">무승부!</text>

            {/* 2라운드 백 */}
            <rect x="106" y="48" width="86" height="54" rx="6" fill="#FEF9C3" stroke="#D97706" strokeWidth="2" />
            <text x="149" y="65" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#B45309">② 백의 자리</text>
            <text x="149" y="88" textAnchor="middle" fontSize="16" fontWeight="900" fill="#DC2626">5 &gt; 3</text>
            <text x="149" y="99" textAnchor="middle" fontSize="8.5" fontWeight="900" fill="#15803D">승부 끝!!</text>
          </g>

          <Stickman x={54} y={196} scale={0.74} pose="hero" armR={[18, -4]} />
          <SpeechBubble x={92} y={174} w={134} h={42} tailX={74} tailY={190}>
            <text x="159" y="192" textAnchor="middle" fontSize="9.5" fontWeight="900" fill={INK}>
              뒤에 99가 아무리 커도
            </text>
            <text x="159" y="207" textAnchor="middle" fontSize="10" fontWeight="900" fill="#B45309">
              백의 자리 5가 이겨서 4520 승!
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 14. 자릿수 대결! 999 vs 1001 */
    case 'fourdigit_compare_length_trap':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#ECFDF5')} />
          <rect x="14" y="12" width="212" height="28" rx="6" fill="#D1FAE5" stroke={INK} strokeWidth="2" />
          <text x="120" y="31" textAnchor="middle" fontSize="12" fontWeight="900" fill="#065F46">
            비교 1순위! 몇 자리 수인지 먼저 세어 봐!
          </text>

          <g transform="translate(18, 50)">
            <rect x="0" y="0" width="84" height="104" rx="8" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="2" />
            <text x="42" y="22" textAnchor="middle" fontSize="10" fontWeight="900" fill="#64748B">세 자리 수</text>
            <text x="42" y="58" textAnchor="middle" fontSize="22" fontWeight="900" fill="#64748B">999</text>
            <text x="42" y="84" textAnchor="middle" fontSize="9" fontWeight="800" fill="#64748B">9가 3개여도</text>
            <text x="42" y="96" textAnchor="middle" fontSize="9" fontWeight="800" fill="#DC2626">3칸뿐!</text>

            <text x="102" y="58" textAnchor="middle" fontSize="26" fontWeight="900" fill="#DC2626">&lt;</text>

            <rect x="120" y="0" width="84" height="104" rx="8" fill="#ECFDF5" stroke="#059669" strokeWidth="2.5" />
            <text x="162" y="22" textAnchor="middle" fontSize="10" fontWeight="900" fill="#059669">네 자리 수 ★</text>
            <text x="162" y="58" textAnchor="middle" fontSize="22" fontWeight="900" fill="#059669">1001</text>
            <text x="162" y="84" textAnchor="middle" fontSize="9" fontWeight="900" fill="#065F46">4칸이니까</text>
            <text x="162" y="96" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#059669">무조건 승!</text>
          </g>

          <Stickman x={54} y={196} scale={0.76} pose="sunglasses" armR={[18, -4]} />
          <SpeechBubble x={92} y={174} w={134} h={42} tailX={74} tailY={190}>
            <text x="159" y="192" textAnchor="middle" fontSize="10" fontWeight="900" fill={INK}>
              9가 1보다 크다고 속지 마!
            </text>
            <text x="159" y="207" textAnchor="middle" fontSize="10" fontWeight="900" fill="#059669">
              자릿수 많은 1001이 무조건 커!
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 15. 카드 [0, 3, 6, 8]로 가장 큰/작은 네 자리 수 */
    case 'fourdigit_make_max_min':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#F5F3FF')} />
          <rect x="14" y="10" width="212" height="28" rx="6" fill="#EDE9FE" stroke={INK} strokeWidth="2" />
          <text x="120" y="29" textAnchor="middle" fontSize="11.5" fontWeight="900" fill="#5B21B6">
            카드 [0] [3] [6] [8] → 가장 큰 수 &amp; 작은 수!
          </text>

          {/* 가장 큰 수 */}
          <g transform="translate(16, 46)">
            <rect x="0" y="0" width="208" height="48" rx="8" fill="#FFFFFF" stroke="#7C3AED" strokeWidth="2" />
            <text x="14" y="20" fontSize="10" fontWeight="900" fill="#7C3AED">가장 큰 네 자리 수</text>
            <text x="14" y="38" fontSize="10" fontWeight="800" fill="#64748B">큰 카드부터 순서대로!</text>
            <text x="194" y="34" textAnchor="end" fontSize="20" fontWeight="900" fill="#5B21B6">8630</text>
          </g>

          {/* 가장 작은 수 (0 함정) */}
          <g transform="translate(16, 102)">
            <rect x="0" y="0" width="208" height="60" rx="8" fill="#FFF1F2" stroke="#EF4444" strokeWidth="2.2" />
            <text x="104" y="17" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#DC2626">
              ★ 함정! 가장 작은 네 자리 수 (맨 앞 0 금지!)
            </text>
            <text x="58" y="45" textAnchor="middle" fontSize="16" fontWeight="900" fill="#94A3B8">0368 ✕</text>
            <line x1="28" y1="39" x2="86" y2="39" stroke="#EF4444" strokeWidth="2.2" />
            <text x="150" y="46" textAnchor="middle" fontSize="19" fontWeight="900" fill="#15803D">
              3<tspan fill="#DC2626">0</tspan>68 ✓
            </text>
          </g>

          <Stickman x={50} y={198} scale={0.74} pose="headband" armR={[18, -4]} />
          <SpeechBubble x={86} y={174} w={140} h={44} tailX={68} tailY={190}>
            <text x="156" y="193" textAnchor="middle" fontSize="9.5" fontWeight="900" fill={INK}>
              0을 맨 앞에 두면 세 자리 수!
            </text>
            <text x="156" y="208" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#7C3AED">
              0은 두 번째 칸에 쏙 → 3068!
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 16. 최종 보스! 네 자리 수 3관문 */
    case 'fourdigit_boss':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#1E1B4B')} />
          <rect x="14" y="10" width="212" height="28" rx="6" fill="#EF4444" stroke="#FEF08A" strokeWidth="2" />
          <text x="120" y="29" textAnchor="middle" fontSize="12" fontWeight="900" fill="#FFFFFF">
            BOSS! 2-2 네 자리 수 최종 3관문
          </text>

          <g transform="translate(18, 46)">
            <rect x="0" y="0" width="204" height="32" rx="6" fill="#FFFFFF" stroke="#FACC15" strokeWidth="2" />
            <text x="14" y="21" fontSize="10.5" fontWeight="900" fill="#DC2626">①</text>
            <text x="32" y="21" fontSize="11.5" fontWeight="900" fill={INK}>999보다 1 큰 수는?</text>

            <rect x="0" y="39" width="204" height="32" rx="6" fill="#FFFFFF" stroke="#FACC15" strokeWidth="2" />
            <text x="14" y="60" fontSize="10.5" fontWeight="900" fill="#2563EB">②</text>
            <text x="32" y="60" fontSize="11.5" fontWeight="900" fill={INK}>‘오천삼십이’를 숫자로?</text>

            <rect x="0" y="78" width="204" height="32" rx="6" fill="#FFFFFF" stroke="#FACC15" strokeWidth="2" />
            <text x="14" y="99" fontSize="10.5" fontWeight="900" fill="#7C3AED">③</text>
            <text x="32" y="99" fontSize="11" fontWeight="900" fill={INK}>[0,2,5,9] 가장 작은 네 자리 수?</text>
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

    /* 17. 2-2 네 자리 수 완주 축하 포카! */
    case 'fourdigit_praise':
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
            ★ 2-2 네 자리 수 완주 축하!! ★
          </text>
          <text x="120" y="55" textAnchor="middle" fontSize="10" fontWeight="900" fill="#92400E">
            18장 올 클리어 · 자릿값 마스터!
          </text>

          <g transform="translate(120, 96)">
            <ellipse cx="0" cy="0" rx="58" ry="20" fill="#FFFFFF" stroke={INK} strokeWidth="2.4" />
            <text x="0" y="5" textAnchor="middle" fontSize="12.5" fontWeight="900" fill="#2563EB">
              1000 · 3040 · 3068 ✓
            </text>
          </g>

          <Stickman x={120} y={164} scale={0.95} pose="hero" armL={[-20, 4]} armR={[20, 4]} />
          <text x="120" y="222" textAnchor="middle" fontSize="10.5" fontWeight="900" fill="#B45309">
            공식 2학년 네 자리 수 챔피언 인증!
          </text>
        </svg>
      );
  }
};
