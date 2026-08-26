const prompt = require('prompt-sync')()

const vetor = []

const tamanho = Number(prompt('Informe a quantidade de elementos do vetor: '))

for (let i = 0; i < tamanho; i++) {
  const numero = Number(prompt(`Informe o elemento ${i}: `))
  vetor.push(numero)
}

const numeroBuscado = Number(prompt('Informe o número que deseja buscar: '))

let indiceEncontrado = -1

for (let i = 0; i < vetor.length; i++) {
  if (vetor[i] === numeroBuscado) {
    indiceEncontrado = i
    break
  }
}

console.log('Vetor informado:', vetor)

if (indiceEncontrado !== -1) {
  console.log(`O número ${numeroBuscado} foi encontrado no índice ${indiceEncontrado}.`)
} else {
  console.log(`O número ${numeroBuscado} não foi encontrado no vetor.`)
}
