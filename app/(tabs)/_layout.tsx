
import React from 'react';
import { Platform } from 'react-native';
import { NativeTabs, Icon, Label } from 'expo-router/unstable-native-tabs';
import { Stack } from 'expo-router';
import FloatingTabBar, { TabBarItem } from '@/components/FloatingTabBar';
import { colors } from '@/styles/commonStyles';

export default function TabLayout() {
  const tabs: TabBarItem[] = [
    {
      name: '(home)',
      route: '/(tabs)/(home)/',
      icon: 'house.fill',
      label: 'Home',
    },
    {
      name: 'learn',
      route: '/(tabs)/learn',
      icon: 'book.fill',
      label: 'Learn',
    },
    {
      name: 'games',
      route: '/(tabs)/games',
      icon: 'gamecontroller.fill',
      label: 'Games',
    },
    {
      name: 'rewards',
      route: '/(tabs)/rewards',
      icon: 'star.fill',
      label: 'Rewards',
    },
    {
      name: 'progress',
      route: '/(tabs)/progress',
      icon: 'chart.bar.fill',
      label: 'Progress',
    },
  ];

  if (Platform.OS === 'ios') {
    return (
      <NativeTabs>
        <NativeTabs.Trigger name="(home)">
          <Icon sf="house.fill" drawable="ic_home" />
          <Label>Home</Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="learn">
          <Icon sf="book.fill" drawable="ic_learn" />
          <Label>Learn</Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="games">
          <Icon sf="gamecontroller.fill" drawable="ic_games" />
          <Label>Games</Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="rewards">
          <Icon sf="star.fill" drawable="ic_rewards" />
          <Label>Rewards</Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="progress">
          <Icon sf="chart.bar.fill" drawable="ic_progress" />
          <Label>Progress</Label>
        </NativeTabs.Trigger>
      </NativeTabs>
    );
  }

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'none',
        }}
      >
        <Stack.Screen name="(home)" />
        <Stack.Screen name="learn" />
        <Stack.Screen name="games" />
        <Stack.Screen name="rewards" />
        <Stack.Screen name="progress" />
      </Stack>
      <FloatingTabBar tabs={tabs} />
    </>
  );
}
