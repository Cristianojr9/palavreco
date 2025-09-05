import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { isValidWord } from '../data/words';
import { useSounds } from '../hooks/useSounds';
import { useWordleGame } from '../hooks/useWordleGame';
import { GameBoard } from './GameBoard';
import { GameModal } from './GameModal';
import { VirtualKeyboard } from './VirtualKeyboard';

interface WordleGameProps {
  onGoHome: () => void;
  onGameFinish?: () => void;
}

const WordleGame: React.FC<WordleGameProps> = ({ onGoHome, onGameFinish }) => {
  const { gameState, addLetter, removeLetter, submitGuess, resetGame } = useWordleGame();
  const { playBackgroundMusic, stopBackgroundMusic } = useSounds();
  const [showModal, setShowModal] = useState(false);
  const [previousGameStatus, setPreviousGameStatus] = useState<'playing' | 'won' | 'lost'>('playing');

  const handleKeyPress = (key: string) => {
    if (gameState.gameStatus !== 'playing') {
      return;
    }
    
    // Verificar se a letra já foi marcada como ausente
    const letterState = gameState.keyStates[key.toUpperCase()];
    if (letterState === 'absent') {
      // O feedback tátil já é fornecido pelo hook
      return;
    }
    
    addLetter(key);
  };

  const handleEnter = () => {
    if (gameState.gameStatus !== 'playing') {
      return;
    }
    
    if (gameState.currentGuess.length < 5) {
      Alert.alert('Palavra incompleta', 'Digite uma palavra de 5 letras!');
      return;
    }
    
    if (!isValidWord(gameState.currentGuess)) {
      Alert.alert('Palavra inválida', 'Esta palavra não existe no dicionário!');
      return;
    }
    
    submitGuess();
  };

  const handleBackspace = () => {
    if (gameState.gameStatus !== 'playing') {
      return;
    }
    removeLetter();
  };

  const handleReset = () => {
    resetGame();
    setShowModal(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleGoHome = () => {
    setShowModal(false);
    onGoHome();
  };

  // Tocar música de fundo quando o jogo inicia
  useEffect(() => {
    // Aguardar um pouco para garantir que os sons estejam carregados
    const timer = setTimeout(() => {
      playBackgroundMusic();
    }, 1000);
    
    return () => {
      clearTimeout(timer);
      stopBackgroundMusic();
    };
  }, [playBackgroundMusic, stopBackgroundMusic]);

  // Mostrar modal quando o jogo termina
  useEffect(() => {
    if (gameState.gameStatus !== 'playing' && gameState.gameStatus !== previousGameStatus) {
      setShowModal(true);
      setPreviousGameStatus(gameState.gameStatus);
    }
  }, [gameState.gameStatus, previousGameStatus]);

  const getGameMessage = () => {
    switch (gameState.gameStatus) {
      case 'won':
        return `🎉 Parabéns! A palavra era ${gameState.targetWord}`;
      case 'lost':
        return `😔 Que pena! A palavra era ${gameState.targetWord}`;
      default:
        return `Tentativa ${gameState.currentRow + 1} de 6`;
    }
  };

  const getAttempts = () => {
    return gameState.gameStatus === 'won' ? gameState.currentRow : gameState.currentRow;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>PALAVRECO</Text>
        <Text style={styles.subtitle}>{getGameMessage()}</Text>
      </View>

      <GameBoard
        guesses={gameState.guesses}
        currentGuess={gameState.currentGuess}
        currentRow={gameState.currentRow}
      />

      <VirtualKeyboard
        onKeyPress={handleKeyPress}
        onEnter={handleEnter}
        onBackspace={handleBackspace}
        keyStates={gameState.keyStates}
      />

      <GameModal
        visible={showModal}
        gameStatus={gameState.gameStatus}
        targetWord={gameState.targetWord}
        attempts={getAttempts()}
        onClose={handleCloseModal}
        onPlayAgain={handleReset}
        onGoHome={handleGoHome}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121213',
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: 3,
    fontFamily: 'System',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  subtitle: {
    fontSize: 18,
    color: '#ffffff',
    marginTop: 12,
    textAlign: 'center',
    fontFamily: 'System',
    opacity: 0.9,
  },
});

export default WordleGame;
