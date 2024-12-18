import { FC, useEffect } from 'react';
import { useGame } from '../../context/GameContext';
import { ScoreDisplay } from './components/ScoreDisplay';
import { SyllableDisplay } from './components/SyllableDisplay';
import { InputField } from './components/InputField';
import { TimerControl } from './components/TimerControl';
import { DifficultyPanel } from './components/DifficultyPanel';

export const GameContainer: FC = () => {
  const { 
    state, 
    resetScore, 
    checkAnswer,
    startGame 
  } = useGame();

  // Manejador para el fin del tiempo
  const handleTimeEnd = () => {
    alert(`¡Tiempo terminado!\nAciertos: ${state.score.correct}\nTotal: ${state.score.total}`);
    resetScore();
  };

  // Manejador de respuestas
  const handleAnswer = (answer: string) => {
    checkAnswer(answer);
  };

  // Inicializar con modo básico
  useEffect(() => {
    startGame('practice', 'basico');
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Área principal del juego */}
        <div className="flex-1 flex flex-col items-center justify-center gap-8">
          <TimerControl onTimeEnd={handleTimeEnd} />
          <ScoreDisplay 
            correct={state.score.correct} 
            total={state.score.total}
            onReset={resetScore}
          />
          {state.currentSyllable && (
            <SyllableDisplay syllable={state.currentSyllable.japanese} />
          )}
          <InputField onAnswer={handleAnswer} />
          <DifficultyPanel />
        </div>
      </div>
    </div>
  );
};
