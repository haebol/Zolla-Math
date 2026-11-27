import React from 'react';
import { CardThemeColor, ConceptCard, PrintInkMode } from '../types/card';
import { JollamanComicScene } from './JollamanComicScene';
import { RichFractionText } from './RichFractionText';

interface ThemePalette {
  outerBg: string;
  outerPattern: string;
  outerPatternSize: string;
  border: string;
  panelBorder: string;
  headerBg: string;
  headerText: string;
  badgeBg: string;
  badgeText: string;
  statusBarBg: string;
  statusCodeText: string;
  statusMemeText: string;
  statusRarityText: string;
  tipTagBg: string;
  tipTagText: string;
  tipTagLabel: string;
  tipBoxBg: string;
  tipBoxText: string;
  shadowColor: string;
  inkSaverAccent: string;
  inkSaverOuterBorder: string;
}

const THEME_PALETTES: Record<CardThemeColor, ThemePalette> = {
  comic: {
    outerBg: '#F8FAFC',
    outerPattern:
      'linear-gradient(to right, rgba(20,27,41,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(20,27,41,0.08) 1px, transparent 1px)',
    outerPatternSize: '12px 12px',
    border: '#141B29',
    panelBorder: '#141B29',
    headerBg: '#1E293B',
    headerText: '#FFFFFF',
    badgeBg: '#FACC15',
    badgeText: '#141B29',
    statusBarBg: '#FFFFFF',
    statusCodeText: '#334155',
    statusMemeText: '#B45309',
    statusRarityText: '#141B29',
    tipTagBg: '#1E293B',
    tipTagText: '#FACC15',
    tipTagLabel: '도감',
    tipBoxBg: '#FFFFFF',
    tipBoxText: '#0F172A',
    shadowColor: '#141B29',
    inkSaverAccent: '#334155',
    inkSaverOuterBorder: '#CBD5E1',
  },
  blue: {
    outerBg: '#DBEAFE',
    outerPattern: 'radial-gradient(rgba(37,99,235,0.28) 1.7px, transparent 1.7px)',
    outerPatternSize: '8px 8px',
    border: '#141B29',
    panelBorder: '#141B29',
    headerBg: '#2563EB',
    headerText: '#FFFFFF',
    badgeBg: '#FEF08A',
    badgeText: '#141B29',
    statusBarBg: '#FFFFFF',
    statusCodeText: '#1E3A8A',
    statusMemeText: '#EA580C',
    statusRarityText: '#141B29',
    tipTagBg: '#2563EB',
    tipTagText: '#FFFFFF',
    tipTagLabel: 'TIP!',
    tipBoxBg: '#FFFFFF',
    tipBoxText: '#0F172A',
    shadowColor: '#141B29',
    inkSaverAccent: '#2563EB',
    inkSaverOuterBorder: '#93C5FD',
  },
  emerald: {
    outerBg: '#D1FAE5',
    outerPattern:
      'repeating-linear-gradient(-45deg, rgba(5,150,105,0.16) 0px, rgba(5,150,105,0.16) 4px, transparent 4px, transparent 10px)',
    outerPatternSize: 'auto',
    border: '#141B29',
    panelBorder: '#141B29',
    headerBg: '#059669',
    headerText: '#FFFFFF',
    badgeBg: '#A7F3D0',
    badgeText: '#064E3B',
    statusBarBg: '#FFFFFF',
    statusCodeText: '#065F46',
    statusMemeText: '#B45309',
    statusRarityText: '#141B29',
    tipTagBg: '#059669',
    tipTagText: '#FFFFFF',
    tipTagLabel: '필살',
    tipBoxBg: '#FFFFFF',
    tipBoxText: '#0F172A',
    shadowColor: '#141B29',
    inkSaverAccent: '#059669',
    inkSaverOuterBorder: '#6EE7B7',
  },
  gold: {
    outerBg: '#FEF08A',
    outerPattern:
      'repeating-linear-gradient(45deg, rgba(217,119,6,0.18) 0px, rgba(217,119,6,0.18) 5px, transparent 5px, transparent 11px)',
    outerPatternSize: 'auto',
    border: '#141B29',
    panelBorder: '#141B29',
    headerBg: '#D97706',
    headerText: '#FFFFFF',
    badgeBg: '#141B29',
    badgeText: '#FACC15',
    statusBarBg: '#FFFBEB',
    statusCodeText: '#92400E',
    statusMemeText: '#DC2626',
    statusRarityText: '#B45309',
    tipTagBg: '#D97706',
    tipTagText: '#FFFFFF',
    tipTagLabel: '핵심',
    tipBoxBg: '#FFFFFF',
    tipBoxText: '#0F172A',
    shadowColor: '#141B29',
    inkSaverAccent: '#B45309',
    inkSaverOuterBorder: '#FCD34D',
  },
  hazard: {
    outerBg: '#FB923C',
    outerPattern:
      'repeating-linear-gradient(-45deg, #F97316 0px, #F97316 8px, #1E293B 8px, #1E293B 14px)',
    outerPatternSize: 'auto',
    border: '#141B29',
    panelBorder: '#141B29',
    headerBg: '#EA580C',
    headerText: '#FFFFFF',
    badgeBg: '#FACC15',
    badgeText: '#141B29',
    statusBarBg: '#FFF7ED',
    statusCodeText: '#7C2D12',
    statusMemeText: '#DC2626',
    statusRarityText: '#141B29',
    tipTagBg: '#DC2626',
    tipTagText: '#FEF08A',
    tipTagLabel: '주의!',
    tipBoxBg: '#FFFBEB',
    tipBoxText: '#0F172A',
    shadowColor: '#141B29',
    inkSaverAccent: '#EA580C',
    inkSaverOuterBorder: '#FDBA74',
  },
  violet: {
    outerBg: '#DDD6FE',
    outerPattern:
      'repeating-linear-gradient(45deg, rgba(124,58,237,0.18) 0px, rgba(124,58,237,0.18) 4px, transparent 4px, transparent 10px)',
    outerPatternSize: 'auto',
    border: '#141B29',
    panelBorder: '#141B29',
    headerBg: '#7C3AED',
    headerText: '#FFFFFF',
    badgeBg: '#FEF08A',
    badgeText: '#4C1D95',
    statusBarBg: '#FFFFFF',
    statusCodeText: '#4C1D95',
    statusMemeText: '#EA580C',
    statusRarityText: '#141B29',
    tipTagBg: '#7C3AED',
    tipTagText: '#FFFFFF',
    tipTagLabel: '도전',
    tipBoxBg: '#FFFFFF',
    tipBoxText: '#0F172A',
    shadowColor: '#141B29',
    inkSaverAccent: '#7C3AED',
    inkSaverOuterBorder: '#C4B5FD',
  },
  boss: {
    outerBg: '#0F172A',
    outerPattern:
      'repeating-linear-gradient(-45deg, rgba(250,204,21,0.16) 0px, rgba(250,204,21,0.16) 4px, transparent 4px, transparent 12px)',
    outerPatternSize: 'auto',
    border: '#FACC15',
    panelBorder: '#FACC15',
    headerBg: '#1E293B',
    headerText: '#FACC15',
    badgeBg: '#EF4444',
    badgeText: '#FFFFFF',
    statusBarBg: '#1E293B',
    statusCodeText: '#E2E8F0',
    statusMemeText: '#FACC15',
    statusRarityText: '#FDE047',
    tipTagBg: '#FACC15',
    tipTagText: '#0F172A',
    tipTagLabel: '공략!',
    tipBoxBg: '#FFFBEB',
    tipBoxText: '#0F172A',
    shadowColor: '#FACC15',
    inkSaverAccent: '#B45309',
    inkSaverOuterBorder: '#94A3B8',
  },
};

interface ConceptPhotocardProps {
  card: ConceptCard;
  widthPx?: number;
  widthMm?: number;
  heightMm?: number;
  showCornerGuide?: boolean;
  inkMode?: PrintInkMode;
}

const VIRTUAL_W = 275;
const VIRTUAL_H = 425;
const MM_TO_PX = 3.7795275591;

export const ConceptPhotocard: React.FC<ConceptPhotocardProps> = ({
  card,
  widthPx,
  widthMm,
  heightMm,
  showCornerGuide = false,
  inkMode = 'full',
}) => {
  const palette = THEME_PALETTES[card.themeColor] ?? THEME_PALETTES.blue;
  const isBoss = card.themeColor === 'boss';
  const isFractionUnit = card.cardCode.startsWith('3-2-4');
  const isLargePrint = widthMm !== undefined && widthMm >= 100;
  const isInkSaver = inkMode === 'ink_saver';
  const isBw = inkMode === 'bw_worksheet';
  const isLightPrint = inkMode !== 'full';
  const displayTipText = card.easyTipText ? card.easyTipText : card.tipText;

  let containerStyle: React.CSSProperties;
  let scaleX: number;
  let scaleY: number;

  if (widthMm !== undefined && heightMm !== undefined) {
    containerStyle = {
      width: `${widthMm}mm`,
      height: `${heightMm}mm`,
    };
    scaleX = (widthMm * MM_TO_PX) / VIRTUAL_W;
    scaleY = (heightMm * MM_TO_PX) / VIRTUAL_H;
  } else {
    const targetW = widthPx ?? VIRTUAL_W;
    const targetH = Math.round((targetW * VIRTUAL_H) / VIRTUAL_W);
    containerStyle = {
      width: `${targetW}px`,
      height: `${targetH}px`,
    };
    scaleX = targetW / VIRTUAL_W;
    scaleY = targetH / VIRTUAL_H;
  }

  const customHw = card.customHandwriting;
  const hasCustomHandwriting = Boolean(customHw?.imageDataUrl);
  const showTipBox =
    !hasCustomHandwriting || (!customHw?.hideTipBox && displayTipText.trim().length > 0);

  const resolvedOuterBg = isLightPrint ? '#FFFFFF' : palette.outerBg;
  const resolvedOuterPattern = isLightPrint ? 'none' : palette.outerPattern;
  const resolvedOuterBorder = isBw
    ? '#475569'
    : isInkSaver
    ? palette.inkSaverOuterBorder
    : isFractionUnit && !isBoss
    ? '#334155'
    : palette.border;
  const resolvedPanelBorder = isBw
    ? '#334155'
    : isInkSaver
    ? palette.inkSaverAccent
    : isFractionUnit && !isBoss
    ? '#334155'
    : palette.panelBorder;
  const resolvedHeaderBg = isLightPrint ? '#FFFFFF' : palette.headerBg;
  const resolvedHeaderText = isBw
    ? '#0F172A'
    : isInkSaver
    ? palette.inkSaverAccent
    : palette.headerText;
  const resolvedBadgeBg = isBw
    ? '#F1F5F9'
    : isInkSaver
    ? '#FFFFFF'
    : palette.badgeBg;
  const resolvedBadgeText = isBw
    ? '#0F172A'
    : isInkSaver
    ? palette.inkSaverAccent
    : palette.badgeText;
  const resolvedBadgeBorder = isBw
    ? '#334155'
    : isInkSaver
    ? palette.inkSaverAccent
    : isBoss
    ? '#FACC15'
    : '#141B29';
  const resolvedStatusBg = isLightPrint ? '#FFFFFF' : palette.statusBarBg;
  const resolvedCodeText = isBw
    ? '#334155'
    : isInkSaver
    ? palette.inkSaverAccent
    : palette.statusCodeText;
  const resolvedMemeText = isBw
    ? '#0F172A'
    : isInkSaver
    ? palette.statusMemeText
    : palette.statusMemeText;
  const resolvedRarityText = isBw
    ? '#0F172A'
    : isInkSaver
    ? palette.inkSaverAccent
    : palette.statusRarityText;
  const resolvedTipTagBg = isLightPrint ? '#FFFFFF' : palette.tipTagBg;
  const resolvedTipTagText = isBw
    ? '#0F172A'
    : isInkSaver
    ? palette.inkSaverAccent
    : palette.tipTagText;
  const resolvedTipTagBorder = isBw
    ? '#334155'
    : isInkSaver
    ? palette.inkSaverAccent
    : '#141B29';
  const resolvedTipBoxBg = isLightPrint ? '#FFFFFF' : palette.tipBoxBg;

  const resolvedTipTagLabel = card.easyTipText ? '쉬운말' : palette.tipTagLabel;

  return (
    <div
      style={containerStyle}
      className={`relative overflow-hidden select-none shrink-0 bg-white ${
        isBw ? 'grayscale contrast-105' : ''
      }`}
    >
      <div
        style={{
          width: `${VIRTUAL_W}px`,
          height: `${VIRTUAL_H}px`,
          transform: `scale(${scaleX}, ${scaleY})`,
          transformOrigin: 'top left',
          backgroundColor: resolvedOuterBg,
          borderColor: resolvedOuterBorder,
          backgroundImage: resolvedOuterPattern,
          backgroundSize: palette.outerPatternSize,
        }}
        className={`relative flex flex-col gap-[5px] p-[8px] ${
          isLightPrint ? 'border-[1.5px]' : isFractionUnit ? 'border-[2px]' : 'border-[4px]'
        } ${showCornerGuide ? 'rounded-[12px]' : 'rounded-[3px]'} box-border`}
      >
        {/* 0. 상단 TCG 스탯 바: 좌측 코드 / 중앙 한줄 상태 / 우측 등급 */}
        <div
          style={{
            backgroundColor: resolvedStatusBg,
            borderColor: isLightPrint ? '#CBD5E1' : resolvedPanelBorder,
          }}
          className={`flex items-center justify-between px-[6px] h-[18px] ${
            isLightPrint || isFractionUnit ? 'border-[1.2px]' : 'border-[2px]'
          } rounded-[2px] shrink-0 leading-none`}
        >
          <span
            style={{ color: resolvedCodeText }}
            className="font-mono-num font-bold text-[8.8px] tracking-tight"
          >
            {card.cardCode}
          </span>
          {card.memeStat && (
            <span
              style={{ color: resolvedMemeText }}
              className="font-game text-[9.8px] tracking-tight truncate px-1"
            >
              [{card.memeStat}]
            </span>
          )}
          <span
            style={{ color: resolvedRarityText }}
            className="font-mono-num font-bold text-[8.8px] tracking-tight"
          >
            {card.rarityLabel}
          </span>
        </div>

        {/* 1 & 2. 각진 코믹 제목 바 + 기울어진 역할 스탬프 */}
        <div
          style={{
            backgroundColor: resolvedHeaderBg,
            borderColor: resolvedPanelBorder,
            boxShadow: isLightPrint || isFractionUnit ? 'none' : `3px 3px 0px ${palette.shadowColor}`,
          }}
          className={`h-[38px] w-full rounded-[2px] ${
            isLightPrint || isFractionUnit ? 'border-[1.6px]' : 'border-[2.5px]'
          } px-[8px] flex items-center gap-[8px] shrink-0`}
        >
          <span
            style={{
              backgroundColor: resolvedBadgeBg,
              color: resolvedBadgeText,
              borderColor: resolvedBadgeBorder,
            }}
            className={`font-game text-[11.5px] px-[7px] py-[2.5px] rounded-[2px] ${
              isLightPrint ? 'border-[1.4px]' : 'border-[2px]'
            } leading-none shrink-0 -skew-x-10`}
          >
            <span className="inline-block skew-x-10">{card.badgeLabel}</span>
          </span>
          <h2
            style={{
              color: resolvedHeaderText,
              textShadow: isLightPrint
                ? 'none'
                : isBoss
                ? '1.5px 1.5px 0px #000000'
                : '1.5px 1.5px 0px rgba(20,27,41,0.55)',
            }}
            className={`font-game ${
              card.title.replace(/\[\[|\]\]/g, '').length >= 13
                ? 'text-[15.2px]'
                : 'text-[17.5px]'
            } leading-none tracking-tight truncate pt-[1px]`}
          >
            <RichFractionText text={card.title} onDarkHeader={!isLightPrint} />
          </h2>
        </div>

        {/* 3. 메인 만화 컷 (각진 코믹 패널) */}
        <div
          style={{
            borderColor: isLightPrint ? '#CBD5E1' : resolvedPanelBorder,
            boxShadow: isLightPrint || isFractionUnit ? 'none' : `3px 3px 0px ${palette.shadowColor}`,
          }}
          className={`relative flex-1 w-full rounded-[2px] ${
            isLightPrint || isFractionUnit ? 'border-[1.6px]' : 'border-[3px]'
          } bg-white overflow-hidden flex items-center justify-center`}
        >
          {hasCustomHandwriting && customHw ? (
            <div className="w-full h-full flex items-center justify-center p-2.5 overflow-hidden bg-white">
              <img
                src={customHw.imageDataUrl}
                alt={`${card.title} 손필기 이미지`}
                style={{
                  transform: `translate(${customHw.offsetX}px, ${customHw.offsetY}px) scale(${customHw.scale}) rotate(${customHw.rotation}deg)`,
                }}
                className="max-w-full max-h-full object-contain mix-blend-multiply"
              />
            </div>
          ) : (
            <JollamanComicScene
              sceneType={card.sceneType}
              denominator={card.denominator}
              numerator={card.numerator}
              whole={card.whole}
              inkMode={inkMode}
            />
          )}
        </div>

        {/* 4. 하단 만화 코멘트 창 */}
        {showTipBox && (
          <div
            style={{
              backgroundColor: resolvedTipBoxBg,
              borderColor: isLightPrint ? '#CBD5E1' : resolvedPanelBorder,
              boxShadow: isLightPrint || isFractionUnit ? 'none' : `3px 3px 0px ${palette.shadowColor}`,
            }}
            className={`relative h-[86px] w-full rounded-[2px] ${
              isLightPrint || isFractionUnit ? 'border-[1.6px]' : 'border-[2.5px]'
            } px-[9px] ${
              isFractionUnit ? 'pt-[5px] pb-[9px]' : 'py-[6px]'
            } shrink-0 flex items-center overflow-hidden`}
          >
            <div className="w-full flex items-start gap-[7px]">
              <span
                style={{
                  backgroundColor: resolvedTipTagBg,
                  color: resolvedTipTagText,
                  borderColor: resolvedTipTagBorder,
                }}
                className="font-game text-[9.8px] px-[6px] py-[2.5px] rounded-[2px] border-[1.5px] -skew-x-10 shrink-0 mt-[2px] leading-none tracking-wide"
              >
                <span className="inline-block skew-x-10">{resolvedTipTagLabel}</span>
              </span>
              <p
                style={{ color: palette.tipBoxText }}
                className={`flex-1 min-w-0 font-body font-bold ${
                  isLargePrint
                    ? 'text-[9.2px] leading-[1.35]'
                    : 'text-[10.8px] leading-[1.36]'
                } break-keep whitespace-pre-line`}
              >
                <RichFractionText text={displayTipText} small />
              </p>
            </div>
            {card.cardCode.startsWith('3-2-4') && (
              <span
                style={{ color: '#94A3B8' }}
                className="absolute bottom-[2.5px] right-[6px] font-mono-num text-[5.8px] leading-none tracking-tight pointer-events-none select-none"
              >
                졸라수학맨 | haebol.com
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

