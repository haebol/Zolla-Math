import React from 'react';
import { EpisodeSceneType, PrintInkMode } from '../types/card';

interface Length3ComicSceneProps {
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

const RulerStrip: React.FC<{
  x: number;
  y: number;
  startCm: number;
  cmCount: number;
  pxPerCm: number;
  showMm?: boolean;
}> = ({ x, y, startCm, cmCount, pxPerCm, showMm = true }) => {
  const w = cmCount * pxPerCm;
  return (
    <g>
      <rect x={x} y={y} width={w} height={34} rx="2" fill="#FEF9C3" stroke={INK} strokeWidth="2" />
      {Array.from({ length: cmCount * 10 + 1 }, (_, idx) => {
        const tx = x + (idx / 10) * pxPerCm;
        const isCm = idx % 10 === 0;
        const isHalf = idx % 5 === 0 && !isCm;
        const tickH = isCm ? 14 : isHalf ? 10 : 6;
        if (!showMm && !isCm) return null;
        return (
          <g key={idx}>
            <line
              x1={tx}
              y1={y}
              x2={tx}
              y2={y + tickH}
              stroke={isCm ? INK : '#64748B'}
              strokeWidth={isCm ? '1.6' : '0.9'}
            />
            {isCm && (
              <text
                x={tx}
                y={y + 27}
                textAnchor="middle"
                fontSize="8.5"
                fontWeight="900"
                fill={INK}
              >
                {startCm + idx / 10}
              </text>
            )}
          </g>
        );
      })}
    </g>
  );
};

export const Length3ComicScene: React.FC<Length3ComicSceneProps> = ({
  sceneType,
  inkMode = 'full',
}) => {
  const isInkSaving = inkMode !== 'full';
  const softBg = (fullColor: string) => (isInkSaving ? '#FFFFFF' : fullColor);

  switch (sceneType) {
    /* 00. 3-1 길이 도감 설명서 */
    case 'len3_guide':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#F0F9FF')} />
          <rect x="12" y="10" width="216" height="44" rx="8" fill="#FEF08A" stroke={INK} strokeWidth="2.5" />
          <text x="120" y="29" textAnchor="middle" fontSize="13.5" fontWeight="900" fill={INK}>
            3-1 길이 도감 18장 맵!
          </text>
          <text x="120" y="46" textAnchor="middle" fontSize="9.2" fontWeight="800" fill="#B45309">
            mm · cm · m · km 단위 계단 &amp; 덧뺄셈!
          </text>

          <g transform="translate(14, 62)">
            <rect x="0" y="0" width="102" height="58" rx="6" fill="#FFFFFF" stroke={INK} strokeWidth="2" />
            <text x="51" y="21" textAnchor="middle" fontSize="9.8" fontWeight="900" fill="#2563EB">단위 계단</text>
            <text x="51" y="37" textAnchor="middle" fontSize="8.6" fontWeight="800" fill={INK}>1 cm = 10 mm</text>
            <text x="51" y="50" textAnchor="middle" fontSize="8.6" fontWeight="900" fill="#DC2626">1 km = 1000 m</text>
          </g>

          <g transform="translate(124, 62)">
            <rect x="0" y="0" width="102" height="58" rx="6" fill="#ECFDF5" stroke={INK} strokeWidth="2" />
            <text x="51" y="21" textAnchor="middle" fontSize="9.8" fontWeight="900" fill="#047857">접두사 비밀!</text>
            <text x="51" y="37" textAnchor="middle" fontSize="8.6" fontWeight="900" fill="#7C3AED">k = 1000배</text>
            <text x="51" y="50" textAnchor="middle" fontSize="8.6" fontWeight="900" fill="#047857">m = 1/1000</text>
          </g>

          <rect x="14" y="130" width="144" height="44" rx="7" fill="#FFFFFF" stroke={INK} strokeWidth="2" />
          <text x="86" y="149" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#7C3AED">
            부러진 자 · 3050m 0 함정!
          </text>
          <text x="86" y="164" textAnchor="middle" fontSize="9" fontWeight="800" fill={INK}>
            10·1000 받아올림·내림 완전 정복!
          </text>

          <Stickman x={196} y={150} scale={0.76} pose="hero" armL={[-16, 12]} armR={[16, 6]} />
          <text x="120" y="212" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#334155">
            ★ 길이·들이·무게 단위 연결 출발! ★
          </text>
        </svg>
      );

    /* 01. [선수학습] 0 눈금부터 재기 & 1 m = 100 cm */
    case 'len3_prereq_cm':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#EFF6FF')} />
          <rect x="14" y="12" width="212" height="28" rx="6" fill="#DBEAFE" stroke="#2563EB" strokeWidth="2" />
          <text x="120" y="30" textAnchor="middle" fontSize="10.8" fontWeight="900" fill="#1E3A8A">
            자로 잴 땐 0부터! 1 m = 100 cm!
          </text>

          <rect x="30" y="54" width="108" height="16" rx="3" fill="#F87171" stroke={INK} strokeWidth="2" />
          <text x="84" y="65" textAnchor="middle" fontSize="8.8" fontWeight="900" fill="#FFFFFF">연필 3 cm</text>
          <RulerStrip x={22} y={76} startCm={0} cmCount={5} pxPerCm={36} showMm={false} />
          <circle cx={30} cy={76} r="4.5" fill="none" stroke="#DC2626" strokeWidth="2" />

          <rect x="16" y="122" width="208" height="26" rx="6" fill="#FFFFFF" stroke="#059669" strokeWidth="2" />
          <text x="120" y="139" textAnchor="middle" fontSize="10.2" fontWeight="900" fill="#047857">
            c(센티) = 1/100 → 1 m = 100 cm!
          </text>

          <Stickman x={44} y={170} scale={0.7} pose="sunglasses" armL={[-12, 16]} armR={[16, 4]} />
          <SpeechBubble x={76} y={162} w={152} h={48} tailX={62} tailY={176}>
            <text x="152" y="182" textAnchor="middle" fontSize="9.2" fontWeight="900" fill={INK}>
              끝을 꼭 ‘0 눈금’에 맞추고,
            </text>
            <text x="152" y="199" textAnchor="middle" fontSize="9.2" fontWeight="900" fill="#2563EB">
              100 cm 모이면 1 m 되는 건 기본!
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 02. [선수학습] 왜 뼘 말고 cm·m 표준 단위를 쓸까? */
    case 'len3_prereq_unit_why':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#F0FDF4')} />
          <rect x="14" y="12" width="100" height="84" rx="8" fill="#FEF2F2" stroke="#DC2626" strokeWidth="2" />
          <text x="64" y="32" textAnchor="middle" fontSize="9.8" fontWeight="900" fill="#DC2626">아빠 뼘 = 5뼘</text>
          <text x="64" y="54" textAnchor="middle" fontSize="9.8" fontWeight="900" fill="#2563EB">내 뼘 = 8뼘</text>
          <text x="64" y="78" textAnchor="middle" fontSize="8.8" fontWeight="800" fill="#991B1B">서로 달라 불편!</text>

          <rect x="126" y="12" width="100" height="84" rx="8" fill="#ECFDF5" stroke="#059669" strokeWidth="2.4" />
          <text x="176" y="34" textAnchor="middle" fontSize="9.8" fontWeight="900" fill="#047857">약속 단위 (자)</text>
          <text x="176" y="58" textAnchor="middle" fontSize="13.5" fontWeight="900" fill="#0F172A">딱 1 m!</text>
          <text x="176" y="78" textAnchor="middle" fontSize="8.8" fontWeight="800" fill="#065F46">누가 재도 같아!</text>

          <rect x="14" y="106" width="212" height="34" rx="7" fill="#FFFFFF" stroke={INK} strokeWidth="2" />
          <text x="120" y="127" textAnchor="middle" fontSize="9.8" fontWeight="900" fill="#2563EB">
            그래서 mm · cm · m · km 약속이 탄생!
          </text>

          <Stickman x={44} y={168} scale={0.72} pose="happy" armL={[-12, 16]} armR={[16, 4]} />
          <SpeechBubble x={76} y={162} w={152} h={48} tailX={62} tailY={176}>
            <text x="152" y="182" textAnchor="middle" fontSize="9.2" fontWeight="900" fill={INK}>
              같은 크기의 표준 단위를 써야
            </text>
            <text x="152" y="199" textAnchor="middle" fontSize="9.2" fontWeight="900" fill="#047857">
              전 세계 친구랑 길이를 비교해!
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 03. 새 단위 ① 1 cm = 10 mm (밀리미터) */
    case 'len3_1mm_1cm':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#FFFBEB')} />
          <rect x="14" y="12" width="212" height="34" rx="8" fill="#FEF08A" stroke={INK} strokeWidth="2.4" />
          <text x="120" y="34" textAnchor="middle" fontSize="14.5" fontWeight="900" fill="#DC2626">
            1 cm = 10 mm (밀리미터)!
          </text>

          <RulerStrip x={20} y={62} startCm={0} cmCount={2} pxPerCm={100} showMm />
          {/* Zoom bracket for 1 small tick */}
          <line x1="20" y1="54" x2="30" y2="54" stroke="#DC2626" strokeWidth="2.4" />
          <text x="58" y="56" fontSize="9" fontWeight="900" fill="#DC2626">작은 1칸 = 1 mm!</text>

          <rect x="14" y="108" width="212" height="34" rx="7" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2" />
          <text x="120" y="129" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#1E3A8A">
            동전 두께 · 샤프심 · 무당벌레 = mm!
          </text>

          <Stickman x={44} y={168} scale={0.72} pose="sunglasses" armL={[-12, 16]} armR={[16, 4]} />
          <SpeechBubble x={76} y={162} w={152} h={48} tailX={62} tailY={176}>
            <text x="152" y="182" textAnchor="middle" fontSize="9.2" fontWeight="900" fill={INK}>
              1 cm를 열 칸으로 쪼갠
            </text>
            <text x="152" y="199" textAnchor="middle" fontSize="9.2" fontWeight="900" fill="#DC2626">
              아주 작은 한 칸이 1 mm야!
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 04. 자 눈금 읽기 — □ cm □ mm = □□ mm */
    case 'len3_read_cm_mm':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#EFF6FF')} />
          {/* Pencil bar from 0 to 3.4 cm */}
          <rect x="20" y="24" width="153" height="18" rx="3" fill="#34D399" stroke={INK} strokeWidth="2" />
          <polygon points="173,24 185,33 173,42" fill="#FDE68A" stroke={INK} strokeWidth="1.6" />
          <line x1="173" y1="20" x2="173" y2="96" stroke="#DC2626" strokeWidth="1.8" strokeDasharray="3 2" />

          <RulerStrip x={20} y={52} startCm={0} cmCount={4} pxPerCm={45} showMm />

          <rect x="16" y="102" width="208" height="44" rx="8" fill="#FFFFFF" stroke={INK} strokeWidth="2.2" />
          <text x="120" y="121" textAnchor="middle" fontSize="11.5" fontWeight="900" fill="#2563EB">
            3 cm + 4 mm = 3 cm 4 mm!
          </text>
          <text x="120" y="138" textAnchor="middle" fontSize="10.5" fontWeight="900" fill="#DC2626">
            30 mm + 4 mm = 34 mm!
          </text>

          <Stickman x={44} y={170} scale={0.7} pose="happy" armL={[-12, 16]} armR={[16, 4]} />
          <SpeechBubble x={76} y={162} w={152} h={48} tailX={62} tailY={176}>
            <text x="152" y="182" textAnchor="middle" fontSize="9.2" fontWeight="900" fill={INK}>
              큰 숫자 3과 작은 눈금 4칸!
            </text>
            <text x="152" y="199" textAnchor="middle" fontSize="9.2" fontWeight="900" fill="#2563EB">
              3 cm 4 mm = 34 mm 바로 변신!
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 05. [단위 비밀] 밀리(m) = 1000분의 1 → 1 m = 1000 mm */
    case 'len3_1m_1000mm':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#FFFBEB')} />
          <rect x="14" y="12" width="212" height="32" rx="7" fill="#FEF08A" stroke={INK} strokeWidth="2.2" />
          <text x="120" y="33" textAnchor="middle" fontSize="11.5" fontWeight="900" fill="#B45309">
            단위 연결 비밀! m(밀리) = 1/1000!
          </text>

          <rect x="14" y="54" width="212" height="44" rx="8" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2" />
          <text x="120" y="73" textAnchor="middle" fontSize="11" fontWeight="900" fill={INK}>
            1 m = 100 cm = 100 × 10 mm
          </text>
          <text x="120" y="91" textAnchor="middle" fontSize="12" fontWeight="900" fill="#2563EB">
            1 m = 1000 mm!
          </text>

          <rect x="14" y="106" width="212" height="36" rx="8" fill="#ECFDF5" stroke="#059669" strokeWidth="2" />
          <text x="120" y="128" textAnchor="middle" fontSize="10.2" fontWeight="900" fill="#047857">
            3-2 들이 1 L = 1000 mL 랑 똑같은 ‘m’!
          </text>

          <Stickman x={44} y={168} scale={0.72} pose="hero" armL={[-12, 16]} armR={[16, 4]} />
          <SpeechBubble x={76} y={162} w={152} h={48} tailX={62} tailY={176}>
            <text x="152" y="182" textAnchor="middle" fontSize="9.2" fontWeight="900" fill={INK}>
              앞에 m(밀리)가 붙으면
            </text>
            <text x="152" y="199" textAnchor="middle" fontSize="9.2" fontWeight="900" fill="#047857">
              원래 단위의 1000분의 1이야!
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 06. 새 단위 ② 1 km = 1000 m (킬로미터) */
    case 'len3_1km_1000m':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#FEFCE8')} />
          <rect x="14" y="12" width="212" height="36" rx="8" fill="#DBEAFE" stroke={INK} strokeWidth="2.4" />
          <text x="120" y="35" textAnchor="middle" fontSize="14.5" fontWeight="900" fill="#1E3A8A">
            1 km = 1000 m (킬로미터)!
          </text>

          <rect x="14" y="58" width="212" height="44" rx="8" fill="#FFFFFF" stroke={INK} strokeWidth="2" />
          <text x="48" y="84" textAnchor="middle" fontSize="11" fontWeight="900" fill="#2563EB">집</text>
          <line x1="66" y1="80" x2="170" y2="80" stroke="#DC2626" strokeWidth="2.6" strokeDasharray="5 3" />
          <text x="118" y="73" textAnchor="middle" fontSize="10" fontWeight="900" fill="#DC2626">1 km = 1000 m</text>
          <text x="192" y="84" textAnchor="middle" fontSize="11" fontWeight="900" fill="#047857">학교</text>

          <rect x="14" y="110" width="212" height="34" rx="7" fill="#ECFDF5" stroke="#059669" strokeWidth="2" />
          <text x="120" y="131" textAnchor="middle" fontSize="10" fontWeight="900" fill="#047857">
            k(킬로) = 1000배! (1 kg = 1000 g 짝꿍!)
          </text>

          <Stickman x={44} y={170} scale={0.7} pose="sunglasses" armL={[-12, 16]} armR={[16, 4]} />
          <SpeechBubble x={76} y={162} w={152} h={48} tailX={62} tailY={176}>
            <text x="152" y="182" textAnchor="middle" fontSize="9.2" fontWeight="900" fill={INK}>
              앞에 k(킬로)가 붙으면 무조건 1000배!
            </text>
            <text x="152" y="199" textAnchor="middle" fontSize="9.2" fontWeight="900" fill="#2563EB">
              1 km = 1000 m, 1 kg = 1000 g!
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 07. [단위 통합] mm → cm → m → km 10·100·1000 계단 */
    case 'len3_unit_ladder':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#F5F3FF')} />
          <text x="120" y="24" textAnchor="middle" fontSize="11.5" fontWeight="900" fill="#6D28D9">
            길이 단위 4형제 계단 한 방 정리!
          </text>

          {/* 4 stepped boxes */}
          <rect x="14" y="34" width="52" height="30" rx="6" fill="#DBEAFE" stroke={INK} strokeWidth="2" />
          <text x="40" y="53" textAnchor="middle" fontSize="11.5" fontWeight="900" fill="#1E3A8A">km</text>

          <rect x="70" y="54" width="52" height="30" rx="6" fill="#D1FAE5" stroke={INK} strokeWidth="2" />
          <text x="96" y="73" textAnchor="middle" fontSize="11.5" fontWeight="900" fill="#065F46">m</text>

          <rect x="126" y="74" width="52" height="30" rx="6" fill="#FEF08A" stroke={INK} strokeWidth="2" />
          <text x="152" y="93" textAnchor="middle" fontSize="11.5" fontWeight="900" fill="#B45309">cm</text>

          <rect x="182" y="94" width="46" height="30" rx="6" fill="#FEE2E2" stroke={INK} strokeWidth="2" />
          <text x="205" y="113" textAnchor="middle" fontSize="11.5" fontWeight="900" fill="#DC2626">mm</text>

          <text x="68" y="47" textAnchor="middle" fontSize="8.5" fontWeight="900" fill="#DC2626">×1000</text>
          <text x="126" y="67" textAnchor="middle" fontSize="8.5" fontWeight="900" fill="#DC2626">×100</text>
          <text x="182" y="87" textAnchor="middle" fontSize="8.5" fontWeight="900" fill="#DC2626">×10</text>

          <rect x="14" y="132" width="212" height="26" rx="6" fill="#FFFFFF" stroke="#7C3AED" strokeWidth="1.8" />
          <text x="120" y="149" textAnchor="middle" fontSize="9" fontWeight="900" fill="#5B21B6">
            작은 단위→0 붙이기! / 큰 단위→0 떼기!
          </text>

          <Stickman x={44} y={176} scale={0.68} pose="hero" armL={[-12, 16]} armR={[16, 4]} />
          <SpeechBubble x={76} y={166} w={152} h={46} tailX={62} tailY={180}>
            <text x="152" y="185" textAnchor="middle" fontSize="9.2" fontWeight="900" fill={INK}>
              1000 · 100 · 10 계단만 외우면
            </text>
            <text x="152" y="201" textAnchor="middle" fontSize="9.2" fontWeight="900" fill="#7C3AED">
              들이·무게 단위까지 한 번에 연결!
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 08. 실생활 알맞은 길이 단위 고르기 */
    case 'len3_real_life_pick':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#ECFDF5')} />
          <rect x="14" y="12" width="100" height="62" rx="8" fill="#FFFFFF" stroke={INK} strokeWidth="2" />
          <text x="64" y="34" textAnchor="middle" fontSize="10" fontWeight="900" fill="#DC2626">무당벌레 · 동전</text>
          <text x="64" y="56" textAnchor="middle" fontSize="12" fontWeight="900" fill={INK}>5 mm</text>

          <rect x="126" y="12" width="100" height="62" rx="8" fill="#FFFFFF" stroke={INK} strokeWidth="2" />
          <text x="176" y="34" textAnchor="middle" fontSize="10" fontWeight="900" fill="#D97706">연필 · 필통</text>
          <text x="176" y="56" textAnchor="middle" fontSize="12" fontWeight="900" fill={INK}>15 cm</text>

          <rect x="14" y="82" width="100" height="62" rx="8" fill="#FFFFFF" stroke={INK} strokeWidth="2" />
          <text x="64" y="104" textAnchor="middle" fontSize="10" fontWeight="900" fill="#047857">교실 문 · 키</text>
          <text x="64" y="126" textAnchor="middle" fontSize="12" fontWeight="900" fill={INK}>2 m</text>

          <rect x="126" y="82" width="100" height="62" rx="8" fill="#FFFFFF" stroke={INK} strokeWidth="2" />
          <text x="176" y="104" textAnchor="middle" fontSize="10" fontWeight="900" fill="#2563EB">서울 ~ 부산</text>
          <text x="176" y="126" textAnchor="middle" fontSize="12" fontWeight="900" fill={INK}>400 km</text>

          <Stickman x={44} y={170} scale={0.7} pose="happy" armL={[-12, 16]} armR={[16, 4]} />
          <SpeechBubble x={76} y={162} w={152} h={48} tailX={62} tailY={176}>
            <text x="152" y="182" textAnchor="middle" fontSize="9.2" fontWeight="900" fill={INK}>
              물건 크기 + 숫자 크기를 함께 보고
            </text>
            <text x="152" y="199" textAnchor="middle" fontSize="9.2" fontWeight="900" fill="#047857">
              딱 맞는 짝꿍 단위를 골라내!
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 09. [함정] 부러진 자 2 cm에서 시작했으면? 끝 − 시작! */
    case 'len3_ruler_start_trap':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#FFF7ED')} />
          {/* Broken ruler starting at 2 */}
          <rect x="64" y="20" width="144" height="16" rx="3" fill="#60A5FA" stroke={INK} strokeWidth="2" />
          <text x="136" y="32" textAnchor="middle" fontSize="8.8" fontWeight="900" fill="#FFFFFF">크레파스 (?)</text>
          <RulerStrip x={18} y={44} startCm={2} cmCount={6} pxPerCm={28} showMm={false} />
          {/* Jagged left break mark */}
          <polygon points="18,44 12,52 18,60 12,68 18,78" fill="#FCA5A5" stroke="#DC2626" strokeWidth="1.5" />

          <rect x="14" y="92" width="100" height="52" rx="7" fill="#FEF2F2" stroke="#DC2626" strokeWidth="2" />
          <text x="64" y="112" textAnchor="middle" fontSize="10.5" fontWeight="900" fill="#DC2626">7 cm? 땡!!</text>
          <line x1="30" y1="108" x2="70" y2="108" stroke="#DC2626" strokeWidth="2" />
          <text x="64" y="132" textAnchor="middle" fontSize="8.5" fontWeight="800" fill="#991B1B">0이 아니라 2 시작!</text>

          <rect x="126" y="92" width="100" height="52" rx="7" fill="#ECFDF5" stroke="#059669" strokeWidth="2.4" />
          <text x="176" y="112" textAnchor="middle" fontSize="10.5" fontWeight="900" fill="#047857">7 − 2 = 5 cm!</text>
          <text x="176" y="132" textAnchor="middle" fontSize="8.8" fontWeight="900" fill="#065F46">끝 눈금 − 시작 눈금!</text>

          <Stickman x={44} y={170} scale={0.7} pose="panic" sweat armL={[-12, 16]} armR={[16, 4]} />
          <SpeechBubble x={76} y={162} w={152} h={48} tailX={62} tailY={176}>
            <text x="152" y="182" textAnchor="middle" fontSize="9.2" fontWeight="900" fill="#DC2626">
              0부터 안 쟀으면 무조건 빼기!
            </text>
            <text x="152" y="199" textAnchor="middle" fontSize="9.2" fontWeight="900" fill={INK}>
              끝 숫자에서 시작 숫자를 빼야 정답!
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 10. [오답 1위] 3 km 50 m = 350 m? 땡! 3050 m! */
    case 'len3_zero_padding_trap':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#FFF7ED')} />
          <rect x="14" y="14" width="100" height="114" rx="8" fill="#FEF2F2" stroke="#DC2626" strokeWidth="2.2" />
          <text x="64" y="34" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#DC2626">가짜 합체 땡!</text>
          <text x="64" y="58" textAnchor="middle" fontSize="11" fontWeight="900" fill={INK}>3 km 50 m</text>
          <text x="64" y="84" textAnchor="middle" fontSize="13.5" fontWeight="900" fill="#DC2626">= 350 m?</text>
          <line x1="28" y1="79" x2="100" y2="79" stroke="#DC2626" strokeWidth="2.4" />
          <text x="64" y="110" textAnchor="middle" fontSize="8.5" fontWeight="800" fill="#991B1B">백의 자리 0 실종!</text>

          <rect x="126" y="14" width="100" height="114" rx="8" fill="#ECFDF5" stroke="#059669" strokeWidth="2.4" />
          <text x="176" y="34" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#047857">빈자리 0 채움!</text>
          <text x="176" y="58" textAnchor="middle" fontSize="10.5" fontWeight="900" fill={INK}>3000 m + 50 m</text>
          <text x="176" y="84" textAnchor="middle" fontSize="13.5" fontWeight="900" fill="#047857">= 3050 m!</text>
          <text x="176" y="110" textAnchor="middle" fontSize="8.5" fontWeight="800" fill="#065F46">3L 50mL = 3050mL!</text>

          <Stickman x={44} y={168} scale={0.72} pose="crying" armL={[-12, 16]} armR={[16, 4]} />
          <SpeechBubble x={76} y={162} w={152} h={48} tailX={62} tailY={176}>
            <text x="152" y="182" textAnchor="middle" fontSize="9.2" fontWeight="900" fill="#DC2626">
              1000 단위 m 자리는 꼭 3칸!
            </text>
            <text x="152" y="199" textAnchor="middle" fontSize="9.2" fontWeight="900" fill={INK}>
              50 m는 ‘050’으로 써서 3050 m!
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 11. 길이의 덧셈 ① cm와 mm (10 받아올림) */
    case 'len3_add_cm_mm':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#EFF6FF')} />
          <rect x="16" y="12" width="208" height="128" rx="8" fill="#FFFFFF" stroke={INK} strokeWidth="2.4" />
          <text x="120" y="31" textAnchor="middle" fontSize="9.8" fontWeight="900" fill="#2563EB">
            10 mm 차면 1 cm로 받아올림!
          </text>

          <rect x="86" y="38" width="44" height="18" rx="4" fill="#FEF08A" stroke="#DC2626" strokeWidth="1.6" />
          <text x="108" y="50" textAnchor="middle" fontSize="8.8" fontWeight="900" fill="#DC2626">+1 cm</text>
          <path d="M 160 56 Q 144 38 130 46" fill="none" stroke="#DC2626" strokeWidth="2" />

          <text x="124" y="72" textAnchor="middle" fontSize="11.5" fontWeight="900" fill={INK}>
            2 cm   7 mm
          </text>
          <text x="54" y="92" textAnchor="middle" fontSize="12.5" fontWeight="900" fill="#2563EB">+</text>
          <text x="124" y="92" textAnchor="middle" fontSize="11.5" fontWeight="900" fill={INK}>
            1 cm   6 mm
          </text>
          <line x1="44" y1="101" x2="196" y2="101" stroke={INK} strokeWidth="2.2" />
          <text x="124" y="120" textAnchor="middle" fontSize="11.5" fontWeight="900" fill="#047857">
            4 cm   3 mm!
          </text>
          <text x="124" y="134" textAnchor="middle" fontSize="8.5" fontWeight="800" fill="#DC2626">
            (13 mm = 10 mm + 3 mm → 1 cm 올리고 3 mm!)
          </text>

          <Stickman x={44} y={168} scale={0.72} pose="sunglasses" armL={[-12, 16]} armR={[16, 4]} />
          <SpeechBubble x={76} y={164} w={152} h={46} tailX={62} tailY={178}>
            <text x="152" y="183" textAnchor="middle" fontSize="9.2" fontWeight="900" fill={INK}>
              mm 합이 10 이상이면
            </text>
            <text x="152" y="199" textAnchor="middle" fontSize="9.2" fontWeight="900" fill="#2563EB">
              10 mm를 1 cm로 올려주면 끝!
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 12. 길이의 덧셈 ② km와 m (1000 받아올림) */
    case 'len3_add_km_m':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#ECFDF5')} />
          <rect x="16" y="12" width="208" height="128" rx="8" fill="#FFFFFF" stroke={INK} strokeWidth="2.4" />
          <text x="120" y="31" textAnchor="middle" fontSize="9.8" fontWeight="900" fill="#047857">
            1000 m 차면 1 km로 받아올림!
          </text>

          <rect x="82" y="38" width="46" height="18" rx="4" fill="#FEF08A" stroke="#DC2626" strokeWidth="1.6" />
          <text x="105" y="50" textAnchor="middle" fontSize="8.8" fontWeight="900" fill="#DC2626">+1 km</text>
          <path d="M 160 56 Q 144 38 128 46" fill="none" stroke="#DC2626" strokeWidth="2" />

          <text x="126" y="72" textAnchor="middle" fontSize="11.2" fontWeight="900" fill={INK}>
            1 km   700 m
          </text>
          <text x="48" y="92" textAnchor="middle" fontSize="12.5" fontWeight="900" fill="#059669">+</text>
          <text x="126" y="92" textAnchor="middle" fontSize="11.2" fontWeight="900" fill={INK}>
            2 km   500 m
          </text>
          <line x1="40" y1="101" x2="200" y2="101" stroke={INK} strokeWidth="2.2" />
          <text x="126" y="120" textAnchor="middle" fontSize="11.5" fontWeight="900" fill="#047857">
            4 km   200 m!
          </text>
          <text x="124" y="134" textAnchor="middle" fontSize="8.5" fontWeight="800" fill="#DC2626">
            (1200 m = 1000 m + 200 m → 1 km 올리고 200 m!)
          </text>

          <Stickman x={44} y={168} scale={0.72} pose="happy" armL={[-12, 16]} armR={[16, 4]} />
          <SpeechBubble x={76} y={164} w={152} h={46} tailX={62} tailY={178}>
            <text x="152" y="183" textAnchor="middle" fontSize="9.2" fontWeight="900" fill={INK}>
              m 합이 1000 이상이면
            </text>
            <text x="152" y="199" textAnchor="middle" fontSize="9.2" fontWeight="900" fill="#047857">
              1000 m를 1 km로 올려줘!
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 13. 길이의 뺄셈 ① cm와 mm (10 받아내림) */
    case 'len3_sub_cm_mm':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#ECFDF5')} />
          <rect x="16" y="12" width="208" height="128" rx="8" fill="#FFFFFF" stroke={INK} strokeWidth="2.4" />
          <text x="120" y="30" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#047857">
            2 mm에서 7 mm 못 빼! 1 cm(=10 mm) 빌려오기!
          </text>

          <text x="86" y="50" textAnchor="middle" fontSize="10" fontWeight="900" fill="#DC2626">4 cm</text>
          <text x="156" y="50" textAnchor="middle" fontSize="10" fontWeight="900" fill="#047857">10+2=12 mm</text>
          <path d="M 100 46 Q 116 36 128 46" fill="none" stroke="#DC2626" strokeWidth="1.8" />

          <text x="124" y="72" textAnchor="middle" fontSize="11.5" fontWeight="900" fill={INK}>
            5 cm   2 mm
          </text>
          <line x1="78" y1="68" x2="104" y2="68" stroke="#DC2626" strokeWidth="1.8" />
          <line x1="138" y1="68" x2="168" y2="68" stroke="#DC2626" strokeWidth="1.8" />

          <text x="52" y="92" textAnchor="middle" fontSize="12.5" fontWeight="900" fill="#DC2626">−</text>
          <text x="124" y="92" textAnchor="middle" fontSize="11.5" fontWeight="900" fill={INK}>
            1 cm   7 mm
          </text>
          <line x1="42" y1="101" x2="196" y2="101" stroke={INK} strokeWidth="2.2" />
          <text x="124" y="122" textAnchor="middle" fontSize="12" fontWeight="900" fill="#047857">
            3 cm   5 mm!
          </text>

          <Stickman x={44} y={168} scale={0.72} pose="headband" armL={[-12, 16]} armR={[16, 4]} />
          <SpeechBubble x={76} y={164} w={152} h={46} tailX={62} tailY={178}>
            <text x="152" y="183" textAnchor="middle" fontSize="9.2" fontWeight="900" fill={INK}>
              cm에서 1 줄이고 mm엔 +10!
            </text>
            <text x="152" y="199" textAnchor="middle" fontSize="9.2" fontWeight="900" fill="#047857">
              12 mm − 7 mm = 5 mm!
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 14. 길이의 뺄셈 ② km와 m (1000 받아내림) */
    case 'len3_sub_km_m':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#ECFDF5')} />
          <rect x="16" y="12" width="208" height="128" rx="8" fill="#FFFFFF" stroke={INK} strokeWidth="2.4" />
          <text x="120" y="30" textAnchor="middle" fontSize="9.3" fontWeight="900" fill="#047857">
            300 m에서 800 m 못 빼! 1 km(=1000 m) 빌려오기!
          </text>

          <text x="84" y="50" textAnchor="middle" fontSize="10" fontWeight="900" fill="#DC2626">3 km</text>
          <text x="158" y="50" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#047857">1000+300=1300m</text>
          <path d="M 98 46 Q 112 36 122 46" fill="none" stroke="#DC2626" strokeWidth="1.8" />

          <text x="124" y="72" textAnchor="middle" fontSize="11.2" fontWeight="900" fill={INK}>
            4 km   300 m
          </text>
          <line x1="76" y1="68" x2="104" y2="68" stroke="#DC2626" strokeWidth="1.8" />
          <line x1="136" y1="68" x2="172" y2="68" stroke="#DC2626" strokeWidth="1.8" />

          <text x="48" y="92" textAnchor="middle" fontSize="12.5" fontWeight="900" fill="#DC2626">−</text>
          <text x="124" y="92" textAnchor="middle" fontSize="11.2" fontWeight="900" fill={INK}>
            1 km   800 m
          </text>
          <line x1="40" y1="101" x2="198" y2="101" stroke={INK} strokeWidth="2.2" />
          <text x="124" y="122" textAnchor="middle" fontSize="12" fontWeight="900" fill="#047857">
            2 km   500 m!
          </text>

          <Stickman x={44} y={168} scale={0.72} pose="hero" armL={[-12, 16]} armR={[16, 4]} />
          <SpeechBubble x={76} y={164} w={152} h={46} tailX={62} tailY={178}>
            <text x="152" y="183" textAnchor="middle" fontSize="9.2" fontWeight="900" fill={INK}>
              km에서 1 줄이고 m엔 +1000!
            </text>
            <text x="152" y="199" textAnchor="middle" fontSize="9.2" fontWeight="900" fill="#047857">
              1300 m − 800 m = 500 m 컷!
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 15. [단위 연결 함정] +10? +100? +1000? +60? */
    case 'len3_borrow_mix_trap':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#FFF7ED')} />
          <rect x="14" y="10" width="212" height="28" rx="6" fill="#FEF2F2" stroke="#DC2626" strokeWidth="2.2" />
          <text x="120" y="28" textAnchor="middle" fontSize="10.2" fontWeight="900" fill="#DC2626">
            빌려오는 숫자는 단위마다 다르다!!
          </text>

          <rect x="14" y="46" width="102" height="44" rx="6" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2" />
          <text x="65" y="64" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#2563EB">1 cm 빌림</text>
          <text x="65" y="81" textAnchor="middle" fontSize="11" fontWeight="900" fill={INK}>+ 10 mm</text>

          <rect x="124" y="46" width="102" height="44" rx="6" fill="#FFFFFF" stroke="#059669" strokeWidth="2" />
          <text x="175" y="64" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#047857">1 m 빌림</text>
          <text x="175" y="81" textAnchor="middle" fontSize="11" fontWeight="900" fill={INK}>+ 100 cm</text>

          <rect x="14" y="96" width="102" height="44" rx="6" fill="#FFFFFF" stroke="#7C3AED" strokeWidth="2" />
          <text x="65" y="114" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#6D28D9">1 km·L·kg</text>
          <text x="65" y="131" textAnchor="middle" fontSize="11" fontWeight="900" fill={INK}>+ 1000</text>

          <rect x="124" y="96" width="102" height="44" rx="6" fill="#FEF08A" stroke="#DC2626" strokeWidth="2" />
          <text x="175" y="114" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#B45309">1 시간·1 분</text>
          <text x="175" y="131" textAnchor="middle" fontSize="11" fontWeight="900" fill="#DC2626">+ 60</text>

          <Stickman x={44} y={170} scale={0.7} pose="panic" sweat armL={[-12, 16]} armR={[16, 4]} />
          <SpeechBubble x={76} y={162} w={152} h={48} tailX={62} tailY={176}>
            <text x="152" y="182" textAnchor="middle" fontSize="9.2" fontWeight="900" fill="#DC2626">
              무조건 +10, +100 하면 땡!
            </text>
            <text x="152" y="199" textAnchor="middle" fontSize="9.2" fontWeight="900" fill={INK}>
              단위 이름을 꼭 확인하고 빌려와!
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 16. [최종 보스] 크기 비교 & 학교 왕복 거리! */
    case 'len3_boss':
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect width="240" height="230" fill={softBg('#0F172A')} />
          <rect x="12" y="10" width="216" height="28" rx="6" fill="#EF4444" stroke="#FACC15" strokeWidth="2" />
          <text x="120" y="28" textAnchor="middle" fontSize="10.2" fontWeight="900" fill="#FFFFFF">
            BOSS! 0 채우기 비교 &amp; 왕복 거리!
          </text>

          <rect x="14" y="46" width="212" height="46" rx="8" fill="#1E293B" stroke="#FACC15" strokeWidth="2" />
          <text x="120" y="65" textAnchor="middle" fontSize="10.5" fontWeight="900" fill="#FACC15">
            ① 2 km 80 m  vs  2800 m
          </text>
          <text x="120" y="83" textAnchor="middle" fontSize="10.2" fontWeight="900" fill="#4ADE80">
            2080 m &lt; 2800 m (0 주의!)
          </text>

          <rect x="14" y="98" width="212" height="48" rx="8" fill="#1E293B" stroke="#60A5FA" strokeWidth="2" />
          <text x="120" y="117" textAnchor="middle" fontSize="9.8" fontWeight="900" fill="#93C5FD">
            ② 편도 1 km 600 m → 왕복(×2)은?
          </text>
          <text x="120" y="136" textAnchor="middle" fontSize="11" fontWeight="900" fill="#FFFFFF">
            1km 600m + 1km 600m = 3 km 200 m!
          </text>

          <Stickman x={44} y={170} scale={0.7} pose="punch" strokeColor="#FFFFFF" armL={[-12, 16]} armR={[16, 4]} />
          <SpeechBubble x={76} y={162} w={152} h={48} tailX={62} tailY={176}>
            <text x="152" y="182" textAnchor="middle" fontSize="9.2" fontWeight="900" fill="#DC2626">
              0 채우기 + 1000 받아올림!
            </text>
            <text x="152" y="199" textAnchor="middle" fontSize="9.2" fontWeight="900" fill={INK}>
              두 개 합치면 길이 보스 격파!
            </text>
          </SpeechBubble>
        </svg>
      );

    /* 17. 축하해! 3-1 길이 18장 완주 인증! */
    case 'len3_praise':
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
            3-1 길이 18장 올클리어!
          </text>
          <text x="120" y="118" textAnchor="middle" fontSize="9.2" fontWeight="800" fill={INK}>
            mm·cm·m·km 단위 계단 &amp; 덧뺄셈 정복!
          </text>

          <Stickman x={120} y={156} scale={0.85} pose="hero" armL={[-20, 4]} armR={[20, 4]} />
          <text x="120" y="216" textAnchor="middle" fontSize="10" fontWeight="900" fill="#7C3AED">
            ★ 단위 연결 측정 마스터 등극! ★
          </text>
        </svg>
      );
  }
};
