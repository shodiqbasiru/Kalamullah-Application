import type {
  IInterpretation,
  IInterpretations,
  ISurah,
  ISurahDetail,
  IVerse,
} from "~/models/data";

export function mappingSurahJson(data: any): ISurah {
  return {
    number: data.nomor,
    name: data.nama,
    latinName: data.namaLatin,
    verseCount: data.jumlahAyat,
    revelationPlace: data.tempatTurun,
    meaning: data.arti,
    description: data.deskripsi,
    audioFull: data.audioFull ?? {},
  };
}

export function mappingSurahDetailJson(data: any, verse: any[]): ISurahDetail {
  const arrVerse = verse.map((item: any) => mappingVerseJson(item));

  // BUG FIX: kode lama memetakan nextSurah & prevSurah dari `data` yang sama
  // (nomor, nama, dll dari surah itu sendiri) → keduanya selalu identik.
  // API equran.id mengembalikan:
  //   data.suratSebelumnya → { nomor, nama, namaLatin, jumlahAyat } | false
  //   data.suratSelanjutnya → { nomor, nama, namaLatin, jumlahAyat } | false

  const prev = data.suratSebelumnya;
  const next = data.suratSelanjutnya;

  return {
    number: data.nomor,
    name: data.nama,
    latinName: data.namaLatin,
    verseCount: data.jumlahAyat,
    revelationPlace: data.tempatTurun,
    meaning: data.arti,
    description: data.deskripsi,
    audioFull: data.audioFull ?? {},
    verses: arrVerse,
    // Guard: API mengembalikan `false` jika tidak ada prev/next
    prevSurah: prev
      ? {
          number: prev.nomor,
          name: prev.nama,
          latinName: prev.namaLatin,
          verseCount: prev.jumlahAyat,
        }
      : null,
    nextSurah: next
      ? {
          number: next.nomor,
          name: next.nama,
          latinName: next.namaLatin,
          verseCount: next.jumlahAyat,
        }
      : null,
  };
}

export function mappingInterpretationJson(data: any): IInterpretation {
  const interpretations = (data.tafsir ?? []).map((item: any) =>
    mappingInterpretationsJson(item),
  );
  return {
    number: data.nomor,
    latinName: data.namaLatin,
    interpretations,
  };
}

function mappingVerseJson(data: any): IVerse {
  return {
    verseNumber: data.nomorAyat,
    arabicText: data.teksArab,
    latinText: data.teksLatin,
    translation: data.teksIndonesia,
    audio: data.audio ?? {},
  };
}

function mappingInterpretationsJson(data: any): IInterpretations {
  return {
    verse: data.ayat,
    text: data.teks,
  };
}
