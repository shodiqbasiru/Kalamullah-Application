import { mappingInterpretationJson } from "~/utils/mapData";

export default defineEventHandler(async (event) => {
  const { number } = event.context.params as { number: string };
  const response: any = await $fetch(
    process.env.API_BASE_URL + `/tafsir/${number}`
  );
  const data = response.data;
  return mappingInterpretationJson(data);
});
