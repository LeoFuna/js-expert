'use strict';

const { watch, promises: { readFile } } = require('fs')

class File {
  watch(event, fileName) {
    console.log('this', this)
    // Arguments possui todos os argumentos passados no contexto da funcáo
    // entretanto ele tem um formato de dado parecido com Objeto
    // Abaixo é uma maneira de transformar esses dados em um array, aplicando
    // o metodo 'slice' em arguments
    console.log('arguments', Array.prototype.slice(arguments))
    this.showContent(fileName)
  }

  async showContent(fileName) {
    console.log((await readFile(fileName)).toString())
  }
}

const file = new File()

// dessa forma, ele ignora o 'this' da classe File
// e herda o this do watch (do modulo fs)! O que gera erro por nao encontrar o
// this.showContent
// watch(__filename, file.watch)

// alte4ranativa para nao herdar o this da funçao com arrow function
// mas fica feio!
// watch(__filename, async (event, fileName) => file.watch(event, fileName));

// podemos deixar explicito qual é o contexto que a funçao deve seguir
// o bind retorna uma funcáo com o 'this' que foi setado, no caso o file,
// ignorando o do watch (do modulo fs)
// watch(__filename, file.watch.bind(file))

file.watch.call(
  { showContent: () => console.log('call: hey sinon!!')},
  // depois da virgula devo passar os argumentos que vao na funçao do call
  // no caso a funçao watch da classe File
  null, __filename 
)

file.watch.apply(
  { showContent: () => console.log('call: hey sinon!!') },
  // depois da virgula devo passar os argumentos que vao na funçao do call
  // A diferença entre 'call' e 'apply' é somente que no 'apply' passamos
  // os arumentos num array. (alguns acham mais semantico)
  [null, __filename]
)

// -----------------

const objNoArrayLike = {
  0: 'a',
  1: 'b',
  2: 'c'
}

console.log(Array.prototype.slice.call(objNoArrayLike)) // []

const objArrayLike = {
  0: 'a',
  1: 'b',
  2: 'c',
  length: 3
}
// O caso do arguments funciona pois o objeto é um 'Array-Like', com isso
// para simular algo parecido com um obj criado, segue o exemplo.
console.log(Array.prototype.slice.call(objArrayLike)) // ['a', 'b', 'c']