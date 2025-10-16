
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, commonStyles } from '@/styles/commonStyles';
import { useProgress } from '@/contexts/ProgressContext';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen() {
  const router = useRouter();
  const { progress } = useProgress();
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const menuItems = [
    {
      title: 'Learn',
      icon: '📚',
      color: colors.primary,
      route: '/(tabs)/learn',
      description: 'Fun lessons about money!',
    },
    {
      title: 'Games',
      icon: '🎮',
      color: colors.secondary,
      route: '/(tabs)/games',
      description: 'Play and learn!',
    },
    {
      title: 'Quiz',
      icon: '🧠',
      color: colors.accent,
      route: '/(tabs)/learn',
      description: 'Test your knowledge!',
    },
    {
      title: 'Rewards',
      icon: '🏆',
      color: '#A78BFA',
      route: '/(tabs)/rewards',
      description: 'Collect badges & stickers!',
    },
    {
      title: 'Progress',
      icon: '📊',
      color: '#F472B6',
      route: '/(tabs)/progress',
      description: 'See how far you&apos;ve come!',
    },
  ];

  const handlePress = (route: string) => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => {
      router.push(route as any);
    });
  };

  return (
    <SafeAreaView style={commonStyles.container} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Welcome to</Text>
          <Text style={styles.appTitle}>Money Quest! 🚀</Text>
          <Text style={styles.subtitle}>Learn about money the fun way!</Text>
          
          <View style={styles.coinsContainer}>
            <Text style={styles.coinsText}>💰 {progress.coins} Coins</Text>
          </View>
        </View>

        <View style={styles.characterContainer}>
          <Text style={styles.character}>🦸‍♂️</Text>
          <View style={styles.speechBubble}>
            <Text style={styles.speechText}>
              Let&apos;s go on a money adventure!
            </Text>
          </View>
        </View>

        <View style={styles.menuGrid}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              activeOpacity={0.8}
              onPress={() => handlePress(item.route)}
            >
              <View style={[styles.menuCard, { backgroundColor: item.color }]}>
                <Text style={styles.menuIcon}>{item.icon}</Text>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <Text style={styles.menuDescription}>{item.description}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 20,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  appTitle: {
    fontSize: 36,
    fontWeight: '900',
    color: colors.primary,
    marginTop: 5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 8,
    textAlign: 'center',
  },
  coinsContainer: {
    backgroundColor: colors.card,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 16,
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  coinsText: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
  },
  characterContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  character: {
    fontSize: 80,
    marginBottom: 10,
  },
  speechBubble: {
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 20,
    maxWidth: '80%',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  speechText: {
    fontSize: 16,
    color: colors.text,
    textAlign: 'center',
    fontWeight: '600',
  },
  menuGrid: {
    gap: 16,
  },
  menuCard: {
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.15)',
    elevation: 5,
    marginBottom: 16,
  },
  menuIcon: {
    fontSize: 56,
    marginBottom: 12,
  },
  menuTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.card,
    marginBottom: 8,
  },
  menuDescription: {
    fontSize: 14,
    color: colors.card,
    textAlign: 'center',
    fontWeight: '600',
    opacity: 0.9,
  },
  bottomPadding: {
    height: 100,
  },
});
