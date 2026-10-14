# Calculadora — React Native (duas versões)

## O que o aplicativo faz

O aplicativo possui **três telas**, conforme as especificações do exercício:

1. **Tela inicial:** permite escolher entre duas versões da calculadora.
2. **Versão 1 — cálculo manual:** possui os campos **Valor A** e **Valor B**, os botões **Somar (A+B)**, **Subtrair (A−B)**, **Multiplicar (A×B)** e **Dividir (A÷B)** e exibe o resultado.
3. **Versão 2 — botões:** fornece as teclas **0 a 9**, os operadores **+ − × ÷**, a tecla **C** para limpar, o visor da expressão e a tecla **=** para calcular. **Usa `evaluate` da biblioteca `mathjs`**, como solicitado na atividade.

A lógica é controlada por `useState` e inclui validação de entradas, divisão por zero, erros de expressão e apresentação de resultados com vírgula decimal no padrão brasileiro.

## Pré-requisitos

- Node.js **22.13 ou mais recente** (compatível com Expo SDK 57; preferencialmente Node 22 LTS).
- npm.
- Aplicativo **Expo Go** no celular (Android/iOS) ou emulador configurado.

## Como executar

1. Extraia a pasta `listaCalculadoraUseState` do ZIP.
2. Abra um terminal dentro da pasta.
3. Instale as dependências:

   ```bash
   npm install
   ```

4. Inicie o projeto:

   ```bash
   npm start
   ```

5. Escaneie o QR Code com o Expo Go ou escolha a opção correspondente ao emulador Android/iOS no terminal.

## Estrutura do projeto

```text
calculadora-react-native/
├── App.js                              # Tela selecionada por useState
├── index.js                            # Entrada do Expo
├── package.json                        # React Native, Expo, mathjs
├── app.json                            # Configuração do aplicativo
├── babel.config.js                     # Preset de Babel (declarado em devDependencies)
├── scripts/diagnose.cjs                # Diagnóstico de pacotes essenciais
├── src/
│   ├── components/
│   │   └── ScreenHeader.js             # Cabeçalho reutilizável com voltar
│   ├── screens/
│   │   ├── HomeScreen.js               # Escolha de versão
│   │   ├── ManualCalculatorScreen.js   # Versão 1
│   │   └── ButtonCalculatorScreen.js   # Versão 2
│   ├── utils/
│   │   └── calculatorLogic.js          # Regras e validações
│   └── theme.js                        # Cores
└── tests/
    └── calculator.test.cjs             # Testes unitários
```

## Como testar manualmente

| Ação | Resultado esperado |
| --- | --- |
| Versão 1: A = 10, B = 5, Somar | 15 |
| Versão 1: A = 10, B = 5, Subtrair | 5 |
| Versão 1: A = 10, B = 5, Multiplicar | 50 |
| Versão 1: A = 10, B = 5, Dividir | 2 |
| Versão 1: A = 10, B = 0, Dividir | Mensagem de erro |
| Versão 1: A = 0,1, B = 0,2, Somar | 0,3 |
| Versão 2: 1 → + → 1 → 0 → = | 11 |
| Versão 2: 1 → 2 → × → 3 → = | 36 |
| Versão 2: 8 → ÷ → 2 → = | 4 |
| Versão 2: 7 → + → C | Visor vazio |
| Versão 2: 5 → ÷ → 0 → = | Mensagem de erro |
| Versão 2: 2 → + → 3 → × → 4 → = | 14 (precedência da mathjs) |
