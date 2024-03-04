9999999999999999 // 16 noves
// 10000000000000000

true + 2 // 3

'21' + true // '21true'

'21' - true // 20

'21' - - 1 // 22

0.1 + 0.2 === 0.3 // false

3 > 2 > 1 // false
3 > 2 >= 1 // true

'1' == 1 // true
'1' === 1 // false

// -----------------------------------
console.assert(String(123) === '123', 'Coercao explicita para string falhou')
console.assert(123 + '' === '123', 'Coercao implicita para string falhou')

console.assert(('hello' || 123) === 'hello', '|| retorna o primeiro valor verdadeiro')
console.assert(('hello' && 123) === 123, '&& retorna o ultimo valor verdadeiro')

// -----------------------------------
const item = {
  name: 'Leonardo Funabashi',
  age: 34,
  //tipo da coerçao string: 1 se nao for primitivo, chama o valueOf
  toString() {
    return `Name: ${this.name}, Age: ${this.age}`
  },
  //tipo da coerçao number: 1 se nao for primitivo, chama o toString
  valueOf() {
    return this.age
  }
}
// Coerçoes explicitas
console.log('toString: ', String(item))
console.log('valueOf: ', Number(item))

const item2 = {
  name: 'Leonardo Funabashi',
  age: 34,
  //tipo da coerçao string: 1 se nao for primitivo, chama o valueOf
  toString() {
    return `Name: ${this.name}, Age: ${this.age}`
  },
  //tipo da coerçao number: vai chamar o toString pois n esta retornando tipo primitivo
  valueOf() {
    return { hey: 'dude' }
  }
}
console.log('\n')
// Vai retornar NaN pois o toString retornou a string
console.log('valueOf: ', Number(item2))

const item3 = {
  name: 'Leonardo Funabashi',
  age: 34,
  //tipo da coerçao string: 1 se nao for primitivo, chama o valueOf
  toString() {
    return `Name: ${this.name}, Age: ${this.age}`
  },
  //tipo da coerçao number: vai chamar o toString pois n esta retornando tipo primitivo
  valueOf() {
    return { hey: 'dude' }
  },
  /**
   * 
   * @param {string} coercionType
   * enum: 'string' | 'number' | 'default' 
   * @returns 
   */
  // Ele tem prioridade sobre o todos os outros metodos
  [Symbol.toPrimitive](coercionType) {
    console.log('trying to convert to', coercionType)
    const types = {
      string: JSON.stringify(this),
      number: '007'
    }
    return types[coercionType] || types.string
  }
}
console.log('\n')
console.log('Number: ', Number(item3))
console.log('String: ', String(item3))
// chama a conversao default
console.log('Date: ', new Date(item3))

// tenta converter por default
console.assert(item3 + 0 === '{"name":"Leonardo Funabashi","age":34}0')
console.log('!!item3 is true?', !!item3)
console.assert(!!item3)

console.log('string.concat', 'Ae'.concat(item3))
console.assert('Ae'.concat(item3) === 'Ae{"name":"Leonardo Funabashi","age":34}')

console.log('implicit + explicit coercion (using ==)', item3 == String(item3))
console.assert(item3 == String(item3))

