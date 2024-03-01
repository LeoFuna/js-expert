### Strict Mode

- O `use strict` foi introduzida no ECMAScript 5.
- Seu propósito é para indicar que o código JS deve ser executado em "strict mode".
- Ele torna mais fácil escrever código "seguro" em JS.

```js
"use strict"
x = 3.14 // vai dar erro pq x nao está declarado
```

```js
x = 3.14 // nao causará erro
myFunction();

function myFunction() {
  "use strict";
  y = 3.14; // causará erro
}
```

### Referências
- https://www.geeksforgeeks.org/strict-mode-javascript/
- https://www.w3schools.com/js/js_strict.asp