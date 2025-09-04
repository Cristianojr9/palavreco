import { Audio } from 'expo-av';
import { useEffect, useRef } from 'react';

export const useSounds = () => {
  const sounds = useRef<{ [key: string]: Audio.Sound }>({});

  useEffect(() => {
    const loadSounds = async () => {
      try {
        // Criar sons usando frequências
        const soundConfigs = {
          keyPress: { frequency: 800, duration: 0.1 },
          correct: { frequency: 1200, duration: 0.2 },
          present: { frequency: 1000, duration: 0.2 },
          absent: { frequency: 400, duration: 0.3 },
          win: { frequency: 1500, duration: 0.5 },
          lose: { frequency: 300, duration: 0.8 },
        };

        for (const [name, config] of Object.entries(soundConfigs)) {
          const sound = new Audio.Sound();
          await sound.loadAsync({
            uri: `data:audio/wav;base64,${generateTone(config.frequency, config.duration)}`,
          });
          sounds.current[name] = sound;
        }
      } catch (error) {
        console.log('Erro ao carregar sons:', error);
      }
    };

    loadSounds();

    return () => {
      // Cleanup
      Object.values(sounds.current).forEach(sound => {
        if (sound) sound.unloadAsync();
      });
    };
  }, []);

  const playSound = async (soundName: string) => {
    try {
      const sound = sounds.current[soundName];
      if (sound) {
        await sound.replayAsync();
      }
    } catch (error) {
      console.log('Erro ao reproduzir som:', error);
    }
  };

  const playKeyPress = () => playSound('keyPress');
  const playCorrect = () => playSound('correct');
  const playPresent = () => playSound('present');
  const playAbsent = () => playSound('absent');
  const playWin = () => playSound('win');
  const playLose = () => playSound('lose');

  return {
    playKeyPress,
    playCorrect,
    playPresent,
    playAbsent,
    playWin,
    playLose,
  };
};

// Função para gerar tom em WAV
function generateTone(frequency: number, duration: number): string {
  const sampleRate = 44100;
  const samples = Math.floor(sampleRate * duration);
  const buffer = new ArrayBuffer(44 + samples * 2);
  const view = new DataView(buffer);
  
  // WAV header
  const writeString = (offset: number, string: string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };
  
  writeString(0, 'RIFF');
  view.setUint32(4, 36 + samples * 2, true);
  writeString(8, 'WAVE');
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeString(36, 'data');
  view.setUint32(40, samples * 2, true);
  
  // Generate sine wave
  for (let i = 0; i < samples; i++) {
    const sample = Math.sin(2 * Math.PI * frequency * i / sampleRate) * 0.3;
    view.setInt16(44 + i * 2, sample * 32767, true);
  }
  
  // Convert to base64
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}
