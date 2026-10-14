#!/usr/bin/env node
/* Verificação de dependências para investigação de erros de inicialização do Metro. */
const fs = require('node:fs');
const path = require('node:path');
const { createRequire } = require('node:module');

const root = path.resolve(__dirname, '..');
const pkg = require(path.join(root, 'package.json'));
const fromRoot = createRequire(path.join(root, 'package.json'));
let failed = false;

console.log(`Node: ${process.version}`);
const major = Number(process.versions.node.split('.')[0]);
if (major < 22 || (major === 22 && Number(process.versions.node.split('.')[1]) < 13)) {
  console.error('ERRO: Expo SDK 57 requer Node >= 22.13. Atualize para uma versão suportada.');
  failed = true;
}

for (const name of ['expo', 'react', 'react-native', 'mathjs', '@babel/core', 'babel-preset-expo']) {
  try {
    const resolved = fromRoot.resolve(`${name}/package.json`);
    const installed = JSON.parse(fs.readFileSync(resolved, 'utf8'));
    console.log(`${name}: ${installed.version}`);
  } catch (error) {
    // Alguns pacotes restringem o export de package.json, mas uma resolução normal
    // do módulo também é suficiente para saber se ele está presente no projeto.
    try {
      const resolved = fromRoot.resolve(name);
      console.log(`${name}: instalado (${resolved})`);
    } catch (_) {
      console.error(`ERRO: ${name} não está resolvível nesta pasta. Execute npm install.`);
      failed = true;
    }
  }
}

console.log('\nVersões declaradas no package.json:');
console.log(`Expo ${pkg.dependencies.expo} | React ${pkg.dependencies.react} | RN ${pkg.dependencies['react-native']}`);
if (failed) {
  console.error('\nVerificação falhou. Reinstale dependências e execute npx expo-doctor.');
  process.exitCode = 1;
} else {
  console.log('\nPacotes essenciais encontrados. Se o Metro ainda falhar, rode npx expo-doctor e npx expo start --clear.');
}
