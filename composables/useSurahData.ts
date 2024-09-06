export const useSurahData = () => {
  const route = useRoute();
  const { number } = route.params;
  const { data } = useFetch(`/api/surah/${number}`);



  return { data };
};
