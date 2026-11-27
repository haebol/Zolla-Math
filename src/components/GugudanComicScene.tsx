import React from 'react';
import { EpisodeSceneType, PrintInkMode } from '../types/card';

interface GugudanComicSceneProps {
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
  | 'crying'
  | 'surprised'
  | 'headband'
  | 'hero'
  | 'panic'
  | 'headphones'
  | 'upside_down'
  | 'astronaut'
  | 'panic_headband'
  | 'highkick'
  | 'chef_spicy';

const Stickman: React.FC<{
  x: number;
  y: number;
  scale?: number;
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
  pose = 'sunglasses',
  armL,
  armR,
  legL,
  legR,
  sweat = false,
}) => {
  const headR = 13.5;
  const isHero = pose === 'hero';
  const isUpsideDown = pose === 'upside_down';
  const isAstronaut = pose === 'astronaut';
  const isChef = pose === 'chef_spicy';
  const isHeadphones = pose === 'headphones';
  const isHighkick = pose === 'highkick';
  const hasHeadband =
    pose === 'headband' ||
    isHero ||
    isUpsideDown ||
    pose === 'panic_headband' ||
    isHighkick;
  const showSweat = sweat || isHighkick;

  const resolvedArmL: [number, number] =
    armL ??
    (pose === 'panic_headband'
      ? [-16, -5]
      : isHeadphones
        ? [-16, 26]
        : isHighkick
          ? [-18, 12]
          : isAstronaut
            ? [-16, 4]
            : isUpsideDown
              ? [-16, 22]
              : [-14, 24]);
  const resolvedArmR: [number, number] =
    armR ??
    (pose === 'panic_headband'
      ? [16, -5]
      : isHeadphones
        ? [15, -3]
        : isHighkick
          ? [16, 8]
          : isAstronaut
            ? [16, 4]
            : isUpsideDown
              ? [16, 22]
              : [14, 10]);
  const resolvedLegL: [number, number] =
    legL ??
    (isHighkick
      ? [-5, 50]
      : isUpsideDown
        ? [-12, 48]
        : [-9, 50]);
  const resolvedLegR: [number, number] =
    legR ??
    (isHighkick
      ? [22, 16]
      : isUpsideDown
        ? [12, 48]
        : [9, 50]);

  const shoeColor = isAstronaut
    ? '#38BDF8'
    : isChef
      ? '#FB923C'
      : isUpsideDown
        ? '#1E293B'
        : '#EF4444';

  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      <g transform={isUpsideDown ? 'rotate(180, 0, 19)' : undefined}>
        {/* Red Hero Cape */}
        {isHero && (
          <path
            d="M -2 15 L -18 42 L 18 42 L 2 15 Z"
            fill="#EF4444"
            stroke={INK}
            strokeWidth="2"
            strokeLinejoin="round"
          />
        )}

        {/* Astronaut Space Pack (behind torso) */}
        {isAstronaut && (
          <rect
            x="-11.5"
            y="14"
            width="23"
            height="22"
            rx="6"
            fill="#E2E8F0"
            stroke={INK}
            strokeWidth="2"
          />
        )}

        {/* Headband Fluttering Tail (under/beside head) */}
        {hasHeadband && (
          <path
            d={
              isUpsideDown
                ? `M ${-headR + 1} -5 Q ${-headR - 7} -10 ${-headR - 11} -2`
                : `M ${-headR + 1} -6 L ${-headR - 8} -9 Q ${-headR - 11} -6 ${-headR - 9} -2`
            }
            fill="none"
            stroke="#EF4444"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
        )}

        {/* Chef Steam Puffs (left & right outside head) */}
        {isChef && (
          <g>
            <circle cx="-19" cy="-2" r="5" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="1.5" />
            <circle cx="19" cy="-2" r="5" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="1.5" />
          </g>
        )}

        {/* White Head (Blushed pink for spicy chef) */}
        <circle
          cx="0"
          cy="0"
          r={headR}
          fill={isChef ? '#FECDD3' : '#FFFFFF'}
          stroke={INK}
          strokeWidth="2.8"
        />

        {/* Loop Hair (omitted when wearing chef toque or headphones) */}
        {!isChef && !isHeadphones && !isAstronaut && <LoopHair x={0} y={-headR} />}

        {/* Chef Toque Hat */}
        {isChef && (
          <g>
            <path
              d="M -10 -12 C -14 -21 -6 -27 0 -24 C 6 -27 14 -21 10 -12 Z"
              fill="#FFFFFF"
              stroke={INK}
              strokeWidth="2.2"
              strokeLinejoin="round"
            />
            <line x1="-8" y1="-12" x2="8" y2="-12" stroke={INK} strokeWidth="2" />
          </g>
        )}

        {/* Blue Headphones */}
        {isHeadphones && (
          <g>
            <path
              d={`M ${-headR - 1} -2 A ${headR + 1} ${headR + 1} 0 0 1 ${headR + 1} -2`}
              fill="none"
              stroke="#0284C7"
              strokeWidth="3.2"
              strokeLinecap="round"
            />
            <rect x={-headR - 4} y="-5" width="6.2" height="11.5" rx="3" fill="#0EA5E9" stroke={INK} strokeWidth="1.8" />
            <rect x={headR - 2.2} y="-5" width="6.2" height="11.5" rx="3" fill="#0EA5E9" stroke={INK} strokeWidth="1.8" />
          </g>
        )}

        {/* Astronaut Space Helmet */}
        {isAstronaut && (
          <g>
            <circle
              cx="0"
              cy="0"
              r={headR + 4.8}
              fill="#60A5FA"
              fillOpacity="0.28"
              stroke="#0284C7"
              strokeWidth="2.6"
            />
            <path
              d="M -10 -10 A 13.5 13.5 0 0 1 -1 -14"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
          </g>
        )}

        {/* Red Headband */}
        {hasHeadband && (
          <path
            d={`M ${-headR + 0.5} -5.5 Q 0 -3.5 ${headR - 0.5} -5.5`}
            fill="none"
            stroke="#EF4444"
            strokeWidth="3.6"
            strokeLinecap="round"
          />
        )}

        {/* Sweat Drop */}
        {showSweat && (
          <path
            d="M 14 -10 Q 17 -6 15 -2 Q 12 -3 14 -10 Z"
            fill="#38BDF8"
            stroke={INK}
            strokeWidth="1.2"
          />
        )}

        {/* Facial Expression */}
        {pose === 'sunglasses' && (
          <g>
            <rect x="-10" y="-4.5" width="9" height="5.2" rx="1.2" fill={INK} />
            <rect x="1" y="-4.5" width="9" height="5.2" rx="1.2" fill={INK} />
            <line x1="-1" y1="-2" x2="1" y2="-2" stroke={INK} strokeWidth="1.6" />
            <path d="M -4.5 5.5 Q 0 8.5 4.5 5.5" fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" />
          </g>
        )}
        {(pose === 'happy' || isAstronaut) && (
          <g>
            <circle cx="-4.8" cy="-2.5" r="1.9" fill={INK} />
            <circle cx="4.8" cy="-2.5" r="1.9" fill={INK} />
            <path d="M -4.5 4.5 Q 0 8.5 4.5 4.5" fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" />
          </g>
        )}
        {isHeadphones && (
          <g>
            <path d="M -7.5 -2.5 Q -4.8 -6 -2.2 -2.5" fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" />
            <path d="M 2.2 -2.5 Q 4.8 -6 7.5 -2.5" fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" />
            <ellipse cx="0" cy="5" rx="3.4" ry="3" fill="#EF4444" stroke={INK} strokeWidth="1.6" />
          </g>
        )}
        {pose === 'crying' && (
          <g>
            <path d="M -7.5 -4.5 L -3.5 -2 L -7.5 0.5" fill="none" stroke={INK} strokeWidth="1.9" strokeLinecap="round" />
            <path d="M 7.5 -4.5 L 3.5 -2 L 7.5 0.5" fill="none" stroke={INK} strokeWidth="1.9" strokeLinecap="round" />
            <path d="M -7 1 L -10 8" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 7 1 L 10 8" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M -4 7 Q 0 4 4 7" fill="none" stroke={INK} strokeWidth="1.8" strokeLinecap="round" />
          </g>
        )}
        {(pose === 'surprised' || pose === 'panic' || pose === 'panic_headband') && (
          <g>
            <circle cx="-5" cy="-2" r="3" fill="#FFFFFF" stroke={INK} strokeWidth="1.7" />
            <circle cx="-5" cy="-2" r="1.1" fill={INK} />
            <circle cx="5" cy="-2" r="3" fill="#FFFFFF" stroke={INK} strokeWidth="1.7" />
            <circle cx="5" cy="-2" r="1.1" fill={INK} />
            <ellipse cx="0" cy="6" rx="3.3" ry="4.1" fill="#EF4444" stroke={INK} strokeWidth="1.6" />
          </g>
        )}
        {(pose === 'headband' || isHero || isHighkick) && (
          <g>
            <line x1="-8" y1="-2" x2="-2" y2="-0.5" stroke={INK} strokeWidth="2" strokeLinecap="round" />
            <line x1="8" y1="-2" x2="2" y2="-0.5" stroke={INK} strokeWidth="2" strokeLinecap="round" />
            <circle cx="-4.8" cy="1" r="1.7" fill={INK} />
            <circle cx="4.8" cy="1" r="1.7" fill={INK} />
            <path
              d={isHighkick ? 'M -4 5.5 Q 1 8.5 5 4.2' : 'M -3.5 7 Q 0 4.5 3.5 7'}
              fill="none"
              stroke={INK}
              strokeWidth="1.9"
              strokeLinecap="round"
            />
          </g>
        )}
        {isUpsideDown && (
          <g>
            <path d="M -7 -2 L -2.5 2.5 M -2.5 -2 L -7 2.5" stroke={INK} strokeWidth="2" strokeLinecap="round" />
            <path d="M 2.5 -2 L 7 2.5 M 7 -2 L 2.5 2.5" stroke={INK} strokeWidth="2" strokeLinecap="round" />
            <ellipse cx="0" cy="8" rx="3.4" ry="2.6" fill="#EF4444" stroke={INK} strokeWidth="1.6" />
          </g>
        )}
        {isChef && (
          <g>
            <path d="M -7.5 -4 L -3 -1.5 L -7.5 1" fill="none" stroke={INK} strokeWidth="1.9" strokeLinecap="round" />
            <path d="M 7.5 -4 L 3 -1.5 L 7.5 1" fill="none" stroke={INK} strokeWidth="1.9" strokeLinecap="round" />
            <ellipse cx="0" cy="6" rx="3.4" ry="3.2" fill="#EF4444" stroke={INK} strokeWidth="1.6" />
            {/* Flame puff */}
            <polygon points="4,5 21,0 14,6 22,10 4,8" fill="#F97316" stroke="#DC2626" strokeWidth="1.1" strokeLinejoin="round" />
          </g>
        )}

        {/* Body & Limbs */}
        <line x1="0" y1={headR} x2="0" y2="34" stroke={INK} strokeWidth="3.2" strokeLinecap="round" />
        <line x1="0" y1="20" x2={resolvedArmL[0]} y2={resolvedArmL[1]} stroke={INK} strokeWidth="2.6" strokeLinecap="round" />
        <line x1="0" y1="20" x2={resolvedArmR[0]} y2={resolvedArmR[1]} stroke={INK} strokeWidth="2.6" strokeLinecap="round" />
        <circle cx={resolvedArmL[0]} cy={resolvedArmL[1]} r="2.6" fill="#FFFFFF" stroke={INK} strokeWidth="1.5" />
        <circle cx={resolvedArmR[0]} cy={resolvedArmR[1]} r="2.6" fill="#FFFFFF" stroke={INK} strokeWidth="1.5" />

        {/* Chef Apron */}
        {isChef && (
          <polygon
            points="-5.5,18 5.5,18 8.5,35 -8.5,35"
            fill="#FFFFFF"
            stroke={INK}
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        )}

        <line x1="0" y1="34" x2={resolvedLegL[0]} y2={resolvedLegL[1]} stroke={INK} strokeWidth="2.8" strokeLinecap="round" />
        <line x1="0" y1="34" x2={resolvedLegR[0]} y2={resolvedLegR[1]} stroke={INK} strokeWidth="2.8" strokeLinecap="round" />
        <ellipse cx={resolvedLegL[0] - 2} cy={resolvedLegL[1] + 1.5} rx="4.6" ry="2.5" fill={shoeColor} stroke={INK} strokeWidth="1.3" />
        <ellipse
          cx={resolvedLegR[0] + (isHighkick ? 1 : 2)}
          cy={resolvedLegR[1] + (isHighkick ? -1 : 1.5)}
          rx="4.6"
          ry="2.5"
          fill={isHighkick ? '#FACC15' : shoeColor}
          stroke={INK}
          strokeWidth="1.3"
        />
      </g>
    </g>
  );
};

export const GugudanComicScene: React.FC<GugudanComicSceneProps> = ({
  sceneType,
  inkMode = 'full',
}) => {
  const isBw = inkMode === 'bw_worksheet';
  const isLightPrint = inkMode !== 'full';

  const softBg = (hex: string) => (isLightPrint ? '#FFFFFF' : hex);
  const hlBg = (hex: string) => (isLightPrint ? '#F8FAFC' : hex);

  switch (sceneType) {
    /* 00. 구구단 도감 설명서 */
    case 'gugudan_guide': {
      const legend = [
        { color: '#D97706', tag: '핵심', rank: '★★★ SR', desc: '곱셈의 뜻 · 원리 · 곱셈표 (3장)' },
        { color: '#2563EB', tag: '기본', rank: '★ N', desc: '2·3·5단 리듬 기본기 (3장)' },
        { color: '#059669', tag: '필살', rank: '★★ R', desc: '4·6·7·8·9단 꿀팁 공략 (5장)' },
        { color: '#7C3AED', tag: '함정/도전', rank: '★★★ SR', desc: '0·1 블랙홀 · 치트키 · 대결 (4장)' },
        { color: '#0F172A', tag: '보스/칭찬', rank: '★★★★ SSR', desc: '마의 4대장 + 완주 포카 (2장)' },
      ];
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#FFFDF2')} />

          {/* Starburst + Headband Jollaman */}
          <g transform="translate(38, 36)">
            <polygon
              points="0,-24 6,-10 22,-16 12,-2 24,8 8,8 10,22 0,11 -11,22 -9,8 -24,8 -12,-2 -22,-16 -6,-10"
              fill={hlBg('#FEF08A')}
            />
            <Stickman
              x={0}
              y={-6}
              scale={0.78}
              pose="headband"
              armL={[-15, 16]}
              armR={[17, 10]}
              legL={[-10, 44]}
              legR={[10, 44]}
            />
          </g>

          {/* Diagonal Punch Badges */}
          <g transform="translate(96, 12) rotate(-7)">
            <rect x="0" y="0" width="38" height="22" fill={hlBg('#FEF08A')} stroke={INK} strokeWidth="2" />
            <text x="19" y="15" textAnchor="middle" className="font-game" fontSize="11" fill="#DC2626">
              빠직!!
            </text>
          </g>
          <g transform="translate(138, 10) rotate(6)">
            <rect x="0" y="0" width="38" height="22" fill={hlBg('#FEF08A')} stroke={INK} strokeWidth="2" />
            <text x="19" y="15" textAnchor="middle" className="font-game" fontSize="11" fill="#DC2626">
              격파!
            </text>
          </g>

          <text x="148" y="54" textAnchor="middle" className="font-game" fontSize="14.5" fill={INK}>
            외우다 털리지 마!!
          </text>
          <text x="148" y="71" textAnchor="middle" className="font-game" fontSize="10.2" fill="#EA580C">
            치트키 18장으로 구구단 1초 컷!
          </text>

          <line x1="12" y1="84" x2="228" y2="84" stroke={INK} strokeWidth="2" strokeDasharray="4 4" />

          <text x="16" y="102" className="font-game" fontSize="10.5" fill="#1D4ED8">
            역할 &amp; 희귀도 안내 (표지 1 + 17장)
          </text>

          {legend.map((row, idx) => {
            const ry = 124 + idx * 22;
            return (
              <g key={row.tag}>
                <circle cx="19" cy={ry - 3.5} r="4.2" fill={isBw ? '#334155' : row.color} />
                <text x="27" y={ry} className="font-game" fontSize="8.6" fill={isBw ? INK : row.color}>
                  {row.tag}
                </text>
                <text x="72" y={ry} className="font-mono-num font-bold" fontSize="7.2" fill={INK}>
                  {row.rank}
                </text>
                <text x="115" y={ry} className="font-body font-bold" fontSize="7.8" fill="#475569">
                  {row.desc}
                </text>
              </g>
            );
          })}
        </svg>
      );
    }

    /* 01. 더하기 돌려 곱하기! (간소화) */
    case 'gugudan_turn_plus': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#FFFDF5')} />

          <text x="36" y="25" textAnchor="middle" className="font-game" fontSize="10" fill="#DC2626" transform="rotate(-10 36 25)">
            귀찮아!
          </text>
          <Stickman x={36} y={44} scale={0.78} pose="crying" armL={[-13, 20]} armR={[11, 14]} />

          <text x="152" y="47" textAnchor="middle" className="font-game" fontSize="16" fill={INK}>
            4+4+4+4+4 = <tspan fill="#DC2626">20</tspan>
          </text>
          <path d="M 90 55 L 90 62 L 180 62 L 180 55" fill="none" stroke="#EA580C" strokeWidth="2" />
          <text x="135" y="77" textAnchor="middle" className="font-game" fontSize="10.5" fill="#B45309">
            4를 5번 더함
          </text>

          <line x1="14" y1="91" x2="226" y2="91" stroke="#F59E0B" strokeWidth="1.8" strokeDasharray="3 4" />

          {/* Lightbulb */}
          <g transform="translate(24, 114)">
            <circle cx="0" cy="0" r="6" fill={hlBg('#FEF08A')} stroke={INK} strokeWidth="1.6" />
            <rect x="-2.5" y="6" width="5" height="3" fill="#94A3B8" stroke={INK} strokeWidth="1" />
            <line x1="0" y1="-9" x2="0" y2="-12" stroke="#F59E0B" strokeWidth="1.6" />
            <line x1="-8" y1="-5" x2="-11" y2="-7" stroke="#F59E0B" strokeWidth="1.6" />
            <line x1="8" y1="-5" x2="11" y2="-7" stroke="#F59E0B" strokeWidth="1.6" />
          </g>

          <Stickman x={48} y={120} scale={0.78} pose="sunglasses" armL={[-12, 22]} armR={[14, 14]} />

          {/* Blue Plus -> Purple Times */}
          <g transform="translate(107, 134)">
            <path d="M -5 -15 H 5 V -5 H 15 V 5 H 5 V 15 H -5 V 5 H -15 V -5 H -5 Z" fill="#3B82F6" stroke={INK} strokeWidth="2.2" />
          </g>
          <path d="M 129 120 Q 145 110 158 121" fill="none" stroke="#EA580C" strokeWidth="2.5" strokeLinecap="round" />
          <polygon points="160,123 153,122 158,116" fill="#EA580C" />
          <text x="144" y="109" textAnchor="middle" className="font-game" fontSize="10.2" fill="#EA580C">
            45° 휙!
          </text>
          <g transform="translate(182, 134) rotate(45)">
            <path d="M -5 -15 H 5 V -5 H 15 V 5 H 5 V 15 H -5 V 5 H -15 V -5 H -5 Z" fill="#7C3AED" stroke={INK} strokeWidth="2.2" />
          </g>

          <text x="64" y="199" textAnchor="middle" className="font-game" fontSize="12" fill={INK}>
            4를 <tspan fill="#DC2626">5번</tspan>
          </text>
          <text x="104" y="199" textAnchor="middle" className="font-game" fontSize="13" fill="#EA580C">
            →
          </text>
          <rect x="118" y="180" width="98" height="27" rx="13.5" fill={hlBg('#FEF08A')} stroke="#F59E0B" strokeWidth="1.5" />
          <text x="167" y="199" textAnchor="middle" className="font-game" fontSize="16" fill="#DC2626">
            4 × 5 = 20
          </text>
        </svg>
      );
    }

    /* 02. 몇 묶음, 몇 배 = ×! */
    case 'gugudan_group_times': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#FFFDF5')} />

          <text x="120" y="25" textAnchor="middle" className="font-game" fontSize="13.5" fill={INK}>
            <tspan fill="#EA580C">3개</tspan>씩 <tspan fill="#2563EB">4묶음</tspan>
          </text>

          {[0, 1, 2, 3].map((i) => {
            const bx = 34 + i * 57;
            return (
              <g key={i}>
                <path
                  d={`M ${bx - 6} 35 L ${bx + 6} 35 L ${bx + 3} 40 L ${bx - 3} 40 Z`}
                  fill="#FDE047"
                  stroke={INK}
                  strokeWidth="1.4"
                />
                <rect x={bx - 21} y="40" width="42" height="36" rx="10" fill={hlBg('#FEF9C3')} stroke={INK} strokeWidth="1.9" />
                {[
                  [0, 51],
                  [-8, 64],
                  [8, 64],
                ].map(([ox, oy], j) => (
                  <g key={j}>
                    <circle cx={bx + ox} cy={oy} r="6.2" fill="#FB923C" stroke={INK} strokeWidth="1.2" />
                    <path d={`M ${bx + ox} ${oy - 6} L ${bx + ox + 2} ${oy - 8.5}`} stroke="#15803D" strokeWidth="1.5" strokeLinecap="round" />
                  </g>
                ))}
                <text x={bx} y="92" textAnchor="middle" className="font-game" fontSize="12" fill="#EA580C">
                  3
                </text>
                {i < 3 && (
                  <text x={bx + 28.5} y="92" textAnchor="middle" className="font-game" fontSize="11.5" fill="#64748B">
                    +
                  </text>
                )}
              </g>
            );
          })}

          <line x1="16" y1="103" x2="224" y2="103" stroke="#F59E0B" strokeWidth="1.8" strokeDasharray="3 4" />

          <text x="78" y="128" textAnchor="middle" className="font-game" fontSize="12.5" fill={INK}>
            3씩 <tspan fill="#2563EB">4묶음</tspan>
          </text>
          <text x="78" y="152" textAnchor="middle" className="font-game" fontSize="12.5" fill={INK}>
            3의 <tspan fill="#2563EB">4배</tspan>
          </text>

          <path d="M 122 114 Q 130 114 130 123 L 130 129 Q 130 135 136 135 Q 130 135 130 141 L 130 147 Q 130 156 122 156" fill="none" stroke={INK} strokeWidth="2.4" strokeLinecap="round" />
          <text x="166" y="143" textAnchor="middle" className="font-game" fontSize="19" fill="#DC2626">
            × 4
          </text>

          <rect x="18" y="176" width="122" height="28" rx="14" fill={hlBg('#FEF08A')} stroke="#F59E0B" strokeWidth="1.5" />
          <text x="79" y="196" textAnchor="middle" className="font-game" fontSize="16" fill="#DC2626">
            3 × 4 = 12
          </text>

          <rect x="150" y="166" width="34" height="19" rx="5" fill="#FFFFFF" stroke={INK} strokeWidth="1.5" />
          <text x="167" y="179" textAnchor="middle" className="font-game" fontSize="9.5" fill={INK}>
            짝꿍!
          </text>
          <Stickman x={205} y={175} scale={0.76} pose="happy" armL={[-13, 10]} armR={[13, 10]} />
        </svg>
      );
    }

    /* 03. 2단 곱셈구구 */
    case 'gugudan_2': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#F8FBFF')} />
          <text x="120" y="21" textAnchor="middle" className="font-game" fontSize="12" fill="#1D4ED8">
            +2씩 깡총 점프!
          </text>

          {Array.from({ length: 9 }, (_, i) => {
            const k = i + 1;
            const y = 39 + i * 19.2;
            return (
              <g key={k}>
                <text x="43" y={y} textAnchor="middle" className="font-game" fontSize="13.2" fill={INK}>
                  2 × {k} =
                </text>
                <text x="78" y={y} textAnchor="middle" className="font-game" fontSize="13.5" fill="#2563EB">
                  {2 * k}
                </text>
              </g>
            );
          })}

          <text x="166" y="49" textAnchor="middle" className="font-game" fontSize="11.5" fill="#EA580C">
            &apos;호잇짜! +2!&apos;
          </text>

          {/* Motion lines + jumping Jollaman */}
          <line x1="126" y1="84" x2="140" y2="90" stroke="#60A5FA" strokeWidth="2.2" strokeLinecap="round" />
          <line x1="123" y1="98" x2="138" y2="101" stroke="#60A5FA" strokeWidth="2.2" strokeLinecap="round" />
          <Stickman
            x={168}
            y={78}
            scale={0.86}
            pose="sunglasses"
            sweat
            armL={[-15, 22]}
            armR={[15, 11]}
            legL={[-12, 43]}
            legR={[12, 43]}
          />

          {/* Ground line (right jump track only so 2×9=18 stays completely unobstructed) + Hop arcs + 2-4-6-8-10 circles */}
          <line x1="103" y1="184" x2="230" y2="184" stroke="#BFDBFE" strokeWidth="3" strokeLinecap="round" />
          <path d="M 118 172 Q 139 144 160 172" fill="none" stroke="#2563EB" strokeWidth="2.4" strokeDasharray="3.5 3.5" />
          <path d="M 164 172 Q 186 144 208 172" fill="none" stroke="#EA580C" strokeWidth="2.4" strokeDasharray="3.5 3.5" />

          {[2, 4, 6, 8, 10].map((num, idx) => {
            const cx = 117 + idx * 24;
            return (
              <g key={num}>
                <circle cx={cx} cy="184" r="10.2" fill="#FFFFFF" stroke={INK} strokeWidth="2" />
                <text x={cx} y="188" textAnchor="middle" className="font-game" fontSize="10.2" fill="#1D4ED8">
                  {num}
                </text>
              </g>
            );
          })}

          <text x="58" y="216" textAnchor="middle" className="font-game" fontSize="10.5" fill="#1D4ED8">
            짝수 점프!
          </text>
        </svg>
      );
    }

    /* 04. 3단 곱셈구구 */
    case 'gugudan_3': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#F8FBFF')} />
          <text x="120" y="21" textAnchor="middle" className="font-game" fontSize="12" fill="#1D4ED8">
            삼육구! 벌써 3개 외움!
          </text>

          {Array.from({ length: 9 }, (_, i) => {
            const k = i + 1;
            const y = 41 + i * 20;
            const isHighlighted = k <= 3;
            return (
              <g key={k}>
                {isHighlighted && (
                  <rect x="14" y={y - 13} width="82" height="17" rx="8.5" fill={hlBg('#FEF08A')} />
                )}
                <text x="44" y={y} textAnchor="middle" className="font-game" fontSize="13.2" fill={INK}>
                  3 × {k} =
                </text>
                <text
                  x="79"
                  y={y}
                  textAnchor="middle"
                  className="font-game"
                  fontSize="13.5"
                  fill={isHighlighted ? '#DC2626' : '#2563EB'}
                >
                  {3 * k}
                </text>
              </g>
            );
          })}

          <text x="140" y="54" textAnchor="middle" className="font-game" fontSize="11" fill="#EA580C">
            &apos;1, 2, 짝!!&apos;
          </text>
          <text x="184" y="72" textAnchor="middle" className="font-game" fontSize="11" fill="#DC2626">
            &apos;3·6·9 끝!&apos;
          </text>

          <g transform="translate(166, 97)">
            <polygon
              points="0,-17 5,-7 18,-12 9,-2 19,6 6,6 7,17 0,9 -8,17 -6,6 -19,6 -9,-2 -18,-12 -5,-7"
              fill={hlBg('#FEF08A')}
              stroke={INK}
              strokeWidth="1.8"
            />
            <text x="0" y="4" textAnchor="middle" className="font-game" fontSize="11" fill="#DC2626">
              짝!
            </text>
          </g>

          <Stickman x={135} y={132} scale={0.82} pose="happy" armL={[14, 15]} armR={[14, 15]} />
          <Stickman x={198} y={132} scale={0.82} pose="headphones" />

          <text x="167" y="207" textAnchor="middle" className="font-game" fontSize="11" fill="#1D4ED8">
            나머진 +3씩!
          </text>
        </svg>
      );
    }

    /* 05. 4단 곱셈구구 */
    case 'gugudan_4': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#F2FDF7')} />
          <text x="120" y="21" textAnchor="middle" className="font-game" fontSize="12" fill="#047857">
            일단 4 × 5 = 20만 외우자!
          </text>

          {Array.from({ length: 9 }, (_, i) => {
            const k = i + 1;
            const y = 41 + i * 20;
            const isAnchor = k === 5;
            return (
              <g key={k}>
                {isAnchor && (
                  <rect x="14" y={y - 13} width="82" height="17" rx="8.5" fill={hlBg('#FEF08A')} />
                )}
                <text x="44" y={y} textAnchor="middle" className="font-game" fontSize="13.2" fill={INK}>
                  4 × {k} =
                </text>
                <text
                  x="79"
                  y={y}
                  textAnchor="middle"
                  className="font-game"
                  fontSize="13.5"
                  fill={isAnchor ? '#DC2626' : '#2563EB'}
                >
                  {4 * k}
                </text>
              </g>
            );
          })}

          {/* Flag at mountain peak */}
          <line x1="168" y1="53" x2="168" y2="114" stroke={INK} strokeWidth="2.8" strokeLinecap="round" />
          <polygon points="168,54 226,68 168,82" fill="#EF4444" stroke={INK} strokeWidth="1.8" />
          <text x="191" y="72" textAnchor="middle" className="font-game" fontSize="9.8" fill="#FFFFFF">
            4×5=20!
          </text>

          {/* Mountain */}
          <polygon points="103,214 168,112 233,214" fill={hlBg('#A7F3D0')} stroke={INK} strokeWidth="2.4" strokeLinejoin="round" />

          {/* Amazed Headband Jollaman */}
          <Stickman x={135} y={108} scale={0.78} pose="panic_headband" />

          {/* Clean white pill backing so mountain slope never cuts through -4 / +4 text */}
          <rect x="106" y="164" width="52" height="31" rx="4" fill={softBg('#FFFFFF')} fillOpacity="0.88" />
          <text x="132" y="177" textAnchor="middle" className="font-game" fontSize="9.8" fill="#2563EB">
            ← -4
          </text>
          <text x="132" y="191" textAnchor="middle" className="font-game" fontSize="9.5" fill="#1D4ED8">
            16 (4×4)
          </text>

          <rect x="172" y="164" width="52" height="31" rx="4" fill={softBg('#FFFFFF')} fillOpacity="0.88" />
          <text x="198" y="177" textAnchor="middle" className="font-game" fontSize="9.8" fill="#059669">
            +4 →
          </text>
          <text x="198" y="191" textAnchor="middle" className="font-game" fontSize="9.5" fill="#047857">
            24 (4×6)
          </text>
        </svg>
      );
    }

    /* 06. 5단 곱셈구구 */
    case 'gugudan_5': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#F8FBFF')} />
          <text x="120" y="21" textAnchor="middle" className="font-game" fontSize="12" fill="#1D4ED8">
            끝자리는 5와 0 반복!
          </text>

          {Array.from({ length: 9 }, (_, i) => {
            const k = i + 1;
            const y = 41 + i * 20;
            const prod = 5 * k;
            const tens = Math.floor(prod / 10);
            const ones = prod % 10;
            return (
              <g key={k}>
                <text x="44" y={y} textAnchor="middle" className="font-game" fontSize="13.2" fill={INK}>
                  5 × {k} =
                </text>
                {tens > 0 && (
                  <text x="74" y={y} textAnchor="middle" className="font-game" fontSize="13.5" fill="#2563EB">
                    {tens}
                  </text>
                )}
                <text
                  x="83"
                  y={y}
                  textAnchor="middle"
                  className="font-game"
                  fontSize="13.5"
                  fill={ones === 5 ? '#EA580C' : '#2563EB'}
                >
                  {ones}
                </text>
              </g>
            );
          })}

          <text x="139" y="47" textAnchor="middle" className="font-game" fontSize="10" fill="#EA580C">
            하이파이브!
          </text>
          <circle cx="139" cy="76" r="21" fill={hlBg('#FFEDD5')} stroke="#EA580C" strokeWidth="2.6" />
          <text x="139" y="83" textAnchor="middle" className="font-game" fontSize="19" fill="#EA580C">
            5
          </text>

          <text x="197" y="47" textAnchor="middle" className="font-game" fontSize="10" fill="#2563EB">
            빵! (0)
          </text>
          <circle cx="197" cy="76" r="21" fill={hlBg('#DBEAFE')} stroke="#2563EB" strokeWidth="2.6" />
          <circle cx="197" cy="76" r="6.5" fill="none" stroke="#2563EB" strokeWidth="2.2" />

          <Stickman
            x={169}
            y={128}
            scale={0.9}
            pose="happy"
            armL={[-17, 2]}
            armR={[17, 2]}
            legL={[-13, 47]}
            legR={[13, 47]}
          />

          <text x="169" y="202" textAnchor="middle" className="font-game" fontSize="14.5" fill={INK}>
            <tspan fill="#EA580C">5</tspan> · <tspan fill="#2563EB">0</tspan> · <tspan fill="#EA580C">5</tspan> · <tspan fill="#2563EB">0</tspan>!
          </text>
        </svg>
      );
    }

    /* 07. 6단 곱셈구구 */
    case 'gugudan_6': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#F2FDF7')} />
          <text x="120" y="21" textAnchor="middle" className="font-game" fontSize="12" fill="#047857">
            일단 6 × 5 = 30만 외우자!
          </text>

          {Array.from({ length: 9 }, (_, i) => {
            const k = i + 1;
            const y = 41 + i * 20;
            const isAnchor = k === 5;
            return (
              <g key={k}>
                {isAnchor && (
                  <rect x="14" y={y - 13} width="82" height="17" rx="8.5" fill={hlBg('#FEF08A')} />
                )}
                <text x="44" y={y} textAnchor="middle" className="font-game" fontSize="13.2" fill={INK}>
                  6 × {k} =
                </text>
                <text
                  x="79"
                  y={y}
                  textAnchor="middle"
                  className="font-game"
                  fontSize="13.5"
                  fill={isAnchor ? '#DC2626' : '#2563EB'}
                >
                  {6 * k}
                </text>
              </g>
            );
          })}

          <text x="166" y="72" textAnchor="middle" className="font-game" fontSize="10.5" fill="#DC2626">
            &apos;딱 중심!&apos;
          </text>

          <Stickman x={166} y={112} scale={0.82} pose="highkick" />

          <text x="125" y="150" textAnchor="middle" className="font-game" fontSize="11.5" fill="#2563EB">
            24
          </text>
          <text x="205" y="150" textAnchor="middle" className="font-game" fontSize="11.5" fill="#059669">
            36
          </text>

          <line x1="112" y1="160" x2="220" y2="160" stroke={INK} strokeWidth="3.2" strokeLinecap="round" />
          <polygon points="166,162 146,193 186,193" fill={hlBg('#FEF08A')} stroke={INK} strokeWidth="2.2" strokeLinejoin="round" />
          <text x="166" y="187" textAnchor="middle" className="font-game" fontSize="11.5" fill="#DC2626">
            30
          </text>

          {/* Adjusted x & fontSize so +6 (6×6) → never clips off right border */}
          <text x="130" y="211" textAnchor="middle" className="font-game" fontSize="9.4" fill="#2563EB">
            ← -6 (6×4)
          </text>
          <text x="197" y="211" textAnchor="middle" className="font-game" fontSize="9.4" fill="#059669">
            +6 (6×6) →
          </text>
        </svg>
      );
    }

    /* 08. 7단 곱셈구구 */
    case 'gugudan_7': {
      const weeks = [
        [1, 2, 3, 4, 5, 6, 7],
        [8, 9, 10, 11, 12, 13, 14],
        [15, 16, 17, 18, 19, 20, 21],
        [22, 23, 24, 25, 26, 27, 28],
      ];
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#FFFCF2')} />
          <text x="120" y="22" textAnchor="middle" className="font-game" fontSize="12" fill="#B45309">
            7단은 달력 세로줄!
          </text>

          {/* Hanging wire + Calendar */}
          <polyline points="56,34 71,26 86,34" fill="none" stroke={INK} strokeWidth="1.6" />
          <rect x="13" y="34" width="116" height="122" rx="6" fill="#FFFFFF" stroke={INK} strokeWidth="2.2" />
          <path d="M 13 40 Q 13 34 19 34 H 123 Q 129 34 129 40 V 53 H 13 Z" fill="#EF4444" stroke={INK} strokeWidth="2" />
          <text x="71" y="47" textAnchor="middle" className="font-game" fontSize="9.5" fill="#FFFFFF">
            달력 (1주 = 7일)
          </text>

          {weeks.map((row, rIdx) =>
            row.map((day, cIdx) => {
              const dx = 24 + cIdx * 15.5;
              const dy = 72 + rIdx * 23;
              const isSeven = cIdx === 6;
              return (
                <g key={day}>
                  {isSeven && (
                    <circle cx={dx} cy={dy - 3} r="6.8" fill={hlBg('#FEF08A')} stroke="#EF4444" strokeWidth="1.8" />
                  )}
                  <text
                    x={dx}
                    y={dy}
                    textAnchor="middle"
                    className="font-body font-bold"
                    fontSize="8.8"
                    fill={isSeven ? '#DC2626' : '#334155'}
                  >
                    {day}
                  </text>
                </g>
              );
            })
          )}

          {/* Right 7×4(달력 연결) ~ 7×9 list */}
          <text x="172" y="42" textAnchor="middle" className="font-game" fontSize="10.8" fill="#64748B">
            7 × 4 = 28
          </text>
          <path d="M 126 138 Q 134 90 137 43" fill="none" stroke="#EA580C" strokeWidth="1.5" strokeDasharray="3 3" />
          <text x="223" y="54" textAnchor="middle" className="font-game" fontSize="8.8" fill="#EA580C">
            +7!
          </text>
          {[5, 6, 7, 8, 9].map((k, idx) => {
            const y = 62 + idx * 19.5;
            const isYellow = k === 8;
            return (
              <g key={k}>
                {isYellow && (
                  <rect x="141" y={y - 13} width="84" height="17" rx="8.5" fill={hlBg('#FEF08A')} />
                )}
                <text x="172" y={y} textAnchor="middle" className="font-game" fontSize="13.2" fill={INK}>
                  7 × {k} =
                </text>
                <text
                  x="207"
                  y={y}
                  textAnchor="middle"
                  className="font-game"
                  fontSize="13.5"
                  fill={isYellow ? '#DC2626' : '#2563EB'}
                >
                  {7 * k}
                </text>
              </g>
            );
          })}

          {/* Headband Jollaman pointing stick to 28 (7×4) */}
          <line x1="178" y1="184" x2="123" y2="144" stroke="#D97706" strokeWidth="2.6" strokeLinecap="round" />
          <Stickman x={190} y={171} scale={0.76} pose="headband" armL={[-14, 16]} armR={[12, 18]} />

          <text x="72" y="193" textAnchor="middle" className="font-game" fontSize="12" fill="#DC2626">
            7 → 14 → 21 → 28!
          </text>
          <text x="72" y="210" textAnchor="middle" className="font-game" fontSize="9.2" fill="#EA580C">
            달력 다음은 +7씩 35부터!
          </text>
        </svg>
      );
    }

    /* 09. 8단 곱셈구구 */
    case 'gugudan_8': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#F2FDF7')} />
          <text x="120" y="21" textAnchor="middle" className="font-game" fontSize="12" fill="#047857">
            끝자리 8·6·4·2·0 반복!
          </text>

          {Array.from({ length: 9 }, (_, i) => {
            const k = i + 1;
            const y = 41 + i * 20;
            const prod = 8 * k;
            const tens = Math.floor(prod / 10);
            const ones = prod % 10;
            const isAnchor = k === 5;
            return (
              <g key={k}>
                {isAnchor && (
                  <rect x="14" y={y - 13} width="82" height="17" rx="8.5" fill={hlBg('#FEF08A')} />
                )}
                <text x="44" y={y} textAnchor="middle" className="font-game" fontSize="13.2" fill={INK}>
                  8 × {k} =
                </text>
                {tens > 0 && (
                  <text
                    x="74"
                    y={y}
                    textAnchor="middle"
                    className="font-game"
                    fontSize="13.5"
                    fill={isAnchor ? '#DC2626' : '#2563EB'}
                  >
                    {tens}
                  </text>
                )}
                <text
                  x="83"
                  y={y}
                  textAnchor="middle"
                  className="font-game"
                  fontSize="13.5"
                  fill={isAnchor ? '#DC2626' : '#059669'}
                >
                  {ones}
                </text>
              </g>
            );
          })}

          {/* Up & Down arrows */}
          <line x1="101" y1="112" x2="101" y2="39" stroke="#EA580C" strokeWidth="2.4" strokeLinecap="round" />
          <polyline points="96,46 101,38 106,46" fill="none" stroke="#EA580C" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />

          <line x1="101" y1="133" x2="101" y2="203" stroke="#2563EB" strokeWidth="2.4" strokeLinecap="round" />
          <polyline points="96,196 101,204 106,196" fill="none" stroke="#2563EB" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />

          <text x="172" y="54" textAnchor="middle" className="font-game" fontSize="11.5" fill="#EA580C">
            위: 8·6·4·2
          </text>
          <text x="172" y="72" textAnchor="middle" className="font-game" fontSize="10" fill={INK}>
            (나 8×5=40)
          </text>

          <path d="M 94 123 L 128 143 L 216 143" fill="none" stroke="#D97706" strokeWidth="2.2" strokeDasharray="3.5 3.5" />
          <Stickman x={169} y={98} scale={0.78} pose="upside_down" />

          <text x="172" y="184" textAnchor="middle" className="font-game" fontSize="11.5" fill="#2563EB">
            아래: 8·6·4·2
          </text>
        </svg>
      );
    }

    /* 10. 9단 곱셈구구 */
    case 'gugudan_9': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#F7F5FF')} />
          <text x="120" y="21" textAnchor="middle" className="font-game" fontSize="11.2" fill="#6D28D9">
            내려갈수록 앞 +1 · 뒤 -1 마법!
          </text>

          {Array.from({ length: 9 }, (_, i) => {
            const k = i + 1;
            const y = 41 + i * 20;
            const prod = 9 * k;
            const tens = Math.floor(prod / 10);
            const ones = prod % 10;
            return (
              <g key={k}>
                <text x="44" y={y} textAnchor="middle" className="font-game" fontSize="13.2" fill={INK}>
                  9 × {k} =
                </text>
                <text
                  x="74"
                  y={y}
                  textAnchor="middle"
                  className="font-game"
                  fontSize="13.5"
                  fill={tens === 0 ? '#94A3B8' : '#2563EB'}
                >
                  {tens}
                </text>
                <text x="83" y={y} textAnchor="middle" className="font-game" fontSize="13.5" fill="#DC2626">
                  {ones}
                </text>
              </g>
            );
          })}

          <text x="142" y="51" textAnchor="middle" className="font-game" fontSize="9.5" fill="#2563EB">
            십의 자리
          </text>
          <text x="142" y="65" textAnchor="middle" className="font-game" fontSize="12" fill="#2563EB">
            +1
          </text>
          <line x1="142" y1="73" x2="142" y2="112" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" />
          <polyline points="136,105 142,113 148,105" fill="none" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

          <text x="197" y="51" textAnchor="middle" className="font-game" fontSize="9.5" fill="#DC2626">
            일의 자리
          </text>
          <text x="197" y="65" textAnchor="middle" className="font-game" fontSize="12" fill="#DC2626">
            -1
          </text>
          <line x1="197" y1="73" x2="197" y2="112" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round" />
          <polyline points="191,105 197,113 203,105" fill="none" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

          <Stickman x={169} y={134} scale={0.82} pose="surprised" sweat armL={[-16, 4]} armR={[16, 4]} />

          <rect x="115" y="191" width="108" height="21" rx="10.5" fill={hlBg('#FEF08A')} />
          <text x="169" y="206" textAnchor="middle" className="font-game" fontSize="11.2" fill={INK}>
            합 = 무조건 9!
          </text>
        </svg>
      );
    }

    /* 11. 1과 0을 곱해볼까요 */
    case 'gugudan_one_zero': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#FFF9F2')} />

          <text x="60" y="23" textAnchor="middle" className="font-game" fontSize="12" fill="#1D4ED8">
            × 1 = 거울 방!
          </text>
          <text x="180" y="23" textAnchor="middle" className="font-game" fontSize="12" fill="#DC2626">
            × 0 = 블랙홀!!
          </text>

          <line x1="120" y1="30" x2="120" y2="218" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="4 5" />

          {/* Mirror Room */}
          <ellipse cx="60" cy="82" rx="50" ry="42" fill="#FFFFFF" stroke="#3B82F6" strokeWidth="2.8" />
          <text x="60" y="70" textAnchor="middle" className="font-game" fontSize="11.5" fill={INK}>
            9 × 1 = 9
          </text>
          <text x="60" y="96" textAnchor="middle" className="font-game" fontSize="10.2" fill="#2563EB">
            졸라맨×1=졸라맨
          </text>
          <Stickman x={60} y={158} scale={0.82} pose="astronaut" />

          {/* Black Hole */}
          <text x="180" y="45" textAnchor="middle" className="font-game" fontSize="11" fill={INK}>
            9 × 0 = <tspan fill="#DC2626">0</tspan>
          </text>
          <text x="180" y="62" textAnchor="middle" className="font-game" fontSize="10.2" fill="#DC2626">
            졸라맨 × 0 = 0
          </text>

          <circle cx="182" cy="99" r="26" fill="none" stroke="#EA580C" strokeWidth="2.2" strokeDasharray="5 4" />
          <circle cx="182" cy="99" r="19" fill={isBw ? '#334155' : '#0F172A'} stroke="#EA580C" strokeWidth="2.5" />
          <text x="182" y="106" textAnchor="middle" className="font-game" fontSize="20" fill="#FACC15">
            0
          </text>

          {/* 3 wavy suction lines pulling Jollaman upward into 0 */}
          <path d="M 164 152 Q 160 140 166 132 Q 171 124 168 117" fill="none" stroke="#EA580C" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M 182 148 Q 178 138 183 130 Q 188 123 183 119" fill="none" stroke="#EA580C" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M 200 152 Q 204 140 198 132 Q 193 124 196 117" fill="none" stroke="#EA580C" strokeWidth="1.8" strokeLinecap="round" />

          {/* Jollaman being sucked up with arms stretched upward */}
          <g transform="translate(182, 168) rotate(-8)">
            <Stickman
              x={0}
              y={0}
              scale={0.76}
              pose="panic"
              armL={[-11, -18]}
              armR={[11, -18]}
              legL={[-6, 48]}
              legR={[7, 46]}
            />
          </g>
        </svg>
      );
    }

    /* 12. 곱셈표 (1~9 시원한 10x10 표 + 마지막행 삭제) */
    case 'gugudan_table': {
      const cell = 16;
      const startX = 10;
      const startY = 44;
      const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#F8FBFF')} />
          <text x="120" y="24" textAnchor="middle" className="font-game" fontSize="11.5" fill="#1D4ED8">
            곱셈표: 가로(→)와 세로(↓)가 만나는 칸!
          </text>

          {/* Table Outer (10x10) */}
          <rect x={startX} y={startY} width={cell * 10} height={cell * 10} fill="#FFFFFF" stroke={INK} strokeWidth="1.6" />

          {/* Header row & col */}
          <rect x={startX} y={startY} width={cell * 10} height={cell} fill={hlBg('#F1F5F9')} />
          <rect x={startX} y={startY} width={cell} height={cell * 10} fill={hlBg('#FEF9C3')} />
          <rect x={startX} y={startY} width={cell} height={cell} fill={hlBg('#E2E8F0')} />

          {/* Highlight row 3, col 5, and symmetric cells (3,5) / (5,3) */}
          <rect x={startX + 5 * cell} y={startY} width={cell} height={cell} fill={hlBg('#FDE047')} />
          <rect x={startX} y={startY + 3 * cell} width={cell} height={cell} fill={hlBg('#FDE047')} />
          <rect x={startX + 5 * cell} y={startY + 3 * cell} width={cell} height={cell} fill={hlBg('#FDBA74')} />
          <rect x={startX + 3 * cell} y={startY + 5 * cell} width={cell} height={cell} fill={hlBg('#FDBA74')} />

          {/* Diagonal tint behind squares */}
          {nums.map((n) => (
            <rect
              key={`diag-${n}`}
              x={startX + n * cell + 1}
              y={startY + n * cell + 1}
              width={cell - 2}
              height={cell - 2}
              fill={hlBg('#DCFCE7')}
            />
          ))}

          {/* Grid lines */}
          {Array.from({ length: 11 }, (_, i) => (
            <g key={`grid-${i}`}>
              <line
                x1={startX + i * cell}
                y1={startY}
                x2={startX + i * cell}
                y2={startY + 10 * cell}
                stroke="#CBD5E1"
                strokeWidth="0.7"
              />
              <line
                x1={startX}
                y1={startY + i * cell}
                x2={startX + 10 * cell}
                y2={startY + i * cell}
                stroke="#CBD5E1"
                strokeWidth="0.7"
              />
            </g>
          ))}

          {/* × Corner */}
          <text x={startX + cell / 2} y={startY + 11} textAnchor="middle" className="font-game" fontSize="9.8" fill={INK}>
            ×
          </text>

          {/* Column & Row labels + products */}
          {nums.map((r) => (
            <React.Fragment key={`r-${r}`}>
              <text
                x={startX + (r + 0.5) * cell}
                y={startY + 10.8}
                textAnchor="middle"
                className="font-mono-num font-bold"
                fontSize="8.6"
                fill="#1D4ED8"
              >
                {r}
              </text>
              <text
                x={startX + cell / 2}
                y={startY + r * cell + 10.8}
                textAnchor="middle"
                className="font-mono-num font-bold"
                fontSize="8.6"
                fill="#B45309"
              >
                {r}
              </text>
              {nums.map((c) => {
                const isSym = (r === 3 && c === 5) || (r === 5 && c === 3);
                return (
                  <text
                    key={`${r}-${c}`}
                    x={startX + (c + 0.5) * cell}
                    y={startY + r * cell + 10.8}
                    textAnchor="middle"
                    className="font-mono-num font-bold"
                    fontSize={isSym ? '8.8' : '8'}
                    fill={isSym ? '#DC2626' : r === c ? '#047857' : INK}
                  >
                    {r * c}
                  </text>
                );
              })}
            </React.Fragment>
          ))}

          <line
            x1={startX + cell}
            y1={startY + cell}
            x2={startX + 10 * cell}
            y2={startY + 10 * cell}
            stroke="#16A34A"
            strokeWidth="1.5"
            strokeDasharray="3 3"
            strokeOpacity="0.6"
          />

          {/* Right symmetry callout */}
          <text x="204" y="76" textAnchor="middle" className="font-game" fontSize="11.5" fill="#DC2626">
            3×5=15
          </text>
          <text x="204" y="95" textAnchor="middle" className="font-game" fontSize="9.5" fill="#059669">
            ↕ 데칼코마니!
          </text>
          <text x="204" y="114" textAnchor="middle" className="font-game" fontSize="11.5" fill="#2563EB">
            5×3=15
          </text>

          <Stickman x={204} y={148} scale={0.8} pose="sunglasses" armL={[-15, 11]} armR={[13, 14]} />
        </svg>
      );
    }

    /* 13. 요상한 암기 치트키! (1행·마지막행 삭제, 4컷 깔끔 확장) */
    case 'gugudan_cheat_1': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#FAF8FF')} />

          <line x1="120" y1="12" x2="120" y2="218" stroke="#DDD6FE" strokeWidth="2" strokeDasharray="3 4" />
          <line x1="12" y1="115" x2="228" y2="115" stroke="#DDD6FE" strokeWidth="2" strokeDasharray="3 4" />

          {/* 1. 5 x 2 = 10 */}
          <text x="64" y="30" textAnchor="middle" className="font-game" fontSize="14" fill={INK}>
            5 × 2 = <tspan fill="#059669">10</tspan>
          </text>
          <text x="64" y="47" textAnchor="middle" className="font-game" fontSize="9.6" fill="#047857">
            &apos;오이(5·2) 무침(10)!&apos;
          </text>
          <ellipse cx="44" cy="76" rx="18" ry="8" fill="#22C55E" stroke={INK} strokeWidth="1.8" transform="rotate(-12 44 76)" />
          <circle cx="38" cy="75" r="1.5" fill="#EF4444" />
          <circle cx="45" cy="73" r="1.5" fill="#EF4444" />
          <circle cx="49" cy="77" r="1.5" fill="#EF4444" />
          <Stickman x={90} y={66} scale={0.62} pose="happy" armL={[-13, 12]} armR={[13, 12]} />

          {/* 2. 6 x 6 = 36 (육육 삼겹살!) */}
          <text x="176" y="30" textAnchor="middle" className="font-game" fontSize="14" fill={INK}>
            6 × 6 = <tspan fill="#D97706">36</tspan>
          </text>
          <text x="176" y="47" textAnchor="middle" className="font-game" fontSize="9.4" fill="#B45309">
            &apos;육육(6·6) 삼겹살(36)!&apos;
          </text>
          <g transform="translate(156, 79) rotate(-8)">
            <rect x="-18" y="-9" width="36" height="18" rx="4" fill="#FB7185" stroke={INK} strokeWidth="1.7" />
            <line x1="-15" y1="-3" x2="15" y2="-3" stroke="#FFF1F2" strokeWidth="3.2" strokeLinecap="round" />
            <line x1="-15" y1="3" x2="15" y2="3" stroke="#FFF1F2" strokeWidth="2.8" strokeLinecap="round" />
            <path d="M -8 -13 Q -6 -17 -8 -20 M 4 -13 Q 6 -17 4 -20" fill="none" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" />
          </g>
          <Stickman x={199} y={66} scale={0.62} pose="headphones" />

          {/* 3. 8 x 2 = 16 */}
          <text x="64" y="138" textAnchor="middle" className="font-game" fontSize="14" fill={INK}>
            8 × 2 = <tspan fill="#DC2626">16</tspan>
          </text>
          <text x="64" y="155" textAnchor="middle" className="font-game" fontSize="9.6" fill="#DC2626">
            &apos;팔이(8·2) 아파(16)!!&apos;
          </text>
          <Stickman x={54} y={172} scale={0.64} pose="crying" armL={[-8, 22]} armR={[9, 14]} />
          <text x="93" y="191" textAnchor="middle" className="font-game" fontSize="9.2" fill="#DC2626">
            아야야ㅠ
          </text>

          {/* 4. 7 x 8 = 56 */}
          <text x="176" y="138" textAnchor="middle" className="font-game" fontSize="14" fill={INK}>
            7 × 8 = <tspan fill="#7C3AED">56</tspan>
          </text>
          <text x="176" y="155" textAnchor="middle" className="font-game" fontSize="9.6" fill="#2563EB">
            &apos;5·6·7·8 거꾸로!&apos;
          </text>
          <text x="154" y="191" textAnchor="middle" className="font-game" fontSize="12" fill="#EA580C">
            56=7×8
          </text>
          <Stickman x={200} y={172} scale={0.64} pose="sunglasses" armL={[-13, 12]} armR={[13, 12]} />
        </svg>
      );
    }

    /* 14. 요상한 치트키 2탄! (1행·마지막행 삭제, 9×9=81 구구콘 반영) */
    case 'gugudan_cheat_2': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#FAF8FF')} />

          <line x1="120" y1="12" x2="120" y2="218" stroke="#DDD6FE" strokeWidth="2" strokeDasharray="3 4" />
          <line x1="12" y1="115" x2="228" y2="115" stroke="#DDD6FE" strokeWidth="2" strokeDasharray="3 4" />

          {/* 1. 6 x 7 = 42 */}
          <text x="64" y="30" textAnchor="middle" className="font-game" fontSize="14" fill={INK}>
            6 × 7 = <tspan fill="#EA580C">42</tspan>
          </text>
          <text x="64" y="46" textAnchor="middle" className="font-game" fontSize="8.8" fill="#EA580C">
            ① 육칠은 사이(42)좋은 친구!
          </text>
          <Stickman x={39} y={66} scale={0.6} pose="happy" armL={[-12, 16]} armR={[12, 16]} />
          <path d="M 64 69 C 62 65 57 65 57 69 C 57 73 64 77 64 77 C 64 77 71 73 71 69 C 71 65 66 65 64 69 Z" fill="#EF4444" stroke={INK} strokeWidth="1.2" />
          <Stickman x={89} y={66} scale={0.6} pose="sunglasses" armL={[-12, 16]} armR={[12, 16]} />

          {/* 2. 7 x 7 = 49 */}
          <text x="176" y="30" textAnchor="middle" className="font-game" fontSize="14" fill={INK}>
            7 × 7 = <tspan fill="#DC2626">49</tspan>
          </text>
          <text x="176" y="46" textAnchor="middle" className="font-game" fontSize="8.8" fill="#DC2626">
            ② 칠칠맞게 사구(49) 치고!
          </text>
          <Stickman x={151} y={66} scale={0.6} pose="crying" armL={[-14, 10]} armR={[14, 10]} />
          <text x="194" y="70" textAnchor="middle" className="font-game" fontSize="9" fill="#DC2626">
            와장창!!
          </text>
          <polygon points="179,82 197,77 201,94 183,98" fill={hlBg('#BAE6FD')} stroke={INK} strokeWidth="1.5" />
          <ellipse cx="207" cy="96" rx="7" ry="3" fill={hlBg('#7DD3FC')} />

          {/* 3. 8 x 8 = 64 (팔팔 끓는 육사라면!) */}
          <text x="64" y="138" textAnchor="middle" className="font-game" fontSize="14" fill={INK}>
            8 × 8 = <tspan fill="#7C3AED">64</tspan>
          </text>
          <text x="64" y="154" textAnchor="middle" className="font-game" fontSize="8.7" fill="#6D28D9">
            ③ 팔팔 끓는 육사(64)라면!
          </text>
          <path d="M 35 175 Q 38 170 36 166 M 43 175 Q 46 170 44 166 M 51 175 Q 54 170 52 166" fill="none" stroke="#EF4444" strokeWidth="1.6" strokeLinecap="round" />
          <polygon points="28,180 60,180 55,204 33,204" fill="#F97316" stroke={INK} strokeWidth="1.8" />
          <text x="44" y="195" textAnchor="middle" className="font-game" fontSize="8.8" fill="#FFFFFF">
            육사
          </text>
          <Stickman x={87} y={172} scale={0.6} pose="chef_spicy" armL={[-13, 12]} armR={[13, 12]} />

          {/* 4. 9 x 9 = 81 (구구콘!) */}
          <text x="176" y="138" textAnchor="middle" className="font-game" fontSize="14" fill={INK}>
            9 × 9 = <tspan fill="#D97706">81</tspan>
          </text>
          <text x="176" y="154" textAnchor="middle" className="font-game" fontSize="8.7" fill="#1D4ED8">
            ④ 구구(9·9)콘이 단돈 81원?!
          </text>
          <g transform="translate(164, 185)">
            <circle cx="0" cy="-9" r="9.5" fill="#FEF3C7" stroke={INK} strokeWidth="1.6" />
            <path d="M -8 -12 Q 0 -17 8 -12" fill="none" stroke="#92400E" strokeWidth="2.4" strokeLinecap="round" />
            <polygon points="-9.5,-5 9.5,-5 0,20" fill="#FDBA74" stroke={INK} strokeWidth="1.6" strokeLinejoin="round" />
            <text x="0" y="5" textAnchor="middle" className="font-game" fontSize="6.8" fill={INK}>
              구구
            </text>
          </g>
          <text x="139" y="179" textAnchor="middle" className="font-game" fontSize="8.5" fill="#EA580C">
            81원?!
          </text>
          <Stickman x={201} y={172} scale={0.6} pose="panic_headband" />
        </svg>
      );
    }

    /* 15. 미션! 같은 구구단 찾기 (⚡/🔥 아이콘 + 2~9단 범위 힌트) */
    case 'gugudan_crew_12_18': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="120" height="230" fill={softBg('#F0F7FF')} />
          <rect x="120" y="0" width="120" height="230" fill={softBg('#FFF5F5')} />
          <line x1="120" y1="8" x2="120" y2="222" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="4 4" />

          {/* Left Speech Bubble */}
          <rect x="14" y="10" width="94" height="24" rx="10" fill="#FFFFFF" stroke={INK} strokeWidth="1.8" />
          <polygon points="56,34 62,34 60,40" fill="#FFFFFF" stroke={INK} strokeWidth="1.5" />
          <rect x="55" y="32" width="10" height="3" fill="#FFFFFF" />
          <text x="61" y="25.5" textAnchor="middle" className="font-game" fontSize="8.8" fill="#2563EB">
            ⚡ 12 12 12 12...
          </text>

          {/* Right Speech Bubble */}
          <rect x="132" y="10" width="94" height="24" rx="10" fill="#FFFFFF" stroke={INK} strokeWidth="1.8" />
          <polygon points="178,34 184,34 179,40" fill="#FFFFFF" stroke={INK} strokeWidth="1.5" />
          <rect x="177" y="32" width="10" height="3" fill="#FFFFFF" />
          <text x="179" y="25.5" textAnchor="middle" className="font-game" fontSize="8.8" fill="#DC2626">
            18 18 18 18... 🔥
          </text>

          <Stickman x={59} y={56} scale={0.7} pose="headband" armL={[-13, 18]} armR={[13, 18]} />
          <line x1="22" y1="95" x2="98" y2="95" stroke="#BFDBFE" strokeWidth="2.5" />

          <Stickman x={181} y={56} scale={0.7} pose="sunglasses" sweat armL={[-13, 18]} armR={[13, 18]} />
          <line x1="142" y1="95" x2="218" y2="95" stroke="#FECACA" strokeWidth="2.5" />

          {/* 2~9단 hint pill */}
          <rect x="88" y="88" width="64" height="15" rx="7.5" fill="#FFFFFF" stroke={INK} strokeWidth="1.4" />
          <text x="120" y="98.5" textAnchor="middle" className="font-game" fontSize="7.6" fill="#6D28D9">
            2~9단 안에서!
          </text>

          {/* VS Badge */}
          <g transform="translate(120, 120)">
            <polygon
              points="0,-14 4,-6 14,-10 7,-2 15,4 5,4 6,13 0,7 -7,13 -5,4 -15,4 -7,-2 -14,-10 -4,-6"
              fill={hlBg('#FACC15')}
              stroke={INK}
              strokeWidth="1.7"
            />
            <text x="0" y="3.5" textAnchor="middle" className="font-game" fontSize="9.5" fill={INK}>
              VS
            </text>
          </g>

          {/* Left Crew 12 */}
          <text x="61" y="114" textAnchor="middle" className="font-game" fontSize="12" fill="#1D4ED8">
            크루 12
          </text>
          <rect x="18" y="123" width="84" height="19" rx="9.5" fill={hlBg('#FEF08A')} />
          <text x="27" y="136.5" className="font-game" fontSize="11" fill={INK}>
            •
          </text>
          <text x="63" y="136.5" textAnchor="middle" className="font-game" fontSize="11.5" fill="#1D4ED8">
            3 × 4
          </text>

          {[0, 1, 2].map((idx) => {
            const by = 149 + idx * 24;
            return (
              <g key={`l-${idx}`}>
                <circle cx="29" cy={by + 9} r="1.8" fill="#2563EB" />
                <rect x="37" y={by} width="20" height="18" rx="3" fill="#FFFFFF" stroke="#2563EB" strokeWidth="1.8" />
                <text x="62" y={by + 13} textAnchor="middle" className="font-game" fontSize="10.5" fill={INK}>
                  ×
                </text>
                <rect x="67" y={by} width="20" height="18" rx="3" fill="#FFFFFF" stroke="#2563EB" strokeWidth="1.8" />
              </g>
            );
          })}

          {/* Right Crew 18 */}
          <text x="179" y="114" textAnchor="middle" className="font-game" fontSize="12" fill="#DC2626">
            크루 18
          </text>
          <rect x="138" y="123" width="84" height="19" rx="9.5" fill={hlBg('#FEF08A')} />
          <text x="147" y="136.5" className="font-game" fontSize="11" fill={INK}>
            •
          </text>
          <text x="183" y="136.5" textAnchor="middle" className="font-game" fontSize="11.5" fill="#DC2626">
            3 × 6
          </text>

          {[0, 1, 2].map((idx) => {
            const by = 149 + idx * 24;
            return (
              <g key={`r-${idx}`}>
                <circle cx="149" cy={by + 9} r="1.8" fill="#DC2626" />
                <rect x="157" y={by} width="20" height="18" rx="3" fill="#FFFFFF" stroke="#DC2626" strokeWidth="1.8" />
                <text x="182" y={by + 13} textAnchor="middle" className="font-game" fontSize="10.5" fill={INK}>
                  ×
                </text>
                <rect x="187" y={by} width="20" height="18" rx="3" fill="#FFFFFF" stroke="#DC2626" strokeWidth="1.8" />
              </g>
            );
          })}
        </svg>
      );
    }

    /* 16. 최종 보스! 6·7·8·9단 (56=7×8 표기 통일) */
    case 'gugudan_boss': {
      const darkBg = isLightPrint ? '#FFFFFF' : '#0F172A';
      const goldText = isBw ? INK : '#FACC15';
      const bosses = [
        { x: 64, y: 69, text: '6 × 7 = ?' },
        { x: 176, y: 69, text: '6 × 8 = ?' },
        { x: 64, y: 120, text: '7 × 8 = ?' },
        { x: 176, y: 120, text: '8 × 9 = ?' },
      ];
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={darkBg} />

          {/* Corner L-Brackets */}
          <path d="M 8 22 V 8 H 22 M 218 8 H 232 V 22 M 8 208 V 222 H 22 M 218 222 H 232 V 208" fill="none" stroke={goldText} strokeWidth="2.4" />

          {/* Lightning Bolts */}
          <polyline points="17,18 27,32 22,32 30,45" fill="none" stroke={goldText} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          <polyline points="223,18 213,32 218,32 210,45" fill="none" stroke={goldText} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />

          <text x="120" y="29" textAnchor="middle" className="font-game" fontSize="12.5" fill={goldText}>
            최종 보스! 마의 구구단 4대장
          </text>

          {bosses.map((b) => (
            <g key={b.text}>
              <polygon points={`${b.x - 24},${b.y - 11} ${b.x - 19},${b.y - 23} ${b.x - 11},${b.y - 14}`} fill="#EF4444" />
              <polygon points={`${b.x + 24},${b.y - 11} ${b.x + 19},${b.y - 23} ${b.x + 11},${b.y - 14}`} fill="#EF4444" />
              <ellipse cx={b.x} cy={b.y} rx="45" ry="18" fill="#FFFFFF" stroke="#FACC15" strokeWidth="2.8" />
              <text x={b.x} y={b.y + 5.5} textAnchor="middle" className="font-game" fontSize="14.5" fill={INK}>
                {b.text}
              </text>
            </g>
          ))}

          {/* Hero Jollaman with wand */}
          <line x1="56" y1="184" x2="72" y2="164" stroke="#FACC15" strokeWidth="3" strokeLinecap="round" />
          <Stickman x={40} y={168} scale={0.82} pose="hero" armL={[-13, 24]} armR={[15, 16]} />

          <text x="150" y="176" textAnchor="middle" className="font-game" fontSize="10.5" fill={goldText}>
            6·7이 42가 좋다고? 흥!!
          </text>
          <text x="150" y="196" textAnchor="middle" className="font-game" fontSize="11.2" fill={isBw ? INK : '#FCA5A5'}>
            8×9는 어려울 걸??
          </text>
        </svg>
      );
    }

    /* 17. 구구단 완주 칭찬 포카 */
    case 'gugudan_praise': {
      const darkBg = isLightPrint ? '#FFFFFF' : '#0F172A';
      const goldText = isBw ? INK : '#FACC15';
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={darkBg} />

          {/* Radial rays */}
          {!isLightPrint && (
            <g opacity="0.16" fill="#FACC15">
              <polygon points="120,115 20,0 55,0" />
              <polygon points="120,115 95,0 145,0" />
              <polygon points="120,115 185,0 220,0" />
            </g>
          )}

          {/* Corner L-Brackets */}
          <path d="M 8 22 V 8 H 22 M 218 8 H 232 V 22 M 8 208 V 222 H 22 M 218 222 H 232 V 208" fill="none" stroke={goldText} strokeWidth="2.4" />

          {/* Crown */}
          <polygon points="103,26 105,12 113,18 120,10 127,18 135,12 137,26" fill={goldText} stroke={isBw ? INK : 'none'} strokeWidth="1.2" />

          <text x="120" y="47" textAnchor="middle" className="font-game" fontSize="12.5" fill={goldText}>
            2~9단 곱셈구구 완주!!
          </text>

          {/* Hero Jollaman */}
          <Stickman x={64} y={76} scale={0.85} pose="hero" armL={[-16, 10]} armR={[16, 10]} />

          {/* 9 x 9! Trophy */}
          <g transform="translate(174, 82)">
            <path d="M -22 -18 H 22 L 15 10 Q 0 18 -15 10 Z" fill="#FACC15" stroke={INK} strokeWidth="2" />
            <text x="0" y="-1" textAnchor="middle" className="font-game" fontSize="12.5" fill={INK}>
              9×9!
            </text>
            <rect x="-4" y="13" width="8" height="10" fill="#FACC15" stroke={INK} strokeWidth="1.5" />
            <rect x="-15" y="23" width="30" height="7" rx="1.5" fill="#FFFFFF" stroke={INK} strokeWidth="1.5" />
          </g>

          {/* Award Box */}
          <rect x="20" y="132" width="204" height="58" rx="4" fill={INK} opacity={isLightPrint ? 0.15 : 0.6} />
          <rect x="17" y="129" width="204" height="58" rx="4" fill="#FFFFFF" stroke="#FACC15" strokeWidth="2.2" />
          <text x="119" y="146" textAnchor="middle" className="font-game" fontSize="11.5" fill="#1D4ED8">
            구구단 18장 올 클리어!
          </text>
          <text x="119" y="162" textAnchor="middle" className="font-body font-bold" fontSize="9.2" fill={INK}>
            2~9단 · 0·1 함정 · 마의 보스전 정복!
          </text>
          <text x="119" y="178" textAnchor="middle" className="font-game" fontSize="9.4" fill="#DC2626">
            ★ 졸라수학맨 공식 구구단 챔피언 ★
          </text>

          <text x="120" y="210" textAnchor="middle" className="font-game" fontSize="11.2" fill={goldText}>
            전설의 구구단 마스터 등극!!
          </text>
        </svg>
      );
    }

    default:
      return null;
  }
};
