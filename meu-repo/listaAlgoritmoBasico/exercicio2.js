const prompt = require('prompt-sync')()

const vetor = []
let soma = 0

const tamanho = Number(prompt('Informe a quantidade de elementos do vetor: '))

for (let i = 0; i < tamanho; i++) {
  const numero = Number(prompt(`Informe o elemento ${i}: `))
  vetor.push(numero)
  soma += numero
}

if (tamanho > 0) {
  const media = soma / tamanho

  console.log('Vetor informado:', vetor)
  console.log('Média dos elementos:', media)
} else {
  console.log('O vetor deve possuir pelo menos um elemento.')
}
