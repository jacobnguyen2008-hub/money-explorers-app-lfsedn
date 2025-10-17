
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

export const colors = {
  background: '#FFF5F7',
  text: '#2D3748',
  textSecondary: '#718096',
  primary: '#FF6B9D',
  secondary: '#4ECDC4',
  accent: '#FFD93D',
  card: '#FFFFFF',
  highlight: '#FFE5EC',
  success: '#22C55E',
  warning: '#F59E0B',
  error: '#EF4444',
  purple: '#A78BFA',
  orange: '#FF8C42',
  blue: '#60A5FA',
  green: '#34D399',
  pink: '#F472B6',
};

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textSecondary,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 20,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    elevation: 4,
  },
});
