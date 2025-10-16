
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/styles/commonStyles';
import { lessonsData } from '@/data/lessonsData';
import { useProgress } from '@/contexts/ProgressContext';
import { IconSymbol } from '@/components/IconSymbol';

export default function LessonDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { addCoins, completeLesson, addBadge } = useProgress();
  const [currentPage, setCurrentPage] = useState(0);

  const lesson = lessonsData.find(l => l.id === id);

  if (!lesson) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Lesson not found</Text>
      </SafeAreaView>
    );
  }

  const isLastPage = currentPage === lesson.content.length - 1;

  const handleNext = () => {
    if (isLastPage) {
      completeLesson(lesson.id);
      addCoins(10);
      addBadge('🎓');
      Alert.alert(
        '🎉 Lesson Complete!',
        'You earned 10 coins! Ready for a quiz?',
        [
          {
            text: 'Take Quiz',
            onPress: () => router.push(`/quizzes/quiz-${lesson.id}` as any),
          },
          {
            text: 'Later',
            onPress: () => router.back(),
          },
        ]
      );
    } else {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const currentContent = lesson.content[currentPage];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <IconSymbol name="chevron.left" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{lesson.title}</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.lessonCard, { backgroundColor: lesson.color }]}>
          <Text style={styles.lessonIcon}>{lesson.icon}</Text>
          
          <View style={styles.contentCard}>
            <Text style={styles.contentText}>{currentContent.content}</Text>
          </View>

          <View style={styles.pagination}>
            <Text style={styles.paginationText}>
              {currentPage + 1} of {lesson.content.length}
            </Text>
          </View>
        </View>

        <View style={styles.characterContainer}>
          <Text style={styles.character}>🦸‍♂️</Text>
          <View style={styles.speechBubble}>
            <Text style={styles.speechText}>
              {isLastPage 
                ? 'Great job! You&apos;re learning so much!'
                : 'Keep reading to learn more!'}
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.navigationBar}>
        <TouchableOpacity
          onPress={handlePrevious}
          disabled={currentPage === 0}
          style={[styles.navButton, currentPage === 0 && styles.navButtonDisabled]}
        >
          <Text style={[styles.navButtonText, currentPage === 0 && styles.navButtonTextDisabled]}>
            ← Previous
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleNext}
          style={[styles.navButton, styles.navButtonPrimary]}
        >
          <Text style={styles.navButtonTextPrimary}>
            {isLastPage ? 'Finish! ✓' : 'Next →'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  backButton: {
    padding: 8,
    backgroundColor: colors.card,
    borderRadius: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
    flex: 1,
    textAlign: 'center',
  },
  placeholder: {
    width: 40,
  },
  scrollContent: {
    padding: 20,
  },
  lessonCard: {
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.15)',
    elevation: 5,
    marginBottom: 20,
  },
  lessonIcon: {
    fontSize: 80,
    marginBottom: 20,
  },
  contentCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    padding: 24,
    width: '100%',
    marginBottom: 20,
  },
  contentText: {
    fontSize: 18,
    lineHeight: 28,
    color: colors.text,
    fontWeight: '600',
  },
  pagination: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  paginationText: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.card,
  },
  characterContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  character: {
    fontSize: 60,
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
  navigationBar: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
    backgroundColor: colors.card,
    borderTopWidth: 1,
    borderTopColor: colors.background,
  },
  navButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 16,
    backgroundColor: colors.background,
    alignItems: 'center',
  },
  navButtonDisabled: {
    opacity: 0.4,
  },
  navButtonPrimary: {
    backgroundColor: colors.primary,
  },
  navButtonText: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.text,
  },
  navButtonTextDisabled: {
    color: colors.textSecondary,
  },
  navButtonTextPrimary: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.card,
  },
  errorText: {
    fontSize: 18,
    color: colors.text,
    textAlign: 'center',
    marginTop: 40,
  },
});
