
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/styles/commonStyles';
import { useProgress } from '@/contexts/ProgressContext';
import { IconSymbol } from '@/components/IconSymbol';

const coins = [
  { emoji: '🪙', value: '1¢', name: 'Penny' },
  { emoji: '🪙', value: '5¢', name: 'Nickel' },
  { emoji: '🪙', value: '10¢', name: 'Dime' },
  { emoji: '🪙', value: '25¢', name: 'Quarter' },
];

export default function CoinMatchingGame() {
  const router = useRouter();
  const { addCoins, completeGame, addBadge } = useProgress();
  const [currentCoinIndex, setCurrentCoinIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const currentCoin = coins[currentCoinIndex];
  const shuffledValues = [...coins].sort(() => Math.random() - 0.5);

  const handleValueSelect = (value: string) => {
    if (showFeedback) return;
    
    setSelectedValue(value);
    const isCorrect = value === currentCoin.value;
    
    if (isCorrect) {
      setScore(score + 1);
    }
    
    setShowFeedback(true);

    setTimeout(() => {
      if (currentCoinIndex < coins.length - 1) {
        setCurrentCoinIndex(currentCoinIndex + 1);
        setSelectedValue(null);
        setShowFeedback(false);
      } else {
        const finalScore = score + (isCorrect ? 1 : 0);
        const coinsEarned = finalScore * 3;
        addCoins(coinsEarned);
        completeGame('coin-matching');
        if (finalScore === coins.length) {
          addBadge('🪙');
        }
        Alert.alert(
          '🎉 Game Complete!',
          `You got ${finalScore} out of ${coins.length} correct!\n\nYou earned ${coinsEarned} coins!`,
          [
            {
              text: 'Play Again',
              onPress: () => {
                setCurrentCoinIndex(0);
                setScore(0);
                setSelectedValue(null);
                setShowFeedback(false);
              },
            },
            {
              text: 'Done',
              onPress: () => router.back(),
            },
          ]
        );
      }
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <IconSymbol name="chevron.left" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Coin Match</Text>
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>{score}/{coins.length}</Text>
        </View>
      </View>

      <View style={styles.gameContent}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${((currentCoinIndex + 1) / coins.length) * 100}%` }]} />
        </View>

        <Text style={styles.instruction}>Match the coin with its value!</Text>

        <View style={styles.coinCard}>
          <Text style={styles.coinEmoji}>{currentCoin.emoji}</Text>
          <Text style={styles.coinName}>{currentCoin.name}</Text>
        </View>

        <View style={styles.valuesContainer}>
          {shuffledValues.map((coin, index) => {
            const isSelected = selectedValue === coin.value;
            const isCorrect = coin.value === currentCoin.value;
            const showCorrect = showFeedback && isCorrect;
            const showWrong = showFeedback && isSelected && !isCorrect;

            return (
              <TouchableOpacity
                key={index}
                activeOpacity={0.8}
                onPress={() => handleValueSelect(coin.value)}
                disabled={showFeedback}
              >
                <View style={[
                  styles.valueCard,
                  isSelected && !showFeedback && styles.valueCardSelected,
                  showCorrect && styles.valueCardCorrect,
                  showWrong && styles.valueCardWrong,
                ]}>
                  <Text style={styles.valueText}>{coin.value}</Text>
                  {showCorrect && <Text style={styles.checkmark}>✓</Text>}
                  {showWrong && <Text style={styles.cross}>✗</Text>}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.characterContainer}>
          <Text style={styles.character}>🦸‍♂️</Text>
          <View style={styles.speechBubble}>
            <Text style={styles.speechText}>
              {showFeedback
                ? selectedValue === currentCoin.value
                  ? 'Perfect! You got it right! 🎉'
                  : 'Not quite! Keep trying! 💪'
                : 'Which value matches this coin?'}
            </Text>
          </View>
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
    marginBottom: 20,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.secondary,
  },
  instruction: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 20,
  },
  coinCard: {
    backgroundColor: colors.accent,
    borderRadius: 24,
    padding: 40,
    alignItems: 'center',
    marginBottom: 30,
    boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.15)',
    elevation: 5,
  },
  coinEmoji: {
    fontSize: 100,
    marginBottom: 16,
  },
  coinName: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
  },
  valuesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'center',
    marginBottom: 30,
  },
  valueCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    minWidth: 100,
    alignItems: 'center',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
    borderWidth: 3,
    borderColor: 'transparent',
  },
  valueCardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.highlight,
  },
  valueCardCorrect: {
    borderColor: '#22C55E',
    backgroundColor: '#DCFCE7',
  },
  valueCardWrong: {
    borderColor: '#EF4444',
    backgroundColor: '#FEE2E2',
  },
  valueText: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.text,
  },
  checkmark: {
    fontSize: 24,
    color: '#22C55E',
    fontWeight: '900',
    marginTop: 8,
  },
  cross: {
    fontSize: 24,
    color: '#EF4444',
    fontWeight: '900',
    marginTop: 8,
  },
  characterContainer: {
    alignItems: 'center',
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
});
