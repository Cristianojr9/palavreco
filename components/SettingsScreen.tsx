import React, { useEffect, useRef, useState } from 'react';
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

const { height } = Dimensions.get('window');

interface SettingsScreenProps {
  visible: boolean;
  onClose: () => void;
}

export default function SettingsScreen({ visible, onClose }: SettingsScreenProps) {
  const slideAnim = useRef(new Animated.Value(height)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  
  // Settings states
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [musicEnabled, setMusicEnabled] = useState(true);
  const [hapticsEnabled, setHapticsEnabled] = useState(true);
  const [notifications, setNotifications] = useState(true);

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

  const SettingItem = ({ 
    icon, 
    title, 
    rightComponent, 
    onPress 
  }: {
    icon: string;
    title: string;
    rightComponent?: React.ReactNode;
    onPress?: () => void;
  }) => (
    <TouchableOpacity
      style={styles.settingItem}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.settingLeft}>
        <View style={styles.settingIcon}>
          <Text style={styles.settingIconText}>{icon}</Text>
        </View>
        <Text style={styles.settingTitle}>{title}</Text>
      </View>
      {rightComponent}
    </TouchableOpacity>
  );

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
            <Text style={styles.headerTitle}>Configurações</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleClose}
              activeOpacity={0.7}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {/* Quick Actions */}
            {/* <View style={styles.section}>
              <View style={styles.quickActions}>
                <TouchableOpacity
                  style={[styles.quickAction, soundEnabled && styles.quickActionActive]}
                  onPress={() => setSoundEnabled(!soundEnabled)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.quickActionIcon}>🔊</Text>
                  <Text style={styles.quickActionText}>Som</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[styles.quickAction, musicEnabled && styles.quickActionActive]}
                  onPress={() => setMusicEnabled(!musicEnabled)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.quickActionIcon}>🎵</Text>
                  <Text style={styles.quickActionText}>Música</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[styles.quickAction, hapticsEnabled && styles.quickActionActive]}
                  onPress={() => setHapticsEnabled(!hapticsEnabled)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.quickActionIcon}>📳</Text>
                  <Text style={styles.quickActionText}>Vibração</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[styles.quickAction, notifications && styles.quickActionActive]}
                  onPress={() => setNotifications(!notifications)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.quickActionIcon}>🔔</Text>
                  <Text style={styles.quickActionText}>Notificações</Text>
                </TouchableOpacity>
              </View>
            </View> */}

            {/* Game Settings */}
            {/* <View style={styles.section}>
              <Text style={styles.sectionTitle}>Jogo</Text>
              
              <SettingItem
                icon="🔊"
                title="Efeitos Sonoros"
                rightComponent={
                  <Switch
                    value={soundEnabled}
                    onValueChange={setSoundEnabled}
                    trackColor={{ false: '#3a3a3c', true: '#538d4e' }}
                    thumbColor={soundEnabled ? '#ffffff' : '#818384'}
                  />
                }
              />
              
              <SettingItem
                icon="🎵"
                title="Música de Fundo"
                rightComponent={
                  <Switch
                    value={musicEnabled}
                    onValueChange={setMusicEnabled}
                    trackColor={{ false: '#3a3a3c', true: '#538d4e' }}
                    thumbColor={musicEnabled ? '#ffffff' : '#818384'}
                  />
                }
              />
              
              <SettingItem
                icon="📳"
                title="Feedback Tátil"
                rightComponent={
                  <Switch
                    value={hapticsEnabled}
                    onValueChange={setHapticsEnabled}
                    trackColor={{ false: '#3a3a3c', true: '#538d4e' }}
                    thumbColor={hapticsEnabled ? '#ffffff' : '#818384'}
                  />
                }
              />
            </View> */}

            {/* Other Options */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Outros</Text>
              
              <SettingItem
                icon="📄"
                title="Política de Privacidade"
                onPress={() => {}}
              />
            </View>
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
    minHeight: height * 0.6,
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
    paddingHorizontal: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 16,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
  },
  quickAction: {
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: '#3a3a3c',
    minWidth: 70,
  },
  quickActionActive: {
    backgroundColor: '#538d4e',
  },
  quickActionIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 12,
    color: '#ffffff',
    textAlign: 'center',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a2c',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#3a3a3c',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingIconText: {
    fontSize: 16,
  },
  settingTitle: {
    fontSize: 16,
    color: '#ffffff',
    flex: 1,
  },
});
