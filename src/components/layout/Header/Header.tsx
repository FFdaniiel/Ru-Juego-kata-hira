import { FC, useState } from 'react'
import { HiMenuAlt3 } from 'react-icons/hi'
import { useGame } from '../../../context/GameContext'
import { GuidePanel } from '../../Guia/GuidePanel'
import { Button } from '@headlessui/react'

export const Header: FC = () => {

  const { state, setSyllabary } = useGame()
  const [isGuidePanelOpen, setIsGuidePanelOpen] = useState(false)

  return (
    <div className="bg-first-bg w-full p-4">
      <header className="relative">
        {/* Botones de selección de silabario */}
        <nav className="mt-16 md:mt-0">
          <div className="flex gap-2">
            <Button
              onClick={() => setSyllabary('hiragana')}
              className={`
              relative px-6 py-3 text-lg font-medium rounded-2xl transition-all duration-300
              ${
                state.syllabary === 'hiragana'
                  ? 'bg-accent text-text shadow-card translate-y-[-2px]'
                  : 'bg-primary text-text-dark hover:bg-primary-dark'
              }
            `}
            >
              Hiragana
              {state.syllabary === 'hiragana' && (
                <span
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2
                             w-2 h-2 bg-accent rounded-full"
                />
              )}
            </Button>

            <Button
              onClick={() => setSyllabary('katakana')}
              className={`
              relative px-6 py-3 text-lg font-medium rounded-2xl transition-all duration-300
              ${
                state.syllabary === 'katakana'
                  ? 'bg-accent text-text shadow-card translate-y-[-2px]'
                  : 'bg-primary text-text-dark hover:bg-primary-dark'
              }
            `}
            >
              Katakana
              {state.syllabary === 'katakana' && (
                <span
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2
                             w-2 h-2 bg-accent rounded-full"
                />
              )}
            </Button>

            {/* <Button
              onClick={() =>  setSyllabary('proximamente')}
              className={`
              relative px-6 py-3 text-lg font-medium rounded-2xl transition-all duration-300 bg-accent text-text shadow-card translate-y-[-2px]
              ${
                state.syllabary === 'proximamente'
                  ? 'bg-accent text-text shadow-card translate-y-[-2px]'
                  : 'bg-primary text-text-dark hover:bg-primary-dark'
              }
            `}
            >
              Proximamente
              {state.syllabary === 'proximamente' && (
                <span
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2
                             w-2 h-2 bg-accent rounded-full"
                />
              )}
            </Button> */}

            {/* Botón de guía */}
            <Button
              onClick={() => setIsGuidePanelOpen(true)}
              className="absolute top-[-1rem] right-[-1rem] p-5 rounded-full 
                    bg-primary hover:bg-primary-dark text-text transition-all 
                    duration-300 shadow-soft z-20"
            >
              <HiMenuAlt3 className="w-6 h-6" />
            </Button>

            {/* Panel de guía */}
            <GuidePanel
              isOpen={isGuidePanelOpen}
              onClose={() => setIsGuidePanelOpen(false)}
            />
          </div>
        </nav>
      </header>
    </div>
  )
}
