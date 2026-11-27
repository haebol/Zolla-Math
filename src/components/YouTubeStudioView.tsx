import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Film,
  Layers,
  Loader2,
  Mic,
  MicOff,
  Music,
  Pause,
  Play,
  RotateCcw,
  Square,
  Subtitles,
  Volume2,
  VolumeX,
} from 'lucide-react';
import {
  FRACTION_VIDEO_SCRIPTS,
  FractionVideoScript,
} from '../data/fractionVideoScripts';
import { INITIAL_FRACTION_CARDS } from '../data/fractionCards';
import { cartoonAudio } from '../utils/cartoonAudioEngine';
import {
  rasterizeCardSvgToCanvas,
  renderFractionVideoFrame,
  VideoAspectFormat,
} from '../utils/fractionVideoRenderer';
import { ConceptCard } from '../types/card';
import { JollamanComicScene } from './JollamanComicScene';

interface YouTubeStudioViewProps {
  fractionCards?: ConceptCard[];
}

export const YouTubeStudioView: React.FC<YouTubeStudioViewProps> = ({
  fractionCards = INITIAL_FRACTION_CARDS,
}) => {
  const orderedCards = useMemo(
    () => fractionCards.filter((c) => Boolean(FRACTION_VIDEO_SCRIPTS[c.id])),
    [fractionCards]
  );

  const [scriptsMap, setScriptsMap] = useState<Record<string, FractionVideoScript>>(
    () => ({ ...FRACTION_VIDEO_SCRIPTS })
  );
  const [selectedCardId, setSelectedCardId] = useState<string>(
    orderedCards[0]?.id ?? 'frac-sp1'
  );
  const [format, setFormat] = useState<VideoAspectFormat>('9:16');
  const [stitchUnitMode, setStitchUnitMode] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [bgmEnabled, setBgmEnabled] = useState<boolean>(true);
  const [sfxEnabled, setSfxEnabled] = useState<boolean>(true);
  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(false);
  const [showKoreanSub, setShowKoreanSub] = useState<boolean>(true);
  const [showSafeZoneGuide, setShowSafeZoneGuide] = useState<boolean>(true);
  const [artworkTick, setArtworkTick] = useState<number>(0);

  const [exportState, setExportState] = useState<{
    busy: boolean;
    progress: number;
  }>({ busy: false, progress: 0 });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const svgContainerRef = useRef<HTMLDivElement>(null);
  const artworkCacheRef = useRef<Record<string, HTMLCanvasElement>>({});
  const rafRef = useRef<number | null>(null);
  const lastFrameTsRef = useRef<number | null>(null);
  const triggeredCuesRef = useRef<Set<string>>(new Set());
  const recorderRef = useRef<MediaRecorder | null>(null);
  const exportCancelledRef = useRef<boolean>(false);

  const activeScript =
    scriptsMap[selectedCardId] ?? FRACTION_VIDEO_SCRIPTS['frac-sp1'];

  const activeCardObj =
    orderedCards.find((c) => c.id === selectedCardId) ?? orderedCards[0];

  const activeIdx = Math.max(
    0,
    orderedCards.findIndex((c) => c.id === selectedCardId)
  );

  const canvasWidth = format === '9:16' ? 720 : 1280;
  const canvasHeight = format === '9:16' ? 1280 : 720;

  // Rasterize real JollamanComicScene SVG for a given cardId (cached)
  const ensureCardArtwork = useCallback(async (cardId: string) => {
    if (artworkCacheRef.current[cardId]) {
      return artworkCacheRef.current[cardId];
    }
    const host = svgContainerRef.current;
    if (!host) return null;
    const svg = host.querySelector(
      `[data-studio-card="${cardId}"] svg`
    ) as SVGSVGElement | null;
    if (!svg) return null;
    const bmp = await rasterizeCardSvgToCanvas(svg, 720, 690);
    artworkCacheRef.current[cardId] = bmp;
    return bmp;
  }, []);

  // Pre-rasterize currently selected card whenever it changes
  useEffect(() => {
    let cancelled = false;
    void (async () => {
      await ensureCardArtwork(selectedCardId);
      if (!cancelled) setArtworkTick((v) => v + 1);
    })();
    return () => {
      cancelled = true;
    };
  }, [selectedCardId, ensureCardArtwork]);

  // Draw current frame
  const drawAtTime = useCallback(
    (script: FractionVideoScript, tSec: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      renderFractionVideoFrame(ctx, canvasWidth, canvasHeight, {
        script,
        cardArtwork: artworkCacheRef.current[script.cardId] ?? null,
        timeSec: tSec,
        format,
        showKoreanSub,
      });
    },
    [canvasWidth, canvasHeight, format, showKoreanSub]
  );

  useEffect(() => {
    drawAtTime(activeScript, currentTime);
  }, [activeScript, currentTime, artworkTick, drawAtTime]);

  const checkAudioCues = useCallback(
    (script: FractionVideoScript, prevT: number, nextT: number) => {
      script.beats.forEach((beat) => {
        const key = `${script.cardId}:${beat.id}`;
        if (
          !triggeredCuesRef.current.has(key) &&
          nextT >= beat.startSec &&
          prevT <= beat.startSec + 0.35
        ) {
          triggeredCuesRef.current.add(key);
          if (sfxEnabled) {
            cartoonAudio.playSfx(beat.sfx);
          }
          if (voiceEnabled && beat.id === 'concept') {
            cartoonAudio.speakEnglishKeyword(script.voiceKeywordEn);
          }
        }
      });
    },
    [sfxEnabled, voiceEnabled]
  );

  useEffect(() => {
    if (!isPlaying) {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      lastFrameTsRef.current = null;
      cartoonAudio.stopBgm();
      return;
    }

    if (bgmEnabled) cartoonAudio.startBgm();
    else cartoonAudio.stopBgm();

    const tick = (now: number) => {
      if (lastFrameTsRef.current === null) {
        lastFrameTsRef.current = now;
      }
      const dt = ((now - lastFrameTsRef.current) / 1000) * playbackRate;
      lastFrameTsRef.current = now;

      setCurrentTime((prev) => {
        const next = prev + dt;
        checkAudioCues(activeScript, prev, next);

        if (next >= activeScript.durationSec) {
          triggeredCuesRef.current.clear();
          if (stitchUnitMode) {
            const nextCardIdx = (activeIdx + 1) % orderedCards.length;
            const nextId = orderedCards[nextCardIdx].id;
            void ensureCardArtwork(nextId);
            setSelectedCardId(nextId);
          }
          return 0;
        }
        return next;
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      cartoonAudio.stopBgm();
    };
  }, [
    isPlaying,
    playbackRate,
    bgmEnabled,
    activeScript,
    activeIdx,
    orderedCards,
    stitchUnitMode,
    checkAudioCues,
    ensureCardArtwork,
  ]);

  useEffect(() => {
    return () => {
      cartoonAudio.stopBgm();
      exportCancelledRef.current = true;
      if (recorderRef.current && recorderRef.current.state !== 'inactive') {
        recorderRef.current.stop();
      }
    };
  }, []);

  const handleTogglePlay = () => {
    if (!isPlaying && currentTime >= activeScript.durationSec - 0.05) {
      triggeredCuesRef.current.clear();
      setCurrentTime(0);
    }
    setIsPlaying((v) => !v);
  };

  const handleJumpBeat = (startSec: number) => {
    triggeredCuesRef.current.clear();
    setCurrentTime(startSec);
    drawAtTime(activeScript, startSec);
  };

  const handleSelectCard = (cardId: string) => {
    triggeredCuesRef.current.clear();
    setSelectedCardId(cardId);
    setCurrentTime(0);
  };

  const updateActiveScriptField = (
    field: keyof Pick<
      FractionVideoScript,
      'hookEn' | 'hookKo' | 'conceptHeadlineEn' | 'conceptDefEn' | 'conceptDefKo'
    >,
    value: string
  ) => {
    setScriptsMap((prev) => ({
      ...prev,
      [activeScript.cardId]: {
        ...activeScript,
        [field]: value,
      },
    }));
  };

  const updateBodyCalloutText = (calloutIdx: number, value: string) => {
    setScriptsMap((prev) => {
      const nextCallouts = activeScript.bodyCallouts.map((c, i) =>
        i === calloutIdx ? { ...c, text: value } : c
      );
      return {
        ...prev,
        [activeScript.cardId]: {
          ...activeScript,
          bodyCallouts: nextCallouts,
        },
      };
    });
  };

  const handleResetScript = () => {
    const initial = FRACTION_VIDEO_SCRIPTS[activeScript.cardId];
    if (!initial) return;
    setScriptsMap((prev) => ({
      ...prev,
      [activeScript.cardId]: {
        ...initial,
        bodyCallouts: initial.bodyCallouts.map((c) => ({ ...c })),
      },
    }));
  };

  const handleExportVideo = async () => {
    if (exportState.busy || !canvasRef.current) return;
    const canvas = canvasRef.current;
    if (typeof MediaRecorder === 'undefined' || !canvas.captureStream) return;

    setIsPlaying(false);
    exportCancelledRef.current = false;

    const episodeList = stitchUnitMode
      ? orderedCards.map((c) => scriptsMap[c.id] ?? FRACTION_VIDEO_SCRIPTS[c.id])
      : [activeScript];

    // Pre-cache all needed card SVG artwork before starting recording
    for (const ep of episodeList) {
      await ensureCardArtwork(ep.cardId);
    }

    const totalSec = episodeList.reduce((sum, s) => sum + s.durationSec, 0);

    const stream = canvas.captureStream(30);
    const audioTrack = cartoonAudio.getRecordingAudioTrack();
    if (audioTrack) stream.addTrack(audioTrack);

    const mimeCandidates = [
      'video/webm;codecs=vp9,opus',
      'video/webm;codecs=vp8,opus',
      'video/webm',
    ];
    const mimeType =
      mimeCandidates.find((m) => MediaRecorder.isTypeSupported(m)) ?? 'video/webm';

    const chunks: BlobPart[] = [];
    const recorder = new MediaRecorder(stream, {
      mimeType,
      videoBitsPerSecond: 3_500_000,
    });
    recorderRef.current = recorder;

    recorder.ondataavailable = (ev) => {
      if (ev.data && ev.data.size > 0) chunks.push(ev.data);
    };

    const completedPromise = new Promise<Blob>((resolve) => {
      recorder.onstop = () => {
        resolve(new Blob(chunks, { type: mimeType }));
      };
    });

    setExportState({ busy: true, progress: 0 });
    if (bgmEnabled) cartoonAudio.startBgm();
    recorder.start(200);

    const startWall = performance.now();

    await new Promise<void>((resolveLoop) => {
      const fired = new Set<string>();
      const stepFrame = () => {
        if (exportCancelledRef.current) {
          resolveLoop();
          return;
        }
        const elapsedTotal = (performance.now() - startWall) / 1000;
        if (elapsedTotal >= totalSec) {
          resolveLoop();
          return;
        }

        let acc = 0;
        let curScript = episodeList[0];
        let localT = elapsedTotal;
        for (const ep of episodeList) {
          if (elapsedTotal < acc + ep.durationSec) {
            curScript = ep;
            localT = elapsedTotal - acc;
            break;
          }
          acc += ep.durationSec;
        }

        if (sfxEnabled) {
          curScript.beats.forEach((b) => {
            const k = `${curScript.cardId}:${b.id}`;
            if (!fired.has(k) && localT >= b.startSec) {
              fired.add(k);
              cartoonAudio.playSfx(b.sfx);
            }
          });
        }

        drawAtTime(curScript, localT);
        setExportState({
          busy: true,
          progress: Math.min(99, Math.round((elapsedTotal / totalSec) * 100)),
        });
        requestAnimationFrame(stepFrame);
      };
      requestAnimationFrame(stepFrame);
    });

    cartoonAudio.stopBgm();
    if (recorder.state !== 'inactive') recorder.stop();
    const blob = await completedPromise;
    recorderRef.current = null;

    if (!exportCancelledRef.current && blob.size > 0) {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = stitchUnitMode
        ? `졸라수학맨_3-2분수_단원전체_${format.replace(':', 'x')}.webm`
        : `졸라수학맨_${activeScript.cardCode}_${format.replace(':', 'x')}.webm`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 5000);
    }

    setExportState({ busy: false, progress: 0 });
    drawAtTime(activeScript, currentTime);
  };

  const handleCancelExport = () => {
    exportCancelledRef.current = true;
    cartoonAudio.stopBgm();
    if (recorderRef.current && recorderRef.current.state !== 'inactive') {
      recorderRef.current.stop();
    }
    setExportState({ busy: false, progress: 0 });
  };

  return (
    <div className="space-y-3">
      {/* Compact Korean Toolbar (Fits cleanly in 1-2 rows, zero bloated wide buttons) */}
      <div className="bg-white border-2 border-slate-900 px-3 py-2.5 space-y-2">
        {/* Row 1: Card Selector + Format + Mode + Video Save */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-900 mr-1">
              <Film className="w-3.5 h-3.5 text-violet-700" />
              <span>3-2 분수 · 글로벌 ({orderedCards.length}장)</span>
            </span>

            <button
              type="button"
              disabled={exportState.busy || activeIdx <= 0}
              onClick={() => handleSelectCard(orderedCards[activeIdx - 1].id)}
              aria-label="이전 카드"
              className="w-7 h-7 border border-slate-900 bg-white inline-flex items-center justify-center disabled:opacity-35 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <select
              aria-label="분수 카드 선택"
              value={selectedCardId}
              disabled={exportState.busy}
              onChange={(e) => handleSelectCard(e.target.value)}
              className="h-7 px-2 border border-slate-900 bg-white text-xs font-bold text-slate-900 max-w-[215px] cursor-pointer"
            >
              {orderedCards.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.cardCode.slice(-2)}. [{c.badgeLabel}] {c.title.replace(/\[\[(\d+)\/(\d+)\]\]/g, '$2분의 $1')}
                </option>
              ))}
            </select>

            <button
              type="button"
              disabled={exportState.busy || activeIdx >= orderedCards.length - 1}
              onClick={() => handleSelectCard(orderedCards[activeIdx + 1].id)}
              aria-label="다음 카드"
              className="w-7 h-7 border border-slate-900 bg-white inline-flex items-center justify-center disabled:opacity-35 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Format 2-Segment */}
            <div className="inline-flex h-7 border border-slate-900 bg-white ml-1">
              {(
                [
                  { id: '9:16', label: '9:16 쇼츠' },
                  { id: '16:9', label: '16:9 가로' },
                ] as { id: VideoAspectFormat; label: string }[]
              ).map((opt, idx) => (
                <button
                  key={opt.id}
                  type="button"
                  disabled={exportState.busy}
                  onClick={() => setFormat(opt.id)}
                  className={`px-2 text-[11px] font-bold whitespace-nowrap cursor-pointer ${
                    idx > 0 ? 'border-l border-slate-900' : ''
                  } ${
                    format === opt.id
                      ? 'bg-violet-600 text-white'
                      : 'bg-white text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {/* Single vs Unit Stitch */}
            <button
              type="button"
              disabled={exportState.busy}
              onClick={() => setStitchUnitMode((v) => !v)}
              className={`h-7 px-2 border border-slate-900 text-[11px] font-bold inline-flex items-center gap-1 whitespace-nowrap cursor-pointer ${
                stitchUnitMode
                  ? 'bg-slate-900 text-white'
                  : 'bg-white text-slate-800 hover:bg-slate-50'
              }`}
            >
              <Layers className="w-3 h-3" />
              <span>{stitchUnitMode ? `단원 전체(${orderedCards.length}장)` : '1장 쇼츠'}</span>
            </button>
          </div>

          {/* Right Compact Audio/Sub Toggles + Export */}
          <div className="flex flex-wrap items-center gap-1 ml-auto">
            <button
              type="button"
              onClick={() => setBgmEnabled((v) => !v)}
              title="배경음 켜기/끄기"
              className={`h-7 px-2 border border-slate-900 text-[11px] font-bold inline-flex items-center gap-1 whitespace-nowrap cursor-pointer ${
                bgmEnabled ? 'bg-slate-900 text-white' : 'bg-white text-slate-500'
              }`}
            >
              <Music className="w-3 h-3" />
              <span>배경음</span>
            </button>

            <button
              type="button"
              onClick={() => setSfxEnabled((v) => !v)}
              title="효과음 켜기/끄기"
              className={`h-7 px-2 border border-slate-900 text-[11px] font-bold inline-flex items-center gap-1 whitespace-nowrap cursor-pointer ${
                sfxEnabled ? 'bg-slate-900 text-white' : 'bg-white text-slate-500'
              }`}
            >
              {sfxEnabled ? <Volume2 className="w-3 h-3" /> : <VolumeX className="w-3 h-3" />}
              <span>효과음</span>
            </button>

            <button
              type="button"
              onClick={() => setShowKoreanSub((v) => !v)}
              title="영상 속 작은 한글 병기 표시"
              className={`h-7 px-2 border border-slate-900 text-[11px] font-bold inline-flex items-center gap-1 whitespace-nowrap cursor-pointer ${
                showKoreanSub ? 'bg-violet-600 text-white' : 'bg-white text-slate-500'
              }`}
            >
              <Subtitles className="w-3 h-3" />
              <span>한글병기</span>
            </button>

            <button
              type="button"
              onClick={() => setVoiceEnabled((v) => !v)}
              title="영어 핵심 단어 음성"
              className={`h-7 px-2 border border-slate-900 text-[11px] font-bold inline-flex items-center gap-1 whitespace-nowrap cursor-pointer ${
                voiceEnabled ? 'bg-violet-600 text-white' : 'bg-white text-slate-500'
              }`}
            >
              {voiceEnabled ? <Mic className="w-3 h-3" /> : <MicOff className="w-3 h-3" />}
              <span>음성</span>
            </button>

            {exportState.busy ? (
              <button
                type="button"
                onClick={handleCancelExport}
                className="h-7 px-2.5 border border-slate-900 bg-rose-600 hover:bg-rose-700 text-white text-[11px] font-bold inline-flex items-center gap-1 whitespace-nowrap cursor-pointer"
              >
                <Loader2 className="w-3 h-3 animate-spin" />
                <span>중지 {exportState.progress}%</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleExportVideo}
                className="h-7 px-2.5 border border-slate-900 bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-bold inline-flex items-center gap-1 whitespace-nowrap cursor-pointer"
              >
                <Download className="w-3 h-3 text-amber-300" />
                <span>영상 저장</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Compact Two-Zone Studio Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* LEFT: Video Preview Stage + Transport */}
        <div className="lg:col-span-6 bg-slate-900 border-2 border-slate-900 p-3 space-y-2.5">
          <div className="flex items-center justify-between text-[11px] text-slate-300">
            <span className="font-bold">
              {activeScript.cardCode} · {activeCardObj?.title.replace(/\[\[(\d+)\/(\d+)\]\]/g, '$2분의 $1')}
            </span>
            {format === '9:16' && (
              <label className="inline-flex items-center gap-1.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={showSafeZoneGuide}
                  onChange={(e) => setShowSafeZoneGuide(e.target.checked)}
                  className="accent-violet-500 w-3 h-3"
                />
                <span>안전여백 선 (하단 1/3 · 우측)</span>
              </label>
            )}
          </div>

          {/* Canvas Frame */}
          <div className="flex items-center justify-center bg-slate-950 border border-slate-800 p-2.5">
            <div className="relative inline-block">
              <canvas
                ref={canvasRef}
                width={canvasWidth}
                height={canvasHeight}
                className={
                  format === '9:16'
                    ? 'h-[430px] w-auto max-w-full bg-white border border-slate-700'
                    : 'w-full max-w-[540px] h-auto bg-white border border-slate-700'
                }
              />
              {/* Editor-only YouTube Shorts Safe Zone guides (bottom 1/3 + right 15% UI column) */}
              {format === '9:16' && showSafeZoneGuide && (
                <>
                  <div
                    aria-hidden="true"
                    style={{ top: '66.67%' }}
                    className="absolute inset-x-0 bottom-0 border-t-2 border-dashed border-rose-400/85 bg-rose-500/12 pointer-events-none flex items-center justify-center"
                  >
                    <span className="px-2 py-0.5 bg-slate-900/80 text-rose-200 text-[10px] font-bold">
                      하단 1/3 비움 (유튜브 제목·설명)
                    </span>
                  </div>
                  <div
                    aria-hidden="true"
                    style={{ left: '85.5%', top: '40%', bottom: '33.33%' }}
                    className="absolute right-0 border-l-2 border-t-2 border-dashed border-amber-400/85 bg-amber-400/10 pointer-events-none flex items-center justify-center"
                  >
                    <span
                      style={{ writingMode: 'vertical-rl' }}
                      className="px-0.5 py-1.5 bg-slate-900/80 text-amber-200 text-[9px] font-bold tracking-wider"
                    >
                      우측 하단 (좋아요·댓글)
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Compact Playback Controls */}
          <div className="flex items-center justify-between gap-2 text-white">
            <div className="flex items-center gap-1">
              <button
                type="button"
                disabled={exportState.busy}
                onClick={handleTogglePlay}
                className="h-8 px-3 bg-violet-600 hover:bg-violet-500 border border-slate-700 text-xs font-bold inline-flex items-center gap-1 cursor-pointer disabled:opacity-50"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isPlaying ? '일시정지' : '재생'}</span>
              </button>

              <button
                type="button"
                disabled={exportState.busy}
                onClick={() => {
                  setIsPlaying(false);
                  handleJumpBeat(0);
                }}
                aria-label="처음으로"
                title="처음으로"
                className="w-8 h-8 bg-slate-800 hover:bg-slate-700 border border-slate-700 inline-flex items-center justify-center cursor-pointer disabled:opacity-50"
              >
                <Square className="w-3 h-3" />
              </button>

              <div className="inline-flex h-8 border border-slate-700 bg-slate-800 ml-1">
                {[0.75, 1, 1.25].map((spd, idx) => (
                  <button
                    key={spd}
                    type="button"
                    onClick={() => setPlaybackRate(spd)}
                    className={`px-2 text-[11px] font-mono-num font-bold cursor-pointer ${
                      idx > 0 ? 'border-l border-slate-700' : ''
                    } ${
                      playbackRate === spd
                        ? 'bg-amber-400 text-slate-900'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    {spd}x
                  </button>
                ))}
              </div>
            </div>

            <span className="font-mono-num text-xs font-bold text-slate-200 tabular-nums">
              {currentTime.toFixed(1)}초 / {activeScript.durationSec.toFixed(0)}초
            </span>
          </div>

          <input
            type="range"
            aria-label="영상 시간 이동"
            min={0}
            max={activeScript.durationSec}
            step={0.05}
            value={currentTime}
            disabled={exportState.busy}
            onChange={(e) => {
              const v = Number(e.target.value);
              triggeredCuesRef.current.clear();
              setCurrentTime(v);
            }}
            className="w-full accent-violet-500 cursor-pointer"
          />

          <div className="grid grid-cols-4 gap-1">
            {activeScript.beats.map((b) => {
              const active = currentTime >= b.startSec && currentTime < b.endSec;
              return (
                <button
                  key={b.id}
                  type="button"
                  disabled={exportState.busy}
                  onClick={() => handleJumpBeat(b.startSec)}
                  className={`py-1 px-2 border text-center text-[11px] font-bold cursor-pointer ${
                    active
                      ? 'bg-violet-600 border-violet-400 text-white'
                      : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {b.labelKo} ({b.startSec}s)
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT: Compact Subtitle & Card Preview Editor (No Scrolling Overload) */}
        <div className="lg:col-span-6 space-y-3">
          {/* Compact Checkpoint Subtitle Editor */}
          <div className="bg-white border-2 border-slate-900 p-3.5 space-y-2.5">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <div>
                <h3 className="text-xs font-bold text-slate-900">
                  글로벌 자막 편집 (본문 타자기 문구 + 상하단 요약)
                </h3>
                <p className="text-[11px] text-slate-400">
                  카드 속 한글 문장은 자동 제거되고, 핵심 한글 1단어 + 영어만 본문에 타자기로 출력됩니다.
                </p>
              </div>
              <button
                type="button"
                onClick={handleResetScript}
                className="h-7 px-2 border border-slate-900 bg-white hover:bg-slate-50 text-[11px] font-bold text-slate-800 inline-flex items-center gap-1 shrink-0 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>원래대로</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <label className="block space-y-0.5">
                <span className="text-[11px] font-bold text-slate-600">상단 도입 (영어)</span>
                <input
                  type="text"
                  value={activeScript.hookEn}
                  onChange={(e) => updateActiveScriptField('hookEn', e.target.value)}
                  className="w-full px-2.5 py-1.5 border border-slate-900 text-xs font-bold text-slate-900"
                />
              </label>
              <label className="block space-y-0.5">
                <span className="text-[11px] font-bold text-slate-600">상단 도입 (작은 한글)</span>
                <input
                  type="text"
                  value={activeScript.hookKo}
                  onChange={(e) => updateActiveScriptField('hookKo', e.target.value)}
                  className="w-full px-2.5 py-1.5 border border-slate-300 text-xs text-slate-700"
                />
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <label className="block space-y-0.5">
                <span className="text-[11px] font-bold text-slate-600">핵심 제목 (영어)</span>
                <input
                  type="text"
                  value={activeScript.conceptHeadlineEn}
                  onChange={(e) =>
                    updateActiveScriptField('conceptHeadlineEn', e.target.value)
                  }
                  className="w-full px-2.5 py-1.5 border border-slate-900 text-xs font-bold text-slate-900"
                />
              </label>
              <label className="block space-y-0.5">
                <span className="text-[11px] font-bold text-slate-600">핵심 정의 (영어)</span>
                <input
                  type="text"
                  value={activeScript.conceptDefEn}
                  onChange={(e) => updateActiveScriptField('conceptDefEn', e.target.value)}
                  className="w-full px-2.5 py-1.5 border border-slate-900 text-xs font-bold text-slate-900"
                />
              </label>
            </div>

            <label className="block space-y-0.5">
              <span className="text-[11px] font-bold text-slate-600">
                핵심 정의 아래 작은 한글 병기
              </span>
              <input
                type="text"
                value={activeScript.conceptDefKo}
                onChange={(e) => updateActiveScriptField('conceptDefKo', e.target.value)}
                className="w-full px-2.5 py-1.5 border border-slate-300 text-xs text-slate-700"
              />
            </label>

            {/* Body Typewriter Callouts Editor */}
            <div className="pt-1.5 border-t border-slate-200 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-violet-700">
                  본문 타자기 문구 ({activeScript.bodyCallouts.length}개)
                </span>
                <span className="text-[10px] font-bold text-slate-500">
                  핵심 한글: {activeScript.hangulWordTag}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {activeScript.bodyCallouts.map((c, idx) => (
                  <label key={idx} className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono-num text-slate-400 w-7 shrink-0">
                      {c.startSec}s
                    </span>
                    <input
                      type="text"
                      value={c.text}
                      onChange={(e) => updateBodyCalloutText(idx, e.target.value)}
                      className="w-full px-2 py-1 border border-slate-300 text-[11px] font-bold text-slate-800"
                    />
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Reference Original Card Info Summary */}
          {activeCardObj && (
            <div className="bg-slate-50 border border-slate-300 px-3.5 py-2 space-y-1">
              <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                <span>글로벌 선별 카드 ({activeCardObj.cardCode})</span>
                <span className="text-[11px] text-slate-500">
                  선별 외 5장(00, 05, 13, 18, 19) 제외됨
                </span>
              </div>
              <p className="text-[11px] text-slate-600 font-body leading-relaxed">
                {activeCardObj.easyTipText || activeCardObj.tipText}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Hidden Real JollamanComicScene SVG Stage for pixel-perfect Vector -> Canvas snapshotting */}
      <div
        ref={svgContainerRef}
        aria-hidden="true"
        className="fixed -left-[99999px] top-0 pointer-events-none opacity-100"
      >
        {orderedCards.map((card) => (
          <div
            key={card.id}
            data-studio-card={card.id}
            style={{ width: 240, height: 230 }}
          >
            <JollamanComicScene
              sceneType={card.sceneType}
              denominator={card.denominator}
              numerator={card.numerator}
              whole={card.whole}
              inkMode="full"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
