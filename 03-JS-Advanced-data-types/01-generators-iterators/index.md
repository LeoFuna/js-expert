# Generator e Iterators

### Iterators
- Definição: Um objeto que implementa o protocolo de iteração. Isso envolve a implementação de um método next() que retorna um objeto com as propriedades { value, done }. O método next() é chamado repetidamente para obter os próximos elementos da sequência.

### Generators
- Definição: Uma função especial que permite pausar sua execução e ser retomada. Os geradores são criados usando a palavra-chave function* e têm a capacidade de interromper a execução usando a palavra-chave yield. Cada chamada ao método next() em um gerador executa o código até atingir um yield, retornando o valor indicado e pausando a execução até a próxima chamada next().

### Resumo
Em resumo, um iterador é um objeto que segue o protocolo de iteração, enquanto um gerador é uma função especial que gera valores sob demanda e pode ser pausada e retomada. Um gerador pode ser usado para criar um iterador, pois ele automaticamente implementa o protocolo de iteração.

### Referências
- https://javascript.info/iterable
- https://javascript.info/async-iterators-generators
- https://jakearchibald.com/2017/async-iterators-and-generators/