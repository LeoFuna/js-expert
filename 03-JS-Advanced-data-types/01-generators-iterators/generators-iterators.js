const assert = require('assert')
//um generator
function* calculation(arg1, arg2) {
  yield arg1 * arg2
}
// um generator
function* main() {
  yield 'Hello'
  yield '--'
  yield 'World'
  yield* calculation(20, 10)
}

const generator = main()
// console.log(generator.next())
// console.log(generator.next())
// console.log(generator.next())
// console.log(generator.next())
// console.log(generator.next())

assert.deepStrictEqual(generator.next(), { value: 'Hello', done: false })
assert.deepStrictEqual(generator.next(), { value: '--', done: false })
assert.deepStrictEqual(generator.next(), { value: 'World', done: false })
assert.deepStrictEqual(generator.next(), { value: 200, done: false })
assert.deepStrictEqual(generator.next(), { value: undefined, done: true })

// Outras maneiras mais eficientes de pegar os retornos do generator, 
assert.deepStrictEqual(Array.from(main()), ['Hello', '--', 'World', 200])
assert.deepStrictEqual([...main()], ['Hello', '--', 'World', 200])

// async iterators
const { readFile, stat, readdir } = require('fs/promises')
function* promisified() {
  yield readFile(__filename)
  yield Promise.resolve('Hey Dude!') 
}

async function* systemInfo() {
  const file = await readFile(__filename)
  yield { file: file.toString() }
  
  const { size } = await stat(__filename)
  yield { size }

  const dir = await readdir(__dirname)
  yield { dir }
}

// Promise.all([...promisified()]).then((resp) => console.log(resp))
// ;(async () => {
//   for await (const itemFromYield of promisified()) {
//     // toString para poder ver o rile do primeiro yield
//     console.log(itemFromYield.toString())
//   }
// })()
;(async () => {
  // for of é um iterator
  for await (const itemFromYield of systemInfo()) {
    // toString para poder ver o rile do primeiro yield
    console.log(itemFromYield)
  }
})()

// Transformando um objeto nao iterável em um iterável
let range = {
  from: 1,
  to: 5,

  [Symbol.iterator]() {
    return {
      current: this.from,
      last: this.to,

      next() {
        if (this.current <= this.last) {
          return { value: this.current++, done: false }
        }
        return { value: undefined, done: true }
      }
    }
  }
}

for (let item of range) {
  console.log(item)
}

// Exemplo prático do uso de generators e iterators
// A api abaixo do github retorna 30 itens por página (é paginado) e um link para a proxima página.
// Com isso para receber 1000 commits podemos usar um generator que fará para nós o processo de buscar os commits e entregálos sob demanda.
// assim podemos processar tudo isso sob demanda!!!!
async function* fetchCommits(repo) {
  let url = `https://api.github.com/repos/${repo}/commits`;

  while (url) {
    const response = await fetch(url, { // (1)
      headers: {'User-Agent': 'Our script'}, // github needs any user-agent header
    });

    const body = await response.json(); // (2) response is JSON (array of commits)

    // (3) the URL of the next page is in the headers, extract it
    let nextPage = response.headers.get('Link').match(/<(.*?)>; rel="next"/);
    nextPage = nextPage?.[1];

    url = nextPage;

    for(let commit of body) { // (4) yield commits one by one, until the page ends
      yield commit;
    }
  }
}

(async () => {

  let count = 0;

  for await (const commit of fetchCommits('javascript-tutorial/en.javascript.info')) {

    console.log(count, commit?.node_id);

    if (++count == 1000) { // let's stop at 100 commits
      break;
    }
  }

})();