const test = require('node:test');
const assert = require('node:assert/strict');
const {
  parseInput,
  calculateManual,
  appendKey,
  normalizeExpression,
  calculateExpression,
} = require('../src/utils/calculatorLogic');

// Simula o contrato da função evaluate da mathjs para os cenários abaixo.
function simpleEvaluate(input) {
  const match = /^(-?\d+(?:\.\d+)?)\s*([+\-*/])\s*(-?\d+(?:\.\d+)?)$/.exec(input);
  if (!match) throw new Error('Expressão não suportada pelo simulador');
  const a = Number(match[1]);
  const b = Number(match[3]);
  switch (match[2]) {
    case '+': return a + b;
    case '-': return a - b;
    case '*': return a * b;
    case '/': return a / b;
    default: throw new Error('Operação não suportada');
  }
}

test('aceita números inteiros, negativos e decimais com vírgula/ponto', () => {
  assert.equal(parseInput('-12,5'), -12.5);
  assert.equal(parseInput('0.75'), 0.75);
  assert.equal(parseInput('+3'), 3);
  assert.equal(parseInput('abc'), null);
});

test('executa as quatro operações da versão 1', () => {
  assert.equal(calculateManual('10', '3', '+').value, 13);
  assert.equal(calculateManual('10', '3', '-').value, 7);
  assert.equal(calculateManual('10', '3', '*').value, 30);
  assert.equal(calculateManual('10', '2', '/').value, 5);
});

test('exibe valores formatados em pt-BR sem ruído de ponto flutuante', () => {
  assert.equal(calculateManual('0,1', '0,2', '+').display, '0,3');
});

test('informa entradas ausentes e inválidas', () => {
  assert.equal(calculateManual('', '2', '+').ok, false);
  assert.equal(calculateManual('um', '2', '+').ok, false);
  assert.equal(calculateManual('1', '2', '?').ok, false);
});

test('impede divisão por zero na versão 1', () => {
  assert.match(calculateManual('10', '0', '/').message, /zero/);
});

test('monta o teclado e permite sinal negativo inicial', () => {
  let expr = '';
  for (const key of ['1', '2', '+', '3']) expr = appendKey(expr, key);
  assert.equal(expr, '12+3');
  assert.equal(appendKey('', '−'), '−');
});

test('substitui o operador quando outro operador é tocado', () => {
  assert.equal(appendKey('7+', '×'), '7×');
  assert.equal(appendKey('−', '+'), '−');
  assert.equal(appendKey('0', '5'), '5');
});

test('converte os operadores gráficos antes do evaluate', () => {
  assert.equal(normalizeExpression('12×3÷2−1'), '12*3/2-1');
  assert.equal(calculateExpression('9×4', simpleEvaluate).value, 36);
  assert.equal(calculateExpression('9÷3', simpleEvaluate).value, 3);
});

test('calcula expressões simples pela função evaluate injetada', () => {
  assert.equal(calculateExpression('12+30', simpleEvaluate).display, '42');
  assert.equal(calculateExpression('3−7', simpleEvaluate).display, '-4');
});

test('avisa sobre expressão vazia ou incompleta', () => {
  assert.equal(calculateExpression('', simpleEvaluate).ok, false);
  assert.equal(calculateExpression('10+', simpleEvaluate).ok, false);
});

test('recusa caracteres fora do teclado antes da avaliação', () => {
  const neverEvaluate = () => { throw new Error('não deveria executar'); };
  assert.match(calculateExpression('sin(90)', neverEvaluate).message, /caracteres inválidos/);
});

test('impede resultado infinito na versão 2', () => {
  assert.equal(calculateExpression('2÷0', simpleEvaluate).ok, false);
});

test('captura erros da biblioteca de expressão', () => {
  assert.equal(calculateExpression('1+2', () => { throw new Error('parse'); }).ok, false);
});
