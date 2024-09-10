import { v4 as uuid } from "uuid";
import Product from "./product.js";

export default class Cart { 
    constructor({ products = [], at }) {
        this.id = uuid()
        this.products = this.removeUndefinedProps(products);
        this.at = at;
        this.total = this.getCartPrice();
    }

    removeUndefinedProps(products) {
        const productsEntities = products
            .filter(product => !!Reflect.ownKeys(product).length)
            .map(product => new Product(product));

        return JSON.parse(JSON.stringify(productsEntities));
    }

    getCartPrice() {
        return this.products.map(product => product.price).reduce((acc, price) => acc + price, 0);
    }
}
