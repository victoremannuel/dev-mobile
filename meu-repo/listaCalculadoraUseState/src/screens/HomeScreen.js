import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../theme';

function ChoiceCard({ number, title, description, details, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Abrir ${title}. ${description}`}
      style={({ pressed }) => [styles.choiceCard, pressed && styles.pressed]}
    >
      <View style={styles.choiceTop}>
        <View style={styles.numberBox}>
          <Text style={styles.numberText}>{number}</Text>
        </View>
        <Text style={styles.arrow}>↗</Text>
      </View>
      <Text style={styles.choiceTitle}>{title}</Text>
      <Text style={styles.choiceDescription}>{description}</Text>
      <View style={styles.pill}>
        <Text style={styles.pillText}>{details}</Text>
      </View>
    </Pressable>
  );
}

export default function HomeScreen({ onSelectVersion }) {
  return (
    <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>REACT NATIVE · useState</Text>
        <Text style={styles.heading}>Calculadora</Text>
        <Text style={styles.heroDescription}>
          Duas formas de calcular, uma única aplicação. Escolha uma versão para começar.
        </Text>
        <View style={styles.heroSymbols}>
          <Text style={styles.symbolText}>+    −    ×    ÷</Text>
        </View>
      </View>

      <Text style={styles.sectionHeading}>Escolha a versão</Text>
      <ChoiceCard
        number="01"
        title="Calculadora manual"
        description="Digite os valores A e B e selecione a operação desejada."
        details="2 entradas · 4 operações"
        onPress={() => onSelectVersion('manual')}
      />
      <ChoiceCard
        number="02"
        title="Calculadora por botões"
        description="Monte expressões tocando nos números e operadores, e pressione igual."
        details="Teclado numérico · mathjs"
        onPress={() => onSelectVersion('buttons')}
      />
      <Text style={styles.footer}>Exercício de programação mobile · IF Goiano — Campus Trindade</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    width: '100%',
    maxWidth: 510,
    alignSelf: 'center',
    paddingHorizontal: 22,
    paddingTop: 24,
    paddingBottom: 44,
  },
  hero: {
    backgroundColor: COLORS.navy,
    borderRadius: 28,
    padding: 25,
    paddingTop: 30,
    paddingBottom: 25,
    overflow: 'hidden',
    marginBottom: 28,
  },
  eyebrow: { color: '#B4CEE8', fontWeight: '800', fontSize: 11, letterSpacing: 1.7 },
  heading: { color: COLORS.white, fontSize: 36, fontWeight: '900', marginTop: 13 },
  heroDescription: { color: '#D6E5F6', fontSize: 15, lineHeight: 23, marginTop: 10 },
  heroSymbols: {
    marginTop: 21,
    backgroundColor: '#254A77',
    alignSelf: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 17,
    borderRadius: 15,
  },
  symbolText: { color: COLORS.white, fontSize: 20, fontWeight: '700' },
  sectionHeading: { color: COLORS.ink, fontSize: 18, fontWeight: '800', marginBottom: 15 },
  choiceCard: {
    padding: 22,
    backgroundColor: COLORS.white,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 14,
  },
  pressed: { opacity: 0.72 },
  choiceTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  numberBox: {
    width: 45,
    height: 45,
    backgroundColor: COLORS.bluePale,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberText: { color: COLORS.navy, fontWeight: '800', fontSize: 18 },
  arrow: { color: COLORS.blue, fontSize: 24, fontWeight: '700' },
  choiceTitle: { color: COLORS.ink, fontWeight: '800', fontSize: 19, marginTop: 16 },
  choiceDescription: { color: COLORS.muted, fontSize: 14, lineHeight: 21, marginTop: 7 },
  pill: {
    alignSelf: 'flex-start',
    backgroundColor: '#F2F5FA',
    paddingVertical: 7,
    paddingHorizontal: 11,
    borderRadius: 100,
    marginTop: 16,
  },
  pillText: { color: COLORS.muted, fontSize: 11, fontWeight: '700' },
  footer: { marginTop: 11, textAlign: 'center', color: COLORS.muted, lineHeight: 20, fontSize: 12 },
});
