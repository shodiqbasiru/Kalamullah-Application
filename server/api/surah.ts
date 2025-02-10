import { mappingSurahJson } from "~/utils/mapData";

export default defineEventHandler(async (event) => {
    const response:any = await $fetch(process.env.API_BASE_URL + '/surat');
    const data = response.data;
    return data.map(mappingSurahJson);
});