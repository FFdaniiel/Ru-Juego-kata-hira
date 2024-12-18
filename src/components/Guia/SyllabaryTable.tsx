import { FC } from 'react'
import { useGame } from '../../context/GameContext'
import {
  HIRAGANA,
  KATAKANA,
  HIRAGANA_DAKUTEN,
  KATAKANA_DAKUTEN,
  HIRAGANA_HANDAKUTEN,
  KATAKANA_HANDAKUTEN,
  KATAKANA_COMBO,
  HIRAGANA_COMBO,
} from '../../constants/syllabaries'
import { Dialog, DialogContent } from '../../components/ui/dialog'

interface SyllabaryTableProps {
  isOpen: boolean
  onClose: () => void
}

interface GroupedSyllables {
  [key: string]: {
    japanese: string
    romaji: string
  }[]
}

export const SyllabaryTable: FC<SyllabaryTableProps> = ({
  isOpen,
  onClose,
}) => {
  const { state } = useGame()

  const handleClose = () => {
    onClose()
  }

  const groupSyllables = (): GroupedSyllables => {
    const currentSyllabary =
      state.syllabary === 'hiragana' ? HIRAGANA : KATAKANA
    const currentDakuten =
      state.syllabary === 'hiragana' ? HIRAGANA_DAKUTEN : KATAKANA_DAKUTEN
    const currentHandakuten =
      state.syllabary === 'hiragana' ? HIRAGANA_HANDAKUTEN : KATAKANA_HANDAKUTEN
    const currentCombo =
      state.syllabary === 'hiragana' ? HIRAGANA_COMBO : KATAKANA_COMBO

    // Agrupar por tipo
    const grouped = currentSyllabary.reduce((acc, syllable) => {
      const group = syllable.group || 'otros'
      if (!acc[group]) acc[group] = []
      acc[group].push(syllable)
      return acc
    }, {} as GroupedSyllables)

    // Añadir grupos especiales
    grouped['dakuten'] = currentDakuten
    grouped['handakuten'] = currentHandakuten
    grouped['combo'] = currentCombo

    return grouped
  }

  const groupedSyllables = groupSyllables()

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent
        className={`
          fixed left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 z-[150]
          transition-all duration-300 ease-out
          data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95
          data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95
        `}
        onPointerDownOutside={handleClose}
        onEscapeKeyDown={handleClose}
      >
        <div className="bg-primary/95 backdrop-blur-sm rounded-2xl w-[95vw] max-w-4xl max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="p-4 sm:p-6 pb-2 sticky top-0 bg-primary/95 backdrop-blur-sm z-10">
            <div className="flex justify-between items-center">
              <h2 className="text-xl sm:text-2xl font-bold text-text">
                Tabla de{' '}
                {state.syllabary === 'hiragana' ? 'Hiragana' : 'Katakana'}
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-secondary/20 transition-colors"
              >
                <span className="text-2xl text-text">×</span>
              </button>
            </div>
          </div>

          {/* Contenedor con scroll */}
          <div className="px-3 sm:px-6 pb-4 sm:pb-6">
            <div
              className="max-h-[70vh] overflow-y-auto pr-2
              [&::-webkit-scrollbar]:w-1.5
              [&::-webkit-scrollbar]:h-1.5
              [&::-webkit-scrollbar-track]:rounded-full
              [&::-webkit-scrollbar-track]:bg-secondary/10
              [&::-webkit-scrollbar-thumb]:rounded-full
              [&::-webkit-scrollbar-thumb]:bg-secondary/30
              [&::-webkit-scrollbar-thumb:hover]:bg-secondary/50"
            >
              {/* Contenido de la tabla */}
              <div className="overflow-x-auto">
                <div className="min-w-[600px]">
                  <div className="border border-secondary/20 rounded-lg overflow-hidden mb-6 bg-secondary/5">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-secondary/20">
                          <th className="p-2 text-text"></th>
                          <th className="p-2 text-text">A</th>
                          <th className="p-2 text-text">I</th>
                          <th className="p-2 text-text">U</th>
                          <th className="p-2 text-text">E</th>
                          <th className="p-2 text-text">O</th>
                          <th className="p-2 text-text">N</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(groupedSyllables)
                          .filter(
                            ([group]) =>
                              !['dakuten', 'handakuten', 'combo'].includes(
                                group
                              )
                          )
                          .map(([group, syllables]) => (
                            <tr
                              key={group}
                              className="border-t border-secondary/20"
                            >
                              <th className="p-2 text-text-dark bg-secondary/10">
                                {group.toUpperCase()}
                              </th>
                              {syllables.map((syllable) => (
                                <td
                                  key={syllable.japanese}
                                  className="p-4 text-center"
                                >
                                  <div className="text-3xl font-jp mb-1">
                                    {syllable.japanese}
                                  </div>
                                  <div className="text-xs text-text-dark">
                                    {syllable.romaji}
                                  </div>
                                </td>
                              ))}
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Dakuten y Handakuten */}
              <div className="mt-6 grid gap-6">
                {/* Dakuten */}
                <div>
                  <h3 className="text-lg font-medium text-accent mb-2">
                    Dakuten (゛)
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                    {groupedSyllables['dakuten'].map((syllable) => (
                      <div
                        key={syllable.japanese}
                        className="p-2 bg-secondary/20 rounded-lg text-center"
                      >
                        <div className="text-2xl sm:text-3xl font-jp mb-1">
                          {syllable.japanese}
                        </div>
                        <div className="text-xs text-text-dark">
                          {syllable.romaji}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Handakuten */}
                <div>
                  <h3 className="text-lg font-medium text-accent mb-2">
                    Handakuten (゜)
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                    {groupedSyllables['handakuten'].map((syllable) => (
                      <div
                        key={syllable.japanese}
                        className="p-2 bg-secondary/20 rounded-lg text-center"
                      >
                        <div className="text-3xl font-jp mb-1">
                          {syllable.japanese}
                        </div>
                        <div className="text-xs text-text-dark">
                          {syllable.romaji}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Combinaciones (yōon) */}
                <div>
                  <h3 className="text-lg font-medium text-accent mb-2">
                    Combinaciones
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                    {groupedSyllables['combo'].map((syllable) => (
                      <div
                        key={syllable.japanese}
                        className="p-2 bg-secondary/20 rounded-lg text-center"
                      >
                        <div className="text-3xl font-jp mb-1">
                          {syllable.japanese}
                        </div>
                        <div className="text-xs text-text-dark">
                          {syllable.romaji}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
