import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  BookOpen,
  Check,
  Copy,
  FileDown,
  Image as ImageIcon,
  Layers,
  Loader2,
  RefreshCw,
  RotateCcw,
} from 'lucide-react';
import { ConceptCard, PrintInkMode, UnitId } from '../types/card';
import {
  BLOG_POST_BUNDLES,
  BlogChapterTemplate,
  BlogPostKind,
  generateBlogPostText,
} from '../data/blogTemplates';
import { ConceptPhotocard } from './ConceptPhotocard';
import { exportElementAsPng } from '../utils/exportStudio';

interface HeroCustomConfig {
  badge: string;
  title: string;
  subtitle: string;
  cardIds: string[];
}

function getDefaultHeroConfig(kind: BlogPostKind, chapterIdx: number): HeroCustomConfig {
  const bundle = BLOG_POST_BUNDLES[kind];
  if (kind === 'intro') {
    return {
      badge: bundle.heroBadge,
      title: '외우다 지치는 수학은 끝!\n졸라수학맨 개념 포카',
      subtitle: bundle.heroSubtitle,
      cardIds: ['gugu-01', 'frac-sp1', 'gugu-14'],
    };
  }
  const ch = bundle.chapters[chapterIdx] ?? bundle.chapters[0];
  return {
    badge: ch.heroBadge,
    title: ch.heroTitle,
    subtitle: ch.heroSubtitle,
    cardIds: [...ch.heroCardIds],
  };
}

interface BlogHeroBanner1x1Props {
  config: HeroCustomConfig;
  cards: ConceptCard[];
}

const BlogHeroBanner1x1: React.FC<BlogHeroBanner1x1Props> = ({
  config,
  cards,
}) => {
  const featuredCards = config.cardIds
    .slice(0, 3)
    .map((id) => cards.find((c) => c.id === id))
    .filter((c): c is ConceptCard => Boolean(c));

  const cardCount = featuredCards.length;

  return (
    <div
      style={{
        width: 640,
        height: 640,
        backgroundColor: '#F7F4EC',
        backgroundImage: [
          'radial-gradient(circle at 50% 42%, rgba(255, 254, 250, 0.65) 0%, rgba(235, 227, 209, 0.42) 100%)',
          'linear-gradient(to right, rgba(120, 113, 108, 0.085) 1px, transparent 1px)',
          'linear-gradient(to bottom, rgba(120, 113, 108, 0.085) 1px, transparent 1px)',
        ].join(', '),
        backgroundSize: '100% 100%, 24px 24px, 24px 24px',
      }}
      className="relative overflow-hidden px-7 py-6 flex flex-col justify-between box-border select-none"
    >
      {/* Top Brand Header Bar (Trademark Violet Square Badge + Violet Divider Line) */}
      <div className="relative z-10 pb-3 border-b-[3px] border-violet-600 flex items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2.5">
          <span className="font-game text-[28px] tracking-tight text-slate-900 leading-none">
            졸라수학맨
          </span>
          <img
            src="/assets/jollaman-logo.png"
            alt="졸라수학맨"
            className="h-9 w-auto object-contain"
          />
        </div>

        <span className="px-3 py-1 bg-violet-600 text-white text-[13px] font-bold border-2 border-slate-900 whitespace-nowrap leading-tight">
          {config.badge || '졸라수학맨 개념포카'}
        </span>
      </div>

      {/* High-Readability Headline & Subtitle (Preserving Jua & Gowun Dodum) */}
      <div className="relative z-10 pt-3.5 pb-1 space-y-1.5 shrink-0">
        <h2
          style={{ textWrap: 'balance' }}
          className="font-game text-[37px] leading-[1.18] text-slate-900 tracking-tight whitespace-pre-line break-keep"
        >
          {config.title}
        </h2>
        <p className="font-body text-[17px] font-bold text-slate-700 leading-snug break-keep">
          {config.subtitle}
        </p>
      </div>

      {/* Open Center Card Showcase directly over warm graph paper (Larger Photocards) */}
      <div className="relative z-10 flex-1 my-1 flex items-center justify-center overflow-visible">
        {cardCount === 0 && (
          <span className="font-body text-sm font-bold text-slate-400">
            오른쪽에서 대표이미지에 넣을 카드를 선택하세요
          </span>
        )}

        {cardCount === 1 && featuredCards[0] && (
          <div
            style={{
              boxShadow:
                '0 16px 32px -8px rgba(15, 23, 42, 0.24), 0 4px 12px -2px rgba(15, 23, 42, 0.12)',
            }}
          >
            <ConceptPhotocard
              card={featuredCards[0]}
              widthPx={206}
            />
          </div>
        )}

        {cardCount === 2 && (
          <div className="flex items-center justify-center gap-7">
            <div
              style={{
                transform: 'rotate(-4deg)',
                boxShadow:
                  '0 14px 28px -8px rgba(15, 23, 42, 0.22), 0 4px 10px -2px rgba(15, 23, 42, 0.1)',
              }}
            >
              <ConceptPhotocard
                card={featuredCards[0]}
                widthPx={182}
              />
            </div>
            <div
              style={{
                transform: 'rotate(4deg)',
                boxShadow:
                  '0 14px 28px -8px rgba(15, 23, 42, 0.22), 0 4px 10px -2px rgba(15, 23, 42, 0.1)',
              }}
            >
              <ConceptPhotocard
                card={featuredCards[1]}
                widthPx={182}
              />
            </div>
          </div>
        )}

        {cardCount >= 3 && (
          <div className="relative w-full h-full flex items-center justify-center">
            <div
              style={{
                transform: 'rotate(-6deg) translate(-162px, 10px)',
                boxShadow:
                  '0 14px 26px -8px rgba(15, 23, 42, 0.22), 0 4px 10px -2px rgba(15, 23, 42, 0.1)',
              }}
              className="absolute"
            >
              <ConceptPhotocard
                card={featuredCards[0]}
                widthPx={166}
              />
            </div>
            <div
              style={{
                transform: 'rotate(6deg) translate(162px, 10px)',
                boxShadow:
                  '0 14px 26px -8px rgba(15, 23, 42, 0.22), 0 4px 10px -2px rgba(15, 23, 42, 0.1)',
              }}
              className="absolute"
            >
              <ConceptPhotocard
                card={featuredCards[2]}
                widthPx={166}
              />
            </div>
            <div
              style={{
                transform: 'translate(0px, -4px)',
                boxShadow:
                  '0 18px 34px -8px rgba(15, 23, 42, 0.28), 0 6px 14px -3px rgba(15, 23, 42, 0.14)',
              }}
              className="relative z-10"
            >
              <ConceptPhotocard
                card={featuredCards[1]}
                widthPx={180}
              />
            </div>
          </div>
        )}
      </div>

      {/* Bottom 2-Badge Strip (해볼쌤 omitted) */}
      <div className="relative z-10 pt-2 flex items-center justify-center gap-3 shrink-0">
        <span
          style={{ boxShadow: '0 3px 0 rgba(15, 23, 42, 0.2)' }}
          className="px-4 py-1.5 bg-slate-900 text-white text-[13.5px] font-bold rounded-lg whitespace-nowrap"
        >
          무료 PDF 학습지 공유
        </span>
        <div className="relative inline-flex items-center">
          <span
            style={{ boxShadow: '2px 3px 0 #0F172A' }}
            className="px-4 py-1.5 bg-[#FFE67C] text-slate-900 text-[14.5px] font-game border-2 border-slate-900 rounded-md whitespace-nowrap leading-none"
          >
            잉크절약 미니북
          </span>
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            aria-hidden="true"
            className="absolute -top-2.5 -right-3 pointer-events-none"
          >
            <path
              d="M3 11L7 4M7.5 13L14.5 9.5M8 15.5L13.5 15"
              stroke="#EA580C"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

interface ResponsiveSquarePreviewProps {
  children: React.ReactNode;
}

const ResponsiveSquarePreview: React.FC<ResponsiveSquarePreviewProps> = ({
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sizePx, setSizePx] = useState<number>(360);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => {
      const w = el.clientWidth;
      if (w > 0) setSizePx(Math.min(w, 420));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const scale = sizePx / 640;

  return (
    <div ref={containerRef} className="w-full flex justify-center">
      <div
        style={{ width: sizePx, height: sizePx }}
        className="relative overflow-hidden bg-[#F7F4EC] shadow-md shrink-0"
      >
        <div
          style={{
            width: 640,
            height: 640,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

const BLOG_HERO_CONFIGS_STORAGE_KEY = 'jollaman-blog-hero-configs-v1';
const BLOG_STUDIO_UI_STORAGE_KEY = 'jollaman-blog-studio-ui-v1';
const BLOG_CUSTOM_DRAFTS_STORAGE_KEY = 'jollaman-blog-custom-drafts-v1';

function buildDefaultHeroConfigs(): Record<string, HeroCustomConfig> {
  return {
    'intro-0': getDefaultHeroConfig('intro', 0),
    '2-2-2-0': getDefaultHeroConfig('2-2-2', 0),
    '2-2-2-1': getDefaultHeroConfig('2-2-2', 1),
    '2-2-2-2': getDefaultHeroConfig('2-2-2', 2),
    '2-2-2-3': getDefaultHeroConfig('2-2-2', 3),
    '3-2-2-0': getDefaultHeroConfig('3-2-2', 0),
    '3-2-2-1': getDefaultHeroConfig('3-2-2', 1),
    '3-2-2-2': getDefaultHeroConfig('3-2-2', 2),
    '3-2-2-3': getDefaultHeroConfig('3-2-2', 3),
    '3-2-3-0': getDefaultHeroConfig('3-2-3', 0),
    '3-2-3-1': getDefaultHeroConfig('3-2-3', 1),
    '3-2-3-2': getDefaultHeroConfig('3-2-3', 2),
    '3-2-3-3': getDefaultHeroConfig('3-2-3', 3),
    '3-2-4-0': getDefaultHeroConfig('3-2-4', 0),
    '3-2-4-1': getDefaultHeroConfig('3-2-4', 1),
    '3-2-4-2': getDefaultHeroConfig('3-2-4', 2),
    '3-2-4-3': getDefaultHeroConfig('3-2-4', 3),
    '3-2-4-4': getDefaultHeroConfig('3-2-4', 4),
    '3-2-4-5': getDefaultHeroConfig('3-2-4', 5),
    '3-2-5-0': getDefaultHeroConfig('3-2-5', 0),
    '3-2-5-1': getDefaultHeroConfig('3-2-5', 1),
    '3-2-5-2': getDefaultHeroConfig('3-2-5', 2),
    '3-2-5-3': getDefaultHeroConfig('3-2-5', 3),
    '6-2-4-0': getDefaultHeroConfig('6-2-4', 0),
    '6-2-4-1': getDefaultHeroConfig('6-2-4', 1),
    '6-2-4-2': getDefaultHeroConfig('6-2-4', 2),
    '6-2-4-3': getDefaultHeroConfig('6-2-4', 3),
  };
}

interface BlogStudioViewProps {
  decks: Record<UnitId, ConceptCard[]>;
  activeUnit: UnitId;
  onOpenFullPrint: (unit: UnitId) => void;
}

export const BlogStudioView: React.FC<BlogStudioViewProps> = ({
  decks,
  activeUnit,
  onOpenFullPrint,
}) => {
  const [postKind, setPostKind] = useState<BlogPostKind>(() => {
    try {
      const saved = localStorage.getItem(BLOG_STUDIO_UI_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as { postKind?: string };
        if (parsed.postKind && parsed.postKind in BLOG_POST_BUNDLES) {
          return parsed.postKind as BlogPostKind;
        }
      }
    } catch {
      // Fallback
    }
    return activeUnit in BLOG_POST_BUNDLES ? (activeUnit as BlogPostKind) : '2-2-2';
  });
  const [selectedHeroIdx, setSelectedHeroIdx] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(BLOG_STUDIO_UI_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as { selectedHeroIdx?: unknown };
        if (
          typeof parsed.selectedHeroIdx === 'number' &&
          Number.isInteger(parsed.selectedHeroIdx) &&
          parsed.selectedHeroIdx >= 0
        ) {
          return parsed.selectedHeroIdx;
        }
      }
    } catch {
      // Fallback
    }
    return 0;
  });
  const [cardInkMode, setCardInkMode] = useState<PrintInkMode>(() => {
    try {
      const saved = localStorage.getItem(BLOG_STUDIO_UI_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as { cardInkMode?: string };
        if (
          parsed.cardInkMode === 'full' ||
          parsed.cardInkMode === 'ink_saver' ||
          parsed.cardInkMode === 'bw_worksheet'
        ) {
          return parsed.cardInkMode;
        }
      }
    } catch {
      // Fallback
    }
    return 'full';
  });

  const allCards = useMemo(
    () => [
      ...decks['1-2-6'],
      ...decks['2-2-2'],
      ...decks['3-2-2'],
      ...decks['3-2-3'],
      ...decks['3-2-4'],
      ...decks['3-2-5'],
      ...decks['4-2-1'],
      ...decks['5-2-2'],
      ...decks['6-2-1'],
      ...decks['6-2-4'],
    ],
    [decks]
  );

  const bundle = BLOG_POST_BUNDLES[postKind];

  // Customizable 1:1 Hero Banner configs per (postKind, chapterIndex) — persisted across tab/view navigation
  const [heroConfigs, setHeroConfigs] = useState<Record<string, HeroCustomConfig>>(
    () => {
      const defaults = buildDefaultHeroConfigs();
      try {
        const saved = localStorage.getItem(BLOG_HERO_CONFIGS_STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved) as Record<string, Partial<HeroCustomConfig>>;
          if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
            for (const [key, val] of Object.entries(parsed)) {
              if (!val || typeof val !== 'object') continue;
              const base = defaults[key];
              defaults[key] = {
                badge: typeof val.badge === 'string' ? val.badge : base?.badge ?? '',
                title: typeof val.title === 'string' ? val.title : base?.title ?? '',
                subtitle:
                  typeof val.subtitle === 'string' ? val.subtitle : base?.subtitle ?? '',
                cardIds: Array.isArray(val.cardIds)
                  ? val.cardIds.filter((id): id is string => typeof id === 'string')
                  : base?.cardIds ?? [],
              };
            }
          }
        }
      } catch {
        // Fallback to defaults
      }
      return defaults;
    }
  );

  useEffect(() => {
    try {
      localStorage.setItem(
        BLOG_STUDIO_UI_STORAGE_KEY,
        JSON.stringify({ postKind, selectedHeroIdx, cardInkMode })
      );
    } catch {
      // Ignore storage error
    }
  }, [postKind, selectedHeroIdx, cardInkMode]);

  useEffect(() => {
    try {
      localStorage.setItem(
        BLOG_HERO_CONFIGS_STORAGE_KEY,
        JSON.stringify(heroConfigs)
      );
    } catch {
      // Ignore storage error
    }
  }, [heroConfigs]);

  const activeHeroIdx =
    postKind === 'intro'
      ? 0
      : Math.min(selectedHeroIdx, Math.max(0, bundle.chapters.length - 1));
  const activeHeroKey = `${postKind}-${activeHeroIdx}`;
  const activeHeroConfig =
    heroConfigs[activeHeroKey] ?? getDefaultHeroConfig(postKind, activeHeroIdx);

  const updateActiveHeroConfig = (patch: Partial<HeroCustomConfig>) => {
    setHeroConfigs((prev) => ({
      ...prev,
      [activeHeroKey]: {
        ...(prev[activeHeroKey] ?? getDefaultHeroConfig(postKind, activeHeroIdx)),
        ...patch,
      },
    }));
  };

  const toggleHeroCardId = (cardId: string) => {
    const current = activeHeroConfig.cardIds;
    if (current.includes(cardId)) {
      updateActiveHeroConfig({
        cardIds: current.filter((id) => id !== cardId),
      });
    } else if (current.length < 3) {
      updateActiveHeroConfig({ cardIds: [...current, cardId] });
    } else {
      // Replace the oldest selection so user stays cleanly within max 3 cards
      updateActiveHeroConfig({ cardIds: [...current.slice(1), cardId] });
    }
  };

  const resetActiveHeroConfig = () => {
    setHeroConfigs((prev) => ({
      ...prev,
      [activeHeroKey]: getDefaultHeroConfig(postKind, activeHeroIdx),
    }));
  };

  const generatedDraft = useMemo(
    () =>
      generateBlogPostText(
        bundle,
        allCards,
        true,
        postKind === '3-2-4' ? activeHeroIdx : 0
      ),
    [bundle, allCards, postKind, activeHeroIdx]
  );

  const [customDrafts, setCustomDrafts] = useState<
    Record<string, { title?: string; body?: string }>
  >(() => {
    try {
      const saved = localStorage.getItem(BLOG_CUSTOM_DRAFTS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Record<
          string,
          { title?: string; body?: string }
        >;
        if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch {
      // Fallback
    }
    return {};
  });

  useEffect(() => {
    try {
      localStorage.setItem(
        BLOG_CUSTOM_DRAFTS_STORAGE_KEY,
        JSON.stringify(customDrafts)
      );
    } catch {
      // Ignore storage error
    }
  }, [customDrafts]);

  const savedDraft = customDrafts[activeHeroKey];
  const blogTitle = savedDraft?.title ?? generatedDraft.title;
  const blogBody = savedDraft?.body ?? generatedDraft.body;
  const [copiedTarget, setCopiedTarget] = useState<string>('');
  const [busyLabel, setBusyLabel] = useState<string>('');

  const handleBlogTitleChange = (nextTitle: string) => {
    setCustomDrafts((prev) => ({
      ...prev,
      [activeHeroKey]: {
        ...(prev[activeHeroKey] ?? {}),
        title: nextTitle,
      },
    }));
  };

  const handleBlogBodyChange = (nextBody: string) => {
    setCustomDrafts((prev) => ({
      ...prev,
      [activeHeroKey]: {
        ...(prev[activeHeroKey] ?? {}),
        body: nextBody,
      },
    }));
  };

  const handleResetBlogDraft = () => {
    setCustomDrafts((prev) => {
      if (!(activeHeroKey in prev)) return prev;
      const next = { ...prev };
      delete next[activeHeroKey];
      return next;
    });
  };

  // Off-screen Hero 1:1 PNG staging (supports saving active chapter OR batch-saving all 4 chapters)
  const [heroCaptureJob, setHeroCaptureJob] = useState<HeroCustomConfig | null>(
    null
  );
  const heroCaptureRef = useRef<HTMLDivElement>(null);
  const resolveHeroCaptureRef = useRef<
    ((el: HTMLDivElement | null) => void) | null
  >(null);

  useEffect(() => {
    if (heroCaptureJob && resolveHeroCaptureRef.current) {
      const resolveFn = resolveHeroCaptureRef.current;
      resolveHeroCaptureRef.current = null;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTimeout(() => {
            resolveFn(heroCaptureRef.current);
          }, 50);
        });
      });
    }
  }, [heroCaptureJob]);

  // Off-screen high-res single card capture state
  const [cardCaptureJob, setCardCaptureJob] = useState<ConceptCard | null>(null);
  const cardCaptureRef = useRef<HTMLDivElement>(null);
  const resolveCardCaptureRef = useRef<
    ((el: HTMLDivElement | null) => void) | null
  >(null);

  useEffect(() => {
    if (cardCaptureJob && resolveCardCaptureRef.current) {
      const resolveFn = resolveCardCaptureRef.current;
      resolveCardCaptureRef.current = null;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTimeout(() => {
            resolveFn(cardCaptureRef.current);
          }, 40);
        });
      });
    }
  }, [cardCaptureJob]);

  const copyText = async (key: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.left = '-9999px';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    setCopiedTarget(key);
    setTimeout(() => {
      setCopiedTarget((prev) => (prev === key ? '' : prev));
    }, 1800);
  };

  const renderHeroForCapture = (cfg: HeroCustomConfig) =>
    new Promise<HTMLDivElement | null>((resolve) => {
      resolveHeroCaptureRef.current = resolve;
      setHeroCaptureJob(cfg);
    });

  const getUnitSlugLabel = (kind: BlogPostKind) =>
    kind === '2-2-2'
      ? '2-2곱셈구구'
      : kind === '3-2-2'
      ? '3-2나눗셈'
      : kind === '3-2-3'
      ? '3-2원'
      : kind === '3-2-5'
      ? '3-2들이와무게'
      : kind === '6-2-4'
      ? '6-2비례식과비례배분'
      : '3-2분수';

  const handleDownloadActiveHeroPng = async () => {
    if (busyLabel) return;
    setBusyLabel('1:1 대표이미지 PNG 저장 중...');
    try {
      const el = await renderHeroForCapture(activeHeroConfig);
      if (el) {
        const filename =
          postKind === 'intro'
            ? '졸라수학맨_소개글_대표이미지_1x1.png'
            : `졸라수학맨_${getUnitSlugLabel(postKind)}_${activeHeroIdx + 1}편_대표이미지_1x1.png`;
        await exportElementAsPng(el, filename, 3);
      }
    } finally {
      setHeroCaptureJob(null);
      setBusyLabel('');
    }
  };

  const handleDownloadAll4HeroesPng = async () => {
    if (busyLabel || postKind === 'intro') return;
    const unitLabel = getUnitSlugLabel(postKind);
    const totalCount = bundle.chapters.length;
    try {
      for (let i = 0; i < totalCount; i += 1) {
        setBusyLabel(`대표이미지 저장 중 (${i + 1}/${totalCount})...`);
        const cfg =
          heroConfigs[`${postKind}-${i}`] ?? getDefaultHeroConfig(postKind, i);
        const el = await renderHeroForCapture(cfg);
        if (el) {
          await exportElementAsPng(
            el,
            `졸라수학맨_${unitLabel}_${i + 1}편_대표이미지_1x1.png`,
            3
          );
        }
      }
    } finally {
      setHeroCaptureJob(null);
      setBusyLabel('');
    }
  };

  const handleDownloadCardPreviewPng = async (card: ConceptCard) => {
    if (busyLabel) return;
    setBusyLabel(`${card.cardCode} PNG 저장 중...`);
    try {
      const targetEl = await new Promise<HTMLDivElement | null>((resolve) => {
        resolveCardCaptureRef.current = resolve;
        setCardCaptureJob(card);
      });
      if (targetEl) {
        const inkSuffix =
          cardInkMode === 'full'
            ? '풀컬러'
            : cardInkMode === 'ink_saver'
            ? '잉크절약'
            : '흑백';
        await exportElementAsPng(
          targetEl,
          `${card.cardCode}_${card.badgeLabel}_블로그미리보기_${inkSuffix}.png`,
          3
        );
      }
    } finally {
      setCardCaptureJob(null);
      setBusyLabel('');
    }
  };

  const formatChapterClipboard = (ch: BlogChapterTemplate) => {
    const chCards = ch.cardIds
      .map((id) => allCards.find((c) => c.id === id))
      .filter((c): c is ConceptCard => Boolean(c));

    if (postKind === '3-2-4') {
      const perCardBlocks = chCards
        .map((c, idx) => {
          const rec = ch.cardRecords?.[c.id];
          const cleanTitle = c.title.replace(/\[\[(\d+)\/(\d+)\]\]/g, '$2분의 $1');
          const rawTip = c.easyTipText ? c.easyTipText : c.tipText;
          const cleanTip = rawTip
            .replace(/\[\[(\d+)\|(\d+)\/(\d+)\]\]/g, '$1과 $3분의 $2')
            .replace(/\[\[(\d+)\/(\d+)\]\]/g, '$2분의 $1')
            .replace(/\{\{(.*?)\}\}/g, '$1')
            .replace(/\n+/g, ' ');
          return [
            `[${idx + 1}번째 포카 사진 — ${c.cardCode.slice(-2)}번 · ${cleanTitle}]`,
            `- 개념 설명: ${rec?.concept ?? cleanTip}`,
            `- 학생의 어려움: ${rec?.difficulty ?? ch.difficultyText}`,
            `- 이렇게 물어봤어요: ${rec?.question ?? ch.tipText}`,
          ].join('\n');
        })
        .join('\n\n');

      return [
        `🌙 ${ch.lessonSubheadings?.records ?? ch.title}`,
        perCardBlocks,
      ].join('\n');
    }

    const cardLines = chCards
      .map((c) => {
        const cleanTitle = c.title.replace(/\[\[(\d+)\/(\d+)\]\]/g, '$2분의 $1');
        const rawTip = c.easyTipText ? c.easyTipText : c.tipText;
        const cleanTip = rawTip
          .replace(/\[\[(\d+)\|(\d+)\/(\d+)\]\]/g, '$1과 $3분의 $2')
          .replace(/\[\[(\d+)\/(\d+)\]\]/g, '$2분의 $1')
          .replace(/\{\{(.*?)\}\}/g, '$1')
          .replace(/\n+/g, ' ');
        return `  • [${c.cardCode.slice(-2)}번 · ${c.badgeLabel}] ${cleanTitle}\n    → 핵심 한 줄: ${cleanTip}`;
      })
      .join('\n');

    return [
      `📌 ${ch.title}`,
      '',
      cardLines,
      '',
      `😓 ${ch.difficultyTitle}`,
      ch.difficultyText,
      '',
      `💡 ${ch.tipTitle}`,
      ch.tipText,
    ].join('\n');
  };

  const selectableDeckCards =
    postKind === 'intro' ? allCards : decks[postKind as UnitId];
  const targetUnitForPrint: UnitId =
    postKind === 'intro' ? activeUnit : (postKind as UnitId);

  return (
    <div className="space-y-6">
      {/* Top Post Selector + Status */}
      <div className="bg-white border-2 border-slate-900 p-4 sm:p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-game text-xl text-slate-900 tracking-tight">
              네이버 블로그 홍보 스튜디오
            </h2>
            <p className="text-xs font-body text-slate-600 mt-0.5">
              1:1 대표이미지(흰색·검정·보라 강조)와 챕터별 글 · 카드 미리보기
              PNG를 커스텀해 바로 저장·복사하세요.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {busyLabel && (
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-violet-700 px-2.5 py-1 bg-violet-50 border border-violet-300">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                {busyLabel}
              </span>
            )}
            <button
              type="button"
              onClick={() => onOpenFullPrint(targetUnitForPrint)}
              className="px-3.5 py-2 border-2 border-slate-900 bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold inline-flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>무료 PDF 받기 (인쇄·학습지 이동)</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 border-2 border-slate-900 bg-white">
          {(
            [
              { id: 'intro', label: '소개글 (대표 1장)' },
              { id: '2-2-2', label: '2-2 곱셈구구 (4챕터)' },
              { id: '3-2-2', label: '3-2 나눗셈 (4챕터)' },
              { id: '3-2-3', label: '3-2 원 (4챕터)' },
              { id: '3-2-4', label: '3-2 분수 (6챕터)' },
              { id: '3-2-5', label: '3-2 들이·무게 (4챕터)' },
              { id: '6-2-4', label: '6-2 비례·배분 (4챕터)' },
            ] as { id: BlogPostKind; label: string }[]
          ).map((tab, idx) => {
            const active = postKind === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setPostKind(tab.id);
                  setSelectedHeroIdx(0);
                }}
                className={`px-2 py-2.5 text-xs font-bold transition-colors whitespace-nowrap cursor-pointer border-slate-900 ${
                  idx > 0 ? 'border-t' : ''
                } ${idx < 2 ? 'sm:border-t-0' : 'sm:border-t'} ${
                  idx % 2 === 1 ? 'sm:border-l' : 'sm:border-l-0'
                } ${idx > 0 ? 'lg:border-t-0 lg:border-l' : 'lg:border-l-0'} ${
                  active
                    ? 'bg-slate-900 text-white'
                    : 'bg-white text-slate-800 hover:bg-slate-50'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 1. 1:1 Naver Blog Representative Image Studio (White/Black/Violet + 4 Chapters + Customizer) */}
      <section className="bg-white border-2 border-slate-900 p-4 sm:p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="font-game text-lg text-slate-900">
              1. 네이버 블로그 1:1 대표이미지 ({postKind === 'intro' ? '1장' : `챕터별 ${bundle.chapters.length}장`})
            </h3>
            <p className="text-xs font-body text-slate-600">
              따뜻한 모눈종이 감성(미색·검정·보라 강조)의 1920×1920 정사각형 PNG!
              문구와 노출 카드를 자유롭게 바꿀 수 있습니다.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              disabled={Boolean(busyLabel)}
              onClick={handleDownloadActiveHeroPng}
              className="px-3.5 py-2 border-2 border-slate-900 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold inline-flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-50"
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>
                {postKind === 'intro'
                  ? '대표이미지 1:1 PNG 저장'
                  : `${activeHeroIdx + 1}편 대표이미지 PNG 저장`}
              </span>
            </button>

            {postKind !== 'intro' && (
              <button
                type="button"
                disabled={Boolean(busyLabel)}
                onClick={handleDownloadAll4HeroesPng}
                className="px-3.5 py-2 border-2 border-slate-900 bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold inline-flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-50"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>{bundle.chapters.length}장 모두 PNG 저장</span>
              </button>
            )}
          </div>
        </div>

        {/* Chapter Hero Image Selector Strip for Units */}
        {postKind !== 'intro' && (
          <div
            className={`grid grid-cols-2 ${
              bundle.chapters.length === 6
                ? 'sm:grid-cols-3 lg:grid-cols-6'
                : 'sm:grid-cols-4'
            } border-2 border-slate-900 bg-slate-900 gap-[1px]`}
          >
            {bundle.chapters.map((ch, idx) => {
              const active = activeHeroIdx === idx;
              const cfg = heroConfigs[`${postKind}-${idx}`] ?? getDefaultHeroConfig(postKind, idx);
              return (
                <button
                  key={ch.chapterNumber}
                  type="button"
                  onClick={() => setSelectedHeroIdx(idx)}
                  className={`p-2.5 text-left transition-colors cursor-pointer ${
                    active
                      ? 'bg-violet-600 text-white'
                      : 'bg-white text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <div className="text-[11px] font-bold opacity-90 whitespace-nowrap">
                    {idx + 1}편 대표이미지 (CH {ch.chapterNumber})
                  </div>
                  <div className="text-xs font-bold truncate mt-0.5">
                    {cfg.title.replace(/\n/g, ' ')}
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* 2-Column 1:1 Live Preview + Customizer */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,420px)_1fr] gap-5 items-start">
          {/* Left: Scaled 1:1 Preview */}
          <div className="bg-slate-100 border border-slate-300 p-3 flex flex-col items-center gap-2">
            <ResponsiveSquarePreview>
              <BlogHeroBanner1x1
                config={activeHeroConfig}
                cards={allCards}
              />
            </ResponsiveSquarePreview>
            <span className="text-[11px] font-body text-slate-500">
              1:1 정사각형 미리보기 (저장 시 1920×1920px PNG)
            </span>
          </div>

          {/* Right: Live Text & Card Picker Customizer */}
          <div className="bg-slate-50 border-2 border-slate-900 p-4 space-y-3.5">
            <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-200">
              <span className="text-xs font-bold text-slate-900">
                {postKind === 'intro'
                  ? '소개글 대표이미지 커스텀'
                  : `${activeHeroIdx + 1}편 대표이미지 문구 · 카드 커스텀`}
              </span>
              <button
                type="button"
                onClick={resetActiveHeroConfig}
                className="px-2.5 py-1 border border-slate-900 bg-white hover:bg-slate-100 text-[11px] font-bold text-slate-800 inline-flex items-center gap-1 whitespace-nowrap cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>자동추천 복원</span>
              </button>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="block text-[11px] font-bold text-slate-700">
                  우측 상단 보라 배지
                </label>
                <input
                  type="text"
                  value={activeHeroConfig.badge}
                  onChange={(e) => updateActiveHeroConfig({ badge: e.target.value })}
                  className="w-full h-10 px-3 py-2 border border-slate-900 bg-white text-xs font-bold text-slate-900 focus:outline-none focus:border-violet-600"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[11px] font-bold text-slate-700">
                  부제목
                </label>
                <textarea
                  rows={2}
                  value={activeHeroConfig.subtitle}
                  onChange={(e) =>
                    updateActiveHeroConfig({ subtitle: e.target.value })
                  }
                  className="w-full min-h-[72px] px-3 py-2.5 border border-slate-900 bg-white text-xs sm:text-sm font-body leading-relaxed text-slate-900 focus:outline-none focus:border-violet-600 resize-y"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[11px] font-bold text-slate-700">
                  메인 제목 (엔터로 줄바꿈 가능)
                </label>
                <textarea
                  rows={4}
                  value={activeHeroConfig.title}
                  onChange={(e) => updateActiveHeroConfig({ title: e.target.value })}
                  className="w-full min-h-[116px] px-3 py-2.5 border border-slate-900 bg-white text-sm sm:text-[15px] font-bold leading-relaxed text-slate-900 focus:outline-none focus:border-violet-600 resize-y"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-bold text-slate-700">
                  대표이미지 카드 선택 (1~3장 선택됨: {activeHeroConfig.cardIds.length}/3)
                </span>
                <span className="text-slate-500">클릭해서 추가/해제</span>
              </div>

              <div className="max-h-[168px] overflow-y-auto border border-slate-300 bg-white p-2 flex flex-wrap gap-1.5">
                {selectableDeckCards.map((c) => {
                  const orderIdx = activeHeroConfig.cardIds.indexOf(c.id);
                  const selected = orderIdx >= 0;
                  const cleanTitle = c.title.replace(
                    /\[\[(\d+)\/(\d+)\]\]/g,
                    '$2분의 $1'
                  );
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => toggleHeroCardId(c.id)}
                      className={`px-2 py-1 text-[11px] font-bold border inline-flex items-center gap-1 transition-colors whitespace-nowrap cursor-pointer ${
                        selected
                          ? 'bg-violet-600 text-white border-slate-900'
                          : 'bg-white text-slate-700 border-slate-300 hover:border-slate-900'
                      }`}
                    >
                      {selected && (
                        <span className="px-1 bg-slate-900 text-white text-[10px]">
                          {orderIdx + 1}
                        </span>
                      )}
                      <span>
                        {c.cardCode.slice(-2)}·{c.badgeLabel} {cleanTitle}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Copy-Paste Blog Title & Full Body Editor */}
      <section className="bg-white border-2 border-slate-900 p-4 sm:p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="font-game text-lg text-slate-900">
              2. 복사용 블로그 글 (제목 + 본문)
              {postKind === '3-2-4' ? ` — ${activeHeroIdx + 1}편` : ''}
            </h3>
            <p className="text-xs font-body text-slate-600">
              {postKind === '3-2-4'
                ? `분수 단원은 1편~${bundle.chapters.length}편 개별 수업 기록 포스팅 원고가 준비되어 있습니다. 편을 골라 복사해 사용하세요.`
                : '전체 원고 또는 아래 챕터별 원고 버튼으로 바로 복사해 네이버 블로그에 붙여넣으세요.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">

            <button
              type="button"
              onClick={handleResetBlogDraft}
              className="px-3 py-1.5 border border-slate-900 bg-white hover:bg-slate-50 text-xs font-bold text-slate-900 inline-flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>원고 새로고침</span>
            </button>
          </div>
        </div>

        {/* 6-Post Selector Strip for 3-2-4 분수 */}
        {postKind === '3-2-4' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 border-2 border-slate-900 bg-slate-900 gap-[1px]">
            {bundle.chapters.map((ch, idx) => {
              const active = activeHeroIdx === idx;
              return (
                <button
                  key={ch.chapterNumber}
                  type="button"
                  onClick={() => setSelectedHeroIdx(idx)}
                  className={`p-2.5 text-left transition-colors cursor-pointer ${
                    active
                      ? 'bg-slate-900 text-white'
                      : 'bg-white text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <div className="text-[11px] font-bold opacity-85 whitespace-nowrap">
                    {idx + 1}편 블로그 글 (CH {ch.chapterNumber})
                  </div>
                  <div className="text-xs font-bold truncate mt-0.5">
                    {ch.title.replace(/^\d+편\.\s*|^CHAPTER \d+\.\s*/, '')}
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Title Row */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between gap-2">
            <label
              htmlFor="blog-title-input"
              className="text-xs font-bold text-slate-700"
            >
              블로그 제목
            </label>
            <button
              type="button"
              onClick={() => copyText('title', blogTitle)}
              className="px-3 py-1 border border-slate-900 bg-white hover:bg-slate-50 text-xs font-bold text-slate-900 inline-flex items-center gap-1 whitespace-nowrap cursor-pointer"
            >
              {copiedTarget === 'title' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">제목 복사됨</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>제목 복사</span>
                </>
              )}
            </button>
          </div>
          <textarea
            id="blog-title-input"
            rows={2}
            value={blogTitle}
            onChange={(e) => handleBlogTitleChange(e.target.value)}
            className="w-full min-h-[64px] px-3.5 py-2.5 border-2 border-slate-900 bg-white text-sm font-bold leading-relaxed text-slate-900 focus:outline-none focus:border-violet-600 resize-y"
          />
        </div>

        {/* Full Body Textarea */}
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <label
              htmlFor="blog-body-textarea"
              className="text-xs font-bold text-slate-700"
            >
              블로그 본문 (챕터별 구성 + 어려움 + 지도팁 + 무료 PDF 공유 안내)
            </label>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => copyText('body', blogBody)}
                className="px-3 py-1 border border-slate-900 bg-white hover:bg-slate-50 text-xs font-bold text-slate-900 inline-flex items-center gap-1 whitespace-nowrap cursor-pointer"
              >
                {copiedTarget === 'body' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">본문 복사됨</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>본문 전체 복사</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => copyText('all', `${blogTitle}\n\n${blogBody}`)}
                className="px-3 py-1 border border-slate-900 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold inline-flex items-center gap-1 whitespace-nowrap cursor-pointer"
              >
                {copiedTarget === 'all' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-300" />
                    <span>전체 복사 완료!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>제목+본문 한번에 복사</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <textarea
            id="blog-body-textarea"
            rows={14}
            value={blogBody}
            onChange={(e) => handleBlogBodyChange(e.target.value)}
            className="w-full p-3.5 border-2 border-slate-900 bg-white text-xs sm:text-sm font-body leading-relaxed text-slate-900 focus:outline-none focus:border-violet-600"
          />
        </div>
      </section>

      {/* 3. Chapter-by-Chapter Preview PNGs + Difficulty & Coaching Tips */}
      <section className="space-y-4">
        <div className="bg-white border-2 border-slate-900 p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="font-game text-lg text-slate-900">
              3. 챕터별 개념포카 미리보기 PNG &amp; 지도 가이드 ({bundle.chapters.length}챕터)
            </h3>
            <p className="text-xs font-body text-slate-600">
              {bundle.chapters.length}편으로 나누어 포스팅할 때 각 편에 맞는 챕터 글과 카드 PNG를 바로
              저장·복사하세요.
            </p>
          </div>

          <div className="inline-grid grid-cols-3 border-2 border-slate-900 bg-white">
            {[
              { id: 'full', label: '풀컬러 PNG' },
              { id: 'ink_saver', label: '절약 PNG' },
              { id: 'bw_worksheet', label: '흑백 PNG' },
            ].map((opt, idx) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setCardInkMode(opt.id as PrintInkMode)}
                className={`px-3 py-1.5 text-xs font-bold whitespace-nowrap cursor-pointer ${
                  idx > 0 ? 'border-l border-slate-900' : ''
                } ${
                  cardInkMode === opt.id
                    ? 'bg-slate-900 text-white'
                    : 'bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-5">
          {bundle.chapters.map((ch, idx) => {
            const chCards = ch.cardIds
              .map((id) => allCards.find((c) => c.id === id))
              .filter((c): c is ConceptCard => Boolean(c));
            const copyKey = `ch-${ch.chapterNumber}`;

            return (
              <article
                key={ch.chapterNumber}
                className="bg-white border-2 border-slate-900 p-4 sm:p-5 space-y-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 bg-violet-600 text-white text-xs font-bold border border-slate-900 whitespace-nowrap">
                      CH {ch.chapterNumber}
                    </span>
                    <h4 className="font-game text-base sm:text-lg text-slate-900">
                      {ch.title}
                    </h4>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5">
                    {postKind !== 'intro' && (
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedHeroIdx(idx);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="px-2.5 py-1.5 border border-violet-600 bg-violet-50 hover:bg-violet-100 text-xs font-bold text-violet-700 whitespace-nowrap cursor-pointer"
                      >
                        {idx + 1}편 대표이미지 편집
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => copyText(copyKey, formatChapterClipboard(ch))}
                      className="px-3 py-1.5 border border-slate-900 bg-white hover:bg-slate-50 text-xs font-bold text-slate-900 inline-flex items-center gap-1 whitespace-nowrap cursor-pointer"
                    >
                      {copiedTarget === copyKey ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">챕터 글 복사됨</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>이 챕터 글 복사</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Difficulty & Teacher Coaching Tip Boxes */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-amber-50/70 border border-slate-900 p-3.5 space-y-1">
                    <div className="text-xs font-bold text-slate-900">
                      {postKind === '3-2-4' ? `☆ ${ch.difficultyTitle}` : ch.difficultyTitle}
                    </div>
                    <p className="text-xs font-body leading-relaxed text-slate-800">
                      {ch.difficultyText}
                    </p>
                  </div>

                  <div className="bg-violet-50/70 border border-slate-900 p-3.5 space-y-1">
                    <div className="text-xs font-bold text-violet-900 flex items-center gap-1.5">
                      {postKind !== '3-2-4' && <BookOpen className="w-3.5 h-3.5 shrink-0" />}
                      <span>{ch.tipTitle}</span>
                    </div>
                    <p className="text-xs font-body leading-relaxed text-slate-800">
                      {ch.tipText}
                    </p>
                  </div>
                </div>

                {/* Photocard Previews with Individual PNG Download */}
                <div className="flex flex-wrap items-start gap-4 pt-1">
                  {chCards.map((card) => (
                    <div
                      key={card.id}
                      className="flex flex-col items-center gap-2 p-3 bg-slate-50 border border-slate-300"
                    >
                      <ConceptPhotocard
                        card={card}
                        widthPx={195}
                        inkMode={cardInkMode}
                      />
                      <button
                        type="button"
                        disabled={Boolean(busyLabel)}
                        onClick={() => handleDownloadCardPreviewPng(card)}
                        className="w-full px-2.5 py-1.5 border border-slate-900 bg-white hover:bg-slate-900 hover:text-white text-slate-900 text-[11px] font-bold inline-flex items-center justify-center gap-1 transition-colors whitespace-nowrap cursor-pointer disabled:opacity-50"
                      >
                        <ImageIcon className="w-3.5 h-3.5 shrink-0" />
                        <span>{card.cardCode.slice(-2)}번 미리보기 PNG 저장</span>
                      </button>
                    </div>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Off-screen Fixed 640x640 (1:1) Hero Capture Source */}
      {heroCaptureJob && (
        <div
          aria-hidden="true"
          className="fixed -left-[99999px] top-0 pointer-events-none bg-white"
        >
          <div ref={heroCaptureRef}>
            <BlogHeroBanner1x1
              config={heroCaptureJob}
              cards={allCards}
            />
          </div>
        </div>
      )}

      {/* Off-screen Crisp High-Res Card Preview PNG Capture Source */}
      {cardCaptureJob && (
        <div
          aria-hidden="true"
          className="fixed -left-[99999px] top-0 pointer-events-none bg-white"
        >
          <div ref={cardCaptureRef}>
            <ConceptPhotocard
              card={cardCaptureJob}
              widthPx={440}
              inkMode={cardInkMode}
            />
          </div>
        </div>
      )}
    </div>
  );
};
