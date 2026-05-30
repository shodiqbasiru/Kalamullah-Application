interface ILastRead {
  surahNumber: number;
  surahLatinName: string;
  verseNumber: number;
}

export const useLastRead = () => {
  const lastReadState = useState<ILastRead>("last-read", () => {
    if (process.client) {
      const stored = localStorage.getItem("kalamullah:last-read");
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch (e) {
          // Fallback if parsing fails
        }
      }
    }
    return {
      surahNumber: 18,
      surahLatinName: "Al-Kahfi",
      verseNumber: 1,
    };
  });

  const setLastRead = (data: ILastRead) => {
    lastReadState.value = data;
    if (process.client) {
      localStorage.setItem("kalamullah:last-read", JSON.stringify(data));
    }
  };

  return {
    lastRead: computed(() => lastReadState.value),
    setLastRead,
  };
};
