
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, commonStyles } from '@/styles/commonStyles';
import { gamesData } from '@/data/gamesData';
import { useProgress } from '@/contexts/ProgressContext';

export default function GamesScreen() {
  const router = useRouter();
  const { progress } = useProgress();

  return (
    <SafeAreaView style={commonStyles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>🎮 Games</Text>
        <Text style={styles.subtitle}>Play fun games and earn coins!</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {gamesData.map((game) => {
          const isCompleted = progress.completedGames.includes(game.id);
          
          return (
            <TouchableOpacity
              key={game.id}
              activeOpacity={0.8}
              onPress={() => router.push(game.route as any)}
            >
              <View style={[styles.gameCard, { backgroundColor: game.color }]}>
                <View style={styles.gameHeader}>
                  <Text style={styles.gameIcon}>{game.icon}</Text>
                  {isCompleted && (
                    <View style={styles.completedBadge}>
                      <Text style={styles.completedText}>✓</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.gameTitle}>{game.title}</Text>
                <Text style={styles.gameDescription}>{game.description}</Text>
                <View style={styles.playButton}>
                  <Text style={styles.playButtonText}>Play Now! →</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}

        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  scrollContent: {
    padding: 20,
    paddingTop: 0,
  },
  gameCard: {
    borderRadius: 24,
    padding: 24,
    marginBottom: 16,
    boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.15)',
    elevation: 5,
  },
  gameHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  gameIcon: {
    fontSize: 56,
  },
  completedBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  completedText: {
    fontSize: 18,
    fontWeight: '900',
    color: '#22C55E',
  },
  gameTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.card,
    marginBottom: 8,
  },
  gameDescription: {
    fontSize: 16,
    color: colors.card,
    marginBottom: 16,
    fontWeight: '600',
    opacity: 0.9,
  },
  playButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  playButtonText: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.card,
  },
  bottomPadding: {
    height: 100,
  },
});
