import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

interface GameStats {
  gamesPlayed: number;
  gamesWon: number;
  currentStreak: number;
  maxStreak: number;
  winPercentage: number;
  guessDistribution: number[]; // [0, 0, 0, 0, 0, 0] for 1-6 guesses
  lastPlayedDate: string | null;
}

const STORAGE_KEY = 'palavreco_stats';

const defaultStats: GameStats = {
  gamesPlayed: 0,
  gamesWon: 0,
  currentStreak: 0,
  maxStreak: 0,
  winPercentage: 0,
  guessDistribution: [0, 0, 0, 0, 0, 0],
  lastPlayedDate: null,
};

export function useStats() {
  const [stats, setStats] = useState<GameStats>(defaultStats);
  const [loading, setLoading] = useState(true);

  // Carregar estatísticas do AsyncStorage
  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const storedStats = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedStats) {
        const parsedStats = JSON.parse(storedStats);
        setStats(parsedStats);
      }
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveStats = async (newStats: GameStats) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newStats));
      setStats(newStats);
    } catch (error) {
      console.error('Erro ao salvar estatísticas:', error);
    }
  };

  const recordGame = (won: boolean, attempts: number) => {
    const today = new Date().toISOString().split('T')[0];
    const isNewDay = stats.lastPlayedDate !== today;
    
    let newStats = { ...stats };
    
    // Incrementar jogos jogados
    newStats.gamesPlayed += 1;
    
    if (won) {
      // Incrementar vitórias
      newStats.gamesWon += 1;
      
      // Atualizar distribuição de tentativas (1-6)
      if (attempts >= 1 && attempts <= 6) {
        newStats.guessDistribution[attempts - 1] += 1;
      }
      
      // Atualizar sequência
      if (isNewDay) {
        newStats.currentStreak += 1;
        newStats.maxStreak = Math.max(newStats.maxStreak, newStats.currentStreak);
      }
    } else {
      // Perdeu - resetar sequência atual
      if (isNewDay) {
        newStats.currentStreak = 0;
      }
    }
    
    // Atualizar porcentagem de vitórias
    newStats.winPercentage = Math.round((newStats.gamesWon / newStats.gamesPlayed) * 100);
    
    // Atualizar data do último jogo
    newStats.lastPlayedDate = today;
    
    saveStats(newStats);
  };

  const resetStats = () => {
    saveStats(defaultStats);
  };

  const getStats = () => stats;

  return {
    stats,
    loading,
    recordGame,
    resetStats,
    getStats,
  };
}
