import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export interface KeyState {
  [key: string]: 'correct' | 'present' | 'absent' | 'unused';
}

interface VirtualKeyboardProps {
  onKeyPress: (key: string) => void;
  onEnter: () => void;
  onBackspace: () => void;
  keyStates: KeyState;
}

export const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({
  onKeyPress,
  onEnter,
  onBackspace,
  keyStates,
}) => {
  const topRow = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
  const middleRow = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
  const bottomRow = ['Z', 'X', 'C', 'V', 'B', 'N', 'M'];

  const renderKey = (letter: string) => {
    const state = keyStates[letter] || 'unused';
    
    return (
      <TouchableOpacity
        key={letter}
        style={[
          styles.key,
          state === 'correct' && styles.keyCorrect,
          state === 'present' && styles.keyPresent,
          state === 'absent' && styles.keyAbsent,
        ]}
        onPress={() => onKeyPress(letter)}
        activeOpacity={0.7}
      >
        <Text style={[
          styles.keyText,
          state !== 'unused' && styles.keyTextUsed
        ]}>{letter}</Text>
      </TouchableOpacity>
    );
  };

  const renderSpecialKey = (text: string, onPress: () => void, style?: any, textStyle?: any) => (
    <TouchableOpacity
      style={[styles.specialKey, style]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.specialKeyText, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.keyboard}>
      {/* Botão Enviar acima do teclado */}
      <View style={styles.submitContainer}>
        {renderSpecialKey('ENVIAR', onEnter, styles.submitKey, styles.submitKeyText)}
      </View>
      
      <View style={[styles.row, styles.topRow]}>
        {topRow.map(renderKey)}
      </View>
      
      <View style={[styles.row, styles.middleRow]}>
        {middleRow.map(renderKey)}
        {renderSpecialKey('⌫', onBackspace, styles.backspaceKey)}
      </View>
      
      <View style={[styles.row, styles.bottomRow]}>
        {bottomRow.map(renderKey)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  keyboard: {
    alignItems: 'center',
    paddingHorizontal: 4,
    paddingBottom: 8,
    paddingTop: 4,
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 3,
    justifyContent: 'center',
    gap: 2,
    width: '100%',
    paddingHorizontal: 2,
  },
  key: {
    backgroundColor: '#818384',
    paddingVertical: 10,
    paddingHorizontal: 2,
    borderRadius: 6,
    flex: 1,
    maxWidth: 35,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 1,
  },
  keyText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'System',
  },
  keyTextUsed: {
    color: '#ffffff',
  },
  keyCorrect: {
    backgroundColor: '#538d4e',
  },
  keyPresent: {
    backgroundColor: '#b59f3b',
  },
  keyAbsent: {
    backgroundColor: '#3a3a3c',
  },
  specialKey: {
    backgroundColor: '#818384',
    paddingVertical: 10,
    paddingHorizontal: 4,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    marginHorizontal: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 1,
  },
  specialKeyText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: 'bold',
    fontFamily: 'System',
  },
  submitKeyText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'System',
  },
  backspaceKey: {
    flex: 1.5,
    maxWidth: 50,
  },
  submitContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 8,
    paddingHorizontal: 20,
  },
  submitKey: {
    backgroundColor: '#538d4e',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    minWidth: 120,
    height: 50,
    shadowColor: '#538d4e',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  topRow: {
    marginBottom: 4,
    paddingHorizontal: 8,
  },
  middleRow: {
    marginBottom: 4,
    paddingHorizontal: 4,
  },
  bottomRow: {
    marginBottom: 0,
    paddingHorizontal: 0,
  },
});
