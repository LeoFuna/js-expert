const { deepStrictEqual } = require('assert');
let counter = 0
let counter2 = counter
counter2++
//?

let item = { counter: 0 }
let item2 = item

// Tipo primitivo gera uma cópia em memória
deepStrictEqual(counter, 0)
deepStrictEqual(counter2, 1)

// Tipo de referencia copia o endereço de memoria
// e apinta para o mesmo lugar
item2.counter++
deepStrictEqual(item, { counter: 1 });
item.counter++
deepStrictEqual(item2, { counter: 2 });


function changeAgeAndReference(person) {
  person.age = 25 //Estamos alterando o valor na referencia de memoria
  // Aqui estamos criando uma nova referencia em memoria e adicionando a variavel person
  person = { name: 'John', age: 50 }
  // Vale notar que depois do return a variavel person é destruida pelo Garbage Collector
  return person
}

let person1 = { name: 'Leo', age: 30 }
// Quando passamos person1 para a funçao, é o mesmo que dizer const person = person1
// Ou seja adicionamos a mesma referencia de memoria
let person2 = changeAgeAndReference(person1);

deepStrictEqual(person1, { name: 'Leo', age: 25 })
deepStrictEqual(person2, { name: 'John', age: 50 })

//-----------------------------------------------------

function changeAgeWithoutChangeReference(person) {
  person.age = 25
  person = { name: 'John', age: 50 }
  return person
}

let person3 = { name: 'Leo', age: 30 };
// Desestruturar o objeto faz é o mesmo que criar um novo objeto, ou seja, nova referencia
let person4 = changeAgeWithoutChangeReference({ ...person3 })

deepStrictEqual(person3, { name: 'Leo', age: 30 })
deepStrictEqual(person4, { name: 'John', age: 50 })
