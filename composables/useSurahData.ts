import type { ISurah, ISurahDetail } from "~/models/data";

export const useSurahData = () => {
  // BUG FIX: use useState for SSR-safe shared state across components
  const surahs = useState<ISurah[]>("list-data-surah", () => []);

  // BUG FIX: surah detail should also be SSR-safe ref, not a plain ref
  const surah = useState<ISurahDetail | null>("current-surah", () => null);

  const surahName = ref<string>("");

  const getSurah = async (number: string | string[]) => {
    const id = Array.isArray(number) ? number[0] : number;
    // BUG FIX: useFetch returns a ref; assign .value correctly
    const { data } = await useFetch<ISurahDetail>(`/api/surah/${id}`);
    if (data.value) {
      surah.value = data.value;
    }
  };

  const getAllSurah = async () => {
    // BUG FIX: only fetch if not already loaded (prevents double-fetch on navigation)
    if (surahs.value.length > 0) return;
    const { data } = await useFetch<ISurah[]>("/api/surah");
    if (data.value) {
      surahs.value = data.value;
    }
  };

  const handleSearch = (e: Event) => {
    const target = e.target as HTMLInputElement;
    surahName.value = target.value;
  };

  const filteredSurah = computed<ISurah[]>(() => {
    if (!surahs.value) return [];
    const query = surahName.value.toLowerCase().trim();
    if (!query) return surahs.value;
    return surahs.value.filter(
      (s) =>
        s.latinName.toLowerCase().includes(query) ||
        s.name.includes(query) ||
        s.meaning.toLowerCase().includes(query),
    );
  });

  return {
    data: { surahs, surah },
    computed: { filteredSurah },
    methods: { getSurah, getAllSurah, handleSearch },
  };
};
