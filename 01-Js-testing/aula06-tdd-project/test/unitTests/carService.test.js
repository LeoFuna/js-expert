const { describe, it, before, beforeEach, afterEach, after } = require('mocha');
const sinon = require('sinon');
const { expect } = require('chai');
const CarService = require('../../src/service/carService');
const { join } = require('path');
const Transaction = require('../../src/entities/transaction');
const exp = require('constants');

const carsDatabase = join(__dirname, './../../database', 'cars.json')

const mocks = {
  validCarCategory: require('./../mocks/valid-carCategory.json'),
  validCar: require('./../mocks/valid-car.json'),
  validCustomer: require('./../mocks/valid-customer.json'),
}

describe('CarService Suite Tests', () => {
  let carService = {}
  let sandbox = {}
  // Para garantir que entre cada teste o estado do objeto seja resetado
  before(() => {
    carService = new CarService({
      cars: carsDatabase,
    })
  })

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('should retrieve a random position from an array', () => {
    const data = [0, 1, 2, 3, 4]

    const result = carService.getRandomPositionFromArray(data);

    expect(result).to.be.lt(data.length).and.be.gte(0);
  })

  it('should choose the first id from carIds in carCategory', () => {
    const carCategory = mocks.validCarCategory;
    const firstCar = carCategory.carIds[0];

    sandbox.stub(
      carService,
      carService.getRandomPositionFromArray.name,
    ).returns(0);

    const result = carService.chooseRandomCar(carCategory);
    const expected = firstCar;

    expect(carService.getRandomPositionFromArray.calledOnce).to.be.ok;
    expect(result).to.be.equal(expected);
  })

  it('given a car category it should return an available car', async () => {
    const car = mocks.validCar;
    // Faz com que ao substituir carIds nao sujemos o objeto original
    const carCategory = Object.create(mocks.validCarCategory);
    carCategory.carIds = [car.id];

    sandbox.stub(
      carService.carRepository,
      carService.carRepository.find.name,
    ).resolves(car);

    sandbox.spy(
      carService,
      carService.chooseRandomCar.name,
    )

    const result = await carService.getAvailableCar(carCategory);

    const expected = car;

    expect(result).to.be.deep.equal(expected);
    expect(carService.chooseRandomCar.calledOnce).to.be.ok;
    expect(carService.chooseRandomCar.calledWithExactly(carCategory)).to.be.ok;
    expect(carService.carRepository.find.calledOnce).to.be.ok;
    expect(carService.carRepository.find.calledWithExactly(car.id)).to.be.ok;
  })

  it('given a carCtegory, customer and numberOfDays it should calculate final amount in real', async () => {
    const customer = Object.create(mocks.validCustomer)
    customer.age = 50;

    const carCategory = Object.create(mocks.validCarCategory)
    carCategory.price = 37.6;

    const numberOfDays = 5;
    // para nao depender de dados externos
    sandbox.stub(
      carService,
      "taxesBasedOnAge",
    ).get(() => [{ from: 40, to: 50, then: 1.3 }])

    const expected = carService.currencyFormat.format(244.40);

    const result = carService.calculateFinalPrice(
      customer,
      carCategory,
      numberOfDays
    )

    expect(result).to.be.deep.equal(expected);
  })

  it('given a customer and a category with no discount ticket, it should return a transaction receipt', async () => {
    const car = mocks.validCar
    const carCategory = {
      ...mocks.validCarCategory,
      price: 37.6,
      carIds: [car.id]
    }

    const customer = Object.create(mocks.validCustomer)
    customer.age = 20

    const dueDate = '10 de novembro de 2020'

    const numberOfDays = 5
    const today = new Date(2020, 10, 5)

    sandbox.useFakeTimers(today.getTime())

    sandbox.stub(
      carService.carRepository,
      carService.carRepository.find.name,
    ).resolves(car)
    // price * tax * numberOfDays * discount
    const expectedAmount = carService.currencyFormat.format(206.80)
    const result = await carService.rent(
      customer,
      carCategory,
      numberOfDays,
    )

    const expected = new Transaction({
      customer,
      car,
      amount: expectedAmount,
      dueDate
    })

    expect(result).to.be.deep.equal(expected)
  })

  it('given a customer and a category with 10% discount ticket, it should return a transaction receipt', async () => {
    const car = mocks.validCar
    const carCategory = {
      ...mocks.validCarCategory,
      price: 37.6,
      carIds: [car.id]
    }

    const customer = Object.create(mocks.validCustomer)
    customer.age = 20

    const dueDate = '10 de novembro de 2020'

    const numberOfDays = 5
    const today = new Date(2020, 10, 5)
    // 10% discount
    const discountTicket = 0.1;
    sandbox.useFakeTimers(today.getTime())

    sandbox.stub(
      carService.carRepository,
      carService.carRepository.find.name,
    ).resolves(car)
    // price * tax * numberOfDays * discount
    const expectedAmount = carService.currencyFormat.format(186.12)
    const result = await carService.rent(
      customer,
      carCategory,
      numberOfDays,
      discountTicket
    )

    const expected = new Transaction({
      customer,
      car,
      discount: discountTicket,
      amount: expectedAmount,
      dueDate
    })

    expect(result).to.be.deep.equal(expected)
  })
})