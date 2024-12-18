import { toast, ToastOptions } from 'react-toastify'

// Diferentes tipos de mensajes para más variedad
const successMessages = [
  '¡Perfecto! 🎯',
  '¡Excelente! 🌟',
  '¡Así se hace! ✨',
  '¡Increíble! 🎉',
  '¡Muy bien! 🔥',
  '¡Sigues mejorando! 💪',
  '¡Fantástico! ⭐',
  '¡Espectacular! 🌈',
  '¡Asombroso! ⚡',
  '¡Brillante! 💫',
  '¡Magistral! 👑',
  '¡Inmejorable! 🤩',
  '¡Impresionante! 🤯',
]

// Mensajes específicos para rachas
const getStreakMessage = (streak: number) => {
  const messages = {
    5: ['¡Racha de 5! 🌟', '¡5 seguidos! ⭐', '¡Vas en racha! 🔥'],
    10: ['¡10 Seguidos! 🏆', '¡Increíble racha de 10! 🌟', '¡Imparable! 🔥'],
    15: ['¡15 Respuestas perfectas! 🎯', '¡Eres increíble! 🌟', '¡Maestro! 👑'],
    20: ['¡RACHA DE 20! 👑', '¡LEGENDARIO! 🏆', '¡IMPARABLE! ⚡'],
    25: ['¡25 Respuestas perfectas! 🌠', '¡NIVEL DIOS! ✨', '¡INCREÍBLE! 💫'],
    30: ['¡30 PERFECTOS! 🎯 ','¡MAESTRÍA ABSOLUTA! 💫 ','¡LEYENDA VIVIENTE! 👑 '],
    50: ['¡50 SEGUIDOS! 🌟', '¡LEGENDARIO! 🏆 ', '¡IMPARABLE! ⚡'],
  }

  // Si es un hito exacto, retornar su mensaje
  if (Object.prototype.hasOwnProperty.call(messages, streak)) {
    const options = messages[streak as keyof typeof messages]
    return options[Math.floor(Math.random() * options.length)]
  }

  // Para números entre hitos, mostrar el número actual ocasionalmente
  if (streak % 3 === 0) {
    return `¡${streak} seguidos! 🔥`
  }

  return null
}

const getRandomSuccessMessage = () => {
  return successMessages[Math.floor(Math.random() * successMessages.length)]
}

const toastConfig: ToastOptions = {
  position: 'top-right',
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'light',
}
let lastToastId: string | number | undefined

export const showAnswerFeedback = (
  isCorrect: boolean,
  streak: number,
  correctAnswer?: string,
  expGained?: number
) => {
  if (lastToastId) {
    toast.dismiss(lastToastId)
  }

  if (isCorrect) {
    const streakMessage = getStreakMessage(streak)

    if (streakMessage) {
      lastToastId = toast.success(
        `${streakMessage}${expGained ? `\n+${expGained} EXP` : ''}`,
        {
          ...toastConfig,
          className: 'streak-toast',
        }
      )
    } else if (streak % 3 === 0) {
      lastToastId = toast.success(
        `${getRandomSuccessMessage()}${expGained ? `\n+${expGained} EXP` : ''}`,
        toastConfig
      )
    }
  } else {
    lastToastId = toast.error(`La respuesta era "${correctAnswer}"`, {
      ...toastConfig,
      autoClose: 3000,
    })
  }
}
