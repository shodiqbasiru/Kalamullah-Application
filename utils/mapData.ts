import type { ISurah, ISurahDetail, IVerse } from "~/types/interfaces";

export function mappingSurahJson(data: any): ISurah {
  return {
    number: data.nomor,
    name: data.nama,
    latinName: data.namaLatin,
    verseCount: data.jumlahAyat,
    revelationPlace: data.tempatTurun,
    meaning: data.arti,
    description: data.deskripsi,
    audioFull: data.audioFull,
  };
}

export function mappingSurahDetailJson(
  data: any,
  verse: IVerse[]
): ISurahDetail {
    
  const arrVerse = verse.map((item: any) => mappingVerseJson(item));

  return {
    number: data.nomor,
    name: data.nama,
    latinName: data.namaLatin,
    verseCount: data.jumlahAyat,
    revelationPlace: data.tempatTurun,
    meaning: data.arti,
    description: data.deskripsi,
    audioFull: data.audioFull,
    verses: arrVerse,
    nextSurah: {
      number: data.nomor,
      name: data.nama,
      latinName: data.namaLatin,
      verseCount: data.jumlahAyat,
    },
    prevSurah: {
      number: data.nomor,
      name: data.nama,
      latinName: data.namaLatin,
      verseCount: data.jumlahAyat,
    },
  };
}

function mappingVerseJson(data: any): IVerse {
  return {
    verseNumber: data.nomorAyat,
    arabicText: data.teksArab,
    latinText: data.teksLatin,
    translation: data.teksIndonesia,
    audio: data.audio,
  };
}
