import React from 'react';
import { EpisodeSceneType, PrintInkMode } from '../types/card';

interface AddSubComicSceneProps {
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

type StickPose = 'sunglasses' | 'happy' | 'headband' | 'hero' | 'panic' | 'crying' | 'strain' | 'punch';

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
      {pose === 'punch' ? (
        <circle cx={resolvedArmR[0]} cy={resolvedArmR[1]} r="5.2" fill="#EF4444" stroke={INK} strokeWidth="1.8" />
      ) : (
        <circle cx={resolvedArmR[0]} cy={resolvedArmR[1]} r="2.6" fill="#FFFFFF" stroke={INK} strokeWidth="1.5" />
      )}

      <line x1="0" y1="34" x2={resolvedLegL[0]} y2={resolvedLegL[1]} stroke={strokeColor} strokeWidth="2.8" strokeLinecap="round" />
      <line x1="0" y1="34" x2={resolvedLegR[0]} y2={resolvedLegR[1]} stroke={strokeColor} strokeWidth="2.8" strokeLinecap="round" />
      <ellipse cx={resolvedLegL[0] - 2} cy={resolvedLegL[1] + 1.5} rx="4.6" ry="2.5" fill={shoeColor} stroke={INK} strokeWidth="1.3" />
      <ellipse cx={resolvedLegR[0] + 2} cy={resolvedLegR[1] + 1.5} rx="4.6" ry="2.5" fill={shoeColor} stroke={INK} strokeWidth="1.3" />
    </g>
  );
};

/* 감전 뼈다귀 졸라맨 */
const SkeletonJollaman: React.FC<{ x: number; y: number; scale?: number; rotate?: number }> = ({
  x,
  y,
  scale = 1,
  rotate = 0,
}) => (
  <g transform={`translate(${x}, ${y}) rotate(${rotate}) scale(${scale})`}>
    <path d="M -9 -14 L -5 -21 L 0 -15 L 5 -21 L 9 -14" fill="none" stroke="#FACC15" strokeWidth="2.2" />
    <circle cx="0" cy="0" r="13" fill="#FFFFFF" stroke={INK} strokeWidth="2.8" />
    <circle cx="-4.8" cy="-2" r="2.1" fill={INK} />
    <circle cx="4.8" cy="-2" r="2.1" fill={INK} />
    <line x1="0" y1="13" x2="0" y2="36" stroke="#FFFFFF" strokeWidth="3.8" strokeLinecap="round" />
    <line x1="0" y1="13" x2="0" y2="36" stroke={INK} strokeWidth="2.4" strokeLinecap="round" />
    <line x1="-6" y1="20" x2="6" y2="20" stroke={INK} strokeWidth="2.2" strokeLinecap="round" />
    <line x1="-5" y1="26" x2="5" y2="26" stroke={INK} strokeWidth="2.2" strokeLinecap="round" />
    <line x1="-4" y1="32" x2="4" y2="32" stroke={INK} strokeWidth="2.2" strokeLinecap="round" />
    <path d="M 0 18 L -16 10" stroke={INK} strokeWidth="3" strokeLinecap="round" />
    <path d="M 0 18 L 16 10" stroke={INK} strokeWidth="3" strokeLinecap="round" />
    <circle cx="-17" cy="10" r="3" fill="#FFFFFF" stroke={INK} strokeWidth="1.5" />
    <circle cx="17" cy="10" r="3" fill="#FFFFFF" stroke={INK} strokeWidth="1.5" />
    <line x1="0" y1="36" x2="-8" y2="50" stroke={INK} strokeWidth="3" strokeLinecap="round" />
    <line x1="0" y1="36" x2="8" y2="50" stroke={INK} strokeWidth="3" strokeLinecap="round" />
    <ellipse cx="-10" cy="52" rx="5" ry="2.8" fill="#EF4444" stroke={INK} strokeWidth="1.3" />
    <ellipse cx="10" cy="52" rx="5" ry="2.8" fill="#EF4444" stroke={INK} strokeWidth="1.3" />
  </g>
);

export const AddSubComicScene: React.FC<AddSubComicSceneProps> = ({
  sceneType,
  inkMode = 'full',
}) => {
  const isLightPrint = inkMode !== 'full';
  const isBw = inkMode === 'bw_worksheet';

  const softBg = (hex: string) => (isLightPrint ? '#FFFFFF' : hex);
  const hlBg = (hex: string) => (isLightPrint ? '#F8FAFC' : hex);
  const shadowInk = isLightPrint ? '#CBD5E1' : INK;

  switch (sceneType) {
    /* 00. 1-2 덧셈·뺄셈(3) 도감 설명서 */
    case 'addsub_guide': {
      const legend = [
        { color: '#2563EB', tag: '기본', rank: '★ N', desc: '10 가르기·모으기 · 세 수 계산 (2장)' },
        { color: '#D97706', tag: '핵심', rank: '★★★ SR', desc: '10의 보수 5쌍 · 덧셈↔뺄셈 짝꿍 (2장)' },
        { color: '#059669', tag: '필살', rank: '★★ R', desc: '10 만들어 덧·뺄셈 · 받아내림 펀치 (5장)' },
        { color: '#EA580C', tag: '함정/도전', rank: '★★★ SR', desc: '받아올림 눈물 1 · 거꾸로 빼기 · 표 (3장)' },
        { color: '#0F172A', tag: '보스/칭찬', rank: '★★★★ SSR', desc: '3관문 보스 + 마스터 인증 (2장)' },
      ];
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#FFFDF2')} />

          <circle cx="38" cy="36" r="19" fill={hlBg('#FEF08A')} stroke="#EA580C" strokeWidth="2.4" />
          <text x="38" y="42" textAnchor="middle" className="font-game" fontSize="18" fill="#EA580C">
            10
          </text>
          <Stickman x={74} y={26} scale={0.66} pose="hero" armL={[-14, 12]} armR={[15, 4]} legL={[-8, 42]} legR={[8, 42]} />

          <text x="162" y="30" textAnchor="middle" className="font-game" fontSize="13.5" fill={INK}>
            10의 마법 포카 도감!
          </text>
          <text x="162" y="47" textAnchor="middle" className="font-body font-bold" fontSize="8.8" fill="#2563EB">
            1학년 2학기 6단원 (총 15장)
          </text>

          <rect x="12" y="68" width="218" height="22" rx="2" fill={shadowInk} />
          <rect x="10" y="66" width="218" height="22" rx="2" fill={hlBg('#FEF08A')} stroke={INK} strokeWidth="2" />
          <text x="119" y="81" textAnchor="middle" className="font-game" fontSize="9.1" fill={INK}>
            10의 보수(01~03) → 10 만들기(04~12) → 보스·완주(13~14)
          </text>

          <rect x="12" y="100" width="218" height="122" rx="2" fill={shadowInk} />
          <rect x="10" y="98" width="218" height="122" rx="2" fill="#FFFFFF" stroke={INK} strokeWidth="2.2" />
          <text x="20" y="114" className="font-game" fontSize="9.8" fill={INK}>
            카드 등급표 (표지 1 + 학습·칭찬 14장)
          </text>
          {legend.map((row, idx) => {
            const ry = 133 + idx * 18.2;
            return (
              <g key={row.tag}>
                <rect x="16" y={ry - 7.5} width="8.5" height="8.5" rx="1" fill={row.color} stroke={INK} strokeWidth="1.2" />
                <text x="28" y={ry} className="font-game" fontSize="8" fill={row.color}>
                  {row.tag}
                </text>
                <text x="72" y={ry} className="font-mono-num font-bold" fontSize="6.8" fill={INK}>
                  {row.rank}
                </text>
                <text x="112" y={ry} className="font-body font-bold" fontSize="7.4" fill="#475569">
                  {row.desc}
                </text>
              </g>
            );
          })}
        </svg>
      );
    }

    /* 01. [선수학습] 10 모으기와 가르기 — 태권 촙 가르기 & 점프 합체! */
    case 'addsub_make_split_10': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#EFF6FF')} />
          <line x1="0" y1="186" x2="240" y2="186" stroke={INK} strokeWidth="2.2" />

          {/* Left: Karate Jollaman slicing a 10-cube into 7 & 3 */}
          <text x="58" y="25" textAnchor="middle" className="font-game" fontSize="12.5" fill="#DC2626">
            가르기! 이얍!
          </text>

          {/* Split 10 halves flying apart */}
          <g transform="translate(30, 86) rotate(-14)">
            <rect x="-15" y="-14" width="30" height="28" rx="4" fill="#FEE2E2" stroke="#DC2626" strokeWidth="2.4" />
            <text x="0" y="6" textAnchor="middle" className="font-game" fontSize="18" fill="#DC2626">
              7
            </text>
          </g>
          <g transform="translate(86, 86) rotate(14)">
            <rect x="-15" y="-14" width="30" height="28" rx="4" fill="#DBEAFE" stroke="#2563EB" strokeWidth="2.4" />
            <text x="0" y="6" textAnchor="middle" className="font-game" fontSize="18" fill="#2563EB">
              3
            </text>
          </g>

          {/* Lightning slice line */}
          <path d="M 58 46 L 54 66 L 62 72 L 58 98" fill="none" stroke="#FACC15" strokeWidth="3.2" strokeLinecap="round" />
          <text x="58" y="45" textAnchor="middle" className="font-game" fontSize="11.5" fill={INK}>
            10 쪼개기!
          </text>

          {/* Flying Karate Jollaman below */}
          <Stickman
            x={58}
            y={132}
            scale={0.76}
            rotate={-8}
            pose="headband"
            armL={[-16, 12]}
            armR={[4, -18]}
            legL={[-14, 42]}
            legR={[16, 36]}
          />

          {/* Vertical comic divider */}
          <line x1="120" y1="14" x2="120" y2="184" stroke="#93C5FD" strokeWidth="2" strokeDasharray="4 3" />

          {/* Right: Two tiny Jollaman running & slamming 7 + 3 together -> 10! */}
          <text x="180" y="25" textAnchor="middle" className="font-game" fontSize="12.5" fill="#059669">
            모으기! 합체!
          </text>

          {/* Giant 10 star burst at top right */}
          <polygon
            points="180,36 186,48 200,48 190,57 194,70 180,63 166,70 170,57 160,48 174,48"
            fill={hlBg('#FEF08A')}
            stroke="#059669"
            strokeWidth="2.2"
          />
          <text x="180" y="61" textAnchor="middle" className="font-game" fontSize="18" fill="#047857">
            10
          </text>

          {/* Two Stickmen rushing together pushing 7 and 3 up */}
          <Stickman x={144} y={136} scale={0.68} pose="happy" armL={[-12, 16]} armR={[18, -6]} legL={[-12, 42]} legR={[6, 42]} />
          <circle cx="156" cy="112" r="12" fill="#FEE2E2" stroke="#DC2626" strokeWidth="2.2" />
          <text x="156" y="118" textAnchor="middle" className="font-game" fontSize="14" fill="#DC2626">
            7
          </text>

          <Stickman x={216} y={136} scale={0.68} pose="sunglasses" armL={[-18, -6]} armR={[12, 16]} legL={[-6, 42]} legR={[12, 42]} />
          <circle cx="204" cy="112" r="12" fill="#DBEAFE" stroke="#2563EB" strokeWidth="2.2" />
          <text x="204" y="118" textAnchor="middle" className="font-game" fontSize="14" fill="#2563EB">
            3
          </text>

          {/* Merging arrows */}
          <path d="M 159 98 Q 166 80 174 74" fill="none" stroke="#059669" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M 201 98 Q 194 80 186 74" fill="none" stroke="#059669" strokeWidth="2.4" strokeLinecap="round" />

          <text x="120" y="212" textAnchor="middle" className="font-game" fontSize="12" fill={INK}>
            가르고 모아도 <tspan fill="#DC2626">7</tspan> + <tspan fill="#2563EB">3</tspan> = <tspan fill="#059669">10</tspan> 은 짝꿍!
          </text>
        </svg>
      );
    }

    /* 02. [선수학습] 10의 보수 5쌍 외우기! — 무지개 10 짝꿍 다리 + 바벨 졸라맨 */
    case 'addsub_complement_10': {
      const pairs = [
        { a: '1', b: '9', color: '#DC2626', r: 90, y: 120 },
        { a: '2', b: '8', color: '#EA580C', r: 72, y: 120 },
        { a: '3', b: '7', color: '#059669', r: 54, y: 120 },
        { a: '4', b: '6', color: '#2563EB', r: 36, y: 120 },
        { a: '5', b: '5', color: '#7C3AED', r: 18, y: 120 },
      ];
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#FFFBEB')} />

          <text x="120" y="23" textAnchor="middle" className="font-game" fontSize="13.5" fill="#B45309">
            합쳐서 10! 무지개 보수 5쌍!
          </text>

          {/* 5 Rainbow Complement Arcs connecting 1-9, 2-8, 3-7, 4-6, 5-5 */}
          {pairs.map((p) => (
            <path
              key={p.a}
              d={`M ${120 - p.r} ${p.y} A ${p.r} ${p.r * 0.78} 0 0 1 ${120 + p.r} ${p.y}`}
              fill="none"
              stroke={p.color}
              strokeWidth="2.8"
              strokeLinecap="round"
            />
          ))}

          {/* Golden 10 crown badge floating at the top of the rainbow */}
          <circle cx="120" cy="48" r="14" fill={hlBg('#FEF08A')} stroke={INK} strokeWidth="2.2" />
          <text x="120" y="54" textAnchor="middle" className="font-game" fontSize="15" fill={INK}>
            10
          </text>

          {/* Number badges along the baseline */}
          {[
            { num: '1', x: 30, color: '#DC2626' },
            { num: '2', x: 48, color: '#EA580C' },
            { num: '3', x: 66, color: '#059669' },
            { num: '4', x: 84, color: '#2563EB' },
            { num: '5', x: 102, color: '#7C3AED' },
            { num: '5', x: 138, color: '#7C3AED' },
            { num: '6', x: 156, color: '#2563EB' },
            { num: '7', x: 174, color: '#059669' },
            { num: '8', x: 192, color: '#EA580C' },
            { num: '9', x: 210, color: '#DC2626' },
          ].map((item, idx) => (
            <g key={idx}>
              <circle cx={item.x} cy="128" r="8.5" fill="#FFFFFF" stroke={item.color} strokeWidth="2" />
              <text x={item.x} y="132" textAnchor="middle" className="font-game" fontSize="11" fill={item.color}>
                {item.num}
              </text>
            </g>
          ))}

          {/* Bottom: Jollaman lifting a 3 + 7 = 10kg barbell! */}
          <Stickman
            x={120}
            y={162}
            scale={0.72}
            pose="strain"
            sweat
            armL={[-24, 4]}
            armR={[24, 4]}
            legL={[-12, 42]}
            legR={[12, 42]}
          />
          <line x1="76" y1="165" x2="164" y2="165" stroke={INK} strokeWidth="3" strokeLinecap="round" />
          <circle cx="72" cy="165" r="12" fill="#D1FAE5" stroke="#059669" strokeWidth="2.2" />
          <text x="72" y="170" textAnchor="middle" className="font-game" fontSize="13" fill="#047857">
            3
          </text>
          <circle cx="168" cy="165" r="12" fill="#D1FAE5" stroke="#059669" strokeWidth="2.2" />
          <text x="168" y="170" textAnchor="middle" className="font-game" fontSize="13" fill="#047857">
            7
          </text>
          <text x="40" y="170" textAnchor="middle" className="font-game" fontSize="10.5" fill="#DC2626">
            끄응!
          </text>
          <text x="200" y="170" textAnchor="middle" className="font-game" fontSize="11" fill="#059669">
            합=10!
          </text>

          <text x="120" y="214" textAnchor="middle" className="font-game" fontSize="11.5" fill={INK}>
            <tspan fill="#DC2626">1·9</tspan> / <tspan fill="#EA580C">2·8</tspan> / <tspan fill="#059669">3·7</tspan> /{' '}
            <tspan fill="#2563EB">4·6</tspan> / <tspan fill="#7C3AED">5·5</tspan> 딱 붙이면 무조건 10!
          </text>
        </svg>
      );
    }

    /* 03. 세 수의 계산 — 징검다리 10 점프! */
    case 'addsub_three_nums': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#EFF6FF')} />

          <text x="120" y="23" textAnchor="middle" className="font-game" fontSize="13.5" fill="#1D4ED8">
            세 수 징검다리! 10 섬부터 밟아!
          </text>

          {/* Top Track: 4 + 6 -> 10 Island -> + 3 -> 13 */}
          <ellipse cx="42" cy="96" rx="22" ry="12" fill="#DBEAFE" stroke="#2563EB" strokeWidth="2.2" />
          <text x="42" y="100" textAnchor="middle" className="font-game" fontSize="13" fill="#1D4ED8">
            4 + 6
          </text>

          {/* Golden 10 Island */}
          <ellipse cx="118" cy="96" rx="22" ry="14" fill={hlBg('#FEF08A')} stroke="#EA580C" strokeWidth="2.6" />
          <text x="118" y="101" textAnchor="middle" className="font-game" fontSize="16" fill="#EA580C">
            10!
          </text>

          {/* Final 13 Island */}
          <ellipse cx="196" cy="96" rx="22" ry="12" fill="#D1FAE5" stroke="#059669" strokeWidth="2.2" />
          <text x="196" y="101" textAnchor="middle" className="font-game" fontSize="15" fill="#047857">
            13!
          </text>

          {/* Leaping arcs */}
          <path d="M 46 82 Q 80 42 112 80" fill="none" stroke="#2563EB" strokeWidth="2.6" strokeDasharray="4 2" />
          <path d="M 106 76 L 113 81 L 114 73" fill="none" stroke="#2563EB" strokeWidth="2.4" strokeLinecap="round" />
          <text x="74" y="54" textAnchor="middle" className="font-game" fontSize="10.5" fill="#2563EB">
            ① 10 착지!
          </text>

          <path d="M 126 80 Q 160 46 190 82" fill="none" stroke="#059669" strokeWidth="2.6" />
          <path d="M 183 80 L 191 83 L 190 74" fill="none" stroke="#059669" strokeWidth="2.4" strokeLinecap="round" />
          <text x="164" y="54" textAnchor="middle" className="font-game" fontSize="11" fill="#059669">
            ② + 3!
          </text>

          {/* Jollaman mid-air landing on 10 Island! */}
          <Stickman x={118} y={54} scale={0.56} pose="hero" armL={[-14, 14]} armR={[16, 4]} legL={[-10, 34]} legR={[10, 34]} />

          <line x1="18" y1="126" x2="222" y2="126" stroke="#BFDBFE" strokeWidth="1.8" strokeDasharray="4 3" />

          {/* Bottom Track: 12 - 2 -> 10 -> - 4 -> 6 */}
          <text x="120" y="148" textAnchor="middle" className="font-game" fontSize="12" fill="#DC2626">
            뺄셈도 앞에서부터 10 먼저!
          </text>

          <text x="52" y="176" textAnchor="middle" className="font-game" fontSize="18" fill="#DC2626">
            12 - 2
          </text>
          <path d="M 80 171 L 100 171" stroke="#DC2626" strokeWidth="2.6" strokeLinecap="round" />
          <path d="M 95 166 L 101 171 L 95 176" fill="none" stroke="#DC2626" strokeWidth="2.4" strokeLinecap="round" />

          <circle cx="118" cy="171" r="14" fill={hlBg('#FEF08A')} stroke="#DC2626" strokeWidth="2.2" />
          <text x="118" y="176" textAnchor="middle" className="font-game" fontSize="14.5" fill="#DC2626">
            10
          </text>

          <path d="M 135 171 L 166 171" stroke="#7C3AED" strokeWidth="2.6" strokeLinecap="round" />
          <path d="M 161 166 L 167 171 L 161 176" fill="none" stroke="#7C3AED" strokeWidth="2.4" strokeLinecap="round" />
          <text x="150" y="163" textAnchor="middle" className="font-game" fontSize="11" fill="#7C3AED">
            -4
          </text>

          <circle cx="186" cy="171" r="14" fill="#F5F3FF" stroke="#7C3AED" strokeWidth="2.2" />
          <text x="186" y="176" textAnchor="middle" className="font-game" fontSize="16" fill="#7C3AED">
            6!
          </text>

          <text x="120" y="214" textAnchor="middle" className="font-game" fontSize="11.5" fill={INK}>
            앞에서부터 차례대로! 10 만들면 슈퍼 패스!
          </text>
        </svg>
      );
    }

    /* 04. 10 만들어 더하기 ① 앞수 채우기 — 10칸 상자 빈칸 채우기! (8 + 5 = 13) */
    case 'addsub_make10_front': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#ECFDF5')} />

          <text x="120" y="22" textAnchor="middle" className="font-game" fontSize="13.5" fill="#047857">
            8 + 5 → 빈칸 2개 채워 10 상자 완성!
          </text>

          {/* Left: 10-frame tray (2x5) with 8 blue balls + 2 empty dashed slots */}
          <g transform="translate(18, 42)">
            <rect x="0" y="0" width="110" height="46" rx="4" fill="#FFFFFF" stroke={INK} strokeWidth="2.2" />
            {Array.from({ length: 10 }).map((_, idx) => {
              const col = idx % 5;
              const row = Math.floor(idx / 5);
              const cx = 13 + col * 21;
              const cy = 13 + row * 20;
              const isEmpty = idx >= 8;
              return isEmpty ? (
                <circle
                  key={idx}
                  cx={cx}
                  cy={cy}
                  r="7.5"
                  fill="#FEF2F2"
                  stroke="#DC2626"
                  strokeWidth="1.8"
                  strokeDasharray="2.5 2"
                />
              ) : (
                <circle key={idx} cx={cx} cy={cy} r="7.5" fill="#3B82F6" stroke={INK} strokeWidth="1.5" />
              );
            })}
            <text x="55" y="61" textAnchor="middle" className="font-game" fontSize="11.5" fill="#2563EB">
              8개 (빈칸 2개!)
            </text>
          </g>

          {/* Right: 5 orange balls (2 rushing into empty slots + 3 left) */}
          <g transform="translate(154, 46)">
            <circle cx="14" cy="10" r="7.5" fill="#FB923C" stroke={INK} strokeWidth="1.5" />
            <circle cx="34" cy="10" r="7.5" fill="#FB923C" stroke={INK} strokeWidth="1.5" />
            <line x1="2" y1="22" x2="48" y2="22" stroke="#DC2626" strokeWidth="1.8" strokeDasharray="3 2" />
            <circle cx="6" cy="34" r="7.5" fill="#FDBA74" stroke={INK} strokeWidth="1.5" />
            <circle cx="24" cy="34" r="7.5" fill="#FDBA74" stroke={INK} strokeWidth="1.5" />
            <circle cx="42" cy="34" r="7.5" fill="#FDBA74" stroke={INK} strokeWidth="1.5" />
            <text x="24" y="57" textAnchor="middle" className="font-game" fontSize="11.5" fill="#EA580C">
              5를 2 + 3으로!
            </text>
          </g>

          {/* Swooping red arrow from 2 orange balls into the 2 empty slots! */}
          <path d="M 156 54 Q 134 32 114 70" fill="none" stroke="#DC2626" strokeWidth="2.6" strokeLinecap="round" />
          <path d="M 111 63 L 113 72 L 120 67" fill="none" stroke="#DC2626" strokeWidth="2.4" strokeLinecap="round" />
          <text x="142" y="39" textAnchor="middle" className="font-game" fontSize="10" fill="#DC2626">
            2 쏙!
          </text>

          {/* Bottom: Action Stickman pushing the 2 in + split math formula */}
          <Stickman x={44} y={142} scale={0.72} pose="headband" armL={[-12, 16]} armR={[20, -4]} legL={[-10, 42]} legR={[10, 42]} />

          <text x="144" y="142" textAnchor="middle" className="font-game" fontSize="22" fill={INK}>
            <tspan fill="#2563EB">8</tspan> + <tspan fill="#EA580C">5</tspan> = <tspan fill="#059669">13</tspan>
          </text>
          {/* Split under 5 */}
          <line x1="142" y1="149" x2="128" y2="167" stroke="#DC2626" strokeWidth="2.2" />
          <line x1="148" y1="149" x2="162" y2="167" stroke="#EA580C" strokeWidth="2.2" />
          <text x="124" y="182" textAnchor="middle" className="font-game" fontSize="14.5" fill="#DC2626">
            2
          </text>
          <text x="164" y="182" textAnchor="middle" className="font-game" fontSize="14.5" fill="#EA580C">
            3
          </text>
          <path d="M 100 148 Q 100 184 116 178" fill="none" stroke="#2563EB" strokeWidth="2.2" />
          <text x="86" y="184" textAnchor="middle" className="font-game" fontSize="11.5" fill="#2563EB">
            10!
          </text>

          <text x="120" y="214" textAnchor="middle" className="font-game" fontSize="11.5" fill={INK}>
            <tspan fill="#2563EB">8</tspan> 상자 채우려 <tspan fill="#DC2626">2</tspan> 먼저 주고 남은 <tspan fill="#EA580C">3</tspan> 더하기!
          </text>
        </svg>
      );
    }

    /* 05. 10 만들어 더하기 ② 뒷수 채우기 — 큰 형님 7에게 양보 패스! (4 + 7 = 11) */
    case 'addsub_make10_back': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#ECFDF5')} />

          <text x="120" y="22" textAnchor="middle" className="font-game" fontSize="13.5" fill="#047857">
            4 + 7 → 큰 수 7한테 3 패스!
          </text>

          {/* Left: Small 4 splitting 3 out to pass to Giant 7 */}
          <circle cx="52" cy="86" r="18" fill="#FFF7ED" stroke="#EA580C" strokeWidth="2.4" />
          <text x="52" y="93" textAnchor="middle" className="font-game" fontSize="21" fill="#EA580C">
            4
          </text>
          <text x="52" y="58" textAnchor="middle" className="font-game" fontSize="10" fill="#EA580C">
            작은 수 4가
          </text>

          {/* Right: Giant Crowned 7 */}
          <polygon points="168,46 172,36 178,42 184,34 190,42 196,36 200,46" fill="#FACC15" stroke={INK} strokeWidth="1.6" />
          <circle cx="184" cy="82" r="28" fill="#EFF6FF" stroke="#2563EB" strokeWidth="2.8" />
          <text x="184" y="92" textAnchor="middle" className="font-game" fontSize="30" fill="#1D4ED8">
            7
          </text>

          {/* Jollaman throwing "3" ball across to 7! */}
          <Stickman x={86} y={118} scale={0.68} pose="sunglasses" armL={[-13, 18]} armR={[20, -8]} legL={[-9, 40]} legR={[9, 40]} />
          <path d="M 70 76 Q 118 40 154 68" fill="none" stroke="#DC2626" strokeWidth="2.8" strokeDasharray="4 2" />
          <path d="M 147 68 L 156 70 L 152 61" fill="none" stroke="#DC2626" strokeWidth="2.4" strokeLinecap="round" />
          <circle cx="116" cy="54" r="12" fill="#FEF2F2" stroke="#DC2626" strokeWidth="2.2" />
          <text x="116" y="59" textAnchor="middle" className="font-game" fontSize="14" fill="#DC2626">
            3
          </text>
          <text x="116" y="80" textAnchor="middle" className="font-game" fontSize="10" fill="#DC2626">
            “3 받아라!”
          </text>

          {/* Remaining 1 from 4 */}
          <circle cx="38" cy="144" r="13" fill="#FFF7ED" stroke="#EA580C" strokeWidth="2.2" />
          <text x="38" y="150" textAnchor="middle" className="font-game" fontSize="15" fill="#EA580C">
            1
          </text>
          <text x="38" y="169" textAnchor="middle" className="font-game" fontSize="9.5" fill="#EA580C">
            남은 1!
          </text>

          {/* 3 + 7 = 10 golden burst */}
          <circle cx="184" cy="140" r="18" fill={hlBg('#FEF08A')} stroke="#059669" strokeWidth="2.4" />
          <text x="184" y="146" textAnchor="middle" className="font-game" fontSize="16" fill="#047857">
            10!
          </text>

          {/* Final 1 + 10 = 11 */}
          <path d="M 54 146 L 160 144" stroke="#059669" strokeWidth="2.2" strokeDasharray="3 3" />
          <text x="120" y="186" textAnchor="middle" className="font-game" fontSize="16" fill="#059669">
            1 + 10 = 11!
          </text>

          <text x="120" y="214" textAnchor="middle" className="font-game" fontSize="11.5" fill={INK}>
            뒷수가 더 클 땐 <tspan fill="#2563EB">큰 수</tspan>를 먼저 <tspan fill="#059669">10</tspan> 만들면 1초 컷!
          </text>
        </svg>
      );
    }

    /* 06. 받아올림 까먹음 주의! "나는 안 데리고 가?" (눈물의 1) */
    case 'addsub_carry_forget_trap': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#FEF2F2')} />

          <text x="120" y="22" textAnchor="middle" className="font-game" fontSize="13" fill="#B91C1C">
            받아올림 1을 빼먹고 가면 땡!
          </text>

          {/* Tiny crying "1" Jollaman stranded above tens digit 2 */}
          <g transform="translate(56, 52)">
            <circle cx="0" cy="-4" r="9.5" fill="#FFFFFF" stroke="#DC2626" strokeWidth="2.2" />
            <LoopHair x={0} y={-13.5} color="#DC2626" />
            <path d="M -5.5 -4 L -9 5" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 5.5 -4 L 9 5" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="-9.5" cy="7.5" r="1.4" fill="#38BDF8" />
            <circle cx="9.5" cy="7.5" r="1.4" fill="#38BDF8" />
            <text x="0" y="1" textAnchor="middle" className="font-game" fontSize="11" fill="#DC2626">
              1
            </text>
            <line x1="0" y1="5.5" x2="0" y2="17" stroke="#DC2626" strokeWidth="2.2" />
            <path d="M 0 9 L 11 13" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" />
            <path d="M 0 9 L -11 13" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" />
          </g>

          <text x="150" y="49" textAnchor="middle" className="font-game" fontSize="12" fill="#DC2626">
            “야! 나는 안 데리고 가? ㅠ”
          </text>
          <path d="M 72 48 Q 86 43 92 48" fill="none" stroke="#DC2626" strokeWidth="1.8" strokeDasharray="3 2" />

          {/* Vertical Arithmetic 27 + 5 */}
          <text x="56" y="102" textAnchor="middle" className="font-game" fontSize="24" fill={INK}>
            2
          </text>
          <text x="90" y="102" textAnchor="middle" className="font-game" fontSize="24" fill={INK}>
            7
          </text>
          <text x="28" y="134" textAnchor="middle" className="font-game" fontSize="22" fill={INK}>
            +
          </text>
          <text x="90" y="134" textAnchor="middle" className="font-game" fontSize="24" fill={INK}>
            5
          </text>
          <line x1="18" y1="144" x2="108" y2="144" stroke={INK} strokeWidth="2.6" />

          {/* Wrong answer 22 + red X */}
          <text x="56" y="176" textAnchor="middle" className="font-game" fontSize="26" fill="#94A3B8">
            2
          </text>
          <text x="90" y="176" textAnchor="middle" className="font-game" fontSize="26" fill="#94A3B8">
            2
          </text>
          <line x1="40" y1="152" x2="104" y2="182" stroke="#DC2626" strokeWidth="3.2" strokeLinecap="round" />
          <line x1="104" y1="152" x2="40" y2="182" stroke="#DC2626" strokeWidth="3.2" strokeLinecap="round" />

          {/* Right side: Hero Jollaman rescuing 1 -> 1 + 2 = 3 -> 32! */}
          <path d="M 114 128 L 140 128" stroke="#059669" strokeWidth="2.8" strokeLinecap="round" />
          <path d="M 134 123 L 141 128 L 134 133" fill="none" stroke="#059669" strokeWidth="2.6" strokeLinecap="round" />

          <text x="184" y="84" textAnchor="middle" className="font-game" fontSize="13.5" fill="#DC2626">
            1 + 2 = 3!
          </text>
          <text x="184" y="122" textAnchor="middle" className="font-game" fontSize="30" fill="#059669">
            32
          </text>
          <Stickman x={184} y={148} scale={0.68} pose="hero" armL={[-15, 14]} armR={[16, 4]} legL={[-8, 40]} legR={[8, 40]} />
          <text x="184" y="192" textAnchor="middle" className="font-game" fontSize="10.5" fill="#059669">
            같이 데려가면 정답!
          </text>

          <text x="120" y="215" textAnchor="middle" className="font-game" fontSize="11.5" fill="#B91C1C">
            올려 보낸 받아올림 <tspan fill="#DC2626">1</tspan>도 꼭 함께 더하자!
          </text>
        </svg>
      );
    }

    /* 07. 10 만들어 빼기 ① 10에서 먼저 빼고 합치기 — 10묶음 상자에서 8개 쏙! (13 - 8 = 5) */
    case 'addsub_sub10_split': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#ECFDF5')} />

          <text x="120" y="22" textAnchor="middle" className="font-game" fontSize="13.5" fill="#047857">
            13 - 8 → 10 상자에서 8개 쏙 빼!
          </text>

          {/* Left: 10-bundle (10 dots, 8 crossed out in red, 2 left glowing!) */}
          <g transform="translate(18, 42)">
            <rect x="0" y="0" width="110" height="46" rx="4" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2.2" />
            {Array.from({ length: 10 }).map((_, idx) => {
              const col = idx % 5;
              const row = Math.floor(idx / 5);
              const cx = 13 + col * 21;
              const cy = 13 + row * 20;
              const crossed = idx < 8;
              return (
                <g key={idx}>
                  <circle
                    cx={cx}
                    cy={cy}
                    r="7.2"
                    fill={crossed ? '#E2E8F0' : '#3B82F6'}
                    stroke={INK}
                    strokeWidth="1.4"
                  />
                  {crossed && (
                    <line x1={cx - 6} y1={cy - 6} x2={cx + 6} y2={cy + 6} stroke="#DC2626" strokeWidth="2.2" />
                  )}
                </g>
              );
            })}
            <text x="55" y="61" textAnchor="middle" className="font-game" fontSize="11.5" fill="#DC2626">
              10 - 8 = 2 남음!
            </text>
          </g>

          {/* Right: 3 loose orange dots untouched */}
          <g transform="translate(152, 46)">
            <circle cx="14" cy="20" r="7.5" fill="#FB923C" stroke={INK} strokeWidth="1.5" />
            <circle cx="34" cy="20" r="7.5" fill="#FB923C" stroke={INK} strokeWidth="1.5" />
            <circle cx="54" cy="20" r="7.5" fill="#FB923C" stroke={INK} strokeWidth="1.5" />
            <text x="34" y="57" textAnchor="middle" className="font-game" fontSize="11.5" fill="#EA580C">
              남긴 3개!
            </text>
          </g>

          {/* Green sweeping bracket merging 2 left + 3 loose */}
          <path d="M 106 108 Q 134 134 178 108" fill="none" stroke="#059669" strokeWidth="2.8" strokeLinecap="round" />

          {/* Jollaman hugging 2 + 3 -> 5! */}
          <Stickman x={44} y={142} scale={0.72} pose="happy" armL={[-13, 14]} armR={[18, -2]} legL={[-9, 40]} legR={[9, 40]} />

          <text x="148" y="146" textAnchor="middle" className="font-game" fontSize="17" fill="#059669">
            <tspan fill="#2563EB">2</tspan> + <tspan fill="#EA580C">3</tspan> = 5!
          </text>
          <text x="148" y="172" textAnchor="middle" className="font-game" fontSize="22" fill={INK}>
            13 - 8 = <tspan fill="#059669">5</tspan>
          </text>

          <text x="120" y="214" textAnchor="middle" className="font-game" fontSize="11.5" fill={INK}>
            10에서 8 빼서 남은 <tspan fill="#2563EB">2</tspan> + 원래 있던 <tspan fill="#EA580C">3</tspan> = <tspan fill="#059669">5</tspan>!
          </text>
        </svg>
      );
    }

    /* 08. 10 만들어 빼기 ② 두 번 쏙 빼기 — 수직선 10 정거장 2단 점프! (13 - 5 = 8) */
    case 'addsub_sub10_twice': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#ECFDF5')} />

          <text x="120" y="22" textAnchor="middle" className="font-game" fontSize="13.5" fill="#047857">
            13 - 5 → 10 정거장 거쳐 두 번 점프!
          </text>

          {/* Split equation at top */}
          <text x="120" y="50" textAnchor="middle" className="font-game" fontSize="18" fill={INK}>
            <tspan fill="#2563EB">13</tspan> - <tspan fill="#DC2626">5</tspan> (3과 2로!) = <tspan fill="#059669">8</tspan>
          </text>

          {/* Numberline from 7 to 14 */}
          <line x1="20" y1="156" x2="220" y2="156" stroke={INK} strokeWidth="2.8" strokeLinecap="round" />
          {[
            { n: 8, x: 46, highlight: '#059669' },
            { n: 9, x: 76, highlight: '#64748B' },
            { n: 10, x: 106, highlight: '#EA580C' },
            { n: 11, x: 136, highlight: '#64748B' },
            { n: 12, x: 166, highlight: '#64748B' },
            { n: 13, x: 196, highlight: '#2563EB' },
          ].map((t) => (
            <g key={t.n}>
              <line
                x1={t.x}
                y1={t.n === 10 || t.n === 8 || t.n === 13 ? 148 : 151}
                x2={t.x}
                y2={t.n === 10 || t.n === 8 || t.n === 13 ? 164 : 161}
                stroke={t.highlight}
                strokeWidth={t.n === 10 || t.n === 8 || t.n === 13 ? 2.8 : 1.8}
              />
              <text
                x={t.x}
                y="180"
                textAnchor="middle"
                className="font-game"
                fontSize={t.n === 10 || t.n === 8 || t.n === 13 ? 14 : 10.5}
                fill={t.highlight}
              >
                {t.n}
              </text>
            </g>
          ))}

          {/* 10 Stop Flag */}
          <line x1="106" y1="122" x2="106" y2="148" stroke="#EA580C" strokeWidth="2" />
          <polygon points="106,122 126,128 106,134" fill={hlBg('#FEF08A')} stroke="#EA580C" strokeWidth="1.6" />

          {/* Hop 1: 13 -> 10 (-3) */}
          <path d="M 194 146 Q 150 92 109 146" fill="none" stroke="#2563EB" strokeWidth="2.8" />
          <path d="M 110 138 L 108 147 L 116 144" fill="none" stroke="#2563EB" strokeWidth="2.4" strokeLinecap="round" />
          <text x="152" y="108" textAnchor="middle" className="font-game" fontSize="13" fill="#2563EB">
            ① -3 (10!)
          </text>

          {/* Hop 2: 10 -> 8 (-2) */}
          <path d="M 102 146 Q 74 102 48 146" fill="none" stroke="#7C3AED" strokeWidth="2.8" />
          <path d="M 48 138 L 47 147 L 55 144" fill="none" stroke="#7C3AED" strokeWidth="2.4" strokeLinecap="round" />
          <text x="74" y="114" textAnchor="middle" className="font-game" fontSize="13" fill="#7C3AED">
            ② -2!
          </text>

          {/* Jollaman leaping backward */}
          <Stickman x={196} y={96} scale={0.62} pose="sunglasses" armL={[-16, 8]} armR={[14, 16]} legL={[-10, 38]} legR={[10, 38]} />

          <text x="120" y="214" textAnchor="middle" className="font-game" fontSize="11.5" fill={INK}>
            먼저 <tspan fill="#2563EB">3 빼서 10</tspan> 만든 뒤 남은 <tspan fill="#7C3AED">2 마저 빼기</tspan>!
          </text>
        </svg>
      );
    }

    /* 09. 받아내림 펀치! 십의 자리 -1 변신 (23 - 7 = 16) */
    case 'addsub_borrow_punch': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#ECFDF5')} />

          <text x="120" y="22" textAnchor="middle" className="font-game" fontSize="13.2" fill="#047857">
            받아내림 펀치! 십의 자리 하나 작게!
          </text>

          {/* Punching Jollaman throwing red fist at tens digit '2' */}
          <Stickman
            x={34}
            y={82}
            scale={0.76}
            pose="punch"
            armL={[-14, 20]}
            armR={[25, -4]}
            legL={[-10, 46]}
            legR={[10, 46]}
          />

          {/* POW burst right on tens digit '2' */}
          <polygon
            points="78,76 85,68 91,76 99,72 95,82 103,88 93,91 92,100 84,93 76,97 80,88 72,82"
            fill="#FACC15"
            stroke="#DC2626"
            strokeWidth="1.6"
          />
          <text x="64" y="58" textAnchor="middle" className="font-game" fontSize="11.5" fill="#DC2626">
            퍽!! (-1)
          </text>

          {/* Regrouped 1 above 2 and 10 above 3 */}
          <text x="114" y="54" textAnchor="middle" className="font-game" fontSize="20" fill="#DC2626">
            1
          </text>
          <text x="152" y="54" textAnchor="middle" className="font-game" fontSize="16.5" fill="#2563EB">
            10
          </text>
          <path d="M 122 48 Q 135 38 144 44" fill="none" stroke="#2563EB" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M 140 40 L 146 45 L 139 47" fill="none" stroke="#2563EB" strokeWidth="2.2" strokeLinecap="round" />

          {/* Vertical subtraction 23 - 7 */}
          <text x="114" y="88" textAnchor="middle" className="font-game" fontSize="24" fill="#94A3B8">
            2
          </text>
          <line x1="104" y1="82" x2="124" y2="76" stroke="#DC2626" strokeWidth="2.6" strokeLinecap="round" />
          <text x="152" y="88" textAnchor="middle" className="font-game" fontSize="24" fill={INK}>
            3
          </text>

          <text x="88" y="118" textAnchor="middle" className="font-game" fontSize="22" fill={INK}>
            -
          </text>
          <text x="152" y="118" textAnchor="middle" className="font-game" fontSize="24" fill={INK}>
            7
          </text>

          <line x1="82" y1="128" x2="170" y2="128" stroke={INK} strokeWidth="2.6" />

          <text x="114" y="160" textAnchor="middle" className="font-game" fontSize="26" fill="#DC2626">
            1
          </text>
          <text x="152" y="160" textAnchor="middle" className="font-game" fontSize="26" fill="#059669">
            6
          </text>

          {/* Right side concise callouts */}
          <text x="206" y="84" textAnchor="middle" className="font-game" fontSize="11.5" fill="#DC2626">
            2 → 1
          </text>
          <text x="206" y="100" textAnchor="middle" className="font-game" fontSize="9.5" fill={INK}>
            하나 작게!
          </text>
          <text x="206" y="138" textAnchor="middle" className="font-game" fontSize="11" fill="#2563EB">
            13 - 7
          </text>
          <text x="206" y="154" textAnchor="middle" className="font-game" fontSize="12.5" fill="#059669">
            = 6!
          </text>

          <text x="120" y="192" textAnchor="middle" className="font-game" fontSize="11.5" fill="#059669">
            2를 펀치해 1로 줄이고, 10 내려와 13 - 7 = 6!
          </text>
          <text x="120" y="214" textAnchor="middle" className="font-game" fontSize="11" fill={INK}>
            십의 자리 <tspan fill="#DC2626">-1</tspan>, 일의 자리 <tspan fill="#2563EB">+10</tspan> 콤보!
          </text>
        </svg>
      );
    }

    /* 10. 거꾸로 빼면 절대 땡! — 물구나무 감전 뼈다귀! (23 - 7 = 24?!) */
    case 'addsub_reverse_sub_trap': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#FEF2F2')} />

          <text x="120" y="22" textAnchor="middle" className="font-game" fontSize="13.5" fill="#B91C1C">
            거꾸로 빼면 물구나무 감전 땡!
          </text>

          {/* Left: Wrong vertical subtraction with upward red arrow */}
          <text x="58" y="74" textAnchor="middle" className="font-game" fontSize="24" fill={INK}>
            2
          </text>
          <text x="92" y="74" textAnchor="middle" className="font-game" fontSize="24" fill={INK}>
            3
          </text>
          <text x="30" y="106" textAnchor="middle" className="font-game" fontSize="22" fill={INK}>
            -
          </text>
          <text x="92" y="106" textAnchor="middle" className="font-game" fontSize="24" fill="#DC2626">
            7
          </text>

          {/* Illegal upward arrow */}
          <path d="M 110 104 Q 124 88 110 72" fill="none" stroke="#DC2626" strokeWidth="2.6" />
          <path d="M 108 79 L 110 71 L 116 76" fill="none" stroke="#DC2626" strokeWidth="2.4" />
          <text x="134" y="92" textAnchor="middle" className="font-game" fontSize="10" fill="#DC2626">
            7-3?!
          </text>

          <line x1="22" y1="118" x2="110" y2="118" stroke={INK} strokeWidth="2.4" />
          <text x="58" y="150" textAnchor="middle" className="font-game" fontSize="26" fill="#94A3B8">
            2
          </text>
          <text x="92" y="150" textAnchor="middle" className="font-game" fontSize="26" fill="#94A3B8">
            4
          </text>
          <line x1="40" y1="128" x2="104" y2="156" stroke="#DC2626" strokeWidth="3.2" strokeLinecap="round" />
          <line x1="104" y1="128" x2="40" y2="156" stroke="#DC2626" strokeWidth="3.2" strokeLinecap="round" />

          {/* Right: Upside-down Skeleton Jollaman zapped! */}
          <path d="M 176 34 L 166 48 L 174 50 L 164 64" fill="none" stroke="#FACC15" strokeWidth="3" strokeLinecap="round" />
          <SkeletonJollaman x={190} y={120} scale={0.82} rotate={180} />
          <text x="190" y="164" textAnchor="middle" className="font-game" fontSize="11" fill="#DC2626">
            거꾸로 찌릿!!
          </text>

          <text x="120" y="192" textAnchor="middle" className="font-game" fontSize="12" fill="#059669">
            정답: 2→1 빌려와 13 - 7 = 6 → 16!
          </text>
          <text x="120" y="214" textAnchor="middle" className="font-game" fontSize="11" fill={INK}>
            항상 <tspan fill="#DC2626">위에서 아래로!</tspan> 못 빼면 십의 자리 펀치!
          </text>
        </svg>
      );
    }

    /* 11. 덧셈과 뺄셈은 짝꿍 가족! — 대장 13 아래 시소 가족 */
    case 'addsub_family_relation': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#FFFBEB')} />

          <text x="120" y="22" textAnchor="middle" className="font-game" fontSize="13.5" fill="#B45309">
            세 숫자(8 · 5 · 13)는 짝꿍 가족!
          </text>

          {/* Balance Scale / Family Roof */}
          <polygon points="120,42 54,108 186,108" fill="none" stroke="#F59E0B" strokeWidth="2.4" strokeDasharray="4 3" />

          {/* Top King 13 */}
          <circle cx="120" cy="52" r="17" fill={hlBg('#FEF08A')} stroke={INK} strokeWidth="2.4" />
          <text x="120" y="59" textAnchor="middle" className="font-game" fontSize="18" fill={INK}>
            13
          </text>

          {/* Left 8 and Right 5 riding balance bar */}
          <line x1="46" y1="112" x2="194" y2="112" stroke={INK} strokeWidth="3.2" strokeLinecap="round" />
          <polygon points="120,112 110,126 130,126" fill="#F59E0B" stroke={INK} strokeWidth="1.8" />

          <circle cx="64" cy="100" r="14.5" fill="#DBEAFE" stroke="#2563EB" strokeWidth="2.4" />
          <text x="64" y="106" textAnchor="middle" className="font-game" fontSize="17" fill="#1D4ED8">
            8
          </text>
          <circle cx="176" cy="100" r="14.5" fill="#D1FAE5" stroke="#059669" strokeWidth="2.4" />
          <text x="176" y="106" textAnchor="middle" className="font-game" fontSize="17" fill="#047857">
            5
          </text>

          {/* Jollaman balancing on top/side holding double arrow */}
          <Stickman x={120} y={84} scale={0.56} pose="sunglasses" armL={[-16, 4]} armR={[16, 4]} legL={[-7, 30]} legR={[7, 30]} />

          {/* 3 Clean Equations with colored connectors */}
          <text x="120" y="152" textAnchor="middle" className="font-game" fontSize="16" fill="#EA580C">
            <tspan fill="#2563EB">8</tspan> + <tspan fill="#059669">5</tspan> = <tspan fill={INK}>13</tspan>
          </text>

          <path d="M 90 156 L 72 168" stroke="#2563EB" strokeWidth="2" />
          <path d="M 150 156 L 168 168" stroke="#059669" strokeWidth="2" />

          <text x="64" y="185" textAnchor="middle" className="font-game" fontSize="14.5" fill="#2563EB">
            13 - 8 = 5
          </text>
          <text x="176" y="185" textAnchor="middle" className="font-game" fontSize="14.5" fill="#059669">
            13 - 5 = 8
          </text>

          <text x="120" y="214" textAnchor="middle" className="font-game" fontSize="11.5" fill={INK}>
            덧셈 1개만 알면 뺄셈 2개가 공짜 변신!
          </text>
        </svg>
      );
    }

    /* 12. 덧셈표 · 뺄셈표 대각선 비밀! — 돋보기 탐정 졸라맨 */
    case 'addsub_table_pattern': {
      const cells = [
        ['+', '2', '3', '4', '5'],
        ['6', '8', '9', '10', '11'],
        ['7', '9', '10', '11', '12'],
        ['8', '10', '11', '12', '13'],
        ['9', '11', '12', '13', '14'],
      ];
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#F5F3FF')} />

          <text x="120" y="22" textAnchor="middle" className="font-game" fontSize="13.5" fill="#5B21B6">
            덧셈표 대각선은 답이 똑같아!
          </text>

          {/* Compact 5x5 Addition Table */}
          <g transform="translate(16, 36)">
            {cells.map((row, r) =>
              row.map((val, c) => {
                const x = c * 28;
                const y = r * 26;
                const isHeader = r === 0 || c === 0;
                const isDiag11 = (r === 1 && c === 4) || (r === 2 && c === 3) || (r === 3 && c === 2) || (r === 4 && c === 1);
                return (
                  <g key={`${r}-${c}`}>
                    <rect
                      x={x}
                      y={y}
                      width="28"
                      height="26"
                      fill={isHeader ? '#EDE9FE' : isDiag11 ? '#FEF08A' : '#FFFFFF'}
                      stroke={INK}
                      strokeWidth="1.5"
                    />
                    <text
                      x={x + 14}
                      y={y + 17.5}
                      textAnchor="middle"
                      className="font-game"
                      fontSize="11.5"
                      fill={isDiag11 ? '#DC2626' : isHeader ? '#5B21B6' : INK}
                    >
                      {val}
                    </text>
                  </g>
                );
              })
            )}
            <path d="M 122 34 L 40 120" stroke="#DC2626" strokeWidth="2.2" strokeDasharray="3 2" opacity="0.75" />
          </g>

          {/* Detective Jollaman holding magnifying glass over the 11 diagonal! */}
          <Stickman x={198} y={64} scale={0.62} pose="sunglasses" armL={[-24, 12]} armR={[14, 16]} />
          <circle cx="174" cy="76" r="9" fill="#E0F2FE" stroke={INK} strokeWidth="2" opacity="0.85" />
          <line x1="168" y1="82" x2="160" y2="90" stroke={INK} strokeWidth="2.4" strokeLinecap="round" />

          {/* +/-1 Rule Callout */}
          <text x="198" y="122" textAnchor="middle" className="font-game" fontSize="11" fill="#2563EB">
            앞 수 +1
          </text>
          <text x="198" y="138" textAnchor="middle" className="font-game" fontSize="11" fill="#EA580C">
            뒷 수 -1
          </text>
          <path d="M 198 144 L 198 156" stroke="#DC2626" strokeWidth="2.2" />
          <text x="198" y="172" textAnchor="middle" className="font-game" fontSize="13.5" fill="#DC2626">
            합은 11!
          </text>

          <text x="120" y="196" textAnchor="middle" className="font-game" fontSize="11" fill="#5B21B6">
            6+5 = 7+4 = 8+3 = 9+2 = 11!
          </text>
          <text x="120" y="216" textAnchor="middle" className="font-game" fontSize="11" fill={INK}>
            노란 대각선 줄은 전부 똑같은 합!
          </text>
        </svg>
      );
    }

    /* 13. 최종 보스! 10의 마법 3관문 */
    case 'addsub_boss': {
      const darkBg = isLightPrint ? '#FFFFFF' : '#0F172A';
      const goldText = isBw ? INK : isLightPrint ? '#B45309' : '#FACC15';
      const bossShadow = isLightPrint ? '#CBD5E1' : '#FACC15';
      const bossStroke = isLightPrint ? INK : '#FFFFFF';
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={darkBg} />

          <path
            d="M 8 22 V 8 H 22 M 218 8 H 232 V 22 M 8 208 V 222 H 22 M 218 222 H 232 V 208"
            fill="none"
            stroke={goldText}
            strokeWidth="2.4"
          />

          <text x="120" y="26" textAnchor="middle" className="font-game" fontSize="13.5" fill={goldText}>
            최종 보스! 10의 마법 3관문
          </text>

          {/* 3 Boss Podiums */}
          <g transform="translate(46, 68)">
            <rect x="-31" y="-23" width="66" height="52" rx="2" fill={bossShadow} />
            <rect x="-34" y="-26" width="66" height="52" rx="2" fill="#FFFFFF" stroke={INK} strokeWidth="2.4" />
            <text x="-1" y="-7" textAnchor="middle" className="font-game" fontSize="9.5" fill="#DC2626">
              1관문
            </text>
            <text x="-1" y="13" textAnchor="middle" className="font-game" fontSize="14" fill={INK}>
              8 + 6
            </text>
          </g>

          <g transform="translate(120, 68)">
            <rect x="-31" y="-23" width="66" height="52" rx="2" fill={bossShadow} />
            <rect x="-34" y="-26" width="66" height="52" rx="2" fill="#FFFFFF" stroke={INK} strokeWidth="2.4" />
            <text x="-1" y="-7" textAnchor="middle" className="font-game" fontSize="9.5" fill="#DC2626">
              2관문
            </text>
            <text x="-1" y="13" textAnchor="middle" className="font-game" fontSize="14" fill={INK}>
              15 - 7
            </text>
          </g>

          <g transform="translate(194, 68)">
            <rect x="-31" y="-23" width="66" height="52" rx="2" fill={bossShadow} />
            <rect x="-34" y="-26" width="66" height="52" rx="2" fill="#FFFFFF" stroke={INK} strokeWidth="2.4" />
            <text x="-1" y="-7" textAnchor="middle" className="font-game" fontSize="9.5" fill="#DC2626">
              3관문
            </text>
            <text x="-1" y="13" textAnchor="middle" className="font-game" fontSize="14" fill={INK}>
              24 - 8
            </text>
          </g>

          <Stickman x={54} y={138} scale={0.84} pose="hero" armL={[-14, 18]} armR={[16, 2]} strokeColor={bossStroke} />

          <text x="150" y="144" textAnchor="middle" className="font-game" fontSize="11.5" fill={goldText}>
            10 만들기 &amp; 펀치 총동원!
          </text>
          <text x="150" y="166" textAnchor="middle" className="font-game" fontSize="10.8" fill={isBw ? INK : '#FCA5A5'}>
            받아올림 1도 절대 잊지 마!
          </text>

          <text x="120" y="212" textAnchor="middle" className="font-game" fontSize="11.5" fill={goldText}>
            세 문제 정답을 아래 팁에서 확인하자!
          </text>
        </svg>
      );
    }

    /* 14. 1-2 덧셈·뺄셈(3) 완주 칭찬 포카 */
    case 'addsub_praise':
    default: {
      const darkBg = isLightPrint ? '#FFFFFF' : '#0F172A';
      const goldText = isBw ? INK : isLightPrint ? '#B45309' : '#FACC15';
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={darkBg} />

          {!isLightPrint && (
            <g opacity="0.16" fill="#FACC15">
              <polygon points="120,115 20,0 55,0" />
              <polygon points="120,115 95,0 145,0" />
              <polygon points="120,115 185,0 220,0" />
            </g>
          )}

          <path
            d="M 8 22 V 8 H 22 M 218 8 H 232 V 22 M 8 208 V 222 H 22 M 218 222 H 232 V 208"
            fill="none"
            stroke={goldText}
            strokeWidth="2.4"
          />

          <polygon points="103,26 105,12 113,18 120,10 127,18 135,12 137,26" fill={goldText} stroke={isBw ? INK : 'none'} strokeWidth="1.2" />

          <text x="120" y="46" textAnchor="middle" className="font-game" fontSize="13" fill={goldText}>
            1-2 덧셈·뺄셈(3) 완주 축하!!
          </text>

          <Stickman x={66} y={76} scale={0.85} pose="hero" armL={[-16, 10]} armR={[16, 10]} />

          <g transform="translate(154, 82)">
            <path d="M -22 -18 H 22 L 15 10 Q 0 18 -15 10 Z" fill="#FACC15" stroke={INK} strokeWidth="2" />
            <text x="0" y="-1" textAnchor="middle" className="font-game" fontSize="11.5" fill={INK}>
              10의 마법
            </text>
            <rect x="-4" y="13" width="8" height="10" fill="#FACC15" stroke={INK} strokeWidth="1.5" />
            <rect x="-15" y="23" width="30" height="7" rx="1.5" fill="#FFFFFF" stroke={INK} strokeWidth="1.5" />
          </g>

          <rect x="20" y="134" width="204" height="58" rx="4" fill={shadowInk} />
          <rect x="17" y="131" width="204" height="58" rx="4" fill="#FFFFFF" stroke="#FACC15" strokeWidth="2.2" />
          <text x="119" y="149" textAnchor="middle" className="font-game" fontSize="11.2" fill="#1D4ED8">
            덧셈·뺄셈(3) 15장 올 클리어!
          </text>
          <text x="119" y="166" textAnchor="middle" className="font-body font-bold" fontSize="9" fill={INK}>
            10의 보수·받아올림·받아내림 펀치 정복!
          </text>
          <text x="119" y="182" textAnchor="middle" className="font-game" fontSize="9.5" fill="#DC2626">
            ★ 졸라수학맨 공식 10의 마법사 인증 ★
          </text>

          <text x="120" y="212" textAnchor="middle" className="font-game" fontSize="11" fill={goldText}>
            최강 계산 마스터 탄생!!
          </text>
        </svg>
      );
    }
  }
};
