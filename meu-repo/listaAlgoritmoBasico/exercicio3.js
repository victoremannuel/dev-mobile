const prompt = require('prompt-sync')()

const vetor = []
const vetorInvertido = []

const tamanho = Number(prompt('Informe a quantidade de elementos do vetor: '))

for (let i = 0; i < tamanho; i++) {
  const numero = Number(prompt(`Informe o elemento ${i}: `))
  vetor.push(numero)
}

for (let i = vetor.length - 1; i >= 0; i--) {
  vetorInvertido.push(vetor[i])
}

console.log('Vetor original:', vetor)
console.log('Vetor invertido:', vetorInvertido)
