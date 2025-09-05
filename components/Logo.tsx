import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
  style?: any;
}

export default function Logo({ size = 'medium', showText = true, style }: LogoProps) {
  const getSize = () => {
    switch (size) {
      case 'small':
        return { width: 40, height: 40, fontSize: 16 };
      case 'medium':
        return { width: 80, height: 80, fontSize: 32 };
      case 'large':
        return { width: 120, height: 120, fontSize: 48 };
      default:
        return { width: 80, height: 80, fontSize: 32 };
    }
  };

  const dimensions = getSize();

  return (
    <View style={[styles.container, dimensions, style]}>
      <View style={[styles.logo, dimensions]}>
        <Image 
          source={require('../assets/images/logo/image.png')} 
          style={[styles.logoImage, dimensions]}
          resizeMode="contain"
        />
      </View>
      {showText && (
        <Text style={[styles.logoTitle, { fontSize: dimensions.fontSize * 0.4 }]}>
          PALAVRECO
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  logo: {
    borderRadius: 50,
    backgroundColor: '#538d4e',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#538d4e',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
    padding: 8,
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },
  logoTitle: {
    color: '#ffffff',
    fontWeight: 'bold',
    letterSpacing: 1,
    marginTop: 8,
    textAlign: 'center',
  },
});
