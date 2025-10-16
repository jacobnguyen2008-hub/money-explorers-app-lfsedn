
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, commonStyles } from '@/styles/commonStyles';
import { useProgress } from '@/contexts/ProgressContext';

const availableStickers = [
  { emoji: '⭐', name: 'Gold Star', cost: 10 },
  { emoji: '🌟', name: 'Shiny Star', cost: 15 },
  { emoji: '🎉', name: 'Party', cost: 20 },
  { emoji: '🏆', name: 'Trophy', cost: 25 },
  { emoji: '👑', name: 'Crown', cost: 30 },
  { emoji: '💎', name: 'Diamond', cost: 35 },
  { emoji: '🦄', name: 'Unicorn', cost: 40 },
  { emoji: '🚀', name: 'Rocket', cost: 45 },
  { emoji: '🌈', name: 'Rainbow', cost: 50 },
  { emoji: '🎨', name: 'Art', cost: 20 },
  { emoji: '🎭', name: 'Theater', cost: 25 },
  { emoji: '🎪', name: 'Circus', cost: 30 },
];

export default function RewardsScreen() {
  const { progress, spendCoins, addSticker } = useProgress();

  const handleBuySticker = (sticker: typeof availableStickers[0]) => {
    if (progress.stickers.includes(sticker.emoji)) {
      Alert.alert('Already Owned!', 'You already have this sticker! 😊');
      return;
    }

    if (spendCoins(sticker.cost)) {
      addSticker(sticker.emoji);
      Alert.alert('Success! 🎉', `You got the ${sticker.name} sticker!`);
    } else {
      Alert.alert('Not Enough Coins! 😢', `You need ${sticker.cost} coins but only have ${progress.coins}.`);
    }
  };

  return (
    <SafeAreaView style={commonStyles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>🏆 Rewards</Text>
        <View style={styles.coinsContainer}>
          <Text style={styles.coinsText}>💰 {progress.coins} Coins</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎖️ Your Badges</Text>
          <View style={styles.badgesContainer}>
            {progress.badges.length === 0 ? (
              <Text style={styles.emptyText}>
                Complete lessons and games to earn badges!
              </Text>
            ) : (
              progress.badges.map((badge, index) => (
                <View key={index} style={styles.badgeItem}>
                  <Text style={styles.badgeEmoji}>{badge}</Text>
                </View>
              ))
            )}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>✨ Your Stickers</Text>
          <View style={styles.stickersContainer}>
            {progress.stickers.length === 0 ? (
              <Text style={styles.emptyText}>
                Buy stickers with your coins!
              </Text>
            ) : (
              progress.stickers.map((sticker, index) => (
                <View key={index} style={styles.stickerItem}>
                  <Text style={styles.stickerEmoji}>{sticker}</Text>
                </View>
              ))
            )}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🛍️ Sticker Shop</Text>
          <View style={styles.shopGrid}>
            {availableStickers.map((sticker, index) => {
              const owned = progress.stickers.includes(sticker.emoji);
              
              return (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.8}
                  onPress={() => handleBuySticker(sticker)}
                  disabled={owned}
                >
                  <View style={[
                    styles.shopCard,
                    owned && styles.shopCardOwned,
                  ]}>
                    <Text style={styles.shopEmoji}>{sticker.emoji}</Text>
                    <Text style={styles.shopName}>{sticker.name}</Text>
                    {owned ? (
                      <View style={styles.ownedBadge}>
                        <Text style={styles.ownedText}>Owned ✓</Text>
                      </View>
                    ) : (
                      <View style={styles.priceTag}>
                        <Text style={styles.priceText}>💰 {sticker.cost}</Text>
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
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
    marginBottom: 16,
  },
  coinsContainer: {
    backgroundColor: colors.card,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  coinsText: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 0,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 16,
  },
  badgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  badgeItem: {
    backgroundColor: colors.card,
    width: 80,
    height: 80,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  badgeEmoji: {
    fontSize: 40,
  },
  stickersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  stickerItem: {
    backgroundColor: colors.card,
    width: 70,
    height: 70,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  stickerEmoji: {
    fontSize: 36,
  },
  emptyText: {
    fontSize: 16,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
  shopGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  shopCard: {
    backgroundColor: colors.card,
    width: 100,
    padding: 12,
    borderRadius: 16,
    alignItems: 'center',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  shopCardOwned: {
    opacity: 0.6,
  },
  shopEmoji: {
    fontSize: 40,
    marginBottom: 8,
  },
  shopName: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  priceTag: {
    backgroundColor: colors.accent,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  priceText: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.text,
  },
  ownedBadge: {
    backgroundColor: colors.secondary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  ownedText: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.card,
  },
  bottomPadding: {
    height: 100,
  },
});
