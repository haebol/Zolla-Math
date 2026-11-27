import { EpisodeSceneType } from '../types/card';

export type CartoonSfxCue =
  | 'whoosh'
  | 'boing'
  | 'bonk'
  | 'zap'
  | 'chop'
  | 'pop'
  | 'ufo'
  | 'ding'
  | 'fanfare';

interface FractionVideoBeat {
  id: 'hook' | 'comedy' | 'concept' | 'outro';
  labelKo: string;
  startSec: number;
  endSec: number;
  sfx: CartoonSfxCue;
}

interface FocusPoint {
  /** X coordinate inside JollamanComicScene viewBox (0..240) */
  x: number;
  /** Y coordinate inside JollamanComicScene viewBox (0..230) */
  y: number;
  /** Spotlight radius inside viewBox */
  r: number;
}

interface BodyTypewriterCallout {
  /** X inside JollamanComicScene viewBox (0..240) */
  x: number;
  /** Y inside JollamanComicScene viewBox (0..230) */
  y: number;
  /** Text revealed character-by-character inside the card body */
  text: string;
  startSec: number;
  typeDurationSec?: number;
  align?: 'left' | 'center';
  color?: string;
  bg?: string;
  fontSize?: number;
}

export interface FractionVideoScript {
  cardId: string;
  cardCode: string;
  sceneType: EpisodeSceneType;
  hookEn: string;
  hookKo: string;
  comicReactionEn: string;
  conceptHeadlineEn: string;
  conceptDefEn: string;
  conceptDefKo: string;
  voiceKeywordEn: string;
  hangulWordTag: string;
  denominator: number;
  numerator: number;
  whole: number;
  durationSec: number;
  beat2Focus: FocusPoint;
  beat3Focus: FocusPoint;
  bodyCallouts: BodyTypewriterCallout[];
  beats: FractionVideoBeat[];
}

const DEFAULT_BEATS = (sfx2: CartoonSfxCue): FractionVideoBeat[] => [
  { id: 'hook', labelKo: '도입', startSec: 0, endSec: 2.5, sfx: 'whoosh' },
  { id: 'comedy', labelKo: '장면', startSec: 2.5, endSec: 6.5, sfx: sfx2 },
  { id: 'concept', labelKo: '핵심', startSec: 6.5, endSec: 10.0, sfx: 'ding' },
  { id: 'outro', labelKo: '마무리', startSec: 10.0, endSec: 12.0, sfx: 'pop' },
];

/**
 * Curated 14 Global-Ready Fraction Cards (졸라한글맨 글로벌 보조용)
 * - 한국어 문장 설명이 과도하거나 국내 교육과정 안내용인 6장(00, 05, 11, 13, 18, 19) 제외
 * - 그림/숫자/슬랩스틱 + 핵심 한글 단어 1~2개만으로 직관 이해되는 14장 선별
 */
export const FRACTION_VIDEO_SCRIPTS: Record<string, FractionVideoScript> = {
  'frac-sp1': {
    cardId: 'frac-sp1',
    cardCode: '3-2-4-01',
    sceneType: 'intro_mother_baby',
    hookEn: 'PIGGYBACK FRACTION!',
    hookKo: '어부바 분수 · 분자 · 분모',
    comicReactionEn: 'HOP!',
    conceptHeadlineEn: 'NUMERATOR / DENOMINATOR',
    conceptDefEn: 'Baby = 분자 [bun-ja] · Mom = 분모 [bun-mo]',
    conceptDefKo: '위=아기(분자) · 아래=엄마(분모)',
    voiceKeywordEn: 'Baby on top, Mom on bottom',
    hangulWordTag: '분자 · 분모',
    denominator: 4,
    numerator: 1,
    whole: 0,
    durationSec: 12,
    beat2Focus: { x: 58, y: 124, r: 56 },
    beat3Focus: { x: 175, y: 166, r: 52 },
    bodyCallouts: [
      { x: 16, y: 24, text: '분 = DIVIDE!', startSec: 0.4, align: 'left', color: '#B45309', bg: '#FFFBEB', fontSize: 12.5 },
      { x: 136, y: 74, text: 'BABY = 분자', startSec: 2.5, align: 'left', color: '#EA580C', bg: '#FFFBEB', fontSize: 11.5 },
      { x: 136, y: 110, text: 'MOM = 분모', startSec: 4.1, align: 'left', color: '#1D4ED8', bg: '#FFFBEB', fontSize: 11.5 },
      { x: 175, y: 152, text: '분자 (BABY)', startSec: 6.5, align: 'center', color: '#EA580C', bg: '#FFFFFF', fontSize: 10.5 },
      { x: 175, y: 180, text: '분모 (MOM)', startSec: 7.4, align: 'center', color: '#1D4ED8', bg: '#FFFFFF', fontSize: 10.5 },
    ],
    beats: DEFAULT_BEATS('boing'),
  },
  'frac-trap': {
    cardId: 'frac-trap',
    cardCode: '3-2-4-04',
    sceneType: 'equal_parts_trap',
    hookEn: 'UNFAIR PIZZA TRAP!',
    hookKo: '똑같이 나누기 함정',
    comicReactionEn: 'NO FAIR!',
    conceptHeadlineEn: 'MUST BE EQUAL PARTS!',
    conceptDefEn: 'Same Size Slices = 분수 [bun-su]',
    conceptDefKo: '크기가 똑같아야 진짜 분수!',
    voiceKeywordEn: 'Equal parts',
    hangulWordTag: '분수',
    denominator: 3,
    numerator: 1,
    whole: 0,
    durationSec: 12,
    beat2Focus: { x: 75, y: 115, r: 54 },
    beat3Focus: { x: 175, y: 120, r: 52 },
    bodyCallouts: [
      { x: 120, y: 20, text: 'IS THIS REALLY 1/3?!', startSec: 0.4, align: 'center', color: '#DC2626', bg: '#FFFBEB', fontSize: 11.5 },
      { x: 64, y: 186, text: 'UNFAIR!!', startSec: 2.6, align: 'center', color: '#DC2626', bg: '#FFFBEB', fontSize: 10.5 },
      { x: 178, y: 105, text: 'EQUAL!', startSec: 4.4, align: 'center', color: '#047857', bg: '#FFFBEB', fontSize: 10.5 },
      { x: 120, y: 214, text: 'SAME SIZE = 분수 [bun-su]', startSec: 6.6, align: 'center', color: '#047857', bg: '#FFFBEB', fontSize: 11 },
    ],
    beats: DEFAULT_BEATS('zap'),
  },
  'frac-sp2-count': {
    cardId: 'frac-sp2-count',
    cardCode: '3-2-4-02',
    sceneType: 'intro_counting_fraction',
    hookEn: 'COUNT WHAT YOU PICK!',
    hookKo: '개수 세기 분수',
    comicReactionEn: 'PICK 4!',
    conceptHeadlineEn: 'PICKED / TOTAL',
    conceptDefEn: '4 out of 6 = 4/6',
    conceptDefKo: '전체 6개 중 4개 고르면 6분의 4',
    voiceKeywordEn: 'Four sixths',
    hangulWordTag: '전체 · 개수',
    denominator: 6,
    numerator: 4,
    whole: 0,
    durationSec: 12,
    beat2Focus: { x: 82, y: 115, r: 58 },
    beat3Focus: { x: 185, y: 150, r: 48 },
    bodyCallouts: [
      { x: 120, y: 19, text: 'PICK 4 CORNS!', startSec: 0.4, align: 'center', color: '#B45309', bg: '#FFFBEB', fontSize: 11.5 },
      { x: 150, y: 102, text: 'COUNT ALL = 6!', startSec: 2.6, align: 'center', color: '#DC2626', bg: '#FFFBEB', fontSize: 11.5 },
      { x: 132, y: 145, text: 'PICK = 4 (분자)', startSec: 6.5, align: 'center', color: '#EA580C', bg: '#FFFFFF', fontSize: 10.2 },
      { x: 132, y: 169, text: 'ALL = 6 (분모)', startSec: 7.4, align: 'center', color: '#1D4ED8', bg: '#FFFFFF', fontSize: 10.2 },
      { x: 120, y: 213, text: 'PICKED / TOTAL = 4/6', startSec: 8.3, align: 'center', color: '#92400E', bg: '#FFFBEB', fontSize: 11 },
    ],
    beats: DEFAULT_BEATS('pop'),
  },
  'frac-01': {
    cardId: 'frac-01',
    cardCode: '3-2-4-03',
    sceneType: 'cluster_bonk',
    hookEn: 'COUNT THE BAGS!',
    hookKo: '묶음의 분수',
    comicReactionEn: 'BONK!',
    conceptHeadlineEn: 'COUNT GROUPS, NOT ITEMS!',
    conceptDefEn: '2 out of 3 Bags (묶음) = 2/3',
    conceptDefKo: '3묶음 중 2묶음 = 3분의 2',
    voiceKeywordEn: 'Two thirds',
    hangulWordTag: '묶음 [muk-keum]',
    denominator: 3,
    numerator: 2,
    whole: 0,
    durationSec: 12,
    beat2Focus: { x: 96, y: 105, r: 58 },
    beat3Focus: { x: 193, y: 149, r: 46 },
    bodyCallouts: [
      { x: 120, y: 16, text: 'WANT 4 CORNS! HOW MANY BAGS?', startSec: 0.4, align: 'center', color: '#FEF08A', bg: '#1E293B', fontSize: 10.3 },
      { x: 58, y: 104, text: 'ZAP!! BONK!', startSec: 2.6, align: 'left', color: '#FACC15', bg: '#1E293B', fontSize: 11.5 },
      { x: 115, y: 179, text: 'NOT 4 BAGS!', startSec: 4.1, align: 'center', color: '#FCA5A5', bg: '#1E293B', fontSize: 9.8 },
      { x: 193, y: 117, text: '2 BAGS!', startSec: 6.5, align: 'center', color: '#EA580C', bg: '#FFFFFF', fontSize: 10.5 },
      { x: 120, y: 212, text: '묶음 [muk-keum] = BAG (2/3)', startSec: 7.6, align: 'center', color: '#FEF08A', bg: '#334155', fontSize: 10.8 },
    ],
    beats: DEFAULT_BEATS('bonk'),
  },
  'frac-03': {
    cardId: 'frac-03',
    cardCode: '3-2-4-07',
    sceneType: 'proper_normal_stickman',
    hookEn: 'PROPER FRACTION!',
    hookKo: '진분수 (황금비율)',
    comicReactionEn: 'FIT!',
    conceptHeadlineEn: 'TOP < BOTTOM (< 1)',
    conceptDefEn: '진분수 [jin-bun-su] = Small Top!',
    conceptDefKo: '분자가 분모보다 작아 1보다 작음',
    voiceKeywordEn: 'Proper fraction',
    hangulWordTag: '진분수',
    denominator: 5,
    numerator: 3,
    whole: 0,
    durationSec: 12,
    beat2Focus: { x: 80, y: 115, r: 56 },
    beat3Focus: { x: 188, y: 122, r: 48 },
    bodyCallouts: [
      { x: 80, y: 28, text: 'SLIM GOLDEN RATIO!', startSec: 0.5, align: 'center', color: '#047857', bg: '#FFFFFF', fontSize: 10.5 },
      { x: 188, y: 147, text: 'HEAD 3 < BODY 5', startSec: 6.5, align: 'center', color: '#EA580C', bg: '#FFFFFF', fontSize: 9.2 },
      { x: 188, y: 163, text: 'LESS THAN 1!', startSec: 7.4, align: 'center', color: '#047857', bg: '#FFFFFF', fontSize: 9.5 },
      { x: 120, y: 211, text: '진분수 [jin-bun-su] = REAL PROPORTION!', startSec: 8.3, align: 'center', color: '#A7F3D0', bg: '#2C3366', fontSize: 10.3 },
    ],
    beats: DEFAULT_BEATS('boing'),
  },
  'frac-04': {
    cardId: 'frac-04',
    cardCode: '3-2-4-08',
    sceneType: 'improper_bighead_1to1',
    hookEn: 'IMPROPER FRACTION!',
    hookKo: '가분수 (대두 꽈당)',
    comicReactionEn: 'CRASH!',
    conceptHeadlineEn: 'TOP ≥ BOTTOM (≥ 1)',
    conceptDefEn: '가분수 [ga-bun-su] = Giant Head!',
    conceptDefKo: '분자와 분모가 같거나 위가 더 큼',
    voiceKeywordEn: 'Improper fraction',
    hangulWordTag: '가분수',
    denominator: 5,
    numerator: 6,
    whole: 0,
    durationSec: 12,
    beat2Focus: { x: 75, y: 110, r: 58 },
    beat3Focus: { x: 174, y: 108, r: 52 },
    bodyCallouts: [
      { x: 58, y: 21, text: '1) HEAD = BODY', startSec: 0.5, align: 'center', color: '#B45309', bg: '#FFFBEB', fontSize: 10.5 },
      { x: 174, y: 21, text: '2) BIG HEAD!! 99kg', startSec: 2.6, align: 'center', color: '#DC2626', bg: '#FFFBEB', fontSize: 10.5 },
      { x: 128, y: 181, text: 'BONK!', startSec: 4.1, align: 'center', color: '#DC2626', bg: '#FFFBEB', fontSize: 9.5 },
      { x: 120, y: 214, text: '가분수 [ga-bun-su] = TOP ≥ BOT', startSec: 6.6, align: 'center', color: '#92400E', bg: '#FFFBEB', fontSize: 10.5 },
    ],
    beats: DEFAULT_BEATS('bonk'),
  },
  'frac-05': {
    cardId: 'frac-05',
    cardCode: '3-2-4-09',
    sceneType: 'whole_equals_one_morph',
    hookEn: 'SAME TOP & BOTTOM!',
    hookKo: '1과 같은 분수',
    comicReactionEn: 'UFO BEAM!',
    conceptHeadlineEn: 'TOP = BOTTOM → 1',
    conceptDefEn: '4/4 Morphs into 자연수 1!',
    conceptDefKo: '위아래 숫자가 같으면 무조건 1!',
    voiceKeywordEn: 'Equals one',
    hangulWordTag: '자연수 1',
    denominator: 4,
    numerator: 4,
    whole: 1,
    durationSec: 12,
    beat2Focus: { x: 110, y: 80, r: 56 },
    beat3Focus: { x: 145, y: 135, r: 54 },
    bodyCallouts: [
      { x: 192, y: 31, text: '= ?', startSec: 0.5, align: 'center', color: '#047857', bg: '#FFFFFF', fontSize: 12 },
      { x: 111, y: 98, text: 'ZAP! POOF!', startSec: 2.7, align: 'center', color: '#FACC15', bg: '#3B4A6B', fontSize: 11 },
      { x: 173, y: 210, text: 'ALL = 1 (자연수)', startSec: 6.6, align: 'center', color: '#5B21B6', bg: '#FFFFFF', fontSize: 10.5 },
    ],
    beats: DEFAULT_BEATS('ufo'),
  },
  'frac-06': {
    cardId: 'frac-06',
    cardCode: '3-2-4-10',
    sceneType: 'mixed_wide_duo',
    hookEn: 'MIXED NUMBER!',
    hookKo: '대분수 (문틀 꽉낌)',
    comicReactionEn: 'STUCK!',
    conceptHeadlineEn: 'WHOLE + PROPER',
    conceptDefEn: '대분수 [dae-bun-su] = 1 + 1/4',
    conceptDefKo: '자연수 + 진분수 나란히 합체!',
    voiceKeywordEn: 'Mixed number',
    hangulWordTag: '대분수',
    denominator: 4,
    numerator: 1,
    whole: 1,
    durationSec: 12,
    beat2Focus: { x: 65, y: 115, r: 56 },
    beat3Focus: { x: 185, y: 125, r: 50 },
    bodyCallouts: [
      { x: 152, y: 20, text: 'WHICH ONE IS FAKE?', startSec: 0.5, align: 'center', color: '#DC2626', bg: '#FFFFFF', fontSize: 9.8 },
      { x: 188, y: 94, text: 'STUCK!!', startSec: 2.8, align: 'center', color: '#DC2626', bg: '#ECFDF5', fontSize: 10.5 },
      { x: 188, y: 136, text: 'NO BIG HEADS!', startSec: 4.2, align: 'center', color: '#047857', bg: '#ECFDF5', fontSize: 9.8 },
      { x: 120, y: 213, text: '대분수 [dae-bun-su] = WHOLE + PROPER', startSec: 6.6, align: 'center', color: '#047857', bg: '#ECFDF5', fontSize: 10 },
    ],
    beats: DEFAULT_BEATS('bonk'),
  },
  'frac-07': {
    cardId: 'frac-07',
    cardCode: '3-2-4-11',
    sceneType: 'mixed_to_improper_chop',
    hookEn: 'MIXED → IMPROPER!',
    hookKo: '대분수 → 가분수 변신',
    comicReactionEn: 'HI-YA!',
    conceptHeadlineEn: 'BOTTOM × WHOLE + TOP',
    conceptDefEn: '3×1 + 2 = 5 → 5/3!',
    conceptDefKo: '분모 그대로, 3×1+2=5!',
    voiceKeywordEn: 'Multiply then add',
    hangulWordTag: '변신 [byeon-sin]',
    denominator: 3,
    numerator: 2,
    whole: 1,
    durationSec: 12,
    beat2Focus: { x: 115, y: 95, r: 60 },
    beat3Focus: { x: 135, y: 190, r: 56 },
    bodyCallouts: [
      { x: 40, y: 34, text: 'CHOP! 3 PCS!', startSec: 2.6, align: 'center', color: '#EF4444', bg: '#F5F3FF', fontSize: 10.2 },
      { x: 188, y: 19, text: 'MY HEAD!!', startSec: 4.1, align: 'center', color: '#DC2626', bg: '#F5F3FF', fontSize: 10.5 },
      { x: 120, y: 152, text: '변신 [byeon-sin] = MORPH!', startSec: 6.6, align: 'center', color: '#7C3AED', bg: '#FFFFFF', fontSize: 10.2 },
    ],
    beats: DEFAULT_BEATS('chop'),
  },
  'frac-08': {
    cardId: 'frac-08',
    cardCode: '3-2-4-12',
    sceneType: 'improper_to_mixed_drop',
    hookEn: 'IMPROPER → MIXED!',
    hookKo: '가분수 → 대분수 변신',
    comicReactionEn: 'DROP!',
    conceptHeadlineEn: 'TOP ÷ BOTTOM',
    conceptDefEn: '7 ÷ 2 = 3 R1 → 3 1/2',
    conceptDefKo: '몫(3)은 앞으로, 나머지(1)는 위로!',
    voiceKeywordEn: 'Divide top by bottom',
    hangulWordTag: '몫 · 나머지',
    denominator: 2,
    numerator: 7,
    whole: 3,
    durationSec: 12,
    beat2Focus: { x: 65, y: 95, r: 54 },
    beat3Focus: { x: 175, y: 145, r: 54 },
    bodyCallouts: [
      { x: 54, y: 21, text: '7 ÷ 2!', startSec: 0.4, align: 'center', color: '#1D4ED8', bg: '#F0F9FF', fontSize: 11.5 },
      { x: 148, y: 19, text: '몫 [mok] → FRONT!', startSec: 2.6, align: 'center', color: '#DC2626', bg: '#F0F9FF', fontSize: 10.5 },
      { x: 160, y: 155, text: 'KEEP BOTTOM!', startSec: 4.3, align: 'center', color: '#059669', bg: '#F0F9FF', fontSize: 10 },
      { x: 148, y: 196, text: 'REM → TOP!', startSec: 6.6, align: 'center', color: '#2563EB', bg: '#F0F9FF', fontSize: 10 },
      { x: 120, y: 217, text: '7÷2 = 3 R1 → 3 1/2!', startSec: 7.7, align: 'center', color: '#1E40AF', bg: '#F0F9FF', fontSize: 10.5 },
    ],
    beats: DEFAULT_BEATS('boing'),
  },
  'frac-09': {
    cardId: 'frac-09',
    cardCode: '3-2-4-13',
    sceneType: 'compare_same_type',
    hookEn: 'COMPARE FRACTIONS!',
    hookKo: '분모가 같은 크기 비교',
    comicReactionEn: 'WHO WINS?',
    conceptHeadlineEn: 'WHOLE FIRST, THEN TOP!',
    conceptDefEn: '비교 [bi-gyo] · 2 3/5 > 1 4/5',
    conceptDefKo: '자연수가 크면 승! 같으면 분자 비교!',
    voiceKeywordEn: 'Compare whole first',
    hangulWordTag: '비교',
    denominator: 5,
    numerator: 3,
    whole: 2,
    durationSec: 12,
    beat2Focus: { x: 120, y: 100, r: 62 },
    beat3Focus: { x: 120, y: 175, r: 56 },
    bodyCallouts: [
      { x: 120, y: 16, text: 'BIGGER TOP WINS!', startSec: 0.6, align: 'center', color: '#EA580C', bg: '#FFF7ED', fontSize: 10.2 },
      { x: 120, y: 89, text: 'BIGGER WHOLE WINS!', startSec: 3.1, align: 'center', color: '#047857', bg: '#FFF7ED', fontSize: 10.2 },
      { x: 120, y: 164, text: '비교 [bi-gyo] = SAME 2 → CHECK TOP!', startSec: 6.6, align: 'center', color: '#DC2626', bg: '#FFF7ED', fontSize: 9.6 },
    ],
    beats: DEFAULT_BEATS('bonk'),
  },
  'frac-11': {
    cardId: 'frac-11',
    cardCode: '3-2-4-15',
    sceneType: 'numberline_basic',
    hookEn: 'FRACTION NUMBER LINE!',
    hookKo: '분수와 수직선',
    comicReactionEn: 'STEP!',
    conceptHeadlineEn: 'SPACES BETWEEN 0 AND 1',
    conceptDefEn: '수직선 [su-jik-seon] · 2/3',
    conceptDefKo: '0~1 사이 3칸 중 2칸 = 3분의 2',
    voiceKeywordEn: 'Number line',
    hangulWordTag: '수직선',
    denominator: 3,
    numerator: 2,
    whole: 0,
    durationSec: 12,
    beat2Focus: { x: 120, y: 120, r: 62 },
    beat3Focus: { x: 155, y: 165, r: 52 },
    bodyCallouts: [
      { x: 110, y: 18, text: 'COUNT SPACES 0 → 1!', startSec: 0.6, align: 'center', color: '#EA580C', bg: '#EFF6FF', fontSize: 10.5 },
      { x: 202, y: 26, text: '1/2 · 1/3 · 2/3', startSec: 6.8, align: 'center', color: '#1D4ED8', bg: '#EFF6FF', fontSize: 9.5 },
      { x: 120, y: 217, text: '수직선 [su-jik-seon] = NUMBER LINE', startSec: 7.8, align: 'center', color: '#1E40AF', bg: '#EFF6FF', fontSize: 10.5 },
    ],
    beats: DEFAULT_BEATS('boing'),
  },
  'frac-12': {
    cardId: 'frac-12',
    cardCode: '3-2-4-16',
    sceneType: 'numberline_mixed_stride',
    hookEn: 'BIG LEAP, SMALL HOP!',
    hookKo: '대분수와 수직선',
    comicReactionEn: 'STRIDE!',
    conceptHeadlineEn: 'WHOLE LEAP + FRACTION HOP',
    conceptDefEn: '0 → 1 성큼 Leap + 1/3 = 1 1/3',
    conceptDefKo: '자연수는 성큼, 남은 분수는 살금!',
    voiceKeywordEn: 'Big leap small hop',
    hangulWordTag: '성큼 [seong-keum]',
    denominator: 3,
    numerator: 1,
    whole: 1,
    durationSec: 12,
    beat2Focus: { x: 85, y: 115, r: 58 },
    beat3Focus: { x: 165, y: 145, r: 54 },
    bodyCallouts: [
      { x: 120, y: 22, text: 'WHOLE = BIG LEAP!', startSec: 0.5, align: 'center', color: '#047857', bg: '#ECFDF5', fontSize: 11.5 },
      { x: 78, y: 53, text: '성큼 [seong-keum] LEAP!', startSec: 2.7, align: 'center', color: '#059669', bg: '#ECFDF5', fontSize: 10.2 },
      { x: 152, y: 123, text: 'TIPTOE +1/3!', startSec: 4.3, align: 'center', color: '#EA580C', bg: '#ECFDF5', fontSize: 10.2 },
      { x: 120, y: 212, text: '1 LEAP + 1/3 HOP = 1 1/3!', startSec: 6.6, align: 'center', color: '#047857', bg: '#ECFDF5', fontSize: 11 },
    ],
    beats: DEFAULT_BEATS('boing'),
  },
  'frac-13': {
    cardId: 'frac-13',
    cardCode: '3-2-4-17',
    sceneType: 'numberline_boss_trap',
    hookEn: 'NUMBER LINE TRAP!',
    hookKo: '수직선 함정 주의',
    comicReactionEn: 'TRAP!',
    conceptHeadlineEn: 'ONLY COUNT 0 TO 1!',
    conceptDefEn: '함정 [ham-jeong] · 4 Spaces = 3/4!',
    conceptDefKo: '끝까지 세면 땡! 0~1 사이 칸 수만!',
    voiceKeywordEn: 'Count zero to one',
    hangulWordTag: '함정 [ham-jeong]',
    denominator: 4,
    numerator: 3,
    whole: 1,
    durationSec: 12,
    beat2Focus: { x: 105, y: 110, r: 58 },
    beat3Focus: { x: 145, y: 165, r: 56 },
    bodyCallouts: [
      { x: 120, y: 23, text: 'TRAP! ONLY COUNT 0 → 1!', startSec: 0.5, align: 'center', color: '#DC2626', bg: '#FFF7ED', fontSize: 11.5 },
      { x: 33, y: 62, text: 'TRAP:', startSec: 2.8, align: 'center', color: '#991B1B', bg: '#FEE2E2', fontSize: 10 },
      { x: 120, y: 212, text: '함정 [ham-jeong] = TRAP! (3/4)', startSec: 6.6, align: 'center', color: '#B45309', bg: '#FFF7ED', fontSize: 10.8 },
    ],
    beats: DEFAULT_BEATS('zap'),
  },
  'frac-14': {
    cardId: 'frac-14',
    cardCode: '3-2-4-05',
    sceneType: 'unit_fraction_lego',
    hookEn: 'UNIT FRACTION LEGO!',
    hookKo: '단위분수 레고 합체',
    comicReactionEn: 'CLICK!',
    conceptHeadlineEn: 'STACK 1/5 BLOCKS',
    conceptDefEn: '단위분수 · 3 of 1/5 = 3/5',
    conceptDefKo: '1/5 블록이 3개 모이면 3/5!',
    voiceKeywordEn: 'Unit fraction',
    hangulWordTag: '단위분수',
    denominator: 5,
    numerator: 3,
    whole: 0,
    durationSec: 12,
    beat2Focus: { x: 85, y: 120, r: 56 },
    beat3Focus: { x: 180, y: 140, r: 50 },
    bodyCallouts: [
      { x: 120, y: 22, text: 'UNIT FRACTION LEGO!', startSec: 0.5, align: 'center', color: '#1D4ED8', bg: '#EFF6FF', fontSize: 11.5 },
      { x: 128, y: 37, text: 'CLICK!', startSec: 2.7, align: 'center', color: '#EA580C', bg: '#EFF6FF', fontSize: 10 },
      { x: 158, y: 150, text: 'HOW MANY? →', startSec: 4.3, align: 'center', color: '#1D4ED8', bg: '#FFFFFF', fontSize: 8.8 },
      { x: 204, y: 150, text: '3!', startSec: 5.2, align: 'center', color: '#DC2626', bg: '#FEF08A', fontSize: 12 },
      { x: 150, y: 182, text: 'TOP NUMBER = COUNT!', startSec: 6.6, align: 'center', color: '#EA580C', bg: '#FFFFFF', fontSize: 9.2 },
      { x: 120, y: 214, text: '단위분수 [dan-wi-bun-su] = 1/N', startSec: 7.7, align: 'center', color: '#1E40AF', bg: '#EFF6FF', fontSize: 10.5 },
    ],
    beats: DEFAULT_BEATS('pop'),
  },
};
