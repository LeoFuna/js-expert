const { evaluateRegex } = require('./utils')
// O objetivo do Fluent API é executar tarefas como um pipeline, step by step
// e no fim, chama o build. Muito similar ao padrão Builder
// a diferenca que aqui é sobre processos, o Builder sobre construção de objetos
class TextProcessorFluentAPI {
    // propriedade privada
    #content
    constructor(content) {
        this.#content = content
    }

    extractPeopleData() {
        // ?<= fala que vai extrair os dados que virao depois desse grupo
        // [contratante|contratada] um ou outro
        // :\s{1} vai procurar o caracter literal dos dois pontos seguindo de um espaco
        // tudo acima fica dentro de um parenteses para falar "vamos pegar dai pra frente"

        // (?!\s) negative look around,  vai ignorar os contratantes do fim do documento (que tem só espaco a frente deles)
        // .*\n pega qualquer coisa ate o primeiro \n
        // .*? non-greedy, esse ? faz com que ele pare na primeira recorrencia, assim ele evita ficar em loop

        // $ informa que a pesquisa acaba no final da linha
        // gmi flags para global, multiline e case insensitive
        const mathPerson = evaluateRegex(/(?<=[contratante|contratada]:\s{1})(?!\s)(.*\n.*?)$/gmi)
        const onlyPerson = this.#content.match(mathPerson)
        console.log('eu: ',onlyPerson)
        this.#content = onlyPerson
        return this
    }

    divideTextInColumns() {
        const splitRegex = evaluateRegex(/,/)
        this.#content = this.#content.map(line => line.split(splitRegex))

        return this
    }

    removeEmptyCharacters() {
        const removeEmpty = evaluateRegex(/^\s+|\s+$|\n/g)
        this.#content = this.#content.map(columns => columns.map(column => column.replace(removeEmpty, '')))
        return this
    }

    build() {
        return this.#content
    }
}

module.exports = TextProcessorFluentAPI