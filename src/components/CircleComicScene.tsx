import React from 'react';
import { EpisodeSceneType, PrintInkMode } from '../types/card';

interface CircleComicSceneProps {
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

type StickPose = 'sunglasses' | 'happy' | 'headband' | 'hero' | 'panic' | 'crying' | 'strain';

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
}) => {
  const headR = 13.5;
  const isHero = pose === 'hero';
  const hasHeadband = pose === 'headband' || isHero;

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
        stroke={INK}
        strokeWidth="2.8"
      />
      <LoopHair x={0} y={-headR} />

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
          <path d="M -7 -2 Q -4.5 -5.5 -2 -2" fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" />
          <path d="M 2 -2 Q 4.5 -5.5 7 -2" fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" />
          <path d="M -5 5 Q 0 10 5 5 Z" fill="#EF4444" stroke={INK} strokeWidth="1.5" />
        </g>
      )}
      {pose === 'panic' && (
        <g>
          <circle cx="-5" cy="-2" r="3" fill="#FFFFFF" stroke={INK} strokeWidth="1.7" />
          <circle cx="-5" cy="-2" r="1.1" fill={INK} />
          <circle cx="5" cy="-2" r="3" fill="#FFFFFF" stroke={INK} strokeWidth="1.7" />
          <circle cx="5" cy="-2" r="1.1" fill={INK} />
          <ellipse cx="0" cy="6" rx="3.3" ry="4.1" fill="#EF4444" stroke={INK} strokeWidth="1.6" />
        </g>
      )}
      {pose === 'crying' && (
        <g>
          <path d="M -7 -3 L -3 -0.5 L -7 2" fill="none" stroke={INK} strokeWidth="1.8" strokeLinecap="round" />
          <path d="M 7 -3 L 3 -0.5 L 7 2" fill="none" stroke={INK} strokeWidth="1.8" strokeLinecap="round" />
          <ellipse cx="-6.5" cy="5.5" rx="1.6" ry="2.6" fill="#38BDF8" />
          <ellipse cx="6.5" cy="5.5" rx="1.6" ry="2.6" fill="#38BDF8" />
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
      {(pose === 'headband' || isHero) && (
        <g>
          <line x1="-8" y1="-2" x2="-2" y2="-0.5" stroke={INK} strokeWidth="2" strokeLinecap="round" />
          <line x1="8" y1="-2" x2="2" y2="-0.5" stroke={INK} strokeWidth="2" strokeLinecap="round" />
          <circle cx="-4.8" cy="1" r="1.7" fill={INK} />
          <circle cx="4.8" cy="1" r="1.7" fill={INK} />
          <path d="M -3.5 7 Q 0 4.5 3.5 7" fill="none" stroke={INK} strokeWidth="1.9" strokeLinecap="round" />
        </g>
      )}

      <line x1="0" y1={headR} x2="0" y2="34" stroke={INK} strokeWidth="3.2" strokeLinecap="round" />
      <line x1="0" y1="20" x2={resolvedArmL[0]} y2={resolvedArmL[1]} stroke={INK} strokeWidth="2.6" strokeLinecap="round" />
      <line x1="0" y1="20" x2={resolvedArmR[0]} y2={resolvedArmR[1]} stroke={INK} strokeWidth="2.6" strokeLinecap="round" />
      <circle cx={resolvedArmL[0]} cy={resolvedArmL[1]} r="2.6" fill="#FFFFFF" stroke={INK} strokeWidth="1.5" />
      <circle cx={resolvedArmR[0]} cy={resolvedArmR[1]} r="2.6" fill="#FFFFFF" stroke={INK} strokeWidth="1.5" />

      <line x1="0" y1="34" x2={resolvedLegL[0]} y2={resolvedLegL[1]} stroke={INK} strokeWidth="2.8" strokeLinecap="round" />
      <line x1="0" y1="34" x2={resolvedLegR[0]} y2={resolvedLegR[1]} stroke={INK} strokeWidth="2.8" strokeLinecap="round" />
      <ellipse cx={resolvedLegL[0] - 2} cy={resolvedLegL[1] + 1.5} rx="4.6" ry="2.5" fill={shoeColor} stroke={INK} strokeWidth="1.3" />
      <ellipse cx={resolvedLegR[0] + 2} cy={resolvedLegR[1] + 1.5} rx="4.6" ry="2.5" fill={shoeColor} stroke={INK} strokeWidth="1.3" />
    </g>
  );
};

export const CircleComicScene: React.FC<CircleComicSceneProps> = ({
  sceneType,
  inkMode = 'full',
}) => {
  const isBw = inkMode === 'bw_worksheet';
  const isLightPrint = inkMode !== 'full';

  const softBg = (hex: string) => (isLightPrint ? '#FFFFFF' : hex);
  const hlBg = (hex: string) => (isLightPrint ? '#F8FAFC' : hex);
  const shadowInk = isLightPrint ? '#E2E8F0' : INK;

  switch (sceneType) {
    /* 00. 원 도감 설명서 */
    case 'circle_guide': {
      const legend = [
        { color: '#2563EB', tag: '기본', rank: '★ N', desc: '지름 · 원의 중심 · 반지름 (3장)' },
        { color: '#D97706', tag: '핵심', rank: '★★★ SR', desc: '반원 나누기 · 가장 긴 선분 (2장)' },
        { color: '#059669', tag: '필살', rank: '★★ R', desc: '2배 공식 · 컴퍼스 · 모양 (3장)' },
        { color: '#7C3AED', tag: '함정', rank: '★★★ SR', desc: '지름 함정 · 반지름 주의 (2장)' },
        { color: '#0F172A', tag: '보스/칭찬', rank: '★★★★ SSR', desc: '3관문 보스 + 마스터 인증 (2장)' },
      ];
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#FFFDF2')} />

          {/* Clean circle + happy Jollaman */}
          <circle cx="46" cy="40" r="24" fill={hlBg('#DBEAFE')} stroke="#2563EB" strokeWidth="2.4" />
          <line x1="22" y1="40" x2="70" y2="40" stroke="#DC2626" strokeWidth="2.2" />
          <circle cx="46" cy="40" r="3.5" fill="#DC2626" />
          <Stickman
            x={82}
            y={30}
            scale={0.68}
            pose="sunglasses"
            armL={[-16, 12]}
            armR={[14, 6]}
            legL={[-8, 44]}
            legR={[8, 44]}
          />

          <text x="166" y="34" textAnchor="middle" className="font-game" fontSize="14.5" fill={INK}>
            원 개념포카 도감!
          </text>
          <text x="166" y="51" textAnchor="middle" className="font-body font-bold" fontSize="8.8" fill="#2563EB">
            3학년 2학기 3단원 (총 13장)
          </text>

          <rect x="12" y="70" width="218" height="23" rx="2" fill={shadowInk} />
          <rect x="10" y="68" width="218" height="23" rx="2" fill={hlBg('#FEF08A')} stroke={INK} strokeWidth="2" />
          <text x="119" y="83.5" textAnchor="middle" className="font-game" fontSize="9.6" fill={INK}>
            기본(01~04) → 성질·컴퍼스(05~10) → 보스·완주(11~12)
          </text>

          <rect x="12" y="102" width="218" height="120" rx="2" fill={shadowInk} />
          <rect x="10" y="100" width="218" height="120" rx="2" fill="#FFFFFF" stroke={INK} strokeWidth="2.2" />
          <text x="20" y="116" className="font-game" fontSize="10" fill={INK}>
            카드 등급표 (표지 1 + 학습·칭찬 12장)
          </text>
          {legend.map((row, idx) => {
            const ry = 135 + idx * 18.2;
            return (
              <g key={row.tag}>
                <rect x="16" y={ry - 7.5} width="8.5" height="8.5" rx="1" fill={row.color} stroke={INK} strokeWidth="1.2" />
                <text x="28" y={ry} className="font-game" fontSize="8.5" fill={row.color}>
                  {row.tag}
                </text>
                <text x="74" y={ry} className="font-mono-num font-bold" fontSize="7.2" fill={INK}>
                  {row.rank}
                </text>
                <text x="118" y={ry} className="font-body font-bold" fontSize="7.8" fill="#475569">
                  {row.desc}
                </text>
              </g>
            );
          })}
        </svg>
      );
    }

    /* 01. 원 알아보기 ① 지름 — 원 하나에 지름 하나! 심플하게! */
    case 'circle_fold_diameter': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#F0F9FF')} />

          <text x="120" y="25" textAnchor="middle" className="font-game" fontSize="13.5" fill="#1D4ED8">
            원을 반으로 딱 접자!
          </text>

          {/* Single large clear circle in the middle */}
          <g transform="translate(120, 108)">
            {/* Top half dashed (being folded down) */}
            <path
              d="M -58 0 A 58 58 0 0 1 58 0"
              fill={hlBg('#FFFFFF')}
              stroke="#64748B"
              strokeWidth="2.2"
              strokeDasharray="5 3"
            />
            {/* Bottom half solid */}
            <path
              d="M -58 0 A 58 58 0 0 0 58 0 Z"
              fill={hlBg('#DBEAFE')}
              stroke={INK}
              strokeWidth="2.8"
            />

            {/* Fold arrow */}
            <path
              d="M -16 -44 Q 4 -34 0 -10"
              fill="none"
              stroke="#2563EB"
              strokeWidth="2.6"
              strokeLinecap="round"
            />
            <path d="M -5 -16 L 0 -8 L 5 -16" fill="none" stroke="#2563EB" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />

            {/* One bold Red Diameter Line ㄱㄴ */}
            <line x1="-58" y1="0" x2="58" y2="0" stroke="#DC2626" strokeWidth="4.4" strokeLinecap="round" />
            <circle cx="-58" cy="0" r="3.5" fill="#DC2626" />
            <circle cx="58" cy="0" r="3.5" fill="#DC2626" />
            <text x="-69" y="5" textAnchor="middle" className="font-game" fontSize="13" fill={INK}>
              ㄱ
            </text>
            <text x="69" y="5" textAnchor="middle" className="font-game" fontSize="13" fill={INK}>
              ㄴ
            </text>

            {/* Jollaman happily sliding/standing along the crease */}
            <Stickman
              x={30}
              y={-26}
              scale={0.58}
              pose="happy"
              armL={[-14, 14]}
              armR={[14, 6]}
              legL={[-8, 44]}
              legR={[8, 44]}
            />

            <text x="0" y="28" textAnchor="middle" className="font-game" fontSize="15.5" fill="#DC2626">
              지름!
            </text>
          </g>

          <text x="120" y="206" textAnchor="middle" className="font-game" fontSize="12" fill="#1E3A8A">
            딱 포개지게 접은 선분 ㄱㄴ = <tspan fill="#DC2626">지름</tspan>!
          </text>
        </svg>
      );
    }

    /* 02. 원 알아보기 ② 원의 중심 — 원 하나에 중심 점 ㅇ 하나! */
    case 'circle_center_point': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#EEF2FF')} />

          <text x="120" y="25" textAnchor="middle" className="font-game" fontSize="13.5" fill="#3730A3">
            두 지름이 딱 만나는 한가운데!
          </text>

          {/* Single clean circle with crossing diameters + ONE bright center dot ㅇ */}
          <g transform="translate(116, 108)">
            <circle cx="0" cy="0" r="60" fill="#FFFFFF" stroke={INK} strokeWidth="2.8" />
            <line x1="-60" y1="0" x2="60" y2="0" stroke="#94A3B8" strokeWidth="2.4" />
            <line x1="0" y1="-60" x2="0" y2="60" stroke="#94A3B8" strokeWidth="2.4" />

            {/* Highlighted center dot ㅇ */}
            <circle cx="0" cy="0" r="7" fill="#DC2626" stroke={INK} strokeWidth="2" />
            <text x="-13" y="18" textAnchor="middle" className="font-game" fontSize="14.5" fill="#DC2626">
              ㅇ
            </text>

            {/* Curved red arrow pointing straight at center ㅇ */}
            <path
              d="M 52 -36 Q 28 -30 11 -11"
              fill="none"
              stroke="#DC2626"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path d="M 10 -18 L 10 -9 L 19 -11" fill="none" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

            {/* Jollaman happily standing beside center pointing right at ㅇ */}
            <Stickman
              x={68}
              y={-22}
              scale={0.72}
              pose="sunglasses"
              armL={[-20, 4]}
              armR={[13, 18]}
              legL={[-8, 44]}
              legR={[8, 44]}
            />
          </g>

          <text x="184" y="64" textAnchor="middle" className="font-game" fontSize="11.5" fill="#DC2626">
            딱 여기!
          </text>

          <text x="120" y="206" textAnchor="middle" className="font-game" fontSize="12" fill="#312E81">
            한가운데 점 ㅇ = <tspan fill="#DC2626">원의 중심</tspan>! (딱 1개!)
          </text>
        </svg>
      );
    }

    /* 03. 원 알아보기 ③ 반지름 — 중심 ㅇ에서 끝까지 쭉! */
    case 'circle_radius_line': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#ECFDF5')} />

          <text x="120" y="25" textAnchor="middle" className="font-game" fontSize="13.5" fill="#047857">
            중심 ㅇ에서 원 끝까지 쭉~
          </text>

          <g transform="translate(106, 108)">
            <circle cx="0" cy="0" r="58" fill="#FFFFFF" stroke={INK} strokeWidth="2.8" />

            {/* Subtle equal dashed radii */}
            <line x1="0" y1="0" x2="-58" y2="0" stroke="#94A3B8" strokeWidth="2" strokeDasharray="4 3" />
            <line x1="0" y1="0" x2="0" y2="-58" stroke="#94A3B8" strokeWidth="2" strokeDasharray="4 3" />

            {/* Main bold green radius ㅇㄱ */}
            <line x1="0" y1="0" x2="58" y2="0" stroke="#059669" strokeWidth="4.4" strokeLinecap="round" />
            <circle cx="58" cy="0" r="3.5" fill="#059669" />

            <circle cx="0" cy="0" r="5.5" fill="#DC2626" stroke={INK} strokeWidth="1.6" />
            <text x="-11" y="15" textAnchor="middle" className="font-game" fontSize="13" fill="#DC2626">
              ㅇ
            </text>
            <text x="69" y="5" textAnchor="middle" className="font-game" fontSize="12.5" fill="#059669">
              ㄱ
            </text>
            <text x="29" y="-10" textAnchor="middle" className="font-game" fontSize="12.5" fill="#059669">
              반지름!
            </text>

            {/* Jollaman stretching arm along the radius */}
            <Stickman
              x={84}
              y={-18}
              scale={0.72}
              pose="happy"
              armL={[-24, 18]}
              armR={[13, 18]}
              legL={[-8, 44]}
              legR={[8, 44]}
            />
          </g>

          <text x="120" y="206" textAnchor="middle" className="font-game" fontSize="11.8" fill="#065F46">
            중심 ㅇ → 테두리까지 = <tspan fill="#059669">반지름</tspan>! (길이 모두 같음)
          </text>
        </svg>
      );
    }

    /* 04. 원 알아보기 · 지름 함정! (중심 ㅇ 안 지나면 땡!) */
    case 'circle_diameter_trap': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#FFF7ED')} />

          <text x="120" y="24" textAnchor="middle" className="font-game" fontSize="13.5" fill="#DC2626">
            중심 ㅇ을 안 지나면 지름 땡!
          </text>

          {/* Left: Non-diameter chord */}
          <g transform="translate(60, 82)">
            <circle cx="0" cy="0" r="38" fill="#FFFFFF" stroke={INK} strokeWidth="2.4" />
            <circle cx="0" cy="0" r="4" fill="#DC2626" />
            <text x="0" y="14" textAnchor="middle" className="font-game" fontSize="10.5" fill="#DC2626">
              ㅇ
            </text>
            <line x1="-33" y1="-19" x2="33" y2="-19" stroke="#DC2626" strokeWidth="3.4" strokeLinecap="round" />
            {/* Big red X */}
            <line x1="-10" y1="-29" x2="10" y2="-9" stroke="#DC2626" strokeWidth="3.2" strokeLinecap="round" />
            <line x1="10" y1="-29" x2="-10" y2="-9" stroke="#DC2626" strokeWidth="3.2" strokeLinecap="round" />
          </g>
          <Stickman x={60} y={142} scale={0.7} pose="crying" sweat />
          <text x="60" y="191" textAnchor="middle" className="font-game" fontSize="11.5" fill="#DC2626">
            ✕ 중심 통과 안 함!
          </text>

          <line x1="120" y1="38" x2="120" y2="195" stroke="#FED7AA" strokeWidth="2.2" strokeDasharray="4 3" />

          {/* Right: True diameter through center ㅇ */}
          <g transform="translate(180, 82)">
            <circle cx="0" cy="0" r="38" fill="#FFFFFF" stroke={INK} strokeWidth="2.4" />
            <line x1="-32" y1="-20" x2="32" y2="20" stroke="#059669" strokeWidth="3.8" strokeLinecap="round" />
            <circle cx="0" cy="0" r="4.5" fill="#DC2626" stroke={INK} strokeWidth="1.2" />
            <text x="-9" y="12" textAnchor="middle" className="font-game" fontSize="10.5" fill="#DC2626">
              ㅇ
            </text>
            <circle cx="24" cy="-24" r="9" fill="none" stroke="#16A34A" strokeWidth="2.6" />
          </g>
          <Stickman x={180} y={142} scale={0.7} pose="sunglasses" armL={[-14, 18]} armR={[14, 6]} />
          <text x="180" y="191" textAnchor="middle" className="font-game" fontSize="11.5" fill="#059669">
            ○ 중심 통과 = 지름!
          </text>

          <text x="120" y="216" textAnchor="middle" className="font-game" fontSize="11.5" fill={INK}>
            원 위 두 점을 잇고 <tspan fill="#DC2626">중심 ㅇ</tspan>을 지나야 진짜 지름!
          </text>
        </svg>
      );
    }

    /* 05. 원의 성질 ① 둘로 나누기 */
    case 'circle_prop_half': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#FFFBEB')} />

          <text x="120" y="25" textAnchor="middle" className="font-game" fontSize="13.5" fill="#B45309">
            지름대로 자르면 정확히 반!
          </text>

          {/* Left semicircle */}
          <g transform="translate(106, 102)">
            <path
              d="M 0 -52 A 52 52 0 0 0 0 52 Z"
              fill={hlBg('#FEF08A')}
              stroke={INK}
              strokeWidth="2.6"
            />
            <line x1="0" y1="-52" x2="0" y2="52" stroke="#DC2626" strokeWidth="3.4" />
            <text x="-23" y="5" textAnchor="middle" className="font-game" fontSize="12" fill={INK}>
              반원
            </text>
          </g>

          {/* Right semicircle */}
          <g transform="translate(134, 102)">
            <path
              d="M 0 -52 A 52 52 0 0 1 0 52 Z"
              fill={hlBg('#DBEAFE')}
              stroke={INK}
              strokeWidth="2.6"
            />
            <line x1="0" y1="-52" x2="0" y2="52" stroke="#DC2626" strokeWidth="3.4" />
            <text x="23" y="5" textAnchor="middle" className="font-game" fontSize="12" fill={INK}>
              반원
            </text>
          </g>

          <text x="120" y="108" textAnchor="middle" className="font-game" fontSize="22" fill="#DC2626">
            =
          </text>

          <Stickman x={34} y={118} scale={0.74} pose="happy" armL={[-13, 18]} armR={[17, 6]} />
          <Stickman x={206} y={118} scale={0.74} pose="sunglasses" armL={[-17, 6]} armR={[13, 18]} />

          <text x="120" y="198" textAnchor="middle" className="font-game" fontSize="12.5" fill="#DC2626">
            양쪽 크기와 모양이 100% 똑같아!
          </text>
          <text x="120" y="216" textAnchor="middle" className="font-body font-bold" fontSize="9.2" fill={INK}>
            지름은 원을 똑같이 둘로 나눈다!
          </text>
        </svg>
      );
    }

    /* 06. 원의 성질 ② 가장 긴 선분 */
    case 'circle_prop_longest': {
      const chords = [
        { dx: -40, color: '#CBD5E1' },
        { dx: -22, color: '#94A3B8' },
        { dx: 0, color: '#DC2626' },
        { dx: 22, color: '#94A3B8' },
        { dx: 40, color: '#CBD5E1' },
      ];
      const R = 56;
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#FFFBEB')} />

          <text x="120" y="24" textAnchor="middle" className="font-game" fontSize="13.5" fill="#B45309">
            원 안에서 제일 긴 선분 = 지름!
          </text>

          <g transform="translate(106, 108)">
            <circle cx="0" cy="0" r={R} fill="#FFFFFF" stroke={INK} strokeWidth="2.8" />
            {chords.map((c) => {
              const halfH = Math.sqrt(Math.max(0, R * R - c.dx * c.dx));
              const isCenter = c.dx === 0;
              return (
                <line
                  key={c.dx}
                  x1={c.dx}
                  y1={-halfH}
                  x2={c.dx}
                  y2={halfH}
                  stroke={c.color}
                  strokeWidth={isCenter ? 4.4 : 2.2}
                />
              );
            })}
            <circle cx="0" cy="0" r="4.5" fill="#DC2626" stroke={INK} strokeWidth="1.4" />
            {/* Gold crown at top of center diameter */}
            <polygon
              points="-10,-60 -9,-71 -4,-64 0,-73 4,-64 9,-71 10,-60"
              fill="#FACC15"
              stroke={INK}
              strokeWidth="1.5"
            />
          </g>

          {/* Jollaman pointing proudly at center diameter */}
          <Stickman x={196} y={100} scale={0.82} pose="sunglasses" armL={[-20, 6]} armR={[13, 20]} />
          <text x="196" y="72" textAnchor="middle" className="font-game" fontSize="11.5" fill="#DC2626">
            센터가 1등!
          </text>

          <text x="120" y="198" textAnchor="middle" className="font-game" fontSize="12" fill="#DC2626">
            중심 ㅇ을 지나는 지름이 길이 1등 대장!
          </text>
          <text x="120" y="216" textAnchor="middle" className="font-body font-bold" fontSize="9.2" fill={INK}>
            가장자리로 갈수록 선분이 짧아진다!
          </text>
        </svg>
      );
    }

    /* 07. 원의 성질 ③ 반지름의 2배 */
    case 'circle_prop_double': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#ECFDF5')} />

          <text x="120" y="24" textAnchor="middle" className="font-game" fontSize="13.5" fill="#047857">
            지름 = 반지름 × 2!
          </text>

          <g transform="translate(120, 96)">
            <circle cx="0" cy="0" r="54" fill="#FFFFFF" stroke={INK} strokeWidth="2.6" />
            <line x1="-54" y1="0" x2="0" y2="0" stroke="#059669" strokeWidth="4.2" />
            <line x1="0" y1="0" x2="54" y2="0" stroke="#2563EB" strokeWidth="4.2" />
            <circle cx="0" cy="0" r="4" fill="#DC2626" />

            <Stickman
              x={0}
              y={-18}
              scale={0.62}
              pose="strain"
              armL={[-38, 18]}
              armR={[38, 18]}
              legL={[-8, 42]}
              legR={[8, 42]}
              sweat
            />

            <text x="-31" y="-14" textAnchor="middle" className="font-game" fontSize="9.8" fill="#059669">
              반지름 4
            </text>
            <text x="31" y="-14" textAnchor="middle" className="font-game" fontSize="9.8" fill="#2563EB">
              반지름 4
            </text>

            {/* Red bracket for full diameter */}
            <path d="M -54 16 V 24 H 54 V 16" fill="none" stroke="#DC2626" strokeWidth="2.4" />
            <text x="0" y="40" textAnchor="middle" className="font-game" fontSize="13" fill="#DC2626">
              지름 = 8!
            </text>
          </g>

          <text x="66" y="186" textAnchor="middle" className="font-game" fontSize="11.5" fill="#DC2626">
            지름 = 반지름 × 2
          </text>
          <text x="120" y="186" textAnchor="middle" className="font-game" fontSize="12" fill="#94A3B8">
            |
          </text>
          <text x="174" y="186" textAnchor="middle" className="font-game" fontSize="11.5" fill="#059669">
            반지름 = 지름 ÷ 2
          </text>

          <text x="120" y="212" textAnchor="middle" className="font-body font-bold" fontSize="9.2" fill={INK}>
            반지름 2개가 나란히 만나면 지름!
          </text>
        </svg>
      );
    }

    /* 08. 컴퍼스로 원 그리기 (심플 1-2-3 + 다리찢기 몸개그) */
    case 'circle_compass_steps': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#ECFDF5')} />

          <text x="120" y="24" textAnchor="middle" className="font-game" fontSize="13.5" fill="#047857">
            컴퍼스로 원 그리기 3단계!
          </text>

          {/* Step 1: Center dot */}
          <text x="36" y="54" textAnchor="middle" className="font-game" fontSize="11.5" fill="#059669">
            ① 중심 찍기
          </text>
          <circle cx="36" cy="96" r="5.5" fill="#DC2626" stroke={INK} strokeWidth="1.5" />
          <Stickman x={36} y={76} scale={0.45} pose="headband" armL={[-10, 14]} armR={[10, 14]} legL={[-7, 36]} legR={[7, 36]} />
          <text x="36" y="138" textAnchor="middle" className="font-game" fontSize="10" fill={INK}>
            중심 ㅇ 콕!
          </text>

          <path d="M 62 92 L 73 92" stroke="#059669" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M 69 88 L 74 92 L 69 96" fill="none" stroke="#059669" strokeWidth="2.4" strokeLinecap="round" />

          {/* Step 2: Compass spread (Jollaman leg split!) */}
          <text x="110" y="54" textAnchor="middle" className="font-game" fontSize="11.5" fill="#2563EB">
            ② 반지름 벌림
          </text>
          <line x1="110" y1="68" x2="88" y2="118" stroke="#0284C7" strokeWidth="3" strokeLinecap="round" />
          <line x1="110" y1="68" x2="132" y2="118" stroke="#0284C7" strokeWidth="3" strokeLinecap="round" />
          <circle cx="110" cy="68" r="4" fill="#FACC15" stroke={INK} strokeWidth="1.4" />
          <Stickman
            x={110}
            y={94}
            scale={0.44}
            pose="strain"
            armL={[-16, 12]}
            armR={[16, 12]}
            legL={[-21, 34]}
            legR={[21, 34]}
            sweat
          />
          <line x1="88" y1="124" x2="132" y2="124" stroke="#DC2626" strokeWidth="2.2" strokeDasharray="3 2" />
          <text x="110" y="139" textAnchor="middle" className="font-game" fontSize="10" fill="#DC2626">
            다리찢기!
          </text>

          <path d="M 142 92 L 153 92" stroke="#059669" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M 149 88 L 154 92 L 149 96" fill="none" stroke="#059669" strokeWidth="2.4" strokeLinecap="round" />

          {/* Step 3: Spin on needle */}
          <text x="194" y="54" textAnchor="middle" className="font-game" fontSize="11.5" fill="#DC2626">
            ③ 침 고정 휙!
          </text>
          <ellipse cx="188" cy="118" rx="28" ry="13" fill="none" stroke="#DC2626" strokeWidth="2.5" />
          <circle cx="188" cy="118" r="3" fill={INK} />
          <line x1="194" y1="66" x2="188" y2="118" stroke="#0284C7" strokeWidth="3" strokeLinecap="round" />
          <line x1="194" y1="66" x2="215" y2="116" stroke="#EA580C" strokeWidth="3.2" strokeLinecap="round" />
          <circle cx="194" cy="66" r="4" fill="#FACC15" stroke={INK} strokeWidth="1.5" />
          <Stickman
            x={222}
            y={86}
            scale={0.48}
            rotate={12}
            pose="happy"
            armL={[-20, 8]}
            armR={[-17, 18]}
            legL={[-9, 42]}
            legR={[4, 44]}
          />
          <text x="194" y="144" textAnchor="middle" className="font-game" fontSize="10" fill="#DC2626">
            한 바퀴 돌려!
          </text>

          <line x1="16" y1="166" x2="224" y2="166" stroke="#A7F3D0" strokeWidth="2" strokeDasharray="4 3" />
          <text x="120" y="190" textAnchor="middle" className="font-game" fontSize="11.5" fill="#DC2626">
            중심 침이 흔들리면 찌그러진 타원 돼!
          </text>
          <text x="120" y="210" textAnchor="middle" className="font-body font-bold" fontSize="9.2" fill={INK}>
            침은 중심에 꾹 고정하고, 연필 다리만 한 바퀴 휙!
          </text>
        </svg>
      );
    }

    /* 09. 컴퍼스 주의! 반지름만큼! */
    case 'circle_compass_trap': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#FFF7ED')} />

          <text x="120" y="24" textAnchor="middle" className="font-game" fontSize="13.5" fill="#EA580C">
            미션: 지름 6cm 원을 그려라!
          </text>

          {/* Left: Wrong 6cm spread -> 12cm */}
          <text x="60" y="50" textAnchor="middle" className="font-game" fontSize="11" fill="#DC2626">
            ✕ 6cm 벌리면?
          </text>
          <circle cx="60" cy="96" r="38" fill="#FEE2E2" stroke="#DC2626" strokeWidth="2.4" strokeDasharray="4 2" />
          <text x="60" y="92" textAnchor="middle" className="font-game" fontSize="11.5" fill="#DC2626">
            지름 12cm!!
          </text>
          <text x="60" y="108" textAnchor="middle" className="font-game" fontSize="9.5" fill={INK}>
            너무 커졌어!
          </text>
          <Stickman x={60} y={148} scale={0.68} rotate={-10} pose="crying" sweat />

          <line x1="120" y1="38" x2="120" y2="195" stroke="#FED7AA" strokeWidth="2.2" strokeDasharray="4 3" />

          {/* Right: Correct 3cm spread -> 6cm */}
          <text x="180" y="50" textAnchor="middle" className="font-game" fontSize="11" fill="#059669">
            ○ 3cm 벌리면?
          </text>
          <circle cx="180" cy="96" r="24" fill="#ECFDF5" stroke="#059669" strokeWidth="2.6" />
          <line x1="180" y1="96" x2="204" y2="96" stroke="#059669" strokeWidth="2.6" />
          <circle cx="180" cy="96" r="3.2" fill="#DC2626" />
          <text x="180" y="88" textAnchor="middle" className="font-game" fontSize="9.5" fill="#047857">
            반지름 3
          </text>
          <text x="180" y="134" textAnchor="middle" className="font-game" fontSize="11" fill="#059669">
            딱 지름 6cm!
          </text>
          <Stickman x={180} y={148} scale={0.68} pose="sunglasses" armL={[-13, 20]} armR={[15, 6]} />

          <text x="120" y="214" textAnchor="middle" className="font-game" fontSize="11.8" fill={INK}>
            컴퍼스는 무조건 <tspan fill="#059669">반지름</tspan>(지름의 반)만큼 벌리기!
          </text>
        </svg>
      );
    }

    /* 10. 원으로 모양 그리기 */
    case 'circle_pattern_flower': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#ECFDF5')} />

          <text x="120" y="24" textAnchor="middle" className="font-game" fontSize="13.5" fill="#047857">
            꼭짓점 4곳에 침 꽂아 꽃 그리기!
          </text>

          {/* Left: Pattern */}
          <text x="54" y="48" textAnchor="middle" className="font-game" fontSize="10.5" fill={INK}>
            주어진 모양
          </text>
          <g transform="translate(24, 58)">
            <rect x="0" y="0" width="60" height="60" fill="#FFFFFF" stroke={INK} strokeWidth="2.2" />
            <path d="M 30 0 A 30 30 0 0 1 0 30" fill="none" stroke={INK} strokeWidth="2.2" />
            <path d="M 30 0 A 30 30 0 0 0 60 30" fill="none" stroke={INK} strokeWidth="2.2" />
            <path d="M 0 30 A 30 30 0 0 1 30 60" fill="none" stroke={INK} strokeWidth="2.2" />
            <path d="M 60 30 A 30 30 0 0 0 30 60" fill="none" stroke={INK} strokeWidth="2.2" />
          </g>

          <path d="M 94 88 L 114 88" stroke="#059669" strokeWidth="2.8" strokeLinecap="round" />
          <path d="M 108 83 L 115 88 L 108 93" fill="none" stroke="#059669" strokeWidth="2.8" strokeLinecap="round" />

          {/* Right: 4 red centers + compass */}
          <text x="164" y="48" textAnchor="middle" className="font-game" fontSize="10.5" fill="#DC2626">
            중심 4곳 찾기!
          </text>
          <g transform="translate(134, 58)">
            <rect x="0" y="0" width="58" height="58" fill="#FFFFFF" stroke={INK} strokeWidth="2" />
            {[
              [0, 0],
              [58, 0],
              [0, 58],
              [58, 58],
            ].map(([cx, cy], idx) => (
              <g key={idx}>
                <circle
                  cx={cx}
                  cy={cy}
                  r="29"
                  fill="none"
                  stroke="#94A3B8"
                  strokeWidth="1.3"
                  strokeDasharray="3 2"
                />
                <circle cx={cx} cy={cy} r="4.2" fill="#DC2626" stroke="#FFFFFF" strokeWidth="1" />
              </g>
            ))}
            <path d="M 29 0 A 29 29 0 0 1 0 29" fill="none" stroke={INK} strokeWidth="2" />
            <path d="M 29 0 A 29 29 0 0 0 58 29" fill="none" stroke={INK} strokeWidth="2" />
            <path d="M 0 29 A 29 29 0 0 1 29 58" fill="none" stroke={INK} strokeWidth="2" />
            <path d="M 58 29 A 29 29 0 0 0 29 58" fill="none" stroke={INK} strokeWidth="2" />

            <line x1="66" y1="-22" x2="58" y2="0" stroke="#0284C7" strokeWidth="2.4" />
            <line x1="66" y1="-22" x2="82" y2="0" stroke="#EA580C" strokeWidth="2.4" />
            <circle cx="66" cy="-22" r="3.5" fill="#FACC15" stroke={INK} strokeWidth="1.4" />
          </g>
          <Stickman x={218} y={84} scale={0.46} pose="headband" armL={[-20, 12]} armR={[10, 18]} />

          <Stickman x={34} y={160} scale={0.74} pose="happy" armL={[-13, 20]} armR={[15, 6]} />
          <text x="142" y="164" textAnchor="middle" className="font-game" fontSize="11.2" fill="#DC2626">
            ① 중심(꼭짓점 4곳) · 원 개수 찾기
          </text>
          <text x="142" y="185" textAnchor="middle" className="font-game" fontSize="11.2" fill="#2563EB">
            ② 반지름(한 변의 반)만큼 벌리기
          </text>
          <text x="142" y="206" textAnchor="middle" className="font-game" fontSize="11.2" fill="#059669">
            ③ 중심마다 침 꽂아 돌려 그리기!
          </text>
        </svg>
      );
    }

    /* 11. 최종 보스! 원 총정리 퀴즈 */
    case 'circle_boss': {
      const darkBg = isLightPrint ? '#FFFFFF' : '#0F172A';
      const goldText = isBw ? INK : '#FACC15';
      const quizzes = [
        '1. 반지름 5cm → 지름은? ( 10cm )',
        '2. 지름 12cm 그릴 때 컴퍼스? ( 6cm )',
        '3. 한 변 8cm 상자 원 반지름? ( 4cm )',
      ];
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={darkBg} />

          <path
            d="M 8 22 V 8 H 22 M 218 8 H 232 V 22 M 8 208 V 222 H 22 M 218 222 H 232 V 208"
            fill="none"
            stroke={goldText}
            strokeWidth="2.4"
          />

          <text x="120" y="28" textAnchor="middle" className="font-game" fontSize="13" fill={goldText}>
            최종 보스! 원 3관문 퀴즈
          </text>

          {quizzes.map((q, idx) => {
            const qy = 42 + idx * 34;
            return (
              <g key={q}>
                <rect x="16" y={qy} width="208" height="27" rx="4" fill="#FFFFFF" stroke="#FACC15" strokeWidth="2.2" />
                <text x="120" y={qy + 17.5} textAnchor="middle" className="font-game" fontSize="10.4" fill={INK}>
                  {q}
                </text>
              </g>
            );
          })}

          <Stickman x={44} y={168} scale={0.82} pose="hero" armL={[-13, 24]} armR={[15, 10]} />

          <text x="144" y="176" textAnchor="middle" className="font-game" fontSize="11.2" fill={goldText}>
            컴퍼스는 무조건 반지름!
          </text>
          <text x="144" y="198" textAnchor="middle" className="font-game" fontSize="11.2" fill={isBw ? INK : '#FCA5A5'}>
            3관문 돌파하면 원 마스터!
          </text>
        </svg>
      );
    }

    /* 13. 원 마스터 완주 칭찬 포카 */
    case 'circle_praise':
    default: {
      const darkBg = isLightPrint ? '#FFFFFF' : '#0F172A';
      const goldText = isBw ? INK : '#FACC15';
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
            원 마스터 완주 축하!!
          </text>

          <Stickman x={66} y={76} scale={0.85} pose="hero" armL={[-16, 10]} armR={[16, 10]} />

          <g transform="translate(154, 82)">
            <path d="M -22 -18 H 22 L 15 10 Q 0 18 -15 10 Z" fill="#FACC15" stroke={INK} strokeWidth="2" />
            <text x="0" y="-1" textAnchor="middle" className="font-game" fontSize="11.5" fill={INK}>
              원 마스터
            </text>
            <rect x="-4" y="13" width="8" height="10" fill="#FACC15" stroke={INK} strokeWidth="1.5" />
            <rect x="-15" y="23" width="30" height="7" rx="1.5" fill="#FFFFFF" stroke={INK} strokeWidth="1.5" />
          </g>

          <rect x="20" y="134" width="204" height="58" rx="4" fill={shadowInk} />
          <rect x="17" y="131" width="204" height="58" rx="4" fill="#FFFFFF" stroke="#FACC15" strokeWidth="2.2" />
          <text x="119" y="149" textAnchor="middle" className="font-game" fontSize="11.5" fill="#1D4ED8">
            원 개념포카 13장 올 클리어!
          </text>
          <text x="119" y="166" textAnchor="middle" className="font-body font-bold" fontSize="9.2" fill={INK}>
            중심·반지름·지름·컴퍼스 완벽 정복!
          </text>
          <text x="119" y="182" textAnchor="middle" className="font-game" fontSize="9.5" fill="#DC2626">
            ★ 졸라수학맨 공식 원 마스터 인증 ★
          </text>

          <text x="120" y="212" textAnchor="middle" className="font-game" fontSize="11" fill={goldText}>
            완벽한 동그라미 마스터 탄생!!
          </text>
        </svg>
      );
    }
  }
};
