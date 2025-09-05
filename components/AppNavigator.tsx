import React, { useState } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import HomeScreen from './HomeScreen';
import SettingsScreen from './SettingsScreen';
import SplashScreen from './SplashScreen';
import StatsScreen from './StatsScreen';
import WordleGame from './WordleGame';

type Screen = 'splash' | 'home' | 'game' | 'settings' | 'stats';

export default function AppNavigator() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [showSettings, setShowSettings] = useState(false);
  const [showStats, setShowStats] = useState(false);

  const handleSplashFinish = () => {
    setCurrentScreen('home');
  };

  const handleStartGame = () => {
    setCurrentScreen('game');
  };

  const handleGoHome = () => {
    setCurrentScreen('home');
  };

  const handleOpenSettings = () => {
    setShowSettings(true);
  };

  const handleCloseSettings = () => {
    setShowSettings(false);
  };

  const handleOpenStats = () => {
    setShowStats(true);
  };

  const handleCloseStats = () => {
    setShowStats(false);
  };

  const handleGameFinish = () => {
    // When game finishes, show the modal and then go to home
    // This will be handled by the WordleGame component
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#121213" />
      
      {currentScreen === 'splash' && (
        <SplashScreen onFinish={handleSplashFinish} />
      )}
      
      {currentScreen === 'home' && (
        <HomeScreen
          onStartGame={handleStartGame}
          onOpenSettings={handleOpenSettings}
          onOpenStats={handleOpenStats}
        />
      )}
      
      {currentScreen === 'game' && (
        <WordleGame
          onGoHome={handleGoHome}
          onGameFinish={handleGameFinish}
        />
      )}

      <SettingsScreen
        visible={showSettings}
        onClose={handleCloseSettings}
      />

      <StatsScreen
        visible={showStats}
        onClose={handleCloseStats}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121213',
  },
});
