const assert = require('assert')

//--- keys
const uniqueKey  = Symbol("userName")
const user = {}

user["userName"] = 'value for normal Obj'
user[uniqueKey] = 'value for symbol'

// console.log('getting normal Objects', user.userName)
// // sempre unico em nv de endereço de memoria
// console.log('', user[Symbol("userName")]) // log: undefined
// console.log('', user[uniqueKey]) // log: value for symbol

assert.deepStrictEqual(user.userName, 'value for normal Obj')
assert.deepStrictEqual(user[Symbol("userName")], undefined)
assert.deepStrictEqual(user[uniqueKey], 'value for symbol')
// O dado em Symbol no user nao é exatamente privado, só mais dificil de ser acessado
// cuidado para nao expor dados sensiveis assim
assert.deepStrictEqual(Object.getOwnPropertySymbols(user)[0], uniqueKey)

// Já conhecidos Symbols

const obj = {
  [Symbol.iterator]: () => {
    return {
      items: ['c', 'b', 'a'],
      next() {
        return {
          // A ordem aqui parece fazer diferença
          // Se value é colocado antes, ele faz o pop e depois verifica done
          // isso faz o teste falhar
          done: this.items.length === 0,
          value: !this.items.length ? undefined : this.items.pop(),
        }
      } 
    }
  }
}

assert.deepStrictEqual([...obj], ['a', 'b', 'c'])

const kItems = Symbol('kItems')
class MyDate {
  constructor(...args) {
    this[kItems] = args.map(arg => new Date(...arg))
  }

  [Symbol.toPrimitive](coercionType) {
    if (coercionType !== 'string') throw new TypeError()
    const items = this[kItems]
      .map(item => new Intl.DateTimeFormat('pt-BR', { month: 'long', year: 'numeric', day: '2-digit' })
      .format(item));

    return new Intl.ListFormat('pt-BR', { style: 'long', type: 'conjunction' }).format(items)
  }

  *[Symbol.iterator]() {
    for (const item of this[kItems]){
      yield item
    }
  }

  // Nao tem muito uso prático mas é interessante conhecer
  get [Symbol.toStringTag]() {
    return 'WHAT?'
  }
}

const myDate = new MyDate(
  [2020, 3, 1],
  [2018, 2, 2]
)

const expectedDates = [
  new Date(2020, 3, 1),
  new Date(2018, 2, 2),
]


assert.deepStrictEqual(Object.prototype.toString.call(myDate), '[object WHAT?]')
assert.throws(() => myDate + 1, TypeError)

// coerçao explicita para chamar o toPrimitive
assert.deepStrictEqual(String(myDate), '01 de abril de 2020 e 02 de março de 2018')

// implementar o iterator
assert.deepStrictEqual([...myDate], expectedDates)