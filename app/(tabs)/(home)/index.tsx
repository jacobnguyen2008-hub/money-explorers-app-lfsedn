
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, commonStyles } from '@/styles/commonStyles';
import { useProgress } from '@/contexts/ProgressContext';

export default function HomeScreen() {
  const router = useRouter();
  const { progress } = useProgress();

  const handlePress = (route: string) => {
    router.push(route as any);
  };

  return (
    <SafeAreaView style={commonStyles.container} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          colors={['#FF6B6B', '#FFE66D']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <Text style={styles.welcomeText}>Welcome Back!</Text>
          <Text style={styles.title}>Money Kids 💰</Text>
          <View style={styles.coinsContainer}>
            <Text style={styles.coinsIcon}>🪙</Text>
            <Text style={styles.coinsText}>{progress.coins} Coins</Text>
          </View>
        </LinearGradient>

        <View style={styles.menuContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => handlePress('/(tabs)/learn')}
          >
            <LinearGradient
              colors={['#FF6B6B', '#FF8C8C']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.menuCard}
            >
              <Text style={styles.menuIcon}>📚</Text>
              <Text style={styles.menuTitle}>Learn</Text>
              <Text style={styles.menuDescription}>
                Fun lessons about money!
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => handlePress('/(tabs)/games')}
          >
            <LinearGradient
              colors={['#4ECDC4', '#6FE5DC']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.menuCard}
            >
              <Text style={styles.menuIcon}>🎮</Text>
              <Text style={styles.menuTitle}>Games</Text>
              <Text style={styles.menuDescription}>
                Play and earn coins!
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => handlePress('/(tabs)/rewards')}
          >
            <LinearGradient
              colors={['#FFE66D', '#FFF08C']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.menuCard}
            >
              <Text style={styles.menuIcon}>⭐</Text>
              <Text style={styles.menuTitle}>Rewards</Text>
              <Text style={styles.menuDescription}>
                Spend your coins here!
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => handlePress('/(tabs)/progress')}
          >
            <LinearGradient
              colors={['#A78BFA', '#C4B5FD']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.menuCard}
            >
              <Text style={styles.menuIcon}>📊</Text>
              <Text style={styles.menuTitle}>Progress</Text>
              <Text style={styles.menuDescription}>
                See how far you&apos;ve come!
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View style={styles.motivationContainer}>
          <Text style={styles.motivationCharacter}>🦸‍♂️</Text>
          <View style={styles.speechBubble}>
            <Text style={styles.speechText}>
              Keep learning! You&apos;re doing amazing! 🌟
            </Text>
          </View>
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    padding: 32,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    alignItems: 'center',
    marginBottom: 24,
    boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.15)',
    elevation: 8,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.card,
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  title: {
    fontSize: 40,
    fontWeight: '900',
    color: colors.card,
    marginBottom: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.15)',
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 6,
  },
  coinsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  coinsIcon: {
    fontSize: 24,
    marginRight: 8,
  },
  coinsText: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.card,
  },
  menuContainer: {
    padding: 20,
    gap: 16,
  },
  menuCard: {
    borderRadius: 24,
    padding: 28,
    alignItems: 'center',
    boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.15)',
    elevation: 5,
  },
  menuIcon: {
    fontSize: 64,
    marginBottom: 12,
  },
  menuTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: colors.card,
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  menuDescription: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.card,
    textAlign: 'center',
    opacity: 0.95,
  },
  motivationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    gap: 16,
  },
  motivationCharacter: {
    fontSize: 60,
  },
  speechBubble: {
    flex: 1,
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 20,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  speechText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    lineHeight: 22,
  },
  bottomPadding: {
    height: 100,
  },
});
