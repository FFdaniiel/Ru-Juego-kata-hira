import { FC, useState, useRef } from 'react';
import { Button } from '../../shared/ui/Btn/Btn';

interface InputFieldProps {
  onAnswer: (answer: string) => void;
}

export const InputField: FC<InputFieldProps> = ({ onAnswer }) => {
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Manejador de envío de respuesta
  const handleSubmit = () => {
    if (!input.trim()) return;
    
    onAnswer(input.trim().toLowerCase());
    setInput('');
    inputRef.current?.focus();
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Campo de entrada */}
      <input
        ref={inputRef}
        type="text"
        value={input}
        maxLength={3}
        className="w-32 px-4 py-2 text-xl text-center bg-secondary/50 
                   rounded-xl focus:outline-none focus:ring-2 focus:ring-accent
                   text-accent placeholder-accent/50 transition-all duration-300
                   hover:bg-secondary/70"
        placeholder="romaji"
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && input.trim()) {
            handleSubmit();
          }
        }}
        autoFocus
      />

      {/* Botón de envío */}
      <Button
        variant="accent"
        size="md"
        onClick={handleSubmit}
        disabled={!input.trim()}
      >
        Enviar
      </Button>
    </div>
  );
};