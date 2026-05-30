import type { IVerse } from "~/models/data";

// ── Singleton state (module-level) ────────────────────────────────────────────
// Menggunakan useState agar state audio player bersifat GLOBAL dan bisa
// diakses dari komponen mana pun (FloatingPlayer, SurahAction, dll)
// tanpa kehilangan state saat komponen unmount.

const _selectedVerse = () =>
  useState<IVerse | undefined>("ap:selectedVerse", () => undefined);
const _isPaused = () => useState<boolean>("ap:isPaused", () => false);
const _isPlaying = () => useState<boolean>("ap:isPlaying", () => false);
const _qori = () => useState<string>("ap:qori", () => "05");
const _currentTime = () => useState<number>("ap:currentTime", () => 0);
const _duration = () => useState<number>("ap:duration", () => 0);
const _surahName = () => useState<string>("ap:surahName", () => "");
const _surahLatinName = () => useState<string>("ap:surahLatinName", () => "");
const _verses = () => useState<IVerse[]>("ap:verses", () => []);

// Audio element hidup di module scope agar tidak di-destroy saat re-render
let _audio: HTMLAudioElement | null = null;
let _progressInterval: ReturnType<typeof setInterval> | null = null;

export const useAudioPlayer = () => {
  const selectedVerse = _selectedVerse();
  const isPaused = _isPaused();
  const isPlaying = _isPlaying();
  const qori = _qori();
  const currentTime = _currentTime();
  const duration = _duration();
  const surahName = _surahName();
  const surahLatinName = _surahLatinName();
  const verses = _verses();

  // ── Helpers ────────────────────────────────────────────────────────────────

  const stopProgressTracker = () => {
    if (_progressInterval) {
      clearInterval(_progressInterval);
      _progressInterval = null;
    }
  };

  const startProgressTracker = () => {
    stopProgressTracker();
    _progressInterval = setInterval(() => {
      if (_audio && !_audio.paused) {
        currentTime.value = _audio.currentTime;
        duration.value = _audio.duration || 0;
      }
    }, 250);
  };

  const cleanupAudio = () => {
    stopProgressTracker();
    if (_audio) {
      _audio.pause();
      _audio.onended = null;
      _audio.onerror = null;
      _audio.src = "";
      _audio = null;
    }
    currentTime.value = 0;
    duration.value = 0;
  };

  const getVerseByIndex = (index: number): IVerse | undefined =>
    verses.value[index];

  const getCurrentIndex = (): number => {
    if (!selectedVerse.value) return -1;
    return verses.value.findIndex(
      (v) => v.verseNumber === selectedVerse.value!.verseNumber,
    );
  };

  const getNextVerse = (): IVerse | undefined => {
    const idx = getCurrentIndex();
    if (idx === -1 || idx >= verses.value.length - 1) return undefined;
    return verses.value[idx + 1];
  };

  const getPrevVerse = (): IVerse | undefined => {
    const idx = getCurrentIndex();
    if (idx <= 0) return undefined;
    return verses.value[idx - 1];
  };

  // ── Core play ──────────────────────────────────────────────────────────────

  /**
   * Memuat dan memainkan ayat, lalu AUTO-ADVANCE ke ayat berikutnya
   * ketika selesai — terus menerus hingga user menekan stop.
   */
  const playVerse = (verse: IVerse) => {
    const src = verse.audio?.[qori.value];
    if (!src) {
      console.error(
        `[AudioPlayer] No audio src for qori=${qori.value} verse=${verse.verseNumber}`,
      );
      return;
    }

    cleanupAudio();

    selectedVerse.value = verse;
    isPaused.value = false;
    isPlaying.value = true;

    _audio = new Audio(src);

    // Metadata ready → update duration display
    _audio.onloadedmetadata = () => {
      duration.value = _audio?.duration ?? 0;
    };

    _audio.play().catch((err) => {
      console.error("[AudioPlayer] Play failed:", err);
      isPlaying.value = false;
    });

    startProgressTracker();

    // ── Auto-advance: terus putar ayat berikutnya ──────────────────────
    _audio.onended = () => {
      const next = getNextVerse();
      if (next) {
        // Lanjut ke ayat berikutnya secara otomatis
        playVerse(next);
      } else {
        // Sudah ayat terakhir → berhenti
        handleStop();
      }
    };

    _audio.onerror = (e) => {
      console.error("[AudioPlayer] Audio error:", e);
      // Coba skip ke ayat berikutnya jika ada error
      const next = getNextVerse();
      if (next) playVerse(next);
      else handleStop();
    };
  };

  // ── Public controls ────────────────────────────────────────────────────────

  /** Mulai dari ayat tertentu (dari klik di surah reader) */
  const handlePlay = (verse: IVerse) => {
    playVerse(verse);
  };

  /** Toggle pause/resume */
  const handlePause = () => {
    if (!_audio) return;

    if (isPaused.value) {
      _audio.play().catch(console.error);
      isPaused.value = false;
      isPlaying.value = true;
      startProgressTracker();
    } else {
      _audio.pause();
      isPaused.value = true;
      isPlaying.value = false;
      stopProgressTracker();
    }
  };

  /** Stop total — reset semua state */
  const handleStop = () => {
    cleanupAudio();
    selectedVerse.value = undefined;
    isPaused.value = false;
    isPlaying.value = false;
  };

  /** Loncat ke ayat berikutnya */
  const handleNext = () => {
    const next = getNextVerse();
    if (next) playVerse(next);
    else handleStop();
  };

  /** Loncat ke ayat sebelumnya */
  const handlePrev = () => {
    // Jika sudah > 3 detik, restart ayat saat ini dulu (seperti Spotify)
    if (_audio && _audio.currentTime > 3) {
      _audio.currentTime = 0;
      return;
    }
    const prev = getPrevVerse();
    if (prev) playVerse(prev);
  };

  /** Seek ke posisi tertentu (0–100 persen) */
  const handleSeek = (percent: number) => {
    if (!_audio || !duration.value) return;
    const time = (percent / 100) * duration.value;
    _audio.currentTime = time;
    currentTime.value = time;
  };

  /** Set verses yang tersedia (dipanggil dari halaman surah) */
  const setVerses = (v: IVerse[], latinName = "", name = "") => {
    verses.value = v;
    surahLatinName.value = latinName;
    surahName.value = name;
  };

  /** Dipanggil saat ganti qori — restart ayat yang sedang main */
  const changeQori = (newQori: string) => {
    const current = selectedVerse.value;
    qori.value = newQori;
    if (current && isPlaying.value) {
      playVerse(current);
    }
  };

  // ── Computed helpers untuk UI ──────────────────────────────────────────────

  const progressPercent = computed(() =>
    duration.value > 0 ? (currentTime.value / duration.value) * 100 : 0,
  );

  const formatTime = (sec: number): string => {
    if (!sec || isNaN(sec)) return "0:00";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const currentTimeFormatted = computed(() => formatTime(currentTime.value));
  const durationFormatted = computed(() => formatTime(duration.value));

  const hasNext = computed(() => {
    const idx = getCurrentIndex();
    return idx !== -1 && idx < verses.value.length - 1;
  });

  const hasPrev = computed(() => getCurrentIndex() > 0);

  const isActive = computed(() => isPlaying.value || isPaused.value);

  return {
    // State
    data: {
      selectedVerse,
      isPaused,
      isPlaying,
      isActive,
      qori,
      currentTime,
      duration,
      surahName,
      surahLatinName,
      verses,
      progressPercent,
      currentTimeFormatted,
      durationFormatted,
      hasNext,
      hasPrev,
    },
    // Methods
    methods: {
      handlePlay,
      handlePause,
      handleStop,
      handleNext,
      handlePrev,
      handleSeek,
      setVerses,
      changeQori,
      playVerse,
    },
  };
};
