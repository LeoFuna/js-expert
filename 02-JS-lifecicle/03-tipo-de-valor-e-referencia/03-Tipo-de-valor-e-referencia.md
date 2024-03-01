## Tipo de Valor x Tipo de Referência (Immutability x Mutability)

### Tipo de Valor
- São relacionado às variáveis primitivas: `boolean`, `number`, `string`, `undefined`, `null`, `Symbol` e `BigInt`.
- São armazenados na `Call Stack` com o valor em sua referencia de memoria.
 

### Tipo de Referência
- Relacionados a dados não-primitivos: `funcoes`, `array`, `objeto`.
- São armazenados na `Call Stack` com a referencia à `Memory Heap`, e não com o valor diretamente.

### Observaçoes
- Notar que o operador `===` verifica se a referência é a mesma, mas no caso de tipos primitivos ela simplesmente verifica se os valores sao os mesmos.
- Uma maneira simples de verificar se 2 objetos sao iguais seria transformar eles em string `JSON.stringify()`

### Referências
- https://codeburst.io/explaining-value-vs-reference-in-javascript-647a975e12a0
- https://developer.mozilla.org/en-US/docs/Glossary/Primitive