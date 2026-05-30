export const useInterpretation = () => {
  // BUG FIX: path sebelumnya "/api/interpretation/${number}" harus cocok
  // dengan nama folder di server/api/ → gunakan "interpretation" (bukan "interpratation")
  const getInterpretationByNumber = async (number: string | string[]) => {
    const id = Array.isArray(number) ? number[0] : number;
    const { data, error } = await useFetch(`/api/interpretation/${id}`);

    if (error.value) {
      console.error(
        `Failed to fetch interpretation for surah ${id}:`,
        error.value,
      );
    }

    return data;
  };

  return { getInterpretationByNumber };
};
