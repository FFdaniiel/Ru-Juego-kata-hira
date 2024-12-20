export type SyllabaryType = 'hiragana' | 'katakana' | 'proximamente';
export type DifficultyLevel = 'basico' | 'intermedio' | 'avanzado' | 'maestro';
export type GameMode = 'practice' | 'timed' | 'challenge';

export interface Syllable {
  japanese: string;
  romaji: string;
  type: 'basic' | 'dakuten' | 'handakuten' | 'combo' | 'small';
  group?: string;
}

export interface GameState {
  syllabary: SyllabaryType;
  score: {
    correct: number;
    total: number;
    streak: number;
    bestStreak: number;
  };
  achievements: string[];  // IDs de logros conseguidos
  experience: number;
  level: number;
  currentSyllable: Syllable | null;
  mode: GameMode;
  difficulty: DifficultyLevel;
  isPlaying: boolean;
  timeLeft: number | null;
}

export interface GameContextType {
  state: GameState;
  setSyllabary: (syllabary: SyllabaryType) => void;
  setDifficulty: (difficulty: DifficultyLevel) => void;
  startGame: (mode: GameMode, difficulty: DifficultyLevel) => void;
  endGame: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  checkAnswer: (answer: string) => boolean;
  resetScore: () => void;
  getRandomSyllable: () => Syllable;
}