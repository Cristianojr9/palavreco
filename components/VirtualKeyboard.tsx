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

  const renderSpecialKey = (text: string, onPress: () => void, style?: any) => (
    <TouchableOpacity
      style={[styles.specialKey, style]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={styles.specialKeyText}>{text}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.keyboard}>
      <View style={styles.row}>
        {topRow.map(renderKey)}
      </View>
      
      <View style={styles.row}>
        {middleRow.map(renderKey)}
        {renderSpecialKey('⌫', onBackspace, styles.backspaceKey)}
      </View>
      
      <View style={styles.row}>
        {renderSpecialKey('ENTER', onEnter, styles.enterKey)}
        {bottomRow.map(renderKey)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  keyboard: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 8,
    justifyContent: 'center',
    gap: 6,
  },
  key: {
    backgroundColor: '#818384',
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderRadius: 6,
    minWidth: 36,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  keyText: {
    color: '#ffffff',
    fontSize: 16,
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
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderRadius: 6,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  specialKeyText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'System',
  },
  backspaceKey: {
    minWidth: 50,
  },
  enterKey: {
    minWidth: 70,
  },
});
