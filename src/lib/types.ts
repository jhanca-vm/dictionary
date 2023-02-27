interface Phonetic {
  text?: string
  audio: string
}

interface Meaning {
  partOfSpeech: string
  definitions: Array<{
    definition: string
    example?: string
  }>
  synonyms: string[]
  antonyms: string[]
}

export interface Definition {
  word: string
  phonetics: Phonetic[]
  meanings: Meaning[],
  sourceUrls: [string]
}

export interface Error {
  title: string
  message: string
  resolution: string
}
