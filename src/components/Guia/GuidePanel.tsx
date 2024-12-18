import { FC, useState } from 'react'
import { useGame } from '../../context/GameContext'
import { SyllabaryTable } from './SyllabaryTable'

interface GuidePanelProps {
  isOpen: boolean
  onClose: () => void
}

export const GuidePanel: FC<GuidePanelProps> = ({ isOpen, onClose }) => {
  const { state } = useGame()
  const [isTableOpen, setIsTableOpen] = useState(false)

  return (
    <>
      {/* Overlay para cerrar al hacer clic fuera */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}

      {/* Panel deslizable */}
      <div
        className={`
          fixed top-0 right-0 h-full w-full max-w-md bg-primary/95 backdrop-blur-sm
          p-6 shadow-xl transition-all duration-300 z-50
          transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <div className="h-full overflow-y-auto">
          {/* Encabezado */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-text">Guía de Uso</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-secondary/20 transition-colors"
            >
              <span className="text-2xl text-text">×</span>
            </button>
          </div>

          {/* Contenido */}
          <div className="space-y-6 text-text">
            {/* Sección: Cómo jugar */}
            <section>
              <h3 className="text-xl font-semibold mb-3">Cómo Jugar</h3>
              <p className="mb-2">
                Practica tu conocimiento de
                {state.syllabary === 'hiragana' ? ' Hiragana ' : ' Katakana '}
                siguiendo estos pasos:
              </p>
              <ol className="list-decimal list-inside space-y-2 pl-2">
                <li>Observa el carácter japonés mostrado</li>
                <li>Escribe su pronunciación en romanji</li>
                <li>Presiona Enter o el botón de enviar para verificar</li>
              </ol>
            </section>

            {/* Sección: Niveles de Dificultad */}
            <section>
              <h3 className="text-xl font-semibold mb-3">
                Niveles de Dificultad
              </h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium">Básico</h4>
                  <p className="text-sm opacity-90">
                    Solo caracteres básicos sin modificaciones
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">Intermedio</h4>
                  <p className="text-sm opacity-90">
                    Incluye caracteres con dakuten (゛)
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">Avanzado</h4>
                  <p className="text-sm opacity-90">
                    Añade caracteres con handakuten (゜)
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">Maestro</h4>
                  <p className="text-sm opacity-90">
                    Todos los caracteres, incluyendo combinaciones
                  </p>
                </div>
              </div>
            </section>

            {/* Sección: Modos de Juego */}
            <section>
              <h3 className="text-xl font-semibold mb-3">Modos de Juego</h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium">Práctica Libre</h4>
                  <p className="text-sm opacity-90">
                    Practica sin límite de tiempo
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">Contrarreloj</h4>
                  <p className="text-sm opacity-90">
                    Responde la mayor cantidad en tiempo limitado
                  </p>
                </div>
              </div>
            </section>
          </div>
          <button
            onClick={() => setIsTableOpen(true)}
            className="w-full px-4 py-2 mt-10 bg-accent text-text rounded-xl 
                  hover:bg-accent-dark transition-colors mb-4"
          >
            Ver tabla de{' '}
            {state.syllabary === 'hiragana' ? 'Hiragana' : 'Katakana'}
          </button>
        </div>
      </div>

      {/* Tabla como componente separado */}
      {isTableOpen && (
        <SyllabaryTable 
          isOpen={isTableOpen}
          onClose={() => setIsTableOpen(false)}
        />
      )}
    </>
  )
}
