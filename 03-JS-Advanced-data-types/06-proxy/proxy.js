'use strict'

const Event = require('events')

// Pequeno exemplo de uso, interceptando um objeto
const users = [
  {
    name: 'Leo',
    lastname: 'Funa',
    age: 34,
  },
  {
    name: 'Hio',
    lastname: 'Mathielo',
    age: 30,
  },
]

users.forEach((user) => {
  const userProxy = new Proxy(user, {
    get: (user, key) => {
      if (key === 'name') {
        const finalInfo = `${user.name} ${user.lastname} - ${user.age} anos`
        return finalInfo;
      }
      // Interessante que mesmo sem ter essa chave, ele faria o processo!
      if (key === 'fullName') {
        const finalInfo = `${user.name} ${user.lastname} - ${user.age} anos`
        return finalInfo;
      }
      return Reflect.get(user, key);
    }
  });
  console.log(userProxy.fullName)
})

// -----
// Interessante que dá para ser usado em funçoes.
// no fim tudo acaba sendo Object em JS
function urlBuilder(domain) {
  const joinDomain = () => {
    const returnValue = domain + '/' + parts.join('/');
    parts = [];
    return returnValue;
  };

  let parts = [];
  const proxy = new Proxy(joinDomain, {
    has: function () {
      return true;
    },
    get: function (object, prop) {
      parts.push(prop);
      return proxy;
    },
  });

  return proxy;
}
const google = urlBuilder('http://google.com');
console.log(Reflect.has(google, 'products')) // true
console.log(google.search.products.bacon.and.eggs()) // http://google.com/search/products/bacon/and/eggs

// ------------
// Maneira de intervir quando usuário tenta acessar um metodo nao existente
// em uma classe.
class Foo {
  constructor() {
    return new Proxy(this, {
      get: function (object, property) {
        if (Reflect.has(object, property)) {
          return Reflect.get(object, property);
        }
        return function methodMissing() {
          console.log('you called ' + property + ' but it doesn\'t exist!');
        };
      }
    });
  }

  bar() {
    console.log('you called bar. Good job!');
  }
}

const foo = new Foo()
foo.bar(); //=> you called bar. Good job!
foo.this_method_does_not_exist()
//=> you called this_method_does_not_exist but it doesn't exist

// ------------
// um outro caso de uso para um conversoe de bases de acord com a string
// do metodo!
/**
 * basta passar a base de onde vem como o numero e depois para onde var
 * exemplo: .base2toBase10()
 */
const baseConvertor = new Proxy({}, {
  get: function baseConvert(object, methodName) {
    // match vai resultar num array com a string e as capturas feitas nos ()
    const methodParts = methodName.match(/base(\d+)toBase(\d+)/);

    const fromBase = methodParts && methodParts[1];
    const toBase = methodParts && methodParts[2];
    if (!methodParts
        || fromBase > 36
        || toBase > 36
        || fromBase < 2
        || toBase < 2
      ) {
      throw new Error('TypeError: baseConvertor' + methodName + ' is not a function');
    }
    return function (fromString) {
      return parseInt(fromString, fromBase).toString(toBase);
    }
  }
});

baseConvertor.base10toBase2('200') // '11001000'
baseConvertor.base2toBase10('11001000') // '200'

// ------------
const event = new Event()
const eventName = 'counter'
event.on(eventName, msg => console.log('counter updated', msg))

const myCounter = {
  counter: 0,
}

const proxy = new Proxy(myCounter, {
  set: (target, propertyKey, newValue) => {
    event.emit(eventName, { newValue, key: target[propertyKey] })
    target[propertyKey] = newValue
    return true
  },

  get: (object, prop) => {
    // console.log('chamou!', { object, prop })
    return object[prop]
  }
})

// logo executa e sempre!
setInterval(function () {
  proxy.counter += 1
  console.log('[3]: setInterval')
  if (proxy.counter === 8) {
    clearInterval(this)
  }
}, 200)

// execuçao no futuro
setTimeout(() => {
  console.log('[2]: setTimeOut')
  proxy.counter = 4
}, 100)
// É o ideal para ser usado em casos que se precise de uma promise para
// ser executada imediatamente
setImmediate(() => {
  console.log('[1]: setImmediate', proxy.counter)
})

// executa agora, agorinha, mas acaba com o ciclo de vida do node
// Nao eh uma boa prática, e ele tem prioridade total sobre os eventos 
// no Node!
process.nextTick(() => {
  console.log('[0]: nextTick')
  proxy.counter = 2
})

