import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import ScreenHeader from '../components/ScreenHeader';
import { COLORS } from '../theme';
import { calculateManual } from '../utils/calculatorLogic';

const OPERATIONS = [
  { label: 'Somar (A + B)', symbol: '+', operator: '+' },
  { label: 'Subtrair (A − B)', symbol: '−', operator: '-' },
  { label: 'Multiplicar (A × B)', symbol: '×', operator: '*' },
  { label: 'Dividir (A ÷ B)', symbol: '÷', operator: '/' },
];

export default function ManualCalculatorScreen({ onBack }) {
  const [valueA, setValueA] = useState('');
  const [valueB, setValueB] = useState('');
  const [result, setResult] = useState(null);

  function calculate(operator) {
    setResult(calculateManual(valueA, valueB, operator));
  }

  function updateA(text) {
    setValueA(text);
    setResult(null);
  }

  function updateB(text) {
    setValueB(text);
    setResult(null);
  }

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.content}
      >
        <ScreenHeader
          title="Versão 1"
          subtitle="Valores informados manualmente"
          onBack={onBack}
        />
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Informe os valores</Text>
          <Text style={styles.instructions}>
            Digite dois números. Para calcular, toque em uma das quatro operações.
          </Text>

          <Text style={styles.label}>Valor A</Text>
          <TextInput
            testID="input-a"
            accessibilityLabel="Valor A"
            placeholder="Ex.: 25,5"
            placeholderTextColor="#9BA8B8"
            keyboardType="decimal-pad"
            value={valueA}
            onChangeText={updateA}
            style={styles.input}
            returnKeyType="done"
          />
          <Text style={styles.label}>Valor B</Text>
          <TextInput
            testID="input-b"
            accessibilityLabel="Valor B"
            placeholder="Ex.: 5"
            placeholderTextColor="#9BA8B8"
            keyboardType="decimal-pad"
            value={valueB}
            onChangeText={updateB}
            style={styles.input}
            returnKeyType="done"
          />

          <Text style={styles.operationsHeading}>Escolha a operação</Text>
          {OPERATIONS.map((operation) => (
            <Pressable
              key={operation.operator}
              accessibilityRole="button"
              accessibilityLabel={operation.label}
              onPress={() => calculate(operation.operator)}
              style={({ pressed }) => [styles.operationButton, pressed && styles.pressed]}
            >
              <View style={styles.operatorBadge}>
                <Text style={styles.operatorSymbol}>{operation.symbol}</Text>
              </View>
              <Text style={styles.operationText}>{operation.label}</Text>
              <Text style={styles.operationArrow}>›</Text>
            </Pressable>
          ))}
        </View>

        <View style={[styles.resultBox, result && !result.ok && styles.resultError]}>
          <Text style={styles.resultLabel}>RESULTADO</Text>
          <Text
            testID="manual-result"
            accessibilityRole="text"
            style={[styles.resultText, result && !result.ok && styles.errorText]}
          >
            {result ? (result.ok ? result.display : result.message) : 'Aguardando cálculo'}
          </Text>
        </View>
        <Text style={styles.tip}>Dica: os campos aceitam números negativos e casas decimais.</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  content: {
    width: '100%',
    maxWidth: 510,
    alignSelf: 'center',
    paddingHorizontal: 21,
    paddingTop: 22,
    paddingBottom: 48,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    borderColor: COLORS.border,
    borderWidth: 1,
    padding: 20,
  },
  cardTitle: { color: COLORS.ink, fontSize: 21, fontWeight: '800' },
  instructions: { color: COLORS.muted, fontSize: 13, lineHeight: 20, marginTop: 7, marginBottom: 24 },
  label: { fontWeight: '700', fontSize: 14, color: COLORS.ink, marginBottom: 8 },
  input: {
    width: '100%',
    height: 56,
    backgroundColor: '#FAFCFF',
    borderColor: '#C7D5E7',
    borderWidth: 1.5,
    borderRadius: 13,
    paddingHorizontal: 15,
    marginBottom: 17,
    color: COLORS.ink,
    fontSize: 19,
  },
  operationsHeading: { marginTop: 10, marginBottom: 12, color: COLORS.muted, fontSize: 12, fontWeight: '800', letterSpacing: 0.6 },
  operationButton: {
    minHeight: 57,
    backgroundColor: COLORS.bluePale,
    borderRadius: 13,
    marginBottom: 9,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 13,
    gap: 11,
  },
  operatorBadge: {
    height: 36,
    width: 36,
    backgroundColor: COLORS.white,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  operatorSymbol: { fontSize: 23, fontWeight: '700', color: COLORS.blue },
  operationText: { flex: 1, color: COLORS.navy, fontSize: 15, fontWeight: '700' },
  operationArrow: { color: COLORS.blue, fontSize: 28 },
  resultBox: {
    backgroundColor: COLORS.greenPale,
    borderRadius: 20,
    paddingVertical: 21,
    paddingHorizontal: 21,
    marginTop: 17,
    minHeight: 95,
  },
  resultError: { backgroundColor: COLORS.redPale },
  resultLabel: { color: COLORS.green, fontWeight: '900', fontSize: 11, letterSpacing: 1.3 },
  resultText: { color: COLORS.ink, fontWeight: '800', fontSize: 24, marginTop: 8 },
  errorText: { color: COLORS.red, fontSize: 16, lineHeight: 23 },
  tip: { fontSize: 12, color: COLORS.muted, marginTop: 16, textAlign: 'center' },
  pressed: { opacity: 0.7 },
});
