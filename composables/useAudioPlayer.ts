import type { IVerse } from "~/models/data";

export const useAudioPlayer = () => {
  const { data } = useSurahData();
  const currentAudio = ref<HTMLMediaElement | null>(null);
  const isPaused = ref(false);
  const selectedVerse = ref<IVerse>();
  const qori = ref("05");

  const getNextVerse = (currentVerse: IVerse): IVerse | undefined => {
    const currentIndex = data?.value?.verses.findIndex(
      (v) => v.verseNumber === currentVerse.verseNumber
    );
    if (currentIndex === undefined) return;
    return data.value?.verses[currentIndex + 1];
  };

  const playAudio = (verse: IVerse) => {
    if (qori.value) {
      const audio = new Audio(verse.audio[qori.value]);
      currentAudio.value = audio;
      audio.play();

      audio.onended = () => {
        const nextVerse = getNextVerse(verse);
        if (nextVerse) {
          handlePlay(nextVerse);
        } else {
          selectedVerse.value = undefined;
          currentAudio.value = null;
        }
      };
    } else {
      console.error("Qori value is undefined");
    }
  };

  const handlePlay = (verse: IVerse) => {
    if (currentAudio.value) {
      currentAudio.value.pause();
      currentAudio.value.currentTime = 0;
    }
    selectedVerse.value = verse;
    playAudio(verse);
    isPaused.value = false;
  };

  const handlePause = () => {
    if (currentAudio.value) {
      if (isPaused.value) {
        currentAudio.value.play();
        isPaused.value = false;
      } else {
        currentAudio.value.pause();
        isPaused.value = true;
      }
    }
  };

  const handleStop = () => {
    if (currentAudio.value) {
      currentAudio.value.pause();
      currentAudio.value.currentTime = 0;
    }
    selectedVerse.value = undefined;
    currentAudio.value = null;
  };

  return {
    data: { isPaused, selectedVerse, qori },
    methods: { playAudio, handlePlay, handlePause, handleStop },
  };
};
