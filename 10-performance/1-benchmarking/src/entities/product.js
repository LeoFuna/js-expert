export default class Product {
  constructor({ name, price, tmpProperty, activePromoId, description }) {
    this.name = name;
    this.price = price;
    this.tmpProperty = tmpProperty;
    this.activePromoId = activePromoId ?? 0;
    this.description = description;
  }
}