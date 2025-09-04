import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

export interface LetterState {
  letter: string;
  status: 'correct' | 'present' | 'absent' | 'empty';
}

interface GameBoardProps {
  guesses: LetterState[][];
  currentGuess: string;
  currentRow: number;
}

export const GameBoard: React.FC<GameBoardProps> = ({ 
  guesses, 
  currentGuess, 
  currentRow 
}) => {
  const animatedValues = useRef<Animated.Value[][]>(
    Array(6).fill(null).map(() => 
      Array(5).fill(null).map(() => new Animated.Value(0))
    )
  ).current;

  const renderCell = (letter: string, status: LetterState['status'], row: number, col: number) => {
    const isCurrentGuess = row === currentRow;
    const displayLetter = isCurrentGuess ? currentGuess[col] || '' : letter;
    const animatedValue = animatedValues[row][col];

    // Animar entrada da letra
    useEffect(() => {
      if (displayLetter && isCurrentGuess) {
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }).start();
      }
    }, [displayLetter, isCurrentGuess, animatedValue]);

    // Animar mudança de status com delay baseado na posição
    useEffect(() => {
      if (status !== 'empty' && !isCurrentGuess) {
        const delay = col * 150; // Delay progressivo para cada letra
        
        setTimeout(() => {
          Animated.timing(animatedValue, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }).start();
        }, delay);
      }
    }, [status, isCurrentGuess, animatedValue, col]);

    const scale = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0.9, 1],
    });

    const opacity = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0.7, 1],
    });

    return (
      <Animated.View 
        key={`${row}-${col}`}
        style={[
          styles.cell,
          status === 'correct' && styles.correct,
          status === 'present' && styles.present,
          status === 'absent' && styles.absent,
          isCurrentGuess && displayLetter && styles.currentGuess,
          { 
            transform: [{ scale }],
            opacity,
          },
        ]}
      >
        <Text style={[
          styles.letter,
          status === 'correct' && styles.letterCorrect,
          status === 'present' && styles.letterPresent,
          status === 'absent' && styles.letterAbsent,
        ]}>{displayLetter.toUpperCase()}</Text>
      </Animated.View>
    );
  };

  return (
    <View style={styles.board}>
      {Array.from({ length: 6 }, (_, row) => (
        <View key={row} style={styles.row}>
          {Array.from({ length: 5 }, (_, col) => {
            const guess = guesses[row];
            const letterState = guess ? guess[col] : { letter: '', status: 'empty' as const };
            return renderCell(letterState.letter, letterState.status, row, col);
          })}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  board: {
    alignItems: 'center',
    marginVertical: 15,
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 6,
    gap: 6,
  },
  cell: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: '#3a3a3c',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121213',
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  letter: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: 'bold',
    fontFamily: 'System',
  },
  letterCorrect: {
    color: '#ffffff',
    textShadowColor: 'rgba(255, 255, 255, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 4,
  },
  letterPresent: {
    color: '#ffffff',
    textShadowColor: 'rgba(255, 255, 255, 0.3)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 2,
  },
  letterAbsent: {
    color: '#ffffff',
    opacity: 0.8,
  },
  correct: {
    backgroundColor: '#538d4e',
    borderColor: '#538d4e',
  },
  present: {
    backgroundColor: '#b59f3b',
    borderColor: '#b59f3b',
  },
  absent: {
    backgroundColor: '#3a3a3c',
    borderColor: '#3a3a3c',
  },
  currentGuess: {
    borderColor: '#565758',
    backgroundColor: '#2d2d2d',
  },
});
