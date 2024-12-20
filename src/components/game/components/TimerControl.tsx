import { FC, useState, useEffect } from 'react';
import { Button } from '../../shared/ui/Btn/Btn';
// Importamos los íconos necesarios
import { FiClock, FiPause, FiPlay, FiX } from 'react-icons/fi';
import { ResultsModal } from './ResultsModal';

interface TimerControlProps {
  onTimeEnd: () => void;
}

export const TimerControl: FC<TimerControlProps> = ({ onTimeEnd }) => {
  // Estados para manejar el temporizador
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isActive, setIsActive] = useState(false)
  const [selectedTime, setSelectedTime] = useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);

  // Función para formatear el tiempo en mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Efecto para manejar el conteo regresivo
  useEffect(() => {
    let interval: number;

    if (isActive && timeLeft !== null) {
      interval = window.setInterval(() => {
        setTimeLeft(time => {
          if (time === null || time <= 1) {
            setIsActive(false);
            setShowResults(true);
            return null;
          }
          return time - 1;
        });
      }, 1000);
    }

    return () => window.clearInterval(interval);
  }, [isActive, timeLeft, onTimeEnd]);

  const startTimer = (minutes: number) => {
    setSelectedTime(minutes);
    setTimeLeft(minutes * 60);
    setIsActive(true);
  };

  const resetAndStartTimer = (minutes: number) => {
    setTimeLeft(minutes * 60);
    setSelectedTime(minutes);
    setIsActive(true);
  };
  const toggleTimer = () => {
    if (timeLeft === null && selectedTime) {
      startTimer(selectedTime);
    } else {
      setIsActive(!isActive);
    }
  };

  const cancelTimer = () => {
    setTimeLeft(null);
    setIsActive(false);
    setSelectedTime(null);
  };

  return (
    <div className="w-full max-w-md flex justify-between items-center px-4">
      {timeLeft === null ? (
        // Botones de selección de tiempo
        <div className="flex gap-2 justify-center w-full">
          <Button
            variant="secondary"
            size="sm"
            icon={FiClock}
            onClick={() => startTimer(1)}
          >
            1 min
          </Button>
          <Button
            variant="secondary"
            size="sm"
            icon={FiClock}
            onClick={() => startTimer(3)}
          >
            3 min
          </Button>
          <Button
            variant="secondary"
            size="sm"
            icon={FiClock}
            onClick={() => startTimer(5)}
          >
            5 min
          </Button>
        </div>
      ) : (
        // Layout para temporizador activo
        <>
          {/* Botón izquierdo - Cancelar */}
          <Button
            variant="secondary"
            size="sm"
            icon={FiX}
            onClick={cancelTimer}
            className="opacity-80 hover:opacity-100"
          >
            Cancelar
          </Button>

          {/* Tiempo central */}
          <div className="text-xl font-medium text-accent mx-4">
            {formatTime(timeLeft)}
          </div>

          {/* Botón derecho - Pausar/Continuar */}
          <Button
            variant="accent"
            size="sm"
            icon={isActive ? FiPause : FiPlay}
            onClick={toggleTimer}
          >
            {isActive ? 'Pausar' : 'Continuar'}
          </Button>
        </>
      )}
      {/* Modal de resultados */}
      <ResultsModal
        isOpen={showResults}
        onClose={() => {
          setShowResults(false);
          onTimeEnd();
        }}
        onRestart={resetAndStartTimer}
        lastSelectedTime={selectedTime || 1} 
      />
    </div>
  );
};