// src/layout/Background/Background.tsx
import { useCallback, useEffect, useState } from 'react';
import { useGame  } from '../../../context/GameContext';
import { HIRAGANA, KATAKANA } from '../../../constants/syllabaries';
import styles from './Background.module.css';

export const Background = () => {
  const { state  } = useGame();
  const [randomChars, setRandomChars] = useState<string[]>([]);

  // Actualizar caracteres cuando cambie el sistema o al montar el componente
  

  // Función para obtener caracteres aleatorios
  const getRandomChars = useCallback((count: number) => {
    const currentSyllabary = state.syllabary === 'hiragana' ? HIRAGANA : KATAKANA;
    return Array.from({ length: count }, () => {
      const randomIndex = Math.floor(Math.random() * currentSyllabary.length);
      return currentSyllabary[randomIndex].japanese;
    });
  }, [state.syllabary])

  useEffect(() => {
    setRandomChars(getRandomChars(6));
  }, [getRandomChars]);
  

  return (
    <div className={styles.container}>
      {randomChars.map((char, index) => (
        <div 
          key={`${char}-${index}`}
          className={`${styles.floatingChar} ${styles.animate}`}
          style={{
            left: `${(index * 30)}vw`,
            top: `${90}vh`,
            animationDelay: `${index * 0.5}s`
          }}
        >
          {char}
        </div>
      ))}
    </div>
  );
};

export default Background;