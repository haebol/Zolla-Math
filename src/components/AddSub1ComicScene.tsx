import React from 'react';
import { EpisodeSceneType, PrintInkMode } from '../types/card';

interface AddSub1ComicSceneProps {
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

export const AddSub1ComicScene: React.FC<AddSub1ComicSceneProps> = ({
  sceneType,
  inkMode = 'full',
}) => {
  const isInkSaving = inkMode !== 'full';
  const softBg = (fullColor: string) => (isInkSaving ? '#FFFFFF' : fullColor);

  switch (sceneType) {
    /* 00. 도감 설명서 */
    case 'addsub1_guide':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#F0F9FF')} />
          <rect x="12" y="12" width="216" height="44" rx="8" fill="#FEF08A" stroke={INK} strokeWidth="2.5" />
          <text x="120" y="31" textAnchor="middle" fontSize="13.5" fontWeight="900" fill={INK}>
            덧셈·뺄셈(1) 도감 18장 맵!
          </text>
          <text x="120" y="48" textAnchor="middle" fontSize="9.5" fontWeight="800" fill="#B45309">
            10묶음·낱개 기초부터 세로셈 자리 맞춤까지!
          </text>

          <g transform="translate(14, 66)">
            <rect x="0" y="0" width="100" height="58" rx="6" fill="#FFFFFF" stroke={INK} strokeWidth="2" />
            <text x="50" y="16" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#2563EB">
              끼리끼리 계산!
            </text>
            <text x="50" y="35" textAnchor="middle" fontSize="13" fontWeight="900" fill={INK}>
              24 + 13 = 37
            </text>
            <text x="50" y="50" textAnchor="middle" fontSize="8.5" fontWeight="800" fill="#059669">
              묶음끼리 · 낱개끼리!
            </text>
          </g>

          <g transform="translate(126, 66)">
            <rect x="0" y="0" width="100" height="58" rx="6" fill="#FFFFFF" stroke={INK} strokeWidth="2" />
            <text x="50" y="16" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#DC2626">
              자리 맞춤 주의!
            </text>
            <text x="50" y="35" textAnchor="middle" fontSize="13" fontWeight="900" fill={INK}>
              23 + 4 = 27
            </text>
            <text x="50" y="50" textAnchor="middle" fontSize="8.5" fontWeight="800" fill="#DC2626">
              한 자리는 오른쪽 끝!
            </text>
          </g>

          <Stickman x={54} y={168} pose="hero" armR={[18, 4]} />
          <SpeechBubble x={92} y={136} w={132} h={48} tailX={74} tailY={156}>
            <text x="158" y="156" textAnchor="middle" fontSize="10.5" fontWeight="900" fill={INK}>
              선수학습 2장 + 함정까지
            </text>
            <text x="158" y="173" textAnchor="middle" fontSize="11" fontWeight="900" fill="#2563EB">
              두 자리 계산 1초 컷!!
            </text>
          </SpeechBubble>
          <text x="160" y="216" textAnchor="middle" fontSize="10" fontWeight="900" fill="#475569">
            ★ 1학년 계산 왕 출발! ★
          </text>
        </svg>
      );

    /* 01. [선수학습] 10개씩 묶음 3개 + 낱개 4개 = 34 */
    case 'addsub1_prereq_bundles':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#EFF6FF')} />
          <rect x="14" y="12" width="212" height="30" rx="7" fill="#DBEAFE" stroke={INK} strokeWidth="2.2" />
          <text x="120" y="32" textAnchor="middle" fontSize="12.5" fontWeight="900" fill="#1E40AF">
            10묶음 3개(30) + 낱개 4개(4) = 34!
          </text>

          <g transform="translate(16, 52)">
            <rect x="0" y="0" width="132" height="106" rx="8" fill="#FFFFFF" stroke={INK} strokeWidth="2.2" />
            <text x="42" y="17" textAnchor="middle" fontSize="9" fontWeight="900" fill="#2563EB">10묶음 3개</text>
            {[0, 1, 2].map((i) => (
              <g key={i} transform={`translate(${12 + i * 22}, 26)`}>
                <rect x="0" y="0" width="16" height="54" rx="4" fill="#93C5FD" stroke={INK} strokeWidth="1.6" />
                <text x="8" y="31" textAnchor="middle" fontSize="9" fontWeight="900" fill={INK}>10</text>
              </g>
            ))}

            <text x="106" y="17" textAnchor="middle" fontSize="9" fontWeight="900" fill="#DC2626">낱개 4개</text>
            {[0, 1, 2, 3].map((i) => (
              <circle key={i} cx={92 + (i % 2) * 20} cy={38 + Math.floor(i / 2) * 24} r="8" fill="#FDE047" stroke={INK} strokeWidth="1.5" />
            ))}
            <text x="66" y="98" textAnchor="middle" fontSize="10" fontWeight="900" fill={INK}>30 + 4 = 34</text>
          </g>

          <g transform="translate(156, 54)">
            <rect x="0" y="0" width="70" height="102" rx="8" fill="#FFFFFF" stroke={INK} strokeWidth="2.4" />
            <text x="22" y="22" textAnchor="middle" fontSize="9" fontWeight="900" fill="#2563EB">십</text>
            <text x="48" y="22" textAnchor="middle" fontSize="9" fontWeight="900" fill="#DC2626">일</text>
            <text x="22" y="64" textAnchor="middle" fontSize="28" fontWeight="900" fill="#2563EB">3</text>
            <text x="48" y="64" textAnchor="middle" fontSize="28" fontWeight="900" fill="#DC2626">4</text>
            <text x="35" y="90" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#475569">서른넷</text>
          </g>

          <Stickman x={54} y={196} scale={0.76} pose="happy" armR={[18, -4]} />
          <SpeechBubble x={92} y={174} w={134} h={42} tailX={74} tailY={190}>
            <text x="159" y="192" textAnchor="middle" fontSize="10" fontWeight="900" fill={INK}>
              십의 자리는 10묶음 개수,
            </text>
            <text x="159" y="207" textAnchor="middle" fontSize="10" fontWeight="900" fill="#2563EB">
              일의 자리는 낱개 개수!!
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 02. [선수학습] 한 자리 수 덧셈·뺄셈 워밍업 */
    case 'addsub1_prereq_one_digit':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#EFF6FF')} />
          <rect x="14" y="12" width="212" height="28" rx="6" fill="#DBEAFE" stroke={INK} strokeWidth="2" />
          <text x="120" y="31" textAnchor="middle" fontSize="12.5" fontWeight="900" fill="#1E40AF">
            한 자리 계산이 두 자리 계산의 열쇠!
          </text>

          <g transform="translate(18, 50)">
            <rect x="0" y="0" width="98" height="106" rx="8" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2.2" />
            <text x="49" y="22" textAnchor="middle" fontSize="10.5" fontWeight="900" fill="#2563EB">더하기 (+)</text>
            <text x="49" y="54" textAnchor="middle" fontSize="20" fontWeight="900" fill={INK}>4 + 3 = 7</text>
            <text x="49" y="84" textAnchor="middle" fontSize="10" fontWeight="800" fill="#475569">4에서 3 이어 세기</text>
          </g>

          <g transform="translate(124, 50)">
            <rect x="0" y="0" width="98" height="106" rx="8" fill="#FFFFFF" stroke="#DC2626" strokeWidth="2.2" />
            <text x="49" y="22" textAnchor="middle" fontSize="10.5" fontWeight="900" fill="#DC2626">빼기 (-)</text>
            <text x="49" y="54" textAnchor="middle" fontSize="20" fontWeight="900" fill={INK}>8 - 5 = 3</text>
            <text x="49" y="84" textAnchor="middle" fontSize="10" fontWeight="800" fill="#475569">8에서 5 덜어 내기</text>
          </g>

          <Stickman x={54} y={196} scale={0.76} pose="sunglasses" armR={[18, -4]} />
          <SpeechBubble x={92} y={174} w={134} h={42} tailX={74} tailY={190}>
            <text x="159" y="192" textAnchor="middle" fontSize="10" fontWeight="900" fill={INK}>
              4+3, 8-5만 알면
            </text>
            <text x="159" y="207" textAnchor="middle" fontSize="10" fontWeight="900" fill="#2563EB">
              두 자리 수도 그대로 컷!
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 03. (몇십)+(몇십), (몇십)-(몇십) */
    case 'addsub1_tens_add_sub':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#EFF6FF')} />
          <rect x="14" y="12" width="212" height="28" rx="6" fill="#DBEAFE" stroke={INK} strokeWidth="2" />
          <text x="120" y="31" textAnchor="middle" fontSize="12" fontWeight="900" fill="#1E40AF">
            (몇십)±(몇십)은 10묶음 개수끼리 계산!
          </text>

          <g transform="translate(16, 48)">
            <rect x="0" y="0" width="208" height="52" rx="8" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2" />
            <text x="16" y="32" fontSize="17" fontWeight="900" fill={INK}>
              3<tspan fill="#DC2626">0</tspan> + 2<tspan fill="#DC2626">0</tspan> = <tspan fill="#2563EB">50</tspan>
            </text>
            <text x="196" y="22" textAnchor="end" fontSize="9" fontWeight="800" fill="#475569">10묶음 3+2=5개</text>
            <text x="196" y="39" textAnchor="end" fontSize="9" fontWeight="900" fill="#2563EB">뒤에 0 하나 쏙!</text>
          </g>

          <g transform="translate(16, 108)">
            <rect x="0" y="0" width="208" height="52" rx="8" fill="#FFFFFF" stroke="#059669" strokeWidth="2" />
            <text x="16" y="32" fontSize="17" fontWeight="900" fill={INK}>
              6<tspan fill="#DC2626">0</tspan> - 2<tspan fill="#DC2626">0</tspan> = <tspan fill="#059669">40</tspan>
            </text>
            <text x="196" y="22" textAnchor="end" fontSize="9" fontWeight="800" fill="#475569">10묶음 6-2=4개</text>
            <text x="196" y="39" textAnchor="end" fontSize="9" fontWeight="900" fill="#059669">뒤에 0 하나 쏙!</text>
          </g>

          <Stickman x={54} y={196} scale={0.76} pose="happy" armR={[18, -4]} />
          <SpeechBubble x={92} y={174} w={134} h={42} tailX={74} tailY={190}>
            <text x="159" y="192" textAnchor="middle" fontSize="10" fontWeight="900" fill={INK}>
              0을 가리고 계산한 뒤
            </text>
            <text x="159" y="207" textAnchor="middle" fontSize="10" fontWeight="900" fill="#2563EB">
              뒤에 0 하나만 붙이면 끝!
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 04. (몇십몇)+(몇) — 23 + 4 = 27 */
    case 'addsub1_2plus1':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#ECFDF5')} />
          <rect x="14" y="12" width="212" height="28" rx="6" fill="#D1FAE5" stroke={INK} strokeWidth="2" />
          <text x="120" y="31" textAnchor="middle" fontSize="12.5" fontWeight="900" fill="#065F46">
            23 + 4 → 낱개(3+4)끼리만 더하기!
          </text>

          <g transform="translate(18, 48)">
            <rect x="0" y="0" width="204" height="112" rx="10" fill="#FFFFFF" stroke={INK} strokeWidth="2.2" />
            <text x="102" y="38" textAnchor="middle" fontSize="24" fontWeight="900" fill={INK}>
              <tspan fill="#2563EB">2</tspan><tspan fill="#DC2626">3</tspan> + <tspan fill="#DC2626">4</tspan> = <tspan fill="#2563EB">2</tspan><tspan fill="#059669">7</tspan>
            </text>

            <rect x="14" y="54" width="82" height="44" rx="6" fill="#DBEAFE" stroke="#2563EB" strokeWidth="1.6" />
            <text x="55" y="72" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#1E40AF">10묶음 (그대로!)</text>
            <text x="55" y="90" textAnchor="middle" fontSize="14" fontWeight="900" fill="#2563EB">20</text>

            <rect x="108" y="54" width="82" height="44" rx="6" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1.6" />
            <text x="149" y="72" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#92400E">낱개 합체!</text>
            <text x="149" y="90" textAnchor="middle" fontSize="13.5" fontWeight="900" fill="#DC2626">3 + 4 = 7</text>
          </g>

          <Stickman x={54} y={196} scale={0.76} pose="sunglasses" armR={[18, -4]} />
          <SpeechBubble x={92} y={174} w={134} h={42} tailX={74} tailY={190}>
            <text x="159" y="192" textAnchor="middle" fontSize="10" fontWeight="900" fill={INK}>
              십의 자리 2는 가만히 두고
            </text>
            <text x="159" y="207" textAnchor="middle" fontSize="10" fontWeight="900" fill="#059669">
              낱개 3+4=7만 더하면 27!
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 05. 세로셈 자리 맞춤 함정! 23 + 4 */
    case 'addsub1_2plus1_align_trap':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#FEF2F2')} />
          <rect x="14" y="10" width="212" height="28" rx="6" fill="#FEE2E2" stroke={INK} strokeWidth="2" />
          <text x="120" y="29" textAnchor="middle" fontSize="11.5" fontWeight="900" fill="#B91C1C">
            4를 어디에 줄 세울까?! 자리 맞춤 함정!
          </text>

          {/* 땡 */}
          <g transform="translate(14, 46)">
            <rect x="0" y="0" width="98" height="114" rx="8" fill="#FFFFFF" stroke="#EF4444" strokeWidth="2.4" />
            <text x="49" y="17" textAnchor="middle" fontSize="9" fontWeight="900" fill="#DC2626">왼쪽에 쓰면 땡!</text>
            <text x="68" y="44" textAnchor="end" fontSize="18" fontWeight="900" fill={INK}>2 3</text>
            <text x="20" y="66" textAnchor="middle" fontSize="14" fontWeight="900" fill={INK}>+</text>
            <text x="50" y="66" textAnchor="end" fontSize="18" fontWeight="900" fill="#DC2626">4</text>
            <line x1="16" y1="74" x2="80" y2="74" stroke={INK} strokeWidth="2" />
            <text x="68" y="96" textAnchor="end" fontSize="18" fontWeight="900" fill="#DC2626">6 3</text>
            <text x="49" y="109" textAnchor="middle" fontSize="8" fontWeight="800" fill="#DC2626">40을 더해버림!</text>
            <line x1="18" y1="80" x2="80" y2="100" stroke="#EF4444" strokeWidth="2.8" />
          </g>

          {/* 정답 */}
          <g transform="translate(128, 46)">
            <rect x="0" y="0" width="98" height="114" rx="8" fill="#FFFFFF" stroke="#16A34A" strokeWidth="2.6" />
            <text x="49" y="17" textAnchor="middle" fontSize="9" fontWeight="900" fill="#15803D">오른쪽 끝 맞춤! ✓</text>
            <text x="68" y="44" textAnchor="end" fontSize="18" fontWeight="900" fill={INK}>2 3</text>
            <text x="20" y="66" textAnchor="middle" fontSize="14" fontWeight="900" fill={INK}>+</text>
            <text x="68" y="66" textAnchor="end" fontSize="18" fontWeight="900" fill="#15803D">4</text>
            <line x1="16" y1="74" x2="80" y2="74" stroke={INK} strokeWidth="2" />
            <text x="68" y="96" textAnchor="end" fontSize="18" fontWeight="900" fill="#15803D">2 7</text>
            <text x="49" y="109" textAnchor="middle" fontSize="8.5" fontWeight="900" fill="#15803D">3 아래에 4! ◎</text>
          </g>

          <Stickman x={50} y={196} scale={0.76} pose="panic" armR={[18, -6]} sweat />
          <SpeechBubble x={86} y={172} w={140} h={46} tailX={68} tailY={188}>
            <text x="156" y="191" textAnchor="middle" fontSize="10" fontWeight="900" fill={INK}>
              한 자리 수는 낱개니까
            </text>
            <text x="156" y="207" textAnchor="middle" fontSize="10" fontWeight="900" fill="#DC2626">
              무조건 일의 자리(3) 아래!!
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 06. (몇)+(몇십몇) — 5 + 32 = 37 */
    case 'addsub1_1plus2':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#EFF6FF')} />
          <rect x="14" y="12" width="212" height="28" rx="6" fill="#DBEAFE" stroke={INK} strokeWidth="2" />
          <text x="120" y="31" textAnchor="middle" fontSize="12.5" fontWeight="900" fill="#1E40AF">
            5 + 32 → 순서를 바꿔도 32 + 5 = 37!
          </text>

          <g transform="translate(18, 48)">
            <rect x="0" y="0" width="204" height="110" rx="10" fill="#FFFFFF" stroke={INK} strokeWidth="2.2" />
            <text x="102" y="34" textAnchor="middle" fontSize="22" fontWeight="900" fill={INK}>
              <tspan fill="#DC2626">5</tspan> + 3<tspan fill="#DC2626">2</tspan> = 3<tspan fill="#2563EB">7</tspan>
            </text>
            <path d="M 55 42 Q 102 68 118 42" fill="none" stroke="#DC2626" strokeWidth="2" strokeDasharray="3 2" />
            <text x="102" y="72" textAnchor="middle" fontSize="11.5" fontWeight="900" fill="#DC2626">
              낱개 5 + 2 = 7!
            </text>
            <rect x="28" y="82" width="148" height="22" rx="5" fill="#EFF6FF" stroke="#2563EB" strokeWidth="1.5" />
            <text x="102" y="97" textAnchor="middle" fontSize="10.5" fontWeight="900" fill="#1E40AF">
              5 + 32  =  32 + 5  =  37
            </text>
          </g>

          <Stickman x={54} y={196} scale={0.76} pose="happy" armR={[18, -4]} />
          <SpeechBubble x={92} y={174} w={134} h={42} tailX={74} tailY={190}>
            <text x="159" y="192" textAnchor="middle" fontSize="10" fontWeight="900" fill={INK}>
              한 자리 수가 앞에 있어도
            </text>
            <text x="159" y="207" textAnchor="middle" fontSize="10" fontWeight="900" fill="#2563EB">
              낱개끼리 쏙 더해 37!
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 07. (몇십몇)+(몇십몇) 가로셈 (24 + 13) */
    case 'addsub1_2plus2_horiz':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#FEFCE8')} />
          <rect x="14" y="10" width="212" height="28" rx="6" fill="#FEF08A" stroke={INK} strokeWidth="2" />
          <text x="120" y="29" textAnchor="middle" fontSize="12" fontWeight="900" fill="#92400E">
            24 + 13 = 묶음끼리 + 낱개끼리!
          </text>

          <g transform="translate(18, 46)">
            <rect x="0" y="0" width="204" height="114" rx="10" fill="#FFFFFF" stroke={INK} strokeWidth="2.2" />
            <text x="102" y="30" textAnchor="middle" fontSize="22" fontWeight="900" fill={INK}>
              <tspan fill="#2563EB">2</tspan><tspan fill="#DC2626">4</tspan> + <tspan fill="#2563EB">1</tspan><tspan fill="#DC2626">3</tspan>
            </text>

            <rect x="12" y="44" width="88" height="36" rx="6" fill="#DBEAFE" stroke="#2563EB" strokeWidth="1.6" />
            <text x="56" y="59" textAnchor="middle" fontSize="9" fontWeight="900" fill="#1E40AF">10묶음끼리</text>
            <text x="56" y="74" textAnchor="middle" fontSize="12" fontWeight="900" fill="#2563EB">20+10 = 30</text>

            <rect x="106" y="44" width="86" height="36" rx="6" fill="#FEE2E2" stroke="#DC2626" strokeWidth="1.6" />
            <text x="149" y="59" textAnchor="middle" fontSize="9" fontWeight="900" fill="#991B1B">낱개끼리</text>
            <text x="149" y="74" textAnchor="middle" fontSize="12" fontWeight="900" fill="#DC2626">4 + 3 = 7</text>

            <text x="102" y="103" textAnchor="middle" fontSize="15" fontWeight="900" fill="#B45309">
              합체: 30 + 7 = 37!!
            </text>
          </g>

          <Stickman x={54} y={196} scale={0.74} pose="hero" armR={[18, -4]} />
          <SpeechBubble x={92} y={174} w={134} h={42} tailX={74} tailY={190}>
            <text x="159" y="192" textAnchor="middle" fontSize="10" fontWeight="900" fill={INK}>
              10묶음은 10묶음끼리,
            </text>
            <text x="159" y="207" textAnchor="middle" fontSize="10" fontWeight="900" fill="#B45309">
              낱개는 낱개끼리 합체!
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 08. 두 자리 수 덧셈 세로셈 (32 + 45) */
    case 'addsub1_2plus2_vertical':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#ECFDF5')} />
          <rect x="14" y="12" width="212" height="28" rx="6" fill="#D1FAE5" stroke={INK} strokeWidth="2" />
          <text x="120" y="31" textAnchor="middle" fontSize="12" fontWeight="900" fill="#065F46">
            세로셈 덧셈: 오른쪽 일의 자리부터!
          </text>

          <g transform="translate(22, 48)">
            <rect x="0" y="0" width="96" height="114" rx="8" fill="#FFFFFF" stroke={INK} strokeWidth="2.4" />
            <text x="42" y="18" textAnchor="middle" fontSize="8.5" fontWeight="900" fill="#2563EB">십</text>
            <text x="66" y="18" textAnchor="middle" fontSize="8.5" fontWeight="900" fill="#DC2626">일</text>
            <text x="74" y="42" textAnchor="end" fontSize="20" fontWeight="900" fill={INK}>3 2</text>
            <text x="22" y="66" textAnchor="middle" fontSize="16" fontWeight="900" fill={INK}>+</text>
            <text x="74" y="66" textAnchor="end" fontSize="20" fontWeight="900" fill={INK}>4 5</text>
            <line x1="16" y1="74" x2="82" y2="74" stroke={INK} strokeWidth="2.4" />
            <text x="74" y="99" textAnchor="end" fontSize="21" fontWeight="900" fill="#059669">7 7</text>
          </g>

          <g transform="translate(128, 52)">
            <rect x="0" y="0" width="96" height="48" rx="6" fill="#FEE2E2" stroke="#EF4444" strokeWidth="1.8" />
            <text x="48" y="18" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#DC2626">① 일의 자리 먼저</text>
            <text x="48" y="38" textAnchor="middle" fontSize="14" fontWeight="900" fill={INK}>2 + 5 = 7</text>

            <rect x="0" y="56" width="96" height="48" rx="6" fill="#DBEAFE" stroke="#2563EB" strokeWidth="1.8" />
            <text x="48" y="74" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#1D4ED8">② 십의 자리 다음</text>
            <text x="48" y="94" textAnchor="middle" fontSize="14" fontWeight="900" fill={INK}>3 + 4 = 7</text>
          </g>

          <Stickman x={54} y={196} scale={0.74} pose="happy" armR={[18, -4]} />
          <SpeechBubble x={92} y={174} w={134} h={42} tailX={74} tailY={190}>
            <text x="159" y="192" textAnchor="middle" fontSize="10" fontWeight="900" fill={INK}>
              같은 자리끼리 세로 줄맞춤!
            </text>
            <text x="159" y="207" textAnchor="middle" fontSize="10" fontWeight="900" fill="#059669">
              오른쪽부터 더해 77 끝!
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 09. (몇십몇)-(몇) — 38 - 5 = 33 */
    case 'addsub1_2minus1':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#EFF6FF')} />
          <rect x="14" y="12" width="212" height="28" rx="6" fill="#DBEAFE" stroke={INK} strokeWidth="2" />
          <text x="120" y="31" textAnchor="middle" fontSize="12.5" fontWeight="900" fill="#1E40AF">
            38 - 5 → 낱개(8-5)에서만 쏙 빼기!
          </text>

          <g transform="translate(18, 48)">
            <rect x="0" y="0" width="204" height="112" rx="10" fill="#FFFFFF" stroke={INK} strokeWidth="2.2" />
            <text x="102" y="38" textAnchor="middle" fontSize="24" fontWeight="900" fill={INK}>
              <tspan fill="#2563EB">3</tspan><tspan fill="#DC2626">8</tspan> - <tspan fill="#DC2626">5</tspan> = <tspan fill="#2563EB">3</tspan><tspan fill="#059669">3</tspan>
            </text>

            <rect x="14" y="54" width="82" height="44" rx="6" fill="#DBEAFE" stroke="#2563EB" strokeWidth="1.6" />
            <text x="55" y="72" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#1E40AF">10묶음 (그대로!)</text>
            <text x="55" y="90" textAnchor="middle" fontSize="14" fontWeight="900" fill="#2563EB">30</text>

            <rect x="108" y="54" width="82" height="44" rx="6" fill="#FEE2E2" stroke="#DC2626" strokeWidth="1.6" />
            <text x="149" y="72" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#991B1B">낱개 덜어내기!</text>
            <text x="149" y="90" textAnchor="middle" fontSize="13.5" fontWeight="900" fill="#DC2626">8 - 5 = 3</text>
          </g>

          <Stickman x={54} y={196} scale={0.76} pose="sunglasses" armR={[18, -4]} />
          <SpeechBubble x={92} y={174} w={134} h={42} tailX={74} tailY={190}>
            <text x="159" y="192" textAnchor="middle" fontSize="10" fontWeight="900" fill={INK}>
              10묶음 3개는 안 건드려!
            </text>
            <text x="159" y="207" textAnchor="middle" fontSize="10" fontWeight="900" fill="#2563EB">
              8-5=3만 바꿔서 33!
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 10. 뺄셈 자리 맞춤 함정! 47 - 3 */
    case 'addsub1_2minus1_align_trap':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#FEF2F2')} />
          <rect x="14" y="10" width="212" height="28" rx="6" fill="#FEE2E2" stroke={INK} strokeWidth="2" />
          <text x="120" y="29" textAnchor="middle" fontSize="11.5" fontWeight="900" fill="#B91C1C">
            47 - 3 세로셈! 3을 4 아래에 쓰면 땡!!
          </text>

          {/* 땡 */}
          <g transform="translate(14, 46)">
            <rect x="0" y="0" width="98" height="114" rx="8" fill="#FFFFFF" stroke="#EF4444" strokeWidth="2.4" />
            <text x="49" y="17" textAnchor="middle" fontSize="9" fontWeight="900" fill="#DC2626">4 아래 쓰면 땡!</text>
            <text x="68" y="44" textAnchor="end" fontSize="18" fontWeight="900" fill={INK}>4 7</text>
            <text x="20" y="66" textAnchor="middle" fontSize="14" fontWeight="900" fill={INK}>-</text>
            <text x="50" y="66" textAnchor="end" fontSize="18" fontWeight="900" fill="#DC2626">3</text>
            <line x1="16" y1="74" x2="80" y2="74" stroke={INK} strokeWidth="2" />
            <text x="68" y="96" textAnchor="end" fontSize="18" fontWeight="900" fill="#DC2626">1 7</text>
            <text x="49" y="109" textAnchor="middle" fontSize="8" fontWeight="800" fill="#DC2626">30을 빼버림!</text>
            <line x1="18" y1="80" x2="80" y2="100" stroke="#EF4444" strokeWidth="2.8" />
          </g>

          {/* 정답 */}
          <g transform="translate(128, 46)">
            <rect x="0" y="0" width="98" height="114" rx="8" fill="#FFFFFF" stroke="#16A34A" strokeWidth="2.6" />
            <text x="49" y="17" textAnchor="middle" fontSize="9" fontWeight="900" fill="#15803D">7 아래에 3! ✓</text>
            <text x="68" y="44" textAnchor="end" fontSize="18" fontWeight="900" fill={INK}>4 7</text>
            <text x="20" y="66" textAnchor="middle" fontSize="14" fontWeight="900" fill={INK}>-</text>
            <text x="68" y="66" textAnchor="end" fontSize="18" fontWeight="900" fill="#15803D">3</text>
            <line x1="16" y1="74" x2="80" y2="74" stroke={INK} strokeWidth="2" />
            <text x="68" y="96" textAnchor="end" fontSize="18" fontWeight="900" fill="#15803D">4 4</text>
            <text x="49" y="109" textAnchor="middle" fontSize="8.5" fontWeight="900" fill="#15803D">7-3=4 → 44 ◎</text>
          </g>

          <Stickman x={50} y={196} scale={0.76} pose="headband" armR={[18, -4]} />
          <SpeechBubble x={86} y={172} w={140} h={46} tailX={68} tailY={188}>
            <text x="156" y="191" textAnchor="middle" fontSize="10" fontWeight="900" fill={INK}>
              뺄셈도 한 자리 수는 무조건
            </text>
            <text x="156" y="207" textAnchor="middle" fontSize="10" fontWeight="900" fill="#15803D">
              오른쪽 끝(일의 자리) 아래!
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 11. (몇십몇)-(몇십몇) 가로셈 (58 - 23) */
    case 'addsub1_2minus2_horiz':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#FEFCE8')} />
          <rect x="14" y="10" width="212" height="28" rx="6" fill="#FEF08A" stroke={INK} strokeWidth="2" />
          <text x="120" y="29" textAnchor="middle" fontSize="12" fontWeight="900" fill="#92400E">
            58 - 23 = 묶음 빼기 + 낱개 빼기!
          </text>

          <g transform="translate(18, 46)">
            <rect x="0" y="0" width="204" height="114" rx="10" fill="#FFFFFF" stroke={INK} strokeWidth="2.2" />
            <text x="102" y="30" textAnchor="middle" fontSize="22" fontWeight="900" fill={INK}>
              <tspan fill="#2563EB">5</tspan><tspan fill="#DC2626">8</tspan> - <tspan fill="#2563EB">2</tspan><tspan fill="#DC2626">3</tspan>
            </text>

            <rect x="12" y="44" width="88" height="36" rx="6" fill="#DBEAFE" stroke="#2563EB" strokeWidth="1.6" />
            <text x="56" y="59" textAnchor="middle" fontSize="9" fontWeight="900" fill="#1E40AF">10묶음 빼기</text>
            <text x="56" y="74" textAnchor="middle" fontSize="12" fontWeight="900" fill="#2563EB">50-20 = 30</text>

            <rect x="106" y="44" width="86" height="36" rx="6" fill="#FEE2E2" stroke="#DC2626" strokeWidth="1.6" />
            <text x="149" y="59" textAnchor="middle" fontSize="9" fontWeight="900" fill="#991B1B">낱개 빼기</text>
            <text x="149" y="74" textAnchor="middle" fontSize="12" fontWeight="900" fill="#DC2626">8 - 3 = 5</text>

            <text x="102" y="103" textAnchor="middle" fontSize="15" fontWeight="900" fill="#B45309">
              합체: 30 + 5 = 35!!
            </text>
          </g>

          <Stickman x={54} y={196} scale={0.74} pose="hero" armR={[18, -4]} />
          <SpeechBubble x={92} y={174} w={134} h={42} tailX={74} tailY={190}>
            <text x="159" y="192" textAnchor="middle" fontSize="10" fontWeight="900" fill={INK}>
              묶음끼리 빼고 낱개끼리 빼서
            </text>
            <text x="159" y="207" textAnchor="middle" fontSize="10" fontWeight="900" fill="#B45309">
              남은 것만 합치면 35!
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 12. 두 자리 수 뺄셈 세로셈 (69 - 24) */
    case 'addsub1_2minus2_vertical':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#ECFDF5')} />
          <rect x="14" y="12" width="212" height="28" rx="6" fill="#D1FAE5" stroke={INK} strokeWidth="2" />
          <text x="120" y="31" textAnchor="middle" fontSize="12" fontWeight="900" fill="#065F46">
            세로셈 뺄셈: 오른쪽부터 위 - 아래!
          </text>

          <g transform="translate(22, 48)">
            <rect x="0" y="0" width="96" height="114" rx="8" fill="#FFFFFF" stroke={INK} strokeWidth="2.4" />
            <text x="42" y="18" textAnchor="middle" fontSize="8.5" fontWeight="900" fill="#2563EB">십</text>
            <text x="66" y="18" textAnchor="middle" fontSize="8.5" fontWeight="900" fill="#DC2626">일</text>
            <text x="74" y="42" textAnchor="end" fontSize="20" fontWeight="900" fill={INK}>6 9</text>
            <text x="22" y="66" textAnchor="middle" fontSize="16" fontWeight="900" fill={INK}>-</text>
            <text x="74" y="66" textAnchor="end" fontSize="20" fontWeight="900" fill={INK}>2 4</text>
            <line x1="16" y1="74" x2="82" y2="74" stroke={INK} strokeWidth="2.4" />
            <text x="74" y="99" textAnchor="end" fontSize="21" fontWeight="900" fill="#059669">4 5</text>
          </g>

          <g transform="translate(128, 52)">
            <rect x="0" y="0" width="96" height="48" rx="6" fill="#FEE2E2" stroke="#EF4444" strokeWidth="1.8" />
            <text x="48" y="18" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#DC2626">① 일의 자리 먼저</text>
            <text x="48" y="38" textAnchor="middle" fontSize="14" fontWeight="900" fill={INK}>9 - 4 = 5</text>

            <rect x="0" y="56" width="96" height="48" rx="6" fill="#DBEAFE" stroke="#2563EB" strokeWidth="1.8" />
            <text x="48" y="74" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#1D4ED8">② 십의 자리 다음</text>
            <text x="48" y="94" textAnchor="middle" fontSize="14" fontWeight="900" fill={INK}>6 - 2 = 4</text>
          </g>

          <Stickman x={54} y={196} scale={0.74} pose="happy" armR={[18, -4]} />
          <SpeechBubble x={92} y={174} w={134} h={42} tailX={74} tailY={190}>
            <text x="159" y="192" textAnchor="middle" fontSize="10" fontWeight="900" fill={INK}>
              일의 자리 9-4=5 쓰고
            </text>
            <text x="159" y="207" textAnchor="middle" fontSize="10" fontWeight="900" fill="#059669">
              십의 자리 6-2=4 → 45!
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 13. 0 함정! 46 - 42 = 4 & 46 - 40 = 6 */
    case 'addsub1_zero_remain_trap':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#FEF2F2')} />
          <rect x="14" y="10" width="212" height="28" rx="6" fill="#FEE2E2" stroke={INK} strokeWidth="2" />
          <text x="120" y="29" textAnchor="middle" fontSize="11.5" fontWeight="900" fill="#B91C1C">
            맨 앞자리가 0이 되면 0은 안 써!!
          </text>

          <g transform="translate(14, 46)">
            <rect x="0" y="0" width="102" height="114" rx="8" fill="#FFFFFF" stroke="#EF4444" strokeWidth="2.2" />
            <text x="51" y="18" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#DC2626">46 - 42 세로셈</text>
            <text x="70" y="42" textAnchor="end" fontSize="17" fontWeight="900" fill={INK}>4 6</text>
            <text x="24" y="61" textAnchor="middle" fontSize="14" fontWeight="900" fill={INK}>-</text>
            <text x="70" y="61" textAnchor="end" fontSize="17" fontWeight="900" fill={INK}>4 2</text>
            <line x1="16" y1="68" x2="82" y2="68" stroke={INK} strokeWidth="2" />
            <text x="48" y="90" textAnchor="end" fontSize="16" fontWeight="900" fill="#94A3B8">0</text>
            <line x1="36" y1="88" x2="50" y2="76" stroke="#EF4444" strokeWidth="2" />
            <text x="70" y="90" textAnchor="end" fontSize="18" fontWeight="900" fill="#15803D">4</text>
            <text x="51" y="108" textAnchor="middle" fontSize="8.5" fontWeight="900" fill="#15803D">04 땡! 그냥 4 ◎</text>
          </g>

          <g transform="translate(124, 46)">
            <rect x="0" y="0" width="102" height="114" rx="8" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2.2" />
            <text x="51" y="18" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#2563EB">46 - 40 세로셈</text>
            <text x="70" y="42" textAnchor="end" fontSize="17" fontWeight="900" fill={INK}>4 6</text>
            <text x="24" y="61" textAnchor="middle" fontSize="14" fontWeight="900" fill={INK}>-</text>
            <text x="70" y="61" textAnchor="end" fontSize="17" fontWeight="900" fill={INK}>4 0</text>
            <line x1="16" y1="68" x2="82" y2="68" stroke={INK} strokeWidth="2" />
            <text x="70" y="90" textAnchor="end" fontSize="18" fontWeight="900" fill="#2563EB">6</text>
            <text x="51" y="108" textAnchor="middle" fontSize="8.5" fontWeight="900" fill="#1D4ED8">6-0 = 6 그대로!</text>
          </g>

          <Stickman x={50} y={196} scale={0.76} pose="panic" armR={[18, -6]} sweat />
          <SpeechBubble x={86} y={172} w={140} h={46} tailX={68} tailY={188}>
            <text x="156" y="191" textAnchor="middle" fontSize="9.5" fontWeight="900" fill={INK}>
              앞자리 4-4=0은 투명인간!
            </text>
            <text x="156" y="207" textAnchor="middle" fontSize="10" fontWeight="900" fill="#DC2626">
              04 말고 4라고 써야 정답!!
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 14. 받아올림 없는 세 수의 덧셈·뺄셈 */
    case 'addsub1_three_nums_no_carry':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#ECFDF5')} />
          <rect x="14" y="12" width="212" height="28" rx="6" fill="#D1FAE5" stroke={INK} strokeWidth="2" />
          <text x="120" y="31" textAnchor="middle" fontSize="12" fontWeight="900" fill="#065F46">
            세 수의 계산은 앞에서부터 차례대로!
          </text>

          <g transform="translate(16, 48)">
            <rect x="0" y="0" width="208" height="52" rx="8" fill="#FFFFFF" stroke="#059669" strokeWidth="2" />
            <text x="20" y="24" fontSize="15" fontWeight="900" fill={INK}>
              <tspan fill="#2563EB">12 + 23</tspan> + 14 = <tspan fill="#059669">49</tspan>
            </text>
            <text x="20" y="43" fontSize="10" fontWeight="900" fill="#2563EB">
              ① 12+23 = 35  →  ② 35+14 = 49!
            </text>
          </g>

          <g transform="translate(16, 108)">
            <rect x="0" y="0" width="208" height="52" rx="8" fill="#FFFFFF" stroke="#DC2626" strokeWidth="2" />
            <text x="20" y="24" fontSize="15" fontWeight="900" fill={INK}>
              <tspan fill="#DC2626">58 - 12</tspan> - 24 = <tspan fill="#15803D">22</tspan>
            </text>
            <text x="20" y="43" fontSize="10" fontWeight="900" fill="#DC2626">
              ① 58-12 = 46  →  ② 46-24 = 22!
            </text>
          </g>

          <Stickman x={54} y={196} scale={0.76} pose="sunglasses" armR={[18, -4]} />
          <SpeechBubble x={92} y={174} w={134} h={42} tailX={74} tailY={190}>
            <text x="159" y="192" textAnchor="middle" fontSize="10" fontWeight="900" fill={INK}>
              앞의 두 수 먼저 구해서
            </text>
            <text x="159" y="207" textAnchor="middle" fontSize="10" fontWeight="900" fill="#059669">
              밑에 적고 세 번째 수 계산!
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 15. 덧셈과 뺄셈의 가족 관계 (□ 찾기) */
    case 'addsub1_fact_family':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#F5F3FF')} />
          <rect x="14" y="10" width="212" height="28" rx="6" fill="#EDE9FE" stroke={INK} strokeWidth="2" />
          <text x="120" y="29" textAnchor="middle" fontSize="11.5" fontWeight="900" fill="#5B21B6">
            덧셈·뺄셈 가족 삼각형! (빈칸 □ 1초 컷)
          </text>

          {/* 가족 삼각형 */}
          <g transform="translate(18, 46)">
            <rect x="0" y="0" width="96" height="114" rx="8" fill="#FFFFFF" stroke="#7C3AED" strokeWidth="2" />
            <polygon points="48,14 14,76 82,76" fill="#F5F3FF" stroke="#7C3AED" strokeWidth="2" />
            <text x="48" y="38" textAnchor="middle" fontSize="13" fontWeight="900" fill="#DC2626">38</text>
            <text x="28" y="70" textAnchor="middle" fontSize="12" fontWeight="900" fill="#2563EB">23</text>
            <text x="68" y="70" textAnchor="middle" fontSize="12" fontWeight="900" fill="#059669">15</text>
            <text x="48" y="94" textAnchor="middle" fontSize="9" fontWeight="900" fill={INK}>23+15=38</text>
            <text x="48" y="107" textAnchor="middle" fontSize="9" fontWeight="900" fill="#7C3AED">38-15=23</text>
          </g>

          {/* □ 찾기 예제 */}
          <g transform="translate(124, 46)">
            <rect x="0" y="0" width="102" height="114" rx="8" fill="#FFFFFF" stroke={INK} strokeWidth="2" />
            <text x="51" y="20" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#5B21B6">□ 거꾸로 찾기!</text>
            <text x="51" y="48" textAnchor="middle" fontSize="14.5" fontWeight="900" fill={INK}>24 + □ = 59</text>
            <path d="M 51 56 L 51 68" stroke="#7C3AED" strokeWidth="2.4" />
            <polygon points="46,66 56,66 51,73" fill="#7C3AED" />
            <text x="51" y="90" textAnchor="middle" fontSize="12.5" fontWeight="900" fill="#15803D">59 - 24 = 35</text>
            <text x="51" y="107" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#7C3AED">□ = 35 ◎</text>
          </g>

          <Stickman x={50} y={198} scale={0.74} pose="headband" armR={[18, -4]} />
          <SpeechBubble x={86} y={174} w={140} h={44} tailX={68} tailY={190}>
            <text x="156" y="193" textAnchor="middle" fontSize="9.5" fontWeight="900" fill={INK}>
              더해서 큰 수(59)가 됐다면
            </text>
            <text x="156" y="208" textAnchor="middle" fontSize="10" fontWeight="900" fill="#7C3AED">
              큰 수에서 빼면 □ 바로 나와!
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 16. 최종 보스! 덧셈·뺄셈(1) 3관문 */
    case 'addsub1_boss':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#1E1B4B')} />
          <rect x="14" y="10" width="212" height="28" rx="6" fill="#EF4444" stroke="#FEF08A" strokeWidth="2" />
          <text x="120" y="29" textAnchor="middle" fontSize="12" fontWeight="900" fill="#FFFFFF">
            BOSS! 1-2 덧셈·뺄셈(1) 3관문
          </text>

          <g transform="translate(18, 46)">
            <rect x="0" y="0" width="204" height="32" rx="6" fill="#FFFFFF" stroke="#FACC15" strokeWidth="2" />
            <text x="14" y="21" fontSize="10.5" fontWeight="900" fill="#DC2626">①</text>
            <text x="32" y="21" fontSize="12.5" fontWeight="900" fill={INK}>34 + 5 = ?</text>
            <text x="194" y="21" textAnchor="end" fontSize="9.5" fontWeight="800" fill="#64748B">(자리 맞춤!)</text>

            <rect x="0" y="39" width="204" height="32" rx="6" fill="#FFFFFF" stroke="#FACC15" strokeWidth="2" />
            <text x="14" y="60" fontSize="10.5" fontWeight="900" fill="#2563EB">②</text>
            <text x="32" y="60" fontSize="12.5" fontWeight="900" fill={INK}>68 - 23 = ?</text>
            <text x="194" y="60" textAnchor="end" fontSize="9.5" fontWeight="800" fill="#64748B">(끼리끼리)</text>

            <rect x="0" y="78" width="204" height="32" rx="6" fill="#FFFFFF" stroke="#FACC15" strokeWidth="2" />
            <text x="14" y="99" fontSize="10.5" fontWeight="900" fill="#7C3AED">③</text>
            <text x="32" y="99" fontSize="12.5" fontWeight="900" fill={INK}>□ + 14 = 47, □ = ?</text>
            <text x="194" y="99" textAnchor="end" fontSize="9.5" fontWeight="800" fill="#64748B">(거꾸로!)</text>
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

    /* 17. 1-2 덧셈·뺄셈(1) 완주 축하 포카! */
    case 'addsub1_praise':
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
            ★ 덧셈·뺄셈(1) 완주 축하!! ★
          </text>
          <text x="120" y="55" textAnchor="middle" fontSize="10" fontWeight="900" fill="#92400E">
            18장 올 클리어 · 1학년 계산 마스터!
          </text>

          <g transform="translate(120, 96)">
            <ellipse cx="0" cy="0" rx="58" ry="20" fill="#FFFFFF" stroke={INK} strokeWidth="2.4" />
            <text x="0" y="5" textAnchor="middle" fontSize="12.5" fontWeight="900" fill="#2563EB">
              24+13 · 69-24 · □찾기 ✓
            </text>
          </g>

          <Stickman x={120} y={164} scale={0.95} pose="hero" armL={[-20, 4]} armR={[20, 4]} />
          <text x="120" y="222" textAnchor="middle" fontSize="10.5" fontWeight="900" fill="#B45309">
            공식 1학년 두 자리 계산 챔피언 인증!
          </text>
        </svg>
      );
  }
};
