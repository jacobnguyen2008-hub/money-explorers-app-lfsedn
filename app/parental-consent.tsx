
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { colors } from '@/styles/commonStyles';

export default function ParentalConsentScreen() {
  const router = useRouter();
  const [parentName, setParentName] = useState('');
  const [parentEmail, setParentEmail] = useState('');
  const [childAge, setChildAge] = useState('');
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = () => {
    if (!parentName || !parentEmail || !childAge) {
      Alert.alert('Missing Information', 'Please fill in all fields.');
      return;
    }

    if (!agreed) {
      Alert.alert('Consent Required', 'Please agree to the terms to continue.');
      return;
    }

    const age = parseInt(childAge);
    if (isNaN(age) || age < 5 || age > 18) {
      Alert.alert('Invalid Age', 'Please enter a valid age between 5 and 18.');
      return;
    }

    Alert.alert(
      'Thank You!',
      'Your consent has been recorded. Your child can now use the app safely.',
      [
        {
          text: 'Continue',
          onPress: () => router.replace('/(tabs)/(home)/'),
        },
      ]
    );
  };

  return (
    <LinearGradient
      colors={[colors.background, colors.secondary]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <IconSymbol name="arrow.left" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Parental Consent</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.iconContainer}>
            <IconSymbol name="person.2.fill" size={60} color={colors.primary} />
          </View>

          <Text style={styles.title}>Parent or Guardian Consent</Text>
          <Text style={styles.subtitle}>
            For children under 13, we need parent or guardian permission to use this app (COPPA requirement).
          </Text>

          <View style={styles.formSection}>
            <Text style={styles.label}>Parent/Guardian Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your full name"
              value={parentName}
              onChangeText={setParentName}
              placeholderTextColor={colors.textSecondary}
            />

            <Text style={styles.label}>Parent/Guardian Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              value={parentEmail}
              onChangeText={setParentEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor={colors.textSecondary}
            />

            <Text style={styles.label}>Child&apos;s Age</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter child's age"
              value={childAge}
              onChangeText={setChildAge}
              keyboardType="number-pad"
              placeholderTextColor={colors.textSecondary}
            />
          </View>

          <View style={styles.infoBox}>
            <IconSymbol name="info.circle.fill" size={24} color={colors.primary} />
            <Text style={styles.infoText}>
              We collect this information only to verify parental consent. We will not share or sell this information.
            </Text>
          </View>

          <View style={styles.consentSection}>
            <Text style={styles.consentTitle}>What We Collect:</Text>
            <Text style={styles.consentItem}>• Progress in lessons and games</Text>
            <Text style={styles.consentItem}>• Coins and rewards earned</Text>
            <Text style={styles.consentItem}>• Quiz scores</Text>
            <Text style={styles.consentItem}>• App usage (stored locally on device)</Text>
          </View>

          <View style={styles.consentSection}>
            <Text style={styles.consentTitle}>What We Do NOT Collect:</Text>
            <Text style={styles.consentItem}>• Personal photos or videos</Text>
            <Text style={styles.consentItem}>• Location data</Text>
            <Text style={styles.consentItem}>• Contact lists</Text>
            <Text style={styles.consentItem}>• Social media information</Text>
          </View>

          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => setAgreed(!agreed)}
            activeOpacity={0.7}
          >
            <View style={[styles.checkbox, agreed && styles.checkboxChecked]}>
              {agreed && <IconSymbol name="checkmark" size={20} color={colors.card} />}
            </View>
            <Text style={styles.checkboxLabel}>
              I give permission for my child to use this app and agree to the privacy policy.
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.submitButton, !agreed && styles.submitButtonDisabled]}
            onPress={handleSubmit}
            disabled={!agreed}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={agreed ? [colors.primary, colors.accent] : ['#CCCCCC', '#AAAAAA']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.submitGradient}
            >
              <Text style={styles.submitButtonText}>Submit Consent</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.privacyLink}
            onPress={() => router.push('/privacy')}
          >
            <Text style={styles.privacyLinkText}>Read Full Privacy Policy</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 24,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    elevation: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
  },
  formSection: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
    elevation: 4,
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: colors.text,
    borderWidth: 2,
    borderColor: colors.secondary,
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: colors.primary + '20',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    alignItems: 'center',
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    color: colors.text,
    marginLeft: 12,
  },
  consentSection: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
    elevation: 4,
  },
  consentTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 12,
  },
  consentItem: {
    fontSize: 15,
    lineHeight: 24,
    color: colors.textSecondary,
    marginLeft: 8,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
    elevation: 4,
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colors.textSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  checkboxLabel: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
    color: colors.text,
    fontWeight: '600',
  },
  submitButton: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
    elevation: 5,
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  submitGradient: {
    padding: 18,
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.card,
  },
  privacyLink: {
    alignItems: 'center',
    padding: 12,
  },
  privacyLinkText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
    textDecorationLine: 'underline',
  },
});
