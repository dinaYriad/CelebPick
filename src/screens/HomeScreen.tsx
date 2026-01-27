import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { GradientBackground } from '../components/GradientBackground';
import { COLORS, SPACING, TYPOGRAPHY, LAYOUT, SHADOWS } from '../constants/theme';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

export default function HomeScreen({ navigation }: Props) {
  return (
    <GradientBackground type="primary">
      <SafeAreaView style={styles.container}>
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            {/* App Title with sparkles */}
            <View style={styles.titleContainer}>
              <Text style={styles.sparkle}>✨</Text>
              <Text style={styles.title}>CelebPick</Text>
              <Text style={styles.sparkle}>✨</Text>
            </View>
            <Text style={styles.subtitle}>Match the stars & shine bright!</Text>

            {/* Game Mode Cards */}
            <View style={styles.modesContainer}>
              {/* Name → Face Mode */}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate('Quiz', { mode: 'nameToFace' })}
              >
                <LinearGradient
                  colors={['#B794F6', '#9F7AEA']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.modeCard}
                >
                  <Text style={styles.modeEmoji}>🎭</Text>
                  <Text style={styles.modeTitle}>Name → Face</Text>
                  <Text style={styles.modeDesc}>Match names to photos</Text>
                </LinearGradient>
              </TouchableOpacity>

              {/* Face → Name Mode */}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate('Quiz', { mode: 'faceToName' })}
              >
                <LinearGradient
                  colors={['#FBB6CE', '#F687B3']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.modeCard}
                >
                  <Text style={styles.modeEmoji}>📸</Text>
                  <Text style={styles.modeTitle}>Face → Name</Text>
                  <Text style={styles.modeDesc}>Match photos to names</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            {/* Score History Button */}
            <TouchableOpacity
              style={styles.historyButton}
              onPress={() => navigation.navigate('ScoreHistory', {})}
              activeOpacity={0.8}
            >
              <Text style={styles.historyIcon}>⭐</Text>
              <Text style={styles.historyText}>View Score History</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    minHeight: '100%',
    justifyContent: 'center',
    paddingVertical: SPACING.lg,
  },
  content: {
    padding: SPACING.xl,
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
  },
  sparkle: {
    fontSize: 32,
    marginHorizontal: SPACING.sm,
  },
  title: {
    fontSize: 48,
    fontWeight: '800',
    color: COLORS.text.primary,
    textAlign: 'center',
    letterSpacing: 1,
  },
  subtitle: {
    ...TYPOGRAPHY.body,
    fontSize: 18,
    color: COLORS.text.secondary,
    textAlign: 'center',
    marginBottom: SPACING.xxl,
    fontWeight: '500',
  },
  modesContainer: {
    width: '100%',
    maxWidth: 400,
    marginBottom: SPACING.xl,
  },
  modeCard: {
    padding: SPACING.xl,
    borderRadius: LAYOUT.borderRadiusLarge,
    marginBottom: SPACING.lg,
    alignItems: 'center',
    ...SHADOWS.dreamy,
  },
  modeEmoji: {
    fontSize: 48,
    marginBottom: SPACING.sm,
  },
  modeTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text.onPrimary,
    marginBottom: SPACING.xs,
  },
  modeDesc: {
    fontSize: 14,
    color: COLORS.text.onPrimary,
    opacity: 0.95,
    fontWeight: '500',
  },
  historyButton: {
    backgroundColor: COLORS.card,
    borderRadius: LAYOUT.borderRadiusPill,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
    flexDirection: 'row',
    alignItems: 'center',
    ...SHADOWS.soft,
  },
  historyIcon: {
    fontSize: 20,
    marginRight: SPACING.sm,
  },
  historyText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.primary,
  },
});
