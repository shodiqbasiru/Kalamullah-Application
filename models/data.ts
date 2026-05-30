export interface ISurah {
  number: number;
  name: string;
  latinName: string;
  verseCount: number;
  revelationPlace: string;
  meaning: string;
  description: string;
  audioFull: Record<string, string>;
}

// BUG FIX: prevSurah & nextSurah bisa null (surah pertama tidak punya prev,
// surah terakhir tidak punya next). API mengembalikan `false` → kita map ke null.
export interface ISurahNav {
  number: number;
  name: string;
  latinName: string;
  verseCount: number;
}

export interface ISurahDetail extends ISurah {
  verses: IVerse[];
  prevSurah: ISurahNav | null;
  nextSurah: ISurahNav | null;
}

export interface IVerse {
  verseNumber: number;
  arabicText: string;
  latinText: string;
  translation: string;
  audio: Record<string, string>;
}

export interface IInterpretation {
  number: number;
  latinName: string;
  interpretations: IInterpretations[];
}

export interface IInterpretations {
  verse: number;
  text: string;
}
