export const useSurahData = () => {
  const route = useRoute();
  const { number } = route.params;
  const { data } = useFetch(`/api/surah/${number}`);

  const verseOptions = data.value?.verses.map((v) => ({
    label: v.verseNumber,
    value: v.verseNumber,
  }));

  return { data, verseOptions };
};
