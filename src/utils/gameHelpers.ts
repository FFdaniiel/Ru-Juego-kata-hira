export const checkAnswer = (userAnswer: string, correctAnswer: string): boolean => {
    // Normalizar ambas respuestas
    const normalizedUser = userAnswer.toLowerCase().trim();
    const normalizedCorrect = correctAnswer.toLowerCase().trim();
  
    // Verificación exacta
    return normalizedUser === normalizedCorrect;
  };