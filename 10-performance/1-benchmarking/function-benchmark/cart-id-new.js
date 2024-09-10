import { randomUUID } from "crypto";

export default class Cart {
    constructor() {
        this.id = randomUUID();
    }
}