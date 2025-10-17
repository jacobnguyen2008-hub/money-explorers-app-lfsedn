
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/styles/commonStyles';

export default function SplashScreen() {
  const router = useRouter();
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.3);
  const bounceAnim = new Animated.Value(0);

  useEffect(() => {
    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    // Scale animation
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 4,
      tension: 40,
      useNativeDriver: true,
    }).start();

    // Bounce animation for characters
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: -20,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Navigate to main app after 3 seconds
    const timer = setTimeout(() => {
      router.replace('/(tabs)/(home)/');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient
      colors={['#FF6B6B', '#FFE66D', '#4ECDC4', '#A78BFA']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <View style={styles.logoContainer}>
          <Animated.Text
            style={[
              styles.mainIcon,
              {
                transform: [{ translateY: bounceAnim }],
              },
            ]}
          >
            💰
          </Animated.Text>
        </View>

        <Text style={styles.title}>Money Kids</Text>
        <Text style={styles.subtitle}>Learn Finance the Fun Way!</Text>

        <View style={styles.charactersContainer}>
          <Animated.Text
            style={[
              styles.character,
              {
                transform: [
                  {
                    translateY: bounceAnim.interpolate({
                      inputRange: [-20, 0],
                      outputRange: [0, -20],
                    }),
                  },
                ],
              },
            ]}
          >
            🦸‍♂️
          </Animated.Text>
          <Animated.Text
            style={[
              styles.character,
              {
                transform: [{ translateY: bounceAnim }],
              },
            ]}
          >
            🦸‍♀️
          </Animated.Text>
          <Animated.Text
            style={[
              styles.character,
              {
                transform: [
                  {
                    translateY: bounceAnim.interpolate({
                      inputRange: [-20, 0],
                      outputRange: [0, -20],
                    }),
                  },
                ],
              },
            ]}
          >
            🤖
          </Animated.Text>
        </View>

        <View style={styles.loadingContainer}>
          <View style={styles.loadingBar}>
            <Animated.View
              style={[
                styles.loadingProgress,
                {
                  width: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0%', '100%'],
                  }),
                },
              ]}
            />
          </View>
          <Text style={styles.loadingText}>Loading your adventure...</Text>
        </View>
      </Animated.View>

      <View style={styles.decorations}>
        <Text style={styles.decoration}>⭐</Text>
        <Text style={styles.decoration}>💎</Text>
        <Text style={styles.decoration}>🎯</Text>
        <Text style={styles.decoration}>🏆</Text>
        <Text style={styles.decoration}>🎨</Text>
        <Text style={styles.decoration}>🚀</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    zIndex: 10,
  },
  logoContainer: {
    marginBottom: 20,
  },
  mainIcon: {
    fontSize: 120,
    textAlign: 'center',
  },
  title: {
    fontSize: 48,
    fontWeight: '900',
    color: colors.card,
    textAlign: 'center',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 8,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.card,
    textAlign: 'center',
    marginBottom: 40,
    textShadowColor: 'rgba(0, 0, 0, 0.15)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  charactersContainer: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 60,
  },
  character: {
    fontSize: 60,
  },
  loadingContainer: {
    width: 250,
    alignItems: 'center',
  },
  loadingBar: {
    width: '100%',
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 12,
  },
  loadingProgress: {
    height: '100%',
    backgroundColor: colors.card,
    borderRadius: 4,
  },
  loadingText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.card,
    textShadowColor: 'rgba(0, 0, 0, 0.15)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  decorations: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 40,
    opacity: 0.3,
  },
  decoration: {
    fontSize: 40,
    margin: 20,
  },
});
