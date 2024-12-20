import { FC } from 'react'
import { useGame } from '../../../context/GameContext'
import { Dialog, DialogContent } from '../../ui/dialog'
import { DifficultyLevel } from '../../../types/game'
import { getFinalFeedback } from '../../../utils/gameHelpers'

interface ResultsModalProps {
  isOpen: boolean
  onClose: () => void
  onRestart: (minutes: number) => void
  lastSelectedTime: number
}

export const ResultsModal: FC<ResultsModalProps> = ({ isOpen, onClose, onRestart,lastSelectedTime }) => {
  const { state, setSyllabary, setDifficulty, startGame, resetScore } =
    useGame()

  // Calcular estadísticas
  const accuracy =
    state.score.total > 0
      ? Math.round((state.score.correct / state.score.total) * 100)
      : 0

  const expGained = state.score.correct * 10 // EXP base
  const timeBonus = Math.floor(state.score.correct / 10) * 50 // Bonus por velocidad

  // Obtener feedback basado en el rendimiento
  const { message, readyForNext } = getFinalFeedback(
    state.score.correct,
    state.score.total,
    state.difficulty
  )

  const nextLevel: Record<
    Exclude<DifficultyLevel, 'maestro'>,
    DifficultyLevel
  > = {
    basico: 'intermedio',
    intermedio: 'avanzado',
    avanzado: 'maestro',
  }
  // handlePlay es para reiniciar el juego
  const handlePlayAgain = () => {
    resetScore();
    startGame(state.mode, state.difficulty);
    onRestart(lastSelectedTime);
    onClose()
  }
  // handleLevelUp es para subir de nivel
  const handleLevelUp = () => {
    const next =
      nextLevel[state.difficulty as Exclude<DifficultyLevel, 'maestro'>]
    if (next) {
        setDifficulty(next)
        resetScore()
        startGame(state.mode, next)
        onRestart(lastSelectedTime)
        onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="fixed left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 z-[150]">
        <div className="bg-primary/95 backdrop-blur-sm rounded-2xl p-6 w-full max-w-md">
          <h2 className="text-2xl font-bold text-text mb-6 text-center">
            ¡Tiempo terminado!
          </h2>

          {/* Estadísticas principales */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-secondary/20 p-4 rounded-xl text-center">
              <p className="text-sm text-text-dark mb-1">
                Respuestas Correctas
              </p>
              <p className="text-3xl font-bold text-accent">
                {state.score.correct}
              </p>
            </div>
            <div className="bg-secondary/20 p-4 rounded-xl text-center">
              <p className="text-sm text-text-dark mb-1">Precisión</p>
              <p className="text-3xl font-bold text-accent">{accuracy}%</p>
            </div>
          </div>

          {/* Detalles adicionales */}
          <div className="space-y-3 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-text-dark">Total de intentos</span>
              <span className="text-text">{state.score.total}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-text-dark">Mejor racha</span>
              <span className="text-text">{state.score.bestStreak}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-text-dark">EXP Base</span>
              <span className="text-accent">+{expGained}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-text-dark">Bonus de velocidad</span>
              <span className="text-accent">+{timeBonus}</span>
            </div>
            <div className="h-px bg-secondary/20 my-2" />
            <div className="flex justify-between items-center font-medium">
              <span className="text-text">Total EXP</span>
              <span className="text-accent">+{expGained + timeBonus}</span>
            </div>
          </div>

          {/* Mensaje de feedback */}
          <div
            className={`
            p-4 rounded-xl mb-6
            ${readyForNext ? 'bg-accent/20' : 'bg-secondary/20'}
          `}
          >
            <p className="text-text">{message}</p>
          </div>

          {/* Botones de acción */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-secondary/20 hover:bg-secondary/30 
                       text-text rounded-xl transition-all duration-300"
            >
              Cerrar
            </button>
            <button
              onClick={handlePlayAgain}
              className="flex-1 px-4 py-2 bg-accent hover:bg-accent-dark 
                       text-text rounded-xl transition-all duration-300"
            >
              Jugar de nuevo
            </button>
          </div>

          {/* Botón de subir nivel */}
          {readyForNext && state.difficulty !== 'maestro' && (
            <button
              onClick={handleLevelUp}
              className="mt-4 w-full px-4 py-2 bg-accent hover:bg-accent-dark 
                       text-text rounded-xl transition-all duration-300"
            >
              Subir a nivel{' '}
              {
                nextLevel[
                  state.difficulty as Exclude<DifficultyLevel, 'maestro'>
                ]
              }
            </button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
