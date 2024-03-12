const assert = require('assert')

const myMap = new Map()

// podem ter qqr coisa como chave
myMap
  .set(1, 'one')
  .set('Leo', { text: 'two' })
  .set(true, () => 'hello')

// usando um construtor
const myMapWithContructor = new Map([
  ['1', 'str1'],
  [1, 'num1'],
  [true, 'bool1']
])

// console.log('myMap', myMapWithContructor)
// console.log('myMap.get(1)', myMap.get(1))
assert.deepStrictEqual(myMap.get(1), 'one')
assert.deepStrictEqual(myMap.get('Leo'), { text: 'two' })
assert.deepStrictEqual(String(myMap.get(true)), String(() => 'hello'))

// Em Objects a chave só pode ser string ou symbol (number é coergido em stirng)
const onlyReferenceWorks = { id: 1 }
myMap.set(onlyReferenceWorks, { name: 'Funa' })
// console.log(myMap.get(onlyReferenceWorks))
assert.deepStrictEqual(myMap.get({ id: 1 }), undefined)
assert.deepStrictEqual(myMap.get(onlyReferenceWorks), { name: 'Funa' })

// utilitários
// No Object seria Object.keys({ a: 1 }).length
assert.deepStrictEqual(myMap.size, 4)

// para verificar se um item existe no objeto
// item.key = se nao existe = undefined
// if() = coerçao implicita para boolean e retorna false
// O jeito mais saudável para o js em Object seria ({ name: 'Leo' }).hasOwnProperty('name')
assert.ok(myMap.has(onlyReferenceWorks))

// para remover um item de um objeto
// delete item.id
// imperformático para o js
assert.ok(myMap.delete(onlyReferenceWorks))

// Nao da para iterar em Objetos diretamente
// tem que transofrmar com o Object.entries
assert.deepStrictEqual(JSON.stringify([...myMap]), JSON.stringify([[1,"one"],["Leo",{"text":"two"}],[true, () => {}]]))
// O map aplica o padrao generators
// for (const [key, value] of myMap) {
//   console.log({ key, value })
// }

// O Object é inseguro, pois dependendo do nome da chavbe, pode substituir algum comportamento padrao
// ({ }).toString() === '[object Object]'
// ({ toString: () = > 'Hey' }).toString() === 'Hey'

// qualquer chave pode colidir, com as propriedades  gerdados do objeto, como
// constructor, toString, valueOf  e etc.

const actor = {
  name: 'Joao silva',
  toString: 'Meu amigo Joao silva'
}
// nao tem restriçao de nome de chave
myMap.set(actor)

assert.ok(myMap.has(actor))
assert.throws(() => myMap.get(actor).toString, TypeError)

// Nao da pra limpar um obj sem reassina-lo
myMap.clear()
assert.deepStrictEqual(myMap.size, 0)

// Casos de uso:
// 1 - precisa adicionar chaves com frequencia
// 2 - precisa validar se essa chave existe de forma semantica
// 3 - precisar que o obj seja como um BD
// 4 - casos onde vc precise limpar a referencia apos o uso


// ---- WeakMap
// pode ser coletado apos perder as referencias
// usado em casos beeem específicos

// tem a maioria dos beneficios do Map
// MAS: n é iterável
// Só chaves de referencia e q vc já conheça
// mais leve e preve leak de memoria, pq depois que as instancias saem da memoria, tudo é limpo

const weakMap = new WeakMap()
const hero = { name: 'Flash' }

// weakMap.set(hero)
// weakMap.get(hero)
// weakMap.delete(hero)
// weakMap.has(hero)
