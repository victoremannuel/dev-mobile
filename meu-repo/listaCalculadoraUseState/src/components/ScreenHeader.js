import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../theme';

export default function ScreenHeader({ title, subtitle, onBack }) {
  return (
    <View style={styles.container}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Voltar à tela inicial"
        onPress={onBack}
        style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}
      >
        <Text style={styles.backText}>‹</Text>
      </Pressable>
      <View style={styles.textBlock}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 26,
    gap: 14,
  },
  backButton: {
    backgroundColor: COLORS.white,
    width: 44,
    height: 44,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressed: { opacity: 0.7 },
  backText: { fontSize: 32, lineHeight: 38, color: COLORS.navy, marginTop: -3 },
  textBlock: { flex: 1 },
  title: { fontSize: 24, fontWeight: '800', color: COLORS.ink },
  subtitle: { fontSize: 13, color: COLORS.muted, marginTop: 3 },
});
