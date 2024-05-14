const { describe, it } = require('mocha');
const { expect } = require('chai');
const { InvalidRegexError, evaluateRegex } = require('./../src/utils');

describe('Util', () => {
    it('#evaluateRegex should throw an error if regex in unsafe', () => {
        const unsafeRegex = /^([a-z|A-Z|0-9]+\s?)+$/
        /*
            Esse código abaixo é um exemplo de como o regex pode derrubar uma aplicaçao, caso ele seja mal intencionado.

            time \
            node --eval "/^([a-z|A-Z|0-9]+\s?)+$/.test('eaaae man como vai voce e como vai voce e como?') && console.log('ok')"
        */
        expect(() => evaluateRegex(unsafeRegex)).to.throw(InvalidRegexError, `This ${unsafeRegex} is unsafe dude!`);
    })

    it ('#evaluateRegex should return the regex if it is safe', () => {
        const safeRegex = /^([a-z])$/

        expect(() => evaluateRegex(safeRegex)).not.to.throw
        const result = evaluateRegex(safeRegex);

        expect(result).to.be.equal(safeRegex);
    })
})