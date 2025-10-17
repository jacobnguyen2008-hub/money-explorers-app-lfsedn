
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, commonStyles } from '@/styles/commonStyles';
import { lessonsData } from '@/data/lessonsData';
import { quizzesData } from '@/data/quizzesData';
import { gamesData } from '@/data/gamesData';
import { useProgress } from '@/contexts/ProgressContext';

export default function ProgressScreen() {
  const { progress } = useProgress();

  const lessonsCompleted = progress.completedLessons.length;
  const totalLessons = lessonsData.length;
  const lessonsPercentage = (lessonsCompleted / totalLessons) * 100;

  const quizzesCompleted = progress.completedQuizzes.length;
  const totalQuizzes = quizzesData.length;
  const quizzesPercentage = (quizzesCompleted / totalQuizzes) * 100;

  const gamesCompleted = progress.completedGames.length;
  const totalGames = gamesData.length;
  const gamesPercentage = (gamesCompleted / totalGames) * 100;

  const totalProgress = ((lessonsCompleted + quizzesCompleted + gamesCompleted) / 
    (totalLessons + totalQuizzes + totalGames)) * 100;

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
        <LinearGradient
          colors={['#FF6B9D', '#FFE66D']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.overallCard}
        >
          <Text style={styles.overallTitle}>Overall Progress</Text>
          <Text style={styles.overallPercentage}>{Math.round(totalProgress)}%</Text>
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBarFill, { width: `${totalProgress}%` }]} />
          </View>
          <Text style={styles.overallText}>
            You&apos;re doing amazing! Keep learning! 🌟
          </Text>
        </LinearGradient>

        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { backgroundColor: '#FF6B9D' }]}>
            <Text style={styles.statIcon}>🪙</Text>
            <Text style={styles.statNumber}>{progress.coins}</Text>
            <Text style={styles.statLabel}>Coins Earned</Text>
          </View>

          <View style={[styles.statCard, { backgroundColor: '#4ECDC4' }]}>
            <Text style={styles.statIcon}>🏆</Text>
            <Text style={styles.statNumber}>{progress.badges.length}</Text>
            <Text style={styles.statLabel}>Badges</Text>
          </View>
        </View>

        <View style={styles.categoryCard}>
          <View style={styles.categoryHeader}>
            <Text style={styles.categoryIcon}>📚</Text>
            <Text style={styles.categoryTitle}>Lessons</Text>
          </View>
          <View style={styles.categoryProgress}>
            <Text style={styles.categoryText}>
              {lessonsCompleted} of {totalLessons} completed
            </Text>
            <Text style={styles.categoryPercentage}>{Math.round(lessonsPercentage)}%</Text>
          </View>
          <View style={styles.progressBar}>
            <LinearGradient
              colors={['#FF6B9D', '#FF8C8C']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.progressFill, { width: `${lessonsPercentage}%` }]}
            />
          </View>
        </View>

        <View style={styles.categoryCard}>
          <View style={styles.categoryHeader}>
            <Text style={styles.categoryIcon}>🎯</Text>
            <Text style={styles.categoryTitle}>Quizzes</Text>
          </View>
          <View style={styles.categoryProgress}>
            <Text style={styles.categoryText}>
              {quizzesCompleted} of {totalQuizzes} completed
            </Text>
            <Text style={styles.categoryPercentage}>{Math.round(quizzesPercentage)}%</Text>
          </View>
          <View style={styles.progressBar}>
            <LinearGradient
              colors={['#A78BFA', '#C4B5FD']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.progressFill, { width: `${quizzesPercentage}%` }]}
            />
          </View>
        </View>

        <View style={styles.categoryCard}>
          <View style={styles.categoryHeader}>
            <Text style={styles.categoryIcon}>🎮</Text>
            <Text style={styles.categoryTitle}>Games</Text>
          </View>
          <View style={styles.categoryProgress}>
            <Text style={styles.categoryText}>
              {gamesCompleted} of {totalGames} completed
            </Text>
            <Text style={styles.categoryPercentage}>{Math.round(gamesPercentage)}%</Text>
          </View>
          <View style={styles.progressBar}>
            <LinearGradient
              colors={['#4ECDC4', '#6FE5DC']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.progressFill, { width: `${gamesPercentage}%` }]}
            />
          </View>
        </View>

        {progress.badges.length > 0 && (
          <View style={styles.badgesCard}>
            <Text style={styles.badgesTitle}>🏆 Your Badges</Text>
            <View style={styles.badgesContainer}>
              {progress.badges.map((badge, index) => (
                <View key={index} style={styles.badge}>
                  <Text style={styles.badgeIcon}>{badge}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        <View style={styles.motivationCard}>
          <Text style={styles.motivationCharacter}>🦸‍♂️</Text>
          <Text style={styles.motivationText}>
            You&apos;re becoming a money expert! Keep up the fantastic work! 💪
          </Text>
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
    borderRadius: 24,
    padding: 28,
    marginBottom: 20,
    alignItems: 'center',
    boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.15)',
    elevation: 8,
  },
  overallTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.card,
    marginBottom: 12,
  },
  overallPercentage: {
    fontSize: 56,
    fontWeight: '900',
    color: colors.card,
    marginBottom: 16,
  },
  progressBarContainer: {
    width: '100%',
    height: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 16,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: colors.card,
    borderRadius: 6,
  },
  overallText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.card,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    elevation: 4,
  },
  statIcon: {
    fontSize: 40,
    marginBottom: 8,
  },
  statNumber: {
    fontSize: 32,
    fontWeight: '900',
    color: colors.card,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.card,
    textAlign: 'center',
  },
  categoryCard: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    elevation: 4,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  categoryTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
  },
  categoryProgress: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  categoryPercentage: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.primary,
  },
  progressBar: {
    height: 10,
    backgroundColor: colors.background,
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 5,
  },
  badgesCard: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    elevation: 4,
  },
  badgesTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  badgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
  },
  badge: {
    backgroundColor: colors.background,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  badgeIcon: {
    fontSize: 32,
  },
  motivationCard: {
    backgroundColor: '#FEF3C7',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 3,
    borderColor: '#F59E0B',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    elevation: 4,
  },
  motivationCharacter: {
    fontSize: 60,
    marginBottom: 12,
  },
  motivationText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#92400E',
    textAlign: 'center',
    lineHeight: 24,
  },
  bottomPadding: {
    height: 100,
  },
});
