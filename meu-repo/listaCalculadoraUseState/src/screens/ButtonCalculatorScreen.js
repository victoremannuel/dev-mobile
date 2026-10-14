import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { evaluate } from 'mathjs';
import ScreenHeader from '../components/ScreenHeader';
import { COLORS } from '../theme';
import { appendKey, calculateExpression } from '../utils/calculatorLogic';

const BUTTON_ROWS = [
  ['7', '8', '9', '+'],
  ['4', '5', '6', '−'],
  ['1', '2', '3', '×'],
  ['0', '=', '÷'],
];

function Key({ label, onPress, wide = false }) {
  const isEquals = label === '=';
  const isOperator = ['+', '−', '×', '÷'].includes(label);
  return (
    <Pressable
      testID={`key-${label}`}
      accessibilityRole="button"
      accessibilityLabel={label === '=' ? 'Calcular resultado' : `Tecla ${label}`}
      onPress={onPress}
      style={({ pressed }) => [
        styles.key,
        wide && styles.keyWide,
        isOperator && styles.operatorKey,
        isEquals && styles.equalsKey,
        pressed && styles.pressed,
      ]}
    >
      <Text style={[styles.keyText, isOperator && styles.operatorKeyText, isEquals && styles.equalsText]}>
        {label}
      </Text>
    </Pressable>
  );
}

export default function ButtonCalculatorScreen({ onBack }) {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState(null);
  const [justEvaluated, setJustEvaluated] = useState(false);

  function clear() {
    setExpression('');
    setResult(null);
    setJustEvaluated(false);
  }

  function pressKey(key) {
    if (key === '=') {
      const calculation = calculateExpression(expression, evaluate);
      setResult(calculation);
      setJustEvaluated(calculation.ok);
      return;
    }

    if (justEvaluated && result && result.ok) {
      const isOperator = ['+', '−', '×', '÷'].includes(key);
      const previousValue = isOperator ? String(result.value) : '';
      setExpression(appendKey(previousValue, key));
    } else {
      setExpression((previous) => appendKey(previous, key));
    }
    setResult(null);
    setJustEvaluated(false);
  }

  return (
    <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <ScreenHeader
        title="Versão 2"
        subtitle="Teclado numérico e biblioteca mathjs"
        onBack={onBack}
      />

      <View style={styles.card}>
        <View style={styles.topLine}>
          <Text style={styles.smallHeading}>SUA EXPRESSÃO</Text>
          <Pressable
            testID="clear-button"
            accessibilityRole="button"
            accessibilityLabel="Limpar toda a expressão"
            onPress={clear}
            style={({ pressed }) => [styles.clearButton, pressed && styles.pressed]}
          >
            <Text style={styles.clearText}>C</Text>
          </Pressable>
        </View>

        <TextInput
          testID="expression-display"
          accessibilityLabel="Expressão matemática atual"
          value={expression}
          editable={false}
          selectTextOnFocus={false}
          placeholder="0"
          placeholderTextColor="#97A5B9"
          style={styles.display}
          textAlign="right"
          showSoftInputOnFocus={false}
        />

        <View style={styles.keypad}>
          {BUTTON_ROWS.map((row, rowIndex) => (
            <View key={`row-${rowIndex}`} style={styles.keyRow}>
              {row.map((key) => (
                <Key
                  key={key}
                  label={key}
                  onPress={() => pressKey(key)}
                  wide={key === '='}
                />
              ))}
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.resultBox, result && !result.ok && styles.resultError]}>
        <Text style={[styles.resultLabel, result && !result.ok && styles.errorLabel]}>
          RESULTADO
        </Text>
        <Text
          testID="expression-result"
          accessibilityRole="text"
          style={[styles.resultText, result && !result.ok && styles.errorText]}
        >
          {result ? (result.ok ? result.display : result.message) : 'Pressione = para calcular'}
        </Text>
      </View>
      <Text style={styles.tip}>Toque em C para apagar a expressão. Após o resultado, você pode continuar calculando.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    width: '100%',
    maxWidth: 510,
    alignSelf: 'center',
    paddingHorizontal: 21,
    paddingTop: 22,
    paddingBottom: 48,
  },
  card: {
    padding: 19,
    borderRadius: 24,
    borderColor: COLORS.border,
    borderWidth: 1,
    backgroundColor: COLORS.white,
  },
  topLine: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  smallHeading: { color: COLORS.muted, fontSize: 12, fontWeight: '800', letterSpacing: 0.7 },
  clearButton: {
    height: 47,
    width: 48,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.redPale,
    borderRadius: 12,
  },
  clearText: { fontSize: 19, fontWeight: '800', color: COLORS.red },
  display: {
    marginTop: 14,
    marginBottom: 18,
    height: 76,
    borderRadius: 15,
    borderWidth: 1.5,
    borderColor: '#C7D5E7',
    backgroundColor: '#FAFCFF',
    color: COLORS.ink,
    paddingHorizontal: 15,
    fontSize: 28,
    fontWeight: '700',
  },
  keypad: { gap: 9 },
  keyRow: { flexDirection: 'row', gap: 9 },
  key: {
    flex: 1,
    height: 68,
    backgroundColor: COLORS.bluePale,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyWide: { flex: 2.14 },
  operatorKey: { backgroundColor: COLORS.purplePale },
  equalsKey: { backgroundColor: COLORS.greenPale },
  keyText: { color: COLORS.navy, fontSize: 25, fontWeight: '800' },
  operatorKeyText: { color: COLORS.purple },
  equalsText: { color: COLORS.green },
  pressed: { opacity: 0.60 },
  resultBox: {
    backgroundColor: COLORS.greenPale,
    minHeight: 103,
    paddingHorizontal: 20,
    paddingVertical: 22,
    marginTop: 18,
    borderRadius: 19,
  },
  resultError: { backgroundColor: COLORS.redPale },
  resultLabel: { color: COLORS.green, fontSize: 11, letterSpacing: 1.2, fontWeight: '900' },
  errorLabel: { color: COLORS.red },
  resultText: { color: COLORS.ink, fontSize: 25, fontWeight: '800', marginTop: 8 },
  errorText: { color: COLORS.red, fontSize: 16, lineHeight: 22 },
  tip: { textAlign: 'center', color: COLORS.muted, fontSize: 12, lineHeight: 18, marginTop: 17 },
});
