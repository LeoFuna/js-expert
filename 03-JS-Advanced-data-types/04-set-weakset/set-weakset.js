const assert = require('assert');

// usado na maioria das vezes para listas de itens unicos

const arr1 = ["0", "1", "2"]
const arr2 = ["2", "0", "3"]
const arr3 = arr1.concat(arr2)

assert.deepStrictEqual(arr3.sort(), ['0', '0', '1', '2', '2', '3'])

const set = new Set()
arr1.map((item) => set.add(item))
arr2.map((item) => set.add(item))

assert.deepStrictEqual(Array.from(set), ['0', '1', '2', '3'])

// rest/spread
assert.deepStrictEqual(Array.from(new Set([...arr1, ...arr2])), ['0', '1', '2', '3'])

console.log('set.keys', set.keys())
console.log('set.values', set.values()) // só existe por conta do map

// no Array comum, para saber se um item existe
// [].indexOf('1') ou includes
assert.ok(set.has('3'))

// mesma teoria do Map, mas vc sempre trabalha com a lista toda
// n tem get, entao voce pode saber se o item esta ou n no array e é so isso.
// na documentaçao tem exemplos sobre como fazer uma interceçao, saber o que tem em uma lista e nao
// tem na outra e assim por diante.

// verificar se tem nos 2 Sets
const user01 = new Set([
  'leo',
  'erick',
  'joao'
])
const user02 = new Set([
  'maria',
  'leo',
  'ze'
])

// Para os casos de arrays seria necessario 2 loops, ou seja complexidade maior do que no caso usando Set
const intersection = new Set([...user01].filter(user => user02.has(user)))
assert.deepStrictEqual(Array.from(intersection), ['leo'])

const difference = new Set([...user01].filter(user => !user02.has(user)))
assert.deepStrictEqual(Array.from(difference), ['erick', 'joao'])

const obj1 = { id: 1 }
const obj2 = { id: 2 }
const setEqReference = new Set([obj1, obj2, obj1])
// Mesmo se tratando de objs de referencia, ele nao duplica
assert.deepStrictEqual(Array.from(setEqReference), [obj1, obj2])

// WeakSet

// mesma ideia do WeakMap
// n é enumerável (iterável)
// só trabalha com chaves como referencia
// só tem metodos simples

const user = { id: 123 }
const user2 = { id: 321 }
const weakSet = new WeakSet([user])

weakSet.add(user2)
weakSet.delete(user)
weakSet.has(user)