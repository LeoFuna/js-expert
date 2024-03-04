## Coerção de Tipos

### Coerção Explícita (or Type Casting)
- Quando o desenvolvedor expressa intenção de converter entre tipos. Ex: `Number(value)`
- O operador `===` chamado `strict equality operator`, NÃO aciona a coerção implicita.

### Coerção Implícita
- Geralmente ocorre quando aplicamos operadores para valores de diferentes tipos. Ex: `1 == null`, `2/'5'`
- Pode ser acionado por outros contextos como: `if (value) {...}`, onde o valor sofre coerçào para boleano.
 

### Tipos de Conversões no JS
- para STRING
- para BOOLEAN
- para NUMBER

- Notar que a lógica de conversão de primitivos é diferente para objetos, entretanto ambos sao convertidos nessas 3 maneiras acima.

### Objetos
- Quando falamos de objetos, ambas as conversões (`String` ou `Number`) fazem uso de dois métodos pertencentes aos objetos: `valueOf` e `toString`.
- Ambos os métodos pertencem ao `Object.prototype` e são acessiveis também em tipos derivados como `Date`, `Array` etc.
- Geralmente a ordem que o algoritmo de conversão segue é:
  1. Se um input já é primitivo, faça nada e returne ele.
  2. Chame o `input.toString()`, se o resultado for primitivo, retorne ele.
  3. Chame o `input.valueOf()`, se o resultado for primitivo, retorne ele.
  4. Se nenhum dos 2 retornar um primitivo, lance `TypeError`.
- Conversões numéricas primeiro chamam o `valueOf()`, com o fallback do `toString()`.
- Conversões de texto primeiro chamam o `toString()`, com fallback do `valueIF()`. 
- O `Symbol.toPrimitive` tem prioridade sobre `toString` e `valueOf`.

### Referências
- https://www.freecodecamp.org/news/js-type-coercion-explained-27ba3d9a2839