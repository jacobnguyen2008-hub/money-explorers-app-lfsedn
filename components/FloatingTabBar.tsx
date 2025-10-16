
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { IconSymbol } from '@/components/IconSymbol';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Dimensions,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useRouter, usePathname } from 'expo-router';
import React from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  interpolate,
} from 'react-native-reanimated';
import { colors } from '@/styles/commonStyles';

export interface TabBarItem {
  name: string;
  route: string;
  icon: string;
  label: string;
}

interface FloatingTabBarProps {
  tabs: TabBarItem[];
  containerWidth?: number;
  borderRadius?: number;
  bottomMargin?: number;
}

export default function FloatingTabBar({
  tabs,
  containerWidth = Dimensions.get('window').width - 40,
  borderRadius = 25,
  bottomMargin = 20,
}: FloatingTabBarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const theme = useTheme();

  const activeIndex = tabs.findIndex((tab) =>
    pathname.includes(tab.name)
  );

  const translateX = useSharedValue(0);

  React.useEffect(() => {
    if (activeIndex !== -1) {
      translateX.value = withSpring(
        (activeIndex * containerWidth) / tabs.length,
        {
          damping: 20,
          stiffness: 90,
        }
      );
    }
  }, [activeIndex, containerWidth, tabs.length]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const handleTabPress = (route: string) => {
    router.push(route as any);
  };

  return (
    <SafeAreaView
      edges={['bottom']}
      style={[
        styles.container,
        {
          bottom: bottomMargin,
        },
      ]}
    >
      <BlurView
        intensity={Platform.OS === 'ios' ? 80 : 100}
        tint="light"
        style={[
          styles.tabBar,
          {
            width: containerWidth,
            borderRadius: borderRadius,
            backgroundColor: Platform.OS === 'ios' ? 'transparent' : colors.card,
          },
        ]}
      >
        <Animated.View
          style={[
            animatedStyle,
            styles.activeIndicator,
            {
              width: containerWidth / tabs.length,
              borderRadius: borderRadius - 5,
              backgroundColor: colors.primary,
            },
          ]}
        />
        {tabs.map((tab, index) => {
          const isActive = activeIndex === index;
          return (
            <TouchableOpacity
              key={tab.name}
              onPress={() => handleTabPress(tab.route)}
              style={styles.tab}
              activeOpacity={0.7}
            >
              <IconSymbol
                name={tab.icon as any}
                size={24}
                color={isActive ? colors.card : colors.text}
              />
              <Text
                style={[
                  styles.label,
                  {
                    color: isActive ? colors.card : colors.text,
                    fontWeight: isActive ? '800' : '600',
                  },
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </BlurView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 1000,
  },
  tabBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.15)',
    elevation: 8,
    overflow: 'hidden',
  },
  activeIndicator: {
    position: 'absolute',
    height: '80%',
    top: '10%',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    zIndex: 1,
  },
  label: {
    fontSize: 11,
    marginTop: 4,
  },
});
