class Transaction {
  constructor({ customer, car, amount, dueDate, discount = 0 }) {
    this.customer = customer;
    this.car = car;
    this.amount = amount;
    this.dueDate = dueDate;
    this.discount = discount;
  }
}

module.exports = Transaction;