// src/components/game/GameContainer/components/StatsPanel.tsx
import { FC } from 'react'
import { useGame } from '../../../context/GameContext'
import { achievements } from '../../../utils/achievements'

export const StatsPanel: FC = () => {
  const { state } = useGame()

  const accuracy =
    state.score.total > 0
      ? Math.round((state.score.correct / state.score.total) * 100)
      : 0

  // Sistema de logros

  // Calcular nivel de experiencia basado en respuestas correctas
  const calculateLevel = (exp: number) => {
    return Math.floor(exp / 1000) + 1 // Cada 1000 exp = 1 nivel
  }

  const calculateLevelProgress = (exp: number) => {
    return (exp % 1000) / 10 // Porcentaje al siguiente nivel
  }

  const level = calculateLevel(state.experience)
  const levelProgress = calculateLevelProgress(state.experience)
  // Filtrar solo logros no conseguidos para mostrar
  const pendingAchievements = achievements.filter(
    (a) => !state.achievements.includes(a.id)
  )

  return (
    <div className="w-72 bg-primary/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
      <h3 className="text-xl font-medium text-text mb-4">Estadísticas</h3>

      <div className="space-y-6">
        {/* Sección de Precisión */}
        <div>
          <p className="text-sm text-text/70 mb-1">Precisión</p>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-medium text-accent">{accuracy}</span>
            <span className="text-text/70">%</span>
          </div>
        </div>

        {/* Sección de Rachas */}
        <div>
          <div className="flex justify-between mb-3">
            <div>
              <p className="text-sm text-text/70">Racha actual</p>
              <p className="text-xl text-text">{state.score.streak}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-text/70">Mejor racha</p>
              <p className="text-xl text-text">{state.score.bestStreak}</p>
            </div>
          </div>
        </div>

        {/* Total de respuestas */}
        <div>
          <p className="text-sm text-text/70 mb-1">Respondidas</p>
          <p className="text-xl text-text">
            <span className="text-accent">{state.score.correct}</span>
            <span className="mx-2 text-text/50">/</span>
            <span>{state.score.total}</span>
          </p>
        </div>

        {/* Nivel actual */}
        <div className="pt-4 border-t border-secondary/20">
          <p className="text-sm text-text/70 mb-1">Nivel actual</p>
          <div>
            <p className="text-lg text-text capitalize">{state.difficulty}</p>
            <p className="text-sm text-text/70 capitalize">{state.syllabary}</p>
          </div>
        </div>
      </div>
      {/*  */}
      {/* Nivel y Experiencia */}
      <div className="mb-8">
        <div className="flex items-baseline justify-between mb-2">
          <p className="text-lg text-accent">Nivel {level}</p>
          <p className="text-sm text-text-dark">{state.experience} EXP</p>
        </div>
        <div className="w-full h-2 bg-secondary/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-accent transition-all duration-500"
            style={{ width: `${levelProgress}%` }}
          />
        </div>
      </div>

      {/* Próximos logros */}
      {pendingAchievements.length > 0 && (
        <div>
          <h3 className="text-lg font-medium text-text mb-4">
            Próximos logros
          </h3>
          <div className="space-y-3">
            {pendingAchievements.slice(0, 3).map((achievement) => (
              <div
                key={achievement.id}
                className="flex items-center gap-3 p-3 rounded-xl bg-secondary/10
                          hover:bg-secondary/20 transition-all"
              >
                <achievement.icon className="w-5 h-5 text-text-dark" />
                <div>
                  <p className="text-sm font-medium">{achievement.title}</p>
                  <p className="text-xs text-text-dark">
                    {achievement.description} • +{achievement.xpReward} EXP
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      
    </div>
  )
}
