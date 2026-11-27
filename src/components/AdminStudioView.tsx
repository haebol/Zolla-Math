import React, { useEffect, useMemo, useState } from 'react';
import {
  Search,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  X,
} from 'lucide-react';
import { ConceptCard, UnitId } from '../types/card';
import { UNIT_METADATA } from '../data/gugudanCards';
import { ConceptPhotocard } from './ConceptPhotocard';
import { RichFractionText } from './RichFractionText';

export type AdminUnitDomain = 'calc' | 'measure' | 'shape' | 'other';

interface AdminStudioViewProps {
  unitOrder: UnitId[];
  unitDomainMap: Record<UnitId, AdminUnitDomain>;
  decks: Record<UnitId, ConceptCard[]>;
  activeUnit: UnitId;
  onSelectUnit: (uid: UnitId) => void;
  onMoveUnitOrder: (uid: UnitId, direction: 'up' | 'down') => void;
  onMoveCardOrder: (uid: UnitId, cardId: string, direction: 'up' | 'down') => void;
}

const DOMAIN_LABEL: Record<AdminUnitDomain, string> = {
  calc: '연산',
  measure: '측정',
  shape: '도형',
  other: '기타',
};

type GradeSearchFilter = 'ALL' | '1' | '2' | '3' | '4' | '5' | '6';
type DomainSearchFilter = 'ALL' | AdminUnitDomain;
type CardRoleFilter = 'ALL' | 'BASIC' | 'SKILL' | 'SPECIAL';
type MobileAdminPane = 'units' | 'items' | 'preview';

export const AdminStudioView: React.FC<AdminStudioViewProps> = ({
  unitOrder,
  unitDomainMap,
  decks,
  activeUnit,
  onSelectUnit,
  onMoveUnitOrder,
  onMoveCardOrder,
}) => {
  const [unitSearch, setUnitSearch] = useState('');
  const [gradeFilter, setGradeFilter] = useState<GradeSearchFilter>('ALL');
  const [domainFilter, setDomainFilter] = useState<DomainSearchFilter>('ALL');
  const [cardSearch, setCardSearch] = useState('');
  const [cardRoleFilter, setCardRoleFilter] = useState<CardRoleFilter>('ALL');
  const [selectedCardId, setSelectedCardId] = useState<string>(
    decks[activeUnit]?.[0]?.id ?? ''
  );
  const [mobilePane, setMobilePane] = useState<MobileAdminPane>('units');
  const [previewWidth, setPreviewWidth] = useState<number>(272);

  const activeUnitCards = decks[activeUnit] ?? [];
  const activeUnitMeta = UNIT_METADATA[activeUnit];

  useEffect(() => {
    const list = decks[activeUnit] ?? [];
    if (list.length === 0) {
      setSelectedCardId('');
      return;
    }
    if (!list.some((c) => c.id === selectedCardId)) {
      setSelectedCardId(list[0].id);
    }
  }, [activeUnit, decks, selectedCardId]);

  const filteredUnits = useMemo(() => {
    const q = unitSearch.trim().toLowerCase();
    return unitOrder.filter((uid) => {
      const meta = UNIT_METADATA[uid];
      if (gradeFilter !== 'ALL' && meta.grade !== gradeFilter) return false;
      const domain = unitDomainMap[uid] ?? 'other';
      if (domainFilter !== 'ALL' && domain !== domainFilter) return false;
      if (!q) return true;
      const searchTarget = `${meta.shortLabel} ${meta.fullLabel} ${meta.grade}학년 ${DOMAIN_LABEL[domain]} ${uid}`.toLowerCase();
      return searchTarget.includes(q);
    });
  }, [unitOrder, unitDomainMap, gradeFilter, domainFilter, unitSearch]);

  const filteredCards = useMemo(() => {
    const q = cardSearch.trim().toLowerCase();
    return activeUnitCards.filter((card) => {
      if (cardRoleFilter === 'BASIC' && card.badgeLabel !== '기본') return false;
      if (cardRoleFilter === 'SKILL' && card.badgeLabel !== '필살') return false;
      if (
        cardRoleFilter === 'SPECIAL' &&
        !['도감', '핵심', '함정', '도전', '스페셜', '보스', '칭찬', '손필기'].includes(
          card.badgeLabel
        )
      ) {
        return false;
      }
      if (!q) return true;
      const searchTarget = `${card.cardCode} ${card.badgeLabel} ${card.title} ${card.memeStat ?? ''} ${card.easyTipText ?? ''} ${card.tipText}`.toLowerCase();
      return searchTarget.includes(q);
    });
  }, [activeUnitCards, cardRoleFilter, cardSearch]);

  const selectedCard = useMemo(
    () =>
      activeUnitCards.find((c) => c.id === selectedCardId) ??
      filteredCards[0] ??
      activeUnitCards[0] ??
      null,
    [activeUnitCards, filteredCards, selectedCardId]
  );

  const selectedCardIdx = selectedCard
    ? activeUnitCards.findIndex((c) => c.id === selectedCard.id)
    : -1;

  const prevCard = selectedCardIdx > 0 ? activeUnitCards[selectedCardIdx - 1] : null;
  const nextCard =
    selectedCardIdx >= 0 && selectedCardIdx < activeUnitCards.length - 1
      ? activeUnitCards[selectedCardIdx + 1]
      : null;

  const isFilteringCards = cardSearch.trim().length > 0 || cardRoleFilter !== 'ALL';
  const isFilteringUnits =
    unitSearch.trim().length > 0 ||
    domainFilter !== 'ALL' ||
    gradeFilter !== 'ALL';

  return (
    <div className="w-full bg-slate-50">
      {/* Mobile / Tablet Pane Switcher */}
      <div className="lg:hidden sticky top-16 z-20 bg-white border-b border-slate-200 px-2 py-1.5 flex items-center gap-1">
        {(
          [
            { id: 'units', label: `1. 단원 (${filteredUnits.length})` },
            { id: 'items', label: `2. 항목 (${filteredCards.length})` },
            { id: 'preview', label: '3. 미리보기' },
          ] as { id: MobileAdminPane; label: string }[]
        ).map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setMobilePane(tab.id)}
            className={`flex-1 py-1.5 px-2 text-xs font-bold border transition-colors cursor-pointer whitespace-nowrap ${
              mobilePane === tab.id
                ? 'bg-violet-600 text-white border-violet-600'
                : 'bg-white text-slate-700 border-slate-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Full-Width 3-Column Admin Workspace */}
      <div className="w-full lg:grid lg:grid-cols-[310px_minmax(340px,1fr)_360px] xl:grid-cols-[330px_minmax(380px,1fr)_400px] lg:h-[calc(100vh-106px)] bg-white border-b border-slate-200">
        {/* [1단 좌측 패널] 전체 단원 및 카테고리 목록 + 빠른 검색 */}
        <aside
          className={`border-r border-slate-200 flex flex-col bg-white lg:h-full lg:overflow-hidden ${
            mobilePane === 'units' ? 'flex' : 'hidden lg:flex'
          }`}
        >
          <div className="p-3 border-b border-slate-200 space-y-2 shrink-0 bg-slate-50/70">
            <div className="flex items-center justify-between gap-1.5">
              <span className="text-xs font-bold text-slate-900">
                1단 · 전체 단원 ({filteredUnits.length}/{unitOrder.length})
              </span>
            </div>

            {/* Keyword Quick Search */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={unitSearch}
                onChange={(e) => setUnitSearch(e.target.value)}
                placeholder="단원명·학년·계통 빠른 검색..."
                className="w-full h-8 pl-8 pr-7 border border-slate-300 bg-white text-xs text-slate-900 focus:outline-none focus:border-violet-600"
              />
              {unitSearch && (
                <button
                  type="button"
                  aria-label="검색어 지우기"
                  onClick={() => setUnitSearch('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Grade Filter Pills */}
            <div className="flex items-center gap-1 flex-wrap">
              {(
                [
                  { id: 'ALL', label: '전체' },
                  { id: '1', label: '1학년' },
                  { id: '2', label: '2학년' },
                  { id: '3', label: '3학년' },
                  { id: '4', label: '4학년' },
                  { id: '5', label: '5학년' },
                  { id: '6', label: '6학년' },
                ] as { id: GradeSearchFilter; label: string }[]
              ).map((g) => (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => setGradeFilter(g.id)}
                  className={`px-1.5 py-0.5 text-[10.5px] font-bold border transition-colors cursor-pointer ${
                    gradeFilter === g.id
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-white text-slate-600 border-slate-300 hover:text-slate-900'
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>

            {/* Domain Category Pills */}
            <div className="flex items-center gap-1 flex-wrap">
              {(
                [
                  { id: 'ALL', label: '전체' },
                  { id: 'calc', label: '연산' },
                  { id: 'measure', label: '측정' },
                  { id: 'shape', label: '도형' },
                  { id: 'other', label: '기타' },
                ] as { id: DomainSearchFilter; label: string }[]
              ).map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setDomainFilter(cat.id)}
                  className={`px-2 py-0.5 text-[11px] font-bold border transition-colors cursor-pointer ${
                    domainFilter === cat.id
                      ? 'bg-violet-100 text-violet-700 border-violet-300'
                      : 'bg-white text-slate-600 border-slate-300 hover:text-slate-900'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Scrollable Unit List */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {filteredUnits.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-500">
                검색 조건에 맞는 단원이 없습니다.
              </div>
            ) : (
              filteredUnits.map((uid) => {
                const meta = UNIT_METADATA[uid];
                const domain = unitDomainMap[uid] ?? 'other';
                const isSelected = uid === activeUnit;
                const fullIdx = unitOrder.indexOf(uid);
                const unitCount = (decks[uid] ?? []).length;

                return (
                  <div
                    key={uid}
                    onClick={() => {
                      onSelectUnit(uid);
                      setMobilePane('items');
                    }}
                    className={`px-2.5 py-2 flex items-center gap-2 cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-violet-50 border-l-4 border-l-violet-600'
                        : 'bg-white hover:bg-slate-50 border-l-4 border-l-transparent'
                    }`}
                  >
                    {/* Order Move Buttons */}
                    <div
                      className="flex flex-col shrink-0"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        type="button"
                        disabled={isFilteringUnits || fullIdx <= 0}
                        onClick={() => onMoveUnitOrder(uid, 'up')}
                        title={
                          isFilteringUnits
                            ? '전체 보기 상태에서 순서 이동 가능'
                            : '단원 위로 이동'
                        }
                        aria-label={`${meta.shortLabel} 위로 이동`}
                        className="w-5 h-4 flex items-center justify-center text-slate-500 hover:text-slate-900 disabled:opacity-25 cursor-pointer disabled:cursor-default"
                      >
                        <ChevronUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        disabled={isFilteringUnits || fullIdx >= unitOrder.length - 1}
                        onClick={() => onMoveUnitOrder(uid, 'down')}
                        title={
                          isFilteringUnits
                            ? '전체 보기 상태에서 순서 이동 가능'
                            : '단원 아래로 이동'
                        }
                        aria-label={`${meta.shortLabel} 아래로 이동`}
                        className="w-5 h-4 flex items-center justify-center text-slate-500 hover:text-slate-900 disabled:opacity-25 cursor-pointer disabled:cursor-default"
                      >
                        <ChevronDown className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Unit Info */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono-num text-[10px] font-bold text-slate-400">
                          {String(fullIdx + 1).padStart(2, '0')}
                        </span>
                        <span
                          className={`text-xs font-bold truncate ${
                            isSelected ? 'text-violet-900' : 'text-slate-900'
                          }`}
                        >
                          {meta.shortLabel}
                        </span>
                      </div>
                      <div className="mt-0.5 flex items-center gap-1.5 text-[10.5px]">
                        <span className="px-1 bg-slate-100 text-slate-600 font-medium">
                          {DOMAIN_LABEL[domain]}
                        </span>
                        <span className="text-slate-500 font-mono-num">{unitCount}장</span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </aside>

        {/* [2단 중앙 패널] 선택된 단원의 항목 리스트 */}
        <section
          className={`border-r border-slate-200 flex flex-col bg-white lg:h-full lg:overflow-hidden ${
            mobilePane === 'items' ? 'flex' : 'hidden lg:flex'
          }`}
        >
          <div className="p-3 border-b border-slate-200 space-y-2 shrink-0 bg-slate-50/70">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h2 className="font-game text-base sm:text-lg text-slate-900 truncate">
                    2단 · {activeUnitMeta.shortLabel}
                  </h2>
                  <span className="font-mono-num text-xs font-bold text-violet-700">
                    ({activeUnitCards.length}장)
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 truncate">
                  {activeUnitMeta.fullLabel}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-1">
                {(
                  [
                    { id: 'ALL', label: '전체' },
                    { id: 'BASIC', label: '기본' },
                    { id: 'SKILL', label: '필살' },
                    { id: 'SPECIAL', label: '스페셜' },
                  ] as { id: CardRoleFilter; label: string }[]
                ).map((role) => (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => setCardRoleFilter(role.id)}
                    className={`px-2 py-0.5 text-[11px] font-bold border transition-colors cursor-pointer ${
                      cardRoleFilter === role.id
                        ? 'bg-violet-100 text-violet-700 border-violet-300'
                        : 'bg-white text-slate-600 border-slate-300 hover:text-slate-900'
                    }`}
                  >
                    {role.label}
                  </button>
                ))}
              </div>

              <div className="relative flex-1 min-w-[160px] max-w-[240px]">
                <Search className="w-3 h-3 text-slate-400 absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={cardSearch}
                  onChange={(e) => setCardSearch(e.target.value)}
                  placeholder="카드 제목·코드 검색"
                  className="w-full h-7 pl-7 pr-6 border border-slate-300 bg-white text-[11px] text-slate-900 focus:outline-none focus:border-violet-600"
                />
                {cardSearch && (
                  <button
                    type="button"
                    aria-label="카드 검색어 지우기"
                    onClick={() => setCardSearch('')}
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Scrollable Card Items List */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {filteredCards.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-500">
                조건에 해당하는 카드 항목이 없습니다.
              </div>
            ) : (
              filteredCards.map((card) => {
                const isSelected = selectedCard?.id === card.id;
                const fullIdx = activeUnitCards.findIndex((c) => c.id === card.id);

                return (
                  <div
                    key={card.id}
                    onClick={() => {
                      setSelectedCardId(card.id);
                      setMobilePane('preview');
                    }}
                    className={`px-3 py-2.5 flex items-center gap-2.5 cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-violet-50 border-l-4 border-l-violet-600'
                        : 'bg-white hover:bg-slate-50 border-l-4 border-l-transparent'
                    }`}
                  >
                    {/* ▲/▼ Card Reorder */}
                    <div
                      className="flex flex-col shrink-0"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        type="button"
                        disabled={isFilteringCards || fullIdx <= 0}
                        onClick={() => onMoveCardOrder(activeUnit, card.id, 'up')}
                        title={
                          isFilteringCards
                            ? '전체 보기 상태에서 순서 이동 가능'
                            : '위로 이동'
                        }
                        aria-label={`${card.cardCode} 위로 이동`}
                        className="w-5 h-4 flex items-center justify-center text-slate-500 hover:text-slate-900 disabled:opacity-25 cursor-pointer disabled:cursor-default"
                      >
                        <ChevronUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        disabled={
                          isFilteringCards || fullIdx >= activeUnitCards.length - 1
                        }
                        onClick={() => onMoveCardOrder(activeUnit, card.id, 'down')}
                        title={
                          isFilteringCards
                            ? '전체 보기 상태에서 순서 이동 가능'
                            : '아래로 이동'
                        }
                        aria-label={`${card.cardCode} 아래로 이동`}
                        className="w-5 h-4 flex items-center justify-center text-slate-500 hover:text-slate-900 disabled:opacity-25 cursor-pointer disabled:cursor-default"
                      >
                        <ChevronDown className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Card Details */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-mono-num text-[11px] font-bold text-slate-400">
                          {String(fullIdx + 1).padStart(2, '0')}
                        </span>
                        <span className="font-mono-num text-[10.5px] font-bold text-slate-500">
                          {card.cardCode}
                        </span>
                        <span className="px-1.5 py-0.2 bg-slate-100 border border-slate-300 text-[10px] font-bold text-slate-700">
                          {card.badgeLabel}
                        </span>
                        <span className="text-[10.5px] text-amber-600 font-mono-num">
                          {card.rarityLabel}
                        </span>
                      </div>
                      <div className="mt-0.5 text-xs sm:text-[13px] font-bold truncate text-slate-900">
                        <RichFractionText text={card.title} />
                      </div>
                      <p className="mt-0.5 text-[11px] text-slate-500 truncate">
                        <RichFractionText text={card.easyTipText || card.tipText} />
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>

        {/* [3단 우측 패널] 실시간 학생 화면 미리보기 */}
        <aside
          className={`flex flex-col bg-slate-50/70 lg:h-full lg:overflow-hidden ${
            mobilePane === 'preview' ? 'flex' : 'hidden lg:flex'
          }`}
        >
          <div className="p-3 border-b border-slate-200 bg-white flex items-center justify-between gap-2 shrink-0">
            <div>
              <h3 className="text-xs font-bold text-slate-900">
                3단 · 학생 화면 실시간 미리보기
              </h3>
              <p className="text-[11px] text-slate-500">
                {selectedCard
                  ? `${selectedCardIdx + 1} / ${activeUnitCards.length} · ${selectedCard.cardCode}`
                  : '항목을 선택하세요'}
              </p>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <div className="inline-flex border border-slate-300 bg-white text-[11px] font-bold">
                <button
                  type="button"
                  onClick={() => setPreviewWidth(240)}
                  className={`px-1.5 py-0.5 cursor-pointer ${
                    previewWidth === 240
                      ? 'bg-violet-100 text-violet-700'
                      : 'text-slate-600'
                  }`}
                >
                  작게
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewWidth(272)}
                  className={`px-1.5 py-0.5 border-l border-slate-300 cursor-pointer ${
                    previewWidth === 272
                      ? 'bg-violet-100 text-violet-700'
                      : 'text-slate-600'
                  }`}
                >
                  표준
                </button>
              </div>

              <button
                type="button"
                disabled={!prevCard}
                onClick={() => prevCard && setSelectedCardId(prevCard.id)}
                aria-label="이전 카드 미리보기"
                className="w-7 h-7 border border-slate-300 bg-white text-slate-700 inline-flex items-center justify-center disabled:opacity-35 cursor-pointer disabled:cursor-default"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                disabled={!nextCard}
                onClick={() => nextCard && setSelectedCardId(nextCard.id)}
                aria-label="다음 카드 미리보기"
                className="w-7 h-7 border border-slate-300 bg-white text-slate-700 inline-flex items-center justify-center disabled:opacity-35 cursor-pointer disabled:cursor-default"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 flex flex-col items-center gap-3">
            {selectedCard ? (
              <>
                <div className="py-1">
                  <ConceptPhotocard card={selectedCard} widthPx={previewWidth} />
                </div>

                <div className="w-full max-w-[320px] bg-white border border-slate-200 p-2.5 space-y-1 text-[11px]">
                  <div className="flex items-center justify-between text-slate-500">
                    <span className="font-bold text-slate-700">학습자 노출 요약</span>
                    <span className="font-mono-num">{selectedCard.cardCode}</span>
                  </div>
                  <div className="font-bold text-slate-900">
                    <RichFractionText text={selectedCard.title} />
                  </div>
                  <div className="text-slate-600 leading-relaxed">
                    <RichFractionText text={selectedCard.easyTipText || selectedCard.tipText} />
                  </div>
                </div>
              </>
            ) : (
              <div className="text-xs text-slate-500 py-12">
                미리볼 카드를 선택해 주세요.
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};
