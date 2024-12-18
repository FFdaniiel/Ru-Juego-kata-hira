import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react'
import { getSyllabarySets } from '../constants/syllabaries'
import {
  GameContextType,
  GameState,
  Syllable,
  SyllabaryType,
  GameMode,
  DifficultyLevel,
} from '../types/game'
import { checkAnswer as checkAnswerHelper } from '../utils/gameHelpers'
import { showAnswerFeedback } from '../utils/toastHelpers'
import { Achievement, achievements } from '../utils/achievements'
import { toast } from 'react-toastify'

// Crear el contexto
const GameContext = createContext<GameContextType | undefined>(undefined)

// Estado inicial
const initialState: GameState = {
  syllabary: 'hiragana',
  score: {
    correct: 0,
    total: 0,
    streak: 0,
    bestStreak: 0,
  },
  currentSyllable: null,
  mode: 'practice',
  difficulty: 'basico' as DifficultyLevel,
  isPlaying: true,
  timeLeft: null,
  // Nuevos campos añadidos una sola vez
  experience: 0,
  achievements: [], // Array vacío para los IDs de logros
  level: 1,
}

// Provider del juego
export function GameProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<GameState>(initialState)

  // Verificar logros
  const checkAchievements = () => {
    achievements.forEach((achievement: Achievement) => {
      if (
        !state.achievements.includes(achievement.id) &&
        achievement.condition(state)
      ) {
        setState((prev) => ({
          ...prev,
          achievements: [...prev.achievements, achievement.id],
          experience: prev.experience + achievement.xpReward,
          level:
            Math.floor((prev.experience + achievement.xpReward) / 1000) + 1,
        }))

        toast.success(
          <div className="flex flex-col gap-1">
            <div className="text-lg font-bold">¡Logro desbloqueado!</div>
            <div className="flex items-center gap-2">
              <achievement.icon className="w-5 h-5" />
              <div>
                <div className="font-medium">{achievement.title}</div>
                <div className="text-sm opacity-80">
                  +{achievement.xpReward} EXP
                </div>
              </div>
            </div>
          </div>,
          {
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            className: 'achievement-toast',
          }
        )
      }
    })
  }

  // Obtener una sílaba aleatoria según dificultad actual
  const getRandomSyllable = (): Syllable => {
    const availableSyllables = getSyllabarySets(
      state.syllabary,
      state.difficulty
    )
    const randomIndex = Math.floor(Math.random() * availableSyllables.length)
    return availableSyllables[randomIndex]
  }

  // Cambiar silabario (hiragana/katakana)
  const setSyllabary = (syllabary: SyllabaryType) => {
    setState((prev) => ({
      ...prev,
      syllabary,
      currentSyllable: getRandomSyllable(),
      difficulty: 'basico',
      score: {
        correct: 0,
        total: 0,
        streak: 0,
        bestStreak: 0,
      },
    }))
  }

  // Cambiar nivel de dificultad
  const setDifficulty = (difficulty: DifficultyLevel) => {
    setState((prev) => ({
      ...prev,
      difficulty,
      currentSyllable: getRandomSyllable(), // Obtener nueva sílaba según dificultad
    }))
  }

  // Iniciar juego
  const startGame = (mode: GameMode, difficulty: DifficultyLevel) => {
    setState((prev) => ({
      ...prev,
      mode,
      difficulty,
      isPlaying: true,
      currentSyllable: getRandomSyllable(),
      timeLeft: mode === 'timed' ? 60 : null,
      score: {
        correct: 0,
        total: 0,
        streak: 0,
        bestStreak: 0,
      },
    }))
  }

  // Verificar respuesta
  const checkAnswer = (answer: string): boolean => {
    if (!state.currentSyllable) return false

    const isCorrect = checkAnswerHelper(answer, state.currentSyllable.romaji)
    const newStreak = isCorrect ? state.score.streak + 1 : 0

    // Calcular EXP base por respuesta correcta
  const baseExp = 10;
  // Bonus por racha
  const streakBonus = Math.floor(newStreak / 5) * 5;
  // Bonus por dificultad
  const difficultyBonus = {
    'basico': 0,
    'intermedio': 5,
    'avanzado': 10,
    'maestro': 15
  }[state.difficulty] || 0;

  // Calcular EXP total
  const expGained = isCorrect ? baseExp + streakBonus + difficultyBonus : 0;
  // Mostrar feedback con la EXP ganada

  showAnswerFeedback(isCorrect, newStreak, state.currentSyllable.romaji, expGained);

    setState((prev: GameState) => ({
      ...prev,
    score: {
      correct: isCorrect ? prev.score.correct + 1 : prev.score.correct,
      total: prev.score.total + 1,
      streak: newStreak,
      bestStreak: Math.max(newStreak, prev.score.bestStreak)
    },
    experience: prev.experience + expGained,
    level: Math.floor((prev.experience + expGained) / 1000) + 1,
    currentSyllable: getRandomSyllable()
    }))

    // Verificar logros después de actualizar el estado
    checkAchievements()

    return isCorrect
  }

  useEffect(() => {
    if (!state.currentSyllable) {
      setState((prev) => ({
        ...prev,
        currentSyllable: getRandomSyllable(),
        isPlaying: true,
      }))
    }
  }, [])

  const value = {
    state,
    setSyllabary,
    setDifficulty,
    startGame,
    endGame: () => setState(initialState),
    pauseGame: () => setState((prev) => ({ ...prev, isPlaying: false })),
    resumeGame: () => setState((prev) => ({ ...prev, isPlaying: true })),
    checkAnswer,
    resetScore: () =>
      setState((prev) => ({ ...prev, score: initialState.score })),
    getRandomSyllable,
  }

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}

// Hook personalizado para usar el contexto
export function useGame() {
  const context = useContext(GameContext)
  if (!context) {
    throw new Error('useGame must be used within GameProvider')
  }
  return context
}
