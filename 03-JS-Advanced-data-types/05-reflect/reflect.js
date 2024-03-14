'use strict'
const assert = require('assert');
// garantir semantica e segurança em objetos

// --- apply
const myObj = {
  add(myValue) {
    return this.arg1 + this.arg2 + myValue;
  }
}

assert.deepStrictEqual(myObj.add.apply({ arg1: 10, arg2: 20 }, [100]), 130)

// um problema que pode aconjtecer (raro)
// nesse caso se algo malicioso tentar mudar o comportamento da Function
// e for chamado antes da execuçao das suas funcoes, ele falha!
// Function.prototype.apply = () => { throw new TypeError('Eita!!') }

// esse aqui pode acontecer!
// Alguem mudar o comportamento da sua funçao para tentar pegar algum dado
myObj.add.apply = function() { throw new TypeError('opa!!') }

assert.throws(
  () => myObj.add.apply({}, []),
  {
    name: 'TypeError',
    message: 'opa!!'
  }
)

// usando reflect:
// dessa maneira nao é usado o apply alterado
const result = Reflect.apply(myObj.add, { arg1: 40, arg2: 20 }, [200])
assert.deepStrictEqual(result, 260)
// --- apply

// --- defineProperty
// questoes semanticas
function MyDate() {}

// bem feio, tudo é Object, mas Object adicionando prop para um função?
Object.defineProperty(MyDate, 'withObject', { value: () => 'Hey there' })
// agora parece fazer um pouco mais de sentido apesar de ser igual,
// semanticamente nao temos um Object adicionando prop em func
Reflect.defineProperty(MyDate, 'withReflection', { value: () => 'Hey dude' })

assert.deepStrictEqual(MyDate.withObject(), 'Hey there')
assert.deepStrictEqual(MyDate.withReflection(), 'Hey dude')
// ------------------

// ------ deleteProperty
const withDelete = { user: 'ErickWendel' }
delete withDelete.user

assert.deepStrictEqual(withDelete.hasOwnProperty('user'), false)
// diz respeitar mais o ciclo de vida do JS...mas será q nao seria melhor
// somente em casos mais complexos?
const withReflection = { user: 'Leo' }
Reflect.deleteProperty(withReflection, 'user')
assert.deepStrictEqual(withReflection.hasOwnProperty('user'), false)
// ----------------

// ---- get

// Deveriamos fazer um get somente em instancias de referencia
// isso seria mais interessante estrourar um erro, NAO FAZ SENTIDO!
assert.deepStrictEqual(1['userName'], undefined)
// com Reflection, uma exceção é lançada! O que faz mais sentido.
assert.throws(() => Reflect.get(1, 'userName'), TypeError)
// --------------


// --- has
// verifica se a chave superman está no objeto, mas nao parece muito semantico
assert.ok('superman' in { superman: '' })
assert.ok(Reflect.has({ batman: '' }, 'batman'))
// -------

// --- ownKeys
const userSymbol = Symbol('user')
const databaseUser = {
  id: 1,
  [Symbol.for('password')]: 123,
  [userSymbol]: 'leofuna'
}

// com os metodos do obj, temos que fazer 2 requisiçoes para ver os symbols
const objectKeys = [
  ...Object.getOwnPropertyNames(databaseUser),
  ...Object.getOwnPropertySymbols(databaseUser),
]

assert.deepStrictEqual(objectKeys, ['id', Symbol.for('password'), userSymbol])

// com reflection, só um metodo
assert.deepStrictEqual(Reflect.ownKeys(databaseUser), ['id', Symbol.for('password'), userSymbol])