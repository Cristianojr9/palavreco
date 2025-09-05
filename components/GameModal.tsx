import React from 'react';
import { Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width, height } = Dimensions.get('window');

interface GameModalProps {
  visible: boolean;
  gameStatus: 'won' | 'lost' | 'playing';
  targetWord: string;
  attempts: number;
  onClose: () => void;
  onPlayAgain: () => void;
  onGoHome: () => void;
}

export const GameModal: React.FC<GameModalProps> = ({
  visible,
  gameStatus,
  targetWord,
  attempts,
  onClose,
  onPlayAgain,
  onGoHome,
}) => {
  const getTitle = () => {
    switch (gameStatus) {
      case 'won':
        return '🎉 Parabéns!';
      case 'lost':
        return '😔 Que pena!';
      default:
        return '';
    }
  };

  const getMessage = () => {
    switch (gameStatus) {
      case 'won':
        return `Você acertou a palavra "${targetWord}" em ${attempts} tentativa${attempts > 1 ? 's' : ''}!`;
      case 'lost':
        return `A palavra era "${targetWord}". Tente novamente!`;
      default:
        return '';
    }
  };

  const getStats = () => {
    if (gameStatus === 'won') {
      const stars = Math.max(0, 6 - attempts);
      return `⭐ ${stars} estrela${stars > 1 ? 's' : ''}`;
    }
    return null;
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>{getTitle()}</Text>
          <Text style={styles.message}>{getMessage()}</Text>
          {getStats() && (
            <Text style={styles.stats}>{getStats()}</Text>
          )}
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={onPlayAgain}>
              <Text style={styles.buttonText}>Jogar Novamente</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={onGoHome}>
              <Text style={[styles.buttonText, styles.secondaryButtonText]}>Menu Principal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#2d2d2d',
    borderRadius: 16,
    padding: 20,
    margin: 16,
    alignItems: 'center',
    maxWidth: width * 0.9,
    maxHeight: height * 0.6,
    minWidth: 280,
  },
  title: {
    fontSize: width < 400 ? 24 : 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 12,
    textAlign: 'center',
  },
  message: {
    fontSize: width < 400 ? 14 : 16,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: width < 400 ? 20 : 22,
    paddingHorizontal: 8,
  },
  stats: {
    fontSize: width < 400 ? 16 : 18,
    color: '#ffd700',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: width < 400 ? 'column' : 'row',
    gap: width < 400 ? 8 : 12,
    width: '100%',
  },
  button: {
    backgroundColor: '#538d4e',
    paddingHorizontal: width < 400 ? 16 : 20,
    paddingVertical: width < 400 ? 10 : 12,
    borderRadius: 8,
    minWidth: width < 400 ? 100 : 120,
    flex: width < 400 ? 0 : 1,
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#818384',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: width < 400 ? 14 : 16,
    fontWeight: 'bold',
  },
  secondaryButtonText: {
    color: '#818384',
  },
});
