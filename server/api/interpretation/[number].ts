import { mappingInterpretationJson } from "~/utils/mapData";

// BUG FIX: folder sebelumnya "interpratation" (typo) → harus "interpretation"
// Pastikan folder di filesystem adalah: server/api/interpretation/[number].ts

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const number = getRouterParam(event, "number");

  const num = Number(number);
  if (!number || isNaN(num) || num < 1 || num > 114) {
    throw createError({
      statusCode: 400,
      statusMessage: `Nomor surah tidak valid: "${number}". Harus antara 1 dan 114.`,
    });
  }

  const response = await $fetch<{ data: any }>(
    `${config.apiBaseUrl}/tafsir/${num}`,
  ).catch((err) => {
    throw createError({
      statusCode: err?.response?.status ?? 502,
      statusMessage: `Gagal mengambil tafsir surah ${num} dari API eksternal`,
      cause: err,
    });
  });

  if (!response?.data) {
    throw createError({
      statusCode: 404,
      statusMessage: `Tafsir surah ${num} tidak ditemukan`,
    });
  }

  return mappingInterpretationJson(response.data);
});
