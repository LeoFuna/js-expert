const { evaluateRegex } = require('./utils')

class Person {
    constructor([
        nome,
        nacionalidade,
        estadoCivil,
        documento,
        rua,
        numero,
        bairro,
        estado,
    ]) {
        const firstLetterExp = evaluateRegex(/^(\w{1})([a-z|A-Z]+$)/g)
        const formatFirstLetter = (prop) => {
            return prop.replace(firstLetterExp, (fullMatch, group1, group2, index) => {
                return `${group1.toUpperCase()}${group2.toLowerCase()}`;
            })
        }
        // Esse regex com D maiusculo pega tudo que não é digito
        const onlyDigitsExp = evaluateRegex(/\D/g)

        this.nome = formatFirstLetter(nome)
        this.nacionalidade = formatFirstLetter(nacionalidade)
        this.estadoCivil = formatFirstLetter(estadoCivil)
        this.documento = documento.replace(onlyDigitsExp, '')
        // começa a procurar derpois do "a" e pega tudo a frente
        // (?<= faz com que ignore tudo que tiver antes desse match, é chamado de positive look behind)
        this.rua = rua.match(evaluateRegex(/(?<=\sa\s).*$/)).join('')
        this.numero = numero
        this.bairro = bairro.match(evaluateRegex(/(?<=\s).*$/)).join('')
        this.estado = estado.replace(evaluateRegex(/\.$/), '')
    }
}

module.exports = Person