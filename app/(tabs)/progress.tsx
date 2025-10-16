
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, commonStyles } from '@/styles/commonStyles';
import { useProgress } from '@/contexts/ProgressContext';
import { lessonsData } from '@/data/lessonsData';
import { gamesData } from '@/data/gamesData';
import { quizzesData } from '@/data/quizzesData';

export default function ProgressScreen() {
  const { progress } = useProgress();

  const totalLessons = lessonsData.length;
  const completedLessons = progress.completedLessons.length;
  const lessonsProgress = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

  const totalGames = gamesData.length;
  const completedGames = progress.completedGames.length;
  const gamesProgress = totalGames > 0 ? (completedGames / totalGames) * 100 : 0;

  const totalQuizzes = quizzesData.length;
  const completedQuizzes = progress.completedQuizzes.length;
  const quizzesProgress = totalQuizzes > 0 ? (completedQuizzes / totalQuizzes) * 100 : 0;

  const overallProgress = ((completedLessons + completedGames + completedQuizzes) / 
    (totalLessons + totalGames + totalQuizzes)) * 100;

  return (
    <SafeAreaView style={commonStyles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>📊 Your Progress</Text>
        <Text style={styles.subtitle}>Keep up the great work!</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.overallCard}>
          <Text style={styles.overallTitle}>Overall Progress</Text>
          <View style={styles.circleContainer}>
            <View style={styles.circle}>
              <Text style={styles.percentageText}>
                {Math.round(overallProgress)}%
              </Text>
            </View>
          </View>
          <Text style={styles.encouragement}>
            {overallProgress === 100 
              ? '🎉 Amazing! You completed everything!'
              : overallProgress >= 75
              ? '🌟 You&apos;re almost there!'
              : overallProgress >= 50
              ? '💪 Keep going, you&apos;re doing great!'
              : overallProgress >= 25
              ? '🚀 Great start! Keep learning!'
              : '🌱 Start your journey today!'}
          </Text>
        </View>

        <View style={styles.statsCard}>
          <Text style={styles.statsTitle}>📚 Lessons</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${lessonsProgress}%`, backgroundColor: colors.primary }]} />
          </View>
          <Text style={styles.statsText}>
            {completedLessons} of {totalLessons} completed
          </Text>
        </View>

        <View style={styles.statsCard}>
          <Text style={styles.statsTitle}>🎮 Games</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${gamesProgress}%`, backgroundColor: colors.secondary }]} />
          </View>
          <Text style={styles.statsText}>
            {completedGames} of {totalGames} completed
          </Text>
        </View>

        <View style={styles.statsCard}>
          <Text style={styles.statsTitle}>🧠 Quizzes</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${quizzesProgress}%`, backgroundColor: colors.accent }]} />
          </View>
          <Text style={styles.statsText}>
            {completedQuizzes} of {totalQuizzes} completed
          </Text>
        </View>

        <View style={styles.achievementsCard}>
          <Text style={styles.achievementsTitle}>🏆 Achievements</Text>
          <View style={styles.achievementRow}>
            <View style={styles.achievementItem}>
              <Text style={styles.achievementEmoji}>💰</Text>
              <Text style={styles.achievementValue}>{progress.coins}</Text>
              <Text style={styles.achievementLabel}>Coins</Text>
            </View>
            <View style={styles.achievementItem}>
              <Text style={styles.achievementEmoji}>🎖️</Text>
              <Text style={styles.achievementValue}>{progress.badges.length}</Text>
              <Text style={styles.achievementLabel}>Badges</Text>
            </View>
            <View style={styles.achievementItem}>
              <Text style={styles.achievementEmoji}>✨</Text>
              <Text style={styles.achievementValue}>{progress.stickers.length}</Text>
              <Text style={styles.achievementLabel}>Stickers</Text>
            </View>
          </View>
        </View>

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
  overallCard: {
    backgroundColor: colors.card,
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    marginBottom: 20,
    boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.15)',
    elevation: 5,
  },
  overallTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 20,
  },
  circleContainer: {
    marginBottom: 20,
  },
  circle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: colors.highlight,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 8,
    borderColor: colors.primary,
  },
  percentageText: {
    fontSize: 48,
    fontWeight: '900',
    color: colors.primary,
  },
  encouragement: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
  },
  statsCard: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    elevation: 4,
  },
  statsTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 12,
  },
  progressBar: {
    height: 16,
    backgroundColor: colors.background,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 8,
  },
  statsText: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  achievementsCard: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    elevation: 4,
  },
  achievementsTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  achievementRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  achievementItem: {
    alignItems: 'center',
  },
  achievementEmoji: {
    fontSize: 40,
    marginBottom: 8,
  },
  achievementValue: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.text,
    marginBottom: 4,
  },
  achievementLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  bottomPadding: {
    height: 100,
  },
});
