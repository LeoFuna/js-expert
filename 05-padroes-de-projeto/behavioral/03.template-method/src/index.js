import OrderBusiness from "./business/orderBusiness.js";
import Order from "./entities/order.js";

const order = new Order({
    customerId: '001',
    amount: 100,
    products: [{ description: 'ferrari' }]
});

const orderBusiness = new OrderBusiness();

const result = orderBusiness.create(order);

console.info(result)