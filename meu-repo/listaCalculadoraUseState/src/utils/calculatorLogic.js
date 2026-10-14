/**
 * Regras matemáticas puras, isoladas da interface React Native.
 * O formato CommonJS também permite testar com o Node sem instalar o Expo.
 */

const OPERATORS = Object.freeze(['+', '−', '×', '÷']);

function parseInput(value) {
  const input = typeof value === 'string' ? value.trim() : '';
  if (!/^[+-]?(?:\d+(?:[.,]\d*)?|[.,]\d+)$/.test(input)) {
    return null;
  }

  const number = Number(input.replace(',', '.'));
  return Number.isFinite(number) ? number : null;
}

function formatResult(value) {
  // Limita ruído de ponto flutuante: 0,1 + 0,2 => 0,3.
  const rounded = Number(Number(value).toPrecision(12));
  return rounded.toLocaleString('pt-BR', {
    useGrouping: false,
    maximumFractionDigits: 12,
  });
}

function calculateManual(valueA, valueB, operation) {
  if (!valueA.trim() || !valueB.trim()) {
    return { ok: false, message: 'Informe os valores A e B.' };
  }

  const a = parseInput(valueA);
  const b = parseInput(valueB);
  if (a === null || b === null) {
    return { ok: false, message: 'Digite números válidos. Exemplo: 12,5.' };
  }

  if (operation === '/' && b === 0) {
    return { ok: false, message: 'Não é possível dividir por zero.' };
  }

  let value;
  switch (operation) {
    case '+':
      value = a + b;
      break;
    case '-':
      value = a - b;
      break;
    case '*':
      value = a * b;
      break;
    case '/':
      value = a / b;
      break;
    default:
      return { ok: false, message: 'Operação inválida.' };
  }

  if (!Number.isFinite(value)) {
    return { ok: false, message: 'Resultado fora do intervalo permitido.' };
  }

  return { ok: true, value, display: formatResult(value) };
}

function isOperator(key) {
  return OPERATORS.includes(key);
}

function appendKey(expression, key) {
  if (/^\d$/.test(key)) {
    if (expression === '0') return key;
    if (expression === '−0') return '−' + key;
    return expression + key;
  }

  if (!isOperator(key)) return expression;
  if (!expression) return key === '−' ? '−' : '';

  const last = expression.slice(-1);
  if (isOperator(last)) {
    // Trocar o operador evita sequências incompletas como 7++.
    // Um menos no começo continua sendo sinal negativo.
    if (expression.length === 1 && last === '−') {
      return expression;
    }
    return expression.slice(0, -1) + key;
  }

  return expression + key;
}

function normalizeExpression(expression) {
  return expression.replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-');
}

/**
 * evaluateFn é a função evaluate importada de mathjs na Versão 2.
 * É recebida como parâmetro para facilitar os testes unitários.
 */
function calculateExpression(expression, evaluateFn) {
  const typed = expression.trim();
  if (!typed) {
    return { ok: false, message: 'Digite uma expressão.' };
  }

  // A expressão só pode conter números e operadores disponibilizados na tela.
  // A notação e/E pode ocorrer quando um resultado grande é reutilizado.
  if (!/^[0-9.eE+\-×÷−*/\s]+$/.test(typed)) {
    return { ok: false, message: 'A expressão contém caracteres inválidos.' };
  }

  const last = typed.slice(-1);
  if (isOperator(last) || last === '-' || last === '*' || last === '/' || last === '+') {
    return { ok: false, message: 'Complete a expressão antes de calcular.' };
  }

  try {
    const normalized = normalizeExpression(typed);
    const mathResult = evaluateFn(normalized);
    const value = Number(mathResult.toString());

    if (!Number.isFinite(value)) {
      return { ok: false, message: 'Não é possível dividir por zero ou gerar um resultado infinito.' };
    }

    return { ok: true, value, display: formatResult(value) };
  } catch (_error) {
    return { ok: false, message: 'Expressão inválida. Confira os operadores.' };
  }
}

module.exports = {
  parseInput,
  formatResult,
  calculateManual,
  appendKey,
  normalizeExpression,
  calculateExpression,
};
