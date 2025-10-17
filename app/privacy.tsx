
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { colors } from '@/styles/commonStyles';

export default function PrivacyScreen() {
  const router = useRouter();

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
          <Text style={styles.headerTitle}>Privacy & Safety</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.section}>
            <View style={styles.iconContainer}>
              <IconSymbol name="lock.fill" size={40} color={colors.primary} />
            </View>
            <Text style={styles.sectionTitle}>Your Privacy Matters</Text>
            <Text style={styles.sectionText}>
              This app is designed to be safe for kids. We follow all U.S. public school rules to protect you.
            </Text>
          </View>

          <View style={styles.section}>
            <View style={styles.iconContainer}>
              <IconSymbol name="person.fill" size={40} color={colors.accent} />
            </View>
            <Text style={styles.sectionTitle}>Student Privacy (FERPA)</Text>
            <Text style={styles.sectionText}>
              We protect your school records. Your information is kept private and safe. Only you and your parents can see your progress.
            </Text>
          </View>

          <View style={styles.section}>
            <View style={styles.iconContainer}>
              <IconSymbol name="heart.fill" size={40} color="#FF6B9D" />
            </View>
            <Text style={styles.sectionTitle}>Kids Safety (COPPA)</Text>
            <Text style={styles.sectionText}>
              If you are under 13, we need your parent&apos;s permission. We never collect personal information without asking your parents first.
            </Text>
            <TouchableOpacity
              style={styles.consentButton}
              onPress={() => router.push('/parental-consent')}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={[colors.primary, colors.accent]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.consentGradient}
              >
                <IconSymbol name="person.2.fill" size={20} color={colors.card} />
                <Text style={styles.consentButtonText}>Get Parent Permission</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <View style={styles.iconContainer}>
              <IconSymbol name="checkmark.circle.fill" size={40} color="#4ECDC4" />
            </View>
            <Text style={styles.sectionTitle}>What We Do</Text>
            <Text style={styles.bulletPoint}>✓ Keep your data safe with strong protection</Text>
            <Text style={styles.bulletPoint}>✓ Never sell your information</Text>
            <Text style={styles.bulletPoint}>✓ Never show you ads based on your data</Text>
            <Text style={styles.bulletPoint}>✓ Let you delete your data anytime</Text>
            <Text style={styles.bulletPoint}>✓ Tell you if something goes wrong</Text>
          </View>

          <View style={styles.section}>
            <View style={styles.iconContainer}>
              <IconSymbol name="eye.fill" size={40} color="#FFE66D" />
            </View>
            <Text style={styles.sectionTitle}>Easy to Use (Accessibility)</Text>
            <Text style={styles.sectionText}>
              This app is made so everyone can use it. We follow rules (Section 508 and WCAG 2.1 AA) to make sure kids with different needs can learn about money too.
            </Text>
          </View>

          <View style={styles.section}>
            <View style={styles.iconContainer}>
              <IconSymbol name="book.fill" size={40} color="#A78BFA" />
            </View>
            <Text style={styles.sectionTitle}>Educational Content</Text>
            <Text style={styles.sectionText}>
              All lessons are educational and follow school standards. We teach money skills in a fun and safe way. Content is secular and appropriate for all students.
            </Text>
          </View>

          <View style={styles.section}>
            <View style={styles.iconContainer}>
              <IconSymbol name="person.2.fill" size={40} color="#FF8C42" />
            </View>
            <Text style={styles.sectionTitle}>For Parents</Text>
            <Text style={styles.sectionText}>
              Parents can see their child&apos;s progress anytime. You control what information is shared. You can delete all data at any time.
            </Text>
          </View>

          <View style={styles.section}>
            <View style={styles.iconContainer}>
              <IconSymbol name="shield.fill" size={40} color="#48C9B0" />
            </View>
            <Text style={styles.sectionTitle}>Data Security</Text>
            <Text style={styles.sectionText}>
              We use secure encryption to protect all data. If there is ever a security issue, we will notify parents immediately as required by law.
            </Text>
          </View>

          <View style={styles.infoBox}>
            <IconSymbol name="info.circle.fill" size={24} color={colors.primary} />
            <Text style={styles.infoText}>
              This app stores data only on your device. Nothing is sent to the internet without your permission.
            </Text>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Questions? Ask your parent or teacher for help.
            </Text>
          </View>
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
    paddingBottom: 100,
  },
  section: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
    elevation: 4,
  },
  iconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    alignSelf: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 12,
    textAlign: 'center',
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  bulletPoint: {
    fontSize: 16,
    lineHeight: 28,
    color: colors.textSecondary,
    marginLeft: 8,
  },
  consentButton: {
    marginTop: 16,
    borderRadius: 12,
    overflow: 'hidden',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
    elevation: 5,
  },
  consentGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    gap: 8,
  },
  consentButtonText: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.card,
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: colors.primary + '20',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    color: colors.text,
    marginLeft: 12,
  },
  footer: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
