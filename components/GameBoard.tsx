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
        Animated.sequence([
          Animated.timing(animatedValue, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }),
        ]).start();
      }
    }, [displayLetter, isCurrentGuess, animatedValue]);

    // Animar mudança de status
    useEffect(() => {
      if (status !== 'empty' && !isCurrentGuess) {
        Animated.sequence([
          Animated.timing(animatedValue, {
            toValue: 0.5,
            duration: 100,
            useNativeDriver: true,
          }),
          Animated.timing(animatedValue, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }),
        ]).start();
      }
    }, [status, isCurrentGuess, animatedValue]);

    const scale = animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0.8, 1.1, 1],
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
          { transform: [{ scale }] },
        ]}
      >
        <Text style={styles.letter}>{displayLetter.toUpperCase()}</Text>
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
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 8,
    gap: 8,
  },
  cell: {
    width: 62,
    height: 62,
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
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'System',
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
