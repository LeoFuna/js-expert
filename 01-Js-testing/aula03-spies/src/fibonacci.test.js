// Fibonacci: o proximo numero da sequencia é a soma dos anteriores
const assert = require("assert");
const { createSandbox } = require("sinon");
const Fibonacci = require("./fibonacci");
const sinon = createSandbox();

;(async () => {
  {
    const fibonacci = new Fibonacci();
    const spy = sinon.spy(
      fibonacci,
      fibonacci.execute.name
    );
    for (const i of fibonacci.execute(3)) {}
    // Quantidade de vezes esperada que o método execute seja chamado
    const expectedCount = 4;
    assert.strictEqual(spy.callCount, expectedCount, "Função execute deveria ser chamada 4 vezes!");
  }
  
  {
    const fibonacci = new Fibonacci();
    const spy = sinon.spy(
      fibonacci,
      fibonacci.execute.name
    );
    const results = [...fibonacci.execute(5)];

    const { args } = spy.getCall(2);
    const expectedArgs = [3, 1, 2];
    assert.deepStrictEqual(args, expectedArgs, "Os argumentos não são iguais!");

    const expectedResults = [0, 1, 1, 2, 3];
    assert.deepStrictEqual(results, expectedResults, "Os resultados não são iguais!");
  }
})()