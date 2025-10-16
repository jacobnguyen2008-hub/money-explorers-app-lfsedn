
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

export const colors = {
  background: '#F7F2FA',
  text: '#343434',
  textSecondary: '#717171',
  primary: '#FF6B6B',
  secondary: '#4ECDC4',
  accent: '#FFE66D',
  card: '#FFFFFF',
  highlight: '#FFD9E0',
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
