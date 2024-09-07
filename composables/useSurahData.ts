export const useSurahData = () => {
  const route = useRoute();
  const { number } = route.params;
  const { data} = useFetch(`/api/surah/${number}`);
  const { data: interpretation } = useFetch(`/api/interpretation/${number}`);

  return { data, interpretation };
};
