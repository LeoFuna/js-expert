const { expect } = require('chai');
const { it, describe } = require('mocha');
const ProductMotherObject = require('./model/productMotherObject');
const { productValidator } = require('../src');

describe('Test Mother Object', () => {
    it('Should create a product with valid data', () => {
        const product = ProductMotherObject.valid();
        const result = productValidator(product);

        const expected = {
            result: true,
            errors: []
        }

        expect(result).to.be.deep.equal(expected);
    });

    describe('Product Validation Rules', () => {
        it('should return an object error when creating a Product with invalid id', () => {
            const product = ProductMotherObject.withInvalidId();
            const result = productValidator(product);

            const expected = {
                result: false,
                errors: ['ProductId: should be between 2 and 20 char']
            }

            expect(result).to.be.deep.equal(expected);
        })
        it('should return an object error when creating a Product with invalid name', () => {
            const product = ProductMotherObject.withInvalidName();
            const result = productValidator(product);

            const expected = {
                result: false,
                errors: ['Name: should be only words']
            }

            expect(result).to.be.deep.equal(expected);
        })
        it('should return an object error when creating a Product with invalid price')
        it('should return an object error when creating a Product with invalid category')
    })
})