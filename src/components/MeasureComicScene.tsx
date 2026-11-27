import React from 'react';
import { EpisodeSceneType, PrintInkMode } from '../types/card';

interface MeasureComicSceneProps {
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

type StickPose = 'sunglasses' | 'happy' | 'headband' | 'hero' | 'panic';

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
  const hasHeadband = pose === 'headband' || isHero;

  const resolvedArmL: [number, number] = armL ?? [-14, 24];
  const resolvedArmR: [number, number] = armR ?? [14, 10];
  const resolvedLegL: [number, number] = legL ?? [-9, 50];
  const resolvedLegR: [number, number] = legR ?? [9, 50];
  const shoeColor = isHero ? '#FACC15' : '#EF4444';

  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
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

export const MeasureComicScene: React.FC<MeasureComicSceneProps> = ({
  sceneType,
  inkMode = 'full',
}) => {
  const isBw = inkMode === 'bw_worksheet';
  const isLightPrint = inkMode !== 'full';

  const softBg = (hex: string) => (isLightPrint ? '#FFFFFF' : hex);
  const hlBg = (hex: string) => (isLightPrint ? '#F8FAFC' : hex);
  const shadowInk = isLightPrint ? '#E2E8F0' : INK;

  switch (sceneType) {
    /* 00. 들이와 무게 도감 설명서 */
    case 'measure_guide': {
      const legend = [
        { color: '#2563EB', tag: '기본', rank: '★ N', desc: '들이(L·mL) · 무게(kg·g·t) 기본 (4장)' },
        { color: '#D97706', tag: '핵심/스페셜', rank: '★★★ SR', desc: '덧셈 받아올림 + 길이 나라 졸라맨 (3장)' },
        { color: '#059669', tag: '필살', rank: '★★ R', desc: '비커 눈금 · 실생활 단위 고르기 (2장)' },
        { color: '#7C3AED', tag: '함정/도전', rank: '★★★ SR', desc: '1000 빌려오기 · 솜vs쇠 함정 (4장)' },
        { color: '#0F172A', tag: '보스/칭찬', rank: '★★★★ SSR', desc: '총정리 보스 + 완주 포카 (2장)' },
      ];
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#FFFDF2')} />

          <g transform="translate(18, 12)">
            <rect x="0" y="14" width="24" height="32" rx="2" fill={hlBg('#DBEAFE')} stroke={INK} strokeWidth="2" />
            <rect x="2" y="26" width="20" height="18" fill={isLightPrint ? '#CBD5E1' : '#38BDF8'} />
            <text x="12" y="23" textAnchor="middle" className="font-mono-num font-bold" fontSize="8" fill="#1D4ED8">
              1L
            </text>
          </g>
          <Stickman
            x={57}
            y={23}
            scale={0.7}
            pose="headband"
            armL={[-15, 16]}
            armR={[16, 12]}
            legL={[-9, 44]}
            legR={[9, 44]}
          />

          <text x="155" y="34" textAnchor="middle" className="font-game" fontSize="14" fill={INK}>
            들이 · 무게 · 길이 도감!
          </text>
          <text x="155" y="51" textAnchor="middle" className="font-body font-bold" fontSize="8.5" fill="#2563EB">
            3학년 2학기 5단원 (총 16장)
          </text>

          <rect x="12" y="71" width="218" height="22" rx="2" fill={shadowInk} />
          <rect x="10" y="69" width="218" height="22" rx="2" fill={hlBg('#FEF08A')} stroke={INK} strokeWidth="2" />
          <text x="119" y="84" textAnchor="middle" className="font-game" fontSize="9.2" fill={INK}>
            들이(01~05) → 무게(06~11) → 길이 스페셜·보스(12~15)
          </text>

          <rect x="12" y="102" width="218" height="120" rx="2" fill={shadowInk} />
          <rect x="10" y="100" width="218" height="120" rx="2" fill="#FFFFFF" stroke={INK} strokeWidth="2.2" />
          <text x="19" y="115" className="font-game" fontSize="9.8" fill={INK}>
            카드 등급표 (표지 1 + 학습·스페셜 15장)
          </text>
          {legend.map((row, idx) => {
            const ry = 133 + idx * 18.5;
            return (
              <g key={row.tag}>
                <rect x="16" y={ry - 7.5} width="8.5" height="8.5" rx="1" fill={row.color} stroke={INK} strokeWidth="1.2" />
                <text x="27" y={ry} className="font-game" fontSize="7.8" fill={row.color}>
                  {row.tag}
                </text>
                <text x="77" y={ry} className="font-mono-num font-bold" fontSize="7" fill={INK}>
                  {row.rank}
                </text>
                <text x="121" y={ry} className="font-body font-bold" fontSize="7.3" fill="#475569">
                  {row.desc}
                </text>
              </g>
            );
          })}
        </svg>
      );
    }

    /* 01. 들이를 비교해 볼까요 (같은 크기 컵 기준) */
    case 'measure_cap_compare': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#EFF6FF')} />

          <text x="120" y="24" textAnchor="middle" className="font-game" fontSize="13" fill="#1E3A8A">
            같은 작은 컵으로 세어 비교!
          </text>

          {/* Left bottle: 가 (3 cups) */}
          <text x="62" y="48" textAnchor="middle" className="font-game" fontSize="11.5" fill="#2563EB">
            물병 가
          </text>
          <rect x="47" y="56" width="30" height="44" rx="4" fill={hlBg('#BFDBFE')} stroke={INK} strokeWidth="2" />
          <rect x="55" y="51" width="14" height="5" fill="#94A3B8" stroke={INK} strokeWidth="1.5" />
          <rect x="49" y="68" width="26" height="30" rx="2" fill={isLightPrint ? '#CBD5E1' : '#38BDF8'} />
          {[0, 1, 2].map((i) => (
            <g key={i} transform={`translate(${28 + i * 24}, 110)`}>
              <polygon points="0,0 14,0 12,15 2,15" fill={hlBg('#93C5FD')} stroke={INK} strokeWidth="1.5" />
            </g>
          ))}
          <text x="62" y="142" textAnchor="middle" className="font-game" fontSize="11.5" fill={INK}>
            작은 컵 3번!
          </text>

          <line x1="120" y1="38" x2="120" y2="148" stroke="#BFDBFE" strokeWidth="2" strokeDasharray="4 3" />

          {/* Right bottle: 나 (5 cups) */}
          <text x="178" y="48" textAnchor="middle" className="font-game" fontSize="11.5" fill="#EA580C">
            물병 나 (승리!)
          </text>
          <rect x="160" y="54" width="36" height="46" rx="5" fill={hlBg('#FED7AA')} stroke={INK} strokeWidth="2" />
          <rect x="170" y="49" width="16" height="5" fill="#F97316" stroke={INK} strokeWidth="1.5" />
          <rect x="162" y="61" width="32" height="37" rx="3" fill={isLightPrint ? '#94A3B8' : '#0EA5E9'} />
          {[0, 1, 2, 3, 4].map((i) => (
            <g key={i} transform={`translate(${136 + i * 17}, 110)`}>
              <polygon points="0,0 12,0 10.5,15 1.5,15" fill={hlBg('#93C5FD')} stroke={INK} strokeWidth="1.4" />
            </g>
          ))}
          <text x="178" y="142" textAnchor="middle" className="font-game" fontSize="11.5" fill="#C2410C">
            작은 컵 5번! 더 많다!
          </text>

          <line x1="16" y1="158" x2="224" y2="158" stroke="#DBEAFE" strokeWidth="2" />

          <Stickman
            x={38}
            y={174}
            scale={0.68}
            pose="panic"
            armL={[-14, 10]}
            armR={[14, 10]}
            legL={[-8, 44]}
            legR={[8, 44]}
            sweat
          />
          <text x="140" y="186" textAnchor="middle" className="font-game" fontSize="11.2" fill="#DC2626">
            주의! 컵 크기가 다르면 비교 땡!
          </text>
          <text x="140" y="206" textAnchor="middle" className="font-body font-bold" fontSize="9.2" fill={INK}>
            똑같은 컵으로 재어야 공정한 비교!
          </text>
        </svg>
      );
    }

    /* 02. 들이의 단위 ① L와 mL (1 L = 1000 mL) */
    case 'measure_cap_units': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#F0F9FF')} />

          <text x="120" y="24" textAnchor="middle" className="font-game" fontSize="13.5" fill="#1D4ED8">
            들이의 단위: L 와 mL!
          </text>

          {/* Left: 1 L milk carton */}
          <g transform="translate(18, 36)">
            <text x="44" y="12" textAnchor="middle" className="font-game" fontSize="12.5" fill="#2563EB">
              1 L (리터)
            </text>
            <polygon points="29,34 44,21 59,34" fill={hlBg('#DBEAFE')} stroke={INK} strokeWidth="2" />
            <rect x="29" y="34" width="30" height="52" fill={hlBg('#EFF6FF')} stroke={INK} strokeWidth="2" />
            <rect x="31" y="50" width="26" height="34" fill={isLightPrint ? '#CBD5E1' : '#60A5FA'} />
            <text x="44" y="71" textAnchor="middle" className="font-game" fontSize="12.5" fill={INK}>
              1 L
            </text>
            <text x="44" y="102" textAnchor="middle" className="font-body font-bold" fontSize="8.8" fill="#334155">
              큰 우유팩 1개!
            </text>
          </g>

          <text x="120" y="90" textAnchor="middle" className="font-game" fontSize="20" fill="#DC2626">
            =
          </text>

          {/* Right: 1 mL dropper */}
          <g transform="translate(134, 36)">
            <text x="44" y="12" textAnchor="middle" className="font-game" fontSize="12" fill="#059669">
              1 mL (밀리리터)
            </text>
            <rect x="39" y="24" width="10" height="10" rx="4" fill="#EF4444" stroke={INK} strokeWidth="1.6" />
            <polygon points="41,34 47,34 45,62 43,62" fill="#E2E8F0" stroke={INK} strokeWidth="1.6" />
            <path d="M 44 68 Q 49 76 44 81 Q 39 76 44 68 Z" fill={isLightPrint ? '#94A3B8' : '#38BDF8'} stroke={INK} strokeWidth="1.5" />
            <text x="44" y="96" textAnchor="middle" className="font-game" fontSize="10.5" fill="#059669">
              1 mL (물방울)
            </text>
            <text x="44" y="110" textAnchor="middle" className="font-body font-bold" fontSize="8.3" fill="#334155">
              1000방울 모이면 1 L!
            </text>
          </g>

          <line x1="16" y1="156" x2="224" y2="156" stroke="#BAE6FD" strokeWidth="2" strokeDasharray="4 3" />

          <Stickman
            x={38}
            y={170}
            scale={0.68}
            pose="sunglasses"
            armL={[-13, 18]}
            armR={[15, 6]}
            legL={[-8, 43]}
            legR={[8, 43]}
          />
          <text x="142" y="185" textAnchor="middle" className="font-game" fontSize="16" fill="#DC2626">
            1 L = 1000 mL
          </text>
          <text x="142" y="208" textAnchor="middle" className="font-mono-num font-bold" fontSize="10.5" fill={INK}>
            예) 2 L 400 mL = 2400 mL
          </text>
        </svg>
      );
    }

    /* 03. 들이를 어림하고 재어 볼까요 */
    case 'measure_cap_read': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#ECFDF5')} />

          <text x="120" y="24" textAnchor="middle" className="font-game" fontSize="12.5" fill="#065F46">
            눈높이 맞추기 + 작은 눈금 1칸 확인!
          </text>

          {/* Large Beaker */}
          <g transform="translate(22, 40)">
            <path d="M 10 8 L 10 118 Q 10 124 16 124 L 84 124 Q 90 124 90 118 L 90 8" fill="#FFFFFF" stroke={INK} strokeWidth="2.4" />
            <rect x="12" y="45" width="76" height="77" fill={isLightPrint ? '#CBD5E1' : '#7DD3FC'} />
            <line x1="12" y1="45" x2="88" y2="45" stroke="#0284C7" strokeWidth="2.2" />

            {[
              { y: 20, label: '1000', big: true },
              { y: 32, label: '', big: false },
              { y: 45, label: '700', big: true },
              { y: 58, label: '', big: false },
              { y: 71, label: '500', big: true },
              { y: 84, label: '', big: false },
              { y: 97, label: '300', big: true },
              { y: 110, label: '100', big: true },
            ].map((t, i) => (
              <g key={i}>
                <line
                  x1="12"
                  y1={t.y}
                  x2={t.big ? 34 : 24}
                  y2={t.y}
                  stroke={INK}
                  strokeWidth={t.big ? 2 : 1.3}
                />
                {t.label && (
                  <text x="38" y={t.y + 3} className="font-mono-num font-bold" fontSize="8" fill={INK}>
                    {t.label}
                  </text>
                )}
              </g>
            ))}
            <text x="72" y="23" className="font-mono-num font-bold" fontSize="8" fill="#475569">
              mL
            </text>
          </g>

          {/* Eye level dashed arrow */}
          <line x1="112" y1="85" x2="156" y2="85" stroke="#EF4444" strokeWidth="2.4" strokeDasharray="4 2" />
          <polygon points="112,85 119,81 119,89" fill="#EF4444" />

          <Stickman
            x={184}
            y={82}
            scale={0.85}
            pose="headband"
            armL={[-18, 12]}
            armR={[14, 18]}
            legL={[-10, 44]}
            legR={[10, 44]}
          />
          <text x="184" y="54" textAnchor="middle" className="font-game" fontSize="11" fill="#059669">
            물 높이와 눈높이 딱!
          </text>
          <text x="184" y="70" textAnchor="middle" className="font-game" fontSize="11.5" fill="#DC2626">
            읽으면 700 mL!
          </text>

          <text x="120" y="192" textAnchor="middle" className="font-game" fontSize="11.2" fill="#047857">
            어림 기준: 작은 생수병 ≈ 500 mL / 큰 우유 ≈ 1 L
          </text>
          <text x="120" y="212" textAnchor="middle" className="font-body font-bold" fontSize="9" fill="#475569">
            작은 눈금 1칸이 몇 mL인지부터 먼저 확인!
          </text>
        </svg>
      );
    }

    /* 04. 들이의 덧셈 · 받아올림 (1000 mL -> 1 L) */
    case 'measure_cap_add': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#FFFBEB')} />

          <text x="120" y="24" textAnchor="middle" className="font-game" fontSize="12.5" fill="#92400E">
            L는 L끼리, mL는 mL끼리! 1000 mL → +1 L
          </text>

          {/* Vertical addition slate */}
          <rect x="17" y="41" width="142" height="122" rx="4" fill={shadowInk} />
          <rect x="14" y="38" width="142" height="122" rx="4" fill="#FFFFFF" stroke={INK} strokeWidth="2.2" />

          <text x="44" y="57" textAnchor="middle" className="font-game" fontSize="10" fill="#DC2626">
            +1 L ↑
          </text>
          <text x="112" y="57" textAnchor="middle" className="font-mono-num font-bold" fontSize="8.2" fill="#DC2626">
            (1200 → 1L 200mL)
          </text>

          <text x="58" y="82" textAnchor="end" className="font-mono-num font-bold" fontSize="14" fill="#2563EB">
            1 L
          </text>
          <text x="144" y="82" textAnchor="end" className="font-mono-num font-bold" fontSize="14" fill="#059669">
            700 mL
          </text>

          <text x="26" y="106" className="font-game" fontSize="14" fill={INK}>
            +
          </text>
          <text x="58" y="106" textAnchor="end" className="font-mono-num font-bold" fontSize="14" fill="#2563EB">
            1 L
          </text>
          <text x="144" y="106" textAnchor="end" className="font-mono-num font-bold" fontSize="14" fill="#059669">
            500 mL
          </text>

          <line x1="22" y1="116" x2="148" y2="116" stroke={INK} strokeWidth="2.4" />

          <text x="58" y="144" textAnchor="end" className="font-game" fontSize="16" fill="#DC2626">
            3 L
          </text>
          <text x="144" y="144" textAnchor="end" className="font-game" fontSize="16" fill="#059669">
            200 mL
          </text>

          <Stickman
            x={196}
            y={82}
            scale={0.85}
            pose="happy"
            armL={[-15, 4]}
            armR={[15, 4]}
            legL={[-9, 46]}
            legR={[9, 46]}
          />
          <text x="196" y="54" textAnchor="middle" className="font-game" fontSize="11.5" fill="#D97706">
            1000 변신!
          </text>

          <text x="120" y="190" textAnchor="middle" className="font-game" fontSize="11.5" fill={INK}>
            700 mL + 500 mL = <tspan fill="#DC2626">1200 mL</tspan>
          </text>
          <text x="120" y="210" textAnchor="middle" className="font-body font-bold" fontSize="9" fill="#B45309">
            1000 mL는 1 L로 올려 주고 남은 200 mL만!
          </text>
        </svg>
      );
    }

    /* 05. 들이의 뺄셈 · 1 L 빌려오기 함정 */
    case 'measure_cap_sub_trap': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#FEF2F2')} />

          <text x="120" y="24" textAnchor="middle" className="font-game" fontSize="12.5" fill="#B91C1C">
            1 L 빌려올 땐 100이 아니라 1000 mL!
          </text>

          <rect x="17" y="41" width="144" height="122" rx="4" fill={shadowInk} />
          <rect x="14" y="38" width="144" height="122" rx="4" fill="#FFFFFF" stroke={INK} strokeWidth="2.2" />

          <text x="58" y="59" textAnchor="end" className="font-game" fontSize="11" fill="#DC2626">
            2 L
          </text>
          <text x="146" y="59" textAnchor="end" className="font-game" fontSize="10.5" fill="#DC2626">
            1200 mL
          </text>
          <path d="M 60 53 Q 84 42 102 51" fill="none" stroke="#DC2626" strokeWidth="1.8" />
          <text x="82" y="45" textAnchor="middle" className="font-mono-num font-bold" fontSize="7.4" fill="#DC2626">
            +1000
          </text>

          <text x="58" y="82" textAnchor="end" className="font-mono-num font-bold" fontSize="13.5" fill="#94A3B8">
            3 L
          </text>
          <line x1="34" y1="78" x2="60" y2="78" stroke="#EF4444" strokeWidth="1.8" />
          <text x="146" y="82" textAnchor="end" className="font-mono-num font-bold" fontSize="13.5" fill="#94A3B8">
            200 mL
          </text>
          <line x1="94" y1="78" x2="148" y2="78" stroke="#EF4444" strokeWidth="1.8" />

          <text x="24" y="107" className="font-game" fontSize="14" fill={INK}>
            -
          </text>
          <text x="58" y="107" textAnchor="end" className="font-mono-num font-bold" fontSize="13.5" fill="#2563EB">
            1 L
          </text>
          <text x="146" y="107" textAnchor="end" className="font-mono-num font-bold" fontSize="13.5" fill="#059669">
            700 mL
          </text>

          <line x1="22" y1="117" x2="150" y2="117" stroke={INK} strokeWidth="2.4" />
          <text x="58" y="144" textAnchor="end" className="font-game" fontSize="16" fill="#2563EB">
            1 L
          </text>
          <text x="146" y="144" textAnchor="end" className="font-game" fontSize="16" fill="#059669">
            500 mL
          </text>

          <Stickman
            x={196}
            y={86}
            scale={0.84}
            pose="panic"
            armL={[-14, 8]}
            armR={[14, 8]}
            legL={[-9, 46]}
            legR={[9, 46]}
            sweat
          />
          <text x="196" y="52" textAnchor="middle" className="font-game" fontSize="10" fill="#DC2626">
            100 빌리면
          </text>
          <text x="196" y="65" textAnchor="middle" className="font-game" fontSize="10.5" fill="#DC2626">
            완전 땡!!
          </text>

          <text x="120" y="190" textAnchor="middle" className="font-game" fontSize="11.5" fill="#DC2626">
            1 L = 1000 mL! 통째로 1000 빌려오기!
          </text>
          <text x="120" y="210" textAnchor="middle" className="font-body font-bold" fontSize="9" fill="#334155">
            200에서 700 못 빼니까 1000 더해 1200 - 700 = 500!
          </text>
        </svg>
      );
    }

    /* 06. 무게를 비교해 볼까요 (양팔저울) */
    case 'measure_wt_compare': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#EFF6FF')} />

          <text x="120" y="24" textAnchor="middle" className="font-game" fontSize="13" fill="#1E3A8A">
            양팔저울이 내려간 쪽이 무거움!
          </text>

          {/* Balance Scale tilted left down */}
          <g transform="translate(120, 124)">
            <polygon points="-24,26 24,26 8,0 -8,0" fill="#64748B" stroke={INK} strokeWidth="2" />
            <line x1="0" y1="0" x2="0" y2="-48" stroke={INK} strokeWidth="3.5" />
            <g transform="rotate(-14, 0, -46)">
              <line x1="-68" y1="-46" x2="68" y2="-46" stroke={INK} strokeWidth="3.2" strokeLinecap="round" />
              <circle cx="0" cy="-46" r="4" fill="#FACC15" stroke={INK} strokeWidth="1.8" />
            </g>

            {/* Left pan (lower) with Watermelon */}
            <g transform="translate(-66, -29)">
              <line x1="0" y1="0" x2="-16" y2="24" stroke={INK} strokeWidth="1.5" />
              <line x1="0" y1="0" x2="16" y2="24" stroke={INK} strokeWidth="1.5" />
              <path d="M -20 24 Q 0 33 20 24 Z" fill="#94A3B8" stroke={INK} strokeWidth="1.8" />
              <circle cx="0" cy="14" r="13" fill={isLightPrint ? '#CBD5E1' : '#22C55E'} stroke={INK} strokeWidth="2" />
              <path d="M -5 3 Q 0 14 -5 25 M 5 3 Q 0 14 5 25" fill="none" stroke="#14532D" strokeWidth="1.4" />
              <text x="0" y="45" textAnchor="middle" className="font-game" fontSize="10.5" fill="#DC2626">
                무겁다! (↓)
              </text>
            </g>

            {/* Right pan (higher) with Apple */}
            <g transform="translate(66, -62)">
              <line x1="0" y1="0" x2="-16" y2="24" stroke={INK} strokeWidth="1.5" />
              <line x1="0" y1="0" x2="16" y2="24" stroke={INK} strokeWidth="1.5" />
              <path d="M -20 24 Q 0 33 20 24 Z" fill="#94A3B8" stroke={INK} strokeWidth="1.8" />
              <circle cx="0" cy="16" r="8.5" fill={isLightPrint ? '#E2E8F0' : '#EF4444'} stroke={INK} strokeWidth="1.8" />
              <line x1="0" y1="7" x2="2" y2="3" stroke="#15803D" strokeWidth="2" />
              <text x="0" y="43" textAnchor="middle" className="font-game" fontSize="10.5" fill="#2563EB">
                가볍다! (↑)
              </text>
            </g>
          </g>

          <Stickman
            x={34}
            y={180}
            scale={0.55}
            pose="sunglasses"
            armL={[-13, 18]}
            armR={[13, 10]}
            legL={[-8, 42]}
            legR={[8, 42]}
          />
          <text x="136" y="192" textAnchor="middle" className="font-game" fontSize="10.8" fill={INK}>
            바둑돌·클립 같은 기준 물건 개수로도 비교!
          </text>
          <text x="136" y="211" textAnchor="middle" className="font-body font-bold" fontSize="8.8" fill="#475569">
            겉크기가 작아도 돌처럼 더 무거울 수 있어!
          </text>
        </svg>
      );
    }

    /* 07. 무게의 단위 ② kg · g · t (1000배 3단 진화) */
    case 'measure_wt_units': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#F0F9FF')} />

          <text x="120" y="24" textAnchor="middle" className="font-game" fontSize="13.5" fill="#1E3A8A">
            g → kg → t : 1000배씩 커진다!
          </text>

          {/* 1 g */}
          <g transform="translate(10, 48)">
            <text x="30" y="14" textAnchor="middle" className="font-game" fontSize="13.5" fill="#059669">
              1 g
            </text>
            <path d="M 24 30 L 24 56 A 6 6 0 0 0 36 56 L 36 34 A 4 4 0 0 0 28 34 L 28 52" fill="none" stroke="#475569" strokeWidth="2.6" strokeLinecap="round" />
            <text x="30" y="78" textAnchor="middle" className="font-game" fontSize="9.8" fill={INK}>
              클립 1개
            </text>
          </g>

          <path d="M 68 92 L 82 92" stroke="#DC2626" strokeWidth="2" />
          <path d="M 78 88 L 83 92 L 78 96" fill="none" stroke="#DC2626" strokeWidth="2" />
          <text x="75" y="83" textAnchor="middle" className="font-game" fontSize="9.5" fill="#DC2626">
            ×1000
          </text>

          {/* 1 kg */}
          <g transform="translate(87, 48)">
            <text x="33" y="14" textAnchor="middle" className="font-game" fontSize="13.5" fill="#2563EB">
              1 kg
            </text>
            <path d="M 25 34 A 8 8 0 0 1 41 34" fill="none" stroke={INK} strokeWidth="2.4" />
            <polygon points="20,36 46,36 50,64 16,64" fill={hlBg('#93C5FD')} stroke={INK} strokeWidth="2" />
            <text x="33" y="55" textAnchor="middle" className="font-game" fontSize="10.5" fill={INK}>
              1kg
            </text>
            <text x="33" y="78" textAnchor="middle" className="font-game" fontSize="9.8" fill={INK}>
              물 1 L 무게
            </text>
          </g>

          <path d="M 152 92 L 166 92" stroke="#DC2626" strokeWidth="2" />
          <path d="M 162 88 L 167 92 L 162 96" fill="none" stroke="#DC2626" strokeWidth="2" />
          <text x="159" y="83" textAnchor="middle" className="font-game" fontSize="9.5" fill="#DC2626">
            ×1000
          </text>

          {/* 1 t */}
          <g transform="translate(168, 48)">
            <text x="33" y="14" textAnchor="middle" className="font-game" fontSize="13.5" fill="#7C3AED">
              1 t
            </text>
            <rect x="12" y="36" width="26" height="20" fill={hlBg('#DDD6FE')} stroke={INK} strokeWidth="1.8" />
            <polygon points="38,41 50,41 54,56 38,56" fill={hlBg('#C4B5FD')} stroke={INK} strokeWidth="1.8" />
            <circle cx="21" cy="58" r="4.5" fill={INK} />
            <circle cx="45" cy="58" r="4.5" fill={INK} />
            <text x="33" y="78" textAnchor="middle" className="font-game" fontSize="9.8" fill={INK}>
              트럭 · 코끼리
            </text>
          </g>

          <line x1="16" y1="146" x2="224" y2="146" stroke="#BAE6FD" strokeWidth="2" strokeDasharray="4 3" />

          <Stickman
            x={36}
            y={166}
            scale={0.64}
            pose="hero"
            armL={[-13, 16]}
            armR={[14, 6]}
            legL={[-8, 42]}
            legR={[8, 42]}
          />
          <text x="142" y="178" textAnchor="middle" className="font-game" fontSize="12.5" fill="#DC2626">
            1 kg = 1000 g  |  1 t = 1000 kg
          </text>
          <text x="142" y="200" textAnchor="middle" className="font-mono-num font-bold" fontSize="9.8" fill={INK}>
            2 kg 500 g = 2500 g / 3 t = 3000 kg
          </text>
        </svg>
      );
    }

    /* 08. 무게 어림 · 저울 눈금 함정 */
    case 'measure_wt_scale_trap': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#FEF2F2')} />

          <text x="120" y="24" textAnchor="middle" className="font-game" fontSize="12.5" fill="#B91C1C">
            저울 바늘 읽을 땐 작은 눈금 1칸 값부터!
          </text>

          <g transform="translate(82, 108)">
            <line x1="0" y1="-44" x2="0" y2="-56" stroke={INK} strokeWidth="3" />
            <rect x="-34" y="-62" width="68" height="7" rx="2" fill="#94A3B8" stroke={INK} strokeWidth="1.8" />
            <circle cx="0" cy="-70" r="9" fill={isLightPrint ? '#E2E8F0' : '#F97316'} stroke={INK} strokeWidth="1.6" />

            <circle cx="0" cy="0" r="46" fill="#FFFFFF" stroke={INK} strokeWidth="2.4" />
            <circle cx="0" cy="0" r="39" fill="none" stroke="#CBD5E1" strokeWidth="1" />
            <text x="0" y="-26" textAnchor="middle" className="font-mono-num font-bold" fontSize="8" fill={INK}>
              0
            </text>
            <text x="27" y="4" textAnchor="middle" className="font-mono-num font-bold" fontSize="8" fill="#2563EB">
              500g
            </text>
            <text x="0" y="33" textAnchor="middle" className="font-mono-num font-bold" fontSize="8" fill={INK}>
              1kg
            </text>
            <text x="-27" y="4" textAnchor="middle" className="font-mono-num font-bold" fontSize="7.5" fill={INK}>
              1500
            </text>

            {[18, 36, 54, 72].map((deg) => (
              <line
                key={deg}
                x1="0"
                y1="-39"
                x2="0"
                y2="-33"
                stroke="#64748B"
                strokeWidth="1.4"
                transform={`rotate(${deg})`}
              />
            ))}
            <g transform="rotate(126)">
              <line x1="0" y1="6" x2="0" y2="-33" stroke="#DC2626" strokeWidth="2.6" strokeLinecap="round" />
            </g>
            <circle cx="0" cy="0" r="4" fill="#DC2626" stroke={INK} strokeWidth="1.4" />
          </g>

          <Stickman
            x={186}
            y={94}
            scale={0.85}
            pose="panic"
            armL={[-16, 12]}
            armR={[13, 18]}
            legL={[-9, 44]}
            legR={[9, 44]}
            sweat
          />
          <text x="184" y="54" textAnchor="middle" className="font-game" fontSize="10.5" fill="#DC2626">
            500에서 2칸 더!
          </text>
          <text x="184" y="70" textAnchor="middle" className="font-mono-num font-bold" fontSize="9.5" fill={INK}>
            1칸=100g → 700g!
          </text>

          <text x="120" y="186" textAnchor="middle" className="font-game" fontSize="11" fill="#DC2626">
            함정 1: 작은 눈금 1칸 = 50g인지 100g인지 확인!
          </text>
          <text x="120" y="206" textAnchor="middle" className="font-body font-bold" fontSize="9" fill="#334155">
            함정 2: 바구니째 쟀으면 바구니 무게를 꼭 빼야 진짜 무게!
          </text>
        </svg>
      );
    }

    /* 09. 무게의 덧셈 · 받아올림 (1000 g -> 1 kg) */
    case 'measure_wt_add': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#FFFBEB')} />

          <text x="120" y="24" textAnchor="middle" className="font-game" fontSize="12.5" fill="#92400E">
            kg은 kg끼리, g은 g끼리! 1000 g → +1 kg
          </text>

          <rect x="17" y="41" width="142" height="122" rx="4" fill={shadowInk} />
          <rect x="14" y="38" width="142" height="122" rx="4" fill="#FFFFFF" stroke={INK} strokeWidth="2.2" />

          <text x="47" y="57" textAnchor="middle" className="font-game" fontSize="9.5" fill="#DC2626">
            +1 kg ↑
          </text>
          <text x="115" y="57" textAnchor="middle" className="font-mono-num font-bold" fontSize="8" fill="#DC2626">
            (1400 → 1kg 400g)
          </text>

          <text x="64" y="82" textAnchor="end" className="font-mono-num font-bold" fontSize="13.5" fill="#2563EB">
            2 kg
          </text>
          <text x="146" y="82" textAnchor="end" className="font-mono-num font-bold" fontSize="13.5" fill="#059669">
            800 g
          </text>

          <text x="24" y="106" className="font-game" fontSize="14" fill={INK}>
            +
          </text>
          <text x="64" y="106" textAnchor="end" className="font-mono-num font-bold" fontSize="13.5" fill="#2563EB">
            1 kg
          </text>
          <text x="146" y="106" textAnchor="end" className="font-mono-num font-bold" fontSize="13.5" fill="#059669">
            600 g
          </text>

          <line x1="22" y1="116" x2="148" y2="116" stroke={INK} strokeWidth="2.4" />

          <text x="64" y="144" textAnchor="end" className="font-game" fontSize="15.5" fill="#DC2626">
            4 kg
          </text>
          <text x="146" y="144" textAnchor="end" className="font-game" fontSize="15.5" fill="#059669">
            400 g
          </text>

          <Stickman
            x={196}
            y={82}
            scale={0.85}
            pose="sunglasses"
            armL={[-15, 6]}
            armR={[15, 6]}
            legL={[-9, 46]}
            legR={[9, 46]}
          />
          <text x="196" y="54" textAnchor="middle" className="font-game" fontSize="11.5" fill="#D97706">
            천 그램 컷!
          </text>

          <text x="120" y="190" textAnchor="middle" className="font-game" fontSize="11.2" fill={INK}>
            800 g + 600 g = <tspan fill="#DC2626">1400 g = 1 kg 400 g</tspan>
          </text>
          <text x="120" y="210" textAnchor="middle" className="font-body font-bold" fontSize="9" fill="#B45309">
            1000 g을 1 kg으로 올려 주면 4 kg 400 g 완성!
          </text>
        </svg>
      );
    }

    /* 10. 무게의 뺄셈 · 1 kg 빌려오기 함정 */
    case 'measure_wt_sub_trap': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#FEF2F2')} />

          <text x="120" y="24" textAnchor="middle" className="font-game" fontSize="12.5" fill="#B91C1C">
            못 뺄 땐 1 kg 빌려 1000 g으로 변신!
          </text>

          <rect x="17" y="41" width="146" height="122" rx="4" fill={shadowInk} />
          <rect x="14" y="38" width="146" height="122" rx="4" fill="#FFFFFF" stroke={INK} strokeWidth="2.2" />

          <text x="64" y="59" textAnchor="end" className="font-game" fontSize="11" fill="#DC2626">
            3 kg
          </text>
          <text x="150" y="59" textAnchor="end" className="font-game" fontSize="10.5" fill="#DC2626">
            1200 g
          </text>
          <path d="M 67 53 Q 88 42 106 51" fill="none" stroke="#DC2626" strokeWidth="1.8" />
          <text x="88" y="45" textAnchor="middle" className="font-mono-num font-bold" fontSize="7.4" fill="#DC2626">
            +1000
          </text>

          <text x="64" y="82" textAnchor="end" className="font-mono-num font-bold" fontSize="13.5" fill="#94A3B8">
            4 kg
          </text>
          <line x1="36" y1="78" x2="66" y2="78" stroke="#EF4444" strokeWidth="1.8" />
          <text x="150" y="82" textAnchor="end" className="font-mono-num font-bold" fontSize="13.5" fill="#94A3B8">
            200 g
          </text>
          <line x1="104" y1="78" x2="152" y2="78" stroke="#EF4444" strokeWidth="1.8" />

          <text x="23" y="107" className="font-game" fontSize="14" fill={INK}>
            -
          </text>
          <text x="64" y="107" textAnchor="end" className="font-mono-num font-bold" fontSize="13.5" fill="#2563EB">
            1 kg
          </text>
          <text x="150" y="107" textAnchor="end" className="font-mono-num font-bold" fontSize="13.5" fill="#059669">
            700 g
          </text>

          <line x1="22" y1="117" x2="152" y2="117" stroke={INK} strokeWidth="2.4" />
          <text x="64" y="144" textAnchor="end" className="font-game" fontSize="15.5" fill="#2563EB">
            2 kg
          </text>
          <text x="150" y="144" textAnchor="end" className="font-game" fontSize="15.5" fill="#059669">
            500 g
          </text>

          <Stickman
            x={196}
            y={86}
            scale={0.84}
            pose="headband"
            armL={[-14, 14]}
            armR={[14, 6]}
            legL={[-9, 46]}
            legR={[9, 46]}
          />
          <text x="196" y="52" textAnchor="middle" className="font-game" fontSize="10" fill={INK}>
            1000 빌려
          </text>
          <text x="196" y="65" textAnchor="middle" className="font-game" fontSize="10.2" fill="#DC2626">
            1200 - 700!
          </text>

          <text x="120" y="190" textAnchor="middle" className="font-game" fontSize="11.2" fill="#DC2626">
            들이(1 L=1000 mL)도 무게(1 kg=1000 g)도 똑같아!
          </text>
          <text x="120" y="210" textAnchor="middle" className="font-body font-bold" fontSize="9" fill="#334155">
            무조건 1000을 빌려와서 더한 다음 빼면 실수 제로!
          </text>
        </svg>
      );
    }

    /* 11. 1000 단위 변환 · 솜 1kg vs 쇠 1kg 함정 */
    case 'measure_unit_convert_trap': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#F5F3FF')} />

          <text x="120" y="24" textAnchor="middle" className="font-game" fontSize="12.5" fill="#5B21B6">
            함정 문제 1순위! 솜 1 kg vs 쇠 1 kg?
          </text>

          {/* Horizontal Balance (Equal!) */}
          <g transform="translate(120, 118)">
            <polygon points="-20,24 20,24 6,0 -6,0" fill="#64748B" stroke={INK} strokeWidth="2" />
            <line x1="0" y1="0" x2="0" y2="-46" stroke={INK} strokeWidth="3.2" />
            <line x1="-68" y1="-46" x2="68" y2="-46" stroke={INK} strokeWidth="3" />
            <circle cx="0" cy="-46" r="4" fill="#FACC15" stroke={INK} strokeWidth="1.6" />

            <g transform="translate(-66, -46)">
              <line x1="0" y1="0" x2="-16" y2="24" stroke={INK} strokeWidth="1.4" />
              <line x1="0" y1="0" x2="16" y2="24" stroke={INK} strokeWidth="1.4" />
              <path d="M -22 24 Q 0 32 22 24 Z" fill="#94A3B8" stroke={INK} strokeWidth="1.8" />
              <path
                d="M -18 22 C -24 12, -16 0, -6 4 C -2 -5, 10 -5, 13 5 C 23 5, 24 18, 16 22 Z"
                fill="#FFFFFF"
                stroke={INK}
                strokeWidth="1.8"
              />
              <text x="0" y="17" textAnchor="middle" className="font-game" fontSize="8.8" fill={INK}>
                솜 1kg
              </text>
            </g>

            <g transform="translate(66, -46)">
              <line x1="0" y1="0" x2="-16" y2="24" stroke={INK} strokeWidth="1.4" />
              <line x1="0" y1="0" x2="16" y2="24" stroke={INK} strokeWidth="1.4" />
              <path d="M -22 24 Q 0 32 22 24 Z" fill="#94A3B8" stroke={INK} strokeWidth="1.8" />
              <rect x="-11" y="9" width="22" height="14" rx="2" fill="#334155" stroke={INK} strokeWidth="1.8" />
              <text x="0" y="19" textAnchor="middle" className="font-game" fontSize="8.2" fill="#FFFFFF">
                쇠 1kg
              </text>
            </g>

            <text x="0" y="-60" textAnchor="middle" className="font-game" fontSize="14.5" fill="#DC2626">
              수평! (=)
            </text>
          </g>

          <Stickman
            x={34}
            y={172}
            scale={0.58}
            pose="happy"
            armL={[-13, 14]}
            armR={[13, 8]}
            legL={[-8, 42]}
            legR={[8, 42]}
          />
          <text x="136" y="176" textAnchor="middle" className="font-game" fontSize="11.2" fill="#7C3AED">
            부피(크기)만 크지 무게는 똑같이 1 kg!
          </text>
          <text x="136" y="196" textAnchor="middle" className="font-mono-num font-bold" fontSize="9.2" fill={INK}>
            1 L = 1000 mL | 1 kg = 1000 g | 1 t = 1000 kg
          </text>
          <text x="136" y="213" textAnchor="middle" className="font-body font-bold" fontSize="8.5" fill="#475569">
            셋 다 1000배 단위로 똑같이 변신!
          </text>
        </svg>
      );
    }

    /* 12. 스페셜! 길이 나라 졸라맨 (머리카락 1mm, 자 일부분 1cm, 키 1m, 집~학교 1km) */
    case 'measure_length_special': {
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#F5F3FF')} />

          <text x="120" y="21" textAnchor="middle" className="font-game" fontSize="12" fill="#5B21B6">
            스페셜! 졸라맨으로 보는 길이 단위 4총사
          </text>

          {/* Clean dashed crosshairs dividing 2x2 open layout (no 4 heavy boxes!) */}
          <line x1="120" y1="30" x2="120" y2="220" stroke="#DDD6FE" strokeWidth="2" strokeDasharray="4 3" />
          <line x1="14" y1="126" x2="226" y2="126" stroke="#DDD6FE" strokeWidth="2" strokeDasharray="4 3" />

          {/* Quadrant 1 (Top-Left): 1 mm = 졸라맨 머리카락 */}
          <g transform="translate(10, 32)">
            <rect x="4" y="2" width="38" height="16" rx="2" fill="#DC2626" />
            <text x="23" y="13.5" textAnchor="middle" className="font-game" fontSize="9.5" fill="#FFFFFF">
              1 mm
            </text>
            <text x="74" y="13.5" textAnchor="middle" className="font-game" fontSize="9" fill={INK}>
              머리카락!
            </text>

            <circle cx="28" cy="68" r="12" fill="#FFFFFF" stroke={INK} strokeWidth="2.2" />
            <LoopHair x={28} y={56} />
            <circle cx="24" cy="67" r="1.4" fill={INK} />
            <circle cx="32" cy="67" r="1.4" fill={INK} />
            <path d="M 25 72 Q 28 74 31 72" fill="none" stroke={INK} strokeWidth="1.6" />

            <line x1="33" y1="51" x2="54" y2="45" stroke="#DC2626" strokeWidth="1.2" strokeDasharray="2 2" />
            <circle cx="72" cy="46" r="20" fill={hlBg('#FEF2F2')} stroke={INK} strokeWidth="2.2" />
            <line x1="87" y1="60" x2="98" y2="71" stroke={INK} strokeWidth="3.5" strokeLinecap="round" />
            <path d="M 64 56 C 58 36, 86 36, 80 56" fill="none" stroke={INK} strokeWidth="3.8" strokeLinecap="round" />
            <line x1="65" y1="40" x2="79" y2="40" stroke="#DC2626" strokeWidth="1.4" />
            <text x="72" y="35" textAnchor="middle" className="font-game" fontSize="8.5" fill="#DC2626">
              1mm
            </text>
            <text x="64" y="84" textAnchor="middle" className="font-mono-num font-bold" fontSize="7.6" fill="#475569">
              머리카락 굵기!
            </text>
          </g>

          {/* Quadrant 2 (Top-Right): 1 cm = 자의 일부분 */}
          <g transform="translate(124, 32)">
            <rect x="4" y="2" width="38" height="16" rx="2" fill="#2563EB" />
            <text x="23" y="13.5" textAnchor="middle" className="font-game" fontSize="9.5" fill="#FFFFFF">
              1 cm
            </text>
            <text x="74" y="13.5" textAnchor="middle" className="font-game" fontSize="9" fill={INK}>
              자의 일부분
            </text>

            <rect x="8" y="34" width="91" height="28" rx="1.5" fill={hlBg('#FEF08A')} stroke={INK} strokeWidth="1.8" />
            <rect x="18" y="34" width="36" height="9" fill={isLightPrint ? '#CBD5E1' : '#93C5FD'} />
            {[0, 1, 2].map((cm) => {
              const cx = 18 + cm * 36;
              return (
                <g key={cm}>
                  <line x1={cx} y1="34" x2={cx} y2="47" stroke={INK} strokeWidth="1.8" />
                  <text x={cx} y="57" textAnchor="middle" className="font-mono-num font-bold" fontSize="8.5" fill={INK}>
                    {cm}
                  </text>
                </g>
              );
            })}
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((mm) => (
              <line
                key={mm}
                x1={18 + mm * 3.6}
                y1="34"
                x2={18 + mm * 3.6}
                y2={mm === 5 ? 43 : 39}
                stroke={INK}
                strokeWidth="0.9"
              />
            ))}
            <line x1="18" y1="29" x2="54" y2="29" stroke="#2563EB" strokeWidth="1.8" />
            <text x="36" y="26.5" textAnchor="middle" className="font-game" fontSize="8" fill="#2563EB">
              1 cm
            </text>

            <Stickman
              x={84}
              y={69}
              scale={0.4}
              pose="sunglasses"
              armL={[-18, 8]}
              armR={[10, 16]}
              legL={[-7, 40]}
              legR={[7, 40]}
            />
            <text x="41" y="80" textAnchor="middle" className="font-mono-num font-bold" fontSize="8" fill="#1D4ED8">
              1 cm = 10 mm
            </text>
          </g>

          {/* Quadrant 3 (Bottom-Left): 1 m = 졸라맨 키 */}
          <g transform="translate(10, 132)">
            <rect x="4" y="2" width="34" height="16" rx="2" fill="#059669" />
            <text x="21" y="13.5" textAnchor="middle" className="font-game" fontSize="9.5" fill="#FFFFFF">
              1 m
            </text>
            <text x="72" y="13.5" textAnchor="middle" className="font-game" fontSize="9" fill={INK}>
              졸라맨 키!
            </text>

            <Stickman
              x={42}
              y={34}
              scale={0.78}
              pose="hero"
              armL={[-15, 18]}
              armR={[16, 8]}
              legL={[-9, 44]}
              legR={[9, 44]}
            />
            <line x1="68" y1="22" x2="68" y2="71" stroke="#059669" strokeWidth="2.2" />
            <line x1="63" y1="22" x2="73" y2="22" stroke="#059669" strokeWidth="2" />
            <line x1="63" y1="71" x2="73" y2="71" stroke="#059669" strokeWidth="2" />
            <text x="89" y="46" textAnchor="middle" className="font-game" fontSize="11.5" fill="#059669">
              1 m
            </text>
            <text x="89" y="59" textAnchor="middle" className="font-mono-num font-bold" fontSize="7.4" fill="#475569">
              (100 cm)
            </text>
            <text x="53" y="86" textAnchor="middle" className="font-body font-bold" fontSize="7.6" fill={INK}>
              내 키가 딱 1 m!
            </text>
          </g>

          {/* Quadrant 4 (Bottom-Right): 1 km = 집 ~ 학교 */}
          <g transform="translate(124, 132)">
            <rect x="4" y="2" width="38" height="16" rx="2" fill="#7C3AED" />
            <text x="23" y="13.5" textAnchor="middle" className="font-game" fontSize="9.5" fill="#FFFFFF">
              1 km
            </text>
            <text x="74" y="13.5" textAnchor="middle" className="font-game" fontSize="9" fill={INK}>
              집~학교!
            </text>

            <g transform="translate(8, 34)">
              <polygon points="10,0 0,9 20,9" fill="#EF4444" stroke={INK} strokeWidth="1.6" />
              <rect x="2" y="9" width="16" height="13" fill={hlBg('#FEF3C7')} stroke={INK} strokeWidth="1.6" />
              <rect x="7" y="14" width="6" height="8" fill="#92400E" />
              <text x="10" y="32" textAnchor="middle" className="font-game" fontSize="7.5" fill={INK}>
                집
              </text>
            </g>

            <path d="M 30 54 Q 45 46 54 53 Q 64 60 76 53" fill="none" stroke="#94A3B8" strokeWidth="4" strokeLinecap="round" />
            <path d="M 30 54 Q 45 46 54 53 Q 64 60 76 53" fill="none" stroke="#FFFFFF" strokeWidth="1.2" strokeDasharray="3 3" />
            <Stickman
              x={53}
              y={33}
              scale={0.34}
              pose="happy"
              armL={[-13, 16]}
              armR={[13, 8]}
              legL={[-10, 42]}
              legR={[12, 38]}
            />

            <g transform="translate(77, 31)">
              <rect x="2" y="9" width="22" height="16" fill={hlBg('#DBEAFE')} stroke={INK} strokeWidth="1.6" />
              <polygon points="0,9 13,1 26,9" fill="#2563EB" stroke={INK} strokeWidth="1.6" />
              <circle cx="13" cy="14" r="3" fill="#FFFFFF" stroke={INK} strokeWidth="1.1" />
              <text x="13" y="35" textAnchor="middle" className="font-game" fontSize="7.5" fill={INK}>
                학교
              </text>
            </g>

            <line x1="18" y1="71" x2="89" y2="71" stroke="#7C3AED" strokeWidth="1.8" strokeDasharray="3 2" />
            <text x="53" y="86" textAnchor="middle" className="font-game" fontSize="9.2" fill="#7C3AED">
              1 km = 1000 m!
            </text>
          </g>
        </svg>
      );
    }

    /* 13. 실생활 알맞은 단위 고르기 */
    case 'measure_real_life_pick': {
      const items = [
        { item: '생수병 1병', ans: '500 mL', sub: 'L (×) 너무 큼', color: '#2563EB' },
        { item: '욕조 물', ans: '200 L', sub: 'mL (×) 컵 1개?', color: '#0284C7' },
        { item: '사과 1개', ans: '300 g', sub: 'kg (×) 너무 무거움', color: '#059669' },
        { item: '쌀 1포대', ans: '20 kg', sub: 'g (×) 과자봉지?', color: '#D97706' },
        { item: '코끼리 · 트럭', ans: '5 t', sub: 'kg (×) 너무 가벼움', color: '#7C3AED' },
      ];
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={softBg('#ECFDF5')} />

          <text x="120" y="24" textAnchor="middle" className="font-game" fontSize="12.5" fill="#065F46">
            앞 숫자랑 단위를 같이 보고 상상하기!
          </text>

          <rect x="17" y="40" width="212" height="132" rx="4" fill={shadowInk} />
          <rect x="14" y="37" width="212" height="132" rx="4" fill="#FFFFFF" stroke={INK} strokeWidth="2.2" />
          {items.map((row, idx) => {
            const ry = 58 + idx * 24;
            return (
              <g key={row.item}>
                {idx > 0 && <line x1="22" y1={ry - 14} x2="218" y2={ry - 14} stroke="#E2E8F0" strokeWidth="1" />}
                <text x="24" y={ry} className="font-game" fontSize="9.8" fill={INK}>
                  {row.item}
                </text>
                <rect x="102" y={ry - 11} width="52" height="16" rx="2" fill={row.color} />
                <text x="128" y={ry} textAnchor="middle" className="font-game" fontSize="9.2" fill="#FFFFFF">
                  {row.ans}
                </text>
                <text x="161" y={ry} className="font-body font-bold" fontSize="7.4" fill="#64748B">
                  {row.sub}
                </text>
              </g>
            );
          })}

          <Stickman
            x={36}
            y={180}
            scale={0.54}
            pose="sunglasses"
            armL={[-13, 14]}
            armR={[14, 8]}
            legL={[-8, 42]}
            legR={[8, 42]}
          />
          <text x="138" y="192" textAnchor="middle" className="font-game" fontSize="10.8" fill="#047857">
            작고 가벼우면 mL · g / 크고 무거우면 L · kg · t!
          </text>
          <text x="138" y="211" textAnchor="middle" className="font-body font-bold" fontSize="8.8" fill={INK}>
            물 1 L = 무게 약 1 kg이라는 것도 꿀팁!
          </text>
        </svg>
      );
    }

    /* 14. 최종 보스! 들이와 무게 퀴즈 */
    case 'measure_boss': {
      const darkBg = isLightPrint ? '#FFFFFF' : '#0F172A';
      const goldText = isBw ? INK : '#FACC15';
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
            BOSS! 3단 함정 측정 퀴즈!
          </text>

          <Stickman
            x={42}
            y={72}
            scale={0.86}
            pose="hero"
            armL={[-16, 12]}
            armR={[18, 4]}
            legL={[-10, 44]}
            legR={[10, 44]}
          />

          <rect x="76" y="44" width="152" height="36" rx="3" fill="#FFFFFF" stroke="#FACC15" strokeWidth="1.8" />
          <text x="84" y="59" className="font-game" fontSize="9" fill="#DC2626">
            Q1. 3 L 50 mL = ( ? ) mL
          </text>
          <text x="84" y="73" className="font-mono-num font-bold" fontSize="8.8" fill="#2563EB">
            → 350 아님! 3050 mL!
          </text>

          <rect x="76" y="86" width="152" height="36" rx="3" fill="#FFFFFF" stroke="#FACC15" strokeWidth="1.8" />
          <text x="84" y="101" className="font-game" fontSize="9" fill="#DC2626">
            Q2. 5 kg - 1 kg 400 g = ?
          </text>
          <text x="84" y="115" className="font-mono-num font-bold" fontSize="8.8" fill="#059669">
            → 4kg 1000g - 1kg 400g = 3kg 600g!
          </text>

          <rect x="76" y="128" width="152" height="36" rx="3" fill="#FFFFFF" stroke="#FACC15" strokeWidth="1.8" />
          <text x="84" y="143" className="font-game" fontSize="9" fill="#DC2626">
            Q3. 2 t = ( ? ) kg  |  1 km = ? m
          </text>
          <text x="84" y="157" className="font-mono-num font-bold" fontSize="8.8" fill="#7C3AED">
            → 2000 kg!  |  1000 m!
          </text>

          <text x="120" y="190" textAnchor="middle" className="font-game" fontSize="11.2" fill={goldText}>
            가운데 빈자리 0 채우기 + 1000 빌려오기!
          </text>
          <text x="120" y="210" textAnchor="middle" className="font-body font-bold" fontSize="9" fill={isBw ? INK : '#FCA5A5'}>
            3문제 다 맞히면 측정 마스터 칭찬 포카 오픈!
          </text>
        </svg>
      );
    }

    /* 15. 들이와 무게 완주 칭찬 포카 */
    case 'measure_praise':
    default: {
      const darkBg = isLightPrint ? '#FFFFFF' : '#0F172A';
      const goldText = isBw ? INK : '#FACC15';
      return (
        <svg viewBox="0 0 240 230" className="w-full h-full">
          <rect x="0" y="0" width="240" height="230" fill={darkBg} />

          {[
            [26, 26],
            [212, 30],
            [30, 146],
            [208, 142],
          ].map(([sx, sy], i) => (
            <text key={i} x={sx} y={sy} textAnchor="middle" fontSize="14" fill={goldText}>
              ★
            </text>
          ))}

          <text x="120" y="30" textAnchor="middle" className="font-game" fontSize="13.5" fill={goldText}>
            측정 마스터 완주 축하!!
          </text>

          <circle cx="120" cy="84" r="34" fill={hlBg('#334155')} stroke="#FACC15" strokeWidth="2.5" />
          <Stickman
            x={120}
            y={72}
            scale={0.92}
            pose="hero"
            armL={[-16, 4]}
            armR={[16, 4]}
            legL={[-10, 44]}
            legR={[10, 44]}
          />

          <rect x="21" y="135" width="204" height="52" rx="4" fill={shadowInk} />
          <rect x="18" y="132" width="204" height="52" rx="4" fill="#FFFFFF" stroke="#FACC15" strokeWidth="2.2" />
          <text x="120" y="152" textAnchor="middle" className="font-game" fontSize="10.5" fill="#2563EB">
            들이(L·mL) + 무게(kg·g·t) + 길이(mm~km)
          </text>
          <text x="120" y="171" textAnchor="middle" className="font-body font-bold" fontSize="9.2" fill={INK}>
            16장 전속력 수집 완료! 넌 이제 측정 영웅!
          </text>

          <text x="120" y="210" textAnchor="middle" className="font-game" fontSize="12" fill={goldText}>
            ★ 공식 들이·무게 마스터 인증 ★
          </text>
        </svg>
      );
    }
  }
};
