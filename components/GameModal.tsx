import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface GameModalProps {
  visible: boolean;
  gameStatus: 'won' | 'lost' | 'playing';
  targetWord: string;
  attempts: number;
  onClose: () => void;
  onPlayAgain: () => void;
}

export const GameModal: React.FC<GameModalProps> = ({
  visible,
  gameStatus,
  targetWord,
  attempts,
  onClose,
  onPlayAgain,
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
            <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={onClose}>
              <Text style={[styles.buttonText, styles.secondaryButtonText]}>Fechar</Text>
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
    padding: 24,
    margin: 20,
    alignItems: 'center',
    minWidth: 300,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 16,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 22,
  },
  stats: {
    fontSize: 18,
    color: '#ffd700',
    fontWeight: 'bold',
    marginBottom: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    backgroundColor: '#538d4e',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 120,
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#818384',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButtonText: {
    color: '#818384',
  },
});
