import React from 'react';
import { EpisodeSceneType, PrintInkMode } from '../types/card';

interface Mul3ComicSceneProps {
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

export const Mul3ComicScene: React.FC<Mul3ComicSceneProps> = ({
  sceneType,
  inkMode = 'full',
}) => {
  const isInkSaving = inkMode !== 'full';
  const softBg = (fullColor: string) => (isInkSaving ? '#FFFFFF' : fullColor);

  switch (sceneType) {
    /* 00. 3-2 곱셈 도감 설명서 */
    case 'mul3_guide':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#F0F9FF')} />
          <rect x="12" y="12" width="216" height="44" rx="8" fill="#FEF08A" stroke={INK} strokeWidth="2.5" />
          <text x="120" y="31" textAnchor="middle" fontSize="13.5" fontWeight="900" fill={INK}>
            3-2 곱셈 도감 18장 완주 맵!
          </text>
          <text x="120" y="48" textAnchor="middle" fontSize="9.5" fontWeight="800" fill="#B45309">
            세 자리×한 자리 → 두 자리×두 자리 2층 세로셈!
          </text>

          <g transform="translate(14, 66)">
            <rect x="0" y="0" width="100" height="58" rx="6" fill="#FFFFFF" stroke={INK} strokeWidth="2" />
            <text x="50" y="16" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#2563EB">
              1단계: (세 자리)×(한 자리)
            </text>
            <text x="50" y="34" textAnchor="middle" fontSize="13" fontWeight="900" fill={INK}>
              304 × 5
            </text>
            <text x="50" y="50" textAnchor="middle" fontSize="8.5" fontWeight="800" fill="#DC2626">
              가운데 0 올림 살리기!
            </text>
          </g>

          <g transform="translate(126, 66)">
            <rect x="0" y="0" width="100" height="58" rx="6" fill="#FFFFFF" stroke={INK} strokeWidth="2" />
            <text x="50" y="16" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#059669">
              2단계: (두 자리)×(두 자리)
            </text>
            <text x="50" y="34" textAnchor="middle" fontSize="13" fontWeight="900" fill={INK}>
              27 × 34
            </text>
            <text x="50" y="50" textAnchor="middle" fontSize="8.5" fontWeight="800" fill="#7C3AED">
              2층은 한 칸 왼쪽 밀기!
            </text>
          </g>

          <Stickman x={54} y={168} pose="hero" armR={[18, 4]} />
          <SpeechBubble x={92} y={136} w={132} h={48} tailX={74} tailY={156}>
            <text x="158" y="156" textAnchor="middle" fontSize="10.5" fontWeight="900" fill={INK}>
              선수학습 2장 + 함정까지
            </text>
            <text x="158" y="173" textAnchor="middle" fontSize="11" fontWeight="900" fill="#DC2626">
              18장 전부 내 손안에!!
            </text>
          </SpeechBubble>
          <text x="160" y="216" textAnchor="middle" fontSize="10" fontWeight="900" fill="#475569">
            ★ 넘길수록 세로셈 달인! ★
          </text>
        </svg>
      );

    /* 01. [선수학습] 올림 없는 (몇십몇)×(몇) */
    case 'mul3_prereq_2by1_no_carry':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#EFF6FF')} />
          <rect x="14" y="12" width="212" height="32" rx="7" fill="#DBEAFE" stroke={INK} strokeWidth="2.2" />
          <text x="120" y="33" textAnchor="middle" fontSize="13" fontWeight="900" fill="#1E3A8A">
            23 × 3 = (20×3) + (3×3)
          </text>

          {/* 3묶음 동전 상자 */}
          {[0, 1, 2].map((row) => {
            const ry = 54 + row * 40;
            return (
              <g key={row} transform={`translate(16, ${ry})`}>
                <rect x="0" y="0" width="122" height="32" rx="6" fill="#FFFFFF" stroke={INK} strokeWidth="2" />
                {/* 10원 2개 */}
                <circle cx="18" cy="16" r="10" fill="#FDE047" stroke={INK} strokeWidth="1.6" />
                <text x="18" y="19.5" textAnchor="middle" fontSize="8.5" fontWeight="900" fill={INK}>10</text>
                <circle cx="42" cy="16" r="10" fill="#FDE047" stroke={INK} strokeWidth="1.6" />
                <text x="42" y="19.5" textAnchor="middle" fontSize="8.5" fontWeight="900" fill={INK}>10</text>
                {/* 1원 3개 */}
                <circle cx="68" cy="16" r="7.5" fill="#FED7AA" stroke={INK} strokeWidth="1.5" />
                <text x="68" y="19" textAnchor="middle" fontSize="8" fontWeight="900" fill={INK}>1</text>
                <circle cx="87" cy="16" r="7.5" fill="#FED7AA" stroke={INK} strokeWidth="1.5" />
                <text x="87" y="19" textAnchor="middle" fontSize="8" fontWeight="900" fill={INK}>1</text>
                <circle cx="106" cy="16" r="7.5" fill="#FED7AA" stroke={INK} strokeWidth="1.5" />
                <text x="106" y="19" textAnchor="middle" fontSize="8" fontWeight="900" fill={INK}>1</text>
              </g>
            );
          })}

          {/* 세로셈 박스 */}
          <g transform="translate(152, 56)">
            <rect x="0" y="0" width="74" height="106" rx="8" fill="#FFFFFF" stroke={INK} strokeWidth="2.4" />
            <text x="48" y="28" textAnchor="end" fontSize="18" fontWeight="900" fill={INK}>2 3</text>
            <text x="20" y="52" textAnchor="middle" fontSize="15" fontWeight="900" fill={INK}>×</text>
            <text x="48" y="52" textAnchor="end" fontSize="18" fontWeight="900" fill={INK}>3</text>
            <line x1="10" y1="60" x2="64" y2="60" stroke={INK} strokeWidth="2.4" />
            <text x="48" y="84" textAnchor="end" fontSize="19" fontWeight="900" fill="#2563EB">6 9</text>
            <text x="37" y="99" textAnchor="middle" fontSize="8.5" fontWeight="800" fill="#64748B">60 + 9</text>
          </g>

          <Stickman x={54} y={196} scale={0.76} pose="happy" armR={[18, -4]} />
          <SpeechBubble x={92} y={176} w={132} h={40} tailX={74} tailY={190}>
            <text x="158" y="194" textAnchor="middle" fontSize="10" fontWeight="900" fill={INK}>
              10원 6개(60) + 1원 9개(9)
            </text>
            <text x="158" y="209" textAnchor="middle" fontSize="10" fontWeight="900" fill="#2563EB">
              따로 곱해 합치면 69!
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 02. [선수학습] 받아올림 순서 주의! (24×3) */
    case 'mul3_prereq_2by1_carry':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#FEF2F2')} />
          <rect x="14" y="10" width="212" height="28" rx="6" fill="#FEE2E2" stroke={INK} strokeWidth="2" />
          <text x="120" y="29" textAnchor="middle" fontSize="11.5" fontWeight="900" fill="#B91C1C">
            올린 1은 언제 더할까?! 순서 함정!
          </text>

          {/* 땡 박스 */}
          <g transform="translate(14, 46)">
            <rect x="0" y="0" width="98" height="114" rx="8" fill="#FFFFFF" stroke="#EF4444" strokeWidth="2.4" />
            <text x="49" y="17" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#DC2626">
              먼저 더하면 땡!
            </text>
            <text x="36" y="34" textAnchor="middle" fontSize="11" fontWeight="900" fill="#EF4444">1</text>
            <text x="64" y="50" textAnchor="end" fontSize="16" fontWeight="900" fill={INK}>2 4</text>
            <text x="26" y="70" textAnchor="middle" fontSize="13" fontWeight="900" fill={INK}>×</text>
            <text x="64" y="70" textAnchor="end" fontSize="16" fontWeight="900" fill={INK}>3</text>
            <line x1="16" y1="76" x2="80" y2="76" stroke={INK} strokeWidth="2" />
            <text x="64" y="96" textAnchor="end" fontSize="17" fontWeight="900" fill="#DC2626">9 2</text>
            <text x="49" y="109" textAnchor="middle" fontSize="8" fontWeight="800" fill="#DC2626">(2+1)×3=9 ✕</text>
            <line x1="14" y1="84" x2="84" y2="100" stroke="#EF4444" strokeWidth="2.8" />
          </g>

          {/* 정답 박스 */}
          <g transform="translate(128, 46)">
            <rect x="0" y="0" width="98" height="114" rx="8" fill="#FFFFFF" stroke="#16A34A" strokeWidth="2.6" />
            <text x="49" y="17" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#15803D">
              곱한 뒤 더하기! ✓
            </text>
            <circle cx="38" cy="30" r="7" fill="#FEF08A" stroke="#16A34A" strokeWidth="1.5" />
            <text x="38" y="33.5" textAnchor="middle" fontSize="10" fontWeight="900" fill="#15803D">1</text>
            <text x="64" y="50" textAnchor="end" fontSize="16" fontWeight="900" fill={INK}>2 4</text>
            <text x="26" y="70" textAnchor="middle" fontSize="13" fontWeight="900" fill={INK}>×</text>
            <text x="64" y="70" textAnchor="end" fontSize="16" fontWeight="900" fill={INK}>3</text>
            <line x1="16" y1="76" x2="80" y2="76" stroke={INK} strokeWidth="2" />
            <text x="64" y="96" textAnchor="end" fontSize="17" fontWeight="900" fill="#15803D">7 2</text>
            <text x="49" y="109" textAnchor="middle" fontSize="8.5" fontWeight="900" fill="#15803D">(2×3)+1=7 ◎</text>
          </g>

          <Stickman x={50} y={196} scale={0.76} pose="headband" armR={[18, -4]} />
          <SpeechBubble x={86} y={172} w={140} h={46} tailX={68} tailY={188}>
            <text x="156" y="191" textAnchor="middle" fontSize="10" fontWeight="900" fill={INK}>
              올린 숫자 1은 무조건
            </text>
            <text x="156" y="207" textAnchor="middle" fontSize="10.5" fontWeight="900" fill="#15803D">
              곱하기 끝난 뒤 마지막에 +!
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 03. 올림 없는 (세 자리 수)×(한 자리 수) */
    case 'mul3_3by1_no_carry':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#EFF6FF')} />
          <rect x="14" y="12" width="212" height="30" rx="7" fill="#DBEAFE" stroke={INK} strokeWidth="2.2" />
          <text x="120" y="32" textAnchor="middle" fontSize="12.5" fontWeight="900" fill="#1E40AF">
            123 × 3 = 백·십·일 차례로 ×3!
          </text>

          {/* 3단 모형 묶음 */}
          <g transform="translate(14, 52)">
            <rect x="0" y="0" width="114" height="108" rx="8" fill="#FFFFFF" stroke={INK} strokeWidth="2" />
            <text x="57" y="15" textAnchor="middle" fontSize="9" fontWeight="900" fill="#475569">
              123이 3묶음!
            </text>
            {[0, 1, 2].map((r) => (
              <g key={r} transform={`translate(8, ${22 + r * 28})`}>
                <rect x="0" y="0" width="28" height="20" rx="3" fill="#93C5FD" stroke={INK} strokeWidth="1.4" />
                <text x="14" y="14" textAnchor="middle" fontSize="9.5" fontWeight="900" fill={INK}>100</text>
                <rect x="34" y="2" width="14" height="16" rx="2" fill="#FDE047" stroke={INK} strokeWidth="1.2" />
                <text x="41" y="13.5" textAnchor="middle" fontSize="8" fontWeight="900" fill={INK}>10</text>
                <rect x="51" y="2" width="14" height="16" rx="2" fill="#FDE047" stroke={INK} strokeWidth="1.2" />
                <text x="58" y="13.5" textAnchor="middle" fontSize="8" fontWeight="900" fill={INK}>10</text>
                {[0, 1, 2].map((c) => (
                  <rect
                    key={c}
                    x={70 + c * 10}
                    y="6"
                    width="8"
                    height="8"
                    rx="1"
                    fill="#FCA5A5"
                    stroke={INK}
                    strokeWidth="1.1"
                  />
                ))}
              </g>
            ))}
          </g>

          {/* 세로셈 */}
          <g transform="translate(138, 52)">
            <rect x="0" y="0" width="88" height="108" rx="8" fill="#FFFFFF" stroke={INK} strokeWidth="2.4" />
            <text x="27" y="16" textAnchor="middle" fontSize="8" fontWeight="800" fill="#2563EB">백</text>
            <text x="45" y="16" textAnchor="middle" fontSize="8" fontWeight="800" fill="#CA8A04">십</text>
            <text x="63" y="16" textAnchor="middle" fontSize="8" fontWeight="800" fill="#DC2626">일</text>
            <text x="68" y="38" textAnchor="end" fontSize="18" fontWeight="900" fill={INK}>1 2 3</text>
            <text x="20" y="60" textAnchor="middle" fontSize="15" fontWeight="900" fill={INK}>×</text>
            <text x="68" y="60" textAnchor="end" fontSize="18" fontWeight="900" fill={INK}>3</text>
            <line x1="12" y1="68" x2="76" y2="68" stroke={INK} strokeWidth="2.4" />
            <text x="68" y="92" textAnchor="end" fontSize="19" fontWeight="900" fill="#2563EB">3 6 9</text>
            <text x="44" y="103" textAnchor="middle" fontSize="8" fontWeight="800" fill="#64748B">← 오른쪽부터!</text>
          </g>

          <Stickman x={54} y={196} scale={0.76} pose="sunglasses" armR={[18, -4]} />
          <SpeechBubble x={92} y={174} w={134} h={42} tailX={74} tailY={190}>
            <text x="159" y="192" textAnchor="middle" fontSize="10" fontWeight="900" fill={INK}>
              300 + 60 + 9 = 369!
            </text>
            <text x="159" y="207" textAnchor="middle" fontSize="9.5" fontWeight="800" fill="#2563EB">
              세 자리도 자리만 하나 더!
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 04. 받아올림 1번! (216 × 3) */
    case 'mul3_3by1_carry_one':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#ECFDF5')} />
          <rect x="14" y="12" width="212" height="30" rx="7" fill="#D1FAE5" stroke={INK} strokeWidth="2.2" />
          <text x="120" y="32" textAnchor="middle" fontSize="12.5" fontWeight="900" fill="#065F46">
            6×3 = 18! 10을 십의 자리로 올림!
          </text>

          <g transform="translate(22, 52)">
            <rect x="0" y="0" width="122" height="114" rx="10" fill="#FFFFFF" stroke={INK} strokeWidth="2.4" />
            {/* 올림 동그라미 */}
            <circle cx="64" cy="20" r="9" fill="#FEF08A" stroke="#DC2626" strokeWidth="1.8" />
            <text x="64" y="24" textAnchor="middle" fontSize="12" fontWeight="900" fill="#DC2626">1</text>

            <text x="92" y="48" textAnchor="end" fontSize="22" fontWeight="900" fill={INK}>2 1 6</text>
            <text x="26" y="74" textAnchor="middle" fontSize="18" fontWeight="900" fill={INK}>×</text>
            <text x="92" y="74" textAnchor="end" fontSize="22" fontWeight="900" fill={INK}>3</text>
            <line x1="16" y1="82" x2="106" y2="82" stroke={INK} strokeWidth="2.6" />
            <text x="92" y="106" textAnchor="end" fontSize="22" fontWeight="900" fill="#059669">6 4 8</text>
            {/* 화살표: 일 -> 십 */}
            <path d="M 88 28 Q 76 10 68 18" fill="none" stroke="#DC2626" strokeWidth="1.8" strokeDasharray="3 2" />
          </g>

          {/* 3단계 설명 카드 */}
          <g transform="translate(152, 54)">
            <rect x="0" y="0" width="76" height="32" rx="5" fill="#FEF2F2" stroke="#EF4444" strokeWidth="1.6" />
            <text x="38" y="13" textAnchor="middle" fontSize="8" fontWeight="900" fill="#DC2626">① 일의 자리</text>
            <text x="38" y="26" textAnchor="middle" fontSize="9.5" fontWeight="900" fill={INK}>6×3=18</text>

            <rect x="0" y="39" width="76" height="32" rx="5" fill="#FEF9C3" stroke="#CA8A04" strokeWidth="1.6" />
            <text x="38" y="52" textAnchor="middle" fontSize="8" fontWeight="900" fill="#B45309">② 십의 자리</text>
            <text x="38" y="65" textAnchor="middle" fontSize="9.5" fontWeight="900" fill={INK}>1×3+1=4</text>

            <rect x="0" y="78" width="76" height="32" rx="5" fill="#DBEAFE" stroke="#2563EB" strokeWidth="1.6" />
            <text x="38" y="91" textAnchor="middle" fontSize="8" fontWeight="900" fill="#1D4ED8">③ 백의 자리</text>
            <text x="38" y="104" textAnchor="middle" fontSize="9.5" fontWeight="900" fill={INK}>2×3=6</text>
          </g>

          <Stickman x={54} y={196} scale={0.76} pose="happy" armR={[18, -4]} />
          <SpeechBubble x={92} y={176} w={134} h={40} tailX={74} tailY={190}>
            <text x="159" y="194" textAnchor="middle" fontSize="10" fontWeight="900" fill={INK}>
              1×3에 올린 1 더해서 4!
            </text>
            <text x="159" y="209" textAnchor="middle" fontSize="10" fontWeight="900" fill="#059669">
              정답 648 완성!!
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 05. 연속 받아올림! 네 자리로 점프! (368 × 4) */
    case 'mul3_3by1_double_carry':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#FEFCE8')} />
          <rect x="14" y="12" width="212" height="30" rx="7" fill="#FEF08A" stroke={INK} strokeWidth="2.2" />
          <text x="120" y="32" textAnchor="middle" fontSize="12" fontWeight="900" fill="#92400E">
            올림 도미노! 백의 자리에서 천으로 점프!
          </text>

          <g transform="translate(18, 50)">
            <rect x="0" y="0" width="204" height="114" rx="10" fill="#FFFFFF" stroke={INK} strokeWidth="2.4" />

            {/* 올림 2, 3 */}
            <circle cx="80" cy="20" r="9" fill="#DBEAFE" stroke="#2563EB" strokeWidth="1.8" />
            <text x="80" y="24" textAnchor="middle" fontSize="11.5" fontWeight="900" fill="#1D4ED8">2</text>

            <circle cx="102" cy="20" r="9" fill="#FEE2E2" stroke="#DC2626" strokeWidth="1.8" />
            <text x="102" y="24" textAnchor="middle" fontSize="11.5" fontWeight="900" fill="#DC2626">3</text>

            <text x="130" y="48" textAnchor="end" fontSize="21" fontWeight="900" fill={INK}>3 6 8</text>
            <text x="58" y="72" textAnchor="middle" fontSize="17" fontWeight="900" fill={INK}>×</text>
            <text x="130" y="72" textAnchor="end" fontSize="21" fontWeight="900" fill={INK}>4</text>
            <line x1="44" y1="79" x2="142" y2="79" stroke={INK} strokeWidth="2.5" />
            <text x="130" y="103" textAnchor="end" fontSize="22" fontWeight="900" fill="#B45309">1 4 7 2</text>

            {/* 오른쪽 단계 메모 */}
            <text x="148" y="38" fontSize="8.5" fontWeight="800" fill="#DC2626">① 8×4=32</text>
            <text x="148" y="58" fontSize="8.5" fontWeight="800" fill="#1D4ED8">② 6×4+3=27</text>
            <text x="148" y="78" fontSize="8.5" fontWeight="800" fill="#B45309">③ 3×4+2=14</text>
            <text x="148" y="98" fontSize="9" fontWeight="900" fill="#15803D">→ 네 자리!</text>
          </g>

          <Stickman x={54} y={196} scale={0.76} pose="strain" armR={[18, -4]} sweat />
          <SpeechBubble x={92} y={174} w={134} h={42} tailX={74} tailY={190}>
            <text x="159" y="192" textAnchor="middle" fontSize="9.5" fontWeight="900" fill={INK}>
              3×4=12에 올림 2 더해 14!
            </text>
            <text x="159" y="207" textAnchor="middle" fontSize="10" fontWeight="900" fill="#B45309">
              천의 자리 1까지 1472!
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 06. 가운데 0 함정! 304 × 5 */
    case 'mul3_zero_middle_trap':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#FEF2F2')} />
          <rect x="14" y="10" width="212" height="28" rx="6" fill="#FEE2E2" stroke={INK} strokeWidth="2" />
          <text x="120" y="29" textAnchor="middle" fontSize="11.5" fontWeight="900" fill="#B91C1C">
            주의! 가운데 0이 올림 2를 먹어버렸나?!
          </text>

          {/* 땡 */}
          <g transform="translate(14, 46)">
            <rect x="0" y="0" width="98" height="114" rx="8" fill="#FFFFFF" stroke="#EF4444" strokeWidth="2.4" />
            <text x="49" y="17" textAnchor="middle" fontSize="9" fontWeight="900" fill="#DC2626">
              0 그대로 쓰면 땡!
            </text>
            <text x="54" y="33" textAnchor="middle" fontSize="10" fontWeight="900" fill="#EF4444">2</text>
            <text x="80" y="50" textAnchor="end" fontSize="16" fontWeight="900" fill={INK}>3 0 4</text>
            <text x="20" y="69" textAnchor="middle" fontSize="13" fontWeight="900" fill={INK}>×</text>
            <text x="80" y="69" textAnchor="end" fontSize="16" fontWeight="900" fill={INK}>5</text>
            <line x1="14" y1="76" x2="86" y2="76" stroke={INK} strokeWidth="2" />
            <text x="80" y="96" textAnchor="end" fontSize="16" fontWeight="900" fill="#DC2626">1 5 0 0</text>
            <text x="49" y="109" textAnchor="middle" fontSize="8" fontWeight="800" fill="#DC2626">올린 2 실종!!</text>
            <line x1="14" y1="84" x2="86" y2="100" stroke="#EF4444" strokeWidth="2.8" />
          </g>

          {/* 정답 */}
          <g transform="translate(128, 46)">
            <rect x="0" y="0" width="98" height="114" rx="8" fill="#FFFFFF" stroke="#16A34A" strokeWidth="2.6" />
            <text x="49" y="17" textAnchor="middle" fontSize="9" fontWeight="900" fill="#15803D">
              0×5 + 2 = 2! ✓
            </text>
            <circle cx="55" cy="29" r="7" fill="#FEF08A" stroke="#16A34A" strokeWidth="1.5" />
            <text x="55" y="32.5" textAnchor="middle" fontSize="10" fontWeight="900" fill="#15803D">2</text>
            <text x="80" y="50" textAnchor="end" fontSize="16" fontWeight="900" fill={INK}>3 0 4</text>
            <text x="20" y="69" textAnchor="middle" fontSize="13" fontWeight="900" fill={INK}>×</text>
            <text x="80" y="69" textAnchor="end" fontSize="16" fontWeight="900" fill={INK}>5</text>
            <line x1="14" y1="76" x2="86" y2="76" stroke={INK} strokeWidth="2" />
            <text x="80" y="96" textAnchor="end" fontSize="16" fontWeight="900" fill="#15803D">1 5 2 0</text>
            <text x="49" y="109" textAnchor="middle" fontSize="8.5" fontWeight="900" fill="#15803D">올림 2가 살았다! ◎</text>
          </g>

          <Stickman x={50} y={196} scale={0.76} pose="panic" armR={[18, -8]} sweat />
          <SpeechBubble x={86} y={172} w={140} h={46} tailX={68} tailY={188}>
            <text x="156" y="191" textAnchor="middle" fontSize="10" fontWeight="900" fill={INK}>
              0×5 = 0이지만 올린 2를
            </text>
            <text x="156" y="207" textAnchor="middle" fontSize="10.5" fontWeight="900" fill="#DC2626">
              더해야 해서 십의 자리는 2!!
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 07. (몇십)×(몇십) — 뒤에 0이 몇 개 붙을까? */
    case 'mul3_tens_times_tens':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#FEFCE8')} />
          <rect x="14" y="12" width="212" height="30" rx="7" fill="#FEF08A" stroke={INK} strokeWidth="2.2" />
          <text x="120" y="32" textAnchor="middle" fontSize="12.5" fontWeight="900" fill="#92400E">
            (몇십)×(몇십) 0 개수 합체 치트키!
          </text>

          {/* 케이스 1: 30 × 20 */}
          <g transform="translate(16, 52)">
            <rect x="0" y="0" width="208" height="48" rx="8" fill="#FFFFFF" stroke={INK} strokeWidth="2" />
            <text x="16" y="30" fontSize="17" fontWeight="900" fill={INK}>
              3<tspan fill="#DC2626">0</tspan> × 2<tspan fill="#DC2626">0</tspan> =
            </text>
            <text x="134" y="30" fontSize="19" fontWeight="900" fill="#2563EB">
              6<tspan fill="#DC2626">00</tspan>
            </text>
            <text x="174" y="20" fontSize="8.5" fontWeight="800" fill="#475569">3×2=6</text>
            <text x="174" y="34" fontSize="8.5" fontWeight="900" fill="#DC2626">+ 0 두 개!</text>
          </g>

          {/* 케이스 2: 50 × 20 함정 */}
          <g transform="translate(16, 108)">
            <rect x="0" y="0" width="208" height="54" rx="8" fill="#FFF1F2" stroke="#EF4444" strokeWidth="2.2" />
            <text x="104" y="16" textAnchor="middle" fontSize="9" fontWeight="900" fill="#DC2626">
              ★ 보너스 함정! 앞 곱이 10이면 0이 3개!!
            </text>
            <text x="18" y="42" fontSize="16.5" fontWeight="900" fill={INK}>
              5<tspan fill="#DC2626">0</tspan> × 2<tspan fill="#DC2626">0</tspan> =
            </text>
            <text x="128" y="42" fontSize="18.5" fontWeight="900" fill="#15803D">
              10<tspan fill="#DC2626">00</tspan>
            </text>
            <text x="178" y="41" fontSize="8.5" fontWeight="900" fill="#15803D">(100 땡!)</text>
          </g>

          <Stickman x={54} y={196} scale={0.76} pose="sunglasses" armR={[18, -4]} />
          <SpeechBubble x={92} y={174} w={134} h={42} tailX={74} tailY={190}>
            <text x="159" y="192" textAnchor="middle" fontSize="10" fontWeight="900" fill={INK}>
              앞 숫자 먼저 곱하고
            </text>
            <text x="159" y="207" textAnchor="middle" fontSize="10" fontWeight="900" fill="#DC2626">
              뒤에 0 두 개(00) 쏙 붙여!
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 08. (몇)×(몇십몇) 가로셈 쪼개기! (4 × 13) */
    case 'mul3_1by2_split':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#ECFDF5')} />
          <rect x="14" y="12" width="212" height="30" rx="7" fill="#D1FAE5" stroke={INK} strokeWidth="2.2" />
          <text x="120" y="32" textAnchor="middle" fontSize="12.5" fontWeight="900" fill="#065F46">
            4 × 13 = (4 × 10) + (4 × 3)
          </text>

          {/* 쪼개기 다이어그램 */}
          <g transform="translate(18, 52)">
            <rect x="0" y="0" width="204" height="108" rx="8" fill="#FFFFFF" stroke={INK} strokeWidth="2.2" />
            <text x="102" y="18" textAnchor="middle" fontSize="10" fontWeight="900" fill="#475569">
              13을 10과 3으로 갈라서 4를 곱하자!
            </text>

            {/* 4 × 10 파란 상자 */}
            <rect x="12" y="28" width="112" height="50" rx="4" fill="#DBEAFE" stroke="#2563EB" strokeWidth="2" />
            <text x="68" y="49" textAnchor="middle" fontSize="12" fontWeight="900" fill="#1E40AF">4 × 10</text>
            <text x="68" y="67" textAnchor="middle" fontSize="14" fontWeight="900" fill="#2563EB">= 40</text>

            {/* 4 × 3 노란 상자 */}
            <rect x="130" y="28" width="62" height="50" rx="4" fill="#FEF08A" stroke="#CA8A04" strokeWidth="2" />
            <text x="161" y="49" textAnchor="middle" fontSize="12" fontWeight="900" fill="#92400E">4 × 3</text>
            <text x="161" y="67" textAnchor="middle" fontSize="14" fontWeight="900" fill="#B45309">= 12</text>

            <text x="102" y="98" textAnchor="middle" fontSize="13.5" fontWeight="900" fill="#059669">
              40 + 12 = 52!!
            </text>
          </g>

          <Stickman x={54} y={196} scale={0.76} pose="happy" armR={[18, -4]} />
          <SpeechBubble x={92} y={172} w={134} h={44} tailX={74} tailY={190}>
            <text x="159" y="191" textAnchor="middle" fontSize="10" fontWeight="900" fill={INK}>
              13묶음 = 10묶음 + 3묶음!
            </text>
            <text x="159" y="206" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#059669">
              둘을 더하면 깔끔히 52!
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 09. 세로셈 둘째 줄 자리 밀기 비밀! (3 × 24) */
    case 'mul3_1by2_vertical_trap':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#FEF2F2')} />
          <rect x="14" y="10" width="212" height="28" rx="6" fill="#FEE2E2" stroke={INK} strokeWidth="2" />
          <text x="120" y="29" textAnchor="middle" fontSize="11.5" fontWeight="900" fill="#B91C1C">
            둘째 줄 자리 안 밀면 대참사!!
          </text>

          {/* 땡 */}
          <g transform="translate(14, 46)">
            <rect x="0" y="0" width="98" height="114" rx="8" fill="#FFFFFF" stroke="#EF4444" strokeWidth="2.4" />
            <text x="49" y="16" textAnchor="middle" fontSize="8.5" fontWeight="900" fill="#DC2626">
              줄 안 밀면 땡!
            </text>
            <text x="72" y="34" textAnchor="end" fontSize="15" fontWeight="900" fill={INK}>3</text>
            <text x="24" y="50" textAnchor="middle" fontSize="13" fontWeight="900" fill={INK}>×</text>
            <text x="72" y="50" textAnchor="end" fontSize="15" fontWeight="900" fill={INK}>2 4</text>
            <line x1="16" y1="56" x2="80" y2="56" stroke={INK} strokeWidth="1.8" />
            <text x="72" y="72" textAnchor="end" fontSize="14" fontWeight="900" fill={INK}>1 2</text>
            <text x="72" y="88" textAnchor="end" fontSize="14" fontWeight="900" fill="#DC2626">6</text>
            <line x1="16" y1="92" x2="80" y2="92" stroke={INK} strokeWidth="1.8" />
            <text x="72" y="108" textAnchor="end" fontSize="14.5" fontWeight="900" fill="#DC2626">1 8 ✕</text>
            <line x1="20" y1="76" x2="80" y2="106" stroke="#EF4444" strokeWidth="2.5" />
          </g>

          {/* 정답 */}
          <g transform="translate(128, 46)">
            <rect x="0" y="0" width="98" height="114" rx="8" fill="#FFFFFF" stroke="#16A34A" strokeWidth="2.6" />
            <text x="49" y="16" textAnchor="middle" fontSize="8.5" fontWeight="900" fill="#15803D">
              한 칸 왼쪽으로! ✓
            </text>
            <text x="74" y="34" textAnchor="end" fontSize="15" fontWeight="900" fill={INK}>3</text>
            <text x="24" y="50" textAnchor="middle" fontSize="13" fontWeight="900" fill={INK}>×</text>
            <text x="74" y="50" textAnchor="end" fontSize="15" fontWeight="900" fill={INK}>2 4</text>
            <line x1="16" y1="56" x2="82" y2="56" stroke={INK} strokeWidth="1.8" />
            <text x="74" y="72" textAnchor="end" fontSize="14" fontWeight="900" fill={INK}>1 2</text>
            <text x="74" y="88" textAnchor="end" fontSize="14" fontWeight="900" fill="#2563EB">
              6 <tspan fill="#94A3B8">(0)</tspan>
            </text>
            <line x1="16" y1="92" x2="82" y2="92" stroke={INK} strokeWidth="1.8" />
            <text x="74" y="108" textAnchor="end" fontSize="15" fontWeight="900" fill="#15803D">7 2 ◎</text>
          </g>

          <Stickman x={50} y={196} scale={0.76} pose="headband" armR={[18, -4]} />
          <SpeechBubble x={86} y={172} w={140} h={46} tailX={68} tailY={188}>
            <text x="156" y="191" textAnchor="middle" fontSize="9.5" fontWeight="900" fill={INK}>
              2층은 3×2가 아니라 3×20!
            </text>
            <text x="156" y="207" textAnchor="middle" fontSize="10" fontWeight="900" fill="#2563EB">
              무조건 한 칸 왼쪽에 써!
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 10. (몇십몇)×(몇십) — 24 × 30 한 방 컷! */
    case 'mul3_2by2_tens':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#EFF6FF')} />
          <rect x="14" y="12" width="212" height="30" rx="7" fill="#DBEAFE" stroke={INK} strokeWidth="2.2" />
          <text x="120" y="32" textAnchor="middle" fontSize="12.5" fontWeight="900" fill="#1E40AF">
            24 × 30 = (24 × 3)에 0 하나 쏙!
          </text>

          <g transform="translate(20, 52)">
            <rect x="0" y="0" width="200" height="108" rx="10" fill="#FFFFFF" stroke={INK} strokeWidth="2.4" />
            {/* 1단계 */}
            <rect x="12" y="12" width="84" height="84" rx="8" fill="#EFF6FF" stroke="#2563EB" strokeWidth="1.8" />
            <text x="54" y="30" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#1D4ED8">
              ① 0 빼고 먼저!
            </text>
            <text x="54" y="55" textAnchor="middle" fontSize="16" fontWeight="900" fill={INK}>24 × 3</text>
            <text x="54" y="80" textAnchor="middle" fontSize="18" fontWeight="900" fill="#2563EB">= 72</text>

            {/* 화살표 */}
            <path d="M 100 54 L 112 54" stroke="#DC2626" strokeWidth="3" strokeLinecap="round" />
            <polygon points="111,48 119,54 111,60" fill="#DC2626" />

            {/* 2단계 */}
            <rect x="122" y="12" width="66" height="84" rx="8" fill="#FEF9C3" stroke="#CA8A04" strokeWidth="1.8" />
            <text x="155" y="30" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#B45309">
              ② 0 붙이기!
            </text>
            <text x="155" y="64" textAnchor="middle" fontSize="22" fontWeight="900" fill="#DC2626">
              72<tspan fill="#16A34A">0</tspan>
            </text>
            <text x="155" y="83" textAnchor="middle" fontSize="8.5" fontWeight="800" fill="#64748B">
              10배 뻥튀기!
            </text>
          </g>

          <Stickman x={54} y={196} scale={0.76} pose="sunglasses" armR={[18, -4]} />
          <SpeechBubble x={92} y={174} w={134} h={42} tailX={74} tailY={190}>
            <text x="159" y="192" textAnchor="middle" fontSize="10" fontWeight="900" fill={INK}>
              24 × 3 = 72만 구하면
            </text>
            <text x="159" y="207" textAnchor="middle" fontSize="10" fontWeight="900" fill="#16A34A">
              뒤에 0 하나 붙여 720 끝!
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 11. 4칸 상자 치트키! (23 × 14) */
    case 'mul3_2by2_area_model':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#ECFDF5')} />
          <rect x="14" y="10" width="212" height="28" rx="6" fill="#D1FAE5" stroke={INK} strokeWidth="2" />
          <text x="120" y="29" textAnchor="middle" fontSize="12" fontWeight="900" fill="#065F46">
            4칸 넓이 상자로 23 × 14 한눈에!
          </text>

          {/* 4칸 그리드 */}
          <g transform="translate(28, 46)">
            <text x="58" y="12" textAnchor="middle" fontSize="11" fontWeight="900" fill="#2563EB">20</text>
            <text x="140" y="12" textAnchor="middle" fontSize="11" fontWeight="900" fill="#CA8A04">3</text>
            <text x="8" y="42" textAnchor="end" fontSize="11" fontWeight="900" fill="#2563EB">10</text>
            <text x="8" y="84" textAnchor="end" fontSize="11" fontWeight="900" fill="#CA8A04">4</text>

            {/* 20×10 */}
            <rect x="16" y="18" width="84" height="38" fill="#DBEAFE" stroke={INK} strokeWidth="2" />
            <text x="58" y="34" textAnchor="middle" fontSize="9" fontWeight="800" fill="#1E40AF">20×10</text>
            <text x="58" y="49" textAnchor="middle" fontSize="13" fontWeight="900" fill="#1E40AF">200</text>

            {/* 3×10 */}
            <rect x="100" y="18" width="80" height="38" fill="#FEF08A" stroke={INK} strokeWidth="2" />
            <text x="140" y="34" textAnchor="middle" fontSize="9" fontWeight="800" fill="#92400E">3×10</text>
            <text x="140" y="49" textAnchor="middle" fontSize="13" fontWeight="900" fill="#B45309">30</text>

            {/* 20×4 */}
            <rect x="16" y="56" width="84" height="38" fill="#D1FAE5" stroke={INK} strokeWidth="2" />
            <text x="58" y="72" textAnchor="middle" fontSize="9" fontWeight="800" fill="#065F46">20×4</text>
            <text x="58" y="87" textAnchor="middle" fontSize="13" fontWeight="900" fill="#059669">80</text>

            {/* 3×4 */}
            <rect x="100" y="56" width="80" height="38" fill="#FCE7F3" stroke={INK} strokeWidth="2" />
            <text x="140" y="72" textAnchor="middle" fontSize="9" fontWeight="800" fill="#9D174D">3×4</text>
            <text x="140" y="87" textAnchor="middle" fontSize="13" fontWeight="900" fill="#BE185D">12</text>

            <text x="98" y="114" textAnchor="middle" fontSize="11.5" fontWeight="900" fill={INK}>
              200 + 80 + 30 + 12 = <tspan fill="#059669" fontSize="14">322!</tspan>
            </text>
          </g>

          <Stickman x={54} y={196} scale={0.76} pose="happy" armR={[18, -4]} />
          <SpeechBubble x={92} y={174} w={134} h={42} tailX={74} tailY={190}>
            <text x="159" y="192" textAnchor="middle" fontSize="10" fontWeight="900" fill={INK}>
              네 조각 다 더하면 끝!
            </text>
            <text x="159" y="207" textAnchor="middle" fontSize="9.5" fontWeight="800" fill="#059669">
              세로셈 헷갈릴 때 최고 검산!
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 12. 표준 2층 세로셈 완성! (27 × 34) */
    case 'mul3_2by2_vertical':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#FEFCE8')} />
          <rect x="14" y="10" width="212" height="28" rx="6" fill="#FEF08A" stroke={INK} strokeWidth="2" />
          <text x="120" y="29" textAnchor="middle" fontSize="12" fontWeight="900" fill="#92400E">
            2층 아파트 세로셈! (27 × 34)
          </text>

          <g transform="translate(18, 44)">
            <rect x="0" y="0" width="114" height="122" rx="8" fill="#FFFFFF" stroke={INK} strokeWidth="2.4" />
            <text x="90" y="26" textAnchor="end" fontSize="18" fontWeight="900" fill={INK}>2 7</text>
            <text x="26" y="46" textAnchor="middle" fontSize="14" fontWeight="900" fill={INK}>×</text>
            <text x="90" y="46" textAnchor="end" fontSize="18" fontWeight="900" fill={INK}>3 4</text>
            <line x1="16" y1="53" x2="100" y2="53" stroke={INK} strokeWidth="2" />
            {/* 1층 */}
            <text x="90" y="72" textAnchor="end" fontSize="17" fontWeight="900" fill="#2563EB">1 0 8</text>
            {/* 2층 (십의 자리 밀기) */}
            <text x="74" y="92" textAnchor="end" fontSize="17" fontWeight="900" fill="#059669">8 1</text>
            <text x="90" y="92" textAnchor="end" fontSize="14" fontWeight="800" fill="#CBD5E1">0</text>
            <line x1="16" y1="98" x2="100" y2="98" stroke={INK} strokeWidth="2.2" />
            <text x="90" y="117" textAnchor="end" fontSize="18" fontWeight="900" fill="#B45309">9 1 8</text>
          </g>

          {/* 오른쪽 층별 가이드 */}
          <g transform="translate(138, 46)">
            <rect x="0" y="0" width="88" height="36" rx="6" fill="#DBEAFE" stroke="#2563EB" strokeWidth="1.8" />
            <text x="44" y="15" textAnchor="middle" fontSize="9" fontWeight="900" fill="#1E40AF">1층 (27 × 4)</text>
            <text x="44" y="30" textAnchor="middle" fontSize="11" fontWeight="900" fill="#2563EB">= 108</text>

            <rect x="0" y="42" width="88" height="36" rx="6" fill="#D1FAE5" stroke="#059669" strokeWidth="1.8" />
            <text x="44" y="57" textAnchor="middle" fontSize="9" fontWeight="900" fill="#065F46">2층 (27 × 30)</text>
            <text x="44" y="72" textAnchor="middle" fontSize="11" fontWeight="900" fill="#059669">= 810 (밀기!)</text>

            <rect x="0" y="84" width="88" height="34" rx="6" fill="#FEF3C7" stroke="#D97706" strokeWidth="1.8" />
            <text x="44" y="106" textAnchor="middle" fontSize="11" fontWeight="900" fill="#B45309">합계 = 918</text>
          </g>

          <Stickman x={54} y={198} scale={0.74} pose="hero" armR={[18, -4]} />
          <SpeechBubble x={92} y={176} w={134} h={40} tailX={74} tailY={190}>
            <text x="159" y="194" textAnchor="middle" fontSize="10" fontWeight="900" fill={INK}>
              2층은 한 칸 왼쪽에 쓰고
            </text>
            <text x="159" y="209" textAnchor="middle" fontSize="10" fontWeight="900" fill="#B45309">
              1층 + 2층 = 918 완성!
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 13. 1층 올림 vs 2층 올림 뒤섞임 함정! */
    case 'mul3_carry_overwrite_trap':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#FEF2F2')} />
          <rect x="14" y="10" width="212" height="28" rx="6" fill="#FEE2E2" stroke={INK} strokeWidth="2" />
          <text x="120" y="29" textAnchor="middle" fontSize="11.5" fontWeight="900" fill="#B91C1C">
            1층 올림 숫자 안 지우면 2층에서 헷갈려!
          </text>

          <g transform="translate(16, 46)">
            <rect x="0" y="0" width="208" height="118" rx="10" fill="#FFFFFF" stroke={INK} strokeWidth="2.4" />
            {/* 2층 올림 1 & 지워진 1층 올림 4 */}
            <text x="58" y="22" textAnchor="middle" fontSize="11" fontWeight="900" fill="#2563EB">1</text>
            <text x="78" y="22" textAnchor="middle" fontSize="11" fontWeight="900" fill="#94A3B8">4</text>
            <line x1="72" y1="24" x2="84" y2="12" stroke="#EF4444" strokeWidth="2.2" />

            <text x="96" y="42" textAnchor="end" fontSize="17" fontWeight="900" fill={INK}>4 8</text>
            <text x="34" y="61" textAnchor="middle" fontSize="14" fontWeight="900" fill={INK}>×</text>
            <text x="96" y="61" textAnchor="end" fontSize="17" fontWeight="900" fill={INK}>2 6</text>
            <line x1="26" y1="66" x2="104" y2="66" stroke={INK} strokeWidth="2" />
            <text x="96" y="83" textAnchor="end" fontSize="15.5" fontWeight="900" fill="#64748B">2 8 8</text>
            <text x="81" y="99" textAnchor="end" fontSize="15.5" fontWeight="900" fill="#2563EB">9 6</text>
            <line x1="26" y1="103" x2="104" y2="103" stroke={INK} strokeWidth="2" />
            <text x="96" y="116" textAnchor="end" fontSize="14.5" fontWeight="900" fill="#15803D">1 2 4 8</text>

            {/* 오른쪽 비법 노트 */}
            <rect x="114" y="12" width="84" height="94" rx="7" fill="#FFFBEB" stroke="#D97706" strokeWidth="1.8" />
            <text x="156" y="30" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#B45309">
              절대 꿀팁!!
            </text>
            <text x="156" y="50" textAnchor="middle" fontSize="8.5" fontWeight="800" fill={INK}>
              ① 1층(×6) 끝!
            </text>
            <text x="156" y="66" textAnchor="middle" fontSize="9" fontWeight="900" fill="#DC2626">
              ② 올린 4 빗금 긋기!
            </text>
            <text x="156" y="83" textAnchor="middle" fontSize="8.5" fontWeight="800" fill="#2563EB">
              ③ 2층(×2) 올림 1
            </text>
            <text x="156" y="98" textAnchor="middle" fontSize="8.5" fontWeight="800" fill="#15803D">
              깔끔히 1248!
            </text>
          </g>

          <Stickman x={50} y={198} scale={0.74} pose="panic" armR={[18, -6]} sweat />
          <SpeechBubble x={86} y={174} w={140} h={44} tailX={68} tailY={190}>
            <text x="156" y="193" textAnchor="middle" fontSize="10" fontWeight="900" fill={INK}>
              1층 올림과 2층 올림이
            </text>
            <text x="156" y="208" textAnchor="middle" fontSize="10" fontWeight="900" fill="#DC2626">
              섞이지 않게 빗금으로 지워!
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 14. 어림으로 엉터리 답 1초 컷! (49 × 21) */
    case 'mul3_estimate_check':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#ECFDF5')} />
          <rect x="14" y="12" width="212" height="30" rx="7" fill="#D1FAE5" stroke={INK} strokeWidth="2.2" />
          <text x="120" y="32" textAnchor="middle" fontSize="12.5" fontWeight="900" fill="#065F46">
            49 × 21 → 어림하면 약 1000 근처!
          </text>

          <g transform="translate(18, 52)">
            <rect x="0" y="0" width="204" height="50" rx="8" fill="#FFFFFF" stroke={INK} strokeWidth="2.2" />
            <text x="102" y="22" textAnchor="middle" fontSize="12" fontWeight="900" fill={INK}>
              49 ≈ <tspan fill="#2563EB">50</tspan> ,  21 ≈ <tspan fill="#2563EB">20</tspan>
            </text>
            <text x="102" y="42" textAnchor="middle" fontSize="14" fontWeight="900" fill="#059669">
              예상 크기: 50 × 20 = 약 1000!
            </text>
          </g>

          <g transform="translate(18, 110)">
            <rect x="0" y="0" width="96" height="54" rx="7" fill="#FEF2F2" stroke="#EF4444" strokeWidth="2" />
            <text x="48" y="20" textAnchor="middle" fontSize="10" fontWeight="900" fill="#DC2626">147 나왔다면?</text>
            <text x="48" y="40" textAnchor="middle" fontSize="11" fontWeight="900" fill="#DC2626">너무 작아 땡!!</text>

            <rect x="108" y="0" width="96" height="54" rx="7" fill="#ECFDF5" stroke="#16A34A" strokeWidth="2.2" />
            <text x="156" y="20" textAnchor="middle" fontSize="10" fontWeight="900" fill="#15803D">정확한 계산</text>
            <text x="156" y="40" textAnchor="middle" fontSize="14" fontWeight="900" fill="#15803D">1029 ✓</text>
          </g>

          <Stickman x={54} y={198} scale={0.74} pose="sunglasses" armR={[18, -4]} />
          <SpeechBubble x={92} y={176} w={134} h={40} tailX={74} tailY={190}>
            <text x="159" y="194" textAnchor="middle" fontSize="9.5" fontWeight="900" fill={INK}>
              어림으로 먼저 체급 체크!
            </text>
            <text x="159" y="209" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#059669">
              1000 근처 1029 딱 맞네!
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 15. 카드 [2, 5, 7, 9]로 가장 큰 곱 만들기! */
    case 'mul3_box_puzzle':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#F5F3FF')} />
          <rect x="14" y="10" width="212" height="28" rx="6" fill="#EDE9FE" stroke={INK} strokeWidth="2" />
          <text x="120" y="29" textAnchor="middle" fontSize="11.5" fontWeight="900" fill="#5B21B6">
            카드 [2] [5] [7] [9] → 가장 큰 곱은?
          </text>

          {/* 비교 1 */}
          <g transform="translate(16, 46)">
            <rect x="0" y="0" width="98" height="114" rx="8" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="2" />
            <text x="49" y="18" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#64748B">후보 ①</text>
            <text x="49" y="44" textAnchor="middle" fontSize="17" fontWeight="900" fill={INK}>95 × 72</text>
            <text x="49" y="66" textAnchor="middle" fontSize="14" fontWeight="900" fill="#475569">= 6840</text>
            <text x="49" y="88" textAnchor="middle" fontSize="8.5" fontWeight="800" fill="#64748B">차: 95-72 = 23</text>
            <text x="49" y="103" textAnchor="middle" fontSize="9" fontWeight="900" fill="#DC2626">60 작다!</text>
          </g>

          {/* 비교 2 (우승) */}
          <g transform="translate(126, 46)">
            <rect x="0" y="0" width="98" height="114" rx="8" fill="#FFFFFF" stroke="#7C3AED" strokeWidth="2.6" />
            <text x="49" y="18" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#7C3AED">우승! ★★</text>
            <text x="49" y="44" textAnchor="middle" fontSize="17" fontWeight="900" fill="#5B21B6">92 × 75</text>
            <text x="49" y="66" textAnchor="middle" fontSize="15" fontWeight="900" fill="#15803D">= 6900</text>
            <text x="49" y="88" textAnchor="middle" fontSize="8.5" fontWeight="800" fill="#5B21B6">차: 92-75 = 17</text>
            <text x="49" y="103" textAnchor="middle" fontSize="9" fontWeight="900" fill="#15803D">차가 작을수록 BIG!</text>
          </g>

          <Stickman x={50} y={198} scale={0.74} pose="headband" armR={[18, -4]} />
          <SpeechBubble x={86} y={174} w={140} h={44} tailX={68} tailY={190}>
            <text x="156" y="193" textAnchor="middle" fontSize="9.5" fontWeight="900" fill={INK}>
              큰 수 9, 7을 십의 자리에!
            </text>
            <text x="156" y="208" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#7C3AED">
              큰 9 옆엔 작은 2 → 92×75!
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 16. 최종 보스! 3-2 곱셈 3관문 */
    case 'mul3_boss':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#1E1B4B')} />
          <rect x="14" y="10" width="212" height="28" rx="6" fill="#EF4444" stroke="#FEF08A" strokeWidth="2" />
          <text x="120" y="29" textAnchor="middle" fontSize="12" fontWeight="900" fill="#FFFFFF">
            BOSS! 3-2 곱셈 최종 3관문
          </text>

          {/* 3관문 카드 */}
          <g transform="translate(18, 46)">
            <rect x="0" y="0" width="204" height="32" rx="6" fill="#FFFFFF" stroke="#FACC15" strokeWidth="2" />
            <text x="14" y="21" fontSize="10.5" fontWeight="900" fill="#DC2626">①</text>
            <text x="32" y="21" fontSize="12.5" fontWeight="900" fill={INK}>407 × 6 = ?</text>
            <text x="194" y="21" textAnchor="end" fontSize="9.5" fontWeight="800" fill="#64748B">(0 올림)</text>

            <rect x="0" y="39" width="204" height="32" rx="6" fill="#FFFFFF" stroke="#FACC15" strokeWidth="2" />
            <text x="14" y="60" fontSize="10.5" fontWeight="900" fill="#2563EB">②</text>
            <text x="32" y="60" fontSize="12.5" fontWeight="900" fill={INK}>50 × 40 = ?</text>
            <text x="194" y="60" textAnchor="end" fontSize="9.5" fontWeight="800" fill="#64748B">(0 개수!)</text>

            <rect x="0" y="78" width="204" height="32" rx="6" fill="#FFFFFF" stroke="#FACC15" strokeWidth="2" />
            <text x="14" y="99" fontSize="10.5" fontWeight="900" fill="#7C3AED">③</text>
            <text x="32" y="99" fontSize="12.5" fontWeight="900" fill={INK}>38 × 25 = ?</text>
            <text x="194" y="99" textAnchor="end" fontSize="9.5" fontWeight="800" fill="#64748B">(2층 세로셈)</text>
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

    /* 17. 3-2 곱셈 완주 축하 포카! */
    case 'mul3_praise':
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
            ★ 3-2 곱셈 완주 축하!! ★
          </text>
          <text x="120" y="55" textAnchor="middle" fontSize="10" fontWeight="900" fill="#92400E">
            18장 올 클리어 · 세로셈 마스터!
          </text>

          <g transform="translate(120, 96)">
            <ellipse cx="0" cy="0" rx="54" ry="20" fill="#FFFFFF" stroke={INK} strokeWidth="2.4" />
            <text x="0" y="5" textAnchor="middle" fontSize="12.5" fontWeight="900" fill="#2563EB">
              304×5  ·  27×34  ✓
            </text>
          </g>

          <Stickman x={120} y={164} scale={0.95} pose="hero" armL={[-20, 4]} armR={[20, 4]} />
          <text x="120" y="222" textAnchor="middle" fontSize="10.5" fontWeight="900" fill="#B45309">
            공식 3학년 곱셈 챔피언 인증!
          </text>
        </svg>
      );
  }
};
