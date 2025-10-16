
import "react-native-reanimated";
import React, { useEffect } from "react";
import { useFonts } from "expo-font";
import { Stack, router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { SystemBars } from "react-native-edge-to-edge";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useColorScheme, Alert } from "react-native";
import { useNetworkState } from "expo-network";
import {
  DarkTheme,
  DefaultTheme,
  Theme,
  ThemeProvider,
} from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { WidgetProvider } from "@/contexts/WidgetContext";
import { ProgressProvider } from "@/contexts/ProgressContext";
import { colors } from "@/styles/commonStyles";

SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const networkState = useNetworkState();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  React.useEffect(() => {
    if (
      !networkState.isConnected &&
      networkState.isInternetReachable === false
    ) {
      Alert.alert(
        "🔌 You are offline",
        "You can keep using the app! Your changes will be saved locally and synced when you are back online."
      );
    }
  }, [networkState.isConnected, networkState.isInternetReachable]);

  if (!loaded) {
    return null;
  }

  const CustomTheme: Theme = {
    ...DefaultTheme,
    dark: false,
    colors: {
      primary: colors.primary,
      background: colors.background,
      card: colors.card,
      text: colors.text,
      border: colors.textSecondary,
      notification: colors.accent,
    },
  };

  return (
    <>
      <StatusBar style="dark" animated />
      <ThemeProvider value={CustomTheme}>
        <ProgressProvider>
          <WidgetProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen
                  name="lessons/[id]"
                  options={{
                    presentation: "card",
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="quizzes/[id]"
                  options={{
                    presentation: "card",
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="games/save-vs-spend"
                  options={{
                    presentation: "card",
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="games/coin-matching"
                  options={{
                    presentation: "card",
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="games/money-adventure"
                  options={{
                    presentation: "card",
                    headerShown: false,
                  }}
                />
              </Stack>
              <SystemBars style="dark" />
            </GestureHandlerRootView>
          </WidgetProvider>
        </ProgressProvider>
      </ThemeProvider>
    </>
  );
}
