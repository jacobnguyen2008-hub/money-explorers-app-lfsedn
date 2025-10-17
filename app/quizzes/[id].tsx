
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
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
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);

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
      Alert.alert('Oops!', 'Please select an answer first!');
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
      const earnedCoins = score * 5;
      completeQuiz(quiz.id);
      addCoins(earnedCoins);
      
      if (score === quiz.questions.length) {
        addBadge('🏆');
      }

      Alert.alert(
        '🎉 Quiz Complete!',
        `You got ${score} out of ${quiz.questions.length} correct!\n\nYou earned ${earnedCoins} coins! 🪙`,
        [
          {
            text: 'Awesome!',
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

  const getAnswerStyle = (index: number) => {
    if (!showExplanation) {
      return selectedAnswer === index ? styles.answerSelected : styles.answer;
    }

    if (index === question.correctAnswer) {
      return styles.answerCorrect;
    }

    if (selectedAnswer === index && index !== question.correctAnswer) {
      return styles.answerWrong;
    }

    return styles.answer;
  };

  const getAnswerTextStyle = (index: number) => {
    if (!showExplanation) {
      return selectedAnswer === index ? styles.answerTextSelected : styles.answerText;
    }

    if (index === question.correctAnswer) {
      return styles.answerTextCorrect;
    }

    if (selectedAnswer === index && index !== question.correctAnswer) {
      return styles.answerTextWrong;
    }

    return styles.answerText;
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
        <LinearGradient
          colors={['#A78BFA', '#C4B5FD']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.progressCard}
        >
          <Text style={styles.progressText}>
            Question {currentQuestion + 1} of {quiz.questions.length}
          </Text>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%`,
                },
              ]}
            />
          </View>
          <Text style={styles.scoreText}>Score: {score} 🌟</Text>
        </LinearGradient>

        <View style={styles.questionCard}>
          <Text style={styles.questionIcon}>🤔</Text>
          <Text style={styles.questionText}>{question.question}</Text>
        </View>

        <View style={styles.answersContainer}>
          {question.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              activeOpacity={0.8}
              onPress={() => handleAnswerSelect(index)}
              disabled={showExplanation}
            >
              <View style={getAnswerStyle(index)}>
                <Text style={getAnswerTextStyle(index)}>
                  {String.fromCharCode(65 + index)}. {option}
                </Text>
                {showExplanation && index === question.correctAnswer && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
                {showExplanation && selectedAnswer === index && index !== question.correctAnswer && (
                  <Text style={styles.crossmark}>✗</Text>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {showExplanation && (
          <View style={styles.explanationCard}>
            <Text style={styles.explanationIcon}>
              {selectedAnswer === question.correctAnswer ? '🎉' : '💡'}
            </Text>
            <Text style={styles.explanationTitle}>
              {selectedAnswer === question.correctAnswer ? 'Correct!' : 'Not quite!'}
            </Text>
            <Text style={styles.explanationText}>{question.explanation}</Text>
          </View>
        )}

        <View style={styles.characterContainer}>
          <Text style={styles.character}>🦸‍♀️</Text>
          <View style={styles.speechBubble}>
            <Text style={styles.speechText}>
              {showExplanation
                ? 'Great effort! Keep going!'
                : 'Take your time and think carefully!'}
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.navigationBar}>
        {!showExplanation ? (
          <TouchableOpacity
            onPress={handleSubmit}
            style={[styles.submitButton, selectedAnswer === null && styles.submitButtonDisabled]}
            disabled={selectedAnswer === null}
          >
            <Text style={styles.submitButtonText}>Submit Answer ✓</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleNext} style={styles.nextButton}>
            <Text style={styles.nextButtonText}>
              {isLastQuestion ? 'Finish Quiz! 🎉' : 'Next Question →'}
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
  progressCard: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    elevation: 4,
  },
  progressText: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.card,
    textAlign: 'center',
    marginBottom: 12,
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.card,
    borderRadius: 4,
  },
  scoreText: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.card,
    textAlign: 'center',
  },
  questionCard: {
    backgroundColor: colors.card,
    borderRadius: 24,
    padding: 24,
    marginBottom: 20,
    alignItems: 'center',
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
    color: colors.text,
    textAlign: 'center',
    lineHeight: 28,
  },
  answersContainer: {
    gap: 12,
    marginBottom: 20,
  },
  answer: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    borderWidth: 3,
    borderColor: colors.background,
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  answerSelected: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    borderWidth: 3,
    borderColor: colors.primary,
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  answerCorrect: {
    backgroundColor: '#D1FAE5',
    borderRadius: 16,
    padding: 20,
    borderWidth: 3,
    borderColor: '#22C55E',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  answerWrong: {
    backgroundColor: '#FEE2E2',
    borderRadius: 16,
    padding: 20,
    borderWidth: 3,
    borderColor: '#EF4444',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  answerText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    lineHeight: 22,
  },
  answerTextSelected: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.primary,
    lineHeight: 22,
  },
  answerTextCorrect: {
    fontSize: 16,
    fontWeight: '800',
    color: '#22C55E',
    lineHeight: 22,
    flex: 1,
  },
  answerTextWrong: {
    fontSize: 16,
    fontWeight: '800',
    color: '#EF4444',
    lineHeight: 22,
    flex: 1,
  },
  checkmark: {
    fontSize: 24,
    color: '#22C55E',
    fontWeight: '900',
  },
  crossmark: {
    fontSize: 24,
    color: '#EF4444',
    fontWeight: '900',
  },
  explanationCard: {
    backgroundColor: '#FEF3C7',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#F59E0B',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    elevation: 4,
  },
  explanationIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  explanationTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#92400E',
    marginBottom: 8,
  },
  explanationText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#92400E',
    textAlign: 'center',
    lineHeight: 22,
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
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
    elevation: 5,
  },
  submitButtonDisabled: {
    opacity: 0.4,
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.card,
  },
  nextButton: {
    backgroundColor: colors.secondary,
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
    elevation: 5,
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.card,
  },
  errorText: {
    fontSize: 18,
    color: colors.text,
    textAlign: 'center',
    marginTop: 40,
  },
});
