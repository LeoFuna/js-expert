# Map e WeakMap

### Map

- Map é um tipo de coleção de dados (de um jeito mais "bonito",  tipo de estrutura de dados abstrata), que é armazenado em forma de pares, que copntem chaves unicas que sao mapeadas por essa chave
. Por conta disso, não existe duplicidade de pares guardados.
- Podem ter chaves de qualquer tipo, preservando o tipo da chave.
- É iterável

### WeakMap
- Só aceita como chaves de referencia fraca.
- Grande diferença é que ele permite que o garbage collector limpe as chaves, previnido leak de memoria

### Objeto
- Objeto regular no js é um tipo de dicionário de coleta de dados, também sao baseados em chave-valor.
- Só é possivel ter chaves como strings ou Symbols (number sao convertidos para string)
- Isso pode ser ruim em casos de perda de consistencia de tipos.

### Resumo
Feature--------------Map--------------WeakMap
---------------------------------------------
Key type-------------Any--------------Object-only
Key reference--------Strong-----------Weak
Garbage collection*--No---------------Yes
Iteration order-------Insertion----------N/A
Size property--------Yes---------------No
Performance---------Slower-----------Faster


Methods-------------Map--------------WeakMap
---------------------------------------------
set(key, value)------Yes-----------------Yes
get(key)-------------Yes----------------Yes
has(key)-------------Yes----------------Yes
delete(key)----------Yes----------------Yes
clear()---------------Yes----------------Yes
entries()-------------Yes----------------No
forEach(callback)----Yes----------------No
keys()----------------Yes----------------No
values()--------------Yes----------------No

### Referencias

- https://medium.com/front-end-weekly/es6-map-vs-object-what-and-when-b80621932373
- https://dmitripavlutin.com/maps-vs-plain-objects-javascript/
- https://medium.com/@leonardobrunolima/javascript-tips-map-and-weakmap-f38f9c4ed2b6
- https://javascript.info/map-set