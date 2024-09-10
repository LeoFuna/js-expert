import Product from "../src/entities/product.js";

export default class Cart { 
    constructor({ products = [] }) {
        this.products = this.removeUndefinedProps(products);
    }

    removeUndefinedProps(products) {
        const result = [];
        for (const product of products) {
            const keys = Reflect.ownKeys(product);
            if (!keys.length) continue;

            // 2nd way
            // keys.forEach(key => (product[key] === undefined) || delete product[key]);
            keys.forEach(key => (product[key] === undefined) || Reflect.deleteProperty(product, key));
            result.push(new Product(product));

            // 1st way
            // result.push(JSON.parse(JSON.stringify(new Product(product))));
        }

        return result;
    }
}
