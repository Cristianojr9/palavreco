import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { isValidWord } from '../data/words';
import { useSounds } from '../hooks/useSounds';
import { useStats } from '../hooks/useStats';
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
  const { recordGame } = useStats();
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
      // Apenas feedback tátil, sem alerta
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
    setPreviousGameStatus('playing'); // Reset para permitir modal na próxima partida
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
      
      // Registrar estatísticas
      if (gameState.gameStatus === 'won' || gameState.gameStatus === 'lost') {
        const won = gameState.gameStatus === 'won';
        const attempts = gameState.currentRow + 1; // +1 porque currentRow é 0-based
        recordGame(won, attempts);
      }
    }
  }, [gameState.gameStatus, previousGameStatus, recordGame]);

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
        <TouchableOpacity
          style={styles.backButton}
          onPress={onGoHome}
          activeOpacity={0.7}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          {/* <Logo size="medium" showText={false} /> */}
          <Text style={styles.description}>Descubra a palavra do dia</Text>
          <Text style={styles.subtitle}>{getGameMessage()}</Text>
        </View>
        <View style={styles.placeholder} />
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 20,
    marginTop: 40,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#3a3a3c',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 20,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
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
  description: {
    fontSize: 14,
    color: '#818384',
    marginTop: 4,
    textAlign: 'center',
    fontFamily: 'System',
  },
  subtitle: {
    fontSize: 18,
    color: '#ffffff',
    marginTop: 8,
    textAlign: 'center',
    fontFamily: 'System',
    opacity: 0.9,
  },
  placeholder: {
    width: 40,
  },
});

export default WordleGame;
