# Set e WeakSet

### Set
- Esse tipo de dado representa um conjunto de elementos (uma coleção) e voce pode iterar através dos elementos do conjunto pela ordem de inserção
- São conjunto ordenados de lista de valores que nao contem itens duplicados e que são acessados usnado chaves, ao invez de indexes.

### WeakSet
Igual ao Set com basicamente 2 importantes diferenças:
- O valor armazenado no WeakSet nao pode ser valores primitivos.
- WeakSet é fraco, se nao tiver outra referencia para um objeto armazenado no WeakSet, eles podem ser coletados pelo Garbage Collector, por conta disso `nao é possível iterar sobre WeakSet`.

### Set x Array
- Array sao considerados coleçoes de indices.
- Set é considerado coleçoes de chaves.

### Referencia
- https://medium.com/@leonardobrunolima/javascript-tips-set-and-weakset-53be9d264fb1
- https://medium.com/front-end-weekly/es6-set-vs-array-what-and-when-efc055655e1a
- https://javascript.info/map-set