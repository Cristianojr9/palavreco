import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useStats } from '../hooks/useStats';

const { width, height } = Dimensions.get('window');

interface StatsScreenProps {
  visible: boolean;
  onClose: () => void;
}

export default function StatsScreen({ visible, onClose }: StatsScreenProps) {
  const slideAnim = useRef(new Animated.Value(height)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  
  const { stats, loading, resetStats } = useStats();

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: height,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, slideAnim, fadeAnim]);

  const handleClose = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: height,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose();
    });
  };

  const StatCard = ({ 
    title, 
    value, 
    subtitle 
  }: {
    title: string;
    value: string | number;
    subtitle?: string;
  }) => (
    <View style={styles.statCard}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statTitle}>{title}</Text>
      {subtitle && <Text style={styles.statSubtitle}>{subtitle}</Text>}
    </View>
  );

  const maxGuesses = Math.max(...stats.guessDistribution, 1);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={handleClose}
    >
      <StatusBar barStyle="light-content" backgroundColor="rgba(0,0,0,0.5)" />
      
      {/* Backdrop */}
      <TouchableOpacity
        style={styles.backdrop}
        activeOpacity={1}
        onPress={handleClose}
      >
        <Animated.View
          style={[
            styles.modal,
            {
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Estatísticas</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleClose}
              activeOpacity={0.7}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView 
            style={styles.content} 
            showsVerticalScrollIndicator={true}
            contentContainerStyle={styles.scrollContent}
            bounces={true}
            alwaysBounceVertical={false}
          >
            {/* Main Stats */}
            <View style={styles.section}>
              <View style={styles.statsGrid}>
                <StatCard
                  title="Jogos"
                  value={stats.gamesPlayed}
                  subtitle="jogados"
                />
                <StatCard
                  title="Vitórias"
                  value={stats.gamesWon}
                  subtitle="ganhas"
                />
                <StatCard
                  title="Sequência"
                  value={stats.currentStreak}
                  subtitle="atual"
                />
                <StatCard
                  title="Máxima"
                  value={stats.maxStreak}
                  subtitle="sequência"
                />
              </View>
            </View>

            {/* Win Percentage */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Taxa de Vitórias</Text>
              <View style={styles.percentageContainer}>
                <View style={styles.percentageCircle}>
                  <Text style={styles.percentageText}>{stats.winPercentage}%</Text>
                </View>
                <Text style={styles.percentageSubtitle}>
                  {stats.gamesWon} de {stats.gamesPlayed} jogos
                </Text>
              </View>
            </View>

            {/* Guess Distribution */}
            {/* <View style={styles.section}>
              <Text style={styles.sectionTitle}>Distribuição de Tentativas</Text>
              <View style={styles.distributionContainer}>
                {stats.guessDistribution.map((count, index) => (
                  <View key={index} style={styles.distributionRow}>
                    <Text style={styles.distributionLabel}>{index + 1}</Text>
                    <View style={styles.distributionBarContainer}>
                                          <View
                      style={[
                        styles.distributionBar,
                        {
                          transform: [
                            {
                              scaleX: count / maxGuesses,
                            },
                          ],
                          backgroundColor: count > 0 ? '#538d4e' : '#3a3a3c',
                        },
                      ]}
                    />
                    </View>
                    <Text style={styles.distributionCount}>{count}</Text>
                  </View>
                ))}
              </View>
            </View> */}

            {/* Empty State */}
            {stats.gamesPlayed === 0 && (
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateIcon}>📊</Text>
                <Text style={styles.emptyStateTitle}>Nenhuma estatística ainda</Text>
                <Text style={styles.emptyStateSubtitle}>
                  Jogue algumas partidas para ver suas estatísticas aqui!
                </Text>
              </View>
            )}

            {/* Action Buttons */}
            {/* <View style={styles.section}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => {}}
                activeOpacity={0.7}
              >
                <Text style={styles.actionButtonText}>Compartilhar Estatísticas</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.actionButton, styles.secondaryButton]}
                onPress={resetStats}
                activeOpacity={0.7}
              >
                <Text style={[styles.actionButtonText, styles.secondaryButtonText]}>
                  Resetar Estatísticas
                </Text>
              </TouchableOpacity>
            </View> */}
          </ScrollView>
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modal: {
    backgroundColor: '#121213',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: height * 0.9,
    minHeight: height * 0.65,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#3a3a3c',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#3a3a3c',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    marginTop: 16,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    flexGrow: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    backgroundColor: '#2a2a2c',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 14,
    color: '#818384',
    textAlign: 'center',
  },
  statSubtitle: {
    fontSize: 12,
    color: '#818384',
    textAlign: 'center',
    marginTop: 2,
  },
  percentageContainer: {
    alignItems: 'center',
  },
  percentageCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#538d4e',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  percentageText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  percentageSubtitle: {
    fontSize: 14,
    color: '#818384',
    textAlign: 'center',
  },
  distributionContainer: {
    gap: 8,
  },
  distributionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  distributionLabel: {
    fontSize: 14,
    color: '#ffffff',
    width: 20,
    textAlign: 'center',
  },
  distributionBarContainer: {
    flex: 1,
    height: 20,
    backgroundColor: '#3a3a3c',
    borderRadius: 10,
    overflow: 'hidden',
  },
  distributionBar: {
    height: '100%',
    width: '100%',
    borderRadius: 10,
    transformOrigin: 'left',
  },
  distributionCount: {
    fontSize: 14,
    color: '#818384',
    width: 30,
    textAlign: 'right',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyStateIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  emptyStateSubtitle: {
    fontSize: 14,
    color: '#818384',
    textAlign: 'center',
    lineHeight: 20,
  },
  actionButton: {
    backgroundColor: '#538d4e',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#3a3a3c',
  },
  secondaryButtonText: {
    color: '#818384',
  },
});
