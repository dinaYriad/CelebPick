import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { COLORS, SPACING, TYPOGRAPHY } from '../constants/theme';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

export default function HomeScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* App Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>CelebPick</Text>
          <Text style={styles.subtitle}>Test your celebrity knowledge!</Text>
        </View>

        {/* Game Mode Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.modeButton}
            onPress={() => navigation.navigate('Quiz', { mode: 'nameToFace' })}
          >
            <Text style={styles.buttonText}>Name → Face</Text>
            <Text style={styles.buttonDescription}>
              Match celebrity names to photos
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.modeButton}
            onPress={() => navigation.navigate('Quiz', { mode: 'faceToName' })}
          >
            <Text style={styles.buttonText}>Face → Name</Text>
            <Text style={styles.buttonDescription}>
              Match photos to celebrity names
            </Text>
          </TouchableOpacity>
        </View>

        {/* Score History Button */}
        <TouchableOpacity
          style={styles.historyButton}
          onPress={() => navigation.navigate('ScoreHistory', {})}
        >
          <Text style={styles.historyButtonText}>View Score History</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    padding: SPACING.lg,
    justifyContent: 'center',
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: SPACING.xxl,
  },
  title: {
    ...TYPOGRAPHY.title,
    color: COLORS.primary,
    marginBottom: SPACING.sm,
  },
  subtitle: {
    ...TYPOGRAPHY.body,
    color: COLORS.text.secondary,
  },
  buttonContainer: {
    marginBottom: SPACING.xl,
  },
  modeButton: {
    backgroundColor: COLORS.primary,
    padding: SPACING.lg,
    borderRadius: 12,
    marginBottom: SPACING.md,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    ...TYPOGRAPHY.heading,
    color: COLORS.text.onPrimary,
    textAlign: 'center',
    marginBottom: SPACING.xs,
  },
  buttonDescription: {
    ...TYPOGRAPHY.caption,
    color: COLORS.text.onPrimary,
    textAlign: 'center',
    opacity: 0.9,
  },
  historyButton: {
    borderWidth: 2,
    borderColor: COLORS.primary,
    padding: SPACING.md,
    borderRadius: 12,
  },
  historyButtonText: {
    ...TYPOGRAPHY.body,
    color: COLORS.primary,
    textAlign: 'center',
    fontWeight: '600',
  },
});
