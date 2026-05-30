import { mappingSurahDetailJson } from "~/utils/mapData";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);

  // BUG FIX: getRouterParam adalah cara aman mengambil dynamic param di Nitro
  const number = getRouterParam(event, "number");

  // Validasi: number harus berupa angka 1–114
  const num = Number(number);
  if (!number || isNaN(num) || num < 1 || num > 114) {
    throw createError({
      statusCode: 400,
      statusMessage: `Nomor surah tidak valid: "${number}". Harus antara 1 dan 114.`,
    });
  }

  const response = await $fetch<{ data: any }>(
    `${config.apiBaseUrl}/surat/${num}`,
  ).catch((err) => {
    throw createError({
      statusCode: err?.response?.status ?? 502,
      statusMessage: `Gagal mengambil data surah ${num} dari API eksternal`,
      cause: err,
    });
  });

  if (!response?.data) {
    throw createError({
      statusCode: 404,
      statusMessage: `Surah ${num} tidak ditemukan`,
    });
  }

  const data = response.data;
  const verse = data.ayat;

  // Guard: pastikan ayat adalah array
  if (!Array.isArray(verse)) {
    throw createError({
      statusCode: 502,
      statusMessage: "Respons API tidak valid: data ayat tidak ditemukan",
    });
  }

  // BUG FIX: teruskan data.suratSebelumnya & data.suratSelanjutnya ke mapper
  // (kode lama menggunakan `data` dua kali → nextSurah & prevSurah selalu sama)
  return mappingSurahDetailJson(data, verse);
});
