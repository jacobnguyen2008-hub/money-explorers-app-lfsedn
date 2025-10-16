
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, commonStyles } from '@/styles/commonStyles';
import { lessonsData } from '@/data/lessonsData';
import { useProgress } from '@/contexts/ProgressContext';
import { IconSymbol } from '@/components/IconSymbol';

export default function LearnScreen() {
  const router = useRouter();
  const { progress } = useProgress();

  return (
    <SafeAreaView style={commonStyles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>📚 Lessons</Text>
        <Text style={styles.subtitle}>Choose a lesson to start learning!</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {lessonsData.map((lesson, index) => {
          const isCompleted = progress.completedLessons.includes(lesson.id);
          
          return (
            <TouchableOpacity
              key={lesson.id}
              activeOpacity={0.8}
              onPress={() => router.push(`/lessons/${lesson.id}` as any)}
            >
              <View style={[styles.lessonCard, { backgroundColor: lesson.color }]}>
                <View style={styles.lessonHeader}>
                  <Text style={styles.lessonIcon}>{lesson.icon}</Text>
                  {isCompleted && (
                    <View style={styles.completedBadge}>
                      <Text style={styles.completedText}>✓</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.lessonTitle}>{lesson.title}</Text>
                <Text style={styles.lessonDescription}>{lesson.description}</Text>
                <View style={styles.startButton}>
                  <Text style={styles.startButtonText}>
                    {isCompleted ? 'Review' : 'Start'} →
                  </Text>
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
  lessonCard: {
    borderRadius: 24,
    padding: 24,
    marginBottom: 16,
    boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.15)',
    elevation: 5,
  },
  lessonHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  lessonIcon: {
    fontSize: 48,
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
  lessonTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.card,
    marginBottom: 8,
  },
  lessonDescription: {
    fontSize: 16,
    color: colors.card,
    marginBottom: 16,
    fontWeight: '600',
    opacity: 0.9,
  },
  startButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  startButtonText: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.card,
  },
  bottomPadding: {
    height: 100,
  },
});
