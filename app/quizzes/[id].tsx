
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/styles/commonStyles';
import { quizzesData } from '@/data/quizzesData';
import { useProgress } from '@/contexts/ProgressContext';
import { IconSymbol } from '@/components/IconSymbol';

export default function QuizScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { addCoins, completeQuiz, addBadge } = useProgress();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);

  const quiz = quizzesData.find(q => q.id === id);

  if (!quiz) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Quiz not found</Text>
      </SafeAreaView>
    );
  }

  const question = quiz.questions[currentQuestion];
  const isLastQuestion = currentQuestion === quiz.questions.length - 1;

  const handleAnswerSelect = (index: number) => {
    if (showExplanation) return;
    setSelectedAnswer(index);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) {
      Alert.alert('Select an Answer', 'Please choose an answer before submitting!');
      return;
    }

    const isCorrect = selectedAnswer === question.correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      const finalScore = score + (selectedAnswer === question.correctAnswer ? 1 : 0);
      const percentage = (finalScore / quiz.questions.length) * 100;
      const coinsEarned = Math.round(percentage / 10);
      
      completeQuiz(quiz.id);
      addCoins(coinsEarned);
      
      if (percentage === 100) {
        addBadge('🏆');
      } else if (percentage >= 80) {
        addBadge('🌟');
      }

      Alert.alert(
        '🎉 Quiz Complete!',
        `You got ${finalScore} out of ${quiz.questions.length} correct!\n\nYou earned ${coinsEarned} coins!`,
        [
          {
            text: 'Done',
            onPress: () => router.back(),
          },
        ]
      );
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <IconSymbol name="chevron.left" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{quiz.title}</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            Question {currentQuestion + 1} of {quiz.questions.length}
          </Text>
          <Text style={styles.scoreText}>Score: {score}</Text>
        </View>

        <View style={styles.questionCard}>
          <Text style={styles.questionIcon}>🧠</Text>
          <Text style={styles.questionText}>{question.question}</Text>
        </View>

        <View style={styles.optionsContainer}>
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === question.correctAnswer;
            const showCorrect = showExplanation && isCorrect;
            const showWrong = showExplanation && isSelected && !isCorrect;

            return (
              <TouchableOpacity
                key={index}
                onPress={() => handleAnswerSelect(index)}
                disabled={showExplanation}
                activeOpacity={0.8}
              >
                <View style={[
                  styles.optionCard,
                  isSelected && !showExplanation && styles.optionCardSelected,
                  showCorrect && styles.optionCardCorrect,
                  showWrong && styles.optionCardWrong,
                ]}>
                  <Text style={[
                    styles.optionText,
                    (showCorrect || showWrong) && styles.optionTextBold,
                  ]}>
                    {option}
                  </Text>
                  {showCorrect && <Text style={styles.checkmark}>✓</Text>}
                  {showWrong && <Text style={styles.cross}>✗</Text>}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {showExplanation && (
          <View style={styles.explanationCard}>
            <Text style={styles.explanationTitle}>
              {selectedAnswer === question.correctAnswer ? '🎉 Correct!' : '💡 Learn More'}
            </Text>
            <Text style={styles.explanationText}>{question.explanation}</Text>
          </View>
        )}

        <View style={styles.characterContainer}>
          <Text style={styles.character}>🦸‍♂️</Text>
          <View style={styles.speechBubble}>
            <Text style={styles.speechText}>
              {showExplanation
                ? 'Ready for the next question?'
                : 'Take your time and think carefully!'}
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.navigationBar}>
        {!showExplanation ? (
          <TouchableOpacity
            onPress={handleSubmit}
            style={[styles.submitButton]}
          >
            <Text style={styles.submitButtonText}>Submit Answer</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={handleNext}
            style={[styles.submitButton]}
          >
            <Text style={styles.submitButtonText}>
              {isLastQuestion ? 'Finish Quiz ✓' : 'Next Question →'}
            </Text>
          </TouchableOpacity>
        )}
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
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  progressText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  scoreText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
  },
  questionCard: {
    backgroundColor: colors.secondary,
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
    boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.15)',
    elevation: 5,
  },
  questionIcon: {
    fontSize: 60,
    marginBottom: 16,
  },
  questionText: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.card,
    textAlign: 'center',
    lineHeight: 28,
  },
  optionsContainer: {
    gap: 12,
    marginBottom: 20,
  },
  optionCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  optionCardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.highlight,
  },
  optionCardCorrect: {
    borderColor: '#22C55E',
    backgroundColor: '#DCFCE7',
  },
  optionCardWrong: {
    borderColor: '#EF4444',
    backgroundColor: '#FEE2E2',
  },
  optionText: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '600',
    flex: 1,
  },
  optionTextBold: {
    fontWeight: '800',
  },
  checkmark: {
    fontSize: 24,
    color: '#22C55E',
    fontWeight: '900',
  },
  cross: {
    fontSize: 24,
    color: '#EF4444',
    fontWeight: '900',
  },
  explanationCard: {
    backgroundColor: colors.accent,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  explanationTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 8,
  },
  explanationText: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
    fontWeight: '600',
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
    padding: 20,
    backgroundColor: colors.card,
    borderTopWidth: 1,
    borderTopColor: colors.background,
  },
  submitButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 18,
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
