import React, { useRef, useState } from 'react';
import {
  Check,
  ImagePlus,
  Printer,
  RotateCcw,
  SlidersHorizontal,
  Sparkles,
  Trash2,
  Upload,
} from 'lucide-react';
import {
  CardThemeColor,
  ConceptCard,
  UnitId,
} from '../types/card';
import { UNIT_METADATA } from '../data/gugudanCards';
import { ConceptPhotocard } from './ConceptPhotocard';
import {
  createSampleMarkerPhoto,
  processMarkerPhoto,
} from '../utils/handwritingProcessor';

interface HandwritingCardCreatorProps {
  activeUnit: UnitId;
  decks: Record<UnitId, ConceptCard[]>;
  customCardsByUnit: Record<UnitId, ConceptCard[]>;
  onAddCustomCard: (unitId: UnitId, card: ConceptCard) => boolean;
  onDeleteCustomCard: (unitId: UnitId, cardId: string) => void;
  onOpenGalleryForUnit: (unitId: UnitId) => void;
  onOpenPrintForUnit: (unitId: UnitId) => void;
}

const UNIT_ORDER: UnitId[] = [
  '1-2-6',
  '2-2-2',
  '3-2-2',
  '3-2-3',
  '3-2-4',
  '3-2-5',
  '4-2-1',
  '5-2-2',
  '6-2-1',
  '6-2-4',
];

const THEME_COLOR_OPTIONS: { id: CardThemeColor; label: string; dotClass: string }[] = [
  { id: 'blue', label: '기본(파)', dotClass: 'bg-blue-600' },
  { id: 'emerald', label: '필살(초)', dotClass: 'bg-emerald-600' },
  { id: 'gold', label: '핵심(금)', dotClass: 'bg-amber-500' },
  { id: 'hazard', label: '함정(경고)', dotClass: 'bg-orange-600' },
  { id: 'violet', label: '도전(보)', dotClass: 'bg-violet-600' },
  { id: 'comic', label: '도감(백)', dotClass: 'bg-slate-800' },
  { id: 'boss', label: '보스(흑금)', dotClass: 'bg-slate-950 ring-1 ring-yellow-400' },
];

const BADGE_PRESETS = ['손필기', '핵심', '필살', '기본', '함정', '도전'];

export const HandwritingCardCreator: React.FC<HandwritingCardCreatorProps> = ({
  activeUnit,
  decks,
  customCardsByUnit,
  onAddCustomCard,
  onDeleteCustomCard,
  onOpenGalleryForUnit,
  onOpenPrintForUnit,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [targetUnit, setTargetUnit] = useState<UnitId>(activeUnit);
  const [title, setTitle] = useState<string>('선생님 손필기 특강');
  const [badgeLabel, setBadgeLabel] = useState<string>('손필기');
  const [themeColor, setThemeColor] = useState<CardThemeColor>('violet');
  const [memeStat, setMemeStat] = useState<string>('직접 손필기');
  const [showTipBox, setShowTipBox] = useState<boolean>(false);
  const [tipText, setTipText] = useState<string>('종이에 직접 써 본 {{핵심 필기}}!');

  // Temporary in-memory source & processed photo state
  const [rawDataUrl, setRawDataUrl] = useState<string>('');
  const [processedDataUrl, setProcessedDataUrl] = useState<string>('');
  const [threshold, setThreshold] = useState<number>(175);
  const [contrast, setContrast] = useState<number>(1.7);
  const [inkColor, setInkColor] = useState<'original' | 'black' | 'blue' | 'red'>('original');
  const [scale, setScale] = useState<number>(1);
  const [offsetX, setOffsetX] = useState<number>(0);
  const [offsetY, setOffsetY] = useState<number>(0);
  const [rotation, setRotation] = useState<number>(0);

  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [statusMsg, setStatusMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  const runProcess = async (
    sourceUrl: string,
    opts: {
      threshold: number;
      contrast: number;
      inkColor: 'original' | 'black' | 'blue' | 'red';
    }
  ) => {
    setIsProcessing(true);
    try {
      const out = await processMarkerPhoto(sourceUrl, opts);
      setProcessedDataUrl(out);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setStatusMsg(null);
    const reader = new FileReader();
    reader.onload = async () => {
      const rawUrl = reader.result as string;
      setRawDataUrl(rawUrl);
      await runProcess(rawUrl, { threshold, contrast, inkColor });
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleLoadSample = async () => {
    setStatusMsg(null);
    const sampleRaw = createSampleMarkerPhoto();
    setRawDataUrl(sampleRaw);
    await runProcess(sampleRaw, { threshold, contrast, inkColor });
  };

  const handleReprocessPatch = async (
    patch: Partial<{
      threshold: number;
      contrast: number;
      inkColor: 'original' | 'black' | 'blue' | 'red';
    }>
  ) => {
    const nextThreshold = patch.threshold ?? threshold;
    const nextContrast = patch.contrast ?? contrast;
    const nextInkColor = patch.inkColor ?? inkColor;
    if (patch.threshold !== undefined) setThreshold(nextThreshold);
    if (patch.contrast !== undefined) setContrast(nextContrast);
    if (patch.inkColor !== undefined) setInkColor(nextInkColor);
    if (rawDataUrl) {
      await runProcess(rawDataUrl, {
        threshold: nextThreshold,
        contrast: nextContrast,
        inkColor: nextInkColor,
      });
    }
  };

  const resetPosition = () => {
    setScale(1);
    setOffsetX(0);
    setOffsetY(0);
    setRotation(0);
  };

  const customListForUnit = customCardsByUnit[targetUnit] ?? [];
  const nextIndex = decks[targetUnit].length;
  const previewCardCode = `${targetUnit}-${String(nextIndex).padStart(2, '0')}`;

  const previewCard: ConceptCard = {
    id: 'custom-hw-preview',
    cardCode: previewCardCode,
    rarityLabel: '★ HAND',
    badgeLabel: badgeLabel.trim() || '손필기',
    memeStat: memeStat.trim() || undefined,
    title: title.trim() || '손필기 포카',
    themeColor,
    sceneType: 'guide_deck_manual',
    denominator: 4,
    numerator: 1,
    whole: 0,
    tipText: showTipBox ? tipText.trim() : '',
    easyTipText: showTipBox ? tipText.trim() : '',
    customHandwriting: processedDataUrl
      ? {
          imageDataUrl: processedDataUrl,
          inkColor,
          scale,
          offsetX,
          offsetY,
          rotation,
          hideTipBox: !showTipBox,
        }
      : undefined,
  };

  const handleCreateAndAddCard = () => {
    if (!processedDataUrl) {
      setStatusMsg({
        type: 'err',
        text: '먼저 손글씨·그림 사진을 올리거나 샘플 테스트를 눌러 주세요.',
      });
      return;
    }

    const newCard: ConceptCard = {
      ...previewCard,
      id: `custom-hw-${targetUnit}-${Date.now()}`,
      cardCode: `${targetUnit}-H${customListForUnit.length + 1}`,
      customHandwriting: {
        imageDataUrl: processedDataUrl,
        inkColor,
        scale,
        offsetX,
        offsetY,
        rotation,
        hideTipBox: !showTipBox,
      },
    };

    const ok = onAddCustomCard(targetUnit, newCard);
    if (!ok) {
      setStatusMsg({
        type: 'err',
        text: '브라우저 저장 용량이 가득 차 추가할 수 없습니다. 기존 손글씨 카드를 일부 삭제해 주세요.',
      });
      return;
    }

    setStatusMsg({
      type: 'ok',
      text: `[${UNIT_METADATA[targetUnit].shortLabel}] 단원에 새 손글씨 포카가 추가되었습니다!`,
    });
  };

  const allCustomEntries = UNIT_ORDER.flatMap((uid) =>
    (customCardsByUnit[uid] ?? []).map((card) => ({ unitId: uid, card }))
  );

  return (
    <div className="space-y-4">
      <div className="bg-white border-2 border-slate-900 p-4 sm:p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-200">
          <div>
            <h2 className="font-game text-xl text-slate-900 tracking-tight">
              손글씨 포카 새로 만들기
            </h2>
            <p className="text-xs font-body text-slate-600 mt-0.5">
              종이에 직접 쓴 수학 필기·그림 사진을 올리면 배경을 투명하게 지워 새 포토카드로 단원에 추가합니다.
            </p>
          </div>
          <span className="px-2.5 py-1 bg-violet-50 border border-violet-300 text-violet-700 text-[11px] font-bold whitespace-nowrap">
            기존 카드는 건드리지 않고 새 카드로 추가
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT: Live New Photocard Preview */}
          <div className="lg:col-span-5 bg-slate-50 border-2 border-slate-900 p-4 flex flex-col items-center gap-3">
            <div className="w-full flex items-center justify-between text-xs font-bold text-slate-700">
              <span>생성될 새 포카 미리보기</span>
              <span className="font-mono-num text-[11px] text-slate-500">
                55×85mm 규격
              </span>
            </div>

            {processedDataUrl ? (
              <div className="p-2 bg-white border border-slate-300 shadow-sm">
                <ConceptPhotocard
                  card={previewCard}
                  widthPx={276}
                />
              </div>
            ) : (
              <div
                style={{ width: 276, height: 426 }}
                className="bg-white border-2 border-dashed border-slate-300 flex flex-col items-center justify-center p-6 text-center gap-3"
              >
                <ImagePlus className="w-10 h-10 text-slate-300" />
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-700">
                    아직 손글씨 사진이 없습니다
                  </p>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    오른쪽에서 A4 손필기 사진을 올리거나 ‘샘플 테스트’를 눌러 보세요.
                  </p>
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={handleCreateAndAddCard}
              disabled={isProcessing}
              className="w-full py-2.5 px-4 border-2 border-slate-900 bg-violet-600 hover:bg-violet-700 text-white text-xs sm:text-sm font-bold inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
            >
              <ImagePlus className="w-4 h-4" />
              <span>이 손글씨로 새 포카 추가하기</span>
            </button>

            {statusMsg && (
              <div
                className={`w-full p-2.5 border text-xs font-bold space-y-2 ${
                  statusMsg.type === 'ok'
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-800'
                    : 'bg-rose-50 border-rose-400 text-rose-700'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  {statusMsg.type === 'ok' && <Check className="w-4 h-4 shrink-0" />}
                  <span>{statusMsg.text}</span>
                </div>
                {statusMsg.type === 'ok' && (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onOpenGalleryForUnit(targetUnit)}
                      className="px-2.5 py-1 border border-slate-900 bg-white text-slate-900 text-[11px] font-bold hover:bg-slate-50 cursor-pointer"
                    >
                      도감에서 보기
                    </button>
                    <button
                      type="button"
                      onClick={() => onOpenPrintForUnit(targetUnit)}
                      className="px-2.5 py-1 border border-slate-900 bg-slate-900 text-white text-[11px] font-bold inline-flex items-center gap-1 hover:bg-slate-800 cursor-pointer"
                    >
                      <Printer className="w-3 h-3" />
                      <span>인쇄하러 가기</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* RIGHT: Upload + Cleanup Controls + Card Metadata */}
          <div className="lg:col-span-7 space-y-4">
            {/* Step 1: Photo Upload & Background Cleanup */}
            <div className="border-2 border-slate-900 p-4 space-y-3 bg-white">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h3 className="text-xs font-bold text-slate-900">
                    1. 손글씨 · 그림 사진 올리기 (흰 종이 배경 자동 제거)
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    흰 A4 종이에 두꺼운 펜·매직으로 쓴 뒤 밝은 곳에서 찍으면 가장 깔끔합니다.
                  </p>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="h-8 px-3 border border-slate-900 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>사진 선택</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleLoadSample}
                    className="h-8 px-3 border border-slate-900 bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-violet-600" />
                    <span>샘플 테스트</span>
                  </button>
                </div>
              </div>

              {processedDataUrl && (
                <div className="pt-3 border-t border-slate-200 space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] font-bold text-slate-700">
                        잉크 색상 보정 {isProcessing ? '(처리 중...)' : ''}
                      </span>
                      <button
                        type="button"
                        onClick={resetPosition}
                        className="text-[11px] font-bold text-slate-500 hover:text-slate-900 inline-flex items-center gap-1 cursor-pointer"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>위치·크기 초기화</span>
                      </button>
                    </div>
                    <div className="grid grid-cols-4 gap-1.5">
                      {[
                        { id: 'original', label: '원본 색' },
                        { id: 'black', label: '진한 먹색' },
                        { id: 'blue', label: '파란 매직' },
                        { id: 'red', label: '빨간 매직' },
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() =>
                            handleReprocessPatch({
                              inkColor: opt.id as 'original' | 'black' | 'blue' | 'red',
                            })
                          }
                          className={`py-1.5 px-2 border text-[11px] font-bold cursor-pointer transition-colors ${
                            inkColor === opt.id
                              ? 'bg-slate-900 text-white border-slate-900'
                              : 'bg-white text-slate-700 border-slate-300 hover:border-slate-900'
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
                    <div>
                      <div className="flex justify-between text-slate-600 font-bold mb-1">
                        <span className="inline-flex items-center gap-1">
                          <SlidersHorizontal className="w-3 h-3" />
                          배경 제거 강도
                        </span>
                        <span className="font-mono-num">{threshold}</span>
                      </div>
                      <input
                        type="range"
                        min={110}
                        max={235}
                        value={threshold}
                        onChange={(e) =>
                          handleReprocessPatch({ threshold: Number(e.target.value) })
                        }
                        className="w-full accent-violet-600 cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-600 font-bold mb-1">
                        <span>선 선명도</span>
                        <span className="font-mono-num">{contrast.toFixed(1)}</span>
                      </div>
                      <input
                        type="range"
                        min={1.0}
                        max={2.6}
                        step={0.1}
                        value={contrast}
                        onChange={(e) =>
                          handleReprocessPatch({ contrast: Number(e.target.value) })
                        }
                        className="w-full accent-violet-600 cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-600 font-bold mb-1">
                        <span>크기 조절</span>
                        <span className="font-mono-num">{Math.round(scale * 100)}%</span>
                      </div>
                      <input
                        type="range"
                        min={0.4}
                        max={1.8}
                        step={0.05}
                        value={scale}
                        onChange={(e) => setScale(Number(e.target.value))}
                        className="w-full accent-violet-600 cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-600 font-bold mb-1">
                        <span>기울기 보정</span>
                        <span className="font-mono-num">{rotation}°</span>
                      </div>
                      <input
                        type="range"
                        min={-15}
                        max={15}
                        step={1}
                        value={rotation}
                        onChange={(e) => setRotation(Number(e.target.value))}
                        className="w-full accent-violet-600 cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-600 font-bold mb-1">
                        <span>좌우 이동</span>
                        <span className="font-mono-num">{offsetX}px</span>
                      </div>
                      <input
                        type="range"
                        min={-60}
                        max={60}
                        step={2}
                        value={offsetX}
                        onChange={(e) => setOffsetX(Number(e.target.value))}
                        className="w-full accent-violet-600 cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-600 font-bold mb-1">
                        <span>상하 이동</span>
                        <span className="font-mono-num">{offsetY}px</span>
                      </div>
                      <input
                        type="range"
                        min={-60}
                        max={60}
                        step={2}
                        value={offsetY}
                        onChange={(e) => setOffsetY(Number(e.target.value))}
                        className="w-full accent-violet-600 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Step 2: New Card Metadata */}
            <div className="border-2 border-slate-900 p-4 space-y-3 bg-white">
              <h3 className="text-xs font-bold text-slate-900">
                2. 새 포카 정보 입력
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    추가할 단원
                  </label>
                  <select
                    value={targetUnit}
                    onChange={(e) => setTargetUnit(e.target.value as UnitId)}
                    className="w-full h-9 px-2.5 border border-slate-900 bg-white text-xs font-bold text-slate-900 cursor-pointer"
                  >
                    {UNIT_ORDER.map((uid) => (
                      <option key={uid} value={uid}>
                        {UNIT_METADATA[uid].shortLabel} ({decks[uid].length}장)
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    상단 상태 태그 (선택)
                  </label>
                  <input
                    type="text"
                    value={memeStat}
                    onChange={(e) => setMemeStat(e.target.value)}
                    placeholder="예: 직접 손필기"
                    className="w-full h-9 px-2.5 border border-slate-900 bg-white text-xs text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    카드 제목 <span className="text-slate-400 font-normal">(분수는 [[3/4]] 입력)</span>
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="예: 분모 통분 한방 정리"
                    className="w-full h-9 px-2.5 border border-slate-900 bg-white text-xs font-bold text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    배지 문구
                  </label>
                  <input
                    type="text"
                    value={badgeLabel}
                    onChange={(e) => setBadgeLabel(e.target.value)}
                    className="w-full h-9 px-2.5 border border-slate-900 bg-white text-xs font-bold text-slate-900"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {BADGE_PRESETS.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setBadgeLabel(preset)}
                    className={`px-2 py-0.5 border text-[11px] font-bold cursor-pointer ${
                      badgeLabel === preset
                        ? 'bg-violet-600 text-white border-slate-900'
                        : 'bg-slate-50 text-slate-700 border-slate-300 hover:border-slate-900'
                    }`}
                  >
                    {preset}
                  </button>
                ))}
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1.5">
                  카드 프레임 테마
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5">
                  {THEME_COLOR_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setThemeColor(opt.id)}
                      className={`flex items-center justify-center gap-1 py-1.5 px-1 border text-[11px] font-bold cursor-pointer whitespace-nowrap ${
                        themeColor === opt.id
                          ? 'border-slate-900 bg-violet-50 text-violet-900'
                          : 'border-slate-300 bg-white text-slate-700 hover:border-slate-900'
                      }`}
                    >
                      <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${opt.dotClass}`} />
                      <span>{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200 space-y-2">
                <label className="inline-flex items-center gap-2 text-xs font-bold text-slate-800 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={showTipBox}
                    onChange={(e) => setShowTipBox(e.target.checked)}
                    className="accent-violet-600 w-3.5 h-3.5 cursor-pointer"
                  />
                  <span>하단 코멘트(TIP) 칸 넣기 (체크 해제 시 손글씨 영역 최대 확대)</span>
                </label>

                {showTipBox && (
                  <textarea
                    rows={2}
                    value={tipText}
                    onChange={(e) => setTipText(e.target.value)}
                    placeholder="하단에 넣을 짧은 설명 ([[3/4]] 분수, {{강조}} 지원)"
                    className="w-full p-2.5 border border-slate-900 bg-white text-xs font-body text-slate-900 resize-none"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Added Custom Handwriting Cards Manager */}
      <div className="bg-white border-2 border-slate-900 p-4 sm:p-5 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-game text-base text-slate-900">
            추가된 손글씨 포카 ({allCustomEntries.length}장)
          </h3>
          <span className="text-[11px] text-slate-500">
            이 브라우저에만 저장되며 도감과 인쇄에 바로 포함됩니다.
          </span>
        </div>

        {allCustomEntries.length === 0 ? (
          <p className="text-xs text-slate-500 py-3">
            아직 새로 추가한 손글씨 포카가 없습니다.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {allCustomEntries.map(({ unitId, card }) => (
              <div
                key={card.id}
                className="border border-slate-900 p-2.5 flex items-center gap-3 bg-slate-50"
              >
                <div className="shrink-0">
                  <ConceptPhotocard
                    card={card}
                    widthPx={76}
                  />
                </div>
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="text-[10px] font-bold text-violet-700 truncate">
                    {UNIT_METADATA[unitId].shortLabel} · {card.cardCode}
                  </div>
                  <div className="text-xs font-bold text-slate-900 truncate">
                    [{card.badgeLabel}] {card.title.replace(/\[\[(\d+)\/(\d+)\]\]/g, '$2분의 $1')}
                  </div>
                  <button
                    type="button"
                    onClick={() => onDeleteCustomCard(unitId, card.id)}
                    className="mt-1 inline-flex items-center gap-1 px-2 py-1 border border-rose-300 bg-white hover:bg-rose-50 text-rose-600 text-[11px] font-bold cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>삭제</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
