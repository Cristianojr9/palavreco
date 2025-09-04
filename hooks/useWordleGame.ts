import { useCallback, useState } from 'react';
import { LetterState } from '../components/GameBoard';
import { getRandomWord, isValidWord } from '../data/words';
import { useHaptics } from './useHaptics';
import { useSounds } from './useSounds';

export interface GameState {
  guesses: LetterState[][];
  currentGuess: string;
  currentRow: number;
  gameStatus: 'playing' | 'won' | 'lost';
  targetWord: string;
  keyStates: { [key: string]: 'correct' | 'present' | 'absent' | 'unused' };
}

export const useWordleGame = () => {
  const haptics = useHaptics();
  const sounds = useSounds();
  
  const [gameState, setGameState] = useState<GameState>(() => {
    const targetWord = getRandomWord();
    return {
      guesses: Array(6).fill(null).map(() => 
        Array(5).fill({ letter: '', status: 'empty' })
      ),
      currentGuess: '',
      currentRow: 0,
      gameStatus: 'playing',
      targetWord,
      keyStates: {},
    };
  });

  const evaluateGuess = useCallback((guess: string, target: string): LetterState[] => {
    const result: LetterState[] = [];
    const targetLetters = target.split('');
    const guessLetters = guess.split('');
    
    // Primeiro, marcar letras corretas
    for (let i = 0; i < 5; i++) {
      if (guessLetters[i] === targetLetters[i]) {
        result[i] = { letter: guessLetters[i], status: 'correct' };
        targetLetters[i] = ''; // Marcar como usada
      } else {
        result[i] = { letter: guessLetters[i], status: 'empty' };
      }
    }
    
    // Depois, marcar letras presentes mas em posição errada
    for (let i = 0; i < 5; i++) {
      if (result[i].status === 'empty') {
        const letterIndex = targetLetters.indexOf(guessLetters[i]);
        if (letterIndex !== -1) {
          result[i] = { letter: guessLetters[i], status: 'present' };
          targetLetters[letterIndex] = ''; // Marcar como usada
        } else {
          result[i] = { letter: guessLetters[i], status: 'absent' };
        }
      }
    }
    
    return result;
  }, []);

  const updateKeyStates = useCallback((newGuess: LetterState[]) => {
    setGameState(prev => {
      const newKeyStates = { ...prev.keyStates };
      
      newGuess.forEach(({ letter, status }) => {
        const currentState = newKeyStates[letter];
        
        // Só atualizar se o novo status for "melhor"
        if (status === 'correct' || 
            (status === 'present' && currentState !== 'correct') ||
            (status === 'absent' && !currentState)) {
          newKeyStates[letter] = status;
        }
      });
      
      return { ...prev, keyStates: newKeyStates };
    });
  }, []);

  const addLetter = useCallback((letter: string) => {
    if (gameState.gameStatus !== 'playing' || gameState.currentGuess.length >= 5) {
      return;
    }

    // Verificar se a letra já foi marcada como ausente em tentativas anteriores
    const letterState = gameState.keyStates[letter.toUpperCase()];
    if (letterState === 'absent') {
      haptics.playError();
      return; // Não permitir adicionar letras que já foram marcadas como ausentes
    }

    haptics.playKeyPress();
    sounds.playKeyPress();
    setGameState(prev => ({
      ...prev,
      currentGuess: prev.currentGuess + letter.toUpperCase(),
    }));
  }, [gameState.gameStatus, gameState.currentGuess.length, gameState.keyStates, haptics, sounds]);

  const removeLetter = useCallback(() => {
    if (gameState.gameStatus !== 'playing' || gameState.currentGuess.length === 0) {
      return;
    }

    haptics.playKeyPress();
    sounds.playKeyPress();
    setGameState(prev => ({
      ...prev,
      currentGuess: prev.currentGuess.slice(0, -1),
    }));
  }, [gameState.gameStatus, gameState.currentGuess.length, haptics, sounds]);

  const submitGuess = useCallback(() => {
    if (gameState.gameStatus !== 'playing' || 
        gameState.currentGuess.length !== 5 || 
        gameState.currentRow >= 6) {
      return;
    }

    const guess = gameState.currentGuess;
    
    // Validar se a palavra existe
    if (!isValidWord(guess)) {
      return; // A validação será feita no componente principal
    }
    
    const evaluatedGuess = evaluateGuess(guess, gameState.targetWord);
    
    // Tocar sons baseados no resultado
    evaluatedGuess.forEach(({ status }) => {
      switch (status) {
        case 'correct':
          haptics.playCorrect();
          sounds.playCorrect();
          break;
        case 'present':
          haptics.playPresent();
          sounds.playPresent();
          break;
        case 'absent':
          haptics.playAbsent();
          sounds.playAbsent();
          break;
      }
    });
    
    setGameState(prev => {
      const newGuesses = [...prev.guesses];
      newGuesses[prev.currentRow] = evaluatedGuess;
      
      const isCorrect = evaluatedGuess.every(({ status }) => status === 'correct');
      const isLastRow = prev.currentRow === 5;
      
      let newGameStatus: 'playing' | 'won' | 'lost' = 'playing';
      if (isCorrect) {
        newGameStatus = 'won';
        haptics.playWin();
        sounds.playWin();
      } else if (isLastRow) {
        newGameStatus = 'lost';
        haptics.playLose();
        sounds.playLose();
      }
      
      return {
        ...prev,
        guesses: newGuesses,
        currentGuess: '',
        currentRow: prev.currentRow + 1,
        gameStatus: newGameStatus,
      };
    });
    
    updateKeyStates(evaluatedGuess);
  }, [gameState.gameStatus, gameState.currentGuess, gameState.currentRow, gameState.targetWord, evaluateGuess, updateKeyStates]);

  const resetGame = useCallback(() => {
    const newTargetWord = getRandomWord();
    setGameState({
      guesses: Array(6).fill(null).map(() => 
        Array(5).fill({ letter: '', status: 'empty' })
      ),
      currentGuess: '',
      currentRow: 0,
      gameStatus: 'playing',
      targetWord: newTargetWord,
      keyStates: {},
    });
  }, []);

  return {
    gameState,
    addLetter,
    removeLetter,
    submitGuess,
    resetGame,
  };
};
