import * as Haptics from 'expo-haptics';

export const useHaptics = () => {
  const playKeyPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const playCorrect = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const playPresent = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const playAbsent = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  };

  const playWin = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  const playLose = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  };

  const playError = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
  };

  return {
    playKeyPress,
    playCorrect,
    playPresent,
    playAbsent,
    playWin,
    playLose,
    playError,
  };
};
