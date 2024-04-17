import { Injectable } from '@angular/core';
import { LanguageQuizQuestion } from './language-quiz-question';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private readonly DEFAULT_LANG = 'spanish';

  async getQuestions(lang: string): Promise<LanguageQuizQuestion[]> {
    try {
      const data = await fetch(
        `/api/ask-gemini?lang=${lang || this.DEFAULT_LANG}`,
      ).then((response) => response.json());
      return Promise.resolve(this.parseGeminiResponse(data.response));
    } catch (e) {
      return Promise.resolve(backupQuestions);
    }
  }

  parseGeminiResponse(response: string): LanguageQuizQuestion[] {
    let output = response.replaceAll(/json/g, '').replaceAll(/```/g, '');
    let dataObject = JSON.parse(output);

    if (Array.isArray(dataObject)) {
      return dataObject;
    } else {
      return [];
    }
  }
}

const backupQuestions = [
  { phrase: 'perro', options: ['dog', 'cat', 'bird'], answer: 'dog' },
  { phrase: 'gato', options: ['fish', 'cat', 'horse'], answer: 'cat' },
  { phrase: 'casa', options: ['car', 'house', 'tree'], answer: 'house' },
  { phrase: 'libro', options: ['book', 'pencil', 'door'], answer: 'book' },
  { phrase: 'agua', options: ['water', 'milk', 'juice'], answer: 'water' },
  { phrase: 'comida', options: ['food', 'chair', 'table'], answer: 'food' },
  { phrase: 'hombre', options: ['man', 'woman', 'child'], answer: 'man' },
  { phrase: 'mujer', options: ['girl', 'woman', 'boy'], answer: 'woman' },
  { phrase: 'niño', options: ['child', 'adult', 'baby'], answer: 'child' },
  { phrase: 'grande', options: ['small', 'big', 'medium'], answer: 'big' },
  { phrase: 'pequeño', options: ['large', 'small', 'tall'], answer: 'small' },
  { phrase: 'caliente', options: ['hot', 'cold', 'warm'], answer: 'hot' },
  { phrase: 'frío', options: ['cold', 'hot', 'cool'], answer: 'cold' },
  { phrase: 'feliz', options: ['sad', 'happy', 'angry'], answer: 'happy' },
  { phrase: 'triste', options: ['happy', 'excited', 'sad'], answer: 'sad' },
  {
    phrase: 'cansado',
    options: ['tired', 'energetic', 'sleepy'],
    answer: 'tired',
  },
  {
    phrase: 'aburrido',
    options: ['bored', 'excited', 'interested'],
    answer: 'bored',
  },
  { phrase: 'bueno', options: ['bad', 'good', 'okay'], answer: 'good' },
  { phrase: 'malo', options: ['good', 'bad', 'great'], answer: 'bad' },
  { phrase: 'alto', options: ['short', 'tall', 'medium'], answer: 'tall' },
  { phrase: 'bajo', options: ['tall', 'short', 'wide'], answer: 'short' },
  { phrase: 'rápido', options: ['slow', 'fast', 'quick'], answer: 'fast' },
  { phrase: 'lento', options: ['fast', 'slow', 'steady'], answer: 'slow' },
  { phrase: 'viejo', options: ['young', 'old', 'new'], answer: 'old' },
];