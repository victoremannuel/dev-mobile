const prompt = require('prompt-sync')()

const vetor1 = []
const vetor2 = []
const soma = []

const tamanho = Number(prompt('Informe o tamanho dos vetores: '))

for (let i = 0; i < tamanho; i++) {
  const numero = Number(prompt(`Informe o elemento ${i} do primeiro vetor: `))
  vetor1.push(numero)
}

for (let i = 0; i < tamanho; i++) {
  const numero = Number(prompt(`Informe o elemento ${i} do segundo vetor: `))
  vetor2.push(numero)
}

for (let i = 0; i < tamanho; i++) {
  soma.push(vetor1[i] + vetor2[i])
}

console.log('Primeiro vetor:', vetor1)
console.log('Segundo vetor:', vetor2)
console.log('Soma dos vetores:', soma)
