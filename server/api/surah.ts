import { mappingSurahJson } from "~/utils/mapData";

export default defineEventHandler(async (event) => {
  // BUG FIX: gunakan useRuntimeConfig() bukan process.env
  // process.env tidak di-inject oleh Nitro secara otomatis;
  // runtimeConfig adalah cara yang benar untuk mengakses env vars di server handler
  const config = useRuntimeConfig(event);

  const response = await $fetch<{ data: any[] }>(
    `${config.apiBaseUrl}/surat`,
  ).catch((err) => {
    // Lempar error HTTP yang proper agar client menerima status code yang tepat
    throw createError({
      statusCode: err?.response?.status ?? 502,
      statusMessage: "Gagal mengambil data surah dari API eksternal",
      cause: err,
    });
  });

  // Guard: pastikan response.data adalah array
  if (!response?.data || !Array.isArray(response.data)) {
    throw createError({
      statusCode: 502,
      statusMessage: "Respons API tidak valid: data surah tidak ditemukan",
    });
  }

  return response.data.map(mappingSurahJson);
});
