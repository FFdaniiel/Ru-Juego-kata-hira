import { Star, Trophy, LucideIcon, Flame, Crown, Zap, Award } from "lucide-react";
import { GameState } from "../types/game";

export interface Achievement {
  id: string;
  icon: LucideIcon; 
  title: string;
  description: string;
  xpReward: number;
  condition: (state: GameState) => boolean;  
}

export const achievements: Achievement[] = [
  {
    id: 'first_streak',
    icon: Trophy,
    title: "Primera racha",
    description: "5 respuestas correctas seguidas",
    xpReward: 100,
    condition: (state: GameState) => state.score.streak >= 5
  },
  {
    id: 'perfect_accuracy',
    icon: Star,
    title: "Precisión perfecta",
    description: "10 respuestas correctas sin errores",
    xpReward: 200,
    condition: (state: GameState) => 
      state.score.correct >= 10 && state.score.correct === state.score.total
  },
  {
    id: 'master_streak',
    icon: Crown,
    title: "Racha maestra",
    description: "20 respuestas correctas seguidas",
    xpReward: 300,
    condition: (state: GameState) => state.score.streak >= 20
  },
  {
    id: 'quick_learner',
    icon: Zap,
    title: "Aprendiz veloz",
    description: "Alcanza nivel 5",
    xpReward: 250,
    condition: (state: GameState) => state.level >= 5
  },
  {
    id: 'dakuten_master',
    icon: Award,
    title: "Maestro Dakuten",
    description: "Domina el nivel intermedio",
    xpReward: 400,
    condition: (state: GameState) => 
      state.difficulty === 'intermedio' && state.score.correct >= 30
  },
  {
    id: 'combo_king',
    icon: Flame,
    title: "Rey de las combinaciones",
    description: "Domina el nivel maestro",
    xpReward: 500,
    condition: (state: GameState) => 
      state.difficulty === 'maestro' && state.score.correct >= 50
  }
  // se puede seguir...
];