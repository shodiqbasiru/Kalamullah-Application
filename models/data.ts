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

export interface ISurahDetail {
    number: number;
    name: string;
    latinName: string;
    verseCount: number;
    revelationPlace: string;
    meaning: string;
    description: string;
    audioFull: Record<string, string>;
    verses: IVerse[];
    nextSurah: {
        number: number;
        name: string;
        latinName: string;
        verseCount: number;
    },
    prevSurah: {
        number: number;
        name: string;
        latinName: string;
        verseCount: number;
    }
}

export interface IVerse {
    verseNumber: number;
    arabicText: string;
    latinText: string;
    translation: string;
    audio: Record<string, string>;
}

export interface IInterpretation {
    number: number
    latinName: string;
    interpretations: IInterpretations[];
}

export interface IInterpretations {
    verse: number;
    text: string;
}