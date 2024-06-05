const Product = require("../../src/entities/product");

class ProductDataBuilder {
    constructor() {
        // o default sao os dados corretos, ou de sucesso!
        this.productData = {
            id: '000001',
            name: 'computer',
            price: 1000,
            category: 'electronic'
        }
    }

    static aProduct() {
        return new ProductDataBuilder();
    }

    withInvalidId() {
        this.productData.id = '1';
        return this;
    }

    withInvalidName() {
        this.productData.name = '1#leonardo';
        return this;
    }

    build() {
        const product = new Product(this.productData);
        return product;
    }
}

module.exports = ProductDataBuilder;