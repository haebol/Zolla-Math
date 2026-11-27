import { useEffect, useMemo, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import {
  Printer,
  ImagePlus,
  Trash2,
  Lock,
  BookOpen,
  Youtube,
  X,
  KeyRound,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ArrowLeft,
  LayoutGrid,
} from 'lucide-react';
import {
  BinderSizeId,
  ConceptCard,
  PrintInkMode,
  PrintLayoutMode,
  PrintPageScope,
  UnitId,
  WorksheetDuplexMode,
} from './types/card';
import { BINDER_PRESETS, INITIAL_FRACTION_CARDS } from './data/fractionCards';
import { INITIAL_ADDSUB1_CARDS } from './data/addSub1Cards';
import { INITIAL_CLOCK1_CARDS } from './data/clock1Cards';
import { INITIAL_ADDSUB_CARDS } from './data/addSubCards';
import { INITIAL_LENGTH3_CARDS } from './data/length3Cards';
import { INITIAL_TIME3_CARDS } from './data/time3Cards';
import { INITIAL_MUL3_CARDS } from './data/mul3Cards';
import { INITIAL_DIVISION_CARDS } from './data/divisionCards';
import { INITIAL_CIRCLE_CARDS } from './data/circleCards';
import { INITIAL_MEASURE_CARDS } from './data/measureCards';
import { INITIAL_FRACADD_CARDS } from './data/fracAddCards';
import { INITIAL_DECADD_CARDS } from './data/decAddCards';
import { INITIAL_AREA5_CARDS } from './data/area5Cards';
import { INITIAL_FRACMUL_CARDS } from './data/fracMulCards';
import { INITIAL_DECMUL_CARDS } from './data/decMulCards';
import { INITIAL_RANGE_CARDS } from './data/rangeCards';
import { INITIAL_FRACDIV_CARDS } from './data/fracDivCards';
import { INITIAL_DECDIV_CARDS } from './data/decDivCards';
import { INITIAL_RATIO_CARDS } from './data/ratioCards';
import { INITIAL_GUGUDAN_CARDS, UNIT_METADATA } from './data/gugudanCards';
import { INITIAL_FOURDIGIT_CARDS } from './data/fourDigitCards';
import { INITIAL_CLOCK_CARDS } from './data/clockCards';
import { ConceptPhotocard } from './components/ConceptPhotocard';
import { HandwritingCardCreator } from './components/HandwritingCardCreator';
import { BlogStudioView } from './components/BlogStudioView';
import { YouTubeStudioView } from './components/YouTubeStudioView';
import { AdminStudioView } from './components/AdminStudioView';
import {
  A4LandscapeWorksheetCanvas,
  A4OriginalCardCanvas,
  A4SheetCanvas,
  buildPrintPages,
  buildWorksheetSpreads,
  PrintSheetView,
  selectCardsForSheetMode,
  SheetMode,
} from './components/PrintSheetView';

type ActiveView = 'gallery' | 'print' | 'haebol';
type TeacherSubTab = 'admin_manager' | 'full_print' | 'blog' | 'youtube' | 'handwriting';
type DeckFilter = 'ALL' | 'BASIC' | 'SKILL' | 'SPECIAL_BOSS';
type GradeFilter = 'ALL' | '1' | '2' | '3' | '4' | '5' | '6';
type DomainPhase = 'init' | 'measure' | 'shape' | 'all' | 'calc' | 'other';
type DomainFilter = 'ALL' | 'calc' | 'measure' | 'shape' | 'other';
type UnitDomain = 'calc' | 'measure' | 'shape' | 'other';
type GalleryColMode = 'auto' | 2 | 3 | 4;

const UNIT_DOMAIN: Record<UnitId, UnitDomain> = {
  '1-2-3': 'calc',
  '1-2-4': 'measure',
  '1-2-6': 'calc',
  '2-2-1': 'calc',
  '2-2-2': 'calc',
  '2-2-4': 'measure',
  '3-1-5L': 'measure',
  '3-1-5': 'measure',
  '3-2-1': 'calc',
  '3-2-2': 'calc',
  '3-2-3': 'shape',
  '3-2-4': 'calc',
  '3-2-5': 'measure',
  '4-2-1': 'calc',
  '4-2-3': 'calc',
  '5-1-6': 'measure',
  '5-2-1': 'calc',
  '5-2-2': 'calc',
  '5-2-4': 'calc',
  '6-2-1': 'calc',
  '6-2-2': 'calc',
  '6-2-4': 'other',
};

const DOMAIN_PHASE_CONFIG: Record<
  DomainPhase,
  { label: string; filter: DomainFilter; isActiveStyle: boolean; next: DomainPhase }
> = {
  init: { label: '연산', filter: 'ALL', isActiveStyle: false, next: 'measure' },
  measure: { label: '측정', filter: 'measure', isActiveStyle: true, next: 'shape' },
  shape: { label: '도형', filter: 'shape', isActiveStyle: true, next: 'all' },
  all: { label: '선택', filter: 'ALL', isActiveStyle: false, next: 'calc' },
  calc: { label: '연산', filter: 'calc', isActiveStyle: true, next: 'measure' },
  other: { label: '기타', filter: 'other', isActiveStyle: true, next: 'all' },
};

const GALLERY_UNIT_ORDER: UnitId[] = [
  '1-2-3',
  '1-2-4',
  '1-2-6',
  '2-2-1',
  '2-2-2',
  '2-2-4',
  '3-1-5L',
  '3-1-5',
  '3-2-1',
  '3-2-2',
  '3-2-3',
  '3-2-4',
  '3-2-5',
  '4-2-1',
  '4-2-3',
  '5-1-6',
  '5-2-1',
  '5-2-2',
  '5-2-4',
  '6-2-1',
  '6-2-2',
  '6-2-4',
];

const CUSTOM_CARDS_STORAGE_KEY = 'jollaman-custom-handwriting-cards-v1';
const ADMIN_UNIT_ORDER_KEY = 'jollaman-admin-unit-order-v1';
const ADMIN_CARD_ORDER_KEY = 'jollaman-admin-card-order-v1';
const TEACHER_SESSION_KEY = 'haebol-teacher-unlocked';
const TEACHER_PASSWORD_STORAGE_KEY = 'haebol-teacher-password';
const DEFAULT_TEACHER_PASSWORD = '1234';

// 코드 기본값 공개 설정 (추후 새 단원 해금 시 이 배열에 UnitId를 추가)
const PUBLIC_UNIT_IDS: readonly UnitId[] = ['3-2-4'];
const PUBLIC_UNIT_SET = new Set<UnitId>(PUBLIC_UNIT_IDS);
const PUBLIC_PRINT_ENABLED = false;

const DEFAULT_DECKS: Record<UnitId, ConceptCard[]> = {
  '1-2-3': INITIAL_ADDSUB1_CARDS,
  '1-2-4': INITIAL_CLOCK1_CARDS,
  '1-2-6': INITIAL_ADDSUB_CARDS,
  '2-2-1': INITIAL_FOURDIGIT_CARDS,
  '2-2-2': INITIAL_GUGUDAN_CARDS,
  '2-2-4': INITIAL_CLOCK_CARDS,
  '3-1-5L': INITIAL_LENGTH3_CARDS,
  '3-1-5': INITIAL_TIME3_CARDS,
  '3-2-1': INITIAL_MUL3_CARDS,
  '3-2-2': INITIAL_DIVISION_CARDS,
  '3-2-3': INITIAL_CIRCLE_CARDS,
  '3-2-4': INITIAL_FRACTION_CARDS,
  '3-2-5': INITIAL_MEASURE_CARDS,
  '4-2-1': INITIAL_FRACADD_CARDS,
  '4-2-3': INITIAL_DECADD_CARDS,
  '5-1-6': INITIAL_AREA5_CARDS,
  '5-2-1': INITIAL_RANGE_CARDS,
  '5-2-2': INITIAL_FRACMUL_CARDS,
  '5-2-4': INITIAL_DECMUL_CARDS,
  '6-2-1': INITIAL_FRACDIV_CARDS,
  '6-2-2': INITIAL_DECDIV_CARDS,
  '6-2-4': INITIAL_RATIO_CARDS,
};

const buildUnitMap = <T,>(fn: (uid: UnitId) => T): Record<UnitId, T> =>
  Object.fromEntries(GALLERY_UNIT_ORDER.map((uid) => [uid, fn(uid)])) as Record<
    UnitId,
    T
  >;

const EMPTY_CUSTOM_CARDS: Record<UnitId, ConceptCard[]> = buildUnitMap(() => []);

export default function App() {
  const [customCardsByUnit, setCustomCardsByUnit] = useState<Record<UnitId, ConceptCard[]>>(() => {
    try {
      const saved = localStorage.getItem(CUSTOM_CARDS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<Record<UnitId, ConceptCard[]>>;
        return buildUnitMap((uid) =>
          Array.isArray(parsed[uid]) ? parsed[uid]! : []
        );
      }
    } catch {
      // Fallback to empty custom cards
    }
    return EMPTY_CUSTOM_CARDS;
  });

  const [unitOrder, setUnitOrder] = useState<UnitId[]>(() => {
    try {
      const saved = localStorage.getItem(ADMIN_UNIT_ORDER_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as UnitId[];
        if (Array.isArray(parsed)) {
          const validSaved = parsed.filter((uid) =>
            GALLERY_UNIT_ORDER.includes(uid)
          );
          const missing = GALLERY_UNIT_ORDER.filter(
            (uid) => !validSaved.includes(uid)
          );
          return [...validSaved, ...missing];
        }
      }
    } catch {
      // Fallback to default unit order
    }
    return GALLERY_UNIT_ORDER;
  });

  const [cardOrderByUnit, setCardOrderByUnit] = useState<
    Partial<Record<UnitId, string[]>>
  >(() => {
    try {
      const saved = localStorage.getItem(ADMIN_CARD_ORDER_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<Record<UnitId, string[]>>;
        if (parsed && typeof parsed === 'object') return parsed;
      }
    } catch {
      // Fallback to default card order
    }
    return {};
  });

  const decks = useMemo<Record<UnitId, ConceptCard[]>>(
    () =>
      buildUnitMap((uid) => {
        const base = [...DEFAULT_DECKS[uid], ...customCardsByUnit[uid]];
        const savedOrder = cardOrderByUnit[uid];
        if (!Array.isArray(savedOrder) || savedOrder.length === 0) return base;
        const byId = new Map(base.map((c) => [c.id, c]));
        const ordered: ConceptCard[] = [];
        for (const id of savedOrder) {
          const found = byId.get(id);
          if (found) {
            ordered.push(found);
            byId.delete(id);
          }
        }
        for (const card of byId.values()) {
          ordered.push(card);
        }
        return ordered;
      }),
    [customCardsByUnit, cardOrderByUnit]
  );

  const [activeView, setActiveView] = useState<ActiveView>('gallery');
  const [gradeFilter, setGradeFilter] = useState<GradeFilter>('3');
  const [domainPhase, setDomainPhase] = useState<DomainPhase>('init');
  const [showDomainMenu, setShowDomainMenu] = useState<boolean>(false);
  const domainMenuRef = useRef<HTMLDivElement>(null);
  const [activeUnit, setActiveUnit] = useState<UnitId>('3-2-4');
  const [deckFilter, setDeckFilter] = useState<DeckFilter>('ALL');
  const [galleryColMode, setGalleryColMode] = useState<GalleryColMode>(() =>
    typeof window !== 'undefined' && window.innerWidth >= 768 ? 4 : 2
  );
  const hasManualColModeRef = useRef<boolean>(false);
  const [zoomedCard, setZoomedCard] = useState<ConceptCard | null>(null);
  const [viewportSize, setViewportSize] = useState<{ w: number; h: number }>(() =>
    typeof window === 'undefined'
      ? { w: 1024, h: 768 }
      : { w: window.innerWidth, h: window.innerHeight }
  );

  // Hidden 해볼쌤전용 access state (invisible to general users until double-click + password)
  const [isTeacherUnlocked, setIsTeacherUnlocked] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(TEACHER_SESSION_KEY) === '1';
    } catch {
      return false;
    }
  });
  const [teacherPassword, setTeacherPassword] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(TEACHER_PASSWORD_STORAGE_KEY);
      return saved && saved.length > 0 ? saved : DEFAULT_TEACHER_PASSWORD;
    } catch {
      return DEFAULT_TEACHER_PASSWORD;
    }
  });
  const [teacherSubTab, setTeacherSubTab] = useState<TeacherSubTab>('admin_manager');
  const [showPasswordModal, setShowPasswordModal] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [showChangePwModal, setShowChangePwModal] = useState<boolean>(false);
  const [curPwInput, setCurPwInput] = useState<string>('');
  const [newPwInput, setNewPwInput] = useState<string>('');
  const [confirmPwInput, setConfirmPwInput] = useState<string>('');
  const [changePwError, setChangePwError] = useState<string>('');
  const [changePwToast, setChangePwToast] = useState<string>('');
  const lastBrandTapRef = useRef<number>(0);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  // Print configuration
  const [binderSize, setBinderSize] = useState<BinderSizeId>('daiso_55x85');
  const [sheetMode, setSheetMode] = useState<SheetMode>('all_pages');
  const [repeatCardId, setRepeatCardId] = useState<string>(
    INITIAL_FRACTION_CARDS[1]?.id ?? 'frac-01'
  );
  const [showCropMarks, setShowCropMarks] = useState<boolean>(true);
  const [showCornerGuide, setShowCornerGuide] = useState<boolean>(false);
  const [inkMode, setInkMode] = useState<PrintInkMode>('full');
  const [tightCut, setTightCut] = useState<boolean>(false);
  const [printLayoutMode, setPrintLayoutMode] = useState<PrintLayoutMode>('photocard_3x3');
  const [worksheetDuplexMode, setWorksheetDuplexMode] = useState<WorksheetDuplexMode>('single');
  const [currentPageIdx, setCurrentPageIdx] = useState<number>(0);
  const [printPageScope, setPrintPageScope] = useState<PrintPageScope>('current');

  useEffect(() => {
    if (showPasswordModal) {
      setTimeout(() => passwordInputRef.current?.focus(), 20);
    }
  }, [showPasswordModal]);

  useEffect(() => {
    if (!zoomedCard) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setZoomedCard(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [zoomedCard]);

  useEffect(() => {
    if (!showDomainMenu) return;
    const onPointerDown = (e: MouseEvent) => {
      if (domainMenuRef.current && !domainMenuRef.current.contains(e.target as Node)) {
        setShowDomainMenu(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowDomainMenu(false);
    };
    window.addEventListener('mousedown', onPointerDown);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [showDomainMenu]);

  useEffect(() => {
    try {
      localStorage.removeItem('jollaman-admin-locked-units-v1');
      localStorage.removeItem('jollaman-admin-locked-cards-v1');
    } catch {
      // Ignore storage error
    }

    let lastW = window.innerWidth;
    let lastH = window.innerHeight;

    const updateViewportSize = (force = false) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      if (!force && w === lastW && w < 640 && Math.abs(h - lastH) < 90) {
        return;
      }
      lastW = w;
      lastH = h;
      setViewportSize({ w, h });
      if (!hasManualColModeRef.current) {
        setGalleryColMode(w >= 768 ? 4 : 2);
      }
    };

    const handleResize = () => updateViewportSize(false);
    const handleOrientation = () => updateViewportSize(true);
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleOrientation);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientation);
    };
  }, []);

  const galleryCardWidth = useMemo(() => {
    const { w, h } = viewportSize;
    if (galleryColMode === 4) {
      if (w >= 1024) {
        const pad = 48;
        const gap = 60;
        const maxW = Math.floor((Math.min(w, 1200) - pad - gap) / 4);
        return Math.min(268, maxW);
      }
      if (w >= 768) {
        const pad = 48;
        const gap = 36;
        const maxW = Math.floor((w - pad - gap) / 4);
        return Math.max(148, Math.min(268, maxW));
      }
      const pad = w < 640 ? 24 : 48;
      const gap = w < 640 ? 8 : 20;
      const maxW = Math.floor((w - pad - gap) / 2);
      return Math.max(130, maxW);
    }
    if (galleryColMode === 2) {
      const pad = w < 640 ? 24 : 48;
      const gap = w < 640 ? 8 : 20;
      const maxW = Math.floor((Math.min(w, 1200) - pad - gap) / 2);
      return w < 640 ? Math.max(130, maxW) : Math.min(268, maxW);
    }
    if (galleryColMode === 3) {
      const pad = w < 640 ? 24 : 48;
      const gap = w < 640 ? 12 : 40;
      const maxW = Math.floor((Math.min(w, 1200) - pad - gap) / 3);
      return w < 640 ? Math.max(96, maxW) : Math.min(268, maxW);
    }
    if (w >= 640) return 290;
    const availH = Math.max(360, h - 104);
    const maxWByHeight = (availH * 275) / 425;
    return Math.round(Math.max(220, Math.min(340, w - 28, maxWByHeight)));
  }, [viewportSize, galleryColMode]);

  const zoomedCardWidth = useMemo(() => {
    const { w, h } = viewportSize;
    const availH = Math.max(360, h - 96);
    const maxWByHeight = (availH * 275) / 425;
    return Math.round(Math.max(240, Math.min(340, w - 36, maxWByHeight)));
  }, [viewportSize]);

  const openTeacherAccess = () => {
    if (isTeacherUnlocked) {
      setActiveView('haebol');
      return;
    }
    setShowPasswordModal((prev) => {
      if (!prev) {
        setPasswordInput('');
        setPasswordError('');
      }
      return true;
    });
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput.trim() === teacherPassword) {
      setIsTeacherUnlocked(true);
      try {
        sessionStorage.setItem(TEACHER_SESSION_KEY, '1');
      } catch {
        // Ignore sessionStorage restriction
      }
      setShowPasswordModal(false);
      setPasswordInput('');
      setPasswordError('');
      setTeacherSubTab('admin_manager');
      setActiveView('haebol');
    } else {
      setPasswordError('비밀번호가 일치하지 않습니다.');
      passwordInputRef.current?.select();
    }
  };

  const handleOpenChangePwModal = () => {
    setCurPwInput('');
    setNewPwInput('');
    setConfirmPwInput('');
    setChangePwError('');
    setShowChangePwModal(true);
  };

  const handleChangePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (curPwInput.trim() !== teacherPassword) {
      setChangePwError('현재 비밀번호가 일치하지 않습니다.');
      return;
    }
    const next = newPwInput.trim();
    if (next.length < 1) {
      setChangePwError('새 비밀번호를 입력해 주세요.');
      return;
    }
    if (next !== confirmPwInput.trim()) {
      setChangePwError('새 비밀번호 확인이 일치하지 않습니다.');
      return;
    }
    setTeacherPassword(next);
    try {
      localStorage.setItem(TEACHER_PASSWORD_STORAGE_KEY, next);
    } catch {
      // Ignore storage failure
    }
    setShowChangePwModal(false);
    setChangePwToast('비밀번호가 변경되었습니다.');
    setTimeout(() => setChangePwToast(''), 2500);
  };

  const handleLockTeacherMode = () => {
    setIsTeacherUnlocked(false);
    try {
      sessionStorage.removeItem(TEACHER_SESSION_KEY);
    } catch {
      // Ignore
    }
    setActiveView('gallery');
  };

  const cards = decks[activeUnit];
  const activeUnitMeta = UNIT_METADATA[activeUnit];

  const switchUnit = (nextUnit: UnitId) => {
    setActiveUnit(nextUnit);
    setDeckFilter('ALL');
    setCurrentPageIdx(0);
    const nextCards = decks[nextUnit];
    setRepeatCardId(nextCards[1]?.id ?? nextCards[0]?.id ?? '');
  };

  const persistCustomCards = (next: Record<UnitId, ConceptCard[]>): boolean => {
    try {
      localStorage.setItem(CUSTOM_CARDS_STORAGE_KEY, JSON.stringify(next));
      setCustomCardsByUnit(next);
      return true;
    } catch {
      return false;
    }
  };

  const handleAddCustomCard = (unitId: UnitId, card: ConceptCard): boolean => {
    const next: Record<UnitId, ConceptCard[]> = {
      ...customCardsByUnit,
      [unitId]: [...customCardsByUnit[unitId], card],
    };
    return persistCustomCards(next);
  };

  const handleDeleteCustomCard = (unitId: UnitId, cardId: string) => {
    const next: Record<UnitId, ConceptCard[]> = {
      ...customCardsByUnit,
      [unitId]: customCardsByUnit[unitId].filter((c) => c.id !== cardId),
    };
    persistCustomCards(next);
  };

  const handlePrint = (scope: PrintPageScope = 'all') => {
    flushSync(() => {
      setPrintPageScope(scope);
    });
    window.print();
  };

  const activePreset =
    BINDER_PRESETS.find((p) => p.id === binderSize) ?? BINDER_PRESETS[0];

  const isSingleOriginal = printLayoutMode === 'single_original';
  const isWorksheetMode = printLayoutMode === 'worksheet_2up';

  const originalCards = selectCardsForSheetMode(
    cards,
    sheetMode === 'single_repeat' ? 'all_pages' : sheetMode,
    repeatCardId
  );
  const printPages = buildPrintPages(cards, sheetMode, repeatCardId);
  const worksheetSpreads = buildWorksheetSpreads(
    cards,
    sheetMode,
    repeatCardId,
    worksheetDuplexMode
  );

  const basicCount = cards.filter((c) => c.badgeLabel === '기본').length;
  const skillCount = cards.filter((c) => c.badgeLabel === '필살').length;
  const specialCount = cards.filter((c) =>
    ['도감', '핵심', '함정', '도전', '스페셜', '보스', '칭찬', '손필기'].includes(c.badgeLabel)
  ).length;

  const visibleCards = cards.filter((c) => {
    if (deckFilter === 'BASIC') return c.badgeLabel === '기본';
    if (deckFilter === 'SKILL') return c.badgeLabel === '필살';
    if (deckFilter === 'SPECIAL_BOSS') {
      return ['도감', '핵심', '함정', '도전', '스페셜', '보스', '칭찬', '손필기'].includes(
        c.badgeLabel
      );
    }
    return true;
  });

  const handleMoveUnitOrder = (uid: UnitId, direction: 'up' | 'down') => {
    setUnitOrder((prev) => {
      const idx = prev.indexOf(uid);
      if (idx < 0) return prev;
      const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
      if (targetIdx < 0 || targetIdx >= prev.length) return prev;
      const next = [...prev];
      [next[idx], next[targetIdx]] = [next[targetIdx], next[idx]];
      try {
        localStorage.setItem(ADMIN_UNIT_ORDER_KEY, JSON.stringify(next));
      } catch {
        // Ignore storage error
      }
      return next;
    });
  };

  const handleMoveCardOrder = (
    uid: UnitId,
    cardId: string,
    direction: 'up' | 'down'
  ) => {
    const currentIds = (decks[uid] ?? []).map((c) => c.id);
    const idx = currentIds.indexOf(cardId);
    if (idx < 0) return;
    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= currentIds.length) return;
    const nextIds = [...currentIds];
    [nextIds[idx], nextIds[targetIdx]] = [nextIds[targetIdx], nextIds[idx]];
    setCardOrderByUnit((prev) => {
      const next = { ...prev, [uid]: nextIds };
      try {
        localStorage.setItem(ADMIN_CARD_ORDER_KEY, JSON.stringify(next));
      } catch {
        // Ignore storage error
      }
      return next;
    });
  };

  const publicGrades = useMemo(
    () => new Set(PUBLIC_UNIT_IDS.map((uid) => UNIT_METADATA[uid].grade)),
    []
  );
  const publicDomains = useMemo(
    () => new Set<UnitDomain>(PUBLIC_UNIT_IDS.map((uid) => UNIT_DOMAIN[uid])),
    []
  );

  const currentDomainConfig = DOMAIN_PHASE_CONFIG[domainPhase];
  const activeDomainFilter = currentDomainConfig.filter;

  const handleReturnToLearnerView = () => {
    if (!PUBLIC_UNIT_SET.has(activeUnit)) {
      const firstOpen =
        unitOrder.find((uid) => PUBLIC_UNIT_SET.has(uid)) ?? PUBLIC_UNIT_IDS[0];
      if (firstOpen) {
        switchUnit(firstOpen);
        if (gradeFilter !== 'ALL' && UNIT_METADATA[firstOpen].grade !== gradeFilter) {
          setGradeFilter(UNIT_METADATA[firstOpen].grade);
        }
        if (activeDomainFilter !== 'ALL' && UNIT_DOMAIN[firstOpen] !== activeDomainFilter) {
          setDomainPhase('init');
        }
      }
    }
    setShowChangePwModal(false);
    setActiveView('gallery');
  };

  useEffect(() => {
    if (activeView === 'haebol') return;
    if (!PUBLIC_PRINT_ENABLED && activeView === 'print') {
      setActiveView('gallery');
    }
    if (PUBLIC_UNIT_SET.has(activeUnit)) return;
    const sameGradeOpen =
      gradeFilter !== 'ALL'
        ? unitOrder.find(
            (uid) =>
              PUBLIC_UNIT_SET.has(uid) && UNIT_METADATA[uid].grade === gradeFilter
          )
        : undefined;
    const firstOpen =
      sameGradeOpen ?? unitOrder.find((uid) => PUBLIC_UNIT_SET.has(uid));
    if (firstOpen) {
      setActiveUnit(firstOpen);
      setDeckFilter('ALL');
      setCurrentPageIdx(0);
      if (gradeFilter !== 'ALL' && UNIT_METADATA[firstOpen].grade !== gradeFilter) {
        setGradeFilter(UNIT_METADATA[firstOpen].grade);
      }
    }
  }, [activeView, activeUnit, unitOrder, gradeFilter]);

  const getFilteredUnits = (grade: GradeFilter, domain: DomainFilter) =>
    unitOrder.filter(
      (uid) =>
        PUBLIC_UNIT_SET.has(uid) &&
        (grade === 'ALL' || UNIT_METADATA[uid].grade === grade) &&
        (domain === 'ALL' || UNIT_DOMAIN[uid] === domain)
    );

  const filteredGalleryUnits = getFilteredUnits(gradeFilter, activeDomainFilter);

  const publishedUnitOrder = unitOrder.filter((uid) => PUBLIC_UNIT_SET.has(uid));
  const activePublishedIndex = publishedUnitOrder.indexOf(activeUnit);
  const prevUnitId =
    activePublishedIndex > 0 ? publishedUnitOrder[activePublishedIndex - 1] : null;
  const nextUnitId =
    activePublishedIndex >= 0 && activePublishedIndex < publishedUnitOrder.length - 1
      ? publishedUnitOrder[activePublishedIndex + 1]
      : null;

  const applyDomainPhase = (nextPhase: DomainPhase) => {
    const nextFilter = DOMAIN_PHASE_CONFIG[nextPhase].filter;
    if (nextFilter !== 'ALL' && !publicDomains.has(nextFilter)) return;
    setDomainPhase(nextPhase);
    let nextGrade = gradeFilter;
    let matching = getFilteredUnits(nextGrade, nextFilter);
    if (matching.length === 0 && nextGrade !== 'ALL') {
      nextGrade = 'ALL';
      setGradeFilter('ALL');
      matching = getFilteredUnits('ALL', nextFilter);
    }
    const firstUnlocked = matching.find((uid) => PUBLIC_UNIT_SET.has(uid));
    if (
      (!PUBLIC_UNIT_SET.has(activeUnit) || !matching.includes(activeUnit)) &&
      firstUnlocked
    ) {
      switchUnit(firstUnlocked);
    }
  };

  const navigateGalleryUnit = (targetUnit: UnitId) => {
    if (!PUBLIC_UNIT_SET.has(targetUnit)) return;
    if (gradeFilter !== 'ALL' && UNIT_METADATA[targetUnit].grade !== gradeFilter) {
      setGradeFilter(UNIT_METADATA[targetUnit].grade);
    }
    if (activeDomainFilter !== 'ALL' && UNIT_DOMAIN[targetUnit] !== activeDomainFilter) {
      setDomainPhase('all');
    }
    switchUnit(targetUnit);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalAdminUnits = unitOrder.length;

  const safeOriginalIdx = Math.min(currentPageIdx, Math.max(0, originalCards.length - 1));
  const safePhotocardIdx = Math.min(currentPageIdx, Math.max(0, printPages.length - 1));
  const safeWorksheetIdx = Math.min(currentPageIdx, Math.max(0, worksheetSpreads.length - 1));

  const originalPrintList = (
    printPageScope === 'current' ? [originalCards[safeOriginalIdx]] : originalCards
  ).filter(Boolean);
  const photocardPrintList = (
    printPageScope === 'current' ? [printPages[safePhotocardIdx]] : printPages
  ).filter(Boolean);
  const worksheetPrintList = (
    printPageScope === 'current' ? [worksheetSpreads[safeWorksheetIdx]] : worksheetSpreads
  ).filter(Boolean);

  return (
    <div className="app-print-root min-h-screen bg-white text-slate-900 flex flex-col">
      {/* Top Single-Row Brand + Menu Header (Learner & Print View) */}
      {!(activeView === 'haebol' && isTeacherUnlocked) && (
        <header className="no-print sticky top-0 z-30 bg-white border-b border-slate-200">
          <div className="max-w-[1200px] mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-2 sm:gap-4">
            <button
              type="button"
              onClick={() => {
                const now = Date.now();
                if (now - lastBrandTapRef.current < 340) {
                  lastBrandTapRef.current = 0;
                  openTeacherAccess();
                  return;
                }
                lastBrandTapRef.current = now;
                setActiveView('gallery');
              }}
              onDoubleClick={() => {
                lastBrandTapRef.current = 0;
                openTeacherAccess();
              }}
              className="inline-flex items-center gap-2 cursor-pointer shrink-0 touch-manipulation select-none"
            >
              <span className="font-game text-xl sm:text-2xl tracking-tight text-slate-900 whitespace-nowrap">
                졸라수학맨
              </span>
              <img
                src="/assets/jollaman-logo.png"
                alt="졸라수학맨 로고"
                className="h-8 sm:h-9 w-auto object-contain shrink-0"
              />
            </button>

            <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
              <nav aria-label="주 메뉴" className="flex items-center gap-1 sm:gap-2">
                {[
                  { id: 'gallery', label: '도감' },
                  ...(isTeacherUnlocked ? [{ id: 'haebol', label: '해볼쌤전용' }] : []),
                ].map((item) => {
                  const active = activeView === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        if (item.id === 'haebol') {
                          setTeacherSubTab('admin_manager');
                        }
                        setActiveView(item.id as ActiveView);
                      }}
                      className={`px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-bold transition-colors whitespace-nowrap shrink-0 border-b-2 cursor-pointer ${
                        active
                          ? 'text-violet-700 border-violet-600'
                          : 'text-slate-600 border-transparent hover:text-slate-900'
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </nav>

              <span className="h-4 w-px bg-slate-200 mx-0.5 shrink-0" aria-hidden="true" />

              <button
                type="button"
                disabled={!PUBLIC_PRINT_ENABLED}
                aria-disabled={!PUBLIC_PRINT_ENABLED}
                onClick={
                  PUBLIC_PRINT_ENABLED
                    ? () => {
                        if (activeView === 'print') {
                          handlePrint('current');
                        } else {
                          setPrintPageScope('current');
                          setActiveView('print');
                        }
                      }
                    : undefined
                }
                className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs font-bold border-2 inline-flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 ${
                  !PUBLIC_PRINT_ENABLED
                    ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                    : activeView === 'print'
                    ? 'bg-violet-600 hover:bg-violet-700 text-white border-slate-900 cursor-pointer'
                    : 'bg-slate-900 hover:bg-slate-800 text-white border-slate-900 cursor-pointer'
                }`}
              >
                <Printer className="w-3.5 h-3.5" />
                <span>인쇄</span>
              </button>
            </div>
          </div>
        </header>
      )}

      {/* Main Workspace */}
      <main className="no-print pb-12 bg-white flex-1">
        {activeView === 'gallery' && (
          <div className="max-w-[1200px] mx-auto px-3 sm:px-6 pt-4">
            {/* Grade Bar + Unit Selector */}
            <div className="pb-4 border-b border-slate-200 space-y-3">
              <div className="flex flex-nowrap items-center gap-x-2 sm:gap-x-4 md:gap-x-6 lg:gap-x-7 text-[13px] sm:text-sm font-bold tracking-tight overflow-x-auto md:overflow-visible">
                <button
                  type="button"
                  onClick={() => {
                    setGradeFilter('ALL');
                    setDomainPhase('init');
                    setShowDomainMenu(false);
                    if (!PUBLIC_UNIT_SET.has(activeUnit)) {
                      const firstOpen = unitOrder.find((uid) => PUBLIC_UNIT_SET.has(uid));
                      if (firstOpen) switchUnit(firstOpen);
                    }
                  }}
                  className={`pb-0.5 whitespace-nowrap shrink-0 border-b-2 transition-colors cursor-pointer ${
                    gradeFilter === 'ALL' && activeDomainFilter === 'ALL'
                      ? 'text-violet-700 border-violet-600'
                      : 'text-slate-800 border-transparent hover:text-violet-700'
                  }`}
                >
                  전체
                </button>
                <span className="text-slate-300 select-none shrink-0" aria-hidden="true">/</span>
                {(['1', '2', '3', '4', '5', '6'] as const).map((g) => {
                  const isGradeOpen = publicGrades.has(g);
                  return (
                    <button
                      key={g}
                      type="button"
                      disabled={!isGradeOpen}
                      aria-disabled={!isGradeOpen}
                      onClick={
                        isGradeOpen
                          ? () => {
                              const nextDomain = activeDomainFilter;
                              const matching = getFilteredUnits(g, nextDomain);
                              const firstOpenInGrade = matching.find((uid) =>
                                PUBLIC_UNIT_SET.has(uid)
                              );
                              setGradeFilter(g);
                              setShowDomainMenu(false);
                              if (
                                (!PUBLIC_UNIT_SET.has(activeUnit) ||
                                  !matching.includes(activeUnit)) &&
                                firstOpenInGrade
                              ) {
                                switchUnit(firstOpenInGrade);
                              }
                            }
                          : undefined
                      }
                      className={`pb-0.5 whitespace-nowrap shrink-0 border-b-2 transition-colors ${
                        !isGradeOpen
                          ? 'text-slate-300 border-transparent cursor-not-allowed'
                          : gradeFilter === g
                          ? 'text-violet-700 border-violet-600 cursor-pointer'
                          : 'text-slate-800 border-transparent hover:text-violet-700 cursor-pointer'
                      }`}
                    >
                      {g}학년
                    </button>
                  );
                })}
                {/* Mobile domain toggle (cycles only across open domains) */}
                <button
                  type="button"
                  onClick={() => {
                    const openCycle: DomainPhase[] = ['init'];
                    if (publicDomains.has('calc')) openCycle.push('calc');
                    if (publicDomains.has('measure')) openCycle.push('measure');
                    if (publicDomains.has('shape')) openCycle.push('shape');
                    if (publicDomains.has('other')) openCycle.push('other');
                    const curIdx = openCycle.indexOf(domainPhase);
                    const nextPhase = openCycle[(curIdx + 1) % openCycle.length];
                    applyDomainPhase(nextPhase);
                  }}
                  className={`md:hidden px-2 sm:px-2.5 py-0.5 text-xs font-bold border whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                    currentDomainConfig.isActiveStyle
                      ? 'bg-violet-100 text-violet-700 border-violet-300 hover:bg-violet-200/70'
                      : 'bg-slate-100 text-slate-600 border-slate-300 hover:bg-slate-200/70'
                  }`}
                >
                  {activeDomainFilter === 'ALL' ? '계통' : currentDomainConfig.label}
                </button>

                {/* Tablet & PC (768px+) 계통 dropdown menu */}
                <div ref={domainMenuRef} className="hidden md:block relative shrink-0">
                  <button
                    type="button"
                    aria-expanded={showDomainMenu}
                    aria-haspopup="menu"
                    onClick={() => setShowDomainMenu((prev) => !prev)}
                    className={`px-2.5 py-0.5 text-xs font-bold border whitespace-nowrap inline-flex items-center gap-1 transition-colors cursor-pointer ${
                      currentDomainConfig.isActiveStyle
                        ? 'bg-violet-100 text-violet-700 border-violet-300 hover:bg-violet-200/70'
                        : 'bg-slate-100 text-slate-600 border-slate-300 hover:bg-slate-200/70'
                    }`}
                  >
                    <span>
                      {activeDomainFilter === 'ALL' ? '계통' : currentDomainConfig.label}
                    </span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform ${
                        showDomainMenu ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {showDomainMenu && (
                    <div
                      role="menu"
                      aria-label="계통 선택"
                      className="absolute left-0 top-full mt-1.5 z-40 min-w-[96px] bg-slate-100 border border-slate-300 shadow-md p-1 flex flex-col gap-0.5"
                    >
                      {(
                        [
                          { phase: 'calc', label: '연산' },
                          { phase: 'measure', label: '측정' },
                          { phase: 'shape', label: '도형' },
                          { phase: 'other', label: '기타' },
                        ] as const
                      ).map((item) => {
                        const isDomainOpen = publicDomains.has(item.phase);
                        const isSelected = activeDomainFilter === item.phase;
                        return (
                          <button
                            key={item.phase}
                            type="button"
                            role="menuitem"
                            disabled={!isDomainOpen}
                            aria-disabled={!isDomainOpen}
                            onClick={
                              isDomainOpen
                                ? () => {
                                    applyDomainPhase(isSelected ? 'init' : item.phase);
                                    setShowDomainMenu(false);
                                  }
                                : undefined
                            }
                            className={`w-full text-left px-2.5 py-1.5 text-xs font-bold transition-colors ${
                              !isDomainOpen
                                ? 'text-slate-400 cursor-not-allowed'
                                : isSelected
                                ? 'bg-violet-100 text-violet-700 cursor-pointer'
                                : 'text-slate-700 hover:bg-slate-200/80 cursor-pointer'
                            }`}
                          >
                            {item.label}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {filteredGalleryUnits.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  {filteredGalleryUnits.map((uid) => {
                    const meta = UNIT_METADATA[uid];
                    const selected = activeUnit === uid;
                    return (
                      <button
                        key={uid}
                        type="button"
                        onClick={() => switchUnit(uid)}
                        className={`px-2 sm:px-3 py-1 sm:py-1.5 text-xs font-bold whitespace-nowrap shrink-0 transition-colors inline-flex items-center gap-1 cursor-pointer ${
                          selected
                            ? 'bg-violet-600 text-white border-2 border-slate-900'
                            : 'bg-white text-slate-800 border-2 border-slate-900 hover:bg-slate-50'
                        }`}
                      >
                        <span>{meta.shortLabel}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Unit Heading + 모아보기 + Filter Strip */}
            {filteredGalleryUnits.length > 0 && PUBLIC_UNIT_SET.has(activeUnit) && (
              <>
                <div className="pt-4 pb-3 border-b-2 border-slate-900 flex flex-col md:flex-row md:items-center md:justify-between gap-2.5">
                  <div className="flex flex-wrap items-center justify-between md:justify-start gap-x-4 gap-y-2">
                    <div className="flex items-baseline gap-1.5 shrink-0">
                      <h1 className="font-game text-xl sm:text-2xl text-slate-900 tracking-tight">
                        {activeUnitMeta.shortLabel}
                      </h1>
                      <span className="font-game text-base sm:text-lg text-violet-700 tabular-nums">
                        ({cards.length})
                      </span>
                    </div>

                    <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm font-bold">
                      {(
                        [
                          { id: 'ALL', label: `전체 ${cards.length}` },
                          { id: 'BASIC', label: `기본 ${basicCount}` },
                          { id: 'SKILL', label: `필살 ${skillCount}` },
                          { id: 'SPECIAL_BOSS', label: `스페셜 ${specialCount}` },
                        ] as { id: DeckFilter; label: string }[]
                      ).map((tab) => (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() => setDeckFilter(tab.id)}
                          className={`pb-0.5 transition-colors whitespace-nowrap shrink-0 border-b-2 cursor-pointer ${
                            deckFilter === tab.id
                              ? 'text-violet-700 border-violet-600'
                              : 'text-slate-500 border-transparent hover:text-slate-900'
                          }`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-1.5 shrink-0">
                    <div
                      role="group"
                      aria-label="열 보기 선택"
                      className="inline-flex items-center border border-slate-900 bg-white text-xs font-bold whitespace-nowrap shrink-0"
                    >
                      {(
                        [
                          { mode: 'auto', label: '1열', pcOnly: false },
                          { mode: 2, label: '2열', pcOnly: false },
                          { mode: 3, label: '3열', pcOnly: false },
                          { mode: 4, label: '4열', pcOnly: true },
                        ] as const
                      ).map((opt) => {
                        const active = galleryColMode === opt.mode;
                        const borderRightClass =
                          opt.mode === 'auto' || opt.mode === 2
                            ? 'border-r border-slate-900'
                            : opt.mode === 3
                            ? 'md:border-r md:border-slate-900'
                            : '';
                        return (
                          <button
                            key={opt.label}
                            type="button"
                            onClick={() => {
                              hasManualColModeRef.current = true;
                              setGalleryColMode(opt.mode);
                              if (opt.mode === 'auto') setZoomedCard(null);
                            }}
                            className={`${opt.pcOnly ? 'hidden md:inline-block ' : ''}px-2 py-1 leading-4 cursor-pointer transition-colors ${borderRightClass} ${
                              active
                                ? 'bg-violet-100 text-violet-700'
                                : 'bg-white text-slate-800 hover:bg-slate-50'
                            }`}
                          >
                            {opt.label}
                          </button>
                        );
                      })}
                    </div>

                    <div
                      role="group"
                      aria-label="이전·다음 단원 이동"
                      className="inline-flex items-center border border-slate-900 bg-white text-xs font-bold whitespace-nowrap shrink-0"
                    >
                      <button
                        type="button"
                        disabled={!prevUnitId}
                        onClick={() => prevUnitId && navigateGalleryUnit(prevUnitId)}
                        title={
                          prevUnitId
                            ? `이전 단원: ${UNIT_METADATA[prevUnitId].shortLabel}`
                            : '이전 단원'
                        }
                        aria-label="이전 단원"
                        className="px-1.5 py-1 border-r border-slate-900 text-slate-800 hover:bg-slate-50 disabled:opacity-30 cursor-pointer disabled:cursor-default inline-flex items-center justify-center transition-colors"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        disabled={!nextUnitId}
                        onClick={() => nextUnitId && navigateGalleryUnit(nextUnitId)}
                        title={
                          nextUnitId
                            ? `다음 단원: ${UNIT_METADATA[nextUnitId].shortLabel}`
                            : '다음 단원'
                        }
                        aria-label="다음 단원"
                        className="px-1.5 py-1 text-slate-800 hover:bg-slate-50 disabled:opacity-30 cursor-pointer disabled:cursor-default inline-flex items-center justify-center transition-colors"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Clean Collectible Grid */}
                <div
                  className={`mt-6 grid justify-items-center ${
                    galleryColMode === 4
                      ? 'grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 md:gap-5'
                      : galleryColMode === 2
                      ? 'grid-cols-2 gap-2 sm:gap-5'
                      : galleryColMode === 3
                      ? 'grid-cols-3 gap-1.5 sm:gap-5'
                      : 'grid-cols-1 gap-4 sm:gap-5'
                  }`}
                >
                  {visibleCards.map((card) => {
                    const canZoom =
                      galleryColMode === 2 ||
                      galleryColMode === 3 ||
                      galleryColMode === 4;
                    return (
                      <div
                        key={card.id}
                        onClick={canZoom ? () => setZoomedCard(card) : undefined}
                        className={`relative group ${canZoom ? 'cursor-pointer' : ''}`}
                      >
                        <ConceptPhotocard
                          card={card}
                          widthPx={galleryCardWidth}
                        />
                        {isTeacherUnlocked && card.customHandwriting && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteCustomCard(activeUnit, card.id);
                            }}
                            title="손글씨 포카 삭제"
                            aria-label="손글씨 포카 삭제"
                            className="absolute top-2 right-2 p-1.5 bg-rose-600 hover:bg-rose-700 text-white border border-slate-900 opacity-90 group-hover:opacity-100 transition-opacity cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        )}

        {activeView === 'print' && PUBLIC_PRINT_ENABLED && (
          <PrintSheetView
            cards={cards}
            activeUnit={activeUnit}
            onChangeActiveUnit={switchUnit}
            unitCounts={{
              '1-2-6': decks['1-2-6'].length,
              '2-2-2': decks['2-2-2'].length,
              '3-2-2': decks['3-2-2'].length,
              '3-2-3': decks['3-2-3'].length,
              '3-2-4': decks['3-2-4'].length,
              '3-2-5': decks['3-2-5'].length,
              '4-2-1': decks['4-2-1'].length,
              '5-2-2': decks['5-2-2'].length,
              '6-2-1': decks['6-2-1'].length,
              '6-2-4': decks['6-2-4'].length,
            }}
            binderSize={binderSize}
            onChangeBinderSize={setBinderSize}
            sheetMode={sheetMode}
            onChangeSheetMode={setSheetMode}
            repeatCardId={repeatCardId}
            onChangeRepeatCardId={setRepeatCardId}
            showCropMarks={showCropMarks}
            onToggleCropMarks={() => setShowCropMarks((v) => !v)}
            showCornerGuide={showCornerGuide}
            onToggleCornerGuide={() => setShowCornerGuide((v) => !v)}
            inkMode={inkMode}
            onChangeInkMode={setInkMode}
            tightCut={tightCut}
            onToggleTightCut={() => setTightCut((v) => !v)}
            printLayoutMode={printLayoutMode}
            onChangePrintLayoutMode={setPrintLayoutMode}
            worksheetDuplexMode={worksheetDuplexMode}
            onChangeWorksheetDuplexMode={setWorksheetDuplexMode}
            currentPageIdx={currentPageIdx}
            onChangeCurrentPageIdx={setCurrentPageIdx}
            onTriggerPrint={handlePrint}
            accessMode="public"
            lockedUnitIds={
              new Set(unitOrder.filter((uid) => !PUBLIC_UNIT_SET.has(uid)))
            }
          />
        )}

        {activeView === 'haebol' && isTeacherUnlocked && (
          <div className="w-full min-h-screen bg-slate-50">
            {/* Full-Width Admin Header Bar */}
            <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-3 sm:px-5 py-2 flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={handleReturnToLearnerView}
                  className="h-8 px-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold inline-flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>학습자 화면으로 돌아가기</span>
                </button>

                <span className="font-game text-base sm:text-lg text-slate-900 whitespace-nowrap">
                  해볼쌤 관리자
                </span>

                <span className="px-2 py-0.5 bg-slate-100 text-slate-700 border border-slate-300 text-[11px] font-bold font-mono-num whitespace-nowrap">
                  전체 단원 {totalAdminUnits}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-1.5 ml-auto">
                <div className="flex items-center gap-1 overflow-x-auto">
                  {(
                    [
                      { id: 'admin_manager', label: '3단 관리', Icon: LayoutGrid },
                      { id: 'full_print', label: '인쇄·학습지', Icon: Printer },
                      { id: 'blog', label: '블로그', Icon: BookOpen },
                      { id: 'youtube', label: '유튜브', Icon: Youtube },
                      { id: 'handwriting', label: '손글씨', Icon: ImagePlus },
                    ] as const
                  ).map(({ id, label, Icon }) => {
                    const active = teacherSubTab === id;
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setTeacherSubTab(id)}
                        className={`h-7 px-2 text-xs font-bold inline-flex items-center gap-1 transition-colors whitespace-nowrap shrink-0 cursor-pointer border-b-2 ${
                          active
                            ? 'text-violet-700 border-violet-600 bg-violet-50/70'
                            : 'text-slate-600 border-transparent hover:text-slate-900'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5 shrink-0" />
                        <span>{label}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center gap-1 shrink-0 pl-1 border-l border-slate-200">
                  {changePwToast && (
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 whitespace-nowrap">
                      {changePwToast}
                    </span>
                  )}
                  <a
                    href="https://ais-pre-7wcsulllmgtfhtrjdjdatx-1007155345996.asia-east1.run.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="독립웹 새 창으로 열기 (인쇄 가능)"
                    aria-label="독립웹 새 창으로 열기"
                    className="w-7 h-7 text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-100 inline-flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <span aria-hidden="true">🌐</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      if (showChangePwModal) {
                        setShowChangePwModal(false);
                      } else {
                        handleOpenChangePwModal();
                      }
                    }}
                    title="비밀번호 변경"
                    aria-label="비밀번호 변경"
                    className={`w-7 h-7 inline-flex items-center justify-center transition-colors cursor-pointer ${
                      showChangePwModal
                        ? 'bg-violet-100 text-violet-700'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <KeyRound className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={handleLockTeacherMode}
                    title="해볼쌤 전용 잠그기"
                    aria-label="잠그기"
                    className="w-7 h-7 text-slate-600 hover:text-slate-900 hover:bg-slate-100 inline-flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <Lock className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </header>

            {/* Inline Password Change Strip (No Modal Popup) */}
            {showChangePwModal && (
              <form
                onSubmit={handleChangePasswordSubmit}
                className="bg-violet-50/60 border-b border-violet-200 px-3 sm:px-5 py-2 flex flex-wrap items-center gap-2 text-xs"
              >
                <span className="font-bold text-violet-900">비밀번호 변경:</span>
                <input
                  type="password"
                  autoComplete="off"
                  value={curPwInput}
                  onChange={(e) => {
                    setCurPwInput(e.target.value);
                    if (changePwError) setChangePwError('');
                  }}
                  placeholder="현재 비밀번호"
                  className="h-7 px-2 border border-slate-300 bg-white text-xs w-28 sm:w-32"
                />
                <input
                  type="password"
                  autoComplete="new-password"
                  value={newPwInput}
                  onChange={(e) => {
                    setNewPwInput(e.target.value);
                    if (changePwError) setChangePwError('');
                  }}
                  placeholder="새 비밀번호"
                  className="h-7 px-2 border border-slate-300 bg-white text-xs w-28 sm:w-32"
                />
                <input
                  type="password"
                  autoComplete="new-password"
                  value={confirmPwInput}
                  onChange={(e) => {
                    setConfirmPwInput(e.target.value);
                    if (changePwError) setChangePwError('');
                  }}
                  placeholder="새 비밀번호 확인"
                  className="h-7 px-2 border border-slate-300 bg-white text-xs w-28 sm:w-32"
                />
                <button
                  type="submit"
                  className="h-7 px-2.5 bg-slate-900 text-white font-bold cursor-pointer"
                >
                  저장
                </button>
                <button
                  type="button"
                  onClick={() => setShowChangePwModal(false)}
                  className="h-7 px-2 border border-slate-300 bg-white text-slate-700 font-bold cursor-pointer"
                >
                  닫기
                </button>
                {changePwError && (
                  <span className="text-rose-600 font-bold">{changePwError}</span>
                )}
              </form>
            )}

            {teacherSubTab === 'admin_manager' && (
              <AdminStudioView
                unitOrder={unitOrder}
                unitDomainMap={UNIT_DOMAIN}
                decks={decks}
                activeUnit={activeUnit}
                onSelectUnit={switchUnit}
                onMoveUnitOrder={handleMoveUnitOrder}
                onMoveCardOrder={handleMoveCardOrder}
              />
            )}

            {teacherSubTab === 'full_print' && (
              <div className="bg-white">
                <PrintSheetView
                  cards={cards}
                  activeUnit={activeUnit}
                  onChangeActiveUnit={switchUnit}
                  unitCounts={{
                    '1-2-6': decks['1-2-6'].length,
                    '2-2-2': decks['2-2-2'].length,
                    '3-2-2': decks['3-2-2'].length,
                    '3-2-3': decks['3-2-3'].length,
                    '3-2-4': decks['3-2-4'].length,
                    '3-2-5': decks['3-2-5'].length,
                    '4-2-1': decks['4-2-1'].length,
                    '5-2-2': decks['5-2-2'].length,
                    '6-2-1': decks['6-2-1'].length,
                    '6-2-4': decks['6-2-4'].length,
                  }}
                  binderSize={binderSize}
                  onChangeBinderSize={setBinderSize}
                  sheetMode={sheetMode}
                  onChangeSheetMode={setSheetMode}
                  repeatCardId={repeatCardId}
                  onChangeRepeatCardId={setRepeatCardId}
                  showCropMarks={showCropMarks}
                  onToggleCropMarks={() => setShowCropMarks((v) => !v)}
                  showCornerGuide={showCornerGuide}
                  onToggleCornerGuide={() => setShowCornerGuide((v) => !v)}
                  inkMode={inkMode}
                  onChangeInkMode={setInkMode}
                  tightCut={tightCut}
                  onToggleTightCut={() => setTightCut((v) => !v)}
                  printLayoutMode={printLayoutMode}
                  onChangePrintLayoutMode={setPrintLayoutMode}
                  worksheetDuplexMode={worksheetDuplexMode}
                  onChangeWorksheetDuplexMode={setWorksheetDuplexMode}
                  currentPageIdx={currentPageIdx}
                  onChangeCurrentPageIdx={setCurrentPageIdx}
                  onTriggerPrint={handlePrint}
                  accessMode="teacher"
                />
              </div>
            )}

            {teacherSubTab === 'blog' && (
              <div className="max-w-[1200px] mx-auto px-2 sm:px-6 py-3">
                <BlogStudioView
                  decks={decks}
                  activeUnit={activeUnit}
                  onOpenFullPrint={(unit) => {
                    switchUnit(unit);
                    setPrintLayoutMode('worksheet_2up');
                    setInkMode('ink_saver');
                    setWorksheetDuplexMode('booklet');
                    setTeacherSubTab('full_print');
                  }}
                />
              </div>
            )}

            {teacherSubTab === 'youtube' && (
              <div className="max-w-[1200px] mx-auto px-2 sm:px-6 py-3">
                <YouTubeStudioView fractionCards={decks['3-2-4']} />
              </div>
            )}

            {teacherSubTab === 'handwriting' && (
              <div className="max-w-[1200px] mx-auto px-2 sm:px-6 py-3">
                <HandwritingCardCreator
                  activeUnit={activeUnit}
                  decks={decks}
                  customCardsByUnit={customCardsByUnit}
                  onAddCustomCard={handleAddCustomCard}
                  onDeleteCustomCard={handleDeleteCustomCard}
                  onOpenGalleryForUnit={(uid) => {
                    switchUnit(uid);
                    setGradeFilter('ALL');
                    setActiveView('gallery');
                  }}
                  onOpenPrintForUnit={(uid) => {
                    switchUnit(uid);
                    setTeacherSubTab('full_print');
                  }}
                />
              </div>
            )}
          </div>
        )}
      </main>

      {/* Bottom Footer (Learner & Print View, hidden in Admin & Print) */}
      {!(activeView === 'haebol' && isTeacherUnlocked) && (
        <footer className="no-print border-t border-slate-200 bg-white">
          <div className="max-w-[1200px] mx-auto px-3 sm:px-6 py-4 text-center text-xs text-slate-500 font-body">
            졸라수학맨 haebol.com | 수학포카, 어디까지 모아 봤니
          </div>
        </footer>
      )}

      {/* Tap-to-Zoom Single Card Modal (2열 / 3열) */}
      {zoomedCard && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${zoomedCard.title} 확대 보기`}
          className="no-print fixed inset-0 z-50 bg-slate-900/70 flex items-center justify-center p-4"
          onClick={() => setZoomedCard(null)}
        >
          <div
            className="relative flex flex-col items-center gap-2"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="확대 닫기"
              onClick={() => setZoomedCard(null)}
              className="self-end w-8 h-8 border-2 border-slate-900 bg-white hover:bg-slate-100 text-slate-900 inline-flex items-center justify-center shadow-md cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="shadow-2xl">
              <ConceptPhotocard card={zoomedCard} widthPx={zoomedCardWidth} />
            </div>
          </div>
        </div>
      )}

      {/* Password Modal for Hidden 해볼쌤전용 Tab */}
      {showPasswordModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="teacher-pw-title"
          className="no-print fixed inset-0 z-50 bg-slate-900/50 flex items-center justify-center p-4"
          onClick={() => setShowPasswordModal(false)}
        >
          <div
            className="w-full max-w-[340px] bg-white border-2 border-slate-900 p-5 space-y-4 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-violet-700" />
                <h2
                  id="teacher-pw-title"
                  className="font-game text-lg text-slate-900"
                >
                  해볼쌤 전용 입장
                </h2>
              </div>
              <button
                type="button"
                aria-label="닫기"
                onClick={() => setShowPasswordModal(false)}
                className="p-1 text-slate-500 hover:text-slate-900 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handlePasswordSubmit} className="space-y-3">
              <div className="space-y-1.5">
                <label
                  htmlFor="teacher-pw-input"
                  className="block text-xs font-bold text-slate-700"
                >
                  비밀번호를 입력하세요
                </label>
                <input
                  id="teacher-pw-input"
                  ref={passwordInputRef}
                  type="password"
                  autoComplete="off"
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    if (passwordError) setPasswordError('');
                  }}
                  placeholder="비밀번호"
                  className="w-full px-3 py-2 border-2 border-slate-900 bg-white text-sm font-mono-num focus:outline-none focus:border-violet-600"
                />
                {passwordError && (
                  <p className="text-xs font-bold text-rose-600">{passwordError}</p>
                )}
              </div>

              <div className="flex items-center justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="px-3.5 py-2 border border-slate-900 bg-white hover:bg-slate-50 text-xs font-bold text-slate-800 cursor-pointer"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border-2 border-slate-900 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold cursor-pointer"
                >
                  확인
                </button>
              </div>
            </form>
          </div>
        </div>
      )}



      {/* Dynamic @page orientation for Portrait (Original/3x3) vs Landscape (1/2 Worksheet) */}
      <style>{`@media print { @page { size: A4 ${isWorksheetMode ? 'landscape' : 'portrait'}; margin: 0; } }`}</style>

      {/* Hidden millimeter-exact A4 sheet(s) rendered only during @media print */}
      <div className="hidden print-only-sheet">
        {isSingleOriginal
          ? originalPrintList.map((card, idx) => (
              <A4OriginalCardCanvas
                key={card.id}
                card={card}
                activeUnit={activeUnit}
                inkMode={inkMode}
                pageLabel={
                  originalPrintList.length > 1
                    ? `${idx + 1}/${originalPrintList.length}`
                    : undefined
                }
              />
            ))
          : isWorksheetMode
          ? worksheetPrintList.map((spread, idx) => (
              <A4LandscapeWorksheetCanvas
                key={idx}
                spread={spread}
                activeUnit={activeUnit}
                duplexMode={worksheetDuplexMode}
                inkMode={inkMode}
              />
            ))
          : photocardPrintList.map((pageCards, idx) => (
              <A4SheetCanvas
                key={idx}
                cardsToPrint={pageCards}
                activeUnit={activeUnit}
                widthMm={activePreset.widthMm}
                heightMm={activePreset.heightMm}
                showCropMarks={showCropMarks}
                showCornerGuide={showCornerGuide}
                inkMode={inkMode}
                tightCut={tightCut}
                pageLabel={
                  photocardPrintList.length > 1
                    ? `${idx + 1}/${photocardPrintList.length}페이지`
                    : undefined
                }
              />
            ))}
      </div>
    </div>
  );
}
