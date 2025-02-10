import { mappingSurahDetailJson } from "~/utils/mapData";

export default defineEventHandler(async (event) => {
  const { number } = event.context.params as { number: string };
  const response: any = await $fetch(
    process.env.API_BASE_URL + `/surat/${number}`
  );
  const data = response.data;
  const verse = data.ayat;

  return mappingSurahDetailJson(data, verse);
});
