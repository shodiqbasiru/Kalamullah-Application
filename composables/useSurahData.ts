import type { ISurah, ISurahDetail } from "~/models/data";

export const useSurahData = () => {
  const surahs = useState("list-data-surah", () => ([] as ISurah[]));
  const surah = ref<ISurahDetail | null>(null);
  const surahName = ref<string>("");

  const getSurah = async (number: string | string[]) => {
    const { data } = await useFetch(`/api/surah/${number}`);
    Object.assign(surah, data);
  };

  const getAllSurah = async () => {
    const {data} = await useFetch(`/api/surah`);
    surahs.value = data?.value;
  }

  const handleSearch = (e: Event) => {
    const target = e.target as HTMLInputElement;
    surahName.value = target.value;
  }

  const filteredSurah = computed(() => {
    if (!surahs.value) return [];
    return surahs?.value.filter((surah: ISurah) =>
      surah.latinName.toLowerCase().includes(surahName.value.toLowerCase())
    );
  });

  return { 
    data: {surahs, surah},
    computed: {filteredSurah},
    methods: {getSurah, getAllSurah, handleSearch}
   };
};
