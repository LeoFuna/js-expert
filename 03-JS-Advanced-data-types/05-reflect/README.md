# Reflect

Reflect é um novo objeto global (como `JSON` ou `Math`) que fornece vários métodos úteis de introspecção (introspecção é na verdade apenas uma palavra chique para "olhar as coisas").
Já existem ferramentas de introspecção em JavaScript; `Object.keys`, `Object.getOwnPropertyNames`, etc. Então, por que a necessidade de uma nova API quando estas poderiam simplesmente ser adicionadas ao `Object`?

### Métodos

Reflect é efetivamente uma coleção de todos aqueles "métodos internos" que estavam disponíveis exclusivamente através dos componentes internos do mecanismo JavaScript, agora expostos em um único objeto útil.
Você pode estar pensando "sim, mas por que não anexá-los a objetos como `Object.keys`, `Object.getOwnPropertyNames` etc?". Aqui está o porquê:

- Reflect possui métodos que não se destinam apenas a objetos, por exemplo `Reflect.apply` - que tem como alvo uma função. Chamar `Object.apply(myFunction)` pareceria estranho.
- Ter um único objeto para abrigar esses métodos é uma ótima maneira de manter o restante do JavaScript limpo, em vez de distribuir métodos de reflection por construtores e protótipos - ou pior - globais.
- `typeof`, `instanceof` e `delete` já existem como operadores de Reflection, adicionar novas palavras-chave como essa não é apenas complicado para os desenvolvedores, mas também um pesadelo para a compatibilidade com versões anteriores e explode o número de palavras reservadas.

### Referencias
- https://www.keithcirkel.co.uk/metaprogramming-in-es6-part-2-reflect/