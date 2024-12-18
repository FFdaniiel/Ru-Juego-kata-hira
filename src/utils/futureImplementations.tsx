import { GameMode, DifficultyLevel, GameStats } from '../types/game';

/**
 * TODO: Implementar cuando se añada sistema de puntuación avanzado
 * Calcula la puntuación final del juego incluyendo bonificaciones
 */
export const calculateScore = (stats: GameStats, gameMode: GameMode): number => {
  const baseScore = stats.correct * 100;
  const accuracyBonus = (stats.correct / stats.total) * 50;
  const streakBonus = stats.bestStreak * 25;

  switch (gameMode) {
    case 'timed': return baseScore + accuracyBonus + streakBonus + 200;
    case 'challenge': return baseScore + accuracyBonus + streakBonus + 300;
    default: return baseScore + accuracyBonus + streakBonus;
  }
};

/**
 * TODO: Implementar cuando se añada verificación flexible de respuestas
 * Versión avanzada de checkAnswer que maneja casos especiales
 */
export const checkAnswerAdvanced = (userAnswer: string, correctAnswer: string): boolean => {
  const normalizedUser = userAnswer.toLowerCase().trim();
  const normalizedCorrect = correctAnswer.toLowerCase().trim();

  if (normalizedUser === normalizedCorrect) return true;

  const specialCases: { [key: string]: string[] } = {
    'ou': ['ō', 'oo'],
    'uu': ['ū'],
    'aa': ['ā'],
    'ee': ['ē'],
    'ii': ['ī']
  };

  for (const [standard, variants] of Object.entries(specialCases)) {
    if (normalizedCorrect.includes(standard)) {
      const variantAnswers = variants.map(variant => 
        normalizedCorrect.replace(standard, variant)
      );
      if (variantAnswers.includes(normalizedUser)) return true;
    }
  }

  return false;
};

/**
 * TODO: Implementar cuando se añadan estadísticas detalladas
 */
export const calculateStats = (
  correct: number,
  total: number,
  timeSpent: number
): GameStats => {
  return {
    correct,
    total,
    streak: 0,
    bestStreak: 0,
    accuracy: total > 0 ? (correct / total) * 100 : 0,
    averageResponseTime: total > 0 ? timeSpent / total : 0
  };
};

/**
 * TODO: Implementar cuando se añada sistema de dificultad adaptativa
 */
export const getRecommendedDifficulty = (stats: GameStats): DifficultyLevel => {
  const accuracy = stats.accuracy;
  const averageTime = stats.averageResponseTime;

  if (accuracy > 90 && averageTime < 2) return 'maestro';
  else if (accuracy > 75 && averageTime < 3) return 'avanzado';
  else if (accuracy > 60 && averageTime < 4) return 'intermedio';
  else return 'basico';
};

/**
 * TODO: Implementar cuando se añada sistema de retroalimentación
 */
export const getFeedbackMessage = (stats: GameStats): string => {
  const accuracy = stats.accuracy;
  
  if (accuracy >= 90) return '¡Excelente! ¡Estás listo para el siguiente nivel!';
  else if (accuracy >= 70) return '¡Buen trabajo! Vas por buen camino.';
  else if (accuracy >= 50) return 'Vas mejorando. ¡Sigue practicando!';
  else return 'No te desanimes. La práctica hace al maestro.';
};