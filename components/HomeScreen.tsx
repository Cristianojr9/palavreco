import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Logo from './Logo';

const { width, height } = Dimensions.get('window');

interface HomeScreenProps {
  onStartGame: () => void;
  onOpenSettings: () => void;
  onOpenStats: () => void;
}

export default function HomeScreen({ onStartGame, onOpenSettings, onOpenStats }: HomeScreenProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim, scaleAnim]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#121213" />
      
      {/* Header */}
      <Animated.View
        style={[
          styles.header,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <View style={styles.logoContainer}>
          <Logo size="medium" showText={false} />
        </View>
        <Text style={styles.subtitle}>Descubra a palavra do dia</Text>
      </Animated.View>

      {/* Main Content */}
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [
              { translateY: slideAnim },
              { scale: scaleAnim },
            ],
          },
        ]}
      >
        {/* Play Button */}
        <TouchableOpacity
          style={styles.playButton}
          onPress={onStartGame}
          activeOpacity={0.8}
        >
          <Text style={styles.playButtonText}>JOGAR</Text>
        </TouchableOpacity>


        {/* How to Play */}
        <View style={styles.howToPlay}>
          <Text style={styles.howToPlayTitle}>Como Jogar</Text>
          <View style={styles.instructions}>
            <View style={styles.instruction}>
              <View style={[styles.instructionBox, styles.correctBox]}>
                <Text style={styles.instructionLetter}>A</Text>
              </View>
              <Text style={styles.instructionText}>Letra correta na posição correta</Text>
            </View>
            <View style={styles.instruction}>
              <View style={[styles.instructionBox, styles.presentBox]}>
                <Text style={styles.instructionLetter}>B</Text>
              </View>
              <Text style={styles.instructionText}>Letra correta na posição errada</Text>
            </View>
            <View style={styles.instruction}>
              <View style={[styles.instructionBox, styles.absentBox]}>
                <Text style={styles.instructionLetter}>C</Text>
              </View>
              <Text style={styles.instructionText}>Letra não está na palavra</Text>
            </View>
          </View>
        </View>
      </Animated.View>

      {/* Bottom Navigation */}
      <Animated.View
        style={[
          styles.bottomNav,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <TouchableOpacity
          style={styles.navButton}
          onPress={onOpenStats}
          activeOpacity={0.7}
        >
          <View style={styles.navIcon}>
            <Text style={styles.navIconText}>📊</Text>
          </View>
          <Text style={styles.navText}>Estatísticas</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButton}
          onPress={onOpenSettings}
          activeOpacity={0.7}
        >
          <View style={styles.navIcon}>
            <Text style={styles.navIconText}>⚙️</Text>
          </View>
          <Text style={styles.navText}>Configurações</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121213',
  },
  header: {
    alignItems: 'center',
    paddingTop: 60,
    marginTop: 100,
    // paddingBottom: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: 2,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#818384',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  playButton: {
    backgroundColor: '#538d4e',
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#538d4e',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  playButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: 1,
  },
  modeButton: {
    backgroundColor: '#3a3a3c',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 40,
  },
  modeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  howToPlay: {
    backgroundColor: '#2a2a2c',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  howToPlayTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 16,
    textAlign: 'center',
  },
  instructions: {
    gap: 12,
  },
  instruction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  instructionBox: {
    width: 32,
    height: 32,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  correctBox: {
    backgroundColor: '#538d4e',
  },
  presentBox: {
    backgroundColor: '#b59f3b',
  },
  absentBox: {
    backgroundColor: '#3a3a3c',
  },
  instructionLetter: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  instructionText: {
    fontSize: 14,
    color: '#818384',
    flex: 1,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 24,
    paddingBottom: 40,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#3a3a3c',
  },
  navButton: {
    alignItems: 'center',
    flex: 1,
  },
  navIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#3a3a3c',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  navIconText: {
    fontSize: 20,
  },
  navText: {
    fontSize: 12,
    color: '#818384',
    textAlign: 'center',
  },
});
