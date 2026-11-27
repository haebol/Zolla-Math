import React, { useEffect, useRef, useState } from 'react';
import {
  Printer,
  Scissors,
  BookOpen,
  FileText,
  FileDown,
  Image as ImageIcon,
  FolderArchive,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from 'lucide-react';
import {
  BinderSizeId,
  ConceptCard,
  PrintInkMode,
  PrintLayoutMode,
  PrintPageScope,
  UnitId,
  WorksheetDuplexMode,
} from '../types/card';
import { BINDER_PRESETS } from '../data/fractionCards';
import { UNIT_METADATA } from '../data/gugudanCards';
import { ConceptPhotocard } from './ConceptPhotocard';
import {
  exportElementAsPng,
  exportPagesAsPdf,
  exportPagesAsZip,
} from '../utils/exportStudio';

export type SheetMode =
  | 'all_pages'
  | 'basic_pack'
  | 'skill_pack'
  | 'special_pack'
  | 'single_repeat';

interface WorksheetHalfPage {
  pageNumber: number;
  cards: ConceptCard[];
}

interface WorksheetSpreadPage {
  sheetIndex: number;
  sideLabel: string;
  left: WorksheetHalfPage | null;
  right: WorksheetHalfPage | null;
}

interface A4OriginalCardCanvasProps {
  card: ConceptCard;
  activeUnit?: UnitId;
  inkMode: PrintInkMode;
  pageLabel?: string;
}

export const A4OriginalCardCanvas: React.FC<A4OriginalCardCanvasProps> = ({
  card,
  activeUnit = '3-2-4',
  inkMode,
  pageLabel,
}) => {
  const unitMeta = UNIT_METADATA[activeUnit];
  return (
    <div
      style={{
        width: '210mm',
        height: '297mm',
      }}
      className="a4-print-page bg-white flex flex-col items-center justify-center relative box-border"
    >
      <div
        style={{ top: '7mm' }}
        className="absolute left-0 right-0 text-center text-[8.5px] text-slate-400 font-body pointer-events-none"
      >
        졸라수학맨 · {unitMeta.shortLabel} 원본 ({card.cardCode}
        {inkMode === 'ink_saver' ? ' · 잉크절약' : inkMode === 'bw_worksheet' ? ' · 흑백' : ' · 풀컬러'})
        {pageLabel ? ` · ${pageLabel}` : ''}
      </div>

      <ConceptPhotocard
        card={card}
        widthMm={168}
        heightMm={259.6}
        inkMode={inkMode}
      />
    </div>
  );
};

interface A4SheetCanvasProps {
  cardsToPrint: ConceptCard[];
  activeUnit?: UnitId;
  widthMm: number;
  heightMm: number;
  showCropMarks: boolean;
  showCornerGuide: boolean;
  inkMode?: PrintInkMode;
  tightCut?: boolean;
  pageLabel?: string;
}

export const A4SheetCanvas: React.FC<A4SheetCanvasProps> = ({
  cardsToPrint,
  activeUnit = '3-2-4',
  widthMm,
  heightMm,
  showCropMarks,
  showCornerGuide,
  inkMode = 'full',
  tightCut = false,
  pageLabel,
}) => {
  const unitMeta = UNIT_METADATA[activeUnit];
  const gapMm = tightCut ? 0 : 3;
  const displayCards = cardsToPrint.slice(0, 9);

  return (
    <div
      style={{
        width: '210mm',
        height: '297mm',
      }}
      className="a4-print-page bg-white flex flex-col items-center justify-center relative box-border"
    >
      <div
        style={{ top: '6mm' }}
        className="absolute left-0 right-0 text-center text-[9px] text-slate-400 font-body pointer-events-none"
      >
        졸라수학맨 · {unitMeta.shortLabel} 포카 ({widthMm}×{heightMm}mm
        {tightCut ? ' · 칼질 1번 딱 붙임' : ''}
        {inkMode === 'ink_saver' ? ' · 잉크절약' : inkMode === 'bw_worksheet' ? ' · 흑백' : ' · 풀컬러'})
        {pageLabel ? ` · ${pageLabel}` : ''}
      </div>

      <div className="relative">
        {showCropMarks && tightCut && (
          <div className="pointer-events-none absolute inset-0">
            {[0, 1, 2, 3].map((col) => (
              <React.Fragment key={`v-${col}`}>
                <span
                  style={{ left: `${col * widthMm}mm` }}
                  className="absolute -top-[4mm] w-[0.8px] h-[3.2mm] bg-slate-500"
                />
                <span
                  style={{ left: `${col * widthMm}mm` }}
                  className="absolute -bottom-[4mm] w-[0.8px] h-[3.2mm] bg-slate-500"
                />
              </React.Fragment>
            ))}
            {[0, 1, 2, 3].map((row) => (
              <React.Fragment key={`h-${row}`}>
                <span
                  style={{ top: `${row * heightMm}mm` }}
                  className="absolute -left-[4mm] h-[0.8px] w-[3.2mm] bg-slate-500"
                />
                <span
                  style={{ top: `${row * heightMm}mm` }}
                  className="absolute -right-[4mm] h-[0.8px] w-[3.2mm] bg-slate-500"
                />
              </React.Fragment>
            ))}
          </div>
        )}

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(3, ${widthMm}mm)`,
            gridTemplateRows: `repeat(3, ${heightMm}mm)`,
            gap: `${gapMm}mm`,
          }}
        >
          {displayCards.map((card, idx) => (
            <div key={`${card.id}-${idx}`} className="relative">
              {showCropMarks && !tightCut && (
                <>
                  <span className="absolute -top-[2mm] left-0 w-[1px] h-[1.5mm] bg-slate-400" />
                  <span className="absolute -top-[2mm] right-0 w-[1px] h-[1.5mm] bg-slate-400" />
                  <span className="absolute -bottom-[2mm] left-0 w-[1px] h-[1.5mm] bg-slate-400" />
                  <span className="absolute -bottom-[2mm] right-0 w-[1px] h-[1.5mm] bg-slate-400" />
                  <span className="absolute top-0 -left-[2mm] h-[1px] w-[1.5mm] bg-slate-400" />
                  <span className="absolute bottom-0 -left-[2mm] h-[1px] w-[1.5mm] bg-slate-400" />
                  <span className="absolute top-0 -right-[2mm] h-[1px] w-[1.5mm] bg-slate-400" />
                  <span className="absolute bottom-0 -right-[2mm] h-[1px] w-[1.5mm] bg-slate-400" />
                </>
              )}
              <ConceptPhotocard
                card={card}
                widthMm={widthMm}
                heightMm={heightMm}
                showCornerGuide={!tightCut && showCornerGuide}
                inkMode={inkMode}
              />
            </div>
          ))}
        </div>
      </div>

      <div
        style={{ bottom: '5mm' }}
        className="absolute left-0 right-0 text-center text-[8.5px] text-slate-400 font-body pointer-events-none"
      >
        인쇄 설정에서 ‘배율: 100% (실제 크기)’ · ‘여백: 없음’ 선택 후{' '}
        {tightCut ? '경계선 눈금을 따라 일직선으로 한 번에 재단하세요.' : '단면 출력하세요.'}
      </div>
    </div>
  );
};

interface WorksheetHalfSlotProps {
  halfPage: WorksheetHalfPage | null;
  activeUnit?: UnitId;
  inkMode: PrintInkMode;
  isCoverRight?: boolean;
}

const WorksheetHalfSlot: React.FC<WorksheetHalfSlotProps> = ({
  halfPage,
  activeUnit = '3-2-4',
  inkMode,
  isCoverRight = false,
}) => {
  const unitMeta = UNIT_METADATA[activeUnit];
  if (!halfPage) {
    return (
      <div className="w-full h-full flex flex-col justify-between px-[10mm] py-[8.5mm] box-border">
        <div className="flex items-center justify-between border-b border-slate-300 pb-1">
          <span className="font-game text-[11px] text-slate-700">
            졸라수학맨 · {unitMeta.worksheetSubject} 연습장 &amp; 오답노트
          </span>
          <span className="font-mono-num text-[9px] text-slate-400">MEMO</span>
        </div>
        <div className="flex-1 my-3 border border-dashed border-slate-300 rounded-[2px] p-4 flex flex-col justify-between">
          {Array.from({ length: 8 }, (_, idx) => (
            <div key={idx} className="w-full border-b border-slate-200 h-5" />
          ))}
        </div>
        <div className="text-[9px] text-slate-400 font-body text-center">
          어려웠던 {unitMeta.worksheetSubject} 문제나 나만의 비법을 적어 보세요!
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col justify-between px-[10mm] py-[8.5mm] box-border">
      <div className="flex items-center justify-end border-b border-slate-400 pb-[1.5mm] shrink-0">
        <div className="flex items-center gap-3">
          {isCoverRight && (
            <span className="font-body text-[9.5px] text-slate-700">
              이름: ____________
            </span>
          )}
          <span className="font-mono-num font-bold text-[9.5px] text-slate-700">
            p.{halfPage.pageNumber}
          </span>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center py-[3mm]">
        {halfPage.cards[0] && (
          <ConceptPhotocard
            card={halfPage.cards[0]}
            widthMm={104}
            heightMm={160.7}
            inkMode={inkMode}
          />
        )}
      </div>

      <div className="flex items-center justify-center gap-1 text-[8px] text-slate-400 font-body shrink-0">
        <img
          src="/assets/jollaman-logo.png"
          alt="졸라맨 로고"
          className={`h-[11px] w-auto object-contain shrink-0 ${
            inkMode === 'bw_worksheet' ? 'grayscale' : ''
          }`}
        />
        <span>졸라수학맨 haebol.com | 수학 개념 포카</span>
      </div>
    </div>
  );
};

interface A4LandscapeWorksheetCanvasProps {
  spread: WorksheetSpreadPage;
  activeUnit?: UnitId;
  duplexMode: WorksheetDuplexMode;
  inkMode: PrintInkMode;
}

export const A4LandscapeWorksheetCanvas: React.FC<A4LandscapeWorksheetCanvasProps> = ({
  spread,
  activeUnit = '3-2-4',
  duplexMode,
  inkMode,
}) => {
  return (
    <div
      style={{
        width: '297mm',
        height: '210mm',
      }}
      className="a4-print-page-landscape bg-white relative grid grid-cols-2 box-border overflow-hidden"
    >
      <div className="h-full border-r border-dashed border-slate-400 relative">
        <WorksheetHalfSlot
          halfPage={spread.left}
          activeUnit={activeUnit}
          inkMode={inkMode}
        />
      </div>

      <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-[1.2mm] z-10 bg-white px-1.5 text-[7.5px] text-slate-500 font-body border border-slate-300 rounded-[2px]">
        {duplexMode === 'booklet'
          ? `접는 선 · 가운데 스테이플 (${spread.sideLabel})`
          : `절취/접는 선 (${spread.sideLabel})`}
      </div>

      <div className="h-full relative">
        <WorksheetHalfSlot
          halfPage={spread.right}
          activeUnit={activeUnit}
          inkMode={inkMode}
          isCoverRight={spread.right?.pageNumber === 1}
        />
      </div>
    </div>
  );
};

export function selectCardsForSheetMode(
  cards: ConceptCard[],
  sheetMode: SheetMode,
  repeatCardId: string
): ConceptCard[] {
  if (sheetMode === 'all_pages') {
    return cards;
  }
  if (sheetMode === 'basic_pack') {
    return cards.filter((c) => c.badgeLabel === '기본');
  }
  if (sheetMode === 'skill_pack') {
    return cards.filter((c) => c.badgeLabel === '필살');
  }
  if (sheetMode === 'special_pack') {
    return cards.filter((c) =>
      ['도감', '핵심', '함정', '도전', '보스', '칭찬', '스페셜', '손필기'].includes(c.badgeLabel)
    );
  }
  const target = cards.find((c) => c.id === repeatCardId) ?? cards[0];
  return Array.from({ length: 9 }, () => target);
}

export function buildPrintPages(
  cards: ConceptCard[],
  sheetMode: SheetMode,
  repeatCardId: string
): ConceptCard[][] {
  const selected = selectCardsForSheetMode(cards, sheetMode, repeatCardId);
  const pages: ConceptCard[][] = [];
  for (let i = 0; i < selected.length; i += 9) {
    pages.push(selected.slice(i, i + 9));
  }
  return pages.length > 0 ? pages : [selected];
}

/**
 * Builds A4 Landscape 1/2 worksheet spreads (2 cards per sheet)
 * in either single-sided order or middle-stapled duplex booklet imposition.
 */
export function buildWorksheetSpreads(
  cards: ConceptCard[],
  sheetMode: SheetMode,
  repeatCardId: string,
  duplexMode: WorksheetDuplexMode
): WorksheetSpreadPage[] {
  const selected = selectCardsForSheetMode(cards, sheetMode, repeatCardId);
  const rawHalfPages: WorksheetHalfPage[] = selected.map((card, idx) => ({
    pageNumber: idx + 1,
    cards: [card],
  }));

  if (duplexMode === 'single') {
    const spreads: WorksheetSpreadPage[] = [];
    for (let i = 0; i < rawHalfPages.length; i += 2) {
      spreads.push({
        sheetIndex: spreads.length,
        sideLabel: `단면 ${spreads.length + 1}쪽`,
        left: rawHalfPages[i] ?? null,
        right: rawHalfPages[i + 1] ?? null,
      });
    }
    return spreads;
  }

  const totalBookletPages = Math.max(4, Math.ceil(rawHalfPages.length / 4) * 4);
  const padded: (WorksheetHalfPage | null)[] = Array.from(
    { length: totalBookletPages },
    (_, idx) => rawHalfPages[idx] ?? null
  );

  const numSheets = totalBookletPages / 4;
  const spreads: WorksheetSpreadPage[] = [];
  for (let s = 0; s < numSheets; s++) {
    spreads.push({
      sheetIndex: s,
      sideLabel: `시트 ${s + 1} 앞면`,
      left: padded[totalBookletPages - 1 - 2 * s],
      right: padded[2 * s],
    });
    spreads.push({
      sheetIndex: s,
      sideLabel: `시트 ${s + 1} 뒷면`,
      left: padded[2 * s + 1],
      right: padded[totalBookletPages - 2 - 2 * s],
    });
  }
  return spreads;
}

interface PrintSheetViewProps {
  cards: ConceptCard[];
  activeUnit: UnitId;
  onChangeActiveUnit: (unit: UnitId) => void;
  unitCounts: Partial<Record<UnitId, number>>;
  binderSize: BinderSizeId;
  onChangeBinderSize: (id: BinderSizeId) => void;
  sheetMode: SheetMode;
  onChangeSheetMode: (mode: SheetMode) => void;
  repeatCardId: string;
  onChangeRepeatCardId: (id: string) => void;
  showCropMarks: boolean;
  onToggleCropMarks: () => void;
  showCornerGuide: boolean;
  onToggleCornerGuide: () => void;
  inkMode: PrintInkMode;
  onChangeInkMode: (mode: PrintInkMode) => void;
  tightCut: boolean;
  onToggleTightCut: () => void;
  printLayoutMode: PrintLayoutMode;
  onChangePrintLayoutMode: (mode: PrintLayoutMode) => void;
  worksheetDuplexMode: WorksheetDuplexMode;
  onChangeWorksheetDuplexMode: (mode: WorksheetDuplexMode) => void;
  currentPageIdx: number;
  onChangeCurrentPageIdx: (idx: number) => void;
  onTriggerPrint: (scope: PrintPageScope) => void;
  accessMode?: 'public' | 'teacher';
  lockedUnitIds?: Set<UnitId>;
}

const PRINT_UNIT_OPTIONS: { id: UnitId; label: string }[] = [
  { id: '1-2-6', label: '1-2 덧셈·뺄셈(3)' },
  { id: '2-2-2', label: '2-2 곱셈구구' },
  { id: '3-2-2', label: '3-2 나눗셈' },
  { id: '3-2-3', label: '3-2 원' },
  { id: '3-2-4', label: '3-2 분수' },
  { id: '3-2-5', label: '3-2 들이·무게' },
  { id: '4-2-1', label: '4-2 분수 덧·뺄셈' },
  { id: '5-2-2', label: '5-2 분수의 곱셈' },
  { id: '6-2-1', label: '6-2 분수의 나눗셈' },
  { id: '6-2-4', label: '6-2 비례식·배분' },
];

export const PrintSheetView: React.FC<PrintSheetViewProps> = ({
  cards,
  activeUnit,
  onChangeActiveUnit,
  unitCounts,
  binderSize,
  onChangeBinderSize,
  sheetMode,
  onChangeSheetMode,
  repeatCardId,
  onChangeRepeatCardId,
  showCropMarks,
  onToggleCropMarks,
  showCornerGuide,
  onToggleCornerGuide,
  inkMode,
  onChangeInkMode,
  tightCut,
  onToggleTightCut,
  printLayoutMode,
  onChangePrintLayoutMode,
  worksheetDuplexMode,
  onChangeWorksheetDuplexMode,
  currentPageIdx,
  onChangeCurrentPageIdx,
  onTriggerPrint,
  accessMode = 'public',
  lockedUnitIds,
}) => {
  const unitMeta = UNIT_METADATA[activeUnit];
  const visiblePrintUnits =
    accessMode === 'public' && lockedUnitIds
      ? PRINT_UNIT_OPTIONS.filter((opt) => !lockedUnitIds.has(opt.id))
      : PRINT_UNIT_OPTIONS;
  const [exportState, setExportState] = useState<{
    busy: boolean;
    label: string;
  }>({ busy: false, label: '' });

  const [stagingJob, setStagingJob] = useState<{
    kind: 'a4' | 'png_card';
    pageIdx: number;
  } | null>(null);

  const previewAreaRef = useRef<HTMLDivElement>(null);
  const previewTargetRef = useRef<HTMLDivElement>(null);
  const originalPngRef = useRef<HTMLDivElement>(null);
  const stagingRef = useRef<HTMLDivElement>(null);
  const resolveStagingRef = useRef<((el: HTMLDivElement | null) => void) | null>(null);
  const [previewWidth, setPreviewWidth] = useState<number>(() =>
    typeof window === 'undefined' ? 960 : Math.min(1152, Math.max(280, window.innerWidth - 20))
  );

  useEffect(() => {
    const el = previewAreaRef.current;
    if (!el) return;
    const updateWidth = () => {
      if (el.clientWidth > 0) setPreviewWidth(el.clientWidth);
    };
    updateWidth();
    if (typeof ResizeObserver !== 'undefined') {
      const ro = new ResizeObserver(updateWidth);
      ro.observe(el);
      return () => ro.disconnect();
    }
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const preset = BINDER_PRESETS.find((p) => p.id === binderSize) ?? BINDER_PRESETS[0];

  const isSingleOriginal = printLayoutMode === 'single_original';
  const isPhotocard3x3 = printLayoutMode === 'photocard_3x3';
  const isWorksheetMode = printLayoutMode === 'worksheet_2up';

  const originalCards = selectCardsForSheetMode(
    cards,
    sheetMode === 'single_repeat' ? 'all_pages' : sheetMode,
    repeatCardId
  );
  const photocardPages = buildPrintPages(cards, sheetMode, repeatCardId);
  const worksheetSpreads = buildWorksheetSpreads(
    cards,
    sheetMode,
    repeatCardId,
    worksheetDuplexMode
  );

  const totalPreviewPages = isSingleOriginal
    ? originalCards.length
    : isWorksheetMode
    ? worksheetSpreads.length
    : photocardPages.length;

  const safePageIdx = Math.min(currentPageIdx, Math.max(0, totalPreviewPages - 1));

  const mmToPx = 3.7795275591;
  const basePreviewWidthPx = (isWorksheetMode ? 297 : 210) * mmToPx;
  const basePreviewHeightPx = (isWorksheetMode ? 210 : 297) * mmToPx;
  const previewScale = Math.min(0.68, Math.max(0.25, (previewWidth - 4) / basePreviewWidthPx));

  useEffect(() => {
    if (stagingJob && resolveStagingRef.current) {
      const resolveFn = resolveStagingRef.current;
      resolveStagingRef.current = null;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTimeout(() => {
            resolveFn(stagingRef.current);
          }, 40);
        });
      });
    }
  }, [stagingJob]);

  const renderStagingPage = (kind: 'a4' | 'png_card', pageIdx: number) =>
    new Promise<HTMLDivElement | null>((resolve) => {
      resolveStagingRef.current = resolve;
      setStagingJob({ kind, pageIdx });
    });

  const inkSuffix =
    inkMode === 'full' ? '풀컬러' : inkMode === 'ink_saver' ? '잉크절약' : '흑백';
  const layoutPrefix = isSingleOriginal
    ? '원본'
    : isPhotocard3x3
    ? '포카3x3'
    : '1-2학습지';

  const handleSaveCurrentPng = async () => {
    if (exportState.busy) return;
    const targetEl = isSingleOriginal ? originalPngRef.current : previewTargetRef.current;
    if (!targetEl) return;

    setExportState({ busy: true, label: 'PNG 저장 중...' });
    try {
      const card = originalCards[safePageIdx];
      const name = isSingleOriginal
        ? `${card.cardCode}_${card.badgeLabel}_${inkSuffix}.png`
        : `졸라수학맨_${layoutPrefix}_${safePageIdx + 1}쪽_${inkSuffix}.png`;
      await exportElementAsPng(targetEl, name, 3);
    } finally {
      setExportState({ busy: false, label: '' });
    }
  };

  const handleSaveCurrentPdf = async () => {
    if (exportState.busy || !previewTargetRef.current) return;
    setExportState({ busy: true, label: 'PDF 저장 중...' });
    try {
      const targetEl = previewTargetRef.current;
      const orientation = isWorksheetMode ? 'landscape' : 'portrait';
      const card = originalCards[safePageIdx];
      const name = isSingleOriginal
        ? `${card.cardCode}_${card.badgeLabel}_${inkSuffix}.pdf`
        : `졸라수학맨_${layoutPrefix}_${safePageIdx + 1}쪽_${inkSuffix}.pdf`;
      await exportPagesAsPdf(
        async () => targetEl,
        1,
        orientation,
        name
      );
    } finally {
      setExportState({ busy: false, label: '' });
    }
  };

  const handleSaveAllPdf = async () => {
    if (exportState.busy) return;
    setExportState({ busy: true, label: `전체 PDF 생성 중 (0/${totalPreviewPages})` });
    try {
      const orientation = isWorksheetMode ? 'landscape' : 'portrait';
      await exportPagesAsPdf(
        (idx) => renderStagingPage('a4', idx),
        totalPreviewPages,
        orientation,
        `졸라수학맨_${unitMeta.fileSlug}_${layoutPrefix}_전체_${inkSuffix}.pdf`,
        (cur, tot) => setExportState({ busy: true, label: `전체 PDF 생성 중 (${cur}/${tot})` })
      );
    } finally {
      setStagingJob(null);
      setExportState({ busy: false, label: '' });
    }
  };

  const handleSaveAllZip = async () => {
    if (exportState.busy) return;
    setExportState({ busy: true, label: `ZIP 생성 중 (0/${totalPreviewPages})` });
    try {
      await exportPagesAsZip(
        (idx) => renderStagingPage(isSingleOriginal ? 'png_card' : 'a4', idx),
        (idx) => {
          if (isSingleOriginal) {
            const c = originalCards[idx];
            return `${String(idx + 1).padStart(2, '0')}_${c.cardCode}_${c.badgeLabel}_${inkSuffix}.png`;
          }
          return `${String(idx + 1).padStart(2, '0')}_${layoutPrefix}_${inkSuffix}.png`;
        },
        totalPreviewPages,
        `졸라수학맨_${unitMeta.fileSlug}_${layoutPrefix}_PNG모음_${inkSuffix}.zip`,
        3,
        (cur, tot) => setExportState({ busy: true, label: `ZIP 생성 중 (${cur}/${tot})` })
      );
    } finally {
      setStagingJob(null);
      setExportState({ busy: false, label: '' });
    }
  };

  const shortBinderLabel = (id: BinderSizeId, widthMm: number, heightMm: number) => {
    if (id === 'daiso_55x85') return `다이소 ${widthMm}×${heightMm}`;
    if (id === 'sleeve_58x88') return `슬리브 ${widthMm}×${heightMm}`;
    return `보드 ${widthMm}×${heightMm}`;
  };

  const scopeButtons = [
    { id: 'all_pages', label: `전체 ${cards.length}` },
    { id: 'basic_pack', label: `기본 ${cards.filter((c) => c.badgeLabel === '기본').length}` },
    { id: 'skill_pack', label: `필살 ${cards.filter((c) => c.badgeLabel === '필살').length}` },
    {
      id: 'special_pack',
      label: `스페셜 ${cards.filter((c) => ['도감', '핵심', '함정', '도전', '보스', '칭찬', '스페셜', '손필기'].includes(c.badgeLabel)).length}`,
    },
    ...(isPhotocard3x3 ? [{ id: 'single_repeat', label: '1종 9장' }] : []),
  ];

  const renderStagingContent = () => {
    if (!stagingJob) return null;
    const { kind, pageIdx } = stagingJob;
    if (kind === 'png_card') {
      const c = originalCards[pageIdx] ?? originalCards[0];
      return (
        <ConceptPhotocard
          card={c}
          widthPx={550}
          inkMode={inkMode}
        />
      );
    }
    if (isSingleOriginal) {
      const c = originalCards[pageIdx] ?? originalCards[0];
      return (
        <A4OriginalCardCanvas
          card={c}
          activeUnit={activeUnit}
          inkMode={inkMode}
          pageLabel={`${pageIdx + 1}/${originalCards.length}`}
        />
      );
    }
    if (isWorksheetMode) {
      const sp = worksheetSpreads[pageIdx] ?? worksheetSpreads[0];
      return (
        <A4LandscapeWorksheetCanvas
          spread={sp}
          activeUnit={activeUnit}
          duplexMode={worksheetDuplexMode}
          inkMode={inkMode}
        />
      );
    }
    const pageCards = photocardPages[pageIdx] ?? photocardPages[0];
    return (
      <A4SheetCanvas
        cardsToPrint={pageCards}
        activeUnit={activeUnit}
        widthMm={preset.widthMm}
        heightMm={preset.heightMm}
        showCropMarks={showCropMarks}
        showCornerGuide={showCornerGuide}
        inkMode={inkMode}
        tightCut={tightCut}
        pageLabel={photocardPages.length > 1 ? `${pageIdx + 1}/${photocardPages.length}페이지` : undefined}
      />
    );
  };

  return (
    <div className="max-w-[1200px] mx-auto px-2 sm:px-6 pt-1.5 pb-6 space-y-2">
      {/* Condensed Top Print & Export Control Strip */}
      <div className="bg-slate-50/70 border-b border-slate-200 px-2 py-1.5 space-y-1.5">
        {/* Row 1: Unit · Pack · Layout · Ink + Compact Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-1.5">
          <div className="flex flex-wrap items-center gap-1">
            <select
              aria-label="단원 선택"
              value={
                visiblePrintUnits.some((opt) => opt.id === activeUnit)
                  ? activeUnit
                  : visiblePrintUnits[0]?.id ?? activeUnit
              }
              onChange={(e) => {
                onChangeActiveUnit(e.target.value as UnitId);
                onChangeCurrentPageIdx(0);
              }}
              className="h-7 px-1.5 border border-slate-300 bg-white text-[11px] font-bold text-slate-900 focus:outline-none cursor-pointer"
            >
              {visiblePrintUnits.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label} ({unitCounts[opt.id] ?? 0})
                </option>
              ))}
            </select>

            <select
              aria-label="카드 범위 선택"
              value={sheetMode}
              onChange={(e) => {
                onChangeSheetMode(e.target.value as SheetMode);
                onChangeCurrentPageIdx(0);
              }}
              className="h-7 px-1.5 border border-slate-300 bg-white text-[11px] font-bold text-slate-800 focus:outline-none cursor-pointer"
            >
              {scopeButtons.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>

            {isPhotocard3x3 && sheetMode === 'single_repeat' && (
              <select
                aria-label="반복 카드 선택"
                value={repeatCardId}
                onChange={(e) => onChangeRepeatCardId(e.target.value)}
                className="h-7 px-1.5 text-[11px] border border-slate-300 bg-white text-slate-900 max-w-[120px]"
              >
                {cards.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.badgeLabel} {c.title.replace(/\[\[(\d+)\/(\d+)\]\]/g, '$2분의 $1')}
                  </option>
                ))}
              </select>
            )}

            {/* Layout 3-Segment */}
            <div className="inline-flex h-7 border border-slate-300 bg-white shrink-0">
              {[
                { id: 'single_original', label: '원본' },
                { id: 'photocard_3x3', label: '3×3' },
                { id: 'worksheet_2up', label: '1/2지' },
              ].map((opt, idx) => {
                const active = printLayoutMode === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    title={
                      opt.id === 'single_original'
                        ? '원본(1장씩 따로)'
                        : opt.id === 'photocard_3x3'
                        ? '포카 3×3'
                        : '1/2 학습지'
                    }
                    onClick={() => {
                      const nextMode = opt.id as PrintLayoutMode;
                      onChangePrintLayoutMode(nextMode);
                      if (nextMode !== 'photocard_3x3' && sheetMode === 'single_repeat') {
                        onChangeSheetMode('all_pages');
                      }
                      onChangeCurrentPageIdx(0);
                    }}
                    className={`px-2 text-[11px] font-bold transition-colors whitespace-nowrap cursor-pointer ${
                      idx > 0 ? 'border-l border-slate-300' : ''
                    } ${
                      active
                        ? 'bg-violet-100 text-violet-700'
                        : 'bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>

            {/* Ink Mode 3-Segment */}
            <div className="inline-flex h-7 border border-slate-300 bg-white shrink-0">
              {[
                { id: 'full', label: '컬러' },
                { id: 'ink_saver', label: '절약' },
                { id: 'bw_worksheet', label: '흑백' },
              ].map((opt, idx) => {
                const active = inkMode === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => onChangeInkMode(opt.id as PrintInkMode)}
                    className={`px-2 text-[11px] font-bold transition-colors whitespace-nowrap cursor-pointer ${
                      idx > 0 ? 'border-l border-slate-300' : ''
                    } ${
                      active
                        ? 'bg-slate-800 text-white'
                        : 'bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Compact Export & Print Buttons */}
          {accessMode === 'teacher' ? (
            <div className="flex items-center gap-1 ml-auto shrink-0">
              <button
                type="button"
                disabled={exportState.busy}
                onClick={handleSaveCurrentPdf}
                title="PDF 현재페이지 저장"
                aria-label="PDF 현재페이지 저장"
                className="h-7 px-1.5 sm:px-2 border border-slate-300 bg-white hover:bg-slate-100 text-slate-800 text-[11px] font-bold inline-flex items-center justify-center gap-1 transition-colors whitespace-nowrap cursor-pointer disabled:opacity-50"
              >
                <FileDown className="w-3.5 h-3.5 text-violet-600 shrink-0" />
                <span className="hidden sm:inline">PDF</span>
              </button>

              <button
                type="button"
                disabled={exportState.busy}
                onClick={handleSaveCurrentPng}
                title="PNG 현재페이지 저장"
                aria-label="PNG 현재페이지 저장"
                className="h-7 px-1.5 sm:px-2 border border-slate-300 bg-white hover:bg-slate-100 text-slate-800 text-[11px] font-bold inline-flex items-center justify-center gap-1 transition-colors whitespace-nowrap cursor-pointer disabled:opacity-50"
              >
                <ImageIcon className="w-3.5 h-3.5 text-violet-600 shrink-0" />
                <span className="hidden sm:inline">PNG</span>
              </button>

              <button
                type="button"
                disabled={exportState.busy}
                onClick={handleSaveAllPdf}
                title="PDF 단원전체 저장"
                aria-label="PDF 단원전체 저장"
                className="h-7 px-1.5 sm:px-2 border border-violet-300 bg-violet-100 hover:bg-violet-200 text-violet-700 text-[11px] font-bold inline-flex items-center justify-center gap-1 transition-colors whitespace-nowrap cursor-pointer disabled:opacity-50"
              >
                <FileDown className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden sm:inline">전체PDF</span>
              </button>

              <button
                type="button"
                disabled={exportState.busy}
                onClick={handleSaveAllZip}
                title="PNG 전체 ZIP 저장"
                aria-label="PNG 전체 ZIP 저장"
                className="h-7 px-1.5 sm:px-2 border border-violet-300 bg-violet-100 hover:bg-violet-200 text-violet-700 text-[11px] font-bold inline-flex items-center justify-center gap-1 transition-colors whitespace-nowrap cursor-pointer disabled:opacity-50"
              >
                <FolderArchive className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden sm:inline">ZIP</span>
              </button>

              <button
                type="button"
                disabled={exportState.busy}
                onClick={() => onTriggerPrint('current')}
                title="현재 페이지 인쇄"
                aria-label="현재 페이지 인쇄"
                className="h-7 px-1.5 sm:px-2 border border-slate-300 bg-white hover:bg-slate-100 text-slate-800 text-[11px] font-bold inline-flex items-center justify-center gap-1 transition-colors whitespace-nowrap cursor-pointer disabled:opacity-50"
              >
                <Printer className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden sm:inline">현재인쇄</span>
              </button>

              <button
                type="button"
                disabled={exportState.busy}
                onClick={() => onTriggerPrint('all')}
                title="단원 전체 인쇄"
                aria-label="단원 전체 인쇄"
                className="h-7 px-1.5 sm:px-2 border border-slate-800 bg-slate-800 hover:bg-slate-700 text-white text-[11px] font-bold inline-flex items-center justify-center gap-1 transition-colors whitespace-nowrap cursor-pointer disabled:opacity-50"
              >
                <Printer className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden sm:inline">전체인쇄</span>
              </button>
            </div>
          ) : (
            <button
              type="button"
              disabled={exportState.busy}
              onClick={() => onTriggerPrint('current')}
              title="현재 페이지 인쇄"
              className="h-7 px-2.5 border border-slate-800 bg-slate-800 hover:bg-slate-700 text-white text-[11px] font-bold inline-flex items-center justify-center gap-1 transition-colors whitespace-nowrap cursor-pointer disabled:opacity-50 ml-auto shrink-0"
            >
              <Printer className="w-3.5 h-3.5 shrink-0" />
              <span>현재 페이지 인쇄</span>
            </button>
          )}
        </div>

        {/* Row 2: Mode-Specific Options + Compact Page Stepper */}
        <div className="flex flex-wrap items-center justify-between gap-1.5 pt-1 border-t border-slate-200/80 text-[11px]">
          {isSingleOriginal && (
            <div className="flex items-center gap-1.5 min-w-0">
              <select
                aria-label="카드 선택"
                value={originalCards[safePageIdx]?.id ?? ''}
                onChange={(e) => {
                  const found = originalCards.findIndex((c) => c.id === e.target.value);
                  if (found >= 0) onChangeCurrentPageIdx(found);
                }}
                className="h-7 px-1.5 border border-slate-300 bg-white text-[11px] font-medium text-slate-900 max-w-[200px] sm:max-w-[240px]"
              >
                {originalCards.map((c, idx) => (
                  <option key={c.id} value={c.id}>
                    {idx + 1}. [{c.badgeLabel}] {c.title.replace(/\[\[(\d+)\/(\d+)\]\]/g, '$2분의 $1')}
                  </option>
                ))}
              </select>
            </div>
          )}

          {isPhotocard3x3 && (
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <div className="inline-flex h-7 border border-slate-300 bg-white">
                {BINDER_PRESETS.map((p, idx) => {
                  const active = p.id === binderSize;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      title={p.label}
                      onClick={() => onChangeBinderSize(p.id)}
                      className={`px-1.5 text-[10.5px] sm:text-[11px] font-bold transition-colors whitespace-nowrap cursor-pointer ${
                        idx > 0 ? 'border-l border-slate-300' : ''
                      } ${
                        active
                          ? 'bg-violet-100 text-violet-700'
                          : 'bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {shortBinderLabel(p.id, p.widthMm, p.heightMm)}
                    </button>
                  );
                })}
              </div>

              <label className="inline-flex items-center gap-1 cursor-pointer font-bold text-slate-800 whitespace-nowrap">
                <input
                  type="checkbox"
                  checked={tightCut}
                  onChange={onToggleTightCut}
                  className="accent-violet-600 w-3.5 h-3.5 cursor-pointer"
                />
                <Scissors className="w-3 h-3 text-violet-600" />
                <span>0mm</span>
              </label>

              <label className="inline-flex items-center gap-1 cursor-pointer font-medium text-slate-700 whitespace-nowrap">
                <input
                  type="checkbox"
                  checked={showCropMarks}
                  onChange={onToggleCropMarks}
                  className="accent-violet-600 w-3.5 h-3.5 cursor-pointer"
                />
                <span>재단선</span>
              </label>

              {!tightCut && (
                <label className="inline-flex items-center gap-1 cursor-pointer font-medium text-slate-700 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={showCornerGuide}
                    onChange={onToggleCornerGuide}
                    className="accent-violet-600 w-3.5 h-3.5 cursor-pointer"
                  />
                  <span>R3</span>
                </label>
              )}
            </div>
          )}

          {isWorksheetMode && (
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex h-7 border border-slate-300 bg-white">
                <button
                  type="button"
                  onClick={() => {
                    onChangeWorksheetDuplexMode('single');
                    onChangeCurrentPageIdx(0);
                  }}
                  className={`px-2 text-[11px] font-bold inline-flex items-center gap-1 transition-colors whitespace-nowrap cursor-pointer ${
                    worksheetDuplexMode === 'single'
                      ? 'bg-slate-800 text-white'
                      : 'bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <FileText className="w-3 h-3" />
                  <span>단면</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onChangeWorksheetDuplexMode('booklet');
                    onChangeCurrentPageIdx(0);
                  }}
                  className={`px-2 text-[11px] font-bold inline-flex items-center gap-1 border-l border-slate-300 transition-colors whitespace-nowrap cursor-pointer ${
                    worksheetDuplexMode === 'booklet'
                      ? 'bg-slate-800 text-white'
                      : 'bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <BookOpen className="w-3 h-3" />
                  <span>양면소책자</span>
                </button>
              </div>
              {worksheetDuplexMode === 'booklet' && (
                <span className="text-[11px] text-slate-500 font-medium whitespace-nowrap">
                  짧은 쪽 넘김
                </span>
              )}
            </div>
          )}

          {/* Status + Compact Page Stepper */}
          <div className="flex items-center gap-1 ml-auto shrink-0">
            {exportState.busy && (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-violet-700 mr-1">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>{exportState.label}</span>
              </span>
            )}

            <button
              type="button"
              disabled={safePageIdx <= 0}
              onClick={() => onChangeCurrentPageIdx(Math.max(0, safePageIdx - 1))}
              className="w-7 h-7 border border-slate-300 bg-white text-slate-800 inline-flex items-center justify-center disabled:opacity-35 cursor-pointer disabled:cursor-not-allowed"
              aria-label="이전 페이지"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {totalPreviewPages > 1 ? (
              <select
                aria-label="페이지 이동"
                value={safePageIdx}
                onChange={(e) => onChangeCurrentPageIdx(Number(e.target.value))}
                className="h-7 px-1.5 border border-slate-300 bg-white font-mono-num text-[11px] font-bold text-slate-900 cursor-pointer"
              >
                {Array.from({ length: totalPreviewPages }, (_, idx) => (
                  <option key={idx} value={idx}>
                    {idx + 1}/{totalPreviewPages}
                    {isSingleOriginal
                      ? ` (${originalCards[idx].cardCode.slice(-2)})`
                      : isWorksheetMode
                      ? ` (${worksheetSpreads[idx].sideLabel})`
                      : ''}
                  </option>
                ))}
              </select>
            ) : (
              <span className="font-mono-num text-[11px] font-bold text-slate-900 px-1.5">
                1 / 1
              </span>
            )}

            <button
              type="button"
              disabled={safePageIdx >= totalPreviewPages - 1}
              onClick={() =>
                onChangeCurrentPageIdx(Math.min(totalPreviewPages - 1, safePageIdx + 1))
              }
              className="w-7 h-7 border border-slate-300 bg-white text-slate-800 inline-flex items-center justify-center disabled:opacity-35 cursor-pointer disabled:cursor-not-allowed"
              aria-label="다음 페이지"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Open Responsive A4 Preview (No heavy black cage, full viewport fit on mobile & PC) */}
      <div ref={previewAreaRef} className="w-full pt-1 flex justify-center">
        <div
          style={{
            width: `${Math.round(basePreviewWidthPx * previewScale)}px`,
            height: `${Math.round(basePreviewHeightPx * previewScale)}px`,
          }}
          className="relative border border-slate-200 shadow-sm bg-white overflow-hidden shrink-0"
        >
          <div
            style={{
              transform: `scale(${previewScale})`,
              transformOrigin: 'top left',
            }}
          >
            <div ref={previewTargetRef} className="inline-block">
              {isWorksheetMode ? (
                <A4LandscapeWorksheetCanvas
                  spread={worksheetSpreads[safePageIdx]}
                  activeUnit={activeUnit}
                  duplexMode={worksheetDuplexMode}
                  inkMode={inkMode}
                />
              ) : isSingleOriginal ? (
                <A4OriginalCardCanvas
                  card={originalCards[safePageIdx]}
                  activeUnit={activeUnit}
                  inkMode={inkMode}
                  pageLabel={`${safePageIdx + 1}/${originalCards.length}`}
                />
              ) : (
                <A4SheetCanvas
                  cardsToPrint={photocardPages[safePageIdx]}
                  activeUnit={activeUnit}
                  widthMm={preset.widthMm}
                  heightMm={preset.heightMm}
                  showCropMarks={showCropMarks}
                  showCornerGuide={showCornerGuide}
                  inkMode={inkMode}
                  tightCut={tightCut}
                  pageLabel={
                    photocardPages.length > 1
                      ? `${safePageIdx + 1}/${photocardPages.length}페이지`
                      : undefined
                  }
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Off-screen PNG capture source for borderless Original Card PNG export */}
      {isSingleOriginal && originalCards[safePageIdx] && (
        <div
          aria-hidden="true"
          className="fixed -left-[99999px] top-0 pointer-events-none bg-white"
        >
          <div ref={originalPngRef}>
            <ConceptPhotocard
              card={originalCards[safePageIdx]}
              widthPx={550}
              inkMode={inkMode}
            />
          </div>
        </div>
      )}

      {/* Off-screen Staging Target for Multi-Page PDF / PNG ZIP Export */}
      {stagingJob && (
        <div
          aria-hidden="true"
          className="fixed -left-[99999px] top-0 pointer-events-none bg-white"
        >
          <div ref={stagingRef}>{renderStagingContent()}</div>
        </div>
      )}
    </div>
  );
};
