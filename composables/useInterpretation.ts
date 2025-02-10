export const useInterpretation = () => {
  const getInterpretationByNumber = async (number: string | string[]) => {
    const { data } = await useFetch(`/api/interpretation/${number}`);
    return data;
  };

  return { getInterpretationByNumber };
};
