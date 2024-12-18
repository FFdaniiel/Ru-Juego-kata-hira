import { FC } from 'react';
import { Button } from '../../shared/ui/Btn/Btn';
import { VscDebugRestart } from 'react-icons/vsc';

interface ScoreDisplayProps {
  correct: number;
  total: number;
  onReset: () => void;
}

export const ScoreDisplay: FC<ScoreDisplayProps> = ({ correct, total, onReset }) => (
  <div className="relative w-full max-w-xs flex flex-col items-center">
    {/* Contenedor del contador */}
    <div className="text-text text-2xl font-medium mb-2">
      <span className="text-accent">{correct}</span>
      <span className="mx-2">/</span>
      <span>{total}</span>
    </div>
    
    {/* Botón de reinicio */}
    <Button
      variant="secondary"
      size="sm"
      icon={VscDebugRestart}
      onClick={onReset}
      className="absolute right-0 top-1/2 -translate-y-1/2 bg-secondary/60 hover:bg-secondary/80 
                 text-accent/80 hover:text-accent px-3 py-1.5 text-sm rounded-full 
                 transition-all duration-300"
    >
      Reiniciar
    </Button>
  </div>
);