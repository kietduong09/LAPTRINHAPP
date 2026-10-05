import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, radius, fontSize } from '../constants/theme';

const Card = ({ title, Icon, children }) => (
  <View style={styles.card}>
    <View style={styles.header}>
      {Icon && <Icon size={16} color={colors.textSecondary} />}
      <Text style={styles.title}>{title.toUpperCase()}</Text>
    </View>
    {children}
  </View>
);

const styles = StyleSheet.create({
  card: { backgroundColor: colors.card, borderRadius: radius.lg, padding: spacing.lg },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.md },
  title: {
    marginLeft: spacing.sm,
    fontSize: fontSize.xs,
    fontWeight: '600',
    letterSpacing: 0.8,
    color: colors.textSecondary,
  },
});

export default Card;
