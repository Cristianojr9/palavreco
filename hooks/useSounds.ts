import { Audio } from 'expo-av';
import { useEffect, useRef } from 'react';

export const useSounds = () => {
  const sounds = useRef<{ [key: string]: Audio.Sound }>({});

  useEffect(() => {
    const loadSounds = async () => {
      try {
        // Criar sons usando frequências melódicas
        const soundConfigs = {
          keyPress: { frequencies: [800, 900], duration: 0.15 },
          correct: { frequencies: [1200, 1400, 1600], duration: 0.3 },
          present: { frequencies: [1000, 1200], duration: 0.25 },
          absent: { frequencies: [400, 350], duration: 0.2 },
          win: { frequencies: [1500, 1800, 2000, 2200], duration: 0.8 },
          lose: { frequencies: [300, 250, 200], duration: 0.6 },
          // backgroundMusic: { frequencies: [440, 554, 659, 740, 880, 1108, 1319, 1480], duration: 10.0 },
        };

        for (const [name, config] of Object.entries(soundConfigs)) {
          const sound = new Audio.Sound();
          await sound.loadAsync({
            uri: `data:audio/wav;base64,${generateMelody(config.frequencies, config.duration)}`,
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
  
  const playBackgroundMusic = async () => {
    try {
      const sound = sounds.current['backgroundMusic'];
      if (sound) {
        await sound.setIsLoopingAsync(true);
        await sound.setVolumeAsync(0.3); // Volume baixo para não interferir
        await sound.playAsync();
      }
    } catch (error) {
      console.log('Erro ao reproduzir música de fundo:', error);
    }
  };

  const stopBackgroundMusic = async () => {
    try {
      const sound = sounds.current['backgroundMusic'];
      if (sound) {
        await sound.stopAsync();
      }
    } catch (error) {
      console.log('Erro ao parar música de fundo:', error);
    }
  };

  return {
    playKeyPress,
    playCorrect,
    playPresent,
    playAbsent,
    playWin,
    playLose,
    playBackgroundMusic,
    stopBackgroundMusic,
  };
};

// Função para gerar melodia com múltiplas frequências
function generateMelody(frequencies: number[], duration: number): string {
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
  
  // Generate melody with multiple frequencies
  for (let i = 0; i < samples; i++) {
    let sample = 0;
    const time = i / sampleRate;
    
    // Create a melody by cycling through frequencies
    const noteIndex = Math.floor((time / duration) * frequencies.length);
    const frequency = frequencies[Math.min(noteIndex, frequencies.length - 1)];
    
    // Add some harmonics for richer sound
    sample += Math.sin(2 * Math.PI * frequency * time) * 0.15;
    sample += Math.sin(2 * Math.PI * frequency * 2 * time) * 0.08;
    sample += Math.sin(2 * Math.PI * frequency * 3 * time) * 0.04;
    
    // Add a subtle bass line
    sample += Math.sin(2 * Math.PI * (frequency * 0.5) * time) * 0.05;
    
    // Apply gentle envelope for smooth looping
    const envelope = 0.8 + 0.2 * Math.sin(2 * Math.PI * time / duration);
    sample *= envelope * 0.2;
    
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
