import { DifficultyLevel } from "../types/game";

export const checkAnswer = (userAnswer: string, correctAnswer: string): boolean => {
    // Normalizar ambas respuestas
    const normalizedUser = userAnswer.toLowerCase().trim();
    const normalizedCorrect = correctAnswer.toLowerCase().trim();
  
    // Verificación exacta
    return normalizedUser === normalizedCorrect;
  };

  // DATOS para resultModal 
export const getFinalFeedback = (
    correct: number,
    total: number,
    difficulty: DifficultyLevel
  ): { message: string; readyForNext: boolean } => {
    const accuracy = total > 0 ? (correct / total) * 100 : 0;
  
    const thresholds = {
      basico: { good: 80, excellent: 90 },
      intermedio: { good: 75, excellent: 85 },
      avanzado: { good: 70, excellent: 80 },
      maestro: { good: 65, excellent: 75 },
    };
  
    const threshold = thresholds[difficulty];
    
    // Validación inicial para pocos intentos
    if (total < 10) {
      return {
        message: "¡Sigue practicando! Necesitas más intentos para una evaluación precisa.",
        readyForNext: false
      };
    }
  
    // Determinar readyForNext basado en la precisión y cantidad de intentos
    const readyForNext = accuracy >= threshold.excellent && total >= 20;
  
    // El resto de la lógica usa la variable readyForNext en sus retornos
    if (accuracy >= threshold.excellent) {
      const messages = {
        basico: "¡Excelente! Estás listo para probar el nivel intermedio con dakuten (゛).",
        intermedio: "¡Increíble dominio! Puedes avanzar al nivel avanzado con handakuten (゜).",
        avanzado: "¡Dominio excepcional! El nivel maestro te espera con las combinaciones.",
        maestro: "¡Has alcanzado el nivel de un verdadero maestro! ¡Increíble rendimiento!"
      };
      return { message: messages[difficulty], readyForNext };
    }
  
    // El resto de casos siempre retornarán readyForNext: false
    if (accuracy >= threshold.good) {
      const messages = {
        basico: "¡Buen trabajo! Un poco más de práctica y estarás listo para el siguiente nivel.",
        intermedio: "¡Vas muy bien! Sigue practicando para dominar los dakuten.",
        avanzado: "¡Gran progreso! Casi dominas los handakuten.",
        maestro: "¡Excelente esfuerzo! Las combinaciones son desafiantes, pero lo estás haciendo genial."
      };
      return { message: messages[difficulty], readyForNext: false };
    }
  
    const messages = {
      basico: "Continúa practicando los caracteres básicos hasta que te sientas más cómodo.",
      intermedio: "Los dakuten requieren práctica adicional. ¡No te rindas!",
      avanzado: "Los handakuten son desafiantes. Toma tu tiempo para dominarlos.",
      maestro: "Las combinaciones son complejas. Sigue practicando a tu ritmo."
    };
    return { message: messages[difficulty], readyForNext: false };
  };