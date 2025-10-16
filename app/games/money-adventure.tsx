
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/styles/commonStyles';
import { useProgress } from '@/contexts/ProgressContext';
import { IconSymbol } from '@/components/IconSymbol';

const adventureQuestions = [
  {
    question: 'You find a coin on the ground! What should you do?',
    options: ['Keep it safe', 'Throw it away', 'Ignore it', 'Give it to a stranger'],
    correctAnswer: 0,
    coins: 5,
  },
  {
    question: 'Your friend wants to borrow money. What do you ask?',
    options: ['When will you pay me back?', 'Nothing', 'Give me more!', 'Go away'],
    correctAnswer: 0,
    coins: 5,
  },
  {
    question: 'You want a new toy. What should you do first?',
    options: ['Save money for it', 'Cry until you get it', 'Steal it', 'Forget about it'],
    correctAnswer: 0,
    coins: 5,
  },
  {
    question: 'You earned $10 from chores. What&apos;s a smart choice?',
    options: ['Save some, spend some', 'Spend it all now', 'Hide it forever', 'Lose it'],
    correctAnswer: 0,
    coins: 5,
  },
  {
    question: 'Where is the safest place to keep your money?',
    options: ['In a bank or piggy bank', 'Under your pillow', 'In your pocket', 'On the street'],
    correctAnswer: 0,
    coins: 5,
  },
];

export default function MoneyAdventureGame() {
  const router = useRouter();
  const { addCoins, completeGame, addBadge } = useProgress();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [collectedCoins, setCollectedCoins] = useState(0);
  const [position, setPosition] = useState(0);

  const question = adventureQuestions[currentQuestion];
  const isLastQuestion = currentQuestion === adventureQuestions.length - 1;

  const handleAnswerSelect = (index: number) => {
    if (showFeedback) return;
    setSelectedAnswer(index);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) {
      Alert.alert('Select an Answer', 'Please choose an answer!');
      return;
    }

    const isCorrect = selectedAnswer === question.correctAnswer;
    setShowFeedback(true);

    if (isCorrect) {
      setCollectedCoins(collectedCoins + question.coins);
      setPosition(position + 1);
    }
  };

  const handleNext = () => {
    if (isLastQuestion) {
      addCoins(collectedCoins);
      completeGame('money-adventure');
      if (collectedCoins >= 20) {
        addBadge('🗺️');
      }
      Alert.alert(
        '🎉 Adventure Complete!',
        `You collected ${collectedCoins} coins on your journey!\n\nGreat job learning about money!`,
        [
          {
            text: 'Play Again',
            onPress: () => {
              setCurrentQuestion(0);
              setSelectedAnswer(null);
              setShowFeedback(false);
              setCollectedCoins(0);
              setPosition(0);
            },
          },
          {
            text: 'Done',
            onPress: () => router.back(),
          },
        ]
      );
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <IconSymbol name="chevron.left" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Money Adventure</Text>
        <View style={styles.coinsContainer}>
          <Text style={styles.coinsText}>💰 {collectedCoins}</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.pathContainer}>
          <View style={styles.path}>
            {adventureQuestions.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.pathNode,
                  index <= position && styles.pathNodeActive,
                  index === position && styles.pathNodeCurrent,
                ]}
              >
                <Text style={styles.pathNodeText}>
                  {index < position ? '✓' : index === position ? '🦸‍♂️' : '🪙'}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.questionCard}>
          <Text style={styles.questionNumber}>
            Question {currentQuestion + 1} of {adventureQuestions.length}
          </Text>
          <Text style={styles.questionText}>{question.question}</Text>
        </View>

        <View style={styles.optionsContainer}>
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === question.correctAnswer;
            const showCorrect = showFeedback && isCorrect;
            const showWrong = showFeedback && isSelected && !isCorrect;

            return (
              <TouchableOpacity
                key={index}
                activeOpacity={0.8}
                onPress={() => handleAnswerSelect(index)}
                disabled={showFeedback}
              >
                <View style={[
                  styles.optionCard,
                  isSelected && !showFeedback && styles.optionCardSelected,
                  showCorrect && styles.optionCardCorrect,
                  showWrong && styles.optionCardWrong,
                ]}>
                  <Text style={styles.optionText}>{option}</Text>
                  {showCorrect && <Text style={styles.checkmark}>✓</Text>}
                  {showWrong && <Text style={styles.cross}>✗</Text>}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {showFeedback && (
          <View style={[
            styles.feedbackCard,
            selectedAnswer === question.correctAnswer
              ? { backgroundColor: '#DCFCE7' }
              : { backgroundColor: '#FEE2E2' }
          ]}>
            <Text style={styles.feedbackText}>
              {selectedAnswer === question.correctAnswer
                ? `🎉 Correct! You collected ${question.coins} coins!`
                : '💡 Not quite! Try to think about what&apos;s safest and smartest!'}
            </Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.navigationBar}>
        {!showFeedback ? (
          <TouchableOpacity
            onPress={handleSubmit}
            style={styles.submitButton}
          >
            <Text style={styles.submitButtonText}>Submit Answer</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={handleNext}
            style={styles.submitButton}
          >
            <Text style={styles.submitButtonText}>
              {isLastQuestion ? 'Finish Adventure ✓' : 'Continue Journey →'}
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
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
    flex: 1,
    textAlign: 'center',
  },
  coinsContainer: {
    backgroundColor: colors.card,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  coinsText: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.text,
  },
  scrollContent: {
    padding: 20,
  },
  pathContainer: {
    marginBottom: 30,
  },
  path: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pathNode: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: colors.textSecondary,
  },
  pathNodeActive: {
    borderColor: colors.secondary,
    backgroundColor: colors.highlight,
  },
  pathNodeCurrent: {
    borderColor: colors.primary,
    backgroundColor: colors.accent,
  },
  pathNodeText: {
    fontSize: 24,
  },
  questionCard: {
    backgroundColor: colors.primary,
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
    boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.15)',
    elevation: 5,
  },
  questionNumber: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.card,
    marginBottom: 12,
    opacity: 0.9,
  },
  questionText: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.card,
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
  feedbackCard: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  feedbackText: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '700',
    textAlign: 'center',
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
});
