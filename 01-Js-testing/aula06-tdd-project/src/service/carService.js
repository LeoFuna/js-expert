const Tax = require("../entities/tax");
const Transaction = require("../entities/transaction");
const BaseRepository = require("../repository/base/baseRepository");

class CarService {
  constructor({ cars }) {
    this.carRepository = new BaseRepository({ file: cars });
    this.taxesBasedOnAge = Tax.taxesBasedOnAge;
    this.currencyFormat = new Intl.NumberFormat('pt-br', {
      style: 'currency',
      currency: 'BRL'
    })
  }

  async getAvailableCar(carCategory) {
    const carId = this.chooseRandomCar(carCategory);
    const car = await this.carRepository.find(carId);

    return car;
  }

  getRandomPositionFromArray(list) {
    const listLength = list.length;

    return Math.round(Math.random() * (listLength - 1));
  }

  chooseRandomCar(carCategory) {
    const randomCarIndex = this.getRandomPositionFromArray(carCategory.carIds)

    return carCategory.carIds[randomCarIndex];
  }

  calculateFinalPrice(customer, carCategory, numberOfDays, discount = 0) {
    const { age } = customer;
    const price = carCategory.price;
    const { then: tax } = this.taxesBasedOnAge.find(tax => age >= tax.from && age <= tax.to );

    const finalPrice = (tax * price) * numberOfDays * (1 - discount);

    const formattedPrice = this.currencyFormat.format(finalPrice);

    return formattedPrice
  }

  async rent(
    customer,
    carCategory,
    numberOfDays,
    discount = 0,
  ) {
    const car = await this.getAvailableCar(carCategory)
    const finalPrice = this.calculateFinalPrice(customer, carCategory, numberOfDays, discount)

    const today = new Date();
    today.setDate(today.getDate() + numberOfDays);
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }

    const dueDate = today.toLocaleDateString('pt-br', options)

    const transaction = new Transaction({
      customer,
      car,
      amount: finalPrice,
      dueDate,
      discount,
    })

    return transaction
  }
}

module.exports = CarService;