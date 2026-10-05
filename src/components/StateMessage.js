import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors, spacing, radius, fontSize } from '../constants/theme';

// Shared layout for the Error and Empty states.
// actions: [{ label, onPress, primary }]
const StateMessage = ({ Icon, title, message, actions = [] }) => (
  <View style={styles.container}>
    <Icon size={56} color={colors.textPrimary} />
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.message}>{message}</Text>
    {actions.map(action => (
      <Pressable
        key={action.label}
        onPress={action.onPress}
        style={[styles.button, action.primary && styles.primaryButton]}
      >
        <Text style={[styles.buttonText, action.primary && styles.primaryButtonText]}>
          {action.label}
        </Text>
      </Pressable>
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.xl },
  title: { marginTop: spacing.lg, fontSize: fontSize.lg, fontWeight: '600', color: colors.textPrimary },
  message: {
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
    textAlign: 'center',
    fontSize: fontSize.md,
    color: colors.textSecondary,
  },
  button: {
    alignSelf: 'stretch',
    alignItems: 'center',
    marginTop: spacing.sm,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.card,
  },
  primaryButton: { backgroundColor: colors.textPrimary },
  buttonText: { fontSize: fontSize.md, fontWeight: '600', color: colors.textPrimary },
  primaryButtonText: { color: colors.buttonText },
});

export default StateMessage;
