import { FC } from 'react';
import { useGame } from '../../../context/GameContext';

interface DifficultyInfo {
  key: 'basico' | 'intermedio' | 'avanzado' | 'maestro';
  title: string;
  description: string;
  includes: string[];
}

const difficultyLevels: DifficultyInfo[] = [
  {
    key: 'basico',
    title: 'Básico',
    description: 'Ideal para comenzar',
    includes: ['Sílabas básicas']
  },
  {
    key: 'intermedio',
    title: 'Intermedio',
    description: 'Incluye dakuten (゛)',
    includes: ['Sílabas básicas', 'Dakuten (が, ざ, だ, ば)']
  },
  {
    key: 'avanzado',
    title: 'Avanzado',
    description: 'Añade handakuten (゜)',
    includes: ['Sílabas básicas', 'Dakuten', 'Handakuten (ぱ, ぴ, ぷ, ぺ, ぽ)']
  },
  {
    key: 'maestro',
    title: 'Maestro',
    description: 'Todo incluido',
    includes: ['Sílabas básicas', 'Dakuten', 'Handakuten', 'Combinaciones (きょ, しゅ)']
  }
];

export const DifficultyPanel: FC = () => {
  const { state, startGame } = useGame();

  return (
    <div className="mt-8 p-6 bg-secondary/30 rounded-xl backdrop-blur-sm">
      <h2 className="text-xl font-medium text-text mb-4">Nivel de Dificultad</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {difficultyLevels.map((level) => (
          <button
            key={level.key}
            onClick={() => startGame(state.mode, level.key)}
            className={`
              relative p-4 rounded-lg transition-all duration-300
              ${state.difficulty === level.key 
                ? 'bg-accent text-text shadow-lg translate-y-[-2px]'
                : 'bg-primary/80 text-text-dark hover:bg-primary'
              }
            `}
          >
            <div className="mb-2 font-medium text-lg">{level.title}</div>
            <p className="text-sm opacity-80 mb-3">{level.description}</p>
            <ul className="text-xs space-y-1">
              {level.includes.map((item, index) => (
                <li key={index} className="flex items-center">
                  <span className="w-1 h-1 bg-current rounded-full mr-2" />
                  {item}
                </li>
              ))}
            </ul>
            {state.difficulty === level.key && (
              <span className="absolute top-2 right-2 w-2 h-2 bg-text rounded-full" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};