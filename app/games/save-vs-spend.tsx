
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/styles/commonStyles';
import { useProgress } from '@/contexts/ProgressContext';
import { IconSymbol } from '@/components/IconSymbol';

const items = [
  { name: 'Toy Car', emoji: '🚗', category: 'spend' },
  { name: 'Piggy Bank', emoji: '🐷', category: 'save' },
  { name: 'Candy', emoji: '🍬', category: 'spend' },
  { name: 'Money Jar', emoji: '🏺', category: 'save' },
  { name: 'Ice Cream', emoji: '🍦', category: 'spend' },
  { name: 'Savings Account', emoji: '🏦', category: 'save' },
  { name: 'Video Game', emoji: '🎮', category: 'spend' },
  { name: 'Coin Collection', emoji: '🪙', category: 'save' },
];

export default function SaveVsSpendGame() {
  const router = useRouter();
  const { addCoins, completeGame, addBadge } = useProgress();
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const currentItem = items[currentItemIndex];

  const handleChoice = (choice: 'save' | 'spend') => {
    const isCorrect = choice === currentItem.category;

    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.2,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();

    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentItemIndex < items.length - 1) {
      setTimeout(() => {
        setCurrentItemIndex(currentItemIndex + 1);
      }, 500);
    } else {
      setTimeout(() => {
        setGameOver(true);
        const coinsEarned = score + (isCorrect ? 1 : 0);
        addCoins(coinsEarned * 2);
        completeGame('save-vs-spend');
        if (coinsEarned >= 6) {
          addBadge('🎯');
        }
        Alert.alert(
          '🎉 Game Complete!',
          `You got ${coinsEarned} out of ${items.length} correct!\n\nYou earned ${coinsEarned * 2} coins!`,
          [
            {
              text: 'Play Again',
              onPress: () => {
                setCurrentItemIndex(0);
                setScore(0);
                setGameOver(false);
              },
            },
            {
              text: 'Done',
              onPress: () => router.back(),
            },
          ]
        );
      }, 500);
    }
  };

  if (gameOver) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.gameOverContainer}>
          <Text style={styles.gameOverEmoji}>🎉</Text>
          <Text style={styles.gameOverTitle}>Great Job!</Text>
          <Text style={styles.gameOverText}>
            You scored {score} out of {items.length}!
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <IconSymbol name="chevron.left" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Save or Spend?</Text>
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>{score}/{items.length}</Text>
        </View>
      </View>

      <View style={styles.gameContent}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${((currentItemIndex + 1) / items.length) * 100}%` }]} />
        </View>

        <View style={styles.itemCard}>
          <Animated.Text style={[styles.itemEmoji, { transform: [{ scale: scaleAnim }] }]}>
            {currentItem.emoji}
          </Animated.Text>
          <Text style={styles.itemName}>{currentItem.name}</Text>
        </View>

        <View style={styles.characterContainer}>
          <Text style={styles.character}>🦸‍♂️</Text>
          <View style={styles.speechBubble}>
            <Text style={styles.speechText}>
              Should you save this or spend on it?
            </Text>
          </View>
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => handleChoice('save')}
            style={[styles.choiceButton, { backgroundColor: colors.secondary }]}
          >
            <Text style={styles.choiceEmoji}>🏦</Text>
            <Text style={styles.choiceText}>SAVE</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => handleChoice('spend')}
            style={[styles.choiceButton, { backgroundColor: colors.primary }]}
          >
            <Text style={styles.choiceEmoji}>💸</Text>
            <Text style={styles.choiceText}>SPEND</Text>
          </TouchableOpacity>
        </View>
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
  scoreContainer: {
    backgroundColor: colors.card,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  scoreText: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.text,
  },
  gameContent: {
    flex: 1,
    padding: 20,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.card,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 30,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
  },
  itemCard: {
    backgroundColor: colors.card,
    borderRadius: 24,
    padding: 40,
    alignItems: 'center',
    marginBottom: 30,
    boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.15)',
    elevation: 5,
  },
  itemEmoji: {
    fontSize: 100,
    marginBottom: 20,
  },
  itemName: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
  },
  characterContainer: {
    alignItems: 'center',
    marginBottom: 30,
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
  buttonsContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  choiceButton: {
    flex: 1,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.15)',
    elevation: 5,
  },
  choiceEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  choiceText: {
    fontSize: 20,
    fontWeight: '900',
    color: colors.card,
  },
  gameOverContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  gameOverEmoji: {
    fontSize: 100,
    marginBottom: 20,
  },
  gameOverTitle: {
    fontSize: 36,
    fontWeight: '900',
    color: colors.text,
    marginBottom: 16,
  },
  gameOverText: {
    fontSize: 20,
    color: colors.textSecondary,
    textAlign: 'center',
    fontWeight: '600',
  },
});
